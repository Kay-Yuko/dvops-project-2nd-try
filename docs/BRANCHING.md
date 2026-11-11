1. Branch Naming Convention
Use the following naming format for branches:
type/person-name/description

What each part represents:
type*: Category of work
person-name: Member responsible
description: Short description of the task


2. Branch Types*
types* :feature, fix, docs, chore, style

Situations in which each type should be used.

feature: Developing a new website function
fix: Correcting a bug
docs: Updating documentation
chore: Project maintenance or configuration
style: UI styling changes


3. Branch Naming Examples
Add realistic examples for your pet adoption website.
feature/joen/add-pet
feature/kayden/update-pet
feature/samuel/filter-pet
feature/samuel/delete-pet
fix/samuel/filter-validation
docs/samuel/scm-setup


4. Branching Workflow
Steps to follow when branching:
    1. Fetch and pull the latest changes from main.
    2. Create a new branch following the naming convention.
    3. Develop and test changes within that branch.
    4. Commit changes using the team's commit-message convention.
    5. Push changes to GitHub.
    6. Create a pull request targeting main.
    7. Request code review and address feedback.
    8. Merge approved changes into main.
    9. Delete completed branches where appropriate.

5. Commit Message Convention
Use the following message format for committing:
type: short description

Examples:
- docs: add branching convention
- feat: implement pet filtering
- fix: correct filter validation
- chore: configure code ownership
- style: improve pet card layout
- ci: add workflow checks

6. Collaboration Rules
Reasons why we follow these rules:

- Avoid directly committing feature changes to main.
- Keep each branch focused on one task.
- Use meaningful commit messages.
- Request teammate reviews before merging.
- Communicate before editing shared files.
- Resolve conflicts and retest before completing merges.