#!/bin/bash

# Script to compress PNG images to JPEG at 90% quality
# This will maintain excellent quality while reducing file size

cd "$(dirname "$0")/flamethrower-images"

echo "Starting image compression..."
echo "Converting PNG files to JPEG at 90% quality..."

# Counter for processed files
count=0

# Loop through all PNG files
for file in *.png; do
    if [ -f "$file" ]; then
        # Get filename without extension
        filename="${file%.png}"

        # Convert to JPEG at 90% quality
        sips -s format jpeg -s formatOptions 90 "$file" --out "${filename}.jpg" > /dev/null 2>&1

        if [ $? -eq 0 ]; then
            # Get file sizes
            original_size=$(stat -f%z "$file")
            new_size=$(stat -f%z "${filename}.jpg")

            # Calculate percentage reduction
            reduction=$(echo "scale=1; (1 - $new_size/$original_size) * 100" | bc)

            echo "✓ $file -> ${filename}.jpg (${reduction}% smaller)"

            # Remove original PNG
            rm "$file"

            count=$((count + 1))
        else
            echo "✗ Failed to convert $file"
        fi
    fi
done

echo ""
echo "Compression complete! Processed $count images."
echo ""
echo "Now updating HTML file to use .jpg extensions..."

# Update the HTML file to use .jpg instead of .png
cd ..
sed -i '' 's/flamethrower-images\/\([^"]*\)\.png/flamethrower-images\/\1.jpg/g' flamethrower.html

echo "✓ HTML file updated"
echo ""
echo "All done! Your images are now compressed at 90% quality."
