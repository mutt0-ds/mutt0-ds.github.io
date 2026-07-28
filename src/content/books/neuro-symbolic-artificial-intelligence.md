---
title: Neuro-Symbolic Artificial Intelligence
author: Bikram Pratim Bhuyan
image: https://m.media-amazon.com/images/I/61yFRGVzFzL._AC_UF1000,1000_QL80_.jpg
badges:
- "📊 IT"
score: "⭐⭐⭐"
finished: '2026-07-05'
summary: "NeSy combines the best of LLMs with rule-based algorithms, for many benefits, first and foremost the explainability of the result."
showInHome: false
---

One of the books on ontology and NeSy. It is a dense read, but worth a chance.

Surprisingly, the opening provides an excellent overview of AI and the various machine learning models, and how they intersect with deterministic, rule-based models. There is less substance toward the end, where it moves into more abstract concepts. The last 30% felt repetitive, but I noted many promising names to explore. It was time well spent.

## Notes

- Neuro-Symbolic AI (NeSy) tries to combine neural networks, which are great at learning from data, with symbolic AI, which is good at explicit reasoning, logic and explainability.
- The whole idea is basically System 1 + System 2. Fast intuition plus slow reasoning. This is probably the best mental model for understanding NeSy.
- Pure deep learning is amazing at perception but still struggles with common sense, compositional reasoning, planning and explainability. Symbolic systems solve many of these problems but cannot learn efficiently from raw data.
- One of the strongest motivations for NeSy is explainability. Instead of a black box prediction, symbolic reasoning can expose the reasoning chain.
- Knowledge should be viewed as a hierarchy: Data → Information → Knowledge → Wisdom (DIKW pyramid).
### Knowledge representation

- Semantic Networks. Classic graph representation of concepts and relationships. Still relevant for NLP and ontologies.
- Frames. Minsky's representation for structured objects with attributes. Basically object-oriented thinking before OOP became mainstream.
- Production Rules. The classic IF → THEN expert systems.
- Conceptual Graphs. Graph representation bridging natural language and logic.
- Ontologies. Probably one of the most useful concepts. Formal representations of a domain with entities, properties and relationships. OWL is the standard language and still heavily used in Knowledge Graphs.
### Logic

- Propositional Logic is the foundation of rule-based reasoning.
- First Order Logic (FOL) is much more expressive but has important limitations:
  - undecidable in the general case
  - weak at uncertainty
  - weak at common sense reasoning
  - monotonic by default
- Second Order Logic extends FOL by allowing reasoning over sets, relations and functions.
- Description Logic is widely used in ontologies because it provides a good compromise between expressiveness and tractability.
### Knowledge Graphs

- Probably one of the most practical topics in the book.
- Rules + ontologies allow deduction over graphs.
- OWL + RDF are the standard stack.
- Modern Knowledge Graphs combine symbolic reasoning with learned embeddings.
- Graph analytics, PageRank, Knowledge Graph Embeddings and Graph Neural Networks all complement symbolic reasoning rather than replacing it.
### Neural architectures

- Feedforward Neural Networks remain the basic building block.
- CNNs are specialized for images.
- RNNs process sequences but suffer from vanishing and exploding gradients.
- LSTMs solve many RNN limitations and are an interesting bridge toward symbolic reasoning because of their memory.
- Spiking Neural Networks (SNNs) are biologically inspired and naturally fit discrete symbolic information.
- Graph Neural Networks (GNNs) are probably the most interesting architecture in the book. They naturally operate on graphs instead of grids and seem like a great fit for symbolic structures.
- Graph Attention Networks (GATs) extend GNNs with attention over neighboring nodes.
- Message Passing Neural Networks (MPNNs) are another family worth exploring.
- Geometric Deep Learning extends neural networks to graphs and manifolds and feels like an important direction.
### Models and architectures worth exploring

- DeepProbLog. Neural networks combined with probabilistic logic programming.
- IBM SOFAI. Inspired by Kahneman's Thinking, Fast and Slow. Multiple planners with a metacognitive controller.
- AlphaGo. Probably the canonical Neuro-Symbolic example. Monte Carlo Tree Search with neural evaluation.
- Neuro-Symbolic Concept Learner (NSCL).
- Neuro-Vector-Symbolic Architecture (NVSA).
- Logical Neural Networks (LNNs).
- Logic Tensor Networks (LTN).
- KENN (Knowledge Enhanced Neural Networks).
- Semantic-Based Regularization (SBR).
- DL2.
- MultiplexNet.
- Relational Neural Networks (RNM).
- Tensor Product Representations.
- Pointer Networks.
- TREPAN, for extracting decision trees from trained neural networks.
- REANN, for rule extraction and pruning from neural networks.
### Henry Kautz taxonomy

The taxonomy was one of the most interesting parts of the book.

- Type 1. Symbolic → Neural → Symbolic. Standard NLP pipeline where symbols become embeddings and then symbols again.
- Type 2. Symbolic[Neural]. Neural networks are components inside symbolic systems. AlphaGo is the classic example.
- Type 3. Neuro → Symbolic. Neural perception produces symbolic representations for reasoning. Probably one of the most promising architectures today.
- Type 4. Symbolic knowledge becomes part of the training process.
- Type 5. Symbolic rules become differentiable constraints inside the loss function. Logic Tensor Networks are an example.
- Type 6. Neuro[Symbolic]. A symbolic reasoning engine embedded inside a neural system. According to Kautz this is the long-term goal and no complete implementation exists yet.
### Applications (several examples given)

- Robotics
- Medical diagnosis
- Question answering
- Programming assistants
- Scientific computing
- Computer vision
- Finance
- Social network analysis
- Environmental monitoring
### Main challenges

- Combining neural learning and symbolic reasoning without making the system too complex.
- Scaling symbolic reasoning to real-world datasets.
- Keeping interpretability while maintaining neural performance.
- Achieving true common sense and combinatorial reasoning.
### Biggest takeaway

- The book reinforced the idea that AGI probably won't come from scaling LLMs forever. The most convincing direction seems to be systems where neural models handle perception and learning, while symbolic components perform reasoning, planning and verification.
- If I had to pick a few rabbit holes to explore after this book, they would be Graph Neural Networks, Knowledge Graphs, Logic Tensor Networks, DeepProbLog, Neuro-Symbolic Concept Learner, IBM SOFAI and Henry Kautz's taxonomy. Those came up repeatedly and feel like the foundations of the field.