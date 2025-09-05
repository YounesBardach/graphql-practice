import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function dateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date;
}

async function main() {
  await prisma.metric.deleteMany();
  await prisma.creative.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.advertiser.deleteMany();

  const advertiser = await prisma.advertiser.create({
    data: {
      name: "Acme Corp",
      campaigns: {
        create: [
          { name: "Brand Awareness - Q3", status: "ACTIVE" },
          { name: "Performance - Back to School", status: "PAUSED" },
        ],
      },
    },
    include: { campaigns: true },
  });

  for (const campaign of advertiser.campaigns) {
    await prisma.creative.createMany({
      data: [
        { name: `${campaign.name} / Banner 300x250`, type: "banner", campaignId: campaign.id },
        { name: `${campaign.name} / Video 15s`, type: "video", campaignId: campaign.id },
      ],
    });
  }

  const campaigns = await prisma.campaign.findMany();
  for (const campaign of campaigns) {
    for (let i = 14; i >= 0; i--) {
      const date = dateDaysAgo(i);
      const impressions = Math.floor(5000 + Math.random() * 20000);
      const clicks = Math.floor(impressions * (0.01 + Math.random() * 0.02));
      const spend = Number(((impressions / 1000) * (1 + Math.random() * 2)).toFixed(2));
      await prisma.metric.create({
        data: { date, impressions, clicks, spend, campaignId: campaign.id },
      });
    }
  }

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
