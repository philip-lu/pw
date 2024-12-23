import { APIRequestContext, test as base, request } from "@playwright/test";

export type pwPracticalTaskOptions = {
  apiBaseUrl: string;
  reqresInRequest: APIRequestContext;
};

export const test = base.extend<pwPracticalTaskOptions>({
  apiBaseUrl: ["", { option: true }],
  reqresInRequest: async ({ apiBaseUrl }, use) => {
    const reqresInRequestContext = await request.newContext({
      baseURL: `${apiBaseUrl}/`,
    });
    await use(reqresInRequestContext);
  },
});
