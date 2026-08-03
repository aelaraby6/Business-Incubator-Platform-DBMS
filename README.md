# Business Incubator Platform & DBMS

> **Where raw ideas meet structured growth.**

An open-source business incubator management system built on **Express.js + PostgreSQL + EJS**, with an **Electron** desktop layer for administrators. It unifies project tracking, mentorship coordination, workshops, facilities booking, resource management, and investor matching into a single database system. Web-facing for entrepreneurs, desktop-powered for the administrative team.

---

## Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Key Features](#key-features)
- [Project Stages](#project-stages)
- [Tech Stack](#tech-stack)
- [System Architecture & ERD](#system-architecture--erd)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Web Application Setup](#web-application-setup)
  - [Desktop Application Setup](#desktop-application-setup)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Demos & Screenshots](#demos--screenshots)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Contributors](#-contributors)
- [License](#license)

---

## The Problem

Business incubators run on spreadsheets, fragmented applications, and slow manual updates. Administrators struggle to oversee startup progress. Entrepreneurs face friction when seeking feedback, booking resources, or requesting funding. Mentors get matched via chaotic communications, and investor requests get buried in email inboxes.

---

## The Solution

Our platform replaces the chaos with a unified, role-based ecosystem. Two interfaces run against a single database:

1. **Entrepreneurs** use the Web App to register, pitch startups, team up with peers, track project stages, reserve co-working spaces, register for workshops, and request funding.
2. **Administrators** use the Electron Desktop App with direct PostgreSQL database connections to review startup ideas, assign mentors, create workshops, manage facilities, log funding milestones, and compile analytical reports.
3. **Mentors & Investors** get specialized access to review progress, log mentor hours, view milestones, and explore investment opportunities.

---

## Key Features

* **Dual Interface**: Entrepreneur portal (Web) + Admin portal (Desktop app).
* **Project Progression Tracking**: Three stages: Idea, MVP, and Scale-up.
* **Mentorship Matching**: Assign advisors to startups and log evaluations.
* **Workshop Scheduling**: Plan sessions, check attendance, and view participant feedback.
* **Resource Booking System**: Real-time room/desk reservation engine.
* **Funding Pipelines**: Apply for funding, track review status, and match with venture capital.
* **Analytics Dashboard**: Admins track incubator stats, active users, and startup growth trends.

---

## Project Stages

```
  ╔══════════════════╗       ╔══════════════════╗       ╔══════════════════╗
  ║      IDEA        ║  ───► ║       MVP        ║  ───► ║    SCALE-UP      ║
  ╠══════════════════╣       ╠══════════════════╣       ╠══════════════════╣
  ║ Submit concept   ║       ║ Build & test     ║       ║ Expand market    ║
  ║ Form your team   ║       ║ Attend workshops ║       ║ Secure funding   ║
  ║ Await approval   ║       ║ Use facilities   ║       ║ Pitch investors  ║
  ║ Get a mentor     ║       ║ Iterate fast     ║       ║ Grow the team    ║
  ╚══════════════════╝       ╚══════════════════╝       ╚══════════════════╝
         │                          │                          │
    Admin reviews              Mentor guides             Investor assigned
    & approves                 & tracks KPIs             via platform
```

---

## Tech Stack

* **Frontend**: EJS Template Engine, HTML5, Vanilla CSS, Tailwind CSS (CLI compiler), React (Desktop Frontend), Lucide Icons
* **Backend**: Node.js, Express.js (Web), Electron.js (Desktop Shell)
* **Database**: PostgreSQL (Relational Database)
* **Libraries/ORM**: Sequelize & Raw PG Client
* **Task Runner & CSS Compilation**: Tailwind CSS v4 CLI, nodemon

---

## System Architecture & ERD

The architecture relies on a central database server where both systems connect.

### Entity Relationship Diagram (ERD)

<img width="2169" height="2106" alt="Database Entity Relationship Diagram" src="https://github.com/user-attachments/assets/ac959951-9e6d-455d-a806-ca985bce7437" />

### System Overview Diagram

<img width="1024" height="1024" alt="System Flow Architecture Diagram" src="https://github.com/user-attachments/assets/cc089452-2d96-46d2-825a-5c7bad77aaf6" />

---

## Project Structure

```
.
├── .github/                   # GitHub issue templates, PR checklists, and workflows
│   ├── ISSUE_TEMPLATE/        # Bug Report & Feature Request templates
│   ├── workflows/             # CI / CD configuration files (YAML)
│   └── PULL_REQUEST_TEMPLATE  # Pull Request documentation template
├── Business-Incubator-DB-System/
│   ├── database/              # PostgreSQL schema, seeders, and migrations
│   │   ├── migrations/        # Sequential SQL migration files
│   │   ├── seeders/           # Mock data SQL files
│   │   └── db.sql             # Base database schema
│   └── Desktop/               # Electron + React Admin Application
│       ├── src/
│       │   ├── electron/      # Electron main, IPC hooks, and DB operations
│       │   ├── scripts/       # Run database migration scripts
│       │   └── web/           # React component frontend dashboard
│       └── package.json       # Desktop package configurations
├── Website/                   # Node.js + Express Web Portal (Entrepreneurs/Investors)
│   ├── config/                # DB setup & middleware configs
│   ├── controllers/           # Route logic controllers
│   ├── models/                # Database queries and schema definitions
│   ├── public/                # Static assets, CSS files, images
│   ├── routes/                # Express routing files
│   ├── views/                 # EJS pages templates
│   └── package.json           # Web app package configurations
├── docs/                      # Graphic assets and system specifications
├── .editorconfig              # Consistency guidelines for editor formatting
├── .gitignore                 # Excluded directories and credentials files
├── LICENSE                    # MIT License documentation
└── README.md                  # Project root readme
```

---

## Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.x or later)
* [PostgreSQL](https://www.postgresql.org/) (v14.x or later)
* [Git](https://git-scm.com/)

### Database Setup
1. Create a database called `incubator_db` in your PostgreSQL server.
2. Create a user `incubator_user` with password `strongpassword` (or set custom ones and configure them in `.env`).
3. Import the main schema:
   ```bash
   psql -U incubator_user -d incubator_db -f Business-Incubator-DB-System/database/db.sql
   ```
4. Populate with mock seeders:
   ```bash
   psql -U incubator_user -d incubator_db -f Business-Incubator-DB-System/database/seeders/seeders.sql
   ```

### Web Application Setup
1. Navigate to the `Website/` directory:
   ```bash
   cd Website
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your DB credentials:
   ```bash
   cp .env.example .env
   ```
4. Build Tailwind CSS styling:
   ```bash
   npm run build:css
   ```
5. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the web portal.

### Desktop Application Setup
1. Navigate to the Desktop directory:
   ```bash
   cd Business-Incubator-DB-System/Desktop
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and adjust the variables:
   ```bash
   cp .env.example .env
   ```
4. Run migrations:
   ```bash
   npm run migrate
   ```
5. Start the Electron workspace:
   ```bash
   npm run dev
   ```

---

## Environment Variables

Ensure you create `.env` files in both `Website/` and `Business-Incubator-DB-System/Desktop/` using the following patterns:

### Web Portal (`Website/.env`)
* `PORT`: Server port (defaults to `3000`)
* `NODE_ENV`: environment stage (`development` or `production`)
* `SESSION_SECRET`: Random secure string used to sign sessions
* `DB_HOST`: Database IP address (e.g. `localhost`)
* `DB_PORT`: Database connection port (e.g. `5432`)
* `DB_NAME`: Target database name (e.g. `incubator_db`)
* `DB_USER`: PostgreSQL user
* `DB_PASS`: PostgreSQL password

### Desktop App (`Business-Incubator-DB-System/Desktop/.env`)
* `DB_HOST`: Database host
* `DB_PORT`: Database port
* `DB_NAME`: Database name
* `DB_USER`: DB Username
* `DB_PASS`: DB User Password

---

## API Overview

The Web portal serves dynamic HTML via the following endpoints:

| Route | Method | Description |
| --- | --- | --- |
| `/` | `GET` | Landing/Welcome Page |
| `/v1/auth/signup` | `GET`/`POST` | Sign up new entrepreneur or investor |
| `/v1/auth/login` | `GET`/`POST` | Log in to dashboard |
| `/v1/auth/profile` | `GET` | Main landing dashboard for logged-in roles |
| `/v1/projects` | `GET`/`POST` | Explore projects or pitch a new startup |
| `/v1/workshop` | `GET` | View scheduled workshops and register |
| `/v1/funding` | `GET`/`POST` | Submit investment request or view statuses |
| `/v1/search` | `GET` | Search for mentors, resources, and startups |

---

## Demos & Screenshots

### Web App Demonstration
https://github.com/user-attachments/assets/fb7989ae-3b50-4c92-a9b0-12b3dcef6b2e

### Admin Desktop Application Demonstration
https://github.com/user-attachments/assets/8f84ebec-e6f0-4cb2-a873-5b363ffa0cb2

---

## Roadmap

- [ ] **Email Notifications**: Integration with Nodemailer for auto-alerts (e.g. workspace reservations, milestone changes).
- [ ] **Document Upload**: AWS S3 integration for uploading pitch decks and MVP proofs securely.
- [ ] **Live Workspace Board**: Interactive floor plan visualizer for booking desks/office zones.
- [ ] **Real-time Messaging**: Socket.io connection allowing chat rooms between mentors, entrepreneurs, and investors.
- [ ] **Docker Containers**: Create a Docker Compose profile for spin-up of DB, Web app, and migrations.

---

## FAQ

#### Q: How do I access the administrator view?
**A**: The administrator features are only accessible via the Desktop App (Electron) to prevent external security exploits. Build and boot the desktop folder, and log in using an admin user profile.

#### Q: Can I run migrations on other databases?
**A**: Yes. The database client runs on PostgreSQL. Ensure you target a PostgreSQL database instance in the `.env` settings.

#### Q: How do I seed fake data for testing?
**A**: Follow the database setup instructions to run `seeders.sql` which loads pre-generated mock mentors, projects, workshops, and user roles.

---

## Contributing

We love pull requests! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to prepare your branch, format your commit messages, and run local lint tasks.

---

## 👥 Contributors

Thanks goes to these wonderful people in the team:

<table>
  <tr>
      <td align="center">
      <a href="https://github.com/Abdelrahman-M-Selim">
        <img src="https://avatars.githubusercontent.com/u/223935419?v=4" width="100px;" alt=""/>
        <br /><sub><b>Abdelrahman Selim</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/aelaraby6">
        <img src="https://avatars.githubusercontent.com/u/154278999?v=4" width="100px;" alt=""/>
        <br /><sub><b>Abdelrahman Elaraby</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ahmedali109">
        <img src="https://avatars.githubusercontent.com/u/64106924?v=4" width="100px;" alt=""/>
        <br /><sub><b>Ahmed Ali</b></sub>
      </a>
    </td>
  </tr>
</table>

---

## License

This project is licensed under the [MIT License](LICENSE).
