import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Customer data protection and privacy standards at ${BRAND_NAME}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="space-y-8">
        <div className="border-b border-zinc-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
            Data Security
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            Your privacy is sacred. Learn how we safeguard customer information.
          </p>
        </div>

        <div className="prose prose-zinc max-w-none text-zinc-700 space-y-6 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              1. Information We Collect
            </h2>
            <p>
              When placing an order with {BRAND_NAME}, we collect only necessary fulfillment information: your name, recipient mobile phone number, delivery address, destination city, and optional email.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              2. Zero Financial Card Data Storage
            </h2>
            <p>
              Because our store operates exclusively on a <strong>Cash on Delivery (COD)</strong> fulfillment model across Pakistan, we do NOT ask for or store credit cards, debit card PINs, or bank account details. You pay in cash directly upon physical package handover.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              3. Courier Data Sharing
            </h2>
            <p>
              Your name, phone number, and street address are shared strictly with our courier partners (e.g. TCS, Leopards, Trax) for the sole purpose of transporting and completing doorstep handover. We do not sell or rent customer data to third-party marketing companies.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-zinc-950">
              4. Educational &amp; University Project Status
            </h2>
            <p>
              This website serves as a demo for an academic university term project. Any data entered into client demo forms is stored in your local browser session via Zustand state persistence and is never transmitted to unauthorized external servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
