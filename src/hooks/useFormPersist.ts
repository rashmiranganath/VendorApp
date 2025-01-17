import { useEffect } from 'react';

interface UseFormPersistProps {
  key: string;
  data: any;
  onDataLoad?: (data: any) => void;
}

export const useFormPersist = ({ key, data, onDataLoad }: UseFormPersistProps) => {
  // Load data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData && onDataLoad) {
      onDataLoad(JSON.parse(savedData));
    }
  }, [key, onDataLoad]);

  // Save data on changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Optionally clear data on unmount
      // localStorage.removeItem(key);
    };
  }, [key]);
}; 