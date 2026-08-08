import React from 'react';
import BrandLogo from './BrandLogo';
import { CONTACT_EMAIL, COPYRIGHT_YEAR, LAST_UPDATED, legalDocs } from './legal';

/**
 * Renders a legal document at its own URL. Kept deliberately plain: no reveal
 * animations or scroll effects, so the text is readable the moment it paints and
 * stays readable if JS never runs.
 */
export default function LegalPage({ slug }) {
  const doc = legalDocs[slug];

  return (
    <div className="page legal-page">
      <a className="skip" href="#legal-main">
        Skip to content
      </a>

      <header className="nav">
        <a className="logo" href="/" aria-label="TelosCode home">
          <BrandLogo />
        </a>
        <a className="link legal-back" href="/">
          Back to site
        </a>
      </header>

      <main id="legal-main" className="wrap legal-body">
        <p className="kicker">Legal</p>
        <h1>{doc.title}</h1>
        <p className="legal-updated">Last updated {LAST_UPDATED}</p>
        <p className="legal-intro">{doc.intro}</p>

        {doc.sections.map((section) => (
          <section key={section.heading} className="legal-section">
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </main>

      <footer className="footer wrap legal-footer">
        <div className="footer-cols">
          <div>
            <strong>Company</strong>
            <a href="/">Home</a>
            <a href="/#services">Services</a>
            <a href="/#about">Team</a>
          </div>
          <div>
            <strong>Contact</strong>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
        <small>© {COPYRIGHT_YEAR} TelosCode. All rights reserved.</small>
      </footer>
    </div>
  );
}
