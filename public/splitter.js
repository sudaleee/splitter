const splitBySentence = (text) => {
  if (/^\d+$/.test(text)) {
    return [text.toString()];
  }

  return split(removeNewLine(text));
};

const split = (text) => {
  if (/^\d+$/.test(text)) {
    return [text.toString()];
  }

  return text
    .split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/g)
    .filter((c) => c !== null && c.length !== 0);
};

const removeNewLine = (text) => {
  return text.replace(/\n/g, " ").trim();
};

module.exports = { splitBySentence };
