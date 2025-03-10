type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions {
  requireAuth?: boolean;
  method?: RequestMethod;
  body?: any;
}

const API_BASE_URL = 'http://localhost:8000'; // Base URL for all API requests

export async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { requireAuth = false, method = 'GET', body } = options;
  
  // Build the full URL
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // Build headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Add auth token if required
  if (requireAuth) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Error accessing token:', error);
      throw new Error('Authentication required');
    }
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
  try {
    console.log(`Making ${method} request to: ${url}`);
    const response = await fetch(url, requestOptions);
    
    // Handle non-JSON responses (like 204 No Content)
    if (response.status === 204) {
      return {} as T;
    }
    
    // Parse the response
    const data = await response.json();
    
    // Handle API errors
    if (!response.ok) {
      console.error(`API error (${response.status}):`, data);
      throw new Error(data.detail || data.error || `API request failed with status ${response.status}`);
    }
    
    return data as T;
  } catch (error) {
    console.error(`API request error for ${url}:`, error);
    throw error;
  }
}

// Helper methods for common API operations
export const api = {
  get: <T>(endpoint: string, requireAuth = false) => 
    apiRequest<T>(endpoint, { method: 'GET', requireAuth }),
  
  post: <T>(endpoint: string, body: any, requireAuth = false) => 
    apiRequest<T>(endpoint, { method: 'POST', body, requireAuth }),
  
  put: <T>(endpoint: string, body: any, requireAuth = false) => 
    apiRequest<T>(endpoint, { method: 'PUT', body, requireAuth }),
  
  delete: <T>(endpoint: string, requireAuth = false) => 
    apiRequest<T>(endpoint, { method: 'DELETE', requireAuth }),
};