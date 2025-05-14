import json
import requests


def fetch_clmm_data(target_addresses=None):
    """
    Fetch CLMM pairs data directly from Meteora API

    Args:
        target_addresses (list): List of addresses to filter by (optional)

    Returns:
        list: List of dictionaries with name, liquidity and APY info
    """
    url = "https://www.meteora.ag/clmm-api/pair/all_by_groups?page=0&limit=100&unknown=true&sort_key=volume&order_by=desc"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for HTTP errors
        data = response.json()
    except (requests.RequestException, json.JSONDecodeError) as e:
        print(f"Error fetching CLMM data: {e}")
        return []

    results = []

    for group in data.get('groups', []):
        for pair in group.get('pairs', []):
            address = pair.get('address')

            # If target addresses are provided, filter only those
            if target_addresses and address not in target_addresses:
                continue

            name = pair.get('name')
            liquidity = pair.get('liquidity')
            apy = pair.get('apy')

            results.append({
                'address': address,
                'name': name,
                'liquidity': liquidity,
                'apy': apy
            })

    return results


def fetch_amm_data(target_addresses=None):
    """
    Fetch AMM pools data directly from Meteora API

    Args:
        target_addresses (list): List of addresses to filter by (optional)

    Returns:
        list: List of dictionaries with pool_name, pool_tvl and apr info
    """
    url = "https://www.meteora.ag/amm/pools/search?page=0&size=100&sort_key=tvl&order_by=desc"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for HTTP errors
        data = response.json()
    except (requests.RequestException, json.JSONDecodeError) as e:
        print(f"Error fetching AMM data: {e}")
        return []

    results = []

    for pool in data.get('data', []):
        pool_address = pool.get('pool_address')

        # If target addresses are provided, filter only those
        if target_addresses and pool_address not in target_addresses:
            continue

        pool_name = pool.get('pool_name')
        pool_tvl = pool.get('pool_tvl')
        apr = pool.get('apr')

        results.append({
            'pool_address': pool_address,
            'pool_name': pool_name,
            'pool_tvl': pool_tvl,
            'apr': apr
        })

    return results


def main():
    # Example target addresses
    clmm_addresses = [
        'BoeMUkCLHchTD31HdXsbDExuZZfcUppSLpYtV3LZTH6U',
        'ARwi1S4DaiTG5DX7S4M4ZsrXqpMD1MrTmbu9ue2tpmEq',
        'JCFBoXNyFu9eLaskXm11qxSdx6x7i3LK8pETJE2LRGt2'
    ]

    amm_addresses = [
        'HcjZvfeSNJbNkfLD4eEcRBr96AD3w1GpmMppaeRZf7ur',
        '32D4zRxNc1EssbJieVHfPhZM3rH6CzfUPrWUuWxD9prG',
        'ERgpKaq59Nnfm9YRVAAhnq16cZhHxGcDoDWCzXbhiaNw',
        'DvWpLaNUPqoCGn4foM6hekAPKqMtADJJbJWhwuMiT6vK'
    ]

    print("Fetching CLMM pairs data...")
    # Set target_addresses to None to get all data or use clmm_addresses for filtering
    clmm_results = fetch_clmm_data(None)

    print(f"Found {len(clmm_results)} CLMM pairs")
    print("\nCLMM Pairs Data:")
    print("{:<45} {:<15} {:<20} {:<10}".format("Address", "Name", "Liquidity", "APY"))
    print("-" * 90)

    for result in clmm_results:
        # Check if we have the specific addresses in the results
        if result['address'] in clmm_addresses:
            print(f"Found target address: {result['address']}")

        try:
            apy_value = float(result['apy'])
        except (ValueError, TypeError):
            apy_value = 0.0

        print("{:<45} {:<15} {:<20} {:<10.2f}%".format(
            result['address'],
            result['name'],
            result['liquidity'],
            apy_value
        ))

    print("\nFetching AMM pools data...")
    # Set target_addresses to None to get all data or use amm_addresses for filtering
    amm_results = fetch_amm_data(None)

    print(f"Found {len(amm_results)} AMM pools")
    print("\nAMM Pools Data:")
    print("{:<45} {:<15} {:<20} {:<10}".format("Pool Address", "Pool Name", "Pool TVL", "APR"))
    print("-" * 90)

    for result in amm_results:
        # Check if we have the specific addresses in the results
        if result['pool_address'] in amm_addresses:
            print(f"Found target address: {result['pool_address']}")

        try:
            apr_value = float(result['apr'])
        except (ValueError, TypeError):
            apr_value = 0.0

        print("{:<45} {:<15} ${:<19} {:<10.2f}%".format(
            result['pool_address'],
            result['pool_name'],
            result['pool_tvl'],
            apr_value
        ))

    # Extract specific target addresses data
    print("\n\nExtracting data for target addresses:")

    print("\nTarget CLMM Addresses:")
    for address in clmm_addresses:
        found = False
        for result in clmm_results:
            if result['address'] == address:
                found = True
                print(f"Address: {address}")
                print(f"Name: {result['name']}")
                print(f"Liquidity: {result['liquidity']}")
                print(f"APY: {result['apy']}%")
                print("-" * 40)

        if not found:
            print(f"Address: {address} - Not found in data")
            print("-" * 40)

    print("\nTarget AMM Addresses:")
    for address in amm_addresses:
        found = False
        for result in amm_results:
            if result['pool_address'] == address:
                found = True
                print(f"Pool Address: {address}")
                print(f"Pool Name: {result['pool_name']}")
                print(f"Pool TVL: ${result['pool_tvl']}")
                print(f"APR: {result['apr']}%")
                print("-" * 40)

        if not found:
            print(f"Pool Address: {address} - Not found in data")
            print("-" * 40)


if __name__ == "__main__":
    main()