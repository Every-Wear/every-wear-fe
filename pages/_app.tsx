import type { AppProps } from "next/app";
import "regenerator-runtime/runtime";
import "@/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
