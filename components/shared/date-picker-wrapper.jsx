import styled from 'styled-components';
import timeIcon from './images/time-circle.svg';

const Wrapper = styled.div`
  position: relative;
  & {
    .react-datepicker__triangle {
      display: none;
    }
    .react-datepicker__input-container input {
      background: var(--shade-700);
      border: 1px solid transparent;
      border-radius: 6px;
      font-family: 'Heebo';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      color: ${({ isDisabled }) => (isDisabled ? 'var(--shade-300)' : 'var(--white)')};
      -webkit-text-fill-color: ${({ isDisabled }) => (isDisabled ? 'var(--shade-300)' : 'var(--white)')};
      padding: 8px;
      width: 100%;
      &:focus {
        outline: none;
      }
      &:hover {
        border-color: var(--white-20);
      }
      &.react-datepicker-ignore-onclickoutside {
        border: 1px solid var(--primary);
      }
    }
    .react-datepicker {
      border: 1px solid var(--white-20);
      background: var(--shade-700);
    }
    .react-datepicker__header {
      border-bottom: none;
      background: transparent;
      padding: 0;
    }
    .react-datepicker__current-month {
      padding: 16px 0;
    }
    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      color: var(--white);
      line-height: 1.969;
      border-radius: 50%;
      border: 1px solid transparent;
      margin: 0.104rem;
      transition: 0.12s ease;
      background: transparent;
    }
    .react-datepicker__current-month,
    .react-datepicker-time__header,
    .react-datepicker-year-header {
      color: var(--white);
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 0.1px;
    }
    .react-datepicker__day--outside-month,
    .react-datepicker__day--disabled {
      color: var(--white);
      opacity: 0.4;
    }
    .react-datepicker__navigation {
      top: 12px;
      &.react-datepicker__navigation--next {
        right: 2px;
      }
    }
    .react-datepicker__navigation-icon::before {
      width: 6px;
      height: 6px;
      border-color: var(--white);
      border-width: 2px 2px 0 0;
    }
    .react-datepicker__day-names {
      margin-bottom: -5px;
    }
    .react-datepicker__day--today {
      background: none;
      border: 1px solid var(--white);
    }
    .react-datepicker__day:hover,
    .react-datepicker__day--selected {
      background: var(--primary);
      border: 1px solid var(--primary);
      font-weight: normal;
      color: var(--shade-700);
    }
    .react-datepicker__input-time-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0 10px;
      padding: 0 15px;
      float: none;
    }
    .react-datepicker-time__caption {
      color: var(--white);
      font-family: 'Heebo';
      font-size: 12px;
      line-height: 18px;
    }
    .react-datepicker__navigation-icon {
      top: 1px;
    }
    .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::before {
      border-bottom-color: var(--white-20);
    }
    .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::after {
      border-bottom-color: var(--shade-700);
    }
    .react-datepicker__input-time-container,
    .react-datepicker__month-container {
      float: none;
    }
    .react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input {
      margin-left: 0;
      & {
        input[type='time'] {
          background-color: transparent;
          background-image: url(${timeIcon});
          background-repeat: no-repeat;
          background-position: center right 12px;
          color: var(--white);
          border: 1px solid var(--white-20);
          border-radius: 6px;
          padding: 3px 12px 3px 12px;
          font-family: 'Heebo';
          font-size: 12px;
          line-height: 18px;
          margin-left: 0;
          &::-webkit-calendar-picker-indicator {
            opacity: 0;
          }
          &:focus {
            outline: none;
          }
        }
      }
    }
    .react-datepicker__time-container {
      position: absolute;
      top: -1px;
      left: calc(100% + 3px);
      border-radius: 6px;
      background: var(--shade-700);
      overflow: hidden;
      border: 1px solid var(--white-20);
      width: 107px;
      height: calc(100% + 3px);
      display: flex;
      flex-direction: column;
      & {
        .react-datepicker-time__header {
          background: transparent;
          font-size: 12px;
          padding: 10px 0 9px;
          border-bottom: 1px solid var(--white-20);
        }
        .react-datepicker__time {
          height: calc(100% - 44px) !important;
          background: transparent;
          .react-datepicker__time-box {
            width: auto;
            height: 100%;
          }
        }
        .react-datepicker__time-list {
          height: 100% !important;
          &::-webkit-scrollbar {
            width: 3px;
            border-radius: 12px;
          }
          &::-webkit-scrollbar-track {
            background: transparent;
          }
          &::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 20px;
            transition: background 0.12s ease;
          }
          &:hover {
            scrollbar-width: thin;
            scrollbar-color: var(--shade-300-85) transparent;
          }
          &:hover::-webkit-scrollbar {
            width: 3px;
            border-radius: 2px;
          }
          &:hover::-webkit-scrollbar-thumb {
            background: var(--shade-300-85);
          }
        }
        .react-datepicker__time-list-item {
          font-family: Heebo;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 18px;
          height: auto;
          padding: 3px 5px;
          margin: 2px 17px;
          border-radius: 6px;
          letter-spacing: 0.01em;
          color: var(--shade-100);
          &.react-datepicker__time-list-item--selected.react-datepicker__time-list-item--selected.react-datepicker__time-list-item--selected {
            background: var(--primary);
            color: var(--shade-900);
            font-weight: normal;
          }
          &.react-datepicker__time-list-item.react-datepicker__time-list-item.react-datepicker__time-list-item {
            height: auto;
            padding: 3px 5px;
            &:hover {
              background: var(--primary);
              color: var(--shade-900);
            }
          }
          &.react-datepicker__time-list-item--disabled.react-datepicker__time-list-item--disabled.react-datepicker__time-list-item--disabled {
            color: var(--white);
            opacity: 0.3;
          }
        }
      }
    }
  }
`;

const DatePickerWrapper = ({ isDisabled, children, onClick }) => {
  return (
    <Wrapper isDisabled={isDisabled} onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export default DatePickerWrapper;
