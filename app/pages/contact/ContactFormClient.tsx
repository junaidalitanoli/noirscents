"use client";

import { useState } from "react";
import { Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";

export default function ContactFormClient() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // Honeypot trap for bots
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name || !form.phone || !form.message) {
      setErrorMsg("Please fill in your name, contact phone, and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to submit message. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start">
      {/* Contact info cards */}
      <div className="md:col-span-5 space-y-6">
        <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900">WhatsApp &amp; Helpline</h2>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-800 font-semibold hover:text-[#d4af37] transition-colors block mt-1"
              >
                {STORE_CONFIG.whatsappDisplay}
              </a>
              <p className="text-[11px] text-zinc-400">{STORE_CONFIG.businessHours}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900">Email Inquiries</h2>
              <a
                href={`mailto:${STORE_CONFIG.contactEmail}`}
                className="text-xs text-zinc-800 font-semibold hover:text-[#d4af37] transition-colors block mt-1"
              >
                {STORE_CONFIG.contactEmail}
              </a>
              <p className="text-[11px] text-zinc-400">Response within 24 business hours</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 text-white p-6 rounded-2xl border border-zinc-800 text-xs space-y-2">
          <span className="text-[#d4af37] font-bold block uppercase tracking-wider">
            COD Nationwide Dispatch
          </span>
          <p className="text-zinc-300 leading-relaxed font-light">
            Orders placed before 3:00 PM are dispatched on the same working day via {STORE_CONFIG.couriers}.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="md:col-span-7 bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8 shadow-xs">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-zinc-950">Message Sent!</h2>
            <p className="text-sm text-zinc-600 max-w-sm mx-auto">
              Thank you for contacting {BRAND_NAME}. Our concierge representative will respond via WhatsApp or email shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", phone: "", subject: "", message: "", website: "" });
              }}
              className="mt-4 px-6 py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs" noValidate={false}>
            {/* Honeypot field for bot mitigation */}
            <input
              type="text"
              name="website"
              id="contact-website-hp"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <h2 className="font-heading text-xl font-bold text-zinc-950 mb-2">
              Send Us a Message
            </h2>

            <div>
              <label htmlFor="contact-name" className="block font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Your Full Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="e.g. Ali Ahmed"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full text-sm p-3 border border-zinc-300 rounded-xl focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 focus:outline-hidden text-zinc-900 transition-all"
                required
                aria-required="true"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="block font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Phone / WhatsApp <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="0300-1234567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full text-sm p-3 border border-zinc-300 rounded-xl focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 focus:outline-hidden text-zinc-900 transition-all"
                required
                aria-required="true"
                aria-describedby="contact-phone-hint"
                autoComplete="tel"
              />
              <span id="contact-phone-hint" className="text-[11px] text-zinc-500 block mt-1">
                Pakistani mobile format: 03XX-XXXXXXX or 03XXXXXXXXX
              </span>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Inquiry Topic
              </label>
              <select
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full text-sm p-3 border border-zinc-300 rounded-xl focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 focus:outline-hidden text-zinc-900 font-medium bg-white transition-all cursor-pointer"
              >
                <option value="">Select Topic...</option>
                <option value="recommendation">Scent Recommendation</option>
                <option value="tracking">Order Tracking &amp; Delivery</option>
                <option value="exchange">Return or Exchange Request</option>
                <option value="bulk">Wedding &amp; Corporate Favors</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Your Message <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="How can we assist you with our artisanal fragrances?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full text-sm p-3 border border-zinc-300 rounded-xl focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 focus:outline-hidden text-zinc-900 transition-all"
                required
                aria-required="true"
                aria-describedby={errorMsg ? "contact-error" : undefined}
              />
            </div>

            {errorMsg && (
              <div
                id="contact-error"
                role="alert"
                aria-live="assertive"
                className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2"
              >
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-zinc-950 text-[#fef08a] font-bold text-sm rounded-xl hover:bg-zinc-800 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-950 focus:outline-hidden"
            >
              <Send className="w-4 h-4 text-[#d4af37]" /> {loading ? "Sending Message..." : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
