import { TEXT_TAGS } from "../constants/textTags";
import React from "react";

export type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "slideInFromLeft"
  | "slideInFromRight"
  | "blurIn"
  | "revealInUp"
  | "revealInDown"
  | "flipInX"
  | "flipInY"
  | "skewIn"
  | "typewriter"
  | "scaleIn"
  | "scaleInRotate"
  | "bounceIn"
  | "elastic"
  | "zoomIn"
  | "zoomOut"
  | "rotateIn"
  | "rotateInDownLeft"
  | "rotateInDownRight"
  | "rollIn"
  | "lightSpeedIn"
  | "flipInLeft"
  | "flipInRight"
  | "slideInUp"
  | "slideInDown"
  | "morphIn"
  | "glitchIn"
  | "waveIn"
  | "spiralIn";

export type TextTag = (typeof TEXT_TAGS)[number];
export type SplitType = "chars" | "words" | "lines";
export type GsapVars = gsap.TweenVars;

export type ElementOfTag<T extends keyof React.JSX.IntrinsicElements> =
  NonNullable<React.ComponentPropsWithRef<T>["ref"]> extends React.Ref<infer R>
    ? R
    : never;
