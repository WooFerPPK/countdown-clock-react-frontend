export interface FetchProps {
    url: string,
    method: string,
    headers?: {},
    body?: {},
    query?: {}
}

export interface FetchOptions {
    method: string,
    headers: {},
    body?: string
}