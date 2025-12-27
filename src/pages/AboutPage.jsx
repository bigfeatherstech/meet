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
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-left mt-[12%]">
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
      <section className="py-16 bg-gray-50 mt-[5%]">
        <div className="samsung-container">
          <h2 className="text-3xl font-bold text-center mb-12 " style={{ color: bluePrimary }}>
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
        className="py-20 samsung-container overflow-hidden "
      >
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
          visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-[10%]">Our Core Values</h2>
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
      <section className="py-16 bg-gray-50 mt-[5%]">
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
      <section className="py-20 samsung-container mb-10">
        <div 
          className="rounded-3xl p-12 text-center animate-pulse-gentle mb-20"
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










// import React, { useEffect, useState, useRef } from 'react';
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
//   FiClock,
//   FiTruck,
//   FiFileText,
//   FiBox,
//   FiBriefcase,
//   FiLayers,
//   FiCheckCircle,
//   FiArrowRight,
//   FiPlay,
//   FiMapPin,
//   FiZap,
//   FiTrendingDown,
//   FiRefreshCw,
//   FiPercent,
//   FiShoppingBag,
//   FiAnchor,
//   FiDollarSign,
//   FiChevronDown,
//   FiThumbsUp,
//   FiPackage,
//   FiDownload,
//   FiEye,
//   FiUser,
//   FiHome,
//   FiCompass
// } from 'react-icons/fi';
// import { 
//   GiAfrica, 
//   GiEarthAsiaOceania,
//   GiRank3,
//   GiRank2,
//   GiRank1,
//   GiWorld,
//   GiDeliveryDrone,
//   GiFactory,
//   GiCargoShip
// } from "react-icons/gi";

// import { 
//   FaFlagUsa, 
//   FaRegFlag, 
//   FaGlobe,
//   FaLinkedin,
//   FaEnvelope,
//   FaShippingFast,
//   FaChartLine,
//   FaHandshake
// } from "react-icons/fa";

// const AboutPage = () => {
//   const [visibleSections, setVisibleSections] = useState({
//     hero: false,
//     story: false,
//     mission: false,
//     values: false,
//     team: false
//   });
//   const [animatedNumbers, setAnimatedNumbers] = useState({
//     years: 0,
//     countries: 0,
//     products: 0
//   });
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [activeMilestone, setActiveMilestone] = useState(0);
//   const [hoveredTeam, setHoveredTeam] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollProgress, setScrollProgress] = useState(0);

//   // Define the same color variables as in HeroSection
//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

//   // Mouse tracking for interactive effects
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 20,
//         y: (e.clientY / window.innerHeight - 0.5) * 20
//       });
//     };

//     const handleScroll = () => {
//       const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//       const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//       const scrolled = (winScroll / height) * 100;
//       setScrollProgress(scrolled);

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
//           const isVisible = rect.top < window.innerHeight * 0.75;
//           if (isVisible && !newVisibility[key]) {
//             newVisibility[key] = true;
//           }
//         }
//       });

//       setVisibleSections(newVisibility);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);
    
//     // Trigger initial state
//     handleScroll();

//     // Number counting animation
//     const interval = setInterval(() => {
//       setAnimatedNumbers(prev => ({
//         years: Math.min(prev.years + 1, 18),
//         countries: Math.min(prev.countries + 1, 60),
//         products: Math.min(prev.products + 10000, 1000)
//       }));
//     }, 30);

//     // Auto-rotate milestones
//     const milestoneInterval = setInterval(() => {
//       setActiveMilestone(prev => (prev + 1) % milestones.length);
//     }, 4000);

//     setTimeout(() => {
//       clearInterval(interval);
//       setAnimatedNumbers({
//         years: 18,
//         countries: 60,
//         products: 1000
//       });
//     }, 2000);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//       clearInterval(interval);
//       clearInterval(milestoneInterval);
//     };
//   }, []);

//   // Country data with enhanced details
//   const countries = [
//     { 
//       name: 'United States of America (USA)', 
//       icon: <FaFlagUsa className="text-2xl" />, 
//       color: '#3C3B6E',
//       clients: '250+',
//       shipping: '2-3 days',
//       volume: 'High',
//       trend: '+15%'
//     },
//     { 
//       name: 'United Kingdom (UK)', 
//       icon: <FaRegFlag className="text-2xl" />, 
//       color: '#C8102E',
//       clients: '180+',
//       shipping: '3-4 days',
//       volume: 'Medium',
//       trend: '+8%'
//     },
//     { 
//       name: 'Europe', 
//       icon: <FaGlobe className="text-2xl" />, 
//       color: '#003399',
//       clients: '320+',
//       shipping: '3-5 days',
//       volume: 'High',
//       trend: '+12%'
//     },
//     { 
//       name: 'Africa', 
//       icon: <GiAfrica className="text-2xl" />, 
//       color: '#008751',
//       clients: '150+',
//       shipping: '7-10 days',
//       volume: 'Growing',
//       trend: '+25%'
//     },
//     { 
//       name: 'Middle East', 
//       icon: <FaRegFlag className="text-2xl" />, 
//       color: '#007A3D',
//       clients: '90+',
//       shipping: '5-7 days',
//       volume: 'Medium',
//       trend: '+18%'
//     },
//     { 
//       name: 'Asia-Pacific', 
//       icon: <GiEarthAsiaOceania className="text-2xl" />, 
//       color: '#FF0000',
//       clients: '210+',
//       shipping: '2-4 days',
//       volume: 'High',
//       trend: '+20%'
//     }
//   ];

