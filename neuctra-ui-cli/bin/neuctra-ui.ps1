#!/usr/bin/env pwsh
$BinDir = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
node.exe "$BinDir/index.js" $args
exit $LASTEXITCODE
