# Lab Setup Guide

## 1. Cloning the Repository

Clone this repository to your local machine:

```bash
git clone <REPO_URL>
cd <REPO_NAME>
```

## 2. Opening in VS Code with Dev Containers
1. Install [Visual Studio Code](https://code.visualstudio.com/).
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
3. Install [Git for Windows](https://git-scm.com/download/win) if you don't already have it.
4. Open the project folder in VS Code.
5. When prompted, **Reopen in Container**.  
    Alternatively, open the Command Palette (`Ctrl+Shift+P`), then select:  
    `Dev Containers: Reopen in Container`.
6. Once installation is complete, navigate to the `Run and Debug` menu and launch `lab1`

This will build and start the development environment using Docker, as configured in `.devcontainer/`.

Launching will also start a web browser, but you are welcome to use any browser you like. The app will be hosted on http://localhost:5015 with the backend hosted on http://localhost:5615.

## 3. Next Steps

- Open `issues.md` in the workspace and follow the instructions provided there.

## 4. Submitting Your Interview Application

Submit back a brief solution to each issue, as well as the output of the following command in the terminal:
`git diff --unified=2`

<br>

## FAQs

### What if I don't use Visual Studio Code?

You can still use the repository and dev container with other editors that support Docker and remote development, such as JetBrains IDEs or by using the command line. Refer to your editor's documentation for connecting to a dev container.

### Can I run the project without Docker or Dev Containers?

While the recommended setup uses Dev Containers, you can manually install the required dependencies (Node.js, Python, etc.) on your local machine and run the project. Refer to the `.devcontainer/Dockerfile` and `package.json` for a list of dependencies.

### How do I open the app in my browser?

Once the app is running, open your browser and navigate to [http://localhost:5015](http://localhost:5015) for the frontend and [http://localhost:5615](http://localhost:5615) for the backend.

### What if I encounter issues with the container build?

Make sure Docker is running and up to date. Check the logs in the VS Code terminal for errors. If problems persist, try rebuilding the container from the Command Palette:  
`Dev Containers: Rebuild and Reopen in Container`.