//   const teamMembers = [
//     {
//       name: "David Chen",
//       role: "CEO & Founder",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "18+ years in international trade and export management.",
//       expertise: ["Global Trade", "Business Strategy", "Market Expansion"],
//       quote: "Quality is not an act, it's a habit."
//     },
//     {
//       name: "Sarah Wilson",
//       role: "Global Operations Director",
//       image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Expert in global logistics and supply chain management.",
//       expertise: ["Logistics", "Supply Chain", "Operations"],
//       quote: "Efficiency is doing things right; effectiveness is doing the right things."
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Head of Quality Control",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "ISO certified quality specialist with 15+ years experience.",
//       expertise: ["Quality Assurance", "ISO Standards", "Compliance"],
//       quote: "Perfection is not attainable, but if we chase perfection we can catch excellence."
//     },
//     {
//       name: "Priya Kapoor",
//       role: "Export Documentation Manager",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       description: "Expert in international compliance and documentation.",
//       expertise: ["Documentation", "Compliance", "Legal"],
//       quote: "The devil is in the details, but so is salvation."
//     }
//   ];

//   // Enhanced achievements with progress indicators
//   const achievements = [
//     { 
//       number: animatedNumbers.years, 
//       label: "Years in Export Business", 
//       icon: <FiBriefcase />,
//       suffix: "+",
//       description: "Industry experience",
//       progress: 100
//     },
//     { 
//       number: animatedNumbers.countries, 
//       label: "Countries Served", 
//       icon: <FiGlobe />,
//       suffix: "+",
//       description: "Global presence",
//       progress: 95
//     },
//     { 
//       number: "95%", 
//       label: "Client Retention Rate", 
//       icon: <FiShield />,
//       suffix: "",
//       description: "Customer satisfaction",
//       progress: 95
//     },
//     { 
//       number: animatedNumbers.products, 
//       label: "Product Categories", 
//       icon: <FiLayers />,
//       suffix: "+",
//       description: "Export range",
//       progress: 90
//     }
//   ];

//   // Enhanced values with gradients
//   const values = [
//     {
//       icon: <FiTarget />,
//       title: "Quality Excellence",
//       description: "Strict quality control standards at every stage of export.",
//       gradient: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})`
//     },
//     {
//       icon: <FiHeart />,
//       title: "Reliable Partnerships",
//       description: "Building long-term relationships with global clients.",
//       gradient: `linear-gradient(135deg, ${blueSecondary}, #4CAF50)`
//     },
//     {
//       icon: <FiStar />,
//       title: "Global Expertise",
//       description: "18+ years experience in international trade.",
//       gradient: `linear-gradient(135deg, ${blueDark}, ${bluePrimary})`
//     },
//     {
//       icon: <FiAward />,
//       title: "Transparency",
//       description: "Clear communication and ethical business practices.",
//       gradient: `linear-gradient(135deg, ${bluePrimary}, #2196F3)`
//     }
//   ];

//   // Enhanced milestones
//   const milestones = [
//     { 
//       year: "2006", 
//       event: "Founded in Hong Kong as export specialists",
//       icon: <GiRank3 />,
//       highlight: "Founding Year"
//     },
//     { 
//       year: "2010", 
//       event: "Expanded to European and US markets",
//       icon: <GiRank2 />,
//       highlight: "Global Expansion"
//     },
//     { 
//       year: "2014", 
//       event: "Established comprehensive quality control system",
//       icon: <GiRank1 />,
//       highlight: "Quality Milestone"
//     },
//     { 
//       year: "2018", 
//       event: "Awarded 'Top Export Excellence' recognition",
//       icon: <FiAward />,
//       highlight: "Industry Recognition"
//     },
//     { 
//       year: "2023", 
//       event: "Serving 60+ countries with 1000+ products",
//       icon: <FiGlobe />,
//       highlight: "Global Leadership"
//     }
//   ];

//   // Enhanced export strengths
//   const exportStrengths = [
//     {
//       icon: <FiFileText />,
//       title: "Export Documentation",
//       desc: "Expert handling of all international compliance paperwork",
//       stats: "100% Accuracy",
//       iconBg: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})`
//     },
//     {
//       icon: <FiTruck />,
//       title: "Logistics Coordination",
//       desc: "Seamless shipping and customs clearance worldwide",
//       stats: "99% On-time",
//       iconBg: `linear-gradient(135deg, ${blueSecondary}, #4CAF50)`
//     },
//     {
//       icon: <FiBox />,
//       title: "Product Sourcing",
//       desc: "Strong network of reliable manufacturers and suppliers",
//       stats: "1000+ Partners",
//       iconBg: `linear-gradient(135deg, ${blueDark}, ${bluePrimary})`
//     },
//     {
//       icon: <FiShield />,
//       title: "Quality Assurance",
//       desc: "Multiple quality checks before every shipment",
//       stats: "ISO Certified",
//       iconBg: `linear-gradient(135deg, ${bluePrimary}, #2196F3)`
//     }
//   ];

