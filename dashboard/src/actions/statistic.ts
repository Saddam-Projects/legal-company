import { STATISTIC_PATH } from '@/utils/api_path';
import { BASE_API_URL } from '@/utils/constant';

export const getStatistic = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}${STATISTIC_PATH}`, {
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
