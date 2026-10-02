#!/usr/bin/env bash
# Sprout Craft Engineering Cookbook
# Recipe #41: Git Pre-Commit Hook to Guard Against Secret Leaks

set -e

# Block staging of .env files
FORBIDDEN_FILES='(\.env|\.env\.local|id_rsa|id_ed25519)$'
staged_files=$(git diff --cached --name-only)

for file in $staged_files; do
  if [[ "$file" =~ $FORBIDDEN_FILES ]]; then
    echo "ERROR: Attempting to commit sensitive file: $file"
    echo "Aborting commit. Add it to .gitignore or remove from index."
    exit 1
  fi
done

# Block private keys inside code content
if git diff --cached | grep -E -q "BEGIN (RSA|EC|OPENSSH) PRIVATE KEY"; then
  echo "ERROR: Detected private key in staged changes!"
  exit 1
fi

echo "Pre-commit secret scan passed."
exit 0
