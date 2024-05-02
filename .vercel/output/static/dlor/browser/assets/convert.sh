#!/bin/zsh

# Define the image types to search for
image_types=("*.jpeg" "*.jpg" "*.tiff" "*.tif" "*.png")

# Iterate over each image type
for type in "${image_types[@]}"; do
  # Find files of the specified image type
  find . -type f -iname "$type" | while read -r IMAGE; do
    # Get the filename without extension
   filename_without_extension=${IMAGE%.*}

    # Convert the image to WebP format
    cwebp "$IMAGE" -o "${filename_without_extension}.webp"

    echo "Converted $IMAGE to ${filename_without_extension}.webp"

     # rm -rf "$IMAGE";
  done
done

echo "Conversion complete."
