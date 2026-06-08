import React, { useState, useEffect, useRef } from 'react';
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
  { title: 'A law firm that proud to serve', subtitle: 'Trusted legal guidance for wills, estate planning, probate and business succession throughout Perth.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600',accent:'' },
  { title: 'Evolving For Your Future', subtitle: 'Securing multi-generational corporate succession pipelines and family assets with tactical precision.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',accent:''  },
  { title: 'Preserving Family Legacies', subtitle: 'Bespoke Discretionary and Testamentary Trusts mapped to shield your wealth from modern challenges.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600', accent:'' },
];

const SERVICES_DATA = [
  {
    id: 'Commercial Law',
    category: 'Succession & Estates',
    title: 'Wills, Estates & Succession',
    subtitle: 'Structured solutions to protect and transfer your lifetime wealth cleanly.',
    // Premium, mood-lit legal/wealth transition imagery
    image: 'https://www.shutterstock.com/image-photo/portrait-happy-caucasian-couple-sitting-260nw-2326671849.jpg',
    hoverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000',
    points: ['Simple & Complex Wills', 'Wills incorporating Testamentary Trusts', 'Enduring Powers of Attorney (EPA)', 'Enduring Powers of Guardianship (EPG)', 'Dealing with Superannuation & Trust routing', 'Strategic Loan Agreements'],
  },
  {
    id: 'Wills, Estate and Succession Planning',
    category: 'Commercial Law',
    title: 'Commercial & Business Structuring',
    subtitle: 'Providing legal and corporate drafting for robust business operations.',
    // Sleek, elite corporate skyscrapers/boardrooms
    image: 'data:image/jpeg;base64,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',
    hoverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
    points: ['Company Set Ups & Business Structuring', 'Shareholder & Director Agreements', 'Trust Creation & Deeds of Variation', 'Share Sale & Purchase Transactions', 'Reviewing & Drafting Commercial Contracts', 'Incorporated Association Transitions'],
  },
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

// ─── Theme ────────────────────────────────────────────────────────────────────
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

function useHover(): [boolean, React.HTMLAttributes<HTMLElement>] {
  const [hovered, setHovered] = useState(false);
  return [hovered, { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }];
}

type Theme = ReturnType<typeof getTheme>;

// ─── NavButton ────────────────────────────────────────────────────────────────
function NavButton({ item, activeTab, handleNavClick, scrolled, t }: { item: string; activeTab: string; handleNavClick: (tab: string) => void; scrolled: boolean; t: Theme }) {
  const [hov, hovProps] = useHover();
  const isActive = activeTab === item;
  return (
    <button onClick={() => handleNavClick(item)} {...hovProps} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontSize: 14, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: isActive ? '#D43444' : scrolled ? t.textMuted : '#D1D5DB', transition: 'color 0.2s', position: 'relative' }}>
      {item}
      <span style={{ position: 'absolute', bottom: -4, left: 0, height: 2, width: isActive || hov ? '100%' : 0, background: '#D43444', transition: 'width 0.3s ease', borderRadius: 2 }} />
    </button>
  );
}

// ─── PrimaryButton ────────────────────────────────────────────────────────────
function PrimaryButton({ children, onClick, style = {} }: { children: React.ReactNode; onClick: () => void; style?: React.CSSProperties }) {
  const [hov, hovProps] = useHover();
  return (
    <button onClick={onClick} {...hovProps} style={{ background: hov ? '#b02c38' : '#D43444', color: '#fff', border: 'none', cursor: 'pointer', padding: '12px 24px', borderRadius: 6, fontSize: 14, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'background 0.2s, transform 0.2s', transform: hov ? 'translateY(-2px)' : 'none', boxShadow: hov ? '0 8px 24px rgba(212,52,68,0.4)' : '0 2px 8px rgba(212,52,68,0.2)', ...style }}>
      {children}
    </button>
  );
}

