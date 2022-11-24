export class DurableObjectExample implements DurableObject {
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    const ip = request.headers.get("CF-Connecting-IP");
    if (!ip) {
      return new Response("No IP address found", { status: 500 });
    }
    const data = await request.json();
    const storagePromise = await this.state.storage.put(ip, data);
    console.log({ storagePromise });
    return new Response(ip + " stored " + data);
  }
}
