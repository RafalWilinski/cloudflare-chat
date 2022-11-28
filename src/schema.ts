import { channels } from "./resolvers/channels";
import { channel } from "./resolvers/channel";

import { createChannel } from "./mutations/createChannel";
import { archiveChannel } from "./mutations/archiveChannel";

export const schema = /* GraphQL */ `
  type Channel {
    id: ID!
    name: String!
    createdAt: String
  }

  type Query {
    channel(id: ID!): Channel
    channels: [Channel!]!
  }

  type Mutation {
    createChannel(name: String!): Channel!
    archiveChannel(id: ID!): Channel!
  }
`;

export const resolvers = {
  Query: {
    channel,
    channels,
  },
  Mutation: {
    createChannel,
    archiveChannel,
  },
};
