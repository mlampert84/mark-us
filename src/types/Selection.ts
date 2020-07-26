export interface Selection {
    begin: number;
    end: number;
}


export function fitToWord(text: string, start: number, stop: number): [number, number] | null {

    const spaceChar: number = 32;

    if (start > stop) {
        return null;
    }
    else if (text.charCodeAt(start) === spaceChar) {
        return fitToWord(text, start + 1, stop);
    }

    else if (start > 0 && text.charCodeAt(start - 1) !== spaceChar) {
        return fitToWord(text, start - 1, stop);
    }

    else if (text.charCodeAt(stop - 1) === spaceChar) {
        return fitToWord(text, start, stop - 1);
    }

    else if (stop < text.length && text.charCodeAt(stop) !== spaceChar) {
        return fitToWord(text, start, stop + 1);
    }

    else {
        return [start, stop];
    }
}