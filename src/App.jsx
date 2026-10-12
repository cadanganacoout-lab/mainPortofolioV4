import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Camera,
  CodeXml,
  ExternalLink,
  Globe,
  Headphones,
  Mail,
  MapPin,
  MoonStar,
  Pause,
  Play,
  SunMedium,
  Volume1,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const projectData = [
  {
    number: '01',
    category: 'Class website',
    title: 'Website Kelas XI RPL',
    description: 'A class profile website for XI RPL at SMK PGRI 2 Ponorogo, featuring students, teachers, and class activities.',
    technologies: ['HTML', 'CSS', 'JS'],
    href: 'https://11rplsterida.vercel.app/',
    visual: 'class',
    visualLabel: '11 RPL',
    visualNote: 'Meet the XI RPL class.',
  },
  {
    number: '02',
    category: 'Personal portfolio',
    title: 'Personal Portfolio',
    description: 'A personal portfolio showcasing my education, skills, and completed projects.',
    technologies: ['React'],
    href: 'https://gilangfaid.vercel.app/',
    visual: 'portfolio',
    visualLabel: 'GILANG.',
    visualNote: 'Get to know me.',
  },
  {
    number: '03',
    category: 'Class app',
    title: 'Aplikasi Kelas XI RPL',
    description: 'An app for XI RPL at SMK PGRI 2 Ponorogo, made as a keepsake before we go our separate ways for internships.',
    technologies: ['Dart', 'Flutter'],
    href: 'https://download-landing-page.vercel.app/',
    visual: 'mobile',
    visualLabel: 'CLASS',
    visualNote: 'Memories you can carry.',
  },
  {
    number: '04',
    category: 'Gateway website',
    title: 'GateWay',
    description: 'A gateway website that brings all of my projects together.',
    technologies: ['HTML', 'CSS', 'JS'],
    href: 'https://pageoflang.vercel.app/',
    visual: 'gateway',
    visualLabel: 'GATEWAY',
    visualNote: 'One place for all my projects.',
  },
  {
    number: '05',
    category: 'Web Edukasi',
    title: 'EduFuture',
    description: 'A Website To Provide Quality Education.',
    technologies: ['React', 'CSS', 'JS'],
    href: 'https://itx-2026-web-dev-coppy-paste-smk-pg.vercel.app/',
    visual: 'edufuture',
    visualLabel: 'EDUFUTURE',
    visualNote: 'One place for all my projects.',
  },
];

const educationData = [
  {
    period: '2025 — present',
    school: 'SMK PGRI 2 Ponorogo',
    detail: 'Vocational high school · Grade 11 Software Engineering, focused on frontend and penetration testing.',
  },
  {
    period: '2022 — 2025',
    school: 'MTSN Darul Huda Mayak',
    detail: 'Junior high school, with a focus on character and good manners.',
  },
  {
    period: '2016 — 2022',
    school: 'MI Ma`arif Mayak',
    detail: 'Elementary school; active in the computer extracurricular program.',
  },
];

const skillData = [
  { name: 'HTML', level: 90 },
  { name: 'CSS', level: 85 },
  { name: 'JavaScript', level: 90 },
  { name: 'React.js', level: 30 },
  { name: 'Laravel', level: 50 },
];

const toolList = ['VS Code', 'Git & GitHub', 'XAMPP', 'Bootstrap', 'Laravel Herd'];

const missions = [
  'Consistently master the fundamentals of web and mobile development.',
  'Build real-world projects to strengthen my problem-solving skills.',
  'Take part in competitions and certifications to challenge myself.',
  'Keep learning new technologies while supporting my teammates.',
];