//   // Certifications with icons
//   const certifications = [
//     { name: "ISO 9001:2015", color: bluePrimary, icon: <FiCheckCircle /> },
//     { name: "Export License", color: blueSecondary, icon: <FiFileText /> },
//     { name: "Customs Broker", color: blueDark, icon: <FiUser /> },
//     { name: "Trade Compliance", color: '#2196F3', icon: <FiShield /> }
//   ];

//   // Interactive Progress Bar
//   const ProgressBar = ({ percentage, color = bluePrimary }) => (
//     <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
//       <div 
//         className="h-full rounded-full transition-all duration-1000 ease-out"
//         style={{ 
//           width: `${percentage}%`,
//           background: `linear-gradient(to right, ${color}, ${blueSecondary})`
//         }}
//       ></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//       {/* Scroll Progress Indicator */}
//       <div className="fixed top-0 left-0 right-0 h-1 z-50">
//         <div 
//           className="h-full transition-all duration-300"
//           style={{ 
//             width: `${scrollProgress}%`,
//             background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
//           }}
//         />
//       </div>

//       {/* Interactive Background Particles */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 rounded-full animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               background: `radial-gradient(circle, ${bluePrimary}40, transparent)`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Hero Banner - Enhanced with 3D effect */}
//       <section 
//         id="hero-section" 
//         className={`relative py-16 md:py-28 lg:py-32 overflow-hidden transition-all duration-1000 ${
//           visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//         }`}
//         style={{ 
//           background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`
//         }}
//       >
//         {/* Animated gradient overlay */}
//         <div 
//           className="absolute inset-0 opacity-30"
//           style={{
//             background: `linear-gradient(45deg, transparent 30%, ${bluePrimary}20 50%, transparent 70%)`,
//             animation: 'shimmer 8s infinite'
//           }}
//         />
        
//         <div className="samsung-container relative z-10">
//           <div className="max-w-3xl">
//             {/* Animated Badge */}
//             <div 
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-lg mb-8 border border-white/30 animate-fade-in-up hover:scale-105 transition-transform duration-300 cursor-pointer group"
//               style={{ 
//                 background: `linear-gradient(135deg, ${blueSecondary}30, ${bluePrimary}40)`,
//                 color: 'white',
//                 boxShadow: '0 10px 30px rgba(0, 61, 130, 0.3)'
//               }}
//             >
//               <div className="relative">
//                 <FiTarget className="text-xl animate-spin-slow" />
//                 <div className="absolute inset-0 animate-ping opacity-20"></div>
//               </div>
//               <span className="font-bold tracking-wider">YOUR TRUSTED GLOBAL EXPORT PARTNER</span>
//               <FiChevronDown className="text-lg animate-bounce group-hover:translate-y-1 transition-transform" />
//             </div>

//             {/* Enhanced Title with Gradient */}
//             <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight animate-fade-in-up text-white">
//               Global Export Excellence{' '}
//               <span className="relative inline-block">
//                 <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
//                   Since 2006
//                 </span>
//                 <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full animate-pulse"
//                       style={{ background: `linear-gradient(to right, white, ${blueSecondary})` }}></span>
//                 <span className="absolute -inset-4 bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-xl rounded-full"></span>
//               </span>
//             </h1>

//             <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 animate-fade-in-up animate-delay-200 leading-relaxed">
//               Since 2006, delivering quality products from Hong Kong to global markets including USA, UK, Europe, Africa, and beyond.
//             </p>

//             {/* Enhanced Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-400">
//               <button 
//                 className="group relative bg-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-xl overflow-hidden"
//                 style={{ color: bluePrimary }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
//                 <span className="relative z-10 flex items-center gap-3">
//                   Request Export Consultation
//                   <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
//                 </span>
//               </button>
//               <button className="group relative bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <span className="relative z-10 flex items-center gap-3">
//                   <FiPlay className="group-hover:scale-110 transition-transform" />
//                   Watch Our Story
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* 3D Floating Elements */}
//         <div className="absolute top-20 right-20 w-64 h-64 md:w-96 md:h-96">
//           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full animate-float"
//                style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}></div>
//         </div>
//         <div className="absolute bottom-20 left-20 w-48 h-48 md:w-64 md:h-64">
//           <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-full animate-float animate-delay-1000"
//                style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}></div>
//         </div>
//       </section>

//       {/* Enhanced Achievements Bar with Glass Morphism */}
//       <div className="relative -mt-8 md:-mt-12 samsung-container px-4">
//         <div 
//           className={`bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 transition-all duration-1000 transform border border-white/20 ${
//             visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//           style={{ boxShadow: '0 20px 60px rgba(0, 61, 130, 0.15)' }}
//         >
//           {achievements.map((achievement, index) => (
//             <div 
//               key={index}
//               className="text-center group relative"
//               style={{ animationDelay: `${index * 100}ms` }}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               {/* Hover Effect Background */}
//               <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
//                 hoveredCard === index ? 'opacity-100' : 'opacity-0'
//               }`}
//                    style={{ 
//                      background: `linear-gradient(135deg, ${bluePrimary}10, ${blueSecondary}10)`,
//                      boxShadow: hoveredCard === index ? `0 15px 40px ${bluePrimary}20` : 'none'
//                    }}></div>
              
