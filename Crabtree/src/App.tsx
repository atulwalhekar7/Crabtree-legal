import React, { useMemo, useState, useEffect } from 'react';
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Check,
  Award,
  Sun,
  Moon,
  ChevronDown,
  ChevronLeft,
  Briefcase,
} from 'lucide-react';

// ─── Static Data ──────────────────────────────────────────────────────────────
const LOGO_URL = 'https://lirp.cdn-website.com/715c0405/dms3rep/multi/opt/USE+-+Social+Media+-+Crabtree+Legal+Logo+-+No+Background+-+Large-1920w.png';
const OWNER_PHOTO_URL = 'https://lirp.cdn-website.com/715c0405/dms3rep/multi/opt/20250424JCrabtree_large-1009-cf40702e-1920w.jpg';

const CAROUSEL_SLIDES = [
  { title: 'A law firm that proud to serve', subtitle: 'Trusted legal guidance for wills, estate planning, probate and business succession throughout Perth.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600', accent: 'Perth CBD & Suburbs' },
  { title: 'Evolving For Your Future', subtitle: 'Securing multi-generational corporate succession pipelines and family assets with tactical precision.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600', accent: 'St Georges Terrace HQ' },
  { title: 'Preserving Family Legacies', subtitle: 'Bespoke Discretionary and Testamentary Trusts mapped to shield your wealth from modern challenges.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600', accent: 'Private Wealth Protection' },
];

