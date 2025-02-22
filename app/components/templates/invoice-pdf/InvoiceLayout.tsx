import { ReactNode } from "react";

// Types
import { InvoiceType } from "@/types";

// Variables
import { DOCUMENT_TYPES } from "@/lib/variables";

type InvoiceLayoutProps = {
    data: InvoiceType;
    children: ReactNode;
};

const InvoiceLayout = ({ data, children }: InvoiceLayoutProps) => {
    const { details } = data;
    const isPaid = details.isPaid;
    const isReceipt = details.documentType === "receipt";
    const isInvoiceReceipt = details.documentType === "invoice_receipt";
    const showPaymentInfo = !isPaid && !isReceipt && details.paymentInformation;
    const documentType = details.documentType || "invoice";
    const paymentInfo = details.paymentInformation;

    // Get proper document type display name
    const getDocumentTypeDisplay = () => {
        const type = DOCUMENT_TYPES.find(t => t.code === documentType);
        return type ? type.name.replace('-', ' ') : documentType;
    };

    return (
        <div className="p-6 bg-white">
            {/* Document Type Badge */}
            <div className="mb-4 flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isPaid ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                    {getDocumentTypeDisplay().toUpperCase()}
                    {isPaid && ' - PAID'}
                </span>
            </div>

            {/* Main Content */}
            {children}

            {/* Payment Information Section */}
            {showPaymentInfo && paymentInfo && (
                <div className="mt-6 border-t pt-4">
                    <div className="my-2">
                        <p className="font-semibold text-blue-600">
                            Payment terms:
                        </p>
                        <p className="font-regular text-gray-800">
                            {details.paymentTerms}
                        </p>
                    </div>
                    <div className="my-2">
                        <span className="font-semibold text-md text-gray-800">
                            Please send the payment to:
                            <p className="text-sm mt-2">
                                Bank: {paymentInfo.bankName}
                            </p>
                            <p className="text-sm">
                                Account name: {paymentInfo.accountName}
                            </p>
                            <p className="text-sm">
                                Account no: {paymentInfo.accountNumber}
                            </p>
                            {paymentInfo.paymentMethod && (
                                <p className="text-sm">
                                    Payment method: {paymentInfo.paymentMethod}
                                </p>
                            )}
                            {paymentInfo.paymentReference && (
                                <p className="text-sm">
                                    Reference: {paymentInfo.paymentReference}
                                </p>
                            )}
                        </span>
                    </div>
                </div>
            )}

            {/* Payment Terms & Status */}
            {!showPaymentInfo && details.paymentTerms && (
                <div className="mt-6 border-t pt-4">
                    <div className="my-2">
                        <p className="font-semibold text-blue-600">
                            Payment terms:
                        </p>
                        <p className="font-regular text-gray-800">
                            {details.paymentTerms}
                        </p>
                        {isPaid && details.paymentDate && (
                            <p className="font-regular text-green-600 mt-2">
                                Paid in full on {new Date(details.paymentDate).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Paid Receipt Message */}
            {(isPaid || isReceipt) && (
                <div className="mt-6 border-t pt-4">
                    <div className="my-2">
                        <p className="font-semibold text-green-600">
                            Payment Status
                        </p>
                        <p className="font-regular text-gray-800">
                            This {getDocumentTypeDisplay()} has been paid in full
                            {details.paymentDate && (
                                <> on {new Date(details.paymentDate).toLocaleDateString()}</>
                            )}
                        </p>
                    </div>
                </div>
            )}

            {/* Additional Notes - Only show if not empty */}
            {details.additionalNotes && details.additionalNotes.trim() !== "" && (
                <div className="mt-6 border-t pt-4">
                    <div className="my-2">
                        <p className="font-semibold text-blue-600">
                            Additional notes:
                        </p>
                        <p className="font-regular text-gray-800">
                            {details.additionalNotes}
                        </p>
                    </div>
                </div>
            )}

            {/* Contact Information */}
            <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                <p>Contact Information:</p>
                <p>Email: {data.sender.email}</p>
            </div>
        </div>
    );
};

export default InvoiceLayout;
