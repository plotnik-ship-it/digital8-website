
export const services = [
    {
        title: "High-Performance Websites",
        description: "We build visually stunning websites with a guaranteed 90+ PageSpeed score, ensuring a premium aesthetic and elite technical SEO.",
        icon: "rocket"
    },
    {
        title: "Interactive Experiences",
        description: "We elevate your brand's narrative with advanced animations and fluid interactivity, creating a visual story that captivates users.",
        icon: "design"
    },
    {
        title: "Web Apps & Client Portals",
        description: "We turn your website into a powerful business tool, building dashboards, login systems, and process automation with cutting-edge technology.",
        icon: "code"
    }
];

export const caseStudies = [
    {
      slug: "dental-billing",
      title: "SaaS for Dental Clinics",
      description: "Reduced administrative billing time by 40% and eliminated paper invoices entirely.",
      imgSrc: "/stock/project-1.png",
      tags: ["SaaS", "React", "Node.js", "Stripe"],
    },
    {
      slug: "local-trades-platform",
      title: "Platform for Local Trades",
      description: "Allowed field workers to send quotes in under 60 seconds, increasing win-rates.",
      imgSrc: "/stock/project-2.png",
      tags: ["PWA", "Vue.js", "Firebase"],
    },
    {
      slug: "real-estate-search",
      title: "Real Estate Search Engine",
      description: "Custom map-based search engine that increased user retention by 200%.",
      imgSrc: "/stock/project-3.png",
      tags: ["Mapping", "Solid.js", "Elasticsearch"],
    },
    {
      slug: "smart-logistics-dashboard",
      title: "Smart Logistics Dashboard",
      description: "Optimized routing for 50+ vehicles in real-time, cutting fuel costs by 18% annually.",
      imgSrc: "/stock/project-4.png",
      tags: ["IoT", "Mapbox", "React", "Firebase"],
    }
];

const insightsContent = {
    "speed-is-revenue": `
## Speed is Revenue: Why 100ms Delays Are Costing You Clients
In the digital economy, speed is not a feature; it's the foundation of revenue. A mere 100-millisecond delay is enough to increase bounce rates and drive potential high-value clients to your competitors. Google's Core Web Vitals (CWV) are not just technical benchmarks; they are a proxy for user experience. This is why we build on Astro.js. Its 'Islands Architecture' renders your UI to static HTML on the server and ships zero JavaScript by default, guaranteeing elite performance.
`,
    "real-time-logistics-roi": `
## Real-Time Logistics: The ROI of Custom Fleet Tracking
In the logistics industry, information latency is a direct cost. A modern logistics platform ingests raw IoT data from vehicle trackers and transforms it into a centralized, operational overview. By leveraging powerful tools like the Mapbox API, we can plot every vehicle's location, status, and route on a live, high-fidelity map. This is more than just tracking; it's about converting data into actionable intelligence.
`,
    "psychology-of-dark-mode": `
## The Psychology of Dark Mode: Designing Trust for High-Ticket Brands
Design is a silent narrator of brand value. For high-ticket B2B services, a 'light and friendly' interface can feel misaligned. Dark Mode is a strategic choice that leverages psychological principles to build an aura of sophistication and trust. A dark, low-contrast background minimizes visual noise, allowing core content to stand out with greater clarity.
`
};

export const insights = [
    {
      slug: "speed-is-revenue",
      url: "/insights/speed-is-revenue",
      title: "Speed is Revenue: Why 100ms Delays Are Costing You Clients",
      description: "Explore how latency impacts user experience and why modern frameworks like Astro outperform traditional platforms.",
      category: "Performance",
      date: "2024-07-15",
      content: insightsContent["speed-is-revenue"]
    },
    {
      slug: "real-time-logistics-roi",
      url: "/insights/real-time-logistics-roi",
      title: "Real-Time Logistics: The ROI of Custom Fleet Tracking",
      description: "A look into the business impact of real-time data and custom-built logistics dashboards.",
      category: "Business & Tech",
      date: "2024-07-08",
      content: insightsContent["real-time-logistics-roi"]
    },
    {
      slug: "psychology-of-dark-mode",
      url: "/insights/psychology-of-dark-mode",
      title: "The Psychology of Dark Mode: Designing Trust for High-Ticket Brands",
      description: "How strategic design choices like dark mode can build brand perception and guide user focus.",
      category: "Design & UX",
      date: "2024-06-29",
      content: insightsContent["psychology-of-dark-mode"]
    }
];
