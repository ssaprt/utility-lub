"use client";
import { useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    //eslint-disable-next-line
    setMounted(true);
  }, []);

  return mounted;
}
