const useLocalStorage = {
  set: <T>(key: string, data: T) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  },
  read: <T>(key: string): T | null => {
    const result = window.localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  },
  remove: (key: string) => {
    window.localStorage.removeItem(key);
  },
  clear: () => {
    window.localStorage.clear();
  },
};

export default useLocalStorage;
