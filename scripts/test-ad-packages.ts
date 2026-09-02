import {
  AD_PACKAGES,
  getAdPackage,
} from "../lib/ad-packages";

function assert(
  condition: unknown,
  message: string
) {
  if (!condition) {
    throw new Error("TEST FAILED: " + message);
  }
}

assert(
  getAdPackage("BASLANGIC").price === 99,
  "BASLANGIC fiyatı 99 olmalı"
);

assert(
  getAdPackage("STANDART").price === 299,
  "STANDART fiyatı 299 olmalı"
);

assert(
  getAdPackage("ONE_CIKAN").price === 459,
  "ONE_CIKAN fiyatı 459 olmalı"
);

assert(
  AD_PACKAGES.BASLANGIC.days === 7,
  "BASLANGIC 7 gün olmalı"
);

assert(
  AD_PACKAGES.STANDART.days === 30,
  "STANDART 30 gün olmalı"
);

assert(
  AD_PACKAGES.ONE_CIKAN.days === 30,
  "ONE_CIKAN 30 gün olmalı"
);

console.log("AD PACKAGE TESTS: PASS");
