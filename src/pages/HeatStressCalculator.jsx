import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Step1ShiftClothing from "@/components/heatstress/Step1ShiftClothing";
import Step2WBGTMeasurement from "@/components/heatstress/Step2WBGTMeasurement";
import Step3MetabolicRates from "@/components/heatstress/Step3MetabolicRates";
import ResultsPanel from "@/components/heatstress/ResultsPanel";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup from "@/components/SchemaMarkup";
import {
  calculateEffectiveWBGT,
  calculateTimeWeightedMetabolicRate,
  getClothingCAF,
  validateTimeAllocation,
  getScreeningZone,
  getZoneGuidance,
  clothingOptions,
} from "@/components/heatstress/heatstressCalculations";

export default function HeatStressCalculator() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1
  const [shiftHours, setShiftHours] = useState(8);
  const [clothingId, setClothingId] = useState("typical");

  // Step 2
  const [wbgt, setWBGT] = useState(28);
  const [location, setLocation] = useState("");

  // Step 3
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", metabolic: 150, tasksPerHour: 1, minutesPerTask: 60 },
  ]);
  const [nextTaskId, setNextTaskId] = useState(2);

  // Calculations
  const caf = getClothingCAF(clothingId);
  const effectiveWBGT = calculateEffectiveWBGT(wbgt, caf);
  const timeWeightedMetabolic = calculateTimeWeightedMetabolicRate(tasks);
  const timeValidation = validateTimeAllocation(tasks, shiftHours);
  const zone = getScreeningZone(effectiveWBGT, timeWeightedMetabolic);
  const guidance = getZoneGuidance(zone.zone);

  const clothingLabel =
    clothingOptions.find((o) => o.id === clothingId)?.label || "Typical Work Clothes";

  const handleAddTask = () => {
    if (tasks.length < 6) {
      setTasks([
        ...tasks,
        {
          id: nextTaskId,
          name: `Task ${tasks.length + 1}`,
          metabolic: 150,
          tasksPerHour: 1,
          minutesPerTask: 60,
        },
      ]);
      setNextTaskId(nextTaskId + 1);
    }
  };

  const handleRemoveTask = (index) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const handleTaskUpdate = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setTasks(newTasks);
  };

  const seoConfig = {
    title: "Heat Stress Screening Calculator (ACGIH-Style) | LumenEx EHS",
    description: "Quick, structured heat stress screening tool using WBGT and metabolic rate calculations. ACGIH-based guidance for occupational health.",
    keywords: "heat stress, WBGT, ACGIH, occupational hygiene, heat screening",
    canonicalUrl: "https://lumenexehs.ca/heat-stress-calculator",
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Heat Stress Screening Calculator",
    "description": "ACGIH-style heat stress screening tool for occupational hygiene",
    "url": "https://lumenexehs.ca/heat-stress-calculator",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEOHead {...seoConfig} />
      <SchemaMarkup schema={toolSchema} />

      {/* Hero Section */}
      <section className="bg-[#1a3a52] text-white pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
              Interactive Tool
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Heat Stress Screening Calculator
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              Quick, ACGIH-style assessment based on WBGT and metabolic rate. Identify risk
              zones and next steps.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      currentStep >= step
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        currentStep > step ? "bg-emerald-600" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Shift & Clothing</span>
              <span>WBGT</span>
              <span>Tasks</span>
              <span>Results</span>
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8"
          >
            {currentStep === 1 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Step 1: Shift & Clothing</h2>
                <Step1ShiftClothing
                  shiftHours={shiftHours}
                  clothingId={clothingId}
                  onShiftChange={setShiftHours}
                  onClothingChange={setClothingId}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Step 2: WBGT Measurement</h2>
                <Step2WBGTMeasurement
                  wbgt={wbgt}
                  location={location}
                  onWBGTChange={setWBGT}
                  onLocationChange={setLocation}
                  effectiveWBGT={effectiveWBGT}
                  caf={caf}
                />
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Step 3: Task-Based Metabolic Rate
                </h2>
                <Step3MetabolicRates
                  tasks={tasks}
                  shiftHours={shiftHours}
                  timeWeightedMetabolic={timeWeightedMetabolic}
                  timeValidation={timeValidation}
                  onTaskUpdate={handleTaskUpdate}
                  onAddTask={handleAddTask}
                  onRemoveTask={handleRemoveTask}
                />
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Screening Results</h2>
                <ResultsPanel
                  effectiveWBGT={effectiveWBGT}
                  timeWeightedMetabolic={timeWeightedMetabolic}
                  zone={zone}
                  guidance={guidance}
                  location={location}
                  shiftHours={shiftHours}
                  clothingLabel={clothingLabel}
                />
              </>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              variant="outline"
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentStep(1)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
              >
                Start Over
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-slate-100 py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Need a Formal Heat Stress Assessment?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            This screening tool is a starting point. Our certified occupational hygienists can
            conduct a comprehensive heat stress assessment tailored to your workplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = "/contact?service=heat_stress"}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Request Assessment
            </Button>
            <Button variant="outline">
              Learn More About Heat Stress Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}