#!/bin/bash

# Setup script for GitHub Pages deployment
# Usage: ./scripts/setup-deployment.sh YOUR_GITHUB_USERNAME

if [ $# -eq 0 ]; then
    echo "Usage: $0 YOUR_GITHUB_USERNAME"
    echo "Example: $0 johndoe"
    exit 1
fi

USERNAME=$1

echo "Setting up deployment for GitHub Pages..."
echo "Username: $USERNAME"

# Update package.json homepage
sed -i "s/\[YOUR_USERNAME\]/$USERNAME/g" package.json

# Update README.md
sed -i "s/yourusername/$USERNAME/g" README.md

echo "✅ Updated package.json and README.md with your username: $USERNAME"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub named 'dashboard_tickets'"
echo "2. Push your code to GitHub:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit: Ticket Analysis Dashboard'"
echo "   git remote add origin https://github.com/$USERNAME/dashboard_tickets.git"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages in your repository settings"
echo "4. Your dashboard will be available at: https://$USERNAME.github.io/dashboard_tickets" 