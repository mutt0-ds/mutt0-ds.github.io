---
title: AI Engineering
author: Chip Huyen
image: https://m.media-amazon.com/images/I/815KH9GjFTL._SL1500_.jpg
badges:
- "💻 IT"
score: "⭐⭐⭐⭐⭐"
finished: '2026-08-28'
summary: ''
showInHome: false
---

Recommended as one of the most complete books on AI, I think this is the most solid preparation on the topic one can find, considering it's already a couple of years old at the time of the writing! Massive collection of information, from the basics to advanced topics like RAG, Architecture, Quantization and Inference. Chip goes really in-depth, and while I felt a bit bored in the initial part, the more I went home, the more I was hooked. Most of the concepts were familiar, but the book opened a lot of possibilities and rabbit holes for more studies and discoveries. Loved it. I will recommend it for anyone that seriously wants to become AI Engineer, even though several sections are extremely advanced.

## Notes

- The first question, and the most skipped one: should you build it at all?
- More data is not automatically better. A model trained on less but high quality data can beat one trained on a mountain of garbage
- Attention = query, key, value. The query is the person looking for info, the keys are the page numbers, the values are the actual content of the pages. Best analogy I've read on the topic
- A transformer block = attention module (query, key, value, output projection) + MLP (linear layers separated by nonlinear activations like ReLU or GELU). The activation functions themselves are embarrassingly simple
- Model size in parameters can lie: a 7B model that is 90% sparse only has 700M non-zero params. A big sparse model can need less compute than a small dense one
- Scaling law: you don't pick a model size and then discover the bill. You start from the budget and work backwards to the best performance you can afford
- Training datasets grow much faster than new data is generated. If you ever put anything online, assume it's already in someone's training set. Same as being indexed by Google, consent not included
- Pre-training is reading to acquire knowledge, post-training is learning how to use it. Users don't care about token-level quality, they care about the whole answer
- RLHF needs a reward model, and the hard part is the data: the same labeler can score the same (prompt, response) differently twice. Comparisons scale better than absolute scores
- Temperature squashes common tokens and lifts rare ones, that's where "creativity" comes from
- Foundation models are aggregations of the opinions of the masses. Anything with non-zero probability can come out, no matter how wrong. Great for creative tasks, terrible for consistency. Most of AI engineering is harnessing and mitigating this
- Entropy = how hard it is to predict what comes next. Cross entropy = how hard it is for this model on this dataset. Perplexity is also useful for data processing, not just eval
- AI as a judge is subjective and unstable: if the judge model or its prompt changes silently, you'll blame your app for a regression that came from the judge. Never trust a judge you can't see the model and prompt of
- Not all questions should be answered by preference. "Is there a link between phone radiation and brain tumors?" has a correct answer, not a popular one. Training on preference where correctness matters = misaligned model
- Evaluation-driven development: define how you'll evaluate before you build, like TDD. Investments in eval still lag way behind investments in building
- Data contamination has a lot of aliases: data leakage, training on the test set, or simply cheating
- Host vs API: seven axes, data privacy, data lineage, performance, functionality, cost, control, on-device
- Prompt engineering gets hacky fast ("Q:" instead of "Question:", promising a $300 tip). Works on weak models, ages badly as models get better at following instructions
- RAG retrieval: TF-IDF combines term frequency and inverse document frequency. Still a solid baseline, hybrid search is usually the right answer
- Evaluate a RAG system both component by component and end to end: retrieval quality, final output quality, and the embeddings themselves
- Chunks lose context. Augment each chunk with the doc title and summary (Anthropic generates them with a model). Cheap trick, big win
- Choosing a retrieval solution: which mechanisms, hybrid search, scalability in storage and traffic, indexing time, bulk ops, query latency per algorithm, and the pricing structure
- An agent is anything that perceives its environment and acts on it. So it's defined by its environment and by the set of actions it can take
- Finetuning itself is easy, the frameworks do it for you. The hard part is everything around it, starting from whether you should finetune at all, or just do RAG
- Dataset design is simple in principle: think about the behaviors you want the model to learn, then design data that shows those behaviors. Three criteria across every phase: quality, coverage, quantity. Since good data is so hard to get, everyone is turning to synthetic data
- Inference latency splits into TTFT (prefilling) and TPOT (decoding). Throughput maps to cost, and there's always a latency/throughput tradeoff
- Two levels of optimization: model level (quantization, distillation, attention kernels, KV cache) changes the model and possibly its behavior; service level (batching, parallelism, prefill/decode decoupling, prompt caching) keeps the model intact
- The techniques that pay off most across use cases: quantization, tensor parallelism, replica parallelism, attention optimization
- Which one you need depends on the workload. KV caching matters for long contexts, prompt caching matters for overlapping prompts and multi-turn chats
- Every component you add makes the system more capable, safer or faster, and also more complex and exposed to new failure modes. Observability = knowing how it fails, and designing so failures are detectable and traceable
- The conversational interface unlocks new kinds of user feedback. Feedback design used to be a product problem, now engineers care because it feeds the data flywheel. AI engineering keeps moving closer to product
