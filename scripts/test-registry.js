const fs = require("fs");
const path = require("path");

console.log("=== ComponentOS Registry Automated Validation Pipeline ===");

const registryPath = path.join(__dirname, "..", "registry", "index.ts");
if (!fs.existsSync(registryPath)) {
  console.error("✖ Registry file missing!");
  process.exit(1);
}

const content = fs.readFileSync(registryPath, "utf8");

// Assert presence of core primitives
const requiredSlugs = ["button", "badge", "avatar", "input", "switch", "card", "dialog", "data-table", "ai-chat", "dashboard"];
let passed = true;

requiredSlugs.forEach((slug) => {
  if (content.includes(`slug: "${slug}"`) || content.includes(`"${slug}":`)) {
    console.log(`✔ Registry item validated: ${slug}`);
  } else {
    console.error(`✖ Missing registry item: ${slug}`);
    passed = false;
  }
});

if (passed) {
  console.log("\n✔ All 10 core registry component schemas passed validation!\n");
} else {
  console.error("\n✖ Registry validation failed.\n");
  process.exit(1);
}
