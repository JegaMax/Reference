import {
  memo, useCallback, useEffect, useMemo, useRef,
  useState
} from 'react';

const GradientHandle = (props) => {
  const {
    className,
    prefixCls,
    vertical,
    reverse,
    offset,
    style,
    disabled,
    min,
    max,
    value,
    values,
    index,
    tabIndex,
    ariaLabel,
    ariaLabelledBy,
    ariaValueTextFormatter,
    onLeftHandleClick,
    onRightHandleClick,
    ...restProps
  } = props;
  const [clickFocused, setClickFocused] = useState(false);
  const handle = useRef(null);
  const [ariaValueText, setAriaValueText] = useState(undefined);
  const [mergedTabIndex, setMergedTabIndex] = useState(tabIndex || 0);

  const setClickFocus = useCallback((focused) => {
    setClickFocused(focused);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (document.activeElement === handle?.current) {
      setClickFocus(true);
    }
  }, [setClickFocus]);

  const focus = useCallback(() => {
    handle?.current?.focus();
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      // avoid selecting text during drag
      // https://github.com/ant-design/ant-design/issues/25010
      e.preventDefault();
      // fix https://github.com/ant-design/ant-design/issues/15324
      focus();

      if (index === 0 && onLeftHandleClick && values?.includes(value)) {
        onLeftHandleClick();

        return;
      }

      if (index === 1 && onRightHandleClick && values?.includes(value)) {
        onRightHandleClick();
        return;
      }
    },
    [focus, index, onLeftHandleClick, onRightHandleClick, values, value],
  );

  const handleBlur = useCallback(() => {
    setClickFocus(false);
  }, [setClickFocus]);

  const handleKeyDown = useCallback(() => {
    setClickFocus(false);
  }, [setClickFocus]);

  const classNames = useMemo(() => {
    return [className, clickFocused && `${prefixCls}-handle-click-focused`].filter(Boolean).join(' ');
  }, [className, clickFocused, prefixCls]);

  const positionStyle = useMemo(
    () =>
      vertical
        ? {
            [reverse ? 'top' : 'bottom']: `${offset}%`,
            [reverse ? 'bottom' : 'top']: 'auto',
            transform: reverse ? null : `translateY(+50%)`,
          }
        : {
            [reverse ? 'right' : 'left']: `${offset}%`,
            [reverse ? 'left' : 'right']: 'auto',
            transform: `translateX(${reverse ? '+' : '-'}50%)`,
          },
    [vertical, offset, reverse],
  );

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  useEffect(() => {
    if (disabled || tabIndex === null) {
      setMergedTabIndex(mergedTabIndex);
    }
  }, [disabled, tabIndex, mergedTabIndex]);

  useEffect(() => {
    if (ariaValueTextFormatter && value) {
      setAriaValueText(ariaValueTextFormatter(value));
    }
  }, [ariaValueTextFormatter, value]);

  return (
    <div
      ref={handle}
      tabIndex={mergedTabIndex}
      {...restProps}
      className={classNames}
      style={
        {
          ...style,
          ...positionStyle,
        }
      }
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      // aria attribute
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={!!disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-valuetext={ariaValueText}
    />
  );
};

export default memo(GradientHandle);
