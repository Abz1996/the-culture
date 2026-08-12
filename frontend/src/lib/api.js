const BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with ${res.status}`);
  }
  return res.json();
}

export const api = {
  foods: (params = "") => get(`/foods${params}`),
  culture: () => get(`/culture`),
  regions: () => get(`/regions`)
};
