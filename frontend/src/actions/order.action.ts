'use server';
import { OrderDto } from '@/dtos/order';
import { API_ORDER } from '@/utils/api_path';
import { BASE_API_URL } from '@/utils/constant';

const create = async (dto: OrderDto, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
  setLoading(true);
  try {
    console.log(dto);

    const response = await fetch(`${BASE_API_URL}${API_ORDER}`, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};

const orderAction = {
  create,
};
export default orderAction;
