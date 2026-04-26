/**
 * writingcontrol.org brand tokens.
 *
 * Literary daylight: warm cream paper, deep brown-black ink, oxblood
 * accent reserved for marks and dropcaps. Display rides on Newsreader
 * (variable serif, large optical size — editorial, not decorative).
 * Body uses Source Serif 4 (text optical size, designed for long-form
 * reading). JetBrains Mono carries dates, status strips, and the
 * deskwork-state indicators that link the site to its editorial spine.
 *
 * Mirrors `src/styles/design-tokens.css`. Keep them in sync.
 */

export interface BrandColors {
  paper: string;
  paper2: string;
  ink: string;
  inkSoft: string;
  rule: string;
  accent: string;
  mark: string;
}

export interface BrandTypography {
  display: string;
  body: string;
  mono: string;
}

export interface Brand {
  site: string;
  name: string;
  tagline: string;
  description: string;
  author: string;
  colors: BrandColors;
  typography: BrandTypography;
}

export const brand: Brand = {
  site: 'writingcontrol',
  name: 'writingcontrol.org',
  tagline: 'Notes from a writing life under construction.',
  description:
    'Fiction, literary nonfiction, and craft essays — and a working dogfood of the deskwork editorial plugin.',
  author: 'Orion Letizi',
  colors: {
    paper: '36 38% 92%',
    paper2: '36 30% 88%',
    ink: '24 25% 13%',
    inkSoft: '24 18% 30%',
    rule: '24 18% 70%',
    accent: '8 50% 32%',
    mark: '45 70% 60%',
  },
  typography: {
    display:
      '"Newsreader Variable", "Newsreader", Georgia, "Times New Roman", serif',
    body: '"Source Serif 4 Variable", "Source Serif 4", Georgia, "Times New Roman", serif',
    mono: '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  },
};
