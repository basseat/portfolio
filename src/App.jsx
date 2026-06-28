import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// ─── THEME ─────────────────────────────────────────────

const ThemeContext = createContext();

const THEMES = {
  dark: {
    bg: "#0a0a0f",
    bgNav: "#0a0a0fee",
    bgNavTransparent: "#0a0a0faa",
    bgCard: "#12121a",
    bgCardHover: "#12121a",
    bgChip: "#14141f",
    bgInput: "#0d0d14",
    accent: "#c9a227",
    text: "#e8e6e3",
    textSecondary: "#a0a0aa",
    textMuted: "#8a8a96",
    textFaint: "#6b6b7b",
    textFooter: "#4a4a55",
    border: "#1a1a25",
    borderHover: "#2a2a35",
    dotInactive: "#333340",
    dividerGrad: "linear-gradient(90deg, transparent, #2a2a35 20%, #2a2a35 80%, transparent)",
    gridColor: "rgba(201, 162, 39, 0.06)",
    selection: "#c9a22744",
    scrollThumb: "#333340",
  },
  light: {
    bg: "#f8f7f4",
    bgNav: "#f8f7f4ee",
    bgNavTransparent: "#f8f7f4aa",
    bgCard: "#ffffff",
    bgCardHover: "#ffffff",
    bgChip: "#f0efe8",
    bgInput: "#f0efe8",
    accent: "#b08d1e",
    text: "#1a1a1f",
    textSecondary: "#3a3a42",
    textMuted: "#5a5a65",
    textFaint: "#7a7a85",
    textFooter: "#9a9aa0",
    border: "#e0ddd4",
    borderHover: "#c8c4b8",
    dotInactive: "#c8c4b8",
    dividerGrad: "linear-gradient(90deg, transparent, #d8d4c8 20%, #d8d4c8 80%, transparent)",
    gridColor: "rgba(176, 141, 30, 0.06)",
    selection: "#b08d1e33",
    scrollThumb: "#c8c4b8",
  },
};

function useTheme() {
  return useContext(ThemeContext);
}

// ─── i18n ──────────────────────────────────────────────

const LangContext = createContext();

function useLang() {
  return useContext(LangContext);
}

