import requests
import json
import asyncio
import aiohttp
from typing import Dict, List, Any, Optional
import time
from datetime import datetime
import os

# Wallet addresses for different analyses
STABLECOIN_WALLET = "8FF3Qjm5R722nDS23hH6GgekJ78xQ5uyJrtVq2KSBDvi"  # For stablecoin analysis
SOL_WALLET = "DdZR6zRFiUt4S5mg7AV1uKB2z1f1WzcNYCaTEEWPAuby"  # For SOL analysis

# Token mints from the provided file
TOKEN_MINTS = {
    "jito": "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
    "bsol": "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
    "jupsol": "jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v",
    "cgntsol": "CgnTSoL3DgY9SFHxcLj6CgCgKKoTBr6tp4CPAEWy25DE",
    "vsol": "vSoLxydx6akxyMD9XEcPvGYNGq6Nn66oqVb3UkGkei7",
    "pico": "picobAEvs6w7QEknPce34wAE4gknZA9v5tTonnmHYdX",
    "helius": "he1iusmfkpAdwvxLNGV8Y1iSbj4rUy6yMhEA3fotn9A",
    "hub": "HUBsveNpjo5pWqNkH57QzxjQASdTVXcSK7bVKTSZtcSX",
    "laine": "LAinEtNLgpmCP9Rvsf5Hn8W6EhNiKLZQti1xfWMLy6X",
    "dsol": "Dso1bDeDjCQxTrWHqUUi63oBvV7Mdm6WaobLbQ7gnPQ",
    "bonk": "BonK1YhkXEGLZzwtcvRTip3gAL9nCeQD7ppZBLXhtTs",
    "bnsol": "BNso1VUJnh4zcfpZa6986Ea66P6TCp59hvtNJ8b1X85",
    "bybit": "Bybit2vBJGHPF52GBdNaQfUJ6ZpThSgHBobjWZpLPb4B",
    "msol": "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    "hasol": "haSo1Vz5aTsqEnz8nisfnEsipvbAAWpgzRDh2WhhMEh",
    # Additional tokens of interest
    "usdc": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "usdt": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    "usds": "USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA"
}

# SOL mint address (wrapped SOL)
SOL_MINT = "So11111111111111111111111111111111111111112"

# Base URL for the API
API_BASE_URL = "https://sanctum-s-api.fly.dev/v2/swap/quote"

# Alternative API endpoints to try if the main one fails
ALTERNATIVE_API_ENDPOINTS = [
    "https://quote-api.jup.ag/v6/quote",  # Jupiter aggregator API
    "https://price.jup.ag/v4/price"  # Jupiter price API
]

# Solend API URL
SOLEND_API_URL = "https://api.solend.fi/v1/reserves?scope=all"

# Define stablecoin mints
STABLECOIN_MINTS = [
    TOKEN_MINTS["usdc"],  # USDC
    TOKEN_MINTS["usdt"],  # USDT
    TOKEN_MINTS["usds"]  # USDS
]

# Update the SPECIAL_TOKENS dictionary at the top
SPECIAL_TOKENS = {
    "SOL-mSOL LP": "B2uEs9zjnz222hfUaUuRgesryUEYwy3JGuWe31sE9gsG",
    "SOL-jitoSOL LP": "8fL5oNPFD9WEpwf4k3H4YnPQtVUo9RAGpN36vKFQoHPi",
    "SOL-bSOL LP": "8ioaL3gTSAhNJy3t9JakXuoKobJvms62Ko5aWHvmHgSf",
    "USDC-USDT LP": "xLebAypjbaQ9tmxUKHV6DZU4mY8ATAAP2sfkNNQLXjf"
}

