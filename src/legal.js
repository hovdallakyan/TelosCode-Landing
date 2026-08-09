/**
 * Content for the /privacy and /terms pages.
 *
 * These describe what the site actually does today: PostHog analytics on US
 * infrastructure, self-hosted fonts, and a mailto contact link with no forms. If
 * the site starts collecting anything else — a contact form, a booking embed, a
 * chat widget — update "What we collect" and "Third parties" to match.
 *
 * TelosCode is not yet incorporated, so both documents identify the operator as
 * a named individual trading under the TelosCode name, which is a valid
 * controller under the GDPR. Once a company is registered, three things need
 * updating: the controller in "Who is responsible", the operator in "Who these
 * terms are with", and the "Governing law" section, which currently defers to
 * the signed client agreement instead of naming a jurisdiction.
 */

export const CONTACT_EMAIL = 'hello@teloscode.com';
export const LAST_UPDATED = '9 August 2026';

// Static rather than new Date(), which would differ between the build-time
// prerender and a client rendering after New Year, breaking hydration.
export const COPYRIGHT_YEAR = 2026;

export const legalDocs = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'How TelosCode handles personal data on teloscode.com, including analytics cookies and third-party services.',
    intro:
      'This policy explains what happens to personal data when you visit teloscode.com or contact us. We keep the site deliberately light: there are no accounts, no contact forms, and no advertising trackers.',
    sections: [
      {
        heading: 'Who is responsible',
        body: [
          'TelosCode is a software engineering studio operated by Hovo Dallakyan, who is the controller for the personal data described in this policy.',
          `You can reach us about anything in this policy, including any request to access or delete your data, at ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'What we collect',
        body: [
          'When you browse this site, we collect a limited set of usage data through our analytics provider. This includes pages viewed, clicks on calls to action, approximate location derived from your IP address, device and browser type, referring page, and a randomly generated identifier stored in your browser.',
          'We do not ask for your name, address, or payment details anywhere on this site, and there is no form to submit them through.',
          'If you email us, we receive whatever you choose to put in that email, along with your email address. We use it to answer you and to keep a record of the conversation.',
        ],
      },
      {
        heading: 'Analytics and cookies',
        body: [
          'We use PostHog to understand how the site is used and to catch front-end errors. PostHog stores a cookie and a matching entry in your browser local storage, both named after our project key, to recognise a returning browser across visits.',
          'We use this only in aggregate, to see which parts of the site people actually read and where they drop off. We do not use it to build advertising profiles, and we do not sell or share it with advertisers.',
          'You can block or delete these cookies in your browser at any time. The site works normally without them. Browsers that send a Global Privacy Control or Do Not Track signal are respected where our provider supports it.',
        ],
      },
      {
        heading: 'Third parties that receive data',
        body: [
          'We keep third-party requests to a minimum. Fonts are served from our own domain rather than from Google, so loading this site does not reveal your IP address to a font provider.',
          'Two third parties may receive data as a technical consequence of using the site:',
        ],
        list: [
          'PostHog, our analytics provider, which processes the usage data described above on our instructions. It is loaded only once you interact with the page, or after a short delay.',
          'Our hosting provider, which processes server request logs in order to serve the site.',
        ],
      },
      {
        heading: 'Legal basis',
        body: [
          'Where the GDPR applies, we rely on our legitimate interest in understanding and improving how our own website performs, and in keeping it secure and functioning. We have weighed this against your interests by collecting no special category data, running no advertising trackers, and keeping retention short.',
          'Where consent is required in your jurisdiction for the analytics cookies described above, we rely on consent and you may withdraw it by clearing and blocking cookies for this site.',
          'When you email us, we process that correspondence on the basis of our legitimate interest in responding to enquiries, or to take steps prior to entering a contract.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Analytics data is retained for 12 months and then deleted or fully anonymised.',
          'Email correspondence is kept for as long as needed to handle your enquiry and to meet any record-keeping obligations we have, then deleted.',
        ],
      },
      {
        heading: 'Where data is processed',
        body: [
          'Our team works from several countries, including locations inside and outside the European Economic Area.',
          'Our analytics provider, PostHog, processes the usage data described above on its United States cloud infrastructure, so that data leaves the EEA.',
          'Where personal data is transferred outside the EEA or UK, we rely on the European Commission Standard Contractual Clauses, which form part of our agreement with the provider, as the transfer mechanism.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Depending on where you live, you may have the right to request access to the personal data we hold about you, to have it corrected or deleted, to object to or restrict how we use it, and to receive it in a portable format.',
          `To exercise any of these, email ${CONTACT_EMAIL}. We will respond within one month.`,
          'If you are in the EEA or UK and you think we have handled your data badly, you can complain to your local data protection supervisory authority. We would appreciate the chance to address it first.',
        ],
      },
      {
        heading: 'Children',
        body: [
          'This site is aimed at businesses and is not directed at children. We do not knowingly collect data from anyone under 16.',
        ],
      },
      {
        heading: 'Changes to this policy',
        body: [
          'If we change what we collect or why, we will update this page and the date shown at the top. Material changes will be summarised here rather than applied quietly.',
        ],
      },
    ],
  },

  terms: {
    slug: 'terms',
    title: 'Terms of Use',
    description:
      'The terms that apply to visitors of teloscode.com, and how they relate to client project agreements.',
    intro:
      'These terms cover your use of teloscode.com. They do not govern client projects — those run on a separate signed agreement, which takes precedence over anything on this website.',
    sections: [
      {
        heading: 'Who these terms are with',
        body: [
          'This website is operated by Hovo Dallakyan, trading as TelosCode ("TelosCode", "we", "us"). By using the site you accept these terms. If you do not accept them, please stop using the site.',
          `You can reach us at ${CONTACT_EMAIL}.`,
        ],
      },
      {
        heading: 'What this site is',
        body: [
          'This site describes services we offer. Nothing on it is a binding offer, a quote, or a guarantee of any particular outcome, timeline, or price.',
          'Figures shown on the site — including delivery timeframes, project counts, and guarantee periods — describe our typical experience. They are indicative and are not commitments until they appear in a signed agreement.',
        ],
      },
      {
        heading: 'Client work is governed separately',
        body: [
          'Any engagement we take on is governed by a written agreement covering scope, price, timeline, intellectual property, confidentiality, warranties, and liability.',
          'Where these website terms and a signed client agreement conflict, the signed agreement wins. Statements on this site about source code ownership, fixed pricing, or satisfaction guarantees are summaries of how we normally work, and the specifics of your engagement will be whatever your agreement says.',
        ],
      },
      {
        heading: 'Using the site',
        body: [
          'You may read this site, and share links to it, for any lawful purpose. You may not attempt to disrupt or gain unauthorised access to the site or its infrastructure, scrape it in a way that degrades it for others, or present its content as your own.',
        ],
      },
      {
        heading: 'Content and intellectual property',
        body: [
          'The text, design, layout, code, and images on this site belong to us or to the people we licensed them from, including the photographs of our team. You may not reuse them commercially without written permission.',
          'Product, company, and technology names mentioned on this site belong to their respective owners and are used only to describe what we work with. Their appearance here does not imply any endorsement or partnership.',
        ],
      },
      {
        heading: 'No warranty for site content',
        body: [
          'We put real effort into keeping this site accurate, but we provide it "as is". We do not warrant that it will be available without interruption, free of errors, or up to date at any given moment.',
          'Nothing here is legal, financial, or technical advice for your particular situation. Talk to us, or to an appropriate professional, before making a decision based on it.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'To the extent permitted by law, we are not liable for indirect or consequential loss, lost profit, or lost data arising from your use of this website.',
          'Nothing in these terms limits liability that cannot be limited by law, including liability for death or personal injury caused by negligence, or for fraud.',
        ],
      },
      {
        heading: 'Links to other sites',
        body: [
          'Where we link to a third-party site, we do so because we think it is useful. We do not control those sites and are not responsible for their content or their privacy practices.',
        ],
      },
      {
        heading: 'Privacy',
        body: [
          'Our handling of personal data is described in our Privacy Policy, which forms part of these terms.',
        ],
      },
      {
        heading: 'Governing law',
        body: [
          'These terms cover the use of this website only. Because every engagement runs on a separate signed agreement, the governing law and the forum for any dispute about project work are set out in that agreement rather than here.',
          'Nothing in these terms removes a right to bring a claim in your own country of residence where the law gives you that right, or overrides consumer protections that apply to you locally.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'We may update these terms. The version published here, with the date at the top, is the one that applies.',
        ],
      },
      {
        heading: 'Contact',
        body: [`Questions about these terms: ${CONTACT_EMAIL}.`],
      },
    ],
  },
};

export const legalRoutes = Object.values(legalDocs).map((doc) => `/${doc.slug}`);
