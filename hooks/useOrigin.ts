import { useEffect, useState } from "react";

let useOrigin = () => {
  let [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return "";
  }

  let origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  return origin;
};

export { useOrigin };