# Add hardcoded prices (in SOL)
METEORA_LP_PRICES = {
    "B2uEs9zjnz222hfUaUuRgesryUEYwy3JGuWe31sE9gsG": 1.18010651,  # SOL-mSOL
    "8fL5oNPFD9WEpwf4k3H4YnPQtVUo9RAGpN36vKFQoHPi": 1.14838723,  # SOL-jitoSOL
    "8ioaL3gTSAhNJy3t9JakXuoKobJvms62Ko5aWHvmHgSf": 1.12238482,  # SOL-bSOL
    "xLebAypjbaQ9tmxUKHV6DZU4mY8ATAAP2sfkNNQLXjf": 1.18907967   # USDC-USDT
}

# Add position types
SOL_POSITIONS = [
    "B2uEs9zjnz222hfUaUuRgesryUEYwy3JGuWe31sE9gsG",  # SOL-mSOL
    "8fL5oNPFD9WEpwf4k3H4YnPQtVUo9RAGpN36vKFQoHPi",  # SOL-jitoSOL
    "8ioaL3gTSAhNJy3t9JakXuoKobJvms62Ko5aWHvmHgSf"   # SOL-bSOL
]

USDC_POSITIONS = [
    "xLebAypjbaQ9tmxUKHV6DZU4mY8ATAAP2sfkNNQLXjf"     # USDC-USDT
]

# Solscan API URLs
SOLSCAN_TOKEN_INFO_URL = "https://public-api.solscan.io/token/meta"
SOLSCAN_ACCOUNT_TOKENS_URL = "https://public-api.solscan.io/account/tokens"
SOLSCAN_MARKET_URL = "https://public-api.solscan.io/market"

# Headers for Solscan API
headers = {
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0"
}

# Add these constants at the top with other constants
RPC_ENDPOINTS = [
    "https://api.mainnet-beta.solana.com",
    "https://solana-api.projectserum.com",
    "https://rpc.ankr.com/solana",
    "https://solana-mainnet.g.alchemy.com/v2/demo"
]

# Add this constant at the top with other constants
JUPITER_TOKEN_LIST_URL = "https://token.jup.ag/all"

# Add these constants at the top with other constants
KAMINO_MARKET_IDS = [
    "DxXdAyU3kCjnyggvHmY5nAwg5cRbbmdyX3npfDMjjMek",
    "H6rHXmXoCQvq8Ue81MqNh7ow5ysPa1dSozwW3PU1dDH6",
    "7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF",
    "BJnbcRHqvppTyGesLzWASGKnmnF1wq9jZu6ExrjT7wvF",
    "ByYiZxp8QrdN9qbdtaAiePN8AAr3qvTPppNJDpf5DVJ5"
]

KAMINO_API_BASE_URL = "https://api.kamino.finance/kamino-market"

# Add this at the top with other constants
RESULTS_DIR = "balance_results"

async def get_solend_reserves() -> List[Dict]:
    """
    Fetch all reserve data from Solend API

    Returns:
        List of reserve objects from Solend
    """
    print("Fetching Solend reserves data...")
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(SOLEND_API_URL) as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"Retrieved {len(data.get('results', []))} Solend reserves")
                    return data.get("results", [])
                else:
                    print(f"Failed to fetch Solend reserves. Status code: {response.status}")
                    return []
    except Exception as e:
        print(f"Error fetching Solend reserves: {e}")
        return []

