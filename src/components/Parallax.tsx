"use client"

import React from 'react';
// Parallax scroll hooks temporarily commented out for scroll performance comparison:
// import { useRef, useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  offsetY?: number;
  mobileOffsetY?: number;
  scaleRange?: [number, number];
  className?: string;
}

/**
 * Pass-through wrapper while scroll parallax is commented out for performance testing.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

interface ParallaxImageFrameProps {
  children: React.ReactNode;
  offsetY?: number;
  baseScale?: number;
  className?: string;
}

/**
 * Pass-through image frame while scroll parallax is commented out for performance testing.
 */
export const ParallaxImageFrame: React.FC<ParallaxImageFrameProps> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};