//               <div className="relative">
//                 <div 
//                   className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
//                     hoveredCard === index ? 'shadow-lg' : ''
//                   }`}
//                   style={{ 
//                     background: `linear-gradient(135deg, ${bluePrimary}15, ${blueSecondary}20)`,
//                     color: bluePrimary,
//                     border: `2px solid ${bluePrimary}30`
//                   }}
//                 >
//                   <span className="text-2xl md:text-3xl">{achievement.icon}</span>
//                 </div>
                
//                 <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 animate-count-up">
//                   {achievement.number}{achievement.suffix}
//                 </div>
                
//                 <div className="text-gray-600 text-sm md:text-base mb-3">{achievement.label}</div>
                
//                 {/* Progress Bar */}
//                 <div className="px-2">
//                   <ProgressBar percentage={achievement.progress} color={bluePrimary} />
//                 </div>
                
//                 <div className="mt-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   {achievement.description}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Enhanced Our Story Section with Parallax */}
//       <section 
//         id="story-section" 
//         className="py-20 md:py-28 samsung-container overflow-hidden relative"
//       >
//         {/* Background Pattern */}
//         <div className="absolute top-20 right-0 w-64 h-64 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `radial-gradient(${bluePrimary} 2px, transparent 2px)`,
//             backgroundSize: '30px 30px'
//           }}></div>
//         </div>

//         <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
//           visibleSections.story ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
//         }`}>
//           <div className="relative">
//             {/* Section Header with Animated Line */}
//             <div className="flex items-center gap-4 mb-8">
//               <div className="relative">
//                 <div className="w-16 h-1 rounded-full" style={{ 
//                   background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
//                 }}></div>
//                 <div className="absolute inset-0 rounded-full animate-pulse" style={{ 
//                   background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`,
//                   filter: 'blur(8px)'
//                 }}></div>
//               </div>
//               <span className="font-bold text-lg tracking-wider" style={{ color: bluePrimary }}>OUR STORY</span>
//             </div>

//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 animate-slide-in-left leading-tight">
//               Export Journey Since{' '}
//               <span className="relative">
//                 <span className="relative z-10 bg-gradient-to-r from-bluePrimary to-blueSecondary bg-clip-text text-transparent">
//                   2006
//                 </span>
//                 <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
//                       style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}></span>
//               </span>
//             </h2>

//             <div className="space-y-6 text-gray-600">
//               <p className="text-lg animate-slide-in-left animate-delay-100 leading-relaxed">
//                 Established in 2006 and headquartered in Hong Kong, we are an internationally recognized export company 
//                 specializing in supplying high-quality products to global markets.
//               </p>
//               <p className="animate-slide-in-left animate-delay-200 leading-relaxed">
//                 Over 18 years, we have built strong relationships with manufacturers, suppliers, and buyers across 
//                 multiple regions including USA, UK, Europe, Africa, Middle East, and Asia-Pacific.
//               </p>
//             </div>

