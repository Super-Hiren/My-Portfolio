import { useState, useEffect, useRef } from 'react'
import {
  Monitor,
  Settings,
  Database,
  CheckCircle,
  User,
  Download,
  Server,
  Layout,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Copy,
  Check,
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react'
import './App.css'

function FadeInSection({ children, delay = 0 }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      ref={domRef}
    >
      {children}
    </div>
  );
}

function VerticalArchitectureVisualizer() {
  return (
    <div className="vertical-arch-wrapper">
      {/* Floating Ambient Badges mapped outside the rotation perspective */}
      <div className="tech-badge badge-csharp float-slow">C#</div>
      <div className="tech-badge badge-react float-med">React</div>
      <div className="tech-badge badge-sql float-fast">.NET</div>
      <div className="tech-badge badge-api float-slow">SQL Server</div>

      <div className="vertical-arch-container">

        <div className="v-card-wrapper float-slow">
          <div className="v-card">
            <div className="v-card-content">
              <div className="v-card-header">
                <User className="v-icon" size={20} />
                <span className="sora-title v-title">Client Node</span>
              </div>
              <div className="v-card-details">
                <span className="v-tag">Browser</span>
                <span className="v-tag">Mobile UI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="v-trace"></div>
    
        <div className="v-card-wrapper float-med">
          <div className="v-card">
            <div className="v-card-content">
              <div className="v-card-header">
                <Monitor className="v-icon" size={20} />
                <span className="sora-title v-title">React UI</span>
              </div>
              <div className="v-card-details">
                <span className="v-tag">Tailwind</span>
                <span className="v-tag">Framer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="v-trace"></div>

        <div className="v-card-wrapper float-fast">
          <div className="v-card">
            <div className="v-card-content">
              <div className="v-card-header">
                <Settings className="v-icon" size={20} />
                <span className="sora-title v-title">REST API</span>
              </div>
              <div className="v-card-details">
                <span className="v-tag">.NET Core</span>
                <span className="v-tag">C# Logic</span>
              </div>
            </div>
          </div>
        </div>

        <div className="v-trace"></div>

        <div className="v-card-wrapper float-slow">
          <div className="v-card">
            <div className="v-card-content">
              <div className="v-card-header">
                <Database className="v-icon" size={20} />
                <span className="sora-title v-title">SQL Server</span>
              </div>
              <div className="v-card-details">
                <span className="v-tag">EF Core</span>
                <span className="v-tag">T-SQL</span>
              </div>
            </div>
          </div>
        </div>

        <div className="v-trace no-pulse"></div>

        <div className="v-card-wrapper float-med">
          <div className="v-card">
            <div className="v-card-content">
              <div className="v-card-header">
                <CheckCircle className="v-icon v-icon-gold" size={20} />
                <span className="sora-title v-title gold-text-sm">Output</span>
              </div>
              <div className="v-card-details">
                <span className="v-tag">Reports</span>
                <span className="v-tag">Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(`Copied to clipboard: ${text}`);
    setTimeout(() => {
      setCopiedKey(null);
      setToastMessage('');
    }, 2500);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Inquiry from ${formData.name}`,
          from_name: 'Hiren Sudani Portfolio',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({
          type: 'success',
          text: 'Thank you! Your message has been sent directly to Hiren\'s email inbox.',
        });
        setFormData({ name: '', email: '', message: '' });
        setToastMessage('Message sent to Hiren! ✓');
        setTimeout(() => setToastMessage(''), 3500);
      } else {
        setFormStatus({
          type: 'error',
          text: result.message || 'Something went wrong. Please try again or email directly.',
        });
      }
    } catch {
      setFormStatus({
        type: 'error',
        text: 'Network error. Please check your internet connection or email directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main">

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="floating-toast">
          <Check size={16} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      <nav className={`navbar glass-nav ${isMenuOpen ? 'menu-open' : ''}`}>
        <h2 className="logo-text">Hiren Sudani</h2>

        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className="nav-links">
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a
            href="/Hiren_Sudani_Resume.pdf"
            download="Hiren_Sudani_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            <Download size={14} /> Resume
          </a>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div className="nav-backdrop" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Global Background Engine */}
      <div className="global-background">
        <div className="grid-overlay"></div>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <section id="home" className="hero">

        <div className="hero-container">
          <div className="hero-content">

            {/* Left Column: Copy & CTA */}
            <div className="hero-text-column">
              <div className="badge glowing-badge animate-fade-in-up">
                <span className="pulse-dot"></span> Available for Work
              </div>
              <h1 className="hero-title animate-fade-in-up delay-100">
                <span className="hero-muted">Building</span> <span className="text-gradient">Business Software</span><br /> <span className="hero-muted">That Solves Real Problems</span>
              </h1>
              <p className="hero-subtitle animate-fade-in-up delay-200">
                Crafting enterprise-grade applications with clean architecture, fast UX and reliable SQL automation for real business needs.
              </p>
              <div className="identity-badge float-slow animate-fade-in-up delay-300">
                <span className="highlight-text">3+ Years</span>
                <span className="divider"></span>
                <span className="highlight-text">200+ Forms</span>
                <span className="divider"></span>
                <span className="highlight-text">SQL Specialist</span>
              </div>
              <div className="hero-buttons animate-fade-in-up delay-400">
                <a
                  href="/Hiren_Sudani_Resume.pdf"
                  download="Hiren_Sudani_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn resume-glow-btn"
                >
                  <Download size={18} className="btn-icon" /> Download Resume
                </a>
                <a href="#projects" className="btn solid-glow-btn">View Projects</a>
                <a href="#contact" className="btn ghost-btn">Contact Me</a>
              </div>
            </div>

            {/* Right Column: Premium Visual Architecture Layout */}
            <div className="hero-visual-column animate-slide-in-right delay-400">
              <VerticalArchitectureVisualizer />
            </div>

          </div>
        </div>
      </section>

      <section id="about" className="section">
        <FadeInSection>
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Developer Profile</h2>
              <p>
                I develop scalable business software solutions with strong expertise in <span className="highlight">C#</span>, <span className="highlight">.NET Framework</span>, <span className="highlight">SQL Server</span> and API integration.
              </p>
              <p>
                Focused on creating reliable, high-performance systems used in real production environments. Passionate about clean code and modern architecture.
              </p>
            </div>
            <div className="about-visual">
              <div className="tech-grid-container">
                <div className="tech-tag glow-cyan">C# .NET</div>
                <div className="tech-tag glow-cyan">SQL Server</div>
                <div className="tech-tag glow-cyan">REST APIs</div>
                <div className="tech-tag glow-cyan">React.js</div>
                <div className="tech-tag glow-cyan">WinForms</div>
                <div className="tech-tag glow-cyan">EF Core</div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Categorized Tech Skills Section */}
      <section id="skills" className="section skills-section">
        <FadeInSection>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="skills-subtitle">
            Core technologies and tools I utilize to engineer mission-critical enterprise systems.
          </p>

          <div className="skills-grid">
            
            {/* Backend Card */}
            <div className="skill-card glass-panel tilt-card">
              <div className="skill-card-header">
                <div className="skill-icon-wrap glow-purple">
                  <Server size={24} />
                </div>
                <h3>Backend & APIs</h3>
              </div>
              <div className="skill-tags-group">
                <span className="skill-pill">C#</span>
                <span className="skill-pill">.NET Core / 8</span>
                <span className="skill-pill">ASP.NET Web API</span>
                <span className="skill-pill">Entity Framework Core</span>
                <span className="skill-pill">LINQ</span>
                <span className="skill-pill">Microservices</span>
              </div>
            </div>

            {/* Database Card */}
            <div className="skill-card glass-panel tilt-card">
              <div className="skill-card-header">
                <div className="skill-icon-wrap glow-cyan">
                  <Database size={24} />
                </div>
                <h3>Database & SQL</h3>
              </div>
              <div className="skill-tags-group">
                <span className="skill-pill">SQL Server</span>
                <span className="skill-pill">T-SQL</span>
                <span className="skill-pill">Stored Procedures</span>
                <span className="skill-pill">Query Optimization</span>
                <span className="skill-pill">Index Tuning</span>
                <span className="skill-pill">Schema Design</span>
              </div>
            </div>

            {/* Frontend & Desktop Card */}
            <div className="skill-card glass-panel tilt-card">
              <div className="skill-card-header">
                <div className="skill-icon-wrap glow-blue">
                  <Layout size={24} />
                </div>
                <h3>Frontend & Desktop</h3>
              </div>
              <div className="skill-tags-group">
                <span className="skill-pill">React.js</span>
                <span className="skill-pill">JavaScript (ES6+)</span>
                <span className="skill-pill">WinForms</span>
                <span className="skill-pill">HTML5 / CSS3</span>
                <span className="skill-pill">Responsive UI</span>
                <span className="skill-pill">Tailwind CSS</span>
              </div>
            </div>

            {/* Tools & Workflow Card */}
            <div className="skill-card glass-panel tilt-card">
              <div className="skill-card-header">
                <div className="skill-icon-wrap glow-amber">
                  <Wrench size={24} />
                </div>
                <h3>Tools & Environment</h3>
              </div>
              <div className="skill-tags-group">
                <span className="skill-pill">Visual Studio</span>
                <span className="skill-pill">SQL Server Mgmt (SSMS)</span>
                <span className="skill-pill">Git & GitHub</span>
                <span className="skill-pill">Postman</span>
                <span className="skill-pill">IIS Server</span>
                <span className="skill-pill">Debugging & Profiling</span>
              </div>
            </div>

          </div>
        </FadeInSection>
      </section>

      <section id="services" className="section bento-section">
        <FadeInSection>
          <h2 className="section-title">What I Build</h2>
          <div className="bento-grid">
            <svg className="flow-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M50 0 L50 150" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.5" strokeDasharray="2,2" fill="none" />
            </svg>

            {/* Box 1 */}
            <div className="bento-card float-slow tilt-card feature-bus">
              <span className="corner top-left">+</span><span className="corner top-right">+</span>
              <span className="corner bottom-left">+</span><span className="corner bottom-right">+</span>
              <div className="service-icon"><span className="checkmark-anim"></span></div>
              <h3>Enterprise ERP & SaaS</h3>
              <p className="silver-desc">Architecting scalable business management systems with C# and .NET.</p>
              <div className="bento-tags">
                <span>C#</span><span>.NET Core</span><span>Microservices</span>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bento-card float-med tilt-card feature-inv">
              <span className="corner top-left">+</span><span className="corner top-right">+</span>
              <span className="corner bottom-left">+</span><span className="corner bottom-right">+</span>
              <div className="service-icon"><span className="checkmark-anim"></span></div>
              <h3>Inventory & Warehouse Logic</h3>
              <p className="silver-desc">Developing mission-critical stock tracking and supply chain automation.</p>
              <div className="bento-tags">
                <span>WinForms</span><span>EF Core</span>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bento-card float-fast tilt-card feature-api">
              <span className="corner top-left">+</span><span className="corner top-right">+</span>
              <span className="corner bottom-left">+</span><span className="corner bottom-right">+</span>
              <div className="service-icon"><span className="checkmark-anim"></span></div>
              <h3>High-Performance REST APIs</h3>
              <p className="silver-desc">Building secure, stateless backend services for seamless data integration.</p>
              <div className="bento-tags">
                <span>ASP.NET Web API</span><span>JWT</span>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bento-card float-slow tilt-card feature-desktop">
              <span className="corner top-left">+</span><span className="corner top-right">+</span>
              <span className="corner bottom-left">+</span><span className="corner bottom-right">+</span>
              <div className="service-icon"><span className="checkmark-anim"></span></div>
              <h3>Production SQL Architectures</h3>
              <p className="silver-desc">Designing optimized database schemas and complex stored procedures for high-load environments.</p>
              <div className="bento-tags">
                <span>SQL Server</span><span>T-SQL</span><span>Optimization</span>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section id="projects" className="section">
        <FadeInSection>
          <h2 className="section-title">Featured Enterprise Projects</h2>
          <div className="projects-grid projects-asym relative-container">
            {/* Gradient Connecting to Impact */}
            <div className="vertical-gradient-line hidden-mobile"></div>

            <div className="project-desktop glass-panel">
              <div className="mac-header">
                <span className="mac-dot red"></span>
                <span className="mac-dot yellow"></span>
                <span className="mac-dot green"></span>
                <span className="project-system-badge">Enterprise Production System</span>
              </div>
              <div className="project-body">
                <h3>Diamond Inventory Management</h3>
                <p>Large-scale product-based solution for diamond stock tracking, multi-location inventory, order workflows, and real-time analytical reporting.</p>
                <div className="tech-capsules">
                  <span className="capsule">C#</span>
                  <span className="capsule">SQL Server</span>
                  <span className="capsule">.NET</span>
                  <span className="capsule">Stored Procedures</span>
                </div>
                <div className="project-meta-pill">
                  ⚡ Live Production Environment
                </div>
              </div>
            </div>

            <div className="project-desktop glass-panel">
              <div className="mac-header">
                <span className="mac-dot red"></span>
                <span className="mac-dot yellow"></span>
                <span className="mac-dot green"></span>
                <span className="project-system-badge">Enterprise Production System</span>
              </div>
              <div className="project-body">
                <h3>Textile Management Software</h3>
                <p>Automated textile manufacturing, inventory ledger, batch tracking, and invoice billing software powered by C# and high-performance SQL Server.</p>
                <div className="tech-capsules">
                  <span className="capsule">C#</span>
                  <span className="capsule">WinForms</span>
                  <span className="capsule">SQL Server</span>
                  <span className="capsule">Fast UX</span>
                </div>
                <div className="project-meta-pill">
                  ⚡ Live Production Environment
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section id="impact" className="section stats-section">
        <div className="impact-radial-glow"></div>
        <FadeInSection>
          <h2 className="section-title">Industry Footprint</h2>
          <div className="impact-cards-container">
            <div className="stat-glass-card float-slow stat-hover-lift tilt-card">
              <h3 className="metallic-text">200+</h3>
              <p className="impact-label">Enterprise UI Modules Deployed</p>
            </div>

            <div className="stat-glass-card float-med stat-hover-lift tilt-card">
              <h3 className="metallic-text">50+</h3>
              <p className="impact-label">High-Availability SQL Instances</p>
            </div>

            <div className="stat-glass-card float-fast stat-hover-lift tilt-card">
              <div className="pulse-indicator-live">
                <span className="live-dot"></span> Live
              </div>
              <h3 className="metallic-text">99.9%</h3>
              <p className="impact-label">Zero-Downtime Deployments</p>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Upgraded Contact Section */}
      <section id="contact" className="section contact-section">
        <FadeInSection>
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Let's discuss how I can contribute to your software architecture or enterprise development needs.
          </p>

          <div className="contact-container">
            
            {/* Left Column: Quick Info Cards */}
            <div className="contact-info-column">
              
              {/* Phone Card */}
              <div className="contact-info-card glass-panel">
                <div className="info-icon-box">
                  <Phone size={20} />
                </div>
                <div className="info-details">
                  <span className="info-label">Phone Number</span>
                  <a href="tel:+919537162540" className="info-value">+91 9537162540</a>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyToClipboard('+919537162540', 'phone')}
                  title="Copy Phone Number"
                >
                  {copiedKey === 'phone' ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Email Card */}
              <div className="contact-info-card glass-panel">
                <div className="info-icon-box">
                  <Mail size={20} />
                </div>
                <div className="info-details">
                  <span className="info-label">Email Address</span>
                  <a href="mailto:hirensudani690@gmail.com" className="info-value">hirensudani690@gmail.com</a>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyToClipboard('hirensudani690@gmail.com', 'email')}
                  title="Copy Email Address"
                >
                  {copiedKey === 'email' ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Location Card */}
              <div className="contact-info-card glass-panel">
                <div className="info-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="info-details">
                  <span className="info-label">Location</span>
                  <span className="info-value">Surat, Gujarat, India</span>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="contact-info-card glass-panel">
                <div className="info-icon-box">
                  <Linkedin size={20} />
                </div>
                <div className="info-details">
                  <span className="info-label">LinkedIn Profile</span>
                  <a
                    href="https://www.linkedin.com/in/hiren-sudani-148a9023b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-value link-highlight"
                  >
                    linkedin.com/in/hiren-sudani-148a9023b
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Direct Message Form */}
            <div className="contact-form-column">
              <form onSubmit={handleFormSubmit} className="contact-form glass-panel">
                <h3 className="form-title">Send a Direct Message</h3>

                {formStatus && (
                  <div className={formStatus.type === 'success' ? 'form-success-banner' : 'form-error-banner'}>
                    {formStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span>{formStatus.text}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    rows="4"
                    placeholder="Let's build something together..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn solid-glow-btn form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spinner" /> Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </FadeInSection>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Hiren Sudani. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;