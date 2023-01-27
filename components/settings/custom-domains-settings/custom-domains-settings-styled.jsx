import styled, { css } from 'styled-components';
import { PrimaryButton } from '../../buttons';
import InputBasic from '../../shared/input-basic';
import SettingsInfoTitle from '../shared/settings-info-title';
import SettingsTitle from '../shared/settings-title';

const Title = styled(SettingsTitle)`
  margin: 0 15px 20px 0;
`;

const DomainsSettingsWrapper = styled.div`
  display: flex;
  padding: 7px 41px 14px 12px;
  flex-flow: row wrap;
  margin-bottom: 28px;
`;

const DomainsSettingsRow = styled.div`
  position: relative;
  width: calc(100% + 1px);
  padding-right: 10px;
  margin-bottom: 9px;
  ${({ isActive }) =>
    isActive &&
    css`
      &::before {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6.5px 7px 6.5px 0;
        border-color: transparent var(--shade-900) transparent transparent;
        z-index: 2;
      }
      &::after {
        content: '';
        position: absolute;
        right: 1px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6.5px 7px 6.5px 0;
        border-color: transparent var(--white) transparent transparent;
        z-index: 1;
      }
    `}
`;

const DomainDeleteWrapper = styled.div`
  align-self: center;
  margin-left: 7px;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  transition: 0.12s ease;
  margin-right: 4px;
  ${({ isDisabled }) =>
    !isDisabled &&
    `
    &:hover {
    background: var(--shade-500-85);
  }
  `}
`;

const DomainsInputElement = styled(InputBasic)`
  max-width: 228px;
`;

const DomainsRowWrapper = styled.div`
  margin-right: -1px;
  width: calc(100% + 1px);
  position: relative;
  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: ${minHeight};
    `}
`;

const SnippetInfoTitle = styled(SettingsInfoTitle)`
  margin-bottom: 15px;
`;

const DomainPlusTitleWrapper = styled.div`
  display: flex;
  margin-top: 4px;
  cursor: pointer;
  > div {
    margin-right: 6px;
  }
`;

const DomainSubmitBtn = styled(PrimaryButton)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  padding: 6px 60px;
  margin-top: 17px;
`;

const SettingsInfoTextList = styled.ul`
  padding-left: 15px;
`;

const DomainHelpLink = styled.a`
  font-family: Heebo;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.01em;
  text-align: right;
  color: var(--white);
  text-decoration: none;
`;

const Border = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 1px;
  height: 100%;
  background: var(--white);
`;

const DomainError = styled.div`
  font-family: Heebo;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.01em;
  text-align: left;
  margin-left: 5.5px;
  color: var(--warning);
`;

const DomainErrorIconWrapper = styled.div`
  svg > * {
    fill: var(--warning);
  }
`;

export default {
  Title,
  Border,
  DomainError,
  DomainHelpLink,
  DomainSubmitBtn,
  SnippetInfoTitle,
  DomainsRowWrapper,
  DomainsSettingsRow,
  DomainsInputElement,
  DomainDeleteWrapper,
  SettingsInfoTextList,
  DomainPlusTitleWrapper,
  DomainErrorIconWrapper,
  DomainsSettingsWrapper,
};
