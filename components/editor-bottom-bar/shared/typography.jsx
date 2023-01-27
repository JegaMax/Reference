import styled from 'styled-components';

const TypographyElement = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  min-width: 24px;
  min-height: 24px;
  ${({ padding }) => `
    padding: ${padding}
  `};
`;

const Typography = ({ padding, children }) => {
  return <TypographyElement padding={padding}>{children}</TypographyElement>;
};

export default Typography;