async def get_token_balances(wallet_address: str) -> Dict[str, int]:
    """
    Get token balances for a specific wallet

    Args:
        wallet_address: The Solana wallet address to check

    Returns:
        Dictionary mapping token mints to their balances (in native units)
    """
    # Try each RPC endpoint until one works
    for rpc_url in RPC_ENDPOINTS:
        try:
            print(f"\nTrying RPC endpoint: {rpc_url}")
            headers = {"Content-Type": "application/json"}

            # Get SOL balance
            sol_request = {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getBalance",
                "params": [wallet_address]
            }

            sol_response = requests.post(rpc_url, headers=headers, json=sol_request)
            sol_data = sol_response.json()
            sol_balance = sol_data.get("result", {}).get("value", 0)

            # Get token balances (SPL tokens)
            token_request = {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getTokenAccountsByOwner",
                "params": [
                    wallet_address,
                    {"programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"},
                    {"encoding": "jsonParsed"}
                ]
            }

            token_response = requests.post(rpc_url, headers=headers, json=token_request)
            token_data = token_response.json()

            balances = {SOL_MINT: sol_balance}  # Initialize with SOL balance
            special_balances = {}  # Store special token balances

            if "result" in token_data and "value" in token_data["result"]:
                accounts = token_data["result"]["value"]
                print(f"Found {len(accounts)} token accounts")

                for account in accounts:
                    try:
                        account_info = account["account"]
                        data = account_info["data"]
                        parsed = data["parsed"]["info"]
                        
                        mint = parsed["mint"]
                        amount = int(parsed["tokenAmount"]["amount"])
                        decimals = int(parsed["tokenAmount"]["decimals"])

                        if amount > 0:
                            # Check if this is a special token
                            token_name = next((name for name, addr in SPECIAL_TOKENS.items() if addr == mint), None)
                            if token_name:
                                balance = amount / (10 ** decimals)
                                print(f"\nFound Meteora LP token:")
                                print(f"  Name: {token_name}")
                                print(f"  Mint: {mint}")
                                print(f"  Raw amount: {amount}")
                                print(f"  Decimals: {decimals}")
                                print(f"  Balance: {balance}")
                                
                                # Get token info from Solscan
                                print(f"  Fetching token info from Solscan...")
                                token_info = get_token_info(mint)
                                if token_info:
                                    print(f"  Token info: {token_info.get('symbol', 'Unknown')} ({token_info.get('name', 'Unknown')})")
                                
                                special_balances[token_name] = {
                                    'address': mint,
                                    'balance': balance,
                                    'decimals': decimals,
                                    'info': token_info
                                }
                            
                            balances[mint] = amount

                    except Exception as e:
                        print(f"Error processing account: {str(e)}")
                        continue

                print("\nMeteora LP token balances found:")
                for name, data in special_balances.items():
                    print(f"  {name}: {data['balance']}")

                return balances, special_balances

            else:
                print("No token accounts found in response")
                print(f"Response: {json.dumps(token_data, indent=2)}")

        except Exception as e:
            print(f"Error with RPC endpoint {rpc_url}: {str(e)}")
            continue

    return {}, {}

