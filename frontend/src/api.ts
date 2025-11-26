// frontend/src/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE_URL at runtime:', API_BASE_URL);

export async function fetchHealth() {
  const res = await fetch(`${API_BASE_URL}/api/health`);
  if (!res.ok) {
    throw new Error('Failed to fetch health');
  }
  return res.json() as Promise<{ status: string }>;
}