"use client";

import React, { useState } from "react";
import { X, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

interface LoginDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginDrawer({ isOpen, onClose }: LoginDrawerProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade">
      <div className="flex-1" onClick={onClose} />

      <aside className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-drawer-right border-l border-neutral-200">
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="text-sm tracking-[0.2em] uppercase font-semibold text-neutral-900">
            {isRegister ? "Create Account" : "Account Login"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="text-center py-4">
              <span className="font-serif text-2xl tracking-[0.25em] font-medium text-neutral-950 block">
                SAHARÉ
              </span>
              <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">
                Original Niche Perfumery
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center text-neutral-800 space-y-2 animate-fade">
                <CheckCircle2 size={40} className="mx-auto text-emerald-600 mb-2" />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Welcome</h3>
                <p className="text-xs text-neutral-500">
                  {isRegister ? "Account created successfully." : "Logged in successfully."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-neutral-900 text-neutral-900"
                    />
                    <Mail size={14} className="absolute right-3 top-3 text-neutral-400" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-neutral-700">
                      Password
                    </label>
                    {!isRegister && (
                      <button
                        type="button"
                        onClick={() => alert("Password reset instructions sent to your email.")}
                        className="text-[11px] text-neutral-500 hover:text-neutral-900 underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-neutral-900 text-neutral-900"
                    />
                    <Lock size={14} className="absolute right-3 top-3 text-neutral-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-950 hover:bg-neutral-800 text-white rounded py-3 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isRegister ? "Create Account" : "Sign In"}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

          <div className="pt-6 border-t border-neutral-100 text-center text-xs text-neutral-600">
            {isRegister ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="font-semibold text-neutral-900 underline hover:text-neutral-700 ml-1"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="font-semibold text-neutral-900 underline hover:text-neutral-700 ml-1"
                >
                  Create one
                </button>
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
