"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeDarkPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/showcase");
  }, [router]);

  return null;
}
