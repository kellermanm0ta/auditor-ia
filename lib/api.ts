const BASE = '/api';

export async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}

export async function poster<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}

export async function deleter<T>(path: string): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function putter<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}