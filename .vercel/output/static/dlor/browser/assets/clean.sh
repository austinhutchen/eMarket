#!/bin/bash

for ext in jpg png; do
  for file in *."$ext"; do
    base_name=$(basename "$file" ."$ext")
    if [[ -f "${base_name}.webp" ]]; then
      echo "Deleting ${file}..."
      rm "${file}"
    fi
  done
done