const TRANSLATIONS = {
  en: {
    tagline: "Against the Narrative",
    heroParagraph1:
      "Since 2022, I have been exploring data to help organisations make better, more informed decisions. From fraud detection at scale across 30+ countries to building internal controls frameworks and uncovering product usage patterns, my work sits at the intersection of analytics, product, risk, and operations.",
    heroParagraph2:
      "Currently pursuing an M.Sc. in Physics at Heidelberg University, where I am sharpening my quantitative thinking while continuing to build data projects that challenge conventional narratives. I write SQL, think in pipelines, and believe the most useful analysis, whether it is a funnel breakdown or a risk model, is the one that changes how you see the problem.",
    navAbout: "About",
    navExperience: "Experience",
    navProjects: "Projects",
    navSkills: "Skills",
    navWriting: "Writing",
    navContact: "Contact",
    sectionExperience: "Experience",
    sectionProjects: "Selected Projects",
    sectionSkills: "Tools & Skills",
    sectionWriting: "Writing",
    sectionContact: "Contact",
    clickToExpand: "Click to expand",
    viewOnGithub: "View on GitHub →",
    readOnSubstack: "Read on Substack ↗",
    writingTitle: "Against the Narrative",
    writingDescription:
      "My independent data investigation newsletter. Each edition takes a widely held belief, pulls the data, and finds out what the numbers actually say.",
    contactText:
      "Open to data analyst, product analyst, analytics engineer, and business analyst roles in Germany. EU Blue Card eligible.",
    downloadCv: "Download CV ↓",
    education: "M.Sc. Physics",
    educationPlace: "Heidelberg University",
    educationPeriod: "2025 – Present",
    statCountries: "Countries",
    statYears: "Years",
    statProjects: "Projects",
    statCompanies: "Companies",
    skillData: "Data & SQL",
    skillAnalysis: "Analysis & Viz",
    skillAutomation: "Automation",
    skillDomain: "Domain",
    exp9psb: {
      role: "Internal Controls & Business Analyst",
      highlights: [
        "Designed and maintained the internal controls framework, aligning operational processes with regulatory requirements across banking operations",
        "Built automated reporting pipelines using Power Automate and SQL, reducing manual reconciliation effort",
        "Developed dashboards in Power BI to track key risk indicators and operational performance metrics",
      ],
    },
    expKuda: {
      role: "Business Analyst",
      highlights: [
        "Supported business and product decisions through data analysis using BigQuery across a rapidly scaling digital banking platform",
        "Developed automated reporting systems and dashboards to track key performance indicators for operations and product teams",
        "Collaborated with product and engineering on requirements gathering and process improvements for customer onboarding workflows",
      ],
    },
    expFlutterwave: {
      role: "Business Analyst",
      highlights: [
        "Analysed high-volume transactional data across 30+ countries using Amazon Redshift to surface insights on payment performance, conversion trends, and operational efficiency",
        "Built SQL-based dashboards and automated reporting pipelines, enabling real-time decision-making for cross-functional stakeholders",
        "Partnered with product and operations teams to define business requirements and improve transaction processing workflows",
      ],
    },
    expSql: {
      role: "SQL Tutor",
      roleDetail: "Freelance & Weekend Instructor",
      highlights: [
        "Delivered SQL training covering database design, advanced queries, indexing, and data analysis workflows",
        "Designed practical projects to help learners build real-world data analytics and reporting skills",
      ],
    },
    projKaufly: {
      title: "Kaufly Analytics",
      subtitle: "dbt E-Commerce Pipeline",
      description:
        "End-to-end dbt analytics pipeline for a fictional DACH-region e-commerce platform, transforming 1.5M+ records through staging, intermediate, and mart layers.",
      detail:
        "21 models across four business domains (product, operations, revenue, membership) with 69 automated tests. Includes conversion funnels, customer LTV, delivery SLA tracking, and Kaufly+ membership impact analysis with AOV uplift measurement.",
    },
    projGodMetric: {
      title: "The God Metric",
      subtitle: "Global Secularisation",
      description:
        "PostgreSQL star schema and ETL pipeline exploring the relationship between economic development and religious decline across 190+ countries.",
      detail:
        "Data sourced from Pew Research, Our World in Data, World Bank, and World Values Survey. Built a dimensional model with fact and dimension tables, automated ETL with Python, and visualised findings in Tableau.",
    },
    projGreenMiles: {
      title: "The Green Miles Problem",
      subtitle: "EU Logistics Emissions",
      description:
        "Investigation into the carbon cost of last-mile delivery across the European Union.",
      detail:
        "Interactive Tableau dashboard visualising emissions by transport mode, distance, and country. Highlights how delivery speed preferences affect carbon output across different EU member states.",
    },
    projAttention: {
      title: "The Attention Paradox",
      subtitle: "Gen Z Streaming Behaviour",
      description:
        "Data-driven look at how Generation Z consumes streaming content, challenging assumptions about short attention spans.",
      detail:
        "Analysis of real viewing data reveals patterns that contradict the conventional narrative about Gen Z engagement. Visualised in Tableau with interactive filtering by platform and content type.",
    },
    projAbTest: {
      title: "A/B Test: Checkout Fraud",
      subtitle: "Experimentation Simulation",
      description:
        "End-to-end A/B testing simulation modelling the impact of a fraud-detection intervention on checkout conversion rates.",
      detail:
        "Includes statistical power analysis, two-proportion z-tests, confidence intervals, and sensitivity analysis to fraud cost multipliers. The experiment reveals that higher conversion is a net negative when fraud costs are realistic.",
    },
  },
  de: {
    tagline: "Against the Narrative",
    heroParagraph1:
      "Seit 2022 arbeite ich mit Daten, um Organisationen bei besseren, fundierteren Entscheidungen zu unterstützen. Von Betrugserkennung in über 30 Ländern bis zum Aufbau interner Kontrollsysteme und der Analyse von Produktnutzungsmustern liegt meine Arbeit an der Schnittstelle von Analytics, Produkt, Risiko und Operations.",
    heroParagraph2:
      "Derzeit studiere ich M.Sc. Physik an der Universität Heidelberg, wo ich mein quantitatives Denken schärfe und weiterhin Datenprojekte entwickle, die gängige Annahmen hinterfragen. Ich schreibe SQL, denke in Pipelines und bin überzeugt, dass die nützlichste Analyse, ob Funnel-Analyse oder Risikomodell, diejenige ist, die den Blick auf das Problem verändert.",
    navAbout: "Über mich",
    navExperience: "Erfahrung",
    navProjects: "Projekte",
    navSkills: "Skills",
    navWriting: "Schreiben",
    navContact: "Kontakt",
    sectionExperience: "Berufserfahrung",
    sectionProjects: "Ausgewählte Projekte",
    sectionSkills: "Tools & Skills",
    sectionWriting: "Schreiben",
    sectionContact: "Kontakt",
    clickToExpand: "Klicken zum Erweitern",
    viewOnGithub: "Auf GitHub ansehen →",
    readOnSubstack: "Auf Substack lesen ↗",
    writingTitle: "Against the Narrative",
    writingDescription:
      "Mein unabhängiger Newsletter für Datenrecherchen. Jede Ausgabe nimmt eine weit verbreitete Annahme, prüft die Daten und findet heraus, was die Zahlen wirklich sagen.",
    contactText:
      "Offen für Positionen als Data Analyst, Product Analyst, Analytics Engineer und Business Analyst in Deutschland. EU Blue Card berechtigt.",
    downloadCv: "Lebenslauf herunterladen ↓",
    education: "M.Sc. Physik",
    educationPlace: "Universität Heidelberg",
    educationPeriod: "2025 – heute",
    statCountries: "Länder",
    statYears: "Jahre",
    statProjects: "Projekte",
    statCompanies: "Unternehmen",
    skillData: "Daten & SQL",
    skillAnalysis: "Analyse & Viz",
    skillAutomation: "Automatisierung",
    skillDomain: "Fachgebiete",
    exp9psb: {
      role: "Internal Controls & Business Analyst",
      highlights: [
        "Gestaltung und Pflege des internen Kontrollsystems, Abstimmung operativer Prozesse mit regulatorischen Anforderungen im Bankwesen",
        "Aufbau automatisierter Berichtspipelines mit Power Automate und SQL zur Reduktion manueller Abstimmungsarbeit",
        "Entwicklung von Dashboards in Power BI zur Überwachung von Risikoindikatoren und operativen Leistungskennzahlen",
      ],
    },
    expKuda: {
      role: "Business Analyst",
      highlights: [
        "Unterstützung von Geschäfts- und Produktentscheidungen durch Datenanalyse mit BigQuery bei einer schnell wachsenden digitalen Bankplattform",
        "Entwicklung automatisierter Berichtssysteme und Dashboards zur Verfolgung zentraler Leistungskennzahlen",
        "Zusammenarbeit mit Produkt- und Entwicklungsteams bei der Anforderungserhebung und Prozessverbesserung für Kunden-Onboarding-Workflows",
      ],
    },
    expFlutterwave: {
      role: "Business Analyst",
      highlights: [
        "Analyse großvolumiger Transaktionsdaten aus 30+ Ländern mit Amazon Redshift für Erkenntnisse zu Zahlungsperformance, Conversion-Trends und operativer Effizienz",
        "Erstellung SQL-basierter Dashboards und automatisierter Berichtspipelines für datengestützte Entscheidungsfindung",
        "Partnerschaft mit Produkt- und Operationsteams zur Definition von Geschäftsanforderungen und Verbesserung von Transaktionsverarbeitungs-Workflows",
      ],
    },
    expSql: {
      role: "SQL-Tutor",
      roleDetail: "Freiberuflich & Wochenend-Dozent",
      highlights: [
        "SQL-Schulungen zu Datenbankdesign, fortgeschrittenen Abfragen, Indizierung und Datenanalyse-Workflows",
        "Gestaltung praktischer Projekte zum Aufbau realer Datenanalyse- und Berichtskompetenzen",
      ],
    },
    projKaufly: {
      title: "Kaufly Analytics",
      subtitle: "dbt E-Commerce-Pipeline",
      description:
        "End-to-End dbt-Analytics-Pipeline für eine fiktive E-Commerce-Plattform in der DACH-Region mit Transformation von über 1,5 Mio. Datensätzen durch Staging-, Intermediate- und Mart-Schichten.",
      detail:
        "21 Modelle in vier Geschäftsbereichen (Produkt, Operations, Umsatz, Mitgliedschaft) mit 69 automatisierten Tests. Umfasst Conversion-Funnels, Kunden-LTV, Lieferungs-SLA-Tracking und Kaufly+ Mitgliedschafts-Impact-Analyse mit AOV-Uplift-Messung.",
    },
    projGodMetric: {
      title: "The God Metric",
      subtitle: "Globale Säkularisierung",
      description:
        "PostgreSQL-Star-Schema und ETL-Pipeline zur Untersuchung des Zusammenhangs zwischen wirtschaftlicher Entwicklung und religiösem Rückgang in über 190 Ländern.",
      detail:
        "Daten von Pew Research, Our World in Data, Weltbank und World Values Survey. Dimensionales Modell mit Fakten- und Dimensionstabellen, automatisiertes ETL mit Python und Visualisierung in Tableau.",
    },
    projGreenMiles: {
      title: "The Green Miles Problem",
      subtitle: "EU-Logistikemissionen",
      description:
        "Untersuchung der CO2-Kosten der letzten Meile in der Europäischen Union.",
      detail:
        "Interaktives Tableau-Dashboard zur Visualisierung von Emissionen nach Transportmittel, Entfernung und Land. Zeigt, wie Liefergeschwindigkeitspräferenzen den CO2-Ausstoß beeinflussen.",
    },
    projAttention: {
      title: "The Attention Paradox",
      subtitle: "Gen-Z-Streamingverhalten",
      description:
        "Datengetriebene Analyse des Streaming-Konsums der Generation Z, die Annahmen über kurze Aufmerksamkeitsspannen hinterfragt.",
      detail:
        "Die Analyse realer Zuschauerdaten zeigt Muster, die der konventionellen Erzählung über das Engagement der Gen Z widersprechen. Visualisiert in Tableau mit interaktiver Filterung.",
    },
    projAbTest: {
      title: "A/B-Test: Checkout-Betrug",
      subtitle: "Experimentierungssimulation",
      description:
        "End-to-End A/B-Test-Simulation zur Modellierung der Auswirkungen einer Betrugserkennungsmaßnahme auf die Checkout-Conversion-Rate.",
      detail:
        "Umfasst statistische Poweranalyse, Zwei-Proportionen-z-Tests, Konfidenzintervalle und Sensitivitätsanalyse. Das Experiment zeigt, dass höhere Conversion bei realistischen Betrugskosten ein Nettoverlust ist.",
    },
  },
};

