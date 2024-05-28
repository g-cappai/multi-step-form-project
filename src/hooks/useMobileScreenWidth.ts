import { useEffect, useState } from "react";

const MOBILE_SCREEN_WIDTH = 640;

export function useMobileScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth <= MOBILE_SCREEN_WIDTH;
}
