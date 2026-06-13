# Kajal Jawale — Portfolio

A sleek, dark-mode personal portfolio for a Cloud & DevOps Engineer.  
Built with **React 18 + Vite + Tailwind CSS**.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## 📁 Project Structure

```
kajal-portfolio/
├── public/
│   ├── favicon.svg
│   └── [place your certificate files here]
├── src/
│   ├── App.jsx              ← Root component
│   ├── KajalPortfolio.jsx   ← Main portfolio (all sections)
│   ├── index.css            ← Tailwind + global styles
│   └── main.jsx             ← React entry point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 📄 Adding Certificate Files

Place your certificate PDFs and images inside the **`public/`** folder so they are served as static assets.

Expected filenames (as referenced in the portfolio):
- `oracle cloud infrastructure certificate.pdf`
- `aws cloud practitioner certficate.pdf`
- `aws testing practices and devops tools certificate.pdf`
- `aws cloud formation getting started certificate.pdf`
- `getting started with devops certificate.pdf`
- `microsoft azure administrator.jpg`
- `infosys cloud certification.pdf`
- `jenkins certficate.pdf`
- `linux certificate.pdf`

---

## 🌐 Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo to [Vercel](https://vercel.com) for automatic deployments.

---

## 🎨 Customization

All content data (skills, projects, certifications, experience, education) is defined at the top of `src/KajalPortfolio.jsx` as plain JavaScript constants — easy to update without touching any JSX.
