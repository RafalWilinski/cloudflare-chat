import { GraphQLTypeResolver } from "graphql";
import { Context } from "..";

export const channel: GraphQLTypeResolver<{ id: string }, Context> = async (
  value,
  context,
  _info
) => {
  const channelId = context.env.CHANNEL.idFromName(value.id);
  const channelStub = context.env.CHANNEL.get(channelId);

  const response = await channelStub.fetch(context.request.url);

  return response.json();
};
