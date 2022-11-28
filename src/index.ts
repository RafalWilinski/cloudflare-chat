import { createYoga, createSchema } from "graphql-yoga";
import { Env } from "../worker-configuration";
import { resolvers, schema } from "./schema";

export interface Context extends Env {
  params: unknown;
  request: Request;
}

const yoga = createYoga({
  schema: createSchema({
    typeDefs: schema,
    resolvers: resolvers,
  }),
});

export async function handleRequest(request: Request, env: Env) {
  const response = await yoga.fetch(request, env);
  return response;
}

export const worker: ExportedHandler<Env> = { fetch: handleRequest };

export { ChannelsDO } from "./persistence/channels";
export { ChannelDO } from "./persistence/channel";

export default worker;
