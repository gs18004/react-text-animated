import { useEffect, useState } from 'react';
import { animated } from 'react-text-animated';
import type { AnimationType, SplitType } from 'react-text-animated';

import styles from './App.module.css';
import GitHub from './assets/GitHub';
import Npm from './assets/Npm';

const getDefaultValuesForAnimation = (animationType: AnimationType) => {
  const defaults: Record<AnimationType, { stagger: number; duration: number }> =
    {
      fadeIn: { stagger: 0.04, duration: 0.6 },
      fadeInUp: { stagger: 0.04, duration: 0.6 },
      fadeInDown: { stagger: 0.04, duration: 0.6 },
      slideInFromLeft: { stagger: 0.04, duration: 0.6 },
      slideInFromRight: { stagger: 0.04, duration: 0.6 },
      blurIn: { stagger: 0.04, duration: 0.6 },
      revealInUp: { stagger: 0.04, duration: 0.6 },
      revealInDown: { stagger: 0.04, duration: 0.6 },
      flipInX: { stagger: 0.04, duration: 0.6 },
      flipInY: { stagger: 0.04, duration: 0.6 },
      skewIn: { stagger: 0.04, duration: 0.6 },
      typewriter: { stagger: 0.1, duration: 0.01 },
      scaleIn: { stagger: 0.04, duration: 0.6 },
      scaleInRotate: { stagger: 0.04, duration: 0.6 },
      bounceIn: { stagger: 0.04, duration: 0.8 },
      elastic: { stagger: 0.04, duration: 1.2 },
      zoomIn: { stagger: 0.04, duration: 0.6 },
      zoomOut: { stagger: 0.04, duration: 0.6 },
      rotateIn: { stagger: 0.04, duration: 0.6 },
      rotateInDownLeft: { stagger: 0.04, duration: 0.6 },
      rotateInDownRight: { stagger: 0.04, duration: 0.6 },
      rollIn: { stagger: 0.04, duration: 0.6 },
      lightSpeedIn: { stagger: 0.04, duration: 0.4 },
      flipInLeft: { stagger: 0.04, duration: 0.6 },
      flipInRight: { stagger: 0.04, duration: 0.6 },
      slideInUp: { stagger: 0.04, duration: 0.6 },
      slideInDown: { stagger: 0.04, duration: 0.6 },
      morphIn: { stagger: 0.04, duration: 0.8 },
      glitchIn: { stagger: 0.02, duration: 0.6 },
      waveIn: { stagger: 0.1, duration: 0.6 },
      spiralIn: { stagger: 0.04, duration: 1.0 },
    };

  return defaults[animationType] || { stagger: 0.04, duration: 0.6 };
};

