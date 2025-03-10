type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions {
  requireAuth?: boolean;
  method?: RequestMethod;
  body?: any;
}

export async function apiRequest<T>(url: string, options: ApiOptions = {}): Promise<T> {
  const { requireAuth = false, method = 'GET', body } = options;
  
  // Build headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Add auth token if required
  if (requireAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Build request options
  const requestOptions: RequestInit = {
    method,
    headers,
  };
  
  // Add body for non-GET requests
  if (method !== 'GET' && body) {
    requestOptions.body = JSON.stringify(body);
  }
  
  // Make the request
  const response = await fetch(url, requestOptions);
  
  // Parse the response
  const data = await response.json();
  
  // Handle API errors
  if (!response.ok) {
    throw new Error(data.detail || data.error || 'API request failed');
  }
  
  return data as T;
}