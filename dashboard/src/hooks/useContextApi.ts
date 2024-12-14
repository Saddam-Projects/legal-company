import { context } from '@/components/ContextApi';
import ContextInterface from '@/interfaces/contextInterface';
import { useContext } from 'react';

export default function useContextApi(): ContextInterface {
  return useContext<ContextInterface>(context);
}
