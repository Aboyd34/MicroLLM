import os
from tokenizers import Tokenizer
from tokenizers.models import BPE
from tokenizers.trainers import BpeTrainer
from tokenizers.pre_tokenizers import Whitespace

def train_tokenizer(corpus_path, output_path):
    # Initialize a tokenizer with BPE model
    tokenizer = Tokenizer(BPE(unk_token="[UNK]"))
    tokenizer.pre_tokenizer = Whitespace()

    # Trainer configuration
    trainer = BpeTrainer(
        vocab_size=32000,
        special_tokens=["[UNK]", "[CLS]", "[SEP]", "[PAD]", "[MASK]"]
    )

    # Train from file
    tokenizer.train(files=[corpus_path], trainer=trainer)

    # Save the tokenizer
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    tokenizer.save(os.path.join(output_path, "tokenizer.json"))
    print(f"Tokenizer saved to {output_path}")

if __name__ == "__main__":
    # Create a dummy corpus for demonstration
    with open("data/corpus.txt", "w") as f:
        f.write("The quick brown fox jumps over the lazy dog. ")
        f.write("MicroLLM is a small but powerful language model. ")
        f.write("It runs on 4GB of RAM and uses a Llama-style architecture. ")
    
    train_tokenizer("data/corpus.txt", "tokenizer")
