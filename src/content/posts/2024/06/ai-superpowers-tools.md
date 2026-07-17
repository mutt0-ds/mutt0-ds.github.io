---
title: "Giving our AI superpowers with OpenAI Tools"
date: 2024-06-03
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
description: ""
image: /images/ai_superpowers/cover.jpg
draft: false
author: "Mutt0-ds"
tags:
  - ai
  - openai
  - tools
  - python
  - api
---

In recent months, I have been experimenting with AI tools to leverage new, powerful technologies and create value. Like you, I am inundated with hype and buzzwords, and this makes things complicate, when trying to get started. While looking for simple answers to my questions, it’s often challenging to extract real value. So, I want to share my notes to help others with similar needs.

## My Business Case: an AI Analyst

Let’s start with the big question I had in my mind:

> I have a big, complex data source (a database, an API). How can I connect it to an AI and be fairly\* confident it doesn’t mess things up?

_\*Remember, with AI, you can’t be 100% sure of anything._

Specifically, I worked with our order database to create an “AI Analyst" using Azure OpenAI. The goal was to enable it to respond to common questions like, _“When is my order arriving?”_ or _“What’s the order status for this customer?”_ This would save our analysts time and effort since the majority of the questions they receive are always the same..

I’m not talking of the toy databases you find in tutorials with 3 tables and 10 columns, this is a real schema with joins, millions of rows and knowledge of the business logic required. The cool part is that by using tools the AI model won’t care about the complexity underneath: as you’ll see, the possibilities are endless.

## Before AI Tools

