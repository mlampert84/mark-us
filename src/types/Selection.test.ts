import { fitToWord } from "./Selection"

interface testUnit {
    input: [string, number, number];
    output: [number, number] | null;
}
const test1: testUnit = {
    input: [" test ", 0, 2],
    output: [1, 5]
}

const test2: testUnit = {
    input: [" test ", 0, 6],
    output: [1, 5]
}

test("cuts off empty space", () => {
    expect(fitToWord(...test1.input)).toStrictEqual(test1.output);
    expect(fitToWord(...test2.input)).toStrictEqual(test2.output);

})

const test3: testUnit = {
    input: [" test ", 2, 4],
    output: [1, 5]
}

const test4: testUnit = {
    input: [" test multiple words", 2, 9],
    output: [1, 14]
}

const test5: testUnit = {
    input: [" test multiple words", 2, 15],
    output: [1, 14]
}

const test6: testUnit = {
    input: [" test multiple words", 2, 17],
    output: [1, 20]
}

test("fills out word(s)", () => {
    expect(fitToWord(...test3.input)).toStrictEqual(test3.output);
    expect(fitToWord(...test4.input)).toStrictEqual(test4.output);
    expect(fitToWord(...test5.input)).toStrictEqual(test5.output);
    expect(fitToWord(...test6.input)).toStrictEqual(test6.output);


})

const test7: testUnit = {
    input: [" test", 0, 1],
    output: null
}

test("no letters selected return null", () => {
    expect(fitToWord(...test7.input)).toStrictEqual(test7.output);
})
