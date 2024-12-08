'use client';

export default function useNavigateTo() {
  return (path: string, args?: string) => {
    const link = `${path}?redirect_url=${path.replace('/', '')}&${args}`;
    window.location.href = link;
  };
}