// ─── OutlineButton ────────────────────────────────────────────────────────────
function OutlineButton({ children, onClick, style = {} }: { children: React.ReactNode; onClick: () => void; style?: React.CSSProperties }) {
  const [hov, hovProps] = useHover();
  return (
    <button onClick={onClick} {...hovProps} style={{ background: hov ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', padding: '12px 24px', borderRadius: 6, fontSize: 14, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'background 0.2s, transform 0.2s', transform: hov ? 'translateY(-2px)' : 'none', ...style }}>
      {children}
    </button>
  );
}

// ─── ServiceCard (enhanced) ───────────────────────────────────────────────────
function ServiceCard({ svc, t, handleNavClick }: { svc: (typeof SERVICES_DATA)[number]; t: Theme; handleNavClick: (tab: string) => void }) {
  const [hov, hovProps] = useHover();
  const [btnHov, btnHovProps] = useHover();
  
  return (
    <div 
      {...hovProps} 
      style={{ 
        background: t.cardBg, 
        border: `1px solid ${hov ? '#D43444' : t.border}`, 
        borderRadius: 28, // Softened corners for a more modern luxury aesthetic
        overflow: 'hidden', 
        boxShadow: hov 
          ? (t.isDark ? '0 40px 80px -12px rgba(0,0,0,0.9), 0 0 32px rgba(212,52,68,0.18)' : '0 40px 80px -12px rgba(212,52,68,0.26)')
          : '0 4px 20px rgba(0,0,0,0.03)', 
        transform: hov ? 'translateY(-12px) scale(1.008)' : 'none', 
        transition: 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)', 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* ── IMAGE WRAPPER (Height Increased to 320px for cinematic presence) ── */}
      <div style={{ height: 320, position: 'relative', overflow: 'hidden' }}>
        {/* Base Standard Image */}
        <img 
          src={svc.image} 
          alt={svc.title} 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)', 
            opacity: hov ? 0 : 1, 
            transform: hov ? 'scale(1.10)' : 'scale(1)' 
          }} 
        />
        
        {/* Hover Crossfade Alternate Image */}
        <img 
          src={svc.hoverImage} 
          alt={svc.title + ' hover'} 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)', 
            opacity: hov ? 1 : 0, 
            transform: hov ? 'scale(1.04)' : 'scale(0.95)' 
          }} 
        />

        {/* Cinematic Gradient Ambient Mask Overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: hov 
            ? 'linear-gradient(to bottom, rgba(212,52,68,0.06) 0%, rgba(0,0,0,0.72) 100%)' 
            : 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.50) 100%)', 
          transition: 'all 0.55s ease',
          zIndex: 2
        }} />

        {/* High-Contrast Dynamic Badge Tag */}
        <div style={{ 
          position: 'absolute', 
          top: 22, 
          left: 22, 
          zIndex: 3,
          background: hov ? '#D43444' : 'rgba(0,0,0,0.70)', 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
          padding: '7px 16px', 
          borderRadius: 30, 
          fontSize: 10.5, // Increased text readability
          fontWeight: 900, 
          letterSpacing: '0.14em', 
          textTransform: 'uppercase', 
          color: '#fff', 
          border: `1px solid ${hov ? '#D43444' : 'rgba(255,255,255,0.2)'}`, 
          transition: 'all 0.35s ease' 
        }}>
          {svc.category}
        </div>
      </div>

      {/* ── CARD MAIN BODY CONTENT ── */}
      <div style={{ padding: '36px 36px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Heading & Subtitle Container */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ 
            fontFamily: "'Cinzel', serif", 
            fontSize: 24, // Increased Font Size
            fontWeight: 800, 
            margin: '0 0 12px', 
            color: hov ? '#D43444' : t.text, 
            letterSpacing: '0.02em',
            transition: 'color 0.35s ease',
            lineHeight: 1.3
          }}>
            {svc.title}
          </h3>
          <p style={{ 
            fontSize: 16, // Increased Font Size
            fontWeight: 400, 
            lineHeight: 1.7, 
            color: t.textLight, 
            margin: 0 
          }}>
            {svc.subtitle}
          </p>
        </div>

        {/* Dynamic Expanding Line Divider */}
        <div style={{
          width: hov ? '100%' : '56px', // Wider default base marker
          height: '2px',
          background: '#D43444',
          marginBottom: 26,
          transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />

        {/* Practice Capabilities List Area */}
        <div style={{ 
          borderTop: `1px solid ${hov ? 'rgba(212,52,68,0.2)' : t.border}`, 
          paddingTop: 24, 
          transition: 'border-color 0.35s',
          flex: 1
        }}>
          {svc.points.map((pt, idx) => (
            <div 
              key={pt} 
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 14, 
                marginBottom: 14, // Extra spacing between list elements
                transform: hov ? 'translateX(8px)' : 'translateX(0)', 
                transition: `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.035}s` 
              }}
            >
              {/* Checkbox Bubble with dynamic state swap */}
              <div style={{ 
                width: 22, 
                height: 22, 
                borderRadius: '50%', 
                background: hov ? '#D43444' : (t.isDark ? 'rgba(212,52,68,0.14)' : '#FFF0F1'), 
                border: '1px solid #D43444', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0, 
                marginTop: 2,
                transition: 'all 0.3s ease',
                boxShadow: hov ? '0 3px 10px rgba(212,52,68,0.45)' : 'none'
              }}>
                <Check size={11} color={hov ? '#fff' : '#D43444'} strokeWidth={3.5} />
              </div>
              <span style={{ 
                fontSize: 15, // Increased text size from 13 to 15
                color: hov ? t.text : t.textLight, 
                fontWeight: hov ? 500 : 400,
                lineHeight: 1.5,
                transition: 'color 0.3s ease, font-weight 0.3s ease'
              }}>
                {pt}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CARD ACTION BUTTON FOOTER ── */}
      <div style={{ padding: '28px 36px 36px' }}>
        <button 
          {...btnHovProps} 
          onClick={() => handleNavClick('Contact')} 
          style={{ 
            width: '100%', 
            background: btnHov ? '#D43444' : (t.isDark ? 'rgba(212,52,68,0.14)' : '#FFF0F1'), 
            color: btnHov ? '#fff' : '#D43444', 
            border: `1px solid ${btnHov ? '#D43444' : 'rgba(212,52,68,0.25)'}`, 
            cursor: 'pointer', 
            padding: '15px 0', // Higher vertical pad for tactile importance
            borderRadius: 12, 
            fontSize: 13, // Scaled slightly higher
            fontWeight: 800, 
            letterSpacing: '0.10em', 
            textTransform: 'uppercase', 
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
            transform: btnHov ? 'translateY(-3px)' : 'none',
            boxShadow: btnHov 
              ? (t.isDark ? '0 12px 28px rgba(212,52,68,0.5)' : '0 12px 24px rgba(212,52,68,0.28)') 
              : 'none'
          }}
        >
          Enquire About This Specialty →
        </button>
      </div>
    </div>
  );
}
// ─── ArticleCard ──────────────────────────────────────────────────────────────
function ArticleCard({ art, t, onSelect }: { art: (typeof ARTICLES_DATA)[number]; t: Theme; onSelect: (art: (typeof ARTICLES_DATA)[number]) => void }) {
  const [hov, hovProps] = useHover();
  return (
    <div {...hovProps} style={{ background: t.cardBg, border: `1px solid ${hov ? '#D43444' : t.border}`, borderRadius: 16, padding: 28, boxShadow: hov ? '0 25px 60px -15px rgba(212,52,68,0.15)' : '0 2px 8px rgba(0,0,0,0.06)', transform: hov ? 'translateY(-6px)' : 'none', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em' }}>{art.date}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#D43444', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{art.category}</span>
        </div>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 800, lineHeight: 1.4, color: t.text, margin: '0 0 12px' }}>{art.title}</h3>
        <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: t.textLight, margin: 0 }}>{art.summary}</p>
      </div>
      <div style={{ borderTop: `1px solid ${t.border}`, marginTop: 22, paddingTop: 18 }}>
        <button onClick={() => onSelect(art)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D43444', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
          Read Full Analysis <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

// ─── FaqItem (auto-open on hover, bigger font) ────────────────────────────────
function FaqItem({ faq, t }: { faq: (typeof FAQS)[number]; idx: number; t: Theme }) {
  const [open, setOpen] = useState(false);
  const [hov, hovProps] = useHover();
  
  // auto-open on hover behavior
  const handleMouseEnter = () => { setOpen(true); };
  const handleMouseLeave = () => { setOpen(false); };

  return (
    <div
      {...hovProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        background: t.cardBg, 
        border: `1px solid ${open || hov ? '#D43444' : t.border}`, 
        borderRadius: 16, 
        overflow: 'hidden', 
        position: 'relative',
        boxShadow: open 
          ? (t.isDark ? '0 20px 40px -10px rgba(0,0,0,0.7), 0 0 15px rgba(212,52,68,0.1)' : '0 20px 40px -10px rgba(212,52,68,0.14)')
          : hov 
            ? '0 10px 20px rgba(0,0,0,0.05)' 
            : '0 4px 12px rgba(0,0,0,0.02)', 
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
        transform: open ? 'translateY(-4px)' : hov ? 'translateY(-2px)' : 'none'
      }}
    >
      {/* Premium Left Border Accent Indicator */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        background: '#D43444',
        opacity: open || hov ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }} />

      {/* Accordion Trigger Header */}
      <div 
        onClick={() => setOpen(!open)} 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '26px 32px', 
          cursor: 'pointer' 
        }}
      >
        <span style={{ 
          fontFamily: "'Cinzel', serif", 
          fontSize: 19, // Increased font size
          fontWeight: 800, 
          color: open ? '#D43444' : t.text, 
          paddingRight: 24, 
          lineHeight: 1.45, 
          transition: 'color 0.3s ease',
          letterSpacing: '0.01em'
        }}>
          {faq.question}
        </span>
        
        {/* Dynamic Circular Icon Wrapper */}
        <div style={{ 
          width: 38, // Increased for a more balanced aesthetic
          height: 38, 
          borderRadius: '50%', 
          background: open ? '#D43444' : (t.isDark ? 'rgba(212,52,68,0.15)' : '#FFF0F1'), 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexShrink: 0, 
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: open ? 'scale(1.05)' : 'none',
          boxShadow: open ? '0 4px 12px rgba(212,52,68,0.35)' : 'none'
        }}>
          <ChevronDown 
            size={18} 
            color={open ? '#fff' : '#D43444'} 
            style={{ 
              transform: open ? 'rotate(180deg)' : 'none', 
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
            }} 
          />
        </div>
      </div>

      {/* Accordion Content Panel */}
      <div style={{ 
        maxHeight: open ? 400 : 0, // Increased maxHeight safely for larger text sizes
        overflow: 'hidden', 
        transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
      }}>
        <div style={{ 
          borderTop: `1px solid ${t.border}`, 
          padding: '22px 32px 28px',
          background: t.isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'
        }}>
          <p style={{ 
            fontSize: 16, // Increased answer body font size
            fontWeight: 400, 
            lineHeight: 1.85, 
            color: t.textMuted, 
            margin: 0,
            transition: 'color 0.3s ease'
          }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── HomeContactInfoCard ──────────────────────────────────────────────────────
// NOTE: Kept for future use; not currently rendered on Home.
// const HomeContactInfoCard = ({ item, t }: { item: { label: string; value: string; icon: React.ReactElement<{ color?: string }> | React.ReactElement }; t: Theme }) => {

//   void item;
//   void t;

//   const [hov, hovProps] = useHover();
//   return (
//     <div {...hovProps} style={{ background: t.cardBg, border: `1px solid ${hov ? '#D43444' : t.border}`, borderRadius: 14, padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 16, boxShadow: hov ? '0 10px 32px rgba(212,52,68,0.14)' : '0 2px 8px rgba(0,0,0,0.05)', transform: hov ? 'translateY(-3px)' : 'none', transition: 'all 0.28s ease', cursor: 'default' }}>
//       <div style={{ width: 42, height: 42, background: hov ? '#D43444' : (t.isDark ? 'rgba(212,52,68,0.12)' : '#FFF0F1'), borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.28s' }}>
// {React.cloneElement(item.icon as React.ReactElement<any>, { color: hov ? '#fff' : '#D43444' })}
//       </div>
//       <div>
//         <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9CA3AF', marginBottom: 5 }}>{item.label}</p>
//         <p style={{ fontSize: 14, fontWeight: 400, color: t.text, lineHeight: 1.6 }}>{item.value}</p>
//       </div>
//     </div>
//   );
// }

// ─── HomeContactForm ──────────────────────────────────────────────────────────
function HomeContactForm({ t, isDark, handleNavClick }: { t: Theme; isDark: boolean; handleNavClick: (tab: string) => void }) {
  void handleNavClick;
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setSubmitted(true); setTimeout(() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' }); }, 5000); };
  const inputStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', background: t.inputBg, color: t.text, border: `1px solid ${t.border}`, borderRadius: 8, padding: '12px 14px', fontSize: 15, outline: 'none', transition: 'border-color 0.2s', fontFamily: "'Plus Jakarta Sans', sans-serif" };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 };
  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 20, padding: '36px', boxShadow: isDark ? '0 8px 40px rgba(0,0,0,0.3)' : '0 8px 40px rgba(0,0,0,0.08)' }}>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {(['firstName', 'lastName'] as const).map(field => (
              <div key={field}>
                <label style={labelStyle}>{field === 'firstName' ? 'First Name' : 'Last Name'}</label>
                <input type="text" required value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} style={inputStyle} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label style={labelStyle}>Email Address</label><input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} /></div>
            <div><label style={labelStyle}>Phone Number</label><input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} /></div>
          </div>
          <div>
            <label style={labelStyle}>How Can We Help?</label>
            <textarea rows={4} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Briefly describe your legal matter — Wills, Probate, Business Succession..." style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <PrimaryButton onClick={() => {}} style={{ flex: 1, padding: '13px 0', minWidth: 160 }}>Send Enquiry</PrimaryButton>
          </div>
          <p style={{ fontSize: 11, color: t.textLight, textAlign: 'center', fontWeight: 300 }}>Your enquiry is strictly confidential. Conflicts clearance within 4 business hours.</p>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <div style={{ width: 52, height: 52, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Check size={26} color="#16A34A" /></div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 10 }}>Message Received</h3>
          <p style={{ fontSize: 12, color: '#9CA3AF', maxWidth: 340, margin: '0 auto', fontWeight: 300, lineHeight: 1.7 }}>Thank you! Jonathan Crabtree will review your enquiry and respond within 4 business hours.</p>
        </div>
      )}
    </div>
  );
}

