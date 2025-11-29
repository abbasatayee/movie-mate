import torch.nn as nn

class Encoder(nn.Module):
    """
    Encoder class for an autoencoder neural network.

    This class creates an encoder-decoder (autoencoder) architecture based on the provided
    layer configuration. It supports customizable activation functions and optional dropout 
    on the encoder layers.

    Args:
        L (list): List of integers specifying the sizes of each layer in the encoder.
        activation_fn (str, optional): Activation function to use ('relu', 'lrelu', or 'sigmoid').
                                       Default is 'sigmoid'.
        drop_prob (float, optional): Dropout probability to use for encoder layers. Default is 0.0.
    """

    def __init__(self, L, activation_fn='sigmoid', drop_prob=0.0):
        """
        Initialize the Encoder with a specified architecture, activation function, and dropout.

        Args:
            L (list): List of integers specifying the layer sizes.
            activation_fn (str, optional): Activation function to use ('relu', 'lrelu', 'sigmoid').
            drop_prob (float, optional): Dropout probability for encoder layers.
        """
        super(Encoder, self).__init__()
        layers = self.create_nn_structure(L)
        self.num_layers = len(L)
        self.activation_fn_nm = activation_fn
        self._drop_prob = drop_prob
        if drop_prob > 0.0:
            self.dropout = nn.Dropout(drop_prob)

        self.linears = nn.ModuleList([])
        self.linears.extend([nn.Linear(i[0], i[1]) for i in layers])

    def get_activation_fn(self):
        """
        Returns the activation function specified during initialization.

        Returns:
            nn.Module: Instantiated activation function module.

        Raises:
            ValueError: If activation function name is not recognized.
        """
        if self.activation_fn_nm == 'relu':
            return nn.ReLU()
        elif self.activation_fn_nm == 'lrelu':
            return nn.LeakyReLU()
        elif self.activation_fn_nm == 'sigmoid':
            return nn.Sigmoid()
        else:
            raise ValueError('Activation function type not defined')

    def forward(self, x):
        """
        Defines the forward pass of the autoencoder.

        Passes the input tensor through all layers, applying the chosen activation
        function at each layer except the final decoding layer. Dropout is optionally
        applied to the encoder portion of the network.

        Args:
            x (Tensor): Input tensor.

        Returns:
            Tensor: Output tensor after passing through the autoencoder.
        """
        for i, layer in enumerate(self.linears):
            if i <= self.num_layers - 1:
                # Apply activation function to the output of linear layer
                act_fn = self.get_activation_fn()
                x = act_fn(self.linears[i](x))
                # Apply dropout only to encoder layers (first half)
                if self._drop_prob > 0.0 and i <= int(self.num_layers / 2):
                    x = self.dropout(x)
        # No activation on the last decoding layer
        x = self.linears[-1](x)
        return x

    def create_nn_structure(self, L):
        """
        Constructs the full layer architecture for the autoencoder,
        including both encoder and corresponding decoder layers.

        For a given list L of encoder layer sizes, creates the appropriate
        pairs for nn.Linear layers. Decoder layers are constructed as the 
        mirror image of encoder layers.

        Args:
            L (list): List of integers specifying the encoder layer sizes.

        Returns:
            list: List of (in_features, out_features) tuples for each linear layer.
        """
        max_ind = len(L) - 1
        layers = []
        for i, v in enumerate(L):
            if i < max_ind:
                # Create (input, output) tuple for encoder layer
                layer = [v, L[i + 1]]
                layers.append(layer)
        # Add corresponding decoder layers by reversing the encoder layers
        encoder_layers = layers[:]
        for l in encoder_layers[::-1]:
            decoder_layer = l[::-1]
            layers.append(decoder_layer)
        return layers