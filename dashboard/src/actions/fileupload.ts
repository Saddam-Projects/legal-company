import { BASE_API_URL } from '@/utils/constant';

export const uploadFileAction = async (formData: FormData, path: string, id?: string) => {
  let url = `${BASE_API_URL}${path}`;

  if (id) {
    url += `/${id}/update`;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw error;
  }
};
