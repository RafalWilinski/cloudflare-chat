import { expect, test } from "vitest";
import { handleRequest } from "..";

const describe = setupMiniflareIsolatedStorage();
const bindings = getMiniflareBindings();

describe("Create channel", () => {
  test("creates a channel", async () => {
    const req = new Request("http://localhost/graphql", {
      body: JSON.stringify({ query: "{ channels { id } }" }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const res = await handleRequest(req, bindings);
    expect(await res.json()).toStrictEqual({
      data: {
        channels: [],
      },
    });
  });
});