async def process_solend_positions(wallet_balances: Dict[str, int], solend_reserves: List[Dict]) -> Dict[str, int]:
    """
    Process Solend positions to convert collateral tokens to liquidity tokens

    Args:
        wallet_balances: Dictionary of token balances in the wallet
        solend_reserves: List of Solend reserve data

    Returns:
        Updated dictionary of token balances including converted Solend positions
    """
    print("\nAnalyzing Solend positions...")
    updated_balances = wallet_balances.copy()

    # Create mapping of collateral mint to reserve info for quick lookup
    collateral_to_reserve = {}

    # Track stablecoin collateral tokens specifically
    stablecoin_collateral_value = {mint: 0 for mint in STABLECOIN_MINTS}
    stablecoin_collateral_details = []

    for reserve_data in solend_reserves:
        reserve = reserve_data.get("reserve", {})
        collateral = reserve.get("collateral", {})
        liquidity = reserve.get("liquidity", {})

        collateral_mint = collateral.get("mintPubkey")
        liquidity_mint = liquidity.get("mintPubkey")

        if collateral_mint and liquidity_mint:
            collateral_to_reserve[collateral_mint] = {
                "liquidity_mint": liquidity_mint,
                "exchange_rate": float(reserve_data.get("cTokenExchangeRate", 1)),
                "liquidity_decimals": int(liquidity.get("mintDecimals", 9))
            }

    # Check if wallet has any collateral tokens
    collateral_conversions = []
    for mint, balance in wallet_balances.items():
        if mint in collateral_to_reserve:
            reserve_info = collateral_to_reserve[mint]
            liquidity_mint = reserve_info["liquidity_mint"]
            exchange_rate = reserve_info["exchange_rate"]
            liquidity_decimals = reserve_info["liquidity_decimals"]

            # Convert collateral token amount to liquidity token amount
            # The exchange rate is typically 1:1 at initial deposit, but can change over time
            liquidity_amount = int(balance * exchange_rate)

            # Format for human-readable output
            collateral_human = balance / (10 ** 9)  # Assuming 9 decimals for collateral tokens
            liquidity_human = liquidity_amount / (10 ** liquidity_decimals)

            # Track stablecoin collateral specifically
            if liquidity_mint in STABLECOIN_MINTS:
                stablecoin_collateral_value[liquidity_mint] += liquidity_amount
                stablecoin_collateral_details.append({
                    "collateral_mint": mint,
                    "underlying_token": next((name for name, m in TOKEN_MINTS.items() if m == liquidity_mint),
                                             liquidity_mint[:6] + "..."),
                    "token_mint": liquidity_mint,
                    "amount": liquidity_human
                })

            collateral_conversions.append({
                "collateral_mint": mint,
                "collateral_amount": balance,
                "collateral_human": collateral_human,
                "liquidity_mint": liquidity_mint,
                "liquidity_amount": liquidity_amount,
                "liquidity_human": liquidity_human,
                "exchange_rate": exchange_rate
            })

            # Add the converted amount to the liquidity token balance
            if liquidity_mint in updated_balances:
                updated_balances[liquidity_mint] += liquidity_amount
                print(f"Added {liquidity_human} to existing {liquidity_mint} balance")
            else:
                updated_balances[liquidity_mint] = liquidity_amount
                print(f"Created new balance of {liquidity_human} for {liquidity_mint}")

    # Print conversion details if any were found
    if collateral_conversions:
        print("\n=== Solend Collateral Conversions ===")
        for conv in collateral_conversions:
            collateral_short = conv["collateral_mint"][:6] + "..."
            liquidity_short = conv["liquidity_mint"][:6] + "..."
            print(
                f"Converted {conv['collateral_human']:.4f} {collateral_short} → {conv['liquidity_human']:.4f} {liquidity_short} (rate: {conv['exchange_rate']})")
    else:
        print("No Solend collateral tokens found in wallet")

    # Return updated balances and stablecoin collateral details
    return updated_balances, stablecoin_collateral_value, stablecoin_collateral_details

async def get_token_sol_ratio_jupiter(session: aiohttp.ClientSession, token_mint: str) -> Optional[float]:
    """
    Alternative method to get token to SOL ratio using Jupiter API

    Args:
        session: The aiohttp session to use for the request
        token_mint: The token mint address

    Returns:
        The ratio of token to SOL or None if the request fails
    """
    # Try Jupiter quote API first
    jup_quote_url = "https://quote-api.jup.ag/v6/quote"
    params = {
        "inputMint": token_mint,
        "outputMint": SOL_MINT,
        "amount": "1000000000",  # 1 token with 9 decimals
        "slippageBps": 50  # 0.5% slippage
    }

    try:
        async with session.get(jup_quote_url, params=params) as response:
            if response.status == 200:
                data = await response.json()
                print(f"Jupiter API response: {json.dumps(data, indent=2)[:200]}...")

                # Extract outAmount from the response
                if "outAmount" in data:
                    out_amount = int(data["outAmount"])
                    ratio = out_amount / 1_000_000_000
                    return ratio
    except Exception as e:
        print(f"Error with Jupiter quote API: {e}")

    # Fall back to Jupiter price API
    jup_price_url = "https://price.jup.ag/v4/price"
    params = {
        "ids": token_mint,
        "vsToken": SOL_MINT
    }

    try:
        async with session.get(jup_price_url, params=params) as response:
            if response.status == 200:
                data = await response.json()
                print(f"Jupiter Price API response: {json.dumps(data, indent=2)[:200]}...")

                if "data" in data and token_mint in data["data"]:
                    token_data = data["data"][token_mint]
                    if "price" in token_data:
                        return float(token_data["price"])
    except Exception as e:
        print(f"Error with Jupiter price API: {e}")

    return None

