import styled from 'styled-components';

const StorySearchWrapper = styled.div`
  width: min(38%, 380px);
  align-self: center;
  margin: auto;
  transform: translateX(20%);
  ${({ isHidden }) => isHidden && `display: none;`}
  @media screen and (max-width: 1600px) {
    margin: 0 auto 0 26%;
  }
  @media screen and (max-width: 1399px) {
    width: min(30%, 380px);
    margin: 0 auto 0 30%;
  }
  @media screen and (max-width: 1199px) {
    max-width: 230px;
    width: 100%;
    margin: 0 auto 0 28%;
    justify-self: flex-end;
    transform: translateX(0);
  }
`;

export { StorySearchWrapper };
