/**
 * Returns a new array with duplicate items removed (keyed by `getKey`) and
 * the remaining items in a random order (Fisher-Yates shuffle).
 * The original array is never mutated.
 */
export function shuffleUnique<T>(items: T[], getKey: (item: T) => string): T[] {
  const seen = new Set<string>()
  // `unique` is a brand-new array produced by filter, so in-place shuffling is safe.
  const unique = items.filter((item) => {
    const k = getKey(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
  for (let i = unique.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[unique[i], unique[j]] = [unique[j], unique[i]]
  }
  return unique
}
