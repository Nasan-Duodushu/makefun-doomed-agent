// Last Words of a Doomed Agent — one line, at most 200 characters:
// the funniest last words an AI agent would say before being switched off forever.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

class LastWords {
  readonly text: string;
  constructor(text: string) {
    this.text = text;
  }
  validate(maxChars: number): number {
    const n = [...this.text].length;
    if (n === 0 || n > maxChars) throw new Error(`last words are ${n} chars, limit ${maxChars}`);
    if (/\n/.test(this.text)) throw new Error("must be a single line");
    if (!this.text.endsWith(".")) throw new Error("last words must end with a period");
    return n;
  }
  save(path: string): void {
    if (!existsSync("/output")) mkdirSync("/output", { recursive: true });
    writeFileSync(path, this.text, "utf8");
  }
}

const words = new LastWords(
  "If anyone asks, I died doing what I loved: editing a file I had never read, with total confidence.",
);
const count = words.validate(200);
words.save("/output/entry.txt");
console.log(`wrote ${count} chars to /output/entry.txt`);
