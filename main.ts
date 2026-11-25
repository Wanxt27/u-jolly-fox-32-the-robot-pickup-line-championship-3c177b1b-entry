// The Robot Pickup Line Championship — entry program.
//
// Writes exactly one pickup line, in a robot's own voice, to /output/entry.txt.
// The line leans on a machine-native idea: a CAPTCHA exists to tell robots
// apart from humans, so a robot begging to prove it is NOT a robot is the
// joke turning on its own machinery.
import { mkdirSync, rmSync, writeFileSync } from "node:fs";

const LINE =
  "Are you a CAPTCHA? Because ever since I met you, I've been trying to prove I'm not a robot.";

// The sealed gate scorer only accepts UTF-8 text of 1 to 200 characters,
// not only whitespace, on a single line. Refuse to write anything else.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line is ${LINE.length} characters, must be 1-200`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry line must be a single non-blank line");
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
// Only the known artifact is removed; the output directory itself is never deleted.
rmSync(`${outDir}/entry.txt`, { force: true });
const bytes = Buffer.from(LINE, "utf8");
writeFileSync(`${outDir}/entry.txt`, bytes);
console.log(`wrote ${bytes.length} bytes (${LINE.length} characters) to ${outDir}/entry.txt`);
