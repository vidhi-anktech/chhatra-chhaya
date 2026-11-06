/** @type {import('tailwindcss').Config} */
// ==============================================================================
// TAILWIND CONFIGURATION FOR CHHATRA CHHAYA (छत्र छाया)
// Derived directly from approved UI mockups (Splash, Onboarding, Login, Home)
// ==============================================================================
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 1. Primary Action & CTA (Buttons, Selected tabs, Play controls)
        primary: {
          DEFAULT: '#903F00', // Terracotta Ochre (Figma primary)
          dark: '#763300',    // Active / pressed state
          light: '#B45309',
        },
        // 2. Sacred Traditional Tones
        sacred: {
          maroon: '#6A141A',  // Emblem background & major titles
          wine: '#4A0E17',    // Support phone call button
          berry: '#A5345D',   // Sacred Berry
          gold: '#D4AF37',    // Sacred emblem rays & highlights
        },
        // 3. Surface & Background Tones
        bg: {
          app: '#F9F9FF',     // Figma serenity off-white screen background
          card: '#FFFFFF',    // Pure white cards with elevation
          container: '#F0F3FF', // Spiritual soft periwinkle for cards
          input: '#F0F3FF',   // Soft periwinkle for text inputs & pills
        },
        // 4. Soft Pastel Card Fills
        pastel: {
          peach: '#FFDBCA',   // Sandalwood Badge / Glow Tint
          peachBorder: '#FDBA74',
          lavender: '#F0F3FF',// Container background
          rose: '#FFD9E1',    // Aura & Anumodna Rose
          pink: '#FCE7F3',    // Special Tithi strip & Vihar shortcut
          cyan: '#CFFAFE',    // 48-min Samayik shortcut circle
          amber: '#FEF3C7',   // E-Gallery shortcut circle
          orange: '#FFEDD5',  // Namokar Mala shortcut circle
        },
        // 5. Functional & Status Colors
        status: {
          green: '#0D9488',   // Niyam checked state & "स्वीकृत" badge
          greenBg: '#CCFBF1',
          red: '#EF4444',     // "● लाइव दर्शन" live pulsing badge
          redBg: '#FEE2E2',
          sun: '#F59E0B',     // Sunrise icon
        },
        // 6. Typography
        slateText: {
          title: '#111C2D',   // Deep slate navy ("पूज्य आचार्य श्री 108")
          body: '#334155',    // Medium slate for general text
          muted: '#564338',   // Warm slate subtitles & placeholders
        }
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
};
