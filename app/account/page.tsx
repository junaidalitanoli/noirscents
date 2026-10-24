"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, ShieldCheck, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { BRAND_NAME } from "@/lib/constants";
import { STORE_CONFIG } from "@/lib/store-config";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register" | "track" | "forgot">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const [trackOrderId, setTrackOrderId] = useState("");
  const [trackPhone, setTrackPhone] = useState("");
  const [trackError, setTrackError] = useState("");
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
    setLoginError("");
    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both your email address and password.");
      return;
    }
    setLoginSuccess(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    if (!regFirstName || !regEmail || !regPassword) {
      setRegError("Please fill in all required registration fields.");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters long.");
      return;
    }
    setRegSuccess(true);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      setForgotSubmitted(true);
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError("");
    if (!trackOrderId.trim()) {
      setTrackError("Please provide a valid Order ID to check tracking status.");
      return;
    }
    setTrackingResult({
      orderId: trackOrderId.trim().toUpperCase(),
      status: "Dispatched & In Transit",
      courier: "TCS Express Courier",
      city: "En Route to Destination",
      estimatedDelivery: "24–48 Hours",
      items: "Artisanal Extrait de Parfum (Cash on Delivery)",
    });
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
        <div className="flex border-b border-zinc-200" role="tablist" aria-label="Account navigation options">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "login" || activeTab === "forgot"}
            aria-controls="panel-login"
            id="tab-login"
            onClick={() => setActiveTab("login")}
            className={`py-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer focus:ring-2 focus:ring-black focus:outline-hidden ${
              activeTab === "login" || activeTab === "forgot"
                ? "border-black text-black"
                : "border-transparent text-zinc-400 hover:text-zinc-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "register"}
            aria-controls="panel-register"
            id="tab-register"
            onClick={() => setActiveTab("register")}
            className={`py-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer focus:ring-2 focus:ring-black focus:outline-hidden ${
              activeTab === "register"
                ? "border-black text-black"
                : "border-transparent text-zinc-400 hover:text-zinc-700"
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "track"}
            aria-controls="panel-track"
            id="tab-track"
            onClick={() => setActiveTab("track")}
            className={`py-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer focus:ring-2 focus:ring-black focus:outline-hidden ${
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
              <div id="panel-login" role="tabpanel" aria-labelledby="tab-login">
                {loginSuccess ? (
                  <div className="space-y-4 text-center py-6" role="status" aria-live="polite">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h2 className="text-xl font-bold text-zinc-900">Welcome Back!</h2>
                    <p className="text-xs sm:text-sm text-zinc-600">
                      Logged in as <strong>{loginEmail}</strong>. Your preferred Cash on Delivery addresses and cart preferences are loaded.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        href="/collections/all"
                        className="py-2.5 px-6 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden"
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
                        className="py-2.5 px-6 border border-zinc-300 text-xs font-semibold uppercase tracking-wider text-zinc-700 hover:bg-zinc-50 cursor-pointer focus:ring-2 focus:ring-black focus:outline-hidden"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-lg font-bold text-zinc-950 mb-4">Sign in to your account</h2>

                    {loginError && (
                      <div role="alert" aria-live="assertive" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                        {loginError}
                      </div>
                    )}

                    <div>
                      <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="login-email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        autoComplete="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all text-zinc-900"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                          Password <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab("forgot");
                            setForgotSubmitted(false);
                            setForgotEmail(loginEmail);
                          }}
                          className="text-[11px] text-zinc-500 hover:text-black hover:underline cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-black rounded"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <input
                        id="login-password"
                        name="password"
                        type="password"
                        required
                        aria-required="true"
                        autoComplete="current-password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all text-zinc-900"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors rounded-md mt-2 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden"
                    >
                      Sign In
                    </button>
                    <p className="text-xs text-center text-zinc-500 pt-2">
                      Don&apos;t have an account yet?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("register")}
                        className="font-semibold text-black underline underline-offset-4 cursor-pointer focus:ring-1 focus:ring-black rounded"
                      >
                        Create one now
                      </button>
                    </p>
                  </form>
                )}
              </div>
            )}

            {activeTab === "forgot" && (
              <div id="panel-forgot" role="region" aria-label="Password Reset Request">
                {forgotSubmitted ? (
                  <div className="space-y-4 text-center py-6" role="status" aria-live="polite">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h2 className="text-xl font-bold text-zinc-900">Reset Email Dispatched!</h2>
                    <p className="text-xs sm:text-sm text-zinc-600">
                      If an account exists for <strong>{forgotEmail}</strong>, instructions to set a new password have been dispatched.
                    </p>
                    <div className="pt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className="py-2.5 px-6 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden"
                      >
                        Return to Sign In
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-lg font-bold text-zinc-950">Reset your password</h2>
                      <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className="text-xs text-zinc-500 hover:text-black underline cursor-pointer focus:outline-hidden"
                      >
                        &larr; Back to Sign In
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Enter your account email address below and we will send you a password recovery link.
                    </p>
                    <div>
                      <label htmlFor="forgot-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="forgot-email"
                        name="forgotEmail"
                        type="email"
                        required
                        aria-required="true"
                        autoComplete="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all text-zinc-900"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors rounded-md mt-2 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden"
                    >
                      Send Password Recovery Link
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeTab === "register" && (
              <div id="panel-register" role="tabpanel" aria-labelledby="tab-register">
                {regSuccess ? (
                  <div className="space-y-4 text-center py-6" role="status" aria-live="polite">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h2 className="text-xl font-bold text-zinc-900">Account Created!</h2>
                    <p className="text-xs sm:text-sm text-zinc-600">
                      Welcome to the {BRAND_NAME} family, <strong>{regFirstName}</strong>! Enjoy exclusive sample decanters with your upcoming orders.
                    </p>
                    <div className="pt-4 flex justify-center">
                      <Link
                        href="/collections/all"
                        className="py-2.5 px-6 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <h2 className="text-lg font-bold text-zinc-950 mb-4">Create your customer account</h2>

                    {regError && (
                      <div role="alert" aria-live="assertive" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                        {regError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="reg-first-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                          First Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="reg-first-name"
                          name="firstName"
                          type="text"
                          required
                          aria-required="true"
                          autoComplete="given-name"
                          value={regFirstName}
                          onChange={(e) => setRegFirstName(e.target.value)}
                          placeholder="Ali"
                          className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all text-zinc-900"
                        />
                      </div>
                      <div>
                        <label htmlFor="reg-last-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                          Last Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="reg-last-name"
                          name="lastName"
                          type="text"
                          required
                          aria-required="true"
                          autoComplete="family-name"
                          value={regLastName}
                          onChange={(e) => setRegLastName(e.target.value)}
                          placeholder="Khan"
                          className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all text-zinc-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="reg-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="reg-email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        autoComplete="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all text-zinc-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="reg-phone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Mobile Number <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="reg-phone"
                        name="phone"
                        type="tel"
                        required
                        aria-required="true"
                        aria-describedby="reg-phone-hint"
                        autoComplete="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="0300 1234567"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all text-zinc-900"
                      />
                      <span id="reg-phone-hint" className="text-[11px] text-zinc-500 block mt-1">
                        Format: 03XX-XXXXXXX (used for courier delivery SMS &amp; WhatsApp updates)
                      </span>
                    </div>
                    <div>
                      <label htmlFor="reg-password" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Password <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="reg-password"
                        name="password"
                        type="password"
                        required
                        aria-required="true"
                        aria-describedby="reg-password-hint"
                        autoComplete="new-password"
                        minLength={6}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all text-zinc-900"
                      />
                      <span id="reg-password-hint" className="text-[11px] text-zinc-500 block mt-1">
                        Minimum 6 characters
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors rounded-md mt-2 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden"
                    >
                      Create VIP Account
                    </button>
                    <p className="text-xs text-center text-zinc-500 pt-2">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setActiveTab("login")}
                        className="font-semibold text-black underline underline-offset-4 cursor-pointer focus:ring-1 focus:ring-black rounded"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                )}
              </div>
            )}

            {activeTab === "track" && (
              <div id="panel-track" role="tabpanel" aria-labelledby="tab-track" className="space-y-6">
                <form onSubmit={handleTrack} className="space-y-4">
                  <h2 className="text-lg font-bold text-zinc-950 mb-2">Track Your Fragrance Parcel</h2>
                  <p id="track-order-hint" className="text-xs text-zinc-500">
                    Enter your Order ID (e.g. <code>NS-10482</code>) received via SMS or WhatsApp confirmation.
                  </p>

                  {trackError && (
                    <div role="alert" aria-live="assertive" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                      {trackError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="track-order-id" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Order ID <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="track-order-id"
                      name="orderId"
                      type="text"
                      required
                      aria-required="true"
                      aria-describedby="track-order-hint"
                      value={trackOrderId}
                      onChange={(e) => setTrackOrderId(e.target.value)}
                      placeholder="NS-10482"
                      className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all uppercase font-mono text-zinc-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="track-phone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="track-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      aria-describedby="track-phone-hint"
                      value={trackPhone}
                      onChange={(e) => setTrackPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-4 py-2.5 text-sm border border-zinc-300 rounded-md focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-hidden transition-all text-zinc-900"
                    />
                    <span id="track-phone-hint" className="text-[11px] text-zinc-500 block mt-1">
                      Pakistani mobile number provided during checkout
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#121212] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors rounded-md mt-2 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden"
                  >
                    Check Parcel Status
                  </button>
                </form>

                {trackingResult && (
                  <div className="pt-6 border-t border-zinc-200 space-y-4" role="region" aria-live="polite" aria-label="Order Tracking Status Result">
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
