import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, BookOpen, Camera, Check, Download, FileText, HardHat, Layers3, Mail, Menu, ShieldCheck, Sparkles, Ruler, X } from 'lucide-react'
import { SiGmail, SiInstagram } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import './App.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Academics' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.35, 0.7] })

    sections.forEach((section) => observer.observe(section))

    const animatedSections = [...document.querySelectorAll('.content-section')]
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 })

    animatedSections.forEach((section) => animationObserver.observe(section))

    return () => {
      observer.disconnect()
      animationObserver.disconnect()
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <div className="portfolio-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <button className="brand" type="button" aria-label="Go to home" onClick={() => scrollTo('home')}>
          <span className="brand-mark">NS</span>
        </button>

        <button className="menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
              type="button"
              key={item.id}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
          <a className="mobile-resume" href="./assets/navaneethan-resume.pdf" download>
            Resume <Download size={15} />
          </a>
        </nav>

        <a className="header-resume" href="./assets/navaneethan-resume.pdf" download>
          Resume <Download size={15} />
        </a>
      </header>

      <main>
        <section id="home" className="hero-section section-anchor">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="eyebrow-dot" /> Civil Engineering Portfolio</p>
            <h1>Naveenethan S</h1>
            <p className="hero-role">BE Civil Engineering Student | Site Engineering Enthusiast | NCC Cadet</p>

            <div className="hero-socials">
              <a href="https://www.linkedin.com/in/navaneethan-s-a07a16291/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={19} /></a>
              <a href="https://www.instagram.com/navan_006/" target="_blank" rel="noreferrer" aria-label="Instagram"><SiInstagram size={19} /></a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=navaneethanselvam006@gmail.com" target="_blank" rel="noreferrer" aria-label="Gmail"><SiGmail size={19} /></a>
            </div>

            <p className="hero-text">Learning how thoughtful planning, strong coordination, and disciplined execution become places people can rely on.</p>

            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={() => scrollTo('about')}>
                Explore my profile <ArrowDown size={16} />
              </button>
              <button className="text-button" type="button" onClick={() => scrollTo('documents')}>
                View documents <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="hero-visual reveal delay-one">
            <div className="portrait-frame">
              <div className="portrait-image" role="img" aria-label="Portrait of Naveenethan S" />
              <div className="portrait-caption">
                <span>BE Civil Engineering</span>
                <strong>KSRCE</strong>
              </div>
            </div>
            <div className="orbit-label"><Sparkles size={13} /> Detail matters</div>
          </div>
        </section>

        <div className="scroll-cue"><span>Scroll to explore</span><ArrowDown size={15} /></div>

        <section id="about" className="about-section content-section section-anchor">
          <SectionLabel number="01" text="About me" />
          <div className="about-grid">
            <div>
              <h2>Curious by nature.<br /><em>Grounded</em> by discipline.</h2>
            </div>
            <div className="about-copy">
              <p>I&apos;m Naveenethan S, currently pursuing BE Civil Engineering at K.S.R. College of Engineering. My interest is in the practical side of building: site work, planning, coordination, and the quiet precision that makes a project dependable.</p>
              <p>The NCC has added another layer to that journey, teaching me to value responsibility, teamwork, and leadership in everything I take on.</p>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section content-section section-anchor">
          <SectionLabel number="02" text="Areas of focus" />
          <div className="section-intro">
            <h2>Learning the craft<br /><em>one layer at a time.</em></h2>
            <p>The subjects and working qualities I&apos;m bringing with me into the field.</p>
          </div>

          <div className="focus-list">
            <FocusItem icon={<Ruler size={22} />} title="Site Engineering" text="Interested in the daily rhythm of live sites, from reading plans to coordinating work on the ground." />
            <FocusItem icon={<Layers3 size={22} />} title="Planning & Detail" text="Drawings, measurements, sequencing, and the small decisions that keep a project moving." />
            <FocusItem icon={<HardHat size={22} />} title="Construction Practice" text="Building a practical understanding of how materials, people, and process come together." />
            <FocusItem icon={<ShieldCheck size={22} />} title="Discipline & Leadership" text="NCC training shaped my confidence, responsibility, and ability to work as part of a team." />
          </div>

          <div className="technical-skills">
            <p className="skills-caption">Technical skills in software</p>
            <div className="software-grid">
              <article><strong>AutoCAD</strong><span>2D drafting</span></article>
              <article><strong>Autodesk Revit</strong><span>BIM & 3D building modeling</span></article>
            </div>
          </div>
        </section>

        <section id="journey" className="journey-section content-section section-anchor">
          <SectionLabel number="03" text="Academic journey" />
          <div className="section-intro">
            <h2>A foundation for<br /><em>the field ahead.</em></h2>
            <p>Every stage has added a different kind of strength to my path in civil engineering.</p>
          </div>

          <div className="timeline">
            <TimelineItem year="2023 — 2027" title="BE Civil Engineering" place="K.S.R. College of Engineering" text="Currently pursuing my engineering degree with a growing interest in site engineering and construction practice." icon={<BookOpen size={19} />} />
            <TimelineItem year="2022 — 2023" title="Higher Secondary Certificate" place="Sri Jothi Higher Secondary School, Tharamangalam" text="Completed higher secondary education with 67%." icon={<Check size={19} />} />
            <TimelineItem year="Ongoing" title="NCC Cadet Training" place="National Cadet Corps" text="Certificate B cadet, building discipline, service, teamwork, and leadership." icon={<ShieldCheck size={19} />} />
          </div>

          <div className="stat-strip">
            <div><strong>BE</strong><span>Civil Engineering</span></div>
            <div><strong>67%</strong><span>Higher Secondary</span></div>
            <div><strong>B</strong><span>NCC Certificate</span></div>
          </div>
        </section>

        <section id="experience" className="experience-section content-section section-anchor">
          <SectionLabel number="04" text="Internship experience" />
          <div className="section-intro">
            <h2>Learning beyond<br /><em>the classroom.</em></h2>
            <p>Practical exposure that helped me connect drawings, site work, and execution.</p>
          </div>

          <div className="experience-card">
            <div className="experience-meta"><span>15 Jul — 22 Jul 2024</span><span>1 week internship</span></div>
            <div className="experience-main">
              <div className="experience-icon"><HardHat size={28} /></div>
              <div>
                <h3>Internship Trainee</h3>
                <p className="experience-company">Amman Builders</p>
                <p>Worked across the organization&apos;s construction site and office, gaining experience in studying drawings and observing the execution of works.</p>
                <div className="experience-tags">
                  <span>Construction site</span>
                  <span>Technical drawings</span>
                  <span>Execution of works</span>
                </div>
              </div>
            </div>
            <a className="certificate-link" href="/assets/navaneethan-certificate.pdf" target="_blank" rel="noreferrer">
              <FileText size={17} /> View internship certificate <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="experience-card experience-card-secondary">
            <div className="experience-meta"><span>Amman Builders</span><span>1 week internship</span></div>
            <div className="experience-main">
              <div className="experience-icon"><FileText size={28} /></div>
              <div>
                <h3>Construction &amp; Office Internship</h3>
                <p className="experience-company">Amman Builders</p>
                <p>Completed a one-week internship with construction-site and office exposure, including drawing study and observing the execution of works.</p>
                <div className="experience-tags">
                  <span>1 week internship</span>
                  <span>Site exposure</span>
                  <span>Office learning</span>
                </div>
              </div>
            </div>
            <a className="certificate-link" href="/assets/scanned-certificate.pdf" target="_blank" rel="noreferrer">
              <FileText size={17} /> View internship certificate <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section id="documents" className="documents-section content-section section-anchor">
          <SectionLabel number="05" text="Credentials & recognition" />
          <div className="section-intro">
            <h2>The work behind<br /><em>the person.</em></h2>
            <p>A small archive of the milestones and documents that continue to shape my journey.</p>
          </div>
          <div className="document-list">
            <a className="document-row" href="./assets/navaneethan-resume.pdf" download>
              <span className="document-icon"><FileText size={20} /></span>
              <span><strong>Resume</strong><small>PDF · Profile and experience</small></span>
              <span className="document-action"><Download size={17} /></span>
            </a>
            <a className="document-row" href="/assets/navaneethan-certificate.pdf" target="_blank" rel="noreferrer">
              <span className="document-icon"><HardHat size={20} /></span>
              <span><strong>Amman Builders Internship Certificate</strong><small>Original certificate · 1 week internship · July 2024</small></span>
              <span className="document-action"><ArrowUpRight size={17} /></span>
            </a>
            <a className="document-row" href="/assets/scanned-certificate.pdf" target="_blank" rel="noreferrer">
              <span className="document-icon"><FileText size={20} /></span>
              <span><strong>Amman Builders Internship Certificate</strong><small>Additional certificate · 1 week internship</small></span>
              <span className="document-action"><ArrowUpRight size={17} /></span>
            </a>
            <a className="document-row" href="/assets/navaneethan-certificate.pdf" target="_blank" rel="noreferrer">
              <span className="document-icon"><ShieldCheck size={20} /></span>
              <span><strong>NCC Certificate B</strong><small>Certificate · National Cadet Corps</small></span>
              <span className="document-action"><ArrowUpRight size={17} /></span>
            </a>
            <a className="document-row" href="/assets/scanned-certificate.pdf" target="_blank" rel="noreferrer">
              <span className="document-icon"><FileText size={20} /></span>
              <span><strong>Course Certificates</strong><small>Additional learning and achievements</small></span>
              <span className="document-action"><ArrowUpRight size={17} /></span>
            </a>
          </div>
        </section>

        <section id="contact" className="contact-section content-section section-anchor">
          <div className="contact-panel">
            <div>
              <SectionLabel number="06" text="Get in touch" />
              <h2>Let&apos;s build something<br /><em>meaningful.</em></h2>
              <p>For opportunities, conversations, or just to connect, I&apos;d be happy to hear from you.</p>
            </div>

            <div className="contact-links">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=navaneethanselvam006@gmail.com" target="_blank" rel="noreferrer"><span><SiGmail size={18} /> Gmail</span><ArrowUpRight size={16} /></a>
              <a href="https://www.linkedin.com/in/navaneethan-s-a07a16291/" target="_blank" rel="noreferrer"><span><FaLinkedinIn size={18} /> LinkedIn</span><ArrowUpRight size={16} /></a>
              <a href="https://www.instagram.com/navan_006/" target="_blank" rel="noreferrer"><span><SiInstagram size={18} /> Instagram</span><ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>© 2026 Naveenethan S</span><span>BE Civil Engineering · KSRCE</span></footer>
    </div>
  )
}

function SectionLabel({ number, text }) {
  return <p className="section-label"><span>{number}</span> {text}</p>
}

function FocusItem({ icon, title, text }) {
  return (
    <article className="focus-item">
      <div className="focus-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <ArrowUpRight className="focus-arrow" size={18} />
    </article>
  )
}

function TimelineItem({ year, title, place, text, icon }) {
  return (
    <article className="timeline-item">
      <div className="timeline-year">{year}</div>
      <div className="timeline-marker">{icon}</div>
      <div className="timeline-content">
        <h3>{title}</h3>
        <p className="timeline-place">{place}</p>
        <p>{text}</p>
      </div>
    </article>
  )
}

export default App
