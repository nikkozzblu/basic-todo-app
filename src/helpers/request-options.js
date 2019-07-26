export function requestOptions(method, body) {
    return {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    };
}
