const BASE_URL = import.meta.env.VITE_BASE_API_URL


export const checkauth = async () => {
    const response = await fetch(`${BASE_URL}/check-auth/`, 
        {
            credentials: "include",
        })

    if (response.ok) {
        const data = await response.json()
        return data
    } else{
        console.log("Please log in")
    }
}