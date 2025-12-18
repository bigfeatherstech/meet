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
  FiFlag,
  FiTarget,
  FiHeart,
  FiTrendingUp,
  FiStar,
  FiUsers,
  FiAward
} from 'react-icons/fi';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
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
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    contact: false,
    form: false,
    info: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = {
        hero: document.getElementById('contact-hero'),
        contact: document.getElementById('contact-cards'),
        form: document.getElementById('contact-form-section'),
        info: document.getElementById('contact-info')
      };

      const newVisibility = { ...visibleSections };

      Object.keys(sections).forEach(key => {
        const section = sections[key];
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;
          if (isVisible && !newVisibility[key]) {
            newVisibility[key] = true;
          }
        }
      });

      setVisibleSections(newVisibility);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleSections]);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (phoneValue) => {
    setFormData(prev => ({
      ...prev,
      phone: phoneValue || ''
    }));
  };

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

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

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
      color: "from-blue-500 to-cyan-400",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: <FiMail />,
      title: "Email Support",
      details: ["support@meetelectronics.com", "sales@meetelectronics.com"],
      description: "Response within 2 hours during business days",
      color: "from-green-500 to-emerald-400",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: <FiMapPin />,
      title: "Visit Our Store",
      details: ["123 Tech Street, San Francisco, CA 94107", "View on Google Maps"],
      description: "Open Monday to Saturday, 9AM - 9PM",
      color: "from-purple-500 to-pink-400",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: <FiHeadphones />,
      title: "Live Chat",
      details: ["Available on website", "Click the chat icon in bottom-right"],
      description: "Instant response from our support team",
      color: "from-orange-500 to-amber-400",
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
          a: "Visit our setup guides section or download the Meet Electronics app for step-by-step instructions with video tutorials."
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

  const activeCategory = faqCategories.find(cat => cat.id === activeTab);
  const selectedCountry = formData.country
    ? countryOptions.find(option => option.value === formData.country)
    : null;

  const achievements = [
    {
      number: "24/7",
      label: "Support",
      icon: <FiShield />,
      suffix: "",
      color: "text-blue-600"
    },
    {
      number: "< 2h",
      label: "Response Time",
      icon: <FiClock />,
      suffix: "",
      color: "text-green-600"
    },
    {
      number: "98%",
      label: "Satisfaction",
      icon: <FiHeart />,
      suffix: "",
      color: "text-purple-600"
    },
    {
      number: "50+",
      label: "Countries Served",
      icon: <FiGlobe />,
      suffix: "",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner - EXACT SAME AS ABOUT PAGE */}
      <section
        id="contact-hero"
        className={`relative bg-gradient-to-r from-samsung-blue to-blue-800 text-white py-20 md:py-32 overflow-hidden transition-all duration-1000 ${visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="samsung-container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
              Get in <span className="text-cyan-300">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up animate-delay-200">
              Where innovation meets exceptional customer support. We're here to help transform your technology experience.
            </p>
            <button className="bg-white text-samsung-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animate-delay-400 flex items-center gap-2 group">
              Get Instant Help
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Floating Elements - Same as About Page */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-float animate-delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full animate-float animate-delay-2000" />
      </section>

      {/* Achievements Bar - Matching About Page Style */}
      <div className="relative -mt-12 samsung-container">
        <div
          id="contact-cards"
          className={`bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 transform ${visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-samsung-blue/10 text-samsung-blue rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 animate-bounce-in">
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <div className={`text-3xl font-bold ${achievement.color} mb-2 animate-count-up`}>
                {achievement.number}{achievement.suffix}
              </div>
              <div className="text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form & Info Section */}
      <section
        id="contact-form-section"
        className="py-20 samsung-container overflow-hidden"
      >
        <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-1000 ${visibleSections.form ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>

          {/* Left: Contact Form */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-left">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-8 text-lg animate-slide-in-left animate-delay-100">
              Have questions or need assistance? Our team is ready to help you with any inquiries.
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 group">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex p-4 bg-green-100 rounded-full mb-4 animate-bounce-in">
                    <FiCheckCircle className="text-green-600 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <FiUser className="text-gray-400 group-focus-within:text-samsung-blue transition-colors" />
                        Your Name *
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
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <FiMail className="text-gray-400 group-focus-within:text-samsung-blue transition-colors" />
                        Email Address *
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
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <FiFlag className="text-gray-400 group-focus-within:text-samsung-blue transition-colors" />
                        Country *
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

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <FiBriefcase className="text-gray-400 group-focus-within:text-samsung-blue transition-colors" />
                        Company (Optional)
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

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <FiPhone className="text-gray-400 group-focus-within:text-samsung-blue transition-colors" />
                      Phone Number (Optional)
                    </label>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry={formData.country || "US"}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter phone number"
                      className="PhoneInput px-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none transition-all duration-300"
                    />
                  </div>

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
                    className="w-full bg-gradient-to-r from-samsung-blue to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-samsung-blue to-blue-600 rounded-3xl p-8 text-white animate-pulse-gentle">
              <h2 className="text-3xl font-bold mb-6">Quick Contact Channels</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${info.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                        <p className="text-blue-100 text-sm mb-3">{info.description}</p>
                        <div className="space-y-1">
                          {info.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2 text-blue-50 group-hover:text-cyan-200 transition-colors">
                              <span>{detail}</span>
                              <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8 samsung-container mx-auto my-5">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="p-2 bg-samsung-blue/10 rounded-lg">
            <FiMessageSquare className="text-samsung-blue text-2xl" />
          </div>
          <div className=''>
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
        </div>

        <div className="flex justify-center item-center gap-2 mb-6">
          {faqCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === category.id
                  ? 'bg-samsung-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              className="border border-gray-200 rounded-xl p-4 hover:border-samsung-blue hover:bg-blue-50 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-samsung-blue rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-samsung-blue transition-colors duration-300">
                    {faq.q}
                  </h4>
                  <div className="overflow-hidden">
                    <p className="text-gray-600 text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Additional Info Section */}
      <section
        id="contact-info"
        className="py-20 bg-samsung-gray overflow-hidden"
      >
        <div className="samsung-container">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${visibleSections.info ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Global Reach, Local Support</h2>
            <p className="text-xl text-gray-600">
              Our support network spans across continents, ensuring you get help whenever and wherever you need it.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FiGlobe className="text-samsung-blue" />
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: <FiFacebook />, label: 'Facebook', color: 'hover:bg-blue-100 hover:text-blue-600' },
                  { icon: <FiTwitter />, label: 'Twitter', color: 'hover:bg-sky-100 hover:text-sky-500' },
                  { icon: <FiInstagram />, label: 'Instagram', color: 'hover:bg-pink-100 hover:text-pink-500' },
                  { icon: <FiLinkedin />, label: 'LinkedIn', color: 'hover:bg-blue-100 hover:text-blue-700' },
                  { icon: <FiYoutube />, label: 'YouTube', color: 'hover:bg-red-100 hover:text-red-600' }
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
              <p className="text-gray-600">Follow us for updates, tech tips, and exclusive offers.</p>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-samsung-blue to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-6">Subscribe to our newsletter for exclusive deals and tech news</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:border-white transition-all duration-300"
                />
                <button className="w-full bg-white text-samsung-blue py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Subscribe Now
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-samsung-blue hover:bg-blue-50 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiHeadphones className="text-samsung-blue" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Live Chat Now</div>
                      <div className="text-sm text-gray-600">Instant support available</div>
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
                      <div className="font-semibold text-gray-900">Email Support</div>
                      <div className="text-sm text-gray-600">support@meetelectronics.com</div>
                    </div>
                  </div>
                  <FiArrowRight className="text-gray-400 group-hover:text-samsung-blue group-hover:translate-x-1 transition-all duration-300" />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-samsung-blue hover:bg-blue-50 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FiMapPin className="text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">Store Locator</div>
                      <div className="text-sm text-gray-600">Find nearest location</div>
                    </div>
                  </div>
                  <FiArrowRight className="text-gray-400 group-hover:text-samsung-blue group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Matching About Page */}
      <section className="py-20 samsung-container">
        <div className="bg-gradient-to-r from-samsung-blue to-blue-600 rounded-3xl p-12 text-center animate-pulse-gentle">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Our team is dedicated to providing you with the best support experience in the electronics industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-samsung-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-bounce-slow">
              Start Live Chat
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Call Now: +1 (888) 123-4567
            </button>
          </div>
        </div>
      </section>

      {/* Animation Styles - Same as About Page */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseGentle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }
        
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out forwards;
        }
        
        .animate-count-up {
          animation: countUp 0.5s ease-out forwards;
        }
        
        .animate-pulse-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
        
        .animate-delay-100 {
          animation-delay: 100ms;
        }
        
        .animate-delay-200 {
          animation-delay: 200ms;
        }
        
        .animate-delay-300 {
          animation-delay: 300ms;
        }
        
        .animate-delay-400 {
          animation-delay: 400ms;
        }
        
        .animate-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .animate-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;