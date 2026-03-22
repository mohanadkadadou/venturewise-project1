import * as React from "react";
import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetJob, useApplyToJob } from "@workspace/api-client-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const applySchema = z.object({
  applicantName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  skills: z.string().min(5),
  yearsOfExperience: z.coerce.number().min(0),
  coverLetter: z.string().optional(),
  cvText: z.string().optional(),
});

type ApplyValues = z.infer<typeof applySchema>;

export default function ApplyJob() {
  const { id } = useParams();
  const { toast } = useToast();
  const { t, isRTL } = useTranslation();
  const jobId = parseInt(id || "0");

  const { data: job, isLoading } = useGetJob(jobId);
  const applyMutation = useApplyToJob();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ApplyValues>({
    resolver: zodResolver(applySchema),
  });

  const onSubmit = async (data: ApplyValues) => {
    try {
      await applyMutation.mutateAsync({ id: jobId, data });
      setIsSuccess(true);
      toast({ title: t.apply.success });
    } catch {
      toast({ title: t.apply.error, variant: "destructive" });
    }
  };

  if (isLoading) return (
    <div className="flex h-40 items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
  if (!job) return <div className="p-8 text-destructive">{t.common.error}</div>;

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto pt-12 text-center space-y-6">
        <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-bold">{t.apply.success}</h2>
        <p className="text-muted-foreground text-lg">
          Your profile has been forwarded to <strong>{job.company}</strong>. They will reach out if your profile matches their requirements.
        </p>
        <div className="pt-4">
          <Link href="/jobs">
            <Button variant="outline">
              <ArrowLeft className={cn("w-4 h-4", isRTL ? "rotate-180 ml-2" : "mr-2")} />
              {t.common.back}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <Link href="/jobs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors gap-2">
        <ArrowLeft className={cn("w-4 h-4", isRTL ? "rotate-180" : "")} />
        {t.common.back}
      </Link>

      <div>
        <p className="text-sm text-primary font-medium mb-1">{t.apply.applyFor}</p>
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-muted-foreground mt-1">{job.company} • {job.location}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.apply.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.apply.fullName}</label>
                <Input {...register("applicantName")} />
                {errors.applicantName && <p className="text-xs text-destructive">{errors.applicantName.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.apply.email}</label>
                <Input type="email" {...register("email")} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.apply.phone}</label>
                <Input {...register("phone")} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t.apply.experience}</label>
                <Input type="number" min="0" {...register("yearsOfExperience")} />
                {errors.yearsOfExperience && <p className="text-xs text-destructive">{errors.yearsOfExperience.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.apply.skills}</label>
              <Input placeholder={t.apply.skillsPlaceholder} {...register("skills")} />
              {errors.skills && <p className="text-xs text-destructive">{errors.skills.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.apply.coverLetter}</label>
              <textarea
                className="flex min-h-[120px] w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                placeholder={t.apply.coverLetterPlaceholder}
                {...register("coverLetter")}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t.apply.cvText}</label>
              <textarea
                className="flex min-h-[100px] w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                placeholder={t.apply.cvPlaceholder}
                {...register("cvText")}
              />
            </div>

            <Button type="submit" size="lg" className="w-full mt-4" isLoading={isSubmitting}>
              {isSubmitting ? t.apply.submitting : t.apply.submitApplication}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
