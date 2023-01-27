import { useRef } from 'react';
import { AddButton } from '../../buttons';
import styled from 'styled-components';

const HiddenInput = styled.input`
  display: none;
`;

const AddFontButton = ({ onClick, isDisabled }) => {
  const hiddenInputRef = useRef(null);
  const onButtonClick = () => {
    if (hiddenInputRef.current && !isDisabled) {
      hiddenInputRef.current.click();
    }
  };
  return (
    <>
      <AddButton text={'Add font'} onClick={onButtonClick} />
      <HiddenInput
        accept={'.woff, .woff2, .otf, .otc, .ttf, .tte'}
        type="file"
        ref={hiddenInputRef}
        onChange={onClick}
        multiple
      />
    </>
  );
};

export default AddFontButton;
