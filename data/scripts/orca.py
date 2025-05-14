import requests
import pandas as pd
import json
from datetime import datetime


def fetch_orca_pools(limit=50):
    """
    Fetch pool data from Orca API
    """
    url = f"https://api.orca.so/v2/solana/pools?sortBy=tvl&sortDirection=desc&limit={limit}&stats=5m,15m,30m,1H,2H,4H,8H,24H,7D,30D"

    headers = {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()["data"]
    else:
        print(f"Error fetching data: {response.status_code}")
        print(response.text)
        return None


def extract_pool_info(pools_data, target_addresses=None):
    """
    Extract relevant information from pool data
    """
    result = []

    for pool in pools_data:
        # If target addresses are specified, only process those
        if target_addresses and pool["address"] not in target_addresses:
            continue

        pool_info = {
            "address": pool["address"],
            "tokenA_symbol": pool["tokenA"]["symbol"],
            "tokenB_symbol": pool["tokenB"]["symbol"],
            "tvlUsdc": float(pool["tvlUsdc"]),
            "currentYieldOverTvl": float(pool["yieldOverTvl"]),
            "7d_yieldOverTvl": float(pool["stats"]["7d"]["yieldOverTvl"]) if pool["stats"]["7d"]["yieldOverTvl"] else 0
        }

        result.append(pool_info)

    return result


def format_and_display(pool_info):
    """
    Format the pool information as a pandas DataFrame and display it
    """
    df = pd.DataFrame(pool_info)

    # Format numbers for display
    df["tvlUsdc"] = df["tvlUsdc"].apply(lambda x: f"${x:,.2f}")
    df["currentYieldOverTvl"] = df["currentYieldOverTvl"].apply(lambda x: f"{x:.8f}" if x < 0.0001 else f"{x:.6f}")
    df["7d_yieldOverTvl"] = df["7d_yieldOverTvl"].apply(lambda x: f"{x:.8f}" if x < 0.0001 else f"{x:.6f}")

    # Rename columns for better readability
    df.columns = ["Pool Address", "Token A", "Token B", "TVL (USDC)", "Current Yield", "7D Yield"]

    # Set display options for better output
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 120)
    pd.set_option('display.max_rows', None)
    pd.set_option('display.max_colwidth', 35)  # Limit the width of address column

    print("\nOrca Pools Data:")
    print(df.to_string(index=False))

    return df


def save_to_csv(df, filename=None):
    """
    Save the DataFrame to a CSV file
    """
    if filename is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"orca_pools_data_{timestamp}.csv"

    df.to_csv(filename, index=False)
    print(f"\nData saved to {filename}")


def main():
    # List of addresses to filter for (can be removed to get all pools)
    target_addresses = [
        "Hp53XEtt4S8SvPCXarsLSdGfZBuUr5mMmZmX2DRNXQKp",
        "9RqDTfwCx2SgxsvKpspQHc38HUo3B6hRd3oR9JR966Ps",
        "D3LWymVUGhgKKJ33vKq8oHUaGwSuJPTPjnke9QHEXNqz",
        "7riFsDxbskTqDtCSjev2jN9hyAJqeKmbWqgfiWD6ikUC",
        "9tXiuRRw7kbejLhZXtxDxYs2REe43uH2e7k1kocgdM9B",
        "7FcvD7B7GZKJjNUuRAX8exMkMkHPsptwFrqhtLf5c4rf",
        "68soqftZg4HL1Dcis5hMgkLKU9qyC8qbn5JzLhrxhgi9",
        "5xfKkFmhzNhHKTFUkh4PJmHSWB6LpRvhJcUMKzPP6md2",
        "3XLkRVg69AgwKAbnSjJpm3PB4QgVeXFEjiXfw5shWMBT",
        "5wiH1U8kccWcQoES2RMM8cjkdXGaDNwMFMhmyGM75aGS",
        "DtYKbQELgMZ3ihFUrCcCs9gy4djcUuhwgR7UpxVpP2Tg",
        "H6gUYo94dMyhaT4Zm94DRSuH931atRcdAVdMCu3aAwze",
        "4fuUiYxTQ6QCrdSq9ouBYcTM7bqSwYTSyLueGZLTy4T4",
        "8hcwA1hr1bLGLHXBCadXWDgxsc1BTe4hAKPcQgTVNXL4",
        "4z3sxEbjTZbg6UP74uzwJ4J3YYYsX5kGmkQ7GsWPbvuZ"
    ]

    print("Fetching Orca pools data...")
    pools_data = fetch_orca_pools(limit=100)  # Increase limit to make sure we get all pools

    if pools_data:
        print(f"Successfully fetched data for {len(pools_data)} pools")

        # Extract information for specific addresses or for all pools
        pool_info = extract_pool_info(pools_data, target_addresses)

        if pool_info:
            df = format_and_display(pool_info)

            # Save to CSV
            save_to_csv(df)

            # You can also save the raw data for future reference
            with open("orca_pools_raw_data.json", "w") as f:
                json.dump(pools_data, f, indent=2)
            print("Raw data saved to orca_pools_raw_data.json")
        else:
            print("No matching pools found with the specified addresses")
    else:
        print("Failed to fetch data")


if __name__ == "__main__":
    main()