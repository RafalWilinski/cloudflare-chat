export class ChannelDO implements DurableObject {
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    console.log("ChannelDO fetch " + url.pathname);
    if (url.pathname === "/create") {
      console.log("Creating channel with ID: " + this.state.id.toString());

      const name = url.searchParams.get("name");
      await this.state.storage.put("id", this.state.id.toString());
      await this.state.storage.put("name", name);
      await this.state.storage.put("messages", []);
      await this.state.storage.put("createdAt", new Date().toISOString());
    }

    const id = await this.state.storage.get("id");
    const name = await this.state.storage.get("name");
    const messages = await this.state.storage.get("messages");
    const createdAt = await this.state.storage.get("createdAt");
    const deletedAt = await this.state.storage.get("deletedAt");

    return new Response(
      JSON.stringify({
        id,
        name,
        messages,
        createdAt,
        deletedAt,
      })
    );
  }
}

export default ChannelDO;
