import torch.nn as nn
import torch

class NeuralCollaborativeFramework(nn.Module):
    def __init__(self, num_users, num_items, embedding_size = 32 , hidden_layers = (64,32,16,8) , dropout_rate = None, output_range = (1,5)):
        super().__init__()
        # Embeding Size
        self.user_hash_size = num_users
        self.movie_hash_size = num_items

        # Model Architecture component
        self.user_embedding = nn.Embedding(num_users, embedding_size)
        self.movie_embedding = nn.Embedding(num_items, embedding_size)

        # MLP
        self.MLP = self._gen_MLP(embedding_size, hidden_layers, dropout_rate)

        # Add dropout rate to prevent overfitting and memorization
        if(dropout_rate):
          self.dropout = nn.Dropout(dropout_rate)

        assert output_range and len(output_range) == 2 , "output_range has to be a tuple with two integers"

        self.norm_min = min(output_range)
        self.norm_range = abs(output_range[0] - output_range[1]) + 1

        self.__init_params()



    def _gen_MLP(self, embedding_size, hidden_layers_units, dropout_rate):
      # Generate the MLP portion of the model architecture

      assert (embedding_size * 2) == hidden_layers_units[0] , "First input layer number of units has to be equal to twice the embedding size!"


      hidden_layers = []
      input_layers = hidden_layers_units[0]

      for num_units in hidden_layers_units[1:]:
        hidden_layers.append(nn.Linear(input_layers, num_units))
        hidden_layers.append(nn.ReLU())

        if(dropout_rate):
          hidden_layers.append(nn.Dropout(dropout_rate))

        input_layers = num_units

      hidden_layers.append(nn.Linear(hidden_layers_units[-1], 1))
      hidden_layers.append(nn.Sigmoid())

      return nn.Sequential(*hidden_layers)


    def __init_params(self):
      # Initialize model Parameters
      def weight_units(m):
        if type(m) == nn.Linear:
          nn.init.xavier_uniform_(m.weight)
          m.bias.data.fill_(0.01)

      self.user_embedding.weight.data.uniform_(0, 0.05)
      self.movie_embedding.weight.data.uniform_(0, 0.05)
      self.MLP.apply(weight_units)


    def forward(self , user_id , movie_id):
      # Computes Forward Pass
      user_features = self.user_embedding(user_id % self.user_hash_size )
      movie_features = self.movie_embedding(movie_id % self.movie_hash_size)


      x = torch.cat([user_features , movie_features] , dim = 1)
      if hasattr(self, 'dropout'):
        x = self.dropout(x)

      x = self.MLP(x)

      normalized_output =  x * self.norm_range + self.norm_min

      return normalized_output






if __name__ == "__main__":
    ncf = NeuralCollaborativeFramework(20 , 30)
    print(ncf)

