import { test, expect } from '@playwright/test';

test.describe('Velovita - Add to cart test', () => {
  test.setTimeout(120000);

  async function clickLogin(page) {
    const labels = ['LOGIN', 'INICIA SESIÓN', 'FAÇA LOGIN'];
    for (const label of labels) {
      const btn = page.getByRole('button', { name: label });
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        return;
      }
    }
    throw new Error('Login button not found');
  }

  async function closeInitialPopupIfVisible(page) {
    const okLabels = ['Ok', 'Aceptar'];
    for (const label of okLabels) {
      const btn = page.locator(`button:has-text("${label}")`);
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        return;
      }
    }
  }

  async function addProductToCart(page, href) {
    await page.locator(`a[href="${href}"]`).scrollIntoViewIfNeeded();
    await page.locator(`a[href="${href}"]`).click();
    await page.waitForURL(`**${href}`);
    await page.waitForLoadState('domcontentloaded');

    const presentacion = page.locator('button:has-text("Caplets"), button:has-text("Packets")');
    if (await presentacion.isVisible().catch(() => false)) {
      await presentacion.click();
    }

    const addToCartButton = page.locator(
      'button:has-text("Add to cart"), button:has-text("Añadir al carrito"), button:has-text(" Adicionar ao carrinho")'
    );
    await addToCartButton.scrollIntoViewIfNeeded();
    await expect(addToCartButton).toBeVisible({ timeout: 10000 });
    await addToCartButton.click();

    const confirmationText = page.getByText('Your product has been added to your cart!', { exact: true });
    await expect(confirmationText).toBeVisible({ timeout: 15000 });

    const closeButton = confirmationText.locator('xpath=..').locator('button[aria-label="Close"]');
    await expect(closeButton).toBeVisible({ timeout: 10000 });
    await closeButton.click();

    await expect(confirmationText).toHaveCount(0, { timeout: 10000 });

    const backToStoreLink = page.getByText(/Go Back to Store|Regresar a la tienda|Voltar à loja/i);
    await expect(backToStoreLink).toBeVisible({ timeout: 10000 });
    await backToStoreLink.click();

    await page.waitForURL('**/store');
    await page.waitForLoadState('networkidle');
  }

  test('should log in, add 3 products and verify cart', async ({ page }) => {
    await page.goto('https://sandbox.velovita.com');
    await clickLogin(page);

    await page.waitForTimeout(6000);
    await page.locator('input[name="username"]').fill('haoping1957');
    await page.locator('input[name="password"]').fill('W9!kz2Lp#7qA');
    await page.locator('button[type="submit"]:has-text("LOGIN"), button[type="submit"]:has-text("INICIA SESIÓN")').first().click();

    await page.waitForURL('**/home');
    await closeInitialPopupIfVisible(page);

    await page.locator('a[href="/store"]').click();
    await page.waitForURL('**/store');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const productHrefs = [
      '/product-details/AM-Essentials',
      '/product-details/PM-Essentials',
      '/product-details/Reserve'
    ];

    for (const href of productHrefs) {
      await addProductToCart(page, href);
    }

    const cartText = page.getByText(/producto\(s\) en el carrito|item\(s\) in cart/i);
    await expect(cartText).toBeVisible({ timeout: 10000 });
    await cartText.click();

    const cartSidebar = page.locator('[role="dialog"].b-sidebar');
    await cartSidebar.waitFor({ timeout: 10000 });

    await page.waitForTimeout(4000);
    const sidebar = page.locator('.b-sidebar-body');
    await sidebar.evaluate(el => { el.scrollTop = el.scrollHeight; });

    const quantityInputs = await page.locator('input[type="number"][value="1"]').all();
    for (const input of quantityInputs) {
      const parent = input.locator('..');
      const text = await parent.textContent();
      console.log('Producto encontrado con valor 1:', text);
    }
  });
});
