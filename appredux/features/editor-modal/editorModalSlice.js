import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

const initialState = {
  modalType: null,
  offsetTop: 0,
  isOpen: false,
};

const editorModalSlice = createSlice({
  name: 'editorModal',
  initialState,
  reducers: {
    setModalType(state, action) {
      state.modalType = action.payload;
    },
    setOffset(state, action) {
      state.offsetTop = action.payload;
    },
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { setModalType, setOffset, setIsOpen } = editorModalSlice.actions;

export default editorModalSlice.reducer;

export const openModal = (modalType, offsetTop) => (dispatch) => {
  batch(() => {
    dispatch(setModalType(modalType));
    dispatch(setOffset(offsetTop));
    dispatch(setIsOpen(true));
  });
};

export const closeModal = () => (dispatch) => {
  batch(() => {
    dispatch(setModalType(null));
    dispatch(setOffset(0));
    dispatch(setIsOpen(false));
  });
};

export const onOutsideClickModal = (event, title) => (
  dispatch,
) => {
  let isContained = false;
  const node = event?.target;
  if (node.childNodes) {
    node.childNodes.forEach((child) => {
      if (child.id === title) {
        isContained = true;
      }
    });
  }
  if (node.id === title && !isContained) {
    isContained = true;
  }
  if (!isContained) {
    dispatch(closeModal());
  }
};
