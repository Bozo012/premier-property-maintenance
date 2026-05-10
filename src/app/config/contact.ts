export const CONTACT_PHONE_DISPLAY = "(859) 912-0526";
export const CONTACT_PHONE_DIGITS = "8599120526";
export const CONTACT_PHONE_E164 = "+18599120526";

export function buildPhoneHref(phoneE164: string): string {
  return `tel:${phoneE164}`;
}

export function buildSmsHref(phoneE164: string): string {
  return `sms:${phoneE164}`;
}

export const CONTACT_PHONE_HREF = buildPhoneHref(CONTACT_PHONE_E164);
export const CONTACT_SMS_HREF = buildSmsHref(CONTACT_PHONE_E164);
