"use client";

import { usePathname } from "next/navigation";
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

// ShadCn
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Variables
import { LOCALES } from "@/lib/variables";
import { locales } from "@/i18n.config";
import type { Locale } from "@/i18n.config";

const { useRouter, usePathname: useI18nPathname } = createSharedPathnamesNavigation({ locales });

const LanguageSelector = () => {
    const router = useRouter();
    const pathname = useI18nPathname();
    const currentLocale = usePathname().split('/')[1] as Locale;

    const handleLanguageChange = (lang: Locale) => {
        router.push(pathname, { locale: lang });
    };

    return (
        <Select
            value={currentLocale}
            onValueChange={handleLanguageChange}
        >
            <SelectTrigger
                className="w-[10rem] relative"
                aria-label="Languages"
            >
                <Badge className="position: absolute -top-4 -left-2 font-normal">
                    BETA
                </Badge>
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent
                style={{
                    overflowY: "hidden",
                    height: "min-content",
                }}
            >
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>

                    {LOCALES.map((locale) => (
                        <SelectItem key={locale.code} value={locale.code as Locale}>
                            {locale.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LanguageSelector;
