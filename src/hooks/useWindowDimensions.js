import { useEffect, useState } from "react";

export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  function updateDimensions() {
    const { innerWidth, innerHeight } = window;
    setDimensions({ width: innerHeight, height: innerHeight });
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return dimensions;
}
