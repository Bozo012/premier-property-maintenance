import { type ChangeEvent, type FormEvent, useState } from "react";
import { Phone, MessageSquare, CheckCircle } from "lucide-react";

import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, CONTACT_SMS_HREF } from "../config/contact";

type ServiceRequestPayload = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  preferredContactMethod: string;
  customerType: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  accessInstructions: string;
  serviceCategory: string;
  priorityLevel: string;
  problemDescription: string;
  preferredDateTime: string;
  additionalNotes: string;
};

const initialFormData: ServiceRequestPayload = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  emailAddress: "",
  preferredContactMethod: "",
  customerType: "",
  addressLine1: "",
  city: "",
  state: "",
  zipCode: "",
  propertyType: "",
  accessInstructions: "",
  serviceCategory: "",
  priorityLevel: "",
  problemDescription: "",
  preferredDateTime: "",
  additionalNotes: "",
};

const requiredFieldsByStep: Record<number, Array<keyof ServiceRequestPayload>> = {
  1: ["firstName", "lastName", "phoneNumber", "emailAddress", "preferredContactMethod", "customerType"],
  2: ["addressLine1", "city", "state", "zipCode", "propertyType"],
  3: ["serviceCategory", "priorityLevel", "problemDescription"],
};

const trimPayload = (payload: ServiceRequestPayload): ServiceRequestPayload =>
  Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, value.trim()]),
  ) as ServiceRequestPayload;

export default function RequestService() {
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ServiceRequestPayload>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof ServiceRequestPayload) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: event.target.value,
    }));
    setErrorMessage("");
  };

  const validateStep = (step: number) => requiredFieldsByStep[step].every((field) => formData[field].trim());

  const goToStep = (nextStep: number) => {
    if (nextStep > formStep && !validateStep(formStep)) {
      setErrorMessage("Please complete all required fields before continuing.");
      return;
    }

    setErrorMessage("");
    setFormStep(nextStep);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setErrorMessage("Please complete all required fields before submitting your request.");
      return;
    }

    const crmApiUrl = import.meta.env.VITE_CRM_API_URL;

    if (!crmApiUrl) {
      setErrorMessage("Service requests are temporarily unavailable. Please call us for immediate assistance.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${crmApiUrl}/api/v1/service-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimPayload(formData)),
      });

      let responseBody: { success?: boolean; message?: string; error?: string } | null = null;
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        responseBody = await response.json();
      }

      if (!response.ok || responseBody?.success === false) {
        throw new Error(responseBody?.message || responseBody?.error || "Unable to submit your service request right now.");
      }

      setSubmitted(true);
      setFormData(initialFormData);
      setFormStep(1);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your service request right now. Please try again or call us for assistance.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
            For immediate assistance, call us at <a href={CONTACT_PHONE_HREF} className="text-orange-500">{CONTACT_PHONE_DISPLAY}</a>
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormStep(1);
              setErrorMessage("");
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
                href={CONTACT_PHONE_HREF}
                className="flex items-center space-x-2 px-6 py-2 bg-white text-orange-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <a
                href={CONTACT_SMS_HREF}
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
            {errorMessage && (
              <div className="mb-6 rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-3 text-red-200" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Contact Information */}
              {formStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl mb-6 pb-4 border-b border-gray-800">CONTACT INFORMATION</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm text-gray-400 mb-2">First Name *</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={updateField("firstName")}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm text-gray-400 mb-2">Last Name *</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={updateField("lastName")}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={updateField("phoneNumber")}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder={CONTACT_PHONE_DISPLAY}
                      />
                    </div>
                    <div>
                      <label htmlFor="emailAddress" className="block text-sm text-gray-400 mb-2">Email Address *</label>
                      <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        required
                        value={formData.emailAddress}
                        onChange={updateField("emailAddress")}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferredContactMethod" className="block text-sm text-gray-400 mb-2">Preferred Contact Method *</label>
                    <select
                      id="preferredContactMethod"
                      name="preferredContactMethod"
                      required
                      value={formData.preferredContactMethod}
                      onChange={updateField("preferredContactMethod")}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Select method...</option>
                      <option value="phone">Phone Call</option>
                      <option value="text">Text Message</option>
                      <option value="email">Email</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="customerType" className="block text-sm text-gray-400 mb-2">Customer Type *</label>
                    <select
                      id="customerType"
                      name="customerType"
                      required
                      value={formData.customerType}
                      onChange={updateField("customerType")}
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
                    onClick={() => goToStep(2)}
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
                    <label htmlFor="addressLine1" className="block text-sm text-gray-400 mb-2">Property Address *</label>
                    <input
                      id="addressLine1"
                      name="addressLine1"
                      type="text"
                      required
                      value={formData.addressLine1}
                      onChange={updateField("addressLine1")}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label htmlFor="city" className="block text-sm text-gray-400 mb-2">City *</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={updateField("city")}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm text-gray-400 mb-2">State *</label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={updateField("state")}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm text-gray-400 mb-2">ZIP Code *</label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={updateField("zipCode")}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="propertyType" className="block text-sm text-gray-400 mb-2">Property Type *</label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        required
                        value={formData.propertyType}
                        onChange={updateField("propertyType")}
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
                      <label htmlFor="accessInstructions" className="block text-sm text-gray-400 mb-2">Access Instructions</label>
                      <input
                        id="accessInstructions"
                        name="accessInstructions"
                        type="text"
                        value={formData.accessInstructions}
                        onChange={updateField("accessInstructions")}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                        placeholder="Gate code, lockbox, etc."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="flex-1 px-8 py-4 border border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
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
                    <label htmlFor="serviceCategory" className="block text-sm text-gray-400 mb-2">Service Category *</label>
                    <select
                      id="serviceCategory"
                      name="serviceCategory"
                      required
                      value={formData.serviceCategory}
                      onChange={updateField("serviceCategory")}
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
                    <label htmlFor="priorityLevel" className="block text-sm text-gray-400 mb-2">Priority Level *</label>
                    <select
                      id="priorityLevel"
                      name="priorityLevel"
                      required
                      value={formData.priorityLevel}
                      onChange={updateField("priorityLevel")}
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
                    <label htmlFor="problemDescription" className="block text-sm text-gray-400 mb-2">Problem Description *</label>
                    <textarea
                      id="problemDescription"
                      name="problemDescription"
                      required
                      rows={5}
                      value={formData.problemDescription}
                      onChange={updateField("problemDescription")}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      placeholder="Please describe the issue in detail..."
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredDateTime" className="block text-sm text-gray-400 mb-2">Preferred Date/Time</label>
                    <input
                      id="preferredDateTime"
                      name="preferredDateTime"
                      type="datetime-local"
                      value={formData.preferredDateTime}
                      onChange={updateField("preferredDateTime")}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="additionalNotes" className="block text-sm text-gray-400 mb-2">Additional Notes</label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={updateField("additionalNotes")}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                      placeholder="Any other information we should know..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      disabled={isSubmitting}
                      className="flex-1 px-8 py-4 border border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
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