const SERVICES_DATA = [
  { id: 'Commercial Law', category: 'Succession & Estates', title: 'Wills, Estates & Succession', subtitle: 'Structured solutions to protect and transfer your lifetime wealth cleanly.', image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800', points: ['Simple & Complex Wills', 'Wills incorporating Testamentary Trusts', 'Enduring Powers of Attorney (EPA)', 'Enduring Powers of Guardianship (EPG)', 'Dealing with Superannuation & Trust routing', 'Strategic Loan Agreements'] },
  { id: 'Wills, Estate and Succession Planning', category: 'Commercial Law', title: 'Commercial & Business Structuring', subtitle: 'Providing legal and corporate drafting for robust business operations.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800', points: ['Company Set Ups & Business Structuring', 'Shareholder & Director Agreements', 'Trust Creation & Deeds of Variation', 'Share Sale & Purchase Transactions', 'Reviewing & Drafting Commercial Contracts', 'Incorporated Association Transitions'] },
];

const ARTICLES_DATA = [
  { id: 1, date: '9 November 2025', author: 'Jonathan Crabtree', title: "Protecting Your Children's Inheritance from Divorce with Testamentary Trust Wills: The Bernard v Bernard Case", summary: 'An in-depth analysis of how testamentary trusts serve as essential defensive walls against estate division within family law breakdowns.', category: 'Wills & Estates', content: `In the complex arena of family asset protection, the landmark case of Bernard v Bernard highlights the profound legal advantages of well-drafted Testamentary Trust Wills. Simple Wills often leave beneficiaries vulnerable to having their inheritances integrated into martial property pools during divorce proceedings.\n\nA Testamentary Trust maintains assets within a distinct discretionary structure rather than distributing them directly to an individual. When structured with absolute precision by an experienced succession lawyer, the trust assets do not form part of the marital property pool, saving the next generation's inheritance from litigation and forced divisions.\n\nKey takeaways for families planning their estates:\n1. Discretionary Control: Appointing independent or joint trustees preserves asset shielding.\n2. Asset Segregation: Keeps family wealth insulated from relationship disputes.\n3. Long-term Security: Establishes a protected legal architecture that spans generations.` },
  { id: 2, date: '9 September 2025', author: 'Jonathan Crabtree', title: 'The Benefits of Testamentary Trust Wills Explained', summary: 'Understand the crucial differences between standard Wills and Testamentary Trusts concerning tax flexibilities and asset protection.', category: 'Estate Planning', content: `A Testamentary Trust is a trust established within a Will that only comes into effect upon the death of the testator. Unlike a simple Will that distributes assets directly to beneficiaries, a Testamentary Trust provides substantial tax planning options and protective barriers.\n\nTax Benefits:\nMinors (under 18) who are beneficiaries of a Testamentary Trust are taxed at adult tax-free thresholds rather than the penalty rates usually applied to trust income distributed to minors.\n\nAsset Protection:\nBecause the trust owns the assets—not the individual beneficiary—the inheritance is shielded from personal bankruptcy claims, commercial creditors, and relationship breakdowns.` },
  { id: 3, date: '3 September 2025', author: 'Jonathan Crabtree', title: 'How Getting Married or Divorced Can Revoke Your Will', summary: 'Many Western Australians do not realize that significant life changes can automatically invalidate key estate instructions.', category: 'Wills & Estates', content: `In Western Australia, major relationship status changes carry automatic statutory consequences for your estate planning documents under the Wills Act 1970.\n\nMarriage:\nAs a general rule, getting married automatically revokes any Will you made prior to the marriage.\n\nDivorce:\nConversely, a formal divorce automatically revokes any beneficial disposition or appointment of your former spouse as an executor within your existing Will.` },
  { id: 4, date: '27 August 2025', author: 'Jonathan Crabtree', title: 'Why Every Parent Should Nominate a Legal Guardian in their Will', summary: 'Protecting minor children is the single most important estate directive.', category: 'Estate Planning', content: `While much of estate planning focuses on the distribution of physical and financial assets, nominating a legal guardian for children under 18 is the most critical decision a parent can make.\n\nWithout a clear, legally binding nomination in a Will, the determination of who raises your children is left to the Family Court of WA or state welfare agencies.` },
  { id: 5, date: '20 August 2025', author: 'Jonathan Crabtree', title: 'What Happens to Your Estate If You Die without a Will in WA', summary: 'A breakdown of the rigid, statutory distribution formulas enforced on intestate estates in Western Australia.', category: 'Wills & Estates', content: `If you pass away without leaving a valid Will in Western Australia, your estate is declared 'intestate'. It will be distributed strictly according to the formulas set out in the Administration Act 1903 (WA), regardless of your relationship dynamics or verbal promises.` },
  { id: 6, date: '16 July 2025', author: 'Jonathan Crabtree', title: 'Why Every New Company Needs a Shareholders Agreement—Drafted Early', summary: 'Preventing devastating corporate and board deadlocks by embedding clear equity option buyouts.', category: 'Commercial Law', content: `Starting a business with partners is a time of great optimism, but failing to put a Shareholders Agreement in place early is a major risk.\n\nA robust, professionally drafted Shareholders Agreement governs:\n1. Dispute Resolution\n2. Drag-Along & Tag-Along Rules\n3. Valuation Methods\n4. Death or Disability clauses` },
];

const FAQS = [
  { question: 'What is the key benefit of a Testamentary Trust over a simple Will?', answer: 'A Testamentary Trust holds assets inside a separate protective structure rather than distributing them directly to individuals. This provides high-level shielding against relationship breakdowns, personal bankruptcies, or creditor claims, while allowing highly flexible tax distribution options.' },
  { question: 'What is the process and timeline for getting Probate in WA?', answer: 'The application process involves preparing detailed court documents, including the motion, affidavit of executor, and the original Will. Once compiled and filed with the Supreme Court of WA, it typically takes between 4 to 8 weeks for the Court to grant Probate.' },
  { question: 'How do you coordinate estate plans with existing financial planners or accountants?', answer: 'We believe in integrated estate and succession planning. We collaborate directly with your CPA, financial advisers, or wealth managers to ensure your Will, trust deeds, superannuation binding nominations, and corporate structures align perfectly.' },
  { question: 'Do you offer transparent fixed-fee legal services?', answer: 'Yes. For our core estate planning packages and uncontested Probate applications, we provide upfront, fully transparent fixed-fee proposals. This gives you complete budget certainty with no hidden hourly charges.' },
  { question: 'What happens if I pass away without a Will in Western Australia?', answer: 'If you die intestate in WA, your assets are distributed strictly based on the rigid statutory formulas outlined in the Administration Act 1903 (WA). This default split often leads to unintended outcomes, potential family disputes, and significant delays.' },
];

const NAV_ITEMS = ['Home', 'About', 'Services', 'News & Articles', 'Contact'];

// ─── Theme Tokens ─────────────────────────────────────────────────────────────
const getTheme = (isDark: boolean) => ({

  bg: isDark ? '#121212' : '#ffffff',
  bgAlt: isDark ? '#1C1C1C' : '#F8F8F8',
  cardBg: isDark ? '#1A1A1A' : '#ffffff',
  navBg: isDark ? 'rgba(18,18,18,0.96)' : 'rgba(255,255,255,0.96)',
  text: isDark ? '#F5F5F5' : '#2B2B2B',
  textMuted: isDark ? '#B0B0B0' : '#4B5563',
  textLight: isDark ? '#888888' : '#6B7280',
  border: isDark ? '#2D2D2D' : '#E5E7EB',
  inputBg: isDark ? '#242424' : '#ffffff',
  accent: '#D43444',
  accentHover: '#b02c38',
  isDark,
});

// ─── Reusable Hover Hook ──────────────────────────────────────────────────────
function useHover(): [boolean, React.HTMLAttributes<HTMLElement>] {
  const [hovered, setHovered] = useState(false);
  const props: React.HTMLAttributes<HTMLElement> = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  return [hovered, props];
}

type Theme = ReturnType<typeof getTheme>;

type NavButtonProps = {
  item: string;
  activeTab: string;
  handleNavClick: (tab: string) => void;
  scrolled: boolean;
  t: Theme;
};

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
};

type OutlineButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
};

type ServiceCardProps = {
  svc: (typeof SERVICES_DATA)[number];
  t: Theme;
  handleNavClick: (tab: string) => void;
};

type ArticleCardProps = {
  art: (typeof ARTICLES_DATA)[number];
  t: Theme;
  onSelect: (art: (typeof ARTICLES_DATA)[number]) => void;
};

type FaqItemProps = {
  faq: (typeof FAQS)[number];
  idx: number;
  t: Theme;
};

type HomeContactInfoCardProps = {
  item: {
    label: string;
    value: string;
    icon: React.ReactElement;
  };
  t: Theme;
};

type HomeContactFormProps = {
  t: Theme;
  isDark: boolean;
  handleNavClick: (tab: string) => void;
};

