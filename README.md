# Strategic Marketing Bootcamp

## Overview

Strategic Marketing Bootcamp is a browser-only web app for creating and managing marketing bootcamp projects. It uses Google OAuth, Google Drive API document copying, localStorage project state, a three-panel workspace, embedded Google Docs, and task-specific guidance/checklists.

## Start Here

Before coding, read these files in order:

1. [AI_PROJECT_CONTEXT.md](AI_PROJECT_CONTEXT.md)
2. [PROJECT_PLAN.md](PROJECT_PLAN.md)
3. [docs/SPRINTS.md](docs/SPRINTS.md)
4. [docs/TASK_LOG.md](docs/TASK_LOG.md)
5. [docs/DECISIONS.md](docs/DECISIONS.md)
6. [docs/BUGS.md](docs/BUGS.md)
7. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
8. [docs/TASK_CONTENT_MATRIX.md](docs/TASK_CONTENT_MATRIX.md)
9. [docs/ACCEPTANCE_CRITERIA.md](docs/ACCEPTANCE_CRITERIA.md)
10. [docs/IMPLEMENTATION_CHECKLIST.md](docs/IMPLEMENTATION_CHECKLIST.md)
11. [docs/LLM_WORKFLOW.md](docs/LLM_WORKFLOW.md)
12. [docs/NEXT_PROMPT.md](docs/NEXT_PROMPT.md)

## Current Build Method

Build one sprint at a time. Do not ask the LLM to build the entire app in one pass.

Next safe implementation prompt is stored in [docs/NEXT_PROMPT.md](docs/NEXT_PROMPT.md).

## Features
- **User Authentication**: Utilizes Google OAuth 2.0 for secure user authentication.
- **Project Management**: Stores project data in localStorage, allowing for offline access and persistence.
- **API Integration**: Leverages Google Drive API v3 for creating folders and managing documents.
- **Responsive UI**: Features a three-panel layout for easy navigation and task management.
- **Error Handling**: Implements user-friendly error messages for API errors and token expiry.

## Project Structure
```
strategic-marketing-bootcamp
├── docs
│   ├── specification.md
│   └── development-guide.md
├── public
│   └── index.html
├── src
│   ├── app.ts
│   ├── main.ts
│   ├── components
│   │   └── index.ts
│   ├── pages
│   │   └── index.ts
│   ├── styles
│   │   └── main.css
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Development Guide
1. **Setup**: Clone the repository and navigate to the project directory.
2. **Install Dependencies**: Run `npm install` to install all required packages.
3. **Build the Project**: Use `npm run build` to compile the TypeScript files.
4. **Run the Application**: Start the application using `npm start` and open the browser to view the app.
5. **Testing**: Ensure all features work as expected, including authentication, project creation, and task management.
6. **Deployment**: Follow the deployment instructions in the README to host the application.

## Installation
To get started with the "Strategic Marketing Bootcamp" web application, follow the steps outlined in the Development Guide. Ensure you have Node.js and npm installed on your machine.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.