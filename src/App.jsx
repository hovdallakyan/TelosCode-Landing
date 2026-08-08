import React, { useEffect, useRef, useState } from 'react';
import founderAvif from './assets/team/founder-hovo.avif';
import founderJpg from './assets/team/founder-hovo.jpg';
import mayaAvif from './assets/team/maya-koch.avif';
import mayaJpg from './assets/team/maya-koch.jpg';
import eugeneAvif from './assets/team/eugene-kuhot.avif';
import eugeneJpg from './assets/team/eugene-kuhot.jpg';
import narekAvif from './assets/team/narek-zhamharyan.avif';
import narekJpg from './assets/team/narek-zhamharyan.jpg';
import BrandLogo from './BrandLogo';
import LegalPage from './LegalPage';
import { capture } from './analytics';
import { legalDocs } from './legal';

const results = [
  { value: '40+', label: 'Systems delivered' },
  { value: '12w', label: 'Typical first release' },
  { value: '30d', label: 'Satisfaction guarantee' },
  { value: '1:1', label: 'Senior access' },
];

const services = [
  {
    title: 'Decide what is worth building',
    body: 'Before committing to a project, we identify where time, revenue, or customer experience is being lost. You get a clear priority and a practical first step instead of a long list of ideas.',
    outcomes: ['A sharper investment decision', 'A fixed path for the first release'],
  },
  {
    title: 'Replace manual work with a reliable system',
    body: 'When the business runs on spreadsheets, inboxes, and workarounds, important work gets delayed or missed. We create one place for the process your team needs to run every day.',
    outcomes: ['Fewer handoffs and duplicate tasks', 'More consistent day to day operations'],
  },
  {
    title: 'Give your team time back',
    body: 'We automate repeat questions, routine checks, and information gathering where it makes a measurable difference. Your people keep the judgment calls and spend less time on administrative work.',
    outcomes: ['Less repetitive work for staff', 'Faster responses when demand is high'],
  },
  {
    title: 'Make it easier to do business with you',
    body: 'Clients and guests should not need to chase updates, repeat details, or wait for simple answers. We create clearer self service journeys that support the relationship rather than complicate it.',
    outcomes: ['A better client or guest experience', 'Fewer routine requests for your team'],
  },
  {
    title: 'Keep the operation moving as you grow',
    body: 'A useful system needs to change when your services, team, or customer expectations change. We remain close after launch to improve the parts of the operation that matter next.',
    outcomes: ['Software that stays aligned with the business', 'A trusted team for the next improvement'],
  },
];

const industries = [
  'Hotels & hospitality',
  'Restaurants',
  'Law firms',
  'Clinics',
  'Professional services',
];

const firstProject = [
  {
    stage: 'Conversation',
    title: 'Start with the workflow',
    happens:
      'You show us the part of the business that is slow, manual, or difficult for customers and staff.',
    gets:
      'A clear view of whether software is the right answer and what a sensible first phase could solve.',
  },
  {
    stage: 'Scope',
    title: 'Agree the first release',
    happens:
      'We define the workflow, what is included, and the decisions needed before build starts.',
    gets:
      'A written scope, fixed project price, and delivery plan you can review before committing.',
  },
  {
    stage: 'Build',
    title: 'Review working progress',
    happens:
      'We build in focused stages and test the real scenarios your team deals with every day.',
    gets:
      'Regular visibility into the work and fewer surprises when the system reaches your team.',
  },
  {
    stage: 'Launch',
    title: 'Put it into daily use',
    happens:
      'We support handover, resolve agreed issues, and stay available once the system is in use.',
    gets:
      'A 30-day guarantee and a team that already understands the workflow when you need to improve it.',
  },
];

const whyTelosCode = [
  {
    title: 'Senior engineers start with the business',
    body: 'We map the operational problem before proposing software, so the build solves a real constraint rather than adding another system.',
  },
  {
    title: 'Fixed project pricing',
    body: 'Scope, investment, and decision points are agreed before work begins. You can plan the project without watching a running meter.',
  },
  {
    title: 'A direct line to the people building it',
    body: 'Questions reach the engineers making the decisions. Less relay work means fewer assumptions and faster answers.',
  },
  {
    title: 'Boutique by design',
    body: 'A small senior team stays close to the details. Your project does not disappear into an account structure or a delivery queue.',
  },
  {
    title: 'AI with a job to do',
    body: 'We use AI where it removes repeat work, surfaces useful information, or shortens a handoff. If it does not improve the operation, it does not go in the scope.',
  },
  {
    title: 'A partner after launch',
    body: 'We stay available as the business changes, so the software can keep pace with new services, processes, and systems.',
  },
];

