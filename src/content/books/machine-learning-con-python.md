---
title: Python Machine Learning
author: Sebastian Raschka
image: https://m.media-amazon.com/images/I/71PCVqFXvgL._AC_UF1000,1000_QL80_.jpg
badges:
- "💻 IT"
score: "⭐⭐⭐⭐⭐"
finished: '2020-09-13'
summary: "Pure gold: a dense read with a lot of formulas and code, but very interesting material with a 360-degree view of ML fundamentals. I feel well prepared now and will revisit it in the future!"
showInHome: false
---

The foundation I will return to for the most useful data and formulas if I continue with Machine Learning. The only drawback is the heavy math, which is demanding even though I know it is useful, and the ending, where Deep Learning feels a bit tacked on. Definitely a strong read. Not exactly entertaining, but I raced through some chapters and I feel I have gained a lot of confidence.

I list the chapters to remember where and what to look for.

1. Intro, explains supervised, reinforcement (trial & error, like chess), unsupervised
2. Perceptron '80 single-layer, discusses activation and gradient
3. Gold: classifiers with scikit-learn. Logistic Regression, SVM, KNN with Iris. Introduces kernels
4. Another gem: preprocessing explained well. Missing data, LabelEncoder, Scaler + L1 regularization (and later L2) to simplify and reduce overfitting
5. Dimensionality reduction to cut computational load and overfitting: PCA, LDA (best here), and Kernel PCA
6. Gold: hyperparameter optimization. K-Fold, Grid Search Cross Validation. Pipelines are used
7. Bagging and AdaBoost for combining different models. I did not focus much on this section
8. Basic NLP: bag-of-words on the IMDb dataset
9. Challenging: embedding the model from 7 in a webpage with SQLite. Very interesting
10. Linear regression (already familiar), with Housing. Focus on continuous variables, time series. Introduces R2, polynomial regression, and random tree/forest
11. Gold: clustering. Uses K-means (with RASCAL), hierarchical, and DBSCAN for unusual shapes. Remember silhouette and elbow as techniques to check results when you cannot plot
12. Deep Learning. Starts from the perceptron in 2 and goes deep into backpropagation and related topics
13. Theano & Keras. A bit outdated given TensorFlow, but interesting. I was a bit tired so I should review it; in practice they speed up deep learning with GPU and CPU plus tools