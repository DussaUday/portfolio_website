import React, { useState, useEffect } from 'react';

export function Template22({ components }) {
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
    // Custom design properties
    design = {
      primaryColor: '#6B46C1',
      secondaryColor: '#DB2777',
      backgroundColor: '#F9FAFB',
      textColor: '#1F2937',
      fontFamily: 'sans-serif',
      borderRadius: '0.5rem',
      animationType: 'float',
      sectionPadding: '4rem',
      cardShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      hoverEffect: 'scale'
    }
  } = components;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesignPanelOpen, setIsDesignPanelOpen] = useState(false);
  const [currentDesign, setCurrentDesign] = useState(design);

  useEffect(() => {
    // Apply custom styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --primary: ${currentDesign.primaryColor};
        --secondary: ${currentDesign.secondaryColor};
        --bg: ${currentDesign.backgroundColor};
        --text: ${currentDesign.textColor};
        --font: ${currentDesign.fontFamily};
        --rounded: ${currentDesign.borderRadius};
        --section-padding: ${currentDesign.sectionPadding};
        --shadow: ${currentDesign.cardShadow};
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      .custom-animation {
        animation: ${currentDesign.animationType} 3s ease-in-out infinite;
      }
      
      .hover-effect {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .hover-effect:hover {
        ${currentDesign.hoverEffect === 'scale' ? 'transform: scale(1.03);' : ''}
        ${currentDesign.hoverEffect === 'lift' ? 'transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);' : ''}
        ${currentDesign.hoverEffect === 'glow' ? 'box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);' : ''}
      }
      
      .gradient-text {
        background: linear-gradient(45deg, var(--primary), var(--secondary));
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gradient-shift 3s linear infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [currentDesign]);

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

  const handleImageError = (e, type, index = null) => {
    e.target.style.display = 'none';
    const parent = e.target.parentElement;
    const fallback = document.createElement('div');
    fallback.className = 'w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white rounded-lg';
    fallback.textContent = 'Image Not Available';
    parent.appendChild(fallback);
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
    <div className="min-h-screen" style={{ 
      backgroundColor: currentDesign.backgroundColor,
      color: currentDesign.textColor,
      fontFamily: currentDesign.fontFamily
    }}>
      {/* Design Panel Toggle */}
      <button 
        onClick={() => setIsDesignPanelOpen(!isDesignPanelOpen)}
        className="fixed bottom-8 right-8 z-50 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        style={{
          backgroundColor: currentDesign.primaryColor,
          color: 'white'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      {/* Design Panel */}
      {isDesignPanelOpen && (
        <div className="fixed inset-y-0 right-0 z-40 w-80 bg-white shadow-xl overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Design Settings</h3>
            <button 
              onClick={() => setIsDesignPanelOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <input
                type="color"
                value={currentDesign.primaryColor}
                onChange={(e) => setCurrentDesign({...currentDesign, primaryColor: e.target.value})}
                className="w-full h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <input
                type="color"
                value={currentDesign.secondaryColor}
                onChange={(e) => setCurrentDesign({...currentDesign, secondaryColor: e.target.value})}
                className="w-full h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Background Color</label>
              <input
                type="color"
                value={currentDesign.backgroundColor}
                onChange={(e) => setCurrentDesign({...currentDesign, backgroundColor: e.target.value})}
                className="w-full h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Text Color</label>
              <input
                type="color"
                value={currentDesign.textColor}
                onChange={(e) => setCurrentDesign({...currentDesign, textColor: e.target.value})}
                className="w-full h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Font Family</label>
              <select
                value={currentDesign.fontFamily}
                onChange={(e) => setCurrentDesign({...currentDesign, fontFamily: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
                <option value="cursive">Cursive</option>
                <option value="fantasy">Fantasy</option>
                <option value="'Helvetica Neue', Arial, sans-serif">Helvetica</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Courier New', monospace">Courier New</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Border Radius</label>
              <select
                value={currentDesign.borderRadius}
                onChange={(e) => setCurrentDesign({...currentDesign, borderRadius: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="0">Sharp</option>
                <option value="0.25rem">Slightly Rounded</option>
                <option value="0.5rem">Medium Rounded</option>
                <option value="1rem">Very Rounded</option>
                <option value="50%">Circular</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Animation Type</label>
              <select
                value={currentDesign.animationType}
                onChange={(e) => setCurrentDesign({...currentDesign, animationType: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="float">Float</option>
                <option value="pulse">Pulse</option>
                <option value="bounce">Bounce</option>
                <option value="none">None</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hover Effect</label>
              <select
                value={currentDesign.hoverEffect}
                onChange={(e) => setCurrentDesign({...currentDesign, hoverEffect: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="scale">Scale Up</option>
                <option value="lift">Lift Up</option>
                <option value="glow">Glow</option>
                <option value="none">None</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Card Shadow</label>
              <select
                value={currentDesign.cardShadow}
                onChange={(e) => setCurrentDesign({...currentDesign, cardShadow: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="none">None</option>
                <option value="0 1px 3px rgba(0, 0, 0, 0.1)">Subtle</option>
                <option value="0 4px 6px -1px rgba(0, 0, 0, 0.1)">Medium</option>
                <option value="0 10px 15px -3px rgba(0, 0, 0, 0.1)">Strong</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white/80 backdrop-blur-sm py-4 sticky top-0 z-30 shadow-sm" style={{
        backgroundColor: `rgba(255, 255, 255, 0.8)`,
        color: currentDesign.textColor
      }}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold gradient-text">{name}</h1>
          <button
            id="menu-toggle"
            className="sm:hidden focus:outline-none hover:bg-gray-100 p-2 rounded-full transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            style={{ color: currentDesign.primaryColor }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="menu-icon"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
          <nav className="hidden sm:flex sm:flex-row sm:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg font-medium hover:scale-110 transition-all duration-300 ease-in-out"
                style={{ color: currentDesign.textColor }}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div
          id="mobile-menu"
          className={`sm:hidden bg-white/90 backdrop-blur-sm px-4 py-4 absolute top-full left-0 right-0 z-20 shadow-lg ${isMenuOpen ? 'flex' : 'hidden'} flex-col space-y-2 transition-all duration-500 ease-in-out`}
          style={{ backgroundColor: `rgba(255, 255, 255, 0.9)`, color: currentDesign.textColor }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium hover:scale-105 transition-all duration-300 py-2"
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Profile Section */}
        <section 
          id="profile" 
          className="mb-16 scroll-mt-24 hover-effect"
          style={{ 
            padding: currentDesign.sectionPadding,
            borderRadius: currentDesign.borderRadius,
            backgroundColor: `rgba(255, 255, 255, 0.8)`,
            boxShadow: currentDesign.cardShadow
          }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center gradient-text">About Me</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {profilePic ? (
              <div className={`${currentDesign.animationType !== 'none' ? 'custom-animation' : ''}`}>
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-48 h-48 object-cover border-4 border-white shadow-xl"
                  style={{ borderRadius: currentDesign.borderRadius }}
                  onError={e => handleImageError(e, 'profile')}
                />
              </div>
            ) : (
              <div 
                className={`w-48 h-48 rounded-full flex items-center justify-center text-white shadow-xl ${currentDesign.animationType !== 'none' ? 'custom-animation' : ''}`}
                style={{ 
                  background: `linear-gradient(45deg, ${currentDesign.primaryColor}, ${currentDesign.secondaryColor})`,
                  borderRadius: currentDesign.borderRadius
                }}
              >
                No Image
              </div>
            )}
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4 gradient-text">{name}</h3>
              <p className="mb-6 leading-relaxed" style={{ color: currentDesign.textColor }}>{bio}</p>
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0">
                {email && (
                  <p>
                    <strong style={{ color: currentDesign.primaryColor }}>Email:</strong>{' '}
                    <a href={`mailto:${email}`} style={{ color: currentDesign.secondaryColor }}>
                      {email}
                    </a>
                  </p>
                )}
                {github && (
                  <p>
                    <strong style={{ color: currentDesign.primaryColor }}>GitHub:</strong>{' '}
                    <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: currentDesign.secondaryColor }}>
                      {github.split('/').pop() || 'GitHub'}
                    </a>
                  </p>
                )}
                {linkedin && (
                  <p>
                    <strong style={{ color: currentDesign.primaryColor }}>LinkedIn:</strong>{' '}
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ color: currentDesign.secondaryColor }}>
                      {linkedin.split('/').pop() || 'LinkedIn'}
                    </a>
                  </p>
                )}
                {whatsapp && (
                  <p>
                    <strong style={{ color: currentDesign.primaryColor }}>WhatsApp:</strong>{' '}
                    <a href={`https://wa.me/+91${whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: currentDesign.secondaryColor }}>
                      Contact via WhatsApp
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          id="skills" 
          className="mb-16 scroll-mt-24 hover-effect"
          style={{ 
            padding: currentDesign.sectionPadding,
            borderRadius: currentDesign.borderRadius,
            backgroundColor: `rgba(255, 255, 255, 0.8)`,
            boxShadow: currentDesign.cardShadow
          }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  style={{ 
                    background: `linear-gradient(45deg, ${currentDesign.primaryColor}, ${currentDesign.secondaryColor})`,
                    borderRadius: currentDesign.borderRadius
                  }}
                >
                  {skill}
                </div>
              ))
            ) : (
              <p className="text-center">No skills listed.</p>
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          className="mb-16 scroll-mt-24 hover-effect"
          style={{ 
            padding: currentDesign.sectionPadding,
            borderRadius: currentDesign.borderRadius,
            backgroundColor: `rgba(255, 255, 255, 0.8)`,
            boxShadow: currentDesign.cardShadow
          }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div 
                  key={index} 
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover-effect"
                  style={{ 
                    backgroundColor: 'white',
                    borderRadius: currentDesign.borderRadius
                  }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                      onError={e => handleImageError(e, 'project', index)}
                    />
                  ) : (
                    <div 
                      className="w-full h-48 flex items-center justify-center text-white"
                      style={{ 
                        background: `linear-gradient(45deg, ${currentDesign.primaryColor}, ${currentDesign.secondaryColor})`
                      }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 gradient-text">{project.name || 'Unnamed Project'}</h3>
                    <p className="mb-4" style={{ color: currentDesign.textColor }}>{project.description || 'No description available.'}</p>
                    <div className="flex space-x-4">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-medium"
                          style={{ color: currentDesign.primaryColor }}
                        >
                          View Project
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-medium"
                          style={{ color: currentDesign.secondaryColor }}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No projects listed.</p>
            )}
          </div>
        </section>

        {/* Certificates Section */}
        <section 
          id="certificates" 
          className="mb-16 scroll-mt-24 hover-effect"
          style={{ 
            padding: currentDesign.sectionPadding,
            borderRadius: currentDesign.borderRadius,
            backgroundColor: `rgba(255, 255, 255, 0.8)`,
            boxShadow: currentDesign.cardShadow
          }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.length > 0 ? (
              certificates.map((certificate, index) => (
                <div 
                  key={index} 
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover-effect"
                  style={{ 
                    backgroundColor: 'white',
                    borderRadius: currentDesign.borderRadius
                  }}
                >
                  {certificate.image ? (
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-48 object-contain bg-white p-4"
                      onError={e => handleImageError(e, 'certificate', index)}
                    />
                  ) : (
                    <div 
                      className="w-full h-48 flex items-center justify-center text-white"
                      style={{ 
                        background: `linear-gradient(45deg, ${currentDesign.primaryColor}, ${currentDesign.secondaryColor})`
                      }}
                    >
                      No Image
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 gradient-text">{certificate.title || 'Untitled Certificate'}</h3>
                    <p className="mb-2" style={{ color: currentDesign.textColor }}>Date: {certificate.date ? new Date(certificate.date).toLocaleDateString() : 'N/A'}</p>
                    {certificate.credential && (
                      <a 
                        href={certificate.credential} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-medium"
                        style={{ color: currentDesign.primaryColor }}
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No certificates listed.</p>
            )}
          </div>
        </section>

        {/* Resume Section */}
        <section 
          id="resume" 
          className="mb-16 scroll-mt-24 hover-effect text-center"
          style={{ 
            padding: currentDesign.sectionPadding,
            borderRadius: currentDesign.borderRadius,
            backgroundColor: `rgba(255, 255, 255, 0.8)`,
            boxShadow: currentDesign.cardShadow
          }}
        >
          <h2 className="text-4xl font-bold mb-8 gradient-text">Resume</h2>
          {resumeUrl ? (
            <div className="flex justify-center">
              <a
                href={resumeUrl}
                download={`${name}_Resume.pdf`}
                className="text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                style={{ 
                  background: `linear-gradient(45deg, ${currentDesign.primaryColor}, ${currentDesign.secondaryColor})`,
                  borderRadius: currentDesign.borderRadius
                }}
              >
                Download Resume (PDF)
              </a>
            </div>
          ) : (
            <p>No resume uploaded.</p>
          )}
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          className="mb-16 scroll-mt-24 hover-effect text-center"
          style={{ 
            padding: currentDesign.sectionPadding,
            borderRadius: currentDesign.borderRadius,
            backgroundColor: `rgba(255, 255, 255, 0.8)`,
            boxShadow: currentDesign.cardShadow
          }}
        >
          <h2 className="text-4xl font-bold mb-8 gradient-text">Contact Me</h2>
          <div className="flex justify-center space-x-8 mb-8">
            {email && (
              <a 
                href={`mailto:${email}`} 
                className="hover:scale-110 transition-transform"
                style={{ color: currentDesign.primaryColor }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            )}
            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:scale-110 transition-transform"
                style={{ color: currentDesign.primaryColor }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {linkedin && (
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:scale-110 transition-transform"
                style={{ color: currentDesign.primaryColor }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.395-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
          </div>
          <p style={{ color: currentDesign.textColor }}>Feel free to reach out for opportunities or collaborations!</p>
        </section>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm py-6 border-t border-gray-200" style={{ color: currentDesign.textColor }}>
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Template22;