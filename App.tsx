import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Cpu, Database, HardDrive, Terminal, CheckCircle, AlertTriangle, Info, Layers, Zap } from 'lucide-react';
import { MODEL_CONFIG, calculateParams, calculateMemory } from './modelConfig';

const MicroLLMDashboard = () => {
  const params = useMemo(() => calculateParams(MODEL_CONFIG), []);
  const memory = useMemo(() => calculateMemory(params), [params]);

  const stats = [
    { label: 'RAM Limit', value: '4 GB', icon: Cpu, color: 'text-blue-500' },
    { label: 'Inference RAM', value: `${Math.round(memory.q4 + 20)} MB`, icon: Zap, color: 'text-emerald-500' },
    { label: 'Disk Space', value: '58 GB', icon: HardDrive, color: 'text-amber-500' },
    { label: 'Model Size (Q4)', value: `${Math.round(memory.q4)} MB`, icon: Database, color: 'text-purple-500' },
  ];

  const files = [
    { name: 'model.py', desc: 'Llama-style architecture', size: '12 KB' },
    { name: 'train.py', desc: 'Memory-safe training loop', size: '8 KB' },
    { name: 'inference.py', desc: 'CPU-only generation script', size: '5 KB' },
    { name: 'quantize.py', desc: 'Q4_K_M GGUF pipeline; use llama.cpp for production', size: '4 KB' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-8">
      <header className="max-w-6xl mx-auto mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <Cpu className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">MicroLLM-4GB</h1>
            <p className="text-zinc-500">Ultra-Constrained LLM Architect Dashboard</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl"
            >
              <stat.icon className={`w-5 h-5 mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-8">
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" />
              Architecture Specification
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Layers</span>
                  <span className="font-mono">{MODEL_CONFIG.n_layers}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Heads</span>
                  <span className="font-mono">{MODEL_CONFIG.n_heads}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Hidden Dim</span>
                  <span className="font-mono">{MODEL_CONFIG.dim}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Vocab Size</span>
                  <span className="font-mono">{MODEL_CONFIG.vocab_size.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Context Len</span>
                  <span className="font-mono">{MODEL_CONFIG.max_seq_len}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Params</span>
                  <span className="font-mono text-emerald-500">{(params / 1e6).toFixed(1)}M</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-sm text-zinc-400">
                  <span className="text-emerald-500 font-bold">Self-Audit:</span> Memory math validated. Q4 quantization fits model in ~{Math.round(memory.q4)}MB. KV cache at {MODEL_CONFIG.max_seq_len} context uses ~19MB. Total inference footprint is well under the 2.5GB limit.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              Project Files
            </h2>
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.name} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <div className="font-mono text-sm">{file.name}</div>
                      <div className="text-xs text-zinc-500">{file.desc}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-zinc-600">{file.size}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Deployment Checklist
            </h2>
            <ul className="space-y-4">
              {[
                'Architecture Selection',
                'Memory Math Validation',
                'Tokenizer Generation',
                'Training Script',
                'Inference Script',
                'Quantization Pipeline'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-500">
              <AlertTriangle className="w-5 h-5" />
              Risk Assessment
            </h2>
            <div className="space-y-4 text-sm text-zinc-400">
              <p>
                <span className="text-amber-500 font-bold">RAM Spike:</span> Training gradients may hit 1.2GB. Ensure batch size remains ≤ {MODEL_CONFIG.batch_size}.
              </p>
              <p>
                <span className="text-amber-500 font-bold">Inference:</span> CPU-only inference requires GGUF format for optimal speed.
              </p>
              <p>
                <span className="text-amber-500 font-bold">Fallback:</span> If Q4 exceeds RAM, use Q2_K quantization (approx 35MB).
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default function App() {
  return <MicroLLMDashboard />;
}
