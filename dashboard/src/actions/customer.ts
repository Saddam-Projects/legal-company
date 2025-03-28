import { CustomerDto } from '@/dtos/customer';
import { CUSTOMER_PATH } from '@/utils/api_path';
import { BASE_API_URL } from '@/utils/constant';

export const getCustomersData = async (limit?: number, offset?: number, keyword?: string, sort?: string) => {
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
    const response = await fetch(`${BASE_API_URL}${CUSTOMER_PATH}${queryParams}`, {
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

export const getCustomerData = async (id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}${CUSTOMER_PATH}/${id}`, {
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

export const deleteCustomer = async (id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}${CUSTOMER_PATH}/${id}/delete`, {
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
export const createCustomer = async (customer: CustomerDto) => {
  try {
    const response = await fetch(`${BASE_API_URL}${CUSTOMER_PATH}`, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json',
      },
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

export const updateCustomer = async (customer: CustomerDto, id: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}${CUSTOMER_PATH}/${id}/update`, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json',
      },
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
