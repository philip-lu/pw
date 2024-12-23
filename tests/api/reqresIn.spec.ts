import { test } from "../../fixtures/apiEndpoints";
import { expect } from "@playwright/test";
import { parse } from "csv-parse/sync";
import * as fs from "fs";
import * as path from "path";

const testCases = parse(
  fs.readFileSync(
    path.join(__dirname, "../../test-data/postReqresInRegisterData.csv")
  ),
  { columns: true, skip_empty_lines: true }
);

test.describe("reqres.in endpoint tests @api", () => {
  test("GET /reqres/api/login 200", async ({ reqresInRequest }) => {
    const _response = await reqresInRequest.get("login");
    expect(_response).toBeOK();
    const responseData = await _response.json();
    expect(responseData.data.length).toEqual(6);
  });

  test("POST /reqres/api/register 200", async ({ reqresInRequest }) => {
    await test.step("Send POST request", async () => {
      const _response = await reqresInRequest.post("register", {
        data: {
          email: "eve.holt@reqres.in",
          password: "anypassword",
        },
      });
      expect(_response).toBeOK();
      const responseData = await _response.json();
      expect(typeof responseData.id).toEqual("number");
      expect(typeof responseData.token).toEqual("string");
    });
  });

  for (const testCase of testCases) {
    test(`POST /reqres/api/register 400 - ${testCase.name}`, async ({
      reqresInRequest,
    }) => {
      const _response = await reqresInRequest.post("register", {
        data: {
          email: testCase.email,
          password: testCase.password,
        },
      });
      expect(_response.status()).toBe(400);
      const responseData = await _response.json();
      expect(responseData.error).toEqual(`${testCase.error}`);
    });
  }
});
