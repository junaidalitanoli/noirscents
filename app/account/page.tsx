"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, ShieldCheck, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "track">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const [trackOrderId, setTrackOrderId] = useState("");
  const [trackPhone, setTrackPhone] = useState("");
  const [trackingResult, setTrackingResult] = useState<{
    orderId: string;
    status: string;
    courier: string;
    city: string;
    estimatedDelivery: string;
    items: string;
  } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setLoginSuccess(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regFirstName && regEmail && regPassword) {
      setRegSuccess(true);
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackOrderId.trim()) {
      setTrackingResult({
        orderId: trackOrderId.trim().toUpperCase(),
        status: "Dispatched & In Transit",
        courier: "TCS Express Courier",
        city: "En Route to Destination",
        estimatedDelivery: "24–48 Hours",
        items: "Artisanal Extrait de Parfum (Cash on Delivery)",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
      <Breadcrumbs items={[{ label: "Customer Account" }]} />

      <div className="space-y-8">
        <div className="border-b border-zinc-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
            VIP Patron Lounge
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-950 mt-1">
            Customer Account &amp; Order Tracking
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            Access your order history, manage Cash on Delivery shipping details, and track your fragrant parcels.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex border-b border-zinc-200">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`py-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === "login"
                ? "border-black text-black"
                : "border-transparent text-zinc-400 hover:text-zinc-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`py-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === "register"
                ? "border-black text-black"
                : "border-transparent text-zinc-400 hover:text-zinc-700"
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("track")}
            className={`py-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === "track"
                ? "border-black text-black"
                : "border-transparent text-zinc-400 hover:text-zinc-700"
            }`}
          >
            Track Order
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Form Column */}
          <div className="md:col-span-7 bg-white border border-zinc-200 p-6 sm:p-8 rounded-xl shadow-xs">
            {activeTab === "login" && (
              <div>
                {loginSuccess ? (
                  <div className="space-y-4 text-center py-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h2 className="text-xl font-bold text-zinc-900">Welcome Back!</h2>
                    <p className="text-xs sm:text-sm text-zinc-600">
                      Logged in as <strong>{loginEmail}</strong>. Your preferred Cash on Delivery addresses and cart preferences are loaded.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        href="/collections/all"
                        className="py-2.5 px-6 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                      >
                        Explore Fragrances
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setLoginSuccess(false);
                          setLoginEmail("");
                          setLoginPassword("");
                        }}
                        className="py-2.5 px-6 border border-zinc-300 text-xs font-semibold uppercase tracking-wider text-zinc-700 hover:bg-zinc-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-lg font-bold text-zinc-950 mb-4">Sign in to your account</h2>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:outline-hidden transition-colors"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => alert("Password reset instructions have been sent to your email.")}
                          className="text-[11px] text-zinc-500 hover:text-black hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:outline-hidden transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors rounded-md mt-2"
                    >
                      Sign In
                    </button>
                    <p className="text-xs text-center text-zinc-500 pt-2">
                      Don&apos;t have an account yet?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("register")}
                        className="font-semibold text-black underline underline-offset-4"
                      >
                        Create one now
                      </button>
                    </p>
                  </form>
                )}
              </div>
            )}

            {activeTab === "register" && (
              <div>
                {regSuccess ? (
                  <div className="space-y-4 text-center py-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h2 className="text-xl font-bold text-zinc-900">Account Created!</h2>
                    <p className="text-xs sm:text-sm text-zinc-600">
                      Welcome to the {BRAND_NAME} family, <strong>{regFirstName}</strong>! Enjoy exclusive sample decanters with your upcoming orders.
                    </p>
                    <div className="pt-4 flex justify-center">
                      <Link
                        href="/collections/all"
                        className="py-2.5 px-6 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <h2 className="text-lg font-bold text-zinc-950 mb-4">Create your customer account</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          value={regFirstName}
                          onChange={(e) => setRegFirstName(e.target.value)}
                          placeholder="Ali"
                          className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:outline-hidden transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          value={regLastName}
                          onChange={(e) => setRegLastName(e.target.value)}
                          placeholder="Khan"
                          className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:outline-hidden transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:outline-hidden transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Mobile Number (For Courier COD SMS)
                      </label>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="0300 1234567"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:outline-hidden transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:outline-hidden transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors rounded-md mt-2"
                    >
                      Create VIP Account
                    </button>
                    <p className="text-xs text-center text-zinc-500 pt-2">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className="font-semibold text-black underline underline-offset-4"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                )}
              </div>
            )}

            {activeTab === "track" && (
              <div className="space-y-6">
                <form onSubmit={handleTrack} className="space-y-4">
                  <h2 className="text-lg font-bold text-zinc-950 mb-2">Track Your Fragrance Parcel</h2>
                  <p className="text-xs text-zinc-500">
                    Enter your Order ID (e.g. <code>FN-89210</code>) received via SMS or WhatsApp confirmation.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Order ID
                    </label>
                    <input
                      type="text"
                      required
                      value={trackOrderId}
                      onChange={(e) => setTrackOrderId(e.target.value)}
                      placeholder="FN-10482"
                      className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:outline-hidden transition-colors uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={trackPhone}
                      onChange={(e) => setTrackPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:outline-hidden transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors rounded-md mt-2"
                  >
                    Check Parcel Status
                  </button>
                </form>

                {trackingResult && (
                  <div className="pt-6 border-t border-zinc-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-zinc-900">
                        Order #{trackingResult.orderId}
                      </span>
                      <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-medium">
                        {trackingResult.status}
                      </span>
                    </div>

                    <div className="bg-zinc-50 p-4 rounded-lg space-y-2 text-xs text-zinc-600">
                      <p>
                        <strong>Courier Network:</strong> {trackingResult.courier}
                      </p>
                      <p>
                        <strong>Estimated Transit:</strong> {trackingResult.estimatedDelivery}
                      </p>
                      <p>
                        <strong>Package Contents:</strong> {trackingResult.items}
                      </p>
                    </div>

                    <p className="text-[11px] text-zinc-500">
                      Need urgent dispatch updates? Message our concierge on WhatsApp with your Order ID for real-time tracking links.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Column: VIP Perks & Concierge */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-xl space-y-4 text-xs">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                Noir Scents VIP Privileges
              </div>
              <ul className="space-y-3 text-zinc-600">
                <li className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>Complimentary 2ml discovery spray vials included with every full flacon order.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>Hassle-free 7-Day Scent Exchange guarantee on all full-size bottles nationwide.</span>
                </li>
                <li className="flex items-start gap-2">
                  <User className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>Priority express Cash on Delivery dispatch across 250+ Pakistani cities.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#121212] text-white p-6 rounded-xl space-y-3 text-xs">
              <h3 className="font-bold text-sm text-[#f5e7b2]">WhatsApp Concierge</h3>
              <p className="text-zinc-400 leading-relaxed">
                Have questions about fragrance notes, skin projection, or order changes? Our scent specialists are available Monday to Saturday.
              </p>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 bg-[#25D366] text-white font-semibold rounded-md hover:bg-[#20ba5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
