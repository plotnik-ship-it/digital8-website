import React, { useRef, useEffect } from 'react';

const MagneticButton = ({ children }) => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const magnetic = magneticRef.current;
    if (!magnetic) return;

    // Dynamically import GSAP only on the client-side
    import('gsap').then(({ gsap }) => {
        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const { top, left, width, height } = magnetic.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            gsap.to(magnetic, { x: x * 0.4, y: y * 0.4, duration: 1, ease: "elastic.out(1, 0.5)" });
        };

        const mouseLeave = () => {
            gsap.to(magnetic, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
        };

        magnetic.addEventListener('mousemove', mouseMove);
        magnetic.addEventListener('mouseleave', mouseLeave);

        // Cleanup function to remove event listeners
        return () => {
            magnetic.removeEventListener('mousemove', mouseMove);
            magnetic.removeEventListener('mouseleave', mouseLeave);
        };
    }).catch(error => console.error("Failed to load GSAP", error));

  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div ref={magneticRef} style={{ display: 'inline-block' }}>
        {children}
    </div>
  );
};

export default MagneticButton;
