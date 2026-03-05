import { useEffect, useRef, useState } from "react";

// Fix: Destructure options so the dependency array relies on the value (0.1) 
// instead of a new object reference every render.
export default function useReveal({ threshold = 0.1 } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]); // Dependency is now a stable number

  return [ref, visible];
}