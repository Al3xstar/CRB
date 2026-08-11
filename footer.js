(() => {
  "use strict";

  const STYLE_ID = "ceriabet-footer-purple-ring-v1";
  const FOOTER_SELECTOR = ".fixed-footer, footer.site-footer";
  const BG_URL = "https://www.image2url.com/r2/default/images/1786470919945-f30312d6-d4bd-4014-b6c6-be900bc80f7c.png";

  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.setAttribute("data-brand", "CERIABET");
  style.setAttribute("data-component", "footer-purple-ring");

  style.textContent = `
    @property --ceriabet-footer-purple-angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes ceriabetFooterPurpleRotate {
      from {
        --ceriabet-footer-purple-angle: 0deg;
      }
      to {
        --ceriabet-footer-purple-angle: 360deg;
      }
    }

    @keyframes ceriabetFooterBorderFlow {
      0% {
        background-position: 0% 50%;
      }
      100% {
        background-position: 300% 50%;
      }
    }

    /* ==================================================
       FOOTER UTAMA
       Hanya target footer CERIABET yang dimaksud.
    ================================================== */
    :where(${FOOTER_SELECTOR}) {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;

      z-index: 9999 !important;

      min-height: 64px;

      overflow: visible !important;

      background:
        url("${BG_URL}")
        center / cover no-repeat !important;

      border-top:
        1px solid rgba(192, 132, 252, .34) !important;

      box-shadow:
        0 -10px 26px rgba(0, 0, 0, .45),
        0 -2px 14px rgba(168, 85, 247, .28) !important;

      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
    }

    /* ==================================================
       MENU FOOTER
    ================================================== */
    :where(${FOOTER_SELECTOR}) > a {
      position: relative !important;
      isolation: isolate;

      overflow: visible !important;

      border: none !important;
      box-shadow: none !important;

      background: transparent !important;

      text-decoration: none !important;

      transition:
        transform .14s ease,
        filter .14s ease;
    }

    :where(${FOOTER_SELECTOR}) > a:active {
      transform:
        translateY(1px)
        scale(.98);
    }

    /* ==================================================
       BORDER UNGU MENU 1,2,4,5
       Menu tengah / ke-3 tidak memakai kotak.
    ================================================== */
    :where(${FOOTER_SELECTOR}) > a:not(:nth-child(3))::before {
      content: "";

      position: absolute;
      inset: 0;

      border-radius: 12px;

      padding: 2px;

      background:
        linear-gradient(
          120deg,
          #4c1d95,
          #7c3aed,
          #c084fc,
          #d946ef,
          #8b5cf6,
          #4c1d95
        );

      background-size: 300% 100%;

      animation:
        ceriabetFooterBorderFlow
        4.2s
        linear
        infinite;

      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);

      -webkit-mask-composite: xor;
      mask-composite: exclude;

      filter:
        drop-shadow(
          0 0 3px
          rgba(192, 132, 252, .58)
        );

      pointer-events: none;

      z-index: 1;
    }

    /* ==================================================
       ICON & TEXT MENU BIASA
    ================================================== */
    :where(${FOOTER_SELECTOR}) > a > * {
      position: relative;
      z-index: 4;
    }

    :where(${FOOTER_SELECTOR}) > a img,
    :where(${FOOTER_SELECTOR}) > a svg {
      position: relative !important;
      z-index: 4 !important;
    }

    /* ==================================================
       MENU TENGAH / MENU KE-3
       Tidak ada border kotak.
    ================================================== */
    :where(${FOOTER_SELECTOR}) > a:nth-child(3) {
      position: relative !important;

      z-index: 20 !important;

      overflow: visible !important;

      border: none !important;
      border-radius: 0 !important;

      background: transparent !important;
      box-shadow: none !important;
    }

    /* ==================================================
       RING UNGU MUTER
    ================================================== */
    :where(${FOOTER_SELECTOR}) > a:nth-child(3)::before {
      content: "";

      position: absolute;

      width: 68px;
      height: 68px;

      left: 50%;
      top: -35px;

      transform: translateX(-50%);

      border-radius: 50%;

      padding: 3px;

      background:
        conic-gradient(
          from var(--ceriabet-footer-purple-angle),
          #2e1065 0deg,
          #5b21b6 45deg,
          #7c3aed 90deg,
          #a855f7 135deg,
          #f0abfc 175deg,
          #d946ef 215deg,
          #8b5cf6 270deg,
          #4c1d95 320deg,
          #2e1065 360deg
        );

      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);

      -webkit-mask-composite: xor;
      mask-composite: exclude;

      animation:
        ceriabetFooterPurpleRotate
        3.8s
        linear
        infinite;

      filter:
        drop-shadow(
          0 0 4px
          rgba(192, 132, 252, .78)
        )
        drop-shadow(
          0 0 10px
          rgba(168, 85, 247, .46)
        );

      pointer-events: none;

      z-index: 2;
    }

    /* ==================================================
       BULATAN DASAR MENU TENGAH
    ================================================== */
    :where(${FOOTER_SELECTOR}) > a:nth-child(3)::after {
      content: "";

      position: absolute;

      width: 60px;
      height: 60px;

      left: 50%;
      top: -31px;

      transform: translateX(-50%);

      border-radius: 50%;

      background:
        url("${BG_URL}")
        center / cover no-repeat;

      border:
        1px solid
        rgba(216, 180, 254, .9);

      box-shadow:
        0 0 10px rgba(168, 85, 247, .55),
        0 0 22px rgba(217, 70, 239, .28),
        0 5px 16px rgba(0, 0, 0, .58);

      pointer-events: none;

      z-index: 3;
    }

    /* ==================================================
       ICON MENU TENGAH
       Override hanya icon ke-3 supaya tepat di bulatan.
    ================================================== */
    :where(${FOOTER_SELECTOR}) > a:nth-child(3) img,
    :where(${FOOTER_SELECTOR}) > a:nth-child(3) svg {
      position: relative !important;

      z-index: 5 !important;

      transform:
        translateY(-18px)
        scale(1.12) !important;

      transform-origin: center !important;

      filter:
        drop-shadow(
          0 0 4px
          rgba(192, 132, 252, .7)
        ) !important;
    }

    /* ==================================================
       TEXT MENU TENGAH
    ================================================== */
    :where(${FOOTER_SELECTOR}) > a:nth-child(3) span {
      position: relative;

      z-index: 5;

      transform: translateY(-9px);
    }

    /* ==================================================
       GARIS HALUS DI ATAS FOOTER
    ================================================== */
    :where(${FOOTER_SELECTOR})::before {
      content: "";

      position: absolute;

      left: 12px;
      right: 12px;
      top: 0;

      height: 2px;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(240, 171, 252, .78),
          transparent
        );

      opacity: .55;

      pointer-events: none;
    }

    /* ==================================================
       MOBILE
    ================================================== */
    @media (max-width: 991px) {
      :where(${FOOTER_SELECTOR}) {
        overflow: visible !important;
      }
    }

    /* ==================================================
       DESKTOP
       Tidak memaksa footer tampil kalau situs aslinya
       memang menyembunyikannya.
    ================================================== */
    @media (min-width: 992px) {
      :where(${FOOTER_SELECTOR}) {
        overflow: visible !important;
      }
    }

    /* ==================================================
       REDUCE MOTION
    ================================================== */
    @media (prefers-reduced-motion: reduce) {
      :where(${FOOTER_SELECTOR})
      > a:not(:nth-child(3))::before {
        animation-duration: 8s;
      }

      :where(${FOOTER_SELECTOR})
      > a:nth-child(3)::before {
        animation-duration: 8s;
      }
    }
  `;

  document.head.appendChild(style);

  /*
   * Tidak mengubah link, href, event click,
   * urutan menu, atau isi footer.
   * Observer hanya memastikan style tetap tersedia
   * pada situs SPA/dynamic render.
   */
  const observer = new MutationObserver(() => {
    if (!document.getElementById(STYLE_ID)) {
      document.head.appendChild(style);
    }
  });

  const startObserver = () => {
    if (!document.body) return;

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startObserver,
      { once: true }
    );
  } else {
    startObserver();
  }
})();
