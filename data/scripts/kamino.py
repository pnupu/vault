import requests
import json
from datetime import datetime, timedelta
import asyncio
import aiohttp

# Define the date range for the past week
end_date = datetime.now().strftime('%Y-%m-%d')  # Today
start_date = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')  # 7 days ago

# Define the market-reserve combinations to fetch
market_reserves = [
    {
        "market": "DxXdAyU3kCjnyggvHmY5nAwg5cRbbmdyX3npfDMjjMek",
        "reserves": [
            "Ga4rZytCpq1unD4DbEJ5bkHeUz9g3oh9AAFEi6vSauXp",
            "FswUCVjvfAuzHCgPDF95eLKscGsLHyJmD6hzkhq26CLe",
            "2ov3CMqPBYG3jNBmmpXgK9KMW5GmU5GWZNGcwf7w3BC1",
            "8rM1AY8M4YP4xNVmxhKnEUnj5CRWrcbcHpcgMoDfgqVi"
        ]
    },
    {
        "market": "H6rHXmXoCQvq8Ue81MqNh7ow5ysPa1dSozwW3PU1dDH6",
        "reserves": [
            "6gTJfuPHEg6uRAijRkMqNc9kan4sVZejKMxmvx2grT1p",
            "F9HdecRG8GPs9LEn4S5VfeJVEZVqrDJFR6bvmQTi22na",
        ]
    },
    {
        "market": "7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF",
        "reserves": [
            "d4A2prbA2whesmvHaL88BH6Ewn5N4bTSU2Ze8P6Bc4Q",
            "D6q6wuQSrifJKZYpR1M8R4YawnLDtDsMmWM1NbBmgJ59",
            "37Jk2zkz23vkAYBT66HM2gaqJuNg2nYLsCreQAVt5MWK",
            "ESCkPWKHmgNE7Msf77n9yzqJd5kQVWWGy3o5Mgxhvavp",
            "BHUi32TrEsfN2U821G4FprKrR4hTeK4LCWtA3BFetuqA",
            "H3t6qZ1JkguCNTi9uzVKqQ7dvt2cum4XiXWom6Gn5e5S",
            "Bpc4kAh29J3YDQUMJJdGdr1zBAhTQjC48R1B8YTWudsi",
            "DGQZWCY17gGtBUgdaFs1VreJWsodkjFxndPsskwFKGpp",
            "EVbyPKrHG6WBfm4dLxLMJpUDY43cCAcHSpV3KYjKsktW",
            "FBSyPnxtHKLBZ4UeeUyAnbtFuAmTHLtso9YtsqRDRWpM",
            "BvafE5Sm6rLrBbVRtJ2FkCzfNJQ2TjcL8bvPZULUDYrt",
            "2gc9Dm1eB6UgVYFBUN9bWks6Kes9PbWSaPaa9DqyvEiN",
            "febGYTnFX4GbSGoFHFeJXUHgNaK53fB23uDins9Jp1E",
            "HYnVhjsvU1vBKTPsXs1dWe6cJeuU8E4gjoYpmwe81KzN",
            "CHBNUPdjeo2N5QkZY2uAqv7TW5EbCTMsfvaskCBuxbom",
            "H9vmCVd77N1HZa36eBn3UnftYmg4vQzPfm1RxabHAMER",
            "2UFz8kwraHybFyKhGQRwAsE5NtNpAhWs2X5grGoS7hnQ",
            "CExamod1Ai3d1N8Vh7sBjt5xbZzb2VmGMAFocf7fxCzm",
            "B5uYvxUcwX5fCB4msGU4DaHh8k6fsSkKHNboy94F9vbt",
            "HMCXsf1jFUDbvGGhvUzCzwkKbmUhxhxz7gYZwXpTuReT",
            "StGKGcLQoTsWzQ1tFY2bWqrdiuBhqdFE4niiAutQxQB",
            "Ht9NoB1udjpRqws1sCw1j2dL7MeTDHYCDdDFkbc1Arst",
            "6U9CnJYCQwHUEmf4Pq4oGVKHVvD29wZvtPbFNjYmgjaF",
            "Fqjbo3L4NAyzPcy6swv1XXLm1c7tUTKWMDkjCo9mfSDq"
        ]
    },
    {
        "market": "BJnbcRHqvppTyGesLzWASGKnmnF1wq9jZu6ExrjT7wvF",
        "reserves": [
            "EwBTjwCXJ3TsKP8dNTYnzRmBWRd6h48FdLFSAGJ3sCtx",
            "EDf6dGbVnCCABbNhE3mp5i1jV2JhDAVmTWb1ztij1Yhs",
            "2erD9GTGcaQbLsVSQweg3HvMpfKxScmz95raWv8H4iPN"
        ]
    },
    {
        "market": "ByYiZxp8QrdN9qbdtaAiePN8AAr3qvTPppNJDpf5DVJ5",
        "reserves": [
            "9TD2TSv4pENb8VwfbVYg25jvym7HN6iuAR6pFNSrKjqQ",
            "D4c6nsTRjD2Kv7kYEUjtXiw72YKP8a1XHd33g38UpaV8"
        ]
    }
]


