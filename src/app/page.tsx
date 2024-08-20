"use client";

import dynamic from "next/dynamic";
import Loading from "./loading";

const Lazy = dynamic(() => import("./lazyLayout"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Home() {
  return <Lazy />;
}
