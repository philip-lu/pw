import { Locator, Page } from "@playwright/test";
import WikiHeader from "../components/WikiHeader";

export default class WikiHomePage {
  readonly page: Page;
  readonly header: WikiHeader;
  readonly pageBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageBody = page.locator(".mw-body");
    this.header = new WikiHeader(page);
  }

  async goTo() {
    await this.page.goto(process.env.BASE_URL);
  }

  async searchFor(query: string) {
    await this.header.searchInput.fill(query);
    await this.header.searchButton.click();
  }
}
