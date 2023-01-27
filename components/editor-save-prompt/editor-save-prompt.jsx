import { useEffect, useState } from 'react';


const message = 'You have unsaved changes at the moment. Are you sure you want to leave the editor?';

const EditorSavePrompt = ({ when, navigate, onConfirm }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const beforeUnloadListener = (event) => {
    event.preventDefault();
    return (event.returnValue = message);
  };

  useEffect(() => {
    if (when) {
      window.addEventListener('beforeunload', beforeUnloadListener);
    } else {
      window.onbeforeunload = null;
      window.removeEventListener('beforeunload', beforeUnloadListener);
    }

    return () => {
      window.onbeforeunload = null;
      window.removeEventListener('beforeunload', beforeUnloadListener);
    };
  }, [when]);

  // const closeModal = () => {
  //   setModalVisible(false);
  // };

  // const handleBlockedNavigation = (nextLocation: Location) => {
  //   if (!confirmedNavigation && when) {
  //     setModalVisible(true);
  //     setLastLocation(nextLocation);
  //     return false;
  //   }
  //   return true;
  // };

  // const handleConfirmNavigationClick = () => {
  //   setModalVisible(false);
  //   onConfirm && onConfirm();
  //   setConfirmedNavigation(true);
  // };

  // useEffect(() => {
  //   if (confirmedNavigation && lastLocation) {
  //     navigate(lastLocation.pathname);
  //   }
  // }, [confirmedNavigation, lastLocation, navigate]);

  return (
    <>
      {/* <Prompt when={when} message={message} /> */}

      {/* <MessageModal
        message={message}
        isOpen={modalVisible}
        shouldCloseOnOverlayClick={true}
        cancelButtonText={'Back to editor'}
        acceptButtonText={'Leave without saving'}
        onCancel={closeModal}
        onAccept={handleConfirmNavigationClick}
      /> */}
    </>
  );
};

export default EditorSavePrompt;
