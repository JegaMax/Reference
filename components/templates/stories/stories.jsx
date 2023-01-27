import styled from 'styled-components';
// import { IWidgetStory } from '../../../interfaces/widget';
import { memo } from 'react';

// import { updateWidgetStories } from '../../../appredux/features/widgets/widgetsSlice';
// import { incrementWidgetChangedCount } from '../../../appredux/features/widgets/helpers/widgetHelpersSlice';

const StorySlideWrap = styled.div`
  & {
    padding: 0 16px;
    overflow: auto;
    height: 100%;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StorySlideImage = styled.div`
  & {
    border-radius: 8px;
    margin: auto;
    object-fit: cover;
    margin: 8px;
    float: left;
    width: 98px;
    height: 176px;
    position: relative;
    ${(props) =>
      props.story.cover.url || props.story.posterPortrait3x4Url
        ? 'background-image: url(' +
          (props.story.posterPortrait3x4Url ? props.story.posterPortrait3x4Url : props.story.cover.url) +
          ');'
        : 'background: #444444;'}
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-clip: content-box;
    transition: border 0.5s ease;
    cursor: pointer;
  }
  &:hover {
    border-color: var(--primary);
  }
`;

const StorySlideTitleWrap = styled.div`
  position: absolute;
  right: 0%;
  top: 50%;
  bottom: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(3, 3, 3, 0) 0%, #060606 76.04%);
  border-radius: 0 0 8px 8px;
`;

const StorySlideTitle = styled.div`
  color: white;
  position: absolute;
  letter-spacing: 0.01em;
  bottom: 5.11%;
  left: 8.16%;
  width: 100%;
  text-align: left;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
`;

const Stories = ({ activeTab }) => {
  // const dispatch = useDispatch();
  // const stories = useAppSelector(selectStoriesSortedByDate);
  // const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);

  // const { selectedTeamId } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
  //   selectFromResult: ({ data: workspace }) => ({
  //     selectedTeamId: workspace?.teams?.[0]?._id,
  //   }),
  //   skip: !selectedWorkspaceId,
  // });

  // const isInitialFetchDone = useAppSelector((state) => state.stories.isSyncInProgress);

  // useEffect(() => {
  //   if (activeTab === EDITOR_MODAL_STORIES_TAB_TEAM_STORIES) {
  //     dispatch(loadStories({ teamId: selectedTeamId }));
  //   } else {
  //     dispatch(loadStories({ forcePersonal: true }));
  //   }
  // }, [activeTab, dispatch, isInitialFetchDone, selectedTeamId]);

  // const widgetActiveSlide = useSelector((state) =>
  //   state.widgets.widgetActiveSlide ? state.widgets.widgetActiveSlide : 0,
  // );

  // const widgetStories = useSelector((state) => state.widgets.widget.editorDetails.stories);

  const onStoryClick = (story) => {
    // const updatedWidgetStories = [...widgetStories];
    // if (updatedWidgetStories?.[widgetActiveSlide]) {
    //   updatedWidgetStories[widgetActiveSlide] = {
    //     date: '',
    //     image: story.posterPortrait3x4Url ? story.posterPortrait3x4Url : story.cover?.url,
    //     text: story.title,
    //     title: story.title,
    //     url: environment.defaultStoriesHost + '/' + story.amp.key,
    //     isDirty: false,
    //   };
    //   batch(() => {
    //     dispatch(updateWidgetStories(updatedWidgetStories));
    //     dispatch(incrementWidgetChangedCount());
    //   });
    // }
  };

  return (
    <StorySlideWrap>
      {/* {stories && stories.length === 0 ? (
        <NoResults text="No stories found" />
      ) : (
        <div>
          {stories?.map((s, index) => {
            return (
              s.status == 'published' && (
                <StorySlideImage key={index} story={s} onClick={() => onStoryClick(s)}>
                  <StorySlideTitleWrap>
                    <StorySlideTitle>{s.title}</StorySlideTitle>
                  </StorySlideTitleWrap>
                </StorySlideImage>
              )
            );
          })}
        </div>
      )} */}
    </StorySlideWrap>
  );
};

export default memo(Stories);
