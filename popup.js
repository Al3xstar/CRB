"use strict";

(function () {
  const EXTRA_LINK = "https://www.ceriabetsbobet.com";
  const INSTALL_LINK = "https://aplikasi.ceriabetsbo.com";

  const IMG = [
    "https://www.image2url.com/r2/default/images/1788605120589-7be2c4b7-0057-4c95-a94c-e9ec7e874d4d.png",
    "https://www.image2url.com/r2/default/images/1788097990438-2047cc2f-6da2-4728-8cb4-325b7b151283.png",
    "https://www.image2url.com/r2/default/images/1788097935225-ab0482a5-3215-49ad-a6e0-195629ad2ab9.png",
    "https://www.image2url.com/r2/default/images/1788098117610-0a2b8737-6add-4fed-86f9-b12a4fdaf8f6.png"
  ];

  const DELAY_KEY = "popup_delay_1h";
  const SLIDER_INTERVAL = 7000;
  const STYLE_ID = "ceriabet-popup-style";
  const POPUP_ID = "ceriabet-popup";
  const OVERLAY_ID = "ceriabet-popup-overlay";

  let popupCreated = false;
  let currentIndex = 0;
  let sliderTimer = null;
  let changingSlide = false;

  /* ==============================
     CEK HALAMAN
  ============================== */

  function isAllowedPage() {
    const path = location.pathname
      .replace(/\/+$/, "")
      .toLowerCase();

    return (
      path === "" ||
      path === "/" ||
      path.includes("home")
    );
  }

  function canShowPopup() {
    if (!isAllowedPage()) return false;

    const lastClosed = Number(
      localStorage.getItem(DELAY_KEY) || 0
    );

    return !(
      lastClosed &&
      Date.now() - lastClosed < 3600000
    );
  }

  /* ==============================
     PRELOAD SEMUA GAMBAR
  ============================== */

  function preloadImages() {
    return Promise.all(
      IMG.map(function (url) {
        return new Promise(function (resolve) {
          const preload = new Image();
          preload.decoding = "async";

          preload.onload = function () {
            if (typeof preload.decode === "function") {
              preload
                .decode()
                .catch(function () {})
                .finally(resolve);
            } else {
              resolve();
            }
          };

          preload.onerror = resolve;
          preload.src = url;

          if (preload.complete && preload.naturalWidth > 0) {
            if (typeof preload.decode === "function") {
              preload
                .decode()
                .catch(function () {})
                .finally(resolve);
            } else {
              resolve();
            }
          }
        });
      })
    );
  }

  /* ==============================
     CSS
  ============================== */

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `
      @keyframes ceriabetFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes ceriabetFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      @keyframes ceriabetSlideIn {
        from {
          transform: translateY(25px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes ceriabetPopupPullUp {
        from {
          transform: translateY(0);
          opacity: 1;
        }
        to {
          transform: translateY(-110vh);
          opacity: 0;
        }
      }

      @keyframes ceriabetShine {
        0% { left: -40%; }
        100% { left: 125%; }
      }

      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        background:
          linear-gradient(
            180deg,
            rgba(0, 0, 0, .35),
            rgba(0, 0, 0, .82)
          );
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        animation: ceriabetFadeIn .35s ease forwards;
      }

      #${OVERLAY_ID}.fade-out {
        animation: ceriabetFadeOut .35s ease forwards;
      }

      #${POPUP_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
        box-sizing: border-box;
        background: transparent;
        overflow-y: auto;
      }

      #${POPUP_ID}.pull-up {
        animation:
          ceriabetPopupPullUp .72s
          cubic-bezier(.55, .05, .25, 1)
          forwards;
        pointer-events: none;
      }

      #ceriabet-popup-box {
        position: relative;
        animation: ceriabetSlideIn .45s ease forwards;
        filter: none !important;
        box-shadow: none !important;
        background: transparent !important;
        border: none !important;
      }

      #ceriabet-close {
        position: absolute;
        top: -12px;
        right: -12px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background:
          linear-gradient(
            180deg,
            #a855f7,
            #4c1d95 60%,
            #111
          );
        color: #fff;
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        border: 1px solid #c084fc;
        box-shadow:
          0 0 16px rgba(168, 85, 247, .7);
      }

      #ceriabet-image-stage {
        position: relative;
        display: grid;
        place-items: center;
        max-width: 92vw;
        max-height: 58vh;
        overflow: hidden;
        background: transparent !important;
      }

      #ceriabet-popup-img,
      #ceriabet-popup-img-next {
        grid-area: 1 / 1;
        display: block;
        max-width: 92vw;
        max-height: 58vh;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 0;
        box-shadow: none !important;
        filter: none !important;
        background: transparent !important;
        border: none !important;
        will-change: transform, opacity;
      }

      #ceriabet-popup-img {
        position: relative;
        z-index: 1;
        opacity: 1;
        transform: translateX(0);
      }

      #ceriabet-popup-img-next {
        position: relative;
        z-index: 2;
        opacity: 0;
        transform: translateX(100%);
        pointer-events: none;
      }

      #ceriabet-popup-img-next.slide-rtl {
        opacity: 1;
        transform: translateX(0);
        transition:
          transform .7s cubic-bezier(.22, .8, .28, 1),
          opacity .3s ease;
      }

      #ceriabet-popup-img.slide-old-left {
        opacity: .28;
        transform: translateX(-18%);
        transition:
          transform .7s cubic-bezier(.22, .8, .28, 1),
          opacity .55s ease;
      }

      .ceriabet-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #c084fc;
        background:
          linear-gradient(
            180deg,
            #7c3aed,
            #2e1065
          );
        color: #fff;
        font-size: 24px;
        font-weight: 900;
        cursor: pointer;
        z-index: 9998;
        line-height: 22px;
        box-shadow:
          0 0 14px rgba(168, 85, 247, .55);
      }

      #ceriabet-prev {
        left: 8px;
      }

      #ceriabet-next {
        right: 8px;
      }

      #ceriabet-dots {
        display: none !important;
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        z-index: 9998;
        padding: 5px 8px;
        border-radius: 20px;
        background: rgba(0, 0, 0, .25);
      }

      .ceriabet-dot {
        width: 8px;
        height: 8px;
        min-width: 8px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, .5);
        padding: 0;
        cursor: pointer;
        transition:
          transform .2s ease,
          background .2s ease;
      }

      .ceriabet-dot.active {
        background: #a855f7;
        transform: scale(1.3);
        box-shadow: 0 0 10px #a855f7;
      }

      @keyframes ceriabetRunningText {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      #ceriabet-title {
        width: min(500px, 82vw);
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
        padding: 5px 0 7px;
        font-weight: 900;
        font-size: 16px;
        color: #c084fc;
        letter-spacing: 1px;
        text-shadow: none;
      }

      #ceriabet-title .ceriabet-running-track {
        display: flex;
        width: max-content;
        animation: ceriabetRunningText 18s linear infinite;
        will-change: transform;
      }

      #ceriabet-title .ceriabet-running-item {
        flex: 0 0 auto;
        padding-right: 28px;
      }

      #ceriabet-title:hover .ceriabet-running-track {
        animation-play-state: paused;
      }

      .ceriabet-gif-row {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
      }

      .ceriabet-gif-box {
        position: relative;
        width: 90px;
      }

      .ceriabet-gif-box img {
        display: block;
        width: 100%;
        border-radius: 12px;
        pointer-events: none;
        box-shadow:
          0 0 10px rgba(168, 85, 247, .35);
      }

      .ceriabet-btn-row {
        width: 310px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        justify-content: center;
        margin-top: 2px;
      }

      .ceriabet-btn,
      .ceriabet-ok {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        text-align: center;
        font-weight: 900;
        color: #fff !important;
        transition:
          transform .18s ease,
          filter .18s ease;
      }

      .ceriabet-btn {
        width: 148px;
        padding: 12px 0;
        border-radius: 15px;
        font-size: 12px;
        white-space: nowrap;
        text-decoration: none;
        letter-spacing: .5px;
        background:
          linear-gradient(
            180deg,
            #8b5cf6 0%,
            #6d28d9 30%,
            #3b0764 70%,
            #111 100%
          );
        border: 1px solid #c084fc;
        box-shadow:
          0 0 12px rgba(139, 92, 246, .7),
          0 0 28px rgba(139, 92, 246, .38),
          0 9px 22px rgba(0, 0, 0, .55),
          inset 0 1px 0 rgba(255, 255, 255, .2);
      }

      .ceriabet-ok {
        width: 120px;
        padding: 11px 0;
        border-radius: 14px;
        font-size: 14px;
        background:
          linear-gradient(
            180deg,
            #a855f7 0%,
            #6d28d9 38%,
            #3b0764 75%,
            #111 100%
          );
        border: 1px solid #d8b4fe;
        box-shadow:
          0 0 12px rgba(168, 85, 247, .8),
          0 0 25px rgba(168, 85, 247, .45),
          0 8px 20px rgba(0, 0, 0, .5),
          inset 0 1px 0 rgba(255, 255, 255, .2);
      }

      .ceriabet-btn:hover,
      .ceriabet-ok:hover {
        transform: scale(1.045);
        filter: brightness(1.18);
      }

      .ceriabet-btn:active,
      .ceriabet-ok:active {
        transform: scale(.96);
      }

      .ceriabet-btn::before,
      .ceriabet-ok::before {
        content: "";
        position: absolute;
        top: 0;
        left: -40%;
        width: 25%;
        height: 100%;
        background:
          linear-gradient(
            120deg,
            rgba(255, 255, 255, 0),
            rgba(216, 180, 254, .95),
            rgba(255, 255, 255, 0)
          );
        transform: skewX(-25deg);
        animation: ceriabetShine 2s infinite;
      }
/* TOMBOL DOWNLOAD APK - WARNA MERAH */
      .ceriabet-kumpulkan {
        background:
          linear-gradient(
            180deg,
            #e52a2a 0%,
            #d71920 28%,
            #b90816 62%,
            #72000b 100%
          ) !important;
        border: 1px solid #f28a47 !important;
        box-shadow:
          0 0 12px rgba(229, 42, 42, .55),
          0 0 26px rgba(180, 8, 22, .30),
          0 9px 22px rgba(0, 0, 0, .55),
          inset 0 1px 0 rgba(255, 190, 130, .45) !important;
      }

      .ceriabet-kumpulkan::before {
        background:
          linear-gradient(
            120deg,
            rgba(255, 255, 255, 0),
            rgba(255, 218, 190, .95),
            rgba(255, 255, 255, 0)
          ) !important;
      }

      @media (max-width: 768px) {
        #${POPUP_ID} {
          gap: 8px;
        }

        #ceriabet-image-stage,
        #ceriabet-popup-img,
        #ceriabet-popup-img-next {
          max-width: 88vw;
          max-height: 55vh;
        }

        .ceriabet-gif-box {
          width: 78px;
        }

        .ceriabet-btn-row {
          width: 310px;
          gap: 8px;
        }

        .ceriabet-btn {
          width: 148px;
          font-size: 12px;
          padding: 11px 0;
        }

        #ceriabet-title {
          width: 80vw;
          font-size: 13px;
          letter-spacing: .6px;
        }

        #ceriabet-title .ceriabet-running-track {
          animation-duration: 16s;
        }

        .ceriabet-ok {
          width: 115px;
          font-size: 13px;
          padding: 10px 0;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /* ==============================
     BUAT POPUP
  ============================== */

  async function createPopup() {
    if (
      popupCreated ||
      !canShowPopup() ||
      !document.body
    ) {
      return;
    }

    popupCreated = true;
    injectStyle();

    await preloadImages();

    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;

    const popup = document.createElement("div");
    popup.id = POPUP_ID;

    popup.innerHTML = `
      <div id="ceriabet-popup-box">

        <div id="ceriabet-close" title="Tutup">
          ✕
        </div>

        <button
          type="button"
          class="ceriabet-nav"
          id="ceriabet-prev"
          aria-label="Gambar sebelumnya"
        >
          ‹
        </button>

        <div id="ceriabet-image-stage">
          <img
            id="ceriabet-popup-img"
            src="${IMG[0]}"
            alt="Dirgahayu Indonesia Slide 1"
          >

          <img
            id="ceriabet-popup-img-next"
            src=""
            alt=""
            aria-hidden="true"
          >
        </div>

        <button
          type="button"
          class="ceriabet-nav"
          id="ceriabet-next"
          aria-label="Gambar berikutnya"
        >
          ›
        </button>

        <div id="ceriabet-dots"></div>
      </div>

      <div id="ceriabet-title" aria-label="CARI PENGALAMAN KEMENANGAN BESAR? DAFTAR DAN MAINKAN SEKARANG JUGA DI CERIABET!">
        <div class="ceriabet-running-track">
          <span class="ceriabet-running-item">CARI PENGALAMAN KEMENANGAN BESAR? DAFTAR DAN MAINKAN SEKARANG JUGA DI CERIABET !</span>
          <span class="ceriabet-running-item" aria-hidden="true">CARI PENGALAMAN KEMENANGAN BESAR? DAFTAR DAN MAINKAN SEKARANG JUGA DI CERIABET !</span>
        </div>
      </div>

      <div class="ceriabet-gif-row">

        <div class="ceriabet-gif-box">
          <img
            src="https://media.tenor.com/ky4lyYmnHlsAAAAM/starlight-princess-slot-inces.gif"
            alt="Starlight Princess"
          >
        </div>

        <div class="ceriabet-gif-box">
          <img
            src="https://media.tenor.com/Yd-FAxXmftkAAAAM/pg-soft-mahjong-ways.gif"
            alt="Mahjong Ways"
          >
        </div>

        <div class="ceriabet-gif-box">
          <img
            src="https://imgcdn.it.com/knb2zump50st9c6kzrne/VIP_AI88/lucky_neko.webp"
            alt="Lucky Neko"
          >
        </div>

      </div>

      <div class="ceriabet-btn-row">
<a
          class="ceriabet-btn"
          href="https://ceriavpn.online/allinone"
          target="_blank"
          rel="noopener noreferrer"
        >
          ⚽ ALL IN ONE
        </a>

        <button
          type="button"
          class="ceriabet-btn ceriabet-kumpulkan"
          id="ceriabet-download-apk"
        >
          📲 DOWNLOAD APK
        </button>

        <button
          type="button"
          class="ceriabet-ok"
          id="ceriabet-ok"
        >
          OK
        </button>

      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    const sliderImage =
      document.getElementById("ceriabet-popup-img");

    const nextSliderImage =
      document.getElementById("ceriabet-popup-img-next");

    const dotsContainer =
      document.getElementById("ceriabet-dots");

    /* ==============================
       DOT SLIDER
    ============================== */

    function renderDots() {
      dotsContainer.innerHTML = "";

      IMG.forEach(function (_, imageIndex) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className =
          "ceriabet-dot" +
          (imageIndex === currentIndex ? " active" : "");

        dot.setAttribute(
          "aria-label",
          "Tampilkan gambar " + (imageIndex + 1)
        );

        dot.addEventListener("click", function () {
          changeSlide(imageIndex);
          resetSliderTimer();
        });

        dotsContainer.appendChild(dot);
      });
    }

    /* ==============================
       SLIDE KANAN KE KIRI
    ============================== */

    function changeSlide(newIndex) {
      if (
        changingSlide ||
        newIndex < 0 ||
        newIndex >= IMG.length ||
        newIndex === currentIndex
      ) {
        return;
      }

      changingSlide = true;

      nextSliderImage.classList.remove("slide-rtl");
      sliderImage.classList.remove("slide-old-left");

      nextSliderImage.src = IMG[newIndex];
      nextSliderImage.alt =
        "Dirgahayu Indonesia Slide " + (newIndex + 1);

      nextSliderImage.style.transition = "none";
      nextSliderImage.style.opacity = "0";
      nextSliderImage.style.transform =
        "translateX(100%)";

      void nextSliderImage.offsetWidth;

      nextSliderImage.style.transition = "";
      nextSliderImage.style.opacity = "";
      nextSliderImage.style.transform = "";

      sliderImage.classList.add("slide-old-left");
      nextSliderImage.classList.add("slide-rtl");

      let finished = false;

      function finishSlide() {
        if (finished) return;
        finished = true;

        nextSliderImage.removeEventListener(
          "transitionend",
          handleTransitionEnd
        );

        currentIndex = newIndex;

        sliderImage.src = IMG[currentIndex];
        sliderImage.alt =
          "Dirgahayu Indonesia Slide " +
          (currentIndex + 1);

        sliderImage.classList.remove("slide-old-left");
        sliderImage.style.transition = "none";
        sliderImage.style.opacity = "1";
        sliderImage.style.transform = "translateX(0)";

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            nextSliderImage.style.transition = "none";
            nextSliderImage.classList.remove("slide-rtl");
            nextSliderImage.style.opacity = "0";
            nextSliderImage.style.transform =
              "translateX(100%)";
            nextSliderImage.src = "";
            nextSliderImage.alt = "";

            requestAnimationFrame(function () {
              sliderImage.style.transition = "";
              sliderImage.style.opacity = "";
              sliderImage.style.transform = "";

              nextSliderImage.style.transition = "";
              nextSliderImage.style.opacity = "";
              nextSliderImage.style.transform = "";

              changingSlide = false;
            });
          });
        });

        renderDots();
      }

      function handleTransitionEnd(event) {
        if (
          event.target === nextSliderImage &&
          event.propertyName === "transform"
        ) {
          finishSlide();
        }
      }

      nextSliderImage.addEventListener(
        "transitionend",
        handleTransitionEnd
      );

      window.setTimeout(finishSlide, 900);
    }

    function nextSlide() {
      const nextIndex =
        (currentIndex + 1) % IMG.length;

      changeSlide(nextIndex);
    }

    function previousSlide() {
      const previousIndex =
        (currentIndex - 1 + IMG.length) % IMG.length;

      changeSlide(previousIndex);
    }

    function startSliderTimer() {
      clearInterval(sliderTimer);

      sliderTimer = setInterval(function () {
        nextSlide();
      }, SLIDER_INTERVAL);
    }

    function resetSliderTimer() {
      startSliderTimer();
    }

    /* ==============================
       TUTUP POPUP
    ============================== */

    function closePopup() {
      clearInterval(sliderTimer);

      popup.classList.add("pull-up");
      overlay.classList.add("fade-out");

      localStorage.setItem(
        DELAY_KEY,
        String(Date.now())
      );

      setTimeout(function () {
        popup.remove();
        overlay.remove();
        popupCreated = false;
      }, 760);
    }
    /* ==============================
       DIRECT DOWNLOAD PWA
    ============================== */

    function directDownload() {
      const installWindow = window.open(
        INSTALL_LINK,
        "instal",
        "width=420,height=680,resizable=yes,scrollbars=yes"
      );

      if (!installWindow) {
        window.location.href = INSTALL_LINK;
      }
    }


    /* ==============================
       EVENT
    ============================== */

    document
      .getElementById("ceriabet-next")
      .addEventListener("click", function () {
        nextSlide();
        resetSliderTimer();
      });

    document
      .getElementById("ceriabet-prev")
      .addEventListener("click", function () {
        previousSlide();
        resetSliderTimer();
      });
document
      .getElementById("ceriabet-download-apk")
      .addEventListener("click", directDownload);

    document
      .getElementById("ceriabet-close")
      .addEventListener("click", closePopup);

    document
      .getElementById("ceriabet-ok")
      .addEventListener("click", closePopup);

    renderDots();
    startSliderTimer();
  }

  /* ==============================
     INIT
  ============================== */

  function init() {
    let retry = 0;

    const checkBody = setInterval(function () {
      createPopup();
      retry++;

      if (popupCreated || retry >= 40) {
        clearInterval(checkBody);
      }
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
