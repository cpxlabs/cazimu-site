import { describe, it, expect } from 'vitest'
import { shuffleUnique } from './shuffleUnique'

describe('shuffleUnique', () => {
  it('returns all items when there are no duplicates', () => {
    const items = [
      { slug: 'a', name: 'Alpha' },
      { slug: 'b', name: 'Beta' },
      { slug: 'c', name: 'Gamma' },
    ]
    const result = shuffleUnique(items, (i) => i.slug)
    expect(result).toHaveLength(3)
    expect(result.map((i) => i.slug).sort()).toEqual(['a', 'b', 'c'])
  })

  it('removes duplicate entries keeping only the first occurrence', () => {
    const items = [
      { slug: 'a', name: 'Alpha' },
      { slug: 'b', name: 'Beta' },
      { slug: 'a', name: 'Alpha duplicate' },
    ]
    const result = shuffleUnique(items, (i) => i.slug)
    expect(result).toHaveLength(2)
    expect(result.find((i) => i.slug === 'a')?.name).toBe('Alpha')
  })

  it('does not mutate the original array', () => {
    const items = [
      { slug: 'x', name: 'X' },
      { slug: 'y', name: 'Y' },
    ]
    const original = [...items]
    shuffleUnique(items, (i) => i.slug)
    expect(items).toEqual(original)
  })

  it('returns an empty array for empty input', () => {
    expect(shuffleUnique([], (i: { slug: string }) => i.slug)).toEqual([])
  })

  it('returns a single item unchanged', () => {
    const items = [{ slug: 'only', name: 'Only' }]
    expect(shuffleUnique(items, (i) => i.slug)).toEqual(items)
  })
})
