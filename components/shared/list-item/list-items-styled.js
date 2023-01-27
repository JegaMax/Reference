import styled from 'styled-components';
import { ListItemWrapper } from '.';
import DeleteListItemButton from './delete-list-item-button';

const DeleteButton = styled(DeleteListItemButton)``;

const StyledListItemWrapper = styled(ListItemWrapper)`
  &:hover {
    ${DeleteButton} {
      opacity: 1;
      z-index: 4;
    }
  }
`;

export default { DeleteButton, StyledListItemWrapper };
