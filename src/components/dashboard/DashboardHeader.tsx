import { Bell, Settings } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  notificationCount?: number;
}

const DashboardHeader = ({ title, notificationCount = 0 }: DashboardHeaderProps) => (
  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-3">
    <h2 className="text-lg font-extrabold text-white drop-shadow-md">{title}</h2>
    <div className="flex items-center gap-2">
      <button className="relative w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-card">
        <Bell className="w-4 h-4 text-foreground" />
        {notificationCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-cta text-cta-foreground text-[9px] font-bold flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </button>
      <button className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-card">
        <Settings className="w-4 h-4 text-foreground" />
      </button>
    </div>
  </div>
);

export default DashboardHeader;
