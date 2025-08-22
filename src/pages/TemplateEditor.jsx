import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Template1 } from '../templates/Template1';
import { Template2 } from '../templates/Template2';
import { Template3 } from '../templates/Template3';
import { Template4 } from '../templates/Template4';
import { Template5 } from '../templates/Template5';
import { Template6 } from '../templates/Template6';
import { Template7 } from '../templates/Template7';
import { Template8 } from '../templates/Template8';
import { Template9 } from '../templates/Template9';
import { Template10 } from '../templates/Template10';
import { Template11 } from '../templates/Template11';
import { Template12 } from '../templates/Template12';
import { Template13 } from '../templates/Template13';
import { Template14 } from '../templates/Template14';
import { Template15 } from '../templates/Template15';
import { Template16 } from '../templates/Template16';
import { Template17 } from '../templates/Template17';
import { Template18 } from '../templates/Template18';
import { Template19 } from '../templates/Template19';
import { Template20 } from '../templates/Template20';
import { Template21 } from '../templates/Template21';
import { Template22} from '../templates/Template22';

function TemplateEditor() {
  const { templateId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const controls = useAnimation();
  const buttonControls = useAnimation();
  
  const [portfolioId, setPortfolioId] = useState(null);
  const [repoUrl, setRepoUrl] = useState(null);
  const [components, setComponents] = useState({
    name: '',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    whatsapp: '',
    skills: [],
    projects: [],
    certificates: [],
    profilePic: null,
    resumeUrl: null,
    design: {
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
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [projectImages, setProjectImages] = useState([]);
  const [certificateImages, setCertificateImages] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewMode, setPreviewMode] = useState(true);
  const [deployedUrl, setDeployedUrl] = useState(null);
  const [skillSearch, setSkillSearch] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [showCustomSkillInput, setShowCustomSkillInput] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);

  const CLOUDINARY_CLOUD_NAME = 'drc8bufjn';
  const CLOUDINARY_UPLOAD_PRESET = 'Portfolio';

  const SKILLS_LIST = [
    { name: '🌟 JavaScript', icon: 'fa-brands fa-js' },
    { name: '⚛ React', icon: 'fa-brands fa-react' },
    { name: '🟢 Node.js', icon: 'fa-brands fa-node-js' },
    { name: '🐍 Python', icon: 'fa-brands fa-python' },
    { name: '☕ Java', icon: 'fa-brands fa-java' },
    { name: '📄 HTML', icon: 'fa-brands fa-html5' },
    { name: '🎨 CSS', icon: 'fa-brands fa-css3-alt' },
    { name: '🗄 SQL', icon: 'fa-solid fa-database' },
    { name: '🔄 Git', icon: 'fa-brands fa-git-alt' },
    { name: '☁ AWS', icon: 'fa-brands fa-aws' },
    { name: '🐳 Docker', icon: 'fa-brands fa-docker' },
    { name: '⚙ Kubernetes', icon: 'fa-solid fa-dharmachakra' },
    { name: '🟦 TypeScript', icon: 'fa-solid fa-code' },
    { name: '🌀 GraphQL', icon: 'fa-solid fa-rocket' },
    { name: '🍃 MongoDB', icon: 'fa-solid fa-leaf' },
    { name: '🐘 PostgreSQL', icon: 'fa-solid fa-database' },
    { name: '🖥 Express', icon: 'fa-solid fa-server' },
    { name: '🐍 Django', icon: 'fa-brands fa-python' },
    { name: '🧪 Flask', icon: 'fa-brands fa-python' },
    { name: '🅰 Angular', icon: 'fa-brands fa-angular' },
    { name: '🌿 Vue.js', icon: 'fa-brands fa-vuejs' },
    { name: '⚡ Redux', icon: 'fa-solid fa-atom' },
    { name: '📦 Webpack', icon: 'fa-solid fa-cube' },
    { name: '🔄 Babel', icon: 'fa-solid fa-code' },
    { name: '💨 Tailwind CSS', icon: 'fa-solid fa-wind' },
    { name: '👢 Bootstrap', icon: 'fa-brands fa-bootstrap' },
    { name: '🎨 SASS', icon: 'fa-brands fa-sass' },
    { name: '📝 LESS', icon: 'fa-solid fa-code' },
    { name: '🧪 Jest', icon: 'fa-solid fa-vial' },
    { name: '☕ Mocha', icon: 'fa-solid fa-mug-hot' },
    { name: '🌳 Cypress', icon: 'fa-solid fa-tree' },
    { name: '🤯 Natural Language Processing (NLP)', icon: 'fa-solid fa-brain' },
    { name: '🗣 Speech Recognition', icon: 'fa-solid fa-microphone' },
    { name: '👁 Computer Vision', icon: 'fa-solid fa-eye' },
    { name: '🔥 PyTorch', icon: 'fa-solid fa-fire' },
    { name: '🦾 Hugging Face Transformers', icon: 'fa-solid fa-robot' },
    { name: '🧠 Keras', icon: 'fa-solid fa-brain' },
    { name: '📈 XGBoost', icon: 'fa-solid fa-chart-line' },
    { name: '🌲 Random Forests', icon: 'fa-solid fa-tree' },
    { name: '🎯 Support Vector Machines', icon: 'fa-solid fa-cogs' },
    { name: '📷 OpenCV', icon: 'fa-solid fa-camera' },
    { name: '📖 OCR', icon: 'fa-solid fa-text' },
    { name: '🛠 Feature Engineering', icon: 'fa-solid fa-tools' },
    { name: '📊 A/B Testing', icon: 'fa-solid fa-flask' },
    { name: '🛸 MLOps', icon: 'fa-solid fa-cogs' },
    { name: '🧹 Data Cleaning', icon: 'fa-solid fa-broom' },
    { name: '🗜 Dimensionality Reduction', icon: 'fa-solid fa-compress' },
    { name: '⏰ Time Series Analysis', icon: 'fa-solid fa-clock' },
    { name: '📉 Regression Analysis', icon: 'fa-solid fa-chart-line' },
    { name: '🧠 LSTM', icon: 'fa-solid fa-brain' },
    { name: '🤖 GANs', icon: 'fa-solid fa-robot' },
    { name: '🔌 Axios', icon: 'fa-solid fa-plug' },
    { name: '⬇ Fetch API', icon: 'fa-solid fa-cloud-download' },
    { name: '🌐 RESTful APIs', icon: 'fa-solid fa-network-wired' },
    { name: '🌀 GraphQL APIs', icon: 'fa-solid fa-rocket' },
    { name: '🔒 OAuth 2.0', icon: 'fa-solid fa-lock' },
    { name: '📜 OpenAPI (Swagger)', icon: 'fa-solid fa-file-code' },
    { name: '💳 Stripe Integration', icon: 'fa-brands fa-stripe' },
    { name: '🛡 Auth0', icon: 'fa-solid fa-shield-alt' },
    { name: '🔐 Firebase Auth', icon: 'fa-brands fa-google' },
    { name: '📧 SendGrid', icon: 'fa-solid fa-envelope' },
    { name: '🦋 Flutter', icon: 'fa-brands fa-flutter' },
    { name: '🤖 Kotlin Android', icon: 'fa-brands fa-android' },
    { name: '🎨 Jetpack Compose', icon: 'fa-solid fa-paint-brush' },
    { name: '📱 Android SDK', icon: 'fa-brands fa-android' },
    { name: '⚛ React Native', icon: 'fa-brands fa-react' },
    { name: '📲 Expo', icon: 'fa-solid fa-mobile-alt' },
    { name: '🍎 SwiftUI', icon: 'fa-brands fa-apple' },
    { name: '📱 iOS SDK', icon: 'fa-brands fa-apple' },
    { name: '⚡ Ionic', icon: 'fa-solid fa-mobile-alt' },
    { name: '🔌 Cordova', icon: 'fa-solid fa-plug' },
    { name: '🎨 Figma', icon: 'fa-brands fa-figma' },
    { name: '🖌 Adobe XD', icon: 'fa-brands fa-adobe' },
    { name: '🎬 Framer Motion', icon: 'fa-solid fa-film' },
    { name: '🖼 Material UI', icon: 'fa-solid fa-paint-roller' },
    { name: '🐜 Ant Design', icon: 'fa-solid fa-ant' },
    { name: '🖌 Styled Components', icon: 'fa-solid fa-paint-brush' },
    { name: '📊 Chart.js', icon: 'fa-solid fa-chart-bar' },
    { name: '📈 Recharts', icon: 'fa-solid fa-chart-line' },
    { name: '📊 D3.js', icon: 'fa-solid fa-chart-pie' },
    { name: '✅ ESLint', icon: 'fa-solid fa-check-circle' },
    { name: '🗺 MVC Architecture', icon: 'fa-solid fa-sitemap' },
    { name: '🌐 Service-Oriented Architecture (SOA)', icon: 'fa-solid fa-network-wired' },
    { name: '🧩 Microservices', icon: 'fa-solid fa-cubes' },
    { name: '🔌 WebSockets', icon: 'fa-solid fa-plug' },
    { name: '🛠 Middleware', icon: 'fa-solid fa-layer-group' },
    { name: '🔑 JWT', icon: 'fa-solid fa-key' },
    { name: '🔒 OAuth', icon: 'fa-solid fa-lock' },
    { name: '⚓ Webhooks', icon: 'fa-solid fa-anchor' },
    { name: '⏱ API Rate Limiting', icon: 'fa-solid fa-tachometer-alt' },
    { name: '🗜 Compression', icon: 'fa-solid fa-compress-arrows-alt' },
    { name: '☁ CloudFormation', icon: 'fa-brands fa-aws' },
    { name: '📊 CloudWatch', icon: 'fa-brands fa-aws' },
    { name: '💸 Billing & Cost Optimization', icon: 'fa-solid fa-dollar-sign' },
    { name: '🔐 IAM (Identity & Access Management)', icon: 'fa-solid fa-user-shield' },
    { name: '🗃 S3', icon: 'fa-brands fa-aws' },
    { name: '⚡ Lambda', icon: 'fa-brands fa-aws' },
    { name: '🖥 EC2', icon: 'fa-brands fa-aws' },
    { name: '🗄 RDS', icon: 'fa-brands fa-aws' },
    { name: '☁ Azure Functions', icon: 'fa-brands fa-microsoft' },
    { name: '📊 GCP BigQuery', icon: 'fa-brands fa-google' },
    { name: '🔄 CircleCI', icon: 'fa-brands fa-circle' },
    { name: '🔄 Travis CI', icon: 'fa-brands fa-travis' },
    { name: '⛵ Helm', icon: 'fa-solid fa-ship' },
    { name: '📦 Artifactory', icon: 'fa-solid fa-box' },
    { name: '📈 Prometheus', icon: 'fa-solid fa-chart-line' },
    { name: '📊 Grafana', icon: 'fa-solid fa-tachometer-alt' },
    { name: '🔒 Vault (HashiCorp)', icon: 'fa-solid fa-vault' },
    { name: '🌐 Consul', icon: 'fa-solid fa-network-wired' },
    { name: '⚙ Rundeck', icon: 'fa-solid fa-cogs' },
    { name: '📦 Nexus Repository', icon: 'fa-solid fa-boxes' },
    { name: '🕵 Metasploit', icon: 'fa-solid fa-bug' },
    { name: '🛡 Burp Suite', icon: 'fa-solid fa-shield-alt' },
    { name: '🦠 Malware Analysis', icon: 'fa-solid fa-virus' },
    { name: '💉 SQL Injection', icon: 'fa-solid fa-syringe' },
    { name: '🔒 Zero Trust', icon: 'fa-solid fa-lock' },
    { name: '🚨 Incident Response', icon: 'fa-solid fa-shield-alt' },
    { name: '🔍 Digital Forensics', icon: 'fa-solid fa-search' },
    { name: '🛡 Snort IDS', icon: 'fa-solid fa-shield-alt' },
    { name: '🔑 Public Key Infrastructure (PKI)', icon: 'fa-solid fa-key' },
    { name: '🔗 Blockchain Security', icon: 'fa-solid fa-link' },
    { name: '➗ Linear Algebra', icon: 'fa-solid fa-square-root-alt' },
    { name: '🧮 Discrete Math', icon: 'fa-solid fa-calculator' },
    { name: '📊 Probability & Stats', icon: 'fa-solid fa-chart-bar' },
    { name: '🌐 Graph Theory', icon: 'fa-solid fa-project-diagram' },
    { name: '📈 Big O Notation', icon: 'fa-solid fa-chart-line' },
    { name: '🔄 Recursion', icon: 'fa-solid fa-redo' },
    { name: '🧠 Dynamic Programming', icon: 'fa-solid fa-code' },
    { name: '🤝 Greedy Algorithms', icon: 'fa-solid fa-hand-holding' },
    { name: '📈 Sorting Algorithms', icon: 'fa-solid fa-sort' },
    { name: '🔍 Search Algorithms', icon: 'fa-solid fa-search' },
    { name: '📋 Trello', icon: 'fa-brands fa-trello' },
    { name: '📊 Jira', icon: 'fa-brands fa-jira' },
    { name: '💬 Slack', icon: 'fa-brands fa-slack' },
    { name: '📝 Notion', icon: 'fa-solid fa-sticky-note' },
    { name: '📚 Confluence', icon: 'fa-brands fa-confluence' },
    { name: '✅ ClickUp', icon: 'fa-solid fa-check-square' },
    { name: '📅 Google Calendar', icon: 'fa-brands fa-google' },
    { name: '💻 Microsoft Teams', icon: 'fa-brands fa-microsoft' },
    { name: '📋 Asana', icon: 'fa-solid fa-tasks' },
    { name: '🗓 Monday.com', icon: 'fa-solid fa-calendar-alt' },
    { name: '🎨 Color Theory', icon: 'fa-solid fa-palette' },
    { name: '👁 Contrast Ratios', icon: 'fa-solid fa-eye' },
    { name: '⌨ Keyboard Navigation', icon: 'fa-solid fa-keyboard' },
    { name: '🦻 Screen Readers', icon: 'fa-solid fa-assistive-listening-systems' },
    { name: '♿ ARIA Roles', icon: 'fa-solid fa-universal-access' },
    { name: '📱 Responsive Design', icon: 'fa-solid fa-mobile-alt' },
    { name: '📐 Grid Systems', icon: 'fa-solid fa-th' },
    { name: '✍ UX Writing', icon: 'fa-solid fa-pen' },
    { name: '🖱 Micro-interactions', icon: 'fa-solid fa-hand-pointer' },
    { name: '🧠 Cognitive Load', icon: 'fa-solid fa-brain' },
    { name: '🌐 WordPress', icon: 'fa-brands fa-wordpress' },
    { name: '📁 Joomla', icon: 'fa-brands fa-joomla' },
    { name: '📝 Drupal', icon: 'fa-brands fa-drupal' },
    { name: '🛒 Shopify', icon: 'fa-brands fa-shopify' },
    { name: '🧰 Wix', icon: 'fa-brands fa-wix' },
    { name: '🌊 Webflow', icon: 'fa-solid fa-stream' },
    { name: '👻 Ghost CMS', icon: 'fa-solid fa-ghost' },
    { name: '🟪 Squarespace', icon: 'fa-solid fa-square' },
    { name: '📚 Contentful', icon: 'fa-solid fa-content' },
    { name: '🧠 Sanity.io', icon: 'fa-solid fa-brain' },
    { name: '🐧 Linux', icon: 'fa-brands fa-linux' },
    { name: '💻 PowerShell', icon: 'fa-brands fa-windows' },
    { name: '⌨ Shell Scripting', icon: 'fa-solid fa-terminal' },
    { name: '🖥 Windows Server', icon: 'fa-brands fa-windows' },
    { name: '⏰ cron jobs', icon: 'fa-solid fa-clock' },
    { name: '⚙ systemd', icon: 'fa-solid fa-cogs' },
    { name: '📂 File Permissions', icon: 'fa-solid fa-folder' },
    { name: '📋 Process Management', icon: 'fa-solid fa-tasks' },
    { name: '📚 Bash Arrays', icon: 'fa-solid fa-code' },
    { name: '⚙ Environment Variables', icon: 'fa-solid fa-cog' },
    { name: '🔄 Git Rebase', icon: 'fa-brands fa-git-alt' },
    { name: '🔀 Git Merge', icon: 'fa-brands fa-git-alt' },
    { name: '🧹 Git Clean', icon: 'fa-brands fa-git-alt' },
    { name: '📦 Git Stash', icon: 'fa-brands fa-git-alt' },
    { name: '🏷 Git Tags', icon: 'fa-brands fa-git-alt' },
    { name: '🧩 Git Submodules', icon: 'fa-brands fa-git-alt' },
    { name: '📁 Git Worktree', icon: 'fa-brands fa-git-alt' },
    { name: '🔍 Git Blame', icon: 'fa-brands fa-git-alt' },
    { name: '📊 GitHub Projects', icon: 'fa-brands fa-github' },
    { name: '🔄 GitLab CI/CD', icon: 'fa-brands fa-gitlab' },
    { name: '🖥 C', icon: 'fa-solid fa-code' },
    { name: '➕ C++', icon: 'fa-solid fa-code' },
    { name: '♯ C#', icon: 'fa-solid fa-code' },
    { name: '💎 Ruby', icon: 'fa-solid fa-gem' },
    { name: '🛤 Rails', icon: 'fa-solid fa-train' },
    { name: '🐘 PHP', icon: 'fa-brands fa-php' },
    { name: '📚 Laravel', icon: 'fa-brands fa-laravel' },
    { name: '⚡ Symfony', icon: 'fa-solid fa-bolt' },
    { name: '🦜 Swift', icon: 'fa-brands fa-swift' },
    { name: '📜 Go', icon: 'fa-solid fa-code' },
    { name: '🦀 Rust', icon: 'fa-brands fa-rust' },
    { name: '🛠 Scala', icon: 'fa-solid fa-code' },
    { name: '☕ Spring Boot', icon: 'fa-brands fa-java' },
    { name: '🗄 MySQL', icon: 'fa-solid fa-database' },
    { name: '🗃 Redis', icon: 'fa-solid fa-database' },
    { name: '🛠 Elasticsearch', icon: 'fa-solid fa-search' },
    { name: '📦 Next.js', icon: 'fa-brands fa-react' },
    { name: '🖼 Nuxt.js', icon: 'fa-brands fa-vuejs' },
    { name: '⚡ Svelte', icon: 'fa-solid fa-code' },
    { name: '📚 Prisma', icon: 'fa-solid fa-database' },
    { name: '🛠 Sequelize', icon: 'fa-solid fa-database' },
    { name: '🔧 FastAPI', icon: 'fa-brands fa-python' },
    { name: '🛸 TensorFlow', icon: 'fa-solid fa-brain' },
    { name: '🧪 Scikit-learn', icon: 'fa-brands fa-python' },
    { name: '📊 Pandas', icon: 'fa-solid fa-table' },
    { name: '🔢 NumPy', icon: 'fa-solid fa-calculator' },
    { name: '🗺 Terraform', icon: 'fa-solid fa-cogs' },
    { name: '☁ GCP Cloud Functions', icon: 'fa-brands fa-google' },
    { name: '☁ Azure DevOps', icon: 'fa-brands fa-microsoft' },
    { name: '🔄 Jenkins', icon: 'fa-brands fa-jenkins' },
    { name: '📦 Ansible', icon: 'fa-solid fa-cogs' },
    { name: '🛠 Puppet', icon: 'fa-solid fa-cog' },
    { name: '🛠 Chef', icon: 'fa-solid fa-cog' },
    { name: '📜 Postman', icon: 'fa-solid fa-envelope-open' },
    { name: '🔍 Splunk', icon: 'fa-solid fa-search' },
    { name: '📈 Datadog', icon: 'fa-solid fa-chart-line' },
    { name: '🛡 OWASP', icon: 'fa-solid fa-shield-alt' },
    { name: '🔐 Keycloak', icon: 'fa-solid fa-key' },
    { name: '📡 RabbitMQ', icon: 'fa-solid fa-server' },
    { name: '📨 Kafka', icon: 'fa-solid fa-stream' },
    { name: '🛠 Nginx', icon: 'fa-solid fa-server' },
    { name: '🖥 Apache', icon: 'fa-solid fa-server' },
    { name: '📊 Tableau', icon: 'fa-solid fa-chart-bar' },
    { name: '📈 Power BI', icon: 'fa-brands fa-microsoft' },
    { name: '🧪 Playwright', icon: 'fa-solid fa-vial' },
    { name: '🛠 Selenium', icon: 'fa-solid fa-robot' },
    { name: '📱 Xamarin', icon: 'fa-brands fa-microsoft' },
    { name: '🖌 Sketch', icon: 'fa-solid fa-paint-brush' },
    { name: '📊 Snowflake', icon: 'fa-solid fa-snowflake' },
    { name: '🗄 Cassandra', icon: 'fa-solid fa-database' },
  ];

  const templateComponents = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4,
    template5: Template5,
    template6: Template6,
    template7: Template7,
    template8: Template8,
    template9: Template9,
    template10: Template10,
    template11: Template11,
    template12: Template12,
    template13: Template13,
    template14: Template14,
    template15: Template15,
    template16: Template16,
    template17: Template17,
    template18: Template18,
    template19: Template19,
    template20: Template20,
    template21: Template21,
    template22: Template22,
  };

  const SelectedTemplate = templateComponents[templateId] || Template2;

  useEffect(() => {
    if (location.state?.portfolio) {
      const { components, _id, githubPagesUrl, githubRepo } = location.state.portfolio;
      setComponents(components);
      setPortfolioId(_id);
      setDeployedUrl(githubPagesUrl);
      setRepoUrl(githubRepo);
      setProjectImages(components.projects.map(() => null));
      setCertificateImages(components.certificates.map(() => null));
    }
  }, [location.state]);

  const validatePhoneNumber = (phone) => {
    if (!phone) return '';
    const phoneRegex = /^\+?[\d\s-]{7,15}$/;
    return phoneRegex.test(phone) ? phone : '';
  };

  const validateUrl = (url) => {
    if (!url) return '';
    try {
      new URL(url);
      return url;
    } catch {
      return '';
    }
  };

  const handleImageUpload = async (file, type, index = null) => {
    if (!file) return null;

    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'portfolios');
      formData.append('resource_type', type === 'resume' ? 'raw' : 'image');

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type === 'resume' ? 'raw' : 'image'}/upload`,
        formData
      );

      if (type === 'profile') {
        setComponents(prev => ({ ...prev, profilePic: response.data.secure_url }));
        return response.data.secure_url;
      } else if (type.startsWith('project')) {
        setComponents(prev => {
          const newProjects = [...prev.projects];
          newProjects[index] = { ...newProjects[index], image: response.data.secure_url };
          return { ...prev, projects: newProjects };
        });
        return response.data.secure_url;
      } else if (type.startsWith('certificate')) {
        setComponents(prev => {
          const newCertificates = [...prev.certificates];
          newCertificates[index] = { ...newCertificates[index], image: response.data.secure_url };
          return { ...prev, certificates: newCertificates };
        });
        return response.data.secure_url;
      } else if (type === 'resume') {
        setComponents(prev => ({ ...prev, resumeUrl: response.data.secure_url }));
        return response.data.secure_url;
      }

      return response.data.secure_url;
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || error.message;
      setUploadError(`Error uploading ${type}: ${errorMessage}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const addProject = () => {
    setComponents(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', link: '', github: '', image: null }],
    }));
    setProjectImages(prev => [...prev, null]);
  };

  const removeLastProject = () => {
    setComponents(prev => ({
      ...prev,
      projects: prev.projects.slice(0, -1),
    }));
    setProjectImages(prev => prev.slice(0, -1));
  };

  const updateProject = (index, field, value) => {
    setComponents(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
  };

  const addCertificate = () => {
    setComponents(prev => ({
      ...prev,
      certificates: [...prev.certificates, { title: '', date: '', credential: '', image: null }],
    }));
    setCertificateImages(prev => [...prev, null]);
  };

  const removeLastCertificate = () => {
    setComponents(prev => ({
      ...prev,
      certificates: prev.certificates.slice(0, -1),
    }));
    setCertificateImages(prev => prev.slice(0, -1));
  };

  const updateCertificate = (index, field, value) => {
    setComponents(prev => {
      const newCertificates = [...prev.certificates];
      newCertificates[index] = { ...newCertificates[index], [field]: value };
      return { ...prev, certificates: newCertificates };
    });
  };

  const toggleSkill = (skill) => {
    setComponents(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !components.skills.includes(customSkill)) {
      toggleSkill(customSkill);
      setCustomSkill('');
      setShowCustomSkillInput(false);
    }
  };

  const copyToClipboard = () => {
    if (!deployedUrl) {
      alert('No URL to copy.');
      return;
    }
    navigator.clipboard.writeText(deployedUrl).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link.');
    });
  };

  const filteredSkills = useMemo(() => {
    if (!skillSearch) return SKILLS_LIST;
    return SKILLS_LIST.filter(skill =>
      skill.name.toLowerCase().includes(skillSearch.toLowerCase())
    );
  }, [skillSearch]);

  const handleSubmit = async e => {
    e.preventDefault();
    setUploadError(null);
    setIsDeploying(true);
    setDeploySuccess(false);
    
    try {
      await buttonControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 }
      });

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required. Please log in.');

      if (!components.name || !components.bio || !components.email || !components.email.includes('@') || !components.whatsapp) {
        throw new Error('Name, Bio, Email, and WhatsApp are required.');
      }

      const validatedComponents = {
        ...components,
        github: validateUrl(components.github),
        linkedin: validateUrl(components.linkedin),
        whatsapp: validatePhoneNumber(components.whatsapp),
      };

      if (!validatedComponents.whatsapp) {
        throw new Error('Invalid WhatsApp phone number. Please enter a valid phone number (e.g., 34567890).');
      }

      let profilePicUrl = validatedComponents.profilePic;
      if (profilePicFile && !profilePicUrl) {
        profilePicUrl = await handleImageUpload(profilePicFile, 'profile');
        if (!profilePicUrl) throw new Error('Profile picture upload failed.');
      }

      let resumeUrl = validatedComponents.resumeUrl;
      if (resumeFile && !resumeUrl) {
        resumeUrl = await handleImageUpload(resumeFile, 'resume');
        if (!resumeUrl) throw new Error('Resume upload failed.');
      }

      const uploadedProjects = await Promise.all(
        validatedComponents.projects.map(async (project, index) => {
          let imageUrl = project.image;
          if (projectImages[index] && !imageUrl) {
            imageUrl = await handleImageUpload(projectImages[index], `project-${index}`, index);
          }
          return { ...project, image: imageUrl, link: validateUrl(project.link), github: validateUrl(project.github) };
        })
      );

      const uploadedCertificates = await Promise.all(
        validatedComponents.certificates.map(async (certificate, index) => {
          let imageUrl = certificate.image;
          if (certificateImages[index] && !imageUrl) {
            imageUrl = await handleImageUpload(certificateImages[index], `certificate-${index}`, index);
          }
          return { ...certificate, image: imageUrl, credential: validateUrl(certificate.credential) };
        })
      );

      const updatedComponents = {
        ...validatedComponents,
        profilePic: profilePicUrl,
        resumeUrl: resumeUrl,
        projects: uploadedProjects,
        certificates: uploadedCertificates,
      };

      const clientScript = `
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          // ... (existing client script)
        });
      </script>
      <style>
        :root {
          --primary: ${updatedComponents.design.primaryColor};
          --secondary: ${updatedComponents.design.secondaryColor};
          --bg: ${updatedComponents.design.backgroundColor};
          --text: ${updatedComponents.design.textColor};
          --font: ${updatedComponents.design.fontFamily};
          --rounded: ${updatedComponents.design.borderRadius};
          --section-padding: ${updatedComponents.design.sectionPadding};
          --shadow: ${updatedComponents.design.cardShadow};
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
          animation: ${updatedComponents.design.animationType} 3s ease-in-out infinite;
        }
        
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-effect:hover {
          ${updatedComponents.design.hoverEffect === 'scale' ? 'transform: scale(1.03);' : ''}
          ${updatedComponents.design.hoverEffect === 'lift' ? 'transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);' : ''}
          ${updatedComponents.design.hoverEffect === 'glow' ? 'box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);' : ''}
        }
        
        .gradient-text {
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shift 3s linear infinite;
        }
      </style>
    `;
    if (!updatedComponents.design) {
        updatedComponents.design = {
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
        };
      }
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${updatedComponents.name || 'Portfolio'}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
          <style>
            img.profile-pic { max-width: 150px; max-height: 150px; object-fit: cover; }
            img.project-img { max-width: 300px; max-height: 200px; object-fit: cover; }
            img.certificate-img { max-width: 400px; max-height: 250px; object-fit: contain; }
            body { background: linear-gradient(to bottom right, #f9fafb, #e5e7eb); }
            @media (prefers-color-scheme: dark) {
              body { background: linear-gradient(to bottom right, #1f2937, #374151); }
            }
          </style>
        </head>
        <body>
          ${renderToString(<SelectedTemplate components={updatedComponents} />)}
          ${clientScript}
        </body>
        </html>
      `;

      const portfolioData = {
        templateId,
        components: JSON.stringify(updatedComponents),
        profilePicUrl: updatedComponents.profilePic || null,
        resumeUrl: updatedComponents.resumeUrl || null,
        htmlContent,
        repoUrl,
      };

      let res;
      if (portfolioId) {
        res = await axios.put(`https://dev-server-tvbl.onrender.com/api/portfolio/${portfolioId}`, portfolioData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        res = await axios.post('https://dev-server-tvbl.onrender.com/api/portfolio/create', portfolioData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setPortfolioId(res.data.portfolioId);
        setRepoUrl(res.data.repoUrl);
      }
      
      setDeployedUrl(res.data.githubPagesUrl);
      setDeploySuccess(true);
      
      await controls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 0.5 }
      });
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setUploadError(`Failed to ${portfolioId ? 'update' : 'create'} portfolio: ${errorMessage}`);
      
      await controls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.5 }
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row h-full w-full">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 p-6 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="bg-gray-600 text-white px-3 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </motion.button>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {portfolioId ? 'Edit' : 'Create'} Portfolio: {templateId.replace('template', 'Template ')}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPreviewMode(!previewMode)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200"
            >
              {previewMode ? 'Hide Preview' : 'Show Preview'}
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Basic Information
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={components.name}
                onChange={e => setComponents({ ...components, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
              <textarea
                placeholder="Professional Bio"
                value={components.bio}
                onChange={e => setComponents({ ...components, bio: e.target.value })}
                className="w-full p-3 mt-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                rows="4"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={components.email}
                onChange={e => setComponents({ ...components, email: e.target.value })}
                className="w-full p-3 mt-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Social Links
              </label>
              <input
                type="url"
                placeholder="GitHub URL"
                value={components.github}
                onChange={e => setComponents({ ...components, github: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={components.linkedin}
                onChange={e => setComponents({ ...components, linkedin: e.target.value })}
                className="w-full p-3 mt-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <input
                type="tel"
                placeholder="WhatsApp Number (e.g., +1234567890)"
                value={components.whatsapp}
                onChange={e => setComponents({ ...components, whatsapp: e.target.value })}
                className="w-full p-3 mt-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                pattern="\+?[\d\s-]{7,15}"
                title="Please enter a valid phone number (e.g  9080415243)"
                required
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  setProfilePicFile(e.target.files[0]);
                  handleImageUpload(e.target.files[0], 'profile');
                }}
                className="text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-colors duration-200"
              />
              {uploading && <p className="text-indigo-600 animate-pulse mt-2">Uploading...</p>}
              {components.profilePic && (
                <motion.img
                  src={components.profilePic}
                  alt="Profile Preview"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 rounded-full mt-4 shadow-md border border-gray-200 dark:border-gray-600"
                />
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resume (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={e => {
                  setResumeFile(e.target.files[0]);
                  handleImageUpload(e.target.files[0], 'resume');
                }}
                className="text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-colors duration-200"
              />
              {components.resumeUrl && (
                <p className="text-indigo-600 mt-2">Resume uploaded successfully.</p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Skills
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {components.skills.length} selected
                </span>
              </div>
              
              {/* Custom Skill Input */}
              {showCustomSkillInput && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-2 mb-3"
                >
                  <input
                    type="text"
                    placeholder="Enter custom skill"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    className="flex-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addCustomSkill}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700 transition-colors duration-200"
                  >
                    Add
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowCustomSkillInput(false)}
                    className="bg-gray-600 text-white px-3 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              )}
              
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search skills..."
                    value={skillSearch}
                    onChange={e => setSkillSearch(e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowCustomSkillInput(true)}
                    className="bg-indigo-600 text-white p-3 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <i className="fas fa-plus"></i>
                  </motion.button>
                </div>
                
                {skillSearch && (
                  <div className="mt-2 max-h-40 overflow-y-auto bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm">
                    {filteredSkills.slice(0, 5).map(skill => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        className="p-2 cursor-pointer flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => {
                          toggleSkill(skill.name);
                          setSkillSearch('');
                        }}
                      >
                        <i className={`${skill.icon} text-indigo-600`}></i>
                        <span>{skill.name}</span>
                      </motion.div>
                    ))}
                    {filteredSkills.length === 0 && (
                      <p className="p-2 text-gray-500 dark:text-gray-400">No skills found</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                {components.skills.map(skill => (
                  <motion.div
                    key={skill}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded shadow-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-check-circle text-green-500"></i>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-times"></i>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-2 space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Projects
                </label>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addProject}
                    className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200 text-sm"
                  >
                    Add Project
                  </motion.button>
                  {components.projects.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={removeLastProject}
                      className="bg-red-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-red-700 transition-colors duration-200 text-sm"
                    >
                      Undo
                    </motion.button>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {components.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 mb-4"
                  >
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={project.name}
                      onChange={e => updateProject(index, 'name', e.target.value)}
                      className="w-full p-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={e => updateProject(index, 'description', e.target.value)}
                      className="w-full p-3 mt-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      rows="3"
                    />
                    <input
                      type="url"
                      placeholder="Project Link"
                      value={project.link}
                      onChange={e => updateProject(index, 'link', e.target.value)}
                      className="w-full p-3 mt-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <input
                      type="url"
                      placeholder="GitHub Link"
                      value={project.github}
                      onChange={e => updateProject(index, 'github', e.target.value)}
                      className="w-full p-3 mt-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const newImages = [...projectImages];
                          newImages[index] = e.target.files[0];
                          setProjectImages(newImages);
                          handleImageUpload(e.target.files[0], `project-${index}`, index);
                        }}
                        className="text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-colors duration-200"
                      />
                      {project.image && (
                        <motion.img
                          src={project.image}
                          alt={`Project ${index}`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-40 h-24 object-cover rounded-lg mt-3 shadow-sm border border-gray-200 dark:border-gray-600"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-2 space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Certificates
                </label>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addCertificate}
                    className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200 text-sm"
                  >
                    Add Certificate
                  </motion.button>
                  {components.certificates.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={removeLastCertificate}
                      className="bg-red-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-red-700 transition-colors duration-200 text-sm"
                    >
                      Undo
                    </motion.button>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {components.certificates.map((certificate, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 mb-4"
                  >
                    <input
                      type="text"
                      placeholder="Certificate Title"
                      value={certificate.title}
                      onChange={e => updateCertificate(index, 'title', e.target.value)}
                      className="w-full p-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <input
                      type="date"
                      placeholder="Certificate Date"
                      value={certificate.date}
                      onChange={e => updateCertificate(index, 'date', e.target.value)}
                      className="w-full p-3 mt-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <input
                      type="url"
                      placeholder="Credential URL"
                      value={certificate.credential}
                      onChange={e => updateCertificate(index, 'credential', e.target.value)}
                      className="w-full p-3 mt-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Certificate Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const newImages = [...certificateImages];
                          newImages[index] = e.target.files[0];
                          setCertificateImages(newImages);
                          handleImageUpload(e.target.files[0], `certificate-${index}`, index);
                        }}
                        className="text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-colors duration-200"
                      />
                      {certificate.image && (
                        <motion.img
                          src={certificate.image}
                          alt={`Certificate ${index}`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-full max-w-xs h-40 object-contain rounded-lg mt-3 bg-gray-100 dark:bg-gray-600 shadow-sm border border-gray-200 dark:border-gray-600"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {uploadError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm"
              >
                {uploadError}
              </motion.p>
            )}

            {deployedUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
              >
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Deployed at:{' '}
                  <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">
                    {deployedUrl}
                  </a>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200 text-sm"
                >
                  Copy Link
                </motion.button>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={isDeploying}
                animate={buttonControls}
                className="w-full p-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isDeploying ? (
                  <>
                    <motion.span
                      animate={{
                        rotate: 360,
                        transition: { duration: 1, repeat: Infinity, ease: "linear" }
                      }}
                      className="inline-block"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </motion.span>
                    <span>Deploying...</span>
                  </>
                ) : deploySuccess ? (
                  <>
                    <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Deployed Successfully!</span>
                  </>
                ) : portfolioId ? (
                  'Update & Redeploy'
                ) : (
                  'Save & Deploy'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        <AnimatePresence>
          {previewMode && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-full"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Live Preview
              </h3>
              <div className="relative w-full h-[calc(100%-2rem)] overflow-y-auto rounded-xl shadow-inner bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-600">
                <SelectedTemplate components={components} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default TemplateEditor;