function App() {
  const [config, setConfig] = useState({
    text: 'react text animated',
    animationType: 'fadeInUp' as AnimationType,
    splitBy: 'chars' as SplitType,
    stagger: 0.03,
    duration: 0.8,
    delay: 0,
    ease: 'power4.inOut',
    whenPropChange: 'reanimate' as 'reanimate' | 'morph' | 'none',
  });

  const [currentConfig, setCurrentConfig] = useState(config);
  useEffect(() => {
    if (config.whenPropChange !== currentConfig.whenPropChange) {
      setCurrentConfig((prev) => ({
        ...prev,
        whenPropChange: config.whenPropChange,
      }));
    }
  }, [config.whenPropChange, currentConfig.whenPropChange]);
  const handleApply = () => {
    setCurrentConfig(config);
  };

  const animationTypes: AnimationType[] = [
    'fadeIn',
    'fadeInUp',
    'fadeInDown',
    'slideInFromLeft',
    'slideInFromRight',
    'blurIn',
    'revealInUp',
    'revealInDown',
    'flipInX',
    'flipInY',
    'skewIn',
    'typewriter',
    'scaleIn',
    'scaleInRotate',
    'bounceIn',
    'elastic',
    'zoomIn',
    'zoomOut',
    'rotateIn',
    'rotateInDownLeft',
    'rotateInDownRight',
    'rollIn',
    'lightSpeedIn',
    'flipInLeft',
    'flipInRight',
    'slideInUp',
    'slideInDown',
    'morphIn',
    'glitchIn',
    'waveIn',
    'spiralIn',
  ];

  const splitTypes: SplitType[] = ['chars', 'words', 'lines'];
  const whenPropChangeOptions = ['reanimate', 'none', 'morph'] as const;

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <div className={styles.HeaderContent}>
          <h1 className={styles.Title}>react-text-animated</h1>
          <div className={styles.Links}>
            <a
              href="https://github.com/gs18004/react-text-animated"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.LinkButton}
            >
              <GitHub />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/react-text-animated"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.LinkButton}
            >
              <Npm />
              npm
            </a>
          </div>
        </div>
      </header>

      <div className={styles.TabGroup}>
        <h3 className={styles.TabGroupTitle}>Animation Mode</h3>
        <div className={styles.TabButtons}>
          {whenPropChangeOptions.map((option) => (
            <button
              key={option}
              className={`${styles.TabButton} ${
                config.whenPropChange === option ? styles.TabButtonActive : ''
              }`}
              onClick={() =>
                setConfig((prev) => ({
                  ...prev,
                  whenPropChange: option,
                }))
              }
            >
              {option === 'reanimate' && '🔄 Reanimate'}
              {option === 'none' && '🚫 None'}
              {option === 'morph' && '✨ Morph'}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.Container}>
        <div className={styles.AnimationDisplay}>
          <animated.h1
            key={currentConfig.splitBy}
            className={styles.AnimatedTitle}
            animationType={currentConfig.animationType}
            splitBy={currentConfig.splitBy}
            stagger={currentConfig.stagger}
            duration={currentConfig.duration}
            delay={currentConfig.delay}
            ease={currentConfig.ease as any}
            whenPropChange={currentConfig.whenPropChange}
          >
            {currentConfig.text}
          </animated.h1>
        </div>
        <div className={styles.Controls}>
          <h2 className={styles.ControlsTitle}>Animation Controls</h2>

          <div className={styles.ControlGroup}>
            <label htmlFor="text" className={styles.Label}>
              Text:
            </label>
            <input
              id="text"
              type="text"
              className={styles.Input}
              value={config.text}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, text: e.target.value }))
              }
            />
          </div>

          <div className={styles.ControlGroup}>
            <label htmlFor="animationType" className={styles.Label}>
              Animation Type:
            </label>
            <select
              id="animationType"
              className={styles.Select}
              value={config.animationType}
              onChange={(e) => {
                const newAnimationType = e.target.value as AnimationType;
                const defaults = getDefaultValuesForAnimation(newAnimationType);
                setConfig((prev) => ({
                  ...prev,
                  animationType: newAnimationType,
                  stagger: defaults.stagger,
                  duration: defaults.duration,
                }));
              }}
            >
              {animationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.ControlGroup}>
            <label htmlFor="splitBy" className={styles.Label}>
              Split By (Experimental):
            </label>
            <select
              id="splitBy"
              className={styles.Select}
              value={config.splitBy}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  splitBy: e.target.value as SplitType,
                }))
              }
            >
              {splitTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.ControlGroup}>
            <label htmlFor="stagger" className={styles.Label}>
              Stagger: {config.stagger}s
            </label>
            <input
              id="stagger"
              type="range"
              className={styles.RangeInput}
              min="0"
              max="0.5"
              step="0.01"
              value={config.stagger}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  stagger: parseFloat(e.target.value),
                }))
              }
            />
          </div>

          <div className={styles.ControlGroup}>
            <label htmlFor="duration" className={styles.Label}>
              Duration: {config.duration}s
            </label>
            <input
              id="duration"
              type="range"
              className={styles.RangeInput}
              min="0.1"
              max="3"
              step="0.1"
              value={config.duration}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  duration: parseFloat(e.target.value),
                }))
              }
            />
          </div>

          <div className={styles.ControlGroup}>
            <label htmlFor="delay" className={styles.Label}>
              Delay: {config.delay}s
            </label>
            <input
              id="delay"
              type="range"
              className={styles.RangeInput}
              min="0"
              max="2"
              step="0.1"
              value={config.delay}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  delay: parseFloat(e.target.value),
                }))
              }
            />
          </div>

          <div className={styles.ControlGroup}>
            <label htmlFor="ease" className={styles.Label}>
              Ease:
            </label>
            <select
              id="ease"
              className={styles.Select}
              value={config.ease}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, ease: e.target.value }))
              }
            >
              <option value="power4.inOut">power4.inOut</option>
              <option value="power3.out">power3.out</option>
              <option value="power2.out">power2.out</option>
              <option value="back.out(1.7)">back.out(1.7)</option>
              <option value="bounce.out">bounce.out</option>
              <option value="elastic.out(1, 0.3)">elastic.out(1, 0.3)</option>
              <option value="linear">linear</option>
              <option value="none">none</option>
            </select>
          </div>

          <button className={styles.ApplyButton} onClick={handleApply}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
