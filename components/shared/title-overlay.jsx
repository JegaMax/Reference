import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 62.5%;
  background: linear-gradient(180deg, rgba(3, 3, 3, 0) 0%, #060606 76.04%);
  border-radius: 0px 0px 2px 2px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  pointer-events: none;
`;

const Title = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  margin: 0 0 3px 5px;

  letter-spacing: 0.01em;

  color: #ffffff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TitleOverlay = ({ title }) => (
  <Container>
    <Title>{title}</Title>
  </Container>
);

export default TitleOverlay;
