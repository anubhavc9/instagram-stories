import { test, expect } from "@playwright/test";

test.describe("Story Viewer App", () => {
  test("should load stories successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".story-item")).toHaveCount(10); // Assuming 10 stories
  });

  test("should open and close fullscreen view", async ({ page }) => {
    await page.goto("/");
    await page.locator(".story-item").nth(0).click();
    await expect(page.locator(".fullscreen-container")).toBeVisible();

    await page.locator(".close-button").click();
    await expect(page.locator(".fullscreen-container")).not.toBeVisible();
  });

  test("should navigate stories in fullscreen mode", async ({ page }) => {
    await page.goto("/");
    await page.locator(".story-item").nth(0).click();

    // Navigate to the next story
    await page.mouse.click(700, 400); // Right side click
    await expect(page.locator(".active-story")).toHaveId("story-item-1");

    // Navigate to the previous story
    await page.mouse.click(300, 400); // Left side click
    await expect(page.locator(".active-story")).toHaveId("story-item-0");
  });
});