//             {/* Enhanced Export Strengths */}
//             <div className="mt-12 animate-slide-in-left animate-delay-400">
//               <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
//                 <span>What We Do</span>
//                 <FiZap className="text-yellow-500 animate-pulse" />
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {exportStrengths.map((strength, index) => (
//                   <div 
//                     key={index}
//                     className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group border border-gray-100 relative overflow-hidden"
//                     onMouseEnter={() => setHoveredCard(index + 10)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                          style={{ background: `${bluePrimary}05` }}></div>
                    
//                     <div className="flex items-start gap-4 mb-4">
//                       <div className="relative">
//                         <div className="p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
//                              style={{ 
//                                background: strength.iconBg,
//                                color: 'white'
//                              }}>
//                           {strength.icon}
//                         </div>
//                         <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
//                              style={{ background: strength.iconBg }}></div>
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-bold text-lg mb-2" style={{ color: bluePrimary }}>{strength.title}</h4>
//                         <p className="text-gray-600 text-sm">{strength.desc}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//                       <span className="text-xs text-gray-500">Performance Metric</span>
//                       <span className="font-bold text-sm px-3 py-1 rounded-full"
//                             style={{ 
//                               background: `${blueSecondary}10`,
//                               color: blueSecondary
//                             }}>
//                         {strength.stats}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="relative">
//             {/* Enhanced Image Gallery with Hover Effects */}
//             <div className="grid grid-cols-2 gap-6">
//               <div className="space-y-6">
//                 <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
//                   <img 
//                     src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                     alt="Global shipping"
//                     className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
//                     style={{ transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)` }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
//                     <div>
//                       <div className="text-white font-bold mb-2">Global Logistics Network</div>
//                       <div className="text-white/80 text-sm">Seamless worldwide shipping</div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Enhanced Global Markets Card */}
//                 <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden group">
//                   <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                        style={{ background: `${bluePrimary}05` }}></div>
                  
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-xl font-bold" style={{ color: bluePrimary }}>Global Markets</h3>
//                     <div className="p-2 rounded-lg" style={{ background: `${bluePrimary}10`, color: bluePrimary }}>
//                       <FaGlobe className="text-lg" />
//                     </div>
//                   </div>
//                   <div className="space-y-4">
//                     {countries.slice(0, 3).map((country, index) => (
//                       <div 
//                         key={index} 
//                         className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group/item"
//                         onMouseEnter={() => setHoveredCard(index + 20)}
//                         onMouseLeave={() => setHoveredCard(null)}
//                       >
//                         <div className={`p-2 rounded-lg transition-all duration-300 ${hoveredCard === index + 20 ? 'scale-110' : ''}`}
//                              style={{ background: `${country.color}10`, color: country.color }}>
//                           {country.icon}
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium">{country.name.split('(')[0]}</div>
//                           <div className="text-xs text-gray-500">{country.clients} active clients</div>
//                         </div>
//                         <FiChevronRight className="opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform group-hover/item:translate-x-1"
//                                        style={{ color: bluePrimary }} />
//                       </div>
//                     ))}
//                   </div>
//                   <button className="w-full mt-6 py-3 text-center font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2 group/btn"
//                           style={{ color: blueSecondary }}>
//                     <span>Explore All Markets</span>
//                     <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
//                   </button>
//                 </div>
//               </div>
//               <div className="space-y-6 mt-8 md:mt-12">
//                 <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
//                   <img 
//                     src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                     alt="Quality inspection"
//                     className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
//                     style={{ transform: `translate(${-mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)` }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
//                     <div>
//                       <div className="text-white font-bold mb-2">Quality Control</div>
//                       <div className="text-white/80 text-sm">ISO certified standards</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
//                   <img 
//                     src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//                     alt="Warehouse operations"
//                     className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
//                     style={{ transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)` }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
//                     <div>
//                       <div className="text-white font-bold mb-2">Warehouse Operations</div>
//                       <div className="text-white/80 text-sm">Modern storage facilities</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Certifications */}
//             <div className="mt-8 flex flex-wrap gap-3">
//               {certifications.map((cert, index) => (
//                 <div 
//                   key={index}
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 hover:scale-105 group"
//                   style={{ 
//                     background: `${cert.color}10`,
//                     color: cert.color,
//                     borderColor: `${cert.color}30`
//                   }}
//                 >
//                   <span className="opacity-70 group-hover:opacity-100">{cert.icon}</span>
//                   <span>{cert.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Milestones Timeline */}
//       <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bluePrimary/20 to-transparent"></div>
//           <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blueSecondary/20 to-transparent"></div>
//         </div>

//         <div className="samsung-container">
//           <div className="text-center mb-12 md:mb-16">
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//               <span className="font-bold text-lg tracking-wider" style={{ color: bluePrimary }}>OUR JOURNEY</span>
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Export Journey Timeline
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">Key milestones in our growth as a global export leader</p>
//           </div>
          
//           {/* Enhanced Mobile Timeline */}
//           <div className="lg:hidden">
//             <div className="relative h-1 rounded-full bg-gradient-to-r from-bluePrimary via-blueSecondary to-blueDark mb-8 mx-4"></div>
//             <div className="flex overflow-x-auto pb-6 px-4 space-x-6 snap-x snap-mandatory scrollbar-hide">
//               {milestones.map((milestone, index) => (
//                 <div 
//                   key={index}
//                   className="flex-shrink-0 w-72 snap-center"
//                   onClick={() => setActiveMilestone(index)}
//                 >
//                   <div 
//                     className={`bg-white p-8 rounded-3xl shadow-xl transition-all duration-500 ${activeMilestone === index ? 'ring-2 scale-105' : 'scale-95'}`}
//                     style={{ 
//                       ringColor: bluePrimary,
//                     }}
//                   >
//                     <div className="flex items-center gap-4 mb-6">
//                       <div className="p-3 rounded-xl" style={{ 
//                         background: `linear-gradient(135deg, ${bluePrimary}20, ${blueSecondary}20)`,
//                         color: bluePrimary
//                       }}>
//                         {milestone.icon}
//                       </div>
//                       <div>
//                         <div className="font-bold text-2xl" style={{ color: bluePrimary }}>{milestone.year}</div>
//                         <div className="text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block"
//                              style={{ 
//                                background: `${bluePrimary}10`,
//                                color: bluePrimary
//                              }}>
//                           {milestone.highlight}
//                         </div>
//                       </div>
//                     </div>
//                     <p className="text-gray-700">{milestone.event}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center mt-8 space-x-3">
//               {milestones.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveMilestone(index)}
//                   className={`h-2 rounded-full transition-all duration-300 ${activeMilestone === index ? 'w-8' : 'w-2'}`}
//                   style={{ 
//                     background: activeMilestone === index 
//                       ? `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
//                       : '#CBD5E1'
//                   }}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Enhanced Desktop Timeline */}
//           <div className="hidden lg:block relative max-w-5xl mx-auto">
//             <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-bluePrimary via-blueSecondary to-blueDark"></div>
//             {milestones.map((milestone, index) => (
//               <div 
//                 key={index}
//                 className={`relative mb-16 ${index % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'} animate-timeline-item`}
//                 style={{ animationDelay: `${index * 200}ms` }}
//               >
//                 <div 
//                   className={`absolute top-6 ${index % 2 === 0 ? 'right-[-6px]' : 'left-[-6px]'} w-12 h-12 rounded-full transition-all duration-500 cursor-pointer hover:scale-125 flex items-center justify-center`}
//                   style={{ 
//                     background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})`,
//                     boxShadow: `0 0 0 4px ${bluePrimary}20, 0 10px 30px ${bluePrimary}30`,
//                     animation: activeMilestone === index ? 'pulse 2s infinite' : 'none'
//                   }}
//                   onClick={() => setActiveMilestone(index)}
//                 >
//                   <div className="text-white text-lg">
//                     {milestone.icon}
//                   </div>
//                 </div>
//                 <div 
//                   className={`inline-block p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
//                     index % 2 === 0 ? 'ml-auto' : 'mr-auto'
//                   } ${activeMilestone === index ? 'ring-2 scale-105' : ''}`}
//                   style={{ 
//                     maxWidth: '480px', 
//                     background: 'white',
//                     ringColor: bluePrimary,
//                     cursor: 'pointer'
//                   }}
//                   onClick={() => setActiveMilestone(index)}
//                 >
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="text-3xl font-bold" style={{ color: bluePrimary }}>{milestone.year}</div>
//                     <div className="text-sm font-bold px-3 py-1 rounded-full"
//                          style={{ 
//                            background: `${bluePrimary}10`,
//                            color: bluePrimary
//                          }}>
//                       {milestone.highlight}
//                     </div>
//                   </div>
//                   <p className="text-gray-700 text-lg">{milestone.event}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Our Mission & Vision */}
//       <section 
//         id="mission-section" 
//         className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative"
//       >
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-bluePrimary/20 to-transparent"></div>
        
//         <div className="samsung-container">
//           <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
//             visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}>
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//               <span className="font-bold text-lg tracking-wider" style={{ color: bluePrimary }}>OUR PURPOSE</span>
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
//             <p className="text-xl text-gray-600">
//               Driving global trade excellence through quality products and reliable partnerships.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 items-stretch">
//             <div 
//               className={`bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden ${
//                 visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//               style={{ 
//                 animationDelay: '100ms',
//                 border: `1px solid ${bluePrimary}20`,
//                 background: `linear-gradient(145deg, white, #f8fafc)`
//               }}
//             >
//               <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                    style={{ background: `linear-gradient(135deg, ${bluePrimary}05, transparent)` }}></div>
              
//               <div className="flex items-center gap-6 mb-8">
//                 <div 
//                   className="p-4 rounded-2xl animate-spin-slow group-hover:scale-110 transition-transform duration-500"
//                   style={{ background: `${bluePrimary}10`, color: bluePrimary }}
//                 >
//                   <FiTarget className="text-3xl" />
//                 </div>
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h3>
//               </div>
//               <div className="space-y-6 text-gray-600">
//                 <p className="text-lg animate-text-reveal">
//                   To deliver high-quality products globally while maintaining transparency, reliability, 
//                   and long-term value for our partners through ethical business practices.
//                 </p>
//                 <div className="pt-6 border-t border-gray-100">
//                   <button className="flex items-center gap-3 text-sm font-bold group/btn px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
//                           style={{ color: bluePrimary }}>
//                     <span>Learn about our quality standards</span>
//                     <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-300" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div 
//               className={`bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden ${
//                 visibleSections.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//               style={{ 
//                 animationDelay: '300ms',
//                 border: `1px solid ${blueSecondary}20`,
//                 background: `linear-gradient(145deg, white, #f8fafc)`
//               }}
//             >
//               <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                    style={{ background: `linear-gradient(135deg, ${blueSecondary}05, transparent)` }}></div>
              
//               <div className="flex items-center gap-6 mb-8">
//                 <div 
//                   className="p-4 rounded-2xl animate-pulse group-hover:scale-110 transition-transform duration-500"
//                   style={{ background: `${blueSecondary}10`, color: blueSecondary }}
//                 >
//                   <FiGlobe className="text-3xl" />
//                 </div>
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Our Vision</h3>
//               </div>
//               <div className="space-y-6 text-gray-600">
//                 <p className="text-lg animate-text-reveal animate-delay-100">
//                   To become a globally preferred export partner by consistently exceeding customer 
//                   expectations and expanding our international footprint.
//                 </p>
//                 <div className="pt-6 border-t border-gray-100">
//                   <button className="flex items-center gap-3 text-sm font-bold group/btn px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
//                           style={{ color: blueSecondary }}>
//                     <span>Explore our global network</span>
//                     <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-300" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Why Choose Us */}
//       <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50/50 via-white to-gray-50/50 relative">
//         <div className="samsung-container">
//           <div className="text-center mb-12 md:mb-16">
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//               <span className="font-bold text-lg tracking-wider" style={{ color: bluePrimary }}>WHY CHOOSE US</span>
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose Us as Your Export Partner
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">Key advantages that make us the preferred choice for global exports</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               "Over 18 years of export experience",
//               "Strong supplier and manufacturing network",
//               "Strict quality control standards",
//               "Competitive pricing",
//               "Reliable shipping and documentation support",
//               "Long-term client relationships across continents"
//             ].map((point, index) => (
//               <div 
//                 key={index}
//                 className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden"
//                 onMouseEnter={() => setHoveredCard(index + 30)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                      style={{ background: `${bluePrimary}05` }}></div>
                
//                 <div className="flex items-start gap-4">
//                   <div className={`relative p-3 rounded-xl transition-all duration-500 ${hoveredCard === index + 30 ? 'scale-110 rotate-12' : ''}`}
//                        style={{ 
//                          background: `${bluePrimary}10`,
//                          color: bluePrimary
//                        }}>
//                     <FiCheckCircle className="text-xl" />
//                     <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
//                          style={{ background: `linear-gradient(135deg, ${bluePrimary}20, ${blueSecondary}20)` }}></div>
//                   </div>
//                   <span className="text-gray-700 pt-1.5 text-lg">{point}</span>
//                 </div>
//                 <div className="mt-6 pt-6 border-t border-gray-100">
//                   <div className="text-sm text-gray-500">Benefit #{index + 1}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Our Values */}
//       <section 
//         id="values-section" 
//         className="py-20 md:py-28 samsung-container overflow-hidden relative"
//       >
//         <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
//           visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}>
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <div className="w-20 h-1 rounded-full" style={{ 
//               background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//             }}></div>
//             <span className="font-bold text-lg tracking-wider" style={{ color: bluePrimary }}>OUR VALUES</span>
//             <div className="w-20 h-1 rounded-full" style={{ 
//               background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//             }}></div>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
//           <p className="text-xl text-gray-600">
//             These principles guide our export operations and client relationships.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {values.map((value, index) => (
//             <div 
//               key={index}
//               className={`bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group relative overflow-hidden ${
//                 visibleSections.values ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//               }`}
//               style={{ 
//                 animationDelay: `${index * 100}ms`,
//                 background: `linear-gradient(145deg, white, #f8fafc)`,
//                 border: `1px solid ${bluePrimary}10`
//               }}
//               onMouseEnter={() => setHoveredCard(index + 40)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                    style={{ background: `${bluePrimary}05` }}></div>
              
//               <div 
//                 className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative"
//                 style={{ 
//                   background: `linear-gradient(135deg, ${bluePrimary}10, ${blueSecondary}10)`,
//                   color: bluePrimary,
//                   border: `2px solid ${bluePrimary}20`
//                 }}
//               >
//                 <span className="text-3xl relative z-10">{value.icon}</span>
//                 <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                      style={{ background: value.gradient }}></div>
//               </div>
//               <h3 
//                 className="text-2xl font-bold text-gray-900 mb-6 group-hover:transition-colors duration-300"
//                 style={{ color: bluePrimary }}
//               >
//                 {value.title}
//               </h3>
//               <p className="text-gray-600 text-lg mb-8">{value.description}</p>
              
//               <div className="mt-8 pt-8 border-t border-gray-100">
//                 <div className="flex items-center gap-3 text-sm font-bold group/learnmore"
//                      style={{ color: blueSecondary }}>
//                   <span>Learn more</span>
//                   <FiArrowRight className="group-hover/learnmore:translate-x-2 transition-transform duration-300" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Enhanced Global Markets Section */}
//       <section className="py-16 md:py-28 bg-gradient-to-b from-white to-gray-50 relative">
//         <div className="samsung-container">
//           <div className="text-center mb-12 md:mb-16">
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//               <span className="font-bold text-lg tracking-wider" style={{ color: bluePrimary }}>GLOBAL REACH</span>
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Our Global Markets
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               We proudly export to major markets worldwide with our strong logistics network enabling timely and secure deliveries.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {countries.map((country, index) => (
//               <div 
//                 key={index}
//                 className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-center group relative overflow-hidden"
//                 onMouseEnter={() => setHoveredCard(index + 50)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <div className="absolute top-0 right-0 w-12 h-12 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                      style={{ background: `${country.color}10` }}></div>
                
//                 <div className="flex justify-center mb-6">
//                   <div 
//                     className="p-4 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
//                     style={{ background: `${country.color}10`, color: country.color }}
//                   >
//                     {country.icon}
//                   </div>
//                 </div>
//                 <div className="font-bold text-lg mb-2">{country.name.split(' ')[0]}</div>
//                 <div className="text-sm text-gray-500 mb-4">
//                   {country.name.includes('(') ? country.name.split('(')[1].replace(')', '') : ''}
//                 </div>
//                 <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-gray-500">Clients</span>
//                     <span className="text-sm font-bold">{country.clients}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-gray-500">Shipping</span>
//                     <span className="text-sm font-bold">{country.shipping}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-gray-500">Growth</span>
//                     <span className="text-sm font-bold text-green-600">{country.trend}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center mt-12 md:mt-16">
//             <button className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold transition-all duration-500 transform hover:scale-105 group/btn relative overflow-hidden"
//                     style={{ 
//                       background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})`,
//                       color: 'white',
//                       boxShadow: `0 10px 30px ${bluePrimary}30`
//                     }}>
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
//               <span className="relative z-10">Explore All Markets</span>
//               <FiArrowRight className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Our Team */}
//       <section 
//         id="team-section" 
//         className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative"
//       >
//         <div className="samsung-container">
//           <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
//             visibleSections.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}>
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//               <span className="font-bold text-lg tracking-wider" style={{ color: bluePrimary }}>OUR TEAM</span>
//               <div className="w-20 h-1 rounded-full" style={{ 
//                 background: `linear-gradient(to right, transparent, ${bluePrimary}, transparent)` 
//               }}></div>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Export Leadership Team</h2>
//             <p className="text-xl text-gray-600">
//               Experienced professionals dedicated to global trade excellence.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <div 
//                 key={index}
//                 className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group relative ${
//                   visibleSections.team ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//                 }`}
//                 style={{ animationDelay: `${index * 100}ms` }}
//                 onMouseEnter={() => setHoveredTeam(index)}
//                 onMouseLeave={() => setHoveredTeam(null)}
//               >
//                 <div className="relative h-80 overflow-hidden">
//                   <img 
//                     src={member.image}
//                     alt={member.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="flex flex-wrap gap-2">
//                       {member.expertise.map((skill, skillIndex) => (
//                         <span 
//                           key={skillIndex}
//                           className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/95 text-gray-800"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="p-2 rounded-full bg-white/90">
//                       <span className="text-xs font-bold" style={{ color: bluePrimary }}>Export Expert</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-8">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
//                   <div 
//                     className="font-bold text-lg mb-4 transition-colors duration-300"
//                     style={{ color: bluePrimary }}
//                   >
//                     {member.role}
//                   </div>
//                   <p className="text-gray-600 mb-6">{member.description}</p>
//                   <div className="italic text-sm text-gray-500 mb-6 border-l-4 pl-4"
//                        style={{ borderColor: bluePrimary }}>
//                     "{member.quote}"
//                   </div>
//                   <div className="flex space-x-4">
//                     <a 
//                       href="#" 
//                       className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-110"
//                       style={{ color: bluePrimary }}
//                     >
//                       <FaLinkedin className="w-6 h-6" />
//                     </a>
//                     <a 
//                       href="#" 
//                       className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-110"
//                       style={{ color: bluePrimary }}
//                     >
//                       <FaEnvelope className="w-6 h-6" />
//                     </a>
//                     <button className="ml-auto text-sm font-bold hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group/profile"
//                             style={{ color: blueSecondary }}>
//                       <span>View Profile</span>
//                       <FiArrowRight className="group-hover/profile:translate-x-1 transition-transform" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Call to Action */}
//       <section className="py-16 md:py-24 samsung-container px-4">
//         <div 
//           className="rounded-4xl p-12 md:p-16 text-center animate-pulse-gentle relative overflow-hidden"
//           style={{ 
//             background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`,
//             boxShadow: `0 30px 60px ${bluePrimary}30`
//           }}
//         >
//           {/* Animated Background */}
//           <div className="absolute inset-0">
//             {[...Array(20)].map((_, i) => (
//               <div 
//                 key={i}
//                 className="absolute w-3 h-3 bg-white/20 rounded-full animate-float"
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 3}s`,
//                   animationDuration: `${2 + Math.random() * 3}s`
//                 }}
//               />
//             ))}
//           </div>
          
//           <div className="relative z-10">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-8 animate-bounce-slow">
//               <FiShoppingBag className="text-3xl text-white" />
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
//               Ready to Expand Your Global Reach?
//             </h2>
//             <p className="text-blue-100 text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
//               Contact us today to discuss your sourcing and export requirements.
//               Let's build a successful global partnership.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-6 justify-center">
//               <button 
//                 className="group relative bg-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-xl overflow-hidden"
//                 style={{ color: bluePrimary }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
//                 <span className="relative z-10 flex items-center gap-3">
//                   Request Export Consultation
//                   <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
//                 </span>
//               </button>
//               <button className="group relative bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <span className="relative z-10 flex items-center gap-3">
//                   <FiDownload className="group-hover:scale-110 transition-transform" />
//                   Download Product Catalog
//                 </span>
//               </button>
//             </div>
//             <div className="mt-12 text-white/80">
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
//                 <div className="flex items-center gap-3">
//                   <FiCheckCircle className="text-green-400" />
//                   <span>Free initial consultation</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FiCheckCircle className="text-green-400" />
//                   <span>Custom export solutions</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <FiCheckCircle className="text-green-400" />
//                   <span>Competitive pricing</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Custom CSS Animations */}
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
        
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }

//         @keyframes pulse {
//           0%, 100% {
//             box-shadow: 0 0 0 4px ${bluePrimary}20;
//           }
//           50% {
//             box-shadow: 0 0 0 8px ${bluePrimary}40;
//           }
//         }

//         @keyframes gradientShift {
//           0%, 100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
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
        
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }

//         .animate-gradient-shift {
//           animation: gradientShift 3s ease infinite;
//           background-size: 200% 200%;
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

//         /* Hide scrollbar for Chrome, Safari and Opera */
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
        
//         /* Hide scrollbar for IE, Edge and Firefox */
//         .scrollbar-hide {
//           -ms-overflow-style: none;  /* IE and Edge */
//           scrollbar-width: none;  /* Firefox */
//         }

//         .rounded-4xl {
//           border-radius: 3rem;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AboutPage;