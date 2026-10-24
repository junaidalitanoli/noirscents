"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  KeyRound,
  Mail,
  RefreshCw,
} from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/formatters";
import { ADMIN_DEMO_PASSWORD } from "@/lib/constants";
import { OrderStatus, Product, Category } from "@/types";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/images";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "inbox">("orders");
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Inbound Resend emails state
  const [inboxEmails, setInboxEmails] = useState<Array<{
    id: string;
    emailId: string;
    from: string;
    to: string[];
    subject: string;
    receivedAt: string;
    text?: string;
    snippet?: string;
  }>>([]);
  const [loadingInbox, setLoadingInbox] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const fetchInbox = async () => {
    setLoadingInbox(true);
    try {
      const res = await fetch("/api/inbox", {
        headers: {
          "x-admin-token": password,
        },
      });
      const data = await res.json();
      if (data.emails) {
        setInboxEmails(data.emails);
      }
    } catch (err) {
      console.error("Failed to load inbox:", err);
    } finally {
      setLoadingInbox(false);
    }
  };

  const { orders, customProducts, updateOrderStatus, addProduct, deleteProduct } =
    useOrderStore();

  const allProducts = [...customProducts, ...INITIAL_PRODUCTS];
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    slug: "",
    category: "men" as Category,
    description: "",
    price50: "2950",
    topNotes: "Bergamot, Saffron",
    heartNotes: "Rose, Cardamom",
    baseNotes: "Oud, Amber",
    longevity: 5,
    projection: "Strong (8-10 Hours)",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError(`Invalid demo password. Please use "${ADMIN_DEMO_PASSWORD}"`);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.slug) {
      alert("Please provide product name and slug");
      return;
    }

    const created: Product = {
      id: `custom-${Date.now()}`,
      slug: newProduct.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: newProduct.name,
      category: newProduct.category,
      description: newProduct.description || "Exclusive handcrafted artisanal fragrance creation.",
      images: [DEFAULT_PRODUCT_IMAGE],
      sizes: [
        { ml: 50, price: Number(newProduct.price50) || 2950 },
      ],
      notes: {
        top: newProduct.topNotes.split(",").map((s) => s.trim()).filter(Boolean),
        heart: newProduct.heartNotes.split(",").map((s) => s.trim()).filter(Boolean),
        base: newProduct.baseNotes.split(",").map((s) => s.trim()).filter(Boolean),
      },
      longevity: Number(newProduct.longevity) || 5,
      projection: newProduct.projection,
      isBestSeller: false,
      isNewArrival: true,
      createdAt: new Date().toISOString(),
    };

    addProduct(created);
    setShowAddProductModal(false);
    alert(`Perfume "${created.name}" created and added to the store catalog!`);
  };

  // Password Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl border border-zinc-200/90 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-[#d4af37] border border-[#d4af37] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-zinc-950">
              Admin Portal
            </h1>
            <p className="text-xs text-zinc-500">
              Authorized university project reviewers &amp; store managers only.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter demo password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  className="w-full text-sm bg-white border border-zinc-300 rounded-xl p-3 pr-10 focus:outline-hidden focus:border-[#d4af37] text-zinc-900"
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-zinc-400 absolute right-3 top-3.5" />
              </div>
              {authError && (
                <p className="text-xs text-red-600 mt-1.5 font-medium">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-zinc-950 text-[#fef08a] font-bold text-sm rounded-xl hover:bg-zinc-800 transition-all shadow-md"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Demo Hint */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 text-center">
            <span>Demo Password: </span>
            <code className="bg-amber-200/60 px-2 py-0.5 rounded font-mono font-bold">
              {ADMIN_DEMO_PASSWORD}
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#b48325]">
            Management Console
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-950 mt-1">
            Store Operations &amp; Live Orders
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Real-time persisted state synced with customer checkout and cart activities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="px-4 py-2 bg-[#09090b] text-[#fef08a] rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#d4af37]" />
            Add New Perfume
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 mt-2">
            {orders.length}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Live customer orders</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 mt-2 text-emerald-900">
            {formatPrice(totalRevenue)}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Cash on Delivery receivables</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Active Products</span>
            <Package className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 mt-2">
            {allProducts.length}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Across 4 categories</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase">
            <span>Average Order</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 mt-2 text-amber-900">
            {formatPrice(averageOrderValue)}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Per checkout basket</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-200 flex gap-4">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "orders"
              ? "border-[#d4af37] text-zinc-950"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Customer Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "products"
              ? "border-[#d4af37] text-zinc-950"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Package className="w-4 h-4" />
          Perfume Catalog ({allProducts.length})
        </button>
        <button
          onClick={() => {
            setActiveTab("inbox");
            fetchInbox();
          }}
          className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "inbox"
              ? "border-[#d4af37] text-zinc-950"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Mail className="w-4 h-4" />
          Received Emails ({inboxEmails.length})
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 uppercase font-semibold text-zinc-500 text-[11px]">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">City / Address</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total (PKR)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-zinc-900">
                      <Link
                        href={`/order-success/${order.id}`}
                        className="text-[#b48325] hover:underline flex items-center gap-1"
                        target="_blank"
                      >
                        {order.id}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <span className="text-[10px] text-zinc-400 font-sans block mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-zinc-900">{order.customer.fullName}</div>
                      <div className="text-zinc-500">{order.customer.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded">
                        {order.customer.city}
                      </span>
                      <p className="text-[11px] text-zinc-500 mt-1 max-w-xs truncate">
                        {order.customer.address}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="space-y-0.5 max-w-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-zinc-700">
                            {item.quantity}x {item.product.name} ({item.size.ml}ml)
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-zinc-950 text-sm">
                      {formatPrice(order.total)}
                      <span className="text-[10px] text-emerald-700 font-normal block">
                        COD
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          order.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "Shipped"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status === "Delivered" && <CheckCircle2 className="w-3 h-3" />}
                        {order.status === "Shipped" && <Truck className="w-3 h-3" />}
                        {order.status === "Pending" && <Clock className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="bg-white border border-zinc-300 rounded-md py-1 px-2 text-xs font-medium text-zinc-800 focus:outline-hidden focus:border-[#d4af37]"
                      >
                        <option value="Pending">Mark Pending</option>
                        <option value="Shipped">Mark Shipped</option>
                        <option value="Delivered">Mark Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 uppercase font-semibold text-zinc-500 text-[11px]">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Pricing</th>
                  <th className="p-4">Longevity</th>
                  <th className="p-4">Projection</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {allProducts.map((p) => {
                  const isCustom = p.id.startsWith("custom-");
                  return (
                    <tr key={p.id} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 bg-zinc-950 rounded-md overflow-hidden shrink-0 border border-zinc-200">
                            <Image
                              src={p.images?.[0] || DEFAULT_PRODUCT_IMAGE}
                              alt={`${p.name} Extrait de Parfum by Noir Scents`}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/products/${p.slug}`}
                              className="font-bold text-zinc-900 hover:text-[#b48325] text-sm"
                              target="_blank"
                            >
                              {p.name}
                            </Link>
                            <span className="text-[11px] text-zinc-500 block truncate max-w-xs">
                              {p.notes.top.join(", ")}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-medium">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-zinc-900">
                          50ml: {formatPrice(p.sizes[0]?.price || 0)}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-zinc-800">{p.longevity}/5</span>
                      </td>
                      <td className="p-4 text-zinc-600 font-medium">
                        {p.projection}
                      </td>
                      <td className="p-4">
                        {isCustom ? (
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete custom product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-[11px] text-zinc-400">Base Catalog</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inbound Messages / Emails Tab */}
      {activeTab === "inbox" && (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
            <div>
              <h3 className="font-heading text-lg font-bold text-zinc-950">Inbound Customer Emails (Resend)</h3>
              <p className="text-xs text-zinc-500">Live emails received via Resend Inbound Webhook (<code className="bg-zinc-100 px-1.5 py-0.5 rounded text-[11px] font-mono text-zinc-800">/api/resend/webhook</code>)</p>
            </div>
            <button
              onClick={fetchInbox}
              disabled={loadingInbox}
              className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-black transition-colors disabled:opacity-50 cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingInbox ? "animate-spin" : ""}`} />
              {loadingInbox ? "Refreshing..." : "Refresh Inbox"}
            </button>
          </div>

          {inboxEmails.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 space-y-2">
              <Mail className="w-10 h-10 text-zinc-300 mx-auto" />
              <p className="font-semibold text-zinc-700">No Inbound Emails Received Yet</p>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Once customer inquiries or test emails arrive via Resend, they will be captured and displayed here in real time.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {inboxEmails.map((msg) => (
                <div key={msg.id} className="py-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-900">{msg.from}</span>
                      <span className="text-zinc-400">&bull;</span>
                      <span className="font-semibold text-[#b48325]">{msg.subject}</span>
                    </div>
                    <span className="text-zinc-400 text-[11px] font-mono">
                      {new Date(msg.receivedAt).toLocaleString("en-PK", { timeZone: "Asia/Karachi" })}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 line-clamp-2">
                    {msg.snippet || msg.text || "No preview available"}
                  </p>
                  {msg.text && (
                    <button
                      onClick={() => setSelectedEmail(selectedEmail === msg.id ? null : msg.id)}
                      className="text-[11px] text-zinc-800 font-semibold underline hover:text-[#b48325] cursor-pointer block"
                    >
                      {selectedEmail === msg.id ? "Hide Full Message" : "View Full Message"}
                    </button>
                  )}
                  {selectedEmail === msg.id && msg.text && (
                    <div className="p-3 bg-zinc-50 rounded-lg text-xs font-mono text-zinc-800 whitespace-pre-wrap border border-zinc-200">
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-heading text-xl font-bold text-zinc-950">
                  Add New Artisanal Perfume
                </h3>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-zinc-400 hover:text-zinc-700"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-zinc-700 mb-1">
                  Perfume Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Musk Oud"
                  value={newProduct.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    setNewProduct({ ...newProduct, name, slug });
                  }}
                  className="w-full p-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-zinc-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={newProduct.slug}
                    onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
                    className="w-full p-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-zinc-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value as Category })
                    }
                    className="w-full p-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-900 font-medium"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="testers">Testers</option>
                    <option value="deals">Deals</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-zinc-700 mb-1">
                  50ml Price (PKR)
                </label>
                <input
                  type="number"
                  value={newProduct.price50}
                  onChange={(e) => setNewProduct({ ...newProduct, price50: e.target.value })}
                  className="w-full p-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-900"
                  required
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-zinc-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the fragrance notes and personality..."
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  className="w-full p-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-zinc-700 mb-1">
                  Top Notes (comma separated)
                </label>
                <input
                  type="text"
                  value={newProduct.topNotes}
                  onChange={(e) => setNewProduct({ ...newProduct, topNotes: e.target.value })}
                  className="w-full p-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-zinc-700 mb-1">
                  Heart Notes (comma separated)
                </label>
                <input
                  type="text"
                  value={newProduct.heartNotes}
                  onChange={(e) => setNewProduct({ ...newProduct, heartNotes: e.target.value })}
                  className="w-full p-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-zinc-700 mb-1">
                  Base Notes (comma separated)
                </label>
                <input
                  type="text"
                  value={newProduct.baseNotes}
                  onChange={(e) => setNewProduct({ ...newProduct, baseNotes: e.target.value })}
                  className="w-full p-2.5 border border-zinc-300 rounded-lg text-sm text-zinc-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border border-zinc-300 rounded-lg text-zinc-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-zinc-950 text-[#fef08a] rounded-lg font-bold shadow-md hover:bg-zinc-800"
                >
                  Create &amp; Publish Perfume
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
