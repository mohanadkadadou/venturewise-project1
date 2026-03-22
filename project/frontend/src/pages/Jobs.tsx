import * as React from "react";
import { Link } from "wouter";
import { useListJobs } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Briefcase, Users, Search } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Jobs() {
  const { data: jobs, isLoading } = useListJobs();
  const [search, setSearch] = React.useState("");
  const { t, isRTL } = useTranslation();

  const filteredJobs = jobs?.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isRTL ? "md:flex-row-reverse" : "")}>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.jobs.title}</h1>
          <p className="text-muted-foreground mt-1">{t.jobs.subtitle}</p>
        </div>
        <div className="w-full md:w-72 relative">
          <Search className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
          <Input
            placeholder={t.jobs.searchPlaceholder}
            className={cn(isRTL ? "pr-9" : "pl-9")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            dir={isRTL ? "rtl" : "ltr"}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs?.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:border-primary/30 hover:shadow-sm transition-all">
                <CardContent className={cn("p-6 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between", isRTL ? "md:flex-row-reverse" : "")}>
                  <div className="space-y-2.5 flex-1">
                    <div className={cn("flex flex-wrap items-center gap-2", isRTL ? "flex-row-reverse" : "")}>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <Badge variant={job.isActive ? "success" : "secondary"} className="text-xs">
                        {job.isActive ? t.jobs.activelyHiring : "Closed"}
                      </Badge>
                    </div>
                    <div className="text-primary font-medium">{job.company}</div>
                    <div className={cn("flex flex-wrap items-center gap-4 text-sm text-muted-foreground", isRTL ? "flex-row-reverse" : "")}>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" /> {job.jobType.replace('-', ' ')} • {job.experienceLevel}
                      </span>
                      {job.salaryMin && job.salaryMax && (
                        <span className="text-foreground font-medium bg-secondary px-2.5 py-0.5 rounded-md">
                          {formatCurrency(job.salaryMin)} – {formatCurrency(job.salaryMax)}/{t.common.month}
                        </span>
                      )}
                    </div>
                    <div className={cn("flex flex-wrap gap-2 pt-1", isRTL ? "flex-row-reverse" : "")}>
                      {job.requiredSkills.split(',').map((skill, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 bg-secondary border border-border rounded-md text-muted-foreground">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={cn("flex flex-col items-end gap-3 min-w-[140px]", isRTL ? "items-start" : "")}>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {job.applicantCount || 0} {t.jobs.applicants}
                    </span>
                    {job.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 max-w-[200px] text-right">{job.description}</p>
                    )}
                    <Link href={`/jobs/${job.id}/apply`}>
                      <Button size="sm" disabled={!job.isActive} className="w-full">
                        {job.isActive ? t.jobs.applyNow : "Closed"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {filteredJobs?.length === 0 && (
            <div className="text-center p-12 text-muted-foreground border border-dashed rounded-xl">
              {t.jobs.empty}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
