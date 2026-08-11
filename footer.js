(() => {
  "use strict";

  const STYLE_ID = "ceriabet-footer-center-only-v1";
  const FOOTER_SELECTOR = ".fixed-footer, footer.site-footer";

  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.setAttribute("data-brand", "CERIABET");
  style.setAttribute("data-component", "footer-center-only");

  style.textContent = `
    @property --ceriabet-center-angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes ceriabetCenterRotate {
      from {
        --ceriabet-center-angle: 0deg;
      }
      to {
        --ceriabet-center-angle: 360deg;
      }
    }

    /* =========================================
       FOOTER
       Tidak ubah background/footer global,
       cuma pastikan area tengah bisa keluar.
    ========================================= */
    :where(${FOOTER_SELECTOR}) {
      overflow: visible !important;
    }

    /* =========================================
       SEMUA MENU NORMAL
       Tidak dipaksa punya border / background baru
    ========================================= */
    :where(${FOOTER_SELECTOR}) > a {
      position: relative !important;
      overflow: visible !important;
      isolation: isolate;
    }

    /* =========================================
       MENU TENGAH / MENU KE-3
       Hanya ini yang diberi efek spesial
    ========================================= */
    :where(${FOOTER_SELECTOR}) > a:nth-child(3) {
      position: relative !important;
      z-index: 20 !important;
      overflow: visible !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    /* =========================================
       RING UNGU MUTER
    ========================================= */
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

      background: conic-gradient(
        from var(--ceriabet-center-angle),
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

      animation: ceriabetCenterRotate 3.8s linear infinite;

      filter:
        drop-shadow(0 0 4px rgba(192, 132, 252, .78))
        drop-shadow(0 0 10px rgba(168, 85, 247, .46));

      pointer-events: none;
      z-index: 2;
    }

    /* =========================================
       BULATAN DASAR TENGAH
       Tanpa gambar background, clean aja
    ========================================= */
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
        radial-gradient(
          circle at 35% 30%,
          rgba(255,255,255,.18),
          rgba(255,255,255,.05) 18%,
          rgba(49, 16, 95, .95) 58%,
          rgba(22, 8, 40, .98) 100%
        );

      border: 1px solid rgba(216, 180, 254, .9);

      box-shadow:
        0 0 10px rgba(168, 85, 247, .55),
        0 0 22px rgba(217, 70, 239, .22),
        0 5px 16px rgba(0, 0, 0, .58);

      pointer-events: none;
      z-index: 3;
    }

    /* =========================================
       ICON MENU TENGAH
    ========================================= */
    :where(${FOOTER_SELECTOR}) > a:nth-child(3) img,
    :where(${FOOTER_SELECTOR}) > a:nth-child(3) svg {
      position: relative !important;
      z-index: 5 !important;

      transform:
        translateY(-18px)
        scale(1.12) !important;

      transform-origin: center !important;

      filter:
        drop-shadow(0 0 4px rgba(192, 132, 252, .7)) !important;
    }

    /* =========================================
       TEXT MENU TENGAH
    ========================================= */
    :where(${FOOTER_SELECTOR}) > a:nth-child(3) span {
      position: relative !important;
      z-index: 5 !important;
      transform: translateY(-9px) !important;
    }

    /* =========================================
       REDUCE MOTION
    ========================================= */
    @media (prefers-reduced-motion: reduce) {
      :where(${FOOTER_SELECTOR}) > a:nth-child(3)::before {
        animation-duration: 8s;
      }
    }
  `;

  document.head.appendChild(style);

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
    document.addEventListener("DOMContentLoaded", startObserver, {
      once: true
    });
  } else {
    startObserver();
  }
})();
