export const MODEL_CONFIG = {
  vocab_size: 32000,
  dim: 768,
  n_layers: 12,
  n_heads: 12,
  max_seq_len: 512,
  hidden_dim_multiplier: 2.66,
  batch_size: 4,
  lr: 3e-4,
};

export const calculateParams = (config: typeof MODEL_CONFIG) => {
  const { vocab_size, dim, n_layers, hidden_dim_multiplier } = config;
  const hidden_dim = Math.floor(dim * hidden_dim_multiplier);
  
  const embeddings = vocab_size * dim;
  const attention = 4 * (dim * dim) * n_layers;
  const ffn = 3 * (dim * hidden_dim) * n_layers;
  
  return embeddings + attention + ffn;
};

export const calculateMemory = (params: number) => {
  const fp16 = (params * 2) / (1024 * 1024); // MB
  const q4 = (params * 0.6) / (1024 * 1024); // MB (approx 4.5 bits per param + overhead)
  return { fp16, q4 };
};
