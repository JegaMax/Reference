const duration = 120;

const fadeStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const fadeTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export { duration, fadeStyle, fadeTransitionStyles };
