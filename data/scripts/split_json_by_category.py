import json
import os

def split_json_by_category(input_filepath="../consolidated_yields.json"):
    """
    Reads a JSON file, splits its contents by the "category" field,
    and writes each category's data into a separate JSON file.

    Args:
        input_filepath (str): The path to the input JSON file.
    """
    try:
        with open(input_filepath, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: Input file '{input_filepath}' not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from '{input_filepath}'.")
        return

    categorized_data = {}
    for key, value in data.items():
        category = value.get("category")
        if category:
            if category not in categorized_data:
                categorized_data[category] = {}
            categorized_data[category][key] = value
        else:
            print(f"Warning: Entry '{key}' has no 'category' field and will be skipped.")

    output_dir = "../categorized_yields"
    os.makedirs(output_dir, exist_ok=True)

    for category, items in categorized_data.items():
        # Sanitize category name for use as a filename
        safe_category_name = "".join(c if c.isalnum() or c in (' ', '_', '-') else '_' for c in category).rstrip()
        if not safe_category_name:
            safe_category_name = "unknown_category"
        
        output_filename = os.path.join(output_dir, f"{safe_category_name}.json")
        try:
            with open(output_filename, 'w') as f:
                json.dump(items, f, indent=2)
            print(f"Successfully wrote {len(items)} items to '{output_filename}'")
        except IOError:
            print(f"Error: Could not write to file '{output_filename}'.")

if __name__ == "__main__":
    split_json_by_category() 