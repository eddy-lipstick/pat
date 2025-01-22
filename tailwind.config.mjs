/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
	darkMode: ["class"],
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			height: {
				'calc-screen-navbar': 'calc(100vh - 4rem)'
			},
			inset: {
				'28': '7rem',
				'-28': '-7rem'
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
				'roc-grotesk': ['roc-grotesk', 'sans-serif']
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			animation: {
				'spin-slow': 'spin 20s linear infinite',
			},
			colors: {
				'feitlijn-purple': {
					'50': 'hsl(var(--feitlijn-purple-50))',
					'100': 'hsl(var(--feitlijn-purple-100))',
					'200': 'hsl(var(--feitlijn-purple-200))',
					'300': 'hsl(var(--feitlijn-purple-300))',
					'400': 'hsl(var(--feitlijn-purple-400))',
					'500': 'hsl(var(--feitlijn-purple-500))',
					'600': 'hsl(var(--feitlijn-purple-600))',
					'700': 'hsl(var(--feitlijn-purple-700))',
					'800': 'hsl(var(--feitlijn-purple-800))',
					'900': 'hsl(var(--feitlijn-purple-900))',
					DEFAULT: 'hsl(var(--feitlijn-purple))'
				},
				'feitlijn-yellow': {
					'50': 'hsl(var(--feitlijn-yellow-50))',
					'100': 'hsl(var(--feitlijn-yellow-100))',
					'200': 'hsl(var(--feitlijn-yellow-200))',
					'300': 'hsl(var(--feitlijn-yellow-300))',
					'400': 'hsl(var(--feitlijn-yellow-400))',
					'500': 'hsl(var(--feitlijn-yellow-500))',
					DEFAULT: 'hsl(var(--feitlijn-yellow))'
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					'50': '#F5F4FE',
					'100': '#E9E7FD',
					'200': '#D2CFFA',
					'300': '#C7C3F8',
					'400': '#A39DF4',
					'500': '#7F77F0',
					'600': '#2605AA',
					'700': '#1C086C',
					'800': '#0E0947',
					'900': '#030037',
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				surface: {
					'1': 'hsl(var(--surface-1))',
					'2': 'hsl(var(--surface-2))',
					'3': 'hsl(var(--surface-3))'
				},
				text: {
					primary: 'hsl(var(--text-1))',
					secondary: 'hsl(var(--text-2))',
					tertiary: 'hsl(var(--text-3))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				custom: {
					dark: 'hsl(var(--custom-dark))',
					base: 'hsl(var(--custom-base))',
					light: 'hsl(var(--custom-light))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography")
	]
}