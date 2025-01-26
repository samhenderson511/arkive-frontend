export const transitions = {
  none: undefined,
  fadeIn: {
    show: { opacity: 1 },
    hide: { opacity: 0 },
  },
  fadeInUp: {
    show: {
      opacity: 1,
      y: 0,
    },
    hide: {
      opacity: 0,
      y: 20,
    },
  },
  fadeInLeft: {
    show: {
      opacity: 1,
      x: 0,
    },
    hide: {
      opacity: 0,
      x: -20,
    },
  },
  fadeInRight: {
    show: {
      opacity: 1,
      x: 0,
    },
    hide: {
      opacity: 0,
      x: 20,
    },
  },
  zoomIn: {
    show: {
      opacity: 1,
      scale: 1,
    },
    hide: {
      opacity: 0,
      scale: 0.9,
    },
  },
  zoomInUp: {
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    hide: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
  },
  zoomInLeft: {
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    hide: {
      opacity: 0,
      x: -20,
      scale: 0.9,
    },
  },
  fadeInWithScale: {
    show: {
      opacity: 1,
      scale: 1,
    },
    hide: {
      opacity: 0,
      scale: 0.9,
    },
  },
  rotateInSubtle: {
    show: {
      opacity: 1,
      rotate: 0,
    },
    hide: {
      opacity: 0,
      rotate: -5,
    },
  },
  opacityChange: {
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
    },
  },
  slideInWithFade: {
    show: {
      opacity: 1,
      x: 0,
    },
    hide: {
      opacity: 0,
      x: -20,
    },
  },
  expandIn: {
    show: {
      opacity: 1,
      scaleY: 1,
    },
    hide: {
      opacity: 0,
      scaleY: 0.8,
    },
  },
};
