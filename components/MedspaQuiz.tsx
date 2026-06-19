"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Sparkles, Target, Camera, User, CheckCircle, Loader2 } from "lucide-react";

interface QuizData {
  location: string;
  treatments: string[];
  revenue: string;
  acquisition: string[];
  hasTraffic: string;
  crewReady: string;
  firstName: string;
  lastName: string;
  clinicName: string;
  website: string;
  email: string;
  phone: string;
}

const INITIAL_DATA: QuizData = {
  location: "",
  treatments: [],
  revenue: "",
  acquisition: [],
  hasTraffic: "",
  crewReady: "",
  firstName: "",
  lastName: "",
  clinicName: "",
  website: "",
  email: "",
  phone: "",
};

export default function MedspaQuiz() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [formData, setFormData] = useState<QuizData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const updateField = (fields: Partial<QuizData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const toggleTreatment = (treatment: string) => {
    const current = formData.treatments;
    const next = current.includes(treatment)
      ? current.filter((t) => t !== treatment)
      : [...current, treatment];
    updateField({ treatments: next });
  };

  const toggleAcquisition = (channel: string) => {
    const current = formData.acquisition;
    const next = current.includes(channel)
      ? current.filter((c) => c !== channel)
      : [...current, channel];
    updateField({ acquisition: next });
  };

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.location.trim().length > 2;
      case 2:
        return formData.treatments.length > 0 && formData.revenue !== "";
      case 3:
        return formData.acquisition.length > 0 && formData.hasTraffic !== "";
      case 4:
        return formData.crewReady !== "";
      case 5:
        return (
          formData.firstName.trim().length > 0 &&
          formData.lastName.trim().length > 0 &&
          formData.clinicName.trim().length > 0 &&
          formData.email.includes("@") &&
          formData.phone.trim().length > 5
        );
      default:
        return true;
    }
  };

  const isQualified = () => {
    const meetsRevenue = formData.revenue !== "Under $20k/mo";
    const meetsCrew = formData.crewReady === "Yes, we are ready to schedule";
    return meetsRevenue && meetsCrew;
  };



  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    }),
  };

  const stepTitles = [
    "Location",
    "Clinic Focus",
    "Patient Traffic",
    "On-Site Filming",
    "Contact Details",
    "Eligibility",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto border border-[#EBE8E2] bg-[#FCFAF7] rounded-2xl shadow-xl overflow-hidden min-h-[460px] flex flex-col justify-between p-6 sm:p-8 font-sans-medspa">
      {/* Quiz Header & Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase bg-[#C5A880]/10 px-2 py-0.5 rounded">
              Step {step} of 6
            </span>
            <span className="text-xs text-neutral-400 font-light">
              — {stepTitles[step - 1]}
            </span>
          </div>
          {step < 6 && (
            <div className="w-1" />
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#F5F2EC] rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C5A880] via-[#DBC6AA] to-[#C5A880]"
            initial={{ width: "16.66%" }}
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Steps Content Area with slide transitions */}
      <div className="flex-1 flex flex-col justify-center my-4 overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full space-y-5"
          >
            {/* STEP 1: LOCATION */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#C5A880]/10 rounded-lg text-[#C5A880] mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif-luxury tracking-wide text-stone-900 uppercase">
                      Where is your MedSpa clinic located?
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Our production team shoots on-site. Please type your city and state.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField({ location: e.target.value })}
                    placeholder="Enter city & state (e.g., Newport Beach, CA)"
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3DFD5] rounded-lg focus:outline-none focus:border-[#C5A880] text-stone-900 placeholder-stone-400 transition-all font-light"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* STEP 2: CLINIC FOCUS & REVENUE */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Specialty */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#C5A880]/10 rounded-lg text-[#C5A880]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-serif-luxury tracking-wide text-stone-900 uppercase">
                        What treatments do you specialize in?
                      </h2>
                      <p className="text-xs text-stone-500">
                        Select your clinic's primary treatment types (select all that apply).
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Injectables & Dermal Fillers",
                      "Laser Skin Resurfacing",
                      "Body Contouring",
                      "Aesthetic Skin Facials / Peels",
                      "Wellness & IV Hydration",
                    ].map((treatment) => {
                      const isSelected = formData.treatments.includes(treatment);
                      return (
                        <button
                          key={treatment}
                          type="button"
                          onClick={() => toggleTreatment(treatment)}
                          className={`px-3 py-2 border rounded-lg text-xs transition-all duration-200 flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-[#C5A880] text-white border-[#C5A880] font-medium"
                              : "bg-transparent text-stone-600 border-[#E3DFD5] hover:border-[#C5A880]"
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          {treatment}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Revenue */}
                <div className="space-y-3 border-t border-[#EBE8E2] pt-4">
                  <h2 className="text-xs tracking-wider text-stone-400 uppercase font-medium">
                    Current Monthly Revenue Bracket
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Under $20k/mo",
                      "$20k - $50k/mo",
                      "$50k - $100k/mo",
                      "$100k+/mo",
                    ].map((rev) => {
                      const isSelected = formData.revenue === rev;
                      return (
                        <button
                          key={rev}
                          type="button"
                          onClick={() => updateField({ revenue: rev })}
                          className={`p-3 border rounded-lg text-xs transition-all duration-200 text-left ${
                            isSelected
                              ? "bg-[#C5A880]/15 text-[#C5A880] border-[#C5A880] font-medium"
                              : "bg-transparent text-stone-600 border-[#E3DFD5] hover:border-[#C5A880]"
                          }`}
                        >
                          {rev}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PATIENT TRAFFIC */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Acquisition channel */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#C5A880]/10 rounded-lg text-[#C5A880]">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-serif-luxury tracking-wide text-stone-900 uppercase">
                        How do you currently acquire patients?
                      </h2>
                      <p className="text-xs text-stone-500">
                        Select all channels that apply to your clinic.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Instagram & TikTok Organic",
                      "Paid Meta Ads (FB / IG)",
                      "Google Search Ads (PPC)",
                      "Local SEO / Google Maps",
                      "Patient Referrals & Word of Mouth",
                      "Email / SMS Campaigns",
                    ].map((acq) => {
                      const isSelected = formData.acquisition.includes(acq);
                      return (
                        <button
                          key={acq}
                          type="button"
                          onClick={() => toggleAcquisition(acq)}
                          className={`p-3 border rounded-lg text-xs transition-all duration-200 text-left flex items-center justify-between ${
                            isSelected
                              ? "bg-[#C5A880]/15 text-[#C5A880] border-[#C5A880] font-medium"
                              : "bg-transparent text-stone-600 border-[#E3DFD5] hover:border-[#C5A880]"
                          }`}
                        >
                          <span>{acq}</span>
                          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[8px] transition-colors ${
                            isSelected ? "bg-[#C5A880] border-[#C5A880] text-white" : "border-[#E3DFD5] bg-white"
                          }`}>
                            {isSelected && "✓"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Website Traffic */}
                <div className="space-y-3 border-t border-[#EBE8E2] pt-4">
                  <h2 className="text-xs tracking-wider text-stone-400 uppercase font-medium">
                    Do you have active website visitors?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      "Yes, steady traffic",
                      "Yes, but low conversion",
                      "No, we need more traffic",
                    ].map((traffic) => {
                      const isSelected = formData.hasTraffic === traffic;
                      return (
                        <button
                          key={traffic}
                          type="button"
                          onClick={() => updateField({ hasTraffic: traffic })}
                          className={`p-3 border rounded-lg text-xs transition-all duration-200 text-left sm:text-center ${
                            isSelected
                              ? "bg-[#C5A880]/15 text-[#C5A880] border-[#C5A880] font-medium"
                              : "bg-transparent text-stone-600 border-[#E3DFD5] hover:border-[#C5A880]"
                          }`}
                        >
                          {traffic}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: ON-SITE FILMING */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#C5A880]/10 rounded-lg text-[#C5A880] mt-1">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif-luxury tracking-wide text-stone-900 uppercase">
                      Production Day Readiness
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Our professional film crew requires 1 to 2 hours on-site at your clinic to film aesthetic walkthroughs and provider clips. Can your clinic accommodate this?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  {[
                    { label: "Yes, we can host the crew for a 1-2 hour filming block", value: "Yes, we are ready to schedule" },
                    { label: "Yes, but we need details on setup & patient privacy", value: "Yes, but need details" },
                    { label: "No, we cannot host a film crew right now", value: "No crew allowed" },
                  ].map((option) => {
                    const isSelected = formData.crewReady === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateField({ crewReady: option.value })}
                        className={`p-4 border rounded-lg text-xs transition-all duration-200 text-left ${
                          isSelected
                            ? "bg-[#C5A880]/15 text-[#C5A880] border-[#C5A880] font-medium"
                            : "bg-transparent text-stone-600 border-[#E3DFD5] hover:border-[#C5A880]"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: CONTACT DETAILS */}
            {step === 5 && (
              <form onSubmit={handleSubmit} className="space-y-4 font-light">
                <div className="flex items-start gap-3 mb-2">
                  <div className="p-2 bg-[#C5A880]/10 rounded-lg text-[#C5A880] mt-1">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif-luxury tracking-wide text-stone-900 uppercase">
                      Clinic Curation Contact
                    </h2>
                    <p className="text-xs text-stone-500">
                      Provide contact details to submit your clinic profile to our curation team.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateField({ firstName: e.target.value })}
                      required
                      placeholder="e.g. Tomy"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E3DFD5] rounded-lg focus:outline-none focus:border-[#C5A880] text-stone-900 text-xs transition-all font-light"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateField({ lastName: e.target.value })}
                      required
                      placeholder="e.g. Kite"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E3DFD5] rounded-lg focus:outline-none focus:border-[#C5A880] text-stone-900 text-xs transition-all font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">
                      MedSpa / Clinic Name
                    </label>
                    <input
                      type="text"
                      value={formData.clinicName}
                      onChange={(e) => updateField({ clinicName: e.target.value })}
                      required
                      placeholder="e.g. Aura MedSpa"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E3DFD5] rounded-lg focus:outline-none focus:border-[#C5A880] text-stone-900 text-xs transition-all font-light"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => updateField({ website: e.target.value })}
                      placeholder="e.g. auramedspa.com"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E3DFD5] rounded-lg focus:outline-none focus:border-[#C5A880] text-stone-900 text-xs transition-all font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField({ email: e.target.value })}
                      required
                      placeholder="doctor@clinic.com"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E3DFD5] rounded-lg focus:outline-none focus:border-[#C5A880] text-stone-900 text-xs transition-all font-light"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">
                      Direct Mobile Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField({ phone: e.target.value })}
                      required
                      placeholder="e.g. (310) 555-0199"
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E3DFD5] rounded-lg focus:outline-none focus:border-[#C5A880] text-stone-900 text-xs transition-all font-light"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isStepValid() || isSubmitting}
                    className="w-full py-3 bg-[#C5A880] hover:bg-[#b0936b] disabled:bg-[#FAF8F5] disabled:text-stone-400 text-white font-medium tracking-wider text-xs uppercase transition-all duration-300 rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin text-white" />
                        Analyzing Eligibility...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 6: QUALIFICATION RESULTS & REVIEW SCREEN */}
            {step === 6 && showResult && (
              <div className="space-y-8 text-center py-4 font-sans-medspa">
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="p-4 bg-[#C5A880]/10 text-[#C5A880] rounded-full border border-[#C5A880]/30"
                  >
                    <CheckCircle className="h-12 w-12" />
                  </motion.div>
                  <h2 className="text-2xl font-serif-luxury tracking-wide text-stone-900 uppercase mt-4">
                    Application Under Review
                  </h2>
                  <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed mt-2 font-light">
                    Your MedSpa clinic profile has been securely registered. Because we cap our active production cohort at exactly 3 local clinics to guarantee cinema-grade execution, we review each application to ensure local exclusivity.
                  </p>
                </div>

                {/* Exclusive Curation Progress Tracker */}
                <div className="max-w-md mx-auto bg-[#FAF8F5] border border-[#E3DFD5] rounded-xl p-5 text-left space-y-4 shadow-sm">
                  <h3 className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase border-b border-[#E3DFD5] pb-2 font-semibold">
                    Curation Status Board
                  </h3>
                  
                  <div className="space-y-4 pt-1">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wide">
                          Screening Quiz Submitted
                        </h4>
                        <p className="text-[10px] text-stone-400 font-light mt-0.5">
                          Lead captured and securely mapped to your database.
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#C5A880]/20 border border-[#C5A880] text-[#C5A880] flex items-center justify-center text-[10px] shrink-0 mt-0.5 animate-pulse font-bold">
                        ●
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-850 uppercase tracking-wide">
                          Curation Board Review
                        </h4>
                        <p className="text-[10px] text-stone-400 font-light mt-0.5">
                          Verifying location exclusivity and target market compatibility.
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3 opacity-60">
                      <div className="w-5 h-5 rounded-full border border-stone-300 text-stone-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-light">
                        –
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-stone-600 uppercase tracking-wide">
                          Eligibility Notification
                        </h4>
                        <p className="text-[10px] text-stone-450 font-light mt-0.5">
                          Curation director outreach via direct phone or email.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <p className="text-[10px] font-mono tracking-wider text-stone-400 uppercase">
                    Estimated Review Time: 24 Business Hours
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons footer */}
      {step < 6 && (
        <div className="flex items-center justify-between border-t border-[#EBE8E2] pt-4 mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 border border-[#E3DFD5] text-xs text-stone-500 hover:text-stone-900 transition-all duration-300 rounded"
          >
            ← Back
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-850 text-white disabled:bg-[#FAF8F5] disabled:text-stone-400 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded cursor-pointer border border-[#E3DFD5]"
            >
              Continue →
            </button>
          ) : (
            <div className="w-1" />
          )}
        </div>
      )}
    </div>
  );
}
