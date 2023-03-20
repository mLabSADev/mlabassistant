// templates for nativebase transitions
export const opacity = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: 'timing',
      duration: 250,
    },
  },
};
export const scaleFade = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'timing',
      duration: 250,
    },
  },
};
