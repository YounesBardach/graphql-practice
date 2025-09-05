export const typeDefs = `#graphql
  type Advertiser { 
    id: ID! 
    name: String! 
    campaigns: [Campaign!]! 
  }
  
  type Campaign {
    id: ID!
    name: String!
    status: String!
    advertiser: Advertiser!
    creatives: [Creative!]!
  }

  type Creative { 
    id: ID! 
    name: String! 
    type: String! 
  }

  type Query {
    advertisers: [Advertiser!]!
    advertiser(id: ID!): Advertiser
    campaigns: [Campaign!]!
    campaign(id: ID!): Campaign
    creatives: [Creative!]!
    creative(id: ID!): Creative
  }

  type Mutation {
    createAdvertiser(name: String!): Advertiser!
    createCampaign(name: String!, advertiserId: ID!): Campaign!
    createCreative(name: String!, type: String!, campaignId: ID!): Creative!
    updateCampaignStatus(id: ID!, status: String!): Campaign!
    deleteCampaign(id: ID!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    advertisers: (_, __, { prisma }) => prisma.advertiser.findMany(),
    advertiser: (_, { id }, { prisma }) => prisma.advertiser.findUnique({ where: { id: Number(id) } }),
    campaigns: (_, __, { prisma }) => prisma.campaign.findMany(),
    campaign: (_, { id }, { prisma }) => prisma.campaign.findUnique({ where: { id: Number(id) } }),
    creatives: (_, __, { prisma }) => prisma.creative.findMany(),
    creative: (_, { id }, { prisma }) => prisma.creative.findUnique({ where: { id: Number(id) } }),
  },
  Mutation: {
    createAdvertiser: async (_, { name }, { prisma }) => {
      return prisma.advertiser.create({ data: { name } });
    },
    createCampaign: async (_, { name, advertiserId }, { prisma }) => {
      return prisma.campaign.create({
        data: {
          name,
          advertiserId: Number(advertiserId),
          status: "ACTIVE",
        },
      });
    },
    createCreative: async (_, { name, type, campaignId }, { prisma }) => {
      return prisma.creative.create({
        data: {
          name,
          type,
          campaignId: Number(campaignId),
        },
      });
    },
    updateCampaignStatus: async (_, { id, status }, { prisma }) => {
      return prisma.campaign.update({
        where: { id: Number(id) },
        data: { status },
      });
    },
    deleteCampaign: async (_, { id }, { prisma }) => {
      await prisma.campaign.delete({ where: { id: Number(id) } });
      return true;
    },
  },
  Advertiser: {
    campaigns: (parent, _, { prisma }) => prisma.campaign.findMany({ where: { advertiserId: parent.id } }),
  },
  Campaign: {
    advertiser: (parent, _, { prisma }) => prisma.advertiser.findUnique({ where: { id: parent.advertiserId } }),
    creatives: (parent, _, { prisma }) => prisma.creative.findMany({ where: { campaignId: parent.id } }),
  },
};
