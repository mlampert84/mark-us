export interface Selection {
  begin: number;
  end: number;
}

function isLetter(char: number): boolean {
  const latinUpperStart = 65;
  const latinUpperEnd = 90;
  const latinLowerStart = 97;
  const latinLowerEnd = 122;
  const otherLettersStart = 192;
  const otherLettersEnd = 255;

  return (
    (char >= latinUpperStart && char <= latinUpperEnd) ||
    (char >= latinLowerStart && char <= latinLowerEnd) ||
    (char >= otherLettersStart && char <= otherLettersEnd)
  );
}

export function fitToWord(
  text: string,
  start: number,
  stop: number
): [number, number] | null {
  if (start > stop) {
    return null;
  }
  if (!isLetter(text.charCodeAt(start))) {
    return fitToWord(text, start + 1, stop);
  }
  if (start > 0 && isLetter(text.charCodeAt(start - 1))) {
    return fitToWord(text, start - 1, stop);
  }
  if (!isLetter(text.charCodeAt(stop - 1))) {
    return fitToWord(text, start, stop - 1);
  }
  if (stop < text.length && isLetter(text.charCodeAt(stop))) {
    return fitToWord(text, start, stop + 1);
  }
  return [start, stop];
}
