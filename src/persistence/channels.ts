export class ChannelsDO implements DurableObject {
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === "/add") {
      const channelId = url.searchParams.get("channelId") as string;
      const name = url.searchParams.get("name") as string;

      await this.state.storage.put(channelId, name);
    }

    const channelsKV = await this.state.storage.list();
    const channels = Array.from(channelsKV.entries()).map(([key, value]) => ({
      id: key,
      name: value,
    }));

    return new Response(JSON.stringify(channels));
  }
}

export default ChannelsDO;
