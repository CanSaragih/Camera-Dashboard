import { toast } from "react-hot-toast";

export function showToastOnce(
  message: string,
  toastId: string,
  type: "error" | "success" | "loading" = "error",
  duration = 5000
) {
  toast.dismiss(toastId);
  toast[type](message, {
    id: toastId,
    duration,
  });
}
