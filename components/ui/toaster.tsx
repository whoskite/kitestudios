"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider data-oid="64zb_rd">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="v5l0.3m">
            <div className="grid gap-1" data-oid="h1w7r5e">
              {title && <ToastTitle data-oid=":ndfmql">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="h6_18ot">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid=":86_lje" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="99kq246" />
    </ToastProvider>
  );
}
