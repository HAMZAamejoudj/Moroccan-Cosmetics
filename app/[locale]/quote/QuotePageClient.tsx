'use client';

import { motion } from 'framer-motion';
import { Send, FileText, CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const REQUEST_TYPE_LABELS: Record<string, string> = {
  'private-label': 'Private label',
  samples: 'Samples',
};

function resolveRequestType(raw: string | null): { value: string; label: string | null } {
  if (raw === 'private-label' || raw === 'samples') {
    return { value: raw, label: REQUEST_TYPE_LABELS[raw] };
  }
  return { value: '', label: null };
}

export default function QuotePageClient() {
  const searchParams = useSearchParams();
  const { value: requestType, label: requestTypeLabel } = resolveRequestType(searchParams.get('type'));

  return (
    <div className="pt-32 pb-24 bg-[#F0F4FF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 font-serif text-[#06142B]">
            Request a <span className="text-[#FF9F68]">Quote</span>
          </h1>
          <p className="text-lg text-[#3B4758] max-w-2xl mx-auto">
            Ready to partner with us? Fill out the form below and our team will get back to you with a tailored quote for
            your business needs.
          </p>
        </motion.div>

        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-[#06142B]/5">
          {requestTypeLabel ? (
            <p className="text-sm font-semibold text-[#06142B]/80 mb-8 pb-6 border-b border-gray-100">
              Request type: {requestTypeLabel}
            </p>
          ) : null}
          <form className="space-y-10">
            <input type="hidden" name="requestType" value={requestType} />

            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#06142B]">
                  <FileText size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#06142B]">Contact Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#06142B]/60">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full bg-[#F0F4FF] border-2 border-transparent rounded-xl px-5 py-4 focus:bg-white focus:border-[#FF9F68] outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#06142B]/60">Business Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-[#F0F4FF] border-2 border-transparent rounded-xl px-5 py-4 focus:bg-white focus:border-[#FF9F68] outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#06142B]/60">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-[#F0F4FF] border-2 border-transparent rounded-xl px-5 py-4 focus:bg-white focus:border-[#FF9F68] outline-none transition-all"
                    placeholder="Your Business Ltd."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#06142B]/60">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full bg-[#F0F4FF] border-2 border-transparent rounded-xl px-5 py-4 focus:bg-white focus:border-[#FF9F68] outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#06142B]">
                  <CheckCircle2 size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#06142B]">Product Interests</h2>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#06142B]/60">
                  What products are you interested in?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Argan Oil', 'Black Soap', 'Rose Water', 'Rhassoul Clay'].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-[#F0F4FF] cursor-pointer hover:bg-[#FF9F68]/10 transition-colors"
                    >
                      <input
                        type="checkbox"
                        name="products"
                        value={item}
                        className="w-5 h-5 rounded border-gray-300 text-[#FF9F68] focus:ring-[#FF9F68]"
                      />
                      <span className="text-sm font-medium text-[#06142B]">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#06142B]/60">Estimated Quantity</label>
                  <select
                    name="quantity"
                    className="w-full bg-[#F0F4FF] border-2 border-transparent rounded-xl px-5 py-4 focus:bg-white focus:border-[#FF9F68] outline-none transition-all appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="">Select amount</option>
                    <option>50 - 100 units</option>
                    <option>100 - 500 units</option>
                    <option>500 - 1000 units</option>
                    <option>1000+ units (Bulk)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#06142B]/60">Service Type</label>
                  <select
                    name="serviceType"
                    className="w-full bg-[#F0F4FF] border-2 border-transparent rounded-xl px-5 py-4 focus:bg-white focus:border-[#FF9F68] outline-none transition-all appearance-none cursor-pointer"
                    defaultValue={requestType === 'private-label' ? 'Private Label (Custom Branding)' : ''}
                  >
                    <option>Wholesale</option>
                    <option>Private Label (Custom Branding)</option>
                    <option>Raw Bulk Material</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-xs font-bold uppercase tracking-wider text-[#06142B]/60">Additional Requirements</label>
                <textarea
                  name="requirements"
                  rows={4}
                  className="w-full bg-[#F0F4FF] border-2 border-transparent rounded-xl px-5 py-4 focus:bg-white focus:border-[#FF9F68] outline-none transition-all resize-none"
                  placeholder="Tell us more about your specific needs..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#06142B] to-[#123A63] hover:shadow-2xl hover:shadow-[#06142B]/30 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg group"
            >
              Submit Quote Request
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
