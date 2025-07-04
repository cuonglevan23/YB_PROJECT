# React + TypeScript + Vite + Tailwind CSS

This project is a modern web application built with React 19, TypeScript, Vite, and Tailwind CSS using pnpm as the package manager.

## 🚀 Technologies Used

- **React 19**: Latest React with modern features
- **TypeScript**: For type safety and better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **pnpm**: Fast, disk space efficient package manager

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (install globally: `npm install -g pnpm`)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration is located in `tailwind.config.js`.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles with Tailwind directives
```

## 🔧 Development Guidelines

- Use functional components with hooks
- Prefer TypeScript interfaces for props and data structures
- Use Tailwind utility classes for styling
- Follow React best practices for state management
- Use pnpm for package management

## 🚀 Building for Production

```bash
pnpm build
```

The build artifacts will be stored in the `dist/` directory.
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
