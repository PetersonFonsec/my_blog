// Actual opaque bounds in the source sheet, which is not a uniform 4 × 4 grid.
// [x, y, width, height], in source pixels. Keep the source artwork unchanged.
export const SPRITE_BOUNDS = [
  [105, 18, 170, 304], [386, 18, 171, 304],
  [666, 19, 172, 304], [951, 18, 175, 305],
  [103, 331, 176, 306], [384, 331, 175, 307],
  [666, 331, 175, 307], [951, 332, 177, 306],
  [103, 646, 177, 303], [385, 646, 175, 303],
  [676, 647, 168, 302], [956, 647, 171, 300],
  [104, 958, 174, 305], [384, 958, 171, 301],
  [669, 958, 169, 303], [952, 958, 171, 301],
];

export function getSpriteStyle(frame) {
  // Step 16 deliberately reuses frame 01 to guarantee an identical loop seam.
  const [x, y, width, height] = SPRITE_BOUNDS[frame === 15 ? 0 : frame];
  // Use the planted boot as the anchor, retaining the lifted foot in frame 12.
  return {
    width, height,
    left: Math.round((192 - width) / 2),
    top: 308 - height,
    backgroundPosition: `${-x}px ${-y}px`,
  };
}
