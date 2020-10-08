export function percentage(a, b) {
  let c = b - a;
  c *= 100;
  c /= a;
  return c.toFixed(2);
}
