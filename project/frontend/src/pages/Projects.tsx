import * as React from "react";
import { Link } from "wouter";
import { useListProjects, useDeleteProject } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function Projects() {
  const { data: projects, isLoading, refetch } = useListProjects();
  const deleteProject = useDeleteProject();
  const { toast } = useToast();
  const { t, isRTL } = useTranslation();

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(t.projects.deleteConfirm)) return;
    try {
      await deleteProject.mutateAsync({ id });
      refetch();
    } catch {
      toast({ title: t.common.error, variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className={cn("flex items-end justify-between flex-wrap gap-4", isRTL ? "flex-row-reverse" : "")}>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.projects.title}</h1>
          <p className="text-muted-foreground mt-1">{t.projects.subtitle}</p>
        </div>
        <Link href="/">
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            {t.projects.newAnalysis}
          </Button>
        </Link>
      </div>

      {!projects?.length ? (
        <Card className="border-dashed bg-secondary/20">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg font-medium">{t.projects.empty}</p>
            <Link href="/" className="text-primary hover:underline text-sm">{t.projects.startFirst}</Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/projects/${project.id}`}>
                <Card className="group cursor-pointer hover:border-primary/40 hover:shadow-md transition-all h-full">
                  <CardContent className="p-5 space-y-4">
                    <div className={cn("flex items-start justify-between gap-2", isRTL ? "flex-row-reverse" : "")}>
                      <Badge variant="outline" className="text-primary border-primary/30 text-xs">
                        {project.businessType}
                      </Badge>
                      <button
                        onClick={(e) => handleDelete(project.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                        {project.businessName}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{project.description}</p>
                    </div>
                    <div className={cn("flex items-center gap-4 text-sm text-muted-foreground flex-wrap", isRTL ? "flex-row-reverse" : "")}>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        {formatCurrency(project.budget)}
                      </span>
                      {project.category && (
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {project.category.name}
                        </span>
                      )}
                    </div>
                    {project.location && (
                      <p className="text-xs text-muted-foreground">{project.location.city}, {project.location.country}</p>
                    )}
                    <p className="text-xs text-muted-foreground border-t border-border pt-3">
                      {new Date(project.createdAt!).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
