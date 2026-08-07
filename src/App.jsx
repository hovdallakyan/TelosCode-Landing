import React, { useEffect, useRef, useState } from 'react';
import founderPhoto from '../founder-hovo.jpg';
import mayaPhoto from '../maya-koch.jpg';
import BrandLogo from './BrandLogo';

const results = [
  { value: '40+', label: 'Systems delivered' },
  { value: '12w', label: 'Typical first release' },
  { value: '30d', label: 'Satisfaction guarantee' },
  { value: '1:1', label: 'Senior access' },
];

const services = [
  {
    title: 'Strategy & scoping',
    body: 'Define the operating problem, the outcome, and a fixed path before build starts.',
  },
  {
    title: 'Product engineering',
    body: 'Custom software and web apps shaped around how your team actually works.',
  },
  {
    title: 'AI agents & automation',
    body: 'Practical agents and workflows that remove repetitive operational work.',
  },
  {
    title: 'Integrations & portals',
    body: 'Connect booking tools, CRMs, and payments. Ship client portals staff can run.',
  },
  {
    title: 'Support & evolution',
    body: 'Stay close after launch so the product keeps matching the business.',
  },
];

const industries = [
  'Hotels & hospitality',
  'Restaurants',
  'Law firms',
  'Clinics',
  'Professional services',
];

const cases = [
  {
    sector: 'Hospitality',
    title: 'Guest operations platform',
    problem: 'Bookings, guest requests, and staff tools lived in separate systems.',
    result: 'One place for rooms, arrivals, and daily decisions.',
  },
  {
    sector: 'Legal',
    title: 'Client matter portal',
    problem: 'Clients chased updates by email. Files were hard to find.',
    result: 'Secure portal for matters, documents, and status.',
  },
  {
    sector: 'Hospitality',
    title: 'Operations assistant',
    problem: 'Front desk spent too long answering the same operational questions.',
    result: 'An assistant grounded in real hotel data for the shift team.',
  },
];

const steps = [
  { id: '01', title: 'Strategize', body: 'Map the problem and define the outcome that matters.' },
  { id: '02', title: 'Design', body: 'Shape the product around real daily work.' },
  { id: '03', title: 'Build', body: 'Deliver in fixed phases with clear checkpoints.' },
  { id: '04', title: 'Launch', body: 'Ship with confidence, then keep improving.' },
];

const reasons = [
  {
    title: 'Fixed project pricing',
    body: 'Investment agreed before build. No surprise invoices.',
  },
  {
    title: 'Direct communication',
    body: 'You work with the people designing and building the product.',
  },
  {
    title: '30 day guarantee',
    body: 'We stand behind agreed scope and resolve issues after handover.',
  },
  {
    title: 'Built to last',
    body: 'Structured for change so the software grows with the business.',
  },
];

const stack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'OpenAI', 'PostgreSQL'];

const faqs = [
  {
    q: 'How much does a project cost?',
    a: 'Projects are scoped individually and priced as a fixed investment. After a short conversation we will tell you if we are a fit and what a first phase looks like.',
  },
  {
    q: 'How long does development take?',
    a: 'Most focused projects take 8 to 16 weeks. Larger platforms ship in clear stages so value arrives sooner.',
  },
  {
    q: 'Who owns the source code?',
    a: 'You do. Project, data, and source code remain yours from the start.',
  },
  {
    q: 'Can you work with our existing systems?',
    a: 'Yes. We regularly integrate with CRMs, booking tools, accounting systems, and internal platforms.',
  },
  {
    q: 'Do you work internationally?',
    a: 'Yes. We work remotely with clients across Europe and beyond.',
  },
  {
    q: 'What happens after launch?',
    a: 'We offer ongoing support and evolution so the product keeps matching how you operate.',
  },
];

const taglineWords = [
  'Software',
  'that',
  'earns',
  'its',
  'place',
  'in',
  'the',
  'operation,',
  'not',
  'another',
  'tool',
  'on',
  'the',
  'shelf.',
];

