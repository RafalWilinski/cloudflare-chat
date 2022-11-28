export interface Channel {
  id: string;
  name: string;
  createdAt: string;
  messages: any[];
  archivedAt?: string;
}

export class ChannelDO implements DurableObject {
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  static actions = [
    {
      path: "/create",
      action: this.prototype.createChannel,
    },
  ];

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === "/create") {
      await this.createChannel(url.searchParams.get("name"));
    } else if (url.pathname === "/archive") {
      await this.archiveChannel(url.searchParams.get("id"));
    }

    const channel = await this.getChannel();

    return new Response(JSON.stringify(channel));
  }

  public async createChannel(name: string | null) {
    if (!name) {
      throw new Error('"name" parameter missing');
    }

    console.log("Creating channel with ID: " + this.state.id.toString());

    await this.state.storage.put("id", this.state.id.toString());
    await this.state.storage.put("name", name);
    await this.state.storage.put("messages", []);
    await this.state.storage.put("createdAt", new Date().toISOString());
  }

  private async archiveChannel(id: string | null) {
    if (!id) {
      throw new Error('"name" parameter missing');
    }

    await this.state.storage.put("archivedAt", new Date().toISOString());
  }

  private async getChannel(): Promise<Channel> {
    const id = await this.state.storage.get("id");
    const name = await this.state.storage.get("name");
    const messages = await this.state.storage.get("messages");
    const createdAt = await this.state.storage.get("createdAt");
    const archivedAt = await this.state.storage.get("archivedAt");

    return {
      id,
      name,
      messages,
      createdAt,
      archivedAt,
    } as Channel;
  }
}

export default ChannelDO;
