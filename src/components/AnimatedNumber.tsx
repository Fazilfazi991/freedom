"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  isCurrency?: boolean;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  isCurrency = false,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(latest),
    });
    return () => controls.stop();
  }, [value]);

  const format = (val: number) => {
    if (isCurrency) {
      return new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency: "AED",
        maximumFractionDigits: 0,
      }).format(val);
    }
    return Math.floor(val).toLocaleString();
  };

  return <span className={className}>{format(displayValue)}</span>;
};
