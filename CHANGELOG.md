# Changelog

This file records significant changes to the Pet Adoption Website.

## [Unreleased]

### Added
- Implemented pet filtering by name, gender, age, species, and breed.

- Added support for combining multiple filters to narrow down pet adoption listings.

- Added backend validation to reject invalid filtering parameters.

- Added dynamic filtering results, including an informative message when no pets match the selected criteria.

- Added a Clear button to reset all filters and display the full animal list.

### Changed
- Updated filtering input identifiers to prevent conflicts with the Add Animal popup.

- Integrated the filtering API with the existing pet listing interface.

### Fixed
- Fixed the Breed filter to display only breeds associated with the selected animal species.
- Updated the Breed dropdown to include all breeds supported by the application, even when no animals of those breeds are currently listed.
- Fixed the Breed dropdown to reset automatically when users change species or clear their filters.