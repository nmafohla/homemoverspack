export interface VideoGuide {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export const VIDEO_GUIDES: VideoGuide[] = [
  {
    id: "moving-hacks",
    youtubeId: "BPApurMqh4M",
    title: "Top Moving Day Hacks & Box Labelling System",
    category: "Packing & Logistics",
    duration: "4:20",
    description:
      "Practical packing tips, colour-coded labelling by room, and protecting fragile valuables.",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "home-organisation",
    youtubeId: "98EgHy7cgeQ",
    title: "Smart Unpacking & Room-By-Room Organisation",
    category: "Home Setup",
    duration: "5:45",
    description:
      "How to efficiently unpack and arrange your kitchen, bedroom, and living spaces within 48 hours.",
    thumbnail:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "boiler-pressure",
    youtubeId: "I3HgvV2mIqY",
    title: "How to Check and Top Up Boiler Pressure",
    category: "Utilities & Heating",
    duration: "3:10",
    description:
      "Simple step-by-step guide to repressurising a combi boiler if your radiators are cold.",
    thumbnail:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "smart-home",
    youtubeId: "9u9kqhHC6Ok",
    title: "Setting Up Your Smart Home & Connected Tech",
    category: "Technology",
    duration: "6:15",
    description:
      "Connecting video doorbells, smart thermostats, and mesh WiFi nodes across your whole property.",
    thumbnail:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "kitchen-design",
    youtubeId: "rMMl64VUZsI",
    title: "Kitchen Planning & Storage Space Optimization",
    category: "Interior Design",
    duration: "7:05",
    description:
      "Clever pantry storage ideas, worktop zones, and styling modern kitchen countertops.",
    thumbnail:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "address-updates",
    youtubeId: "LHwfUKrV-xk",
    title: "Moving House Address Update Masterclass",
    category: "Admin & Legal",
    duration: "3:50",
    description:
      "Who you need to tell when moving home: DVLA, banks, HMRC, electoral roll, and insurance.",
    thumbnail:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
  },
];
