export type FixSuggestion = {
  description: string;
  before: string;
  after: string;
};

export function autoFix(code: string, language: string): { fixed: string; suggestions: FixSuggestion[] } {
  let out = code;
  const suggestions: FixSuggestion[] = [];
  const record = (desc: string, prev: string, next: string) => {
    if (prev !== next) suggestions.push({ description: desc, before: prev, after: next });
  };

  const prev1 = out;
  // 1) var -> let/const (simple: if assigned later use let, else const)
  out = out.replace(/\bvar\s+(\w+)\s*=([^;]+);/g, (m, v, rhs) => {
    return `let ${v} = ${rhs};`;
  });
  record("Replace var with let/const", prev1, out);

  const prev2 = out;
  // 2) == -> === and != -> !== for JS/TS
  if (["javascript", "typescript", "php"].includes(language.toLowerCase())) {
    out = out.replace(/([^=])==([^=])/g, "$1===$2");
    out = out.replace(/!==(?![=])/g, "!==");
    out = out.replace(/!=([^=])/g, "!==$1");
  }
  record("Use strict equality", prev2, out);

  const prev3 = out;
  // 3) Trim trailing whitespace
  out = out
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+$/g, ""))
    .join("\n");
  record("Remove trailing whitespace", prev3, out);

  const prev4 = out;
  // 4) Suggest splitting very long lines (wrap at ~100 chars)
  out = out
    .split(/\r?\n/)
    .flatMap((l) => (l.length > 120 ? [l.slice(0, 100) + " \\", l.slice(100)] : [l]))
    .join("\n");
  record("Wrap very long lines", prev4, out);

  const prev5 = out;
  // 5) Rust unwrap hint: comment suggestion
  if (language.toLowerCase() === "rust") {
    out = out.replace(/unwrap\(\)/g, "expect(\"handle error\")");
  }
  record("Replace unwrap() with expect()", prev5, out);

  return { fixed: out, suggestions };
}
