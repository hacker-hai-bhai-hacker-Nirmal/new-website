import asyncio
from playwright.async_api import async_playwright

async def run_test():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('https://new-website-1ce.pages.dev/')  # Updated to live site URL
        # Example: check for landing page title
        title = await page.title()
        print(f"Page title: {title}")
        # Example: check for admin/dashboard element
        admin_exists = await page.locator('text=Admin').count() > 0
        print(f"Admin element present: {admin_exists}")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_test())
