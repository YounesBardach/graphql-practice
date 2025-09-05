// Simple GraphQL API Demo
// Run: npm run dev (in one terminal) then npm run demo (in another)
const endpoint = "http://localhost:4000/graphql";

async function executeGraphQLQuery(query, variables = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

(async () => {
  console.log("🚀 Simple GraphQL Demo\n");

  // 1. Get all advertisers
  console.log("1. All Advertisers:");
  const advertisersResponse = await executeGraphQLQuery(`{ advertisers { id name } }`);
  console.log(JSON.stringify(advertisersResponse, null, 2));

  // 2. Get all campaigns
  console.log("\n2. All Campaigns:");
  const campaignsResponse = await executeGraphQLQuery(`{ campaigns { id name status } }`);
  console.log(JSON.stringify(campaignsResponse, null, 2));

  // 3. Create a new advertiser
  console.log("\n3. Creating new advertiser:");
  const createAdvertiserResponse = await executeGraphQLQuery(`
    mutation { 
      createAdvertiser(name: "Demo Company") { 
        id name 
      } 
    }
  `);
  console.log(JSON.stringify(createAdvertiserResponse, null, 2));

  // 4. Create a campaign for the new advertiser
  console.log("\n4. Creating new campaign:");
  const createCampaignResponse = await executeGraphQLQuery(`
    mutation { 
      createCampaign(name: "Demo Campaign", advertiserId: "1") { 
        id name status 
      } 
    }
  `);
  console.log(JSON.stringify(createCampaignResponse, null, 2));

  // 5. Update campaign status
  console.log("\n5. Updating campaign status:");
  const updateCampaignResponse = await executeGraphQLQuery(`
    mutation { 
      updateCampaignStatus(id: "1", status: "PAUSED") { 
        id name status 
      } 
    }
  `);
  console.log(JSON.stringify(updateCampaignResponse, null, 2));

  console.log("\n✅ Demo completed!");
})().catch((err) => console.error("❌ Error:", err));
