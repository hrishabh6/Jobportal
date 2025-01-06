/* eslint-disable  */
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
    	extend: {
    		autofill: 'transparent',
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
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
    				'100': '#1F4529',
    				'500': '#FFF1E6'
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
    			},
    			dark: {
    				'100': '#000000',
    				'200': '#0F1117',
    				'300': '#151821',
    				'400': '#212734',
    				'500': '#101012'
    			},
    			light: {
    				'400': '#858EAD',
    				'500': '#7B8EC8',
    				'700': '#DCE3F1',
    				'800': '#F4F6F8',
    				'850': '#FDFDFD',
    				'900': '#FFFFFF'
    			},
    			'accent-blue': '#1DA1F2',
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
    		fontFamily: {
    			inter: [
    				'var(--font-inter)'
    			],
    			spaceGrotesk: [
    				'var(--font-spaceGrotesk)'
    			]
    		},
    		boxShadow: {
    			'light-100': '0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)',
    			'light-200': '10px 10px 20px 0px rgba(218, 213, 213, 0.10)',
    			'light-300': '-10px 10px 20px 0px rgba(218, 213, 213, 0.10)',
    			'dark-100': '0px 2px 10px 0px rgba(46, 52, 56, 0.10)',
    			'dark-200': '2px 0px 20px 0px rgba(39, 36, 36, 0.04)'
    		},
			backgroundImage: {
				'auth-dark': 'url("/assets/images/auth-dark.png")',
				'auth-light': 'url("/assets/images/auth-light.png")'
			},
    		screens: {
    			xs: '420px'
    		},
    		keyframes: {
    			shimmer: {
    				from: {
    					'backgroundPosition': '0 0'
    				},
    				to: {
    					'backgroundPosition': '-200% 0'
    				}
    			},
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
    			},
    			marquee: {
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(calc(-100% - var(--gap)))'
    				}
    			},
    			'marquee-vertical': {
    				from: {
    					transform: 'translateY(0)'
    				},
    				to: {
    					transform: 'translateY(calc(-100% - var(--gap)))'
    				}
    			}
    		},
    		animation: {
    			shimmer: 'shimmer 2s linear infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			marquee: 'marquee var(--duration) infinite linear',
    			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

