import React, { useState } from 'react';

export function Template6({ components }) {
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
    fallback.className = 'w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg';
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
    <div className="min-h-screen bg-[#F8F1E9] text-[#1E272E] font-sans">
      <header className="bg-[#2E7D32] text-[#F8F1E9] py-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight hover:animate-bounce">{name}</h1>
          <button
            id="menu-toggle"
            className="sm:hidden text-[#F8F1E9] focus:outline-none hover:bg-[#D4A017] p-2 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                className="text-lg font-medium hover:text-[#D4A017] hover:animate-pulse"
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div
          id="mobile-menu"
          className={`sm:hidden bg-[#2E7D32] text-[#F8F1E9] flex-col space-y-2 px-4 py-4 absolute top-full left-0 right-0 z-40 shadow-lg ${isMenuOpen ? 'flex' : 'hidden'}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium hover:text-[#D4A017] hover:animate-bounce py-2"
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section id="profile" className="mb-16 scroll-mt-24 animate-zoom-in">
          <div className="bg-[#F8F1E9] p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-6 text-center text-[#2E7D32]">About Me</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-[#D4A017] hover:animate-flip"
                  onError={e => handleImageError(e, 'profile')}
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
              )}
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-semibold mb-3 text-[#2E7D32]">{name}</h3>
                <p className="mb-6 text-[#1E272E] leading-relaxed">{bio}</p>
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0">
                  {email && (
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href={`mailto:${email}`} className="text-[#D4A017] hover:text-[#2E7D32]">
                        {email}
                      </a>
                    </p>
                  )}
                  {github && (
                    <p>
                      <strong>GitHub:</strong>{' '}
                      <a href={github} target="_blank" rel="noopener noreferrer" className="text-[#D4A017] hover:text-[#2E7D32]">
                        {github.split('/').pop() || 'GitHub'}
                      </a>
                    </p>
                  )}
                  {linkedin && (
                    <p>
                      <strong>LinkedIn:</strong>{' '}
                      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-[#D4A017] hover:text-[#2E7D32]">
                        {linkedin.split('/').pop() || 'LinkedIn'}
                      </a>
                    </p>
                  )}
                  {whatsapp && (
                    <p>
                      <strong>WhatsApp:</strong>{' '}
                      <a href={`https://wa.me/+91${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#D4A017] hover:text-[#2E7D32]">
                        Contact via WhatsApp
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="mb-16 scroll-mt-24 animate-zoom-in">
          <div className="bg-[#F8F1E9] p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-6 text-center text-[#2E7D32]">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <div key={index} className="bg-[#F8F1E9] p-4 rounded-lg text-center text-[#1E272E] font-medium hover:animate-flip shadow-md">
                    {skill}
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-[#1E272E]">No skills listed.</p>
              )}
            </div>
          </div>
        </section>

        <section id="projects" className="mb-16 scroll-mt-24 animate-zoom-in">
          <div className="bg-[#F8F1E9] p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-6 text-center text-[#2E7D32]">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index} className="bg-[#F8F1E9] p-6 rounded-lg hover:animate-flip shadow-md">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        onError={e => handleImageError(e, 'project', index)}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 mb-4 rounded-lg">No Image</div>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-[#2E7D32]">{project.name || 'Unnamed Project'}</h3>
                    <p className="mb-4 text-[#1E272E]">{project.description || 'No description available.'}</p>
                    <div className="flex space-x-4">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#D4A017] hover:text-[#2E7D32]">View Project</a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[#D4A017] hover:text-[#2E7D32]">GitHub</a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-[#1E272E]">No projects listed.</p>
              )}
            </div>
          </div>
        </section>

        <section id="certificates" className="mb-16 scroll-mt-24 animate-zoom-in">
          <div className="bg-[#F8F1E9] p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-6 text-center text-[#2E7D32]">Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.length > 0 ? (
                certificates.map((certificate, index) => (
                  <div key={index} className="bg-[#F8F1E9] p-6 rounded-lg hover:animate-flip shadow-md">
                    {certificate.image ? (
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        className="w-full h-48 object-contain rounded-lg mb-4 bg-white"
                        onError={e => handleImageError(e, 'certificate', index)}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 mb-4 rounded-lg">No Image</div>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-[#2E7D32]">{certificate.title || 'Untitled Certificate'}</h3>
                    <p className="mb-2 text-[#1E272E]">Date: {certificate.date ? new Date(certificate.date).toLocaleDateString() : 'N/A'}</p>
                    {certificate.credential && (
                      <a href={certificate.credential} target="_blank" rel="noopener noreferrer" className="text-[#D4A017] hover:text-[#2E7D32]">View Credential</a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-[#1E272E]">No certificates listed.</p>
              )}
            </div>
          </div>
        </section>

        <section id="resume" className="mb-16 scroll-mt-24 animate-zoom-in">
          <div className="bg-[#F8F1E9] p-8 rounded-lg text-center shadow-lg">
            <h2 className="text-4xl font-bold mb-6 text-[#2E7D32]">Resume</h2>
            {resumeUrl ? (
              <div className="flex justify-center">
                <a
                  href={resumeUrl}
                  download={`${name}_Resume.pdf`}
                  className="bg-[#D4A017] text-[#F8F1E9] px-8 py-4 rounded-full hover:bg-[#2E7D32] hover:animate-flip"
                >
                  Download Resume (PDF)
                </a>
              </div>
            ) : (
              <p className="text-[#1E272E]">No resume uploaded.</p>
            )}
          </div>
        </section>

        <section id="contact" className="mb-16 scroll-mt-24 animate-zoom-in">
          <div className="bg-[#F8F1E9] p-8 rounded-lg text-center shadow-lg">
            <h2 className="text-4xl font-bold mb-6 text-[#2E7D32]">Contact Me</h2>
            <div className="flex justify-center space-x-8 mb-6">
              {email && (
                <a href={`mailto:${email}`} className="text-3xl text-[#D4A017] hover:text-[#2E7D32] hover:animate-flip">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="text-3xl text-[#D4A017] hover:text-[#2E7D32] hover:animate-flip">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-3xl text-[#D4A017] hover:text-[#2E7D32] hover:animate-flip">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.395-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
            </div>
            <p className="text-[#1E272E]">Feel free to reach out for opportunities or collaborations!</p>
          </div>
        </section>
      </main>

      <footer className="bg-[#2E7D32] text-[#F8F1E9] py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© <a href='https://tinyurl.com/DevCraftwebsite'>Made by DevCraftz  </a> {new Date().getFullYear()} {name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Template6;