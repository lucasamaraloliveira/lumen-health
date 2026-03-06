"use client";

import dynamic from 'next/dynamic';
const ToastContainer = dynamic(() => import('react-toastify').then(mod => mod.ToastContainer), { ssr: false });
import { useEffect } from 'react';

export default function ToastProvider() {
    useEffect(() => {
        // Load CSS only on client side to prevent render blocking
        // @ts-ignore - Ignore type error for dynamic CSS import in build
        import('react-toastify/dist/ReactToastify.css');
    }, []);

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
}
