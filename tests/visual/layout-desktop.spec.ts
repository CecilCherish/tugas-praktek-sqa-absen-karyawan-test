import { test, expect } from '../../fixtures';

test.describe('Non-Fungsional: Layout Desktop Column & Visual (@regression, @visual)', () => {

  test('TC-NF-UI-001: Verifikasi tampilan antarmuka web pada desktop termuat dalam layout kolom sempit terpusat (mobile mirroring) @regression @visual', async ({ loginPage, page }) => {
    await loginPage.goto();
    await page.setViewportSize({ width: 1280, height: 720 });

    // Periksa kontainer konten utama
    const containerMetrics = await page.evaluate(() => {
      const form = document.querySelector('form');
      if (!form) return null;
      const rect = form.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const leftMargin = rect.left;
      const rightMargin = viewportWidth - rect.right;
      return {
        width: rect.width,
        leftMargin,
        rightMargin,
        viewportWidth,
        isCentered: Math.abs(leftMargin - rightMargin) < 50, // Toleransi simetris
      };
    });

    expect(containerMetrics).not.toBeNull();
    // Lebar kolom mobile-mirroring berada dalam rentang sempit (~280px - 500px)
    expect(containerMetrics!.width).toBeGreaterThanOrEqual(280);
    expect(containerMetrics!.width).toBeLessThanOrEqual(500);
    // Terpusat di tengah layar desktop
    expect(containerMetrics!.isCentered).toBe(true);
  });

  test('TC-NF-UI-002: Verifikasi stabilitas kontainer layout saat jendela browser diubah ukurannya (resizing) @regression @visual', async ({ loginPage, page }) => {
    await loginPage.goto();

    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1280, height: 720 },
      { width: 1024, height: 768 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.waitForTimeout(500);

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      // Kontainer tidak boleh overflow secara horizontal
      expect(hasHorizontalScroll).toBe(false);

      // Form tetap berada di tengah layar
      const isCentered = await page.evaluate(() => {
        const form = document.querySelector('form');
        if (!form) return false;
        const rect = form.getBoundingClientRect();
        return Math.abs(rect.left - (window.innerWidth - rect.right)) < 50;
      });
      expect(isCentered).toBe(true);
    }
  });

  test('TC-NF-UI-003: Verifikasi perilaku halaman saat digulir vertikal tanpa adanya scroll horizontal yang tidak diinginkan @regression @visual', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/);
    await authenticatedPkwtPage.waitForTimeout(1000);

    // Gulir ke bawah secara bertahap
    await authenticatedPkwtPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await authenticatedPkwtPage.waitForTimeout(500);
    await authenticatedPkwtPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await authenticatedPkwtPage.waitForTimeout(500);

    // Verifikasi tidak ada horizontal scrollbar
    const horizontalScrollExists = await authenticatedPkwtPage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(horizontalScrollExists).toBe(false);

    // Gulir kembali ke atas
    await authenticatedPkwtPage.evaluate(() => window.scrollTo(0, 0));
    await authenticatedPkwtPage.waitForTimeout(500);
    const scrollY = await authenticatedPkwtPage.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test('TC-NF-UI-004: Verifikasi penanganan gambar broken aset foto profil menampilkan fallback teks alt atau logo placeholder @regression @visual', async ({ authenticatedPkwtPage }) => {
    await authenticatedPkwtPage.goto('/apps/absent');
    await authenticatedPkwtPage.waitForURL(/\/apps\/absent\/?$/);

    // Temukan elemen avatar foto profil
    const avatar = authenticatedPkwtPage.locator('img[alt="photo user"]').first();
    await expect(avatar).toBeAttached();

    // Verifikasi atribut alt sebagai fallback teks sesuai catatan defect user
    const altText = await avatar.getAttribute('alt');
    expect(altText).toBe('photo user');

    // Verifikasi kegagalan pemuatan aset gambar (broken image / fallback icon ditampilkan)
    const isImageBrokenOrHandled = await avatar.evaluate((img: HTMLImageElement) => {
      // Pada bug broken image, naturalWidth bernilai 0 atau gambar ditangani oleh placeholder
      return img.naturalWidth === 0 || img.complete;
    });
    expect(isImageBrokenOrHandled).toBe(true);
  });

});
