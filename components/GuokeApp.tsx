"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function GuokeApp({
  initialEmail,
  initialName,
}: {
  initialEmail: string | null;
  initialName: string | null;
}) {
  useEffect(() => {
    if (initialEmail && !window._uname) {
      window._uname = initialName || initialEmail.split("@")[0];
    }
  }, [initialEmail, initialName]);

  return (
    <>
      <div id="app">
        <section className="scr on" id="beranda"></section>
        <section className="scr" id="jadwal"></section>
        <section className="scr" id="jelajahi"></section>
        <section className="scr" id="pustaka"></section>
        <section className="scr" id="akun"></section>
        <div className="ovl" id="detail"></div>
        <div className="ovl" id="play"></div>
        <div className="ovl" id="set" style={{ zIndex: 12 }}></div>
        <div className="sheet" id="sheet">
          <h2 style={{ marginBottom: 6 }}>Kualitas</h2>
          <div data-q="Auto (720p)">
            Auto (720p)<span>✓</span>
          </div>
          <div data-q="1080p">
            1080p <span className="tag ac">PREMIUM</span>
          </div>
          <div data-q="720p">720p</div>
          <div data-q="480p">480p</div>
          <div data-q="360p">360p</div>
        </div>
        <nav className="nav" id="nav"></nav>
      </div>
      <Script src="/guoke.js?v=20261013c" strategy="afterInteractive" />
      <script type="module" src="/guoke-sb.js?v=20261013c"></script>
    </>
  );
}
