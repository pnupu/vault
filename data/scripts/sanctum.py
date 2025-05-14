import requests
import json
from datetime import datetime


def fetch_highest_epoch_apys():
    # List of LST IDs to fetch
    lst_ids = [
        "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
        "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
        "jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v",
        "CgnTSoL3DgY9SFHxcLj6CgCgKKoTBr6tp4CPAEWy25DE",
        "vSoLxydx6akxyMD9XEcPvGYNGq6Nn66oqVb3UkGkei7",
        "picobAEvs6w7QEknPce34wAE4gknZA9v5tTonnmHYdX",
        "he1iusmfkpAdwvxLNGV8Y1iSbj4rUy6yMhEA3fotn9A",
        "HUBsveNpjo5pWqNkH57QzxjQASdTVXcSK7bVKTSZtcSX",
        "LAinEtNLgpmCP9Rvsf5Hn8W6EhNiKLZQti1xfWMLy6X",
        "Dso1bDeDjCQxTrWHqUUi63oBvV7Mdm6WaobLbQ7gnPQ",
        "BonK1YhkXEGLZzwtcvRTip3gAL9nCeQD7ppZBLXhtTs",
        "BNso1VUJnh4zcfpZa6986Ea66P6TCp59hvtNJ8b1X85",
        "Bybit2vBJGhPF52GBdNaQfUJ6ZpThSgHBobjWZpLPb4B",
        "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
        "haSo1Vz5aTsqEnz8nisfnEsipvbAAWpgzRDh2WhhMEh",
    ]

    results = {}
    errors = {}

    # Fetch data for each LST ID
    for lst_id in lst_ids:
        try:
            print(f"Fetching APY data for LST: {lst_id}")
            url = f"https://extra-api.sanctum.so/v1/apy/indiv-epochs?lst={lst_id}&n=15"
            response = requests.get(url)

            if response.status_code != 200:
                errors[lst_id] = f"HTTP error: {response.status_code}"
                continue

            data = response.json()

            # Check if there's any error for this LST
            if lst_id in data.get("errs", {}):
                errors[lst_id] = data["errs"][lst_id]
                continue

            # Check if we have APY data for this LST
            if lst_id not in data.get("apys", {}) and len(data.get("apys", {})) == 0:
                # Handle case where LST ID is not in response but another LST is
                if len(data.get("apys", {})) == 1:
                    # Get the first (and only) key in apys
                    actual_lst_id = list(data["apys"].keys())[0]
                    apy_data = data["apys"][actual_lst_id]

                    if not apy_data:
                        errors[lst_id] = "No APY data available"
                        continue

                    # Find the epoch with the highest number
                    highest_epoch_data = max(apy_data, key=lambda x: x["epoch"])

                    # Convert timestamp to datetime
                    end_date = datetime.fromtimestamp(highest_epoch_data["end"]).strftime('%Y-%m-%d %H:%M:%S')

                    # Format APY as percentage
                    apy_percentage = f"{highest_epoch_data['apy'] * 100:.4f}%"

                    results[lst_id] = {
                        "note": f"Data returned for {actual_lst_id} instead of {lst_id}",
                        "epoch": highest_epoch_data["epoch"],
                        "end_date": end_date,
                        "apy": highest_epoch_data["apy"],
                        "apy_formatted": apy_percentage
                    }
                else:
                    errors[lst_id] = "No APY data available and unexpected response format"
                continue

            apy_data = data["apys"].get(lst_id)
            if not apy_data:
                # Try to find if data is available under a different key
                if len(data["apys"]) == 1:
                    actual_lst_id = list(data["apys"].keys())[0]
                    apy_data = data["apys"][actual_lst_id]
                    if not apy_data:
                        errors[lst_id] = "No APY data available"
                        continue
                else:
                    errors[lst_id] = "No APY data available"
                    continue

            # Find the epoch with the highest number
            highest_epoch_data = max(apy_data, key=lambda x: x["epoch"])

            # Convert timestamp to datetime
            end_date = datetime.fromtimestamp(highest_epoch_data["end"]).strftime('%Y-%m-%d %H:%M:%S')

            # Format APY as percentage
            apy_percentage = f"{highest_epoch_data['apy'] * 100:.4f}%"

            results[lst_id] = {
                "epoch": highest_epoch_data["epoch"],
                "end_date": end_date,
                "apy": highest_epoch_data["apy"],
                "apy_formatted": apy_percentage
            }

        except Exception as e:
            errors[lst_id] = str(e)

    return {
        "results": results,
        "errors": errors
    }


# Run the fetcher and print the results
if __name__ == "__main__":
    print("Fetching APY data from Sanctum API...")
    data = fetch_highest_epoch_apys()

    print("\n--- RESULTS ---")
    print("LST ID                                          | Epoch | End Date            | APY")
    print("-" * 80)

    for lst_id, info in data["results"].items():
        print(f"{lst_id} | {info['epoch']:5d} | {info['end_date']} | {info['apy_formatted']}")

    if data["errors"]:
        print("\n--- ERRORS ---")
        for lst_id, error in data["errors"].items():
            print(f"{lst_id}: {error}")

    # Save results to a JSON file
    with open("sanctum_apy_results.json", "w") as f:
        json.dump(data, f, indent=2)

    print("\nResults saved to sanctum_apy_results.json")