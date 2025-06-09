# React Text Animated

A powerful React component library for creating stunning text animations with GSAP. Perfect for adding smooth, customizable text entrance effects to your React applications.

## 🎯 Features

- **30+ Animation Types**: From simple fades to complex morphing effects
- **Flexible Text Splitting**: Animate by characters, words, or lines
- **GSAP-Powered**: Built on the industry-standard GSAP animation library
- **TypeScript Support**: Full type safety out of the box
- **Customizable**: Fine-tune timing, easing, and animation parameters
- **Morphing Effects**: Smooth transitions between different text content
- **React-First**: Designed specifically for React with hooks integration

## 🚀 Installation

```bash
npm install react-text-animated
# or
yarn add react-text-animated
# or
pnpm add react-text-animated
```

**Note**: This library requires GSAP as a peer dependency. Make sure to install it:

```bash
npm install gsap
```

## 📖 Basic Usage

```tsx
import { animated } from 'react-text-animated';

function App() {
  return (
    <animated.h1
      animationType="fadeInUp"
      splitBy="chars"
      stagger={0.03}
      duration={0.8}
    >
      Hello, World!
    </animated.h1>
  );
}
```

## 🎮 Interactive Playground

Try out all the animations and customize parameters in our interactive playground:

**[🔗 Live Playground](https://react-text-animated.vercel.app)**

The playground allows you to:

- Test all 30+ animation types
- Adjust timing and easing parameters
- Switch between character, word, and line splitting
- Preview morphing effects in real-time

## 📋 API Reference

### Props

| Prop             | Type                               | Default          | Description                                        |
| ---------------- | ---------------------------------- | ---------------- | -------------------------------------------------- |
| `animationType`  | `AnimationType`                    | `'fadeInUp'`     | The type of animation to apply                     |
| `splitBy`        | `'chars' \| 'words' \| 'lines'`    | `'chars'`        | How to split the text for animation                |
| `stagger`        | `number`                           | `0.03`           | Delay between each animated element (in seconds)   |
| `duration`       | `number`                           | `0.8`            | Duration of each element's animation (in seconds)  |
| `delay`          | `number`                           | `0`              | Initial delay before animation starts (in seconds) |
| `ease`           | `string \| function`               | `'power4.inOut'` | GSAP easing function                               |
| `whenPropChange` | `'reanimate' \| 'morph' \| 'none'` | `'reanimate'`    | Behavior when props change                         |
| `from`           | `GsapVars`                         | `undefined`      | Custom GSAP from values (overrides preset)         |

### Animation Types

Choose from 30+ built-in animation types:

#### Basic Animations

- `fadeIn` - Simple fade in effect
- `fadeInUp` - Fade in with upward movement
- `fadeInDown` - Fade in with downward movement

#### Slide Animations

- `slideInFromLeft` - Slide in from the left
- `slideInFromRight` - Slide in from the right
- `slideInUp` - Slide in from bottom
- `slideInDown` - Slide in from top

#### Effect Animations

- `blurIn` - Fade in with blur effect
- `typewriter` - Classic typewriter effect
- `glitchIn` - Digital glitch effect
- `waveIn` - Wave-like motion

#### Transform Animations

- `scaleIn` - Scale up from zero
- `scaleInRotate` - Scale and rotate simultaneously
- `rotateIn` - Rotate into view
- `flipInX` - 3D flip on X-axis
- `flipInY` - 3D flip on Y-axis
- `skewIn` - Skew transformation

#### Advanced Animations

- `bounceIn` - Bouncy entrance
- `elastic` - Elastic spring effect
- `morphIn` - Morphing transformation
- `spiralIn` - Spiral motion effect

...and many more!

## 🎨 Examples

### Character-by-Character Animation

```tsx
<animated.h2
  animationType="fadeInUp"
  splitBy="chars"
  stagger={0.05}
  duration={0.6}
>
  Character Animation
</animated.h2>
```

### Word-by-Word Animation

```tsx
<animated.p
  animationType="slideInFromLeft"
  splitBy="words"
  stagger={0.1}
  duration={0.8}
  ease="back.out(1.7)"
>
  This text animates word by word
</animated.p>
```

### Typewriter Effect

```tsx
<animated.h1
  animationType="typewriter"
  splitBy="chars"
  stagger={0.1}
  duration={0.01}
>
  Hello, I'm a typewriter effect!
</animated.h1>
```

### Custom Animation with GSAP Variables

```tsx
<animated.div
  animationType="fadeIn"
  from={{
    opacity: 0,
    scale: 0.5,
    rotation: 180,
    filter: 'blur(10px)',
  }}
  duration={1.2}
  ease="elastic.out(1, 0.3)"
>
  Custom animated text
</animated.div>
```

### Morphing Text Changes

```tsx
function MorphingExample() {
  const [text, setText] = useState('Original Text');

  return (
    <animated.h1 animationType="morphIn" whenPropChange="morph" duration={0.6}>
      {text}
    </animated.h1>
  );
}
```

## ⚠️ Known Issues

### Property Change Behavior

There are currently known issues with prop changes:

**`whenPropChange` and `splitBy` Props**: When changing either the `whenPropChange` or `splitBy` props, the new behavior doesn't apply immediately to the current animation. These changes will take effect on the next prop change or re-render.

## 🛠️ Development

This project uses a monorepo structure with pnpm workspaces:

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build:library

# Run the playground
pnpm dev:playground

# Build everything
pnpm build
```

## 📄 License

MIT License - feel free to use this library in your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [Interactive Playground](https://react-text-animated.vercel.app)
- [GitHub Repository](https://github.com/gs18004/react-text-animated)
- [npm Package](https://www.npmjs.com/package/react-text-animated)

---

Made with ❤️ and GSAP
