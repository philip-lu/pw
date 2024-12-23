import { Locator, Page } from "@playwright/test";

export default class WikiHeader {
  readonly page: Page;
  readonly pageContent: Locator;
  readonly searchForm: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageContent = page.locator("#mw-content-text");
    this.searchForm = page.locator("#searchform");
    this.searchInput = this.searchForm.locator("input[name='search']");
    this.searchButton = this.searchForm.getByRole("button");
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }
}
