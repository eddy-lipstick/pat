# Client Demo Setup Guide

This guide explains how to set up password-protected demo spaces for client projects on the Patroon Legal Design website.

## Overview

The demo system allows you to create professional, password-protected preview environments at `https://www.patroon.nl/demos/[client-name]` for client projects.

### Features

- ✅ Simple password protection (no server complexity)
- ✅ Professional branding matching Patroon design
- ✅ Easy deployment from separate repositories
- ✅ Client-specific URLs and passwords
- ✅ Remember login functionality
- ✅ Mobile-responsive design

## Quick Start

### 1. Deploy a New Demo

Use the deployment script to quickly set up a new client demo:

```bash
# From the root of your Patroon website project
./scripts/deploy-demo.sh client-name ./path/to/built-demo/ [password]
```

**Examples:**
```bash
# Using default password (demo2024)
./scripts/deploy-demo.sh acme-corp ./dist/

# Using custom password
./scripts/deploy-demo.sh big-law-firm ./build/ secure123
```

### 2. Test and Deploy

1. Test locally by opening the generated `index.html`
2. Commit and push changes
3. Share the URL and password with your client

## Manual Setup

If you prefer to set up demos manually:

### 1. Create Client Directory

```bash
mkdir -p public/demos/your-client-name
```

### 2. Copy Your Demo Files

- Copy your built demo files to the client directory
- Rename the main file to `demo.html` (if it's `index.html`)

### 3. Create Password Gate

Copy the template and customize:

```bash
cp public/demos/template/password-gate.html public/demos/your-client-name/index.html
```

Edit the configuration in `index.html`:

```javascript
const CONFIG = {
    password: 'your-client-password',
    demoFile: 'demo.html',
    clientId: 'your-client-name',
};
```

## Directory Structure

```
public/demos/
├── template/
│   └── password-gate.html          # Reusable password gate template
├── example-client/                 # Example demo setup
│   ├── index.html                  # Password gate (entry point)
│   ├── demo.html                   # Actual demo content
│   └── assets/                     # Demo assets (CSS, JS, images)
├── your-client-1/
│   ├── index.html
│   ├── demo.html
│   └── assets/
└── your-client-2/
    └── ...
```

## Working with Separate Repositories

For projects developed in separate Git repositories:

### Option 1: Build and Copy (Recommended)

1. **In your demo project repository:**
   ```bash
   # Build your demo
   npm run build
   # or whatever build command you use
   ```

2. **In your Patroon website repository:**
   ```bash
   # Deploy the built files
   ./scripts/deploy-demo.sh client-name /path/to/demo-repo/dist/
   ```

### Option 2: Git Submodules

If you want to link repositories directly:

```bash
# Add the demo repo as a submodule
git submodule add https://github.com/your-org/client-demo-repo.git temp/client-demo

# Deploy from submodule
./scripts/deploy-demo.sh client-name temp/client-demo/dist/

# Clean up
rm -rf temp/client-demo
git submodule deinit temp/client-demo
```

### Option 3: Automated Deployment

Create a simple deployment script in your demo repository:

```bash
#!/bin/bash
# deploy-to-patroon.sh

# Build the demo
npm run build

# Copy to Patroon website (adjust path to your Patroon repo)
PATROON_DIR="../patroon-website"
CLIENT_NAME="your-client"

cd $PATROON_DIR
./scripts/deploy-demo.sh $CLIENT_NAME ./dist/ your-password
git add .
git commit -m "Update demo for $CLIENT_NAME"
git push
```

## Configuration Options

### Password Gate Configuration

Each demo's `index.html` contains a configuration object:

```javascript
const CONFIG = {
    password: 'demo2024',           // Client-specific password
    demoFile: 'demo.html',          // Main demo file to load
    clientId: 'example-client',     // Used for localStorage key
};
```

### Customization

- **Branding**: The password gate uses Patroon's design system automatically
- **Languages**: Currently in Dutch, but easily translatable
- **Styling**: Matches the main website's design tokens

## Security Notes

⚠️ **Important Security Information:**

- This system provides **basic password protection only**
- Passwords are stored in JavaScript (visible in source code)
- **Do not use for sensitive data or confidential information**
- Perfect for design previews, mockups, and non-sensitive demos
- Consider Vercel's password protection for higher security needs

## URL Structure

Demos are accessible at:
```
https://www.patroon.nl/demos/[client-name]/
```

Examples:
- `https://www.patroon.nl/demos/acme-corp/`
- `https://www.patroon.nl/demos/amsterdam-legal/`
- `https://www.patroon.nl/demos/big-law-firm/`

## Troubleshooting

### Demo doesn't load after password
- Check that `demo.html` exists in the client directory
- Verify the `demoFile` configuration in `index.html`
- Ensure all assets are copied correctly

### Password not working
- Check the password configuration in `index.html`
- Try clearing localStorage: `localStorage.clear()` in browser console
- Verify no typos in client configuration

### Script permission denied
```bash
chmod +x scripts/deploy-demo.sh
```

### Assets not loading
- Ensure relative paths in your demo HTML
- Copy all CSS, JS, and image files
- Check browser console for 404 errors

## Best Practices

### Naming Conventions
- Use kebab-case for client names: `big-law-firm`, not `BigLawFirm`
- Keep names short and descriptive
- Avoid special characters except hyphens

### Password Management
- Use memorable but secure passwords
- Document passwords securely (not in Git)
- Consider using the same password for related demos

### Demo Content
- Include Patroon branding where appropriate
- Add contact information for questions
- Keep file sizes reasonable for web delivery
- Test on mobile devices

## Cleanup

To remove old demos:

```bash
# Remove client directory
rm -rf public/demos/old-client-name

# Commit the removal
git add .
git commit -m "Remove demo for old-client-name"
git push
```

## Support

For questions or issues with the demo system:
- Check this documentation first
- Review the example client setup
- Contact the development team

---

*Last updated: $(date)*