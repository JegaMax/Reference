import Tooltip from 'rc-tooltip';
import { memo, useCallback, useMemo, useState } from 'react';
import { useSpinner } from '../../../hooks';
import { CheckCircleIcon, NormalIconWrapper } from '../../icons';
import CustomTooltip from '../../tooltip';

const SaveIndicator = ({ changeCount }) => {
  const [isShown, setIsShown] = useState(false);
  const tooltipTitle = useMemo(() => {
    if (!changeCount || changeCount < 1) {
      return 'All changes saved';
    }
    return 'Saving';
  }, [changeCount]);

  const { Spinner, spinnerProps } = useSpinner({
    disableOverlay: true,
    spinnerType: 'ClipLoader',
    size: 12,
    color: 'var(--shade-300)',
  });

  const onMouseLeaveHandler = useCallback(() => {
    setTimeout(() => {
      setIsShown(false);
    }, 2000);
  }, []);

  const onMouseEnterHandler = useCallback(() => {
    setIsShown(true);
  }, []);

  return (
    <NormalIconWrapper width="18px" height="18px" transform="translate(0, 1.8px)" iconColor={'var(--shade-300)'}>
      <Tooltip
        overlayStyle={{ zIndex: 1 }}
        placement="right"
        visible={isShown}
        overlay={<CustomTooltip>{tooltipTitle}</CustomTooltip>}
        transitionName="rc-tooltip-zoom"
        destroyTooltipOnHide={{ keepParent: false }}
        align={{
          offset: [12, -3],
        }}
      >
        <div onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
          {changeCount && changeCount > 0 ? <Spinner {...spinnerProps} isVisible={true} /> : <CheckCircleIcon />}
        </div>
      </Tooltip>
    </NormalIconWrapper>
  );
};

export default memo(SaveIndicator);
