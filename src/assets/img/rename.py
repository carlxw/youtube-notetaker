import os

def remove_first_suffix_from_png():
    directory = os.getcwd()
    for filename in os.listdir(directory):
        if filename.endswith(".png"):
            new_filename = filename.replace("_1", "", 1)  # Remove only the first instance
            old_path = os.path.join(directory, filename)
            new_path = os.path.join(directory, new_filename)
            os.rename(old_path, new_path)
            print(f'Renamed: {filename} -> {new_filename}')

remove_first_suffix_from_png()
