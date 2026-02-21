# Sydney Events Platform

A full-stack MERN application that automatically scrapes events in Sydney, Australia and displays them in a clean, minimal UI.

## Features

### Event Scraping
- Automatic scraping from public event websites
- Detects:
  - New events
  - Updated events
  - Inactive/expired events
- Stores events in MongoDB

### Event Listing Website
- Modern minimal UI
- Event cards showing:
  - Title
  - Date & time
  - Venue
  - Description
  - Source
- GET TICKETS modal:
  - Email collection
  - Consent checkbox
  - Saves to database
  - Redirects to original event

### Admin Dashboard
- Google OAuth login
- Protected dashboard
- Filters:
  - City
  - Keyword
  - Date range
- Table view
- Side preview panel
- Import to platform feature
- Status tags:
  - new
  - updated
  - inactive
  - imported

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- Puppeteer (Scraping)
- Google OAuth
- Tailwind CSS

## Setup Instructions

### Backend

cd backend
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev
