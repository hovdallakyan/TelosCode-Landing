import React, { useEffect, useRef, useState } from 'react';
import founderPhoto from '../founder-hovo.jpg';

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
    title: 'AI & automation',
    body: 'Practical assistants that remove repetitive work without extra noise.',
  },
  {
    title: 'Integrations',
    body: 'Connect booking tools, CRMs, payments, and the systems you already use.',
  },
  {
    title: 'Customer experience',
    body: 'Portals and booking flows that feel clear for staff and clients.',
  },
  {
    title: 'Support & evolution',
    body: 'Stay close after launch so the product keeps matching the business.',
  },
];

const principles = [
  {
    label: 'Perspective',
    title: 'Value first',
    body: 'Software should show up as time saved, smoother service, and clearer reporting.',
  },
  {
    label: 'Playbook',
    title: 'Fixed investment',
    body: 'Agree the outcome and the price before development begins. No hourly drift.',
  },
  {
    label: 'Standard',
    title: 'One delivery track',
    body: 'Strategy, design, engineering, and AI handled together, not as separate vendors.',
  },
  {
    label: 'Approach',
    title: 'Your stack, improved',
    body: 'We work with the tools your team already relies on every day.',
  },
];

const industries = [
  {
    title: 'Hotels & hospitality',
    body: 'Booking, guest portals, concierge workflows, and operations dashboards.',
  },
  {
    title: 'Restaurants',
    body: 'Reservations, ordering, menus, and loyalty systems that stay easy to run.',
  },
  {
    title: 'Professional services',
    body: 'Client portals, scheduling, documents, and practice systems with clarity.',
  },
];

