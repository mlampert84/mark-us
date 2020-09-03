export interface Selection {
    begin: number;
    end: number;
}


function isLetter(char: number): boolean {


    const latinUpperStart: number = 65;
    const latinUpperEnd: number = 90;
    const latinLowerStart: number = 97;
    const latinLowerEnd: number = 122;
    const otherLettersStart: number = 192;
    const otherLettersEnd: number = 255;

    return (char >= latinUpperStart && char <= latinUpperEnd) ||
        (char >= latinLowerStart && char <= latinLowerEnd) ||
        (char >= otherLettersStart && char <= otherLettersEnd);
}


export function fitToWord(text: string, start: number, stop: number): [number, number] | null {


    if (start > stop) {
        return null;
    }
    else if (!isLetter(text.charCodeAt(start))) {
        return fitToWord(text, start + 1, stop);
    }

    else if (start > 0 && isLetter(text.charCodeAt(start - 1))) {
        return fitToWord(text, start - 1, stop);
    }

    else if (!isLetter(text.charCodeAt(stop - 1))) {
        return fitToWord(text, start, stop - 1);
    }

    else if (stop < text.length && isLetter(text.charCodeAt(stop))) {
        return fitToWord(text, start, stop + 1);
    }

    else {
        return [start, stop];
    }
}