import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left ?? '50%'};
  transform: ${({ transform }) => transform};
  right: ${({ right }) => right};
  margin: auto;
  background: var(--shade-900);
  border: 1px solid var(--shade-500-85);
  box-shadow: 0px 12px 32px var(--black-24);
  backdrop-filter: blur(50px);
  border-radius: 6px;
  padding: 10px 16px;
  ${({ zIndex }) =>
    zIndex &&
    css`
      z-index: ${zIndex};
    `}
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
`;

const Text = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin: 0;
  text-align: center;
`;

const TextEmphasis = styled.span`
  font-weight: bold;
`;

const defaultConfig = {
  position: 'fixed',
  top: '32px',
};

const Notification = ({ emphasisText, text, config }) => {
  const newConfig = { ...defaultConfig, ...config };
  return (
    <Wrapper {...newConfig}>
      <Text>
        {emphasisText && <TextEmphasis>{emphasisText}</TextEmphasis>} {text}
      </Text>
    </Wrapper>
  );
};

export default Notification;
