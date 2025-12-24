import { easeInOutCubic } from '@motion-canvas/core';

// Easing
export const MANIM_SMOOTH = easeInOutCubic;

// Config
export const DEFAULT_STROKE_WIDTH = 4;

// Colors
export const TEAL_B = "#76DDC0";
export const TEAL_C = "#58C4DD";
export const GOLD_A = "#F7C797";
export const RED_B = "#FF8080";
export const BLUE_C = "#58C4DD";
export const WHITE = "#FFFFFF";
export const BLACK = "#000000";
export const GREY_A = "#DDDDDD";

// Vectors
export const RIGHT = new  DOMPointReadOnly(1, 0);
export const LEFT = new DOMPointReadOnly(-1, 0);
export const UP = new DOMPointReadOnly(0, -1);
export const DOWN = new DOMPointReadOnly(0, 1);