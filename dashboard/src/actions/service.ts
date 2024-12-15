import { BANNER_PATH, SERVICE_PATH } from '@/utils/api_path';
import { BASE_API_URL } from '@/utils/constant';

export const getServices = async (limit?: number, offset?: number, keyword?: string, sort?: string) => {
  const args = [];

  if (keyword) {
    args.push(`keyword=${keyword}`);
  }
  if (sort) {
    args.push(`sort=${sort}`);
  }

  if (limit) {
    args.push(`limit=${limit}`);
  }

  if (offset) {
    args.push(`offset=${offset}`);
  }

  let queryParams = '';

  if (args && args.length > 0) {
    queryParams = `?${args.join('&')}`;
  }

  try {
    const response = await fetch(`${BASE_API_URL}${SERVICE_PATH}${queryParams}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const getService = async (id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}${SERVICE_PATH}/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteService = async (id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}${SERVICE_PATH}/${id}/delete`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const createService = async (service: FormData) => {
  try {
    const response = await fetch(`${BASE_API_URL}${SERVICE_PATH}`, {
      method: 'POST',
      body: service,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
export const updateService = async (id: string, service: FormData) => {
  try {
    const response = await fetch(`${BASE_API_URL}${SERVICE_PATH}/${id}/update`, {
      method: 'POST',
      body: service,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
