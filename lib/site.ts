export const siteConfig = {
  name: "DataDenkt",
  description:
    "DataDenkt helpt organisaties sneller groeien met data-gedreven content, realtime inzichten en automatiseringen op schaal.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://datadenkt.nl",
  ogImage: "/images/og-default.svg",
  email: "hello@datadenkt.nl",
  phone: "+31 20 123 4567",
  location: "Amsterdam, Nederland",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Automatiseringen", href: "/automatiseringen" },
];
