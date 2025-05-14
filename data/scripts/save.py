import requests
import json


def get_historical_interest_rates(reserve_ids):
    base_url = "https://api.solend.fi/reserves/historical-interest-rates"

    # Dictionary to store the latest supply APY for each reserve
    latest_rates = {}

    for reserve_id in reserve_ids:
        # Parameters for the API request
        params = {
            "ids": reserve_id,
            "span": "1d"
        }

        try:
            # Send GET request to the API
            response = requests.get(base_url, params=params)

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the JSON response
                data = response.json()

                # Get the list of rates for this reserve ID
                rates = data.get(reserve_id, [])

                # Check if rates list is not empty
                if rates:
                    # Get the latest rate (last item in the list)
                    latest_rate = rates[-1]

                    # Store the latest supply APY and reserve ID
                    latest_rates[reserve_id] = {
                        "supplyAPY": latest_rate.get("supplyAPY"),
                        "reserveID": latest_rate.get("reserveID")
                    }
                else:
                    print(f"No rates found for reserve ID: {reserve_id}")
            else:
                print(f"Failed to fetch data for reserve ID {reserve_id}. Status code: {response.status_code}")

        except requests.RequestException as e:
            print(f"Error fetching data for reserve ID {reserve_id}: {e}")

    return latest_rates


# List of reserve IDs
reserve_ids = [
    "8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36",
    "47kDoVo8gxWYe7oP2UT1AUtR2uGxEokGqdpc1qGPP3EX",
    "BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw",
    "HUL7GeHECRMbBFwde6pBmCPwDZjoLQDX7Xis4d64jAya",
    "8K9WC8xoh2rtQNY7iEGXtPvfbDCi563SdWhCAhuMP2xE",
    "Ag7UiqS5kqcsjNFWQfeUAiEXo27auFvdwLVJQwzYCBkZ",
    "7ZedNeKC6WU8soC4k3QrWwg4RNjzmuohbrTQuVpZkqnv",
    "6TyNRszAjzPh52mDEnmXcqq1u3p9S2z1iNmMdKN76wq2",
    "CCpirWrgNuBVLdkP2haxLTbD6XqEgaYuVXixbbpxUB6",
    "3DjAsrew4ZmBwcLjp2wUmjqvSKs4vpJ43ZKxaCjjEdur",
    "BRsz1xVQMuVLbc4YjLP1FXhEx1LxSYig2nLqRgJEzR9r",
    "H5znFbw5v8z5knynkv1tKi8TgvdhTSt7QyoTXDigCVkW",
    "Aj3MjwEeAcT5Phan6unxbpKYR8Jx1bNZUoWxA59yg1cF",
    "BJfY2E6TVEQe896kfR1AhhYCECVKfbceGg2ASU2LXdiA",
    "CKqi88U4nuuU5THsELnc4vtycLLc3W3rdCWZg7VCi88T"
]

# Get the latest rates
latest_rates = get_historical_interest_rates(reserve_ids)

# Print the results
print(json.dumps(latest_rates, indent=2))