// ─── DATA (language-aware) ─────────────────────────────

function useData() {
  const { t } = useLang();

  const EXPERIENCE = [
    {
      role: t.exp9psb.role,
      company: "9 Payment Service Bank",
      url: "https://9psb.com.ng/",
      location: "Lagos, Nigeria",
      period: "Jul 2024 – May 2025",
      highlights: t.exp9psb.highlights,
    },
    {
      role: t.expKuda.role,
      company: "Kuda",
      url: "https://www.kuda.com/",
      location: "Lagos, Nigeria",
      period: "Jul 2023 – Jul 2024",
      highlights: t.expKuda.highlights,
    },
    {
      role: t.expFlutterwave.role,
      company: "Flutterwave",
      url: "https://flutterwave.com/eu/",
      location: "San Francisco, CA (Remote)",
      period: "Aug 2022 – Apr 2023",
      highlights: t.expFlutterwave.highlights,
    },
  ];

  const PROJECTS = [
    {
      title: t.projKaufly.title,
      subtitle: t.projKaufly.subtitle,
      description: t.projKaufly.description,
      detail: t.projKaufly.detail,
      tools: ["dbt", "PostgreSQL", "Python", "SQL"],
      github: "https://github.com/basseat/kaufly-analytics",
      color: "#2e86de",
    },
    {
      title: t.projGodMetric.title,
      subtitle: t.projGodMetric.subtitle,
      description: t.projGodMetric.description,
      detail: t.projGodMetric.detail,
      tools: ["PostgreSQL", "Python", "dbt", "Tableau"],
      github: "https://github.com/basseat/the-god-metric",
      color: "#b8a04a",
    },
    {
      title: t.projGreenMiles.title,
      subtitle: t.projGreenMiles.subtitle,
      description: t.projGreenMiles.description,
      detail: t.projGreenMiles.detail,
      tools: ["Python", "Tableau", "SQL"],
      github: "https://github.com/basseat/green-miles-problem",
      color: "#4a9b6e",
    },
    {
      title: t.projAttention.title,
      subtitle: t.projAttention.subtitle,
      description: t.projAttention.description,
      detail: t.projAttention.detail,
      tools: ["Python", "Pandas", "Tableau"],
      github: "https://github.com/basseat/attention-paradox",
      color: "#6e7bb8",
    },
    {
      title: t.projAbTest.title,
      subtitle: t.projAbTest.subtitle,
      description: t.projAbTest.description,
      detail: t.projAbTest.detail,
      tools: ["Python", "Statistics", "Tableau"],
      github: "https://github.com/basseat/ab-test-checkout-fraud",
      color: "#b85a4a",
    },
  ];

  const SKILLS = {
    [t.skillData]: ["PostgreSQL", "BigQuery", "Amazon Redshift", "MySQL", "dbt"],
    [t.skillAnalysis]: ["Python", "Pandas", "Tableau", "Power BI"],
    [t.skillAutomation]: ["Power Automate", "n8n", "Claude", "Cursor"],
    [t.skillDomain]: ["Fraud Analytics", "Internal Controls", "Fintech", "Products", "Cybersecurity (ISC2 CC)"],
  };

  const STATS = [
    { value: "30+", label: t.statCountries },
    { value: "3+", label: t.statYears },
    { value: "5", label: t.statProjects },
    { value: "4", label: t.statCompanies },
  ];

  const NAV_ITEMS = [
    { id: "about", label: t.navAbout },
    { id: "experience", label: t.navExperience },
    { id: "projects", label: t.navProjects },
    { id: "skills", label: t.navSkills },
    { id: "writing", label: t.navWriting },
    { id: "contact", label: t.navContact },
  ];

  return { EXPERIENCE, PROJECTS, SKILLS, STATS, NAV_ITEMS };
}

