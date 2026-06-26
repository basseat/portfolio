import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────

const EXPERIENCE = [
  {
    role: "Internal Controls & Business Analyst",
    company: "9 Payment Service Bank",
    url: "https://9psb.com.ng/",
    location: "Lagos, Nigeria",
    period: "Jul 2024 – May 2025",
    highlights: [
      "Designed and maintained the internal controls framework, aligning operational processes with regulatory requirements across banking operations",
      "Built automated reporting pipelines using Power Automate and SQL, reducing manual reconciliation effort",
      "Developed dashboards in Power BI to track key risk indicators and operational performance metrics",
    ],
  },
  {
    role: "Business Analyst",
    company: "Kuda",
    url: "https://www.kuda.com/",
    location: "Lagos, Nigeria",
    period: "Jul 2023 – Jul 2024",
    highlights: [
      "Supported business and product decisions through data analysis using BigQuery across a rapidly scaling digital banking platform",
      "Developed automated reporting systems and dashboards to track key performance indicators for operations and product teams",
      "Collaborated with product and engineering on requirements gathering and process improvements for customer onboarding workflows",
    ],
  },
  {
    role: "Business Analyst",
    company: "Flutterwave",
    url: "https://flutterwave.com/eu/",
    location: "San Francisco, CA (Remote)",
    period: "Aug 2022 – Apr 2023",
    highlights: [
      "Analysed high-volume transactional data across 30+ countries using Amazon Redshift to surface insights on payment performance, conversion trends, and operational efficiency",
      "Built SQL-based dashboards and automated reporting pipelines, enabling real-time decision-making for cross-functional stakeholders",
      "Partnered with product and operations teams to define business requirements and improve transaction processing workflows",
    ],
  },
];

const PROJECTS = [
  {
    title: "The God Metric",
    subtitle: "Global Secularisation",
    description:
      "PostgreSQL star schema and ETL pipeline exploring the relationship between economic development and religious decline across 190+ countries.",
    detail:
      "Data sourced from Pew Research, Our World in Data, World Bank, and World Values Survey. Built a dimensional model with fact and dimension tables, automated ETL with Python, and visualised findings in Tableau.",
    tools: ["PostgreSQL", "Python", "dbt", "Tableau"],
    github: "https://github.com/basseat/the-god-metric",
    color: "#b8a04a",
  },
  {
    title: "The Green Miles Problem",
    subtitle: "EU Logistics Emissions",
    description:
      "Investigation into the carbon cost of last-mile delivery across the European Union.",
    detail:
      "Interactive Tableau dashboard visualising emissions by transport mode, distance, and country. Highlights how delivery speed preferences affect carbon output across different EU member states.",
    tools: ["Python", "Tableau", "SQL"],
    github: "https://github.com/basseat/green-miles-problem",
    color: "#4a9b6e",
  },
  {
    title: "The Attention Paradox",
    subtitle: "Gen Z Streaming Behaviour",
    description:
      "Data-driven look at how Generation Z consumes streaming content, challenging assumptions about short attention spans.",
    detail:
      "Analysis of real viewing data reveals patterns that contradict the conventional narrative about Gen Z engagement. Visualised in Tableau with interactive filtering by platform and content type.",
    tools: ["Python", "Pandas", "Tableau"],
    github: "https://github.com/basseat/attention-paradox",
    color: "#6e7bb8",
  },
  {
    title: "A/B Test: Checkout Fraud",
    subtitle: "Experimentation Simulation",
    description:
      "End-to-end A/B testing simulation modelling the impact of a fraud-detection intervention on checkout conversion rates.",
    detail:
      "Includes statistical power analysis, two-proportion z-tests, confidence intervals, and sensitivity analysis to fraud cost multipliers. The experiment reveals that higher conversion is a net negative when fraud costs are realistic.",
    tools: ["Python", "Statistics", "Tableau"],
    github: "https://github.com/basseat/ab-test-checkout-fraud",
    color: "#b85a4a",
  },
];

const SKILLS = {
  "Data & SQL": ["PostgreSQL", "BigQuery", "Amazon Redshift", "MySQL", "dbt"],
  "Analysis & Viz": ["Python", "Pandas", "Tableau", "Power BI"],
  Automation: ["Power Automate", "n8n", "Claude", "Cursor"],
  Domain: ["Fraud Analytics", "Internal Controls", "Fintech", "Products", "Cybersecurity (ISC2 CC)"],
};

const STATS = [
  { value: "30+", label: "Countries" },
  { value: "3+", label: "Years" },
  { value: "4", label: "Projects" },
  { value: "4", label: "Companies" },
];

const NAV_ITEMS = ["About", "Experience", "Projects", "Skills", "Writing", "Contact"];

// ─── HOOKS ──────────────────────────────────────────────

function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.12, ...options }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return [ref, isVisible];
}

