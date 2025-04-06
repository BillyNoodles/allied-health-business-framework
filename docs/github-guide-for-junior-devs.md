# GitHub Repository Guide for Junior Developers

This guide will help you push the Allied Health Business Assessment Tool to your GitHub repository. Since you're learning on the job, I've included detailed explanations for each step.

## Prerequisites

- Git installed on your computer
- GitHub account
- Access to the repository: https://github.com/BillyNoodles/allied-health-business-framework

## Authentication Options

GitHub requires authentication to push code. There are two main methods:

### Option 1: Personal Access Token (Recommended)

1. **Create a Personal Access Token (PAT)**:
   - Go to GitHub.com → Your profile (top right) → Settings
   - Scroll down to "Developer settings" (bottom of left sidebar)
   - Select "Personal access tokens" → "Tokens (classic)"
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name like "Allied Health Project"
   - Set expiration as needed (30 days is a good start)
   - Select scopes: at minimum check "repo" (full control of repositories)
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately! You won't be able to see it again.

2. **Use the token for authentication**:
   When Git asks for your password, use the token instead of your GitHub password.

### Option 2: SSH Keys

If you plan to use Git frequently, setting up SSH keys is more convenient but takes more initial setup.

## Pushing the Code to GitHub

### Step 1: Navigate to the Project Directory

```bash
cd /path/to/allied-health-assessment/allied-health-assessment
```

### Step 2: Check Repository Status

```bash
git status
```
This should show you're on the 'main' branch with all files committed.

### Step 3: Add the Remote Repository

```bash
git remote add origin https://github.com/BillyNoodles/allied-health-business-framework.git
```

### Step 4: Push to GitHub

```bash
git push -u origin main
```

When prompted:
- Enter your GitHub username
- For password: use your Personal Access Token (not your GitHub password)

## Common Issues and Solutions

### "Remote already exists" error

If you get an error saying the remote already exists:

```bash
git remote remove origin
git remote add origin https://github.com/BillyNoodles/allied-health-business-framework.git
```

### Authentication Failed

If authentication fails:
- Double-check your username
- Ensure you're using the Personal Access Token, not your GitHub password
- Verify the token has the correct permissions
- Check that the token hasn't expired

### Permission Denied

If you get "Permission denied":
- Verify you have write access to the repository
- Check with the repository owner to ensure you have the correct permissions

## Ongoing Development Workflow

After initial setup, your typical workflow will be:

1. Make changes to files
2. Stage changes: `git add .` (or specific files)
3. Commit changes: `git commit -m "Description of changes"`
4. Push to GitHub: `git push`

## Best Practices

- Pull before you push: `git pull origin main`
- Create branches for new features: `git checkout -b feature-name`
- Write clear commit messages
- Commit frequently with smaller, logical changes
- Always check `git status` before committing

## Getting Help

If you encounter issues:
- Use `git --help` for general help
- Use `git command --help` for help with specific commands
- Search for error messages on Stack Overflow
- Ask more experienced developers for guidance

Remember, everyone starts somewhere with Git. Don't be afraid to make mistakes - that's how you learn!
