import { graphql, buildSchema } from "graphql";
import { Env } from "../worker-configuration";
import { channels } from "./resolvers/channels";
import { channel } from "./resolvers/channel";
import { createChannel } from "./mutations/createChannel";

export interface Context {
  env: Env;
  request: Request;
}

const schema = buildSchema(`
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
  }
`);

function buildRoot() {
  return {
    channel,
    channels,
    Channel: {
      createdAt: () => new Date().toISOString(),
    },
    createChannel,
  };
}

export async function handleRequest(request: Request, env: Env) {
  const {
    operationName,
    variables,
    query,
  }: {
    operationName: string;
    variables: Record<string, unknown>;
    query: string;
  } = await request.json();

  const rootValue = buildRoot();
  const gqlResponse = await graphql({
    schema,
    rootValue,
    variableValues: variables,
    source: query,
    contextValue: {
      request,
      env,
    },
  });

  return new Response(JSON.stringify(gqlResponse));
}

export const worker: ExportedHandler<Env> = { fetch: handleRequest };

export { ChannelsDO } from "./persistence/channels";
export { ChannelDO } from "./persistence/channel";

export * from "./persistence/channels";

export default worker;