// ─── About Section (animated, hover popup on image) ──────────────────────────
function AboutSection({ t, isDark, handleNavClick }: { t: Theme; isDark: boolean; handleNavClick: (tab: string) => void }) {
  const [imgHov, setImgHov] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { 
      if (entry.isIntersecting) setVisible(true); 
    }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      style={{ 
        padding: '120px 0 100px', 
        background: t.bg, 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Decorative background flare */}
      <div style={{ 
        position: 'absolute', 
        top: '30%', 
        left: '5%', 
        width: 350, 
        height: 350, 
        borderRadius: '50%', 
        background: 'radial-gradient(circle, rgba(212,52,68,0.04) 0%, transparent 70%)', 
        pointerEvents: 'none' 
      }} />

      {/* ── SECTION HEADER ── */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: 80, 
        padding: '0 32px', 
        opacity: visible ? 1 : 0, 
        transform: visible ? 'translateY(0)' : 'translateY(30px)', 
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
      }}>
        {/* <span style={{ 
          fontSize: 11, 
          letterSpacing: '0.15em', 
          color: '#D43444', 
          textTransform: 'uppercase', 
          fontWeight: 900, 
          background: isDark ? 'rgba(212,52,68,0.12)' : '#FFF0F1', 
          padding: '6px 18px', 
          borderRadius: 999, 
          display: 'inline-block', 
          marginBottom: 18 
        }}>
          Meet Our Experienced Director
        </span> */}
        <h2 style={{ 
          fontFamily: "'Cinzel', serif", 
          fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', 
          fontWeight: 800, 
          color: t.text,
          letterSpacing: '0.01em'
        }}>
          The Vision Behind Crabtree Legal
        </h2>
      </div>

      {/* ── WRAPPER CONTAINER (Centered Content Grid) ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', 
          gap: 64, 
          alignItems: 'center'
        }}>
          
          {/* LEFT COLUMN: Photo Frame with Floating Image UI Badges */}
          <div
            style={{ 
              position: 'relative', 
              padding: '40px 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: visible ? 1 : 0, 
              transform: visible ? 'translateX(0)' : 'translateX(-60px)', 
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
            }}
            onMouseEnter={() => setImgHov(true)}
            onMouseLeave={() => setImgHov(false)}
          >
            {/* Main Rounded Image Frame Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: 420,
              height: 520,
              borderRadius: 24,
              boxShadow: imgHov 
                ? (isDark ? '0 45px 90px rgba(0,0,0,0.85)' : '0 45px 90px rgba(0,0,0,0.15)')
                : (isDark ? '0 25px 55px rgba(0,0,0,0.6)' : '0 25px 55px rgba(0,0,0,0.07)'),
              overflow: 'visible', 
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: imgHov ? 'translateY(-6px)' : 'none'
            }}>
              {/* Inner clipped wrapper for image zooming */}
              <div style={{ width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={OWNER_PHOTO_URL}
                  alt="Jonathan Crabtree"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: 'top center', 
                    display: 'block', 
                    opacity: isDark ? 0.88 : 1,
                    transform: imgHov ? 'scale(1.05)' : 'scale(1)', 
                    transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }}
                />
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* FLOATING ACCENT 1: Top-Left Experience Badge (Changed to Red & Increased Font Size) */}
              <div style={{ 
                position: 'absolute', 
                top: 24, 
                left: -32, 
                background: 'linear-gradient(135deg, #D43444, #6B1220)', 
                borderRadius: 16, 
                padding: '22px 24px', 
                textAlign: 'center', 
                boxShadow: '0 12px 32px rgba(212,52,68,0.35)', 
                zIndex: 3, 
                transform: imgHov ? 'translateY(-4px) scale(1.04)' : 'none', 
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                width: 125
              }}>
                <div style={{ fontSize: 38, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 6 }}>14+</div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', lineHeight: 1.4 }}>Years Experience</div>
              </div>

              {/* FLOATING ACCENT 2: Bottom-Right Practitioner Bar (Changed to Red & Increased Font Size) */}
              <div style={{ 
                position: 'absolute', 
                bottom: 24, 
                right: -24, 
                background: 'linear-gradient(135deg, #D43444, #6B1220)', 
                padding: '18px 32px', 
                borderRadius: 14,
                boxShadow: '0 12px 32px rgba(212,52,68,0.3)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 12,
                zIndex: 3,
                transform: imgHov ? 'translateX(6px)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                <Award size={20} color="#fff" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 14.5, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' }}>
                  Supreme &amp; High Court WA
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Content Space */}
          <div style={{ 
            padding: '10px 0', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            opacity: visible ? 1 : 0, 
            transform: visible ? 'translateX(0)' : 'translateX(60px)', 
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
              <div style={{ 
                width: 64, 
                height: 64, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #D43444 0%, #6B1220 100%)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0, 
                boxShadow: '0 10px 28px rgba(212,52,68,0.25)' 
              }}>
                <Briefcase size={28} color="#fff" />
              </div>
              <div>
                <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 32, fontWeight: 900, color: t.text, lineHeight: 1.1, marginBottom: 6 }}>
                  Jonathan Crabtree
                </h1>
                <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D43444', margin: 0 }}>
                  Commercial &amp; Estate Planning Lawyer
                </p>
              </div>
            </div>

            <p style={{ 
              fontSize: 17, 
              fontWeight: 400, 
              lineHeight: 1.85, 
              color: t.textMuted, 
              marginBottom: 36, 
              borderLeft: '4px solid #D43444', 
              paddingLeft: 22 
            }}>
              With over 14 years of specialized experience in commercial law and estate planning, Jonathan leads Crabtree Legal with military precision and strategic acumen. His expertise in succession planning and complex trust structures ensures absolute protection for Western Australian families.
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '16px 24px', 
              marginBottom: 40 
            }}>
              {['Wills & Testamentary Trusts', 'Probate & Administration', 'Fixed Transparent Fees', 'Business Succession Deeds'].map((feat, i) => (
                <div 
                  key={feat} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 14, 
                    opacity: visible ? 1 : 0, 
                    transform: visible ? 'translateY(0)' : 'translateY(16px)', 
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.08}s` 
                  }}
                >
                  <div style={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    background: isDark ? 'rgba(212,52,68,0.14)' : '#FFF0F1', 
                    border: '1.5px solid #D43444', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexShrink: 0 
                  }}>
                    <Check size={12} color="#D43444" strokeWidth={3.5} />
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 500, color: t.text }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ 
              background: isDark ? 'rgba(212,52,68,0.05)' : '#FFF6F6', 
              border: `1px solid ${isDark ? 'rgba(212,52,68,0.15)' : '#FEE2E2'}`, 
              borderRadius: 16, 
              padding: '20px 24px', 
              marginBottom: 44, 
              opacity: visible ? 1 : 0, 
              transition: 'all 0.6s ease 0.85s' 
            }}>
              <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#D43444', marginBottom: 12, marginTop: 0 }}>
                Admitted Practitioner Framework
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Supreme Court of Western Australia (Admitted March 2012)', 
                  'High Court of Australia (Admitted March 2012)', 
                  'Veteran-Owned Business (AVOB) Sponsor'
                ].map(r => (
                  <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D43444', flexShrink: 0 }} />
                    <span style={{ fontSize: 14.5, color: t.textMuted, fontWeight: 400 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div 
              style={{ opacity: visible ? 1 : 0, transition: 'all 0.5s ease 1s' }}
              onMouseEnter={() => setBtnHov(true)}
              onMouseLeave={() => setBtnHov(false)}
            >
              <PrimaryButton 
                onClick={() => handleNavClick('Contact')} 
                style={{ 
                  padding: '16px 40px', 
                  fontSize: 15,
                  fontWeight: 800,
                  borderRadius: 12,
                  boxShadow: btnHov ? '0 10px 24px rgba(212,52,68,0.35)' : 'none',
                  transform: btnHov ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                Book Free Consultation »
              </PrimaryButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
// ─── ThemeToggle ──────────────────────────────────────────────────────────────
function ThemeToggle({ isDark, setIsDark, scrolled, t }: { isDark: boolean; setIsDark: React.Dispatch<React.SetStateAction<boolean>>; scrolled: boolean; t: Theme }) {
  const [hov, hovProps] = useHover();
  return (
    <button onClick={() => setIsDark(!isDark)} {...hovProps} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${scrolled ? t.border : 'rgba(255,255,255,0.28)'}`, background: hov ? (scrolled ? (t.isDark ? '#2a2a2a' : '#f3f4f6') : 'rgba(255,255,255,0.18)') : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.25s', transform: hov ? 'rotate(20deg) scale(1.1)' : 'none' }}>
      {isDark ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} color={scrolled ? '#6B7280' : '#D1D5DB'} />}
    </button>
  );
}

