// src/data/services.js
export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const services = [
  {
    title: "Subscription Management Platform",
    subtitle:
      "Enable fans to interact with clubs and participate in decision-making.",
    short_description:
      "Subscription Management Platform — Unlock new revenue streams and build lasting relationships with your audience through our comprehensive Subscription Management Platform—designed specifically for sports brands.",
    description: `Unlock new revenue streams and build lasting relationships with your audience through our comprehensive Subscription Management Platform—designed specifically for sports brands.
In today’s competitive sports landscape, creating consistent and sustainable revenue is crucial. Our platform empowers sports brands to effectively manage and monetize their subscriber base by providing seamless subscription tools, flexible pricing models, and valuable customer engagement features. Whether you're a sports team, influencer, or media outlet, our platform is the ultimate solution for scaling your subscription-based offerings.
Our system streamlines every step of the subscription process— from easy onboarding to automated billing, renewal reminders, and customizable plans. By providing fans with exclusive content, perks, and rewards, you not only keep them engaged but also create a loyal, long-term fanbase. Build your brand's community and foster deeper connections, all while increasing revenue without the hassle of managing complex subscription workflows.

Key Features Include:
• Customizable Subscription Plans: Create tailored plans with unique benefits that resonate with your audience—whether it's access to behind-the-scenes content, merchandise, or VIP experiences.
• Automated Billing & Payments: Save time and reduce errors with automatic recurring payments, invoicing, and payment reminders.
• Comprehensive Analytics: Get detailed insights into your subscriber behaviors and preferences to help you refine your offerings and maximize revenue.
• Seamless Integration: Easily integrate the platform with your existing website, CRM, and other tools, ensuring a smooth user experience.
• Enhanced Customer Engagement: Build stronger relationships with your subscribers using personalized messaging, loyalty rewards, and special offers.

Our platform is not just about subscriptions; it’s about building stronger, more meaningful connections with your audience. Whether you're launching a new product line, organizing exclusive events, or releasing special content, we’re here to help you create an experience that fans will love and subscribe to.
Let us handle the complexities of subscription management so you can focus on growing your brand, improving fan engagement, and maximizing your revenue.`,
  },
  {
    title: "Match Streaming with Augmented Reality",
    subtitle:
      "Watch matches through player cameras for a more immersive experience.",
    short_description:
      "Bring fans closer to the action with multi-angle, AR-enhanced live streaming.",
    description:
      "Demo description for Match Streaming with Augmented Reality. Replace with your real copy.",
  },
  {
    title: "Digital Currency Management",
    subtitle:
      "A fan-exclusive digital currency to encourage platform engagement.",
    short_description:
      "Launch and manage your fan token or digital wallet to reward engagement.",
    description:
      "Demo description for Digital Currency Management. Replace with your real copy.",
  },
  {
    title: "Sports Data Analytics",
    subtitle:
      "Support clubs with precise strategic decisions using AI-powered insights.",
    short_description:
      "AI-driven dashboards and predictive analytics to elevate team and business performance.",
    description:
      "Demo description for Sports Data Analytics. Replace with your real copy.",
  },
  {
    title: "Sports Cyber Security",
    subtitle:
      "Protect club platforms from cyber attacks and ensure data safety.",
    short_description:
      "Modern protection for data, payments, and content—tailored to sports platforms.",
    description:
      "Demo description for Sports Cyber Security. Replace with your real copy.",
  },
  {
    title: "Support Services",
    subtitle: "Annual maintenance and support services.",
    short_description:
      "Keep your systems secure, up-to-date, and high-performing year-round.",
    description:
      "Demo description for Support Services. Replace with your real copy.",
  },
].map((s) => ({ ...s, slug: slugify(s.title) }));
