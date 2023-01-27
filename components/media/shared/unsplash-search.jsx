import styled from 'styled-components';
import Search from '../../shared/search';

const SearchWrapper = styled.div`
  display: block;
  padding: 0 20px;
  margin-bottom: 16px;
`;

const UnsplashSearch = ({ value, placeholder, onChange }) => {
  return (
    <SearchWrapper>
      <Search onChange={onChange} value={value} placeholder={placeholder} />
    </SearchWrapper>
  );
};

export default UnsplashSearch;
