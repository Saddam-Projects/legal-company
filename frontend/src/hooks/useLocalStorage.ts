const useLocalStorage = {
  set: <T>(key: string, data: T) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
  read: <T>(key: string): T | null => {
    const result = window.localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  },
};

export default useLocalStorage;
