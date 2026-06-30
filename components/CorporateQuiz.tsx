"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Globe, Target, Video, User, CheckCircle, Loader2, Calendar, ShieldCheck, ChevronRight, ChevronLeft } from "lucide-react";

interface CorporateQuizData {
  companyName: string;
  website: string;
  industry: string;
  teamSize: string;
  marketingBudget: string;
  videoGoals: string[];
  crewReady: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const INITIAL_DATA: CorporateQuizData = {
  companyName: "",
  website: "",
  industry: "",
  teamSize: "",
  marketingBudget: "",
  videoGoals: [],
  crewReady: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default function CorporateQuiz() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [formData, setFormData] = useState<CorporateQuizData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const updateField = (fields: Partial<CorporateQuizData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const toggleVideoGoal = (goal: string) => {
    const current = formData.videoGoals;
    const next = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : [...current, goal];
    updateField({ videoGoals: next });
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
          formData.companyName.trim().length > 1 &&
          formData.website.trim().length > 3
        );
      case 2:
        return (
          formData.industry !== "" &&
          formData.teamSize !== "" &&
          formData.marketingBudget !== ""
        );
      case 3:
        return formData.videoGoals.length > 0;
      case 4:
        return formData.crewReady !== "";
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
    const isMediumOrLarge = ["11-50", "51-200", "201+"].includes(formData.teamSize);
    const hasBudget = ["$5k - $20k/mo", "$20k - $50k/mo", "$50k+/mo"].includes(formData.marketingBudget);
    const isReady = formData.crewReady === "Yes, ready to schedule (next 30-60 days)";
    return (isMediumOrLarge || hasBudget) && isReady;
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
          content_name: "Corporate Executive Film Cohort Application",
          content_category: "Corporate Lead Acquisition",
          value: 0.00,
          currency: "USD"
        }, { eventID: eventId });
      }

      const response = await fetch("/api/corporate-leads", {
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
        alert("There was an issue submitting your application. Please try again.");
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
    "Company Information",
    "Company Details",
    "Creative Objectives",
    "Production Readiness",
    "Executive Contact Details",
    "Screening Determination",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto border border-zinc-800 bg-zinc-950/70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden min-h-[480px] flex flex-col justify-between p-6 sm:p-8 text-zinc-100 font-sans">
      {/* Progress Bar & Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
              Step {step} of 6
            </span>
            <span className="text-xs text-zinc-400 font-light">
              — {stepTitles[step - 1]}
            </span>
          </div>
        </div>
        
        <div className="w-full h-1 bg-zinc-900 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500"
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
            {/* STEP 1: COMPANY PROFILE */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-400 mt-1">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-white uppercase text-left">
                      What is your organization name & website?
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1 text-left">
                      We vetting-screen website authority and visual identity prior to scheduling.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1 text-left">Company Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateField({ companyName: e.target.value })}
                      placeholder="e.g., Acme Corporation"
                      className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-zinc-100 placeholder-zinc-600 transition-all font-light text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1 text-left">Company Website</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => updateField({ website: e.target.value })}
                      placeholder="e.g., www.acme.com"
                      className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-zinc-100 placeholder-zinc-650 transition-all font-light text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: COMPANY DETAILS & SCALE */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-400 mt-1">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-white uppercase text-left">
                      Provide some details about your operations
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1 text-left">
                      This information tells us what kind of market audience and message scale we are addressing.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-left">
                  {/* Industry Select */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1">Primary Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => updateField({ industry: e.target.value })}
                      className="w-full px-3 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-sky-500 text-zinc-100 font-light text-sm"
                    >
                      <option value="">Select industry...</option>
                      <option value="SaaS / Tech">SaaS / Tech</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Consumer Brands / E-Commerce">Consumer Brands / E-Commerce</option>
                      <option value="Healthcare / Med / Biotech">Healthcare / Med / Biotech</option>
                      <option value="Real Estate / Development">Real Estate / Development</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Team Size Select */}
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1">Company Size (FTEs)</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => updateField({ teamSize: e.target.value })}
                      className="w-full px-3 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-sky-500 text-zinc-100 font-light text-sm"
                    >
                      <option value="">Select size...</option>
                      <option value="1-10">1 - 10 employees</option>
                      <option value="11-50">11 - 50 employees</option>
                      <option value="51-200">51 - 200 employees</option>
                      <option value="201+">201+ employees</option>
                    </select>
                  </div>
                </div>

                {/* Marketing Budget Range */}
                <div className="space-y-2 border-t border-zinc-900 pt-4 text-left">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">Estimated Monthly Marketing Budget</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Under $5k/mo", "$5k - $20k/mo", "$20k - $50k/mo", "$50k+/mo"].map((budget) => {
                      const isSelected = formData.marketingBudget === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => updateField({ marketingBudget: budget })}
                          className={`py-2 px-1 border rounded-lg text-xs font-light text-center transition-all duration-200 ${
                            isSelected
                              ? "bg-sky-500 text-white border-sky-500 font-medium"
                              : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700"
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CREATIVE GOALS */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-400 mt-1">
                    <Video className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-white uppercase text-left">
                      What are your video content objectives?
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1 text-left">
                      Select what you would deploy your brand film to accomplish (select all that apply).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-left">
                  {[
                    "Brand Story & Market Trust",
                    "Increase Sales Page Conversions",
                    "Recruiting & Culture Showcase",
                    "Product/Service Feature Walkthrough",
                    "Investor Pitch & Authority Asset",
                    "Executive Keynote / Profile",
                  ].map((goal) => {
                    const isSelected = formData.videoGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleVideoGoal(goal)}
                        className={`p-3 border rounded-xl text-xs text-left transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? "bg-sky-500/10 text-sky-400 border-sky-500"
                            : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <span>{goal}</span>
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? "border-sky-400 bg-sky-400" : "border-zinc-700 bg-transparent"
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: ON-SITE FILMING READINESS */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-400 mt-1">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-white uppercase text-left">
                      Are you ready for local filming?
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1 text-left">
                      Cohort members must be prepared for a tight, zero-disruption, 2-hour shoot block on-site.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-left">
                  {[
                    "Yes, ready to schedule (next 30-60 days)",
                    "Looking to shoot within 3-6 months",
                    "Just researching production capabilities",
                  ].map((option) => {
                    const isSelected = formData.crewReady === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateField({ crewReady: option })}
                        className={`w-full p-4 border rounded-xl text-sm transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? "bg-sky-500/10 text-sky-400 border-sky-500"
                            : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <span>{option}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? "border-sky-400 bg-sky-400" : "border-zinc-700 bg-transparent"
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: CONTACT DETAILS */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sky-400 mt-1">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-white uppercase text-left">
                      Where should we send your Vetting Decision?
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1 text-left">
                      Provide contact details of the executive alignment contact.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-left">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateField({ firstName: e.target.value })}
                        placeholder="John"
                        className="w-full px-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-sky-500 text-zinc-100 placeholder-zinc-700 transition-all font-light text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateField({ lastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full px-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-sky-500 text-zinc-100 placeholder-zinc-700 transition-all font-light text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1">Corporate Work Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField({ email: e.target.value })}
                      placeholder="john.doe@company.com"
                      className="w-full px-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-sky-500 text-zinc-100 placeholder-zinc-700 transition-all font-light text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1">Direct Business Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField({ phone: e.target.value })}
                      placeholder="+1 (555) 012-3456"
                      className="w-full px-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg focus:outline-none focus:border-sky-500 text-zinc-100 placeholder-zinc-700 transition-all font-light text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: SCREENING DETERMINATION (SUCCESS SCREEN) */}
            {step === 6 && showResult && (
              <div className="space-y-6 text-center py-6">
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="p-3 bg-sky-500/10 border border-sky-500/30 rounded-full text-sky-400 w-fit"
                  >
                    {isQualified() ? <ShieldCheck className="h-12 w-12" /> : <CheckCircle className="h-12 w-12" />}
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight text-white uppercase">
                    {isQualified()
                      ? "⚠️ Pre-Qualified / Application Priority Flagged"
                      : "✓ Application Submitted Successfully"}
                  </h2>
                  
                  <p className="text-sm text-zinc-300 max-w-md mx-auto font-light leading-relaxed">
                    {isQualified()
                      ? "Based on your company profile and timeline readiness, you meet the initial parameters for the Executive Brand Film Cohort. We have flagged your profile as High Priority."
                      : "Thank you for applying. Your inquiry has been registered in our curation pool. Our creative board will review your profile within 48 business hours."}
                  </p>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800/85 rounded-xl p-4 max-w-md mx-auto text-left space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase block border-b border-zinc-800 pb-1.5">
                    What happens next:
                  </span>
                  <ul className="text-xs text-zinc-400 space-y-2 font-light list-decimal list-inside">
                    <li>Our director (Tomy) will inspect your company website and current media presence.</li>
                    <li>If aligned, you will receive a direct email invitation to book a 15-minute concept alignment brief.</li>
                    <li>Once we lock down the treatment blueprint, our production date is finalized.</li>
                  </ul>
                </div>
                
                <p className="text-[10px] font-mono text-zinc-500">
                  Confirmation reference: {formData.companyName.toUpperCase().replace(/\s+/g, "")}-{Date.now().toString().slice(-4)}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation Controls */}
      {step < 6 && (
        <div className="flex justify-between items-center border-t border-zinc-900 pt-6 mt-6">
          {step > 1 ? (
            <button
              onClick={prevStep}
              type="button"
              className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 hover:bg-zinc-900/40 rounded-lg transition-all cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" /> BACK
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              type="button"
              className={`px-5 py-2.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all ${
                isStepValid()
                  ? "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/10 cursor-pointer"
                  : "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
              }`}
            >
              CONTINUE <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              type="button"
              className={`px-6 py-2.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all ${
                isStepValid() && !isSubmitting
                  ? "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/10 cursor-pointer"
                  : "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> SUBMITTING...
                </>
              ) : (
                <>
                  SUBMIT APPLICATION <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
