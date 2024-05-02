#!/bin/bash

for file in *.png; do
  base_name=$(basename "$file" .png)
  if [[ -f "${base_name}.webp" ]]; then
    echo "Deleting ${file}..."
    rm "${file}"
  fi
done

