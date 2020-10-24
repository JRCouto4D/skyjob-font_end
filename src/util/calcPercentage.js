export function percentage(a, b) {
  let c = b - a;
  c *= 100;
  c /= a;
  return c.toFixed(2);
}

export function percentage2(a, b) {
  const c = b.toFixed(2) * 100;
  const d = c / a.toFixed(2);
  const e = 100 - d;
  return e.toFixed(1);
}
