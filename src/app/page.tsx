"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "./loading";

const Lazy: any = dynamic(() => import("./lazyLayout"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Home() {
  return <Lazy />;
}
