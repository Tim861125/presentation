import { defineConfig, mergeConfigs } from 'unocss'
import baseConfig from '@slidev/client/uno.config'

/**
 * Extend slidev's default UnoCSS config with shadcn-vue theme tokens.
 * Tokens are CSS variables defined in style.css.
 */
export default mergeConfigs([
  baseConfig,
  defineConfig({
    content: {
      filesystem: [
        'components/**/*.{vue,ts}',
        'lib/**/*.ts',
        'slides.md',
        'pages/**/*.{vue,md}',
      ],
    },
    theme: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground, oklch(0.985 0 0))',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
    // shadcn-vue uses these utility patterns; ensure UnoCSS picks them up.
    shortcuts: [
      // Override slidev's hardcoded primary so shadcn buttons render correctly
      {
        'bg-primary': 'bg-[var(--primary)]',
        'text-primary': 'text-[var(--primary)]',
        'border-primary': 'border-[var(--primary)]',
        'bg-primary-foreground': 'bg-[var(--primary-foreground)]',
        'text-primary-foreground': 'text-[var(--primary-foreground)]',
      },
    ],
  }),
])
