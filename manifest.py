import json

# Define your predefined JSON object
predefined_object = {
    "version": "1.0.0",
    "manifest_version": 3,
    "name": "React Chrome Extension",
    "description": "This is a Chrome extension built with React and TypeScript",
    "action": {
        "default_popup": "index.html",
        "default_title": "React Chrome Extension"
    }
}

# Specify the path to the manifest JSON file
manifest_file_path = "build/manifest.json"

# Clear the contents of the manifest JSON file
with open(manifest_file_path, "w") as manifest_file:
    pass  # This will clear the file

# Write the modified manifest data (predefined object) into the file
with open(manifest_file_path, "w") as manifest_file:
    json.dump(predefined_object, manifest_file, indent=2)

print(f"Manifest file '{manifest_file_path}' has been cleared and updated with the predefined object.")