// ─── FilterButton ─────────────────────────────────────────────────────────────
function FilterButton({ label, active, onClick, t }: { label: string; active: boolean; onClick: () => void; t: Theme }) {
  const [hov, hovProps] = useHover();
  return (
    <button onClick={onClick} {...hovProps} style={{ padding: '8px 18px', borderRadius: 999, fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', background: active ? '#D43444' : (hov ? (t.isDark ? '#2a2a2a' : '#f3f4f6') : t.cardBg), color: active ? '#fff' : t.text, border: `1px solid ${active ? '#D43444' : t.border}`, transition: 'all 0.2s' }}>
      {label}
    </button>
  );
}

// ─── FooterNavLink ────────────────────────────────────────────────────────────
function FooterNavLink({ label, onClick, small, style }: { label: string; onClick: () => void; small?: boolean; style?: React.CSSProperties }) {

  const [hov, hovProps] = useHover();
return (
    <button
      onClick={onClick}
      {...hovProps}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: hov ? '#D43444' : '#9CA3AF',
        fontSize: small ? 11 : 14,
        fontWeight: small ? 700 : 400,
        transition: 'color 0.2s',
        padding: 0,
        textTransform: small ? 'uppercase' : 'none',
        letterSpacing: small ? '0.1em' : 'normal',
        ...(style ?? {}),
      }}
    >
      {label}
    </button>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
type Article = (typeof ARTICLES_DATA)[number];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeServiceTab, setActiveServiceTab] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [phoneShake, setPhoneShake] = useState(false);

  const t = getTheme(isDark);

  // Phone icon shake every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setPhoneShake(true);
      setTimeout(() => setPhoneShake(false), 600);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((p) => (p + 1) % CAROUSEL_SLIDES.length), 8500);
    return () => clearInterval(id);
  }, []);

  const handleNavClick = (tab: string) => { setActiveTab(tab); setSelectedArticle(null); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setContactSubmitted(true); setTimeout(() => { setContactSubmitted(false); setContactForm({ firstName: '', lastName: '', email: '', phone: '', message: '' }); }, 5000); };

  const filteredServices = activeServiceTab === 'all' ? SERVICES_DATA : SERVICES_DATA.filter(s => s.category === activeServiceTab);
  const filteredArticles = ARTICLES_DATA.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.summary.toLowerCase().includes(searchTerm.toLowerCase()) || a.category.toLowerCase().includes(searchTerm.toLowerCase()));

  const inputStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box' as any, background: t.inputBg, color: t.text, border: `1px solid ${t.border}`, borderRadius: 6, padding: '10px 12px', fontSize: 14, outline: 'none', transition: 'border-color 0.2s', fontFamily: "'Plus Jakarta Sans', sans-serif" };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 8, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'background 0.4s, color 0.4s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #D43444; color: #fff; }
        body { overflow-x: hidden; }
        input:focus, textarea:focus { border-color: #D43444 !important; }
        textarea { resize: vertical; }

        @keyframes phoneShake {
          0%   { transform: rotate(0deg); }
          15%  { transform: rotate(-18deg); }
          30%  { transform: rotate(18deg); }
          45%  { transform: rotate(-14deg); }
          60%  { transform: rotate(14deg); }
          75%  { transform: rotate(-8deg); }
          90%  { transform: rotate(8deg); }
          100% { transform: rotate(0deg); }
        }
        .phone-shake { animation: phoneShake 0.6s ease; }

        @keyframes scrollStrip {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes footerGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* ══════════════════ HEADER ══════════════════ */}
     <header
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    background: scrolled ? t.navBg : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` : '1px solid transparent',
    boxShadow: scrolled 
      ? isDark 
        ? '0 10px 30px -10px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)' 
        : '0 10px 30px -10px rgba(0,0,0,0.08)'
      : 'none',
    padding: scrolled ? '12px 0' : '24px 0',
  }}
>
  <div
    style={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    {/* Logo Container with Hover Scaling */}
    <div
      onClick={() => handleNavClick('Home')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        src={LOGO_URL}
        alt="Crabtree Legal"
        style={{
          width: scrolled ? 54 : 64,
          height: scrolled ? 54 : 64,
          objectFit: 'contain',
          transition: 'all 0.3s ease',
          filter: isDark ? 'drop-shadow(0 2px 8px rgba(255,255,255,0.1))' : 'none'
        }}
      />
    </div>

    {/* Main Navigation Links */}
    <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
      {NAV_ITEMS.map((item) => (
        <NavButton
          key={item}
          item={item}
          activeTab={activeTab}
          handleNavClick={handleNavClick}
          scrolled={scrolled}
          t={t}
        />
      ))}
    </nav>

    {/* Action Buttons Group */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <ThemeToggle isDark={isDark} setIsDark={setIsDark} scrolled={scrolled} t={t} />

      {/* Call Button (Outlined Accent / Translucent Style) */}
      <a
        href="tel:0865578939"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: isDark ? 'rgba(212, 52, 68, 0.15)' : 'rgba(212, 52, 68, 0.08)',
          border: `1px solid ${isDark ? 'rgba(212, 52, 68, 0.4)' : 'rgba(212, 52, 68, 0.25)'}`,
          color: '#D43444',
          padding: '10px 20px',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.03em',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          target.style.background = '#D43444';
          target.style.color = '#fff';
          target.style.transform = 'translateY(-2px)';
          target.style.boxShadow = isDark ? '0 8px 24px rgba(212,52,68,0.4)' : '0 8px 20px rgba(212,52,68,0.25)';
          const icon = target.querySelector('svg');
          if (icon) icon.setAttribute('stroke', '#fff'); // Switch SVG color to white dynamically
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.background = isDark ? 'rgba(212, 52, 68, 0.15)' : 'rgba(212, 52, 68, 0.08)';
          target.style.color = '#D43444';
          target.style.transform = 'none';
          target.style.boxShadow = 'none';
          const icon = target.querySelector('svg');
          if (icon) icon.setAttribute('stroke', '#D43444');
        }}
      >
        <span className={phoneShake ? 'phone-shake' : ''} style={{ display: 'inline-flex' }}>
          <Phone size={15} color="#D43444" style={{ transition: 'stroke 0.3s' }} />
        </span>
        Call: (08) 6557 8939
      </a>

      {/* Solid Primary 'Get in Touch' Button */}
      <button
        onClick={() => handleNavClick('Contact')}
        style={{
          background: '#D43444',
          color: '#fff',
          border: 'none',
          padding: '11px 22px',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isDark ? '0 4px 14px rgba(212,52,68,0.4)' : '0 4px 14px rgba(212,52,68,0.2)',
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          target.style.background = '#e04353'; // Lighter crimson highlight
          target.style.transform = 'translateY(-2px) scale(1.02)';
          target.style.boxShadow = isDark ? '0 12px 28px rgba(212,52,68,0.55)' : '0 12px 24px rgba(212,52,68,0.35)';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.background = '#D43444';
          target.style.transform = 'none';
          target.style.boxShadow = isDark ? '0 4px 14px rgba(212,52,68,0.4)' : '0 4px 14px rgba(212,52,68,0.2)';
        }}
      >
        Get in Touch
      </button>
    </div>
  </div>

  {/* Mobile Menu Dropdown Panel */}
  {mobileMenuOpen && (
    <div
      style={{
        background: t.cardBg,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${t.border}`,
        boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.08)',
        padding: '16px 32px',
        position: 'absolute',
        width: '100%',
        left: 0,
        top: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item}
          onClick={() => handleNavClick(item)}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '12px 14px',
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 6,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: activeTab === item ? '#D43444' : t.textMuted,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
            if (activeTab !== item) e.currentTarget.style.color = isDark ? '#fff' : '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = activeTab === item ? '#D43444' : t.textMuted;
          }}
        >
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
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '96vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#000' }}>
        {CAROUSEL_SLIDES.map((slide, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === currentSlide ? 0.58 : 0, transform: i === currentSlide ? 'scale(1)' : 'scale(1.06)', transition: 'all 1.2s ease-in-out', pointerEvents: i === currentSlide ? 'auto' : 'none' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.12) 100%)', zIndex: 1 }} />
            <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
        
        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 36, left: 44, zIndex: 20, display: 'flex', gap: 8 }}>
          {CAROUSEL_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} style={{ height: 5, width: i === currentSlide ? 30 : 7, borderRadius: 3, border: 'none', cursor: 'pointer', background: i === currentSlide ? '#D43444' : 'rgba(255,255,255,0.35)', transition: 'all 0.3s', padding: 0 }} />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 20, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '80px 44px', display: 'grid', gridTemplateColumns: '1fr 440px', alignItems: 'center', gap: 52, minHeight: '96vh' }}>
          
          {/* LEFT CONTENT PANEL */}
          <div style={{ animation: 'fadeInUp 0.9s ease both' }}>
            <p style={{ color: '#D43444', fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12 }}>{CAROUSEL_SLIDES[currentSlide].accent}</p>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', color: '#fff', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 18 }}>{CAROUSEL_SLIDES[currentSlide].title}</h1>
            <p style={{ fontSize: 15, color: '#D1D5DB', fontWeight: 300, lineHeight: 1.8, maxWidth: 460, marginBottom: 30 }}>{CAROUSEL_SLIDES[currentSlide].subtitle}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <PrimaryButton onClick={() => handleNavClick('Contact')} style={{ padding: '14px 28px' }}>Book a Consultation</PrimaryButton>
              <OutlineButton onClick={() => handleNavClick('Services')} style={{ padding: '14px 28px' }}>Our Practice Areas</OutlineButton>
            </div>
          </div>
          
          {/* RIGHT PANEL: Premium High-Focus Director Card */}
          <div 
            style={{ 
              position: 'relative', 
              animation: 'fadeInUp 1s ease 0.25s both',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ 
              background: isDark ? '#141414' : '#ffffff', 
              borderRadius: 20, 
              overflow: 'hidden', 
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
              boxShadow: isDark 
                ? '0 30px 60px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,52,68,0.15)' 
                : '0 30px 60px -15px rgba(0,0,0,0.25)'
            }}>
              
              {/* Profile Image Container - Maximized Height & Focus */}
              <div style={{ position: 'relative', width: '100%', height: 320, overflow: 'hidden',marginTop: -4 }}>
                <img 
                  src={OWNER_PHOTO_URL} 
                  alt="Jonathan Crabtree" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} 
                />
                {/* Subtle, High-End Shadow Gradient Overlay inside image bottom */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  height: '40%', 
                  background: isDark 
                    ? 'linear-gradient(to top, #141414 0%, transparent 100%)' 
                    : 'linear-gradient(to top, #ffffff 0%, transparent 100%)'
                }} />
                
                {/* Minimalist Court Badge Anchored Cleanly to Top Left */}
                <div style={{ 
                  position: 'absolute', 
                  top: 16, 
                  left: 16, 
                  background: 'rgba(0,0,0,0.75)', 
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '6px 14px', 
                  borderRadius: 30,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D43444' }} />
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>
                    Supreme Court WA
                  </span>
                </div>
              </div>

              {/* Identity & Details Section */}
              <div style={{ padding: '28px 28px 24px' }}>
                
                {/* Typography Block */}
                <div style={{ marginBottom: 18 }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '0.02em', marginBottom: 4 }}>
                    Jonathan Crabtree
                  </h3>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D43444' }}>
                    Commercial &amp; Estate Lawyer
                  </p>
                </div>

                {/* Director Description Statement */}
                <p style={{ 
                  fontSize: 13, 
                  fontWeight: 300, 
                  lineHeight: 1.7, 
                  color: t.textMuted, 
                  borderLeft: '3px solid #D43444', 
                  paddingLeft: 14,
                  marginBottom: 22
                }}>
                  Protecting WA families and corporate businesses through expert succession planning and tailored, high-net-worth Will asset structures.
                </p>

                {/* Grid Capabilities Checklist */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: 24 }}>
                  {['Wills & Trusts', 'Probate & Admin', 'Fixed Fees', 'Succession Deeds'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ 
                        width: 18, 
                        height: 18, 
                        borderRadius: '50%', 
                        background: isDark ? 'rgba(212,52,68,0.12)' : '#FFF0F1', 
                        border: '1.5px solid #D43444', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        flexShrink: 0 
                      }}>
                        <Check size={9} color="#D43444" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 500, color: t.text }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Primary Action Call-To-Action */}
                <PrimaryButton 
                  onClick={() => handleNavClick('Contact')} 
                  style={{ 
                    width: '100%', 
                    padding: '13px 22px', 
                    fontSize: 12, 
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <span>Book Free Consultation</span>
                  <span style={{ fontSize: 14 }}>&raquo;</span>
                </PrimaryButton>

              </div>
            </div>
          </div>

        </div>
      </section>

            {/* ── CREDIBILITY STRIP ── */}
            <section style={{ padding: '22px 0', borderBottom: `1px solid ${t.border}`, background: t.bgAlt, overflow: 'hidden', position: 'relative' }}>
              <div style={{ display: 'flex', width: 'max-content', animation: 'scrollStrip 22s linear infinite' }}>
                {[...Array(2)].flatMap(() => [
                  { label: 'Jurisdictions', value: 'Supreme & High Court WA' },
                  { label: 'Legal Precision', value: 'Tactical Military Rigour' },
                  { label: 'Accreditation', value: 'Veteran-Owned Business' },
                  { label: 'Fee Assurance', value: 'Transparent Fixed Pricing' },
                ]).map((item, i) => (
                  <div key={i} style={{ minWidth: 290, padding: '0 32px', textAlign: 'center', borderRight: `1px solid ${t.border}` }}>
                    <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#D43444', fontWeight: 900, marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SERVICES ── */}
            <section style={{ padding: '80px 0', background: t.bgAlt, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
              <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, color: t.text, marginBottom: 10 }}>Specialized Areas of Focus</h3>
                  <p style={{ fontSize: 15, fontWeight: 300, color: t.textMuted }}>Clean, highly protective structures designed for Western Australian compliance.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
                  {SERVICES_DATA.map(svc => <ServiceCard key={svc.id} svc={svc} t={t} handleNavClick={handleNavClick} />)}
                </div>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{ padding: '88px 0' }}>
              <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: t.text }}>Professional Estate Insights</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {FAQS.map((faq, idx) => <FaqItem key={idx} faq={faq} idx={idx} t={t} />)}
                </div>
              </div>
            </section>

            {/* ── CONTACT (Home) ── */}
          {/* ─── CONTACT US SECTION ─── */}
<section 
  style={{ 
    padding: '100px 0 120px', 
    background: t.bg,
    position: 'relative',
    overflow: 'hidden'
  }}
>
  {/* Luxury structural design line for visual grounding */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '1px',
    height: '100px',
    background: `linear-gradient(to bottom, ${t.border}, transparent)`,
    display: 'none', // hidden on small viewports, auto-centers composition
  }} />

  <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
    
    {/* Clean Centered Section Header */}
    <div style={{ textAlign: 'center', marginBottom: 72 }}>
     
      <h2 style={{ 
        fontFamily: "'Cinzel', serif", 
        fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', // Increased size
        fontWeight: 800, 
        color: t.text, 
        marginBottom: 14 
      }}>
        Contact Our Chambers
      </h2>
      <p style={{ 
        fontSize: 16, // Increased size
        fontWeight: 300, 
        color: t.textMuted, 
        maxWidth: 540, 
        margin: '0 auto',
        lineHeight: 1.6
      }}>
        Reach out for a confidential, privileged case assessment. Our legal team guarantees a response within 4 business hours.
      </p>
    </div>

    {/* Perfectly Balanced Left and Right Split Grid Layout */}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', // Perfectly aligns columns side by side
      gap: 64, 
      alignItems: 'stretch' // Keeps both columns structurally identical in height
    }}>
      
      {/* LEFT COLUMN: Premium Contact Details Panel */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', // Maximizes alignment to match form height
        gap: 20 
      }}>
        
        {/* Subtle Branding Accent Header on Left Column */}
        <div style={{ marginBottom: 12 }}>
          <h3 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 22,
            fontWeight: 800,
            color: t.text,
            marginBottom: 8
          }}>
            Chancery Office
          </h3>
          <div style={{ width: 44, height: 2, background: '#D43444' }} />
        </div>

        {/* Contact Info Group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flexGrow: 1, justifyContent: 'center' }}>
          {[
            { 
              label: 'Office Address', 
              icon: <MapPin size={22} color="#D43444" style={{ flexShrink: 0, marginTop: 3 }} />, 
              value: 'Level 25, 108 St Georges Terrace, Perth WA 6000' 
            },
            { 
              label: 'Phone Line', 
              icon: <Phone size={22} color="#D43444" style={{ flexShrink: 0, marginTop: 1 }} />, 
              value: '(08) 6557 8939' 
            },
            { 
              label: 'Secure Email Address', 
              icon: <Mail size={22} color="#D43444" style={{ flexShrink: 0, marginTop: 2 }} />, 
              value: 'jonathan.crabtree@crabtreelegal.com.au' 
            },
          ].map(item => (
            <div
              key={item.label}
              style={{
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                border: `1px solid ${t.border}`,
                borderRadius: 16,
                padding: '24px 28px',
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D43444';
                e.currentTarget.style.transform = 'translateX(6px)';
                e.currentTarget.style.boxShadow = isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = t.border;
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon Container Ring */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: isDark ? 'rgba(212,52,68,0.12)' : '#FFF0F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>

              {/* Text Block */}
              <div style={{ flexGrow: 1 }}>
                <p style={{ 
                  fontSize: 12, 
                  fontWeight: 800, 
                  letterSpacing: '0.08em', 
                  textTransform: 'uppercase', 
                  color: '#D43444',
                  margin: '0 0 4px 0'
                }}>
                  {item.label}
                </p>
                <p style={{ 
                  fontSize: 16, // Increased text readability
                  fontWeight: 500, 
                  lineHeight: 1.5, 
                  color: t.text,
                  margin: 0
                }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Legal Compliance Footnote (Aligns bottom line beautifully) */}
        <p style={{ 
          fontSize: 12, 
          color: t.textMuted, 
          margin: '12px 0 0', 
          fontStyle: 'italic',
          lineHeight: 1.5 
        }}>
          * All communications are heavily protected under practitioner-client legal privilege rules within Western Australia.
        </p>

      </div>

      {/* RIGHT COLUMN: High-Fidelity Intake Form */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%' 
      }}>
        <div style={{
          background: t.cardBg,
          border: `1px solid ${t.border}`,
          borderRadius: 24,
          padding: '40px', // Extra internal premium spacing
          boxShadow: isDark ? '0 25px 60px -15px rgba(0,0,0,0.7)' : '0 25px 60px -15px rgba(0,0,0,0.06)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {/* Renders your custom interactive HomeContactForm component */}
          <HomeContactForm t={t} isDark={isDark} handleNavClick={handleNavClick} />
        </div>
      </div>

    </div>

  </div>
</section>
          </div>
        )}

        {/* ─── ABOUT ─── */}
        {activeTab === 'About' && <AboutSection t={t} isDark={isDark} handleNavClick={handleNavClick} />}

        {/* ─── SERVICES ─── */}
        {activeTab === 'Services' && (
          <section style={{ padding: '120px 0 80px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
              <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
                {/* <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase', fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1', padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>Practice Areas</span> */}
                <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: t.text, marginBottom: 12 }}>Our Specialties</h1>
                <p style={{ fontSize: 13, fontWeight: 300, color: t.textMuted, marginBottom: 24 }}>Practical advice and high-level legal drafting to achieve your personal and commercial objectives.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {['all', 'Succession & Estates', 'Commercial Law'].map(cat => <FilterButton key={cat} label={cat === 'all' ? 'All Specialties' : cat} active={activeServiceTab === cat} onClick={() => setActiveServiceTab(cat)} t={t} />)}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 36, marginBottom: 56 }}>
                {filteredServices.map(svc => <ServiceCard key={svc.id} svc={svc} t={t} handleNavClick={handleNavClick} />)}
              </div>
              <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, padding: 36, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                <div>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 8 }}>Require Custom Estate or Corporate Deeds?</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: t.textMuted, maxWidth: 500 }}>We draft airtight, bespoke documents tailored strictly for the Supreme Court of Western Australia.</p>
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
                  <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
                    {/* <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase', fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1', padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>Knowledge Hub</span> */}
                    <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: t.text, marginBottom: 12 }}>News &amp; Articles</h1>
                    <p style={{ fontSize: 13, fontWeight: 300, color: t.textMuted, marginBottom: 24 }}>Articles and commentary designed to help elevate your strategic legal IQ.</p>
                    <input type="text" placeholder="Search articles, case reviews..." value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} style={{ ...inputStyle, borderRadius: 999, textAlign: 'center', maxWidth: 420, display: 'block', margin: '0 auto' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                    {filteredArticles.length > 0 ? filteredArticles.map(art => <ArticleCard key={art.id} art={art} t={t} onSelect={setSelectedArticle} />) : <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 0', color: '#9CA3AF' }}>No articles match your search.</div>}
                  </div>
                </>
              ) : (
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                  <button onClick={() => setSelectedArticle(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D43444', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 32 }}><ChevronLeft size={15} /> Back to All Articles</button>
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
              <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 56px' }}>
                {/* <span style={{ fontSize: 12, letterSpacing: '0.15em', color: '#D43444', textTransform: 'uppercase', fontWeight: 900, background: isDark ? 'rgba(212,52,68,0.1)' : '#FFF0F1', padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>Secure Intake</span> */}
                <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: t.text, marginBottom: 12 }}>Connect With Our Team</h1>
                <p style={{ fontSize: 14, fontWeight: 300, color: t.textMuted }}>Initiate case verification. Conflicts clearance is handled rapidly within 4 business hours.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 52, alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: t.text, marginBottom: 12 }}>Headquarters</h3>
                    <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: t.textMuted }}>Located centrally on St Georges Terrace in Perth CBD, we advise executors and private families across Western Australia.</p>
                  </div>
                  {[
                    { label: 'Office Address', icon: <MapPin size={15} color="#D43444" style={{ flexShrink: 0, marginTop: 2 }} />, value: 'Level 25, 108 St Georges Terrace, Perth WA 6000' },
                    { label: 'Phone', icon: <Phone size={15} color="#D43444" style={{ flexShrink: 0 }} />, value: '(08) 6557 8939' },
                    { label: 'Official Email', icon: <Mail size={15} color="#D43444" style={{ flexShrink: 0 }} />, value: 'jonathan.crabtree@crabtreelegal.com.au' },
                  ].map(item => (
                    <div key={item.label} style={{ background: t.cardBg, border: `1px solid ${t.border}`, padding: 22, borderRadius: 14, transition: 'all 0.25s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#D43444'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(212,52,68,0.12)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = t.border; (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                    >
                      <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9CA3AF', fontWeight: 700, marginBottom: 9 }}>{item.label}</p>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: t.textMuted, fontWeight: 300 }}>{item.icon}{item.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 18, padding: 36 }}>
                  {!contactSubmitted ? (
                    <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {(['firstName', 'lastName'] as const).map(field => (
                          <div key={field}>
                            <label style={labelStyle}>{field === 'firstName' ? 'First Name' : 'Last Name'}</label>
                            <input type="text" required value={contactForm[field]} onChange={(e) => setContactForm({ ...contactForm, [field]: e.target.value })} style={inputStyle} />
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div><label style={labelStyle}>Email</label><input type="email" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} style={inputStyle} /></div>
                        <div><label style={labelStyle}>Phone</label><input type="tel" required value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} style={inputStyle} /></div>
                      </div>
                      <div>
                        <label style={labelStyle}>Brief Description of Needs</label>
                        <textarea rows={4} required value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} placeholder="Note key details regarding succession deeds, Wills, or Probate needs..." style={inputStyle} />
                      </div>
                      <PrimaryButton onClick={() => {}} style={{ width: '100%', padding: '14px 0' }}>Transmit Case Inquiry</PrimaryButton>
                    </form>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '56px 0' }}>
                      <div style={{ width: 48, height: 48, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}><Check size={24} color="#16A34A" /></div>
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
     <footer 
  style={{ 
    background: '#070707', 
    color: '#fff', 
    padding: '130px 0 80px', 
    borderTop: '1px solid #1a1a1a', 
    position: 'relative', 
    overflow: 'hidden' 
  }}
>
  {/* Elegant Ambient Top Red Glow Line Accent */}
  <div style={{ 
    position: 'absolute', 
    top: 0, 
    left: '50%', 
    transform: 'translateX(-50%)', 
    width: '75%', 
    height: '2px', 
    background: 'linear-gradient(to right, transparent, rgba(212,52,68,0.7), transparent)',
    boxShadow: '0 0 20px rgba(212,52,68,0.4)'
  }} />
  
  {/* Soft Radial Ambient Corner Glow */}
  <div style={{ 
    position: 'absolute', 
    bottom: -150, 
    right: -100, 
    width: 500, 
    height: 500, 
    borderRadius: '50%', 
    background: 'radial-gradient(circle, rgba(212,52,68,0.08) 0%, transparent 75%)', 
    pointerEvents: 'none' 
  }} />

  <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
    
    {/* Main Grid Structure */}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: 56, 
      paddingBottom: 70, 
      borderBottom: '1px solid #1a1a1a' 
    }}>
      
      {/* COLUMN 1: Brand & Communication Overview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div 
          onClick={() => handleNavClick('Home')} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 14, 
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
          <img src={LOGO_URL} alt="Crabtree Legal" style={{ width: 44, height: 44, objectFit: 'contain', filter: 'brightness(1.15)' }} />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 800, letterSpacing: '0.22em', color: '#fff' }}>
            CRABTREE <span style={{ color: '#D43444' }}>LEGAL</span>
          </span>
        </div>
        
        <p style={{ fontSize: 16, color: '#9CA3AF', lineHeight: 1.8, fontWeight: 300, maxWidth: 380, margin: 0 }}>
          Helping families, executors, retirees, and business owners protect what matters most through precise, strategic legal advice.
        </p>
        
        {/* Interactive Social/Contact Action Rings */}
        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
          {[Phone, Mail, MapPin].map((Icon, i) => (
            <div 
              key={i} 
              style={{ 
                width: 44, 
                height: 44, 
                borderRadius: '50%', 
                border: '1px solid #262626', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer', 
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                background: 'rgba(255,255,255,0.01)'
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.borderColor = '#D43444'; 
                e.currentTarget.style.background = 'rgba(212,52,68,0.12)'; 
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(212,52,68,0.2)';
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.borderColor = '#262626'; 
                e.currentTarget.style.background = 'rgba(255,255,255,0.01)'; 
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Icon size={18} color="#9CA3AF" />
            </div>
          ))}
        </div>
      </div>

      {/* COLUMN 2: Navigational Blueprint */}
      <div>
        <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 900, color: '#E5E7EB', marginBottom: 28 }}>
          Navigation Map
        </h4>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, padding: 0, margin: 0 }}>
          {NAV_ITEMS.map(item => (
            <li 
              key={item}
              style={{ transition: 'transform 0.25s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <FooterNavLink 
                label={item} 
                onClick={() => handleNavClick(item)} 
                style={{ fontSize: 15.5, color: '#9CA3AF', transition: 'color 0.2s' }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* COLUMN 3: Western Australia Statutory Framework */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 900, color: '#E5E7EB', marginBottom: 10 }}>
          WA Regulations
        </h4>
        <p style={{ fontSize: 14.5, color: '#9CA3AF', lineHeight: 1.75, margin: 0, fontWeight: 300 }}>
          Liability limited by a scheme approved under Professional Standards Legislation. Legal practitioners of Crabtree Legal are governed by the Legal Practice Board of Western Australia.
        </p>
        <p style={{ fontSize: 14.5, color: '#9CA3AF', lineHeight: 1.75, margin: 0, fontWeight: 300 }}>
          We acknowledge the Whadjuk Noongar people, traditional custodians of the land on which our Perth CBD chambers are established.
        </p>
        
        {/* Dynamic Admitted Practitioner Micro-Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(212,52,68,0.07) 0%, rgba(212,52,68,0.02) 100%)', 
          border: '1px solid rgba(212,52,68,0.2)', 
          borderRadius: 12, 
          padding: '16px 20px',
          marginTop: 6,
          transition: 'border-color 0.3s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,52,68,0.4)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,52,68,0.2)'}
        >
          <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#D43444', margin: '0 0 6px 0' }}>
            Admitted Practitioners
          </p>
          <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 400, lineHeight: 1.6, margin: 0 }}>
            Supreme Court of WA · High Court of Australia · March 2012
          </p>
        </div>
      </div>

    </div>

    {/* Bottom Structural Legals Strip */}
    <div style={{ paddingTop: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
      <p style={{ fontSize: 13, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, margin: 0 }}>
        &copy; {new Date().getFullYear()} Crabtree Legal Pty Ltd. All Rights Reserved.
      </p>
      
      <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#555555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', alignItems: 'center' }}>
        <FooterNavLink label="Privacy Charter" onClick={() => {}} small />
        <span style={{ color: '#262626' }}>•</span>
        <FooterNavLink label="Client Terms" onClick={() => {}} small />
      </div>
    </div>

  </div>
</footer>
    </div>
  );
}