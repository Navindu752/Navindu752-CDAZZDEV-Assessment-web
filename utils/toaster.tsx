import { toast, ToastContainer } from "react-toastify";

const toaster = (type: "success" | "error" | "warning", message: string): void => {
  if (type === "success") toast.success(message);
  else if (type === "error") toast.error(message);
  else if (type === "warning") toast.warning(message);
};

export default toaster;