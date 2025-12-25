import React, { useState } from 'react';
import { 
  FiBriefcase, 
  FiMapPin, 
  FiClock, 
  FiDollarSign,
  FiUsers,
  FiTarget,
  FiAward,
  FiHeart,
  FiSearch,
  FiFilter,
  FiChevronRight,
  FiCheckCircle
} from 'react-icons/fi';

const CareerPage = () => {
  // Define the same color variables as in HeroSection
  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Technology",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "5+ years",
      salary: "$140,000 - $180,000",
      description: "Build cutting-edge e-commerce interfaces using React, Next.js, and modern web technologies.",
      postedDate: "2 days ago",
      remote: true,
      urgent: true,
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      experience: "4+ years",
      salary: "$130,000 - $160,000",
      description: "Lead product strategy for our electronics marketplace, working with engineering and design teams.",
      postedDate: "1 week ago",
      remote: true,
      urgent: false,
      skills: ["Product Strategy", "User Research", "Data Analysis", "Agile", "JIRA"]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$100,000 - $130,000",
      description: "Design intuitive user experiences for our e-commerce platform across web and mobile.",
      postedDate: "3 days ago",
      remote: true,
      urgent: true,
      skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"]
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Technology",
      location: "Austin, TX",
      type: "Full-time",
      experience: "4+ years",
      salary: "$120,000 - $150,000",
      description: "Manage cloud infrastructure and CI/CD pipelines for high-traffic e-commerce platform.",
      postedDate: "2 weeks ago",
      remote: false,
      urgent: false,
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"]
    },
    {
      id: 5,
      title: "Customer Success Manager",
      department: "Operations",
      location: "Chicago, IL",
      type: "Full-time",
      experience: "3+ years",
      salary: "$85,000 - $110,000",
      description: "Build strong relationships with enterprise clients and ensure customer satisfaction.",
      postedDate: "5 days ago",
      remote: false,
      urgent: false,
      skills: ["Customer Service", "Account Management", "CRM", "Communication", "Problem Solving"]
    },
    {
      id: 6,
      title: "Data Scientist",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      salary: "$130,000 - $160,000",
      description: "Develop machine learning models for product recommendations and customer insights.",
      postedDate: "1 week ago",
      remote: true,
      urgent: true,
      skills: ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow"]
    },
    {
      id: 7,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
      experience: "2+ years",
      salary: "$70,000 - $90,000",
      description: "Create and execute digital marketing campaigns for electronics products.",
      postedDate: "4 days ago",
      remote: true,
      urgent: false,
      skills: ["Digital Marketing", "SEO", "Social Media", "Content Creation", "Analytics"]
    },
    {
      id: 8,
      title: "Quality Assurance Engineer",
      department: "Technology",
      location: "Seattle, WA",
      type: "Full-time",
      experience: "3+ years",
      salary: "$95,000 - $120,000",
      description: "Ensure software quality through automated and manual testing processes.",
      postedDate: "3 weeks ago",
      remote: false,
      urgent: false,
      skills: ["Testing", "Automation", "Selenium", "Jest", "Quality Assurance"]
    }
  ];

  const departments = [
    { id: 'all', name: 'All Departments', count: jobOpenings.length },
    { id: 'technology', name: 'Technology', count: jobOpenings.filter(job => job.department === 'Technology').length },
    { id: 'product', name: 'Product', count: jobOpenings.filter(job => job.department === 'Product').length },
    { id: 'design', name: 'Design', count: jobOpenings.filter(job => job.department === 'Design').length },
    { id: 'marketing', name: 'Marketing', count: jobOpenings.filter(job => job.department === 'Marketing').length },
    { id: 'operations', name: 'Operations', count: jobOpenings.filter(job => job.department === 'Operations').length },
    { id: 'analytics', name: 'Analytics', count: jobOpenings.filter(job => job.department === 'Analytics').length }
  ];

  const benefits = [
    {
      icon: <FiDollarSign className="text-3xl" />,
      title: "Competitive Salary",
      description: "Industry-leading compensation with annual bonuses"
    },
    {
      icon: <FiHeart className="text-3xl" />,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision coverage"
    },
    {
      icon: <FiBriefcase className="text-3xl" />,
      title: "Remote Work Options",
      description: "Flexible work arrangements for most positions"
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: "Career Growth",
      description: "Professional development and promotion opportunities"
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Team Culture",
      description: "Collaborative environment with regular team events"
    },
    {
      icon: <FiTarget className="text-3xl" />,
      title: "Stock Options",
      description: "Equity in a fast-growing electronics company"
    }
  ];

  const values = [
    {
      title: "Innovation Driven",
      description: "We embrace new technologies and creative solutions"
    },
    {
      title: "Customer Focused",
      description: "Everything we do revolves around customer satisfaction"
    },
    {
      title: "Team Collaboration",
      description: "We believe great things happen when we work together"
    },
    {
      title: "Continuous Learning",
      description: "We invest in our team's growth and development"
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || 
                         job.department.toLowerCase().includes(activeFilter);
    
    return matchesSearch && matchesFilter;
  });

  const handleApply = (jobId) => {
    // In a real app, this would open an application form or redirect
    alert(`Applying for job ID: ${jobId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden text-white"
        style={{ 
          background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="samsung-container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
              Build the Future of Electronics
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up animate-delay-200">
              Join our team of innovators and help shape the next generation of technology retail.
            </p>
            <button 
              className="bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animate-delay-400"
              style={{ color: bluePrimary }}
            >
              View Open Positions
            </button>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-float animate-delay-1000" />
      </section>

      {/* Job Search Bar */}
      <div className="relative -mt-12 samsung-container">
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs by title, skill, or department..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                style={{ '--tw-ring-opacity': 0.2, '--tw-ring-color': `rgba(0, 42, 100, var(--tw-ring-opacity))` }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button 
                className="flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold hover:transition-all duration-300 transform hover:scale-105"
                style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
              >
                <FiSearch />
                Search Jobs
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300">
                <FiFilter />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Openings */}
      <section className="py-20 samsung-container">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Departments</h3>
              <div className="space-y-2">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setActiveFilter(dept.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeFilter === dept.id
                        ? 'text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    style={activeFilter === dept.id ? { background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` } : {}}
                  >
                    <span className="font-medium">{dept.name}</span>
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      activeFilter === dept.id
                        ? 'bg-white/20'
                        : 'bg-gray-200'
                    }`}>
                      {dept.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Job Type</h3>
                <div className="space-y-3">
                  {['Remote', 'On-site', 'Hybrid'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="mr-3 h-5 w-5 rounded focus:outline-none" 
                        style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
                      />
                      <span className="text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Experience Level</h3>
                <div className="space-y-3">
                  {['Entry Level', 'Mid Level', 'Senior', 'Lead'].map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="mr-3 h-5 w-5 rounded focus:outline-none"
                        style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
                      />
                      <span className="text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Current Openings</h2>
                <p className="text-gray-600 mt-2">
                  {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                style={{ '--tw-ring-opacity': 0.2, '--tw-ring-color': `rgba(0, 42, 100, var(--tw-ring-opacity))` }}
              >
                <option>Most Recent</option>
                <option>Salary: High to Low</option>
                <option>Experience: Low to High</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                >
                  <div className="p-6">
                    {/* Job Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          {job.urgent && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                              Urgent
                            </span>
                          )}
                        </div>
                        <span 
                          className="inline-block px-3 py-1 text-white text-sm font-medium rounded-full"
                          style={{ backgroundColor: bluePrimary }}
                        >
                          {job.department}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.remote ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {job.remote ? 'Remote' : 'On-site'}
                      </span>
                    </div>

                    {/* Job Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiMapPin className="text-gray-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiBriefcase className="text-gray-400" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiClock className="text-gray-400" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiDollarSign className="text-gray-400" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    {/* Job Description */}
                    <p className="text-gray-600 mb-6 line-clamp-2">{job.description}</p>

                    {/* Skills */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t">
                      <span className="text-gray-500 text-sm">{job.postedDate}</span>
                      <button
                        onClick={() => handleApply(job.id)}
                        className="flex items-center gap-2 text-white px-6 py-2 rounded-lg font-semibold hover:transition-all duration-300 transform hover:scale-105"
                        style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
                      >
                        Apply Now
                        <FiChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FiSearch className="mx-auto text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-gray-50">
        <div className="samsung-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Join Meet Electronics?</h2>
            <p className="text-xl text-gray-600">
              We're building the future of electronics retail, and we need talented people like you to help us get there.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 text-white"
                  style={{ backgroundColor: bluePrimary }}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 samsung-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Culture & Values</h2>
          <p className="text-xl text-gray-600">
            We believe in creating an environment where everyone can thrive and do their best work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-white p-8 rounded-2xl animate-pulse-gentle"
              style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}
            >
              <div className="flex items-center gap-4">
                <FiCheckCircle className="text-2xl" />
                <h3 className="text-2xl font-bold">{value.title}</h3>
              </div>
              <p className="mt-4 text-blue-100">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How We Hire */}
      <section className="py-20 bg-gray-50">
        <div className="samsung-container">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Hiring Process</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Application", desc: "Submit your application online" },
              { step: "2", title: "Screening", desc: "Initial phone call with our HR team" },
              { step: "3", title: "Interviews", desc: "Meet the team and showcase your skills" },
              { step: "4", title: "Offer", desc: "Welcome to the team!" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div 
                    className="w-20 h-20 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 animate-bounce-slow"
                    style={{ backgroundColor: bluePrimary }}
                  >
                    {step.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 samsung-container">
        <div 
          className="rounded-3xl p-12 text-center animate-pulse-gentle"
          style={{ background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)` }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Shape the Future with Us?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Don't see the perfect role? Send us your resume anyway – we're always looking for great talent!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              style={{ color: bluePrimary }}
            >
              Browse All Openings
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Submit General Application
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
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
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
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
        
        .animate-delay-400 {
          animation-delay: 400ms;
        }
        
        .animate-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CareerPage;

