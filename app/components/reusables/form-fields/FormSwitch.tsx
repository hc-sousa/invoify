"use client";

// Components
import { Switch } from "@/components/ui/switch";
import { FormField } from "@/components/ui/form";

// Types
interface FormSwitchProps {
    name: string;
    label: string;
}

const FormSwitch = ({ name, label }: FormSwitchProps) => {
    return (
        <FormField
            name={name}
            render={({ field }) => (
                <div className="flex items-center gap-2">
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    <label className="text-sm font-medium">{label}</label>
                </div>
            )}
        />
    );
};

export default FormSwitch; 