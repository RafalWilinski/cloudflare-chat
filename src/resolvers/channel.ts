import { Context } from "..";

export const channel = async (
  _: unknown,
  value: { id: string },
  context: Context
) => {
  const channelId = context.CHANNEL.idFromName(value.id);
  const channelStub = context.CHANNEL.get(channelId);

  const response = await channelStub.fetch(context.request.url);

  return response.json();
};
