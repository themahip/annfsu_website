export const BASE_URL = 'http://localhost:8000';
export const API_BASE_URL = `${BASE_URL}/api`;
export const UPLOADS_URL = `${BASE_URL}/uploads`;
export const AUTH_TOKEN_KEY = 'auth_token';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
};

// News endpoints
export const NEWS_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/news`,
  GET_ONE: (id: string) => `${API_BASE_URL}/news/${id}`,
  CREATE: `${API_BASE_URL}/news`,
  UPDATE: (id: string) => `${API_BASE_URL}/news/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/news/${id}`,
}; 