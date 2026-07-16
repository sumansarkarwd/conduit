export function parsePagination(q: any) {
  const limit = Math.min(Math.max(Number(q.limit ?? 20) || 20, 1), 100);
  const offset = Math.max(Number(q.offset ?? 0) || 0, 0);
  return { limit, offset };
}
