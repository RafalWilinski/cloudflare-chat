import { GraphQLTypeResolver } from "graphql";
import { Context } from "..";

export const channels: GraphQLTypeResolver<{}, Context> = async (
  _value,
  context,
  _info
) => {
  const channels = context.env.CHANNELS.idFromName("channels");
  const channelsStub = context.env.CHANNELS.get(channels);
  const response = await channelsStub.fetch(context.request.url);

  return response.json();
};
