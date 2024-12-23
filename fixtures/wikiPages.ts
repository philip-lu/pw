import { test as base } from "@playwright/test";
import WikiArticlePage from "../pages/WikiArticlePage";
import WikiHomePage from "../pages/WikiHomePage";
import WikiHelpPage from "../pages/WikiHelpPage";

type WikiPages = {
  wikiHomePage: WikiHomePage;
  wikiArticlePage: WikiArticlePage;
  wikiHelpPage: WikiHelpPage;
};

export const test = base.extend<WikiPages>({
  wikiHomePage: async ({ page }, use) => {
    const wikiHomePage = new WikiHomePage(page);
    await use(wikiHomePage);
  },
  wikiArticlePage: async ({ page }, use) => {
    const wikiArticlePage = new WikiArticlePage(page);
    await use(wikiArticlePage);
  },
  wikiHelpPage: async ({ page }, use) => {
    const wikiHelpPage = new WikiHelpPage(page);
    await use(wikiHelpPage);
  },
});
