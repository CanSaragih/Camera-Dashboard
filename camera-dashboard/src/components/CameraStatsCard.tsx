interface CameraStatsCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  iconBg: string;
}

export default function CameraStatsCard({
  icon,
  count,
  label,
  iconBg,
}: CameraStatsCardProps) {
  return (
    <div className="bg-white shadow-lg hover:shadow-xl rounded-2xl p-6 flex items-center gap-4 transition-shadow duration-300">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[#019e54]">{count}</h2>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
