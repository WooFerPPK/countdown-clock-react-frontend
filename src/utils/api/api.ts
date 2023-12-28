import { FetchProps, FetchOptions } from './apiTypes';

const host = 'http://localhost';
const port = '4001';

const fetchData = async ({url, method, headers, body, query}: FetchProps) => {
    
    let fullUrl = `${host}:${port}/${url}`;
    // let fullUrl = `/api/${url}`;
    
    if (query) {
        const queryString = new URLSearchParams(query).toString();
        fullUrl = `${fullUrl}?${queryString}`;
    }
    
    let options: FetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
    };
    
    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(fullUrl, options);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message}`);
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`Network Error: ${error.message}`);
    }
};

export default fetchData;