import styled from 'styled-components';

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
  ${({ isSticky }) => isSticky && `display: none`}
`;

const SectionTitleButtonWrapper = ({
  isSticky,
  margin = '0 0 0 12px',
  children,
}) => {
  return (
    <Wrapper margin={margin} isSticky={isSticky}>
      {children}
    </Wrapper>
  );
};

export default SectionTitleButtonWrapper;
