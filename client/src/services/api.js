const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const signUp = async (data) => {
    const response = await fetch(`${API_URL}/signup`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data),
    });
    return response.json();
};

export const signIn = async (data) => {
    const response = await fetch(`${API_URL}/signin`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data),
    });
    return response.json();
};

export const getProducts = async (token) => {
    const response = await fetch(`${API_URL}/products`,{
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        // log the error body so you can see why it failed
        console.error('getProducts failed:', await response.text());
        return [];
      }
    return response.json();
};