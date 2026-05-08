import { Link } from "react-router-dom";
import {
  Phone,
  MessageSquare,
  Clock,
  Calendar,
  CheckCircle,
  FileText,
  Wrench,
  CreditCard,
  Shield,
  Award,
  Users,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Phone,
      number: 1,
      title: "CONTACT US",
      description: "Reach out via phone, text, or online form",
      details: [
        "Call or text us at (859) 912-0526",
        "Submit a request through our online form",
        "Available 24/7 for emergencies",
        "Get immediate acknowledgment",
      ],
    },
    {
      icon: FileText,
      number: 2,
      title: "ASSESSMENT & QUOTE",
      description: "We evaluate your needs and provide a quote",
      details: [
        "Discuss your specific needs",
        "Get a transparent quote",
        "Schedule a site visit if needed",
        "No hidden fees or surprises",
      ],
    },
    {
      icon: Calendar,
      number: 3,
      title: "SCHEDULE SERVICE",
      description: "Pick a time that works for you",
      details: [
        "Flexible scheduling options",
        "Same-day service available",
        "Emergency response when needed",
        "Reminders before appointment",
      ],
    },
    {
      icon: Wrench,
      number: 4,
      title: "EXPERT SERVICE",
      description: "Professional technicians fix your issue",
      details: [
        "Licensed and insured technicians",
        "Arrive on time with proper tools",
        "Complete work to your satisfaction",
        "Clean up after the job",
      ],
    },
    {
      icon: CheckCircle,
      number: 5,
      title: "QUALITY CHECK",
      description: "We ensure everything is perfect",
      details: [
        "Walk-through with you",
        "Answer any questions",
        "Ensure complete satisfaction",
        "Provide maintenance tips",
      ],
    },
    {
      icon: CreditCard,
      number: 6,
      title: "EASY PAYMENT",
      description: "Simple, transparent billing",
      details: [
        "Multiple payment options",
        "Detailed invoice provided",
        "No payment until satisfied",
        "Warranty on all work",
      ],
    },
  ];

  const guarantees = [
    {
      icon: Clock,
      title: "Fast Response",
      description: "2-hour response time guarantee for all requests",
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "All work is covered by comprehensive insurance",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on every job",
    },
    {
      icon: Users,
      title: "Licensed Pros",
      description: "All technicians are licensed and background-checked",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl mb-6">HOW IT WORKS</h1>
            <p className="text-xl text-gray-300 mb-8">
              Simple, transparent, and reliable property maintenance service
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:8599120526"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call (859) 912-0526</span>
              </a>
              <Link
                to="/request-service"
                className="w-full sm:w-auto px-8 py-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition-colors"
              >
                Request Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">THE PROCESS</h2>
            <p className="text-gray-400">Six simple steps to getting your property fixed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6 hover:border-orange-500 transition-colors"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <Icon className="w-8 h-8 text-orange-500 mb-2" />
                      <h3 className="text-xl mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 pl-16">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="bg-[#0f0f0f] border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">CONTACT OPTIONS</h2>
            <p className="text-gray-400">Choose the method that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 text-center">
              <Phone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl mb-3">CALL</h3>
              <p className="text-gray-400 mb-6">
                Speak directly with our team for immediate assistance
              </p>
              <a
                href="tel:8599120526"
                className="block w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                (859) 912-0526
              </a>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 text-center">
              <MessageSquare className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl mb-3">TEXT</h3>
              <p className="text-gray-400 mb-6">
                Quick and convenient communication via text message
              </p>
              <a
                href="sms:8599120526"
                className="block w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Text Us Now
              </a>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl mb-3">ONLINE</h3>
              <p className="text-gray-400 mb-6">
                Submit a detailed request form at your convenience
              </p>
              <Link
                to="/request-service"
                className="block w-full px-6 py-3 bg-orange-500 hover:bg-orange-500 text-white rounded-lg transition-colors"
              >
                Request Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">OUR GUARANTEES</h2>
            <p className="text-gray-400">What you can expect from every service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <div
                  key={index}
                  className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6 text-center hover:border-orange-500 transition-colors"
                >
                  <Icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">{guarantee.title}</h3>
                  <p className="text-gray-400 text-sm">{guarantee.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-[#0f0f0f] border-t border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">COMMON QUESTIONS</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl mb-2">How quickly can you respond?</h3>
              <p className="text-gray-400">
                We guarantee a response within 2 hours during business hours. For emergencies, we offer 24/7 service with immediate dispatch.
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl mb-2">Do you offer emergency services?</h3>
              <p className="text-gray-400">
                Yes! We're available 24/7 for emergency situations like water leaks, electrical issues, or lock-outs. Call anytime at (859) 912-0526.
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl mb-2">What areas do you service?</h3>
              <p className="text-gray-400">
                We service all residential and commercial properties within the metro area. Contact us to confirm service in your specific location.
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl mb-2">Are your technicians licensed and insured?</h3>
              <p className="text-gray-400">
                Absolutely. All our technicians are licensed, insured, and background-checked. We carry comprehensive liability insurance on all work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">READY TO GET STARTED?</h2>
          <p className="text-xl mb-8 text-orange-50">
            Contact us today and experience the difference professional service makes
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:8599120526"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white text-orange-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call (859) 912-0526</span>
            </a>
            <a
              href="sms:8599120526"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-white text-orange-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Text Us</span>
            </a>
            <Link
              to="/request-service"
              className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-orange-500 rounded-lg transition-colors"
            >
              Request Service Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
