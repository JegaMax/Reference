import SettingsInfo from 'components/settings/shared/settings-info';
import Tooltip from 'rc-tooltip';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  background: var(--shade-100);
  border-radius: 6px;
  max-width: 625px;
`;

const CursorWrapper = styled.span``;

const HoverTooltip = ({ content, offset }) => {
  return (
    <Tooltip
      prefixCls={'transparent-none remove-arrow rc-tooltip'}
      placement="right"
      overlay={<Container>{content}</Container>}
      align={{ offset: offset ?? [20, -2] }}
    >
      <CursorWrapper>
        <SettingsInfo onClick={() => false} />
      </CursorWrapper>
    </Tooltip>
  );
};

export default HoverTooltip;
