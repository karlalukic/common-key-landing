declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
    });

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    if (typeof window.clarity === 'function') {
      window.clarity('event', eventName);
    }
  } catch {
    // Analytics must never interrupt user interactions
  }
}

export function trackPricingClick(source: string): void {
  trackEvent('pricing_click', { source });
}

export function trackCalculatorInteraction(
  action: 'input_change' | 'slider_change' | 'preset_click' | 'copy_proposal' | 'claim_rate_click',
  lotsCount: number,
  annualCost: number
): void {
  trackEvent('calculator_interaction', {
    action,
    lots_count: lotsCount,
    annual_cost: annualCost,
  });
}

export function trackWalkthroughClick(source: string): void {
  trackEvent('walkthrough_cta_click', { source });
}

export function trackScrollDepth(depthPercent: number): void {
  trackEvent('scroll_depth', { depth_percent: depthPercent });
}