Back in the “old days” (five months ago, lol), the only way was to use GPT-3.5 to make SQL queries and return a response, specifically with Langchain and a [SQL](https://python.langchain.com/v0.1/docs/use_cases/sql/) plugin.

I also considered making DAX queries to [Power BI](https://python.langchain.com/v0.1/docs/integrations/toolkits/powerbi/) models. However, AI tends to hallucinate when you add a couple of joins in SQL, and it gets even worse with a language that has only a fraction of the documentation and popularity. Indeed, results were terrible. I remember using several calls for checking and parsing the code, along with multiple retries.

## The Game Changer: Tools

Then, [OpenAI announced Tools (initially called Function Calling)](https://platform.openai.com/docs/guides/function-calling). Tools allow the latest AI models (3.5 turbo, 4, 4o) to decide whether calling certain functions when needed.

It’s like telling to our GPT, `“Reply to my {QUESTION}, knowing that if I ask about the weather, you can use this {FUNCTION} which needs the city and time as input.”`. This is prompt engineering, as I was saying. The OpenAI ChatCompletion API returns a special object for running the tool and then provides the final response.

This differs from [Retrieval Augmented Generation (RAG)](https://aws.amazon.com/what-is/retrieval-augmented-generation/), where you use a specialized Vector database to search your documents (e.g., Copilot with your email inbox), then pass the best results to the prompt and tell the AI to reply based on the context.

<div style="max-width: 1536px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//iframely.net/ZRkGzjC" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

But not _that_ different. In RAG you search for similar data, find results, then tell the AI, `“Hey, given this {CONTEXT}, reply to my {QUESTION}.”`. **Always remember that it’s all prompt engineering**.

<div style="max-width: 1066px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.1937%;"><iframe src="//iframely.net/ndPoIXx" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

Cool, but getting started wasn’t straightforward. Navigating through hype and buzzwords, overcomplicated solutions (I see you, [semantic-kernel](github.com/microsoft/semantic-kernel/tree/main/python)!), [outdated docs](https://community.openai.com/t/what-is-deference-between-function-call-and-tool-call/686481/3), and useless tutorials was a journey. What I needed was something like this post.

## Getting Started

I’ll keep things simple with “vanilla” OpenAI code. I mostly followed the OpenAI tutorial notebooks and then hit my head on a few common pitfalls (more on this at the end). You can use [Langchain](https://python.langchain.com/v0.1/docs/modules/agents/agent_types/openai_tools/#:~:text=The%20goal%20of%20the%20OpenAI,or%20more%20functions%20as%20tools.) implementations and similar tools, with a prepared list of functions you can install and run.

But in my case, I needed to read our internal database, so I had to build the function from scratch.

```python
def get_order_data(order_code: str) -> str:
	... calling the DB etc, example response 👇
	return json.dumps({
		'order_code': 'TEST123',
		'product': 'Gaming PC',
		'quantity': 10,
		'status': 'IN TRANSIT',
		'ETA': '6/6/2024',
		'customer': 'Test Customer'
	})
```

How can we teach our model to use these functions/tools, and when should it use them? OpenAI defined a standard template that describes what each function does and the parameters to use. You can see how prompt engineering becomes important here. I know that some users are calling order codes ‘order no’, I can specify that in the prompt to help the AI understand.

```python
get_order_data_docs = {
    "type": "function",
    "function": {
        "name": "get_order_data",
        "description": "Use this function to retrieve data about an order",
        "parameters": {
            "type": "object",
            "properties": {
                "order_code": {
                    "type": "string",
                    "description": "Order Code (also called Order No or Number). Format is [A-Z]{10}",
                }
            },
            "required": ["order_code"],
        },
    },
}
```

You can pass this template to the API call like this:

```python
def call_gpt(client, history, tools=None) -> tuple[str, list]:
    """calls the api and updates the history. Returns response and history"""
    chat_response = client.chat.completions.create(
        model=AZURE_OPENAI_DEPLOYMENT_NAME, messages=history, tools=tools, tool_choice="auto" if tools else None
    )
    # you should add better error handling
    response_message = chat_response.choices[0].message
    history.append(response_message.to_dict())
    return response_message, history
 
response_message, history = call_gpt(client, history, tools=[get_order_data_docs])
```

## Working Example

I asked the model about an order, and you can see that as an intermediate step, the ChatCompletion API returned a ‘special object’ called `tool_call` that shows which function to call and with which arguments.

<div style="max-width: 1120px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 13.3976%;"><iframe src="//iframely.net/AgppO6x" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

<div style="max-width: 498px; margin-bottom:3%"><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 24.8193%;"><iframe src="//iframely.net/coypa8w" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>

Note that the model is not executing anything itself; it is merely indicating the function it wants to use. It is then our responsibility to execute the function, adding any necessary data cleaning features or security checks. And then we can pass the results back to the ChatCompletion API to generate the final answer! We have full control.

```python
tool_calls = response_message.tool_calls
if tool_calls:
    print("using a tool 👀")
    response, history = call_tool(tool_calls, client, history)
```

Here are some useful tips to save you some headaches:

- The API evolves, so remember that this is the status as of June 2024.
- Check the examples in the OpenAI tutorial notebooks ([simple](https://github.com/dkhundley/openai-api-tutorial/blob/main/notebooks/function-calling.ipynb) and [advanced](https://github.com/openai/openai-cookbook/blob/main/examples/Function_calling_finding_nearby_places.ipynb)). They are difficult to find and often buried in many other results.
- When using a tool, it’s very important to include the tool call and the tool response in the history (even though they are not real messages) to avoid the infamous ChatCompletion error `Invalid parameter: messages with role 'tool' must be a response to a preceding message with 'tool_calls'.`
- If the function has a date parameter, remember that the model has a knowledge gap stuck in the past. If a user says ‘give me the order for this week,’ the date may default to 2023 or another incorrect date. It’s better to ask the user to provide precise dates or calculate the date within the function.
- Always check the possible questions that could be asked and tweak the template accordingly. That’s 90% of the effort in limiting hallucinations.
- Truncate the conversation and limit the returned payload after a certain number of messages to avoid increasing costs, as all the function results will be passed in the history. It’s better to have several small functions that return a limited amount of data rather than one large, do-it-all function.

## Final Code

The full code is here, stripped to the bare bones. You will need to install the `openai` module and define the keys. Remember to change the keys if using the standard OpenAI client. I hope you find it helpful.

```python
from openai import AzureOpenAI # change to OpenAI depending on your case
import json
from utils.settings import (
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_DEPLOYMENT_NAME,
)

client = AzureOpenAI(
    azure_deployment=AZURE_OPENAI_DEPLOYMENT_NAME,
    azure_endpoint=AZURE_OPENAI_ENDPOINT,
    api_key=AZURE_OPENAI_API_KEY,
    api_version="2024-02-01",
)


def get_order_data(order_code: str) -> dict:
	# ... calling the DB etc, example response 👇
	return json.dumps({
		'order_code': 'TEST123',
		'product': 'Gaming PC',
		'quantity': 10,
		'status': 'IN TRANSIT',
		'ETA': '6/6/2024',
		'customer': 'Test Customer'
	})

get_order_data_docs = {
    "type": "function",
    "function": {
        "name": "get_order_data",
        "description": "Use this function to retrieve data about an order",
        "parameters": {
            "type": "object",
            "properties": {
                "order_code": {
                    "type": "string",
                    "description": "Order Code (also called Order No or Number). Format is [A-Z]{10}",
                }
            },
            "required": ["order_code"],
        },
    },
}

AVAILABLE_TOOLS = {
    "get_order_data": (get_order_data, get_order_data_docs),
}

def call_gpt(client, history, tools=None) -> tuple[str, list]:
    """calls the api and updates the history. Returns response and history"""
    chat_response = client.chat.completions.create(
        model=AZURE_OPENAI_DEPLOYMENT_NAME,
        messages=history,
        tools=tools,
        tool_choice="auto" if tools else None
    )
    response_message = chat_response.choices[0].message
    history.append(response_message.to_dict())
    return response_message, history

def call_tool(tool_calls, client, history) -> tuple[str, list]:
    """If the response has a tool action, we call the api in a slightly different way, adding the function response. Returns response and history"""
    tool_call_id = tool_calls[0].id
    tool_function_name = tool_calls[0].function.name
    tool_query_string = eval(tool_calls[0].function.arguments)

    # Call the function and retrieve results. Append the results to the messages list.
    fun_to_call = AVAILABLE_TOOLS.get(tool_function_name)
    results = fun_to_call[0](**tool_query_string)

    # then call it another time for generating the final answer given the function results
    history.append(
        {
            "role": "tool",
            "tool_call_id": tool_call_id,
            "name": tool_function_name,
            "content": results,
        }
    )
    res = call_gpt(client, history)
    return res



history = [
    {
        "role": "system",
        "content": "Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous.",
    }
]
while True:
    user_input = str(input("\n>"))
    new_message = {"role": "user", "content": user_input}
    history.append(new_message)

    response_message, history = call_gpt(client, history, tools=[get_order_data_docs])
    # tool calls is the special object returned by the ChatCompletion API if the model decided to use a tool
    tool_calls = response_message.tool_calls
    if tool_calls:
        print("using a tool 👀")
        response, history = call_tool(tool_calls, client, history)

    print(history)
```
