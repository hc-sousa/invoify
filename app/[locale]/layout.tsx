import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Fonts
import {
    alexBrush,
    dancingScript,
    greatVibes,
    outfit,
    parisienne,
} from "@/lib/fonts";

// Favicon
import Favicon from "@/public/assets/favicon/favicon.ico";

// Vercel Analytics
import { Analytics } from "@vercel/analytics/react";

// Next Intl
import { unstable_setRequestLocale } from 'next-intl/server';
import { getMessages } from 'next-intl/server';

// ShadCn
import { Toaster } from "@/components/ui/toaster";

// Components
import { BaseNavbar, BaseFooter } from "@/app/components";

// Contexts
import Providers from "@/contexts/Providers";

// SEO
import { JSONLD, ROOTKEYWORDS } from "@/lib/seo";

// Variables
import { BASE_URL, GOOGLE_SC_VERIFICATION } from "@/lib/variables";

// Types
import { Locale } from "@/i18n.config";

export const metadata: Metadata = {
    title: "Invoify | Free Invoice Generator",
    description:
        "Create invoices effortlessly with Invoify, the free invoice generator. Try it now!",
    icons: [{ rel: "icon", url: Favicon.src }],
    keywords: ROOTKEYWORDS,
    viewport: "width=device-width, initial-scale=1",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: BASE_URL,
    },
    authors: {
        name: "Ali Abbasov",
        url: "https://aliabb.vercel.app",
    },
    verification: {
        google: GOOGLE_SC_VERIFICATION,
    },
};

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: Locale };
}) {
    unstable_setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <script
                    type="application/ld+json"
                    id="json-ld"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
                />
            </head>
            <body
                className={`${outfit.className} ${dancingScript.variable} ${parisienne.variable} ${greatVibes.variable} ${alexBrush.variable} antialiased bg-slate-100 dark:bg-slate-800`}
            >
                <Providers locale={locale} messages={messages}>
                    <BaseNavbar />

                    <div className="flex flex-col">{children}</div>

                    <BaseFooter />

                    {/* Toast component */}
                    <Toaster />

                    {/* Vercel analytics */}
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
