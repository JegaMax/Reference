import { memo } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { useAppSelector } from '../../../../hooks';
import { useMemo } from 'react';
import { buildPreviewLink } from '../../../../utils/preview';

const Container = styled.div`
  flex: 1;
  padding: 32px;
  background: var(--shade-700-85);
  backdrop-filter: blur(50px);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  background: var(--white);
  padding: 9.25px;
  border-radius: 6px;

  flex: 1;
  backdrop-filter: blur(50px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditorSidebarQr = () => {
  const storyId = useAppSelector((state) => state?.ampStory?.present?._id);
  const previewLink = useMemo(() => buildPreviewLink(storyId), [storyId]);

  return (
    <Container>
      <InnerContainer>
        <QRCode value={previewLink} size={129.5} level="M" />
      </InnerContainer>
    </Container>
  );
};

export default memo(EditorSidebarQr);
