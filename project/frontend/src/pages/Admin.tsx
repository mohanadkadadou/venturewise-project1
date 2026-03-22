import * as React from "react";
import { useGetAdminStats, useListAllApplications } from "@workspace/api-client-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, FileText, Activity } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Admin() {
  const { data: stats, isLoading: statsLoading } = useGetAdminStats();
  const { data: applications, isLoading: appsLoading } = useListAllApplications();
  const { t, isRTL } = useTranslation();

  if (statsLoading || appsLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!stats) return <div className="p-8 text-muted-foreground">{t.common.error}</div>;

  const statCards = [
    {
      label: t.admin.totalProjects,
      value: stats.totalProjects,
      icon: Briefcase,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: t.admin.activeJobs,
      value: stats.totalJobs,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: t.admin.applications,
      value: stats.totalApplications,
      icon: FileText,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: t.admin.avgScore,
      value: `${stats.avgSuccessScore?.toFixed(1) ?? "—"}/100`,
      icon: Activity,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t.admin.title}</h1>
        <p className="text-muted-foreground mt-1">{t.admin.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card>
              <CardContent className="p-6">
                <div className={cn("flex items-center justify-between", isRTL ? "flex-row-reverse" : "")}>
                  <div className={isRTL ? "text-right" : ""}>
                    <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                    <h4 className="text-3xl font-bold mt-1">{card.value}</h4>
                  </div>
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", card.bg, card.color)}>
                    <card.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t.admin.recentApplications}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {applications?.slice(0, 5).map(app => (
                <div key={app.id} className={cn(
                  "flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border",
                  isRTL ? "flex-row-reverse" : ""
                )}>
                  <div className={isRTL ? "text-right" : ""}>
                    <p className="font-semibold text-foreground">{app.applicantName}</p>
                    <p className="text-sm text-primary">{app.job?.title}</p>
                  </div>
                  <Badge variant={app.status === 'pending' ? 'outline' : 'success'} className="capitalize text-xs">
                    {app.status}
                  </Badge>
                </div>
              ))}
              {!applications?.length && (
                <p className="text-muted-foreground text-sm text-center py-6">{t.admin.noApplications}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.admin.latestProjects}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentProjects?.slice(0, 5).map(proj => (
                <div key={proj.id} className={cn(
                  "flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border",
                  isRTL ? "flex-row-reverse" : ""
                )}>
                  <div className={isRTL ? "text-right" : ""}>
                    <p className="font-semibold text-foreground">{proj.businessName}</p>
                    <p className="text-sm text-muted-foreground">{proj.businessType}</p>
                  </div>
                  {(proj as any).analysis?.successScore !== undefined && (
                    <span className="text-sm font-bold text-primary">{(proj as any).analysis.successScore}/100</span>
                  )}
                </div>
              ))}
              {!stats.recentProjects?.length && (
                <p className="text-muted-foreground text-sm text-center py-6">{t.admin.noProjects}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
