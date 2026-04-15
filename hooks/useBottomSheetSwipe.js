import { useSwipeable } from "react-swipeable";

export function useBottomSheetSwipe(onClose) {
  return useSwipeable({
    onSwipedDown: onClose,
    delta: 80,
    preventScrollOnSwipe: true,
    trackTouch: true,
  });
}
