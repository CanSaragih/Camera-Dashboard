import { useUser } from "../hooks/useUser";
import { capitalizeFirstLetter } from "../utils/String";

export default function DashboardPage() {
  const { user, loading } = useUser();
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl px-8 py-6 flex flex-col">
      <h1 className="text-3xl font-bold text-zinc-800">
        Hello,{" "}
        <span className="text-zinc-800">
          {loading
            ? "Loading..."
            : capitalizeFirstLetter(user?.username || "Unknown")}
        </span>
      </h1>
      <p className="text-gray-500 text-base mt-1">Have a great working day!</p>
    </div>
  );
}
