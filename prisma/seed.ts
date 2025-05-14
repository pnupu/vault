import { PrismaClient, RiskLevel } from '../src/generated/prisma/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);

const prisma = new PrismaClient();

// Helper function to find an image for a strategy's app
function findStrategyAppImage(appName: string): string | null {
  const visualAssetsAppsPath = path.join(currentDir, '..', 'data', 'visual_assets', 'apps');
  let foundImageName: string | null = null;

  // Try exact match first (e.g., "Solana Strategy.svg")
  for (const ext of ['.svg', '.png']) {
    const potentialImageFile = `${appName}${ext}`;
    if (fs.existsSync(path.join(visualAssetsAppsPath, potentialImageFile))) {
      foundImageName = potentialImageFile;
      break;
    }
  }

  // If not found and appName has spaces, try first word (e.g., "Solana.svg" from "Solana Strategy")
  if (!foundImageName && appName.includes(' ')) {
    const firstWord = appName.split(' ')[0];
    if (firstWord) {
      for (const ext of ['.svg', '.png']) {
        const potentialImageFile = `${firstWord}${ext}`;
        if (fs.existsSync(path.join(visualAssetsAppsPath, potentialImageFile))) {
          foundImageName = potentialImageFile;
          break;
        }
      }
    }
  }
  return foundImageName;
}

// Helper function to find an image for an asset ticker
function findTickerImage(tickerName: string): string | null {
  const visualAssetsAssetsPath = path.join(currentDir, '..', 'data', 'visual_assets', 'assets');
  let foundImageName: string | null = null;

  // Try exact match (e.g., "USDC.svg", "SOL.png")
  for (const ext of ['.svg', '.png']) {
    const potentialImageFile = `${tickerName}${ext}`;
    if (fs.existsSync(path.join(visualAssetsAssetsPath, potentialImageFile))) {
      foundImageName = potentialImageFile;
      break;
    }
  }
  return foundImageName;
}

async function main() {
  console.log('Start seeding ...');

  // 1. Seed Strategies from strategies.json
  const strategiesPath = path.join(currentDir, '..', 'data', 'strategies.json');
  const strategiesFile = fs.readFileSync(strategiesPath, 'utf-8');
  const strategiesData = JSON.parse(strategiesFile);

  console.log(`Found ${strategiesData.length} strategies in strategies.json`);

  for (const item of strategiesData) {
    const strategyName = `${item.app} ${item.name}`;
    let determinedRiskLevel: RiskLevel;
    const strategyImage = findStrategyAppImage(item.app);

    if (item.name.toLowerCase() === 'aggressive') {
      determinedRiskLevel = RiskLevel.AGGRESSIVE;
    } else if (item.name.toLowerCase() === 'normal') {
      determinedRiskLevel = RiskLevel.NORMAL;
    } else {
      console.warn(`Could not determine risk level for strategy: ${strategyName} (name: ${item.name}).`);
      determinedRiskLevel = RiskLevel.NORMAL; // Defaulting to NORMAL
      console.warn(`Defaulting risk level to NORMAL for strategy: ${strategyName}`);
    }

    try {
      await prisma.strategy.upsert({
        where: { name: strategyName },
        update: {
          description: item.sources ? item.sources.join(', ') : null,
          assetTicker: item.category,
          apy: parseFloat(item.apy),
          riskLevel: determinedRiskLevel,
          platform: item.app,
          image: strategyImage,
        },
        create: {
          name: strategyName,
          description: item.sources ? item.sources.join(', ') : null,
          assetTicker: item.category,
          apy: parseFloat(item.apy),
          riskLevel: determinedRiskLevel,
          platform: item.app,
          image: strategyImage,
        },
      });
      console.log(`Upserted strategy: ${strategyName} with risk: ${determinedRiskLevel}, image: ${strategyImage}`);
    } catch (e: any) {
      console.error(`Error upserting strategy ${strategyName}:`, e);
    }
  }

  // 2. Seed Yield Opportunities from yield_endpoints.json
  const yieldEndpointsPath = path.join(currentDir, '..', 'data', 'yield_endpoints.json');
  const yieldEndpointsFile = fs.readFileSync(yieldEndpointsPath, 'utf-8');
  const yieldEndpointsData = JSON.parse(yieldEndpointsFile);

  console.log(`Found ${yieldEndpointsData.length} apps in yield_endpoints.json`);

  for (const app of yieldEndpointsData) {
    const platformName = app.name;
    const platformImage = app.image;

    if (app.markets) {
      for (const category of Object.keys(app.markets)) {
        const marketPoints = app.markets[category];
        for (const point of marketPoints) {
          const yieldMarketId = point.market_id;
          const yieldAssetName = point.name;
          const assetTickerImage = findTickerImage(yieldAssetName);

          try {
            await prisma.yieldOpportunity.upsert({
              where: { platform_marketId: { platform: platformName, marketId: yieldMarketId } },
              update: {
                platformImage: platformImage,
                name: yieldAssetName,
                assetTicker: category,
                apy: parseFloat(point.apy),
                tickerImage: assetTickerImage,
              },
              create: {
                platform: platformName,
                platformImage: platformImage,
                name: yieldAssetName,
                marketId: yieldMarketId,
                assetTicker: category,
                apy: parseFloat(point.apy),
                tickerImage: assetTickerImage,
              },
            });
            console.log(`Upserted yield opportunity: ${platformName} - ${yieldAssetName} (MarketID: ${yieldMarketId}), TickerImage: ${assetTickerImage}`);
          } catch (e: any) {
            console.error(`Error upserting yield opportunity ${platformName} - ${yieldAssetName}:`, e);
          }
        }
      }
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e: any) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 