import { useState } from "react";
import { Phone, MessageSquare, Upload, CheckCircle } from "lucide-react";

export default function RequestService() {
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-[#0f0f0f] border border-orange-500 rounded-lg p-12 text-center">
          <CheckCircle className="w-20 h-20 text-orange-500 mx-auto mb-6" />
          <h2 className="text-4xl mb-4">REQUEST RECEIVED</h2>
          <p className="text-xl text-gray-300 mb-6">
            Thank you for your service request. We'll contact you within 2 hours.
          </p>
          <p className="text-gray-400 mb-8">
            For immediate assistance, call us at <a href="tel:+1234567890" className="text-orange-500">(859) 912-0526</a>
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormStep(1);
            }}
            className="px-8 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Quick Contact Banner */}
      <div className="bg-orange-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <span className="text-white">Need immediate assistance?</span>
            <div className="flex items-center gap-4">
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 px-6 py-2 bg-white text-orange-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <a
                href="sms:+1234567890"
                className="flex items-center space-x-2 px-6 py-2 bg-white text-orange-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Text Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-4">REQUEST SERVICE</h1>
            <p className="text-gray-400">Fill out the form below and we'll respond within 2 hours</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${formStep >= 1 ? "text-orange-500" : "text-gray-500"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  formStep >= 1 ? "border-orange-500 bg-orange-500 text-white" : "border-gray-500"
                }`}>
                  1
                </div>
                <span className="hidden sm:inline">Contact</span>
              </div>
              <div className={`w-12 h-0.5 ${formStep >= 2 ? "bg-orange-500" : "bg-gray-700"}`} />
              <div className={`flex items-center space-x-2 ${formStep >= 2 ? "text-orange-500" : "text-gray-500"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  formStep >= 2 ? "border-orange-500 bg-orange-500 text-white" : "border-gray-500"
                }`}>
                  2
                </div>
                <span className="hidden sm:inline">Property</span>
              </div>
              <div className={`w-12 h-0.5 ${formStep >= 3 ? "bg-orange-500" : "bg-gray-700"}`} />
              <div className={`flex items-center space-x-2 ${formStep >= 3 ? "text-orange-500" : "text-gray-500"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  formStep >= 3 ? "border-orange-500 bg-orange-500 text-white" : "border-gray-500"
                }`}>
                  3
                </div>
                <span className="hidden sm:inline">Service Details</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Contact Information */}
              {formStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl mb-6 pb-4 border-b border-gray-800">CONTACT INFORMATION</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="(859) 912-0526"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Preferred Contact Method *</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Select method...</option>
                      <option value="phone">Phone Call</option>
                      <option value="text">Text Message</option>
                      <option value="email">Email</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Customer Type *</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Select type...</option>
                      <option value="homeowner">Homeowner</option>
                      <option value="tenant">Tenant</option>
                      <option value="landlord">Landlord/Property Manager</option>
                      <option value="business">Business Owner</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    Next: Property Information
                  </button>
                </div>
              )}

              {/* Step 2: Property Information */}
              {formStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl mb-6 pb-4 border-b border-gray-800">PROPERTY INFORMATION</h2>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Property Address *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-sm text-gray-400 mb-2">City *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">State *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Property Type *</label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="">Select type...</option>
                        <option value="single-family">Single Family Home</option>
                        <option value="multi-family">Multi-Family</option>
                        <option value="condo">Condo/Townhouse</option>
                        <option value="apartment">Apartment</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Access Instructions</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="Gate code, lockbox, etc."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="flex-1 px-8 py-4 border border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="flex-1 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      Next: Service Details
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Service Details */}
              {formStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl mb-6 pb-4 border-b border-gray-800">SERVICE DETAILS</h2>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Service Category *</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Select category...</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="hvac">HVAC</option>
                      <option value="painting">Painting</option>
                      <option value="carpentry">Carpentry</option>
                      <option value="general">General Repair</option>
                      <option value="emergency">Emergency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Priority Level *</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Select priority...</option>
                      <option value="emergency">Emergency (Immediate)</option>
                      <option value="urgent">Urgent (Within 24 hours)</option>
                      <option value="normal">Normal (Within 3-5 days)</option>
                      <option value="low">Low (Flexible timing)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Problem Description *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      placeholder="Please describe the issue in detail..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Preferred Date/Time</label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-4">Upload Photos (Optional)</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Additional Notes</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      placeholder="Any other information we should know..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="flex-1 px-8 py-4 border border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>
              By submitting this form, you agree to our terms of service and privacy policy.
              We'll contact you within 2 hours during business hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
