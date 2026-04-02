import React, { useState, useEffect, useRef } from "react";
export default function GlobalLoadingBar() {
  const [active, setActive]     = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible]   = useState(false);
  const timerRef  = useRef(null);
  const countRef  = useRef(0); // tracks concurrent requests
 
  // Fake-progress ticker — moves bar from 0 → ~85% while waiting
  const startFakeProgress = () => {
    setVisible(true);
    setActive(true);
    setProgress(5);
 
    let current = 5;
    timerRef.current = setInterval(() => {
      // Slow down as it approaches 85%
      const step = current < 30 ? 8 : current < 60 ? 4 : current < 80 ? 1.5 : 0.3;
      current = Math.min(current + step, 85);
      setProgress(current);
    }, 200);
  };
 
  const finishProgress = () => {
    clearInterval(timerRef.current);
    setProgress(100);
    // Hide bar after the fill animation completes
    setTimeout(() => {
      setActive(false);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300); // fade-out duration
    }, 400);
  };
 
  useEffect(() => {
    const onStart = () => {
      countRef.current += 1;
      if (countRef.current === 1) startFakeProgress();
    };
 
    const onEnd = () => {
      countRef.current = Math.max(0, countRef.current - 1);
      if (countRef.current === 0) finishProgress();
    };
 
    window.addEventListener("fetch:start", onStart);
    window.addEventListener("fetch:end",   onEnd);
    return () => {
      window.removeEventListener("fetch:start", onStart);
      window.removeEventListener("fetch:end",   onEnd);
      clearInterval(timerRef.current);
    };
  }, []);
 
  if (!visible) return null;
 
  return (
    <div style={styles.track}>
      <div
        style={{
          ...styles.bar,
          width: `${progress}%`,
          opacity: active ? 1 : 0,
          transition: progress === 100
            ? "width 0.3s ease, opacity 0.3s ease 0.3s"
            : "width 0.2s ease",
        }}
      />
    </div>
  );
}
 
// ── Inline styles (no extra CSS file needed) ──────────────────────────────────
const styles = {
  track: {
    position:  "fixed",
    top:       0,
    left:      0,
    width:     "100%",
    height:    "3px",
    zIndex:    99999,
    background: "transparent",
    pointerEvents: "none",
  },
  bar: {
    height: "100%",
    background: "linear-gradient(90deg, #4f8ef7, #a78bfa, #38bdf8)",
    borderRadius: "0 2px 2px 0",
    boxShadow: "0 0 8px rgba(99,102,241,0.7)",
  },
};
 