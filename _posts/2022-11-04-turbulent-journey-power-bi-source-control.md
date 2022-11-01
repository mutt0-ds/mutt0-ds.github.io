---
title: "A turbulent journey through Power BI source control (feat. Azure DevOps Pipeline & Tabular Editor 2)"
date: 2022-11-04
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
Considering that Microsoft owns Azure, Github and Power BI, one would hope that they will came up with a solution for comparing two reports without using third-party tools or (read more) overly complicate solutions, but that day seems still far in the future.
This is a story about how I managed to set up a CI/CD pipeline through Azure DevOps Pipeline for providing a rudimental version control of our Power BI reports. Hopefully I will have to update it in the future as a deprecated solution.

## The problem

[ADD PHOTO]
.pbix files are binary, thus it is impossible to compare them using an IDE like I was used to when coding. This results in lots of confusin as we have to ask to users what exactly they have changed when updating their reports. We can't risk merging a version that may have been created months before. So, lots of time wasted, plus insecurity and confusion.

## 🙏 Acknowledgments

Let's start with the sources. I have to thank  the creators of Tabular Editor, an open-source tool that offers several functionalities, including extracting the metadata of a .pbix files into .json files, providing a classical comparable format.

The main source for this article is [this blog post from Gerhard Brueckl](https://blog.gbrueckl.at/2022/02/automating-the-extraction-of-bim-metadata-from-pbix-files-using-ci-cd-pipelines/). The code I used is mostly from his [Github repository](https://github.com/gbrueckl/PowerBI.CICD), with a few tweaks. I recommend reading its README for the more technical details. You may be interested in [his Github Action version](https://github.com/gbrueckl/PowerBI.CICD/blob/main/.github/workflows/pbix_to_bim.yml), which doesn't require Azure. Be warned that I didn't use it so I will only talk about the "Azure way".

## The idea

My requisites were:

- a PowerBI Premium license (and a Premium workspace already created)
- a Azure DevOps repository for storing the files
- [a service principal](https://learn.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals) (an Active Directory entity with permissions to edit the Power BI Premium workspace)
- A [variable group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=yaml#create-a-variable-group) with auth variables to Power BI for the service principal (explained [here](https://github.com/gbrueckl/PowerBI.CICD#environment-variables))

As Gerhard says:
> The core idea of the solution is to use CI/CD pipelines that automatically extracts the metadata of a .pbix file as soon as it is pushed to the Git repository. To do this, the .pbix file is automatically uploaded to a Power BI Premium workspace using the Power BI REST API and the free version of Tabular Editor 2 then extracts the BIM file via the XMLA endpoint and push it back to the repository.

[pipeline](https://blog.gbrueckl.at/wp-content/uploads/2022/02/PBIX_to_BIM_YAML_workflow.png)

## The code [Step by Step]

Be free to skip this section if you are not interested in the details about the code, which is the one used in [the original repo](https://github.com/gbrueckl/PowerBI.CICD), with some tweaks I had to add. I'm trying to keep things simple for newbies like me.

An Azure Pipeline is composed of a setup part and different steps. The code is executed in a VM (in my case, hosted by Microsoft) initialized after every commit, which doesn't basically anything about the context.

For simplicty, I'm dividing the steps for each task of the pipeline.

### 1. Setup

Here I named the pipeline, that will be triggered only when a .pbix file is commited, on all branches.

The `batch` paremeter, as [badly documented by Windows](https://stackoverflow.com/questions/67099766/azure-yaml-schema-batch-trigger), has been set to false: I want to trigger the pipeline for each commit, even if more of them have been pushed in a batch.

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
The tricky detail I had to learn is that if you flag a variable in your variable group as "Secret", [you have to esplicitedly declare it in the YAML code](https://stackoverflow.com/a/69891660), like you will see in the next steps. Otherwise there is no warning, the value will simply be null.

```yaml
variables:
- group: My Variable Group # <-- change this to match your library/variable group
```

### 3. Git Checkout

The pipeline is executing a `git checkout` behind the scenes by default, but I had to declare it esplicitly. The trick here is to add `persistCredentials: true` to keep the credentials for the next steps, where we will have to use git again to retrieve the commit ids... 

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

This was the part that gave me lots of problems, as the original code didn't seem to work in case of merges or, for some reasons, was skipping some commits. It's very annoying that Azure DevOps doesn't provide a way to retrieve the git commit id preceeding the running build, so I had to use this intricate way by calling the DevOps API and then using `git log` for retrieving the previous commit.

```powershell
- task: PowerShell@2
  displayName: Get GIT Commit-IDs before and after Push
  inputs:
    targetType: 'inline'
    script: |
      # print Information stream
      $InformationPreference = "Continue"
      $headers = @{ Authorization = "Bearer $env:SYSTEM_ACCESSTOKEN" }
      $uri = "$env:SYSTEM_TEAMFOUNDATIONSERVERURI$env:SYSTEM_TEAMPROJECT/_apis/build/builds/$($env:BUILD_BUILDID)/changes?api-version=5.1"

      # calling the DevOps API
      $changes = Invoke-RestMethod -Method Get -Headers $headers -Uri $uri
      if ($changes.count -gt 0) {
          $commit_id_before = # TODO metti codice
          $commit_id_after = $changes.value[0].id

          # setting the value as environment variable
          Write-Host "##vso[task.setvariable variable=GIT_EVENT_BEFORE]$commit_id_before^!"
          Write-Host "##vso[task.setvariable variable=GIT_EVENT_AFTER]$commit_id_after"
      }
      else {
        Write-Warning "No changes found in Build $($env:BUILD_BUILDID)"
      }
    pwsh: true
  env: # we need to declare the secret environment variable
    SYSTEM_ACCESSTOKEN: $(System.AccessToken)
```

### 6. Extract the metadata TODO

#TODO modifica la parte del get changed files

The core of the Pipeline

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
          # disable these lines if you don't want the feature
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

### 7. Push the Metadata to the Git repository TODO

The final step is to push the .json metadata extracted by Tabular Editor to the repo. The script uses the name and email of the original committer and mentions the original id in the message, to avoid confusion.

#TODo cambia mssaggio

```bat
- task: CmdLine@2
  displayName: Push PBIX metadata to Git repo
  inputs:
    script: |
      SET _full_branch_name=$(Build.SourceBranch)
      SET _full_branch_name=%_full_branch_name:refs/heads/=%
      echo Branch Name: %_full_branch_name%
      git config --global user.name '$(Build.RequestedFor)'
      git config --global user.email '$(Build.RequestedForEMail)'
      git checkout %_full_branch_name%
      git stash
      git pull
      git stash apply
      git add **/*.json
      git status --porcelain
      git commit -am "Automated extracton of metadata from PBIX - original changes by $(Build.RequestedFor) \n[skip ci]"
      git push origin HEAD:%_full_branch_name%
```

## Conclusions

#TODO di di pbi tools che però non e' containerizzabile