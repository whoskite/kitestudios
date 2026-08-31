"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Globe, Target, Camera, User, CheckCircle, Loader2, Calendar, ShieldCheck, ChevronRight, ChevronLeft, Package, Sparkles } from "lucide-react";

interface ProductPhotographyQuizData {
  brandName: string;
  website: string;
  productCategory: string;
  salesChannels: string[];
  revenue: string;
  contentChannels: string[];
  readyToShip: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalInfo: string;
}

const INITIAL_DATA: ProductPhotographyQuizData = {
  brandName: "",
  website: "",
  productCategory: "",
  salesChannels: [],
  revenue: "",
  contentChannels: [],
  readyToShip: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  additionalInfo: "",
};

export default function ProductPhotographyQuiz() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [formData, setFormData] = useState<ProductPhotographyQuizData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const updateField = (fields: Partial<ProductPhotographyQuizData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const toggleSalesChannel = (channel: string) => {
    const current = formData.salesChannels;
    const next = current.includes(channel)
      ? current.filter((c) => c !== channel)
      : [...current, channel];
    updateField({ salesChannels: next });
  };

  const toggleContentChannel = (channel: string) => {
    const current = formData.contentChannels;
    const next = current.includes(channel)
      ? current.filter((c) => c !== channel)
      : [...current, channel];
    updateField({ contentChannels: next });
  };

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.brandName.trim().length > 1 &&
          formData.website.trim().length > 3
        );
      case 2:
        return (
          formData.productCategory !== "" &&
          formData.salesChannels.length > 0
        );
      case 3:
        return (
          formData.revenue !== "" &&
          formData.contentChannels.length > 0
        );
      case 4:
        return formData.readyToShip !== "";
      case 5:
        return (
          formData.firstName.trim().length > 0 &&
          formData.lastName.trim().length > 0 &&
          formData.email.includes("@") &&
          formData.phone.trim().length > 5
        );
      default:
        return true;
    }
  };

  const isQualified = () => {
    const hasRevenue = formData.revenue !== "Under $10k/mo";
    const isReady = formData.readyToShip === "Yes, ready to ship immediately (next 14-30 days)";
    return hasRevenue && isReady;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setIsSubmitting(true);
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    try {
      // Trigger Meta Pixel conversion if configured
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Product Photography Onboarding Application",
          content_category: "Product Lead Onboarding",
          value: 0.00,
          currency: "USD"
        }, { eventID: eventId });
      }

      const response = await fetch("/api/product-photography-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          eventId,
        }),
      });

      if (response.ok) {
        setShowResult(true);
        nextStep();
      } else {
        alert("There was an issue submitting your details. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    }),
  };

  const stepTitles = [
    "Brand Profile",
    "Product & Channels",
    "Store Revenue & Traffic",
    "Sample Shipment Logistics",
    "Contact Details",
    "Onboarding Result",
  ];

  const salesChannelOptions = [
    "Shopify Store",
    "Amazon Storefront",
    "WooCommerce / Custom E-commerce",
    "TikTok Shop / Instagram",
    "Retailers / Wholesalers",
    "Other Channels",
  ];

  const marketingChannelOptions = [
    "Instagram / Facebook Ads",
    "TikTok Organic & Spark Ads",
    "Pinterest Shopping",
    "Google Shopping / Search Ads",
    "Email Newsletters & SMS",
    "DTC Storefront Gallery Only",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto border border-zinc-800 bg-zinc-950/70 backdrop-blur-md rounded-2xl shadow-none overflow-hidden min-h-[490px] flex flex-col justify-between p-6 sm:p-8 text-zinc-100 font-sans">
      {/* Progress Bar & Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded font-bold">
              Step {step} of 6
            </span>
            <span className="text-sm text-zinc-200 font-semibold tracking-wide">
              — {stepTitles[step - 1]}
            </span>
          </div>
        </div>
        
        <div className="w-full h-1.5 bg-zinc-900 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500"
            initial={{ width: "16.66%" }}
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Slide Transitions */}
      <div className="flex-1 flex flex-col justify-center my-4 overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full space-y-6"
          >
            {/* STEP 1: BRAND PROFILE */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 mt-1">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white uppercase text-left">
                      What is your brand name & storefront URL?
                    </h2>
                    <p className="text-sm text-zinc-300 mt-1 text-left font-light">
                      We review product branding and catalog size to align on custom backdrops.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-1.5 text-left font-semibold">Brand Name</label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={(e) => updateField({ brandName: e.target.value })}
                      placeholder="e.g., Sol Cosmetics"
                      className="w-full px-4 py-3.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-zinc-100 placeholder-zinc-500 transition-all font-light text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-1.5 text-left font-semibold">Store Website</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => updateField({ website: e.target.value })}
                      placeholder="e.g., www.solcosmetics.com"
                      className="w-full px-4 py-3.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-zinc-100 placeholder-zinc-500 transition-all font-light text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PRODUCT CATEGORY & SALES CHANNELS */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 mt-1">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white uppercase text-left">
                      Tell us about your product catalog
                    </h2>
                    <p className="text-sm text-zinc-300 mt-1 text-left font-light">
                      Different categories require distinct lighting setups, macro lens capabilities, and styling props.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2 text-left">
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-1.5 font-semibold">Product Category</label>
                    <select
                      value={formData.productCategory}
                      onChange={(e) => updateField({ productCategory: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500 text-zinc-100 font-light text-sm"
                    >
                      <option value="">Select category...</option>
                      <option value="Skincare, Beauty & Cosmetics">Skincare, Beauty & Cosmetics</option>
                      <option value="Jewelry & Premium Accessories">Jewelry & Premium Accessories</option>
                      <option value="Packaged Food & Beverage">Packaged Food & Beverage</option>
                      <option value="Apparel, Footwear & Fashion">Apparel, Footwear & Fashion</option>
                      <option value="Consumer Electronics & Gadgets">Consumer Electronics & Gadgets</option>
                      <option value="Home Goods & Lifestyle Accessories">Home Goods & Lifestyle Accessories</option>
                      <option value="Health, Supplements & Wellness">Health, Supplements & Wellness</option>
                      <option value="Other Premium Goods">Other Premium Goods</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-2 font-semibold font-mono">Where do you sell? (Select all that apply)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {salesChannelOptions.map((channel) => {
                        const isSelected = formData.salesChannels.includes(channel);
                        return (
                          <button
                            type="button"
                            key={channel}
                            onClick={() => toggleSalesChannel(channel)}
                            className={`p-3.5 text-left border rounded-lg text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${
                              isSelected
                                ? "bg-amber-500/10 border-amber-500 text-white font-medium"
                                : "bg-zinc-900/40 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-white"
                            }`}
                          >
                            <span>{channel}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: REVENUE & MARKETING PLATFORMS */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 mt-1">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white uppercase text-left">
                      Scale & Creative Application
                    </h2>
                    <p className="text-sm text-zinc-300 mt-1 text-left font-light">
                      We optimize visuals based on where your audiences consume content and buy.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2 text-left">
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-1.5 font-semibold">Monthly Store Revenue</label>
                    <select
                      value={formData.revenue}
                      onChange={(e) => updateField({ revenue: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500 text-zinc-100 font-light text-sm"
                    >
                      <option value="">Select revenue range...</option>
                      <option value="Under $10k/mo">Under $10,000 / month</option>
                      <option value="$10k - $50k/mo">$10,000 - $50,000 / month</option>
                      <option value="$50k - $150k/mo">$50,000 - $150,000 / month</option>
                      <option value="$150k+/mo">$150,000+ / month</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-2 font-semibold font-mono">Where will you use these photo assets?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {marketingChannelOptions.map((channel) => {
                        const isSelected = formData.contentChannels.includes(channel);
                        return (
                          <button
                            type="button"
                            key={channel}
                            onClick={() => toggleContentChannel(channel)}
                            className={`p-3.5 text-left border rounded-lg text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${
                              isSelected
                                ? "bg-amber-500/10 border-amber-500 text-white font-medium"
                                : "bg-zinc-900/40 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-white"
                            }`}
                          >
                            <span>{channel}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: SAMPLE SHIPMENT LOGISTICS */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 mt-1">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white uppercase text-left">
                      Shipment Readiness
                    </h2>
                    <p className="text-sm text-zinc-300 mt-1 text-left font-light">
                      To execute your production, physical product samples are shipped directly to our Los Angeles studio.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2 text-left">
                  <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-2.5 font-semibold">
                    Can you ship physical products immediately if selected?
                  </label>
                  
                  <div className="flex flex-col gap-2">
                    {[
                      "Yes, ready to ship immediately (next 14-30 days)",
                      "Samples are available, but need 30-60 days to coordinate shipping",
                      "No physical samples available yet (production stage)",
                    ].map((option) => {
                      const isSelected = formData.readyToShip === option;
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => updateField({ readyToShip: option })}
                          className={`w-full p-4 border rounded-xl text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? "bg-amber-500/10 border-amber-500 text-white font-semibold"
                              : "bg-zinc-900/40 border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-white"
                          }`}
                        >
                          <span>{option}</span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: CONTACT INFORMATION */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 mt-1">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white uppercase text-left">
                      Who should we contact regarding scheduling?
                    </h2>
                    <p className="text-sm text-zinc-300 mt-1 text-left font-light">
                      Provide contact details for the brand founder or marketing representative.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-1 text-left">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-1.5 font-semibold">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateField({ firstName: e.target.value })}
                        placeholder="First Name"
                        className="w-full px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500 text-zinc-100 placeholder-zinc-500 font-light text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-1.5 font-semibold">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateField({ lastName: e.target.value })}
                        placeholder="Last Name"
                        className="w-full px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500 text-zinc-100 placeholder-zinc-500 font-light text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-1.5 font-semibold">Work Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField({ email: e.target.value })}
                      placeholder="e.g., founder@brand.com"
                      className="w-full px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500 text-zinc-100 placeholder-zinc-500 font-light text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-1.5 font-semibold">Direct Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => updateField({ phone: e.target.value })}
                      placeholder="e.g., +1 (555) 019-2834"
                      className="w-full px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500 text-zinc-100 placeholder-zinc-500 font-light text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-zinc-200 mb-1.5 font-semibold">Additional Project Details (Optional)</label>
                    <textarea
                      value={formData.additionalInfo}
                      onChange={(e) => updateField({ additionalInfo: e.target.value })}
                      placeholder="List any styling requests, product highlights, or specific goals..."
                      rows={2}
                      className="w-full px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500 text-zinc-100 placeholder-zinc-500 font-light text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: ONBOARDING RESULT SCREEN */}
            {step === 6 && showResult && (
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <CheckCircle className="h-8 w-8" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-wider uppercase text-white">
                    Intake Logged Successfully
                  </h2>
                  <p className="text-sm text-zinc-300 font-light max-w-md mx-auto">
                    Thank you for submitting your brand details to KiteStudios. We have analyzed your creative parameters.
                  </p>
                </div>

                <div className="p-5 border border-zinc-800/80 bg-zinc-900/30 rounded-xl max-w-md mx-auto text-left space-y-3">
                  <div className="flex justify-between items-center text-xs uppercase tracking-wider font-mono">
                    <span className="text-zinc-400">Onboarding Status:</span>
                    <span className={`font-semibold ${isQualified() ? "text-amber-400" : "text-zinc-350"}`}>
                      {isQualified() ? "🔥 PRIORITY ONBOARDING" : "STANDARD ROUTING QUEUE"}
                    </span>
                  </div>
                  <div className="h-px bg-zinc-800" />
                  
                  {isQualified() ? (
                    <div className="space-y-2">
                      <span className="text-[10px] text-amber-400 uppercase tracking-widest font-mono font-bold block flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 animate-pulse" /> PRIORITY ACTION ROUTE:
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
                        Your brand details match our open scheduling criteria. Our lead director Tomy will contact you personally at <strong>{formData.email}</strong> within 24 business hours to coordinate a creative visual strategy call.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono font-semibold block">
                        ROUTING PROCESS:
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                        Your brand information has been logged in our creative review queue. Should an opening align with your product category in our upcoming shoot blocks, our studio manager will reach out via email.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2 text-xs font-mono text-zinc-500 flex justify-center items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-zinc-450" />
                  SECURE PORTAL • APPLICATION ENVELOPE RECORDED
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Button Controls */}
      {step < 6 && (
        <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-1.5 text-sm font-mono tracking-widest uppercase transition-colors px-3.5 py-2 rounded ${
              step === 1
                ? "text-zinc-700 pointer-events-none"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`flex items-center gap-1.5 text-sm font-mono font-bold tracking-widest uppercase transition-all px-5 py-2.5 rounded-lg border ${
                isStepValid()
                  ? "bg-amber-500 text-zinc-950 border-amber-400 hover:bg-amber-400 shadow-md shadow-amber-500/10 cursor-pointer"
                  : "bg-zinc-900/50 text-zinc-500 border-zinc-800/80 pointer-events-none"
              }`}
            >
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className={`flex items-center gap-1.5 text-sm font-mono font-bold tracking-widest uppercase transition-all px-6 py-2.5 rounded-lg border ${
                isStepValid() && !isSubmitting
                  ? "bg-amber-500 text-zinc-950 border-amber-400 hover:bg-amber-400 shadow-md shadow-amber-500/10 cursor-pointer"
                  : "bg-zinc-900/50 text-zinc-500 border-zinc-800/80 pointer-events-none"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-zinc-950" /> Submitting...
                </>
              ) : (
                <>
                  Submit <CheckCircle className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
