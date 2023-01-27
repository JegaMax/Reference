import styled from 'styled-components';

const Container = styled.div`
  height: 1px;
  width: ${({ outerMargin }) => `calc(100% + ${outerMargin}px)`};
  margin: ${({ outerMargin }) => `6px -${(outerMargin ?? 0) / 2}px 10px`};

  background: var(--shade-500-85);
`;

const Divider = ({ outerMargin = 0 }) => <Container outerMargin={outerMargin} />;

export default Divider;
