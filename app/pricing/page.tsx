"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Video,
  Building,
  Users,
  Zap,
  CheckCircle2,
  Sliders,
  DollarSign,
  Plus,
  Minus,
  Sparkles,
  HelpCircle,
  FileText,
  ChevronDown,
  ArrowRight,
  Package,
  MessageCircle,
  CalendarCheck,
  Send
} from "lucide-react";
import MinimalNav from "@/components/MinimalNav";
import Link from "next/link";

// Type definitions for packages
interface PackageTier {
  id: string;
  name: string;
  price: string;
  minPrice: number;
  maxPrice: number;
  includes: string;
  bestFor: string;
  deliverables: string[];
  recommended?: boolean;
}

interface AddOnOption {
  id: string;
  name: string;
  price: string;
  cost: number;
  description: string;
}

export default function PricingPage() {
  const [activeNiche, setActiveNiche] = useState<"events" | "commercial" | "ecommerce">("events");
  const [eventTab, setEventTab] = useState<"solo" | "dual">("dual");
  const [commercialTab, setCommercialTab] = useState<"one-time" | "retainers">("one-time");
  const [ecommerceTab, setEcommerceTab] = useState<"one-time" | "retainers" | "ai-hybrid">("one-time");
  const [selectedTier, setSelectedTier] = useState<string>("events-tier3");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Event Tiers - Solo Coverage (1 Operator)
  const eventSoloTiers: PackageTier[] = [
    {
      id: "events-tier0",
      name: "Tier 0 — Social Session",
      price: "$200 Flat Rate",
      minPrice: 200,
      maxPrice: 200,
      includes: "Photo OR video, 1 operator, light session setup",
      bestFor: "Quick social updates, headshots, or short event highlights",
      deliverables: ["Strict 1-hour session maximum", "Choice of: 10–15 edited photos OR 1 short-form highlight video (30–60s) + 5 photo stills", "48-hour turnaround", "1 revision round", "High-res digital delivery"]
    },
    {
      id: "events-tier1",
      name: "Tier 1 — Solo Photo",
      price: "$400 – $600",
      minPrice: 400,
      maxPrice: 600,
      includes: "Dedicated photo coverage, 1 operator, professional photography setup",
      bestFor: "Intimate gatherings, portraits, and events where high-end photography is the priority",
      deliverables: ["Full edited photo gallery", "Professional color correction & retouching", "High-res digital delivery", "Commercial usage rights", "2 revision rounds"]
    },
    {
      id: "events-tier2",
      name: "Tier 2 — Solo Video",
      price: "$500 – $700",
      minPrice: 500,
      maxPrice: 700,
      includes: "Dedicated video coverage with professional cinematic setup. Includes social-ready content highlights.",
      bestFor: "Ceremonies, performances, and events wanting immediate, social-ready cinematic video cutdowns",
      deliverables: [
        "Single-angle edited video coverage (full event)",
        "DaVinci Resolve edit & color grade",
        "Audio mix with ambient/lav mic",
        "Final export in 4K/1080p",
        "3 vertical social cutdowns (15-30 sec, Reels/TikTok ready)",
        "5 edited highlight photos (social-ready, color graded)",
        "Multi-platform formatting (YouTube, Reels, TikTok, Instagram feed)",
        "Commercial usage rights",
        "2 revision rounds"
      ]
    }
  ];

  // Event Tiers - Dual Coverage (2 Operators)
  const eventDualTiers: PackageTier[] = [
    {
      id: "events-tier3",
      name: "Tier 3 — Dual Coverage",
      price: "$800 – $1,200",
      minPrice: 800,
      maxPrice: 1200,
      includes: "Photo + Video, 2 operators, multi-angle coverage",
      bestFor: "Medium events, ceremonies, receptions — anything with simultaneous key moments",
      deliverables: [
        "Full edited photo gallery (retouched)",
        "Branded Watermark Gallery Images",
        "Multi-angle edited video wrap-up",
        "B-roll package from 2nd angle",
        "Professional audio syncing & design",
        "5 vertical social cutdowns (from both angles, different perspectives)",
        "10 edited highlight photos",
        "Behind-the-scenes clip (30-60 sec, casual, for Stories)",
        "Multi-platform formatting",
        "2 revision rounds"
      ],
      recommended: true
    },
    {
      id: "events-tier4",
      name: "Tier 4 — Premium Coverage",
      price: "$1,200 – $2,000",
      minPrice: 1200,
      maxPrice: 2000,
      includes: "2 operators, photo + video, multi-location / complex event setup",
      bestFor: "Weddings, quinceañeras, corporate events, festivals, multi-location setups",
      deliverables: [
        "Full photo sets from both shooters (retouched)",
        "Branded Watermark Gallery Images",
        "Cinematic multi-angle video edit (4K)",
        "Full secondary location coverage",
        "8 vertical social cutdowns",
        "15 edited highlight photos",
        "Behind-the-scenes mini-doc (2-3 min)",
        "Social media content kit (ready-to-post Reels + photos + caption suggestions)",
        "Multi-platform formatting",
        "Ad-ready versions (3 Reels formatted for paid ads)",
        "Cinematic drone/aerial footage (if available)",
        "Same-day or next-day highlight reel",
        "Raw footage delivery",
        "Custom branded intro/outro for video",
        "3 revision rounds"
      ]
    }
  ];

  // Commercial & Branding - One-Time Tiers (including Content Day Option A)
  const commercialOneTimeTiers: PackageTier[] = [
    {
      id: "commercial-ot1",
      name: "Tier 1 — Content Day",
      price: "$250 – $350",
      minPrice: 250,
      maxPrice: 350,
      includes: "1-2 hours on-location, rapid setup, high-impact social assets",
      bestFor: "Businesses wanting a low-friction entry point to test our content quality",
      deliverables: [
        "1-2 hours shoot time at your business",
        "2 edited Reels/TikToks (vertical format, color-graded)",
        "5 edited high-res photos (Capture One processed)",
        "5-7 business days turnaround",
        "No long-term commitment"
      ]
    },
    {
      id: "commercial-ot2",
      name: "Tier 2 — Brand Story Mini-Doc",
      price: "$800 – $1,200",
      minPrice: 800,
      maxPrice: 1200,
      includes: "Solo operator, structured shoot (up to 2 hours), cinematic video edit, professional photo retouching",
      bestFor: "Business 'About Us' pages, grand openings, new menu/seasonal launches, property showcases",
      deliverables: ["1 cinematic brand video (60-90 seconds, 4K)", "20 edited high-res photos", "3 vertical social cutdowns derived from main video", "7-10 day turnaround", "2 revision rounds", "Commercial usage rights"],
      recommended: true
    },
    {
      id: "commercial-tier3",
      name: "Tier 3 — Full Commercial Campaign",
      price: "$1,500 – $2,500+",
      minPrice: 1500,
      maxPrice: 2500,
      includes: "1-2 operators, half/full-day shoot, multi-location or complex lighting, comprehensive post-production",
      bestFor: "Established brands launching a new location, boutique hotels, multi-property real estate portfolios",
      deliverables: ["1-2 cinematic brand videos (up to 2 mins)", "40+ edited high-res photos (web + print-ready)", "5 vertical social cutdowns", "Behind-the-scenes content package", "14-21 day turnaround", "3 revision rounds", "Commercial usage rights"]
    }
  ];

  // Commercial & Branding - Monthly Retainer Tiers
  const commercialRetainerTiers: PackageTier[] = [
    {
      id: "commercial-ret1",
      name: "Starter — Social Presence Builder",
      price: "$500 / month",
      minPrice: 500,
      maxPrice: 500,
      includes: "1 half-day shoot per month, regular vertical content updates",
      bestFor: "Solo service providers, small cafes, and new businesses building their first social presence",
      deliverables: [
        "1 half-day shoot per month (2-3 hours on-location)",
        "3 Reels/TikToks (15-30s, cinematic edit)",
        "10 edited photos",
        "3 caption drafts (ready to post)",
        "5-7 business days turnaround",
        "Month-to-month, cancel anytime"
      ]
    },
    {
      id: "commercial-ret2",
      name: "Growth — Content Engine",
      price: "$1,000 / month",
      minPrice: 1000,
      maxPrice: 1000,
      includes: "1 half-day shoot per month, comprehensive social media presence",
      bestFor: "Restaurants, boutiques, real estate agents, and local brands ready to grow consistently",
      deliverables: [
        "1 half-day shoot per month (3-4 hours on-location)",
        "5 Reels/TikToks (15-60s, cinematic edit)",
        "15 edited photos",
        "5 caption drafts (ready to post)",
        "Instagram + TikTok + Facebook optimization",
        "3-month minimum commitment",
      ],
      recommended: true
    },
    {
      id: "commercial-ret3",
      name: "Premium — Full Social Video",
      price: "$1,800 / month",
      minPrice: 1800,
      maxPrice: 1800,
      includes: "2 half-day shoots per month, ultimate local market video domination",
      bestFor: "Established local businesses, multi-location brands, and clients running social ads",
      deliverables: [
        "2 half-day shoots per month (6-8 hours total)",
        "8 Reels/TikToks (cinematic edit)",
        "25 edited photos",
        "1 cinematic brand video (60-90s, 4K)",
        "3 Reels formatted specifically for paid ads (hook variations)",
        "8 caption drafts (ready to post)",
        "3-5 business days turnaround",
        "3-month minimum commitment"
      ]
    }
  ];

  // Ecommerce Tiers - One-Time Projects (Product Launches & Website Refresh)
  const ecommerceOneTimeTiers: PackageTier[] = [
    {
      id: "ecommerce-ot1",
      name: "Tier 1 — Listing Essentials",
      price: "$300 – $500",
      minPrice: 300,
      maxPrice: 500,
      includes: "Clean white studio listing shots, styled group layouts, infographics",
      bestFor: "New brands launching on Shopify, Amazon, or Etsy needing professional storefront listings",
      deliverables: [
        "5 styled white-background studio shots (clean listing images)",
        "3 flat-lay / stylized group product layouts",
        "2 custom infographics (feature callouts or dimension overlays)",
        "Capture One color-accurate processing & retouching (dust removal)",
        "Commercial usage rights"
      ]
    },
    {
      id: "ecommerce-ot2",
      name: "Tier 2 — Brand Launch Campaign",
      price: "$800 – $1,200",
      minPrice: 800,
      maxPrice: 1200,
      includes: "Lifestyle product shoots, website background header loop, social-ready videos",
      bestFor: "New collection drops, storefront updates, and complete product launches",
      deliverables: [
        "15 high-res lifestyle product photos (on-location or styled studio set)",
        "5 styled studio photos (white/colored backgrounds)",
        "1 cinematic website header video (15-30s seamless loop, 4K, no audio)",
        "3 social-ready vertical videos (ASMR texture, unboxing, or product-in-use)",
        "Capture One + DaVinci Resolve color-graded selects",
        "Commercial usage rights"
      ],
      recommended: true
    },
    {
      id: "ecommerce-ot3",
      name: "Tier 3 — Full Ecom Ad Creative Suite",
      price: "$1,500 – $2,500+",
      minPrice: 1500,
      maxPrice: 2500,
      includes: "Large product/lifestyle asset library, vertical video ads, hook tests, promo video",
      bestFor: "Established brands running paid advertising (Meta/TikTok ads) looking to maximize CTR",
      deliverables: [
        "30 lifestyle & styled studio product photos",
        "5 vertical ad-ready video creatives (with text hook overlays & CTA cards)",
        "3 variations of main hooks (different first 3 seconds to test CTR)",
        "1 master product demonstration video (60s, 4K, voiceover optimized)",
        "Full commercial/distribution rights"
      ]
    }
  ];

  // Ecommerce Tiers - Monthly Retainers (Ongoing drops & ad creative refresh)
  const ecommerceRetainerTiers: PackageTier[] = [
    {
      id: "ecommerce-ret1",
      name: "Starter — Monthly Drop",
      price: "$600 / month",
      minPrice: 600,
      maxPrice: 600,
      includes: "1 styled shooting block per month, steady stream of social assets",
      bestFor: "Brands launching 1-2 new SKUs monthly or needing consistent organic social updates",
      deliverables: [
        "1 styled shooting block per month (2 hours)",
        "10 edited product/lifestyle photos",
        "2 short-form vertical videos (product spotlight / unboxing)",
        "Month-to-month, cancel anytime"
      ]
    },
    {
      id: "ecommerce-ret2",
      name: "Growth — Ecom Creative Engine",
      price: "$1,200 / month",
      minPrice: 1200,
      maxPrice: 1200,
      includes: "1 half-day shoot per month, ongoing ad creative refresh against ad fatigue",
      bestFor: "Brands running paid social ads who need new hooks and fresh asset libraries monthly",
      deliverables: [
        "1 half-day shoot per month (4 hours on-location or custom studio setup)",
        "20 lifestyle and product-in-use photos",
        "5 vertical video ads (with 3 hook variations for ad tests)",
        "High-detail texture macro shots & ASMR audio capturing",
        "3-month minimum commitment"
      ],
      recommended: true
    },
    {
      id: "ecommerce-ret3",
      name: "Scale — High-Volume Studio",
      price: "$2,200 / month",
      minPrice: 2200,
      maxPrice: 2200,
      includes: "2 shoot blocks per month, outsource all social video & ad asset production",
      bestFor: "Active product brands with broad catalogs needing constant refreshes",
      deliverables: [
        "2 shoot blocks per month (full day coverage)",
        "40 lifestyle and studio product photos",
        "10 vertical video ads (formatted for Instagram, TikTok, YouTube Shorts)",
        "1 main lifestyle brand video (60-90s, cinematic, color-graded)",
        "Dedicated prop styling & model scouting assistance",
        "3-month minimum commitment"
      ]
    }
  ];
  // Ecommerce Tiers - AI & Hybrid Production
  const ecommerceAiTiers: PackageTier[] = [
    {
      id: "ecommerce-ai1",
      name: "Tier 1 — AI Background Replacements",
      price: "$250 – $350",
      minPrice: 250,
      maxPrice: 350,
      includes: "Background replacements using generative AI. Client provides or mails product for clean studio cutouts.",
      bestFor: "Brands needing quick social content or looking to test product scenes on a budget",
      deliverables: [
        "10 premium AI lifestyle image generations (high-resolution)",
        "Brand-aligned background aesthetics and prompt engineering",
        "Capture One post-processing for seamless color blend",
        "Commercial usage rights",
        "2 revision rounds on environment styles"
      ]
    },
    {
      id: "ecommerce-ai2",
      name: "Tier 2 — Hybrid Studio + AI Campaign",
      price: "$650 – $950",
      minPrice: 650,
      maxPrice: 950,
      includes: "Physical in-studio shoot for 100% product accuracy, blended with custom generative AI environmental sets.",
      bestFor: "Launch campaigns needing premium settings (marble kitchen, beach, mountain) without high travel/styling costs",
      deliverables: [
        "5 physical studio cutouts (100% detail & color accurate)",
        "25 custom AI lifestyle environmental backgrounds (e.g., luxury marble, water splash, custom settings)",
        "Advanced compositing & lighting matching in Photoshop",
        "PSD source file delivery with layered product masks",
        "Commercial usage & distribution rights",
        "3 revision rounds"
      ],
      recommended: true
    },
    {
      id: "ecommerce-ai3",
      name: "Tier 3 — Hyper-Volume Ad Creative Engine",
      price: "$1,350 – $1,950",
      minPrice: 1350,
      maxPrice: 1950,
      includes: "High-volume asset library and hybrid assets designed to fight ad fatigue across multiple campaigns",
      bestFor: "Active Shopify/Amazon brands seeking continuous fresh visuals and multiple seasonal/holiday drops",
      deliverables: [
        "10 physical studio product cutouts",
        "60 styled AI background placements (multiple environments, seasons, and themes)",
        "3 stop-motion animations (AI-enhanced background loops)",
        "Multi-platform aspect ratios (1:1 feed, 9:16 reels/tiktok, 4:5)",
        "Ad-ready formats and high-impact CTR visual hooks",
        "Full commercial/distribution rights",
        "3 revision rounds"
      ]
    }
  ];

  // Event-specific and Shared Add-ons
  const eventAddOns: AddOnOption[] = [
    { id: "rush", name: "Rush Delivery (48hr)", price: "+$250", cost: 250, description: "Accelerated editing and review queues (guaranteed export under 48 hours)" },
    { id: "weekend", name: "Weekend/After-Hours Shoot", price: "+$200", cost: 200, description: "Book a shoot during weekend days or outside normal working hours" },
    { id: "social-cutdowns", name: "3x Social Cutdowns", price: "+$150", cost: 150, description: "3 additional highly engaging vertical crops (9:16) optimized for TikTok/Reels" },
    { id: "bts", name: "BTS Mini-Documentary", price: "+$300", cost: 300, description: "A cinematic 2-3 minute behind-the-scenes mini-doc for socials/YouTube" },
    { id: "stills", name: "Promo Still Frames", price: "+$150", cost: 150, description: "10-20 professional high-res photos / color-graded stills for release promo" },
    { id: "extended-highlight", name: "Extended Highlight Reel", price: "+$200", cost: 200, description: "Extend the length of your final highlight video wrap-up by 2-3 minutes" },
    { id: "shootday", name: "Additional Shoot Day", price: "+$400", cost: 400, description: "Add a second filming block (up to 4 hours) on a separate date" },
    { id: "dedicated-photo", name: "Dedicated Photo Operator", price: "+$250", cost: 250, description: "Add a dedicated photographer to cover high-res stills during video-only sessions" },
    { id: "dedicated-video", name: "Dedicated Video Operator", price: "+$300", cost: 300, description: "Add a dedicated videographer to capture cinematic video during photo-only sessions" },
    { id: "drone", name: "Cinematic Drone Footage", price: "+$300", cost: 300, description: "Stunning 4K aerial visuals shot by a licensed drone operator" },
    { id: "graphics", name: "Custom Motion Graphics", price: "+$250", cost: 250, description: "Custom intro title card, 3D track animation, or personalized lyric overlays" },
    { id: "voiceover", name: "Professional Voiceover", price: "+$200", cost: 200, description: "Incorporate a studio-recorded voiceover / narration tracks into your video package" },
    { id: "retainer-bridge", name: "Monthly Retainer Bridge", price: "+$400/mo", cost: 400, description: "Lock in ongoing post-event support with a monthly retainer discount" },
    { id: "same-day-highlights", name: "Same-Day Highlight Reel", price: "+$350", cost: 350, description: "Get a rapid-turnaround edited highlight reel delivered on the same night of the event" },
    { id: "multi-angle-recap", name: "Multi-Angle Recap Edit", price: "+$250", cost: 250, description: "A complex multi-camera cut combining different operator perspectives" },
    { id: "raw-footage", name: "Full Raw Footage", price: "+$150", cost: 150, description: "Delivery of all unedited high-res photo files and raw video logs via drive" },
    { id: "second-location", name: "Second Location", price: "+$300", cost: 300, description: "Add coverage at a secondary location during the same scheduled event day" },
    { id: "second-shooter-full", name: "Second Shooter (Full Event)", price: "+$350", cost: 350, description: "Secure a full-day secondary operator to guarantee maximum angle coverage" }
  ];

  // Commercial-specific and Shared Add-ons
  const commercialAddOns: AddOnOption[] = [
    { id: "rush", name: "Rush Delivery (48hr)", price: "+$250", cost: 250, description: "Accelerated editing and review queues (guaranteed export under 48 hours)" },
    { id: "weekend", name: "Weekend/After-Hours Shoot", price: "+$200", cost: 200, description: "Book a shoot during weekend days or outside normal working hours" },
    { id: "social-cutdowns", name: "3x Social Cutdowns", price: "+$150", cost: 150, description: "3 additional highly engaging vertical crops (9:16) optimized for TikTok/Reels" },
    { id: "bts", name: "BTS Mini-Documentary", price: "+$300", cost: 300, description: "A cinematic 2-3 minute behind-the-scenes mini-doc for socials/YouTube" },
    { id: "stills", name: "Promo Still Frames", price: "+$150", cost: 150, description: "10-20 professional high-res photos / color-graded stills for release promo" },
    { id: "extended-highlight", name: "Extended Highlight Reel", price: "+$200", cost: 200, description: "Extend the length of your final highlight video wrap-up by 2-3 minutes" },
    { id: "shootday", name: "Additional Shoot Day", price: "+$400", cost: 400, description: "Add a second filming block (up to 4 hours) on a separate date" },
    { id: "dedicated-photo", name: "Dedicated Photo Operator", price: "+$250", cost: 250, description: "Add a dedicated photographer to cover high-res stills during video-only sessions" },
    { id: "dedicated-video", name: "Dedicated Video Operator", price: "+$300", cost: 300, description: "Add a dedicated videographer to capture cinematic video during photo-only sessions" },
    { id: "drone", name: "Cinematic Drone Footage", price: "+$300", cost: 300, description: "Stunning 4K aerial visuals shot by a licensed drone operator" },
    { id: "graphics", name: "Custom Motion Graphics", price: "+$250", cost: 250, description: "Custom intro title card, 3D track animation, or personalized lyric overlays" },
    { id: "voiceover", name: "Professional Voiceover", price: "+$200", cost: 200, description: "Incorporate a studio-recorded voiceover / narration tracks into your video package" },
    { id: "retainer-bridge", name: "Monthly Retainer Bridge", price: "+$400/mo", cost: 400, description: "Lock in ongoing post-event support with a monthly retainer discount" },
    { id: "reel-same-session", name: "Additional Reel (Same Session)", price: "+$100", cost: 100, description: "Edit one extra short-form vertical Reel using assets captured during the same session" },
    { id: "reel-separate-shoot", name: "Additional Reel (Separate Shoot)", price: "+$200", cost: 200, description: "Add a separate short shooting session to capture content for an additional Reel" },
    { id: "product-menu-shoot", name: "Product/Menu Shoot", price: "+$200", cost: 200, description: "Dedicated macro/product studio setup for high-detail menu or package styling" },
    { id: "gbp-optimization", name: "Google Business Profile Prep", price: "+$100", cost: 100, description: "Metadata tagging, sizing, and optimization of assets for Google Maps/Business reviews" },
    { id: "website-hero-video", name: "Website Hero Video", price: "+$250", cost: 250, description: "A high-impact cinematic loop (no audio) custom formatted for website header backgrounds" },
    { id: "headshot-session", name: "Team Headshot Session", price: "+$150", cost: 150, description: "Add 15 minutes of dedicated corporate headshots for up to 3 team members during the shoot" },
    { id: "testimonial-shoot", name: "Client Testimonial Shoot", price: "+$200", cost: 200, description: "Setup dedicated audio/lighting to record a client interview/testimonial recommendation" }
  ];

  // Ecommerce-specific and Shared Add-ons
  const ecommerceAddOns: AddOnOption[] = [
    { id: "rush", name: "Rush Delivery (48hr)", price: "+$250", cost: 250, description: "Accelerated editing and review queues (guaranteed export under 48 hours)" },
    { id: "weekend", name: "Weekend/After-Hours Shoot", price: "+$200", cost: 200, description: "Book a shoot during weekend days or outside normal working hours" },
    { id: "social-cutdowns", name: "3x Social Cutdowns", price: "+$150", cost: 150, description: "3 additional highly engaging vertical crops (9:16) optimized for TikTok/Reels" },
    { id: "bts", name: "BTS Mini-Documentary", price: "+$300", cost: 300, description: "A cinematic 2-3 minute behind-the-scenes mini-doc for socials/YouTube" },
    { id: "stills", name: "Promo Still Frames", price: "+$150", cost: 150, description: "10-20 professional high-res photos / color-graded stills for release promo" },
    { id: "extended-highlight", name: "Extended Highlight Reel", price: "+$200", cost: 200, description: "Extend the length of your final highlight video wrap-up by 2-3 minutes" },
    { id: "shootday", name: "Additional Shoot Day", price: "+$400", cost: 400, description: "Add a second filming block (up to 4 hours) on a separate date" },
    { id: "dedicated-photo", name: "Dedicated Photo Operator", price: "+$250", cost: 250, description: "Add a dedicated photographer to cover high-res stills during video-only sessions" },
    { id: "dedicated-video", name: "Dedicated Video Operator", price: "+$300", cost: 300, description: "Add a dedicated videographer to capture cinematic video during photo-only sessions" },
    { id: "drone", name: "Cinematic Drone Footage", price: "+$300", cost: 300, description: "Stunning 4K aerial visuals shot by a licensed drone operator" },
    { id: "graphics", name: "Custom Motion Graphics", price: "+$250", cost: 250, description: "Custom intro title card, 3D track animation, or personalized lyric overlays" },
    { id: "voiceover", name: "Professional Voiceover", price: "+$200", cost: 200, description: "Incorporate a studio-recorded voiceover / narration tracks into your video package" },
    { id: "retainer-bridge", name: "Monthly Retainer Bridge", price: "+$400/mo", cost: 400, description: "Lock in ongoing post-event support with a monthly retainer discount" },
    { id: "hand-modeling", name: "Hand Modeling", price: "+$150", cost: 150, description: "Add a model's hands in-frame to demonstrate product texture, scale, application, or styling" },
    { id: "prop-sourcing", name: "Product Styling & Prop Sourcing", price: "+$100", cost: 100, description: "Sourcing specific backdrops, textures (sand, stone blocks), or fresh styling props" },
    { id: "stop-motion", name: "Stop-Motion Product Animation", price: "+$200", cost: 200, description: "Smooth, looping 3-5 second stop-motion video clips showing product packaging or usage" },
    { id: "hook-variations", name: "Stop-Scroll Hook Variations", price: "+$100", cost: 100, description: "3 extra variations of the first 3 seconds of vertical video to test click-through rate" },
    { id: "shipment-logistics", name: "Shipment & Return Logistics", price: "+$50", cost: 50, description: "Receiving, checking, prepping, cleaning, repacking, and shipping back product samples" },
    { id: "ai-model", name: "AI Model Placement", price: "+$150", cost: 150, description: "Overlay product cutouts into framing/hands of photorealistic AI generated models" },
    { id: "ai-refresh", name: "Seasonal AI Environment Refresh", price: "+$250", cost: 250, description: "Regenerate backgrounds in seasonal/holiday themes using existing product assets" }
  ];

  // Filter add-ons dynamically based on selected sub-category
  const getFilteredAddOns = () => {
    if (activeNiche === "events") {
      if (eventTab === "dual") {
        // Dual coverage already has 2 shooters. Remove Second Shooter and Dedicated Photo/Video Operators.
        return eventAddOns.filter(
          (a) => a.id !== "second-shooter-full" && a.id !== "dedicated-photo" && a.id !== "dedicated-video"
        );
      }
      return eventAddOns;
    }
    
    if (activeNiche === "commercial") {
      if (commercialTab === "retainers") {
        // Retainers don't need the retainer bridge, nor dedicated photo/video operator add-ons.
        return commercialAddOns.filter(
          (a) => a.id !== "retainer-bridge" && a.id !== "dedicated-photo" && a.id !== "dedicated-video"
        );
      }
      return commercialAddOns;
    }
    
    // activeNiche === "ecommerce"
    if (ecommerceTab === "retainers") {
      // Physical retainers: no retainer-bridge, and no dedicated photo/video operators.
      return ecommerceAddOns.filter(
        (a) => a.id !== "retainer-bridge" && a.id !== "dedicated-photo" && a.id !== "dedicated-video"
      );
    } else if (ecommerceTab === "ai-hybrid") {
      // AI & Hybrid: remove physical-only set/crew options.
      return ecommerceAddOns.filter(
        (a) =>
          a.id !== "weekend" &&
          a.id !== "shootday" &&
          a.id !== "prop-sourcing" &&
          a.id !== "bts" &&
          a.id !== "drone" &&
          a.id !== "dedicated-photo" &&
          a.id !== "dedicated-video"
      );
    } else {
      // One-time physical: no dedicated photo/video operators.
      return ecommerceAddOns.filter(
        (a) => a.id !== "dedicated-photo" && a.id !== "dedicated-video"
      );
    }
  };

  const addOns = getFilteredAddOns();

  // Toggle add-on selection
  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  // Reset selected tier when niche, event tab, commercial tab, or ecommerce tab changes
  useEffect(() => {
    if (activeNiche === "events") {
      setSelectedTier(eventTab === "solo" ? "events-tier1" : "events-tier3");
    } else if (activeNiche === "commercial") {
      setSelectedTier(commercialTab === "one-time" ? "commercial-ot2" : "commercial-ret2");
    } else {
      setSelectedTier(
        ecommerceTab === "one-time"
          ? "ecommerce-ot2"
          : ecommerceTab === "retainers"
          ? "ecommerce-ret2"
          : "ecommerce-ai2"
      );
    }
    setSelectedAddOns([]);
  }, [activeNiche, eventTab, commercialTab, ecommerceTab]);

  const currentTierData = [
    ...eventSoloTiers, 
    ...eventDualTiers, 
    ...commercialOneTimeTiers, 
    ...commercialRetainerTiers,
    ...ecommerceOneTimeTiers,
    ...ecommerceRetainerTiers,
    ...ecommerceAiTiers
  ].find((t) => t.id === selectedTier);
  const baseMin = currentTierData?.minPrice || 0;
  const baseMax = currentTierData?.maxPrice || 0;
  const addOnsCost = selectedAddOns.reduce((total, id) => {
    const addon = addOns.find((a) => a.id === id);
    return total + (addon ? addon.cost : 0);
  }, 0);

  const finalMin = baseMin + addOnsCost;
  const finalMax = baseMax + addOnsCost;

  // Generate query parameters for the booking page link
  const getBookingUrl = () => {
    if (!currentTierData) return "/book";
    const tierName = currentTierData.name.split(" — ").pop() || currentTierData.name;
    const addonsNames = selectedAddOns
      .map((id) => addOns.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    const rangeText = finalMin === finalMax ? `$${finalMin}` : `$${finalMin} – $${finalMax}`;
    
    return `/book?tier=${encodeURIComponent(tierName)}&addons=${encodeURIComponent(addonsNames || "None")}&estimate=${encodeURIComponent(rangeText)}`;
  };

  // FAQs
  const faqs = [
    {
      q: "Why is shooting photo AND video solo nearly impossible?",
      a: "Constantly switching between photo and video settings on a camera causes you to miss critical, spontaneous moments. To deliver both mediums at a professional level, we bring a second camera operator. This ensures one person is dedicated to capturing photos and the other to motion video, without compromising quality."
    },
    {
      q: "Who handles the editing and creative direction?",
      a: "Our lead creative director handles the creative direction, final color grading, and edit selects. Your video and photo edits are the final product and represent the core brand. Second operators capture supplementary angles and handle file organization, culling, or syncing, but the final aesthetic remains strictly our lead's vision."
    },
    {
      q: "What equipment is used for shoots?",
      a: "For video work, we shoot on professional mirrorless full-frame cameras for cinematic high dynamic range, color-graded natively inside DaVinci Resolve. For photo work, we use professional high-resolution camera bodies with fast prime and zoom lenses, processed in Capture One to deliver high-quality digital files and retouched prints."
    },
    {
      q: "How do revision rounds work?",
      a: "Each package includes a set number of revision rounds. Once a draft is delivered, you can compile a list of feedback (cuts, color adjustments, pacing). We apply these changes and present the final version. Additional revisions outside the package scope can be added for $50/round. A revision round is a single set of consolidated feedback — not per-image or per-clip changes."
    },
    {
      q: "Do you offer custom pricing for unique projects?",
      a: "Absolutely. If you have an album campaign, a multi-day tour, or a unique corporate event, get in touch via the Book Now form. We will hop on a creative planning call and construct a custom budget proposal tailored specifically to your needs."
    }
  ];

  // JSON-LD Schemas for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Professional Photography and Videography",
    "provider": {
      "@type": "LocalBusiness",
      "name": "KITESTUDIOS",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Long Beach",
        "addressRegion": "CA",
        "addressCountry": "US"
      }
    },
    "areaServed": ["Long Beach", "Los Angeles County"],
    "offers": [
      ...eventSoloTiers, 
      ...eventDualTiers, 
      ...commercialOneTimeTiers, 
      ...commercialRetainerTiers,
      ...ecommerceOneTimeTiers,
      ...ecommerceRetainerTiers,
      ...ecommerceAiTiers
    ].map((tier) => ({
      "@type": "Offer",
      "name": tier.name,
      "description": tier.includes,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": tier.minPrice,
        "maxPrice": tier.maxPrice,
        "priceCurrency": "USD"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex flex-col justify-between selection:bg-neutral-200 dark:selection:bg-neutral-800">
      <MinimalNav />

      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] aspect-square rounded-full bg-neutral-100/40 dark:bg-zinc-950/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[40%] aspect-square rounded-full bg-neutral-100/40 dark:bg-zinc-950/10 blur-[120px] pointer-events-none" />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-7xl relative z-10">
        {/* Inject JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        
        {/* Header section */}
        <div className="mb-16 text-center sm:text-left">
          <Link
            href="/"
            className="text-xs font-mono tracking-widest text-zinc-400 hover:text-black dark:hover:text-white uppercase transition-colors"
          >
            ← Back Home
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-light tracking-[0.1em] uppercase mb-4">
                Service Packages
              </h1>
              <p className="text-sm font-mono text-black dark:text-white tracking-wider mb-2">
                Based in Long Beach, Serving LA County.
              </p>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 tracking-widest max-w-xl uppercase leading-relaxed">
                10 Years Behind the Lens. Professional photo and cinematic motion packages designed for impact.
              </p>
            </div>
            
            {/* Niche switcher tabs */}
            <div className="flex flex-wrap bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-sm border border-zinc-200/50 dark:border-zinc-800/50 self-center sm:self-end gap-1">
              <button
                onClick={() => setActiveNiche("events")}
                className={`relative px-3 sm:px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeNiche === "events"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {activeNiche === "events" && (
                  <motion.div
                    layoutId="activeNicheTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Camera className="h-3 w-3" /> Event Production
                </span>
              </button>
              <button
                onClick={() => setActiveNiche("commercial")}
                className={`relative px-3 sm:px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeNiche === "commercial"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {activeNiche === "commercial" && (
                  <motion.div
                    layoutId="activeNicheTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Building className="h-3 w-3" /> Commercial & Branding
                </span>
              </button>
              <button
                onClick={() => setActiveNiche("ecommerce")}
                className={`relative px-3 sm:px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeNiche === "ecommerce"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {activeNiche === "ecommerce" && (
                  <motion.div
                    layoutId="activeNicheTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" /> Ecommerce Production
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Switcher for Commercial Tiers */}
        {activeNiche === "commercial" && (
          <div className="flex justify-center mb-10">
            <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-sm border border-zinc-200/50 dark:border-zinc-800/50 gap-1">
              <button
                onClick={() => setCommercialTab("one-time")}
                className={`relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  commercialTab === "one-time"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {commercialTab === "one-time" && (
                  <motion.div
                    layoutId="activeCommercialTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">One-Time Projects</span>
              </button>
              <button
                onClick={() => setCommercialTab("retainers")}
                className={`relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  commercialTab === "retainers"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {commercialTab === "retainers" && (
                  <motion.div
                    layoutId="activeCommercialTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Monthly Retainers</span>
              </button>
            </div>
          </div>
        )}

        {/* Secondary Switcher for Event Tiers */}
        {activeNiche === "events" && (
          <div className="flex justify-center mb-10">
            <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-sm border border-zinc-200/50 dark:border-zinc-800/50 gap-1">
              <button
                onClick={() => setEventTab("solo")}
                className={`relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  eventTab === "solo"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {eventTab === "solo" && (
                  <motion.div
                    layoutId="activeEventTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Solo Coverage (1 Shooter)</span>
              </button>
              <button
                onClick={() => setEventTab("dual")}
                className={`relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  eventTab === "dual"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {eventTab === "dual" && (
                  <motion.div
                    layoutId="activeEventTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Dual Coverage (2 Shooters)</span>
              </button>
            </div>
          </div>
        )}

        {/* Secondary Switcher for Ecommerce Tiers */}
        {activeNiche === "ecommerce" && (
          <div className="flex justify-center mb-10">
            <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-sm border border-zinc-200/50 dark:border-zinc-800/50 gap-1">
              <button
                onClick={() => setEcommerceTab("one-time")}
                className={`relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  ecommerceTab === "one-time"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {ecommerceTab === "one-time" && (
                  <motion.div
                    layoutId="activeEcommerceTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">One-Time Projects</span>
              </button>
              <button
                onClick={() => setEcommerceTab("retainers")}
                className={`relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  ecommerceTab === "retainers"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {ecommerceTab === "retainers" && (
                  <motion.div
                    layoutId="activeEcommerceTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Monthly Retainers</span>
              </button>
              <button
                onClick={() => setEcommerceTab("ai-hybrid")}
                className={`relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  ecommerceTab === "ai-hybrid"
                    ? "text-black dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {ecommerceTab === "ai-hybrid" && (
                  <motion.div
                    layoutId="activeEcommerceTab"
                    className="absolute inset-0 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">AI & Hybrid</span>
              </button>
            </div>
          </div>
        )}

        {/* Niche specific packaging grids */}
        <div className="mb-20">
          <h2 className="sr-only">Pricing Tiers</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNiche === "events" ? `${activeNiche}-${eventTab}` : activeNiche === "commercial" ? `${activeNiche}-${commercialTab}` : `${activeNiche}-${ecommerceTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 justify-center ${activeNiche === "events" && eventTab === "dual" ? "lg:grid-cols-2 max-w-4xl" : "lg:grid-cols-3 max-w-6xl"} mx-auto`}
            >
              {(activeNiche === "events"
                ? (eventTab === "solo" ? eventSoloTiers : eventDualTiers)
                : activeNiche === "commercial"
                ? (commercialTab === "one-time" ? commercialOneTimeTiers : commercialRetainerTiers)
                : (ecommerceTab === "one-time" ? ecommerceOneTimeTiers : ecommerceTab === "retainers" ? ecommerceRetainerTiers : ecommerceAiTiers)
              ).map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`group relative flex flex-col justify-between p-6 border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-lg scale-[1.01]"
                        : "bg-white dark:bg-black hover:bg-neutral-50/50 dark:hover:bg-zinc-950/30 border-neutral-100 dark:border-zinc-900/60 hover:border-zinc-400 dark:hover:border-zinc-650"
                    }`}
                  >
                    {/* Recommended Banner */}
                    {tier.recommended && (
                      <span className={`absolute -top-3 left-4 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase font-bold rounded-sm border flex items-center gap-1 ${
                        isSelected 
                          ? "bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white border-zinc-350 dark:border-zinc-700" 
                          : "bg-black text-white dark:bg-white dark:text-black border-neutral-200 dark:border-zinc-800"
                      }`}>
                        ★ MOST POPULAR
                      </span>
                    )}

                    <div>
                      {/* Tier Name */}
                      <span className={`block text-xs font-mono tracking-widest uppercase mb-1.5 ${
                        isSelected ? "text-neutral-450 dark:text-neutral-500" : "text-neutral-500"
                      }`}>
                        {activeNiche === "events"
                          ? (eventTab === "solo" ? "SOLO COVERAGE" : "DUAL COVERAGE")
                          : activeNiche === "commercial"
                          ? (commercialTab === "one-time" ? "COMMERCIAL PROJECT" : "MONTHLY RETAINER")
                          : (ecommerceTab === "one-time" ? "PRODUCT CAMPAIGN" : ecommerceTab === "retainers" ? "ECOMMERCE RETAINER" : "AI & HYBRID CAMPAIGN")}
                      </span>
                      <h3 className="text-lg font-light tracking-wide uppercase mb-3">
                        {tier.name.split(" — ").pop() || tier.name}
                      </h3>
                      
                      {/* Price tag */}
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-6">
                        {tier.price.includes(" / ") ? (
                          tier.price.split(" / ").map((p, idx) => (
                            <div key={idx} className="flex items-baseline gap-1">
                              {idx > 0 && (
                                <span className={`text-xs font-mono uppercase tracking-widest mr-1.5 ${
                                  isSelected ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-550 dark:text-zinc-400"
                                }`}>
                                  /
                                </span>
                              )}
                              <span className="text-2xl font-light font-mono tracking-tighter">
                                {p.split(" ")[0]}
                              </span>
                              <span className={`text-[10px] font-mono uppercase tracking-wider ${
                                isSelected ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-550 dark:text-zinc-400"
                              }`}>
                                {p.split(" ").slice(1).join(" ")}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-light font-mono tracking-tighter">
                              {tier.price.split(" ")[0]}
                            </span>
                            <span className={`text-xs font-mono uppercase tracking-widest ${
                              isSelected ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-550 dark:text-zinc-400"
                            }`}>
                              {tier.price.split(" ").slice(1).join(" ")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Small descriptions */}
                      <p className={`text-sm font-light leading-relaxed mb-6 border-b pb-6 ${
                        isSelected ? "border-neutral-800 dark:border-neutral-200 text-neutral-300 dark:text-neutral-750" : "border-neutral-100 dark:border-zinc-900/60 text-zinc-500"
                      }`}>
                        {tier.includes}
                      </p>

                      {/* Deliverables list */}
                      <div className="space-y-3 mb-8">
                        <span className={`block text-xs font-mono tracking-widest uppercase ${
                          isSelected ? "text-neutral-400" : "text-neutral-500"
                        }`}>
                          DELIVERABLES:
                        </span>
                        <ul className="space-y-2">
                          {tier.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed font-light">
                              <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                                isSelected ? "text-white dark:text-black" : "text-zinc-400 dark:text-zinc-600"
                              }`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Selector Status */}
                    <div className="pt-4 mt-auto">
                      <div className={`w-full py-2 border text-center text-xs font-mono tracking-widest uppercase rounded-sm transition-colors duration-300 ${
                        isSelected
                          ? "bg-white text-black dark:bg-black dark:text-white border-white dark:border-black font-bold"
                          : "bg-transparent text-zinc-500 hover:text-black dark:hover:text-white border-zinc-200 dark:border-zinc-850"
                      }`}>
                        {isSelected ? "[ SELECTED ]" : "SELECT TIER"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ad Fatigue Insight Note (for Ecommerce) */}
        {activeNiche === "ecommerce" && (
          <div className="mt-8 mb-6 text-center">
            <p className="text-xs font-mono tracking-widest text-[#ffff00] dark:text-[#ffff00] max-w-3xl mx-auto leading-relaxed border border-dashed border-[#ffff00]/30 p-4 rounded-sm bg-[#ffff00]/5 uppercase">
              ★ [ INSIGHT ] Ad fatigue is the #1 killer of ecommerce margins. Our Growth and Scale retainers are structured specifically to deliver fresh video hooks, product textures, and lifestyle variations every 30 days so your ad campaigns stay highly profitable.
            </p>
          </div>
        )}

        {/* Revision Policy Note */}
        <div className="mt-8 mb-16 text-center">
          <p className="text-xs font-mono tracking-widest text-zinc-555 dark:text-zinc-450 max-w-3xl mx-auto leading-relaxed border border-dashed border-zinc-200 dark:border-zinc-800/80 p-4 rounded-sm">
            [ POLICY ] 2 revision rounds included. Additional revisions at $50/round. A &apos;revision round&apos; is a single set of consolidated feedback — not per-image or per-clip changes.
          </p>
        </div>

        {/* Interactive Price Estimator Section (WOW Element) */}
        <div className="mb-20 border border-black dark:border-white p-8 relative overflow-hidden bg-neutral-50/30 dark:bg-zinc-950/5">
          <div className="absolute top-0 right-0 p-4 font-mono text-xs text-zinc-400 tracking-widest uppercase select-none">
            [ ESTIMATOR v1.0 ]
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">
                CUSTOM PROJECT CALCULATOR
              </span>
              <h2 className="text-3xl font-light tracking-wide uppercase mt-2 mb-6">
                Estimate Your Production
              </h2>
              
              {/* Selected Base tier summary info */}
              <div className="p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase text-zinc-550 dark:text-zinc-450 block mb-1">
                    SELECTED PACKAGE
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wide text-black dark:text-white">
                    {currentTierData?.name || "None Selected"}
                  </span>
                </div>
                <div className="font-mono text-sm font-semibold px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black uppercase tracking-wider rounded-sm">
                  {currentTierData?.price}
                </div>
              </div>

              {/* Addons toggles */}
              <div className="space-y-4">
                <span className="block text-xs font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-555">
                  Select Project Add-ons:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addOns.map((addon) => {
                    const isChecked = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-3.5 border transition-all duration-200 cursor-pointer flex justify-between items-start gap-4 rounded-sm ${
                          isChecked
                            ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm"
                            : "bg-white dark:bg-black border-zinc-100 dark:border-zinc-900/80 hover:border-zinc-400 dark:hover:border-zinc-650"
                        }`}
                      >
                        <div>
                          <span className="block text-sm font-semibold uppercase tracking-wider">
                            {addon.name}
                          </span>
                          <span className={`block text-xs mt-0.5 leading-relaxed font-light ${
                            isChecked ? "text-neutral-300 dark:text-neutral-600" : "text-zinc-400"
                          }`}>
                            {addon.description}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-semibold shrink-0">
                          {addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Total display panel */}
            <div className="lg:col-span-5 h-full flex flex-col justify-between p-6 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white h-full">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-2">
                  ESTIMATED INVESTMENT RANGE
                </span>
                
                {/* Simulated price range gauge */}
                <div className="mb-8 mt-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-mono tracking-widest uppercase opacity-75">
                      Total Range
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">
                      Est. Range
                    </span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-mono tracking-tighter flex items-center font-bold">
                    ${finalMin}
                    {finalMin !== finalMax && (
                      <>
                        <span className="text-lg font-light tracking-normal mx-2 opacity-50 font-sans">to</span>
                        ${finalMax}
                      </>
                    )}
                  </div>
                </div>

                {/* Selected Checklist Details summary */}
                <div className="space-y-4 border-t border-neutral-800 dark:border-neutral-200 pt-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono uppercase tracking-wider opacity-75">{currentTierData?.name || "Base Package"}</span>
                    <span className="font-mono font-semibold">{currentTierData?.price}</span>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs uppercase font-mono tracking-wider opacity-60">
                        <span>Selected Add-ons</span>
                        <span>{selectedAddOns.length} added</span>
                      </div>
                      <div className="max-h-28 overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-zinc-700">
                        {selectedAddOns.map((id) => {
                          const addOnItem = addOns.find((a) => a.id === id);
                          return (
                            <div key={id} className="flex justify-between items-center text-xs opacity-75">
                              <span className="truncate pr-2">• {addOnItem?.name}</span>
                              <span className="font-mono font-medium">{addOnItem?.price}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between items-center text-xs border-t border-neutral-900/60 dark:border-neutral-100/60 pt-2 font-mono">
                        <span>Total Add-ons</span>
                        <span>+${addOnsCost}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Book now trigger */}
              <div className="mt-12">
                <p className="text-xs font-mono tracking-widest uppercase opacity-65 mb-4 leading-normal">
                  All range figures serve as initial budgeting estimates. Final investment is confirmed during our creative briefing. A 50% deposit is required to secure your date.
                </p>
                <Link
                  href={getBookingUrl()}
                  className="w-full py-3 bg-[#ffff00] text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white hover:border border-white dark:border-black transition-all flex items-center justify-center gap-2 rounded-sm"
                >
                  Book Session Inquiry <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Production Process Panel */}
        <div className="mb-20 relative">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              PRODUCTION PROCESS
            </span>
            <h2 className="text-3xl font-light tracking-wide uppercase mt-2">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {/* Horizontal connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-px bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />

            {[
              {
                num: "01",
                icon: <Package className="h-4 w-4" />,
                title: "Pick Package",
                desc: "Browse our tiers above and select the package that fits your project scope and budget."
              },
              {
                num: "02",
                icon: <MessageCircle className="h-4 w-4" />,
                title: "Reach Out",
                desc: "Send us a DM or email with your date & vision. We'll get back to you within 24 hours."
              },
              {
                num: "03",
                icon: <CalendarCheck className="h-4 w-4" />,
                title: "Secure Date",
                desc: "We'll send a proposal + secure your date with a signed agreement and 50% deposit."
              },
              {
                num: "04",
                icon: <Send className="h-4 w-4" />,
                title: "We Deliver",
                desc: "We show up, capture everything, edit to perfection, and deliver your final assets."
              }
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative flex flex-col items-center text-center px-6 py-8"
              >
                {/* Step number circle */}
                <div className="relative z-10 w-20 h-20 rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black flex flex-col items-center justify-center mb-6 group-hover:border-black dark:group-hover:border-white group-hover:shadow-lg transition-all duration-300">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase leading-none mb-0.5">
                    STEP
                  </span>
                  <span className="text-xl font-mono font-light tracking-tight leading-none">
                    {step.num}
                  </span>
                </div>

                {/* Icon pill */}
                <div className="mb-3 p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-500 dark:text-zinc-400 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                  {step.icon}
                </div>

                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why KITESTUDIOS? Section */}
        <div className="mb-20">
          <div className="text-center sm:text-left mb-8">
            <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              ABOUT US
            </span>
            <h2 className="text-3xl font-light tracking-wide uppercase mt-2">
              Why KITESTUDIOS?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-neutral-100 dark:border-zinc-900/60 bg-zinc-50/10 dark:bg-neutral-950/5 rounded-sm">
              <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 block mb-3">
                [ 01 / EXPERIENCE ]
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">10 Years Behind the Lens</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                Over a decade of visual storytelling. Professional photo and cinematic motion packages designed specifically for premium impact.
              </p>
            </div>
            
            <div className="p-6 border border-neutral-100 dark:border-zinc-900/60 bg-zinc-50/10 dark:bg-neutral-950/5 rounded-sm">
              <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 block mb-3">
                [ 02 / STANDARDS ]
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Professional Standards</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                All video projects are shot on professional full-frame cinema setups and color-graded in DaVinci Resolve. Photos are processed using industry-standard Capture One.
              </p>
            </div>
            
            <div className="p-6 border border-neutral-100 dark:border-zinc-900/60 bg-zinc-50/10 dark:bg-neutral-950/5 rounded-sm">
              <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 block mb-3">
                [ 03 / DELIVERY ]
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Fast Turnaround</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed font-light">
                No endless waiting. We commit to prompt delivery timelines with clear schedules and streamlined online proofing galleries.
              </p>
            </div>
            
            <div className="p-6 border border-neutral-100 dark:border-zinc-900/60 bg-zinc-50/10 dark:bg-neutral-950/5 rounded-sm">
              <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 block mb-3">
                [ 04 / LICENSING ]
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Commercial Rights</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-455 leading-relaxed font-light">
                Every standard tier includes commercial usage rights. Use your high-resolution visual deliverables across all website, print, and social campaigns.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20 border-t border-neutral-100 dark:border-zinc-900/60 pt-16">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl font-light tracking-wide uppercase mt-2">
              What Clients Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="p-6 border border-neutral-100 dark:border-zinc-900/60 bg-zinc-50/10 dark:bg-neutral-950/5 flex flex-col justify-between">
              <p className="text-sm font-light italic leading-relaxed text-zinc-650 dark:text-zinc-300 mb-6">
                "KITESTUDIOS absolutely crushed our event coverage. The dual photo and video team was invisible on set but captured every single key moment with styling that felt cinematic and premium. The final assets completely elevated our branding."
              </p>
              <div>
                <span className="block text-xs font-mono tracking-widest uppercase font-bold">
                  DJ TJ
                </span>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-zinc-400 mt-0.5">
                  Event Manager & DJ
                </span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 border border-neutral-100 dark:border-zinc-900/60 bg-zinc-50/10 dark:bg-neutral-950/5 flex flex-col justify-between">
              <p className="text-sm font-light italic leading-relaxed text-zinc-650 dark:text-zinc-350 mb-6">
                "Tomy's eye for lighting and direction is unmatched. We shot a music video standard package and the color grading alone looked like a high-budget indie film. Professional, structured revision process, and super fast delivery."
              </p>
              <div>
                <span className="block text-xs font-mono tracking-widest uppercase font-bold">
                  Tony
                </span>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-zinc-400 mt-0.5">
                  Creative Lead, Sound & Motion
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              FAQ
            </span>
            <h2 className="text-3xl font-light tracking-wide uppercase mt-2">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-neutral-100 dark:border-zinc-900/60 pb-4 transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-2 font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    <span className="text-sm uppercase tracking-wider font-light">
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4.5 w-4.5 text-zinc-400 shrink-0 transform transition-transform duration-350 ease-out ${
                      isExpanded ? "rotate-180 text-black dark:text-white" : ""
                    }`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-light mt-2 pr-6">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA Area */}
        <div className="text-center py-12 border-t border-neutral-100 dark:border-neutral-900/60 max-w-xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-zinc-550 dark:text-zinc-450 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-sm uppercase font-bold mb-4 inline-block">
            READY TO COMMENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-wide uppercase mb-4">
            Lock In Your Shoot Date
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto mb-8 font-light">
            We book up to 2-3 months in advance. Reach out with your references, date ranges, and chosen packages to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={getBookingUrl()}
              className="px-6 py-2.5 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100 border border-black dark:border-white transition-all text-xs font-mono font-bold tracking-widest uppercase rounded-sm"
            >
              [ BOOK A SESSION ]
            </Link>
            <a
              href="mailto:tomy@kitestudios.net"
              className="px-6 py-2.5 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono tracking-widest uppercase rounded-sm"
            >
              Email Enquiries
            </a>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-neutral-100 dark:border-neutral-900 py-16 bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-neutral-400 dark:text-neutral-500 text-xs">
          <div className="text-center md:text-left">
            <span className="font-light tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase block mb-1">
              KITESTUDIOS
            </span>
            <span className="text-xs tracking-wider font-mono uppercase font-light">
              © 2026 KITESTUDIOS • PORTFOLIO
            </span>
          </div>

          <div className="flex items-center space-x-12 font-medium tracking-widest text-xs uppercase">
            <a
              href="https://instagram.com/kitestudios6"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="mailto:tomy@kitestudios.net"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
