# 🚀 Benjamin Agyekum - Professional Portfolio

A modern, responsive portfolio website showcasing my journey as a Full-Stack Developer, AI/ML Specialist, DevSecOps Engineer, and EdTech innovator.

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![Sanity](https://img.shields.io/badge/Sanity-CMS-red)
![Sass](https://img.shields.io/badge/Sass-Styling-pink)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple)

## 🌟 Overview

This portfolio represents my professional journey and technical expertise across multiple domains. Built with modern web technologies, it features interactive visualizations, dynamic content management, and a responsive design that works seamlessly across all devices.

**Live Demo:** [Your Portfolio URL]

## ✨ Key Features

### 🎯 **Professional Sections**
- **Dynamic Header** - Auto-rotating professional role showcase with real images
- **About Journey** - Visual representation of my career path with professional imagery
- **Experience & Certifications** - Modern card-based layouts showcasing work history
- **Interactive Skills Radar** - Canvas-based visualization of technical proficiencies
- **GitHub Dashboard** - Live repository integration with contribution metrics
- **Developer Impact Metrics** - Animated counters showcasing professional achievements
- **Project Portfolio** - Filterable showcase of key projects with live demos
- **Client Testimonials** - Rotating testimonials with smooth animations
- **Contact Integration** - Professional contact form with direct messaging

### 🛠️ **Technical Highlights**
- **Responsive Design** - Mobile-first approach with breakpoints for all devices
- **Smooth Animations** - Framer Motion powered interactions and page transitions
- **Content Management** - Sanity CMS integration for dynamic content updates
- **Professional Images** - High-quality career visualization assets
- **Resume Download** - One-click PDF resume download functionality
- **Form Handling** - Contact form with validation and submission to Sanity
- **SEO Optimized** - Semantic HTML and meta tag optimization

## 🚀 Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and functional components
- **Sass/SCSS** - Advanced styling with variables, mixins, and responsive design
- **Framer Motion** - Smooth animations and page transitions
- **React Icons** - Comprehensive icon library integration
- **Canvas API** - Custom radar chart visualization

### **Backend & CMS**
- **Sanity v2** - Headless CMS for content management
- **Sanity Client** - Real-time data fetching and mutations
- **GROQ Queries** - Powerful query language for content retrieval

### **Development Tools**
- **Create React App** - Project scaffolding and build tools
- **Node.js & npm** - Package management and scripting
- **Git** - Version control with comprehensive commit history

### **Deployment**
- **Frontend:** Vercel/Netlify (Static hosting)
- **Backend:** Sanity Cloud (Managed CMS hosting)
- **Assets:** Optimized images and resume hosting

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v14+ recommended)
- npm or yarn package manager
- Git for version control

### **Clone Repository**
```bash
git clone https://github.com/hislordshipprof/official-portfolio.git
cd official-portfolio
```

### **Frontend Setup**
```bash
# Navigate to frontend directory
cd frontend_react

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### **Backend Setup**
```bash
# Navigate to backend directory
cd backend_sanity

# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli@^2.29.5

# Install project dependencies
npm install

# Start Sanity Studio
npm start
```

The Sanity Studio will be available at `http://localhost:3333`

### **Environment Configuration**

⚠️ **IMPORTANT:** Never commit your `.env` file to version control! It's already in `.gitignore`.

Create a `.env` file in the `frontend_react` directory:
```env
# Sanity CMS Configuration
REACT_APP_SANITY_PROJECT_ID=your_project_id_here
REACT_APP_SANITY_DATASET=production
REACT_APP_SANITY_API_VERSION=2022-02-01
REACT_APP_SANITY_TOKEN=your_sanity_token_here
```

**How to get your Sanity credentials:**
1. **Project ID:** Found in your Sanity dashboard URL or project settings
2. **Dataset:** Usually `production` (default)
3. **API Version:** Use `2022-02-01` or latest stable version
4. **Token:** Create in Sanity Dashboard → API → Tokens (needs Editor permissions)

**For Production Deployment:**
- Set these environment variables in your hosting platform (Vercel, Netlify, etc.)
- Never expose tokens in client-side code
- Use read-only tokens when possible

## 🔒 Git Security

The project uses multiple `.gitignore` files to ensure sensitive data and dependencies are never committed:

- **Root `.gitignore`** - Project-wide ignores (node_modules, .env files, OS files)
- **Frontend `.gitignore`** - React-specific ignores (build/, coverage/, etc.)
- **Backend `.gitignore`** - Sanity-specific ignores (.sanity/, dist/, etc.)

This ensures `node_modules` and environment files are ignored in **both** frontend and backend directories.

## 📁 Project Structure

```
official-portfolio/
├── 📁 frontend_react/           # React frontend application
│   ├── 📁 public/
│   │   ├── 📁 resume/          # Resume PDF files
│   │   └── 📁 images/          # Static images
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable React components
│   │   │   └── 📁 Navbar/     # Navigation component
│   │   ├── 📁 container/       # Page sections/containers
│   │   │   ├── 📁 About/      # About section with journey
│   │   │   ├── 📁 CallToAction/ # Contact & CTA section
│   │   │   ├── 📁 Certifications/ # Certifications display
│   │   │   ├── 📁 DeveloperMetrics/ # Impact metrics
│   │   │   ├── 📁 Experience/ # Work experience cards
│   │   │   ├── 📁 GitHub/     # GitHub integration
│   │   │   ├── 📁 Header/     # Hero section
│   │   │   ├── 📁 SkillsRadar/ # Interactive skills chart
│   │   │   ├── 📁 Testimonial/ # Client testimonials
│   │   │   └── 📁 Work/       # Project portfolio
│   │   ├── 📁 assets/         # Images and static assets
│   │   ├── 📁 constants/      # App constants and configurations
│   │   ├── 📁 wrapper/        # HOC wrappers for animations
│   │   ├── App.js             # Main application component
│   │   └── index.js           # Application entry point
│   ├── package.json           # Frontend dependencies
│   └── README.md             # This file
├── 📁 backend_sanity/          # Sanity CMS backend
│   ├── 📁 schemas/            # Content schemas
│   │   ├── abouts.js         # About section schema
│   │   ├── experiences.js    # Work experience schema
│   │   ├── certifications.js # Certifications schema
│   │   ├── skills.js         # Skills schema
│   │   ├── testimonials.js   # Testimonials schema
│   │   └── works.js          # Projects schema
│   ├── 📁 config/            # Sanity configuration
│   ├── seedData.js           # Data seeding script
│   ├── clearData.js          # Database cleanup utility
│   ├── removeDuplicates.js   # Duplicate removal utility
│   ├── package.json          # Backend dependencies
│   └── sanity.json           # Sanity project configuration
└── README.md                 # Project documentation
```

## 🎨 Key Components

### **🏠 Header Section**
- Auto-rotating professional images (DevSecOps, AI/ML, Full-Stack, EdTech)
- Interactive role navigation dots
- Smooth image transitions with role badges
- Professional title animations

### **🎯 Skills Radar Chart**
- Canvas-based interactive radar visualization  
- 10 core technologies with proficiency levels
- 2-column technology stack grid
- Hover interactions and animations

### **📊 GitHub Dashboard**
- Live repository data integration
- Featured repositories in 2-column grid
- Language statistics and contribution metrics
- Intelligent fallback descriptions for repositories

### **📈 Developer Metrics**
- Animated counter displays (47+ projects, 500K+ users impacted)
- 2-column achievement grid layout
- Technology impact analysis
- Professional highlight badges

### **💼 Experience Cards**
- Modern glassmorphism design
- Company information and duration calculations
- Technology stack badges with icons
- Expandable responsibility lists

### **📞 Contact Integration**
- Professional contact form with validation
- Direct email and phone contact cards
- Resume download functionality
- Success states and loading indicators

## 🚀 Deployment

### **Frontend Deployment (Netlify)**
1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Configure Build Settings** (or use the included `netlify.toml`):
   ```
   Base directory: frontend_react
   Build command: npm run build
   Publish directory: build
   ```
3. **Set Environment Variables** in Netlify dashboard:
   ```
   REACT_APP_SANITY_PROJECT_ID = your_project_id
   REACT_APP_SANITY_DATASET = production  
   REACT_APP_SANITY_API_VERSION = 2022-02-01
   REACT_APP_SANITY_TOKEN = your_token
   ```
4. **Deploy**: Automatic CI/CD on push to main branch

### **Alternative: Vercel Deployment**
1. Connect your GitHub repository to Vercel
2. Set framework preset to "Create React App"
3. Set root directory to `frontend_react`
4. Configure environment variables in Vercel dashboard

### **Backend Deployment (Sanity Cloud)**
1. Deploy Sanity Studio: `sanity deploy`
2. Configure CORS origins in Sanity dashboard
3. Set up API tokens for production access

### **Custom Domain Setup**
```bash
# For custom domain on Vercel
vercel --prod --confirm
vercel domains add yourdomain.com
```

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+  
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Available Scripts

### **Frontend Scripts**
```bash
npm start          # Start development server
npm build          # Build for production
npm test           # Run test suite
npm run lint       # Run ESLint
```

### **Backend Scripts**  
```bash
npm start          # Start Sanity Studio
npm run seed       # Populate database with sample data
npm run clear      # Clear all data from database
npm run reset      # Clear and re-seed database
npm run remove-duplicates  # Remove duplicate entries
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Social

- **Email:** [beagyekum21@gmail.com](mailto:beagyekum21@gmail.com)
- **Phone:** [+1 970 391 0990](tel:+19703910990)
- **LinkedIn:** [linkedin.com/in/bagyekum](https://www.linkedin.com/in/bagyekum/)
- **GitHub:** [github.com/hislordshipprof](https://github.com/hislordshipprof)
- **Portfolio:** [Your Live Portfolio URL]

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Sanity** for flexible content management
- **React Icons** for comprehensive icon library
- **Sass** for powerful CSS preprocessing
- **Create React App** for development setup

---

**Built with ❤️ by Benjamin Agyekum**

*Full-Stack Engineer | AI/ML Developer | DevSecOps Specialist | EdTech Innovator*
