// 160000 -> "160 000 грн" with non-breaking spaces (craft: a unit never wraps away from its figure).
const NBSP = "\u00a0";
export const num = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
export const uah = (n: number): string => `${num(n)}${NBSP}грн`;
