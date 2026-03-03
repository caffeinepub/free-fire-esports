# Free Fire Esports

## Current State
A draft was previously deployed but has expired. The project consists of a Motoko backend and React frontend for a Free Fire esports tournament website.

## Requested Changes (Diff)

### Add
- Full-screen hero section with cinematic background, neon glow overlay, particle animation, and fade-in on load
- Step-by-step animated registration form: Player Name, Player Age, Player Role (Rusher/Sniper/Support/IGL), Terms & Conditions checkbox, Register button
  - Each field reveals only after the previous is filled
  - Register button disabled until checkbox checked
  - Success popup on submit
  - Profile card auto-populates after registration
- Events section: animated tournament cards with hover zoom/glow
- YouTube section: channel buttons opening in new tabs with gaming-style icons
- Tournament Updates section: news cards with scroll-triggered slide-in animations
- Profile Data section: stylish esports-themed card populated from registration data
- Player registration stored in backend (name, age, role)
- Smooth scrolling navigation bar

### Modify
- N/A (rebuild from expired draft)

### Remove
- N/A

## Implementation Plan
1. Backend: Motoko actor stores player registrations (name, age, role). Exposes register and getProfile query.
2. Frontend: React app with the following sections:
   - Navbar with smooth scroll links
   - Hero section with particle canvas animation
   - Registration form with step-by-step reveal logic
   - Events section with 4 tournament cards
   - YouTube section with 4 channel buttons
   - Tournament Updates section with news cards
   - Profile section shown after registration
3. Use Orbitron/Poppins fonts, neon red/orange/yellow color scheme, dark background.
4. All interactive elements get deterministic data-ocid markers.
