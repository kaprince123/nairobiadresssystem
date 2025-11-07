## Contributing

Thank you for your interest in improving the Kenya Address Widget! This project is open source and we welcome issues, ideas, and pull requests from the community.

### Getting started

1. Fork the repository and clone your fork locally.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate the stage dataset (requires the provided CSV in the repo root):
   ```bash
   npm run build:data
   ```
4. Run the demo locally:
   ```bash
   npm run serve:demo
   # visit http://localhost:5500/demo/index.html
   ```

### Project structure

- `widget/` – Source for the `<kenya-address-widget>` component (`address-widget.js` + generated `stages.json`).
- `scripts/` – Utility scripts (e.g., generating stage data from the CSV).
- `demo/` – Demo page showcasing full vs stage-only modes.
- `sql/` – Reference SQL for persisting submissions and stage data.
- `LICENSE` – MIT License (open source friendly).

### Development guidelines

- Use TypeScript or vanilla JS as appropriate; keep the widget framework-agnostic.
- Ensure shadow DOM styles remain encapsulated and accessible.
- If you change the CSV ingestion logic, rerun `npm run build:data` and test the demo.
- For new features, update `README.md` and, if needed, add docs in a `docs/` subsection.

### Conventional commits (optional but appreciated)

We encourage semantic commit messages (e.g., `feat: add county filter`, `fix: stage suggestions for Nairobi`). This makes changelog generation easier.

### Submitting changes

1. Open an issue first if you plan major changes, so we can discuss direction.
2. Create a feature branch (`git checkout -b feat/my-improvement`).
3. Make your changes with tests/demo updates as needed.
4. Ensure linting/build steps pass:
   ```bash
   npm run build:data
   npm run serve:demo   # manual validation
   ```
5. Submit a pull request explaining the motivation and key changes.

### Community expectations

- Be respectful, inclusive, and patient.
- Provide context in issues/PRs so maintainers and other contributors can understand your use case.
- Highlight if a change introduces breaking behaviour or requires documentation updates.

Happy building! Let us know how you’re using the widget—real-world feedback helps guide the roadmap.

