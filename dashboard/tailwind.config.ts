import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundColor: {
        white: '#fdfdfd',
        light: '#fff',
        dark: '#111',
        'blue-hris': '#1d4ed8',
        'red-hris': '#950606',
        'content-light': '#FFF1F5',
        'content-dark': '#222',
        yellow: '#FFF700',
      },
      textColor: {
        white: '#fdfdfd',
        light: '#fff',
        dark: '#111',
        'blue-hris': '#1d4ed8',
        'red-hris': '#950606',
        'content-light': '#FFF1F5',
        'content-dark': '#222',
        yellow: '#FFF700',
      },
      fontWeight: {
        regular: '400',
        medium: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontSize: {
        'extra-small': '10px',
        small: '12px',
        base: '13px',
        lg: '16px',
        xl: '18px',
        '2xl': '20px',
        '3xl': '22px',
        '4xl': '32px',
        '5xl': '42px',
        '6xl': '4rem',
      },
      borderColor: {
        white: '#fdfdfd',
        light: '#fff',
        dark: '#111',
        'blue-hris': '#1d4ed8',
        'red-hris': '#950606',
        'content-light': '#FFF1F5',
        'content-dark': '#222',
        yellow: '#FFF700',
      },
      borderWidth: {
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        5: '5px',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
export default config;