// ─── HOOKS ─────────────────────────────────────────────

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

function useActiveSection(navItems) {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return active;
}

// ─── ANIMATED COMPONENTS ───────────────────────────────

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
  const theme = useTheme();

  useEffect(() => {
    if (!isVisible) return;
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
          color: theme.accent,
          letterSpacing: "-0.02em",
        }}
      >
        {count}{suffix}
      </div>
      <div style={{ fontSize: 13, color: theme.textFaint, fontWeight: 500, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </div>
    </div>
  );
}

// ─── GRID BACKGROUND ───────────────────────────────────

function GridBackground() {
  const theme = useTheme();
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
            linear-gradient(${theme.gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)
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
          background: `radial-gradient(circle, ${theme.accent}14 0%, transparent 70%)`,
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

// ─── TOGGLE BUTTONS ────────────────────────────────────

function ThemeToggle() {
  const theme = useTheme();
  const { mode, setMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: `1px solid ${theme.border}`,
        borderRadius: 6,
        padding: "6px 8px",
        cursor: "pointer",
        fontSize: 16,
        lineHeight: 1,
        color: theme.text,
        transition: "border-color 0.3s",
      }}
    >
      {mode === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

function LangToggle() {
  const theme = useTheme();
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "de" : "en")}
      aria-label="Toggle language"
      style={{
        background: "none",
        border: `1px solid ${theme.border}`,
        borderRadius: 6,
        padding: "5px 10px",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "'Space Grotesk', sans-serif",
        color: theme.accent,
        transition: "border-color 0.3s",
        letterSpacing: "0.04em",
      }}
    >
      {lang === "en" ? "DE" : "EN"}
    </button>
  );
}

