import { useState, useEffect } from "react";

const PROJECTS = [
  {
    title: "The God Metric",
    subtitle: "Global Secularisation",
    description:
      "PostgreSQL star schema and ETL pipeline exploring the relationship between economic development and religious decline across 190+ countries. Data sourced from Pew Research, Our World in Data, World Bank, and World Values Survey.",
    tools: ["PostgreSQL", "Python", "dbt", "Tableau"],
    github: "https://github.com/basseat/the-god-metric",
    color: "#b8a04a",
  },
  {
    title: "The Green Miles Problem",
    subtitle: "EU Logistics Emissions",
    description:
      "Investigation into the carbon cost of last-mile delivery across the European Union. Interactive Tableau dashboard visualising emissions by transport mode, distance, and country.",
    tools: ["Python", "Tableau", "SQL"],
    github: "https://github.com/basseat/green-miles-problem",
    color: "#4a9b6e",
  },
  {
    title: "The Attention Paradox",
    subtitle: "Gen Z Streaming Behaviour",
    description:
      "Data-driven look at how Generation Z consumes streaming content, challenging assumptions about short attention spans with patterns from real viewing data.",
    tools: ["Python", "Pandas", "Tableau"],
    github: "https://github.com/basseat/attention-paradox",
    color: "#6e7bb8",
  },
  {
    title: "A/B Test: Checkout Fraud",
    subtitle: "Experimentation Simulation",
    description:
      "End-to-end A/B testing simulation modelling the impact of a fraud-detection intervention on checkout conversion rates. Includes statistical power analysis and a Tableau dashboard.",
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

const NAV_ITEMS = ["About", "Projects", "Skills", "Writing", "Contact"];

function NavDot({ active }) {
  return (
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: active ? "#c9a227" : "#333340",
        display: "inline-block",
        marginRight: 8,
        transition: "background 0.3s",
      }}
    />
  );
}

function Divider() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px" }}>
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, #2a2a35 20%, #2a2a35 80%, transparent)",
        }}
      />
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        padding: 28,
        borderRadius: 10,
        border: `1px solid ${hovered ? project.color + "55" : "#1a1a25"}`,
        background: hovered ? "#12121a" : "transparent",
        transition: "all 0.3s ease",
        cursor: "pointer",
        color: "inherit",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: project.color,
              fontWeight: 500,
              marginTop: 2,
            }}
          >
            {project.subtitle}
          </p>
        </div>
        <span style={{ fontSize: 12, color: "#6b6b7b", fontWeight: 500 }}>
          View →
        </span>
      </div>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: "#8a8a96",
          marginTop: 12,
        }}
      >
        {project.description}
      </p>
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
    </a>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("About");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((name) => {
        const el = document.getElementById(name.toLowerCase());
        if (!el) return { name, top: Infinity };
        return { name, top: Math.abs(el.getBoundingClientRect().top - 80) };
      });
      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveSection(closest.name);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#0a0a0fdd",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #1a1a25",
          padding: "14px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          onClick={() => scrollTo("about")}
        >
          A.A.
        </span>
        <div className="nav-links" style={{ display: "flex", gap: 20 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              style={{
                background: "none",
                border: "none",
                color: activeSection === item ? "#e8e6e3" : "#6b6b7b",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: activeSection === item ? 500 : 400,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "color 0.3s",
              }}
            >
              <NavDot active={activeSection === item} />
              <span className="nav-label">{item}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* About */}
      <section
        id="about"
        style={{ padding: "100px 32px 80px", maxWidth: 720, margin: "0 auto" }}
      >
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
        <h1
          className="hero-title"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          Abdulbasit Ayoade
        </h1>
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
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "GitHub", href: "https://github.com/basseat" },
            {
              label: "Tableau",
              href: "https://public.tableau.com/app/profile/abdulbasit.ayoade",
            },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/abdulbasitayoade/" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 18px",
                border: "1px solid #2a2a35",
                borderRadius: 6,
                color: "#e8e6e3",
                transition: "border-color 0.3s, background 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#c9a227";
                e.currentTarget.style.background = "#c9a22710";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2a2a35";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </section>

      <Divider />

      {/* Projects */}
      <section
        id="projects"
        style={{ padding: "72px 32px", maxWidth: 720, margin: "0 auto" }}
      >
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
          Selected Projects
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </section>

      <Divider />

      {/* Skills */}
      <section
        id="skills"
        style={{ padding: "72px 32px", maxWidth: 720, margin: "0 auto" }}
      >
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
          Tools & Skills
        </h2>
        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#c9a227",
                  marginBottom: 12,
                }}
              >
                {category}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {items.map((item) => (
                  <span
                    key={item}
                    style={{ fontSize: 14, color: "#8a8a96", fontWeight: 400 }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Writing */}
      <section
        id="writing"
        style={{ padding: "72px 32px", maxWidth: 720, margin: "0 auto" }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "#6b6b7b",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Writing
        </h2>
        <div
          style={{
            padding: 28,
            borderRadius: 10,
            border: "1px solid #1a1a25",
            background: "#12121a",
          }}
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
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: "#8a8a96",
              marginBottom: 20,
            }}
          >
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
            }}
          >
            Read on Substack ↗
          </a>
        </div>
      </section>

      <Divider />

      {/* Contact */}
      <section
        id="contact"
        style={{
          padding: "72px 32px 100px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "#6b6b7b",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Contact
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#a0a0aa",
            fontWeight: 300,
            marginBottom: 24,
          }}
        >
          Open to data analyst, product analyst, analytics engineer, and business
          analyst roles in Germany. EU Blue Card eligible.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a
            href="mailto:ayoadeabdulbasit@gmail.com"
            style={{
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 18px",
              background: "#c9a227",
              borderRadius: 6,
              color: "#0a0a0f",
              display: "inline-block",
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
              padding: "8px 18px",
              border: "1px solid #2a2a35",
              borderRadius: 6,
              color: "#e8e6e3",
              display: "inline-block",
            }}
          >
            Download CV ↓
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "24px 32px",
          borderTop: "1px solid #1a1a25",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 12, color: "#4a4a55" }}>
          © 2026 Abdulbasit Ayoade
        </p>
      </footer>
    </>
  );
}
