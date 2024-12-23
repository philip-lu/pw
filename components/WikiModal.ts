import { Locator, Page } from "@playwright/test";

export default class WikiModal {
  readonly page: Page;
  readonly modalFrame: Locator;
  readonly modalContent: Locator;
  readonly modalPrimaryButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalFrame = page.locator(".oo-ui-window-frame");
    this.modalContent = this.modalFrame.locator(
      ".ve-init-mw-welcomeDialog-content"
    );
    this.modalPrimaryButton = page
      .locator(".oo-ui-messageDialog-actions")
      .getByRole("button")
      .filter({ hasText: process.env.ACTION_BUTTON_LABEL });
  }
}
