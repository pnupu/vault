import json
import os
import shutil

# Define paths
consolidated_yields_file = os.path.join('..', 'consolidated_yields.json') # Relative to script location
strategies_output_file = os.path.join('..', 'strategies.json')
yield_endpoints_output_file = os.path.join('..', 'yield_endpoints.json')

source_svg_dir = os.path.join('..', 'svgs')
source_image_dir = os.path.join('..', 'images')

output_visual_assets_dir = os.path.join('..', 'visual_assets')
output_visual_apps_dir = os.path.join(output_visual_assets_dir, 'apps')
output_visual_assets_assets_dir = os.path.join(output_visual_assets_dir, 'assets')
output_visual_assets_categories_dir = os.path.join(output_visual_assets_dir, 'categories')

# Ensure output visual directories exist
os.makedirs(output_visual_apps_dir, exist_ok=True)
os.makedirs(output_visual_assets_assets_dir, exist_ok=True)
os.makedirs(output_visual_assets_categories_dir, exist_ok=True)

def find_and_copy_asset(name, target_subdir, asset_source_svg_dir, asset_source_image_dir):
    base_filename = name
    found_image_path = None
    copied_filename = None

    # Check SVGs first, then PNGs
    for ext in ['.svg', '.png']:
        # Try direct name match first
        source_file_direct_svg = os.path.join(asset_source_svg_dir, base_filename + ext)
        source_file_direct_png = os.path.join(asset_source_image_dir, base_filename + ext)

        if os.path.exists(source_file_direct_svg):
            found_image_path = source_file_direct_svg
            break
        elif os.path.exists(source_file_direct_png):
            found_image_path = source_file_direct_png
            break
    
    if found_image_path:
        copied_filename = os.path.basename(found_image_path)
        destination_path = os.path.join(target_subdir, copied_filename)
        if not os.path.exists(destination_path): # Avoid error if script run multiple times
            shutil.copy(found_image_path, destination_path)
        #     print(f"Info: File {copied_filename} already exists in {target_subdir}")
        return copied_filename
    else:
        # print(f"Warning: No image found for '{name}' (tried {base_filename}.svg/png in {asset_source_svg_dir} and {asset_source_image_dir})")
        return f"IMAGE_NOT_FOUND_FOR_{name.replace(' ', '_').replace('/', '_')}"


print(f"Starting data reorganization script...")
print(f"Consolidated yields file: {os.path.abspath(consolidated_yields_file)}")
print(f"Strategies output file: {os.path.abspath(strategies_output_file)}")
print(f"Yield endpoints output file: {os.path.abspath(yield_endpoints_output_file)}")
print(f"Source SVGs: {os.path.abspath(source_svg_dir)}")
print(f"Source Images: {os.path.abspath(source_image_dir)}")
print(f"Output Visual Assets: {os.path.abspath(output_visual_assets_dir)}")


# 1. Load consolidated_yields.json
try:
    with open(consolidated_yields_file, 'r') as f:
        all_data = json.load(f)
    print(f"Successfully loaded {consolidated_yields_file}")
except FileNotFoundError:
    print(f"Error: {consolidated_yields_file} not found. Make sure the path is correct relative to the script location.")
    exit(1)
except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from {consolidated_yields_file}.")
    exit(1)


strategies_list = []
raw_yield_points = [] 

# 2. Separate strategies and raw yield points
for original_key, data_item in all_data.items():
    if "Strategy" in original_key and "sources" in data_item:
        strategies_list.append(data_item)
    else:
        app_name = data_item.get("app")
        asset_name_from_data = data_item.get("name") 
        apy = data_item.get("apy")
        category = data_item.get("category")

        if not app_name:
            # print(f"Warning: Missing 'app' for key {original_key}. Skipping.")
            continue
        if asset_name_from_data is None: # Check if asset name is None
             # print(f"Warning: Missing 'name' (asset name) for key {original_key}. Skipping.")
            continue


        prefix_to_remove = app_name + "-"
        market_id = original_key[len(prefix_to_remove):] if original_key.startswith(prefix_to_remove) else original_key
        
        raw_yield_points.append({
            "app_name": app_name,
            "asset_name": asset_name_from_data,
            "apy": apy,
            "category": category,
            "market_id": market_id
        })
        
        # Copy visual assets for this asset_name and category
        if asset_name_from_data: # Ensure asset_name_from_data is not None
            find_and_copy_asset(asset_name_from_data, output_visual_assets_assets_dir, source_svg_dir, source_image_dir)
        if category: # Ensure category is not None
            find_and_copy_asset(category, output_visual_assets_categories_dir, source_svg_dir, source_image_dir)

# 3. Write strategies_list to data/strategies.json
with open(strategies_output_file, 'w') as f:
    json.dump(strategies_list, f, indent=2)
print(f"Successfully wrote {len(strategies_list)} strategies to {strategies_output_file}")

# 4. Process raw_yield_points into the desired yield_endpoints.json structure
apps_data_intermediate = {} 

for point in raw_yield_points:
    app_name = point["app_name"]
    category = point["category"]
    asset_name_for_market = point["asset_name"]


    if app_name not in apps_data_intermediate:
        app_image_filename = find_and_copy_asset(app_name, output_visual_apps_dir, source_svg_dir, source_image_dir)
        apps_data_intermediate[app_name] = {
            "image": app_image_filename,
            "markets_by_category": {}
        }

    if category not in apps_data_intermediate[app_name]["markets_by_category"]:
        apps_data_intermediate[app_name]["markets_by_category"][category] = []
    
    # Ensure asset_name_for_market is not None before using it
    if asset_name_for_market is not None:
        apps_data_intermediate[app_name]["markets_by_category"][category].append({
            "market_id": point["market_id"],
            "apy": point["apy"],
            "name": asset_name_for_market 
        })
    # else:
    #     # print(f"Skipping market point for app {app_name}, category {category} due to missing asset name.")


yield_endpoints_list_final = []
for app_name, data in apps_data_intermediate.items():
    yield_endpoints_list_final.append({
        "name": app_name,
        "image": data["image"],
        "markets": data["markets_by_category"]
    })

# 5. Write yield_endpoints_list_final to data/yield_endpoints.json
with open(yield_endpoints_output_file, 'w') as f:
    json.dump(yield_endpoints_list_final, f, indent=2)
print(f"Successfully wrote {len(yield_endpoints_list_final)} app entries to {yield_endpoints_output_file}")

print(f"Visual assets organized in {os.path.abspath(output_visual_assets_dir)}")
print("Data reorganization script finished.") 