const certificates = [
  { number: '01', title: 'Gamelab Indonesia Industry Visit', issuer: 'Gamelab Indonesia', year: '2025', image: '/images/certificates/gamelab.webp' },
  { number: '02', title: 'GLOW#321 Participation', issuer: 'GameLAB Indonesia', year: '2025', image: '/images/certificates/gamelab2.webp' },
  { number: '03', title: 'Dicoding METC Participation', issuer: 'Dicoding Indonesia', year: '2025', image: '/images/certificates/dicoding.webp' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/cadanganacoout-lab', icon: Globe },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gilang-nur-naulida-faid-080233400/', icon: BriefcaseBusiness },
  { label: 'Instagram', href: 'https://www.instagram.com/gilanzq_/', icon: Camera },
];

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(35);
  const [isMusicPanelOpen, setIsMusicPanelOpen] = useState(false);
  const musicControlRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;
    audio.muted = isMuted;

    if (musicOn) {
      audio.play().catch(() => setMusicOn(false));
    } else {
      audio.pause();
    }
  }, [isMuted, musicOn, volume]);

  useEffect(() => {
    if (!isMusicPanelOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!musicControlRef.current?.contains(event.target)) {
        setIsMusicPanelOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMusicPanelOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMusicPanelOpen]);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text)] transition-colors duration-300">
      <audio
        ref={audioRef}
        src="/music/8%20Letters%20-%20Why%20Don%27t%20We%20%5BOfficial%20Music%20Video%5D.mp3"
        preload="metadata"
        loop
      />

      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--panel)]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="brand-mark" aria-label="Back to top">
            g<span>f</span>.
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="music-control" ref={musicControlRef}>
              <button
                type="button"
                onClick={() => setIsMusicPanelOpen((prev) => !prev)}
                aria-label={isMusicPanelOpen ? 'Close music controls' : 'Open music controls'}
                aria-expanded={isMusicPanelOpen}
                aria-controls="music-controls"
                className={`music-trigger${musicOn && !isMuted ? ' is-playing' : ''}`}
              >
                <Headphones size={18} />
                <span className="music-trigger-label">Music</span>
                {musicOn && !isMuted && (
                  <span className="music-level" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </button>

              {isMusicPanelOpen && (
                <div id="music-controls" className="music-popover" role="group" aria-label="Music playback controls">
                  <div className="music-popover-heading">
                    <span className="music-cover" aria-hidden="true">
                      <Headphones size={18} />
                    </span>
                    <div className="music-track">
                      <strong>8 Letters</strong>
                      <span>Why Don&apos;t We</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsMusicPanelOpen(false)}
                      className="music-close"
                      aria-label="Close music controls"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="music-actions">
                    <button
                      type="button"
                      onClick={() => setMusicOn((prev) => !prev)}
                      className="music-play-button"
                      aria-label={musicOn ? 'Pause music' : 'Play music'}
                    >
                      {musicOn ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
                      <span>{musicOn ? 'Pause playback' : 'Play music'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMuted((prev) => !prev)}
                      className={`music-volume-button${isMuted ? '' : ' volume-on'}`}
                      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>

                  <label className="music-volume-control">
                    <span className="music-volume-label">
                      <span>{isMuted ? 'Volume · muted' : 'Volume'}</span>
                      <span>{isMuted ? '—' : `${volume}%`}</span>
                    </span>
                    <span className="music-volume-slider-row">
                      {volume === 0 ? <VolumeX size={15} /> : <Volume1 size={15} />}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={volume}
                        onChange={(event) => {
                          const nextVolume = Number(event.target.value);
                          setVolume(nextVolume);
                          setIsMuted(nextVolume === 0);
                        }}
                        aria-label="Music volume"
                        style={{ '--volume-progress': `${volume}%` }}
                      />
                    </span>
                  </label>

                  <div className="music-popover-footer">
                    <span>{musicOn ? (isMuted ? 'Playing · muted' : 'Playing') : 'Playback paused'}</span>
                    <span>Local MP3</span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
              className="icon-button"
            >
              {darkMode ? <SunMedium size={16} /> : <MoonStar size={16} />}
            </button>

            <a
              href="#contact"
              className="hidden rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[var(--text)] sm:inline-flex"
            >
              Let’s talk
            </a>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <section id="home" className="section-shell">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-16 lg:pt-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ duration: 0.5 }}
              className="space-y-7"
            >
              <span className="eyebrow">
                <span className="status-dot" />
                CURRENTLY INTERNING
              </span>

              <div className="space-y-4">
                <h1 className="hero-title">
                  Hi, I’m
                  <br />
                  <span>Gilang.</span>
                </h1>
                <p className="hero-description">
                  I’m a Software Engineering student who loves turning ideas and
                  lines of code into lively digital experiences.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a href="#work" className="button-primary">
                  View my work
                  <ArrowDown size={16} />
                </a>
                <a href="mailto:cadanganacoout@gmail.com" className="text-link">
                  Let’s connect
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <MapPin size={15} />
                Ponorogo, East Java, Indonesia
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto w-full max-w-[520px]"
            >
              <div className="orb orb-one" />
              <div className="orb orb-two" />

              <div className="profile-card">
                <div className="profile-card-top">
                  <span>PORTFOLIO / 2026</span>
                  <span className="profile-card-spark">✳</span>
                </div>

                <div className="monogram">GF</div>

                <div className="profile-card-bottom">
                  <div>
                    <strong>Gilang Faid</strong>
                    <span>Software Engineering student · Grade 11</span>
                  </div>
                  <span className="profile-card-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </div>

              <div className="code-note">
                <span className="code-note-icon">
                  <CodeXml size={17} />
                </span>
                <span>
                  <span className="code-note-label">CURRENTLY LEARNING</span>
                  <strong>Web development</strong>
                </span>
              </div>

              <span className="hero-coordinate">07°52' S · 111°28' E</span>
            </motion.div>
          </div>

          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-t border-[var(--line)] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] sm:px-6 lg:px-8">
            <span>WEB DEVELOPER · STUDENT · LIFELONG LEARNER</span>
            <a
              href="#about"
              className="inline-flex items-center gap-2 text-[var(--text)]"
            >
              Scroll to explore
              <ArrowDown size={14} />
            </a>
          </div>
        </section>

        <section id="about" className="section-space">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="section-heading">
              <p className="eyebrow">01 / ABOUT ME</p>
              <h2>
                Curiosity is
                <br />
                <span>where it all begins.</span>
              </h2>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <p className="text-lg leading-8 text-[var(--muted)]">
                  I became interested in computers in junior high, when I
                  tinkered with a personal blog and wondered how a webpage could
                  feel “alive.” That curiosity led me to teach myself through
                  video tutorials before pursuing a formal education in a field
                  I love.
                </p>
                <p className="text-lg leading-8 text-[var(--muted)]">
                  I chose Software Engineering because I want to understand how
                  to build applications from the ground up—from program logic
                  and interface design to creating something people can actually
                  use. To me, it’s a practical way to turn ideas into something
                  real.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    "Frontend enthusiast",
                    "Learning every day",
                    "Open to internships",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="vision-card">
                  <span className="code-note-label">VISION</span>
                  <p>
                    To become a software engineer who builds useful, intuitive
                    digital products to a professional standard.
                  </p>
                </div>

                <div className="mission-block">
                  <h3>What I’m working toward</h3>
                  <ol>
                    {missions.map((mission) => (
                      <li key={mission}>{mission}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section-space">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="section-topline">
              <div className="section-heading">
                <p className="eyebrow">02 / SELECTED WORK</p>
                <h2>
                  Made with
                  <br />
                  <span>care and curiosity.</span>
                </h2>
              </div>
              <p className="section-side-note">
                A few small milestones in my learning journey.
              </p>
            </div>

            <div className="mt-10 grid gap-6 xl:grid-cols-2">
              {projectData.map((project) => (
                <article key={project.number} className="project-card reveal">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`project-visual visual-${project.visual}`}
                    aria-label={`View ${project.title} (opens in a new tab)`}
                  >
                    <span className="visual-topline">
                      <span>PROJECT / {project.number}</span>
                      <ArrowUpRight size={18} />
                    </span>

                    <span className="visual-decoration" aria-hidden="true">
                      {project.visual === "mobile" ? (
                        <span className="phone-outline">
                          <span />
                        </span>
                      ) : (
                        <span className="visual-orbit">
                          <span>{project.visualLabel}</span>
                        </span>
                      )}
                    </span>

                    <span className="visual-caption">
                      <strong>{project.visualLabel}</strong>
                      <span>{project.visualNote}</span>
                    </span>
                  </a>

                  <div className="project-info">
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span>2026</span>
                    </div>

                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <div className="technology-list">
                      {project.technologies.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <button type="button" className="project-preview-button">
                        Preview live
                        <ArrowUpRight size={14} />
                      </button>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="project-external-link"
                      >
                        Open site
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="section-space">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="journey-grid">
              <div className="journey-intro reveal">
                <p className="eyebrow">03 / JOURNEY & SKILLS</p>
                <h2>
                  Always learning.
                  <br />
                  <span>Always growing.</span>
                </h2>
                <p>
                  My goal is to become a software engineer who builds useful,
                  user-friendly digital products to a professional standard.
                </p>

                <div className="learning-card">
                  <span className="learning-icon">
                    <CodeXml size={20} />
                  </span>
                  <span>
                    <span className="code-note-label">MY MOTTO</span>
                    <strong>consistency &gt; intensity</strong>
                  </span>
                </div>
              </div>

              <div className="journey-details reveal">
                <div className="detail-block">
                  <div className="detail-heading">
                    <h3>Education</h3>
                    <span>2016 — PRESENT</span>
                  </div>

                  <ol className="education-list">
                    {educationData.map((item) => (
                      <li key={item.school}>
                        <span>{item.period}</span>
                        <div>
                          <strong>{item.school}</strong>
                          <p>{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="detail-block skills-block">
                  <div className="detail-heading">
                    <h3>Languages & technologies</h3>
                    <span>ALWAYS IN PROGRESS</span>
                  </div>

                  <div className="skill-grid">
                    {skillData.map((skill) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-meta">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <span style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="tool-list" aria-label="Tools I use">
                    {toolList.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="certificates" className="section-space">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="section-topline">
              <div className="section-heading">
                <p className="eyebrow">04 / CERTIFICATES</p>
                <h2>
                  Experiences that
                  <br />
                  <span>shaped my journey.</span>
                </h2>
              </div>
              <p className="section-side-note">
                Activities and milestones from my learning journey.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {certificates.map((certificate) => (
                <div key={certificate.number} className="certificate-card">
                  <div className="certificate-image-wrap">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="certificate-image"
                    />
                  </div>
                  <div className="certificate-content">
                    <span>{certificate.number}</span>
                    <h3>{certificate.title}</h3>
                    <p>
                      {certificate.issuer} · {certificate.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-space pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="contact-panel reveal">
              <div className="contact-glow" aria-hidden="true" />
              <div className="contact-content">
                <p className="eyebrow">05 / WHAT’S NEXT? LET’S...</p>
                <h2>
                  Make something
                  <br />
                  <span>meaningful.</span>
                </h2>
                <p>
                  Have an idea, an internship opportunity, or just want to talk
                  about technology? I’d love to hear from you.
                </p>

                <a
                  href="mailto:cadanganacoout@gmail.com"
                  className="button-dark"
                >
                  <Mail size={16} />
                  Send me an email
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="contact-aside">
                <span className="contact-aside-label">FIND ME ON</span>

                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social"
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}

                <a
                  href="https://wa.me/6288991531800"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  WhatsApp
                  <ArrowUpRight size={14} />
                </a>

                <span className="contact-phone">
                  0889-9153-1800 · MESSAGE ONLY
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] bg-[var(--panel)]/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-[var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <a
            href="#home"
            className="brand-mark brand-mark-small"
            aria-label="Back to top"
          >
            g<span>f</span>.
          </a>

          <p>Independently made by Gilang Nur Maulida Faid | 2026</p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 text-[var(--text)] uppercase tracking-[0.2em] text-[11px]"
          >
            Back to top
            <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
