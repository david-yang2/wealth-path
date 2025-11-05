const BASE_URL= import.meta.env.VITE_BASE_API_URL

async function apiFetchUserTransactions(endpoint, options = {}) {
  // helper to perform the fetch
  async function fetchData() {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...options,
    });
    return response;
  }

  // 1️⃣ first attempt
  let response = await fetchData();

  // 2️⃣ if unauthorized, try refreshing token
  if (response.status === 401) {
    console.warn("Access token expired — attempting refresh...");

    const refreshResponse = await fetch(`${BASE_URL}/token/refresh/`, {
      method: "POST",
      credentials: "include", // send refresh cookie
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!refreshResponse.ok) {
      console.error("Failed to refresh token. Logging out user?");
      throw new Error("Unable to refresh token — please log in again.");
    }

    console.log("Token refreshed successfully — retrying request...");
    // 3️⃣ retry original request
    response = await fetchData();

    if (!response.ok) {
      throw new Error(`API error after refresh: ${response.status}`);
    }
  }

  return response.json();
}


export function getTransactions(){
    return apiFetchUserTransactions('/transactions/')
}

export function getTotals(start_date, end_date){
  // base URL
  let url = "/transactions/totals"

  // array for params
  const params = []
  if (start_date) params.push(`start_date=${start_date}`)
  if (end_date) params.push(`end_date=${end_date}`)
  
  // if there are any params concatenate them
  if (params.length > 0) {
    url += `?${params.join('&')}`
  }

  // use the final URL and fetch
  return apiFetchUserTransactions(url)
}