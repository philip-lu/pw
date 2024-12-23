import { test, expect } from "@playwright/test";

test.describe.only("reqres.in endpoint tests @api", () => {
  test("GET /reqres/api/login 200", async ({ request }) => {
    const _response = await request.get("https://reqres.in/api/login");
    expect(_response).toBeOK();
    const responseData = await _response.json();
    expect(responseData.data.length).toEqual(6);
  });
  test("POST /reqres/api/register", async ({ request }) => {
    await test.step("Send POST request", async () => {
      const _response = await request.post("https://reqres.in/api/register", {
        data: {
          email: "eve.holt@reqres.in",
          password: "anypassword",
        },
      });
      expect(_response).toBeOK();
      const responseData = await _response.json();
      expect(typeof responseData.id).toEqual("string");
      expect(typeof responseData.token).toEqual("string");
    });
  });
});
