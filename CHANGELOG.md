# Changelog

This file records significant changes, improvements, bug fixes, and source code management enhancements made throughout the development of the Pet Adoption Website.

All notable changes are organised by release version using the categories Added, Changed, and Fixed.

## [Unreleased]

### Added
Animal Listing and Details — Kay-Yuko

- Developed the main Pet Adoption Website interface using HTML and CSS.

- Implemented dynamic animal listings that retrieve and display animal information from the JSON database.

- Added the GET /view-resources API endpoint to retrieve all animal records.

- Added handling for empty animal listings with an appropriate message.

- Created the animal details page to display information about individual animals.

- Added the GET /view-resources/:id API endpoint to retrieve a specific animal by its unique ID.

- Connected animal listings to their respective details pages.

Add Animal — JoenChow07

- Implemented the Add Animal popup for entering new animal details.

- Added the POST /add-resource API endpoint to create animal records.

- Integrated the Add Animal functionality with persistent JSON file storage.

- Implemented dynamic breed selections based on the selected animal species.

- Added frontend feedback after successfully adding an animal.

Edit Animal — Kay-Yuko

- Developed the Edit Animal popup using the existing application design.

- Implemented the PUT /edit-resource/:id API endpoint to update animal records.

- Added automatic population of the Edit Animal form using existing animal information.

- Integrated species-dependent breed selection into the editing interface.

- Implemented persistent updates to animal records stored in JSON.

- Added UUID generation for newly created animal records using Node.js.

- Added validation and error handling for animal editing.

Pet Filtering — Samuelykw

- Implemented pet filtering by name, gender, age, species, and breed.

- Added the GET /filter-resources API endpoint for retrieving matching animal records.

- Added support for combining multiple filtering criteria.

- Implemented case-insensitive and partial name matching.

- Added backend validation for invalid filtering parameters.

- Added dynamic filtering results without reloading the page.

- Added a message when no animals match the selected filters.

- Added a Clear button to reset filters and restore all animal listings.

Delete Animal — Samuelykw

- Implemented animal deletion from the animal details page.

- Added the DELETE /delete-resource/:id API endpoint.

- Added a confirmation prompt to prevent accidental deletion.

- Implemented animal ID validation and error handling for nonexistent records.

- Integrated deletion with persistent JSON storage.

- Added success and error feedback for deletion operations.

- Added automatic navigation back to the main listing page after successful deletion.

Source Code Management and Collaboration — Team

- Expanded CODEOWNERS rules to assign responsibility for individual application features and shared project files.

- Added ownership rules for Git hooks and .gitattributes maintenance.

- Conducted a Git merge-conflict resolution practice exercise using separate branches.

- Demonstrated resolving overlapping documentation changes through GitHub Desktop and Visual Studio Code.

- Documented the merge-conflict exercise in docs/merge-conflict-demo.md.
### Changed
- Updated the website to display animal information dynamically instead of relying on static placeholder listings.

- Improved the user interface with animal details pages and Add/Edit Animal popups.

- Standardised animal data handling to support unique identifiers.

- Updated frontend form values to work with the application's animal data structure.

- Updated filtering input identifiers to prevent conflicts with the Add Animal popup.

- Integrated filtering results with the existing animal listing interface.

- Updated CODEOWNERS to reflect changes in team responsibilities and application files.

### Fixed
- Fixed the Breed filter to display only breeds belonging to the selected animal species.

- Updated the Breed filter to include all nine breeds configured in the application's shared breed list, rather than only breeds currently appearing in animal records.

- Fixed the Breed dropdown to reset automatically when the selected species changes.

- Fixed the Clear button to restore the complete breed selection.

- Addressed missing or inconsistent IDs for newly created animals by introducing UUID generation.

- Improved handling of empty animal listings and nonexistent animal records.

# [v0.1.0] - 2026-11-12
## Initial Project Setup
### Added 
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

- Added a GitHub pull request template to standardise change descriptions, testing evidence, and review checklists.

- Created CHANGELOG.md to record significant project changes and support release management.

- Published the initial project setup pre-release with the Git tag v0.1.0.