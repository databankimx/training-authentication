# setup.ps1
#
# Creates the tutorial's own Python environment and JavaScript sample packages. Run it once from the
# training-authentication folder, in PowerShell:
#
#   powershell -ExecutionPolicy Bypass -File .\setup.ps1
#
# The Python packages are listed in requirements.txt, and the JavaScript packages in samples\package.json.
# This script covers those packages. The rest of setup (Git, PowerShell 7, Node.js 24, the .NET 10 SDK, and the
# editor extensions) is added before publication.

$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

# Python: a virtual environment in .venv, with the packages listed in requirements.txt.
Write-Host 'Creating the Python environment (.venv)...'
if (-not (Test-Path '.venv\Scripts\python.exe')) {
    py -3.12 -m venv .venv
    if ($LASTEXITCODE -ne 0) { throw 'Python 3.12 was not found. Install Python 3.12 and run this script again.' }
}
& .\.venv\Scripts\python.exe -m pip install --upgrade pip
if ($LASTEXITCODE -ne 0) { throw 'Could not upgrade pip in .venv.' }
& .\.venv\Scripts\python.exe -m pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) { throw 'Could not install the Python packages in requirements.txt.' }

# JavaScript: samples\package.json declares the ES module setting and the packages, and npm installs them.
Write-Host 'Creating the JavaScript samples folder...'
New-Item -ItemType Directory -Force -Path 'samples' | Out-Null
if (-not (Test-Path 'samples\package.json')) {
    $packageJson = @'
{
  "name": "training-authentication-samples",
  "private": true,
  "type": "module",
  "dependencies": {
    "express": "5.2.1",
    "jose": "6.2.13"
  }
}
'@
    Set-Content -Path 'samples\package.json' -Value $packageJson -Encoding utf8
}
Set-Location -Path 'samples'
npm install
if ($LASTEXITCODE -ne 0) { throw 'Could not install the JavaScript packages in samples\package.json.' }
Set-Location -Path $PSScriptRoot

Write-Host ''
Write-Host 'Setup finished. The Python environment is in .venv, and the JavaScript packages are in samples\node_modules.'
