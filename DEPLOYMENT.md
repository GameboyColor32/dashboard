# Deployment Guide

This guide will help you deploy the Ticket Analysis Dashboard to GitHub Pages.

## Prerequisites

1. **GitHub Account**: You need a GitHub account
2. **Repository**: Create a new repository on GitHub named `dashboard_tickets`
3. **Node.js**: Make sure you have Node.js 18+ installed

## Step-by-Step Deployment

### 1. Prepare Your Repository

1. **Clone your repository** (replace `YOUR_USERNAME` with your GitHub username):
   ```bash
   git clone https://github.com/YOUR_USERNAME/dashboard_tickets.git
   cd dashboard_tickets
   ```

2. **Update the homepage URL** in `package.json`:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/dashboard_tickets"
   }
   ```

3. **Update the base path** in `vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/dashboard_tickets/',
     // ... rest of config
   })
   ```

### 2. Push Your Code

1. **Add all files**:
   ```bash
   git add .
   ```

2. **Commit your changes**:
   ```bash
   git commit -m "Initial commit: Ticket Analysis Dashboard"
   ```

3. **Push to GitHub**:
   ```bash
   git push origin main
   ```

### 3. Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Navigate to Settings** → **Pages**
3. **Configure GitHub Pages**:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** (this will be created automatically)
   - Folder: **/(root)**
4. **Click Save**

### 4. Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys when you push to the main branch:

1. **The workflow will trigger automatically** when you push to main
2. **Check the Actions tab** in your repository to monitor the deployment
3. **Your site will be available** at `https://YOUR_USERNAME.github.io/dashboard_tickets`

### 5. Manual Deployment (Alternative)

If you prefer manual deployment:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

## Configuration Files

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

This workflow automatically:
- Triggers on pushes to main branch
- Sets up Node.js environment
- Installs dependencies
- Builds the project
- Deploys to GitHub Pages

### Vite Configuration (`vite.config.ts`)

Configured for:
- React plugin
- Base path for GitHub Pages
- Build optimization with chunk splitting
- Output directory: `dist`

### Package.json Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run deploy`: Deploy to GitHub Pages
- `npm run preview`: Preview production build

## Troubleshooting

### Common Issues

1. **404 Errors**: Make sure the base path in `vite.config.ts` matches your repository name
2. **Build Failures**: Check that all dependencies are installed (`npm install`)
3. **Deployment Not Working**: Verify GitHub Pages is enabled in repository settings

### Debugging

1. **Check GitHub Actions**: Go to Actions tab to see build logs
2. **Verify Files**: Ensure `dist/` folder contains built files
3. **Check URLs**: Verify homepage URL in `package.json` is correct

## Customization

### Changing Repository Name

If you want to use a different repository name:

1. **Update `package.json`**:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
   }
   ```

2. **Update `vite.config.ts`**:
   ```typescript
   base: '/YOUR_REPO_NAME/',
   ```

3. **Update GitHub Actions workflow** if needed

### Adding Custom Domain

1. **Add CNAME file** to `public/` directory
2. **Configure custom domain** in GitHub Pages settings
3. **Update DNS records** as instructed by GitHub

## Security Considerations

- **No sensitive data** should be included in the repository
- **Environment variables** are not needed for this project
- **Data files** are included in the public directory for demo purposes

## Performance Optimization

The build includes:
- **Code splitting** for vendor, charts, and icons
- **Tree shaking** to remove unused code
- **Compression** for production builds
- **Optimized assets** with proper caching headers 