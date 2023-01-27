import styled from 'styled-components';

const Title = styled.h1`
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin: 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 46px;
`;

export default { Title, TitleWrapper };