// import React, { useState } from 'react';
// import { 
//   FiBriefcase, 
//   FiMapPin, 
//   FiClock, 
//   FiDollarSign,
//   FiUsers,
//   FiTarget,
//   FiAward,
//   FiHeart,
//   FiSearch,
//   FiFilter,
//   FiChevronRight,
//   FiCheckCircle
// } from 'react-icons/fi';

// const CareerPage = () => {
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   const jobOpenings = [
//     {
//       id: 1,
//       title: "Senior Frontend Developer",
//       department: "Technology",
//       location: "San Francisco, CA",
//       type: "Full-time",
//       experience: "5+ years",
//       salary: "$140,000 - $180,000",
//       description: "Build cutting-edge e-commerce interfaces using React, Next.js, and modern web technologies.",
//       postedDate: "2 days ago",
//       remote: true,
//       urgent: true,
//       skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
//     },
//     {
//       id: 2,
//       title: "Product Manager",
//       department: "Product",
//       location: "New York, NY",
//       type: "Full-time",
//       experience: "4+ years",
//       salary: "$130,000 - $160,000",
//       description: "Lead product strategy for our electronics marketplace, working with engineering and design teams.",
//       postedDate: "1 week ago",
//       remote: true,
//       urgent: false,
//       skills: ["Product Strategy", "User Research", "Data Analysis", "Agile", "JIRA"]
//     },
//     {
//       id: 3,
//       title: "UX/UI Designer",
//       department: "Design",
//       location: "Remote",
//       type: "Full-time",
//       experience: "3+ years",
//       salary: "$100,000 - $130,000",
//       description: "Design intuitive user experiences for our e-commerce platform across web and mobile.",
//       postedDate: "3 days ago",
//       remote: true,
//       urgent: true,
//       skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"]
//     },
//     {
//       id: 4,
//       title: "DevOps Engineer",
//       department: "Technology",
//       location: "Austin, TX",
//       type: "Full-time",
//       experience: "4+ years",
//       salary: "$120,000 - $150,000",
//       description: "Manage cloud infrastructure and CI/CD pipelines for high-traffic e-commerce platform.",
//       postedDate: "2 weeks ago",
//       remote: false,
//       urgent: false,
//       skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"]
//     },
//     {
//       id: 5,
//       title: "Customer Success Manager",
//       department: "Operations",
//       location: "Chicago, IL",
//       type: "Full-time",
//       experience: "3+ years",
//       salary: "$85,000 - $110,000",
//       description: "Build strong relationships with enterprise clients and ensure customer satisfaction.",
//       postedDate: "5 days ago",
//       remote: false,
//       urgent: false,
//       skills: ["Customer Service", "Account Management", "CRM", "Communication", "Problem Solving"]
//     },
//     {
//       id: 6,
//       title: "Data Scientist",
//       department: "Analytics",
//       location: "Remote",
//       type: "Full-time",
//       experience: "4+ years",
//       salary: "$130,000 - $160,000",
//       description: "Develop machine learning models for product recommendations and customer insights.",
//       postedDate: "1 week ago",
//       remote: true,
//       urgent: true,
//       skills: ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow"]
//     },
//     {
//       id: 7,
//       title: "Marketing Specialist",
//       department: "Marketing",
//       location: "Los Angeles, CA",
//       type: "Full-time",
//       experience: "2+ years",
//       salary: "$70,000 - $90,000",
//       description: "Create and execute digital marketing campaigns for electronics products.",
//       postedDate: "4 days ago",
//       remote: true,
//       urgent: false,
//       skills: ["Digital Marketing", "SEO", "Social Media", "Content Creation", "Analytics"]
//     },
//     {
//       id: 8,
//       title: "Quality Assurance Engineer",
//       department: "Technology",
//       location: "Seattle, WA",
//       type: "Full-time",
//       experience: "3+ years",
//       salary: "$95,000 - $120,000",
//       description: "Ensure software quality through automated and manual testing processes.",
//       postedDate: "3 weeks ago",
//       remote: false,
//       urgent: false,
//       skills: ["Testing", "Automation", "Selenium", "Jest", "Quality Assurance"]
//     }
//   ];

//   const departments = [
//     { id: 'all', name: 'All Departments', count: jobOpenings.length },
//     { id: 'technology', name: 'Technology', count: jobOpenings.filter(job => job.department === 'Technology').length },
//     { id: 'product', name: 'Product', count: jobOpenings.filter(job => job.department === 'Product').length },
//     { id: 'design', name: 'Design', count: jobOpenings.filter(job => job.department === 'Design').length },
//     { id: 'marketing', name: 'Marketing', count: jobOpenings.filter(job => job.department === 'Marketing').length },
//     { id: 'operations', name: 'Operations', count: jobOpenings.filter(job => job.department === 'Operations').length },
//     { id: 'analytics', name: 'Analytics', count: jobOpenings.filter(job => job.department === 'Analytics').length }
//   ];

//   const benefits = [
//     {
//       icon: <FiDollarSign className="text-3xl" />,
//       title: "Competitive Salary",
//       description: "Industry-leading compensation with annual bonuses"
//     },
//     {
//       icon: <FiHeart className="text-3xl" />,
//       title: "Health & Wellness",
//       description: "Comprehensive medical, dental, and vision coverage"
//     },
//     {
//       icon: <FiBriefcase className="text-3xl" />,
//       title: "Remote Work Options",
//       description: "Flexible work arrangements for most positions"
//     },
//     {
//       icon: <FiAward className="text-3xl" />,
//       title: "Career Growth",
//       description: "Professional development and promotion opportunities"
//     },
//     {
//       icon: <FiUsers className="text-3xl" />,
//       title: "Team Culture",
//       description: "Collaborative environment with regular team events"
//     },
//     {
//       icon: <FiTarget className="text-3xl" />,
//       title: "Stock Options",
//       description: "Equity in a fast-growing electronics company"
//     }
//   ];

//   const values = [
//     {
//       title: "Innovation Driven",
//       description: "We embrace new technologies and creative solutions"
//     },
//     {
//       title: "Customer Focused",
//       description: "Everything we do revolves around customer satisfaction"
//     },
//     {
//       title: "Team Collaboration",
//       description: "We believe great things happen when we work together"
//     },
//     {
//       title: "Continuous Learning",
//       description: "We invest in our team's growth and development"
//     }
//   ];

//   const filteredJobs = jobOpenings.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     const matchesFilter = activeFilter === 'all' || 
//                          job.department.toLowerCase().includes(activeFilter);
    
//     return matchesSearch && matchesFilter;
//   });

//   const handleApply = (jobId) => {
//     // In a real app, this would open an application form or redirect
//     alert(`Applying for job ID: ${jobId}`);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Banner */}
//       <section className="relative bg-gradient-to-r from-samsung-blue to-blue-800 text-white py-20 md:py-32 overflow-hidden">
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="samsung-container relative z-10">
//           <div className="max-w-3xl">
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
//               Build the Future of Electronics
//             </h1>
//             <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up animate-delay-200">
//               Join our team of innovators and help shape the next generation of technology retail.
//             </p>
//             <button className="bg-white text-samsung-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animate-delay-400">
//               View Open Positions
//             </button>
//           </div>
//         </div>
        
//         {/* Animated Background Elements */}
//         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full animate-float" />
//         <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-float animate-delay-1000" />
//       </section>

//       {/* Job Search Bar */}
//       <div className="relative -mt-12 samsung-container">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search jobs by title, skill, or department..."
//                 className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samsung-blue focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-2">
//               <button className="flex items-center gap-2 px-6 py-3 bg-samsung-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
//                 <FiSearch />
//                 Search Jobs
//               </button>
//               <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300">
//                 <FiFilter />
//                 Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Job Openings */}
//       <section className="py-20 samsung-container">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:w-1/4">
//             <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Departments</h3>
//               <div className="space-y-2">
//                 {departments.map((dept) => (
//                   <button
//                     key={dept.id}
//                     onClick={() => setActiveFilter(dept.id)}
//                     className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-300 ${
//                       activeFilter === dept.id
//                         ? 'bg-samsung-blue text-white'
//                         : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <span className="font-medium">{dept.name}</span>
//                     <span className={`px-2 py-1 text-sm rounded-full ${
//                       activeFilter === dept.id
//                         ? 'bg-white/20'
//                         : 'bg-gray-200'
//                     }`}>
//                       {dept.count}
//                     </span>
//                   </button>
//                 ))}
//               </div>

//               <div className="mt-8 pt-8 border-t">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Job Type</h3>
//                 <div className="space-y-3">
//                   {['Remote', 'On-site', 'Hybrid'].map((type) => (
//                     <label key={type} className="flex items-center cursor-pointer">
//                       <input type="checkbox" className="mr-3 h-5 w-5 text-samsung-blue rounded focus:ring-samsung-blue" />
//                       <span className="text-gray-700">{type}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-8 pt-8 border-t">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Experience Level</h3>
//                 <div className="space-y-3">
//                   {['Entry Level', 'Mid Level', 'Senior', 'Lead'].map((level) => (
//                     <label key={level} className="flex items-center cursor-pointer">
//                       <input type="checkbox" className="mr-3 h-5 w-5 text-samsung-blue rounded focus:ring-samsung-blue" />
//                       <span className="text-gray-700">{level}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Job Listings */}
//           <div className="lg:w-3/4">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900">Current Openings</h2>
//                 <p className="text-gray-600 mt-2">
//                   {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
//                 </p>
//               </div>
//               <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samsung-blue">
//                 <option>Most Recent</option>
//                 <option>Salary: High to Low</option>
//                 <option>Experience: Low to High</option>
//               </select>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               {filteredJobs.map((job) => (
//                 <div
//                   key={job.id}
//                   className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
//                 >
//                   <div className="p-6">
//                     {/* Job Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <div className="flex items-center gap-2 mb-2">
//                           <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
//                           {job.urgent && (
//                             <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
//                               Urgent
//                             </span>
//                           )}
//                         </div>
//                         <span className="inline-block px-3 py-1 bg-samsung-blue/10 text-samsung-blue text-sm font-medium rounded-full">
//                           {job.department}
//                         </span>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         job.remote ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
//                       }`}>
//                         {job.remote ? 'Remote' : 'On-site'}
//                       </span>
//                     </div>

//                     {/* Job Details */}
//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <FiMapPin className="text-gray-400" />
//                         <span>{job.location}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <FiBriefcase className="text-gray-400" />
//                         <span>{job.type}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <FiClock className="text-gray-400" />
//                         <span>{job.experience}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <FiDollarSign className="text-gray-400" />
//                         <span>{job.salary}</span>
//                       </div>
//                     </div>

//                     {/* Job Description */}
//                     <p className="text-gray-600 mb-6 line-clamp-2">{job.description}</p>

//                     {/* Skills */}
//                     <div className="mb-6">
//                       <div className="flex flex-wrap gap-2">
//                         {job.skills.map((skill, index) => (
//                           <span
//                             key={index}
//                             className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Footer */}
//                     <div className="flex items-center justify-between pt-6 border-t">
//                       <span className="text-gray-500 text-sm">{job.postedDate}</span>
//                       <button
//                         onClick={() => handleApply(job.id)}
//                         className="flex items-center gap-2 bg-samsung-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
//                       >
//                         Apply Now
//                         <FiChevronRight />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {filteredJobs.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <FiSearch className="mx-auto text-4xl" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
//                 <p className="text-gray-600">Try adjusting your search or filters</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Why Join Us */}
//       <section className="py-20 bg-samsung-gray">
//         <div className="samsung-container">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Join Meet Electronics?</h2>
//             <p className="text-xl text-gray-600">
//               We're building the future of electronics retail, and we need talented people like you to help us get there.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {benefits.map((benefit, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-samsung-blue/10 text-samsung-blue rounded-2xl mb-6">
//                   {benefit.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
//                 <p className="text-gray-600">{benefit.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Values */}
//       <section className="py-20 samsung-container">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Culture & Values</h2>
//           <p className="text-xl text-gray-600">
//             We believe in creating an environment where everyone can thrive and do their best work.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {values.map((value, index) => (
//             <div
//               key={index}
//               className="bg-gradient-to-r from-samsung-blue to-blue-600 text-white p-8 rounded-2xl animate-pulse-gentle"
//             >
//               <div className="flex items-center gap-4">
//                 <FiCheckCircle className="text-2xl" />
//                 <h3 className="text-2xl font-bold">{value.title}</h3>
//               </div>
//               <p className="mt-4 text-blue-100">{value.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How We Hire */}
//       <section className="py-20 bg-samsung-gray">
//         <div className="samsung-container">
//           <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Hiring Process</h2>
          
//           <div className="grid md:grid-cols-4 gap-8">
//             {[
//               { step: "1", title: "Application", desc: "Submit your application online" },
//               { step: "2", title: "Screening", desc: "Initial phone call with our HR team" },
//               { step: "3", title: "Interviews", desc: "Meet the team and showcase your skills" },
//               { step: "4", title: "Offer", desc: "Welcome to the team!" }
//             ].map((step, index) => (
//               <div key={index} className="text-center">
//                 <div className="relative">
//                   <div className="w-20 h-20 bg-samsung-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 animate-bounce-slow">
//                     {step.step}
//                   </div>
//                   {index < 3 && (
//                     <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-1/2"></div>
//                   )}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
//                 <p className="text-gray-600">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 samsung-container">
//         <div className="bg-gradient-to-r from-samsung-blue to-blue-600 rounded-3xl p-12 text-center animate-pulse-gentle">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Ready to Shape the Future with Us?
//           </h2>
//           <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
//             Don't see the perfect role? Send us your resume anyway – we're always looking for great talent!
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-samsung-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
//               Browse All Openings
//             </button>
//             <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
//               Submit General Application
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
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
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
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
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
        
//         .animate-delay-400 {
//           animation-delay: 400ms;
//         }
        
//         .animate-delay-1000 {
//           animation-delay: 1000ms;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CareerPage;