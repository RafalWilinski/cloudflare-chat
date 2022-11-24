export async function handleRequest(request: Request, env: Bindings) {
  const body = await request.json();

  const message = (body as any).message;

  if (!message) {
    return new Response("message not present!", { status: 400 });
  }
  // const chatId = env.MY_DURABLE_OBJECT.newUniqueId(); // this is not working as well (returns undefined)

  const chatId = env.MY_DURABLE_OBJECT.newUniqueId();
  console.log(chatId);
  const stub = env.MY_DURABLE_OBJECT.get(chatId);
  const response = await stub.fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  console.log("Response from Durable Object: ", response);

  return new Response("OK");
}

export const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

export { DurableObjectExample } from "./durableObject";
export default worker;
