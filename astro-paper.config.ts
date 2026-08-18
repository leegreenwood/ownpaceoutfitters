import { defineAstroPaperConfig } from "./src/types/config";

// TODO: swap in the confirmed .co.uk/.com domain once the Companies House
// and social-handle checks on the Trello board are resolved.
export default defineAstroPaperConfig({
  site: {
    url: "https://ownpaceoutfitters.co.uk/",
    title: "Own Pace Outfitters",
    description:
      "Duke of Edinburgh's Award expedition delivery — structured, patient outdoor coaching at the young person's own pace. A trading arm of Independent Youth Volunteer Support (IYVS).",
    author: "Lee Greenwood",
    profile: "https://www.linkedin.com/in/leegreenwood",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Europe/London",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "linkedin", url: "https://www.linkedin.com/in/leegreenwood" },
    // TODO: replace with the OPO contact address once confirmed
    { name: "mail", url: "mailto:hello@ownpaceoutfitters.co.uk" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});