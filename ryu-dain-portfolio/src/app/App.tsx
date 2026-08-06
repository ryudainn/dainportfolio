import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

/* ─── types ──────────────────────────────────────────────────────────────── */
type Section = "hero" | "about" | "experiences" | "projects" | "contact";
const SECTIONS: Section[] = ["hero", "about", "experiences", "projects", "contact"];

/* ─── scroll-snap hook ───────────────────────────────────────────────────── */
function useSectionScroll(active: Section, setActive: (s: Section) => void) {
  const locked = useRef(false);
  const transitioning = useRef(false);

  const goTo = useCallback((id: Section) => {
    if (transitioning.current) return;
    transitioning.current = true;
    locked.current = true;
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    // hold: unlock after animation settles
    setTimeout(() => { locked.current = false; }, 900);
    setTimeout(() => { transitioning.current = false; }, 950);
  }, [setActive]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (locked.current) { e.preventDefault(); return; }
      const dir = e.deltaY > 0 ? 1 : -1;
      const idx = SECTIONS.indexOf(active);
      const next = SECTIONS[Math.max(0, Math.min(SECTIONS.length - 1, idx + dir))];
      if (next === active) return;
      e.preventDefault();
      goTo(next);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [active, goTo]);

  useEffect(() => {
    // Keyboard nav
    const onKey = (e: KeyboardEvent) => {
      if (locked.current) return;
      const idx = SECTIONS.indexOf(active);
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        const next = SECTIONS[Math.min(SECTIONS.length - 1, idx + 1)];
        if (next !== active) goTo(next);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        const prev = SECTIONS[Math.max(0, idx - 1)];
        if (prev !== active) goTo(prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return { goTo };
}

/* ─── data ───────────────────────────────────────────────────────────────── */
const NODES = [
  { label: "Data Analysis",    x: 15, y: 20 },
  { label: "Machine Learning", x: 68, y: 12 },
  { label: "PM / Planning",    x: 86, y: 36 },
  { label: "SQL",              x: 80, y: 70 },
  { label: "Communication",    x: 52, y: 84 },
  { label: "Figma",            x: 20, y: 78 },
  { label: "Python",           x: 7,  y: 50 },
  { label: "DB / ERD 설계",     x: 36, y: 10 },
];

const EXPERIENCES = [
  {
    id: "it-committee",
    period: "2025.09 — 현재",
    role: "IT지원위원회 PM 위원",
    company: "숭실대학교 특별기구",
    desc: "학교 특별기구 소속으로 프로젝트를 총괄하며, 마케팅 기획과 유관 부서 커뮤니케이션을 담당하고 있습니다.",
    tags: ["Project Managing", "마케팅 기획", "부서 협업"],
  },
  {
    id: "startup-team",
    period: "2025.09 — 2025.12",
    role: "Pre-스타트업팀",
    company: "숭실대학교 창업지원단",
    desc: "교내 해커톤 대상 수상을 계기로 합류해 현직자 멘토링 캠프에 참여했고, 한양대 RISE 예비창업팀 프로그램에 함께 참여했습니다.",
    tags: ["창업", "멘토링", "예비창업"],
  },
  {
    id: "likelion-lead",
    period: "2024.12 — 2025.12",
    role: "멋쟁이사자처럼 13기 기획파트장",
    company: "숭실대학교",
    desc: "IT 기획·PM 세션을 운영하고 동아리박람회 부스를 총괄했습니다. 아이디어톤·해커톤 멘토링과 동아리 내 행사 기획 및 조직 관리를 맡았습니다.",
    tags: ["팀 리딩", "세션 운영", "행사 기획"],
  },
  {
    id: "research-assistant",
    period: "2024.09 — 2025.12",
    role: "지능시스템연구실 학부연구생",
    company: "숭실대학교",
    desc: "교내 데이터톤에 참여해 수상했으며, 머신러닝 기반 부동산 전세가격지수 예측 연구와 딥러닝을 활용한 킥보드 불법주차 탐지 프로젝트를 수행했습니다.",
    tags: ["머신러닝", "딥러닝", "연구"],
  },
  {
    id: "likelion-member",
    period: "2024.03 — 2024.12",
    role: "멋쟁이사자처럼 12기 기획 파트",
    company: "숭실대학교",
    desc: "IT 기획과 PM의 기본 개념을 학습하고 아이디어톤, 중앙해커톤 등에 참여했습니다. 3개월간 진행된 장기 프로젝트의 총괄 PM을 맡았습니다.",
    tags: ["기획", "해커톤", "PM"],
  },
];

const PROJECTS = [
  {
    title: "숭실대학교 특별장학금 통합 시스템 (SSUPORT)",
    year: "2026", co: "숭실대학교",
    kpi: "PM · 프로젝트 총괄",
    desc: "여러 절차로 흩어져 있던 학교 특별장학금 신청 과정을 하나의 웹서비스로 통합하는 프로젝트를 기획부터 총괄하고 있습니다.",
    tags: ["웹서비스", "PM", "0→1"],
  },
  {
    title: "딥러닝 기반 공유 전동 킥보드 불법주차 감지 시스템 최적화",
    year: "2025", co: "졸업 프로젝트",
    kpi: "데이터 수집 · 방법론 제안",
    desc: "딥러닝을 활용해 공유 전동 킥보드의 불법주차를 탐지하는 시스템을 최적화했습니다. 데이터 수집과 방법론 제안, 포스터 제작을 담당했습니다.",
    tags: ["딥러닝", "데이터 수집", "졸업 프로젝트"],
  },
  {
    title: "지역별 전세가격지수 예측 연구",
    year: "2025", co: "지능시스템연구실",
    kpi: "데이터 분석 연구 과제",
    desc: "머신러닝 기반으로 지역별 부동산 전세가격지수를 예측하는 연구를 수행했습니다.",
    tags: ["머신러닝", "데이터 분석", "연구"],
  },
  {
    title: "2025 UNITHON 일기짠",
    year: "2025", co: "교내 연합 해커톤 · 대상",
    kpi: "PM 겸 디자이너",
    desc: "교내 연합 해커톤에서 PM과 디자이너를 겸하며 서비스 기획과 디자인을 총괄해 대상을 수상했습니다.",
    tags: ["PM", "디자인", "해커톤"],
  },
  {
    title: "신한은행 헤이영 캠퍼스 제1회 아이디어 경진대회",
    year: "2025", co: "공모전",
    kpi: "PM · 팀장",
    desc: "아이디어 경진대회에서 팀장으로 기획과 디자인을 총괄했습니다.",
    tags: ["기획", "디자인", "팀 리딩"],
  },
  {
    title: "샐러리 앱서비스",
    year: "2024", co: "팀 프로젝트",
    kpi: "PM · 프로젝트 총괄",
    desc: "약 4개월간 진행된 앱서비스 프로젝트에서 PM으로 기획 전반을 총괄했습니다.",
    tags: ["앱서비스", "PM", "기획"],
  },
];

/* ─── shared ─────────────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-['DM_Mono'] text-[10px] tracking-[0.22em] text-primary/40">{n}</span>
      <div className="w-3 h-px bg-primary/20" />
      <span className="font-['DM_Mono'] text-[10px] tracking-[0.22em] text-primary/40 uppercase">{children}</span>
    </div>
  );
}

/* ─── side progress ──────────────────────────────────────────────────────── */
function SideProgress({ active, goTo }: { active: Section; goTo: (s: Section) => void }) {
  return (
    <div className="fixed right-7 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5">
      {SECTIONS.map((s) => (
        <button
          key={s}
          onClick={() => goTo(s)}
          className="group flex items-center gap-2 justify-end"
          title={s}
        >
          <span className={`text-[9px] font-['DM_Mono'] tracking-[0.12em] uppercase transition-all duration-300 ${
            active === s ? "text-foreground/60 opacity-100" : "text-foreground/0 group-hover:text-foreground/30 group-hover:opacity-100"
          }`}>
            {s}
          </span>
          <div className={`rounded-full transition-all duration-300 ${
            active === s ? "w-1 h-4 bg-primary" : "w-1 h-1 bg-foreground/20 group-hover:bg-foreground/40"
          }`} />
        </button>
      ))}
    </div>
  );
}

/* ─── nav ────────────────────────────────────────────────────────────────── */
function Nav({ active, goTo }: { active: Section; goTo: (s: Section) => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#0c0d1e]/90 backdrop-blur-2xl border-b border-foreground/[0.04]" : ""
    }`}>
      <div className="max-w-[1160px] mx-auto px-8 h-14 flex items-center justify-between">
        <button
          onClick={() => goTo("hero")}
          className="text-[12px] font-semibold tracking-[-0.02em] text-foreground hover:text-primary transition-colors"
        >
          RYU DAIN
        </button>
        <nav className="flex items-center gap-8">
          {(["about", "experiences", "projects", "contact"] as Section[]).map((s) => (
            <button
              key={s}
              onClick={() => goTo(s)}
              className={`text-[11px] tracking-[-0.01em] capitalize transition-colors ${
                active === s ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ─── hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  const mouseRef = useRef({ x: 50, y: 50 });
  const orbRef   = useRef({ x: 50, y: 50 });
  const [smoothPos, setSmoothPos] = useState({ x: 50, y: 50 });
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 };
    };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      orbRef.current.x += (mouseRef.current.x - orbRef.current.x) * 0.05;
      orbRef.current.y += (mouseRef.current.y - orbRef.current.y) * 0.05;
      setSmoothPos({ x: orbRef.current.x, y: orbRef.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Soft ivory-tinted orb */}
      <div
        className="pointer-events-none absolute w-[560px] h-[560px] rounded-full blur-[150px] opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #c8d8ff 0%, #8aabff 40%, transparent 75%)",
          left: `calc(${smoothPos.x}% - 280px)`,
          top:  `calc(${smoothPos.y}% - 280px)`,
        }}
      />
      {/* Static ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-[#8aabff]/5 blur-[100px]" />
      </div>
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(237,232,218,1) 1px, transparent 1px), linear-gradient(90deg, rgba(237,232,218,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.28 }}>
        {NODES.map((node) => (
          <line
            key={node.label}
            x1={`${smoothPos.x}%`} y1={`${smoothPos.y}%`}
            x2={`${node.x}%`} y2={`${node.y}%`}
            stroke="#ede8da"
            strokeWidth={hovered === node.label ? "0.7" : "0.35"}
            strokeDasharray="3 7"
          />
        ))}
      </svg>
      {NODES.map((node) => (
        <div
          key={node.label}
          className="absolute pointer-events-auto"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%,-50%)" }}
          onMouseEnter={() => setHovered(node.label)}
          onMouseLeave={() => setHovered(null)}
        >
          <span className={`text-[10px] tracking-[-0.01em] font-['DM_Mono'] whitespace-nowrap transition-colors duration-200 ${
            hovered === node.label ? "text-foreground/70" : "text-foreground/22"
          }`}>
            {node.label}
          </span>
        </div>
      ))}
      {/* Cursor dot */}
      <div
        className="pointer-events-none absolute w-1.5 h-1.5 rounded-full bg-primary"
        style={{
          left: `calc(${smoothPos.x}% - 3px)`,
          top:  `calc(${smoothPos.y}% - 3px)`,
          boxShadow: "0 0 10px 2px rgba(138,171,255,0.35)",
        }}
      />

      {/* Text — bottom-left anchor */}
      <div className="absolute bottom-14 left-0 right-0">
        <div className="max-w-[1160px] mx-auto px-8 flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="font-['DM_Mono'] text-[10px] tracking-[0.2em] text-primary/50 uppercase mb-4"
            >
              PM · Data Analyst · Seoul
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold text-[clamp(4rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.055em] text-foreground"
            >
              RYU
              <br />
              DAIN.
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="hidden md:flex flex-col items-end gap-1 pb-1.5"
          >
            <span className="font-['DM_Mono'] text-[10px] tracking-[0.1em] text-foreground/20">숭실대학교 산업정보시스템공학과</span>
            <span className="font-['DM_Mono'] text-[10px] tracking-[0.1em] text-foreground/20">37.5665°N 126.9780°E</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-['DM_Mono'] text-[8px] tracking-[0.2em] text-foreground/20 uppercase">scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-foreground/10 to-transparent" />
      </motion.div>
    </section>
  );
}

/* ─── about ──────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="min-h-screen flex items-center py-24 border-t border-foreground/[0.05]">
      <div className="max-w-[1160px] mx-auto px-8 w-full">
        <FadeIn><Label n="01">About</Label></FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-20 items-start">
          <FadeIn delay={0.08}>
            <h2 className="font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.0] tracking-[-0.045em] text-foreground">
              데이터로 문제를 찾고,
              <br />팀과 함께 제품을 만듭니다.
            </h2>
          </FadeIn>
          <FadeIn delay={0.14} className="flex flex-col gap-4">
            <p className="text-[14px] tracking-[-0.02em] leading-[1.8] text-muted-foreground font-light">
              안녕하세요, 숭실대학교 산업정보시스템공학과에 재학 중인 류다인입니다.
              팀과 함께 성장하고 제품의 A to Z를 설계합니다. 데이터 분석 및 머신러닝
              역량으로 데이터에 숨겨진 가치를 발굴합니다.
            </p>
            <p className="text-[14px] tracking-[-0.02em] leading-[1.8] text-muted-foreground font-light">
              문제 상황과 사용자 니즈에 맞고, 가치를 창출하는 IT 서비스를 만드는 것을
              목표로 여러 학교 프로젝트와 해커톤에서 기획·PM 역할을 맡아왔습니다.
            </p>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[
                { n: "5+", l: "Projects" },
                { n: "5", l: "Awards" },
                { n: "3", l: "PM Roles" },
                { n: "2", l: "Research" },
              ].map(({ n, l }) => (
                <div key={l} className="border-t border-foreground/[0.08] pt-4">
                  <p className="font-bold text-2xl tracking-[-0.05em] text-foreground">{n}</p>
                  <p className="font-['DM_Mono'] text-[10px] tracking-[0.08em] text-muted-foreground/50 mt-1 uppercase">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {["데이터 분석","머신러닝","Project Managing","Communication","SQL","Figma","Python","팀 리딩"].map((s) => (
                <span key={s} className="px-2.5 py-1 text-[10px] font-['DM_Mono'] tracking-[0.04em] rounded-full bg-secondary border border-foreground/[0.06] text-muted-foreground">{s}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── experiences ────────────────────────────────────────────────────────── */
function Experiences() {
  return (
    <section id="experiences" className="min-h-screen flex items-center py-24 border-t border-foreground/[0.05]">
      <div className="max-w-[1160px] mx-auto px-8 w-full">
        <FadeIn><Label n="02">Experiences</Label></FadeIn>
        {EXPERIENCES.map((e, i) => (
          <FadeIn key={e.id} delay={i * 0.07}>
            <div className="grid grid-cols-1 md:grid-cols-[130px_1fr] gap-4 md:gap-16 py-8 border-b border-foreground/[0.05] hover:border-foreground/[0.1] transition-colors">
              <p className="font-['DM_Mono'] text-[10px] tracking-[0.06em] text-muted-foreground/35 pt-0.5 whitespace-nowrap">{e.period}</p>
              <div>
                <p className="text-[15px] font-semibold tracking-[-0.03em] text-foreground">{e.role}</p>
                <p className="text-[12px] tracking-[-0.01em] text-primary/70 mt-0.5">{e.company}</p>
                <p className="mt-3 text-[13px] tracking-[-0.015em] leading-[1.75] text-muted-foreground font-light max-w-xl">{e.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {e.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[10px] font-['DM_Mono'] tracking-[0.04em] rounded-md bg-muted border border-foreground/[0.05] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── projects ───────────────────────────────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" className="min-h-screen flex items-center py-24 border-t border-foreground/[0.05]">
      <div className="max-w-[1160px] mx-auto px-8 w-full">
        <FadeIn><Label n="03">Selected Work</Label></FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/[0.05]">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <div className="bg-background p-8 hover:bg-secondary transition-colors duration-300 h-full flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-['DM_Mono'] text-[10px] tracking-[0.12em] text-muted-foreground/35 uppercase">{p.co} · {p.year}</p>
                    <h3 className="mt-1.5 text-[16px] font-semibold tracking-[-0.035em] text-foreground leading-tight">{p.title}</h3>
                  </div>
                  <span className="font-['DM_Mono'] text-[10px] tracking-[-0.01em] text-primary/60 whitespace-nowrap pt-5 shrink-0">{p.kpi}</span>
                </div>
                <p className="text-[13px] tracking-[-0.015em] leading-[1.75] text-muted-foreground font-light flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-1 text-[10px] font-['DM_Mono'] rounded-sm bg-muted/50 border border-foreground/[0.05] text-muted-foreground/60">{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── contact ────────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center py-24 border-t border-foreground/[0.05]">
      <div className="max-w-[1160px] mx-auto px-8 w-full">
        <FadeIn><Label n="04">Contact</Label></FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <FadeIn delay={0.08}>
            <h2 className="font-bold text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.94] tracking-[-0.055em] text-foreground">
              Let's build
              <br />
              <span className="text-primary/80">together.</span>
            </h2>
            <p className="mt-5 text-[13px] tracking-[-0.02em] leading-[1.8] text-muted-foreground font-light max-w-xs">
              함께할 프로젝트나 궁금한 점이 있다면 편하게 연락 주세요.
            </p>
            <div className="flex items-center gap-5 mt-8">
              {[
                { Icon: Mail,     label: "daihn03@naver.com", href: "mailto:daihn03@naver.com" },
                { Icon: Phone,    label: "010-9936-4397",     href: "tel:010-9936-4397" },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href}
                  className="flex items-center gap-2 text-[11px] tracking-[-0.01em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon size={12} />
                  {label}
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
              {[
                { label: "Name",    type: "text",  placeholder: "Your name" },
                { label: "Email",   type: "email", placeholder: "your@email.com" },
              ].map(({ label, type, placeholder }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <label className="font-['DM_Mono'] text-[10px] tracking-[0.16em] text-muted-foreground/35 uppercase">{label}</label>
                  <input type={type} placeholder={placeholder}
                    className="px-4 py-3 bg-card border border-foreground/[0.07] rounded-lg text-[13px] tracking-[-0.02em] text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:border-primary/25 transition-colors"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="font-['DM_Mono'] text-[10px] tracking-[0.16em] text-muted-foreground/35 uppercase">Message</label>
                <textarea rows={4} placeholder="Tell me about your project or just say hi..."
                  className="px-4 py-3 bg-card border border-foreground/[0.07] rounded-lg text-[13px] tracking-[-0.02em] text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:border-primary/25 transition-colors resize-none"
                />
              </div>
              <button type="submit"
                className="self-start mt-1 group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-[#0c0d1e] text-[12px] tracking-[-0.02em] font-semibold hover:bg-[#adc4ff] transition-colors"
              >
                Send
                <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-foreground/[0.04] py-7">
      <div className="max-w-[1160px] mx-auto px-8 flex items-center justify-between">
        <p className="font-['DM_Mono'] text-[10px] tracking-[0.1em] text-foreground/20">RYU DAIN</p>
        <p className="font-['DM_Mono'] text-[10px] tracking-[0.1em] text-foreground/15">© 2026</p>
      </div>
    </footer>
  );
}

/* ─── app ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState<Section>("hero");
  const { goTo } = useSectionScroll(active, setActive);

  // Sync active section on scroll (for when scroll-snap releases)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id as Section); }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="bg-background text-foreground antialiased"
      style={{ fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, sans-serif" }}
    >
      <Nav active={active} goTo={goTo} />
      <SideProgress active={active} goTo={goTo} />
      <Hero />
      <About />
      <Experiences />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
