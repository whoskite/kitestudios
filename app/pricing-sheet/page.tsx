"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder, useDragControls } from "framer-motion";
import {
  Printer,
  Edit3,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  FolderOpen,
  ArrowLeft,
  ChevronRight,
  Eye,
  FileCheck,
  PlusCircle,
  HelpCircle,
  GripVertical
} from "lucide-react";
import Link from "next/link";
import MinimalNav from "@/components/MinimalNav";

// Types for pricing sheet structure
interface Feature {
  id: string;
  text: string;
}

interface Tier {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  description: string;
  delivery: string;
  features: Feature[];
}

interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
  selected: boolean;
}

interface ProposalData {
  clientName: string;
  projectName: string;
  date: string;
  proposalId: string;
  introduction: string;
  selectedTierId: string;
  tiers: Tier[];
  addons: Addon[];
  terms: string;
  accentColor: string;
}

const DEFAULT_PROPOSAL: ProposalData = {
  clientName: "Acme Brand Co.",
  projectName: "Social Growth Reels & Brand Assets",
  date: "", // Set dynamically on client side
  proposalId: "KS-2026-0623",
  introduction: "A premium visual content directory and pricing guide tailored for modern social growth and cinematic branding. We outline structured starting packages to support your launch or campaign.",
  selectedTierId: "tier-1", // default selected tier
  tiers: [
    {
      id: "tier-1",
      name: "Starter Reels",
      price: 300,
      subtitle: "2 Video Reels",
      description: "Perfect for brands and creators getting started with cinematic vertical short-form content.",
      delivery: "7 Business Days",
      features: [
        { id: "t1-f1", text: "2 Custom Video Reels (Vertical 9:16 format)" },
        { id: "t1-f2", text: "Ambient sound sync & royalty-free background audio" },
        { id: "t1-f3", text: "Color grading & basic sound balancing in DaVinci Resolve" },
        { id: "t1-f4", text: "1 revision round included" },
        { id: "t1-f5", text: "Standard MP4 delivery & commercial rights" }
      ]
    },
    {
      id: "tier-2",
      name: "Creator Suite",
      price: 600,
      subtitle: "5 Video Reels + 5 Select Photos",
      description: "Designed for steady social growth and maintaining a high-quality consistent posting cadence.",
      delivery: "5 Business Days",
      features: [
        { id: "t2-f1", text: "5 Custom Video Reels (Vertical 9:16 format)" },
        { id: "t2-f2", text: "5 Edited high-res photos (Capture One processed)" },
        { id: "t2-f3", text: "Creative brief, scripting & brief references call" },
        { id: "t2-f4", text: "Subtle sound design, ASMR accents & typography templates" },
        { id: "t2-f5", text: "2 revision rounds included" },
        { id: "t2-f6", text: "Commercial & full organic promotional rights" }
      ]
    },
    {
      id: "tier-3",
      name: "Elite Brand Campaign",
      price: 1200,
      subtitle: "10 Reels + Custom Raw Access",
      description: "A comprehensive brand capture package with high-end cinematic storytelling and full commercial rights buyout.",
      delivery: "3 Business Days (Priority)",
      features: [
        { id: "t3-f1", text: "10 Custom Video Reels (Vertical 9:16 format)" },
        { id: "t3-f2", text: "Includes horizontal cutdowns (YouTube/Web format) if requested" },
        { id: "t3-f3", text: "Pre-production styling & storyboard call (30 min)" },
        { id: "t3-f4", text: "Bespoke motion graphics, captions, and licensed audio sync" },
        { id: "t3-f5", text: "Unlimited revisions (within reasonable limits)" },
        { id: "t3-f6", text: "Full raw footage transfer & complete commercial buyout rights" }
      ]
    }
  ],
  addons: [
    {
      id: "addon-1",
      name: "Second Operator / Photographer",
      price: 350,
      description: "Recommended for live action sets, weddings, or events to capture multi-angle coverage without missing candid moments.",
      selected: false
    },
    {
      id: "addon-2",
      name: "48-Hour Rush Delivery",
      price: 200,
      description: "Guaranteed express priority queue for video select edits.",
      selected: false
    },
    {
      id: "addon-3",
      name: "Additional Custom Video Reels",
      price: 150,
      description: "Add individual vertical video cuts (priced per additional reel).",
      selected: false
    },
    {
      id: "addon-4",
      name: "Raw Footage Hard Drive Transfer",
      price: 100,
      description: "Digital delivery or shipment of all raw unedited camera logs.",
      selected: false
    }
  ],
  terms: "A 50% deposit is required to secure production dates. The remaining 50% is due upon final approved delivery before clean files are released. Estimates are valid for 30 days. Standard turnaround times begin after final shoot day.",
  accentColor: "default" // default, orange, yellow, blue, custom
};

