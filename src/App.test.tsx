import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    window.location.hash = '';
    vi.clearAllMocks();
  });

  // Suite 1: Smoke Test
  describe('Suite 1: Smoke Test', () => {
    it('renders root App without crashing', () => {
      render(<App />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  // Suite 2: Brand Identity & Header Navigation
  describe('Suite 2: Brand Identity & Header Navigation', () => {
    it('displays the CommonKey brand logo linking to home', () => {
      render(<App />);
      const logoLinks = screen.getAllByRole('link', { name: /CommonKey/i });
      expect(logoLinks.length).toBeGreaterThanOrEqual(1);
      expect(logoLinks[0]).toHaveAttribute('href', '#');
    });

    it('renders all desktop navigation links with correct destinations', () => {
      render(<App />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();

      const expectedLinks = [
        { label: 'Features', href: '#features' },
        { label: 'Problem', href: '#problem' },
        { label: 'Comparison', href: '#comparison' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Articles', href: '#/articles' },
        { label: 'FAQ', href: '#faq' },
      ];

      expectedLinks.forEach(({ label, href }) => {
        const link = screen.getByRole('link', { name: label });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', href);
      });
    });

    it('toggles mobile menu open and closed upon button click', () => {
      render(<App />);
      const mobileToggleBtn = screen.getByRole('button', { name: /Open menu/i });
      expect(mobileToggleBtn).toHaveAttribute('aria-expanded', 'false');

      // Click to open
      fireEvent.click(mobileToggleBtn);
      expect(screen.getByRole('button', { name: /Close menu/i })).toHaveAttribute('aria-expanded', 'true');

      // Click to close
      fireEvent.click(screen.getByRole('button', { name: /Close menu/i }));
      expect(screen.getByRole('button', { name: /Open menu/i })).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes the open mobile menu when pressing the Escape key', () => {
      render(<App />);
      const mobileToggleBtn = screen.getByRole('button', { name: /Open menu/i });
      fireEvent.click(mobileToggleBtn);
      expect(screen.getByRole('button', { name: /Close menu/i })).toBeInTheDocument();

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(screen.getByRole('button', { name: /Open menu/i })).toBeInTheDocument();
    });
  });

  // Suite 3: Hero Section
  describe('Suite 3: Hero Section', () => {
    it('displays the main headline and value proposition subtext', () => {
      render(<App />);
      const heroHeadings = screen.getAllByRole('heading', { level: 1 });
      expect(heroHeadings[0]).toHaveTextContent('Stop Running Your Strata Committee Out of Your Inbox.');

      expect(
        screen.getByText(/The independent governance software that protects Australian volunteer committees/i)
      ).toBeInTheDocument();
    });

    it('renders the walkthrough CTA button pointing to Google Calendar booking', () => {
      render(<App />);
      const walkthroughLinks = screen.getAllByRole('link', { name: /Book a 30-Minute Walkthrough/i });
      expect(walkthroughLinks.length).toBeGreaterThanOrEqual(1);
      expect(walkthroughLinks[0]).toHaveAttribute('href', 'https://calendar.app.google/LnCqDH1YajG5Wx417');
      expect(walkthroughLinks[0]).toHaveAttribute('target', '_blank');
      expect(walkthroughLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders secondary Explore Features link pointing to #features', () => {
      render(<App />);
      const exploreLink = screen.getByRole('link', { name: /Explore Features/i });
      expect(exploreLink).toHaveAttribute('href', '#features');
    });

    it('renders the three benefit cards: Protect Your Liability, Reclaim Your Time, and Eliminate Hidden Fees', () => {
      render(<App />);
      expect(screen.getByRole('heading', { name: /Protect Your Liability/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Reclaim Your Time/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Eliminate Hidden Fees/i })).toBeInTheDocument();
    });

    it('renders the primary dashboard screenshot frame and action-first lead-in copy', () => {
      render(<App />);
      expect(
        screen.getByRole('heading', {
          name: /Built for the Heavy Lifters—and the “Just Tell Me Where to Vote” Members\./i,
        })
      ).toBeInTheDocument();
      const dashboardImg = screen.getByAltText(/CommonKey Committee Governance Dashboard/i);
      expect(dashboardImg).toBeInTheDocument();
      expect(dashboardImg).toHaveAttribute('src', '/assets/Dashboard.png');
    });
  });

  // Suite 4: Hash-Based Client Routing
  describe('Suite 4: Hash-Based Client Routing', () => {
    it('switches to ArticlesPage when window.location.hash is set to #/articles', () => {
      render(<App />);
      expect(screen.getAllByRole('heading', { name: /Stop Running Your Strata Committee Out of Your Inbox\./i })[0]).toBeInTheDocument();

      act(() => {
        window.location.hash = '#/articles';
        window.dispatchEvent(new Event('hashchange'));
      });

      expect(
        screen.getByRole('heading', { name: /Published Insights for Body Corporate Committees/i })
      ).toBeInTheDocument();
      expect(
        screen.queryAllByRole('heading', { name: /Stop Running Your Strata Committee Out of Your Inbox\./i })
      ).toHaveLength(0);
    });

    it('navigates to articles when clicking Articles link in navigation', () => {
      render(<App />);
      const articlesNavLinks = screen.getAllByRole('link', { name: /Articles/i });
      fireEvent.click(articlesNavLinks[0]);

      expect(window.location.hash).toBe('#/articles');
      expect(
        screen.getByRole('heading', { name: /Published Insights for Body Corporate Committees/i })
      ).toBeInTheDocument();
    });

    it('switches to article detail reader when hash contains article slug', () => {
      render(<App />);
      act(() => {
        window.location.hash = '#/articles/software-surcharges-vs-data-sovereignty-are-you-renting-your-own-records';
        window.dispatchEvent(new Event('hashchange'));
      });

      expect(
        screen.getByRole('heading', {
          name: /Software Surcharges vs\. Data Sovereignty: Are You Renting Your Own Records\?/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText(/Back to all articles/i)).toBeInTheDocument();
    });

    it('restores landing page when hash changes back to empty or #', () => {
      render(<App />);
      act(() => {
        window.location.hash = '#/articles';
        window.dispatchEvent(new Event('hashchange'));
      });
      expect(screen.getByRole('heading', { name: /Published Insights for Body Corporate Committees/i })).toBeInTheDocument();

      act(() => {
        window.location.hash = '';
        window.dispatchEvent(new Event('hashchange'));
      });

      expect(screen.getAllByRole('heading', { name: /Stop Running Your Strata Committee Out of Your Inbox\./i })[0]).toBeInTheDocument();
    });
  });

  // Suite 5: Interactive Pricing Calculator
  describe('Suite 5: Interactive Pricing Calculator', () => {
    it('calculates default pricing for 12 lots: $432 + GST / year and $720 annual savings', () => {
      render(<App />);
      expect(screen.getByText('$432')).toBeInTheDocument();
      expect(screen.getByText('$36/lot/yr calculation')).toBeInTheDocument();
      expect(
        screen.getByText(/You are saving \$720\/year compared to standard pricing!/i)
      ).toBeInTheDocument();
    });

    it('clamps to minimum floor rate ($299 + GST / year) when lots <= 8', () => {
      render(<App />);
      const lotInput = screen.getByLabelText(/Enter Number of Lots/i);

      fireEvent.change(lotInput, { target: { value: '4' } });

      expect(screen.getAllByText('$299').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Minimum Floor Applied')).toBeInTheDocument();
      // Baseline 4 * 96 = 384; 384 - 299 = 85
      expect(
        screen.getByText(/You are saving \$85\/year compared to standard pricing!/i)
      ).toBeInTheDocument();
    });

    it('clamps to large scheme cap ($899 + GST / year) when lots >= 25', () => {
      render(<App />);
      const lotInput = screen.getByLabelText(/Enter Number of Lots/i);

      fireEvent.change(lotInput, { target: { value: '30' } });

      expect(screen.getByText('$899')).toBeInTheDocument();
      expect(screen.getByText('Large Scheme Cap Active')).toBeInTheDocument();
      // Baseline 30 * 96 = 2,880; 2,880 - 899 = 1,981
      expect(
        screen.getByText(/You are saving \$1,981\/year compared to standard pricing!/i)
      ).toBeInTheDocument();
    });

    it('dynamically recalculates cost and savings on custom input change', () => {
      render(<App />);
      const lotInput = screen.getByLabelText(/Enter Number of Lots/i);

      fireEvent.change(lotInput, { target: { value: '18' } });

      // 18 * 36 = 648
      expect(screen.getByText('$648')).toBeInTheDocument();
      // Baseline 18 * 96 = 1,728; 1,728 - 648 = 1,080
      expect(
        screen.getByText(/You are saving \$1,080\/year compared to standard pricing!/i)
      ).toBeInTheDocument();
    });

    it('updates lot count and calculates price when clicking preset buttons', () => {
      render(<App />);

      // Preset 4 (Duplex)
      const duplexPreset = screen.getByRole('button', { name: /4 \(Duplex\)/i });
      fireEvent.click(duplexPreset);
      expect(screen.getAllByText('$299').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Minimum Floor Applied')).toBeInTheDocument();

      // Preset 18 (Mid-rise)
      const midRisePreset = screen.getByRole('button', { name: /18 \(Mid-rise\)/i });
      fireEvent.click(midRisePreset);
      expect(screen.getByText('$648')).toBeInTheDocument();

      // Preset 25 (Capped)
      const cappedPreset = screen.getByRole('button', { name: /25 \(Capped\)/i });
      fireEvent.click(cappedPreset);
      expect(screen.getByText('$899')).toBeInTheDocument();
      expect(screen.getByText('Large Scheme Cap Active')).toBeInTheDocument();
    });

    it('copies committee proposal summary to clipboard and shows confirmation feedback', async () => {
      render(<App />);
      const copyBtn = screen.getByRole('button', { name: /Copy Summary for Committee Vote/i });
      expect(copyBtn).toBeInTheDocument();

      fireEvent.click(copyBtn);

      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('Proposal for Strata Committee:')
      );
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('CommonKey Annual Subscription: $432 + GST / year')
      );

      // Verify button feedback state
      expect(
        screen.getByText(/Proposal Summary Copied to Clipboard!/i)
      ).toBeInTheDocument();
    });
  });

  // Suite 6: FAQ Accordion
  describe('Suite 6: FAQ Accordion', () => {
    it('renders all 6 FAQ questions', () => {
      render(<App />);
      const expectedQuestions = [
        'Does CommonKey replace our Strata Manager?',
        'We have a manager portal, why CommonKey?',
        'Our Chair knows everything, why change?',
        "Isn't compliance the manager's legal responsibility?",
        'Who owns our data & where is it hosted?',
        'Is it hard for volunteers to use?',
      ];

      expectedQuestions.forEach((q) => {
        expect(screen.getByRole('button', { name: new RegExp(q, 'i') })).toBeInTheDocument();
      });
    });

    it('has first FAQ item open by default', () => {
      render(<App />);
      const firstFaqBtn = screen.getByRole('button', {
        name: /Does CommonKey replace our Strata Manager\?/i,
      });
      expect(firstFaqBtn).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen.getByText(/No\. CommonKey is the committee's independent governance system\./i)
      ).toBeInTheDocument();
    });

    it('expands another FAQ item and collapses the previously opened item when clicked', () => {
      render(<App />);
      const firstFaqBtn = screen.getByRole('button', {
        name: /Does CommonKey replace our Strata Manager\?/i,
      });
      const secondFaqBtn = screen.getByRole('button', {
        name: /We have a manager portal, why CommonKey\?/i,
      });

      expect(firstFaqBtn).toHaveAttribute('aria-expanded', 'true');
      expect(secondFaqBtn).toHaveAttribute('aria-expanded', 'false');

      // Click second FAQ
      fireEvent.click(secondFaqBtn);

      expect(firstFaqBtn).toHaveAttribute('aria-expanded', 'false');
      expect(secondFaqBtn).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen.getByText(/Agency portals are static compliance archives designed for internal agency record-keeping\./i)
      ).toBeInTheDocument();

      // Click second FAQ again to collapse
      fireEvent.click(secondFaqBtn);
      expect(secondFaqBtn).toHaveAttribute('aria-expanded', 'false');
    });
  });

  // Suite 7: Footer & Brand Continuity
  describe('Suite 7: Footer', () => {
    it('displays copyright notice and secondary links', () => {
      render(<App />);
      expect(screen.getByText(/© 2026 CommonKey\. All rights reserved\./i)).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('links Terms of Service in the footer to /terms and navigates to TermsOfServicePage when clicked', () => {
      render(<App />);
      const termsLink = screen.getByRole('link', { name: /Terms of Service/i });
      expect(termsLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute('href', '/terms');

      fireEvent.click(termsLink);

      expect(window.location.pathname).toBe('/terms');
      expect(screen.getByRole('heading', { level: 1, name: /Terms of Service/i })).toBeInTheDocument();
      expect(screen.getByText(/October 27, 2026/i)).toBeInTheDocument();
      expect(screen.getByText(/Mykrolabs Pty Ltd \(ACN 655 532 086 \/ ABN 23 655 532 086\)/i)).toBeInTheDocument();
    });

    it('renders TermsOfServicePage when directly visiting /terms path or #/terms hash', () => {
      window.history.pushState({}, '', '/terms');
      render(<App />);

      expect(screen.getByRole('heading', { level: 1, name: /Terms of Service/i })).toBeInTheDocument();
      expect(screen.getByText(/6\.3 Renewals & Price Increases:/i)).toBeInTheDocument();
    });

    it('links Privacy Policy in the footer to /privacy and navigates to PrivacyPolicyPage when clicked', () => {
      render(<App />);
      const privacyLink = screen.getByRole('link', { name: /Privacy Policy/i });
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute('href', '/privacy');

      fireEvent.click(privacyLink);

      expect(window.location.pathname).toBe('/privacy');
      expect(screen.getByRole('heading', { level: 1, name: /Privacy Policy/i })).toBeInTheDocument();
      expect(screen.getByText(/October 27, 2026/i)).toBeInTheDocument();
      expect(screen.getByText(/Privacy Act 1988 \(Cth\)/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /www\.oaic\.gov\.au/i })).toHaveAttribute('href', 'https://www.oaic.gov.au');
    });

    it('renders PrivacyPolicyPage when directly visiting /privacy path', () => {
      window.history.pushState({}, '', '/privacy');
      render(<App />);

      expect(screen.getByRole('heading', { level: 1, name: /Privacy Policy/i })).toBeInTheDocument();
      expect(screen.getByText(/3\. Cloud Data Sovereignty, Sub-Processors & Cross-Border Disclosure \(APP 8\)/i)).toBeInTheDocument();
    });

    it('links Security & Data Ownership in the footer to /security and navigates to SecurityPage when clicked', () => {
      render(<App />);
      const securityLink = screen.getByRole('link', { name: /Security & Data Ownership/i });
      expect(securityLink).toBeInTheDocument();
      expect(securityLink).toHaveAttribute('href', '/security');

      fireEvent.click(securityLink);

      expect(window.location.pathname).toBe('/security');
      expect(
        screen.getByRole('heading', { level: 1, name: /Your Building’s History Belongs to Your Building—Period\./i })
      ).toBeInTheDocument();
      expect(screen.getByText(/1\. 100% Customer & Scheme Data Sovereignty/i)).toBeInTheDocument();
      expect(screen.getByText(/Karla Lukic/i)).toBeInTheDocument();
    });

    it('renders SecurityPage when directly visiting /security path', () => {
      window.history.pushState({}, '', '/security');
      render(<App />);

      expect(
        screen.getByRole('heading', { level: 1, name: /Your Building’s History Belongs to Your Building—Period\./i })
      ).toBeInTheDocument();
      expect(screen.getByText(/2\. Australian Primary Data Residency & Enterprise Cloud Security/i)).toBeInTheDocument();
    });
  });
});
