Local testing for ComponentOS CLI

To test the CLI locally from another project without publishing to npm, use either `npm link` or `npm pack`.

1) Using npm link

- In this repository (ComponentOS), run:

```bash
npm link
```

- In your target project, run:

```bash
npm link componentos
npx componentos add button
```

2) Using npm pack (recommended for isolated testing)

- From ComponentOS root, create a tarball:

```bash
npm pack
# produces componentos-1.0.0.tgz
```

- From your target project, run:

```bash
npx ./path/to/componentos-1.0.0.tgz add button
```

Notes
- The CLI is implemented at `bin/componentos.js` and the installer logic is in `cli/index.js`.
- If you see `npm ERR! 404 Not Found` when running `npx componentos`, the package is not published to the npm registry; use one of the local testing approaches above.
- When adding components, the CLI will create files under `components/` and attempt to `npm install` any missing runtime dependencies.
- Use `npx componentos init` to create a default `componentos.json` tailored to your project structure.
