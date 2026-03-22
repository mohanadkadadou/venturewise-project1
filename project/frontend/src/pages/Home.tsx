import * as React from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useListCategories, useListLocations, useCreateProject } from "@workspace/api-client-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Target, Zap, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const BUSINESS_TYPES = [
  "Restaurant",
  "Café & Coffee Shop",
  "Retail Store",
  "E-Commerce Store",
  "SaaS / Tech Platform",
  "Consulting Firm",
  "Healthcare Clinic",
  "Gym & Fitness Center",
  "Beauty Salon & Spa",
  "Education & Training Center",
  "Real Estate Agency",
  "Food Delivery Service",
  "Logistics & Delivery",
  "Pharmacy",
  "Fashion & Clothing Brand",
  "Import & Export",
  "Tourism & Travel Agency",
  "Media & Content Studio",
  "Photography & Events",
  "Construction & Contracting",
] as const;

const TARGET_AUDIENCES = [
  "Young Adults (18–30)",
  "Families & Parents",
  "Working Professionals",
  "Students",
  "Seniors (50+)",
  "Businesses (B2B)",
  "Tourists & Visitors",
  "Health Enthusiasts",
  "Budget Shoppers",
  "Luxury Seekers",
  "Entrepreneurs & Startups",
  "Local Community",
] as const;

const formSchema = z.object({
  businessName: z.string().min(2),
  businessType: z.string().min(2),
  productsOrServices: z.string().min(3, "Please describe your products or services"),
  budget: z.coerce.number().min(100),
  targetAudience: z.string().min(3),
  categoryId: z.coerce.number().min(1),
  locationId: z.coerce.number().min(1),
});

type FormValues = z.infer<typeof formSchema>;

const STEP_TEMPLATES = [
  "Validating project parameters for {business}...",
  "Scanning market demand signals in {city}...",
  "Researching active competitors in {city}...",
  "Evaluating financial viability with your budget...",
  "Calculating market risk & exposure factors...",
  "Identifying best commercial zones in {city}...",
  "Modeling 12-month revenue scenarios...",
  "Designing targeted marketing roadmap...",
  "Matching qualified team candidates...",
  "Compiling your complete analysis report...",
];

const STEP_TEMPLATES_AR = [
  "التحقق من معطيات المشروع ({business})...",
  "تحليل إشارات الطلب في السوق - {city}...",
  "بحث المنافسين النشطين في {city}...",
  "تقييم الجدوى المالية مع ميزانيتك...",
  "احتساب عوامل المخاطرة والتعرض للسوق...",
  "تحديد أفضل المناطق التجارية في {city}...",
  "نمذجة سيناريوهات الإيرادات لـ 12 شهر...",
  "تصميم خارطة طريق التسويق المستهدف...",
  "مطابقة مرشحي الفريق المؤهلين...",
  "تجميع تقرير التحليل الشامل...",
];

const STEP_TEMPLATES_TR = [
  "{business} için proje parametreleri doğrulanıyor...",
  "{city}'de pazar talebi sinyalleri taranıyor...",
  "{city}'deki aktif rakipler araştırılıyor...",
  "Bütçenizle finansal uygunluk değerlendiriliyor...",
  "Pazar riski ve maruziyet faktörleri hesaplanıyor...",
  "{city}'de en iyi ticari bölgeler belirleniyor...",
  "12 aylık gelir senaryoları modelleniyor...",
  "Hedefli pazarlama yol haritası tasarlanıyor...",
  "Nitelikli ekip adayları eşleştiriliyor...",
  "Kapsamlı analiz raporu derleniyor...",
];

function buildSteps(lang: string, businessType: string, cityName: string): string[] {
  const templates = lang === "ar" ? STEP_TEMPLATES_AR : lang === "tr" ? STEP_TEMPLATES_TR : STEP_TEMPLATES;
  return templates.map(t =>
    t.replace("{business}", businessType || "your business")
     .replace("{city}", cityName || "selected city")
  );
}

