# 🎮 WordPop Puzzle Game - Frontend

A modern, gamified WordPop puzzle game built with Next.js and Tailwind CSS.

## ✨ Features

### 🎯 Core Gameplay
- **Word Guessing**: Guess 5-letter words in 6 attempts
- **Real-time Validation**: Validates words against English dictionary API
- **Visual Feedback**: Color-coded feedback for correct, misplaced, and incorrect letters
- **Keyboard Support**: Full keyboard integration with visual feedback

### 🎨 Modern UI/UX Design
- **Responsive Layout**: 
  - Desktop: Two-column layout (puzzle on left, keyboard/stats on right)
  - Mobile: Single-column responsive design
- **Gamified Elements**:
  - Beautiful gradient backgrounds and glass morphism effects
  - Smooth animations and transitions
  - Engaging visual feedback and notifications
  - Modern typography with Inter font

### 📊 Player Statistics
- **Game Tracking**: Tracks games played, won, current streak, and best streak
- **Persistent Storage**: Stats saved in localStorage
- **Visual Stats Display**: Beautiful stats cards with color-coded metrics

### 🎭 Enhanced Animations
- **Letter Animations**: Bounce-in effects for new letters
- **Flip Animations**: Reveal animations for completed guesses
- **Loading Animations**: Dual-ring spinner with pulsing center
- **Notification Animations**: Slide-up notifications with different types (success, error, info)

### 🎓 Interactive Tutorial System
- **First-Time User Experience**: Welcome modal for new players
- **Step-by-Step Tutorial**: Conversational guide through game mechanics
- **Interactive Demo**: Live demonstration with example word "HEART"
- **Visual Feedback**: Color-coded explanations for green, yellow, and gray letters
- **Keyboard Tutorial**: Shows how keyboard colors change based on guesses
- **Pro Tips**: Strategic advice for better gameplay
- **Skip Option**: Users can skip tutorial and access it later
- **Persistent State**: Remembers if user has seen tutorial

### 🎨 Design System
- **Color Palette**: Modern dark theme with vibrant accents
- **Typography**: Inter font family for better readability
- **Spacing**: Consistent spacing using Tailwind's design system
- **Components**: Reusable, well-structured components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build
```bash
npm run build
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.jsx            # Main game page
│   │   ├── globals.css         # Global styles and animations
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── inputBoxes.jsx      # Game board component
│   │   ├── keyboard.jsx        # Virtual keyboard
│   │   ├── loadingSpinner.jsx  # Loading component
│   │   ├── TutorialModal.jsx   # Interactive tutorial modal
│   │   ├── TutorialTrigger.jsx # First-time user welcome
│   │   └── TutorialButton.jsx  # Tutorial access button
│   └── words.json              # Word list and meanings
├── tailwind.config.ts          # Tailwind configuration
└── package.json
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#3b82f6)
- **Success**: Emerald (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Background**: Dark slate gradient
- **Text**: Light slate (#f8fafc)

### Animations
- **Bounce In**: For new letter inputs
- **Flip In**: For revealed guesses
- **Shake**: For invalid inputs
- **Pulse Glow**: For active elements
- **Slide Up**: For notifications and stats
- **Scale In**: For interactive elements

### Responsive Breakpoints
- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (adaptive)
- **Desktop**: > 1024px (two columns)

## 🔧 Technical Details

### Technologies Used
- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **Inter Font**: Modern, readable typography
- **Local Storage**: For persistent game state

### Key Components

#### InputBoxes
- Renders the 6x5 game grid
- Handles letter animations and color coding
- Responsive design with proper spacing

#### Keyboard
- Virtual keyboard with all letters
- Special ENTER and DELETE buttons
- Responsive button sizing
- Visual feedback on interactions

#### LoadingSpinner
- Custom animated loading component
- Dual-ring design with pulsing center
- Configurable loading message

#### TutorialModal
- Interactive step-by-step tutorial
- Live demonstration with example gameplay
- Color-coded explanations for game mechanics
- Progress indicator and navigation controls

#### TutorialTrigger
- Welcome modal for first-time users
- Option to start tutorial or skip
- Persistent state management

#### TutorialButton
- Floating tutorial access button
- Available for returning users during gameplay

### State Management
- **Game State**: Word, guesses, current attempt, game status
- **UI State**: Loading, notifications, animations
- **Stats State**: Player statistics and streaks

## 🎯 Game Logic

1. **Word Selection**: Random word from curated list
2. **Validation**: API call to verify word exists
3. **Feedback**: Color-coded letter feedback
4. **Win/Loss**: Track game outcomes and update stats
5. **Reset**: Start new game with fresh word

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load as needed
- **Optimized Animations**: CSS-based animations for smooth performance
- **Efficient Re-renders**: Minimal state updates
- **Responsive Images**: Optimized for different screen sizes

## 🎨 Customization

### Colors
Update CSS variables in `globals.css`:
```css
:root {
  --primary: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### Animations
Customize animations in `tailwind.config.ts`:
```javascript
animation: {
  "bounce-in": "bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  "flip-in": "flipIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
}
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Enjoy playing WordPop! 🎮✨**
