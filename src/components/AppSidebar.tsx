import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  History,
  GitCompare,
  BarChart3,
  Code2,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "History", icon: History, path: "/history" },
  { label: "Compare Models", icon: GitCompare, path: "/compare" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "API Playground", icon: Code2, path: "/api-playground" },
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "Profile", icon: User, path: "/profile" },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.2 }}
      className="h-screen sticky top-0 border-r border-border bg-secondary flex flex-col"
    >
      <div className="p-4 flex items-center gap-3 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center flex-shrink-0">
          <span className="text-background font-bold text-xs">AI</span>
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-sm text-foreground whitespace-nowrap"
          >
            AI Summarizer
          </motion.span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${active ? "active" : ""}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
