import { useEffect, useState } from "react";

export function useIsMobile(
  value: number
) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${value}px)`
    );
    const handler = (
      event: MediaQueryList | MediaQueryListEvent
    ) => setIsMobile(event.matches);

    setIsMobile(mq.matches);

    if (mq.addEventListener) {
      mq.addEventListener(
        "change", handler
      );
      return () => mq.removeEventListener(
        "change", handler
      );
    }
  }, [value]);

  return isMobile;
}