// ─── NAV ───────────────────────────────────────────────

function Nav() {
  const theme = useTheme();
  const { NAV_ITEMS } = useData();
  const active = useActiveSection(NAV_ITEMS);
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
        background: scrolled ? theme.bgNav : theme.bgNavTransparent,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? theme.border : "transparent"}`,
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
          color: theme.accent,
          letterSpacing: "-0.02em",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        A.A.
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="nav-links" style={{ display: "flex", gap: 18 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "none",
                border: "none",
                color: active === item.id ? theme.text : theme.textFaint,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: active === item.id ? 500 : 400,
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
                  background: active === item.id ? theme.accent : theme.dotInactive,
                  transition: "background 0.3s",
                }}
              />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
        <div style={{ width: 1, height: 18, background: theme.border, margin: "0 4px" }} />
        <LangToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}

// ─── PROJECT CARD ──────────────────────────────────────

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const { t } = useLang();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
      style={{
        padding: 28,
        borderRadius: 12,
        border: `1px solid ${hovered || expanded ? project.color + "55" : theme.border}`,
        background: hovered || expanded ? theme.bgCardHover : "transparent",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em", color: theme.text }}>
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
              color: theme.textFaint,
              transform: expanded ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.3s ease",
              display: "inline-block",
            }}
          >
            ↓
          </span>
        </div>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: theme.textMuted, marginTop: 12 }}>
        {project.description}
      </p>

      <div
        style={{
          maxHeight: expanded ? 200 : 0,
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
        }}
      >
        <p style={{ fontSize: 14, lineHeight: 1.65, color: theme.textSecondary, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.border}` }}>
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
          {t.viewOnGithub}
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
              background: theme.bgChip,
              color: theme.textMuted,
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── EXPERIENCE CARD ───────────────────────────────────

