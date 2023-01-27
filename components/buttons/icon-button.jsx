import styled, { css } from 'styled-components';

const Container = styled.div`
  background: ${(props) => props.background};
  ${(props) => props.isBoxShadowActive && `box-shadow: 24px 32px 72px var(--black-18);`}
  ${(props) => props.isBackdropActive && `backdrop-filter: blur(50px);`}
  border-radius: 8px;
  ${(props) => `padding: ${props.padding};`}
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${(props) => props.background};
  transition: 0.12s ease;
  &:hover {
    background: var(--shade-700-85);
    border-color: var(--shade-700-85);
  }
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
  &&&&& {
    ${(props) =>
      props.isActive &&
      !props.$stroke &&
      `
      border-color: var(--primary);    
      &:hover {
        background: var(--primary-10);
      }
      svg > * {
        fill: var(--primary);
        }
      }
    `}
  }
  &&&&& {
    ${(props) =>
      props.isDisabled &&
      !props.$stroke &&
      `
      svg > * {
        fill: var(--shade-300-85);
        }
      }
    `}
  }

  &&&&& {
    ${(props) =>
      props.isActive &&
      props.$stroke &&
      `
      border-color: var(--primary);    
      &:hover {
        background: var(--primary-10);
      }
      svg > * {
        stroke: var(--primary);
        }
      }
    `}
  }
  &&&&& {
    ${(props) =>
      props.isDisabled &&
      props.$stroke &&
      `
      svg > * {
        stroke: var(--shade-300-85);
        }
      }
    `}
  }
`;

const IconButton = ({
  background = 'var(--shade-900-85)',
  isActive = false,
  isDisabled = false,
  isBackdropActive = true,
  isBoxShadowActive = true,
  padding = '7px',
  width,
  onClick,
  onMouseDown,
  children,
  buttonRef,
  $stroke,
}) => {
  return (
    <Container
      background={background}
      isActive={isActive}
      isDisabled={isDisabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      padding={padding}
      width={width}
      isBackdropActive={isBackdropActive}
      isBoxShadowActive={isBoxShadowActive}
      ref={buttonRef}
      $stroke={$stroke}
    >
      {children}
    </Container>
  );
};

export default IconButton;
