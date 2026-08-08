# Sport Sitters — CI Competency Evidence Project

This is a unique capstone-inspired demonstration of **Continuous Integration (CI) with GitHub Actions**.

## Fastest Windows evidence method

1. Install Node.js 20 or newer if needed.
2. Extract this ZIP.
3. Open the extracted folder.
4. Double-click `RUN_EVIDENCE_WINDOWS.cmd`.

Or open Command Prompt in this folder and run:

```bat
npm ci
npm run verify
```

The verification command performs:

- JavaScript syntax validation
- 8 automated tests
- generation of a real local evidence report

After it finishes, open:

`evidence/ci-evidence.html`

Take a screenshot of:
1. the terminal showing all tests passing;
2. the generated evidence page.

## GitHub Actions evidence

The repository already contains:

`.github/workflows/ci.yml`

Create a GitHub repository and push this entire folder. GitHub Actions will automatically run the same checks using Node.js 20 and Node.js 22.

After the workflow finishes:
1. Open the repository's **Actions** tab.
2. Open the latest `Sport Sitters CI Evidence` run.
3. Take a screenshot showing both matrix jobs passing.
4. Open one job and expand `Run automated tests`; take a screenshot of the passing output.

That screenshot is genuine GitHub CI evidence. It cannot be pre-generated because it must come from your repository run.

## What the code demonstrates

The module models a Sport Sitters-inspired booking-chat inactivity policy:
- default inactivity threshold: 36 hours;
- future booking detection can keep a session active;
- custom inactivity thresholds are supported;
- invalid inputs are rejected;
- automated tests validate the behavior.

The important competency is not merely writing the JavaScript. It is setting up repeatable automated checks that run locally and automatically in GitHub Actions whenever code changes.
