import styled from 'styled-components';

import Error from '../../shared/error';
import TextArea from '../../shared/text-area';
import SettingsLabel from './settings-label';

const StyledSettingsTextareaWithLabel = styled.div`
  min-width: 228px;
`;

const SettingsTextareaWithLabel = ({
  name,
  label,
  value,
  error,
  className,
  isDisabled,
  isReadOnly,
  placeholder,
  onChange,
}) => {
  return (
    <StyledSettingsTextareaWithLabel>
      {label && <SettingsLabel label={label} />}
      <TextArea
        className={className}
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        minRows={4}
        hasError={Boolean(error)}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
      />

      {error && <Error text={error} />}
    </StyledSettingsTextareaWithLabel>
  );
};

export default SettingsTextareaWithLabel;
