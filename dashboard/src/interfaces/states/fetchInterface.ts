type data<T> = T | null;
type isLoading = boolean;
type error = string;

export default interface FetchInterface<T> {
  isLoading: isLoading;
  error: error;
  data: data<T>;
  setIsLoading: React.Dispatch<React.SetStateAction<isLoading>>;
  setError: React.Dispatch<React.SetStateAction<error>>;
  setData: React.Dispatch<React.SetStateAction<data<T>>>;
  fetch?: (args?: string[]) => void;
}
