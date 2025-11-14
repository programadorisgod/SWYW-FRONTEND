// Simple helper for HTTP requests using fetch
// Usage: api.get('/api/notes'), api.post('/api/auth/login', data)

type RequestOptions = RequestInit & { headers?: Record<string, string> };

export const api = {
  get: async (url: string, options: RequestOptions = {}) => {
    const res = await fetch(url, { ...options, credentials: 'include' });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  post: async (url: string, data: any, options: RequestOptions = {}) => {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      credentials: 'include',
      ...options,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  put: async (url: string, data: any, options: RequestOptions = {}) => {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    const res = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      credentials: 'include',
      ...options,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  delete: async (url: string, options: RequestOptions = {}) => {
    const res = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      ...options,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
