import { useToastStore } from "./useToastStore.ts";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();
  return (
    <div className="w-full absolute bottom-0 flex flex-col items-center">
      {toasts.map((toast, index) => (
        <Toast key={index} className="mb-4">
          {toast.type === 'error' && (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-200 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
          )}
          {toast.type === 'success' && (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-200 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
          )}
          {toast.type === 'warning' && (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-200 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
          )}
          <div className="ml-3 text-sm font-normal">{toast.message}</div>
          <Toast.Toggle
            onDismiss={() => {
              removeToast(index);
            }}
          />
        </Toast>
      ))}
    </div>
  );
}