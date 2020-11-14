export default function diffAreaString(start: string, end?: string) {
  if (typeof end === 'undefined') return start;
  const [prs, pcs, pre, pce] = start?.split(' / ');
  const [crs, ccs, cre, cce] = end.split(' / ');

  return [
    prs <= crs ? prs : crs,
    pcs <= ccs ? pcs : ccs,
    pre >= cre ? pre : cre,
    pce >= cce ? pce : cce,
  ].join(' / ');
}
