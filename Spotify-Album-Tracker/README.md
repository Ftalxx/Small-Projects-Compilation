# Spotify Top Tracks & Recommendations App

## Overview

This React application allows users to search for artists, view their top albums, and retrieve the top 3 tracks from each album.

## Video Demo

[![Video Demo](https://img.youtube.com/vi/Fse5hqGLCiE/0.jpg)](https://youtu.be/Fse5hqGLCiE)

## Features

- **Search for Artists:** Enter an artist's name to retrieve their top albums.
- **Top Albums:** View the top albums for the selected artist.
- **Top 3 Tracks per Album:** Display the top 3 tracks from each album, sorted by popularity.
- **Personalized Recommendations:** Get personalized song recommendations based on your top tracks.

## Technologies Used

- **React:** Frontend library for building user interfaces.
- **Spotify Web API:** Fetch artist information, album details, and personalized recommendations.
- **React Bootstrap:** Styling components for a responsive UI.

## Setup

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

Tutorial and repository with aditional files available here - https://github.com/exrlla/codedex-api-template
For the sake of simplicity I will just be showing my personal code

## Usage

**Authenticate with Spotify:** Upon first visit, you'll be redirected to Spotify to authorize the app and obtain an access token.
**Search for an Artist:** Type the name of an artist and press "Search" to view their top albums.
**View Albums:** Click on an album to see its cover image and the top 3 tracks.
**Redirect URI:** Ensure your Spotify Developer Dashboard is configured with the correct redirect URI (http://localhost:3000 or your production URL).

## Troubleshooting
If you encounter issues with authentication or data fetching, check your console for error messages and ensure your environment variables are correctly set.

## Contributing
Credit to Ellie Popoca from Codedex. Feel free to submit issues or pull requests if you encounter bugs or have suggestions for improvements.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any questions or support, please contact your-email@example.com.


### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
