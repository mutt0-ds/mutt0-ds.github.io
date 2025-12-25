---
title: Clean Code
author: Robert C. Martin
image: https://m.media-amazon.com/images/I/71nj3JM-igL._SL1500_.jpg
badges:
- "💻 IT"
score: "⭐⭐"
finished: '2021-01-17'
summary: 'The Boy Scout Rule: leave the code better than you found it.'
showInHome: false
---

Addendum: https://github.com/zedr/clean-code-python#dependency-inversion-principle-dip

You do not write clean code by following a simple set of rules. You will not become "craftsman developers" by learning a simple list of heuristics. Professionalism and skill come from the values that guide the discipline.

Dense read, with plenty of Java code I did not fully follow, chapters unfamiliar to me, yet solid gems for programming. I will leave the final extract that sums up the advice; overall it seemed a very useful book for a programmer.

## Comments

- No inappropriate info: comments are only for technical explanations of the code
- Remove obsolete comments; they only confuse
- Remove redundant comments; they distract if the code is well written
- Do not keep commented-out code; people leave it in thinking it might be useful. Avoid it.
## Environment (understood little)

- To build, a single command should suffice; you should not have to gather extra files
- Testing should be simple; start it with a single click
## Functions

- THEY MUST DO ONE THING ONLY
- Do not have too many arguments, max 3
- No output arguments (Java-specific); prefer input
- No booleans as arguments; that often means it does more than one thing
- No dead functions (never called); they pollute the code
## General

- Avoid multiple languages in the code even if you can; it creates confusion (like HTML in comments)
- Avoid surprises for a reader: functions should do what you expect
- Do not rely on intuition; set boundaries and explore edge cases
- Do not disable safeguards and warnings; it may work now but causes problems later
- DUPLICATION: REMOVE DUPLICATES; THEY CAN BECOME FUNCTIONS/CLASSES
- Set up abstractions well (Java?)
- Excess information: hide service data, variables, and classes the user should not see if they are background details. They do not need to sit in main if they are not meaningful
- Bury dead code (e.g., except blocks that never run or unnecessary if cases)
- Vertical separation: declare variables just above their first use so you do not have to search
- Inconsistency: adopt the same structure everywhere; be predictable
- Artificial coupling: do not put constants/functions where they do not belong
- Obscured intent: it might seem "cool" to use Hungarian notation or skip spaces, but be understandable
- Misplaced responsibilities: things go where you expect them. const pi will live in a Math class
- Use descriptive variables: names should say what the function or variable does, even if long
- As above, watch for ambiguity: what does addDate do? better use addDaysToDate
- Use self-explanatory constants: in ambiguous cases, assign the number to a new descriptive constant
- Encapsulate conditional constructs: for long if-and-or chains, use a function that returns true or false
- Avoid negatives in conditional constructs: for convenience, do not use negations
- Keep configurable data at higher levels: if a constant might change, keep it in main
- Avoid transitive navigation: modules should not be too intertwined; limit communication among them. Ideally have a central module that queries the others independently
## Java (understood little)

- If you import a lot, use the wildcard (from datetime import *)
- Do not inherit constants: they should not come from some function somewhere; declare them in main
## Names

- CHOOSE DESCRIPTIVE, UNAMBIGUOUS NAMES
- Use standard naming where possible
- Long names are fine, but do not overdo it or you risk confusion
- Avoid encodings like _f or _v (Java)
## Tests

- A test package should contain everything needed to test the program
- Use a coverage tool; it shows which lines are exercised by tests
- Do not skip tests you consider trivial
- An ignored test signals ambiguity
- Consider when problems seem to suggest a pattern
- Tests should be fast