import React, { useState, useEffect, useMemo } from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiSend,
  FiCheckCircle,
  FiUser,
  FiMessageSquare,
  FiArrowRight,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiGlobe,
  FiChevronRight,
  FiShield,
  FiHeadphones,
  FiBriefcase,
  FiFlag
} from 'react-icons/fi';

// Import phone input and its styles
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Import country list for the dropdown
import countryList from 'react-select-country-list';
import Select from 'react-select';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Country options for the dropdown
  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle phone input change
  const handlePhoneChange = (phoneValue) => {
    setFormData(prev => ({
      ...prev,
      phone: phoneValue || ''
    }));
  };

  // Handle country selection change
  const handleCountryChange = (selectedOption) => {
    const countryCode = selectedOption ? selectedOption.value : '';
    setFormData(prev => ({
      ...prev,
      country: countryCode
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FiPhone />,
      title: "Phone Support",
      details: ["+1 (888) 123-4567", "+1 (888) 987-6543"],
      description: "Available 24/7 for urgent inquiries",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <FiMail />,
      title: "Email Support",
      details: ["support@electrostore.com", "sales@electrostore.com"],
      description: "Response within 2 hours during business days",
      color: "bg-green-500",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: <FiMapPin />,
      title: "Visit Our Store",
      details: ["123 Tech Street, San Francisco, CA 94107", "View on Google Maps"],
      description: "Open Monday to Saturday, 9AM - 9PM",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: <FiHeadphones />,
      title: "Live Chat",
      details: ["Available on website", "Click the chat icon in bottom-right"],
      description: "Instant response from our support team",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-amber-400"
    }
  ];

  const faqCategories = [
    {
      id: 'general',
      title: 'General Inquiries',
      questions: [
        {
          q: "What are your business hours?",
          a: "Our customer service team is available Monday through Friday from 8:00 AM to 8:00 PM EST, and Saturday from 9:00 AM to 5:00 PM EST."
        },
        {
          q: "Do you offer international shipping?",
          a: "Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers."
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      questions: [
        {
          q: "How do I set up my new device?",
          a: "Visit our setup guides section or download the ElectroStore app for step-by-step instructions with video tutorials."
        },
        {
          q: "What if my product isn't working properly?",
          a: "Contact our technical support team within 30 days for troubleshooting or replacement under warranty."
        },
        {
          q: "Do you provide installation services?",
          a: "Yes, we offer professional installation for TVs, home theaters, and smart home systems in select areas."
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day hassle-free return policy. Products must be in original condition with all accessories."
        },
        {
          q: "How long does shipping take?",
          a: "Standard shipping: 3-5 business days. Express shipping: 1-2 business days. International: 7-14 business days."
        },
        {
          q: "Do you offer free shipping?",
          a: "Yes! Free standard shipping on all orders over $99. Free express shipping on orders over $499."
        }
      ]
    }
  ];

  // Get active FAQ category
  const activeCategory = faqCategories.find(cat => cat.id === activeTab);

  // Find selected country object for display
  const selectedCountry = formData.country 
    ? countryOptions.find(option => option.value === formData.country)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-samsung-blue to-blue-600 pt-24 pb-20">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in <span className="text-cyan-300">Touch</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              We're here to help! Whether you have questions about products, need technical support, or want to partner with us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                <FiClock className="animate-spin" />
                <span>24/7 Support Available</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                <FiShield />
                <span>100% Secure Communication</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${info.gradient}`}></div>
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl ${info.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{info.description}</p>
                  <div className="space-y-2">
                    {info.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700 hover:text-samsung-blue transition-colors cursor-pointer group/detail">
                        <span>{detail}</span>
                        <FiChevronRight className="opacity-0 group-hover/detail:opacity-100 transition-all duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-samsung-blue/10 rounded-lg">
                  <FiMessageSquare className="text-samsung-blue text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600">We'll get back to you within 2 hours</p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                    <FiCheckCircle className="text-green-600 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-gray-400 group-focus-within:text-samsung-blue transition-colors duration-300" />
                          Your Name *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <FiMail className="text-gray-400 group-focus-within:text-samsung-blue transition-colors duration-300" />
                          Email Address *
                        </div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Country Field */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <FiFlag className="text-gray-400 group-focus-within:text-samsung-blue transition-colors duration-300" />
                          Country *
                        </div>
                      </label>
                      <Select
                        options={countryOptions}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        placeholder="Select your country"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={{
                          control: (base) => ({
                            ...base,
                            padding: '2px 4px',
                            borderRadius: '12px',
                            borderColor: '#d1d5db',
                            '&:hover': {
                              borderColor: '#1428a0'
                            },
                            '&:focus-within': {
                              borderColor: '#1428a0',
                              boxShadow: '0 0 0 2px rgba(20, 40, 160, 0.2)'
                            }
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? '#1428a0' : state.isFocused ? '#f0f4ff' : 'white',
                            color: state.isSelected ? 'white' : '#374151',
                            '&:hover': {
                              backgroundColor: '#f0f4ff'
                            }
                          })
                        }}
                        required
                      />
                    </div>

                    {/* Company Field */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <FiBriefcase className="text-gray-400 group-focus-within:text-samsung-blue transition-colors duration-300" />
                          Company (Optional)
                        </div>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none transition-all duration-300"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Phone Field with Country Flag */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <FiPhone className="text-gray-400 group-focus-within:text-samsung-blue transition-colors duration-300" />
                        Phone Number (Optional)
                      </div>
                    </label>
                    <div className="PhoneInput">
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry={formData.country || "US"}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none transition-all duration-300"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Country code will update based on your country selection
                    </p>
                  </div>

                  {/* Subject Field - Changed to text input */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none transition-all duration-300"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none transition-all duration-300 resize-none"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-samsung-blue to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ Section */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-samsung-blue to-blue-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {faqCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeTab === category.id
                          ? 'bg-white text-samsung-blue'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {activeCategory?.questions.map((faq, index) => (
                    <div 
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-300 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-semibold mb-2 group-hover:text-cyan-200 transition-colors duration-300">
                            {faq.q}
                          </h4>
                          <div className="overflow-hidden">
                            <p className="text-blue-100 text-sm">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social & Location */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Connect With Us</h3>
                <div className="flex items-center gap-4 mb-8">
                  {[
                    { icon: <FiFacebook />, label: 'Facebook', color: 'text-blue-600' },
                    { icon: <FiTwitter />, label: 'Twitter', color: 'text-sky-500' },
                    { icon: <FiInstagram />, label: 'Instagram', color: 'text-pink-500' },
                    { icon: <FiLinkedin />, label: 'LinkedIn', color: 'text-blue-700' },
                    { icon: <FiYoutube />, label: 'YouTube', color: 'text-red-600' }
                  ].map((social, index) => (
                    <button
                      key={index}
                      className={`p-3 rounded-xl bg-gray-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiGlobe className="text-samsung-blue text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Global Headquarters</h4>
                      <p className="text-gray-600">123 Tech Street, San Francisco, CA 94107</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiClock className="text-samsung-blue text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-gray-600">Mon-Fri: 8AM-8PM EST | Sat: 9AM-5PM EST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                  {/* Map Simulation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FiMapPin className="text-samsung-blue text-6xl mb-4 mx-auto" />
                      <p className="text-gray-700 font-semibold">Interactive Map Here</p>
                      <p className="text-gray-600 text-sm">(Google Maps integration available)</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Flagship Store</h3>
                  <p className="text-gray-600 mb-4">Experience our products firsthand with expert guidance</p>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-samsung-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 group">
                    Get Directions
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-samsung-blue hover:bg-blue-50 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FiPhone className="text-samsung-blue" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Call Now</div>
                        <div className="text-sm text-gray-600">+1 (888) 123-4567</div>
                      </div>
                    </div>
                    <FiArrowRight className="text-gray-400 group-hover:text-samsung-blue group-hover:translate-x-1 transition-all duration-300" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-samsung-blue hover:bg-blue-50 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FiMail className="text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Email Us</div>
                        <div className="text-sm text-gray-600">support@electrostore.com</div>
                      </div>
                    </div>
                    <FiArrowRight className="text-gray-400 group-hover:text-samsung-blue group-hover:translate-x-1 transition-all duration-300" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-samsung-blue hover:bg-blue-50 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FiHeadphones className="text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Live Chat</div>
                        <div className="text-sm text-gray-600">Available 24/7</div>
                      </div>
                    </div>
                    <FiArrowRight className="text-gray-400 group-hover:text-samsung-blue group-hover:translate-x-1 transition-all duration-300" />
                  </button>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-samsung-blue to-blue-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                <p className="text-blue-100 mb-4">Subscribe to our newsletter for exclusive deals and tech news</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:border-white transition-all duration-300"
                  />
                  <button className="w-full bg-white text-samsung-blue py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ElectroStore Support?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're committed to providing the best customer experience in the electronics industry</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "24/7", label: "Support Availability", icon: "🕒" },
              { value: "< 2h", label: "Avg. Response Time", icon: "⚡" },
              { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
              { value: "50+", label: "Countries Served", icon: "🌍" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-samsung-blue mb-2">{stat.value}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;