import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PkwtDashboardPage extends BasePage {
  readonly greetingText: Locator;
  readonly subGreetingText: Locator;
  readonly profileAvatar: Locator;
  readonly presenceSectionTitle: Locator;
  readonly monthPickerBtn: Locator;
  readonly yearPickerBtn: Locator;
  readonly historySectionTitle: Locator;
  readonly seeAllHistoryLink: Locator;
  readonly absenMasukBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.greetingText = page.locator('p:has-text("Hai,")');
    this.subGreetingText = page.locator('p:has-text("Have a nice day !")');
    this.profileAvatar = page.locator('img[alt="photo user"]');
    this.presenceSectionTitle = page.getByText('Kehadiranmu');
    // Month and Year selector buttons in Kehadiranmu header
    this.monthPickerBtn = page.locator('button').filter({
      hasText: /^(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember|January|February|March|April|May|June|July|August|September|October|November|December)$/i,
    });
    this.yearPickerBtn = page.locator('button').filter({ hasText: /^\d{4}$/ });
    this.historySectionTitle = page.getByText('History Absensi');
    this.seeAllHistoryLink = page.getByText('Selengkapnya');
    this.absenMasukBtn = page.getByRole('button', { name: 'Absen Masuk' });
  }

  async goto() {
    await super.goto('/apps/absent');
    await this.greetingText.waitFor({ state: 'visible', timeout: 15000 });
  }

  async getGreetingName(): Promise<string> {
    const fullText = (await this.greetingText.textContent()) || '';
    return fullText.replace(/^Hai,\s*/, '').trim();
  }

  async getMetricValue(metricName: 'WFO' | 'Cuti' | 'Sakit' | 'WFH' | 'Lembur' | 'Terlambat' | 'Pulang Cepat'): Promise<number> {
    const iconMap: Record<string, string> = {
      'WFO': 'wfo',
      'Cuti': 'leave',
      'Sakit': 'sick',
      'WFH': 'wfh',
      'Lembur': 'overtime',
      'Terlambat': 'late',
      'Pulang Cepat': 'early_leave',
    };
    const icon = iconMap[metricName];
    return await this.page.evaluate((iconName) => {
      const img = document.querySelector(`img[alt="${iconName}"]`);
      if (!img) return 0;
      let curr: HTMLElement | null = img as HTMLElement;
      while (curr && curr !== document.body) {
        if (curr.innerText && curr.innerText.trim().length > 0) {
          const match = curr.innerText.match(/\b\d+\b/);
          if (match) return parseInt(match[0], 10);
        }
        curr = curr.parentElement;
      }
      return 0;
    }, icon);
  }

  async openMonthPicker() {
    await this.monthPickerBtn.first().click();
  }

  async selectMonth(monthAbbr: string) {
    await this.openMonthPicker();
    const monthOption = this.page.locator(`button:has-text("${monthAbbr}")`).first();
    await monthOption.waitFor({ state: 'visible', timeout: 5000 });
    await monthOption.click();
  }

  async openYearPicker() {
    await this.yearPickerBtn.first().click();
  }

  async selectYear(year: string) {
    await this.openYearPicker();
    const yearOption = this.page.locator(`button:has-text("${year}")`).first();
    await yearOption.scrollIntoViewIfNeeded();
    await yearOption.click();
  }

  getMenuButton(menuName: string): Locator {
    return this.page.locator(`img[alt="${menuName}"]`).locator('..');
  }

  async clickMenu(menuName: string) {
    const menuBtn = this.getMenuButton(menuName);
    await menuBtn.waitFor({ state: 'visible', timeout: 10000 });
    await menuBtn.click();
  }
}
