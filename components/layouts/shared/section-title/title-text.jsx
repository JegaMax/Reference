import styled from 'styled-components';

const Text = styled.span`
  color: var(--white);
`;

const TitleText = ({ className, children }) => {
  return <Text className={className}>{children}</Text>;
};

export default TitleText;
