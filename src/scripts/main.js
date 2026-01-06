import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// This function is the single entry point. It will be called by the client.
export function init() {
    // Ensure this entire script runs only once
    if (document.body.hasAttribute('data-site-initialized')) {
        console.log("INIT: Site already initialized, returning.");
        return;
    }
    document.body.setAttribute('data-site-initialized', 'true');
    console.log("INIT: Initializing site.");

    gsap.registerPlugin(ScrollTrigger);

    let lenis;

    // --- ONE-TIME INITIALIZATION --- 

    function initSmoothScroll() {
        console.log("INIT: Initializing smooth scroll.");
        lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.8 });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    function initNavigation() {
        console.log("INIT: Initializing navigation.");
        const menuOverlay = document.getElementById('mobile-menu-overlay');
        const menuText = document.getElementById('mobile-menu-text');
        let isMenuOpen = false;

        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            menuOverlay.classList.toggle('hidden');
            document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
            if(menuText) menuText.textContent = isMenuOpen ? 'Close' : 'Menu';
        }

        document.addEventListener('click', (e) => {
            if (e.target.closest('#mobile-menu-toggle')) {
                toggleMenu();
            }
            if (e.target.closest('.mobile-nav-link') && isMenuOpen) {
                toggleMenu();
            }
        });
    }

    function initActiveNav() {
        console.log("INIT: Initializing active navigation logic.");
        const sections = document.querySelectorAll('main > section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top 50%",
                end: "bottom 50%",
                onToggle: self => {
                    if (self.isActive) {
                        const id = section.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('data-section') === id) {
                                link.classList.add('active');
                            }
                        });
                    }
                }
            });
        });

        // Special case for "Home" link when at the top
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom top",
            onUpdate: self => {
                const homeLink = document.querySelector('.nav-link[data-section="work"]');
                if (self.direction === -1 && self.progress === 0 && homeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    homeLink.classList.add('active');
                }
            }
        });
    }

    // --- PER-PAGE FUNCTIONS --- 

    function runPageAnimations() {
        console.log("PAGE ANIMATIONS: Running page animations.");
        ScrollTrigger.getAll().forEach(t => t.kill());

        const pageLoadTl = gsap.timeline();
        pageLoadTl.to(".left-curtain", { height: 0, duration: 1.2, ease: "power3.inOut" })
          .to(".right-curtain", { height: 0, duration: 1.2, ease: "power3.inOut" }, "-=1.2")
          .to("header", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5");

        if (document.querySelector('.hero-text')) {
            pageLoadTl.fromTo(".hero-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
              .fromTo(".hero-subtext", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.7");
        }

        gsap.utils.toArray('.content-card').forEach(card => {
            const header = card.querySelector('.clash-display');
            const paragraph = card.querySelector('p');
            const serviceCards = card.querySelectorAll('.service-card');
            const projectCards = card.querySelectorAll('.project-card');
            const insightCards = card.querySelectorAll('.insight-card');
            const otherContent = card.querySelector(':not(.clash-display):not(p):not(.service-card):not(.project-card):not(.insight-card)');

            const cardTl = gsap.timeline({ 
                scrollTrigger: { 
                    trigger: card, 
                    start: 'top 85%', 
                    toggleActions: 'play none none none'
                }
            });

            if (header) {
                cardTl.fromTo(header, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
            }
            if (paragraph) {
                cardTl.fromTo(paragraph, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.6");
            }

            if (serviceCards.length > 0) {
                cardTl.fromTo(serviceCards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out' }, "-=0.5");
            } 
            else if (projectCards.length > 0) {
                 cardTl.fromTo(projectCards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: 'power2.out' }, "-=0.5");
            }
            else if (insightCards.length > 0) {
                 cardTl.fromTo(insightCards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }, "-=0.5");
            }
            else if (otherContent) {
                cardTl.fromTo(otherContent, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.6");
            }
        });
    }

    function handleHashOnLoad() {
        console.log("PAGE ANIMATIONS: Handling hash on load.");
        if (window.location.hash && lenis) {
             // Use a small timeout to ensure the page is settled before scrolling
            setTimeout(() => {
                lenis.scrollTo(window.location.hash, { offset: -80, duration: 1.5 });
            }, 100);
        }
    }

    // --- ASTRO LIFECYCLE HOOKS ---
    
    document.addEventListener('astro:before-swap', (e) => {
        console.log("ASTRO LIFECYCLE: astro:before-swap triggered.");
        const toUrl = new URL(e.to);
        const fromUrl = new URL(e.from);

        if (toUrl.pathname === fromUrl.pathname && toUrl.hash) {
            if (!document.getElementById('mobile-menu-overlay').classList.contains('hidden')) {
                document.getElementById('mobile-menu-toggle').click();
            }
            return;
        }

        e.preventDefault();
        const tl = gsap.timeline({ onComplete: () => e.swap() });
        tl.to(".left-curtain", { height: "100vh", duration: 0.6, ease: "power3.in" })
          .to(".right-curtain", { height: "100vh", duration: 0.6, ease: "power3.in" }, "-=0.6");
    });

    document.addEventListener('astro:page-load', () => {
        console.log("ASTRO LIFECYCLE: astro:page-load triggered.");
        runPageAnimations();
        handleHashOnLoad();
        initActiveNav(); // Initialize active nav logic on every page load
    });
    
    // --- INITIAL EXECUTION ---
    initSmoothScroll();
    initNavigation();
    // runPageAnimations(); // Removed direct call here, now handled by astro:page-load
    handleHashOnLoad();
    initActiveNav(); // Also initialize on the very first load
}
