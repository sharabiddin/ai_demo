# Deployment Guide

## Docker & GitHub Actions Deployment Setup

This project is configured for automatic deployment to your VPS using Docker and GitHub Actions.

## Prerequisites

- Docker and Docker Compose installed on your VPS
- GitHub repository (public or private)
- VPS with SSH access

## GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

### Required Secrets:

- **VPS_HOST**: Your VPS IP address (e.g., `123.45.67.89`)
- **VPS_USER**: Your VPS username (e.g., `root` or `ubuntu`)
- **VPS_PASSWORD**: Your VPS SSH password
- **REPO_URL**: Your repository URL (e.g., `https://github.com/yourusername/ai_demo.git`)

## VPS Setup

1. **Install Docker and Docker Compose on your VPS:**

```bash
# Update packages
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group (replace 'user' with your username)
sudo usermod -aG docker $USER

# Verify installation
docker --version
docker-compose --version
```

2. **Configure firewall (if needed):**

```bash
# Allow port 3000 for the app
sudo ufw allow 3000/tcp
sudo ufw allow 22/tcp  # SSH
sudo ufw enable
```

## Deployment Process

### Automatic Deployment (via GitHub Actions)

Every time you push to the `main` branch, GitHub Actions will:

1. Connect to your VPS via SSH
2. Clone/pull the latest code
3. Build the Docker image
4. Start the application using Docker Compose

### Manual Deployment

You can also trigger deployment manually:

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Deploy to VPS** workflow
4. Click **Run workflow** → **Run workflow**

### Local Docker Build (for testing)

```bash
# Build the image
docker-compose build

# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## Accessing the Application

After deployment, your application will be available at:

```
http://YOUR_VPS_IP:3000
```

## Troubleshooting

### Check if containers are running:
```bash
docker ps
```

### View logs:
```bash
docker-compose logs -f app
```

### Restart the application:
```bash
docker-compose restart
```

### Rebuild and restart:
```bash
docker-compose down
docker-compose up -d --build
```

### Clean up old images:
```bash
docker image prune -f
```

## Environment Variables

If you need to add environment variables:

1. Create a `.env` file in the project root
2. Add your variables (they won't be committed to git)
3. Update `docker-compose.yml` to use the `.env` file

## Production Considerations

- Consider using **Nginx** as a reverse proxy
- Set up **SSL/TLS** with Let's Encrypt
- Configure **domain name** instead of IP
- Set up **monitoring** and **logging**
- Enable **automatic backups**

## Support

For issues or questions, check the deployment logs in GitHub Actions.
