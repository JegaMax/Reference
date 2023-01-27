import successfullyPublishedImage from './images/published.svg';
import styled from 'styled-components';

const HeaderImage = styled.img`
  margin: 0 0 35px;
  max-width: 110px;
`;

const SuccessImage = () => {
  return <HeaderImage src={successfullyPublishedImage} alt="Paper rocket" />;
};

export default SuccessImage;
