import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Automatically clean up rendered DOM and reset mocks after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// 1. Mock IntersectionObserver for motion/react whileInView
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
    this.callback = callback;
  }

  observe(target: Element): void {
    // Immediately invoke callback with isIntersecting = true so whileInView triggers in JSDOM
    this.callback(
      [
        {
          isIntersecting: true,
          target,
          intersectionRatio: 1,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ],
      this
    );
  }

  unobserve(_target: Element): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// 2. Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element): void {
    this.callback(
      [
        {
          target,
          contentRect: target.getBoundingClientRect(),
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: [],
        } as unknown as ResizeObserverEntry,
      ],
      this
    );
  }

  unobserve(_target: Element): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// 3. Mock window.scrollTo and window.scroll
window.scrollTo = vi.fn();
window.scroll = vi.fn();

// 4. Mock Element.prototype.scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// 5. Mock navigator.clipboard
export const mockClipboard = {
  writeText: vi.fn().mockImplementation(() => Promise.resolve()),
  readText: vi.fn().mockImplementation(() => Promise.resolve('')),
};

Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
  configurable: true,
});

// 6. Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
