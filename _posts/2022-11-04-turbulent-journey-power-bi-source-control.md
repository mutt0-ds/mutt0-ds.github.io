---
title: "A turbulent journey through Power BI source control"
date: 2022-11-07
permalink: /posts/2022/11/turbulent-journey-power-bi-source-control/
tags:
  - source-control
  - power-bi
  - devops
  - pipeline
  - git
  - tabular-editor
  - azure
---
One of the most annoying issues I have when working with Power BI files is that source control is a real pain.
Considering that Microsoft owns Azure, Github, and Power BI, one would hope that they will come up with a solution for comparing two reports without using third-party tools or overly complicated solutions... But that day seems still far in the future.

Here is a story about how I managed to set up a CI/CD pipeline through Azure DevOps Pipeline for providing rudimental version control of our Power BI reports.

![cover](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/images/power_bi_source_control/title.jpg)

## ❓ The problem

While textual formats like markdown or .json can be compared using an editor, binary formats like .pbix are not supported, being binary files. This results in a confusing situation where we have to document what exactly has been changed after every update, losing the powerful features available with git. So, lots of time wasted, plus insecurity and confusion.

![binary](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/images/power_bi_source_control/binary.png)

![working-git](https://code.visualstudio.com/assets/docs/sourcecontrol/overview/overview.png)

## 🙏 Acknowledgments

Many people have tried to tackle the problem, in particular, [Kerski](https://www.kerski.tech/bringing-dataops-to-power-bi-part10/
) and [Gerhard Brueckl](https://blog.gbrueckl.at/). I'm very thankful for their precious resources.
Also, I have to thank the creators of [Tabular Editor](https://tabulareditor.com/), an open-source tool that offers several functionalities, including extracting the metadata of a .pbix files into .json files, transforming the binary file into a textual format.

The main source for this article is [this amazing blog post from Gerhard Brueckl](https://blog.gbrueckl.at/2022/02/automating-the-extraction-of-bim-metadata-from-pbix-files-using-ci-cd-pipelines/). The code I used mostly comes from his [Github repository](https://github.com/gbrueckl/PowerBI.CICD), with a few tweaks I personally added. I recommend reading its README for the more technical details and the environment variables needed for authentication. You may be interested in [his Github Action version](https://github.com/gbrueckl/PowerBI.CICD/blob/main/.github/workflows/pbix_to_bim.yml), which doesn't require Azure.

## 📑 Requisites

- a .pbix file with a dataset to track with git
- a PowerBI Premium license (and a Premium workspace already created)
- an Azure DevOps repository
- [a service principal](https://learn.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals) (an Active Directory entity with permissions to edit the Power BI Premium workspace)
- A [variable group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml#create-a-variable-group) with auth variables to Power BI for the service principal (explained [here](https://github.com/gbrueckl/PowerBI.CICD#environment-variables))

## 💡 The idea

As Gerhard says:
> The core idea of the solution is to use CI/CD pipelines that automatically extracts the metadata of a .pbix file as soon as it is pushed to the Git repository. To do this, the .pbix file is automatically uploaded to a Power BI Premium workspace using the Power BI REST API and the free version of Tabular Editor 2 then extracts the BIM file via the XMLA endpoint and push it back to the repository.

![pipeline](https://blog.gbrueckl.at/wp-content/uploads/2022/02/PBIX_to_BIM_YAML_workflow.png)

In short, the pipeline retrieves the commit id of the latest two commits in the repository, detects which .pbix files have been modified, then uploads them in the Premium Workspace. This step is needed because the Premium workspace gives access to an XMLA endpoint used by Tabular Editor to access its data. Then, the pipeline extracts all the metadata in .JSON format and pushes it to the DevOps repository.

## 💬 The code [Step by Step]

Be free to skip this section if you are not interested in the details about the code, which is fully available [here](https://github.com/mutt0-ds/powerbi-source-control-pipeline/tree/main). I'm trying to keep things simple for newbies like me so I  documented every step.

First, a simple introduction to [Azure Pipelines](https://www.reddit.com/r/csharp/comments/this0y/eli5_cicd_with_azure_devops/).
An Azure Pipeline is composed of a setup part and different steps. The code is executed in a VM (in my case, hosted by Microsoft) triggered after every commit, which doesn't basically anything about the context. This is good because the code is always executed in a neutral environment, but also requires to install modules every time and complicates some (in theory) simple steps, especially when using git.

### 1. Setup

Here I named the pipeline, which will be triggered only when a .pbix file is committed, on all branches.
The `batch` parameter, as [badly documented by Windows](https://stackoverflow.com/questions/67099766/azure-yaml-schema-batch-trigger), has been set to `false`: I want to trigger the pipeline for each commit, even if more of them have been pushed in a batch.
This is not a very efficient way, but I had some issues when retrieving the commit ids using the DevOps API (step 5) so I decided to keep it simple.

```yaml
name: Extract PBIX metadata

trigger:
  batch: false # one pipeline for every commit
  branches:
    include:
      - '*' # on all branches
  paths:
    include:
      - '**/*.pbix' # whenever a .pbix file is pushed

pool:
  vmImage: windows-latest # windows VM with PowerShell
```

### 2. Variables

The variable group contains the access token that can be accessed like `$env:PBI_USER_NAME`.
A little, innocent detail I had to remember is that if you flag a variable in your variable group as "Secret", [you have to explicitly declare it in the YAML code](https://stackoverflow.com/a/69891660). Otherwise, there is no warning, the value will simply be null. Stupid, but tricky if you don't know that, as I know firsthand...

```yaml
variables:
- group: My Variable Group # <-- change this to match your library/variable group
```

### 3. Git Checkout

The pipeline is executing a `git checkout` behind the scenes by default to retrive all the files in the repository, but I had to declare it esplicitly. The trick here is to add `persistCredentials: true` to keep the git credentials for the next steps. Otherwise (again, experienced firsthand), gut 

```yaml
steps:
- checkout: self
  clean: true # resets the environment to a fresh new state
  persistCredentials: true # very important to keep the credentials
  fetchDepth: 0
```

### 4. Download Tabular Editor Portable

```powershell
- task: PowerShell@2
  displayName: Download-TabularEditor2
  inputs:
    targetType: 'inline'
    script: |
      # Download URL for Tabular Editor portable:
      $TabularEditorUrl = "https://cdn.tabulareditor.com/files/te2/TabularEditor.Portable.zip" 
      # Download destination (root of PowerShell script execution path):
      $DownloadDestination = Join-Path (Get-Location) "TabularEditor.zip"
      # Download from GitHub:
      Invoke-WebRequest -Uri $TabularEditorUrl -OutFile $DownloadDestination
      # Unzip Tabular Editor portable, and then delete the zip file:
      Expand-Archive -Path $DownloadDestination -DestinationPath (Get-Location).Path
      Remove-Item $DownloadDestination
    pwsh: true # necessary variable for passing the script values to Powershell
```

### 5. Get the Commit IDs

This was the part that gave me a bit of a headache, as the original code didn't seem to work in case of merges or, for some reason, was skipping some commits. It's very annoying that Azure DevOps doesn't provide a way to retrieve the git commit id preceding the running build, so I had to use this escamotage by calling the DevOps API and then using `git log` for retrieving the previous commit.

```powershell
- task: PowerShell@2
  displayName: Get the Commit IDs
  inputs:
    targetType: 'inline'
    script: |
    # print Information stream
    $InformationPreference = "Continue"

    $headers = @{ Authorization = "Bearer $env:SYSTEM_ACCESSTOKEN" }
    $uri = "$env:SYSTEM_TEAMFOUNDATIONSERVERURI$env:SYSTEM_TEAMPROJECT/_apis/build/builds/$($env:BUILD_BUILDID)/changes?api-version=5.1"
    # API Call to DevOps API to retrieve changes
    $changes = Invoke-RestMethod -Method Get -Headers $headers -Uri $uri

    if ($changes.count -gt 0) {
        # the first commit of the list is the one that triggered the pipeline
        $commit_id_after = $changes.value[0].id
        # using git for retrieving the preceeding commit
        $commit_id_before = @($(git log --pretty=%P -n 1 $commit_id_after --max-count=1 --max-parents=1))

        Write-Information "Commit ID before push: $commit_id_before"
        Write-Information "Commit ID after push:  $commit_id_after"

        # this sets the value as environment variable
        Write-Host "##vso[task.setvariable variable=GIT_EVENT_BEFORE]$commit_id_before"
        Write-Host "##vso[task.setvariable variable=GIT_EVENT_AFTER]$commit_id_after"
    }
    else {
        Write-Warning "No changes found in Build $($env:BUILD_BUILDID)"
    }
  pwsh: true
```

![git](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/images/power_bi_source_control/git.png)

### 6. Extract PBIX Metadata

The core of the Pipeline, which requires the MicrosoftPowerBIMgmt Powershell module, the credentials for logging in Power BI and then calling the Premium Workspace endpoint for extracting data using Tabular Editor.

```powershell
- task: PowerShell@2
  displayName: Extract-PBIXMetadata
  inputs:
    targetType: 'inline'
    script: |
      # halt on first error
      $ErrorActionPreference = "Stop"
      # print Information stream
      $InformationPreference = "Continue"
      
      # install the Power BI Powershell module
      Set-PSRepository PSGallery -InstallationPolicy Trusted
      Install-Module -Name MicrosoftPowerBIMgmt -Scope CurrentUser
      Import-Module -Name MicrosoftPowerBIMgmt
      
      # setup
      $root_path = (Get-Location).Path
      $tabular_editor_root_path = $root_path
      $ind = "`t"
      $git_event_before = $env:GIT_EVENT_BEFORE
      $git_event_after = $env:GIT_EVENT_AFTER

      $triggered_by = $env:BUILD_REASON
      $workspace_id = $env:PBI_PREMIUM_WORKSPACE_ID

      $tenant_id = $env:PBI_TENANT_ID
      $client_id = $env:PBI_CLIENT_ID
      $client_secret = $env:PBI_CLIENT_SECRET

      # login to Power BI
      $login_info = "User ID=app:$client_id@$tenant_id;Password=$client_secret"
      [securestring]$sec_client_secret = ConvertTo-SecureString $client_secret -AsPlainText -Force
      [pscredential]$credential = New-Object System.Management.Automation.PSCredential ($client_id, $sec_client_secret)
      Connect-PowerBIServiceAccount -Credential $credential -ServicePrincipal -TenantId $tenant_id

      # accessing the workspace
      $workspace = Get-PowerBIWorkspace -Id $workspace_id
      Write-Information "Power BI Workspace: `n$($workspace | ConvertTo-Json)"
      if (-not $workspace.IsOnDedicatedCapacity) {
        Write-Error "The provided Workspace ID ($($workspace.id)) is not on Premium Capacity!"
      }

      # very important: finding the modified files with git diff
      # it has to be triggered by a push to the repo
      Write-Information "Triggered By: $triggered_by"
      Write-Information "Getting changed .pbix files ..."
      if ($triggered_by -like "*CI" -or $triggered_by -eq "push") {
        # get the changed .pbix files in the current push
        Write-Information "git diff --name-only $git_event_before $git_event_after --diff-filter=ACM ""*.pbix"""
        $pbix_files = @($(git diff --name-only $git_event_before $git_event_after --diff-filter=ACM "*.pbix"))
        $pbix_files = $pbix_files | ForEach-Object { Join-Path $root_path $_ | Get-Item }
        if ($pbix_files.Count -eq 0) {
          Write-Warning "Something went wrong! Could not find any changed .pbix files using the above 'git diff' command!"
          
          # get all .pbix files in the current repository
          # disable these lines if you don't want this feature
          Write-Information "Getting all .pbix files in the repo to be sure to get all changes!"
          $pbix_files = Get-ChildItem -Path (Join-Path $root_path $manual_trigger_path_filter) -Recurse -Filter "*.pbix" -File
        }
      }
      else {
        Write-Error "Invalid Trigger!"
      }


      Write-Information "Changed .pbix files ($($pbix_files.Count)):"
      $pbix_files | ForEach-Object { Write-Information "$ind$($_.FullName)" }
      # we need to set Serialization Options to allow export to Folder via TE2
      $serialization_options = '{
          "IgnoreInferredObjects": true,
          "IgnoreInferredProperties": true,
          "IgnoreTimestamps": true,
          "SplitMultilineStrings": true,
          "PrefixFilenames": false,
          "LocalTranslations": false,
          "LocalPerspectives": false,
          "LocalRelationships": false,
          "Levels": [
              "Data Sources",
              "Perspectives",
              "Relationships",
              "Roles",
              "Tables",
              "Tables/Columns",
              "Tables/Measures",
              "Translations"
          ]
      }'
      $serialization_options | Out-File (Join-Path $tabular_editor_root_path "TabularEditor_SerializeOptions.json")
      "Model.SetAnnotation(""TabularEditor_SerializeOptions"", ReadFile(@""$(Join-Path $tabular_editor_root_path "TabularEditor_SerializeOptions.json")""));" `
        | Out-File (Join-Path $tabular_editor_root_path "ApplySerializeOptionsAnnotation.csx")
      
      # for each .pbix modified extract metadata with Tabular Editor
      foreach ($pbix_file in $pbix_files) {
        $report = $null
        $dataset = $null
        try {
          Write-Information "Processing  $($pbix_file.FullName) ... "
          Write-Information "$ind Checking if PBIX file contains a datamodel ..."
          $zip_entries = [IO.Compression.ZipFile]::OpenRead($pbix_file.FullName).Entries.Name;
          if ("DataModel" -notin $zip_entries) {
            Write-Information "$ind No datamodel found in $($pbix_file.Name) - skipping further processing of this file!"
            continue
          }
          else {
            Write-Information "$ind Datamodel found!"
          }

          # upload the file with the dataset to the Premium workspace
          $temp_name = "$($pbix_file.BaseName)-$(Get-Date -Format 'yyyyMMddTHHmmss')"
          Write-Information "$ind Uploading $($pbix_file.FullName.Replace($root_path, '')) to $($workspace.Name)/$temp_name ... "
          $report = New-PowerBIReport -Path $pbix_file.FullName -Name $temp_name -WorkspaceId $workspace.Id
          Start-Sleep -Seconds 5
          
          # retrieving the uploaded data
          $dataset = Get-PowerBIDataset -WorkspaceId $workspace.Id | Where-Object { $_.Name -eq $temp_name }
          $connection_string = "powerbi://api.powerbi.com/v1.0/myorg/$($workspace.Name);initial catalog=$($dataset.Name)"
          Write-Information "$ind Extracting metadata ..."
          $executable = Join-Path $tabular_editor_root_path TabularEditor.exe
          $output_path = "$(Join-Path $pbix_file.DirectoryName $pbix_file.BaseName)"
          $params = @(
            """Provider=MSOLAP;Data Source=$connection_string;$login_info"""
            """$($dataset.Name)"""
            "-SCRIPT ""$(Join-Path $tabular_editor_root_path 'ApplySerializeOptionsAnnotation.csx')"""
            "-FOLDER ""$output_path"" ""$($pbix_file.BaseName)"""
          )
          Write-Debug "$ind $executable $params"
          $p = Start-Process -FilePath $executable -Wait -NoNewWindow -PassThru -RedirectStandardOutput "$temp_name.log" -ArgumentList $params
          if ($p.ExitCode -ne 0) {
            Write-Error "$ind Failed to extract PBIX metadata from $($dataset.WebUrl)!"
          }
          Write-Information "$ind Extracted PBIX metadata to FOLDER '($output_path)'!"
          Write-Information "$ind Overwriting 'name' and 'id' properties now ..."
          # need to overwrite id and name as they are taken from the temporary dataset
          $bim_json = Get-Content (Join-Path $output_path "database.json") | ConvertFrom-Json
          $bim_json.name = $pbix_file.BaseName
          $bim_json.id = $pbix_file.BaseName
          $bim_json | ConvertTo-Json -Depth 50 | Out-File (Join-Path $output_path "database.json")
          Write-Information "$ind PBIX metadata written to FOLDER '$output_path'!"
        }
        catch {
          Write-Warning "An error occurred:"
          Write-Warning $_
        }
        finally {
          if ($report -ne $null) {
            Write-Information "$ind Removing temporary PowerBI report ..."
            Remove-PowerBIReport -WorkspaceId $workspace.Id -Id $report.Id
          }
          if ($dataset -ne $null) {
            Write-Information "$ind Removing temporary PowerBI dataset ..."
            Invoke-PowerBIRestMethod -Url "https://api.powerbi.com/v1.0/myorg/groups/$($workspace.Id)/datasets/$($dataset.Id)" -Method Delete
          }
        }
      }
      Write-Information "Finished!"
    pwsh: true  
```

![extraction](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/images/power_bi_source_control/extraction.png)

### 7. Push the Metadata to the Git repository

The final step is to push the .json metadata extracted by Tabular Editor to the repository. The script uses the name and email of the original committer and mentions the original id in the message for keeping things clear.

If you get a `GenericContribute` permission error, remember to add the service principal account as Contributor as shown [here](https://stackoverflow.com/a/56542631).

```bat
- task: CmdLine@2
    displayName: Push PBIX metadata to Git repo
    inputs:
      script: |
        SET _full_branch_name=$(Build.SourceBranch)
        SET _full_branch_name=%_full_branch_name:refs/heads/=%
        SET _commit_message="🤖 PBIX Metadata Extraction for #%GIT_EVENT_AFTER% $(Build.RequestedFor) [skip ci]"

        git config --global user.name '$(Build.RequestedFor)'
        git config --global user.email '$(Build.RequestedForEMail)'
        git checkout %_full_branch_name%
        git stash
        git pull
        git stash apply
        git add **/*.json
        git status --porcelain
        git commit -am %_commit_message%
        git push origin HEAD:%_full_branch_name%
```

## 🔚 Conclusions

![commit](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/images/power_bi_source_control/commit.png)

Keeping track of the changes inside Power BI files is still a painful process at the moment, and I sincerely hope that Microsoft will soon find a solution to the issue.

![result](https://raw.githubusercontent.com/mutt0-ds/mutt0-ds.github.io/master/images/power_bi_source_control/result.png)

The method I set up is working if the report contains a dataset and something has changed in the schema and the measures, but unfortunately it still can't detect visual changes, which is the most common cause of confusion, especially when users begin messing around with bookmarks and filters. Since many of our reports are using external datasets as source, they are untracked by the system.

The only solution currently available is [pbi-tools](https://pbi.tools/cli/), which is unfortunately unusable in a pipeline as it requires a Power BI Desktop instance on the VM (we can't use the Core edition for extracting metadata). From [what I could find](https://community.powerbi.com/t5/Desktop/docker/m-p/426116), containerizing the app is not a suitable solution, but I'm keeping an eye on [an open issue on Github](https://github.com/pbi-tools/pbi-tools/issues/176) that could be the final solution.

In that case, we could just import the correct VM Image with the pre-installed pbi-tools, extract the metadata and commit the changes in a few steps (and I'll be happy to update the guide).

For now, be free to adapt my solution if it suits your needs!
