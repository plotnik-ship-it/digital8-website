
import Lenis from 'lenis'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('astro:page-load', () => {
    // --- HEADER SCROLL EFFECT ---
    const header = document.getElementById('main-header');
    if (header) {
        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                if (self.scroll() > 50) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            }
        });
    }

    // --- CURTAIN ANIMATION ---
    const leftCurtain = document.querySelector('[data-curtain="left"]');
    const rightCurtain = document.querySelector('[data-curtain="right"]');

    if(leftCurtain && rightCurtain) {
        const curtainTimeline = gsap.timeline();
        curtainTimeline
            .to(leftCurtain, {
                height: 0,
                duration: 1.4,
                ease: "expo.inOut"
            })
            .to(rightCurtain, {
                height: 0,
                duration: 1.4,
                ease: "expo.inOut"
            }, "-=1.2");
    }

    // --- LENOIS SCROLL (APPLE/FRAMER-LIKE SETTINGS) ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // This creates the "Apple" (Expo Out) effect
        direction: 'vertical',
        smooth: true,
        smoothTouch: false, // IMPORTANT: Let mobile use its native scroll.
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);


    // --- "BUTTERY" GSAP ANIMATIONS ---

    // Hero Animation & Parallax
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        const heroTimeline = gsap.timeline({ delay: 0.4 });
        heroTimeline
            .from(".hero-text", { 
                duration: 1.6, 
                y: 120, 
                opacity: 0, 
                ease: "expo.out",
            })
            .from(".hero-subtext", { 
                duration: 1.4, 
                y: 60, 
                opacity: 0, 
                ease: "expo.out" 
            }, "-=1.2")
            .from(".hero-cta", {
                duration: 1.4,
                y: 40,
                opacity: 0,
                ease: "expo.out"
            }, "-=1.1");
        
        // Hero Parallax on scroll
        gsap.to(heroContent, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: "section:first-of-type",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }


    // Content Card Animations & Parallax
    gsap.utils.toArray('.content-card').forEach(card => {
        // Entrance Animation
        if (card.children.length > 0) {
            gsap.from(card.children, {
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });
        }

        // Parallax on scroll
        gsap.to(card, {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Magnetic Buttons
    const magneticButtons = document.querySelectorAll('.magnetic-button');
    magneticButtons.forEach(button => {
        const textElement = button.querySelector('span');
        if (!textElement) return;
        
        button.addEventListener('mousemove', (e) => {
            const { offsetX, offsetY, target } = e;
            const { clientWidth, clientHeight } = target;
            
            const x = (offsetX / clientWidth) - 0.5;
            const y = (offsetY / clientHeight) - 0.5;

            gsap.to(button, { x: x * 40, y: y * 40, duration: 1, ease: 'expo.out' });
            gsap.to(textElement, { x: x * 20, y: y * 20, duration: 1, ease: 'expo.out' });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to([button, textElement], { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' });
        });
    });

    // Mobile Menu
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const menuText = document.getElementById('mobile-menu-text');

    if (menuToggle && menuOverlay && menuText) {
        menuToggle.addEventListener('click', () => {
            menuOverlay.classList.toggle('hidden');
            const isOpen = !menuOverlay.classList.contains('hidden');
            menuText.textContent = isOpen ? 'Close' : 'Menu';
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.add('hidden');
                menuText.textContent = 'Menu';
                document.body.style.overflow = '';
            });
        });
    }
});
