import React, { useState, useEffect } from 'react';

export function Template14({ components }) {
  const {
    name = 'Your Name',
    bio = 'Tell us about yourself...',
    email = 'your.email@example.com',
    github = '',
    linkedin = '',
    whatsapp = '',
    profilePic,
    skills = [],
    projects = [],
    certificates = [],
    resumeUrl = '',
  } = components;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize particles.js-like background
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.15';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 8);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.speedX + (mousePosition.x - window.innerWidth / 2) * 0.0003;
        p.y += p.speedY + (mousePosition.y - window.innerHeight / 2) * 0.0003;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      document.body.removeChild(canvas);
    };
  }, [mousePosition]);

  const handleNavClick = (href) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.className = 'w-full h-full flex items-center justify-center bg-gray-900 text-indigo-300 rounded-lg';
    fallback.textContent = 'Image Not Available';
    e.target.parentNode.appendChild(fallback);
  };

  const navLinks = [
    { href: '#profile', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden bg-gray-950">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(-5px) rotate(0deg); }
            75% { transform: translateY(-10px) rotate(-2deg); }
          }
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
          }
          .floating {
            animation: float 8s ease-in-out infinite;
          }
          .gradient-bg {
            background: linear-gradient(-45deg, #4f46e5, #7c3aed, #9333ea, #4f46e5);
            background-size: 400% 400%;
            animation: gradientFlow 12s ease infinite;
          }
          .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.5s ease, box-shadow 0.5s ease;
          }
          .card-3d:hover {
            transform: translateY(-8px) rotateX(3deg) rotateY(3deg);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
          }
          .pulse-hover:hover {
            animation: pulse 1.5s infinite;
          }
          .glow-hover:hover {
            box-shadow: 0 0 15px rgba(124, 58, 237, 0.6);
          }
          .skill-chip {
            transition: all 0.3s ease;
          }
          .skill-chip:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(79, 70, 229, 0.3);
          }
          .certificate-card {
            perspective: 1000px;
          }
          .certificate-inner {
            transition: transform 0.6s;
            transform-style: preserve-3d;
          }
          .certificate-card:hover .certificate-inner {
            transform: rotateY(10deg);
          }
        `}
      </style>

      <header className="gradient-bg py-4 sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-white hover:text-indigo-200 transition-colors duration-300">
            {name}
          </h1>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300 relative group"
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-200 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
        </div>
        <div
          className={`md:hidden gradient-bg flex-col space-y-2 px-4 py-4 absolute top-full left-0 right-0 z-40 backdrop-blur-sm bg-opacity-90 ${isMenuOpen ? 'flex' : 'hidden'}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium hover:text-indigo-200 transition-colors duration-300 py-2 border-b border-indigo-800 last:border-b-0"
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Profile Section */}
        <section id="profile" className="mb-20 scroll-mt-24">
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl card-3d border border-indigo-900/50">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              About Me
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative group w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                {profilePic ? (
                  <>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-indigo-500/80 floating group-hover:border-pink-400/80 transition-all duration-500 relative z-10"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-pink-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"></div>
                  </>
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-gray-400 border-4 border-indigo-500/80 floating group-hover:border-pink-400/80 transition-all duration-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="text-center md:text-left mt-6 md:mt-0">
                <h3 className="text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                  {name}
                </h3>
                <p className="mb-8 text-gray-300 leading-relaxed text-lg max-w-2xl">{bio}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-pink-600 rounded-full transition-all duration-300 flex items-center glow-hover"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>
                  )}
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 flex items-center glow-hover"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 flex items-center glow-hover"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-20 scroll-mt-24">
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl card-3d border border-indigo-900/50">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              Skills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-chip bg-gray-800/80 hover:bg-indigo-600/20 p-4 rounded-lg text-center font-medium transition-all duration-300 border border-indigo-900/50 hover:border-indigo-400/50"
                  >
                    <span className="text-gray-200 group-hover:text-white">{skill}</span>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-400">No skills listed.</p>
              )}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20 scroll-mt-24">
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl card-3d border border-indigo-900/50">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/80 p-6 rounded-xl hover:bg-gradient-to-br from-indigo-900/40 to-gray-800 transition-all duration-500 group border border-indigo-900/50 hover:border-indigo-600/50 pulse-hover"
                  >
                    {project.image ? (
                      <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-700/50 flex items-center justify-center text-gray-400 mb-4 rounded-lg border border-dashed border-gray-600">
                        No Image
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                      {project.name || 'Unnamed Project'}
                    </h3>
                    <p className="mb-4 text-gray-300">{project.description || 'No description available.'}</p>
                    <div className="flex space-x-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 flex items-center transition-colors duration-300"
                        >
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-400 hover:text-pink-300 flex items-center transition-colors duration-300"
                        >
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-400">No projects listed.</p>
              )}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="mb-20 scroll-mt-24">
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl card-3d border border-indigo-900/50">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              Certificates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.length > 0 ? (
                certificates.map((certificate, index) => (
                  <div key={index} className="certificate-card h-full">
                    <div className="certificate-inner h-full bg-gradient-to-br from-indigo-900/30 to-gray-800/80 p-6 rounded-xl border border-indigo-900/50 hover:border-pink-500/50 transition-all duration-500">
                      {certificate.image ? (
                        <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-white/90 p-2 shadow-md">
                          <img
                            src={certificate.image}
                            alt={certificate.title}
                            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-700/50 flex items-center justify-center text-gray-400 mb-4 rounded-lg border border-dashed border-gray-600">
                          No Image
                        </div>
                      )}
                      <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
                        {certificate.title || 'Untitled Certificate'}
                      </h3>
                      <p className="mb-2 text-gray-300">
                        <span className="text-indigo-300">Issued:</span> {certificate.date ? new Date(certificate.date).toLocaleDateString() : 'N/A'}
                      </p>
                      {certificate.credential && (
                        <a
                          href={certificate.credential}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors duration-300 mt-2"
                        >
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Verify Credential
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-400">No certificates listed.</p>
              )}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="mb-20 scroll-mt-24">
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl card-3d border border-indigo-900/50 text-center">
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              Resume
            </h2>
            {resumeUrl ? (
              <div className="flex justify-center">
                <a
                  href={resumeUrl}
                  download={`${name}_Resume.pdf`}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-full font-bold hover:from-indigo-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 pulse-hover"
                >
                  Download Resume (PDF)
                </a>
              </div>
            ) : (
              <p className="text-gray-400">No resume uploaded.</p>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-20 scroll-mt-24">
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl card-3d border border-indigo-900/50 text-center">
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
              Contact Me
            </h2>
            <div className="flex justify-center space-x-8 mb-8">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-4xl text-indigo-400 hover:text-indigo-300 transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Feel free to reach out for opportunities, collaborations, or just to say hello!
            </p>
          </div>
        </section>
      </main>

      <footer className="gradient-bg py-6 backdrop-blur-sm bg-opacity-90">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
export default Template14;