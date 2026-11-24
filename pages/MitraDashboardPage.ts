import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MitraDashboardPage extends BasePage {
  readonly greetingHeading: Locator;
  readonly userName: Locator;
  readonly profileAvatar: Locator;
  readonly monthlyActivityCard: Locator;
  readonly morningReportCard: Locator;
  readonly eveningReportCard: Locator;
  readonly presensiBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.greetingHeading = page.locator('p, h1, h2, h3, h4, h5, h6').filter({
      hasText: /^Good (Morning|Afternoon|Evening|Night)$/i,
    });
    this.userName = page.locator('p:has-text("Hai,")');
    this.profileAvatar = page.locator('img[alt="photo user"]');
    this.monthlyActivityCard = page.locator(':has-text("Jumlah Kegiatan Bulan ini")');
    this.morningReportCard = page.locator(':has-text("Laporan Kegiatan Pagi")');
    this.eveningReportCard = page.locator(':has-text("Laporan Kegiatan Sore")');
    this.presensiBtn = page.locator('button').filter({
      hasText: /Kegiatan (Pagi|Sore)/i,
    });
  }

  async goto() {
    await super.goto('/apps/absent/mitra');
    await this.userName.waitFor({ state: 'visible', timeout: 15000 });
  }

  async getGreetingText(): Promise<string> {
    return (await this.greetingHeading.first().textContent()) || '';
  }

  async getUserDisplayName(): Promise<string> {
    const fullText = (await this.userName.textContent()) || '';
    return fullText.replace(/^Hai,\s*/, '').trim();
  }

  async getMonthlyActivityCount(): Promise<number> {
    return await this.page.evaluate(() => {
      const ps = Array.from(document.querySelectorAll('p'));
      const idx = ps.findIndex(p => p.textContent?.includes('Jumlah Kegiatan Bulan ini'));
      if (idx !== -1 && ps[idx + 1]) {
        const match = ps[idx + 1].textContent?.match(/\b\d+\b/);
        return match ? parseInt(match[0], 10) : 0;
      }
      return 0;
    });
  }

  async getMorningReportText(): Promise<string> {
    return await this.page.evaluate(() => {
      const ps = Array.from(document.querySelectorAll('p'));
      const idx = ps.findIndex(p => p.textContent?.includes('Laporan Kegiatan Pagi'));
      return idx !== -1 && ps[idx + 1] ? ps[idx + 1].textContent?.trim() || '' : '';
    });
  }

  async getEveningReportText(): Promise<string> {
    return await this.page.evaluate(() => {
      const ps = Array.from(document.querySelectorAll('p'));
      const idx = ps.findIndex(p => p.textContent?.includes('Laporan Kegiatan Sore'));
      return idx !== -1 && ps[idx + 1] ? ps[idx + 1].textContent?.trim() || '' : '';
    });
  }

  async getPresensiButtonText(): Promise<string | null> {
    if (await this.presensiBtn.isVisible()) {
      return (await this.presensiBtn.textContent()) || '';
    }
    return null;
  }

  async isPresensiButtonVisible(): Promise<boolean> {
    return await this.presensiBtn.isVisible();
  }

  async clickPresensiButton() {
    await this.presensiBtn.click();
  }
}
