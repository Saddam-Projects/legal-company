import { uploadFileAction } from '@/actions/fileupload';

const fileUpload = async (formData: FormData, path: string, setLoading: (loading: boolean) => void, setError: (error: string) => void, cb: () => void, id?: string) => {
  try {
    await uploadFileAction(formData, path, id);
    cb();
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }
};

const fileUploaodService = {
  fileUpload,
};

export default fileUploaodService;
