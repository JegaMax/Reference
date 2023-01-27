import styled from 'styled-components';
import { ChevronLeft } from '../../../../icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  padding: 24px 20px 0;
  margin-bottom: 16px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  color: var(--white);
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ButtonIcon = styled(ChevronLeft)`
  width: 8px;
  height: 13px;
  margin-top: -1px;
  margin-right: 9px;
`;

const ButtonText = styled.span`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
`;

const EditorModalBackTo = ({ text = '', onClick }) => {
  return (
    <Wrapper>
      <Button type="button" onClick={onClick}>
        <ButtonIcon />
        <ButtonText>{text}</ButtonText>
      </Button>
    </Wrapper>
  );
};

export default EditorModalBackTo;
