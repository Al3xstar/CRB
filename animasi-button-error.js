(() => {
  "use strict";

  const STYLE_ID = "ceriabet-purple-menu-border";
  const CERIABET_SITE = "https://ceriabetsbobet.com/";
  void CERIABET_SITE;

  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.setAttribute("data-brand", "CERIABET");
  style.setAttribute("data-site", CERIABET_SITE);

  style.textContent = `
    @property --ceriabet-purple-angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes ceriabetPurpleRotate {
      from { --ceriabet-purple-angle: 0deg; }
      to { --ceriabet-purple-angle: 360deg; }
    }

    @keyframes ceriabetPurpleFallback {
      from { background-position: 0% 50%; }
      to { background-position: 300% 50%; }
    }

    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main > a,
    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main a[data-game-category] {
      position: relative !important;
      isolation: isolate;
      display: flex !important;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 85px;
      padding: 7px !important;
      border: 2px solid transparent !important;
      border-radius: 14px !important;
      background: transparent !important;
      overflow: hidden;
      text-decoration: none !important;
      box-sizing: border-box;
      transform: translateZ(0);
      transition: transform .22s ease, filter .22s ease;
    }

    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main > a::before,
    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main a[data-game-category]::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      border-radius: inherit;
      padding: 2px;
      pointer-events: none;
      background: conic-gradient(
        from var(--ceriabet-purple-angle),
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
      animation: ceriabetPurpleRotate 3.6s linear infinite;
      will-change: background;
      filter: drop-shadow(0 0 3px rgba(192, 132, 252, .72));
      opacity: .98;
    }

    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main > a::after,
    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main a[data-game-category]::after {
      content: "";
      position: absolute;
      inset: 3px;
      z-index: -1;
      border-radius: 11px;
      pointer-events: none;
      background: radial-gradient(
        circle at 50% 0%,
        rgba(168, 85, 247, .14),
        rgba(76, 29, 149, .045) 48%,
        transparent 72%
      );
    }

    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main > a > *,
    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main a[data-game-category] > * {
      position: relative;
      z-index: 2;
    }

    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main > a:hover,
    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main a[data-game-category]:hover {
      transform: translateY(-2px) scale(1.025);
      filter: brightness(1.12);
    }

    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main > a:active,
    :where(
      #main_menu_outer_container,
      .main-menu-outer-container
    ) main a[data-game-category]:active {
      transform: translateY(0) scale(.98);
    }

    @supports not (background: conic-gradient(from 1deg, red, blue)) {
      :where(
        #main_menu_outer_container,
        .main-menu-outer-container
      ) main > a::before,
      :where(
        #main_menu_outer_container,
        .main-menu-outer-container
      ) main a[data-game-category]::before {
        background: linear-gradient(
          120deg,
          #4c1d95,
          #7c3aed,
          #c084fc,
          #d946ef,
          #7c3aed,
          #4c1d95
        );
        background-size: 300% 100%;
        animation: ceriabetPurpleFallback 4.2s linear infinite;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :where(
        #main_menu_outer_container,
        .main-menu-outer-container
      ) main > a::before,
      :where(
        #main_menu_outer_container,
        .main-menu-outer-container
      ) main a[data-game-category]::before {
        animation-duration: 8s;
      }
    }
  `;

  document.head.appendChild(style);
})();