async def get_token_sol_ratio(session: aiohttp.ClientSession, token_mint: str) -> Optional[float]:
    """
    Get the token to SOL conversion ratio from the API

    Args:
        session: The aiohttp session to use for the request
        token_mint: The token mint address

    Returns:
        The ratio of token to SOL or None if the request fails
    """
    params = {
        "input": token_mint,
        "outputLstMint": SOL_MINT,
        "amount": "1000000000",  # Fixed amount of 1 token (adjusted for decimals)
        "mode": "ExactIn",
        "swapSrc": "Jup"  # Using Jupiter as the single swap source
    }

    try:
        async with session.get(API_BASE_URL, params=params) as response:
            if response.status == 200:
                data = await response.json()

                # Print the full response for debugging
                print(f"API Response: {json.dumps(data, indent=2)[:200]}...")  # Show first 200 chars

                # Check if there's an error in the response
                if "error" in data:
                    print(f"API error: {data['error']}")
                    return None

                # Extract outAmount from the response
                out_amount = int(data.get("outAmount", 0))

                # Calculate the ratio (1 token = X SOL)
                if out_amount > 0:
                    ratio = out_amount / 1_000_000_000
                    return ratio
                else:
                    print(f"Got zero outAmount for {token_mint}")
            else:
                print(f"API returned status code {response.status}")
                try:
                    error_data = await response.text()
                    print(f"Error response: {error_data[:200]}...")  # Show first 200 chars
                except:
                    pass

            # If primary API fails, try the Jupiter API as fallback
            print(f"Trying Jupiter API as fallback for {token_mint}...")
            ratio = await get_token_sol_ratio_jupiter(session, token_mint)
            if ratio is not None:
                print(f"Successfully got ratio from Jupiter API: {ratio}")
                return ratio

            return None
    except Exception as e:
        print(f"Error fetching ratio for {token_mint}: {e}")
        # Try Jupiter API as fallback
        print(f"Trying Jupiter API as fallback for {token_mint}...")
        ratio = await get_token_sol_ratio_jupiter(session, token_mint)
        if ratio is not None:
            print(f"Successfully got ratio from Jupiter API: {ratio}")
            return ratio
        return None

async def get_token_ratios_sequential(session: aiohttp.ClientSession, token_mints_to_fetch: List[str],
                                      delay_seconds: float = 1.0) -> Dict[str, float]:
    """
    Get token to SOL ratios sequentially with a delay between requests

    Args:
        session: The aiohttp session to use for requests
        token_mints_to_fetch: List of token mint addresses to fetch ratios for
        delay_seconds: Delay between requests in seconds

    Returns:
        Dictionary mapping token mints to their SOL ratios
    """
    sol_ratio = {SOL_MINT: 1.0}  # SOL to SOL ratio is always 1:1

    total_tokens = len(token_mints_to_fetch)
    for i, token_mint in enumerate(token_mints_to_fetch):
        token_name = next((name for name, mint in TOKEN_MINTS.items() if mint == token_mint), token_mint[:6] + "...")
        print(f"Fetching ratio for {token_name} ({i + 1}/{total_tokens})...")

        ratio = await get_token_sol_ratio(session, token_mint)
        if ratio is not None:
            sol_ratio[token_mint] = ratio
            print(f"Got ratio for {token_name}: 1:{ratio:.6f}")
        else:
            print(f"Failed to get ratio for {token_name}")

        # Add delay between requests to avoid rate limiting
        if i < total_tokens - 1:  # Don't delay after the last request
            print(f"Waiting {delay_seconds} seconds before next request...")
            await asyncio.sleep(delay_seconds)

    return sol_ratio

