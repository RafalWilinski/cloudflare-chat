import { Context } from "..";

type ArchiveChannelArgs = {
  id: string;
};

export const archiveChannel = async (
  _: unknown,
  { id }: ArchiveChannelArgs,
  context: Context
) => {
  const channelId = context.CHANNEL.idFromName(id);
  const channelStub = context.CHANNEL.get(channelId);
  const channel = await channelStub.fetch(`${context.request.url}archive`);

  const channels = context.CHANNELS.idFromName("channels");
  const channelsStub = context.CHANNELS.get(channels);
  await channelsStub.fetch(
    `${context.request.url}archive?channelId=${channelId}`
  );

  console.log("Archived channel", channel);

  return channel.json();
};
