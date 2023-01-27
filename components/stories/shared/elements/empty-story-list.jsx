import { useAppSelector } from 'hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelectTeamMutation } from 'appredux/services/auth/auth';
import styled from 'styled-components';
import { defaultStoryName } from '../../../../config/constants';
import { createStory } from '../../../../appredux/features/amp-story/ampStorySlice';
// import * as EmptyStoryListIcon from '../../../icons/empty-story-list';
import emptyStoryList from '../../../icons/empty-story-list';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

const EmptyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// const Image = styled(emptyStoryList)`
//   margin: 0 0 24px;
// `;

const Text = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: var(--white);
  max-width: 340px;
  text-align: center;
  margin: 0 auto 16px;
  white-space: pre-wrap;
`;

const Button = styled.button`
  display: inline-block;
  padding: 8.5px 12px 7.5px;
  color: var(--shade-100);
  border: 1px solid var(--shade-100);
  filter: drop-shadow(0px 4px 12px var(--black-16));
  border-radius: 6px;
  background: none;
  cursor: pointer;
`;

const EmptyStoryList = ({
  text = 'Get creative.\n Create your first story.',
  hasButton = true,
  nestedFolder,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedTeamId = useAppSelector((state) => state.auth.user?.selectedTeamId);

  const [isClicked, setIsClicked] = useState(false);
  const [selectTeam] = useSelectTeamMutation();

  const onCreateNewStory = async () => {
    if (isClicked) {
      return;
    }

    setIsClicked(true);

    if (selectedTeamId) {
      await selectTeam(null).unwrap();
    }

    dispatch(createStory(defaultStoryName, history));
  };

  if (nestedFolder) {
    return <></>;
  }

  return (
    <Wrapper>
      <EmptyListWrapper>
        {/* <emptyStoryList /> */}

        <Text>{text}</Text>
        {hasButton && <Button onClick={onCreateNewStory}>Create new story</Button>}
      </EmptyListWrapper>
    </Wrapper>
  );
};

export default EmptyStoryList;
