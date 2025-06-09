import { AnimationType, GsapVars } from "../types/types";

export const getAnimationPresets = (
  type: AnimationType
): {
  from: GsapVars;
  duration: number;
  stagger: number;
  ease: gsap.EaseString | gsap.EaseFunction;
} => {
  const defaultPreset: {
    duration: number;
    stagger: number;
    ease: gsap.EaseString | gsap.EaseFunction;
  } = {
    duration: 0.6,
    stagger: 0.04,
    ease: "power4.inOut",
  };

  switch (type) {
    case "fadeIn":
      return {
        ...defaultPreset,
        from: { opacity: 0 },
      };
    case "fadeInUp":
      return {
        ...defaultPreset,
        from: { y: "50%", opacity: 0 },
      };
    case "fadeInDown":
      return {
        ...defaultPreset,
        from: { y: "-50%", opacity: 0 },
      };
    case "slideInFromLeft":
      return {
        ...defaultPreset,
        from: { x: "-50%", opacity: 0 },
      };
    case "slideInFromRight":
      return {
        ...defaultPreset,
        from: { x: "50%", opacity: 0 },
      };
    case "blurIn":
      return {
        ...defaultPreset,
        from: { filter: "blur(12px)", opacity: 0 },
      };
    case "revealInUp":
      return {
        ...defaultPreset,
        from: { y: "100%" },
        ease: "power4.inOut",
      };
    case "revealInDown":
      return {
        ...defaultPreset,
        from: { y: "-100%" },
        ease: "power4.inOut",
      };
    case "flipInX":
      return {
        ...defaultPreset,
        from: { rotationX: -90, opacity: 0, transformOrigin: "center center" },
      };
    case "flipInY":
      return {
        ...defaultPreset,
        from: { rotationY: 90, opacity: 0, transformOrigin: "center center" },
      };
    case "skewIn":
      return {
        ...defaultPreset,
        from: { skewX: -20, x: "-50%", opacity: 0 },
        ease: "power3.out",
      };
    case "typewriter":
      return {
        from: { opacity: 0 },
        duration: 0.01,
        stagger: 0.1,
        ease: "linear",
      };
    case "scaleIn":
      return {
        ...defaultPreset,
        from: { scale: 0, opacity: 0 },
        ease: "back.out(1.7)",
      };
    case "scaleInRotate":
      return {
        ...defaultPreset,
        from: { scale: 0, rotation: 180, opacity: 0 },
        ease: "back.out(1.7)",
      };
    case "bounceIn":
      return {
        ...defaultPreset,
        from: { scale: 0.3, opacity: 0 },
        ease: "bounce.out",
        duration: 0.8,
      };
    case "elastic":
      return {
        ...defaultPreset,
        from: { scale: 0, opacity: 0 },
        ease: "elastic.out(1, 0.3)",
        duration: 1.2,
      };
    case "zoomIn":
      return {
        ...defaultPreset,
        from: { scale: 0.8, opacity: 0 },
        ease: "power2.out",
      };
    case "zoomOut":
      return {
        ...defaultPreset,
        from: { scale: 1.2, opacity: 0 },
        ease: "power2.out",
      };
    case "rotateIn":
      return {
        ...defaultPreset,
        from: { rotation: -180, opacity: 0 },
        ease: "power3.out",
      };
    case "rotateInDownLeft":
      return {
        ...defaultPreset,
        from: {
          rotation: -45,
          x: "-100%",
          y: "100%",
          opacity: 0,
          transformOrigin: "left bottom",
        },
        ease: "power3.out",
      };
    case "rotateInDownRight":
      return {
        ...defaultPreset,
        from: {
          rotation: 45,
          x: "100%",
          y: "100%",
          opacity: 0,
          transformOrigin: "right bottom",
        },
        ease: "power3.out",
      };
    case "rollIn":
      return {
        ...defaultPreset,
        from: { x: "-100%", rotation: -120, opacity: 0 },
        ease: "power3.out",
      };
    case "lightSpeedIn":
      return {
        ...defaultPreset,
        from: { x: "100%", skewX: -30, opacity: 0 },
        ease: "power3.out",
        duration: 0.4,
      };
    case "flipInLeft":
      return {
        ...defaultPreset,
        from: { rotationY: -90, opacity: 0, transformOrigin: "left center" },
        ease: "power3.out",
      };
    case "flipInRight":
      return {
        ...defaultPreset,
        from: { rotationY: 90, opacity: 0, transformOrigin: "right center" },
        ease: "power3.out",
      };
    case "slideInUp":
      return {
        ...defaultPreset,
        from: { y: "100%", opacity: 0 },
      };
    case "slideInDown":
      return {
        ...defaultPreset,
        from: { y: "-100%", opacity: 0 },
      };
    case "morphIn":
      return {
        ...defaultPreset,
        from: {
          scale: 0.5,
          rotation: 45,
          skewX: 20,
          borderRadius: "50%",
          opacity: 0,
        },
        ease: "power3.out",
        duration: 0.8,
      };
    case "glitchIn":
      return {
        ...defaultPreset,
        from: {
          x: "-2px",
          skewX: 2,
          filter: "hue-rotate(90deg)",
          opacity: 0,
        },
        ease: "power3.out",
        stagger: 0.02,
      };
    case "waveIn":
      return {
        ...defaultPreset,
        from: {
          y: "20%",
          rotation: 5,
          transformOrigin: "bottom center",
          opacity: 0,
        },
        ease: "power3.out",
        stagger: 0.1,
      };
    case "spiralIn":
      return {
        ...defaultPreset,
        from: {
          scale: 0,
          rotation: 360,
          x: "25%",
          y: "25%",
          opacity: 0,
        },
        ease: "power3.out",
        duration: 1,
      };
    default:
      return { from: {}, ...defaultPreset };
  }
};
