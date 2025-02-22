"use client";

import React from "react";

// RHF
import { FormProvider, useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

// Next Intl
import { NextIntlClientProvider } from 'next-intl';

// Schema
import { InvoiceSchema } from "@/lib/schemas";

// Context
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { InvoiceContextProvider } from "@/contexts/InvoiceContext";
import { ChargesContextProvider } from "@/contexts/ChargesContext";

// Types
import { InvoiceType } from "@/types";
import { Locale } from "@/i18n.config";

// Variables
import { FORM_DEFAULT_VALUES } from "@/lib/variables";

type ProvidersProps = {
    children: React.ReactNode;
    locale: Locale;
    messages: any;
};

const Providers = ({ children, locale, messages }: ProvidersProps) => {
    const form = useForm<InvoiceType>({
        resolver: zodResolver(InvoiceSchema),
        defaultValues: FORM_DEFAULT_VALUES,
    });

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NextIntlClientProvider locale={locale} messages={messages}>
                <TranslationProvider>
                    <FormProvider {...form}>
                        <InvoiceContextProvider>
                            <ChargesContextProvider>
                                {children}
                            </ChargesContextProvider>
                        </InvoiceContextProvider>
                    </FormProvider>
                </TranslationProvider>
            </NextIntlClientProvider>
        </ThemeProvider>
    );
};

export default Providers;
