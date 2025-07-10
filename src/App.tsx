import React, { useState, useEffect } from 'react';
import { ChevronDown, Code2, Brain, Database, Globe, Palette, Calculator, Home, User, FolderOpen, Mail, ExternalLink, Github, Linkedin, FileText, ArrowRight, Sparkles, TrendingUp, Zap, Menu, X } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Handle browser back/forward buttons
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || 'home';
      setCurrentPage(page);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial state
    if (!window.history.state) {
      window.history.replaceState({ page: 'home' }, '', '#home');
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.history.pushState({ page }, '', `#${page}`);
  };

  const skills = [
    { 
      name: 'Machine Learning', 
      icon: Brain, 
      techs: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'], 
      level: 85,
      description: 'Building predictive models and data analysis solutions'
    },
    { 
      name: 'Frontend Development', 
      icon: Globe, 
      techs: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'JSON'], 
      level: 80,
      description: 'Creating responsive and interactive web applications'
    },
    { 
      name: 'Programming', 
      icon: Code2, 
      techs: ['Python', 'JavaScript', 'C++', 'C'], 
      level: 75,
      description: 'Strong foundation in multiple programming languages'
    },
    { 
      name: 'Data Analysis', 
      icon: Database, 
      techs: ['Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis'], 
      level: 78,
      description: 'Extracting insights from complex datasets'
    },
    { 
      name: 'Design Tools', 
      icon: Palette, 
      techs: ['Canva', 'UI/UX Principles', 'Visual Design'], 
      level: 70,
      description: 'Creating visually appealing designs and presentations'
    }
  ];

  const projects = [
    {
      title: 'Web Series Recommender',
      description: 'An intelligent recommendation system that suggests web series based on user preferences using machine learning algorithms. Features collaborative filtering and content-based recommendations.',
      tech: ['Python', 'Pandas', 'Scikit-learn', 'Flask', 'HTML/CSS'],
      image: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Machine Learning',
      highlights: ['Collaborative Filtering', 'Content-Based Filtering', 'User Interface', 'Data Processing'],
      githubLink: 'https://github.com/samiksha-chandel/Web-Series-Recommender'
    },
    {
      title: 'Ames House Price Predictor',
      description: 'A comprehensive machine learning model that predicts house prices based on various features like location, size, amenities. Includes data preprocessing and model evaluation.',
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Machine Learning',
      highlights: ['Regression Analysis', 'Feature Engineering', 'Data Visualization', 'Model Optimization'],
      githubLink: 'https://github.com/samiksha-chandel/Ames-House-Price-Predictor'
    },
    {
      title: 'Scientific Calculator',
      description: 'A feature-rich scientific calculator built with modern web technologies. Supports complex mathematical operations, scientific functions, and has an intuitive user interface.',
      tech: ['JavaScript', 'React', 'HTML/CSS', 'Tailwind CSS'],
      image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Web Development',
      highlights: ['Complex Calculations', 'Responsive Design', 'Error Handling', 'Modern UI'],
      githubLink: 'https://github.com/samiksha-chandel/Scientific-Calculator'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <div className={`transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );

  const GlassCard = ({ children, className = '', hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) => (
    <div className={`backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-xl ${hover ? 'hover:bg-white/30 hover:shadow-2xl hover:-translate-y-1' : ''} transition-all duration-300 ${className}`}>
      {children}
    </div>
  );

  const Navigation = () => (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                <Brain size={24} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-800">Samiksha Chandel</span>
                <p className="text-sm text-gray-600">ML Enthusiast</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'about', label: 'About', icon: User },
                { id: 'projects', label: 'Projects', icon: FolderOpen },
                { id: 'contact', label: 'Contact', icon: Mail }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    currentPage === item.id 
                      ? 'bg-white/30 text-purple-700 shadow-lg' 
                      : 'text-gray-700 hover:bg-white/20'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Resume Button - Hidden on small screens */}
              <a 
                href="https://your-resume-link-here.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl items-center space-x-2"
              >
                <FileText size={18} />
                <span>Resume</span>
              </a>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden bg-white/20 hover:bg-white/30 text-gray-800 p-2.5 rounded-xl transition-all duration-300 border border-white/30 shadow-lg"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="backdrop-blur-lg bg-white/20 border-t border-white/20 px-6 py-4">
            <div className="space-y-2">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'about', label: 'About', icon: User },
                { id: 'projects', label: 'Projects', icon: FolderOpen },
                { id: 'contact', label: 'Contact', icon: Mail }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentPage === item.id 
                      ? 'bg-white/30 text-purple-700 shadow-lg' 
                      : 'text-gray-700 hover:bg-white/20'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              {/* Resume Button in Mobile Menu */}
              <a 
                href="https://your-resume-link-here.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText size={20} />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100/80 to-pink-100/80 backdrop-blur-sm text-purple-800 rounded-full text-sm font-medium border border-white/30">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Open to ML Internships
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight">
                  Machine Learning
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Enthusiast
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Passionate about building intelligent systems and extracting insights from data. 
                  Ready to contribute fresh perspectives to your ML team.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigateToPage('projects')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 group"
                >
                  <FolderOpen size={20} />
                  <span>View Projects</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigateToPage('about')}
                  className="backdrop-blur-lg bg-white/20 hover:bg-white/30 text-gray-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl flex items-center space-x-3"
                >
                  <User size={20} />
                  <span>About Me</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <GlassCard className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                  <div className="text-gray-600 text-sm">Major Projects</div>
                </GlassCard>
                <GlassCard className="p-6 text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">5+</div>
                  <div className="text-gray-600 text-sm">Tech Skills</div>
                </GlassCard>
                <GlassCard className="p-6 text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">ML</div>
                  <div className="text-gray-600 text-sm">Focused</div>
                </GlassCard>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <GlassCard className="w-80 h-80 lg:w-96 lg:h-96 mx-auto p-8 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                      <Brain size={64} className="text-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-800">Ready to Learn</h3>
                      <p className="text-gray-600">Eager to apply ML knowledge in real-world scenarios</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400/40 to-pink-400/40 rounded-2xl backdrop-blur-sm animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-3xl backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection('skills')} className="text-gray-400 hover:text-purple-600 transition-colors">
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      {/* Skills Preview Section */}
      <section id="skills" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Technical Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building a strong foundation in machine learning and web development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <GlassCard key={index} className="p-8 group">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-purple-100/80 to-pink-100/80 p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                    <skill.icon size={28} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{skill.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex-1 bg-gray-200/50 rounded-full h-2 mr-3 backdrop-blur-sm">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000" 
                          style={{width: `${skill.level}%`}}
                        ></div>
                      </div>
                      <span className="text-sm text-purple-600 font-semibold">{skill.level}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.techs.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-white/40 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );

  const AboutPage = () => (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">About Me</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passionate computer science student with a keen interest in machine learning and data science
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Journey</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  I'm a computer science student passionate about the intersection of technology and intelligence. 
                  My journey into machine learning began with curiosity about how computers can learn and make decisions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Through hands-on projects and continuous learning, I've developed skills in Python, data analysis, 
                  and web development. I'm particularly interested in recommendation systems, predictive modeling, 
                  and creating user-friendly interfaces for complex algorithms.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I'm eager to apply my knowledge in a real-world setting and contribute to innovative ML solutions 
                  that can make a positive impact.
                </p>
              </GlassCard>
            </div>

            <div className="space-y-6">
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">What I Bring</h3>
                <div className="space-y-4">
                  {[
                    { icon: Brain, title: 'Fresh Perspective', desc: 'Eager to learn and adapt to new technologies' },
                    { icon: Zap, title: 'Quick Learner', desc: 'Fast at picking up new concepts and tools' },
                    { icon: TrendingUp, title: 'Growth Mindset', desc: 'Constantly improving and seeking challenges' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-purple-100/80 to-pink-100/80 p-3 rounded-lg backdrop-blur-sm">
                        <item.icon size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Learning Goals</h3>
                <div className="space-y-3">
                  {[
                    'Deep Learning & Neural Networks',
                    'Advanced Data Science Techniques',
                    'MLOps & Model Deployment',
                    'Computer Vision Applications',
                    'Natural Language Processing'
                  ].map((goal, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span className="text-gray-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );

  const ProjectsPage = () => (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">My Projects</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showcasing my journey in machine learning and web development through practical applications
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-12">
            {projects.map((project, index) => (
              <GlassCard key={index} className="overflow-hidden group">
                <div className="lg:flex">
                  <div className="lg:w-2/5 aspect-video lg:aspect-square relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-3/5 p-8 lg:p-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">{project.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">{project.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {project.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                            <span className="text-gray-700 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 text-purple-800 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      >
                        <ExternalLink size={18} />
                        <span>View Project</span>
                      </a>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );

  const ContactPage = () => (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">Let's Connect</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to contribute to your ML team and learn from industry experts. Let's discuss opportunities!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-purple-100/80 to-pink-100/80 p-3 rounded-lg backdrop-blur-sm">
                    <Mail size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a href="mailto:jennachandel14@gmail.com" className="text-purple-600 hover:text-purple-700 transition-colors">
                      jennachandel14@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-purple-100/80 to-pink-100/80 p-3 rounded-lg backdrop-blur-sm">
                    <Sparkles size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Status</p>
                    <p className="text-green-600">Available for internships</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">What I'm Looking For</h3>
              <div className="space-y-3">
                {[
                  'Machine Learning Internships',
                  'Data Science Opportunities',
                  'Research Assistant Positions',
                  'AI/ML Project Collaborations'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="text-center space-y-8">
            <GlassCard className="p-8 inline-block">
              <p className="text-gray-600 mb-6">
                <strong className="text-gray-800">Ready to start immediately</strong> and contribute to your team's success
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:jennachandel14@email.com" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3"
                >
                  <Mail size={20} />
                  <span>Send Message</span>
                </a>
              </div>
            </GlassCard>

            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.linkedin.com/in/samiksha-chandel" 
                target="_blank"
                rel="noopener noreferrer"
                className="backdrop-blur-lg bg-white/20 hover:bg-white/30 text-gray-800 p-4 rounded-xl transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://github.com/samiksha-chandel" 
                target="_blank"
                rel="noopener noreferrer"
                className="backdrop-blur-lg bg-white/20 hover:bg-white/30 text-gray-800 p-4 rounded-xl transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl"
              >
                <Github size={24} />
              </a>
            </div>

            <p className="text-gray-500 text-sm">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about': return <AboutPage />;
      case 'projects': return <ProjectsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Navigation />
      {renderCurrentPage()}
    </div>
  );
}

export default App;