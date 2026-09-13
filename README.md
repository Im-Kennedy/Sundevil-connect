# SunDevil Connect

A full-stack web app built for ASU students to discover campus clubs, register for events, and stay connected to campus life — built as a semester-long software engineering project for CSE 460 at Arizona State University.

## What it does

SunDevil Connect is organized around three distinct user roles, each with its own dashboard and permissions:

- **Students** can browse and join clubs, register for events, and track their memberships
- **Club Leaders** can manage their club's roster, post announcements, and organize events
- **Admins** oversee the platform, with visibility across all clubs, events, and memberships

## Tech stack

- **Frontend:** React 19, React Router 7, JavaScript (ES6+)
- **Data:** localStorage (serves as the mock backend for this phase — no external database yet)
- **Tooling:** Create React App

## Project background

Built solo over a full software engineering course sequence, covering the full lifecycle from architecture and design (C4 diagrams, GoF design patterns, SOLID principles) through implementation and presentation. The three-role structure was designed to reflect how a real campus organization platform would need to handle different permission levels and workflows.

## Running it locally

\`\`\`bash
git clone https://github.com/Im-Kennedy/Sundevil-connect.git
cd Sundevil-connect
npm install
npm start
\`\`\`

Runs at `http://localhost:3000`.

## Status

Core functionality across all three dashboards (student, club leader, admin) is complete, including club membership, event registration, and admin oversight. Currently using localStorage as a mock backend — a real backend/database is a natural next step if this project continues past coursework.
