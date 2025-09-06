# Sportech Portfolio

A modern, responsive portfolio website built with Next.js, React, and Three.js, featuring 3D elements and smooth animations.

## 🚀 Features

- Modern, responsive design with smooth animations
- 3D Earth visualization using Three.js
- Admin dashboard for content management
- Contact form with email integration
- Mobile-first approach
- Dark/light mode support

## 🛠 Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Styled JSX
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: React Hook Form
- **Icons**: Custom SVG icons

## 📦 Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Git

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/sportech-portfolio.git
   cd sportech-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔧 Environment Variables

| Variable Name                     | Description               | Required |
| --------------------------------- | ------------------------- | -------- |
| `NEXT_PUBLIC_API_URL`             | Base URL for API requests | Yes      |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | EmailJS service ID        | Yes      |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID       | Yes      |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | EmailJS public key        | Yes      |

## 📁 Project Structure

```
sportech-portfolio/
├── public/                  # Static files
│   ├── earth/               # 3D Earth textures and models
│   ├── feedback/            # Feedback related assets
│   ├── values/              # Company values icons
│   └── ...
├── src/
│   ├── app/                 # Next.js 13+ app directory
│   │   ├── (admin)/         # Admin dashboard routes
│   │   ├── (site)/          # Public site routes
│   │   └── globals.css      # Global styles
│   ├── assets/              # Static assets
│   ├── components/          # Reusable components
│   │   ├── admin/           # Admin components
│   │   ├── auth/            # Authentication components
│   │   ├── hero/            # Hero section components
│   │   ├── nav/             # Navigation components
│   │   └── sections/        # Page section components
│   ├── data/                # Static data files
│   ├── store/               # State management
│   └── utils/               # Utility functions
├── .env.local              # Environment variables (not versioned)
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🛠 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
