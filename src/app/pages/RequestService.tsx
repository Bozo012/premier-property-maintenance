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
            For immediate assistance, call us at <a href="tel:8599120526" className="text-orange-500">(859) 912-0526</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="bg-orange-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <span className="text-white">Need immediate assistance?</span>
            <div className="flex items-center gap-4">
              <a href="tel:8599120526" className="flex items-center space-x-2 px-6 py-2 bg-white text-orange-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <a href="sms:8599120526" className="flex items-center space-x-2 px-6 py-2 bg-white text-orange-500 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Text Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-4">REQUEST SERVICE</h1>
            <p className="text-gray-400">Fill out the form below and we'll respond within 2 hours</p>
          </div>
        </div>
      </section>
    </div>
  );
}