function useActiveSection() {
  const [active, setActive] = useState("About");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((name) => {
        const el = document.getElementById(name.toLowerCase());
        if (!el) return { name, top: Infinity };
        return { name, top: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.name);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return active;
}

// ─── ANIMATED COMPONENTS ────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({ value, label, delay }) {
  const [ref, isVisible] = useInView();
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const timeout = setTimeout(() => requestAnimationFrame(animate), delay * 1000);
    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 36,
          fontWeight: 700,
          color: "#c9a227",
          letterSpacing: "-0.02em",
        }}
      >
        {count}{suffix}
      </div>
      <div style={{ fontSize: 13, color: "#6b6b7b", fontWeight: 500, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </div>
    </div>
  );
}

// ─── GRID BACKGROUND ────────────────────────────────────

function GridBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.4,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201, 162, 39, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 162, 39, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)",
          animation: "pulse 6s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────────

function Nav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "#0a0a0fee" : "#0a0a0faa",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? "#1a1a25" : "transparent"}`,
        padding: "14px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.3s ease",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#c9a227",
          letterSpacing: "-0.02em",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        A.A.
      </span>
      <div className="nav-links" style={{ display: "flex", gap: 18 }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "none",
              border: "none",
              color: active === item ? "#e8e6e3" : "#6b6b7b",
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: active === item ? 500 : 400,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "color 0.3s",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: active === item ? "#c9a227" : "#333340",
                transition: "background 0.3s",
              }}
            />
            <span className="nav-label">{item}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── PROJECT CARD ───────────────────────────────────────

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
      style={{
        padding: 28,
        borderRadius: 12,
        border: `1px solid ${hovered || expanded ? project.color + "55" : "#1a1a25"}`,
        background: hovered || expanded ? "#12121a" : "transparent",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>
            {project.title}
          </h3>
          <p style={{ fontSize: 13, color: project.color, fontWeight: 500, marginTop: 2 }}>
            {project.subtitle}
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span
            style={{
              fontSize: 18,
              color: "#6b6b7b",
              transform: expanded ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.3s ease",
              display: "inline-block",
            }}
          >
            ↓
          </span>
        </div>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: "#8a8a96", marginTop: 12 }}>
        {project.description}
      </p>

      {/* Expandable detail */}
      <div
        style={{
          maxHeight: expanded ? 200 : 0,
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
        }}
      >
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#a0a0aa", marginTop: 12, paddingTop: 12, borderTop: "1px solid #1a1a25" }}>
          {project.detail}
        </p>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "inline-block",
            marginTop: 12,
            fontSize: 13,
            fontWeight: 500,
            color: project.color,
          }}
        >
          View on GitHub →
        </a>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {project.tools.map((tool) => (
          <span
            key={tool}
            style={{
              fontSize: 11,
              fontWeight: 500,
              padding: "4px 10px",
              borderRadius: 4,
              background: "#1a1a25",
              color: "#8a8a96",
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── EXPERIENCE CARD ────────────────────────────────────

function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <FadeIn delay={index * 0.1}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          gap: 24,
          cursor: "pointer",
          padding: "24px 0",
          borderBottom: "1px solid #1a1a25",
        }}
      >
        {/* Timeline dot and line */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6, minWidth: 20 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: expanded ? "#c9a227" : "#333340",
              border: `2px solid ${expanded ? "#c9a227" : "#4a4a55"}`,
              transition: "all 0.3s",
              flexShrink: 0,
            }}
          />
          <div style={{ width: 1, flex: 1, background: "#1a1a25", marginTop: 8 }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 600, color: "#e8e6e3" }}>
                {exp.role}
              </h3>
              <p style={{ fontSize: 14, color: "#c9a227", fontWeight: 500, marginTop: 2 }}>
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: "#c9a227", fontWeight: 500 }}
                >
                  {exp.company}
                </a>
                <span style={{ color: "#6b6b7b", fontWeight: 400 }}> · {exp.location}</span>
              </p>
            </div>
            <span style={{ fontSize: 13, color: "#6b6b7b", fontStyle: "italic", whiteSpace: "nowrap" }}>
              {exp.period}
            </span>
          </div>

          <div
            style={{
              maxHeight: expanded ? 300 : 0,
              opacity: expanded ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.4s ease, opacity 0.3s ease",
            }}
          >
            <ul style={{ margin: 0, padding: "12px 0 0 16px", listStyle: "none" }}>
              {exp.highlights.map((h, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "#8a8a96",
                    marginBottom: 8,
                    position: "relative",
                    paddingLeft: 12,
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: "#c9a22777" }}>·</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {!expanded && (
            <p style={{ fontSize: 13, color: "#4a4a55", marginTop: 8 }}>Click to expand</p>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── DIVIDER ────────────────────────────────────────────

function Divider() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #2a2a35 20%, #2a2a35 80%, transparent)" }} />
    </div>
  );
}

// ─── SECTION HEADING ────────────────────────────────────

function SectionHeading({ children }) {
  return (
    <h2
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: "#6b6b7b",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: 40,
      }}
    >
      {children}
    </h2>
  );
}

// ─── MAIN APP ───────────────────────────────────────────

export default function App() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section
        id="about"
        style={{ padding: "100px 32px 60px", maxWidth: 760, margin: "0 auto", position: "relative" }}
      >
        <GridBackground />
        <FadeIn>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#c9a227",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Against the Narrative
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1
            className="hero-title"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: 28,
            }}
          >
            Abdulbasit Ayoade
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "#a0a0aa",
              fontWeight: 300,
              maxWidth: 580,
              marginBottom: 16,
            }}
          >
            Since 2022, I have been exploring data to help organisations make
            better, more informed decisions. From fraud detection at scale across
            30+ countries to building internal controls frameworks and uncovering
            product usage patterns, my work sits at the intersection of analytics,
            product, risk, and operations.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "#a0a0aa",
              fontWeight: 300,
              maxWidth: 580,
            }}
          >
            Currently pursuing an M.Sc. in Physics at Heidelberg University, where
            I am sharpening my quantitative thinking while continuing to build data
            projects that challenge conventional narratives. I write SQL, think in
            pipelines, and believe the most useful analysis, whether it is a funnel
            breakdown or a risk model, is the one that changes how you see the
            problem.
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
            {[
              { label: "GitHub", href: "https://github.com/basseat" },
              { label: "Tableau", href: "https://public.tableau.com/app/profile/abdulbasit.ayoade" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/abdulbasitayoade/" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-btn"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "8px 18px",
                  border: "1px solid #2a2a35",
                  borderRadius: 6,
                  color: "#e8e6e3",
                  transition: "border-color 0.3s, background 0.3s",
                }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "40px 32px 60px", maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            padding: "32px 0",
            borderTop: "1px solid #1a1a25",
            borderBottom: "1px solid #1a1a25",
          }}
          className="stats-grid"
        >
          {STATS.map((stat, i) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} delay={i * 0.15} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "72px 32px", maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <SectionHeading>Experience</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.05}>
          <div
            style={{
              padding: "20px 24px",
              borderRadius: 10,
              border: "1px solid #1a1a25",
              background: "#0d0d14",
              marginBottom: 32,
            }}
          >
            <p style={{ fontSize: 14, color: "#6b6b7b", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>🎓</span>
              <span>
                <strong style={{ color: "#a0a0aa" }}>M.Sc. Physics</strong> · Heidelberg University · 2025 – Present
              </span>
            </p>
          </div>
        </FadeIn>
        {EXPERIENCE.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} index={i} />
        ))}
      </section>

      <Divider />

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "72px 32px", maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <SectionHeading>Selected Projects</SectionHeading>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {PROJECTS.map((project, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "72px 32px", maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <SectionHeading>Tools & Skills</SectionHeading>
        </FadeIn>
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          {Object.entries(SKILLS).map(([category, items], ci) => (
            <FadeIn key={category} delay={ci * 0.1}>
              <div>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#c9a227",
                    marginBottom: 14,
                  }}
                >
                  {category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map((item) => (
                    <span
                      key={item}
                      className="skill-chip"
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        padding: "6px 14px",
                        borderRadius: 6,
                        background: "#14141f",
                        border: "1px solid #1a1a25",
                        color: "#8a8a96",
                        transition: "border-color 0.3s, color 0.3s",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── WRITING ── */}
      <section id="writing" style={{ padding: "72px 32px", maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <SectionHeading>Writing</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div
            style={{
              padding: 28,
              borderRadius: 12,
              border: "1px solid #1a1a25",
              background: "#12121a",
              transition: "border-color 0.3s",
            }}
            className="writing-card"
          >
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                marginBottom: 8,
              }}
            >
              Against the Narrative
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "#8a8a96", marginBottom: 20 }}>
              My independent data investigation newsletter. Each edition takes a
              widely held belief, pulls the data, and finds out what the numbers
              actually say.
            </p>
            <a
              href="https://basseat.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 18px",
                border: "1px solid #c9a227",
                borderRadius: 6,
                color: "#c9a227",
                display: "inline-block",
                transition: "background 0.3s",
              }}
              className="substack-btn"
            >
              Read on Substack ↗
            </a>
          </div>
        </FadeIn>
      </section>

      <Divider />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "72px 32px 100px", maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <SectionHeading>Contact</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#a0a0aa", fontWeight: 300, marginBottom: 24 }}>
            Open to data analyst, product analyst, analytics engineer, and business
            analyst roles in Germany. EU Blue Card eligible.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href="mailto:ayoadeabdulbasit@gmail.com"
              className="contact-primary"
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 20px",
                background: "#c9a227",
                borderRadius: 6,
                color: "#0a0a0f",
                display: "inline-block",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              ayoadeabdulbasit@gmail.com
            </a>
            <a
              href="/Abdulbasit_Ayoade_CV.pdf"
              download
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 20px",
                border: "1px solid #2a2a35",
                borderRadius: 6,
                color: "#e8e6e3",
                display: "inline-block",
                transition: "border-color 0.3s",
              }}
              className="link-btn"
            >
              Download CV ↓
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "24px 32px", borderTop: "1px solid #1a1a25", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#4a4a55" }}>© 2026 Abdulbasit Ayoade</p>
      </footer>
    </>
  );
}
