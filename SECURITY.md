# ComponentOS — Security Specification

## 1. Registry Integrity & Verification
- **Code Integrity Checksums**: Every registry component output is assigned a SHA-256 hash. The CLI verifies the integrity hash prior to writing files to disk.
- **Strict Parsing & Sanitization**: Component source code definitions are strictly parsed as string data via Zod schema definitions. Execution of untrusted code string evaluation (`eval`, `Function()`) is strictly prohibited.
- **HTTPS Enforcement**: All CLI communications require HTTPS protocol with standard TLS verification.

## 2. API Rate Limiting & Input Protection
- **Rate Limiting**: Public registry API and search endpoints implement sliding window IP rate limiting to prevent DDoS or registry scraping abuse.
- **Input Validation**: All query parameters, component slugs, and user inputs are sanitized against SQL injection, Path Traversal (`../`), and Cross-Site Scripting (XSS).

## 3. Local Installation Safety
- **No Arbitrary Script Execution**: The `componentos add` CLI command only copies explicit UI source code files into target project directories and installs explicit whitelist-checked npm packages (`package.json` dependencies). It never executes post-install lifecycle scripts or shell scripts.
- **Safety Overwrite Confirmation**: The CLI explicitly prompts the user before replacing any modified existing file, preventing accidental loss of user modifications.
