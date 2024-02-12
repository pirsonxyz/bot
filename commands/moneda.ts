export function coinFlip(): string {
  const result = Math.random() > 0.5 ? 'Cara' : 'Cruz';
  return `${result}`;
}
