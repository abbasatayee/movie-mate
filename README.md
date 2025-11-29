# Movie Mate 🎬

A movie recommendation system using autoencoder neural networks, built as part of a thesis project. This project implements a collaborative filtering approach using deep learning to predict user ratings and generate personalized movie recommendations.

## Overview

Movie Mate leverages autoencoder architectures to learn compressed representations of user-item rating matrices. The model learns to reconstruct user ratings from sparse input data, enabling it to predict ratings for movies users haven't seen yet and generate top-k recommendations.

## Features

- **Autoencoder-based Recommendation System**: Deep learning model that learns user preferences from rating patterns
- **MovieLens 1M Dataset Support**: Pre-configured to work with the MovieLens 1M dataset (1,000,209 ratings from 6,040 users on ~3,900 movies)
- **Flexible Architecture**: Customizable encoder-decoder layers with configurable activation functions and dropout
- **Top-K Recommendations**: Generate personalized movie recommendations for users
- **Data Preprocessing Utilities**: Tools for dataset download and user/item reindexing

## Project Structure

```
movie-mate/
├── data/
│   └── mv-lens-1m/          # MovieLens 1M dataset
│       ├── movies.dat       # Movie metadata
│       ├── ratings.dat      # User ratings
│       ├── users.dat        # User demographics
│       └── README           # Dataset documentation
├── src/
│   ├── autoencoder/
│   │   └── autoencoder.ipynb    # Main training notebook
│   ├── models-architecture/
│   │   └── autoencoder.py       # Encoder model implementation
│   └── utils/
│       └── preprocessor.py      # Data preprocessing utilities
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Installation

1. **Clone the repository** (if applicable):

   ```bash
   git clone <repository-url>
   cd movie-mate
   ```

2. **Create a virtual environment** (recommended):

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### 1. Download Dataset

The dataset can be downloaded using the preprocessing utilities:

```python
from src.utils.preprocessor import download_dataset_from_kaggle

# Download MovieLens 1M dataset
download_dataset_from_kaggle('dataset-name', path='data')
```

### 2. Train the Model

Open and run the Jupyter notebook:

```bash
jupyter notebook src/autoencoder/autoencoder.ipynb
```

The notebook includes:

- Data loading and preprocessing
- User/item reindexing
- Train/test split
- Model training with PyTorch
- Evaluation and recommendation generation

### 3. Generate Recommendations

After training, use the `make_top_k_recommendations` function to generate personalized recommendations:

```python
recommendations = make_top_k_recommendations(
    encoder=autoencoder_network,
    evidence=training_set,
    k=10,  # Top 10 recommendations
    filter_seen=True  # Exclude already-rated movies
)
```

## Model Architecture

The autoencoder consists of:

- **Encoder**: Compresses user rating vectors into a lower-dimensional latent space
- **Decoder**: Reconstructs the original rating vector from the latent representation

**Default Configuration**:

- Input layer: Number of movies (sparse rating vector)
- Hidden layers: `[nb_movies, 20, 10]` (encoder) → `[10, 20, nb_movies]` (decoder)
- Activation: Sigmoid (configurable: ReLU, LeakyReLU, or Sigmoid)
- Dropout: 0.1 (on encoder layers)
- Loss function: Mean Squared Error (MSE)
- Optimizer: RMSprop (learning rate: 0.01, weight decay: 0.5)

The model learns to predict ratings by minimizing reconstruction error, focusing only on movies the user has actually rated during training.

## Dataset

This project uses the **MovieLens 1M Dataset**:

- **Ratings**: 1,000,209 anonymous ratings
- **Users**: 6,040 MovieLens users
- **Movies**: ~3,900 movies
- **Rating Scale**: 1-5 stars (whole stars only)
- **Sparsity**: Each user has at least 20 ratings

### Dataset Format

- **ratings.dat**: `UserID::MovieID::Rating::Timestamp`
- **movies.dat**: `MovieID::Title::Genres`
- **users.dat**: `UserID::Gender::Age::Occupation::Zip-code`

For more information, see the [MovieLens Dataset Documentation](https://grouplens.org/datasets/movielens/1m/).

## Dependencies

Key dependencies include:

- **PyTorch** (2.8.0): Deep learning framework
- **Pandas** (2.3.3): Data manipulation
- **NumPy** (2.0.2): Numerical computations
- **Jupyter**: Interactive notebook environment
- **scikit-learn**: Train/test splitting
- **kagglehub**: Dataset download utilities
- **rich**: Enhanced terminal output

See `requirements.txt` for the complete list of dependencies.

## Preprocessing Utilities

### `reindexer()`

Reindexes user and item IDs to sequential integers starting from 1, which is required for efficient matrix operations.

```python
from src.utils.preprocessor import reindexer

ratings_reindexed = reindexer(
    ratings_df=ratings_df,
    user_col='userid',
    item_col='itemid',
    rating_col='rating'
)
```

### `download_dataset_from_kaggle()`

Downloads datasets from Kaggle and organizes them in the project structure.

## Training Process

1. **Data Loading**: Load ratings from `ratings.dat`
2. **Reindexing**: Map user and item IDs to sequential indices
3. **Train/Test Split**: 90/10 split stratified by users
4. **Matrix Construction**: Convert sparse ratings to dense user-item matrices
5. **Training**: Train autoencoder for multiple epochs
6. **Evaluation**: Compute test loss on held-out data
7. **Recommendations**: Generate top-k recommendations for each user

## Results

The model achieves:

- **Training Loss**: ~0.975 (RMSE)
- **Test Loss**: ~0.952 (RMSE)

These metrics represent the root mean squared error between predicted and actual ratings.

## Citation

If you use the MovieLens dataset, please cite:

> F. Maxwell Harper and Joseph A. Konstan. 2015. The MovieLens Datasets: History and Context. ACM Transactions on Interactive Intelligent Systems (TiiS) 5, 4, Article 19 (December 2015), 19 pages. DOI=http://dx.doi.org/10.1145/2827872

## License

This project is part of a thesis research project. The MovieLens dataset is provided for research purposes only. See the dataset README in `data/mv-lens-1m/README` for usage terms.

## Contributing

This is a thesis project. For questions or suggestions, please contact the project maintainer.

## Acknowledgments

- GroupLens Research at the University of Minnesota for providing the MovieLens dataset
- PyTorch community for the excellent deep learning framework
