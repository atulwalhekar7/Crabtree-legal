export const ARTICLES_DATA = [
  {
    id: 1,
    date: '9 November 2025',
    author: 'Jonathan Crabtree',
    title:
      "Protecting Your Children's Inheritance from Divorce with Testamentary Trust Wills: The Bernard v Bernard Case",
    summary:
      'An in-depth analysis of how testamentary trusts serve as essential defensive walls against estate division within family law breakdowns.',
    category: 'Wills & Estates',
    content: `In the complex arena of family asset protection, the landmark case of Bernard v Bernard highlights the profound legal advantages of well-drafted Testamentary Trust Wills. Simple Wills often leave beneficiaries vulnerable to having their inheritances integrated into martial property pools during divorce proceedings.\n\nA Testamentary Trust maintains assets within a distinct discretionary structure rather than distributing them directly to an individual. When structured with absolute precision by an experienced succession lawyer, the trust assets do not form part of the marital property pool, saving the next generation's inheritance from litigation and forced divisions.\n\nKey takeaways for families planning their estates:\n1. Discretionary Control: Appointing independent or joint trustees preserves asset shielding.\n2. Asset Segregation: Keeps family wealth insulated from relationship disputes.\n3. Long-term Security: Establishes a protected legal architecture that spans generations.`,
  },
  {
    id: 2,
    date: '9 September 2025',
    author: 'Jonathan Crabtree',
    title: 'The Benefits of Testamentary Trust Wills Explained',
    summary:
      'Understand the crucial differences between standard Wills and Testamentary Trusts concerning tax flexibilities and asset protection.',
    category: 'Estate Planning',
    content: `A Testamentary Trust is a trust established within a Will that only comes into effect upon the death of the testator. Unlike a simple Will that distributes assets directly to beneficiaries, a Testamentary Trust provides substantial tax planning options and protective barriers.\n\nTax Benefits:\nMinors (under 18) who are beneficiaries of a Testamentary Trust are taxed at adult tax-free thresholds rather than the penalty rates usually applied to trust income distributed to minors.\n\nAsset Protection:\nBecause the trust owns the assets—not the individual beneficiary—the inheritance is shielded from personal bankruptcy claims, commercial creditors, and relationship breakdowns.`,
  },
  {
    id: 3,
    date: '3 September 2025',
    author: 'Jonathan Crabtree',
    title: 'How Getting Married or Divorced Can Revoke Your Will',
    summary:
      'Many Western Australians do not realize that significant life changes can automatically invalidate key estate instructions.',
    category: 'Wills & Estates',
    content: `In Western Australia, major relationship status changes carry automatic statutory consequences for your estate planning documents under the Wills Act 1970.\n\nMarriage:\nAs a general rule, getting married automatically revokes any Will you made prior to the marriage.\n\nDivorce:\nConversely, a formal divorce automatically revokes any beneficial disposition or appointment of your former spouse as an executor within your existing Will.`,
  },
  {
    id: 4,
    date: '27 August 2025',
    author: 'Jonathan Crabtree',
    title: 'Why Every Parent Should Nominate a Legal Guardian in their Will',
    summary: 'Protecting minor children is the single most important estate directive.',
    category: 'Estate Planning',
    content: `While much of estate planning focuses on the distribution of physical and financial assets, nominating a legal guardian for children under 18 is the most critical decision a parent can make.\n\nWithout a clear, legally binding nomination in a Will, the determination of who raises your children is left to the Family Court of WA or state welfare agencies.`,
  },
  {
    id: 5,
    date: '20 August 2025',
    author: 'Jonathan Crabtree',
    title: 'What Happens to Your Estate If You Die without a Will in WA',
    summary:
      'A breakdown of the rigid, statutory distribution formulas enforced on intestate estates in Western Australia.',
    category: 'Wills & Estates',
    content: `If you pass away without leaving a valid Will in Western Australia, your estate is declared 'intestate'. It will be distributed strictly according to the formulas set out in the Administration Act 1903 (WA), regardless of your relationship dynamics or verbal promises.`,
  },
  {
    id: 6,
    date: '16 July 2025',
    author: 'Jonathan Crabtree',
    title: "Why Every New Company Needs a Shareholders Agreement—Drafted Early",
    summary: 'Preventing devastating corporate and board deadlocks by embedding clear equity option buyouts.',
    category: 'Commercial Law',
    content: `Starting a business with partners is a time of great optimism, but failing to put a Shareholders Agreement in place early is a major risk.\n\nA robust, professionally drafted Shareholders Agreement governs:\n1. Dispute Resolution\n2. Drag-Along & Tag-Along Rules\n3. Valuation Methods\n4. Death or Disability clauses`,
  },
];

export type Article = (typeof ARTICLES_DATA)[number];