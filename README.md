# Satzanalysator

## Use Case

The Satzanalysator is a grammar annotation tool. It allows students of German to identify the most important parts of speech in a sentence. It arose from the pedagogical insight that learning to read in German is best accomplished by identifying key parts of speech, namely a verb and the various nouns and pronouns that the verb coordinates, such as the subject, accusative object, dative object, etc.

How to use the application:

- Enter the text you want to annote, or use the example text.
- Click on the part of speech you want to identify.
- Select the word(s) in the text that correspond to that part of speech.

## Technical Information

Built with React, using only Functional Components, and Typescript.

To run locally:

- `npm run start`
- point your browser to `localhost:3000`

## ToDos

For golive

- Make syntax trees to replace table (make x's to remove elements)
- Allow selecting of which svg is active
- Do allow too many POS selections (for example: prediacate nomivate and dative)

Nice to have

- Deal with overlapping selections (just forbid it)
- Change text entry UI (button lower right, maybe flip card)