function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const { t } = useLang();

  return (
    <FadeIn delay={index * 0.1}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          gap: 24,
          cursor: "pointer",
          padding: "24px 0",
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6, minWidth: 20 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: expanded ? theme.accent : theme.dotInactive,
              border: `2px solid ${expanded ? theme.accent : theme.textFooter}`,
              transition: "all 0.3s",
              flexShrink: 0,
            }}
          />
          <div style={{ width: 1, flex: 1, background: theme.border, marginTop: 8 }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 600, color: theme.text }}>
                {exp.role}
              </h3>
              <p style={{ fontSize: 14, color: theme.accent, fontWeight: 500, marginTop: 2 }}>
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: theme.accent, fontWeight: 500 }}
                >
                  {exp.company}
                </a>
                <span style={{ color: theme.textFaint, fontWeight: 400 }}> · {exp.location}</span>
              </p>
            </div>
            <span style={{ fontSize: 13, color: theme.textFaint, fontStyle: "italic", whiteSpace: "nowrap" }}>
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
                    color: theme.textMuted,
                    marginBottom: 8,
                    position: "relative",
                    paddingLeft: 12,
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: theme.accent + "77" }}>·</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {!expanded && (
            <p style={{ fontSize: 13, color: theme.textFooter, marginTop: 8 }}>{t.clickToExpand}</p>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── DIVIDER ───────────────────────────────────────────

function Divider() {
  const theme = useTheme();
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>
      <div style={{ height: 1, background: theme.dividerGrad }} />
    </div>
  );
}

// ─── SECTION HEADING ───────────────────────────────────

function SectionHeading({ children }) {
  const theme = useTheme();
  return (
    <h2
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: theme.textFaint,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: 40,
      }}
    >
      {children}
    </h2>
  );
}

// ─── DYNAMIC STYLES ────────────────────────────────────

function DynamicStyles() {
  const theme = useTheme();
  return (
    <style>{`
      body {
        background: ${theme.bg} !important;
        color: ${theme.text} !important;
        transition: background 0.3s ease, color 0.3s ease;
      }
      ::selection {
        background: ${theme.selection};
      }
      ::-webkit-scrollbar-thumb {
        background: ${theme.scrollThumb};
      }
      .link-btn:hover {
        border-color: ${theme.accent} !important;
        background: ${theme.accent}10 !important;
      }
      .skill-chip:hover {
        border-color: ${theme.accent}55 !important;
        color: ${theme.accent} !important;
      }
      .contact-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 20px ${theme.accent}40;
      }
      .writing-card:hover {
        border-color: ${theme.accent}44 !important;
      }
      .substack-btn:hover {
        background: ${theme.accent}1a !important;
      }
      @media (max-width: 640px) {
        .nav-links { gap: 10px !important; }
        .nav-label { display: none; }
        .hero-title { font-size: 32px !important; }
        .skills-grid { grid-template-columns: 1fr !important; }
        .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        .nav-toggles { gap: 6px !important; }
      }
    `}</style>
  );
}