function AnalysisLoader({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  const pct = Math.round(((currentStep + 1) / steps.length) * 100);
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 space-y-6">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--secondary))" strokeWidth="7" />
          <circle
            cx="48" cy="48" r="40"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - pct / 100)}`}
            className="transition-all duration-700 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-primary">{pct}%</span>
          <span className="text-xs text-muted-foreground">done</span>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-1.5">
        {steps.map((step, i) => (
          <div key={i} className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300",
            i === currentStep ? "bg-primary/10 border border-primary/20" : "",
            i < currentStep ? "opacity-50" : i > currentStep ? "opacity-25" : ""
          )}>
            {i < currentStep ? (
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            ) : i === currentStep ? (
              <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-border flex-shrink-0" />
            )}
            <span className={cn("text-xs leading-tight", i === currentStep ? "text-foreground font-medium" : "text-muted-foreground")}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const selectCls = "flex h-11 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all appearance-none cursor-pointer";

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t, isRTL, lang } = useTranslation();
  const { data: categories } = useListCategories();
  const { data: locations } = useListLocations();
  const createProject = useCreateProject();

  const [analysisState, setAnalysisState] = React.useState<"idle" | "loading">("idle");
  const [currentStep, setCurrentStep] = React.useState(0);
  const [dynamicSteps, setDynamicSteps] = React.useState<string[]>(buildSteps(lang, "", ""));

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { businessType: "", targetAudience: "" },
  });

  const watchedLocationId = watch("locationId");
  const watchedBusinessType = watch("businessType");

  const selectedCity = React.useMemo(() => {
    const loc = locations?.find(l => l.id === Number(watchedLocationId));
    return loc?.city || "";
  }, [locations, watchedLocationId]);

  const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

  const onSubmit = async (data: FormValues) => {
    const city = locations?.find(l => l.id === Number(data.locationId))?.city || "your city";
    const steps = buildSteps(lang, data.businessType, city);
    setDynamicSteps(steps);
    setCurrentStep(0);
    setAnalysisState("loading");

    // Auto-generate a description from the form data
    const generatedDescription = `${data.businessType} offering ${data.productsOrServices} for ${data.targetAudience} customers in ${city}. Budget: $${data.budget.toLocaleString()}.`;

    // Fire API call immediately (don't await yet)
    const apiPromise = createProject.mutateAsync({
      data: {
        businessName: data.businessName,
        businessType: data.businessType,
        description: generatedDescription,
        budget: data.budget,
        targetAudience: data.targetAudience,
        productsOrServices: data.productsOrServices,
        categoryId: data.categoryId,
        locationId: data.locationId,
      }
    });

    // Run animation to completion regardless of API speed (1.8s per step)
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await sleep(1800);
    }

    // After animation, wait for API (should already be done)
    try {
      const result = await apiPromise;
      setLocation(`/projects/${result.id}`);
    } catch (err: any) {
      setAnalysisState("idle");
      setCurrentStep(0);
      toast({
        title: "Analysis Failed",
        description: err.message || "An error occurred during analysis.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn(
      "relative min-h-[calc(100vh-5rem)] flex flex-col xl:flex-row items-center gap-12",
      isRTL ? "xl:flex-row-reverse" : ""
    )}>
      <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden opacity-20 pointer-events-none">
        <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt="" className="w-full h-full object-cover" />
        <div className={cn("absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent", isRTL ? "scale-x-[-1]" : "")} />
      </div>

      {/* Hero text */}
      <div className="flex-1 space-y-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
          <Zap className="w-4 h-4" />
          {t.home.badge}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-foreground">
          {t.home.headline1} <br />
          <span className="text-primary">{t.home.headline2}</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">{t.home.subtitle}</p>
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="space-y-2">
            <h4 className="text-3xl font-bold text-primary">98%</h4>
            <p className="text-sm text-muted-foreground">{t.home.accuracy}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-3xl font-bold text-primary">10k+</h4>
            <p className="text-sm text-muted-foreground">{t.home.analyzed}</p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="w-full xl:w-[540px] shrink-0 relative">
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-[2rem] blur-xl" />
        <Card className="rounded-[2rem] border-primary/20 bg-card/80 backdrop-blur-2xl shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="text-primary w-5 h-5" />
              {t.home.formTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {analysisState === "loading" ? (
                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AnalysisLoader steps={dynamicSteps} currentStep={currentStep} />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Business Name */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{t.home.businessName}</label>
                    <Input placeholder={t.home.businessNamePlaceholder} {...register("businessName")} />
                    {errors.businessName && <p className="text-xs text-destructive">{errors.businessName.message}</p>}
                  </div>

                  {/* Business Type + Target Audience */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{t.home.industryType}</label>
                      <select className={selectCls} {...register("businessType")}>
                        <option value="">{t.home.selectBusinessType}</option>
                        {BUSINESS_TYPES.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                      </select>
                      {errors.businessType && <p className="text-xs text-destructive">{errors.businessType.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{t.home.targetAudience}</label>
                      <select className={selectCls} {...register("targetAudience")}>
                        <option value="">{t.home.selectAudience}</option>
                        {TARGET_AUDIENCES.map(ta => <option key={ta} value={ta}>{ta}</option>)}
                      </select>
                      {errors.targetAudience && <p className="text-xs text-destructive">{errors.targetAudience.message}</p>}
                    </div>
                  </div>

                  {/* Products or Services */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{t.home.productsOrServices}</label>
                    <Input placeholder={t.home.productsPlaceholder} {...register("productsOrServices")} />
                    {errors.productsOrServices && <p className="text-xs text-destructive">{errors.productsOrServices.message}</p>}
                  </div>

                  {/* Category + Location */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{t.home.category}</label>
                      <select className={selectCls} {...register("categoryId")}>
                        <option value="">{t.home.selectCategory}</option>
                        {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      {errors.categoryId && <p className="text-xs text-destructive">{errors.categoryId.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{t.home.location}</label>
                      <select className={selectCls} {...register("locationId")}>
                        <option value="">{t.home.selectLocation}</option>
                        {locations?.map(l => <option key={l.id} value={l.id}>{l.city}, {l.country}</option>)}
                      </select>
                      {errors.locationId && <p className="text-xs text-destructive">{errors.locationId.message}</p>}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{t.home.budget} (USD)</label>
                    <Input type="number" placeholder="50000" min="100" {...register("budget")} />
                    {errors.budget && <p className="text-xs text-destructive">{errors.budget.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-2">
                    {t.home.runAnalysis}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
