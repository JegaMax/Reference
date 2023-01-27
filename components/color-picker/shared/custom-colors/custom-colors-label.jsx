import styled from 'styled-components';

const StyledCustomColorsLabel = styled.div`
  text-align: left;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 19px 0 12px;
`;

const CustomColorsLabel = ({ title }) => {
  return <StyledCustomColorsLabel>{title}</StyledCustomColorsLabel>;
};

CustomColorsLabel.defaultProps = {
  title: 'Favorites',
};

export default CustomColorsLabel;
