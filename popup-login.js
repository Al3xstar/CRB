(() => {
  "use strict";

  const STYLE_ID = "ceriabet-loggedin-popup-v2-style";
  const POPUP_ID = "ceriabet-loggedin-popup-v2";
  const OVERLAY_ID = "ceriabet-loggedin-overlay-v2";
  const EXPLORE_ID = "ceriabet-loggedin-explore-v2";
  const CLOSE_ID = "ceriabet-loggedin-close-v2";

  const IMAGE_URL =
    "https://www.image2url.com/r2/default/images/1786246942678-3fbcc4ce-98b7-47ee-b595-0df90efd4c15.png";

  const ANNOUNCEMENT_PATH =
    "/mobile/messages/announcement";

  const INFO_TAB_SELECTOR =
    '.notification-tab-item[data-tab="info"]';

  const DELAY_KEY =
    "ceriabet_loggedin_popup_closed_at_v2";

  const OPEN_INFO_KEY =
    "ceriabet_open_announcement_info_v2";

  const DELAY_MS =
    6 * 60 * 60 * 1000;

  let popupCreated = false;

  function normalizePath() {
    return window.location.pathname
      .replace(/\/+$/, "")
      .toLowerCase();
  }

  function isLoggedInPage() {
    return normalizePath()
      .includes("loggedin");
  }

  function isAnnouncementPage() {
    return (
      normalizePath() ===
      ANNOUNCEMENT_PATH.toLowerCase()
    );
  }

  function canShowPopup() {
    if (!isLoggedInPage()) return false;

    const lastClosed = Number(
      localStorage.getItem(DELAY_KEY) || 0
    );

    if (!lastClosed) return true;

    return (
      Date.now() - lastClosed >=
      DELAY_MS
    );
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style =
      document.createElement("style");

    style.id = STYLE_ID;

    style.textContent = `
      @keyframes ceriabetLoggedInFadeInV2 {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes ceriabetLoggedInFadeOutV2 {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      @keyframes ceriabetLoggedInPopupInV2 {
        from {
          opacity: 0;
          transform:
            translateY(24px)
            scale(.97);
        }

        to {
          opacity: 1;
          transform:
            translateY(0)
            scale(1);
        }
      }

      @keyframes ceriabetExploreShineV2 {
        0% {
          left: -42%;
          opacity: 0;
        }

        10% {
          opacity: 1;
        }

        55% {
          opacity: 1;
        }

        68% {
          left: 125%;
          opacity: 0;
        }

        100% {
          left: 125%;
          opacity: 0;
        }
      }

      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;

        z-index: 2147483646;

        background:
          linear-gradient(
            180deg,
            rgba(8, 4, 15, .44),
            rgba(0, 0, 0, .87)
          );

        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);

        animation:
          ceriabetLoggedInFadeInV2
          .3s ease forwards;
      }

      #${OVERLAY_ID}.is-closing {
        animation:
          ceriabetLoggedInFadeOutV2
          .26s ease forwards;
      }

      #${POPUP_ID} {
        position: fixed;
        inset: 0;

        z-index: 2147483647;

        display: flex;
        align-items: center;
        justify-content: center;

        padding:
          max(16px, env(safe-area-inset-top))
          max(14px, env(safe-area-inset-right))
          max(16px, env(safe-area-inset-bottom))
          max(14px, env(safe-area-inset-left));

        box-sizing: border-box;

        pointer-events: none;
      }

      #${POPUP_ID} .ceriabet-loggedin-card-v2 {
        position: relative;

        width: min(92vw, 560px);

        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 16px;

        pointer-events: auto;

        animation:
          ceriabetLoggedInPopupInV2
          .42s
          cubic-bezier(.22,.82,.3,1)
          forwards;
      }

      #${POPUP_ID} .ceriabet-image-wrap-v2 {
        position: relative;

        width: 100%;

        display: grid;
        place-items: center;
      }

      #${POPUP_ID} .ceriabet-popup-image-v2 {
        display: block;

        width: auto;
        max-width: 100%;
        max-height: 68vh;

        object-fit: contain;

        border: 0;
        outline: 0;

        background: transparent;

        filter:
          drop-shadow(
            0 18px 38px
            rgba(0,0,0,.46)
          );
      }

      #${CLOSE_ID} {
        position: absolute;

        top: -12px;
        right: -10px;

        width: 38px;
        height: 38px;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0;
        margin: 0;

        border:
          1px solid
          rgba(233,213,255,.9);

        border-radius: 50%;

        background:
          linear-gradient(
            180deg,
            #b96cff 0%,
            #7c3aed 48%,
            #3b0764 100%
          );

        color: #fff;

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        font-size: 24px;
        font-weight: 900;
        line-height: 1;

        cursor: pointer;

        z-index: 20;

        box-shadow:
          0 0 14px
          rgba(168,85,247,.78),
          0 7px 18px
          rgba(0,0,0,.45);

        -webkit-tap-highlight-color:
          transparent;

        transition:
          transform .15s ease,
          filter .15s ease;
      }

      #${CLOSE_ID}:active {
        transform: scale(.92);
      }

      #${EXPLORE_ID} {
        width: 130px;
        height: 40px;

        color: #fff;

        border-radius: 5px;

        padding: 10px 25px;

        font-family:
          "Lato",
          Arial,
          Helvetica,
          sans-serif;

        font-weight: 500;

        cursor: pointer;

        transition:
          all .3s ease;

        position: relative;

        display: inline-block;

        outline: none;

        font-size: 15px;

        overflow: hidden;

        isolation: isolate;

        background:
          linear-gradient(
            180deg,
            #8b5cf6 0%,
            #6d28d9 30%,
            #3b0764 70%,
            #111 100%
          );

        border:
          1px solid
          #c084fc;

        box-shadow:
          0 0 12px
          rgba(139,92,246,.70),
          0 0 28px
          rgba(139,92,246,.38),
          0 9px 22px
          rgba(0,0,0,.55),
          inset 0 1px 0
          rgba(255,255,255,.20);

        -webkit-tap-highlight-color:
          transparent;
      }

      #${EXPLORE_ID}::before {
        content: "";

        position: absolute;

        top: 0;
        left: -42%;

        width: 26%;
        height: 100%;

        background:
          linear-gradient(
            120deg,
            rgba(255,255,255,0),
            rgba(216,180,254,.95),
            rgba(255,255,255,0)
          );

        transform:
          skewX(-25deg);

        pointer-events: none;

        z-index: 1;

        animation:
          ceriabetExploreShineV2
          3.2s
          ease-in-out
          infinite;
      }

      #${EXPLORE_ID} > span {
        position: relative;
        z-index: 2;
      }

      #${EXPLORE_ID}:hover {
        box-shadow:
          4px 4px 6px 0
          rgba(255,255,255,.34),
          -4px -4px 6px 0
          rgba(116,125,136,.34),
          inset -4px -4px 6px 0
          rgba(255,255,255,.16),
          inset 4px 4px 6px 0
          rgba(0,0,0,.38),
          0 0 18px
          rgba(139,92,246,.58);

        filter: brightness(1.10);
      }

      #${EXPLORE_ID}:active {
        transform: scale(.97);
      }

      @media (max-width: 520px) {
        #${POPUP_ID}
        .ceriabet-loggedin-card-v2 {
          width: min(94vw, 460px);
          gap: 14px;
        }

        #${POPUP_ID}
        .ceriabet-popup-image-v2 {
          max-height: 64vh;
        }

        #${CLOSE_ID} {
          width: 36px;
          height: 36px;

          top: -10px;
          right: -6px;
        }
      }

      @media (
        prefers-reduced-motion: reduce
      ) {
        #${EXPLORE_ID}::before {
          animation: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function rememberClosed() {
    localStorage.setItem(
      DELAY_KEY,
      String(Date.now())
    );
  }

  function restoreScroll() {
    document.documentElement
      .style.overflow = "";

    document.body
      .style.overflow = "";
  }

  function closePopup(
    saveDelay = true,
    callback = null
  ) {
    const popup =
      document.getElementById(POPUP_ID);

    const overlay =
      document.getElementById(OVERLAY_ID);

    if (!popup || !overlay) {
      if (typeof callback === "function") {
        callback();
      }
      return;
    }

    if (saveDelay) {
      rememberClosed();
    }

    overlay.classList.add(
      "is-closing"
    );

    popup.style.opacity = "0";
    popup.style.transition =
      "opacity .24s ease";

    window.setTimeout(() => {
      popup.remove();
      overlay.remove();

      popupCreated = false;

      restoreScroll();

      if (
        typeof callback ===
        "function"
      ) {
        callback();
      }
    }, 270);
  }

  function goToAnnouncementInfo() {
    sessionStorage.setItem(
      OPEN_INFO_KEY,
      "1"
    );

    closePopup(
      true,
      () => {
        window.location.href =
          ANNOUNCEMENT_PATH;
      }
    );
  }

  function createPopup() {
    if (
      popupCreated ||
      !canShowPopup() ||
      !document.body
    ) {
      return false;
    }

    popupCreated = true;

    injectStyle();

    const overlay =
      document.createElement("div");

    overlay.id = OVERLAY_ID;

    const popup =
      document.createElement("div");

    popup.id = POPUP_ID;

    popup.setAttribute(
      "role",
      "dialog"
    );

    popup.setAttribute(
      "aria-modal",
      "true"
    );

    popup.innerHTML = `
      <div
        class="ceriabet-loggedin-card-v2"
      >

        <div
          class="ceriabet-image-wrap-v2"
        >

          <img
            class="ceriabet-popup-image-v2"
            src="${IMAGE_URL}"
            alt="CERIABET"
          >

          <button
            type="button"
            id="${CLOSE_ID}"
            aria-label="Tutup popup"
            title="Tutup"
          >
            ×
          </button>

        </div>

        <button
          type="button"
          id="${EXPLORE_ID}"
          aria-label="Explore"
        >
          <span>Explore</span>
        </button>

      </div>
    `;

    document.body.appendChild(
      overlay
    );

    document.body.appendChild(
      popup
    );

    document.documentElement
      .style.overflow = "hidden";

    document.body
      .style.overflow = "hidden";

    document
      .getElementById(CLOSE_ID)
      .addEventListener(
        "click",
        () => closePopup(true)
      );

    document
      .getElementById(EXPLORE_ID)
      .addEventListener(
        "click",
        goToAnnouncementInfo
      );

    return true;
  }

  function openAnnouncementInfoTab() {
    if (!isAnnouncementPage()) {
      return;
    }

    if (
      sessionStorage.getItem(
        OPEN_INFO_KEY
      ) !== "1"
    ) {
      return;
    }

    let attempts = 0;

    const maxAttempts = 60;

    const timer =
      window.setInterval(() => {
        attempts++;

        const infoTab =
          document.querySelector(
            INFO_TAB_SELECTOR
          );

        if (infoTab) {
          clearInterval(timer);

          sessionStorage.removeItem(
            OPEN_INFO_KEY
          );

          if (
            infoTab.getAttribute(
              "data-active"
            ) !== "true"
          ) {
            infoTab.click();
          }

          window.setTimeout(() => {
            infoTab.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center"
            });
          }, 180);

          return;
        }

        if (
          attempts >=
          maxAttempts
        ) {
          clearInterval(timer);
        }
      }, 250);
  }

  function initLoggedInPopup() {
    if (!isLoggedInPage()) {
      return;
    }

    let retries = 0;

    const timer =
      window.setInterval(() => {
        retries++;

        const success =
          createPopup();

        if (
          success ||
          retries >= 40
        ) {
          clearInterval(timer);
        }
      }, 500);
  }

  function handleEscape(event) {
    if (event.key !== "Escape") {
      return;
    }

    if (
      document.getElementById(
        POPUP_ID
      )
    ) {
      closePopup(true);
    }
  }

  function init() {
    openAnnouncementInfoTab();
    initLoggedInPopup();

    document.addEventListener(
      "keydown",
      handleEscape
    );
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
