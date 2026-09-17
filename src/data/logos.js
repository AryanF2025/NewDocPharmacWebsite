/**
 * Client and integration marks.
 *
 * `scale` corrects the wildly different amounts of built-in padding in the
 * source files — the brief flagged "logos are not aligned (huge size
 * variation)", and this is the fix: every mark is rendered into the same box
 * and then nudged so its *optical* weight matches its neighbours.
 */

import oneMg from "@/assets/logos/health_care_1_1mg.webp";
import niva from "@/assets/logos/health_care_2_niva.webp";
import icici from "@/assets/logos/health_care_3_ICICI.webp";
import netmeds from "@/assets/logos/health_care_4_netmeds.webp";
import furball from "@/assets/logos/health_care_7_furball_logo.webp";
import platinumRx from "@/assets/logos/health_care_8_PlatinumRx.webp";
import ekinCare from "@/assets/logos/health_care_9_EkinCare.webp";
import healthKart from "@/assets/logos/health_care_10_Healthkart.webp";
import kimirica from "@/assets/logos/health_care_11_Kimirica.webp";
import pureAura from "@/assets/logos/health_care_12_Pure_aura.webp";
import calmosis from "@/assets/logos/health_care_13_calmosis.webp";
import barsana from "@/assets/logos/health_care_14_barsana.webp";
import moePuppy from "@/assets/logos/health_care_15_moe.webp";
import mediBuddy from "@/assets/logos/health_care_16_medibuddy.webp";
import pawllo from "@/assets/logos/health_care_17_Pawllo.webp";
import wellversed from "@/assets/logos/health_care_18_Wellversed.webp";
import visitHealth from "@/assets/logos/health_care_19_visit.webp";
import theElement from "@/assets/logos/health_care_20_The_Element.webp";
import olfa from "@/assets/logos/health_care_21_olfa.webp";
import circleHealth from "@/assets/logos/health_care_22_circle_health.webp";
import secretAlchemist from "@/assets/logos/health_care_23_secret.webp";

import unicommerce from "@/assets/logos/partner-1-unicommerce.webp";
import vinculum from "@/assets/logos/partner-2-vinculum.webp";
import shopify from "@/assets/logos/partner-3-shopify.webp";
import delhivery from "@/assets/logos/partner-4-delhivery.webp";
import blueDart from "@/assets/logos/partner-5-bluedart.webp";
import easyecom from "@/assets/logos/partner-6-easyecom.webp";
import elasticRun from "@/assets/logos/partner-8-elasticrun-logo.webp";
import shiprocket from "@/assets/logos/partner-9-shiprocket_logo-1-TWLqUy.webp";
import pidge from "@/assets/logos/partner-10-pidge.webp";
import amazonShipping from "@/assets/logos/partner-11-amazon-shipping-logo.webp";
import xpressbees from "@/assets/logos/partner-12-Express-bees.webp";
import ekart from "@/assets/logos/partner-13-ekblueLogo.5d833b02742a5342bffd.webp";
import clickpost from "@/assets/logos/partner-14-ClickPost.webp";
import shipsy from "@/assets/logos/partner-15-logo-dark.webp";

/** Pharma / platform / insurer side — the brief puts pharma first. */
export const CLIENT_LOGOS = [
  { name: "Tata 1mg", src: oneMg, scale: 1 },
  { name: "MediBuddy", src: mediBuddy, scale: 1 },
  { name: "PlatinumRx", src: platinumRx, scale: 0.92 },
  { name: "Visit Health", src: visitHealth, scale: 0.95 },
  { name: "EkinCare", src: ekinCare, scale: 0.9 },
  { name: "ICICI Lombard", src: icici, scale: 1.05 },
  { name: "Niva Bupa", src: niva, scale: 0.95 },
  { name: "Circle Health", src: circleHealth, scale: 0.95 },
  { name: "Netmeds", src: netmeds, scale: 0.95 },
  { name: "HealthKart", src: healthKart, scale: 0.95 },
  { name: "Wellversed", src: wellversed, scale: 0.92 },
  { name: "Kimirica", src: kimirica, scale: 0.9 },
  { name: "The Element", src: theElement, scale: 0.88 },
  { name: "Pure Aura", src: pureAura, scale: 0.9 },
  { name: "Calmosis", src: calmosis, scale: 0.9 },
  { name: "Furball Stories", src: furball, scale: 0.95 },
  { name: "Moe Puppy", src: moePuppy, scale: 0.9 },
  { name: "Pawllo", src: pawllo, scale: 0.9 },
  { name: "Secret Alchemist", src: secretAlchemist, scale: 0.88 },
  { name: "Olfa Originals", src: olfa, scale: 0.88 },
  { name: "Barsana Magic", src: barsana, scale: 0.9 },
];

/** Order, fulfilment and delivery systems DocPharma plugs into. */
export const INTEGRATION_LOGOS = [
  { name: "Unicommerce", src: unicommerce, scale: 1 },
  { name: "Vinculum", src: vinculum, scale: 0.95 },
  { name: "Shopify", src: shopify, scale: 0.95 },
  { name: "EasyEcom", src: easyecom, scale: 0.95 },
  { name: "ClickPost", src: clickpost, scale: 0.92 },
  { name: "Shipsy", src: shipsy, scale: 0.9 },
  { name: "Delhivery", src: delhivery, scale: 1 },
  { name: "Blue Dart", src: blueDart, scale: 0.95 },
  { name: "ElasticRun", src: elasticRun, scale: 0.95 },
  { name: "Shiprocket", src: shiprocket, scale: 0.95 },
  { name: "Pidge", src: pidge, scale: 0.88 },
  { name: "Amazon Shipping", src: amazonShipping, scale: 1 },
  { name: "XpressBees", src: xpressbees, scale: 0.95 },
  { name: "Ekart", src: ekart, scale: 0.92 },
];
