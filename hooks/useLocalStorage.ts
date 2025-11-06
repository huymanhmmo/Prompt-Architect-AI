// FIX: Import Dispatch and SetStateAction types from React.
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function getStorageValue<T>(key: string, defaultValue: T): T {
  // getting stored value
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If the default value is a Set, we expect the stored value to be an array.
        if (defaultValue instanceof Set) {
          if (Array.isArray(parsed)) {
            return new Set(parsed) as T;
          }
          // If data is corrupted (e.g., old '{}' format), fallback to default.
          return defaultValue;
        }
        return parsed as T;
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

// FIX: Use imported Dispatch and SetStateAction types in the return signature.
export const useLocalStorage = <T,>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // Convert Set to Array before storing to ensure proper JSON serialization.
    const valueToStore = value instanceof Set ? Array.from(value) : value;
    localStorage.setItem(key, JSON.stringify(valueToStore));
  }, [key, value]);

  return [value, setValue];
};