# Contributing to Business Incubator Platform & DBMS

Thank you for choosing to contribute to our project! We welcome and appreciate contributions of all kinds: bug reports, documentation updates, feature requests, and code contributions.

Please review this document to understand our development workflow, coding standards, and setup instructions.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any violations or unacceptable behavior to the project maintainers.

---

## How Can I Contribute?

### 1. Reporting Bugs
Before opening a new issue, please search the existing issues to see if the bug has already been reported. If not, use our Bug Report template to file a new issue and include:
* A clear title and description.
* Steps to reproduce the issue.
* Expected vs. actual behavior.
* Screenshots, logs, or error messages if applicable.

### 2. Suggesting Features
We love feature requests! Use the Feature Request template and explain:
* The problem you are trying to solve.
* Your proposed solution or enhancement.
* Alternative approaches you have considered.

### 3. Finding "Good First Issues"
If you are new to the project or open-source, look for issues with the following labels:
* `good first issue`: Simple tasks suitable for newcomers.
* `help wanted`: Tasks we need assistance with.
* `documentation`: Improvements to markdown, guides, or JSDoc comments.

---

## Development Setup

To contribute code, you will need to set up the project locally.

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.x or later recommended)
* [PostgreSQL](https://www.postgresql.org/) (v14.x or later recommended)
* [Git](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/aelaraby6/Business-Incubator-Platform-DBMS.git
cd Business-Incubator-Platform-DBMS
```

### Step 2: Set Up the Database
1. Open your PostgreSQL console or client (e.g. pgAdmin, DBeaver) and create a database named `incubator_db`:
   ```sql
   CREATE DATABASE incubator_db;
   ```
2. Create a database user named `incubator_user` with password `strongpassword` (or customize this and save it in your `.env` file):
   ```sql
   CREATE USER incubator_user WITH ENCRYPTED PASSWORD 'strongpassword';
   GRANT ALL PRIVILEGES ON DATABASE incubator_db TO incubator_user;
   ```
3. Load the schema from [db.sql](Business-Incubator-DB-System/database/db.sql):
   ```bash
   # In PostgreSQL terminal
   psql -U incubator_user -d incubator_db -f Business-Incubator-DB-System/database/db.sql
   ```
4. Load the seed data from [seeders.sql](Business-Incubator-DB-System/database/seeders/seeders.sql):
   ```bash
   psql -U incubator_user -d incubator_db -f Business-Incubator-DB-System/database/seeders/seeders.sql
   ```

### Step 3: Configure the Web App
1. Navigate to the `Website/` directory:
   ```bash
   cd Website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
4. Edit the `.env` file with your database credentials.
5. Build and watch Tailwind CSS styles (if developing CSS):
   ```bash
   npm run build:css
   ```
6. Start the web server in development mode:
   ```bash
   npm run dev
   ```
   The Web dashboard will be running at `http://localhost:3000`.

### Step 4: Configure the Desktop App
1. Open a new terminal and navigate to the Desktop application directory:
   ```bash
   cd Business-Incubator-DB-System/Desktop
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` with your database credentials.
5. Run migrations (to update schema with incrementally added tables):
   ```bash
   npm run migrate
   ```
6. Launch the desktop application:
   ```bash
   npm run dev
   ```

---

## Directory Walkthrough

Here is a quick breakdown of where files live:
* `Website/`: Contains the entrepreneur & investor web platform.
  * `config/`: Database client and multer file uploads configurations.
  * `controllers/`: Request handling logic (auth, projects, workshops, funding, etc.).
  * `models/`: Database queries and data modeling scripts.
  * `public/`: Static files (stylesheets, JavaScript scripts, images, uploads).
  * `routes/`: Express route definitions.
  * `views/`: EJS frontend templates.
* `Business-Incubator-DB-System/`:
  * `database/`: Database schema, seeders, and migration scripts.
  * `Desktop/`: Electron + React administrative desktop application.
    * `src/electron/`: Desktop backend layer (IPC communication handlers, DB interaction).
    * `src/web/`: React admin frontend application.

---

## Development & Contribution Rules

### Branch Naming Convention
We follow a structured branch naming convention. When creating a branch, prefix it with one of the following:
* `feat/` for new features (e.g., `feat/workspace-booking`)
* `fix/` for bug fixes (e.g., `fix/session-expiry`)
* `docs/` for documentation updates (e.g., `docs/add-api-overview`)
* `refactor/` for code refactoring with no behavior changes (e.g., `refactor/auth-helper`)
* `chore/` for package updates or tooling configuration (e.g., `chore/lint-config`)

### Commit Message Convention
We adhere to **Conventional Commits**. This keeps our commit logs readable and structured.
Format: `<type>(<scope>): <description>`

Examples:
* `feat(auth): add google login oauth integration`
* `fix(db): resolve connection timeout on multiple pools`
* `docs(readme): add troubleshooting step for installation`
* `style(dashboard): format table alignment`

Types available: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

### Coding Standards
* **JavaScript Style**: We use ES Modules (`import`/`export`) in both environments.
* **Variable/Function Names**: Use camelCase (e.g. `userId`, `getProjects`).
* **Classes/Models**: Use PascalCase (e.g. `GlobalRouter`).
* **Constants**: Use UPPER_SNAKE_CASE (e.g. `PORT`, `SESSION_SECRET`).
* **JSDoc**: Document all exported controllers, routes, and models using standard JSDoc tags (`@param`, `@returns`, `@throws`).

---

## Pull Request Guidelines

1. **Keep PRs small and focused**: Avoid submitting large PRs that cover multiple unrelated issues.
2. **Sync with main**: Ensure your branch is updated with the latest commits on the `main` branch before submitting.
3. **Include tests/verification**: Document what you tested and how you verified your changes.
4. **Follow the Pull Request template**: Fill out the template details completely when opening your PR.
