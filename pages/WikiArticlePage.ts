import { Locator, Page } from "@playwright/test";
import WikiHeader from "../components/WikiHeader";
import WikiModal from "../components/WikiModal";
import WikiHelpPage from "./WikiHelpPage";

export default class WikiArticlePage {
  readonly page: Page;
  readonly header: WikiHeader;
  readonly title: Locator;
  readonly editLink: Locator;
  readonly viewHistoryLink: Locator;
  readonly helpLink: Locator;
  readonly languageSelector: Locator;
  readonly languageSearchInput: Locator;
  readonly languageLink: Locator;
  readonly modal: WikiModal;

  constructor(page: Page) {
    this.page = page;
    this.header = new WikiHeader(page);
    this.title = page.locator("h1").locator(".mw-page-title-main");
    this.editLink = page.locator("#ca-edit");
    this.viewHistoryLink = page.locator("#ca-history");
    this.helpLink = page.locator("#mw-indicator-mw-helplink");
    this.languageSelector = page.locator("#p-lang-btn-checkbox");
    this.languageSearchInput = page
      .locator(".uls-search-wrapper")
      .locator("input");
    this.languageLink = page.locator(".uls-language-list").locator("a");
    this.modal = new WikiModal(page);
  }

  async goTo(topic: string) {
    await this.page.goto(`${process.env.BASE_URL}/wiki/${topic}`);
  }

  async changeArticleLanguage(lang: string) {
    await this.languageSelector.click();
    await this.languageLink.filter({ hasText: lang }).click();
  }

  async openHelpLink() {
    const newPagePromise = this.page.context().waitForEvent("page");
    await this.helpLink.click();
    return new WikiHelpPage(await newPagePromise);
  }
}
