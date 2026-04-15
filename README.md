# 🍽️ TGI Friday - QR Code Dine-In Ordering

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)
![Node](https://img.shields.io/badge/Node-18%2B-339933?style=flat-square&logo=node.js)

A modern, responsive web application for QR code-based dine-in ordering at TGI Friday restaurants.

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## ✨ Features

- 🎨 **Beautiful UI** - Built with Tailwind CSS and Ant Design components
- 🎯 **Responsive Design** - Mobile-first approach for all screen sizes
- 🛒 **Shopping Cart** - Seamless ordering experience
- 🔐 **Authentication** - Secure user login and signup
- 🗺️ **Order Tracking** - Real-time order status and delivery tracking
- 💳 **Payment Integration** - Multiple payment methods support
- 🌙 **Dark Mode** - Theme toggle support
- 📦 **State Management** - Redux Toolkit for predictable state
- ⚡ **Fast Performance** - Next.js with optimized builds

---

## 🚀 Quick Start

### Prerequisites

Ensure you have **Node.js 18+** installed on your system:

```bash
node -v    # Check Node version
npm -v     # Check npm version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tgi-friday-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React framework with SSR and API routes |
| **React 19** | UI library for building components |
| **Tailwind CSS** | Utility-first CSS framework |
| **Ant Design** | Enterprise UI component library |
| **Redux Toolkit** | State management solution |
| **react-icons** | Icon library with multiple icon sets |

---

## 🎬 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm start` | Alias for `npm run dev` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run linting checks |

---

## 📁 Project Structure

```
tgi-friday-webapp/
├── pages/                    # Next.js pages and routes
│   ├── auth/                # Authentication pages (login, signup, etc.)
│   ├── screens/             # Main application screens
│   ├── _app.jsx            # App wrapper and global setup
│   └── index.jsx           # Home page
├── components/              # Reusable React components
│   ├── checkout/           # Checkout flow components
│   ├── order-completed/    # Order completion components
│   └── track-order/        # Order tracking components
├── context/                # React Context for state management
├── hooks/                  # Custom React hooks
├── styles/                 # Global and component styles
├── public/                 # Static assets (favicon, manifest, etc.)
└── tailwind.config.js      # Tailwind CSS configuration
```

---

## ⚙️ Configuration

### Tailwind CSS
- Configuration: `tailwind.config.cjs`
- PostCSS: `postcss.config.cjs`
- Global Styles: `styles/globals.css`

### Next.js Pages Router
- All pages live in the `pages/` directory
- File-based routing system
- Global styles imported in `pages/_app.jsx`

### Theme Configuration
Visit [THEME_CONFIG_GUIDE.md](./THEME_CONFIG_GUIDE.md) for theme customization details.

---

## 🔐 Authentication

This project includes a complete authentication flow:
- **Login** - User authentication with email/password
- **Signup** - New user registration
- **Password Reset** - Forgot password and password recovery
- **OTP Verification** - One-time password verification

See [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed authentication setup.

---

## 💡 Tips & Best Practices

- ✅ This project uses **Next.js pages router** (not app router)
- ✅ Static assets in `public/` are referenced from the root path
- ✅ Redux store is configured in `src/store/`
- ✅ Reusable components are in the `components/` directory
- ✅ Create custom hooks in the `hooks/` directory

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Ant Design Components](https://ant.design/components/overview/)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is a boilerplate for QR Code Dine-In Ordering system.

---

<div align="center">

**Made with ❤️ for TGI Friday**

</div>
