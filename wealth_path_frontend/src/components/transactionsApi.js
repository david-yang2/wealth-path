const USER_TRANSACTION_LIST_API = import.meta.env.VITE_USER_TRANSACTIONS



async function apiFetchUserTransactions(endpoint, options = {}) {
  const response = await fetch(`${USER_TRANSACTION_LIST_API}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

export function getTransactions(){
    return apiFetchUserTransactions('')
}