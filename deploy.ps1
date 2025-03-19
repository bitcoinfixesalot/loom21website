# Check if Azure CLI is logged in
Write-Host "Checking Azure CLI login status..."
try {
    az account show 2>&1 | Out-Null
    Write-Host "Azure CLI already logged in."
}
catch {
    Write-Host "Azure CLI not logged in. Initiating login..."
    az login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Azure login failed. Please try again."
        exit 1
    }
}

# Login to Azure Container Registry
Write-Host "Logging into Azure Container Registry..."
az acr login --name loomapplicationacr
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: ACR login failed. Please check your registry name and permissions."
    exit 1
}

# Build the Docker image
Write-Host "Building Docker image..."
docker build -t loom21website .

# Tag the image for Azure Container Registry
Write-Host "Tagging image..."
docker tag loom21website loomapplicationacr.azurecr.io/loom21website

# Push the image to Azure Container Registry
Write-Host "Pushing image to ACR..."
docker push loomapplicationacr.azurecr.io/loom21website

Write-Host "Deployment complete!"