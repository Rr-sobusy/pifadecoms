import { useEffect, useState, Dispatch, SetStateAction } from 'react';



const useDebounceUrlParams = (initialParams = "", delay = 500) => {
  const [params, setParams] = useState(initialParams);
  const [debouncedParams, setDebouncedParams] = useState<string>(initialParams);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedParams(params);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [params, delay]);

  return [debouncedParams, setParams];
};

export default useDebounceUrlParams;
