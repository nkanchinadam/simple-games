export function indexToRow(index: number): number {
  return Math.floor(index / 9);
}

export function indexToCol(index: number): number {
  return index % 9;
}

export function indexToSection(index: number): number {
  return Math.floor(index / 27) * 3 + Math.floor(index / 3) % 3;
}

export function sectionToTopLeft(section: number): number {
  return Math.floor(section / 3) * 27 + (section % 3) * 3;
}

export function sectionIndexToSquareNum(topLeft: number, index: number): number {
  return topLeft + Math.floor(index / 3) * 9 + (index % 3);
}