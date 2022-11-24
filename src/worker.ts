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

export async function handleRequest(request: Request, env: Bindings) {
  const body = await request.json();

  const message = (body as any).message;

  if (!message) {
    return new Response("message not present!", { status: 400 });
  }
  // const chatId = env.MY_DURABLE_OBJECT.newUniqueId(); // this is not working as well (returns undefined)

  const chatId = env.MY_DURABLE_OBJECT.idFromName("chat");
  console.log(chatId);
  const stub = env.MY_DURABLE_OBJECT.get(chatId);
  const response = await stub.fetch(request);
  console.log("Response from Durable Object: ", response);

  return new Response("OK");
}

const worker = {
  async fetch(request: Request, env: Bindings): Promise<Response> {
    return handleRequest(request, env);
  },
};
export default worker;
