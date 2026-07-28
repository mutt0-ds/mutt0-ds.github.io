---
title: Knowledge Graphs
author: Aidan Hogan
image: https://m.media-amazon.com/images/I/61kdTntyW9L._SL1018_.jpg
badges:
- "📊 IT"
- "⚛️ Science"
score: "⭐⭐"
finished: '2026-06-19'
summary: "Knowledge graphs are very powerful for representing relationships where the proximity between nodes matters (e.g., distances or social networks)"
showInHome: false
---

Suggested as a book on knowledge graphs. The topic is fascinating but hard to follow, since the book mostly covered the semantics of graphs and how to represent them. Very technical, somewhat repetitive, but with many useful details. 

## Notes

- Graphs are a natural abstraction for representing entities and their relationships, especially when connections are complex or cyclical
- The biggest advantage over relational databases is schema flexibility. A Knowledge Graph can evolve without defining the complete schema upfront
- Main graph models:
  - Directed edge-labeled graphs: minimal representation
  - Property graphs: attach properties to nodes and edges
  - Heterogeneous graphs: nodes and edges have explicit types
- Choosing between graph models is often more about tooling than theory
- A schema is optional, but still useful to define structure and semantics.
- Three types of schemas:
  - Semantic: defines meaning (ontologies).
  - Validation: enforces constraints (e.g. SHACL).
  - Emergent: automatically extracted from existing data.
- Graphs should use globally unique identifiers to avoid ambiguity.
- RDF literals are typed values (strings, dates, numbers, etc.) and cannot have outgoing edges.
- Open World Assumption (OWA): missing information means unknown, not false
- Closed World Assumption (CWA): what is missing is assumed false -> e.g. if a city has no airport nodes, then they do not exist in reality. This can be risky with stale data.
- Local Closed World Assumption (LCWA): apply CWA only where completeness is known
- Open and closed validation shapes follow the same idea:
  - Open shapes allow additional properties
  - Closed shapes reject unspecified ones
- Ontologies define the semantics of a domain and enable automatic reasoning. Different ontologies can model the same domain differently depending on the desired interpretation.
- OWL is the standard ontology language. But there are different variations.
- Description Logics are built around:
  - Individuals
  - Classes
  - Properties
- Knowledge can be:
  - Deductive: logically inferred.
  - Inductive: statistically predicted with confidence, not certainty.
- Most graph analytics are independent from Knowledge Graph semantics. Common algorithms:
  - Centrality (PageRank, Betweenness)
  - Community detection
  - Connectivity analysis
  - Node similarity
  - Path finding
- Template-based QA maps natural language to predefined query templates.
- Translation-based QA converts questions directly into graph queries.
- QA systems are intuitive but become unreliable for complex questions.
- Quality dimensions to evaluate a knowledge graph include:
  - Accuracy
    - Syntactic accuracy
    - Semantic accuracy
    - Timeliness
  - Coverage
    - Completeness
    - Representativeness
  - Coherency
    - Consistency
    - Validity
  - Succinctness
    - Conciseness
    - Understandability
  - Correction:
    - Fact validation checks whether existing facts are plausible
    - Inconsistency repair removes contradictions using ontological rules
- XML and JSON are often mapped into RDF instead of preserving their tree structure.
- Ontology development should start from Competency Questions: natural language questions the graph must answer.
- Good ontology design is driven by use cases, not by modeling for its own sake.
- Knowledge Graphs trade rigid schemas for flexibility.
- The Open World Assumption changes how "missing data" should be interpreted.
- Ontologies are not just documentation—they enable reasoning.
- Graph analytics usually require simplifying the graph before running algorithms.
- Data quality is multidimensional; correctness alone is not enough.
- Most successful Knowledge Graphs (DBpedia, YAGO, Wikidata) combine structured data, ontologies, and continuous refinement.