type AboutSectionProps = {
  t: Theme;
  isDark: boolean;
  handleNavClick: (tab: string) => void;
};

type ThemeToggleProps = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  scrolled: boolean;
  t: Theme;
};

type FilterButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  t: Theme;
};

type TextLinkButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

type FooterNavLinkProps = {
  label: string;
  onClick: () => void;
  small: boolean;
};


// ─── Components ───────────────────────────────────────────────────────────────
function NavButton({ item, activeTab, handleNavClick, scrolled, t }: NavButtonProps) {
  const [hov, hovProps] = useHover();
  const isActive = activeTab === item;
  return (
    <button
      onClick={() => handleNavClick(item)}
      {...hovProps}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
        fontSize: 14, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
        color: isActive ? t.accent : scrolled ? t.textMuted : '#D1D5DB',
        transition: 'color 0.2s', position: 'relative',
      }}
    >
      {item}
      <span style={{
        position: 'absolute', bottom: -4, left: 0,
        height: 2, width: isActive || hov ? '100%' : 0,
        background: t.accent, transition: 'width 0.3s ease', borderRadius: 2,
      }} />
    </button>
  );
}

function PrimaryButton({ children, onClick, style = {} }) {
  const [hov, hovProps] = useHover();
  return (
    <button
      onClick={onClick}
      {...hovProps}
      style={{
        background: hov ? '#b02c38' : '#D43444',
        color: '#fff', border: 'none', cursor: 'pointer',
        padding: '12px 24px', borderRadius: 6,
        fontSize: 14, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
        transition: 'background 0.2s, transform 0.2s',
        transform: hov ? 'translateY(-1px)' : 'none',
        boxShadow: hov ? '0 8px 24px rgba(212,52,68,0.3)' : '0 2px 8px rgba(212,52,68,0.2)',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick, style = {} }) {
  const [hov, hovProps] = useHover();
  return (
    <button
      onClick={onClick}
      {...hovProps}
      style={{
        background: hov ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
        color: '#fff', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer',
        padding: '12px 24px', borderRadius: 6,
        fontSize: 14, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
        transition: 'background 0.2s', ...style,
      }}
    >
      {children}
    </button>
  );
}

function ServiceCard({ svc, t, handleNavClick }) {
  const [hov, hovProps] = useHover();
  const [btnHov, btnHovProps] = useHover();
  return (
    <div
      {...hovProps}
      style={{
        background: t.cardBg, border: `1px solid ${hov ? t.accent : t.border}`,
        borderRadius: 16, overflow: 'hidden',
        boxShadow: hov ? '0 25px 60px -15px rgba(212,52,68,0.18)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hov ? 'translateY(-6px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ height: 176, width: '100%', position: 'relative', overflow: 'hidden' }}>
          <img src={svc.image} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 4, fontSize: 10, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D43444', border: '1px solid rgba(212,52,68,0.25)' }}>
            {svc.category}
          </div>
        </div>
        <div style={{ padding: '24px 24px 0' }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: t.text }}>{svc.title}</h3>
          <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: t.textLight, margin: '0 0 16px' }}>{svc.subtitle}</p>
          <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 16 }}>
            {svc.points.map((pt) => (
              <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Check size={20} color="#D43444" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 10.5, color: t.textLight }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: '16px 24px 24px' }}>
        <button
          {...btnHovProps}
          onClick={() => handleNavClick('Contact')}
          style={{
            width: '100%', background: btnHov ? '#D43444' : t.isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1',
            color: btnHov ? '#fff' : '#D43444', border: 'none', cursor: 'pointer',
            padding: '10px 0', borderRadius: 6,
            fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
        >
          Enquire About This Specialty
        </button>
      </div>
    </div>
  );
}

