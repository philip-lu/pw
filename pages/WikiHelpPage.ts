import { Locator, Page } from "@playwright/test";
import WikiHeader from "../components/WikiHeader";

export default class WikiHelpPage {
  readonly page: Page;
  readonly header: WikiHeader;
  readonly title: Locator;
  readonly pageBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new WikiHeader(page);
    this.title = page.getByRole("heading", {
      name: "Help:History",
      exact: true,
    });
    this.pageBody = page.locator("#content");
  }
}
