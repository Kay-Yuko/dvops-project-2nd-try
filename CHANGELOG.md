# Changelog
All notable changes to SJK Pet Adoption, the team's DevOps Essentials web application, are documented here. Versions follow the vMAJOR.MINOR.PATCH tag format.

## [Unreleased]
### [v1.0.0] - 2026-11-21
#### Project Part 1 Final Release
This release consolidates the team's Pet Adoption Website features, JSON data storage, code maintenance improvements and source code management practices. It builds on the initial v0.1.0 repository setup.

#### Added
Pet listing and details
- Added dynamically generated animal listings using GET /view-resources.
- Added animal-specific details pages using GET /view-resources/:id.
- Added animal names, photos, descriptions, species, breeds, ages, genders and adoption statuses to the application interface.
- Added handling for empty animal listings and missing animal records.

Animal creation and editing
- Added the Add Animal form and POST /add-resource endpoint (JoenChow07).
- Added the Edit Animal form and PUT /edit-resource/:id endpoint (Kay-Yuko).
- Added species-dependent breed options in the Add and Edit forms.
- Added UUID generation for new animal records and persistent updates to JSON storage.
- Added backend validation for required fields, supported dropdown values and species–breed combinations.

Pet filtering and deletion
- Added pet searching and filtering by name, gender, age, species and breed, including combined criteria (Samuelykw).
- Added GET /filter-resources, backend query validation, case-insensitive partial name search, dynamic results and a Clear Filters action.
- Added no-results and error messages for filtering.
- Added animal deletion using DELETE /delete-resource/:id, with confirmation, ID validation, JSON persistence and success/error feedback (Samuelykw).

Role-switching demonstration
- Added a User/Admin interface switch with role state stored in browser sessionStorage.
- Added verifyAdmin middleware to check a role identifier sent with Create, Edit and Delete API requests.
- Scope: This is a classroom role-switching demonstration; the client-supplied roleId header is not a secure authentication or authorization mechanism for production use.

Source code management and DevOps
- Updated CODEOWNERS assignments for renamed frontend, backend, JSON and configuration files (PR #41).
- Added Git branching conventions, pull request review guidelines, a pull request template, commit-message checking and whitespace checks.
- Added .gitkeep files to preserve otherwise-empty repository folders.
- Demonstrated a merge-conflict exercise using competing documentation branches (PRs #26–#28).
- Recorded feature contributions and development milestones in GitHub issues, pull requests and this changelog.

#### Changed
- Reorganised frontend code into public/js/students.js, public/js/joen-chow.js, public/js/kayden-tan.js and public/js/samuel-yeo.js (PR #38).
- Reorganised backend code into utils/StudentsUtil.js, utils/JoenChowUtil.js, utils/KaydenTanUtil.js and utils/SamuelYeoUtil.js, with shared role-checking middleware in utils/StudentsAuth.js.
- Renamed the JSON data store and template to utils/students.json and utils/students.template.json; updated module imports and storage references accordingly.
- Updated website branding to SJK Pet Adoption and replaced generic sample entries and placeholder images with pet-specific example records and breed images.
- Updated animal listing cards to show each animal's image from its JSON record.
- Expanded the GitHub Actions workflow to check application JavaScript syntax and Express server startup as part of final release preparation.

#### Fixed
- Fixed filtering failures caused by an obsolete JSON database path after file renaming.
- Fixed the Breed filter so its options match the selected species, include all supported breeds and reset correctly when the species changes (PR #24).
- Corrected outdated script imports, backend utility imports and details-page links following filename changes.
- Prevented filter event listeners from being initialised on the Animal Details page when filter controls are absent (PR #43).
- Fixed a server-startup error caused by referring to an Express request object outside a route handler.
- Improved validation and error responses for missing fields, invalid dropdown choices and mismatched species–breed combinations (PRs #40, #44 and #45).
- Corrected the GitHub Actions workflow syntax during final release preparation so the application checks can run.

#### Release verification
- Verify that the final GitHub Actions run passes on main before publishing this tag.
- Validate homepage listings, animal details, combined filters, breed-dependent options, Create/Edit/Delete operations and the expected error scenarios before submitting the project archive.

## [v0.1.0] - 2026-11-12
### Initial Project Setup
#### Added
- Created the initial Node.js and Express.js project structure.
- Initialised the shared GitHub repository for team collaboration.
- Added the project's initial configuration and dependency files.
- Configured GitHub Actions for basic continuous integration checks.
- Added Git hooks for commit-message validation and pre-commit checks.
- Added .gitattributes to standardise Git file handling and line endings.
- Created .github/CODEOWNERS to define responsibility for shared and individual project files.
- Established the team's Git branch naming convention.
- Documented the branching workflow and conventional commit-message guidelines.
- Created pull request review guidelines for team collaboration.
- Added a GitHub pull request template to standardise change descriptions, testing evidence and review checklists.
- Created CHANGELOG.md to record significant project changes and support release management.
- Published the initial project setup under Git tag v0.1.0.