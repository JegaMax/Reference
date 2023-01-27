import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  background: var(--shade-700-85);
  border-radius: 6px;
  border: 1px solid transparent;
  margin: 0;
  padding: 5.5px 12px;
  width: 100%;
  box-sizing: border-box;
`;

const InputElement = styled.input`
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  width: 100%;
  max-width: 100%;
  background: transparent;
  border: none;
  color: var(--white);
  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--shade-300);
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: var(--shade-300);
    opacity: 1;
  }
  &:focus {
    outline: none;
    border: none;
  }
  ::selection {
    background: transparent;
  }
`;

const InputReadOnly = ({ id, className, value, type }) => {
  return (
    <InputWrapper className={className}>
      <InputElement id={id} defaultValue={value} type={type} readOnly={true} />
    </InputWrapper>
  );
};

InputReadOnly.defaultProps = {
  type: 'text',
  value: '',
};

export default InputReadOnly;
