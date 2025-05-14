import requests
import json
import pandas as pd

# API endpoint for pool information
url = "https://api-v3.raydium.io/pools/info/list?poolType=concentrated&poolSortField=default&sortType=desc&pageSize=1000&page=1"

# List of IDs we're looking for
target_ids = [
    "AS5MV3ear4NZPMWXbCsEz3AdbCaXEnq4ChdaWsvLgkcM",
    "EHv8PhAfV8tEdqoiBUR3paozTjHLvdqxkm32hgb2f3WT",
    "8EzbUfvcRT1Q6RL462ekGkgqbxsPmwC5FMLQZhSPMjJ3",
    "BZtgQEyS6eXUXicYPHecYQ7PybqodXQMvkjUbP4R8mUU",
    "DbsTAmxnFAWRvigSks6DahpKi5Ypz3w2BMKEejTJcGGm",
    "2uoKbPEidR7KAMYtY4x7xdkHXWqYib5k4CutJauSL3Mc",
    "Ap9MSstSzzduooxWctfcWzYDqcoZSYc5uBg413KT6XR9",
    "529FAHK9P4bZtUtG2qpGemdttE9jDNSEohH5HzoAHMXJ",
    "4fnrjdmQcfC1AcmH2qbq52QH6xa1MYo9212Ue6fhXN63",
    "F5oK5zdyUktrzTgSJdBFL73xUdCLcHfHfHdBcpydhXoK"
]


def fetch_pool_data():
    print(f"Fetching data from: {url}")
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for 4XX/5XX responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None


def find_pools_by_ids(data, target_ids):
    if not data or 'data' not in data or 'data' not in data['data']:
        print("Invalid data format received")
        return []

    pools = data['data']['data']
    found_pools = []

    for pool in pools:
        if pool['id'] in target_ids:
            found_pools.append({
                'id': pool['id'],
                'pair': f"{pool['mintA']['symbol']}/{pool['mintB']['symbol']}",
                'tvl': pool['tvl'],
                'day_apr': pool['day']['apr'],
                'week_apr': pool['week']['apr']
            })

    return found_pools


def check_multiple_pages(target_ids, max_pages=10):
    all_found_pools = []
    found_ids = set()

    for page in range(1, max_pages + 1):
        current_url = url.replace("page=1", f"page={page}")
        print(f"Checking page {page}...")

        data = fetch_pool_data()
        if not data:
            break

        pools = find_pools_by_ids(data, target_ids)
        all_found_pools.extend(pools)

        # Track which IDs we've found
        for pool in pools:
            found_ids.add(pool['id'])

        # Stop if we've found all the IDs we're looking for
        if set(target_ids).issubset(found_ids):
            print(f"All target IDs found by page {page}")
            break

        # Check if we've reached the last page
        if len(data['data']['data']) < 100:  # Assuming pageSize=100
            print(f"Reached last page at page {page}")
            break

    return all_found_pools, found_ids


# Main execution
data = fetch_pool_data()
if data:
    # First check if the pools are in the first page
    found_pools = find_pools_by_ids(data, target_ids)
    found_ids = {pool['id'] for pool in found_pools}

    # Display results
    if found_pools:
        print(f"\nFound {len(found_pools)} pools in first page:")
        df = pd.DataFrame(found_pools)
        print(df)
    else:
        print("No matching pools found in the first page.")

    # Check which IDs are missing
    missing_ids = set(target_ids) - found_ids
    if missing_ids:
        print(f"\nMissing IDs: {missing_ids}")
        print("Would need to check additional pages or use specific API endpoints for these IDs.")

    # Create formatted output with the found pools
    print("\nPool Data Results:")
    print(f"{'ID':<45} {'Pair':<15} {'TVL':<15} {'Day APR':<15} {'Week APR':<15}")
    print("-" * 105)

    for pool in found_pools:
        print(f"{pool['id']:<45} {pool['pair']:<15} ${pool['tvl']:,.2f}  {pool['day_apr']}%  {pool['week_apr']}%")
else:
    print("Failed to fetch data from the API.")