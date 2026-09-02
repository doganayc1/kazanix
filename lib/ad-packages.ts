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

export function normalizeAdPackageKey(
  value: unknown
): AdPackageKey {
  const raw = String(value || "")
    .trim()
    .toUpperCase();

  if (!raw) {
    return "BASLANGIC";
  }

  // Eski/alternatif API payload uyumlulugu.
  if (raw === "STANDARD") {
    return "STANDART";
  }

  if (
    Object.prototype.hasOwnProperty.call(
      AD_PACKAGES,
      raw
    )
  ) {
    return raw as AdPackageKey;
  }

  throw new Error(
    "Geçersiz reklam paketi."
  );
}

export function getAdPackage(
  value: unknown
) {
  const key =
    normalizeAdPackageKey(value);

  return AD_PACKAGES[key];
}
