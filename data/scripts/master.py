import asyncio
import importlib.util
import sys
import os
import json
import statistics


def import_module_from_path(path):
    """Dynamically import a module from a file path"""
    module_name = os.path.splitext(os.path.basename(path))[0]
    spec = importlib.util.spec_from_file_location(module_name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module


# Import modules dynamically
kamino_module = import_module_from_path('kamino.py')
meteora_module = import_module_from_path('meteora.py')
orca_module = import_module_from_path('orca.py')
raydium_module = import_module_from_path('raydium.py')
save_module = import_module_from_path('save.py')
sanctum_module = import_module_from_path('sanctum.py')


def determine_category(name):
    """Determine the asset category based on the name"""
    name = name.upper()

    # More specific check for SOL tokens before checking for USD
    if 'SOL' in name:
        return 'Solana'
    elif 'USD' in name:
        return 'USD'
    elif 'ETH' in name:
        return 'Ethereum'
    elif 'BTC' in name:
        return 'Bitcoin'
    else:
        return 'Other'


def get_all_yields():
    """Consolidate yields from different sources"""
    results = {}

    # Specific addresses to fetch
    kamino_markets = {
        "DxXdAyU3kCjnyggvHmY5nAwg5cRbbmdyX3npfDMjjMek": "JLP Market",
        "H6rHXmXoCQvq8Ue81MqNh7ow5ysPa1dSozwW3PU1dDH6": "Jito Market",
        "7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF": "Main Market"
    }

    # Meteora-specific addresses
    meteora_clmm_addresses = [
        'BoeMUkCLHchTD31HdXsbDExuZZfcUppSLpYtV3LZTH6U',
        'ARwi1S4DaiTG5DX7S4M4ZsrXqpMD1MrTmbu9ue2tpmEq',
        'JCFBoXNyFu9eLaskXm11qxSdx6x7i3LK8pETJE2LRGt2'
    ]

    # Orca-specific addresses
    orca_pool_addresses = [
        'Hp53XEtt4S8SvPCXarsLSdGfZBuUr5mMmZmX2DRNXQKp',
        '9RqDTfwCx2SgxsvKpspQHc38HUo3B6hRd3oR9JR966Ps',
        'D3LWymVUGhgKKJ33vKq8oHUaGwSuJPTPjnke9QHEXNqz'
    ]

    # Fetch Kamino data (async)
    kamino_data = asyncio.run(kamino_module.main())
    for market_address, market_info in kamino_data.items():
        if market_address in kamino_markets:
            for reserve_address, reserve_data in market_info.items():
                if 'metrics' in reserve_data:
                    name = reserve_data.get('symbol', 'Unknown')
                    results[f"Kamino-{kamino_markets[market_address]}-{reserve_address}"] = {
                        "app": f"Kamino {kamino_markets[market_address]}",
                        "name": name,
                        "apy": float(reserve_data['metrics'].get('supplyInterestAPY', '0%').rstrip('%')),
                        "category": determine_category(name)
                    }

    # Meteora Data
    meteora_clmm = meteora_module.fetch_clmm_data(meteora_clmm_addresses)
    for pair in meteora_clmm:
        name = pair['name']
        results[f"Meteora-{pair['address']}"] = {
            "app": "Meteora",
            "name": name,
            "apy": float(pair['apy'] or 0),
            "category": determine_category(name)
        }

    # Orca Pools
    orca_pools_data = orca_module.fetch_orca_pools(limit=100)
    if orca_pools_data:
        orca_pools = orca_module.extract_pool_info(orca_pools_data, orca_pool_addresses)
        for pool in orca_pools:
            name = f"{pool['tokenA_symbol']}-{pool['tokenB_symbol']}"
            category = determine_category(name)
            # Debug print to identify issues
            print(f"Debug: Orca pool {name} -> category: {category}")
            results[f"Orca-{pool['address']}"] = {
                "app": "Orca",
                "name": name,
                "apy": float(pool['currentYieldOverTvl'] or 0) * 100,  # Convert to percentage
                "category": category
            }

    # Raydium Pools
    raydium_data = raydium_module.fetch_pool_data()
    if raydium_data:
        found_pools = raydium_module.find_pools_by_ids(raydium_data, raydium_module.target_ids)
        for pool in found_pools:
            # Convert "/" to "-" in Raydium pair names
            name = pool['pair'].replace("/", "-")
            results[f"Raydium-{pool['id']}"] = {
                "app": "Raydium",
                "name": name,
                "apy": float(pool['day_apr'] or 0),
                "category": determine_category(name)
            }

    # Save Rates with Pool Distinctions
    save_pool_mapping = {
        "Main Market": [
            "8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36",  # SOL
            "47kDoVo8gxWYe7oP2UT1AUtR2uGxEokGqdpc1qGPP3EX",  # saveSOL
            "BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw",  # USDC
            "HUL7GeHECRMbBFwde6pBmCPwDZjoLQDX7Xis4d64jAya",  # USDS
            "8K9WC8xoh2rtQNY7iEGXtPvfbDCi563SdWhCAhuMP2xE",  # USDT
            "Ag7UiqS5kqcsjNFWQfeUAiEXo27auFvdwLVJQwzYCBkZ",  # cbBTC
            "7ZedNeKC6WU8soC4k3QrWwg4RNjzmuohbrTQuVpZkqnv",  # SOL-mSOL MLP
            "6TyNRszAjzPh52mDEnmXcqq1u3p9S2z1iNmMdKN76wq2",  # SOL-bSOL MLP
            "CCpirWrgNuBVLdkP2haxLTbD6XqEgaYuVXixbbpxUB6",  # mSOL
            "3DjAsrew4ZmBwcLjp2wUmjqvSKs4vpJ43ZKxaCjjEdur",  # bSOL
            "BRsz1xVQMuVLbc4YjLP1FXhEx1LxSYig2nLqRgJEzR9r",  # JitoSol
            "7ED1Yofz9n2E3kGHfineuqxUDrN38EKbpSfiRJ5HPJh2",  # sSol
            "H5znFbw5v8z5knynkv1tKi8TgvdhTSt7QyoTXDigCVkW",  # haSol
            "Aj3MjwEeAcT5Phan6unxbpKYR8Jx1bNZUoWxA59yg1cF"  # JupSol
        ],
        "JLP Market": [
            "BJfY2E6TVEQe896kfR1AhhYCECVKfbceGg2ASU2LXdiA",  # USDC
            "CKqi88U4nuuU5THsELnc4vtycLLc3W3rdCWZg7VCi88T"  # USDS
        ]
    }

    # Detailed Save Rates Mapping
    save_id_mapping = {
        "8PbodeaosQP19SjYFx855UMqWxH2HynZLdBXmsrbac36": "SOL",
        "47kDoVo8gxWYe7oP2UT1AUtR2uGxEokGqdpc1qGPP3EX": "saveSOL",
        "BgxfHJDzm44T7XG68MYKx7YisTjZu73tVovyZSjJMpmw": "USDC",
        "HUL7GeHECRMbBFwde6pBmCPwDZjoLQDX7Xis4d64jAya": "USDS",
        "8K9WC8xoh2rtQNY7iEGXtPvfbDCi563SdWhCAhuMP2xE": "USDT",
        "Ag7UiqS5kqcsjNFWQfeUAiEXo27auFvdwLVJQwzYCBkZ": "cbBTC",
        "7ZedNeKC6WU8soC4k3QrWwg4RNjzmuohbrTQuVpZkqnv": "SOL-mSOL MLP",
        "6TyNRszAjzPh52mDEnmXcqq1u3p9S2z1iNmMdKN76wq2": "SOL-bSOL MLP",
        "CCpirWrgNuBVLdkP2haxLTbD6XqEgaYuVXixbbpxUB6": "mSOL",
        "3DjAsrew4ZmBwcLjp2wUmjqvSKs4vpJ43ZKxaCjjEdur": "bSOL",
        "BRsz1xVQMuVLbc4YjLP1FXhEx1LxSYig2nLqRgJEzR9r": "JitoSOL",
        "7ED1Yofz9n2E3kGHfineuqxUDrN38EKbpSfiRJ5HPJh2": "sSOL",
        "H5znFbw5v8z5knynkv1tKi8TgvdhTSt7QyoTXDigCVkW": "haSOL",
        "Aj3MjwEeAcT5Phan6unxbpKYR8Jx1bNZUoWxA59yg1cF": "JupSOL",
        "BJfY2E6TVEQe896kfR1AhhYCECVKfbceGg2ASU2LXdiA": "USDC",
        "CKqi88U4nuuU5THsELnc4vtycLLc3W3rdCWZg7VCi88T": "USDS"
    }

    save_rates = save_module.get_historical_interest_rates(save_module.reserve_ids)
    for reserve_id, rate_info in save_rates.items():
        # Determine which market the reserve belongs to
        for market, market_ids in save_pool_mapping.items():
            if reserve_id in market_ids:
                name = save_id_mapping.get(reserve_id, reserve_id)
                results[f"Save-{market}-{reserve_id}"] = {
                    "app": f"Save {market}",
                    "name": name,
                    "apy": float(rate_info.get('supplyAPY', 0)) * 100,  # Convert to percentage
                    "category": determine_category(name)
                }
                break

    # Sanctum LST Rates
    # Note: We'll add a mapping here to interpret LST IDs
    lst_id_mapping = {
        "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn": "JitoSOL",
        "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1": "bSOL",
        "jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v": "JupSOL",
        "CgnTSoL3DgY9SFHxcLj6CgCgKKoTBr6tp4CPAEWy25DE": "cgntSOL",
        "vSoLxydx6akxyMD9XEcPvGYNGq6Nn66oqVb3UkGkei7": "vSOL",
        "picobAEvs6w7QEknPce34wAE4gknZA9v5tTonnmHYdX": "picoSOL",
        "he1iusmfkpAdwvxLNGV8Y1iSbj4rUy6yMhEA3fotn9A": "hSOL",
        "HUBsveNpjo5pWqNkH57QzxjQASdTVXcSK7bVKTSZtcSX": "hubSOL",
        "LAinEtNLgpmCP9Rvsf5Hn8W6EhNiKLZQti1xfWMLy6X": "laineSOL",
        "Dso1bDeDjCQxTrWHqUUi63oBvV7Mdm6WaobLbQ7gnPQ": "dSOL",
        "BonK1YhkXEGLZzwtcvRTip3gAL9nCeQD7ppZBLXhtTs": "bonkSOL",
        "BNso1VUJnh4zcfpZa6986Ea66P6TCp59hvtNJ8b1X85": "bnSOL",
        "Bybit2vBJGhPF52GBdNaQfUJ6ZpThSgHBobjWZpLPb4B": "bbSOL",
        "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So": "mSOL",
        "haSo1Vz5aTsqEnz8nisfnEsipvbAAWpgzRDh2WhhMEh": "haSOL",
        # Add more mappings as needed
    }
    sanctum_data = sanctum_module.fetch_highest_epoch_apys()
    for lst_id, info in sanctum_data['results'].items():
        name = lst_id_mapping.get(lst_id, lst_id)
        results[f"Sanctum-{lst_id}"] = {
            "app": "Sanctum",
            "name": name,
            "apy": float(info.get('apy', 0)) * 100,  # Already converted to percentage in function
            "category": determine_category(name)
        }

    return results


def calculate_strategy_rates(yields):
    """Calculate 'aggressive' and 'normal' rates for specified categories"""
    # Group yields by category
    categorized = {
        'Solana': [],
        'USD': [],
        'Ethereum': [],
        'Bitcoin': [],
        'Other': []
    }

    # Organize APYs by category
    for source_id, data in yields.items():
        category = data['category']
        if category in categorized:
            categorized[category].append({
                'source_id': source_id,
                'app': data['app'],
                'name': data['name'],
                'apy': data['apy']
            })

    # Sort each category by APY in descending order
    for category in categorized:
        categorized[category].sort(key=lambda x: x['apy'], reverse=True)

    # Calculate strategy rates for Solana and USD
    strategy_rates = {}
    for category in ['Solana', 'USD']:
        if len(categorized[category]) >= 10:  # Ensure we have enough data points
            # Aggressive rate: average of 3rd, 4th, 5th highest
            aggressive_rates = [categorized[category][i]['apy'] for i in range(2, 5)]
            aggressive_rate = sum(aggressive_rates) / len(aggressive_rates)

            # Normal rate: average of 8th, 9th, 10th highest
            normal_rates = [categorized[category][i]['apy'] for i in range(7, 10)]
            normal_rate = sum(normal_rates) / len(normal_rates)

            strategy_rates[category] = {
                'aggressive': aggressive_rate,
                'normal': normal_rate,
                # Additional details about which sources contributed to these rates
                'aggressive_sources': [categorized[category][i]['app'] + ' ' + categorized[category][i]['name'] for i in
                                       range(2, 5)],
                'normal_sources': [categorized[category][i]['app'] + ' ' + categorized[category][i]['name'] for i in
                                   range(7, 10)]
            }
        else:
            print(f"WARNING: Not enough data points for {category} to calculate strategy rates")
            # If we don't have enough data points, use what we have
            if len(categorized[category]) >= 5:
                # Use what we can for aggressive
                aggressive_end = min(5, len(categorized[category]))
                aggressive_start = max(2, aggressive_end - 3)
                aggressive_rates = [categorized[category][i]['apy'] for i in range(aggressive_start, aggressive_end)]
                aggressive_rate = sum(aggressive_rates) / len(aggressive_rates)

                # Use what we can for normal, with at least 2 indices difference from aggressive
                normal_end = min(len(categorized[category]), aggressive_start + 5)
                normal_start = max(aggressive_end, normal_end - 3)
                normal_rates = [categorized[category][i]['apy'] for i in range(normal_start, normal_end)]
                normal_rate = sum(normal_rates) / len(normal_rates) if normal_rates else 0

                strategy_rates[category] = {
                    'aggressive': aggressive_rate,
                    'normal': normal_rate,
                    'aggressive_sources': [categorized[category][i]['app'] + ' ' + categorized[category][i]['name'] for
                                           i in range(aggressive_start, aggressive_end)],
                    'normal_sources': [categorized[category][i]['app'] + ' ' + categorized[category][i]['name'] for i in
                                       range(normal_start, normal_end)]
                }
            elif len(categorized[category]) > 0:
                # If we have very few data points, just use the highest as aggressive and lowest as normal
                strategy_rates[category] = {
                    'aggressive': categorized[category][0]['apy'],
                    'normal': categorized[category][-1]['apy'],
                    'aggressive_sources': [categorized[category][0]['app'] + ' ' + categorized[category][0]['name']],
                    'normal_sources': [categorized[category][-1]['app'] + ' ' + categorized[category][-1]['name']]
                }

    return strategy_rates


def main():
    # Get all yields
    yields = get_all_yields()

    # Calculate strategy rates
    strategy_rates = calculate_strategy_rates(yields)

    # Add strategy rates to yields dictionary
    for category, rates in strategy_rates.items():
        yields[f"{category}-Strategy-Aggressive"] = {
            "app": f"{category} Strategy",
            "name": "Aggressive",
            "apy": rates['aggressive'],
            "category": category,
            "sources": rates['aggressive_sources']
        }
        yields[f"{category}-Strategy-Normal"] = {
            "app": f"{category} Strategy",
            "name": "Normal",
            "apy": rates['normal'],
            "category": category,
            "sources": rates['normal_sources']
        }

    # Check for any miscategorized SOL tokens
    for source_id, data in yields.items():
        if "Strategy" not in source_id:  # Skip strategy entries
            name = data['name']
            category = data['category']
            # If name contains SOL but category is not Solana, print warning
            if 'SOL' in name.upper() and category != 'Solana':
                print(f"WARNING: Token {name} miscategorized as {category} instead of Solana")

    # Print results with category
    print("\n{:<30} {:<20} {:<10} {:<10}".format("Source-ID", "Name", "APY (%)", "Category"))
    print("-" * 75)
    for source_id, data in yields.items():
        if "Strategy" not in source_id:  # Print regular yields first
            print("{:<30} {:<20} {:<10.2f} {:<10}".format(
                source_id,
                data['name'],
                data['apy'],
                data['category']
            ))

    # Print strategy rates separately
    print("\n=== STRATEGY RATES ===")
    print("{:<15} {:<15} {:<10}".format("Category", "Strategy", "APY (%)"))
    print("-" * 45)
    for category in ['Solana', 'USD']:
        if f"{category}-Strategy-Aggressive" in yields:
            aggressive_data = yields[f"{category}-Strategy-Aggressive"]
            normal_data = yields[f"{category}-Strategy-Normal"]

            print("{:<15} {:<15} {:<10.2f}".format(category, "Aggressive", aggressive_data['apy']))
            print("   Sources: {}".format(", ".join(aggressive_data['sources'])))

            print("{:<15} {:<15} {:<10.2f}".format(category, "Normal", normal_data['apy']))
            print("   Sources: {}".format(", ".join(normal_data['sources'])))

    # Optional: Save to JSON file
    with open('consolidated_yields.json', 'w') as f:
        json.dump(yields, f, indent=2)
    print("\nResults also saved to consolidated_yields.json")


if __name__ == "__main__":
    main()