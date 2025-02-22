"use client";

// Components
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/ui/form";

// Variables
import { DOCUMENT_TYPES } from "@/lib/variables";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Types
import { DocumentTypeSelectorProps } from "@/types";

const DocumentTypeSelector = ({
    name,
    label,
    placeholder,
}: DocumentTypeSelectorProps) => {
    const { _t } = useTranslationContext();

    return (
        <FormField
            name={name}
            render={({ field }) => (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">{label}</label>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue
                                placeholder={placeholder}
                                className="w-full"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {DOCUMENT_TYPES.map((type) => (
                                <SelectItem
                                    key={type.code}
                                    value={type.code}
                                    className="cursor-pointer"
                                >
                                    {_t(`form.documentTypes.${type.code}`)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
        />
    );
};

export default DocumentTypeSelector; 