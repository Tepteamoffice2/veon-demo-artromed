// Facts of the clinic for the demo homepage. Source: veon/client.json (ids in comments). Nothing here is invented.

export interface Phone { display: string; short: string; href: string; }

// company.contacts.phones — one number on three operators (W-F011)
export const phones: Phone[] = [
  { display: "+38 098 533 72 72", short: "098 533 72 72", href: "tel:+380985337272" },
  { display: "+38 050 533 72 72", short: "050 533 72 72", href: "tel:+380505337272" },
  { display: "+38 093 533 72 72", short: "093 533 72 72", href: "tel:+380935337272" },
];

export const mainPhone: Phone = phones[0]!;

// W-F011
export const hours = { short: "Пн–Сб 08:00–20:00", full: "Пн–Сб 08:00–20:00, неділя — вихідний" };

// company.contacts.emails
export const email = { display: "info@artromed.od.ua", href: "mailto:info@artromed.od.ua" };

// company.contacts.addresses
export const address = {
  street: "вул. Балківська, 120/1",
  full: "м. Одеса, вул. Балківська, 120/1",
  lat: 46.4636913,
  lng: 30.7061367,
  route: "https://www.google.com/maps/dir/?api=1&destination=46.4636913,30.7061367",
};

// company.legal_name, company.name
export const legalName = "ТОВ «Медичний центр Артромед»";
export const brandName = "Медичний центр Artromed";

// socials[] (all confirmed), URLs verbatim
export const socials = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61551083662641" },
  { name: "Instagram", href: "https://www.instagram.com/artromed_odessa" },
  { name: "YouTube", href: "https://www.youtube.com/@artromed_odesa" },
  { name: "TikTok", href: "https://www.tiktok.com/@artromed_odesa" },
];

// Anchors of the homepage (ux/demo-home.md §6)
export const nav = [
  { href: "#directions", label: "Напрямки" },
  { href: "#joint-care", label: "Лікування суглобів" },
  { href: "#inpatient", label: "Стаціонар" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#contacts", label: "Контакти" },
];

export const futureNote = "Розділ у розробці";
