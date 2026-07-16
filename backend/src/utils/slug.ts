export function slugify(title: string) {
  const base = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return base || 'article';
}
export function uniqueSlug(title: string) { return `${slugify(title)}-${Math.random().toString(36).slice(2, 8)}`; }
