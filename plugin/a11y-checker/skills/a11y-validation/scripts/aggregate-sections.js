#!/usr/bin/env node
import fs from "fs";
import path from "path";

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error("Usage: aggregate-sections.js <sessionDir>");
  process.exit(1);
}

const sectionsDir = path.join(sessionDir, "sections");
if (!fs.existsSync(sectionsDir)) {
  console.error(`Sections directory not found: ${sectionsDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(sectionsDir)
  .filter((f) => f.endsWith(".json"))
  .sort();

const SEV_ORDER = { critical: 0, major: 1, enhancement: 2 };

function normalizeSeverity(sev) {
  if (!sev) return "enhancement";
  const s = sev.toLowerCase();
  if (s.includes("critical")) return "critical";
  if (s === "major") return "major";
  if (s === "enhancement" || s === "minor") return "enhancement";
  return "enhancement";
}

const totals = { checks: 0, passed: 0, failed: 0, skipped: 0 };
const bySeverity = { critical: 0, major: 0, enhancement: 0 };
const sections = [];
const issues = [];

for (const file of files) {
  const data = JSON.parse(
    fs.readFileSync(path.join(sectionsDir, file), "utf8"),
  );

  // Section JSON format (from SKILL.md):
  //   { section, label, total, passed, failed, skipped, issues: [...] }
  // where each issue has: { id, sev, wcag, check, detail, selector }
  const sectionKey = data.section || path.basename(file, ".json");
  const label = data.flow_title || data.label || sectionKey;
  const sectionIssues = data.issues || [];

  const secTotal = data.total || 0;
  const secPassed = data.passed || 0;
  const secFailed = data.failed || 0;
  const secSkipped = data.skipped || 0;

  const sec = {
    key: sectionKey,
    label,
    total: secTotal,
    passed: secPassed,
    failed: secFailed,
    skipped: secSkipped,
    critical: 0,
    major: 0,
    enhancement: 0,
  };

  totals.checks += secTotal;
  totals.passed += secPassed;
  totals.failed += secFailed;
  totals.skipped += secSkipped;

  for (const issue of sectionIssues) {
    const sev = normalizeSeverity(issue.sev);
    bySeverity[sev]++;
    sec[sev]++;

    issues.push({
      id: issue.id || "",
      sev,
      wcag: issue.wcag || "",
      section: sectionKey,
      check: issue.check || "",
      detail: issue.detail || "",
      selector: issue.selector || "",
    });
  }

  sections.push(sec);
}

// Sort issues: critical → major → enhancement
issues.sort((a, b) => (SEV_ORDER[a.sev] ?? 3) - (SEV_ORDER[b.sev] ?? 3));

const applicable = totals.checks - totals.skipped;
const compliance =
  applicable > 0
    ? ((totals.passed / applicable) * 100).toFixed(1) + "%"
    : "0.0%";
totals.compliance = compliance;

const summary = { totals, bySeverity, sections, issues };

const outPath = path.join(sessionDir, "summary.json");
fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));

console.log(
  `✓ summary.json written: ${totals.checks} checks, ${issues.length} issues, ${totals.skipped} skipped stripped from issues`,
);

// Remove the sections directory — raw JSONs are no longer needed
fs.rmSync(sectionsDir, { recursive: true, force: true });
console.log(`✓ sections/ directory removed`);