// Sub-component for a single reorderable feature item to isolate useDragControls
function ReorderableFeatureItem({
  feat,
  tIdx,
  fIdx,
  isSelected,
  accent,
  updateTierFeature,
  deleteTierFeature
}: {
  feat: Feature;
  tIdx: number;
  fIdx: number;
  isSelected: boolean;
  accent: any;
  updateTierFeature: (tIdx: number, fIdx: number, val: string) => void;
  deleteTierFeature: (tIdx: number, fIdx: number) => void;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={feat}
      dragListener={false}
      dragControls={dragControls}
      className="group/item flex items-center gap-2 text-xs leading-relaxed font-light text-zinc-650 dark:text-zinc-350 bg-white dark:bg-zinc-950 p-1 border border-dashed border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 rounded select-none"
    >
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded shrink-0 no-print"
        title="Drag to reorder"
      >
        <GripVertical className="h-3.5 w-3.5 text-zinc-400 hover:text-black dark:hover:text-white transition-colors" />
      </div>
      <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${isSelected ? accent.text : "text-zinc-400 dark:text-zinc-600"}`} />
      <input
        type="text"
        value={feat.text}
        onChange={(e) => updateTierFeature(tIdx, fIdx, e.target.value)}
        className="flex-1 bg-transparent border-b border-dashed border-zinc-250 dark:border-zinc-800 text-xs print:text-[10px] focus:outline-none text-black dark:text-white py-0.5 print:py-0"
      />
      <button
        onClick={() => deleteTierFeature(tIdx, fIdx)}
        className="no-print opacity-0 group-hover/item:opacity-100 text-zinc-400 hover:text-red-500 transition-opacity p-0.5"
        title="Delete feature"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </Reorder.Item>
  );
}

export default function PricingSheetPage() {
  const [data, setData] = useState<ProposalData>(DEFAULT_PROPOSAL);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [savedDraftsCount, setSavedDraftsCount] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  // Set date on client side only to avoid Next.js hydration mismatches
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    
    // Check localStorage for saved drafts
    const saved = localStorage.getItem("kitestudios_proposal_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Robust migration: convert legacy string features to objects if loaded
        if (parsed.tiers) {
          parsed.tiers = parsed.tiers.map((t: any) => {
            if (t.features && t.features.length > 0 && typeof t.features[0] === "string") {
              t.features = t.features.map((f: string, idx: number) => ({
                id: `migrated-${t.id}-${idx}-${Math.random()}`,
                text: f
              }));
            }
            return t;
          });
        }
        setData(parsed);
        showNotification("Loaded draft from local storage");
      } catch (e) {
        setData({ ...DEFAULT_PROPOSAL, date: formattedDate });
      }
    } else {
      setData({ ...DEFAULT_PROPOSAL, date: formattedDate });
    }
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleReset = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const resetData = { ...DEFAULT_PROPOSAL, date: formattedDate };
    setData(resetData);
    localStorage.removeItem("kitestudios_proposal_draft");
    showNotification("Reset pricing sheet to default settings");
  };

  const handleSave = () => {
    localStorage.setItem("kitestudios_proposal_draft", JSON.stringify(data));
    showNotification("Saved pricing sheet as draft successfully!");
  };

  const triggerPrint = () => {
    // Temporarily turn off edit mode outline during print
    const prevEditMode = isEditMode;
    setIsEditMode(false);
    
    setTimeout(() => {
      window.print();
      // Restore edit mode state after print dialog closes
      setIsEditMode(prevEditMode);
    }, 100);
  };

  // Helper functions to handle changes
  const updateField = (field: keyof ProposalData, value: any) => {
    setData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateTierField = (tierIndex: number, field: keyof Tier, value: any) => {
    setData((prev) => {
      const updatedTiers = [...prev.tiers];
      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        [field]: value
      };
      return {
        ...prev,
        tiers: updatedTiers
      };
    });
  };

  const updateTierFeature = (tierIndex: number, featureIndex: number, value: string) => {
    setData((prev) => {
      const updatedTiers = [...prev.tiers];
      const updatedFeatures = [...updatedTiers[tierIndex].features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        text: value
      };
      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        features: updatedFeatures
      };
      return {
        ...prev,
        tiers: updatedTiers
      };
    });
  };

  const reorderTierFeatures = (tierIndex: number, newFeatures: Feature[]) => {
    setData((prev) => {
      const updatedTiers = [...prev.tiers];
      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        features: newFeatures
      };
      return {
        ...prev,
        tiers: updatedTiers
      };
    });
  };

  const deleteTierFeature = (tierIndex: number, featureIndex: number) => {
    setData((prev) => {
      const updatedTiers = [...prev.tiers];
      const updatedFeatures = updatedTiers[tierIndex].features.filter((_, idx) => idx !== featureIndex);
      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        features: updatedFeatures
      };
      return {
        ...prev,
        tiers: updatedTiers
      };
    });
  };

  const addTierFeature = (tierIndex: number) => {
    setData((prev) => {
      const updatedTiers = [...prev.tiers];
      const newFeature: Feature = {
        id: `feat-${Date.now()}-${Math.random()}`,
        text: "New custom package capability"
      };
      const updatedFeatures = [...updatedTiers[tierIndex].features, newFeature];
      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        features: updatedFeatures
      };
      return {
        ...prev,
        tiers: updatedTiers
      };
    });
  };

  const toggleAddon = (addonIndex: number) => {
    setData((prev) => {
      const updatedAddons = [...prev.addons];
      updatedAddons[addonIndex] = {
        ...updatedAddons[addonIndex],
        selected: !updatedAddons[addonIndex].selected
      };
      return {
        ...prev,
        addons: updatedAddons
      };
    });
  };

  const updateAddonField = (addonIndex: number, field: keyof Addon, value: any) => {
    setData((prev) => {
      const updatedAddons = [...prev.addons];
      updatedAddons[addonIndex] = {
        ...updatedAddons[addonIndex],
        [field]: value
      };
      return {
        ...prev,
        addons: updatedAddons
      };
    });
  };

  const addCustomAddon = () => {
    setData((prev) => {
      const updatedAddons = [
        ...prev.addons,
        {
          id: `addon-${Date.now()}`,
          name: "Custom Add-on Service",
          price: 150,
          description: "Click to customize this additional production service.",
          selected: true
        }
      ];
      return {
        ...prev,
        addons: updatedAddons
      };
    });
  };

  const deleteAddon = (addonIndex: number) => {
    setData((prev) => {
      const updatedAddons = prev.addons.filter((_, idx) => idx !== addonIndex);
      return {
        ...prev,
        addons: updatedAddons
      };
    });
  };

  // Calculations
  const selectedTier = data.tiers.find((t) => t.id === data.selectedTierId) || data.tiers[0];
  const addonsTotal = data.addons
    .filter((a) => a.selected)
    .reduce((sum, a) => sum + Number(a.price || 0), 0);
  const grandTotal = Number(selectedTier?.price || 0) + addonsTotal;

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-700 border-t-neutral-800 dark:border-t-neutral-100 animate-spin" />
      </div>
    );
  }

  // Get accent class names
  const getAccentClasses = () => {
    switch (data.accentColor) {
      case "slate":
        return {
          text: "text-zinc-700",
          bg: "bg-zinc-50",
          border: "border-zinc-300 hover:border-zinc-700 focus-within:border-zinc-700",
          fill: "bg-zinc-700",
          outline: "focus:outline-zinc-700",
          gradient: "from-zinc-500/5 via-transparent to-transparent"
        };
      case "indigo":
        return {
          text: "text-indigo-600",
          bg: "bg-indigo-50/50",
          border: "border-indigo-500/30 hover:border-indigo-500 focus-within:border-indigo-500",
          fill: "bg-indigo-600",
          outline: "focus:outline-indigo-500",
          gradient: "from-indigo-500/10 via-transparent to-transparent"
        };
      case "teal":
        return {
          text: "text-teal-600",
          bg: "bg-teal-50/50",
          border: "border-teal-500/30 hover:border-teal-500 focus-within:border-teal-500",
          fill: "bg-teal-600",
          outline: "focus:outline-teal-500",
          gradient: "from-teal-500/10 via-transparent to-transparent"
        };
      default: // default Steel Blue (Corporate Accent)
        return {
          text: "text-accent",
          bg: "bg-sky-50/50",
          border: "border-accent/30 hover:border-accent focus-within:border-accent",
          fill: "bg-accent",
          outline: "focus:outline-accent",
          gradient: "from-accent/10 via-transparent to-transparent"
        };
    }
  };

  const accent = getAccentClasses();

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between selection:bg-sky-100 antialiased">
      
      {/* Navigation header (hidden on print) */}
      <div className="no-print w-full relative z-30">
        <MinimalNav />
      </div>

      {/* Floating Control Panel (hidden on print) */}
      <div className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-250 px-4 py-3 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Header left details */}
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="p-1.5 border border-zinc-200 hover:border-zinc-800 rounded-md text-zinc-500 hover:text-zinc-900 transition-colors bg-white shadow-sm"
              title="Back to general pricing"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-xs font-sans font-bold tracking-widest uppercase flex items-center gap-1.5 text-zinc-800">
                <span>Pricing Proposal Builder</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </h1>
              <p className="text-[10px] text-zinc-500 font-sans font-semibold tracking-wider uppercase">
                KITESTUDIOS • CUSTOM INVOICE GENERATOR
              </p>
            </div>
          </div>

          {/* Builder Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Color Accent Picker */}
            <div className="flex items-center gap-1.5 border border-zinc-200 px-2.5 py-1 rounded-sm bg-white">
              <span className="text-[10px] font-sans font-semibold tracking-widest text-zinc-400 uppercase mr-1">Theme:</span>
              <button
                onClick={() => updateField("accentColor", "default")}
                className={`h-3 w-3 rounded-full bg-sky-500 ring-offset-2 ${data.accentColor === "default" ? "ring-2 ring-sky-500" : ""}`}
                title="Steel Blue (Default)"
              />
              <button
                onClick={() => updateField("accentColor", "slate")}
                className={`h-3 w-3 rounded-full bg-zinc-650 ring-offset-2 ${data.accentColor === "slate" ? "ring-2 ring-zinc-500" : ""}`}
                title="Slate Charcoal"
              />
              <button
                onClick={() => updateField("accentColor", "indigo")}
                className={`h-3 w-3 rounded-full bg-indigo-500 ring-offset-2 ${data.accentColor === "indigo" ? "ring-2 ring-indigo-500" : ""}`}
                title="Corporate Indigo"
              />
              <button
                onClick={() => updateField("accentColor", "teal")}
                className={`h-3 w-3 rounded-full bg-teal-500 ring-offset-2 ${data.accentColor === "teal" ? "ring-2 ring-teal-500" : ""}`}
                title="Modern Teal"
              />
            </div>

            {/* Mode switch */}
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-mono tracking-wider uppercase rounded-sm transition-all ${
                isEditMode
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold"
                  : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-300 hover:border-black dark:hover:border-white"
              }`}
            >
              {isEditMode ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Edit Mode
                </>
              ) : (
                <>
                  <Edit3 className="h-3.5 w-3.5" />
                  Edit Proposal
                </>
              )}
            </button>

            {/* Save / Reset */}
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white text-xs font-mono tracking-wider uppercase rounded-sm transition-colors text-zinc-700 dark:text-zinc-300"
              title="Save changes to browser memory"
            >
              <Save className="h-3.5 w-3.5" />
              Save Draft
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-dashed border-zinc-200 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-800 hover:text-red-500 text-xs font-mono tracking-wider uppercase rounded-sm transition-colors text-zinc-400"
              title="Reset proposal to defaults"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>

            {/* Print trigger */}
            <button
              onClick={triggerPrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black hover:bg-black dark:hover:bg-white text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-all shadow-sm"
            >
              <Printer className="h-3.5 w-3.5" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Global alert notifications (hidden on print) */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="no-print fixed top-20 right-4 z-50 bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-xs font-mono tracking-widest uppercase border border-neutral-850 dark:border-neutral-150 rounded shadow-md flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Mode Instructions Header (hidden on print) */}
      {isEditMode && (
        <div className="no-print bg-zinc-50 dark:bg-zinc-950 border-b border-dashed border-zinc-200 dark:border-zinc-900 py-2.5 text-center text-xs font-mono tracking-wider text-zinc-500">
          <span className="font-bold text-black dark:text-white mr-1.5">[EDIT MODE ACTIVE]</span> 
          Click on any text, pricing tier, features, or client details below to edit directly.
        </div>
      )}

      {/* Proposal Main Document Canvas */}
      <main className="flex-1 w-full bg-neutral-50 dark:bg-neutral-950/20 py-8 sm:py-16 px-4 print:p-0 print:bg-white">
        <div className="container mx-auto max-w-5xl print:max-w-none">
          <div className="bg-white dark:bg-zinc-950/80 border border-neutral-150 dark:border-zinc-900 shadow-sm p-8 sm:p-16 print:p-0 print:border-none print:shadow-none print:bg-white transition-all duration-300">
            
            {/* DOCUMENT HEADER / BRAND BLOCK */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-8 pb-10 print:pb-4 border-b border-neutral-200 dark:border-zinc-800">
              
              {/* Brand identity */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-light tracking-[0.25em] uppercase text-black dark:text-white">
                    KITESTUDIOS
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-zinc-450 dark:text-zinc-500 mt-1">
                    PRODUCTION DIRECTORY & STUDIO PROPOSALS
                  </div>
                </div>

                <div className="mt-8 md:mt-0 pt-4 font-mono text-[10px] text-zinc-400 uppercase tracking-widest space-y-1">
                  <div>Paramount, CA — Los Angeles County</div>
                  <div>tomy@kitestudios.net • www.kitestudios.net</div>
                </div>
              </div>

              {/* Editable Client Metadata Card */}
              <div className="w-full md:w-80 bg-zinc-50 dark:bg-zinc-900/30 p-5 rounded-sm border border-neutral-100 dark:border-zinc-900/80 font-mono text-xs flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 tracking-wider uppercase mb-3 pb-1 border-b border-neutral-200 dark:border-zinc-800">
                    [ PROPOSAL RECIPIENT ]
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-[10px] text-zinc-400 uppercase">Client:</span>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.clientName}
                          onChange={(e) => updateField("clientName", e.target.value)}
                          className={`bg-transparent text-right font-bold w-48 border-b border-dashed border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white ${accent.outline}`}
                          placeholder="Client Company Name"
                        />
                      ) : (
                        <span className="font-bold text-black dark:text-white text-right">{data.clientName}</span>
                      )}
                    </div>

                    <div className="flex justify-between items-start gap-1">
                      <span className="text-[10px] text-zinc-400 uppercase">Project:</span>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.projectName}
                          onChange={(e) => updateField("projectName", e.target.value)}
                          className={`bg-transparent text-right w-48 border-b border-dashed border-zinc-300 dark:border-zinc-700 font-medium text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white ${accent.outline}`}
                          placeholder="Project Scope/Title"
                        />
                      ) : (
                        <span className="text-zinc-800 dark:text-zinc-200 text-right">{data.projectName}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-200 dark:border-zinc-800 space-y-1.5 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">Date:</span>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={data.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        className={`bg-transparent text-right w-32 border-b border-dashed border-zinc-300 dark:border-zinc-700 focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white`}
                        placeholder="Proposal Date"
                      />
                    ) : (
                      <span className="text-zinc-700 dark:text-zinc-300">{data.date}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase">Estimate ID:</span>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={data.proposalId}
                        onChange={(e) => updateField("proposalId", e.target.value)}
                        className={`bg-transparent text-right w-32 border-b border-dashed border-zinc-300 dark:border-zinc-700 focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white`}
                        placeholder="Proposal ID"
                      />
                    ) : (
                      <span className="text-zinc-750 dark:text-zinc-300 font-bold">{data.proposalId}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* INTRO SUMMARY BLOCK */}
            <div className="py-10 print:py-3 max-w-3xl">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-450 dark:text-zinc-500 block mb-3">
                [ OVERVIEW & DIRECTORY ]
              </span>
              
              {isEditMode ? (
                <textarea
                  value={data.introduction}
                  onChange={(e) => updateField("introduction", e.target.value)}
                  className={`w-full bg-transparent p-2 text-sm print:text-xs text-zinc-650 dark:text-zinc-350 font-light leading-relaxed border border-dashed border-zinc-300 dark:border-zinc-800 rounded-sm focus:outline-none focus:border-black dark:focus:border-white ${accent.outline}`}
                  rows={3}
                  placeholder="Enter proposal introduction narrative..."
                />
              ) : (
                <p className="text-sm sm:text-base print:text-xs text-zinc-650 dark:text-zinc-350 font-light leading-relaxed">
                  {data.introduction}
                </p>
              )}
            </div>

            {/* THREE-TIER PRICING TIERS */}
            <div className="py-8 print:py-1">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-450 dark:text-zinc-500 block">
                  [ 3-TIER PRODUCTION PACKAGES ]
                </span>
                
                {/* Print instructions (hidden on print) */}
                <span className="no-print flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                  <HelpCircle className="h-3 w-3" />
                  Select one tier to include in proposal total calculation
                </span>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 print:grid-cols-3 gap-8 print:gap-4">
                {data.tiers.map((tier, tIdx) => {
                  const isSelected = data.selectedTierId === tier.id;
                  
                  return (
                    <div
                      key={tier.id}
                      className={`relative flex flex-col justify-between p-6 sm:p-8 print:p-4 border rounded-sm transition-all duration-300 overflow-hidden print-card-avoid print:mb-0 ${
                        isSelected 
                          ? `border-black dark:border-white ring-1 ring-black dark:ring-white bg-zinc-50/20 dark:bg-zinc-950/20 shadow-md`
                          : `border-neutral-150 dark:border-zinc-900/60 bg-transparent opacity-95 hover:opacity-100 hover:border-zinc-300 dark:hover:border-zinc-800`
                      } ${accent.gradient && isSelected ? `bg-gradient-to-b ${accent.gradient}` : ""}`}
                    >
                      {/* Selection indicator & click area for client configuration */}
                      <div 
                        className={`absolute top-0 right-0 left-0 h-1 cursor-pointer transition-colors ${
                          isSelected ? accent.fill : "bg-transparent"
                        }`}
                        onClick={() => updateField("selectedTierId", tier.id)}
                      />

                      {/* Monospace Indicator bar */}
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-mono tracking-widest text-zinc-400">
                          [ TIER 0{tIdx + 1} ]
                        </span>
                        
                        {/* Selector checkbox (hidden on print) */}
                        <button
                          onClick={() => updateField("selectedTierId", tier.id)}
                          className={`no-print flex items-center justify-center h-4.5 w-4.5 rounded-full border text-[10px] transition-colors font-bold ${
                            isSelected
                              ? `${accent.fill} border-transparent text-white dark:text-black`
                              : "border-zinc-300 dark:border-zinc-700 text-transparent"
                          }`}
                          title="Select package for invoice total"
                        >
                          ✓
                        </button>
                      </div>

                      {/* Header tier details */}
                      <div>
                        {/* Title */}
                        {isEditMode ? (
                          <input
                            type="text"
                            value={tier.name}
                            onChange={(e) => updateTierField(tIdx, "name", e.target.value)}
                            className="w-full bg-transparent font-light tracking-wide uppercase text-lg sm:text-xl print:text-sm text-black dark:text-white border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-1 focus:outline-none focus:border-black dark:focus:border-white mb-2 print:mb-1"
                            placeholder="Package Title"
                          />
                        ) : (
                          <h3 className="text-lg sm:text-xl print:text-sm font-light tracking-wide uppercase mb-3 print:mb-1 text-black dark:text-white">
                            {tier.name}
                          </h3>
                        )}

                        {/* Price & Subtitle */}
                        <div className="mb-4 print:mb-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-mono text-zinc-400">$</span>
                            {isEditMode ? (
                              <input
                                type="number"
                                value={tier.price}
                                onChange={(e) => updateTierField(tIdx, "price", parseFloat(e.target.value) || 0)}
                                className={`w-28 bg-transparent text-2xl sm:text-3xl print:text-lg font-mono font-bold text-black dark:text-white border-b border-dashed border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-black dark:focus:border-white ${accent.text}`}
                                placeholder="300"
                              />
                            ) : (
                              <span className={`text-2xl sm:text-3xl print:text-lg font-mono font-bold text-black dark:text-white ${isSelected ? accent.text : ""}`}>
                                {tier.price}
                              </span>
                            )}
                          </div>
                          
                          {isEditMode ? (
                            <input
                              type="text"
                              value={tier.subtitle}
                              onChange={(e) => updateTierField(tIdx, "subtitle", e.target.value)}
                              className="w-full bg-transparent text-xs print:text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-dashed border-zinc-250 dark:border-zinc-850 mt-1 print:mt-0.5 focus:outline-none"
                              placeholder="2 Video Reels"
                            />
                          ) : (
                            <span className="block text-xs print:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1 print:mt-0.5">
                              {tier.subtitle}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {isEditMode ? (
                          <textarea
                            value={tier.description}
                            onChange={(e) => updateTierField(tIdx, "description", e.target.value)}
                            className="w-full bg-transparent text-xs print:text-[10px] font-light text-zinc-500 dark:text-zinc-400 leading-relaxed border border-dashed border-zinc-200 dark:border-zinc-800 p-1.5 rounded-sm focus:outline-none focus:border-black dark:focus:border-white mb-6 print:mb-2"
                            rows={3}
                            placeholder="Package Summary Description"
                          />
                        ) : (
                          <p className="text-xs sm:text-sm print:text-[10px] font-light leading-relaxed text-zinc-500 dark:text-zinc-400 mb-6 print:mb-2 border-b border-neutral-100 dark:border-zinc-900 pb-4 print:pb-1.5 min-h-[50px] print:min-h-0">
                            {tier.description}
                          </p>
                        )}

                        {/* Capabilities Bullet points */}
                        <div className="space-y-3 mb-6">
                          <span className="block text-[9px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                            Deliverables Include:
                          </span>
                          
                          {isEditMode ? (
                            <Reorder.Group
                              axis="y"
                              values={tier.features}
                              onReorder={(newFeatures) => reorderTierFeatures(tIdx, newFeatures)}
                              className="space-y-2.5 print:space-y-1"
                            >
                              {tier.features.map((feat, fIdx) => (
                                <ReorderableFeatureItem
                                  key={feat.id}
                                  feat={feat}
                                  tIdx={tIdx}
                                  fIdx={fIdx}
                                  isSelected={isSelected}
                                  accent={accent}
                                  updateTierFeature={updateTierFeature}
                                  deleteTierFeature={deleteTierFeature}
                                />
                              ))}
                            </Reorder.Group>
                          ) : (
                            <ul className="space-y-2.5 print:space-y-1">
                              {tier.features.map((feat) => (
                                <li key={feat.id} className="flex items-start gap-2 text-xs print:text-[10px] leading-relaxed print:leading-tight font-light text-zinc-650 dark:text-zinc-350">
                                  <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${isSelected ? accent.text : "text-zinc-400 dark:text-zinc-600"}`} />
                                  <span>{feat.text}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {isEditMode && (
                            <button
                              onClick={() => addTierFeature(tIdx)}
                              className="no-print mt-2 text-[10px] font-mono tracking-wider text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1 border border-dashed border-zinc-250 dark:border-zinc-800 px-2 py-1 rounded"
                            >
                              <Plus className="h-3 w-3" /> Add Item
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Delivery Line */}
                      <div className="border-t border-neutral-100 dark:border-zinc-900/60 pt-4 print:pt-2 mt-4 print:mt-2 text-[10px] print:text-[9px] font-mono text-zinc-450 dark:text-zinc-555">
                        <span className="text-zinc-400">TURNAROUND: </span>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={tier.delivery}
                            onChange={(e) => updateTierField(tIdx, "delivery", e.target.value)}
                            className="bg-transparent border-b border-dashed border-zinc-300 dark:border-zinc-700 w-32 focus:outline-none text-black dark:text-white"
                            placeholder="7 Business Days"
                          />
                        ) : (
                          <span className="font-semibold text-black dark:text-white">{tier.delivery}</span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEPARATE PAGE BREAK OR DIVIDER FOR PRINT */}
            <div className="my-10 border-t border-neutral-150 dark:border-zinc-900/80 print:break-before-page" />

            {/* CUSTOM ADD-ONS / INVOICE LINE ITEMS */}
            <div className="py-4 page-break-inside-avoid">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-450 dark:text-zinc-500 block">
                  [ OPTIONAL ADD-ONS & EXTRAS ]
                </span>
                {isEditMode && (
                  <button
                    onClick={addCustomAddon}
                    className="no-print text-xs font-mono tracking-widest uppercase border border-neutral-350 dark:border-zinc-800 hover:border-black dark:hover:border-white px-3 py-1 rounded flex items-center gap-1 text-black dark:text-white transition-colors"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    New Line Item
                  </button>
                )}
              </div>

              {/* Table or Stacked List of Add-ons */}
              <div className="space-y-4">
                {data.addons.map((addon, aIdx) => {
                  return (
                    <div
                      key={addon.id}
                      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 border rounded-sm transition-all duration-300 ${
                        addon.selected
                          ? "border-black dark:border-white bg-zinc-50/15 dark:bg-zinc-900/10 shadow-sm"
                          : "border-neutral-100 dark:border-zinc-900/40 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        {/* Selector checkbox */}
                        <div className="pt-0.5">
                          <button
                            onClick={() => toggleAddon(aIdx)}
                            className={`flex items-center justify-center h-4.5 w-4.5 border rounded-sm transition-all ${
                              addon.selected
                                ? `${accent.fill} border-transparent text-white dark:text-black`
                                : "border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white"
                            }`}
                          >
                            {addon.selected && <Check className="h-3 w-3" />}
                          </button>
                        </div>

                        {/* Text description */}
                        <div className="flex-1">
                          {isEditMode ? (
                            <div className="space-y-1">
                              <input
                                type="text"
                                value={addon.name}
                                onChange={(e) => updateAddonField(aIdx, "name", e.target.value)}
                                className="w-full max-w-md bg-transparent border-b border-dashed border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-black dark:text-white focus:outline-none"
                              />
                              <input
                                type="text"
                                value={addon.description}
                                onChange={(e) => updateAddonField(aIdx, "description", e.target.value)}
                                className="w-full bg-transparent border-b border-dashed border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-550 dark:text-zinc-400 focus:outline-none"
                              />
                            </div>
                          ) : (
                            <div>
                              <span className="text-xs sm:text-sm font-semibold text-black dark:text-white block">
                                {addon.name}
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                                {addon.description}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pricing + Deletion */}
                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="flex items-baseline gap-1 font-mono text-xs">
                          <span className="text-zinc-400 font-light">+ $</span>
                          {isEditMode ? (
                            <input
                              type="number"
                              value={addon.price}
                              onChange={(e) => updateAddonField(aIdx, "price", parseFloat(e.target.value) || 0)}
                              className="w-16 bg-transparent border-b border-dashed border-zinc-200 dark:border-zinc-800 font-bold text-black dark:text-white text-right focus:outline-none"
                              placeholder="100"
                            />
                          ) : (
                            <span className="font-bold text-black dark:text-white text-right">
                              {addon.price}
                            </span>
                          )}
                        </div>

                        {isEditMode && (
                          <button
                            onClick={() => deleteAddon(aIdx)}
                            className="no-print p-1 text-zinc-400 hover:text-red-500 transition-colors"
                            title="Delete Add-on"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOTALS SUMMARY BLOCK */}
            <div className="mt-12 bg-zinc-50 dark:bg-zinc-900/30 p-6 sm:p-8 rounded-sm border border-neutral-150 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 page-break-inside-avoid">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
                  [ CUSTOM CAMPAIGN ESTIMATE ]
                </span>
                <h4 className="text-sm font-semibold text-black dark:text-white">
                  {selectedTier ? `${selectedTier.name} Package` : "No Tier Selected"}
                  {addonsTotal > 0 && ` + ${data.addons.filter((a) => a.selected).length} Add-on(s)`}
                </h4>
                <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">
                  Estimate generated by KITESTUDIOS for {data.clientName}
                </p>
              </div>

              {/* Final calculation view */}
              <div className="flex flex-col items-end gap-1.5 self-end sm:self-center">
                <div className="flex items-baseline gap-1.5 border-b border-zinc-300 dark:border-zinc-700 pb-1.5">
                  <span className="text-xs font-mono text-zinc-400">Total:</span>
                  <span className={`text-2xl sm:text-4xl font-mono font-bold text-black dark:text-white ${accent.text}`}>
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500 uppercase tracking-widest">
                  USD • Subject to Terms
                </div>
              </div>
            </div>

            {/* AGREEMENT TERMS & CONTRACT SIGN-OFF */}
            <div className="mt-16 pt-10 border-t border-neutral-200 dark:border-zinc-800 page-break-inside-avoid">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Terms column */}
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-3">
                    [ TERMS & PROPOSAL SCOPE ]
                  </span>
                  
                  {isEditMode ? (
                    <textarea
                      value={data.terms}
                      onChange={(e) => updateField("terms", e.target.value)}
                      className="w-full bg-transparent text-xs text-zinc-500 leading-relaxed border border-dashed border-zinc-350 dark:border-zinc-800 p-2 rounded focus:outline-none"
                      rows={5}
                      placeholder="Add custom payment terms, copyright notes, delivery timelines..."
                    />
                  ) : (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light whitespace-pre-line">
                      {data.terms}
                    </p>
                  )}
                </div>

                {/* Hand-signed or Approval fields */}
                <div className="flex flex-col justify-end space-y-10 pt-4 md:pt-0">
                  <div className="flex justify-between items-end gap-6">
                    <div className="flex-1 border-b border-zinc-300 dark:border-zinc-700 pb-1 font-mono text-xs">
                      <div className="h-8"></div> {/* signature line padding */}
                      <span className="text-[10px] text-zinc-400 uppercase block">Prepared By:</span>
                      <span className="font-bold text-black dark:text-white text-xs">Tomy Lim, KITESTUDIOS</span>
                    </div>
                    
                    <div className="flex-1 border-b border-zinc-300 dark:border-zinc-700 pb-1 font-mono text-xs">
                      <div className="h-8"></div> {/* signature line padding */}
                      <span className="text-[10px] text-zinc-400 uppercase block">Client Representative Approval:</span>
                      <span className="font-bold text-black dark:text-white text-xs block truncate">
                        {data.clientName || "Representative"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>DOCUMENT SECURITY ID: #{data.proposalId}</span>
                    <span>KITESTUDIOS LLC.</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Branded print footer (only visible when printed/PDF) */}
            <div className="hidden print:flex fixed bottom-0 left-0 right-0 justify-between items-center text-[9px] font-mono text-zinc-450 border-t border-neutral-250 pt-1.5">
              <span>kitestudios.net</span>
              <span>ESTIMATE ID: #{data.proposalId}</span>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="no-print w-full border-t border-neutral-100 dark:border-neutral-900 py-12 bg-transparent mt-12">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-400 dark:text-zinc-500 text-xs">
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

      {/* Custom print CSS styles to guarantee exact margins, paper sizing, and high-contrast color printing */}
      <style jsx global>{`
        @media print {
          /* Set a consistent printable margin on the page level */
          @page {
            size: portrait;
            margin: 1.6cm 1.5cm 1.5cm 1.5cm;
          }
          
          /* Hide anything marked no-print */
          .no-print {
            display: none !important;
          }
          
          /* Avoid page breaks inside individual pricing cards */
          .print-card-avoid {
            break-inside: avoid !important;
            -webkit-column-break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          
          /* Reset body margins to let page-level margins handle spacing consistently */
          body, html {
            background-color: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Optimize outer canvas wrapper to fill paper margins */
          main {
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
          }

          /* Force clean printing of backgrounds and borders */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-shadow: none !important;
          }
        }
      `}</style>

    </div>
  );
}
