/**
 * SEO tests for robots, sitemap, and metadata exports.
 */

// ── Mocks (must be top-level) ─────────────────────────────────────────────────

// Mock getAllPosts so sitemap.ts doesn't read the filesystem
jest.mock('@/components/utils/markdown', () => ({
  getAllPosts: () => [
    { slug: 'sample-post', date: '2026-01-01' },
  ],
}));

// Mock layout.tsx heavy dependencies so we can import its named 'metadata' export
jest.mock('next-themes', () => ({ ThemeProvider: ({ children }: any) => children }));
jest.mock('next/font/google', () => ({ Bricolage_Grotesque: () => ({ className: 'mock-font' }) }));
jest.mock('nextjs-toploader', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/nextauth/SessionProvider', () => ({ __esModule: true, default: ({ children }: any) => children }));
jest.mock('@/components/shared/LeadCapturePopup/PopupWrapper', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/shared/WhatsAppButton', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/animations/SmoothScroll', () => ({ __esModule: true, default: ({ children }: any) => children }));
jest.mock('@/components/animations/Preloader', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/animations/CustomCursor', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/Layout/Header', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/Layout/Footer', () => ({ __esModule: true, default: () => null }));

// Mock about page dependencies so we can import its metadata
jest.mock('@/components/shared/HeroSub', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/Aboutus', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/shared/Breadcrumb', () => ({ __esModule: true, default: () => null }));
jest.mock('@/components/shared/RelatedLinks', () => ({ __esModule: true, default: () => null, servicesRelatedLinks: [] }));

// ── robots() ─────────────────────────────────────────────────────────────────

describe('robots()', () => {
  const robots = require('@/app/robots').default;

  test('allows crawling of the root path', () => {
    const result = robots();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule.allow).toContain('/');
  });

  test('disallows /api/ paths', () => {
    const result = robots();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule.disallow).toContain('/api/');
  });

  test('disallows /partnerships/dashboard', () => {
    const result = robots();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule.disallow).toContain('/partnerships/dashboard');
  });

  test('includes sitemap.xml URL', () => {
    const result = robots();
    expect(result.sitemap).toContain('sitemap.xml');
  });
});

// ── sitemap() ─────────────────────────────────────────────────────────────────

describe('sitemap()', () => {
  const sitemap = require('@/app/sitemap').default;

  test('includes the home page URL', () => {
    const urls = sitemap().map((e: any) => e.url);
    expect(urls).toContain('https://walldotbuilders.com');
  });

  test('includes /aboutus', () => {
    const urls = sitemap().map((e: any) => e.url);
    expect(urls).toContain('https://walldotbuilders.com/aboutus');
  });

  test('includes /contactus', () => {
    const urls = sitemap().map((e: any) => e.url);
    expect(urls).toContain('https://walldotbuilders.com/contactus');
  });

  test('includes /tools/home-cost-calculator', () => {
    const urls = sitemap().map((e: any) => e.url);
    expect(urls).toContain('https://walldotbuilders.com/tools/home-cost-calculator');
  });

  test('home page has priority 1.0', () => {
    const home = sitemap().find((e: any) => e.url === 'https://walldotbuilders.com');
    expect(home?.priority).toBe(1.0);
  });

  test('blog posts from getAllPosts are included', () => {
    const urls = sitemap().map((e: any) => e.url);
    expect(urls).toContain('https://walldotbuilders.com/blogs/sample-post');
  });
});

// ── Root layout metadata ──────────────────────────────────────────────────────

describe('Root layout metadata', () => {
  const { metadata } = require('@/app/layout');

  test('default title contains Walldot Builders', () => {
    const title = metadata?.title as any;
    const titleStr = typeof title === 'string' ? title : (title?.default ?? '');
    expect(titleStr.toLowerCase()).toContain('walldot builders');
  });

  test('openGraph siteName is Walldot Builders', () => {
    const og = metadata?.openGraph as any;
    expect(og?.siteName).toBe('Walldot Builders');
  });

  test('openGraph images reference brochure-og.jpg', () => {
    const og = metadata?.openGraph as any;
    const img = og?.images?.[0];
    const url = typeof img === 'string' ? img : (img?.url ?? '');
    expect(url).toContain('brochure-og.jpg');
  });
});

// ── About page metadata ───────────────────────────────────────────────────────

describe('About page metadata', () => {
  const mod = require('@/app/(site)/aboutus/page');
  const meta = mod.metadata;

  test('title contains Walldot Builders', () => {
    const titleStr = typeof meta?.title === 'string' ? meta.title : (meta?.title as any)?.default ?? '';
    expect(titleStr.toLowerCase()).toContain('walldot builders');
  });

  test('canonical URL contains /aboutus', () => {
    expect(meta?.alternates?.canonical).toContain('aboutus');
  });

  test('openGraph images are defined', () => {
    const images = meta?.openGraph?.images ?? [];
    expect(images.length).toBeGreaterThan(0);
  });
});
