#!/bin/bash

# Create directories if they don't exist
mkdir -p assets/company-logos

# Download Moderna logo
curl -o assets/company-logos/moderna-logo.png "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Moderna_logo.svg/512px-Moderna_logo.svg.png"

# Download Zoom logo
curl -o assets/company-logos/zoom-logo.png "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Zoom_logo.svg/512px-Zoom_logo.svg.png"

# Download a placeholder for Pickle Poll (since it's a smaller company)
curl -o assets/company-logos/pickle-poll-logo.png "https://via.placeholder.com/512x512/4CAF50/FFFFFF?text=Pickle+Poll"

# Make the script executable
chmod +x download-logos.sh

echo "Logos downloaded successfully!" 