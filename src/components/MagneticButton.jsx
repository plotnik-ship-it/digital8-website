
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children }) => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;

        if (!button || !text) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { top, left, width, height } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            gsap.to(button, { x: x * 0.4, y: y * 0.4, duration: 0.8, ease: 'power3.out' });
            gsap.to(text, { x: x * 0.2, y: y * 0.2, duration: 0.8, ease: 'power3.out' });
        };

        const handleMouseLeave = () => {
            gsap.to([button, text], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Clone the child to attach the ref correctly
    const child = React.Children.only(children);
    const clonedChild = React.cloneElement(child, { ref: textRef });

    return (
        <div ref={buttonRef} className="magnetic-button inline-block">
            {clonedChild}
        </div>
    );
};

export default MagneticButton;