const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'NestJS',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Redis',
  'AWS',
  'Docker',
  'OpenAI API',
  'Anthropic API',
  'OpenAPI',
  'LangChain',
  'GraphQL',
];

// Exported so the build can emit FAQPage structured data from the same source.
export const faqs = [
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

// width/height are the intrinsic sizes printed by `npm run images`.
const team = [
  {
    name: 'Maya Koch',
    role: 'Agentic AI Product Manager',
    place: 'Germany',
    image: { avif: mayaAvif, jpg: mayaJpg, width: 720, height: 720 },
    initial: 'M',
  },
  {
    name: 'Hovo Dallakyan',
    role: 'Founder & Software Architect',
    place: 'Armenia',
    image: { avif: founderAvif, jpg: founderJpg, width: 720, height: 720 },
    initial: 'H',
  },
  {
    name: 'Eugene Kuhot',
    role: 'Senior Software Engineer',
    place: 'Poland',
    image: { avif: eugeneAvif, jpg: eugeneJpg, width: 720, height: 720 },
    initial: 'E',
  },
  {
    name: 'Narek Zhamharyan',
    role: 'Data Analyst',
    place: 'USA',
    image: { avif: narekAvif, jpg: narekJpg, width: 612, height: 816 },
    initial: 'N',
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
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-visible');
        el.setAttribute('data-visible', 'true');
      });
      setActiveWords(taglineWords.length);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // data-visible survives React className re-renders (unlike is-visible alone)
            entry.target.classList.add('is-visible');
            entry.target.setAttribute('data-visible', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.getAttribute('data-visible') === 'true') {
        el.classList.add('is-visible');
        return;
      }
      observer.observe(el);
    });
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

  const trackConsultationCta = (ctaLocation) => {
    capture('consultation_cta_clicked', { cta_location: ctaLocation });
  };

  const trackServiceInterest = (serviceName) => {
    capture('service_interest_selected', { service_name: serviceName });
  };

  const trackConsultationEmail = (ctaLocation) => {
    capture('consultation_email_opened', { cta_location: ctaLocation });
  };

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

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
          <a href="#approach" onClick={closeMenu}>
            How we work
          </a>
          <a href="#about" onClick={closeMenu}>
            Team
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>
        <a
          className="btn btn-sm nav-cta"
          href="#contact"
          onClick={() => {
            closeMenu();
            trackConsultationCta('desktop_navigation');
          }}
        >
          Book consultation
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={menuOpen ? 'x' : ''} />
        </button>
      </header>

      {/* Mobile menu portal-style overlay (outside sticky bar so fixed works reliably) */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu-nav" aria-label="Mobile">
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#approach" onClick={closeMenu}>
            How we work
          </a>
          <a href="#about" onClick={closeMenu}>
            Team
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>
        <a
          className="btn mobile-menu-cta"
          href="#contact"
          onClick={() => {
            closeMenu();
            trackConsultationCta('mobile_navigation');
          }}
        >
          Book consultation
        </a>
      </div>

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
              <p className="kicker">Senior software partners for service businesses</p>
              <h1>
                Custom software that removes <em>operational bottlenecks.</em>
              </h1>
              <p className="lede">
                We build booking systems, client portals, AI workflows, and internal tools for
                hotels, restaurants, clinics, law firms, and professional services.
              </p>
              <div className="hero-actions">
                <a
                  className="btn"
                  href="#contact"
                  onClick={() => trackConsultationCta('hero')}
                >
                  Discuss your project
                </a>
                <a className="link" href="#approach">
                  See how a first project works
                </a>
              </div>
              <ul className="trust">
                <li>
                  <span className="trust-mark" aria-hidden="true" />
                  <span className="trust-text">Fixed project pricing</span>
                </li>
                <li>
                  <span className="trust-mark" aria-hidden="true" />
                  <span className="trust-text">30-day guarantee</span>
                </li>
                <li>
                  <span className="trust-mark" aria-hidden="true" />
                  <span className="trust-text">Senior engineers only</span>
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
              <p className="kicker">Where we help</p>
              <h2>
                Fix the work that holds
                <br />
                your business back.
              </h2>
              <p className="split-note">
                We start with the operational problem, not a technology choice. Then we build
                the smallest useful system that makes the work easier to run.
              </p>
              <div className="industry-line">
                <span className="industry-line-label">Built for</span>
                <ul>
                  {industries.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <a
                className="link"
                href="#contact"
                onClick={() => trackConsultationCta('services_intro')}
              >
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
                  onClick={() => trackServiceInterest(item.title)}
                >
                  <span className="row-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="row-copy">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <div className="service-outcomes">
                      <span>Business outcomes</span>
                      <ul>
                        {item.outcomes.map((outcome) => (
                          <li key={outcome}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <span className="row-go" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section id="approach" className="band band-soft">
          <div className="wrap block-in">
            <div className="band-head reveal" data-reveal>
              <p className="kicker">How we work</p>
              <h2>A clear first project, led by senior people.</h2>
              <p className="band-sub">
                We start with one important business need, agree the scope and investment,
                then stay accountable through launch.
              </p>
            </div>
            <div className="work-list">
              {firstProject.map((item, i) => (
                <article
                  key={item.title}
                  className="work-item reveal"
                  data-reveal
                  style={{ '--d': `${i * 50}ms` }}
                >
                  <div className="work-top">
                    <span className="work-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="work-sector">{item.stage}</span>
                  </div>
                  <div className="work-body">
                    <h3>{item.title}</h3>
                    <dl className="work-facts">
                      <div>
                        <dt>What happens</dt>
                        <dd>{item.happens}</dd>
                      </div>
                      <div>
                        <dt>You get</dt>
                        <dd>{item.gets}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
            <div className="band-head combined-why reveal" data-reveal>
              <p className="kicker">Why TelosCode</p>
              <h2>Built for the work behind the service.</h2>
              <p className="band-sub">
                Senior engineers work directly on the systems your team and customers rely on.
              </p>
            </div>
            <div className="reason-grid">
              {whyTelosCode.map((item, i) => (
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
            <p className="band-sub reveal" data-reveal>
              The result is software that fits the way your business operates today and has a
              clear owner when it needs to change tomorrow.
            </p>
            <a
              className="link work-cta reveal"
              href="#contact"
              data-reveal
              onClick={() => trackConsultationCta('first_project')}
            >
              Start a project conversation
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

        {/* Team */}
        <section id="about" className="band band-soft">
          <div className="wrap block-in">
            <div className="about-layout reveal" data-reveal>
              <div className="about-head">
                <p className="kicker">Team</p>
                <h2>A senior team across Europe and the USA.</h2>
                <p>
                  TelosCode is a distributed studio. Strategy, design, engineering, and
                  AI stay on one track. You work with the people shipping the product,
                  not a separate account layer.
                </p>
                <p className="about-note">
                  Roles expand per engagement. Delivery is led by senior people end to
                  end, with specialists joining as the work needs them.
                </p>
              </div>

              <div className="team-slider" aria-roledescription="carousel" aria-label="Team members">
                <p className="team-label">Meet some of the team</p>
                <div className="team-stage" aria-live="polite">
                  {team.map((item, i) => (
                    <article
                      key={item.name}
                      className={`team-slide ${i === teamIndex ? 'is-active' : ''}`}
                      aria-hidden={i !== teamIndex}
                    >
                      <div className={`team-avatar ${item.image ? '' : 'placeholder'}`}>
                        {item.image ? (
                          <picture>
                            <source srcSet={item.image.avif} type="image/avif" />
                            <img
                              src={item.image.jpg}
                              alt={`${item.name}, ${item.role}`}
                              width={item.image.width}
                              height={item.image.height}
                              decoding="async"
                              loading="lazy"
                            />
                          </picture>
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
              // Answers stay mounted and are hidden with the `hidden` attribute so
              // all of them ship in the prerendered HTML, not just the open one.
              return (
                <div
                  key={item.q}
                  className={`faq-item${open ? ' open' : ''}`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <i>{open ? '−' : '+'}</i>
                  </button>
                  <p id={`faq-answer-${i}`} hidden={!open}>
                    {item.a}
                  </p>
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
            <a
              className="btn btn-dark"
              href="mailto:hello@teloscode.com"
              onClick={() => trackConsultationEmail('contact_section')}
            >
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
            <a href="#approach">How we work</a>
            <a href="#about">Team</a>
          </div>
          <div>
            <strong>Contact</strong>
            <a
              href="mailto:hello@teloscode.com"
              onClick={() => trackConsultationEmail('footer')}
            >
              hello@teloscode.com
            </a>
            <a href="#contact">Book consultation</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
        <small>© 2026 TelosCode. All rights reserved.</small>
      </footer>
    </div>
  );
}

/**
 * Path switch for the three static URLs this site has. There is no client-side
 * navigation — every link is a real page load — so a lookup beats pulling in a
 * router. The prerender passes the path it is building and the client passes
 * window.location.pathname, so both render the same tree and hydration matches.
 */
export default function Root({ path = '/' }) {
  const slug = path.replace(/^\/+|\/+$/g, '');
  return legalDocs[slug] ? <LegalPage slug={slug} /> : <App />;
}
