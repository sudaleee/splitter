const { splitBySentence } = require("./splitter.js");

test("splt pargraph", () => {
  const result = splitBySentence("Hello World! Hello World2");

  expect(result).toStrictEqual(["Hello World!", "Hello World2"]);
});

test("has (e.g)", () => {
  const result = splitBySentence(
    "Some beginning researchers mistakenly believe that a good hypothesis is one that is guaranteed to be right (e.g., alcohol will slow down reaction time). However, if we already know your hypothesis is true before you test it, testing your hypothesis won’t tell us anything new. Remember, research is supposed to produce new knowledge."
  );

  expect(result).toStrictEqual([
    "Some beginning researchers mistakenly believe that a good hypothesis is one that is guaranteed to be right (e.g., alcohol will slow down reaction time).",
    "However, if we already know your hypothesis is true before you test it, testing your hypothesis won’t tell us anything new.",
    "Remember, research is supposed to produce new knowledge.",
  ]);
});

test("has bracke", () => {
  const result = splitBySentence(
    "To get new knowledge, you, as a researcher- explorer, need to leave the safety of the shore (established facts) and venture into uncharted waters (as Einstein said, “If we knew what we were doing, it would not be called research, would it?”). If your predictions about what will happen in these uncharted waters are wrong, that’s okay: Scientists are allowed to make mistakes (as Bates said, “Research is the process of going up alleys to see if they are blind”). Indeed, scientists often learn more from predictions that do not turn out than from those that do."
  );

  expect(result).toStrictEqual([
    "To get new knowledge, you, as a researcher- explorer, need to leave the safety of the shore (established facts) and venture into uncharted waters (as Einstein said, “If we knew what we were doing, it would not be called research, would it?”).",
    "If your predictions about what will happen in these uncharted waters are wrong, that’s okay: Scientists are allowed to make mistakes (as Bates said, “Research is the process of going up alleys to see if they are blind”).",
    "Indeed, scientists often learn more from predictions that do not turn out than from those that do.",
  ]);
});

test("only number", () => {
  const result = splitBySentence(12345);

  expect(result).toStrictEqual(["12345"]);
});

test("has new Line", () => {
  const result = splitBySentence("Hello \nworld!!\nTest!!");

  expect(result).toStrictEqual(["Hello  world!!", "Test!!"]);
});

test("has question mark", () => {
  const result = splitBySentence(
    "Why bother when the information would be better retained by the wine expert sitting next to you? If your friend wasn’t around, you might try harder. After all, it would be good to know what a good wine would be for the evening’s festivities. But your friend, the wine expert, is likely to remember the information without even trying."
  );

  expect(result).toStrictEqual([
    "Why bother when the information would be better retained by the wine expert sitting next to you?",
    "If your friend wasn’t around, you might try harder.",
    "After all, it would be good to know what a good wine would be for the evening’s festivities.",
    "But your friend, the wine expert, is likely to remember the information without even trying.",
  ]);
});
