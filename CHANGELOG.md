# Changelog

This file records significant changes to the Pet Adoption Website.

## [Unreleased]

### Added
- Implemented pet filtering by name, gender, age, species, and breed.

- Added support for combining multiple filters to narrow down pet adoption listings.

- Added backend validation to reject invalid filtering parameters.

- Added dynamic filtering results, including an informative message when no pets match the selected criteria.

- Added a Clear button to reset all filters and display the full animal list.

- Implemented animal deletion from the details page with a confirmation prompt.
- Added a DELETE API endpoint with animal ID validation and persistent JSON storage updates.
- Added error handling for invalid IDs, nonexistent animals, and database failures.
- Added success feedback and automatic navigation back to the animal listing after deletion.

### Changed
- Updated filtering input identifiers to prevent conflicts with the Add Animal popup.

- Integrated the filtering API with the existing pet listing interface.

### Fixed
- No additional bug fixes recorded for this release.