"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TransitionBaseProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FadeTransition({ children, duration = 0.3, delay = 0, className }: TransitionBaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideTransition({ children, direction = "up", duration = 0.3, delay = 0, className }: TransitionBaseProps & { direction?: "up" | "down" | "left" | "right" }) {
  const offsets = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...offsets[direction] }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleTransition({ children, duration = 0.25, delay = 0, className }: TransitionBaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BlurTransition({ children, duration = 0.3, delay = 0, className }: TransitionBaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CollapseTransition({ show = true, children, className }: { show?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: show ? "auto" : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`overflow-hidden ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}

export function StaggerTransition({ children, staggerDelay = 0.05, className }: { children: React.ReactNode; staggerDelay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PresenceTransition({ show, children }: { show: boolean; children: React.ReactNode }) {
  return <AnimatePresence>{show && children}</AnimatePresence>;
}