async def fetch_reserve_metrics(session, market, reserve):
    """Fetch metrics for a specific market-reserve combination"""
    url = f"https://api.kamino.finance/kamino-market/{market}/reserves/{reserve}/metrics/history?env=mainnet-beta&start={start_date}&end={end_date}"

    print(f"Fetching data from: {url}")

    try:
        async with session.get(url) as response:
            if response.status != 200:
                return {
                    "error": f"HTTP {response.status}: {response.reason}"
                }

            data = await response.json()

            # If there's history data available, get the latest entry
            if data.get("history") and len(data["history"]) > 0:
                # Get the latest entry
                latest_data = data["history"][-1]

                # Extract metrics except borrowCurve
                metrics = latest_data["metrics"]
                metrics.pop("borrowCurve", None)  # Remove borrowCurve if it exists

                return {
                    "timestamp": latest_data["timestamp"],
                    "symbol": metrics.get("symbol"),
                    "metrics": metrics
                }
            else:
                return {
                    "error": "No history data available"
                }
    except Exception as e:
        return {
            "error": str(e)
        }


async def fetch_all_metrics():
    """Fetch metrics for all market-reserve combinations"""
    results = {}

    async with aiohttp.ClientSession() as session:
        tasks = []

        # Create tasks for all market-reserve combinations
        for market_data in market_reserves:
            market = market_data["market"]
            results[market] = {}

            for reserve in market_data["reserves"]:
                task = asyncio.create_task(fetch_reserve_metrics(session, market, reserve))
                tasks.append((market, reserve, task))

        # Wait for all tasks to complete
        for market, reserve, task in tasks:
            results[market][reserve] = await task

    return results


def format_results(results):
    """Format the results in a more readable way"""
    formatted_results = {}

    for market, reserves in results.items():
        formatted_results[market] = {}

        for reserve, data in reserves.items():
            if "error" in data:
                formatted_results[market][reserve] = {"error": data["error"]}
                continue

            metrics = data["metrics"]
            formatted_results[market][reserve] = {
                "timestamp": data["timestamp"],
                "symbol": data["symbol"],
                "metrics": {
                    "status": metrics.get("status"),
                    "borrowTvl": f"{float(metrics.get('borrowTvl', 0)):.2f}",
                    "depositTvl": f"{float(metrics.get('depositTvl', 0)):.2f}",
                    "totalSupply": f"{float(metrics.get('totalSupply', 0)):.2f}",
                    "borrowInterestAPY": f"{float(metrics.get('borrowInterestAPY', 0)) * 100:.2f}%",
                    "supplyInterestAPY": f"{float(metrics.get('supplyInterestAPY', 0)) * 100:.2f}%",
                    "assetPriceUSD": f"{float(metrics.get('assetPriceUSD', 0)):.6f}",
                    "totalLiquidity": f"{float(metrics.get('totalLiquidity', 0)):.2f}",
                }
            }

    return formatted_results


async def main():
    """Main function to execute the fetch and format the results"""
    try:
        print("Fetching Kamino metrics...")
        results = await fetch_all_metrics()
        print("Formatting results...")
        formatted_results = format_results(results)
        print("Done!")
        return formatted_results
    except Exception as e:
        print(f"Error in main function: {e}")
        return {"error": str(e)}


# Run the main function
if __name__ == "__main__":
    results = asyncio.run(main())
    print(json.dumps(results, indent=2))