// ─── MAIN APP ──────────────────────────────────────────

function AppContent() {
  const theme = useTheme();
  const { t } = useLang();
  const { EXPERIENCE, PROJECTS, SKILLS, STATS, NAV_ITEMS } = useData();

  return (
    <>
      <DynamicStyles />
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
              color: theme.accent,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {t.tagline}
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
              color: theme.text,
            }}
          >
            Abdulbasit Ayoade
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: theme.textSecondary, fontWeight: 300, maxWidth: 580, marginBottom: 16 }}>
            {t.heroParagraph1}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: theme.textSecondary, fontWeight: 300, maxWidth: 580 }}>
            {t.heroParagraph2}
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
                  border: `1px solid ${theme.borderHover}`,
                  borderRadius: 6,
                  color: theme.text,
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
            borderTop: `1px solid ${theme.border}`,
            borderBottom: `1px solid ${theme.border}`,
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
          <SectionHeading>{t.sectionExperience}</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.05}>
          <div
            style={{
              padding: "20px 24px",
              borderRadius: 10,
              border: `1px solid ${theme.border}`,
              background: theme.bgInput,
              marginBottom: 32,
            }}
          >
            <p style={{ fontSize: 14, color: theme.textFaint, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>🎓</span>
              <span>
                <strong style={{ color: theme.textSecondary }}>{t.education}</strong> · {t.educationPlace} · {t.educationPeriod}
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
          <SectionHeading>{t.sectionProjects}</SectionHeading>
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
          <SectionHeading>{t.sectionSkills}</SectionHeading>
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
                    color: theme.accent,
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
                        background: theme.bgChip,
                        border: `1px solid ${theme.border}`,
                        color: theme.textMuted,
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
          <SectionHeading>{t.sectionWriting}</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div
            style={{
              padding: 28,
              borderRadius: 12,
              border: `1px solid ${theme.border}`,
              background: theme.bgCard,
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
                color: theme.text,
              }}
            >
              {t.writingTitle}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: theme.textMuted, marginBottom: 20 }}>
              {t.writingDescription}
            </p>
            <a
              href="https://basseat.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 18px",
                border: `1px solid ${theme.accent}`,
                borderRadius: 6,
                color: theme.accent,
                display: "inline-block",
                transition: "background 0.3s",
              }}
              className="substack-btn"
            >
              {t.readOnSubstack}
            </a>
          </div>
        </FadeIn>
      </section>

      <Divider />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "72px 32px 100px", maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <SectionHeading>{t.sectionContact}</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: theme.textSecondary, fontWeight: 300, marginBottom: 24 }}>
            {t.contactText}
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
                background: theme.accent,
                borderRadius: 6,
                color: theme.bg,
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
                border: `1px solid ${theme.borderHover}`,
                borderRadius: 6,
                color: theme.text,
                display: "inline-block",
                transition: "border-color 0.3s",
              }}
              className="link-btn"
            >
              {t.downloadCv}
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "24px 32px", borderTop: `1px solid ${theme.border}`, textAlign: "center" }}>
        <p style={{ fontSize: 12, color: theme.textFooter }}>© 2026 Abdulbasit Ayoade</p>
      </footer>
    </>
  );
}

export default function App() {
  const [mode, setMode] = useState(() => {
    try {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } catch {
      return "dark";
    }
  });
  const [lang, setLang] = useState("en");
  const theme = THEMES[mode];
  const t = TRANSLATIONS[lang];

  return (
    <ThemeContext.Provider value={{ ...theme, mode, setMode }}>
      <LangContext.Provider value={{ lang, setLang, t }}>
        <AppContent />
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}
