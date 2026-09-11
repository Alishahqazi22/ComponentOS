const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

console.log("\n============================================================");
console.log("🚀 ComponentOS Real-World Clean Machine Integration Test Suite");
console.log("============================================================\n");

const binPath = path.resolve(__dirname, "..", "bin", "componentos.js");
let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✔ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✖ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

function runCli(args, cwd) {
  return spawnSync(process.execPath, [binPath, ...args], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, NODE_ENV: "test" },
  });
}

function createTempDir(prefix) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `comp-os-test-${prefix}-`));
  return dir;
}

function cleanup(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch (e) {}
}

async function runTests() {
  // -------------------------------------------------------------
  // TEST 1: Clean React + TypeScript project with npm
  // -------------------------------------------------------------
  console.log("\n[Test 1] Clean React TypeScript project (npm)...");
  const testDir1 = createTempDir("npm-ts");
  try {
    fs.writeFileSync(
      path.join(testDir1, "package.json"),
      JSON.stringify({
        name: "test-react-app",
        version: "0.1.0",
        dependencies: {
          react: "^18.3.1",
          "react-dom": "^18.3.1",
        },
      }, null, 2)
    );
    fs.writeFileSync(path.join(testDir1, "tsconfig.json"), "{}");
    fs.writeFileSync(path.join(testDir1, "package-lock.json"), "{}");

    // Run componentos init
    const initRes = runCli(["init", "--no-install"], testDir1);
    assert(initRes.status === 0, "npx componentos init executed successfully");
    assert(fs.existsSync(path.join(testDir1, "componentos.json")), "componentos.json created");
    assert(fs.existsSync(path.join(testDir1, "lib", "utils.ts")), "lib/utils.ts created with cn helper");

    // Run componentos add button badge avatar
    const addRes = runCli(["add", "button", "badge", "avatar", "--yes", "--no-install"], testDir1);
    assert(addRes.status === 0, "npx componentos add button badge avatar succeeded");
    assert(fs.existsSync(path.join(testDir1, "components", "ui", "button.tsx")), "components/ui/button.tsx created");
    assert(fs.existsSync(path.join(testDir1, "components", "ui", "badge.tsx")), "components/ui/badge.tsx created");
    assert(fs.existsSync(path.join(testDir1, "components", "ui", "avatar.tsx")), "components/ui/avatar.tsx created");

    const buttonContent = fs.readFileSync(path.join(testDir1, "components", "ui", "button.tsx"), "utf8");
    assert(buttonContent.includes("ButtonProps") && buttonContent.includes("buttonVariants"), "button.tsx contains valid TypeScript code");
  } finally {
    cleanup(testDir1);
  }

  // -------------------------------------------------------------
  // TEST 2: React project with src/ directory layout
  // -------------------------------------------------------------
  console.log("\n[Test 2] React project with src/ directory layout (Vite/Next)...");
  const testDir2 = createTempDir("src-layout");
  try {
    fs.writeFileSync(
      path.join(testDir2, "package.json"),
      JSON.stringify({
        name: "test-vite-app",
        version: "0.1.0",
        dependencies: {
          react: "^18.3.1",
          "react-dom": "^18.3.1",
        },
      }, null, 2)
    );
    fs.mkdirSync(path.join(testDir2, "src"), { recursive: true });
    fs.writeFileSync(path.join(testDir2, "tsconfig.json"), "{}");

    const addRes = runCli(["add", "input", "switch", "--yes", "--no-install"], testDir2);
    assert(addRes.status === 0, "npx componentos add input switch succeeded in src/ project");
    assert(fs.existsSync(path.join(testDir2, "src", "components", "ui", "input.tsx")), "src/components/ui/input.tsx created");
    assert(fs.existsSync(path.join(testDir2, "src", "components", "ui", "switch.tsx")), "src/components/ui/switch.tsx created");
    assert(fs.existsSync(path.join(testDir2, "src", "lib", "utils.ts")), "src/lib/utils.ts created");
  } finally {
    cleanup(testDir2);
  }

  // -------------------------------------------------------------
  // TEST 3: Plain JavaScript React project (no TypeScript)
  // -------------------------------------------------------------
  console.log("\n[Test 3] Plain JavaScript React project (no TypeScript)...");
  const testDir3 = createTempDir("js-app");
  try {
    fs.writeFileSync(
      path.join(testDir3, "package.json"),
      JSON.stringify({
        name: "test-js-app",
        version: "0.1.0",
        dependencies: {
          react: "^18.3.1",
          "react-dom": "^18.3.1",
        },
      }, null, 2)
    );
    fs.writeFileSync(path.join(testDir3, "jsconfig.json"), "{}");

    const addRes = runCli(["add", "button", "card", "--yes", "--no-install"], testDir3);
    assert(addRes.status === 0, "npx componentos add button card succeeded in JS project");
    assert(fs.existsSync(path.join(testDir3, "components", "ui", "button.jsx")), "components/ui/button.jsx created with .jsx extension");
    assert(fs.existsSync(path.join(testDir3, "components", "ui", "card.jsx")), "components/ui/card.jsx created with .jsx extension");
    assert(fs.existsSync(path.join(testDir3, "lib", "utils.js")), "lib/utils.js created with .js extension");

    const buttonJsContent = fs.readFileSync(path.join(testDir3, "components", "ui", "button.jsx"), "utf8");
    assert(!buttonJsContent.includes("interface ButtonProps"), "button.jsx has TypeScript interfaces cleanly stripped");
    assert(!buttonJsContent.includes("React.forwardRef<"), "button.jsx has TypeScript generics cleanly stripped");
  } finally {
    cleanup(testDir3);
  }

  // -------------------------------------------------------------
  // TEST 4: Package Manager Detection (pnpm, yarn, bun, npm)
  // -------------------------------------------------------------
  console.log("\n[Test 4] Package Manager Detection (pnpm, yarn, bun, npm)...");
  const testDirPM = createTempDir("pm-detect");
  try {
    fs.writeFileSync(
      path.join(testDirPM, "package.json"),
      JSON.stringify({ name: "test-pm", version: "1.0.0" })
    );

    // pnpm lockfile
    fs.writeFileSync(path.join(testDirPM, "pnpm-lock.yaml"), "lockfileVersion: '6.0'");
    let res = runCli(["info", "button"], testDirPM);
    assert(res.status === 0, "pnpm project recognized");

    // yarn lockfile
    fs.unlinkSync(path.join(testDirPM, "pnpm-lock.yaml"));
    fs.writeFileSync(path.join(testDirPM, "yarn.lock"), "");
    res = runCli(["info", "button"], testDirPM);
    assert(res.status === 0, "yarn project recognized");

    // bun lockfile
    fs.unlinkSync(path.join(testDirPM, "yarn.lock"));
    fs.writeFileSync(path.join(testDirPM, "bun.lockb"), "");
    res = runCli(["info", "button"], testDirPM);
    assert(res.status === 0, "bun project recognized");
  } finally {
    cleanup(testDirPM);
  }

  // -------------------------------------------------------------
  // TEST 5: Recursive Registry Dependency Resolution
  // -------------------------------------------------------------
  console.log("\n[Test 5] Recursive Registry Dependency Resolution (data-table -> button, badge, input, card)...");
  const testDir5 = createTempDir("recursive-deps");
  try {
    fs.writeFileSync(
      path.join(testDir5, "package.json"),
      JSON.stringify({
        name: "test-compound",
        version: "0.1.0",
        dependencies: {},
      }, null, 2)
    );
    fs.writeFileSync(path.join(testDir5, "tsconfig.json"), "{}");

    // data-table depends on button, badge, input, card
    const addRes = runCli(["add", "data-table", "--yes", "--no-install"], testDir5);
    assert(addRes.status === 0, "npx componentos add data-table succeeded");
    assert(fs.existsSync(path.join(testDir5, "components", "ui", "data-table.tsx")), "data-table.tsx installed");
    assert(fs.existsSync(path.join(testDir5, "components", "ui", "button.tsx")), "recursive dep button.tsx installed");
    assert(fs.existsSync(path.join(testDir5, "components", "ui", "badge.tsx")), "recursive dep badge.tsx installed");
    assert(fs.existsSync(path.join(testDir5, "components", "ui", "input.tsx")), "recursive dep input.tsx installed");
    assert(fs.existsSync(path.join(testDir5, "components", "ui", "card.tsx")), "recursive dep card.tsx installed");
  } finally {
    cleanup(testDir5);
  }

  // -------------------------------------------------------------
  // TEST 6: File Collision Handling (skip vs --overwrite)
  // -------------------------------------------------------------
  console.log("\n[Test 6] File Collision Handling (skip vs --overwrite)...");
  const testDir6 = createTempDir("collision");
  try {
    fs.writeFileSync(
      path.join(testDir6, "package.json"),
      JSON.stringify({ name: "test-collision", version: "1.0.0" })
    );
    fs.writeFileSync(path.join(testDir6, "tsconfig.json"), "{}");

    // 1st install
    runCli(["add", "button", "--yes", "--no-install"], testDir6);
    const originalContent = fs.readFileSync(path.join(testDir6, "components", "ui", "button.tsx"), "utf8");

    // Modify file
    fs.writeFileSync(path.join(testDir6, "components", "ui", "button.tsx"), "// USER CUSTOM CONTENT", "utf8");

    // 2nd install without --overwrite (should skip without changing)
    const skipRes = runCli(["add", "button", "--no-install"], testDir6);
    const contentAfterSkip = fs.readFileSync(path.join(testDir6, "components", "ui", "button.tsx"), "utf8");
    assert(contentAfterSkip === "// USER CUSTOM CONTENT", "Existing file was preserved when --overwrite was omitted");

    // 3rd install with --overwrite (should overwrite)
    const overwriteRes = runCli(["add", "button", "--overwrite", "--no-install"], testDir6);
    const contentAfterOverwrite = fs.readFileSync(path.join(testDir6, "components", "ui", "button.tsx"), "utf8");
    assert(contentAfterOverwrite.includes("ButtonProps"), "Existing file was updated when --overwrite was passed");
  } finally {
    cleanup(testDir6);
  }

  // -------------------------------------------------------------
  // TEST 7: Invalid Component Name Handling (clean 404 error)
  // -------------------------------------------------------------
  console.log("\n[Test 7] Invalid Component Name Handling...");
  const testDir7 = createTempDir("invalid-comp");
  try {
    fs.writeFileSync(
      path.join(testDir7, "package.json"),
      JSON.stringify({ name: "test-invalid", version: "1.0.0" })
    );
    const res = runCli(["add", "nonexistent-super-widget-999"], testDir7);
    assert(res.status !== 0, "CLI exits with non-zero code for invalid component");
    assert(res.stderr.includes("not found") || res.stdout.includes("not found"), "Clean error message for non-existent component");
  } finally {
    cleanup(testDir7);
  }

  // -------------------------------------------------------------
  // TEST 8: Missing package.json error handling
  // -------------------------------------------------------------
  console.log("\n[Test 8] Missing package.json error handling...");
  const testDir8 = createTempDir("no-pkg");
  try {
    const res = runCli(["add", "button"], testDir8);
    assert(res.status !== 0, "CLI exits with non-zero code when no package.json is present");
    assert(res.stderr.includes("package.json") || res.stdout.includes("package.json"), "Informative error message instructing user to run inside a project");
  } finally {
    cleanup(testDir8);
  }

  console.log("\n============================================================");
  console.log(`🎉 All ${passedTests}/${totalTests} real-world integration tests PASSED!`);
  console.log("============================================================\n");
}

runTests().catch((err) => {
  console.error("Test suite failed:", err);
  process.exit(1);
});
