import { apiClient } from "./client";
import { BUSINESS_TYPES } from "@/data/contact";

/** Wrapper-service endpoints. */
export const API_ROUTES = {
  // POST /send-mail/ { name, email, describe, subject, message } — the first
  // five are required server-side; the rest are passed through to the template.
  contact: "/send-mail/",
};

function businessLabel(value) {
  return BUSINESS_TYPES.find((b) => b.value === value)?.label || "Other";
}

/** Partner enquiry from the Partner With Us page. */
export function submitContactEnquiry(form) {
  const label = businessLabel(form.businessType);
  const company = String(form.company || "").trim();

  return apiClient.post(API_ROUTES.contact, {
    name: form.name.trim(),
    email: form.email.trim(),
    describe: label,
    subject: `Partner enquiry — ${label}${company ? ` (${company})` : ""}`,
    message: String(form.message || "").trim() || "No additional details provided.",
    company,
    phone: String(form.phone || "").trim(),
    monthlyOrders: form.monthlyOrders,
    cities: String(form.cities || "").trim(),
  });
}
