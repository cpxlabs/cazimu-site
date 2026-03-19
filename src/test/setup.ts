import '@testing-library/jest-dom/vitest'

class IntersectionObserverMock {
  root: Element | null = null
  rootMargin = ''
  thresholds: number[] = []

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})
