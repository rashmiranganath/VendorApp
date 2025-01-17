import { useEffect } from 'react';

interface UseFormPersistProps {
  key: string;
  data: any;
  onDataLoad?: (data: any) => void;
}

export const useFormPersist = ({ key, data, onDataLoad }: UseFormPersistProps) => {
  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData && onDataLoad) {
      onDataLoad(JSON.parse(savedData));
    }
  }, [key, onDataLoad]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  useEffect(() => {
    return () => {
    };
  }, [key]);
}; 