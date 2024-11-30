import { toast, type ToastOptions } from "vue3-toastify";
// 'info' | 'success' | 'error' | 'warning' | 'loading' | 'default'

export const notify = {
    error: (message: string, data?: ToastOptions) => toast(message, { ...data, type: "error" }),
    success: (message: string, data?: ToastOptions) => toast(message, { ...data, type: "success" }),
    info: (message: string, data?: ToastOptions) => toast(message, { ...data, type: "info" }),
    warning: (message: string, data?: ToastOptions) => toast(message, { ...data, type: "warning" }),
    loading: (message: string, data?: ToastOptions) => toast(message, { ...data, type: "loading" }),
    default: (message: string, data?: ToastOptions) => toast(message, { ...data, type: "default" }),
};

import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const toastConfig = {
    Vue3Toastify,
    options: {
        autoClose: 3000,
        transition: "slide",
        hideProgressBar: true,
        position: "top-center",
    } as ToastContainerOptions,
};