const cases = [
  {
    tag: 'Hospitality · 2025',
    title: 'A smoother guest journey from booking to checkout',
    body: 'One system for rooms, guests, requests, and daily decisions.',
    featured: true,
  },
  {
    tag: 'Legal',
    title: 'Casework without the chase',
    body: 'A client portal that keeps matters, files, and updates in one place.',
  },
  {
    tag: 'Hospitality · AI',
    title: 'Answers when the team needs them',
    body: 'An assistant trained on operations data for late arrivals and guest notes.',
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeWords, setActiveWords] = useState(0);
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

  return (
    <div className="page">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className={`nav ${menuOpen ? 'is-open' : ''}`}>
        <a className="logo" href="#top" onClick={closeMenu}>
          telos<span>code</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#industries" onClick={closeMenu}>
            Industries
          </a>
          <a href="#about" onClick={closeMenu}>
            About
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
              <p className="kicker">Software engineering partner · Europe</p>
              <h1>
                We help you <em>reimagine</em> operations through custom software.
              </h1>
              <p className="lede">
                TelosCode builds the systems behind better service businesses. Booking,
                client portals, practical AI, and automation with fixed pricing.
              </p>
              <div className="hero-actions">
                <a className="btn" href="#contact">
                  Get a fixed quote
                </a>
                <a className="link" href="#work">
                  View client work
                </a>
              </div>
              <ul className="proof-row">
                <li>Fixed project pricing</li>
                <li>30 day guarantee</li>
                <li>Free consultation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Results — EPAM stats strip */}
        <section className="band band-soft">
          <div className="wrap">
            <div className="band-head reveal" data-reveal>
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

        {/* Services — numbered rows, not card grids */}
        <section id="services" className="wrap block services">
          <div className="split">
            <div className="split-sticky reveal" data-reveal>
              <p className="kicker">Services</p>
              <h2>
                Strategy and engineering.
                <br />
                Delivered together.
              </h2>
              <p className="split-note">
                One track from scoping to launch. You talk to the people who build.
              </p>
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
        </section>

        {/* Principles — editorial list, not tiles */}
        <section className="band band-soft">
          <div className="wrap block-in">
            <div className="band-head reveal" data-reveal>
              <p className="kicker">How we work</p>
              <h2>Simple standards. Senior delivery.</h2>
            </div>
            <div className="principle-list">
              {principles.map((item, i) => (
                <article
                  key={item.title}
                  className="principle reveal"
                  data-reveal
                  style={{ '--d': `${i * 45}ms` }}
                >
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Industries — definition rows */}
        <section id="industries" className="wrap block">
          <div className="split">
            <div className="split-sticky reveal" data-reveal>
              <p className="kicker">Industries</p>
              <h2>Depth where every interaction matters.</h2>
            </div>
            <div className="row-list">
              {industries.map((item, i) => (
                <div
                  key={item.title}
                  className="row-item static reveal"
                  data-reveal
                  style={{ '--d': `${i * 45}ms` }}
                >
                  <span className="row-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="row-copy">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <a className="link" href="#contact">
                      Discuss your operation
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="wrap block">
          <div className="band-head reveal" data-reveal>
            <p className="kicker">Client work</p>
            <h2>Case studies that start with the problem.</h2>
          </div>
          <article className="case-feature reveal" data-reveal>
            <div>
              <p className="case-tag">{cases[0].tag}</p>
              <h3>{cases[0].title}</h3>
              <p>{cases[0].body}</p>
              <a className="link" href="#contact">
                Talk about a similar project
              </a>
            </div>
            <div className="case-visual" aria-hidden="true">
              <div className="mock">
                <div className="mock-bar">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="mock-body">
                  <div className="mock-metric">
                    <small>Occupancy</small>
                    <b>84%</b>
                  </div>
                  <div className="mock-metric">
                    <small>Arrivals</small>
                    <b>32</b>
                  </div>
                  <div className="mock-metric">
                    <small>Revenue</small>
                    <b>14.8k</b>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <div className="case-more">
            {cases.slice(1).map((item, i) => (
              <article
                key={item.title}
                className="case-line reveal"
                data-reveal
                style={{ '--d': `${i * 50}ms` }}
              >
                <p className="case-tag">{item.tag}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a className="link" href="#contact">
                  Discuss this
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Tagline reveal */}
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

        {/* Quote — Accenture style */}
        <section className="wrap block">
          <div className="quote reveal" data-reveal>
            <img src={founderPhoto} alt="Hovo, founder of TelosCode" />
            <figure>
              <blockquote>
                Technology should feel like a quiet advantage. Human judgment stays in
                the lead. Software carries the rest.
              </blockquote>
              <figcaption>
                <b>Hovo</b>
                <span>Founder & Software Architect</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Process */}
        <section className="wrap block">
          <div className="band-head reveal" data-reveal>
            <p className="kicker">Process</p>
            <h2>A clear path from problem to production.</h2>
          </div>
          <div className="steps">
            {steps.map((step, i) => (
              <article
                key={step.id}
                className="reveal"
                data-reveal
                style={{ '--d': `${i * 50}ms` }}
              >
                <span>{step.id}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section className="band band-soft">
          <div className="wrap block-in why">
            <div className="split">
              <div className="split-sticky reveal" data-reveal>
                <p className="kicker">Why TelosCode</p>
                <h2>Enterprise standards without the extra layers.</h2>
              </div>
              <div className="row-list">
                {reasons.map((item, i) => (
                  <article
                    key={item.title}
                    className="row-item static reveal"
                    data-reveal
                    style={{ '--d': `${i * 40}ms` }}
                  >
                    <span className="row-num">{String(i + 1).padStart(2, '0')}</span>
                    <div className="row-copy">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="wrap block">
          <div className="about reveal" data-reveal>
            <div className="about-photo">
              <img src={founderPhoto} alt="Hovo, founder of TelosCode" />
            </div>
            <div>
              <p className="kicker">About</p>
              <h2>Senior people, close to the work.</h2>
              <p>
                TelosCode is a distributed European team. We take the best habits of
                large software service firms and keep delivery personal, direct, and
                fixed in scope.
              </p>
              <p className="meta">Hovo · Founder & Software Architect · Armenia</p>
              <a className="link" href="#contact">
                Start a conversation
              </a>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="wrap block">
          <div className="band-head reveal" data-reveal>
            <p className="kicker">Technology</p>
            <h2>Modern tools. Measured decisions.</h2>
          </div>
          <div className="stack reveal" data-reveal>
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
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
          <a className="logo" href="#top">
            telos<span>code</span>
          </a>
          <p>Software that makes business run better.</p>
        </div>
        <div className="footer-cols">
          <div>
            <strong>Company</strong>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
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
