import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",

	],
	theme: {
    	extend: {
    		screens: {
    			xs: '400px',
    			pc: '940px'
    		},
    		colors: {
    			'eco-blue-v0': '#2275fc',
    			'eco-blue-v2': '#e8f1ff',
    			'eco-blue-v3': '#eff4f8',
    			'eco-blue-v4': '#e9f2ff',
    			'eco-blue-v5': '#f7f9fb',
    			'eco-orange-v0': '#ff5100',
    			'eco-orange-v1': '#fff2ed',
    			'eco-black-v3': '#edf1f5',
    			'eco-black-v2': '#9e98a3',
    			'eco-black-v1.1': '#605f77',
    			'eco-black-v1.2': '#707072',
    			'eco-black-v1': '#575864',
    			'eco-black-v0': '#050505',
    			'eco-purple-v0': '#c489ff',
    			'eco-purple-v1': '#f4e9ff',
    			'eco-green-v0': '#22c55e',
    			'eco-green-v1': '#e7fbef',
    			'store-primary': '#0d6efd',
    			'store-secondary': '#6c757d',
    			'store-success': '#198754',
    			'store-info': '#0dcaf0',
    			'store-warning': '#ffc107',
    			'store-danger': '#dc3545',
    			'store-light': '#f8f9fa',
    			'store-dark': '#212529',
    			'store-indigo': '#6610f2',
    			'store-purple': '#6f42c1',
    			'store-pink': '#d63384',
    			'store-red': '#dc3545',
    			'store-orange': '#fd7e14',
    			'store-yellow': '#ffc107',
    			'store-green': '#198754',
    			'store-teal': '#20c997',
    			'store-cyan': '#0dcaf0',
    			'store-white': '#fff',
    			'store-hero': '#3e4d53',
    			'store-gray': {
    				'100': '#f8f9fa',
    				'200': '#e9ecef',
    				'300': '#dee2e6',
    				'400': '#ced4da',
    				'500': '#adb5bd',
    				'600': '#6c757d',
    				'700': '#495057',
    				'800': '#343a40',
    				'900': '#212529'
    			},
    			'store-jdgm': {
    				primary: '#FFA400',
    				secondary: 'rgba(255, 164, 0, 0.1)',
    				star: '#FA9A0B',
    				reviewText: '#ffffff',
    				reviewBg: '#FFA400',
    				paginate: '#FFA400'
    			},
    			'store-footer': {
    				title: '#f43e4b',
    				text: '#808080',
    				hover: '#f43e4b'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate"), heroui()],
} satisfies Config;
