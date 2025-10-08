const BASE_URL= import.meta.env.VITE_BASE_API_URL



async function apiFetchUserTransactions(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

export function getTransactions(){
    return apiFetchUserTransactions('/transactions/')
}