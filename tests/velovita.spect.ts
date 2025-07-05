import { test, expect } from '@playwright/test';

test.describe('Velovita - Add to cart test', () => {
  test('should log in, add 3 products and verify cart', async ({ page }) => {
    // 1. Ir a la página de login
    await page.goto('https://sandbox.velovita.com');

    // 2. Iniciar sesión
    await page.getByPlaceholder('Usuario').fill('haoping1957');
    await page.getByPlaceholder('Contraseña').fill('W9!kz2Lp#7qA'); // <-- remplazar
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // Esperar a que cargue la página de inicio
    await page.waitForURL('**/inicio');

    // 3. Ir a la tienda desde el menú lateral
    await page.getByRole('link', { name: 'Tienda' }).click();
    await page.waitForURL('**/store');

    // 4. Agregar tres productos distintos al carrito
    const productos = ['Brān Reimagined', 'Zlēm Sleep & Slim', 'Uüth Time Reverser']; // Ejemplos
    for (const nombre of productos) {
      const producto = page.getByRole('heading', { name: new RegExp(nombre, 'i') });
      await expect(producto).toBeVisible();

      const card = await producto.locator('..').locator('button', { hasText: 'Agregar' });
      await card.click();
    }

    // 5. Ir al carrito y validar los productos
    await page.getByRole('link', { name: /carrito|cart/i }).click();
    await page.waitForURL('**/cart');

    for (const nombre of productos) {
      const item = page.getByText(nombre, { exact: false });
      await expect(item).toBeVisible();

      const cantidad = item.locator('..').locator('input[type="number"]');
      await expect(cantidad).toHaveValue('1');
    }
  });
});
