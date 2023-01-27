import styled from 'styled-components';
import chevronLeft from './images/icons/chevron-left.svg';

const LabelsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 24px 16px 0;
  margin-bottom: 16px;
  min-height: 48px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: pointer;
`;

const EditorModalLabelsWrapper = ({
  children,
  className,
  isInSubMenu,
  goBack,
}) => {
  return (
    <LabelsWrapper className={className}>
      <>
        {isInSubMenu && <BackIcon src={chevronLeft} onClick={goBack} />}
        {children}
      </>
    </LabelsWrapper>
  );
};

export default EditorModalLabelsWrapper;
