# fix-react-native.ps1
# Swifter Swep Mr. Clean Turbo Edition (Prompt Version, No Emojis)

function Start-MrClean-Turbo {
    Write-Host "Starting Swifter Swep Mr. Clean Turbo Edition..."

    # Move to script root
    Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)

    # Kill Metro Bundler if running
    Write-Host "Checking for Metro Bundler process on port 8081..."
    $portInfo = netstat -ano | findstr ":8081"
    if ($portInfo) {
        $processId = ($portInfo -split "\s+")[-1]
        Write-Host "Killing process on port 8081 (PID $processId)..."
        Stop-Process -Id $processId -Force
    } else {
        Write-Host "No Metro Bundler running on 8081."
    }

    # Remove node_modules
    if (Test-Path node_modules) {
        Write-Host "Removing node_modules..."
        Remove-Item -Recurse -Force node_modules
    }

    # Remove package-lock.json
    if (Test-Path package-lock.json) {
        Write-Host "Removing package-lock.json..."
        Remove-Item -Force package-lock.json
    }

    # Remove yarn.lock
    if (Test-Path yarn.lock) {
        Write-Host "Removing yarn.lock..."
        Remove-Item -Force yarn.lock
    }

    # Install fresh dependencies
    Write-Host "Installing fresh npm packages..."
    npm install

    # Start Metro Bundler with cache reset
    Write-Host "Resetting Metro bundler cache..."
    Start-Process powershell -ArgumentList "npx react-native start --reset-cache" -NoNewWindow

    # Give Metro a few seconds to start
    Start-Sleep -Seconds 5

    # Prompt for platform choice
    Write-Host ""
    Write-Host "Choose platform to run after clean:"
    Write-Host "1. Android"
    Write-Host "2. iOS"
    Write-Host "3. None (only clean and Metro)"
    $choice = Read-Host "Enter your choice (1/2/3)"

    switch ($choice) {
        "1" {
            Write-Host "Launching Android build..."
            npx react-native run-android
        }
        "2" {
            Write-Host "Launching iOS build..."
            npx react-native run-ios
        }
        "3" {
            Write-Host "Skipping launch. Clean complete."
        }
        Default {
            Write-Host "Invalid choice. Skipping launch."
        }
    }

    Write-Host "Mr. Clean Turbo finished. Project is ready."
}

# Execute function
Start-MrClean-Turbo
