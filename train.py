import torch
from model import MicroLlama
import os

# Config (Deliverable 2)
CONFIG = {
    "vocab_size": 32000,
    "dim": 768,
    "n_layers": 12,
    "n_heads": 12,
    "max_seq_len": 512,
    "batch_size": 4, # Small batch for 4GB RAM
    "lr": 3e-4
}

def train():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Training on {device}")
    
    model = MicroLlama(**{k: v for k, v in CONFIG.items() if k not in ["batch_size", "lr"]}).to(device)
    optimizer = torch.optim.AdamW(model.parameters(), lr=CONFIG["lr"])
    
    # Dummy training loop (Deliverable 5)
    # In a real scenario, use a DataLoader with the corpus
    for epoch in range(10):
        # Simulated batch: [Batch, SeqLen]
        input_ids = torch.randint(0, CONFIG["vocab_size"], (CONFIG["batch_size"], CONFIG["max_seq_len"])).to(device)
        labels = input_ids.clone()
        
        optimizer.zero_grad()
        logits, loss = model(input_ids, labels)
        loss.backward()
        optimizer.step()
        
        print(f"Epoch {epoch}, Loss: {loss.item():.4f}")
        
        # Save checkpoint
        if epoch % 5 == 0:
            if not os.path.exists("model"): os.makedirs("model")
            torch.save(model.state_dict(), f"model/checkpoint_{epoch}.pt")

if __name__ == "__main__":
    train()
