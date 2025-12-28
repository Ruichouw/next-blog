// lib/slug.ts
export function tagToSlug(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, '-')
}
