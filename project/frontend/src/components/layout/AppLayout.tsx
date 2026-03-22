import * as React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Briefcase, BarChart, Lightbulb, Users, ShieldCheck, Menu, X, Sun, Moon, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, languages, type Language } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);
  const { t, lang, setLang, isRTL } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: t.nav.newAnalysis, href: "/", icon: BarChart },
    { name: t.nav.projects, href: "/projects", icon: Briefcase },
    { name: t.nav.jobs, href: "/jobs", icon: Users },
    { name: t.nav.startupIdeas, href: "/startup-ideas", icon: Lightbulb },
    { name: t.nav.admin, href: "/admin", icon: ShieldCheck },
  ];

  const currentLang = languages.find(l => l.code === lang);

  const ControlBar = () => (
    <div className="flex items-center gap-1">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        title={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      <div className="relative">
        <button
          onClick={() => setLangOpen(!langOpen)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs font-medium">{currentLang?.flag}</span>
        </button>
        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              className={cn(
                "absolute top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden min-w-[130px]",
                isRTL ? "left-0" : "right-0"
              )}
            >
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code as Language); setLangOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-secondary transition-colors",
                    lang === l.code ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground" onClick={() => langOpen && setLangOpen(false)}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/90 backdrop-blur-md z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}images/logo-mark.png`} alt="VentureWise Logo" className="w-8 h-8 rounded-md" />
          <span className="font-bold text-lg">Venture<span className="text-primary">Wise</span></span>
        </div>
        <div className="flex items-center gap-1">
          <ControlBar />
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-muted-foreground hover:text-primary">
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border p-4 flex flex-col gap-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-all",
                  isRTL ? "flex-row-reverse text-right" : "",
                  location === item.href || (location.startsWith(item.href) && item.href !== "/")
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex w-72 flex-col fixed inset-y-0 border-border bg-sidebar z-30",
        isRTL ? "right-0 border-l" : "left-0 border-r"
      )}>
        <div className="p-8 flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary/20 border border-primary/30 flex-shrink-0">
            <img src={`${import.meta.env.BASE_URL}images/logo-mark.png`} alt="VentureWise Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-foreground">
            Venture<span className="text-primary">Wise</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href || (location.startsWith(item.href) && item.href !== "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden",
                  isRTL ? "flex-row-reverse text-right" : "",
                  isActive
                    ? "text-primary bg-primary/10 border border-primary/20 shadow-inner"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className={cn("absolute top-0 bottom-0 w-1 bg-primary rounded-full", isRTL ? "right-0" : "left-0")}
                  />
                )}
                <item.icon className={cn("w-5 h-5 transition-colors flex-shrink-0", isActive ? "text-primary" : "group-hover:text-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-5 space-y-3">
          <div className={cn("flex items-center justify-between", isRTL ? "flex-row-reverse" : "")}>
            <span className="text-xs text-muted-foreground font-medium">Theme & Language</span>
            <ControlBar />
          </div>
          <div className="p-4 rounded-xl bg-secondary/50 border border-border text-center">
            <p className="text-xs text-muted-foreground mb-2">Enterprise Plan Active</p>
            <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-primary rounded-full" />
            </div>
            <p className="text-xs font-medium text-foreground mt-2">75% Usage</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn("flex-1 pt-16 lg:pt-0 flex flex-col min-h-screen", isRTL ? "lg:pr-72" : "lg:pl-72")}>
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