async def get_kamino_account_value(wallet_address: str) -> float:
    """
    Get the total account value from Kamino markets for a wallet
    
    Args:
        wallet_address: The wallet address to check
        
    Returns:
        Total account value in USD
    """
    total_nav = 0.0
    
    for market_id in KAMINO_MARKET_IDS:
        url = f"{KAMINO_API_BASE_URL}/{market_id}/users/{wallet_address}/obligations"
        try:
            response = requests.get(url)
            response.raise_for_status()
            obligations = response.json()
            for obligation in obligations:
                nav = float(obligation["refreshedStats"]["netAccountValue"])
                total_nav += nav
        except Exception as e:
            print(f"Error fetching Kamino market {market_id}: {e}")
            continue
    
    return total_nav

async def save_analysis_results(stablecoin_data: Dict, sol_data: Dict) -> None:
    """
    Save analysis results to a JSON file with timestamp
    
    Args:
        stablecoin_data: Dictionary containing stablecoin analysis results
        sol_data: Dictionary containing SOL analysis results
    """
    # Create results directory if it doesn't exist
    if not os.path.exists(RESULTS_DIR):
        os.makedirs(RESULTS_DIR)
    
    # Create timestamp for filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{RESULTS_DIR}/balance_analysis_{timestamp}.json"
    
    # Prepare the data structure
    results = {
        "timestamp": datetime.now().isoformat(),
        "wallet_addresses": {
            "stablecoin_wallet": STABLECOIN_WALLET,
            "sol_wallet": SOL_WALLET
        },
        "stablecoin_analysis": stablecoin_data,
        "sol_analysis": sol_data
    }
    
    # Save to file
    with open(filename, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nAnalysis results saved to: {filename}")

async def analyze_stablecoins(wallet_address: str, solend_reserves: List[Dict]) -> Dict:
    """
    Analyze stablecoin holdings and positions for a specific wallet
    
    Returns:
        Dictionary containing the analysis results
    """
    print(f"\n===== Stablecoin Analysis for {wallet_address} =====")
    
    # Get token balances
    print(f"Fetching token balances...")
    balances, special_balances = await get_token_balances(wallet_address)

    if not balances:
        print("No tokens found in this wallet.")
        return {}

    # Process Solend positions
    updated_balances, stablecoin_collateral_value, stablecoin_collateral_details = await process_solend_positions(
        balances, solend_reserves)

    # Process stablecoin holdings
    stablecoin_values = []
    total_stablecoins = 0
    source_breakdown = {
        "direct_holdings": {},
        "meteora_lp": {},
        "kamino": 0.0,
        "solend": {}
    }

    # Add regular stablecoin balances
    for mint, balance in updated_balances.items():
        if mint in STABLECOIN_MINTS:
            token_name = next((name for name, m in TOKEN_MINTS.items() if m == mint), mint[:6] + "...")
            decimals = 6  # Stablecoins use 6 decimals
            human_balance = balance / (10 ** decimals)
            
            stablecoin_values.append({
                "token": token_name,
                "mint": mint,
                "balance": human_balance
            })
            total_stablecoins += human_balance
            source_breakdown["direct_holdings"][token_name] = human_balance

    # Add USDC-USDT LP position if it exists
    usdc_usdt_lp = special_balances.get("USDC-USDT LP")
    if usdc_usdt_lp:
        price = METEORA_LP_PRICES.get(usdc_usdt_lp['address'], 0)
        usd_value = usdc_usdt_lp['balance'] * price
        stablecoin_values.append({
            "token": "USDC-USDT LP",
            "mint": usdc_usdt_lp['address'],
            "balance": usd_value
        })
        total_stablecoins += usd_value
        source_breakdown["meteora_lp"]["USDC-USDT"] = usd_value

    # Get Kamino account value
    print("\nFetching Kamino account value...")
    kamino_value = await get_kamino_account_value(wallet_address)
    if kamino_value > 0:
        stablecoin_values.append({
            "token": "Kamino",
            "mint": "kamino",
            "balance": kamino_value
        })
        total_stablecoins += kamino_value
        source_breakdown["kamino"] = kamino_value

    # Add Solend positions to breakdown
    for detail in stablecoin_collateral_details:
        token_name = detail['underlying_token']
        amount = detail['amount']
        source_breakdown["solend"][token_name] = amount

    # Print stablecoin holdings
    print("\n===== Stablecoin Holdings =====")
    if stablecoin_values:
        for sv in stablecoin_values:
            print(f"{sv['token']:<15} | Balance: {sv['balance']:<12.4f}")
        print("-------------------------------")
        print(f"Total Stablecoins: {total_stablecoins:.4f}")
    else:
        print("No stablecoin holdings found")

    # Print Solend stablecoin collateral details
    print("\n===== Solend Stablecoin Collateral Positions =====")
    if stablecoin_collateral_details:
        for detail in stablecoin_collateral_details:
            print(
                f"Collateral token {detail['collateral_mint'][:6]}... backed by {detail['amount']:.4f} {detail['underlying_token']}")
    else:
        print("No stablecoin collateral positions found")

    return {
        "total_value": total_stablecoins,
        "holdings": stablecoin_values,
        "source_breakdown": source_breakdown,
        "solend_positions": stablecoin_collateral_details
    }

async def analyze_sol_positions(wallet_address: str, solend_reserves: List[Dict]) -> Dict:
    """
    Analyze SOL and other token positions for a specific wallet
    
    Returns:
        Dictionary containing the analysis results
    """
    print(f"\n===== SOL Analysis for {wallet_address} =====")
    
    # Get token balances
    print(f"Fetching token balances...")
    balances, special_balances = await get_token_balances(wallet_address)

    if not balances:
        print("No tokens found in this wallet.")
        return {}

    # Process Solend positions
    updated_balances, _, _ = await process_solend_positions(balances, solend_reserves)

    # Get list of token mints from updated balances that match our tokens of interest
    token_mints_values = set(TOKEN_MINTS.values())
    token_mints_values.add(SOL_MINT)

    # Find tokens in wallet that match our tokens of interest
    tokens_in_wallet = [mint for mint in updated_balances.keys() if mint in token_mints_values]

    # Get token ratios
    print("Fetching token to SOL conversion ratios...")
    async with aiohttp.ClientSession() as session:
        sol_ratio = await get_token_ratios_sequential(session, tokens_in_wallet, delay_seconds=2.0)
        sol_ratio[SOL_MINT] = 1.0

    # Calculate total value in SOL
    total_sol_value = 0
    token_values = []
    solend_sol_positions = []
    source_breakdown = {
        "direct_holdings": {},
        "meteora_lp": {},
        "kamino": 0.0,
        "solend": {}
    }

    # Process each token balance
    for mint, balance in updated_balances.items():
        if mint != SOL_MINT and mint not in token_mints_values:
            continue

        token_name = next((name for name, m in TOKEN_MINTS.items() if m == mint),
                          "SOL" if mint == SOL_MINT else mint[:6] + "...")

        if mint in sol_ratio and mint not in STABLECOIN_MINTS:
            decimals = 9  # Most tokens use 9 decimals
            human_balance = balance / (10 ** decimals)
            sol_value = balance * sol_ratio[mint] / (10 ** decimals)

            token_values.append({
                "token": token_name,
                "mint": mint,
                "balance": human_balance,
                "sol_ratio": sol_ratio[mint],
                "sol_value": sol_value
            })
            total_sol_value += sol_value
            source_breakdown["direct_holdings"][token_name] = sol_value

    # Process special tokens
    print("\n===== Meteora LP Positions =====")
    total_sol_lp_value = 0
    total_usdc_lp_value = 0
    
    for token_name, token_data in special_balances.items():
        token_address = token_data['address']
        balance = token_data['balance']
        
        # Get hardcoded price
        price = METEORA_LP_PRICES.get(token_address, 0)
        
        print(f"\nPosition: {token_name}")
        print(f"Address: {token_address}")
        print(f"Balance: {balance:.4f}")
        
        # Handle SOL-based positions
        if token_address in SOL_POSITIONS:
            sol_value = balance * price
            print(f"SOL Price: {price:.4f}")
            print(f"SOL Value: {sol_value:.4f} SOL")
            total_sol_lp_value += sol_value
            token_values.append({
                "token": token_name,
                "mint": token_address,
                "balance": balance,
                "sol_ratio": price,
                "sol_value": sol_value
            })
            source_breakdown["meteora_lp"][token_name] = sol_value
        # Handle USDC-based positions
        elif token_address in USDC_POSITIONS:
            usd_value = balance * price
            print(f"USD Price: ${price:.4f}")
            print(f"USD Value: ${usd_value:.2f}")
            total_usdc_lp_value += usd_value

    # Get Kamino account value and convert to SOL
    print("\nFetching Kamino account value...")
    kamino_value = await get_kamino_account_value(wallet_address)
    if kamino_value > 0:
        # Get SOL price from CoinGecko
        try:
            sol_price_resp = requests.get(
                "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
            )
            sol_price_resp.raise_for_status()
            sol_price = sol_price_resp.json()["solana"]["usd"]
            kamino_sol_value = kamino_value / sol_price
            
            token_values.append({
                "token": "Kamino",
                "mint": "kamino",
                "balance": kamino_value,
                "sol_ratio": 1/sol_price,
                "sol_value": kamino_sol_value
            })
            total_sol_value += kamino_sol_value
            source_breakdown["kamino"] = kamino_sol_value
        except Exception as e:
            print(f"Error converting Kamino value to SOL: {e}")

    # Print token values
    print("\n===== Token Values in SOL =====")
    if token_values:
        token_values.sort(key=lambda x: x["sol_value"], reverse=True)
        for tv in token_values:
            print(
                f"{tv['token']:<15} | Balance: {tv['balance']:<12.4f} | 1:{tv['sol_ratio']:<12.6f} | {tv['sol_value']:<12.4f} SOL")
        print("-------------------------------")
        print(f"Total SOL Value: {total_sol_lp_value + total_sol_value:.4f} SOL")
    else:
        print("No token positions found")

    # Print Solend SOL positions
    print("\n===== Solend SOL Positions =====")
    if solend_sol_positions:
        total_solend_sol = 0
        for pos in solend_sol_positions:
            collateral_name = next((name for name, m in TOKEN_MINTS.items() if m == pos["collateral_mint"]),
                                 pos["collateral_mint"][:6] + "...")
            print(f"Collateral: {collateral_name:<10} | Amount: {pos['amount']:<12.4f} SOL")
            total_solend_sol += pos['amount']
            source_breakdown["solend"][collateral_name] = pos['amount']
        print("-------------------------------")
        print(f"Total Solend SOL: {total_solend_sol:.4f} SOL")
    else:
        print("No Solend SOL positions found")

    return {
        "total_value": total_sol_lp_value + total_sol_value,
        "holdings": token_values,
        "source_breakdown": source_breakdown,
        "solend_positions": solend_sol_positions
    }

def get_token_info(token_address: str) -> Dict:
    """Get token information for Meteora LP tokens"""
    token_name = next((name for name, addr in SPECIAL_TOKENS.items() if addr == token_address), None)
    if token_name:
        return {
            'symbol': token_name,
            'name': token_name,
            'decimals': 9
        }
    return {
        'symbol': 'Unknown',
        'name': f'Token {token_address[:6]}...',
        'decimals': 9
    }

async def main():
    # Fetch Solend reserves data once
    solend_reserves = await get_solend_reserves()

    # Analyze stablecoins for the stablecoin wallet
    stablecoin_data = await analyze_stablecoins(STABLECOIN_WALLET, solend_reserves)

    # Analyze SOL positions for the SOL wallet
    sol_data = await analyze_sol_positions(SOL_WALLET, solend_reserves)

    # Save results
    await save_analysis_results(stablecoin_data, sol_data)

if __name__ == "__main__":
    asyncio.run(main())