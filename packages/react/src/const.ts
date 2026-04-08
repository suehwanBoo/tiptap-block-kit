export const profiles = {
  block: {
    inline: false,
    draggable: false,
  },
  blockDraggable: {
    inline: false,
    draggable: true,
  },
  inline: {
    inline: true,
    draggable: false,
  },
  inlineDraggable: {
    inline: true,
    draggable: true,
  },
} as const;