function ArticleCard({ art, t, onSelect }) {
  const [hov, hovProps] = useHover();
  return (
    <div
      {...hovProps}
      style={{
        background: t.cardBg, border: `1px solid ${hov ? t.accent : t.border}`,
        borderRadius: 16, padding: 24,
        boxShadow: hov ? '0 25px 60px -15px rgba(212,52,68,0.15)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hov ? 'translateY(-6px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em' }}>{art.date}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#D43444', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{art.category}</span>
        </div>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 800, lineHeight: 1.4, color: t.text, margin: '0 0 10px' }}>{art.title}</h3>
        <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: t.textLight, margin: 0 }}>{art.summary}</p>
      </div>
      <div style={{ borderTop: `1px solid ${t.border}`, marginTop: 20, paddingTop: 16 }}>
        <button
          onClick={() => onSelect(art)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D43444', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
        >
          Read Full Analysis <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

function FaqItem({ faq, idx, t }) {
  const [open, setOpen] = useState(false);
  const [hov, hovProps] = useHover();
  return (
    <div
      {...hovProps}
      style={{
        background: t.cardBg, border: `1px solid ${open || hov ? t.accent : t.border}`,
        borderRadius: 12, overflow: 'hidden',
        boxShadow: open ? '0 4px 20px rgba(212,52,68,0.1)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 800, color: t.text, paddingRight: 16, lineHeight: 1.4 }}>{faq.question}</span>
        <ChevronDown size={16} color="#D43444" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
      </div>
      <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div style={{ borderTop: `1px solid ${t.border}`, padding: '16px 20px' }}>
          <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: t.textMuted, margin: 0 }}>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

function HomeContactInfoCard({ item, t }) {
  const [hov, hovProps] = useHover();
  return (
    <div
      {...hovProps}
      style={{
        background: t.cardBg, border: `1px solid ${hov ? '#D43444' : t.border}`,
        borderRadius: 14, padding: '18px 20px',
        display: 'flex', alignItems: 'flex-start', gap: 14,
        boxShadow: hov ? '0 8px 28px rgba(212,52,68,0.12)' : '0 2px 8px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-2px)' : 'none',
        transition: 'all 0.25s ease', cursor: 'default',
      }}
    >
      <div style={{ width: 38, height: 38, background: hov ? '#D43444' : (t.isDark ? 'rgba(212,52,68,0.12)' : '#FFF0F1'), borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.25s' }}>
        {React.cloneElement(item.icon, { color: hov ? '#fff' : '#D43444' })}
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9CA3AF', marginBottom: 4 }}>{item.label}</p>
        <p style={{ fontSize: 14, fontWeight: 400, color: t.text, lineHeight: 1.6 }}>{item.value}</p>
      </div>
    </div>
  );
}

function HomeContactForm({ t, isDark, handleNavClick }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    }, 5000);
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: t.inputBg, color: t.text,
    border: `1px solid ${t.border}`, borderRadius: 8,
    padding: '11px 14px', fontSize: 15, outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 5 };

  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 20, padding: '36px 36px', boxShadow: isDark ? '0 8px 40px rgba(0,0,0,0.3)' : '0 8px 40px rgba(0,0,0,0.08)' }}>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {(['firstName', 'lastName']).map(field => (
              <div key={field}>
                <label style={labelStyle}>{field === 'firstName' ? 'First Name' : 'Last Name'}</label>
                <input type="text" required value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={inputStyle} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>How Can We Help?</label>
            <textarea rows={4} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Briefly describe your legal matter — Wills, Probate, Business Succession..." style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <PrimaryButton style={{ flex: 1, padding: '13px 0', minWidth: 160 }}>Send Enquiry</PrimaryButton>
            <button type="button" onClick={() => handleNavClick('Contact')} style={{ flex: 1, minWidth: 140, padding: '13px 0', background: 'none', border: `1px solid ${t.border}`, borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.textMuted, transition: 'all 0.2s' }}>
              Full Contact Page →
            </button>
          </div>
          <p style={{ fontSize: 11, color: t.textLight, textAlign: 'center', fontWeight: 300 }}>
           Your enquiry is strictly confidential. Conflicts clearance within 4 business hours.
          </p>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <div style={{ width: 52, height: 52, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Check size={26} color="#16A34A" />
          </div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 10 }}>Message Received</h3>
          <p style={{ fontSize: 12, color: '#9CA3AF', maxWidth: 340, margin: '0 auto', fontWeight: 300, lineHeight: 1.7 }}>
            Thank you! Jonathan Crabtree will review your enquiry and respond within 4 business hours.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── NEW: About Section styled like Screenshot 1 ──────────────────────────────
function AboutSection({ t, isDark, handleNavClick }) {
  return (
    <section style={{ padding: '120px 0 80px', background: t.bg }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 56, padding: '0 32px' }}>
        <span style={{
          fontSize: 10, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase',
          fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1',
          padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16,
        }}>
          Meet Our Experienced Director
        </span>
        <h2 style={{
          fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 800, color: t.text, marginBottom: 0,
        }}>
          The Vision Behind Crabtree Legal
        </h2>
      </div>

      {/* Full-width split: image left, content right — NO side padding on wrapper */}
      <div style={{    paddingLeft: '25px',

        display: 'grid',
        gridTemplateColumns: '1fr 1.15fr',
        minHeight: 560,
      }}>
        {/* ── LEFT: Photo with overlaid badges ── */}
        <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
          <img
            src={OWNER_PHOTO_URL}
            alt="Jonathan Crabtree"
            style={{ width: '100%', objectPosition: '15% left', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', opacity: 0.92 }}
          />

          {/* Top-left badge — "14+ Years Experience" matching screenshot style */}
         

          {/* Bottom bar — "Supreme & High Court WA" matching the "110+ Lenders Network" style */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: '#D43444',
            padding: '14px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <Award size={16} color="#fff" style={{ flexShrink: 0 }} />
            <span style={{
              fontSize: 14, fontWeight: 800, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#fff',
            }}>
              Supreme &amp; High Court WA
            </span>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div style={{
          background: isDark ? '#161616' : '#fafafa',
          borderLeft: `1px solid ${t.border}`,
          padding: '56px 60px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {/* Name + role row — like screenshot's "Adi / Chief Executive Officer" */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #D43444 0%, #6B1220 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Briefcase size={24} color="#fff" />
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Cinzel', serif", fontSize: 28, fontWeight: 900,
                color: t.text, lineHeight: 1, marginBottom: 4,
              }}>Jonathan Crabtree</h1>
              <p style={{
                fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#D43444',
              }}>Commercial &amp; Estate Planning Lawyer</p>
            </div>
          </div>

          {/* Bio paragraph */}
          <p style={{
            fontSize: 16, fontWeight: 300, lineHeight: 1.85,
            color: t.textMuted, marginBottom: 28,
            borderLeft: '2px solid #D43444', paddingLeft: 16,
          }}>
            With over 14 years of experience in commercial law and estate planning, Jonathan leads Crabtree Legal with military precision and strategic acumen. His expertise in succession planning and complex Will structures has protected the wealth of hundreds of Western Australian families and businesses.
          </p>

          {/* 4 feature checks in 2×2 grid — exactly like screenshot */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '10px 24px', marginBottom: 32,
          }}>
            {[
              'Wills & Testamentary Trusts',
              'Probate & Administration',
              'Fixed Transparent Fees',
              'Business Succession Deeds',
            ].map(feat => (
              <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: isDark ? 'rgba(212,52,68,0.12)' : '#FFF0F1',
                  border: '1px solid #D43444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Check size={12} color="#D43444" strokeWidth={3} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{feat}</span>
              </div>
            ))}
          </div>

          {/* Registrations mini list */}
          <div style={{
            background: isDark ? 'rgba(212,52,68,0.06)' : '#FFF5F5',
            border: `1px solid ${isDark ? 'rgba(212,52,68,0.15)' : '#FECACA'}`,
            borderRadius: 10, padding: '14px 18px', marginBottom: 32,
          }}>
            <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#D43444', marginBottom: 10 }}>Admitted Practitioner</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Supreme Court of Western Australia (March 2012)',
                'High Court of Australia (March 2012)',
                'Veteran-Owned Business (AVOB) Sponsor',
              ].map(r => (
                <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D43444', flexShrink: 0, marginTop: 5 }} />
                  <span style={{ fontSize: 14, color: t.textMuted, fontWeight: 300 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <div>
            <PrimaryButton onClick={() => handleNavClick('Contact')} style={{ padding: '13px 32px', fontSize: 13 }}>
              Book Free Consultation »
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });

  const t = getTheme(isDark);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((p) => (p + 1) % CAROUSEL_SLIDES.length), 8500);
    return () => clearInterval(id);
  }, []);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setSelectedArticle(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    }, 5000);
  };

  const filteredServices = activeServiceTab === 'all' ? SERVICES_DATA : SERVICES_DATA.filter(s => s.category === activeServiceTab);
  const filteredArticles = ARTICLES_DATA.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: t.inputBg, color: t.text,
    border: `1px solid ${t.border}`, borderRadius: 6,
    padding: '10px 12px', fontSize: 14,
    outline: 'none', transition: 'border-color 0.2s',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };
  const labelStyle = { display: 'block', fontSize: 8, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'background 0.4s, color 0.4s' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #D43444; color: #fff; }
        body { overflow-x: hidden; }
        input:focus, textarea:focus { border-color: #D43444 !important; }
        textarea { resize: vertical; }
      `}</style>

      {/* ══════════════════ HEADER ══════════════════ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s',
        background: scrolled ? t.navBg : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? `0 1px 0 ${t.border}, 0 4px 20px rgba(0,0,0,0.08)` : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div onClick={() => handleNavClick('Home')} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <img src={LOGO_URL} alt="Crabtree Legal" style={{ width: 42, height: 42, objectFit: 'contain' }} />
          </div>
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {NAV_ITEMS.map(item => (
              <NavButton key={item} item={item} activeTab={activeTab} handleNavClick={handleNavClick} scrolled={scrolled} t={t} />
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} scrolled={scrolled} t={t} />
            <a href="tel:0865578939" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', textDecoration: 'none', color: scrolled ? t.text : '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={13} color="#D43444" />
              (08) 6557 8939
            </a>
            <PrimaryButton onClick={() => handleNavClick('Contact')}>Enquire</PrimaryButton>
          </div>
        </div>

        {mobileMenuOpen && (
          <div style={{ background: t.cardBg, borderBottom: `1px solid ${t.border}`, boxShadow: '0 8px 32px rgba(0,0,0,0.15)', padding: '24px 32px', position: 'absolute', width: '100%', left: 0 }}>
            {NAV_ITEMS.map(item => (
              <button key={item} onClick={() => handleNavClick(item)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: activeTab === item ? '#D43444' : t.textMuted, borderBottom: `1px solid ${t.border}` }}>
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ══════════════════ MAIN ══════════════════ */}
      <main>

        {/* ─── HOME ─── */}
        {activeTab === 'Home' && (
          <div>
            {/* Hero Carousel */}
            <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000' }}>
              {CAROUSEL_SLIDES.map((slide, i) => (
                <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === currentSlide ? 0.45 : 0, transform: i === currentSlide ? 'scale(1)' : 'scale(1.05)', transition: 'all 1s ease-in-out', pointerEvents: i === currentSlide ? 'auto' : 'none' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000 0%, rgba(10,10,10,0.85) 50%, transparent 100%)', zIndex: 1 }} />
                  <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
              <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: 10 }}>
                {CAROUSEL_SLIDES.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} style={{ height: 6, width: i === currentSlide ? 32 : 8, borderRadius: 3, border: 'none', cursor: 'pointer', background: i === currentSlide ? '#D43444' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s', padding: 0 }} />
                ))}
              </div>
              <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px', position: 'relative', zIndex: 20, width: '100%', minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
                <div style={{ maxWidth: 600 }}>
                  
                  <p style={{ color: '#D43444', fontSize: 11, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>{CAROUSEL_SLIDES[currentSlide].accent}</p>
                  <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 5vw, 3.75rem)', color: '#fff', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 20 }}>
                    {CAROUSEL_SLIDES[currentSlide].title}
                  </h1>
                  <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: '#D1D5DB', fontWeight: 300, lineHeight: 1.7, maxWidth: 500, marginBottom: 32 }}>
                    {CAROUSEL_SLIDES[currentSlide].subtitle}
                  </p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <PrimaryButton onClick={() => handleNavClick('Contact')} style={{ padding: '14px 28px' }}>Book a Consultation</PrimaryButton>
                    <OutlineButton onClick={() => handleNavClick('Services')} style={{ padding: '14px 28px' }}>Our Practice Specialties</OutlineButton>
                  </div>
                </div>
              </div>
            </section>

            {/* Credibility Bar */}
           <section
  style={{
    padding: '20px 0',
    borderBottom: `1px solid ${t.border}`,
    background: t.bgAlt,
    overflow: 'hidden',
    position: 'relative',
  }}
>
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      animation: 'scrollStrip 20s linear infinite',
    }}
  >
    {[...Array(2)].flatMap(() => [
      { label: 'Jurisdictions', value: 'Supreme & High Court WA' },
      { label: 'Legal Precision', value: 'Tactical Military Rigour' },
      { label: 'Accreditation', value: 'Veteran-Owned Business' },
      { label: 'Fee Assurance', value: 'Transparent Fixed Pricing' },
    ]).map((item, i) => (
      <div
        key={i}
        style={{
          minWidth: 280,
          padding: '0 30px',
          textAlign: 'center',
          borderRight: `1px solid ${t.border}`,
        }}
      >
        <p
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#D43444',
            fontWeight: 900,
            marginBottom: 4,
          }}
        >
          {item.label}
        </p>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: t.text,
          }}
        >
          {item.value}
        </p>
      </div>
    ))}
  </div>

  <style>{`
    @keyframes scrollStrip {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `}</style>
</section>

            {/* Intro
            <section style={{ padding: '64px 0' }}>
              <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
                <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase', fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1', padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 20 }}>
                  Perth's Estate Authority
                </span>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 20, color: t.text }}>
                  Clear, pragmatic answers for asset preservation.
                </h2>
                <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: t.textMuted, marginBottom: 24 }}>
                  Crabtree Legal is built around straightforward, professional guidance. Founded by a former Australian Defence Force Legal Officer, we replace confusion and opaque billing with clear, custom-built estates and corporate succession planning deeds.
                </p>
                <TextLinkButton onClick={() => handleNavClick('About')}>Learn About the Director <ChevronRight size={12} /></TextLinkButton>
              </div>
            </section> */}

            {/* Services Grid */}
            <section style={{ padding: '64px 0', background: t.bgAlt, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
              <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 700, color: t.text, marginBottom: 8 }}>Specialized Areas of Focus</h3>
                  <p style={{ fontSize: 14, fontWeight: 300, color: t.textMuted }}>Clean, highly protective structures designed for Western Australian compliance.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                  {SERVICES_DATA.map(svc => <ServiceCard key={svc.id} svc={svc} t={t} handleNavClick={handleNavClick} />)}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: '80px 0' }}>
              <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <span style={{ fontSize: 11, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase', fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1', padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>Frequently Asked Questions</span>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: t.text }}>Professional Estate Insights</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {FAQS.map((faq, idx) => <FaqItem key={idx} faq={faq} idx={idx} t={t} />)}
                </div>
              </div>
            </section>

            {/* Contact Us (Home) */}
            <section style={{ padding: '0 0 80px', background: t.bg }}>
              <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase', fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>Get In Touch</span>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: t.text, marginBottom: 12 }}>Contact Us</h2>
                  <p style={{ fontSize: 13, fontWeight: 300, color: t.textMuted, maxWidth: 480, margin: '0 auto' }}>Reach out for a confidential case assessment. We respond within 4 business hours.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 40, alignItems: 'start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { label: 'Office Address', icon: <MapPin size={16} color="#D43444" style={{ flexShrink: 0 }} />, value: 'Level 25, 108 St Georges Terrace, Perth WA 6000' },
                      { label: 'Phone', icon: <Phone size={16} color="#D43444" style={{ flexShrink: 0 }} />, value: '(08) 6557 8939' },
                      { label: 'Email', icon: <Mail size={16} color="#D43444" style={{ flexShrink: 0 }} />, value: 'jonathan.crabtree@crabtreelegal.com.au' },
                    ].map(item => (
                      <HomeContactInfoCard key={item.label} item={item} t={t} />
                    ))}
                    <div style={{ background: 'linear-gradient(135deg, #D43444 0%, #9b1c2a 100%)', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Award size={20} color="#fff" />
                      </div>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Fixed-Fee Assurance</p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 300, lineHeight: 1.5 }}>Transparent pricing — no hidden hourly charges on estate planning packages.</p>
                      </div>
                    </div>
                  </div>
                  <HomeContactForm t={t} isDark={isDark} handleNavClick={handleNavClick} />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ─── ABOUT ─── redesigned like Screenshot 1 */}
        {activeTab === 'About' && (
          <AboutSection t={t} isDark={isDark} handleNavClick={handleNavClick} />
        )}

        {/* ─── SERVICES ─── */}
        {activeTab === 'Services' && (
          <section style={{ padding: '120px 0 80px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
              <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
                <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase', fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1', padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>Practice Areas</span>
                <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: t.text, marginBottom: 12 }}>Our Specialties</h1>
                <p style={{ fontSize: 12, fontWeight: 300, color: t.textMuted, marginBottom: 24 }}>Practical advice and high-level legal drafting to achieve your personal and commercial objectives.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {['all', 'Succession & Estates', 'Commercial Law'].map(cat => (
                    <FilterButton key={cat} label={cat === 'all' ? 'All Specialties' : cat} active={activeServiceTab === cat} onClick={() => setActiveServiceTab(cat)} t={t} />
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginBottom: 48 }}>
                {filteredServices.map(svc => <ServiceCard key={svc.id} svc={svc} t={t} handleNavClick={handleNavClick} />)}
              </div>
              <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, padding: 32, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                <div>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 8 }}>Require Custom Estate or Corporate Deeds?</h3>
                  <p style={{ fontSize: 12, fontWeight: 300, color: t.textMuted, maxWidth: 500 }}>We draft airtight, bespoke documents tailored strictly for the Supreme Court of Western Australia.</p>
                </div>
                <PrimaryButton onClick={() => handleNavClick('Contact')}>Request Briefing</PrimaryButton>
              </div>
            </div>
          </section>
        )}

        {/* ─── NEWS & ARTICLES ─── */}
        {activeTab === 'News & Articles' && (
          <section style={{ padding: '120px 0 80px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
              {!selectedArticle ? (
                <>
                  <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
                    <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase', fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1', padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>Knowledge Hub</span>
                    <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: t.text, marginBottom: 12 }}>News &amp; Articles</h1>
                    <p style={{ fontSize: 12, fontWeight: 300, color: t.textMuted, marginBottom: 24 }}>Articles and commentary designed to help elevate your strategic legal IQ.</p>
                    <input type="text" placeholder="Search articles, case reviews..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ ...inputStyle, borderRadius: 999, textAlign: 'center', maxWidth: 420, display: 'block', margin: '0 auto' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                    {filteredArticles.length > 0
                      ? filteredArticles.map(art => <ArticleCard key={art.id} art={art} t={t} onSelect={setSelectedArticle} />)
                      : <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 0', color: '#9CA3AF' }}>No articles match your search.</div>
                    }
                  </div>
                </>
              ) : (
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                  <button onClick={() => setSelectedArticle(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D43444', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 32 }}>
                    <ChevronLeft size={15} /> Back to All Articles
                  </button>
                  <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#D43444' }}>{selectedArticle.category}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF' }}>{selectedArticle.date}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, lineHeight: 1.3, color: t.text, marginBottom: 12 }}>{selectedArticle.title}</h2>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', marginBottom: 24 }}>Written by {selectedArticle.author}</p>
                  <div style={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: '24px 0', marginBottom: 24 }}>
                    <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.9, color: t.textMuted, whiteSpace: 'pre-line' }}>{selectedArticle.content}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={() => setSelectedArticle(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#9CA3AF' }}>Close Article</button>
                    <PrimaryButton onClick={() => handleNavClick('Contact')}>Consult On This Case</PrimaryButton>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ─── CONTACT ─── */}
        {activeTab === 'Contact' && (
          <section style={{ padding: '120px 0 80px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
              <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
                <span style={{ fontSize: 12, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase', fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1', padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>Secure Intake</span>
                <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: t.text, marginBottom: 12 }}>Connect With Our Team</h1>
                <p style={{ fontSize: 14, fontWeight: 300, color: t.textMuted }}>Initiate case verification. Conflicts clearance is handled rapidly within 4 business hours.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48, alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 12 }}>Headquarters</h3>
                    <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: t.textMuted }}>Located centrally on St Georges Terrace in Perth CBD, we advise executors and private families across Western Australia.</p>
                  </div>
                  {[
                    { label: 'Office Address', icon: <MapPin size={15} color="#D43444" style={{ flexShrink: 0, marginTop: 2 }} />, value: 'Level 25, 108 St Georges Terrace, Perth WA 6000' },
                    { label: 'Phone', icon: <Phone size={15} color="#D43444" style={{ flexShrink: 0 }} />, value: '(08) 6557 8939' },
                    { label: 'Official Email', icon: <Mail size={15} color="#D43444" style={{ flexShrink: 0 }} />, value: 'jonathan.crabtree@crabtreelegal.com.au' },
                  ].map(item => (
                    <div key={item.label} style={{ background: t.cardBg, border: `1px solid ${t.border}`, padding: 20, borderRadius: 12 }}>
                      <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9CA3AF', fontWeight: 700, marginBottom: 8 }}>{item.label}</p>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: t.textMuted, fontWeight: 300 }}>
                        {item.icon}{item.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, padding: 32 }}>
                  {!contactSubmitted ? (
                    <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {(['firstName', 'lastName']).map(field => (
                          <div key={field}>
                            <label style={labelStyle}>{field === 'firstName' ? 'First Name' : 'Last Name'}</label>
                            <input type="text" required value={contactForm[field]} onChange={e => setContactForm({ ...contactForm, [field]: e.target.value })} style={inputStyle} />
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <label style={labelStyle}>Email</label>
                          <input type="email" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Phone</label>
                          <input type="tel" required value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} style={inputStyle} />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Brief Description of Needs</label>
                        <textarea rows={4} required value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} placeholder="Note key details regarding succession deeds, Wills, or Probate needs..." style={inputStyle} />
                      </div>
                      <PrimaryButton style={{ width: '100%', padding: '14px 0' }}>Transmit Case Inquiry</PrimaryButton>
                    </form>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '48px 0' }}>
                      <div style={{ width: 44, height: 44, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Check size={22} color="#16A34A" />
                      </div>
                      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 8 }}>Transmission Captured</h3>
                      <p style={{ fontSize: 12, color: '#9CA3AF', maxWidth: 320, margin: '0 auto', fontWeight: 300, lineHeight: 1.7 }}>Details logged. Jonathan Crabtree will complete conflicts verification and respond within 4 business hours.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ background: '#0F0F0F', color: '#fff',     padding: '100px 0 150px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr 4fr', gap: 32, paddingBottom: 48, borderBottom: '1px solid #1a1a1a' }}>
            <div>
              <div onClick={() => handleNavClick('Home')} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 16 }}>
                <img src={LOGO_URL} alt="Crabtree Legal" style={{ width: 36, height: 36, objectFit: 'contain', filter: 'brightness(1.1)' }} />
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 800, letterSpacing: '0.2em', color: '#fff' }}>CRABTREE <span style={{ color: '#D43444' }}>LEGAL</span></span>
              </div>
              <p style={{ fontSize: 16, color: '#9CA3AF', lineHeight: 1.7, fontWeight: 300, maxWidth: 340, marginBottom: 16 }}>Helping families, executors, retirees, and business owners protect what matters most through precise, strategic legal advice.</p>
              <p style={{ fontSize: 14, color: '#6B7280', fontWeight: 300 }}>&copy; {new Date().getFullYear()} Crabtree Legal Pty Ltd. All Rights Reserved.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 900, color: '#D1D5DB', marginBottom: 16 }}>Navigation Map</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {NAV_ITEMS.map(item => (
                  <li key={item}><FooterNavLink label={item} onClick={() => handleNavClick(item)} /></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 900, color: '#D1D5DB', marginBottom: 16 }}>WA Regulations</h4>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 12 }}>Liability limited by a scheme approved under Professional Standards Legislation. Legal practitioners of Crabtree Legal are governed by the Legal Practice Board of Western Australia.</p>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>We acknowledge the Whadjuk Noongar people, traditional custodians of the land on which our Perth CBD chambers are established.</p>
            </div>
          </div>
          <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 14, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>Designed for absolute precision, stability and uncompromised security.</p>
            <div style={{ display: 'flex', gap: 16, fontSize: 14, color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <FooterNavLink label="Privacy Charter" onClick={() => {}} small />
              <span>•</span>
              <FooterNavLink label="Client Terms" onClick={() => {}} small />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Helper Sub-components ────────────────────────────────────────────────────
function ThemeToggle({ isDark, setIsDark, scrolled, t }) {
  const [hov, hovProps] = useHover();
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      {...hovProps}
      style={{
        width: 34, height: 34, borderRadius: '50%', border: `1px solid ${scrolled ? t.border : 'rgba(255,255,255,0.25)'}`,
        background: hov ? (scrolled ? (t.isDark ? '#2a2a2a' : '#f3f4f6') : 'rgba(255,255,255,0.15)') : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s',
      }}
    >
      {isDark ? <Sun size={14} color="#FBBF24" /> : <Moon size={14} color="#6B7280" />}
    </button>
  );
}

function FilterButton({ label, active, onClick, t }) {
  const [hov, hovProps] = useHover();
  return (
    <button onClick={onClick} {...hovProps} style={{ padding: '8px 16px', borderRadius: 999, fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', background: active ? '#D43444' : (hov ? (t.isDark ? '#2a2a2a' : '#f3f4f6') : t.cardBg), color: active ? '#fff' : t.text, border: `1px solid ${active ? '#D43444' : t.border}`, transition: 'all 0.2s' }}>
      {label}
    </button>
  );
}

function TextLinkButton({ children, onClick }) {
  const [hov, hovProps] = useHover();
  return (
    <button onClick={onClick} {...hovProps} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D43444', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: hov ? 'underline' : 'none', display: 'inline-flex', alignItems: 'center', gap: 4, padding: 0 }}>
      {children}
    </button>
  );
}

function FooterNavLink({ label, onClick, small }) {
  const [hov, hovProps] = useHover();
  return (
    <button onClick={onClick} {...hovProps} style={{ background: 'none', border: 'none', cursor: 'pointer', color: hov ? '#D43444' : '#9CA3AF', fontSize: small ? 11 : 14, fontWeight: small ? 700 : 400, transition: 'color 0.2s', padding: 0, textTransform: small ? 'uppercase' : 'none', letterSpacing: small ? '0.1em' : 'normal' }}>
      {label}
    </button>
  );
}