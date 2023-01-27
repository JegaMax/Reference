import qs from 'qs';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { MY_STORIES, TEAMS } from '../../../../config/main-page-paths';
import { useDebounceSearch } from '../../../../hooks';
import Search from '../../../shared/search';
import * as Styled from './story-search-styled';

const StorySearch = ({ isHidden }) => {
  const history = useHistory();
  const searchParams = useMemo(() => {
    return qs.parse(history.location.search.slice(1));
  }, [history.location.search]);
  const [searchValue, debouncedSearchValue, onSearchChange] = useDebounceSearch({
    searchString: (searchParams?.title) ?? '',
    debounceTime: 500,
  });
  const prevSearchValue = useRef(debouncedSearchValue);
  const isInitialMount = useRef(true);

  // const isRoot = useAppSelector((state) => state.folders.contextFolder?.isRoot);

  const getPathname = useCallback(() => {
    const pathname = history.location.pathname;

    if (pathname === TEAMS && debouncedSearchValue?.length > 0) {
      return `${TEAMS}/all-stories`;
    }
    if (pathname === MY_STORIES && debouncedSearchValue?.length > 0) {
      return `${MY_STORIES}/all`;
    }
    return pathname;
  }, [debouncedSearchValue.length, history.location.pathname]);

  const searchStoryClearCallback = useCallback(() => {
    // if (isRoot) {
    //   const pathname = getPathname();
    //   pathname === `${MY_STORIES}/all` && history.push(`${MY_STORIES}`);
    //   pathname === `${TEAMS}/all-stories` && history.push(`${TEAMS}`);
    // }
  }, [getPathname, history]);

  useEffect(() => {
    const historyActionCheck = isInitialMount.current ? true : !(history.action === 'POP');

    // Call when prevSearchValue and debouncedSearchValue are different && when user don't click browser back button
    if (prevSearchValue.current !== debouncedSearchValue && historyActionCheck) {
      prevSearchValue.current = debouncedSearchValue;
      isInitialMount.current = false;
      history.push({
        pathname: getPathname(),
        search: debouncedSearchValue ? `title=${debouncedSearchValue}` : undefined,
        state: { searchRedirect: true },
      });
    }
  }, [debouncedSearchValue, getPathname, history]);

  return (
    <Styled.StorySearchWrapper isHidden={isHidden}>
      <Search
        clearCallback={searchStoryClearCallback}
        hasBorder
        placeholder="Search Stories"
        value={searchValue}
        onChange={onSearchChange}
      />
    </Styled.StorySearchWrapper>
  );
};

export default StorySearch;
