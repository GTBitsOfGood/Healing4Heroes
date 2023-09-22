#!/bin/bash

if [ ! -f "./.env" ]; then
  echo "Secrets not found. Pulling files from Bitwarden..."
  if [[ -z "${BW_PASSWORD}" ]]; then
    echo "Error: BW_PASSWORD envvar is not defined. Please inject BW_PASSWORD into container!"
    exit 1;
  fi

  npm install -g @bitwarden/cli fx
  # get secrets. we can't use the npm scripts because we need to inject BW_PASSWORD.
  bw logout
  bw sync --session $(bw login product@bitsofgood.org ${BW_PASSWORD} --raw)
  bw get item Healing4Heroes/development/backend/.env | fx .notes > ".env"
  bw get item Healing4Heroes/development/backend/firebase-service-account.json | fx .notes > "server/utils/firebase-service-account.json"

  echo "Secrets successfully retrieved."
fi

npm run dev
