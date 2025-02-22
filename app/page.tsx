import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/variables";

// This page redirects to the default locale
export default function RootPage() {
    // Always redirect to the default locale
    redirect(`/${DEFAULT_LOCALE}/`);
}
