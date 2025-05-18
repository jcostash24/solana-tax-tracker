
'use client';
import { useState } from 'react';

export default function Home() {
  const [wallet, setWallet] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/helius?address=${wallet}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Error al consultar datos de Helius' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Solana Tax Tracker</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Ingresa tu dirección de Solana"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Consultando...' : 'Consultar'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 border border-gray-300 rounded w-full max-w-md text-sm whitespace-pre-wrap">
          {result.error ? (
            <span className="text-red-500">{result.error}</span>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
    </main>
  );
}
