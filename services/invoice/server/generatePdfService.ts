import { NextRequest, NextResponse } from "next/server";

// Chromium
import chromium from "@sparticuz/chromium";

// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Variables
import { CHROMIUM_EXECUTABLE_PATH, TAILWIND_CDN } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req: NextRequest) {
    const body: InvoiceType = await req.json();

    // Create a browser instance
    let browser;

    try {
        const ReactDOMServer = (await import("react-dom/server")).default;

        // Get the selected invoice template
        const templateId = body.details.pdfTemplate;
        const InvoiceTemplate = await getInvoiceTemplate(templateId);

        // Read the HTML template from a React component
        const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
            InvoiceTemplate(body)
        );

        if (process.env.NODE_ENV === 'development') {
            // Use regular Puppeteer in development
            const puppeteer = await import("puppeteer");
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox']
            });
        } else {
            // Use puppeteer-core in production
            const puppeteer = await import("puppeteer-core");
            browser = await puppeteer.launch({
                args: [...chromium.args, "--no-sandbox"],
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH),
                headless: true
            });
        }

        if (!browser) {
            throw new Error("Failed to launch browser");
        }

        const page = await browser.newPage();

        // Set the HTML content of the page
        await page.setContent(htmlTemplate, {
            waitUntil: "networkidle0",
        });

        // Add Tailwind CSS
        await page.addStyleTag({
            url: TAILWIND_CDN,
        });

        // Generate the PDF
        const pdfBuffer = await page.pdf({
            format: "a4",
            printBackground: true,
            margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" }
        });

        // Close the browser
        await browser.close();

        // Create a Blob from the PDF data
        const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

        return new NextResponse(pdfBlob, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=invoice.pdf",
            },
            status: 200,
        });
    } catch (error) {
        console.error("PDF Generation Error:", error);
        return new NextResponse(`Error generating PDF: ${error}`, {
            status: 500,
        });
    } finally {
        if (browser) {
            try {
                await browser.close();
            } catch (e) {
                console.error("Error closing browser:", e);
            }
        }
    }
}
