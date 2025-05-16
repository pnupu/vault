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

  console.log(`Found ${strategiesData.length} strategy templates in strategies.json`);

  for (const item of strategiesData) {
    const strategyTemplateName = `${item.app} ${item.name}`;
    let determinedRiskLevel: RiskLevel;
    const strategyImage = findStrategyAppImage(item.app);

    if (item.name.toLowerCase() === 'aggressive') {
      determinedRiskLevel = RiskLevel.AGGRESSIVE;
    } else if (item.name.toLowerCase() === 'normal') {
      determinedRiskLevel = RiskLevel.NORMAL;
    } else {
      console.warn(`Could not determine risk level for strategy template: ${strategyTemplateName} (name: ${item.name}).`);
      determinedRiskLevel = RiskLevel.NORMAL; // Defaulting to NORMAL
      console.warn(`Defaulting risk level to NORMAL for strategy template: ${strategyTemplateName}`);
    }

    const description = item.sources ? `A ${item.name.toLowerCase()} ${item.category} strategy. Sources are dynamically determined based on best available APYs and user preferences.` : `A ${item.name.toLowerCase()} ${item.category} strategy.`;

    try {
      await prisma.strategyTemplate.upsert({
        where: { name: strategyTemplateName },
        update: {
          description: description,
          assetTicker: item.category,
          riskLevel: determinedRiskLevel,
          platform: item.app,
          image: strategyImage,
        },
        create: {
          name: strategyTemplateName,
          description: description,
          assetTicker: item.category,
          riskLevel: determinedRiskLevel,
          platform: item.app,
          image: strategyImage,
        },
      });
      console.log(`Upserted strategy template: ${strategyTemplateName} with risk: ${determinedRiskLevel}, image: ${strategyImage}`);
    } catch (e: any) {
      console.error(`Error upserting strategy template ${strategyTemplateName}:`, e);
    }
  }

  // 2. Seed Yield Opportunities from yield_endpoints.json
  const yieldEndpointsPath = path.join(currentDir, '..', 'data', 'yield_endpoints.json');
  const yieldEndpointsFile = fs.readFileSync(yieldEndpointsPath, 'utf-8');
  const yieldEndpointsData = JSON.parse(yieldEndpointsFile);

  console.log(`Found ${yieldEndpointsData.length} apps in yield_endpoints.json`);

  const allUpsertedYieldOpportunities: { id: string; assetTicker: string }[] = [];

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
            const upsertedOpportunity = await prisma.yieldOpportunity.upsert({
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
              select: { id: true, assetTicker: true }, // Select id and assetTicker for linking
            });
            allUpsertedYieldOpportunities.push(upsertedOpportunity);
            console.log(`Upserted yield opportunity: ${platformName} - ${yieldAssetName} (MarketID: ${yieldMarketId}), TickerImage: ${assetTickerImage}`);
          } catch (e: any) {
            console.error(`Error upserting yield opportunity ${platformName} - ${yieldAssetName}:`, e);
          }
        }
      }
    }
  }

  // 3. Link StrategyTemplates with YieldOpportunities
  console.log('Linking strategy templates with yield opportunities...');
  const strategyTemplates = await prisma.strategyTemplate.findMany({
    select: { id: true, assetTicker: true, name: true },
  });

  for (const template of strategyTemplates) {
    const relevantOpportunities = allUpsertedYieldOpportunities.filter(
      op => op.assetTicker === template.assetTicker
    );

    if (relevantOpportunities.length > 0) {
      try {
        await prisma.strategyTemplate.update({
          where: { id: template.id },
          data: {
            yieldOpportunities: {
              connect: relevantOpportunities.map(op => ({ id: op.id })),
            },
          },
        });
        console.log(`Linked ${relevantOpportunities.length} yield opportunities to strategy template: ${template.name} (Asset: ${template.assetTicker})`);
      } catch (e: any) {
        console.error(`Error linking yield opportunities to strategy template ${template.name}:`, e);
      }
    } else {
      console.log(`No yield opportunities found for strategy template: ${template.name} (Asset: ${template.assetTicker})`);
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