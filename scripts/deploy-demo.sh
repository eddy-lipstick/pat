#!/bin/bash

# Deploy Demo Script for Patroon Legal Design
# Usage: ./deploy-demo.sh <client-name> <source-directory> [password]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
DEFAULT_PASSWORD="demo2024"
TEMPLATE_DIR="public/demos/template"
DEMOS_DIR="public/demos"

# Helper functions
print_header() {
    echo -e "${BLUE}=====================================${NC}"
    echo -e "${BLUE}    Patroon Demo Deployment Tool    ${NC}"
    echo -e "${BLUE}=====================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

show_usage() {
    echo "Usage: $0 <client-name> <source-directory> [password]"
    echo ""
    echo "Parameters:"
    echo "  client-name      Name of the client (used for folder and URL)"
    echo "  source-directory Path to the built demo files"
    echo "  password         Optional password (defaults to 'demo2024')"
    echo ""
    echo "Examples:"
    echo "  $0 acme-corp ./dist/"
    echo "  $0 big-law-firm ./build/ mypassword123"
    echo ""
}

# Main script
print_header

# Check arguments
if [ $# -lt 2 ]; then
    print_error "Insufficient arguments provided"
    echo ""
    show_usage
    exit 1
fi

CLIENT_NAME="$1"
SOURCE_DIR="$2"
PASSWORD="${3:-$DEFAULT_PASSWORD}"

# Validate client name (no spaces, special chars except hyphens)
if [[ ! "$CLIENT_NAME" =~ ^[a-zA-Z0-9-]+$ ]]; then
    print_error "Client name should only contain letters, numbers, and hyphens"
    exit 1
fi

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    print_error "Source directory '$SOURCE_DIR' does not exist"
    exit 1
fi

# Check if we're in the right directory (should have public/demos)
if [ ! -d "$DEMOS_DIR" ]; then
    print_error "Not in the correct project directory. Missing '$DEMOS_DIR' folder."
    print_info "Run this script from the root of your Patroon website project."
    exit 1
fi

# Check if template exists
if [ ! -f "$TEMPLATE_DIR/password-gate.html" ]; then
    print_error "Password gate template not found at '$TEMPLATE_DIR/password-gate.html'"
    exit 1
fi

CLIENT_DIR="$DEMOS_DIR/$CLIENT_NAME"

print_info "Deploying demo for client: $CLIENT_NAME"
print_info "Source directory: $SOURCE_DIR"
print_info "Target directory: $CLIENT_DIR"
print_info "Password: $PASSWORD"
echo ""

# Create client directory
mkdir -p "$CLIENT_DIR"
print_success "Created client directory: $CLIENT_DIR"

# Copy source files to demo.html or maintain structure
if [ -f "$SOURCE_DIR/index.html" ]; then
    # If there's an index.html, copy it as demo.html
    cp "$SOURCE_DIR/index.html" "$CLIENT_DIR/demo.html"
    print_success "Copied index.html as demo.html"
    
    # Copy other assets
    if [ -d "$SOURCE_DIR" ]; then
        # Copy everything except index.html
        find "$SOURCE_DIR" -type f ! -name "index.html" -exec cp {} "$CLIENT_DIR/" \; 2>/dev/null || true
        # Copy directories
        find "$SOURCE_DIR" -type d -mindepth 1 -exec cp -r {} "$CLIENT_DIR/" \; 2>/dev/null || true
        print_success "Copied additional assets"
    fi
else
    # No index.html, copy everything
    cp -r "$SOURCE_DIR"/* "$CLIENT_DIR/" 2>/dev/null || true
    print_warning "No index.html found. Copied all files. You may need to manually specify the demo file."
fi

# Create password gate by copying template and modifying config
cp "$TEMPLATE_DIR/password-gate.html" "$CLIENT_DIR/index.html"

# Update the configuration in the password gate
sed -i.bak "s/password: 'demo2024'/password: '$PASSWORD'/g" "$CLIENT_DIR/index.html"
sed -i.bak "s/clientId: 'example-client'/clientId: '$CLIENT_NAME'/g" "$CLIENT_DIR/index.html"
rm "$CLIENT_DIR/index.html.bak" 2>/dev/null || true

print_success "Created password-protected entry point"

# Calculate demo URL
DEMO_URL="https://www.patroon.nl/demos/$CLIENT_NAME"

echo ""
print_success "Demo deployment completed!"
echo ""
print_info "Demo URL: $DEMO_URL"
print_info "Password: $PASSWORD"
echo ""
print_warning "Next steps:"
echo "  1. Test the demo locally: open $CLIENT_DIR/index.html"
echo "  2. Commit and push changes to deploy"
echo "  3. Share the URL and password with your client"
echo ""

# Offer to open the demo
read -p "Would you like to open the demo now? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v open &> /dev/null; then
        open "$CLIENT_DIR/index.html"
    elif command -v xdg-open &> /dev/null; then
        xdg-open "$CLIENT_DIR/index.html"
    else
        print_info "Please open $CLIENT_DIR/index.html in your browser"
    fi
fi

print_success "Done! 🎉"