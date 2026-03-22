import * as React from "react";
import { useListStartupIdeas } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Lightbulb, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function StartupIdeas() {
  const { data: ideas, isLoading } = useListStartupIdeas();
  const { t, isRTL } = useTranslation();

  return (
    <div className="space-y-8 pb-12">
      <div className={cn(
        "flex justify-between items-center bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-3xl border border-primary/20",
        isRTL ? "flex-row-reverse bg-gradient-to-l" : ""
      )}>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-foreground">{t.startupIdeas.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{t.startupIdeas.subtitle}</p>
        </div>
        <Lightbulb className="w-24 h-24 text-primary opacity-20 hidden md:block flex-shrink-0" />
      </div>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ideas?.map((idea, i) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className={cn("h-full relative overflow-hidden flex flex-col", idea.isFeatured ? "border-primary shadow-lg shadow-primary/10" : "")}>
                {idea.isFeatured && (
                  <div className={cn(
                    "absolute top-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 z-10",
                    isRTL ? "left-0 rounded-br-lg" : "right-0 rounded-bl-lg"
                  )}>
                    {t.startupIdeas.featured.toUpperCase()}
                  </div>
                )}
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <Badge className="mb-3 text-xs">{idea.category}</Badge>
                    <h3 className="text-xl font-bold leading-tight">{idea.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm flex-1 mb-6 leading-relaxed">{idea.description}</p>

                  <div className="grid grid-cols-2 gap-4 bg-secondary/40 p-4 rounded-xl border border-border/50 mb-5">
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">{t.startupIdeas.required}</span>
                      <span className="font-bold text-foreground text-sm">{formatCurrency(idea.requiredBudget)}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">{t.startupIdeas.expectedReturn}</span>
                      <span className="font-bold text-emerald-500 flex items-center gap-1 text-sm">
                        <TrendingUp className="w-3 h-3" /> {idea.expectedReturn}%
                      </span>
                    </div>
                  </div>

                  <div className={cn("flex items-center justify-between mt-auto pt-4 border-t border-border/50", isRTL ? "flex-row-reverse" : "")}>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{idea.riskLevel} {t.startupIdeas.risk}</span>
                    </div>
                    <Badge variant="outline" className="capitalize text-xs">{idea.stage}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {ideas?.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed rounded-xl">
              {t.startupIdeas.empty}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
