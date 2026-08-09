const shortWords = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
  "birge",
  "da",
  "de",
  "jäne",
  "men",
  "pen",
  "üshin",
]);

function normalizedWord(word: string) {
  return word.toLocaleLowerCase().replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
}

export function bindShortWords(text: string) {
  const words = text.trim().split(/\s+/);

  return words
    .map((word, index) => {
      if (index === words.length - 1) return word;
      return `${word}${shortWords.has(normalizedWord(word)) ? "\u00a0" : " "}`;
    })
    .join("");
}

export function groupShortWords(text: string) {
  const words = text.trim().split(/\s+/);
  const groups: string[] = [];

  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    if (index < words.length - 1 && shortWords.has(normalizedWord(word))) {
      groups.push(`${word}\u00a0${words[index + 1]}`);
      index += 1;
    } else {
      groups.push(word);
    }
  }

  return groups;
}
