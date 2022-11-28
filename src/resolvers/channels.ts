import { Context } from "..";

export const channels = async (_: unknown, value: {}, context: Context) => {
  const channels = context.CHANNELS.idFromName("channels");
  const channelsStub = context.CHANNELS.get(channels);
  const response = await channelsStub.fetch(context.request.url);

  return response.json();
};
