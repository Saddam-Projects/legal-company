import { REFERENCE_PATH } from '@/utils/api_path';
import { BASE_API_URL } from '@/utils/constant';

export const getReference = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}${REFERENCE_PATH}`, {
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
