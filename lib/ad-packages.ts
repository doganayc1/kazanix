export const AD_PACKAGES = {
  BASLANGIC: {
    name: "Başlangıç",
    price: 99,
    days: 7,
  },

  STANDART: {
    name: "Standart",
    price: 299,
    days: 30,
  },

  ONE_CIKAN: {
    name: "Öne Çıkan",
    price: 459,
    days: 30,
  },
} as const;

export type AdPackageKey = keyof typeof AD_PACKAGES;

export function getAdPackage(value: unknown) {
  const key = String(value || "").trim() as AdPackageKey;

  if (!Object.prototype.hasOwnProperty.call(AD_PACKAGES, key)) {
    throw new Error("Geçersiz reklam paketi.");
  }

  return AD_PACKAGES[key];
}
