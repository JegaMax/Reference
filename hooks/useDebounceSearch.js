import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';

const defaultConfig = {
  searchString: '',
  debounceTime: 300,
};

const useDebounceSearch = (config) => {
  const { searchString, debounceTime } = config ?? defaultConfig;
  const [searchValue, setSearchValue] = useState(searchString);
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchString);

  const onDebounce = useCallback(
    debounce((value) => {
      setDebouncedSearchValue(value);
    }, debounceTime),
    [],
  );

  useEffect(() => {
    setDebouncedSearchValue((prev) => (prev !== searchString ? searchString : prev));
    setSearchValue((prev) => (prev !== searchString ? searchString : prev));
  }, [searchString]);

  const onSearchChange = (value) => {
    setSearchValue(value);
    onDebounce(value);
  };

  return [searchValue, debouncedSearchValue, onSearchChange];
};

export default useDebounceSearch;
