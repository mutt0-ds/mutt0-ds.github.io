---
title: "Road to 100% Test Coverage on notion-sdk-py"
date: 2022-12-26
github_link: "https://github.com/mutt0-ds/mutt0-ds.github.io"
image: /images/notion_coverage/title.png
draft: false
author: "Mutt0-ds"
tags:
  - python
  - notion
  - test
  - coverage
  - pytest
---
There is something bizarre with me if two of my favourite activities are writing documentation and hitting my head against tests, which are notoriously unexciting activities for many developers 😫

Luckily, we are all unique in our own way and I decided to contribute to [the testing module](https://codecov.io/github/ramnes/notion-sdk-py) of one of my favorite libraries, [notion-sdk-py](https://github.com/ramnes/notion-sdk-py).

Being [a certified Notion user](https://www.credly.com/badges/f15407b3-5fa8-4d9b-99cf-d862399a1543/public_url), I use its Web App on a daily basis, and the Python library helps me automatically organize my notes. I even used it for custom bots and documentation. If you don’t know [the tool](https://www.notion.so/) yet, I recommend trying it out: it may be a bit more complex compared to a classic note editor like Google Keep or Evernote, but its potential is huge.

For better understanding this article, just keep in mind that Notion is like a wiki: each page is an element, which contains several blocks that could be paragraphs, tables (called databases), subpages or links to other pages. Each Notion element has a unique ID.

![Notion Page](https://cdn.gosquared.com/blog/wp-content/uploads/2020/04/Screenshot-2022-07-20-at-15.38.59.png)

## 🔍 Brief introduction to testing and coverage

Tests are important for making sure that the code does what’s expected to do, by creating functions that simulate common (and uncommon) cases to make sure that the behaviour is always coherent with our expectations. For example, in [notion-sdk-py the tests](https://github.com/ramnes/notion-sdk-py/tree/main/tests) have to create a new page, update its metadata, delete it, compare that all the requests are working. I’m using [pytest](https://docs.pytest.org/en/6.2.x/contents.html) in this article, which is one of the most used testing libraries in Python.

Writing tests is not enough: coverage (ideally) plays an important part. The idea is to count the percentage of lines of code that are executed during test runs. The higher percentage of code is covered, the more likely the program does what it’s supposed to.

At least, in theory: [a 100% coverage doesn’t mean anything if the tests aren’t good](https://www.google.com/search?q=a+100%25+coverage+doesn%27t+mean+anything), as it’s surprisingly easy to write meaningless tests that increase the numbers but aren’t really improving anything. For this reason, it is a common point of view that coverage is basically useless if done with an incorrect approach.

> Achieving a 100% coverage should not be considered the one and only objective, yet improving it is a noble and useful challenge: as you will see, there is a lot to learn…

Example: I have a simple function that checks if a number is positive (True) or zero/negative (False), printing out a statement.

```python
def number_sign_detector(num: int) -> bool:
  if num > 0:
    print('The number is positive')
    return True
  elif num == 0:
    print('The number is zero')
    return False
  else:
    print('The number is negative')
    return False
```

I write down a simple test with pytest:

```python
from main import number_sign_detector

def test_number_sign_detector():
  assert number_sign_detector(1)
  assert not number_sign_detector(-1)
```

![test_passes](https://github.com/mutt0-ds/mutt0-ds.github.io/blob/master/images/notion_coverage/pytest_example.png?raw=true)

100% of the tests (1/1 🤗) passed, in theory my function is solid… Isn’t it?

Well, it could be better. The coverage is 78% because I didn’t consider all the cases that can happen: in this case, if `num==0`.

Luckily, pytest has an option for saving an interactive coverage report with the command `pytest --cov=./path/src/folder --cov-report=term-missing --cov-report=html` where I can quickly see which lines are covered by the tests.

![coverage_report](https://github.com/mutt0-ds/mutt0-ds.github.io/blob/master/images/notion_coverage/coverage.png?raw=true)

## ❓ How can I test Notion API SDK?

I must admit that in my case, creating tests wasn’t trivial: the majority of the [functions in notion-sdk-py](https://github.com/ramnes/notion-sdk-py/blob/main/notion_client/api_endpoints.py) is interacting with Notion servers… Which require an API key and a Notion account with a page where run tests, since almost every element in Notion requires an ID to be queried:

```python
# code for retrieving a page
from notion_client import Client

client = Client(auth=NOTION_API_TOKEN)
response = client.pages.retrieve(page_id=UNIQUE_PAGE_ID)

print(response)
# JSON data...
```

These API calls were initially a big issue for creating reliable tests, as the response depends on the server
 side. A big rule with tests is that they need to be as isolated as possible, minimizing any possible interference from external factors.

There may be a connection issue, for example, or permission issues. Also, if another user wants to execute the test on its pc, they needs to create a testing environment on its own Notion account with a new API key, add the necessary permissions and make sure that the environment is the same for each independent run…Painful, yet still feasible for a library maintainer.

However [notion-sdk-py uses Github Actions in its CI/CD pipeline](https://github.com/ramnes/notion-sdk-py/actions) for running tests on external VMs, complicating things.

Also, many Notion objects are dependent from each other: if I want to test a comment, I must create a block first (that the comment is referring to) and a parent page containing the block. This results is a big sequenceof API calls for creating, updating and deleting objects. How can I simulate them?

![navigation](https://thomasjfrank.com/wp-content/uploads/2021/05/Notion-Complete-Block-Reference.gif)

## 💡 The solution: fixtures

[Fixtures](https://docs.pytest.org/en/6.2.x/fixture.html) are a basic component of testing libraries: like the name says, they are “fixed” elements that are can be used by all the tests that are needing it for generating an initial state.

To use a fixture, we can just add its name as an input parameter of the test function. This is an example of “dependency injection”, a design that aims to isolate the testing phase, which has only the task of checking that something works as expected, and its initiation phase:

```python
import pytest
from notion_client import Client

@pytest.fixture
def client():
  return Client(auth=TOKEN)

def test_a(client):
  # client gets created
  assert client is not None

def test_b(client):
  # another client gets created
  assert client.pages is not None
```

Both tests need a client (which manages all the requests to the Notion API so it is called for many cases): by using the same fixture, both functions have the same (but independent) environment without worrying about its initiation.

I previously said that for testing many functions, I need a parent page first, which has to be manually set up: it can be considered as the initial path. The easiest way to share its ID is with another fixture:

```python
#.. client fixture 
# os.environ['NOTION_PARENT_PAGE'] = "f691a0f9-da72-43bd-94ef-365793610746"

@pytest.fixture
def page_id():
  return os.environ['NOTION_PARENT_PAGE']

def test_pages_delete(client, page_id):
    response = client.blocks.delete(block_id=page_id)
    assert response

def test_pages_retrieve(client, page_id):
    response = client.pages.retrieve(page_id=page_id)
    assert response["object"] == "page"
```

However, if you run the tests in this exact order they will fail. They are sharing the same static fixture, thus the `test_pages_delete` will delete the testing environment before `test_pages_retrieve` will be able of retrieving and updating its data! Sure, we can change their orders, but it is better to fix the issue: each test should not be influenced by the others…

## 💡💡 The upgraded solution: function-scoped fixtures

A [fixture can have the following scopes](https://betterprogramming.pub/understand-5-scopes-of-pytest-fixtures-1b607b5c19ed?gi=fe628b6947b5):

- “session” (one object for all tests)
- “package” (one object for each package)
- “module”: one object for each module (e.g. test_client.py and test_endpoints.py will have one copy each of the fixture)
- “class” (one object for each class)
- “function” (one object for each test, default option)

In this case I used “session” and “function” scopes. The Notion client can be used once for session, for example, to improve efficiency.
The page_id of each test, however, must be generated each time starting from the initial `NOTION_PARENT_PAGE` for granting independency and atomicity: that’s when the “function” scope gets useful. It is the default option for fixtures, but I want to make clear that the functions I’m going to use are being called each time.

For avoiding conflicting tests r, I decided to create unique subpages from the initial parent page. The fixture returns a dynamic Notion ID, which basically a shortcut for generating a new environment page each time a test begins:

```python
# long way
def test_pages_retrieve(client):
    payload = {parent:{"page_id": os.environ['NOTION_PARENT_PAGE']},
              properties:{"title": [{"text": {"content": "Test Page"}}}}
    parent_page_id = client.pages.create(**payload)["id"] 

    assert response["object"] == "page"
    client.blocks.delete(block_id=parent_page_id)
```

```python
# short way
@pytest.fixture(scope="function")
def parent_page_id():
  return os.environ['NOTION_PARENT_PAGE']

@pytest.fixture(scope="function")
def page_id(client, parent_page_id):
  payload = {parent:{"page_id": parent_page_id},
            properties:{"title": [{"text": {"content": "Test Page"}}}}
  response = client.pages.create(**payload)

  yield response["id"] 
  client.blocks.delete(block_id=response["id"])

def test_pages_retrieve(client, page_id):
  # the page_id is generated by the function-scoped fixture
  response = client.pages.retrieve(page_id=parent_page_id)
  assert response["object"] == "page"
  # the parent page is then deleted
```

By using `yield`, I can give the ID of the parent page to the test that is asking for it (which only cares about its specific task), and then deleting it with `client.blocks.delete` before the end. This is a [generator](https://wiki.python.org/moin/Generators), a function that returns a lazy iterator which doesn’t store its content in memory.

With this method, there will be a final step for cleaning up everything and resetting the environment even in case of a failure. Before that, I was finding 20+ new subpages in my personal Notion page and cleaning them up wasn’t very funny 😅

The final solution used the library is a bit more complex, because from a general parent page (session-scoped), depending on each case the module creates a function-scoped subpage containing another function-scoped block, comment or database. In fact, fixtures can call other fixtures and so on. You better check out [the code](https://github.com/ramnes/notion-sdk-py/blob/main/tests/conftest.py) if you are curious.

There is one problem left: we still can’t control the responses of the API… If the connection times out, or a user is not authenticated, the tests will fail.

## 💡📼 The almost-final solution: cassettes

The concept of a [cassette](https://betterprogramming.pub/your-api-tests-must-be-reproducible-6e1c57986f4?gi=119ee926cb4e) is very cool: they are objects that capture an HTTP response and can be rewinded for an undefined number of times as the JSON data is stored locally. This makes tests that are working with external requests reproducible, as the response is always the same, independently from connection or permission issues. Also, they speed up the testing time, as they don’t require a connection anymore.

The plugin [pytest-vcr](https://pytest-vcr.readthedocs.io/en/latest/) integrates cassettes for pytest as a decorator: the decorated test will send a request the first time, save it in a local .yaml file, and use it for all the successive runs.

Sometimes Notion introduces [breaking changes in its API](https://developers.notion.com/reference/changes-by-version), but there is nothing to worry about: we can just update the [“Notion-Version” header](https://github.com/ramnes/notion-sdk-py/blob/5829ae16df7dae6429de22201939c2a443324026/notion_client/client.py#L52) in the request, regenerate the cassettes, and see if there are new issues.

With this methodology, we can stay pretty safe that the cassettes are reliably simulating real requests.

Let’s pick up again the pages_retrieve test:

```python
#.. client and parent page id fixtures

@pytest.mark.vcr()
def test_pages_retrieve(client, page_id):
    response = client.pages.retrieve(page_id=page_id)
    assert response["object"] == "page"
```

Pytest will locally store the response data in YAML format the first time the test is run.

```yaml
interactions:
- request:
  # data about the create request for the parent page
- request:
    body: ''
    headers:
      accept:
      - '*/*'
      accept-encoding:
      - gzip, deflate
      authorization:
      - secret_...
      connection:
      - keep-alive
      host:
      - api.notion.com
      notion-version:
      - '2022-06-28'
    method: GET
    uri: https://api.notion.com/v1/pages/09462f1b-f4a9-4d52-8f9f-3061df0fa937
  response:
    content: '{"object":"page","id":"09462f1b-f4a9-4d52-8f9f-3061df0fa937","created_time":"2022-11-16T15:44:00.000Z","last_edited_time":"2022-11-16T15:44:00.000Z","created_by":{"object":"user","id":"823cf07b-34df-4ae6-9fbc-dbc600a815c6"},"last_edited_by":{"object":"user","id":"823cf07b-34df-4ae6-9fbc-dbc600a815c6"},"cover":null,"icon":null,"parent":{"type":"page_id","page_id":"f691a0f9-da72-43bd-94ef-365793610746"},"archived":false,"properties":{"title":{"id":"title","type":"title","title":[{"type":"text","text":{"content":"Test
      2022-11-16 16:44:37.054647","link":null},"annotations":{"bold":false,"italic":false,"strikethrough":false,"underline":false,"code":false,"color":"default"},"plain_text":"Test
      2022-11-16 16:44:37.054647","href":null}]}},"url":"https://www.notion.so/Test-2022-11-16-16-44-37-054647-09462f1bf4a94d528f9f3061df0fa937"}'
    headers: {}
    http_version: HTTP/1.1
    status_code: 200
- request:
  # data about the delete request for the parent page
```

A few things to highlight:

- The cassette contains all the data about the requests made by `test_pages_retrieve`, including the two “hidden” create and delete by the client fixture. I cut them out here for keeping the post short.
- The test will use the stored response for all the future runs, indpendently by the user, connection, time or zone
- If the code that makes the request changes pytest will throw an error and we will have to recreate a new cassette
- The API Token has to be hidden (like we did [here](https://github.com/ramnes/notion-sdk-py/blob/5829ae16df7dae6429de22201939c2a443324026/tests/conftest.py#L12-L22)) or it will be stored in plain text in the cassette!
- A cassette can’t also be a fixture because the two decorators will interfere

## 🔨 Conclusions

With cassettes and fixtures [I managed to achieve 100% test coverage](https://github.com/ramnes/notion-sdk-py/pull/168) on notion-sdk-py, which was absolutely unthinkable to me just a few weeks before! I learned so much by contributing on the library, and this posts represents a quick sumup of my takeaways. Hopefully it will help you if you will be in my same situation, where I was lost trying to understand how to test something that was so dependant on external sources.

![100_coverage](https://github.com/mutt0-ds/mutt0-ds.github.io/blob/master/images/notion_coverage/final_coverage.png?raw=true)

A big thank to [ramnes](https://github.com/ramnes) for the precious feedbacks, the proofereading and for his amazing library!