const team = [
  {
    name: 'Maya Koch',
    role: 'Agentic AI Product Manager',
    place: 'Germany',
    image: mayaPhoto,
    initial: 'M',
  },
  {
    name: 'Hovo Dallakyan',
    role: 'Founder & Software Architect',
    place: 'Armenia',
    image: founderPhoto,
    initial: 'H',
  },
  {
    name: 'Engineering',
    role: 'Full stack delivery',
    place: 'Europe',
    image: null,
    initial: 'E',
  },
  {
    name: 'AI & automation',
    role: 'Workflow systems',
    place: 'Europe',
    image: null,
    initial: 'A',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeWords, setActiveWords] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  const taglineRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
      setActiveWords(taglineWords.length);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return undefined;

    const node = taglineRef.current;
    if (!node) return undefined;

    let frame = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, (vh * 0.75 - rect.top) / (vh * 0.4)));
      const next = Math.round(progress * taglineWords.length);
      setActiveWords((cur) => (cur === next ? cur : next));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const goTeam = (dir) => {
    setTeamIndex((current) => {
      const next = current + dir;
      if (next < 0) return team.length - 1;
      if (next >= team.length) return 0;
      return next;
    });
  };

  return (
    <div className="page">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className={`nav ${menuOpen ? 'is-open' : ''}`}>
        <a className="logo" href="#top" onClick={closeMenu} aria-label="TelosCode home">
          <BrandLogo />
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#approach" onClick={closeMenu}>
            Approach
          </a>
          <a href="#about" onClick={closeMenu}>
            Team
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>
        <a className="btn btn-sm" href="#contact" onClick={closeMenu}>
          Book consultation
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={menuOpen ? 'x' : ''} />
        </button>
      </header>

      <main id="main">
        {/* Hero — full bleed cosmic field */}
        <section id="top" className="hero">
          <div className="hero-cosmos" aria-hidden="true">
            <div className="cosmos-glow g1" />
            <div className="cosmos-glow g2" />
            <div className="cosmos-glow g3" />
            <div className="stars stars-a" />
            <div className="stars stars-b" />
            <div className="stars stars-c" />
            <div className="bokeh">
              <i className="b b1" />
              <i className="b b2" />
              <i className="b b3" />
              <i className="b b4" />
              <i className="b b5" />
              <i className="b b6" />
              <i className="b b7" />
              <i className="b b8" />
              <i className="b b9" />
              <i className="b b10" />
              <i className="b b11" />
              <i className="b b12" />
            </div>
          </div>

          <div className="hero-inner wrap">
            <div className="hero-copy reveal is-visible" data-reveal>
              <p className="kicker">Software and AI agents · Team based in Europe</p>
              <h1>
                We build <em>custom software</em> for service businesses.
              </h1>
              <p className="lede">
                Booking systems, client portals, AI automation, and internal tools for
                hotels, restaurants, clinics, and professional firms. Fixed pricing.
                Senior engineers. You work with the people who ship the product.
              </p>
              <div className="hero-actions">
                <a className="btn" href="#contact">
                  Book free consultation
                </a>
                <a className="link" href="#work">
                  See client work
                </a>
              </div>
              <ul className="trust">
                <li>
                  <span className="trust-mark" aria-hidden="true" />
                  Fixed project pricing
                </li>
                <li>
                  <span className="trust-mark" aria-hidden="true" />
                  30 day money back
                </li>
                <li>
                  <span className="trust-mark" aria-hidden="true" />
                  Free consultation
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Results — compact metric bar */}
        <section className="results" aria-label="Client results">
          <div className="wrap results-inner">
            <div className="results-label reveal" data-reveal>
              <p className="kicker">Client results</p>
              <h2>Delivery that shows up in the work.</h2>
            </div>
            <div className="stats">
              {results.map((item, i) => (
                <article
                  key={item.label}
                  className="stat reveal"
                  data-reveal
                  style={{ '--d': `${i * 60}ms` }}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* What we build — services + industries + stack */}
        <section id="services" className="wrap block services">
          <div className="split">
            <div className="split-sticky reveal" data-reveal>
              <p className="kicker">What we build</p>
              <h2>
                Software and AI agents
                <br />
                for service operations.
              </h2>
              <p className="split-note">
                One track from scoping to launch. Fixed pricing. You talk to the people
                who design and ship the product.
              </p>
              <div className="industry-line">
                <span className="industry-line-label">Built for</span>
                <ul>
                  {industries.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <a className="link" href="#contact">
                Start with a fixed quote
              </a>
            </div>
            <div className="row-list">
              {services.map((item, i) => (
                <a
                  key={item.title}
                  href="#contact"
                  className="row-item reveal"
                  data-reveal
                  style={{ '--d': `${i * 40}ms` }}
                >
                  <span className="row-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="row-copy">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  <span className="row-go" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="stack-inline reveal" data-reveal>
            <span className="stack-inline-label">Stack</span>
            <div className="stack">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="band band-soft">
          <div className="wrap block-in">
            <div className="band-head reveal" data-reveal>
              <p className="kicker">Selected work</p>
              <h2>Projects shaped around real operations.</h2>
              <p className="band-sub">
                Each engagement starts with the operating problem, then ships a fixed
                first release the team can actually run.
              </p>
            </div>
            <div className="work-list">
              {cases.map((item, i) => (
                <article
                  key={item.title}
                  className="work-item reveal"
                  data-reveal
                  style={{ '--d': `${i * 50}ms` }}
                >
                  <div className="work-top">
                    <span className="work-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="work-sector">{item.sector}</span>
                  </div>
                  <div className="work-body">
                    <h3>{item.title}</h3>
                    <dl className="work-facts">
                      <div>
                        <dt>Problem</dt>
                        <dd>{item.problem}</dd>
                      </div>
                      <div>
                        <dt>What we shipped</dt>
                        <dd>{item.result}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
            <a className="link work-cta reveal" href="#contact" data-reveal>
              Talk about a similar project
            </a>
          </div>
        </section>

        {/* Tagline */}
        <section className="tagline band" ref={taglineRef}>
          <div className="wrap tagline-inner">
            <p className="kicker">Our promise</p>
            <h2 className="tagline-line">
              {taglineWords.map((word, i) => (
                <span key={`${word}-${i}`} className={i < activeWords ? 'on' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h2>
          </div>
        </section>

        {/* Approach — process + why, one section */}
        <section id="approach" className="wrap block">
          <div className="band-head reveal" data-reveal>
            <p className="kicker">Approach</p>
            <h2>How we deliver, and why teams stay.</h2>
            <p className="band-sub">
              Clear stages, fixed commercial terms, and senior people on the work from
              the first call through launch.
            </p>
          </div>
          <div className="steps reveal" data-reveal>
            {steps.map((step) => (
              <article key={step.id}>
                <span>{step.id}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
          <div className="reason-grid approach-reasons">
            {reasons.map((item, i) => (
              <article
                key={item.title}
                className="reason reveal"
                data-reveal
                style={{ '--d': `${i * 40}ms` }}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="about" className="band band-soft">
          <div className="wrap block-in">
            <div className="about-layout reveal" data-reveal>
              <div className="about-head">
                <p className="kicker">Team</p>
                <h2>A senior team across Europe.</h2>
                <p>
                  TelosCode is a distributed studio. Strategy, design, engineering, and
                  AI stay on one track. You work with the people shipping the product,
                  not a separate account layer.
                </p>
                <p className="about-note">
                  Roles expand per engagement. Core team members lead delivery end to
                  end.
                </p>
              </div>

              <div className="team-slider" aria-roledescription="carousel" aria-label="Core team">
                <p className="team-label">Core team</p>
                <div className="team-stage" aria-live="polite">
                  {team.map((item, i) => (
                    <article
                      key={item.name}
                      className={`team-slide ${i === teamIndex ? 'is-active' : ''}`}
                      aria-hidden={i !== teamIndex}
                    >
                      <div className={`team-avatar ${item.image ? '' : 'placeholder'}`}>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.name}, ${item.role}`}
                            decoding="async"
                            fetchPriority={i === 0 ? 'high' : 'low'}
                          />
                        ) : (
                          <span aria-hidden="true">{item.initial}</span>
                        )}
                      </div>
                      <div className="team-meta">
                        <b>{item.name}</b>
                        <span>{item.role}</span>
                        <small>{item.place}</small>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="team-controls">
                  <button
                    type="button"
                    className="team-nav"
                    aria-label="Previous team member"
                    onClick={() => goTeam(-1)}
                  >
                    ←
                  </button>
                  <div className="team-dots" role="tablist" aria-label="Team members">
                    {team.map((item, i) => (
                      <button
                        key={item.name}
                        type="button"
                        role="tab"
                        aria-selected={i === teamIndex}
                        aria-label={item.name}
                        className={i === teamIndex ? 'is-active' : ''}
                        onClick={() => setTeamIndex(i)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="team-nav"
                    aria-label="Next team member"
                    onClick={() => goTeam(1)}
                  >
                    →
                  </button>
                  <span className="team-count">
                    {String(teamIndex + 1).padStart(2, '0')} /{' '}
                    {String(team.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="wrap block faq">
          <div className="band-head reveal" data-reveal>
            <p className="kicker">FAQ</p>
            <h2>Clear answers before we begin.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className={`faq-item reveal ${open ? 'open' : ''}`}
                  data-reveal
                  style={{ '--d': `${i * 35}ms` }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <i>{open ? '−' : '+'}</i>
                  </button>
                  {open ? <p>{item.a}</p> : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="cta">
          <div className="wrap cta-inner reveal" data-reveal>
            <p className="kicker dark">Start here</p>
            <h2>Ready to build software that moves the business forward?</h2>
            <p>
              Tell us the operational problem you want to solve. We will give a
              straight answer on the best next step.
            </p>
            <a className="btn btn-dark" href="mailto:hello@teloscode.com">
              Book free consultation
            </a>
            <span className="note">Usually replies within one business day</span>
          </div>
        </section>
      </main>

      <footer className="footer wrap">
        <div className="footer-top">
          <a className="logo" href="#top" aria-label="TelosCode home">
            <BrandLogo />
          </a>
          <p>Software that makes business run better.</p>
        </div>
        <div className="footer-cols">
          <div>
            <strong>Company</strong>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#approach">Approach</a>
            <a href="#about">Team</a>
          </div>
          <div>
            <strong>Contact</strong>
            <a href="mailto:hello@teloscode.com">hello@teloscode.com</a>
            <a href="#contact">Book consultation</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="#contact">Privacy</a>
            <a href="#contact">Terms</a>
          </div>
        </div>
        <small>© 2026 TelosCode. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
