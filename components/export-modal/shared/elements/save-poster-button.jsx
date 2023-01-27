import React from 'react';
import styled from 'styled-components';
// import { PrimaryButton } from '../../../buttons';
import primaryButton from 'components/buttons/primary-button';

const Button = styled(primaryButton)`
  display: block;
  box-shadow: 0px 4px 12px var(--black-16);
  width: 100%;
  max-width: 100%;
  align-self: flex-end;
  margin: auto 0 0;
`;

const SavePosterButton = ({ isSaving, onClick }) => {
  return <Button isDisabled={isSaving} isLoading={isSaving} loader text={'Save Poster Images'} onClick={onClick} />;
};

export default SavePosterButton;
