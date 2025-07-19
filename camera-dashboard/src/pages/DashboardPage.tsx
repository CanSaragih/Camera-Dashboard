import CameraStatsCard from "../components/CameraStatsCard";
import GraphCard from "../components/GraphCard";
import { useCameraData } from "../hooks/useCameraData";
import { useGraphData } from "../hooks/useGraphData";
import { useUser } from "../hooks/useUser";
import { capitalizeFirstLetter } from "../utils/String";
import { Video, VideoOff } from "lucide-react";
import { useOutletContext } from "react-router";

type DashboardContextType = {
  isSidebarCollapsed: boolean;
};

export default function DashboardPage() {
  const { isSidebarCollapsed } = useOutletContext<DashboardContextType>();
  const { user, loading } = useUser();
  const { cameras, loading: camerasLoading } = useCameraData();
  const cpu = useGraphData("/graph/cpu");
  const memory = useGraphData("/graph/memory");
  const storage = useGraphData("/graph/storage");

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="w-full bg-white shadow-lg rounded-2xl px-6 sm:px-8 py-3 sm:py-3 md:py-3 lg:py-3 xl:py-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold text-zinc-800 leading-tight">
            Hello,{" "}
            {loading ? (
              <span className="text-zinc-800 animate-pulse">●●●●</span>
            ) : (
              <span className="text-zinc-800">
                {capitalizeFirstLetter(user?.username || "Unknown")}
              </span>
            )}
          </h1>
          <p className="text-zinc-500 text-xs sm:text-xs md:text-sm lg:text-base xl:text-base">
            Have a great working day!
          </p>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <CameraStatsCard
            icon={<Video className="w-6 h-6 text-black" />}
            count={camerasLoading ? 0 : cameras?.total_cameras || 0}
            label="Camera Total"
            iconBg="bg-yellow-300"
          />
          <CameraStatsCard
            icon={<Video className="w-6 h-6 text-white" />}
            count={camerasLoading ? 0 : cameras?.active_cameras.length || 0}
            label="Active Camera"
            iconBg="bg-[#019e54]"
          />
          <CameraStatsCard
            icon={<VideoOff className="w-6 h-6 text-white" />}
            count={camerasLoading ? 0 : cameras?.inactive_cameras.length || 0}
            label="Inactive Camera"
            iconBg="bg-red-500"
          />
        </div>
      </div>

      {/* Graph Section */}
      <div
        className={`grid gap-4 sm:gap-6 lg:gap-8 mt-4 ${
          isSidebarCollapsed
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        <GraphCard
          title="CPU Utilization"
          labels={cpu.labels}
          values={cpu.values}
        />
        <GraphCard
          title="Memory Utilization"
          labels={memory.labels}
          values={memory.values}
        />
        <GraphCard
          title="Storage Utilization"
          labels={storage.labels}
          values={storage.values}
        />
      </div>
    </div>
  );
}
