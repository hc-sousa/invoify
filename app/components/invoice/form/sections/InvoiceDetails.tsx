"use client";

// Components
import {
    CurrencySelector,
    DatePickerFormField,
    DocumentTypeSelector,
    FormInput,
    FormFile,
    FormSwitch,
    Subheading,
    TemplateSelector,
    LanguageSelector,
} from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useFormContext } from "react-hook-form";

const InvoiceDetails = () => {
    const { _t } = useTranslationContext();
    const { watch } = useFormContext();
    const documentType = watch("details.documentType");
    const showPaymentFields = documentType === "receipt" || documentType === "invoice_receipt";

    return (
        <section className="flex flex-col flex-wrap gap-5">
            <Subheading>{_t("form.steps.invoiceDetails.heading")}:</Subheading>

            <div className="flex flex-row flex-wrap gap-5">
                <div className="flex flex-col gap-2">
                    <DocumentTypeSelector
                        name="details.documentType"
                        label={_t("form.documentTypes.heading")}
                        placeholder={_t("form.placeholders.selectDocumentType")}
                    />

                    <FormFile
                        name="details.invoiceLogo"
                        label={_t(
                            "form.steps.invoiceDetails.invoiceLogo.label"
                        )}
                        placeholder={_t(
                            "form.steps.invoiceDetails.invoiceLogo.placeholder"
                        )}
                    />

                    <FormInput
                        name="details.invoiceNumber"
                        label={_t("form.steps.invoiceDetails.invoiceNumber")}
                        placeholder={_t("form.placeholders.documentNumber")}
                    />

                    <DatePickerFormField
                        name="details.invoiceDate"
                        label={_t("form.steps.invoiceDetails.issuedDate")}
                    />

                    <DatePickerFormField
                        name="details.dueDate"
                        label={_t("form.steps.invoiceDetails.dueDate")}
                    />

                    {showPaymentFields && (
                        <>
                            <DatePickerFormField
                                name="details.paymentDate"
                                label={_t("form.steps.invoiceDetails.paymentDate")}
                            />
                            <FormSwitch
                                name="details.isPaid"
                                label={_t("form.steps.invoiceDetails.isPaid")}
                            />
                        </>
                    )}

                    <CurrencySelector
                        name="details.currency"
                        label={_t("form.steps.invoiceDetails.currency")}
                        placeholder={_t("form.placeholders.selectCurrency")}
                    />

                    <LanguageSelector
                        name="details.language"
                        label={_t("form.steps.invoiceDetails.language")}
                        placeholder={_t("form.placeholders.selectLanguage")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <TemplateSelector />
                </div>
            </div>
        </section>
    );
};

export default InvoiceDetails;
