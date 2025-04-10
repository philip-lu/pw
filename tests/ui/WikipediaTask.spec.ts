import { expect, Page, TestInfo } from "@playwright/test";
import { test } from "../../fixtures/wikiPages";

async function takeScreenshot(
  page: Page,
  browserName: string,
  testInfo: TestInfo,
  fileName: string,
  pageName: string
) {
  const scr = await page.screenshot({
    path: `test-results/screenshots/${fileName}-${browserName}.png`,
  });
  testInfo.attach(`${pageName} in ${browserName}`, {
    body: scr,
    contentType: "image/png",
  });
}

test.describe("Wikipedia", { tag: "@ui @wikipedia" }, () => {
  test(
    "Article Page Test",
    { tag: "@article" },
    async (
      {
        wikiHomePage,
        wikiArticlePage,
        wikiHelpPage,
        browserName,
        isMobile,
        page,
      },
      testInfo
    ) => {
      test.skip(
        (isMobile || browserName !== "chromium") &&
          (isMobile || browserName !== "webkit"),
        "This test is only supported in Desktop Chrome and Desktop Safari"
      );
      await test.step("Go to the Home page", async () => {
        await wikiHomePage.goTo();
      });

      await test.step("Check that page content is shown", async () => {
        await expect(wikiHomePage.pageBody).toBeVisible();
      });

      await test.step("Search for an article", async () => {
        await wikiHomePage.searchFor(process.env.SEARCH_QUERY);
      });

      await test.step("Check that article title is expected", async () => {
        await expect(wikiArticlePage.title).toHaveText(
          process.env.SEARCH_QUERY
        );
      });

      await test.step("Take a screenshot", async () => {
        await takeScreenshot(
          page,
          browserName,
          testInfo,
          "article",
          "Article Page"
        );
      });

      await test.step("Click on Edit link", async () => {
        await wikiArticlePage.editLink.click();
      });

      await test.step("Verify that modal window is shown", async () => {
        await expect(wikiArticlePage.modal.modalContent).toBeVisible();
      });

      await test.step("Click on modal primary button", async () => {
        await wikiArticlePage.modal.modalPrimaryButton.click();
      });

      await test.step("Verify that modal window is hidden", async () => {
        await expect(wikiArticlePage.modal.modalContent).toBeHidden();
      });

      await test.step("Click on View History link", async () => {
        await wikiArticlePage.viewHistoryLink.click();
      });

      await test.step("Open Help page", async () => {
        wikiHelpPage = await wikiArticlePage.openHelpLink();
      });

      await test.step("Verify the Help page URL", async () => {
        const expectedUrl = "https://www.mediawiki.org/wiki/Help:History";
        await expect(wikiHelpPage.page).toHaveURL(expectedUrl);
      });

      await test.step("Verify that Help page title is displayed", async () => {
        await expect(wikiHelpPage.title).toBeVisible();
      });

      await test.step("Close Help page", async () => {
        await wikiHelpPage.page.close();
      });

      await test.step("Go back to Article page", async () => {
        await wikiArticlePage.goTo(process.env.SEARCH_QUERY);
      });

      await test.step("Change article language", async () => {
        await wikiArticlePage.changeArticleLanguage(process.env.LANGUAGE);
      });

      await test.step("Verify that article language has changed", async () => {
        await expect(wikiArticlePage.title).toHaveText(
          process.env.TRANSLATED_ARTICLE_TITLE
        );
      });

      await test.step("Take a screenshot", async () => {
        await takeScreenshot(
          page,
          browserName,
          testInfo,
          "translation",
          "Translated Article"
        );
      });
    }
  );
});
