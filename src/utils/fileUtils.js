import initialData from '../data/data.json';

const API_BASE_URL = 'http://localhost:4005/api';

export const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.data || data; // Return data.data if it exists, otherwise return the whole response
};

export const apiGet = async (endpoint, queryParams = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
  const response = await fetch(url);
  return handleResponse(response);
};

export const apiPost = async (endpoint, body) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

export const apiPut = async (endpoint, body) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

export const apiDelete = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const getData = async () => {
  try {
    return await apiGet('/data');
  } catch (error) {
    console.error('Error reading data:', error);
    return initialData;
  }
};

export const writeData = async (newData) => {
  try {
    return await apiPut('/data', newData);
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};
