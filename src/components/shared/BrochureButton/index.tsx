"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { BASE_API_URL } from "@/lib/config";

const BROCHURE_DOWNLOAD_URL = `${BASE_API_URL}/api/brochure/download`;

interface BrochureButtonProps {
    variant?: "primary" | "outline" | "white";
    className?: string;
}

export default function BrochureButton({ variant = "primary", className = "" }: BrochureButtonProps) {
    const [state, setState] = useState<"idle" | "loading" | "error">("idle");

    const handleDownload = async () => {
        setState("loading");
        try {
            const res = await fetch(BROCHURE_DOWNLOAD_URL);
            if (!res.ok) throw new Error();
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Walldot-Builders-Brochure.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
            setState("idle");
        } catch {
            setState("error");
            setTimeout(() => setState("idle"), 4000);
        }
    };

    const base = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer";
    const styles = {
        primary: `${base} bg-primary text-white hover:bg-dark`,
        outline: `${base} border-2 border-primary text-primary hover:bg-primary hover:text-white`,
        white:   `${base} bg-white text-primary hover:bg-white/90`,
    };

    return (
        <button
            onClick={handleDownload}
            disabled={state === "loading"}
            aria-label="Download company brochure PDF"
            className={`${styles[variant]} ${className}`}
        >
            {state === "loading" ? (
                <><Icon icon="ph:spinner" width={18} height={18} className="animate-spin" /><span>Preparing...</span></>
            ) : state === "error" ? (
                <><Icon icon="ph:warning-circle-fill" width={18} height={18} /><span>Not available</span></>
            ) : (
                <><Icon icon="ph:file-pdf-fill" width={18} height={18} /><span>Download Brochure</span></>
            )}
        </button>
    );
}
