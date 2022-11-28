import { GraphQLTypeResolver } from "graphql";
import { Context } from "..";

type CreateChannelArgs = {
  name: string;
};

export const createChannel: GraphQLTypeResolver<
  CreateChannelArgs,
  Context
> = async ({ name }, context, _info) => {
  const channelId = context.CHANNEL.newUniqueId();
  const channelStub = context.CHANNEL.get(channelId);
  const channel = await channelStub.fetch(
    `${context.request.url}create?name=${name}`
  );

  const channels = context.CHANNELS.idFromName("channels");
  const channelsStub = context.CHANNELS.get(channels);
  await channelsStub.fetch(
    `${context.request.url}add?channelId=${channelId}&name=${name}`
  );

  console.log("Created channel", channel);

  return channel.json();
};
