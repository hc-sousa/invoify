// RHF
import { useFormContext } from "react-hook-form";

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
import { Label } from "@/components/ui/label";

// Variables
import { LOCALES } from "@/lib/variables";

// Types
import { InvoiceType, NameType } from "@/types";

type LanguageSelectorProps = {
    name: NameType;
    label: string;
    placeholder?: string;
};

// Form field language selector
const LanguageSelector = ({ name, label, placeholder }: LanguageSelectorProps) => {
    const methods = useFormContext();
    if (!methods) {
        throw new Error("LanguageSelector must be used within a FormProvider");
    }

    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <Select
                onValueChange={(value) => {
                    methods.setValue(name as any, value);
                }}
                defaultValue={LOCALES[0].code}
            >
                <SelectTrigger className="w-[15rem]">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Languages</SelectLabel>
                        {LOCALES.map((locale) => (
                            <SelectItem key={locale.code} value={locale.code}>
                                {locale.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSelector; 