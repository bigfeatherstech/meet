import React, { useEffect, useState } from 'react';
import { 
  FiTarget, 
  FiHeart, 
  FiUsers, 
  FiAward, 
  FiGlobe, 
  FiShield,
  FiTrendingUp,
  FiStar,
  FiChevronRight,
  FiClock,
  FiTruck,
  FiFileText,
  FiBox,
  FiBriefcase,
  FiLayers,
  FiCheckCircle 
} from 'react-icons/fi';
import { 
  GiAfrica, 
  GiEarthAsiaOceania 
} from "react-icons/gi";

import { 
  FaFlagUsa, 
  FaRegFlag, 
  FaGlobe 
} from "react-icons/fa";

const AboutPage = () => {
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    story: false,
    mission: false,
    values: false,
    team: false
  });
  const [animatedNumbers, setAnimatedNumbers] = useState({
    years: 0,
    countries: 0,
    products: 0
  });

  // Define the same color variables as in HeroSection
  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  // Country data with flag icons
  const countries = [
     { name: 'United States of America (USA)', icon: <FaFlagUsa className="text-xl" />, color: '#3C3B6E' },
     { name: 'United Kingdom (UK)', icon: <FaRegFlag className="text-xl" />, color: '#C8102E' },
     { name: 'Europe', icon: <FaGlobe className="text-xl" />, color: '#003399' },
     { name: 'Africa', icon: <GiAfrica className="text-xl" />, color: '#008751' },
     { name: 'Middle East', icon: <FaRegFlag className="text-xl" />, color: '#007A3D' },
     { name: 'Asia-Pacific', icon: <GiEarthAsiaOceania className="text-xl" />, color: '#FF0000' }
  ];

  useEffect(() => {
    // Trigger animations on scroll
    const handleScroll = () => {
      const sections = {
        hero: document.getElementById('hero-section'),
        story: document.getElementById('story-section'),
        mission: document.getElementById('mission-section'),
        values: document.getElementById('values-section'),
        team: document.getElementById('team-section')
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
    handleScroll(); // Check initial state

    // Number counting animation
    const interval = setInterval(() => {
      setAnimatedNumbers(prev => ({
        years: Math.min(prev.years + 1, 18),
        countries: Math.min(prev.countries + 1, 60),
        products: Math.min(prev.products + 10000, 1000)
      }));
    }, 50);

    // Stop animation after 2 seconds
    setTimeout(() => {
      clearInterval(interval);
      setAnimatedNumbers({
        years: 18,
        countries: 60,
        products: 1000
      });
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const teamMembers = [
    {
      name: "David Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "18+ years in international trade and export management."
    },
    {
      name: "Sarah Wilson",
      role: "Global Operations Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Expert in global logistics and supply chain management."
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Quality Control",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "ISO certified quality specialist with 15+ years experience."
    },
    {
      name: "Priya Kapoor",
      role: "Export Documentation Manager",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Expert in international compliance and documentation."
    }
  ];

  const achievements = [
    { 
      number: animatedNumbers.years, 
      label: "Years in Export Business", 
      icon: <FiBriefcase />,
      suffix: "+"
    },
    { 
      number: animatedNumbers.countries, 
      label: "Countries Served", 
      icon: <FiGlobe />,
      suffix: "+"
    },
    { 
      number: "95%", 
      label: "Client Retention Rate", 
      icon: <FiShield />,
      suffix: ""
    },
    { 
      number: animatedNumbers.products, 
      label: "Product Categories", 
      icon: <FiLayers />,
      suffix: "+"
    }
  ];

  const values = [
    {
      icon: <FiTarget />,
      title: "Quality Excellence",
      description: "Strict quality control standards at every stage of export."
    },
    {
      icon: <FiHeart />,
      title: "Reliable Partnerships",
      description: "Building long-term relationships with global clients."
    },
    {
      icon: <FiStar />,
      title: "Global Expertise",
      description: "18+ years experience in international trade."
    },
    {
      icon: <FiAward />,
      title: "Transparency",
      description: "Clear communication and ethical business practices."
    }
  ];

  const milestones = [
    { year: "2006", event: "Founded in Hong Kong as export specialists" },
    { year: "2010", event: "Expanded to European and US markets" },
    { year: "2014", event: "Established comprehensive quality control system" },
    { year: "2018", event: "Awarded 'Top Export Excellence' recognition" },
    { year: "2023", event: "Serving 60+ countries with 1000+ products" }
  ];

  const exportStrengths = [
    {
      icon: <FiFileText />,
      title: "Export Documentation",
      desc: "Expert handling of all international compliance paperwork"
    },
    {
      icon: <FiTruck />,
      title: "Logistics Coordination",
      desc: "Seamless shipping and customs clearance worldwide"
    },
    {
      icon: <FiBox />,
      title: "Product Sourcing",
      desc: "Strong network of reliable manufacturers and suppliers"
    },
    {
      icon: <FiShield />,
      title: "Quality Assurance",
      desc: "Multiple quality checks before every shipment"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section 
        id="hero-section" 
        className={`relative py-20 md:py-32 overflow-hidden transition-all duration-1000 ${
          visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ 
          background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="samsung-container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up text-white">
              Your Trusted Global Export Partner
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up animate-delay-200">
              Since 2006, delivering quality products from Hong Kong to global markets including USA, UK, Europe, Africa, and beyond.
            </p>
            <button 
              className="bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animate-delay-400"
              style={{ color: bluePrimary }}
            >
              Request Export Consultation
            </button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-float animate-delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full animate-float animate-delay-2000" />
      </section>

      {/* Achievements Bar */}
      <div className="relative -mt-12 samsung-container">
        <div 
          className={`bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 transform ${
            visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 animate-bounce-in"
                style={{ background: `${bluePrimary}10`, color: bluePrimary }}
              >
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2 animate-count-up">
                {achievement.number}{achievement.suffix}
              </div>
              <div className="text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <section 
        id="story-section" 
        className="py-20 samsung-container overflow-hidden"
      >
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
          visibleSections.story ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-left">
              Our Export Journey Since 2006
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg animate-slide-in-left animate-delay-100">
                Established in 2006 and headquartered in Hong Kong, we are an internationally recognized export company 
                specializing in supplying high-quality products to global markets.
              </p>
              <p className="animate-slide-in-left animate-delay-200">
                Over 18 years, we have built strong relationships with manufacturers, suppliers, and buyers across 
                multiple regions including USA, UK, Europe, Africa, Middle East, and Asia-Pacific.
              </p>
              <p className="animate-slide-in-left animate-delay-300">
                Our commitment to quality, ethical business practices, and customer satisfaction has enabled us to 
                expand our global presence while maintaining the highest standards in international trade.
              </p>
            </div>

            {/* Export Strengths */}
            <div className="mt-12 animate-slide-in-left animate-delay-400">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Do</h3>
              <div className="grid grid-cols-2 gap-4">
                {exportStrengths.map((strength, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ background: `${bluePrimary}10`, color: bluePrimary }}>
                        {strength.icon}
                      </div>
                      <h4 className="font-semibold" style={{ color: bluePrimary }}>{strength.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{strength.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Global shipping"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Global Markets Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold mb-4" style={{ color: bluePrimary }}>Global Markets</h3>
                  <div className="space-y-3">
                    {countries.slice(0, 3).map((country, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div style={{ color: country.color }}>{country.icon}</div>
                        <span className="text-sm">{country.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Quality inspection"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover animate-delay-300 hover:scale-105 transition-transform duration-700"
                />
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Warehouse operations"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover animate-delay-400 hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="samsung-container">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: bluePrimary }}>
            Our Export Journey Timeline
          </h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-bluePrimary to-blueSecondary"></div>
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative mb-12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'} animate-timeline-item`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div 
                  className={`absolute top-0 ${index % 2 === 0 ? 'right-[-8px]' : 'left-[-8px]'} w-4 h-4 rounded-full`}
                  style={{ background: bluePrimary }}
                ></div>
                <div 
                  className={`inline-block p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                  }`}
                  style={{ maxWidth: '400px', background: 'white' }}
                >
                  <div className="font-bold text-2xl mb-2" style={{ color: bluePrimary }}>{milestone.year}</div>
                  <p className="text-gray-700">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section 
        id="mission-section" 
        className="py-20 bg-white overflow-hidden my-5"
      >
        <div className="samsung-container mt-5">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600">
              Driving global trade excellence through quality products and reliable partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div 
              className={`bg-white p-8 rounded-2xl shadow-lg border-2 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '100ms', borderColor: `${bluePrimary}20` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="p-3 rounded-xl animate-spin-slow"
                  style={{ background: `${bluePrimary}10`, color: bluePrimary }}
                >
                  <FiTarget className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p className="animate-text-reveal">
                  To deliver high-quality products globally while maintaining transparency, reliability, 
                  and long-term value for our partners through ethical business practices.
                </p>
                <p className="animate-text-reveal animate-delay-100">
                  We ensure product quality at every stage, from sourcing to final delivery, 
                  building lasting global partnerships that exceed customer expectations.
                </p>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-2xl shadow-lg border-2 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '300ms', borderColor: `${blueSecondary}20` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="p-3 rounded-xl animate-pulse"
                  style={{ background: `${blueSecondary}10`, color: blueSecondary }}
                >
                  <FiGlobe className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p className="animate-text-reveal">
                  To become a globally preferred export partner by consistently exceeding customer 
                  expectations and expanding our international footprint.
                </p>
                <p className="animate-text-reveal animate-delay-100">
                  We envision creating seamless global trade connections that empower businesses 
                  worldwide with quality products and reliable export solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="samsung-container">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: bluePrimary }}>
            Why Choose Us as Your Export Partner
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Over 18 years of export experience",
              "Strong supplier and manufacturing network",
              "Strict quality control standards",
              "Competitive pricing",
              "Reliable shipping and documentation support",
              "Long-term client relationships across continents"
            ].map((point, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section 
        id="values-section" 
        className="py-20 samsung-container overflow-hidden"
      >
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
          visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
          <p className="text-xl text-gray-600">
            These principles guide our export operations and client relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group ${
                visibleSections.values ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-bounce-in"
                style={{ background: `${bluePrimary}10`, color: bluePrimary }}
              >
                <span className="text-2xl">{value.icon}</span>
              </div>
              <h3 
                className="text-xl font-bold text-gray-900 mb-4 group-hover:transition-colors duration-300"
                style={{ color: bluePrimary }}
              >
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Markets Section */}
      <section className="py-16 bg-gray-50">
        <div className="samsung-container">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: bluePrimary }}>
            Our Global Markets
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We proudly export to major markets worldwide with our strong logistics network enabling timely and secure deliveries.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {countries.map((country, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ background: `${country.color}10`, color: country.color }}
                  >
                    {country.icon}
                  </div>
                </div>
                <div className="text-sm font-medium">{country.name.split(' ')[0]}</div>
                <div className="text-xs text-gray-500">{country.name.includes('(') ? country.name.split('(')[1].replace(')', '') : ''}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section 
        id="team-section" 
        className="py-20 bg-white overflow-hidden my-5"
      >
        <div className="samsung-container">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            visibleSections.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Export Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to global trade excellence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  visibleSections.team ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <div 
                    className="font-semibold mb-3"
                    style={{ color: bluePrimary }}
                  >
                    {member.role}
                  </div>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                  <div className="mt-4 flex space-x-3">
                    <a 
                      href="#" 
                      className="text-gray-400 hover:transition-colors duration-300 transform hover:scale-110"
                      style={{ color: bluePrimary }}
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:transition-colors duration-300 transform hover:scale-110"
                      style={{ color: bluePrimary }}
                    >
                      <span className="sr-only">Email</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 samsung-container">
        <div 
          className="rounded-3xl p-12 text-center animate-pulse-gentle mb-5"
          style={{ 
            background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`
          }}
        >
          <div className="text-5xl mb-6">📩</div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Looking for a reliable exporter?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your sourcing and export requirements.
            Let's build a successful global partnership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-bounce-slow"
              style={{ color: bluePrimary }}
            >
              Request Export Consultation
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Download Product Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Add custom CSS animations */}
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
        
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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
        
        @keyframes textReveal {
          from {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
          }
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0);
          }
        }
        
        @keyframes timelineItem {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        
        .animate-float-image {
          animation: fadeLeft 1.2s ease-out forwards,
                    float 8s ease-in-out infinite;
        }

        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }
        
        .animate-count-up {
          animation: countUp 0.5s ease-out forwards;
        }
        
        .animate-text-reveal {
          animation: textReveal 0.8s ease-out forwards;
        }
        
        .animate-timeline-item {
          animation: timelineItem 0.6s ease-out forwards;
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

export default AboutPage;

// import React, { useEffect, useState } from 'react';
// import { 
//   FiTarget, 
//   FiHeart, 
//   FiUsers, 
//   FiAward, 
//   FiGlobe, 
//   FiShield,
//   FiTrendingUp,
//   FiStar,
//   FiChevronRight,
//   FiClock
// } from 'react-icons/fi';

// const AboutPage = () => {
//   const [visibleSections, setVisibleSections] = useState({
//     hero: false,
//     story: false,
//     mission: false,
//     values: false,
//     team: false
//   });
//   const [animatedNumbers, setAnimatedNumbers] = useState({
//     customers: 0,
//     partners: 0,
//     products: 0
//   });

//   // Define the same color variables as in HeroSection
//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

//   useEffect(() => {
//     // Trigger animations on scroll
//     const handleScroll = () => {
//       const sections = {
//         hero: document.getElementById('hero-section'),
//         story: document.getElementById('story-section'),
//         mission: document.getElementById('mission-section'),
//         values: document.getElementById('values-section'),
//         team: document.getElementById('team-section')
//       };

//       const newVisibility = { ...visibleSections };
      
//       Object.keys(sections).forEach(key => {
//         const section = sections[key];
//         if (section) {
//           const rect = section.getBoundingClientRect();
//           const isVisible = rect.top < window.innerHeight * 0.8;
//           if (isVisible && !newVisibility[key]) {
//             newVisibility[key] = true;
//           }
//         }
//       });

//       setVisibleSections(newVisibility);
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Check initial state

//     // Number counting animation
//     const interval = setInterval(() => {
//       setAnimatedNumbers(prev => ({
//         customers: Math.min(prev.customers + 250, 50000),
//         partners: Math.min(prev.partners + 5, 100),
//         products: Math.min(prev.products + 10000, 5000000)
//       }));
//     }, 1);

//     // Stop animation after 2 seconds
//     setTimeout(() => {
//       clearInterval(interval);
//       setAnimatedNumbers({
//         customers: 50000,
//         partners: 100,
//         products: 5000000
//       });
//     }, 2000);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       clearInterval(interval);
//     };
//   }, []);

//   const teamMembers = [
//     {
//       name: "Alex Johnson",
//       role: "CEO & Founder",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Former VP at Samsung Electronics with 15+ years in consumer electronics."
//     },
//     {
//       name: "Sarah Chen",
//       role: "CTO",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Expert in AI and IoT with patents in smart home technology."
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Head of Operations",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Supply chain specialist with global logistics experience."
//     },
//     {
//       name: "Priya Patel",
//       role: "Marketing Director",
//       image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Brand strategist with 10+ years in tech marketing."
//     }
//   ];

//   const achievements = [
//     { 
//       number: animatedNumbers.customers.toLocaleString(), 
//       label: "Happy Customers", 
//       icon: <FiUsers />,
//       suffix: "+"
//     },
//     { 
//       number: animatedNumbers.partners, 
//       label: "Brand Partners", 
//       icon: <FiGlobe />,
//       suffix: "+"
//     },
//     { 
//       number: "24/7", 
//       label: "Support", 
//       icon: <FiShield />,
//       suffix: ""
//     },
//     { 
//       number: animatedNumbers.products.toLocaleString(), 
//       label: "Products Sold", 
//       icon: <FiTrendingUp />,
//       suffix: "+"
//     }
//   ];

//   const values = [
//     {
//       icon: <FiTarget />,
//       title: "Innovation First",
//       description: "We constantly push boundaries to bring cutting-edge technology to consumers."
//     },
//     {
//       icon: <FiHeart />,
//       title: "Customer Centric",
//       description: "Every decision we make prioritizes customer satisfaction and experience."
//     },
//     {
//       icon: <FiStar />,
//       title: "Quality Excellence",
//       description: "We maintain the highest standards in product quality and service delivery."
//     },
//     {
//       icon: <FiAward />,
//       title: "Sustainability",
//       description: "Committed to eco-friendly practices and reducing our carbon footprint."
//     }
//   ];

//   const milestones = [
//     { year: "2015", event: "Founded with 5 employees in Silicon Valley" },
//     { year: "2017", event: "Expanded to international markets" },
//     { year: "2019", event: "Launched AI-powered product recommendations" },
//     { year: "2021", event: "Reached 1 million customers milestone" },
//     { year: "2023", event: "Opened flagship store in New York" }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Banner */}
//       <section 
//         id="hero-section" 
//         className={`relative py-20 md:py-32 overflow-hidden transition-all duration-1000 ${
//           visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//         }`}
//         style={{ 
//           background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`
//         }}
//       >
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="samsung-container relative z-10">
//           <div className="max-w-3xl">
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up text-white">
//               About Meet Electronics
//             </h1>
//             <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up animate-delay-200">
//               Where innovation meets everyday life. Transforming technology into seamless experiences since 2015.
//             </p>
//             <button 
//               className="bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animate-delay-400"
//               style={{ color: bluePrimary }}
//             >
//               Explore Our Journey
//             </button>
//           </div>
//         </div>
        
//         {/* Floating Elements */}
//         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full animate-float" />
//         <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-float animate-delay-1000" />
//         <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full animate-float animate-delay-2000" />
//       </section>

//       {/* Achievements Bar */}
//       <div className="relative -mt-12 samsung-container">
//         <div 
//           className={`bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 transform ${
//             visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           {achievements.map((achievement, index) => (
//             <div 
//               key={index}
//               className="text-center group"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div 
//                 className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 animate-bounce-in"
//                 style={{ background: `${bluePrimary}10`, color: bluePrimary }}
//               >
//                 <span className="text-2xl">{achievement.icon}</span>
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-2 animate-count-up">
//                 {achievement.number}{achievement.suffix}
//               </div>
//               <div className="text-gray-600">{achievement.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Our Story */}
//       <section 
//         id="story-section" 
//         className="py-20 samsung-container overflow-hidden"
//       >
//         <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
//           visibleSections.story ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
//         }`}>
//           <div>
//             <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-left">
//               Our Story
//             </h2>
//             <div className="space-y-4 text-gray-600">
//               <p className="text-lg animate-slide-in-left animate-delay-100">
//                 Founded in 2015 by a team of tech enthusiasts, Meet Electronics began as a small startup with a big vision: to make cutting-edge technology accessible to everyone.
//               </p>
//               <p className="animate-slide-in-left animate-delay-200">
//                 What started as a passion project in a garage in Silicon Valley has grown into one of the leading electronics retailers, serving customers across 50+ countries.
//               </p>
//               <p className="animate-slide-in-left animate-delay-300">
//                 Today, we're proud to partner with the world's top electronics brands while maintaining our commitment to exceptional customer service and competitive pricing.
//               </p>
//             </div>

//             {/* Milestones Timeline */}
//             <div className="mt-12 animate-slide-in-left animate-delay-400 pb-5">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <FiClock style={{ color: bluePrimary }} />
//                 Our Journey
//               </h3>
//               <div className="space-y-6 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5" style={{ '--tw-bg-opacity': 1, }}>
//                 {milestones.map((milestone, index) => (
//                   <div 
//                     key={index}
//                     className="relative animate-timeline-item"
//                     style={{ animationDelay: `${index * 200}ms` }}
//                   >
//                     <div 
//                       className="absolute -left-10 top-1 w-6 h-6 rounded-full border-4 border-white animate-pulse"
//                       style={{ backgroundColor: bluePrimary }}
//                     />
//                     <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md group">
//                       <div 
//                         className="font-bold text-lg group-hover:translate-x-2 transition-transform duration-300"
//                         style={{ color: bluePrimary }}
//                       >
//                         {milestone.year}
//                       </div>
//                       <div className="text-gray-700 group-hover:translate-x-2 transition-transform duration-300">
//                         {milestone.event}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="grid grid-cols-2 gap-6">
//               <div className="space-y-6">
//                 <img 
//                   src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                   alt="Our team"
//                   className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
//                 />
//                 <img 
//                   src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                   alt="Our warehouse"
//                   className="rounded-2xl shadow-lg w-full h-48 object-cover animate-delay-200 hover:scale-105 transition-transform duration-700"
//                 />
//               </div>
//               <div className="space-y-6 mt-12">
//                 <img 
//                   src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                   alt="Our products"
//                   className="rounded-2xl shadow-lg w-full h-48 object-cover animate-delay-300 hover:scale-105 transition-transform duration-700"
//                 />
//                 <img 
//                   src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                   alt="Customer service"
//                   className="rounded-2xl shadow-lg w-full h-64 object-cover animate-delay-400 hover:scale-105 transition-transform duration-700"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Mission */}
//       <section 
//         id="mission-section" 
//         className="py-20 bg-gray-50 overflow-hidden mb-5"
//       >
//         <div className="samsung-container mt-5">
//           <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
//             visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}>
//             <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
//             <p className="text-xl text-gray-600">
//               To revolutionize the way people interact with technology by providing innovative solutions that enhance everyday life.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 items-center ">
//             <div 
//               className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
//                 visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//               style={{ animationDelay: '100ms' }}
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 <div 
//                   className="p-3 rounded-xl animate-spin-slow"
//                   style={{ background: `${bluePrimary}10`, color: bluePrimary }}
//                 >
//                   <FiTarget className="text-2xl" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
//               </div>
//               <div className="space-y-4 text-gray-600">
//                 <p className="animate-text-reveal">
//                   We're committed to democratizing access to premium technology by offering the latest electronics at competitive prices, backed by exceptional service.
//                 </p>
//                 <p className="animate-text-reveal animate-delay-100">
//                   Through strategic partnerships with industry leaders and continuous innovation in our operations, we aim to set new standards in the electronics retail space.
//                 </p>
//                 <p className="animate-text-reveal animate-delay-200">
//                   Every product we offer is carefully curated to ensure it meets our high standards of quality, reliability, and value.
//                 </p>
//               </div>
//             </div>

//             <div 
//               className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
//                 visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//               style={{ animationDelay: '300ms' }}
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 <div 
//                   className="p-3 rounded-xl animate-pulse"
//                   style={{ background: `${blueSecondary}10`, color: blueSecondary }}
//                 >
//                   <FiGlobe className="text-2xl" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
//               </div>
//               <div className="space-y-4 text-gray-600">
//                 <p className="animate-text-reveal">
//                   To become the world's most trusted electronics retailer, recognized for our commitment to innovation, customer satisfaction, and sustainable practices.
//                 </p>
//                 <p className="animate-text-reveal animate-delay-100">
//                   We envision a future where technology seamlessly integrates into every aspect of life, making it more efficient, connected, and enjoyable.
//                 </p>
//                 <p className="animate-text-reveal animate-delay-200">
//                   By 2030, we aim to achieve carbon-neutral operations and expand our reach to serve 100+ countries worldwide.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Values */}
//       <section 
//         id="values-section" 
//         className="py-20 samsung-container overflow-hidden"
//       >
//         <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
//           visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}>
//           <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
//           <p className="text-xl text-gray-600">
//             These principles guide everything we do, from product selection to customer service.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {values.map((value, index) => (
//             <div 
//               key={index}
//               className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group ${
//                 visibleSections.values ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//               }`}
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div 
//                 className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-bounce-in"
//                 style={{ background: `${bluePrimary}10`, color: bluePrimary }}
//               >
//                 <span className="text-2xl">{value.icon}</span>
//               </div>
//               <h3 
//                 className="text-xl font-bold text-gray-900 mb-4 group-hover:transition-colors duration-300"
//                 style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//               >
//                 {value.title}
//               </h3>
//               <p className="text-gray-600">{value.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Our Team */}
//       <section 
//         id="team-section" 
//         className="py-20 bg-gray-50 overflow-hidden my-5"
//       >
//         <div className="samsung-container">
//           <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
//             visibleSections.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}>
//             <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Leadership Team</h2>
//             <p className="text-xl text-gray-600">
//               Passionate experts driving innovation and excellence in everything we do.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <div 
//                 key={index}
//                 className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
//                   visibleSections.team ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//                 }`}
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="h-64 overflow-hidden">
//                   <img 
//                     src={member.image}
//                     alt={member.name}
//                     className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
//                   <div 
//                     className="font-semibold mb-3"
//                     style={{ color: bluePrimary }}
//                   >
//                     {member.role}
//                   </div>
//                   <p className="text-gray-600 text-sm">{member.description}</p>
//                   <div className="mt-4 flex space-x-3">
//                     <a 
//                       href="#" 
//                       className="text-gray-400 hover:transition-colors duration-300 transform hover:scale-110"
//                       style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//                     >
//                       <span className="sr-only">LinkedIn</span>
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                       </svg>
//                     </a>
//                     <a 
//                       href="#" 
//                       className="text-gray-400 hover:transition-colors duration-300 transform hover:scale-110"
//                       style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//                     >
//                       <span className="sr-only">Twitter</span>
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-20 samsung-container">
//         <div 
//           className="rounded-3xl p-12 text-center animate-pulse-gentle mb-5"
//           style={{ 
//             background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`
//           }}
//         >
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Join Us in Shaping the Future of Electronics
//           </h2>
//           <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
//             Whether you're looking for the latest tech or want to join our team, we'd love to connect with you.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button 
//               className="bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-bounce-slow"
//               style={{ color: bluePrimary }}
//             >
//               Shop Latest Products
//             </button>
//             <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
//               View Careers
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Add custom CSS animations */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
//           }
//         }
        
//         @keyframes bounceIn {
//           0% {
//             opacity: 0;
//             transform: scale(0.3);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.05);
//           }
//           70% {
//             transform: scale(0.9);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }
        
//         @keyframes spinSlow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         @keyframes countUp {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes textReveal {
//           from {
//             opacity: 0;
//             clip-path: inset(0 100% 0 0);
//           }
//           to {
//             opacity: 1;
//             clip-path: inset(0 0 0 0);
//           }
//         }
        
//         @keyframes timelineItem {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes pulseGentle {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.95;
//           }
//         }
        
//         @keyframes bounceSlow {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slide-in-left {
//           animation: slideInLeft 0.8s ease-out forwards;
//         }
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
        
//         .animate-float-image {
//           animation: fadeLeft 1.2s ease-out forwards,
//                     float 8s ease-in-out infinite;
//         }

//         @keyframes fadeLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-40px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes float {
//           0%   { transform: translateY(0); }
//           50%  { transform: translateY(-10px); }
//           100% { transform: translateY(0); }
//         }
        
//         .animate-bounce-in {
//           animation: bounceIn 0.6s ease-out forwards;
//         }
        
//         .animate-spin-slow {
//           animation: spinSlow 20s linear infinite;
//         }
        
//         .animate-count-up {
//           animation: countUp 0.5s ease-out forwards;
//         }
        
//         .animate-text-reveal {
//           animation: textReveal 0.8s ease-out forwards;
//         }
        
//         .animate-timeline-item {
//           animation: timelineItem 0.6s ease-out forwards;
//         }
        
//         .animate-pulse-gentle {
//           animation: pulseGentle 2s ease-in-out infinite;
//         }
        
//         .animate-bounce-slow {
//           animation: bounceSlow 2s ease-in-out infinite;
//         }
        
//         .animate-delay-100 {
//           animation-delay: 100ms;
//         }
        
//         .animate-delay-200 {
//           animation-delay: 200ms;
//         }
        
//         .animate-delay-300 {
//           animation-delay: 300ms;
//         }
        
//         .animate-delay-400 {
//           animation-delay: 400ms;
//         }
        
//         .animate-delay-1000 {
//           animation-delay: 1000ms;
//         }
        
//         .animate-delay-2000 {
//           animation-delay: 2000ms;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AboutPage;

// import React, { useEffect, useState } from 'react';
// import { 
//   FiTarget, 
//   FiHeart, 
//   FiUsers, 
//   FiAward, 
//   FiGlobe, 
//   FiShield,
//   FiTrendingUp,
//   FiStar,
//   FiChevronRight,
//   FiClock
// } from 'react-icons/fi';

// const AboutPage = () => {
//   const [visibleSections, setVisibleSections] = useState({
//     hero: false,
//     story: false,
//     mission: false,
//     values: false,
//     team: false
//   });
//   const [animatedNumbers, setAnimatedNumbers] = useState({
//     customers: 0,
//     partners: 0,
//     products: 0
//   });

//   useEffect(() => {
//     // Trigger animations on scroll
//     const handleScroll = () => {
//       const sections = {
//         hero: document.getElementById('hero-section'),
//         story: document.getElementById('story-section'),
//         mission: document.getElementById('mission-section'),
//         values: document.getElementById('values-section'),
//         team: document.getElementById('team-section')
//       };

//       const newVisibility = { ...visibleSections };
      
//       Object.keys(sections).forEach(key => {
//         const section = sections[key];
//         if (section) {
//           const rect = section.getBoundingClientRect();
//           const isVisible = rect.top < window.innerHeight * 0.8;
//           if (isVisible && !newVisibility[key]) {
//             newVisibility[key] = true;
//           }
//         }
//       });

//       setVisibleSections(newVisibility);
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Check initial state

//     // Number counting animation
//     const interval = setInterval(() => {
//       setAnimatedNumbers(prev => ({
//         customers: Math.min(prev.customers + 250, 50000),
//         partners: Math.min(prev.partners + 5, 100),
//         products: Math.min(prev.products + 10000, 5000000)
//       }));
//     }, 1);

//     // Stop animation after 2 seconds
//     setTimeout(() => {
//       clearInterval(interval);
//       setAnimatedNumbers({
//         customers: 50000,
//         partners: 100,
//         products: 5000000
//       });
//     }, 2000);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       clearInterval(interval);
//     };
//   }, []);

//   const teamMembers = [
//     {
//       name: "Alex Johnson",
//       role: "CEO & Founder",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Former VP at Samsung Electronics with 15+ years in consumer electronics."
//     },
//     {
//       name: "Sarah Chen",
//       role: "CTO",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Expert in AI and IoT with patents in smart home technology."
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Head of Operations",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Supply chain specialist with global logistics experience."
//     },
//     {
//       name: "Priya Patel",
//       role: "Marketing Director",
//       image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Brand strategist with 10+ years in tech marketing."
//     }
//   ];

//   const achievements = [
//     { 
//       number: animatedNumbers.customers.toLocaleString(), 
//       label: "Happy Customers", 
//       icon: <FiUsers />,
//       suffix: "+"
//     },
//     { 
//       number: animatedNumbers.partners, 
//       label: "Brand Partners", 
//       icon: <FiGlobe />,
//       suffix: "+"
//     },
//     { 
//       number: "24/7", 
//       label: "Support", 
//       icon: <FiShield />,
//       suffix: ""
//     },
//     { 
//       number: animatedNumbers.products.toLocaleString(), 
//       label: "Products Sold", 
//       icon: <FiTrendingUp />,
//       suffix: "+"
//     }
//   ];

//   const values = [
//     {
//       icon: <FiTarget />,
//       title: "Innovation First",
//       description: "We constantly push boundaries to bring cutting-edge technology to consumers."
//     },
//     {
//       icon: <FiHeart />,
//       title: "Customer Centric",
//       description: "Every decision we make prioritizes customer satisfaction and experience."
//     },
//     {
//       icon: <FiStar />,
//       title: "Quality Excellence",
//       description: "We maintain the highest standards in product quality and service delivery."
//     },
//     {
//       icon: <FiAward />,
//       title: "Sustainability",
//       description: "Committed to eco-friendly practices and reducing our carbon footprint."
//     }
//   ];

//   const milestones = [
//     { year: "2015", event: "Founded with 5 employees in Silicon Valley" },
//     { year: "2017", event: "Expanded to international markets" },
//     { year: "2019", event: "Launched AI-powered product recommendations" },
//     { year: "2021", event: "Reached 1 million customers milestone" },
//     { year: "2023", event: "Opened flagship store in New York" }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Banner */}
//       <section 
//         id="hero-section" 
//         className={`relative bg-gradient-to-r from-samsung-blue to-blue-800 text-white py-20 md:py-32 overflow-hidden transition-all duration-1000 ${
//           visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//         }`}
//       >
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="samsung-container relative z-10">
//           <div className="max-w-3xl">
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
//               About Meet Electronics
//             </h1>
//             <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up animate-delay-200">
//               Where innovation meets everyday life. Transforming technology into seamless experiences since 2015.
//             </p>
//             <button className="bg-white text-samsung-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animate-delay-400">
//               Explore Our Journey
//             </button>
//           </div>
//         </div>
        
//         {/* Floating Elements */}
//         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full animate-float" />
//         <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-float animate-delay-1000" />
//         <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full animate-float animate-delay-2000" />
//       </section>

//       {/* Achievements Bar */}
//       <div className="relative -mt-12 samsung-container">
//         <div 
//           className={`bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 transform ${
//             visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           {achievements.map((achievement, index) => (
//             <div 
//               key={index}
//               className="text-center group"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-samsung-blue/10 text-samsung-blue rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 animate-bounce-in">
//                 <span className="text-2xl">{achievement.icon}</span>
//               </div>
//               <div className="text-3xl font-bold text-gray-900 mb-2 animate-count-up">
//                 {achievement.number}{achievement.suffix}
//               </div>
//               <div className="text-gray-600">{achievement.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Our Story */}
//       <section 
//         id="story-section" 
//         className="py-20 samsung-container overflow-hidden"
//       >
//         <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
//           visibleSections.story ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
//         }`}>
//           <div>
//             <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-left">
//               Our Story
//             </h2>
//             <div className="space-y-4 text-gray-600">
//               <p className="text-lg animate-slide-in-left animate-delay-100">
//                 Founded in 2015 by a team of tech enthusiasts, Meet Electronics began as a small startup with a big vision: to make cutting-edge technology accessible to everyone.
//               </p>
//               <p className="animate-slide-in-left animate-delay-200">
//                 What started as a passion project in a garage in Silicon Valley has grown into one of the leading electronics retailers, serving customers across 50+ countries.
//               </p>
//               <p className="animate-slide-in-left animate-delay-300">
//                 Today, we're proud to partner with the world's top electronics brands while maintaining our commitment to exceptional customer service and competitive pricing.
//               </p>
//             </div>

//             {/* Milestones Timeline */}
//             <div className="mt-12 animate-slide-in-left animate-delay-400">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <FiClock className="text-samsung-blue" />
//                 Our Journey
//               </h3>
//               <div className="space-y-6 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-samsung-blue">
//                 {milestones.map((milestone, index) => (
//                   <div 
//                     key={index}
//                     className="relative animate-timeline-item"
//                     style={{ animationDelay: `${index * 200}ms` }}
//                   >
//                     <div className="absolute -left-10 top-1 w-6 h-6 bg-samsung-blue rounded-full border-4 border-white animate-pulse" />
//                     <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md group">
//                       <div className="font-bold text-samsung-blue text-lg group-hover:translate-x-2 transition-transform duration-300">
//                         {milestone.year}
//                       </div>
//                       <div className="text-gray-700 group-hover:translate-x-2 transition-transform duration-300">
//                         {milestone.event}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="grid grid-cols-2 gap-6">
//               <div className="space-y-6">
//                 <img 
//                   src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                   alt="Our team"
//                   className="rounded-2xl shadow-lg w-full h-64 object-cover animate-float-image hover:scale-105 transition-transform duration-700"
//                 />
//                 <img 
//                   src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                   alt="Our warehouse"
//                   className="rounded-2xl shadow-lg w-full h-48 object-cover animate-float-image animate-delay-200 hover:scale-105 transition-transform duration-700"
//                 />
//               </div>
//               <div className="space-y-6 mt-12">
//                 <img 
//                   src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                   alt="Our products"
//                   className="rounded-2xl shadow-lg w-full h-48 object-cover animate-float-image animate-delay-300 hover:scale-105 transition-transform duration-700"
//                 />
//                 <img 
//                   src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                   alt="Customer service"
//                   className="rounded-2xl shadow-lg w-full h-64 object-cover animate-float-image animate-delay-400 hover:scale-105 transition-transform duration-700"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Mission */}
//       <section 
//         id="mission-section" 
//         className="py-20 bg-samsung-gray overflow-hidden"
//       >
//         <div className="samsung-container">
//           <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
//             visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}>
//             <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
//             <p className="text-xl text-gray-600">
//               To revolutionize the way people interact with technology by providing innovative solutions that enhance everyday life.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div 
//               className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
//                 visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//               style={{ animationDelay: '100ms' }}
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-3 bg-samsung-blue/10 text-samsung-blue rounded-xl animate-spin-slow">
//                   <FiTarget className="text-2xl" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
//               </div>
//               <div className="space-y-4 text-gray-600">
//                 <p className="animate-text-reveal">
//                   We're committed to democratizing access to premium technology by offering the latest electronics at competitive prices, backed by exceptional service.
//                 </p>
//                 <p className="animate-text-reveal animate-delay-100">
//                   Through strategic partnerships with industry leaders and continuous innovation in our operations, we aim to set new standards in the electronics retail space.
//                 </p>
//                 <p className="animate-text-reveal animate-delay-200">
//                   Every product we offer is carefully curated to ensure it meets our high standards of quality, reliability, and value.
//                 </p>
//               </div>
//             </div>

//             <div 
//               className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
//                 visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//               style={{ animationDelay: '300ms' }}
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="p-3 bg-blue-600/10 text-blue-600 rounded-xl animate-pulse">
//                   <FiGlobe className="text-2xl" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
//               </div>
//               <div className="space-y-4 text-gray-600">
//                 <p className="animate-text-reveal">
//                   To become the world's most trusted electronics retailer, recognized for our commitment to innovation, customer satisfaction, and sustainable practices.
//                 </p>
//                 <p className="animate-text-reveal animate-delay-100">
//                   We envision a future where technology seamlessly integrates into every aspect of life, making it more efficient, connected, and enjoyable.
//                 </p>
//                 <p className="animate-text-reveal animate-delay-200">
//                   By 2030, we aim to achieve carbon-neutral operations and expand our reach to serve 100+ countries worldwide.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Values */}
//       <section 
//         id="values-section" 
//         className="py-20 samsung-container overflow-hidden"
//       >
//         <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
//           visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}>
//           <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
//           <p className="text-xl text-gray-600">
//             These principles guide everything we do, from product selection to customer service.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {values.map((value, index) => (
//             <div 
//               key={index}
//               className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group ${
//                 visibleSections.values ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//               }`}
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-samsung-blue/10 text-samsung-blue rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-bounce-in">
//                 <span className="text-2xl">{value.icon}</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-samsung-blue transition-colors duration-300">
//                 {value.title}
//               </h3>
//               <p className="text-gray-600">{value.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Our Team */}
//       <section 
//         id="team-section" 
//         className="py-20 bg-samsung-gray overflow-hidden"
//       >
//         <div className="samsung-container">
//           <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
//             visibleSections.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}>
//             <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Leadership Team</h2>
//             <p className="text-xl text-gray-600">
//               Passionate experts driving innovation and excellence in everything we do.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <div 
//                 key={index}
//                 className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
//                   visibleSections.team ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//                 }`}
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="h-64 overflow-hidden">
//                   <img 
//                     src={member.image}
//                     alt={member.name}
//                     className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
//                   <div className="text-samsung-blue font-semibold mb-3">{member.role}</div>
//                   <p className="text-gray-600 text-sm">{member.description}</p>
//                   <div className="mt-4 flex space-x-3">
//                     <a 
//                       href="#" 
//                       className="text-gray-400 hover:text-samsung-blue transition-colors duration-300 transform hover:scale-110"
//                     >
//                       <span className="sr-only">LinkedIn</span>
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                       </svg>
//                     </a>
//                     <a 
//                       href="#" 
//                       className="text-gray-400 hover:text-samsung-blue transition-colors duration-300 transform hover:scale-110"
//                     >
//                       <span className="sr-only">Twitter</span>
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-20 samsung-container">
//         <div className="bg-gradient-to-r from-samsung-blue to-blue-600 rounded-3xl p-12 text-center animate-pulse-gentle">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Join Us in Shaping the Future of Electronics
//           </h2>
//           <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
//             Whether you're looking for the latest tech or want to join our team, we'd love to connect with you.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-samsung-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-bounce-slow">
//               Shop Latest Products
//             </button>
//             <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
//               View Careers
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Add custom CSS animations */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
//           }
//         }
        
//         @keyframes bounceIn {
//           0% {
//             opacity: 0;
//             transform: scale(0.3);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.05);
//           }
//           70% {
//             transform: scale(0.9);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }
        
//         @keyframes spinSlow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         @keyframes countUp {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes textReveal {
//           from {
//             opacity: 0;
//             clip-path: inset(0 100% 0 0);
//           }
//           to {
//             opacity: 1;
//             clip-path: inset(0 0 0 0);
//           }
//         }
        
//         @keyframes timelineItem {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes pulseGentle {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.95;
//           }
//         }
        
//         @keyframes bounceSlow {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slide-in-left {
//           animation: slideInLeft 0.8s ease-out forwards;
//         }
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
        
//        .animate-float-image {
//   animation: fadeLeft 1.2s ease-out forwards,
//              float 8s ease-in-out infinite;
// }

// @keyframes fadeLeft {
//   from {
//     opacity: 0;
//     transform: translateX(-40px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// }

// @keyframes float {
//   0%   { transform: translateY(0); }
//   50%  { transform: translateY(-10px); }
//   100% { transform: translateY(0); }
// }

        
//         .animate-bounce-in {
//           animation: bounceIn 0.6s ease-out forwards;
//         }
        
//         .animate-spin-slow {
//           animation: spinSlow 20s linear infinite;
//         }
        
//         .animate-count-up {
//           animation: countUp 0.5s ease-out forwards;
//         }
        
//         .animate-text-reveal {
//           animation: textReveal 0.8s ease-out forwards;
//         }
        
//         .animate-timeline-item {
//           animation: timelineItem 0.6s ease-out forwards;
//         }
        
//         .animate-pulse-gentle {
//           animation: pulseGentle 2s ease-in-out infinite;
//         }
        
//         .animate-bounce-slow {
//           animation: bounceSlow 2s ease-in-out infinite;
//         }
        
//         .animate-delay-100 {
//           animation-delay: 100ms;
//         }
        
//         .animate-delay-200 {
//           animation-delay: 200ms;
//         }
        
//         .animate-delay-300 {
//           animation-delay: 300ms;
//         }
        
//         .animate-delay-400 {
//           animation-delay: 400ms;
//         }
        
//         .animate-delay-1000 {
//           animation-delay: 1000ms;
//         }
        
//         .animate-delay-2000 {
//           animation-delay: 2000ms;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AboutPage;