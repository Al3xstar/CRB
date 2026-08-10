"use strict";

(function () {
  const STYLE_ID = "ceriabet-prediksi-style-v1";
  const BTN_ID = "ceriabet-prediksi-button-v1";
  const MODAL_ID = "ceriabet-prediksi-modal-v1";
  const FRAME_ID = "ceriabet-prediksi-frame-v1";

  /* Shortlink Prediksi Bola */
  const LINK =
    "https://ceriavpn.online/prediksi-bola";

  /* GIF tombol kiri bawah */
  const LOGO =
    "https://www.image2url.com/r2/default/images/1784851724730-ac64fdd0-4de3-46dd-bc91-753187b8640d.gif";

  /* Posisi dan ukuran tombol */
  const LEFT = 15;
  const BOTTOM = 96;
  const SIZE = 50;

  /* Tombol hanya tampil pada mobile */
  const MOBILE_MAX_WIDTH = 768;

  /* true: tampil di semua halaman */
  const SHOW_ON_ALL_PAGES = true;

  function isAllowedPage() {
    if (SHOW_ON_ALL_PAGES) {
      return true;
    }

    const path = window.location.pathname
      .replace(/\/+$/, "")
      .toLowerCase();

    return (
      path === "" ||
      path === "/" ||
      path.endsWith("/index.html") ||
      path.includes("/home")
    );
  }

  function injectStyle() {
    if (!isAllowedPage()) return;

    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `
      #${BTN_ID}{
        position:fixed;
        left:max(
          ${LEFT}px,
          env(safe-area-inset-left)
        );
        bottom:calc(
          ${BOTTOM}px +
          env(safe-area-inset-bottom)
        );
        width:${SIZE}px;
        height:${SIZE}px;
        padding:0;
        margin:0;
        border:none;
        border-radius:50%;
        background:transparent;
        overflow:visible;
        display:none;
        cursor:pointer;
        z-index:2147483600;
        outline:none;
        text-decoration:none;
        user-select:none;
        -webkit-user-select:none;
        -webkit-tap-highlight-color:transparent;
        transition:
          transform .18s ease,
          opacity .18s ease;
      }

      #${BTN_ID}:active{
        transform:scale(.92);
        opacity:.88;
      }

      #${BTN_ID} img{
        width:100%;
        height:100%;
        display:block;
        border-radius:50%;
        object-fit:cover;
        pointer-events:none;
      }

      #${BTN_ID}::after{
        content:"1";
        position:absolute;
        top:-4px;
        right:-4px;
        width:14px;
        height:14px;
        box-sizing:content-box;
        display:flex;
        align-items:center;
        justify-content:center;
        border:2px solid #fff;
        border-radius:50%;
        background:#ff0033;
        color:#fff;
        font-family:
          Arial,
          Helvetica,
          sans-serif;
        font-size:9px;
        font-weight:900;
        line-height:1;
        box-shadow:
          0 0 4px rgba(255,0,51,.7),
          0 2px 5px rgba(0,0,0,.35);
        pointer-events:none;
        z-index:2;
      }

      #${MODAL_ID}{
        position:fixed;
        inset:0;
        width:100vw;
        height:100vh;
        height:100dvh;
        display:none;
        overflow:hidden;
        background:#000;
        z-index:2147483647;
        overscroll-behavior:none;
      }

      #${MODAL_ID}.show{
        display:block;
      }

      #${FRAME_ID}{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        display:block;
        border:none;
        outline:none;
        background:#000;
      }

      .ceriabet-prediksi-loader{
        position:absolute;
        inset:0;
        z-index:3;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#000;
        color:#fff;
        font-family:
          Arial,
          Helvetica,
          sans-serif;
        font-size:14px;
        font-weight:700;
      }

      .ceriabet-prediksi-loader::before{
        content:"";
        width:32px;
        height:32px;
        margin-right:10px;
        border:3px solid
          rgba(255,255,255,.24);
        border-top-color:#a855f7;
        border-radius:50%;
        animation:
          ceriabetPrediksiSpin
          .8s linear infinite;
      }

      .ceriabet-prediksi-close{
        position:absolute;
        top:max(
          10px,
          env(safe-area-inset-top)
        );
        right:max(
          10px,
          env(safe-area-inset-right)
        );
        width:40px;
        height:40px;
        padding:0;
        margin:0;
        display:flex;
        align-items:center;
        justify-content:center;
        border:1px solid
          rgba(255,255,255,.85);
        border-radius:50%;
        background:
          linear-gradient(
            180deg,
            #b868ff 0%,
            #7e22ce 48%,
            #3b0764 100%
          );
        color:#fff;
        font-family:
          Arial,
          Helvetica,
          sans-serif;
        font-size:26px;
        font-weight:900;
        line-height:1;
        cursor:pointer;
        z-index:5;
        box-shadow:
          0 0 16px
            rgba(168,85,247,.9),
          0 6px 18px
            rgba(0,0,0,.6);
        outline:none;
        -webkit-tap-highlight-color:
          transparent;
        transition:transform .15s ease;
      }

      .ceriabet-prediksi-close:active{
        transform:scale(.92);
      }

      @keyframes ceriabetPrediksiSpin{
        to{
          transform:rotate(360deg);
        }
      }

      @media(
        max-width:${MOBILE_MAX_WIDTH}px
      ){
        #${BTN_ID}{
          display:block;
        }
      }

      @media(
        min-width:${MOBILE_MAX_WIDTH + 1}px
      ){
        #${BTN_ID}{
          display:none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function lockPageScroll() {
    document.documentElement.dataset
      .ceriabetOldOverflow =
        document.documentElement
          .style.overflow || "";

    document.body.dataset
      .ceriabetOldOverflow =
        document.body.style.overflow || "";

    document.documentElement
      .style.overflow = "hidden";

    document.body
      .style.overflow = "hidden";
  }

  function unlockPageScroll() {
    document.documentElement
      .style.overflow =
        document.documentElement
          .dataset.ceriabetOldOverflow || "";

    document.body
      .style.overflow =
        document.body
          .dataset.ceriabetOldOverflow || "";

    delete document.documentElement
      .dataset.ceriabetOldOverflow;

    delete document.body
      .dataset.ceriabetOldOverflow;
  }

  function createModal() {
    const existingModal =
      document.getElementById(MODAL_ID);

    if (existingModal) {
      return existingModal;
    }

    const modal =
      document.createElement("div");

    modal.id = MODAL_ID;

    modal.setAttribute(
      "role",
      "dialog"
    );

    modal.setAttribute(
      "aria-modal",
      "true"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    modal.setAttribute(
      "aria-label",
      "Prediksi Bola CERIABET"
    );

    modal.innerHTML = `
      <div class="ceriabet-prediksi-loader">
        Loading...
      </div>

      <button
        type="button"
        class="ceriabet-prediksi-close"
        aria-label="Tutup Prediksi Bola"
        title="Tutup"
      >
        ×
      </button>

      <iframe
        id="${FRAME_ID}"
        src=""
        title="Prediksi Bola CERIABET"
        allow="autoplay; fullscreen"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    `;

    document.body.appendChild(modal);

    const frame =
      modal.querySelector(
        `#${FRAME_ID}`
      );

    const loader =
      modal.querySelector(
        ".ceriabet-prediksi-loader"
      );

    const closeButton =
      modal.querySelector(
        ".ceriabet-prediksi-close"
      );

    function closeModal() {
      modal.classList.remove("show");

      modal.setAttribute(
        "aria-hidden",
        "true"
      );

      frame.src = "about:blank";

      loader.style.display = "flex";

      unlockPageScroll();
    }

    frame.addEventListener(
      "load",
      function () {
        if (
          modal.classList.contains("show")
        ) {
          loader.style.display = "none";
        }
      }
    );

    closeButton.addEventListener(
      "click",
      closeModal
    );

    modal.closeCeriabetPrediksi =
      closeModal;

    return modal;
  }

  function openModal() {
    const modal = createModal();

    const frame =
      modal.querySelector(
        `#${FRAME_ID}`
      );

    const loader =
      modal.querySelector(
        ".ceriabet-prediksi-loader"
      );

    loader.style.display = "flex";

    modal.classList.add("show");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    lockPageScroll();

    window.setTimeout(
      function () {
        frame.src = LINK;
      },
      30
    );
  }

  function createButton() {
    if (!isAllowedPage()) return;

    if (
      document.getElementById(BTN_ID)
    ) {
      return;
    }

    const button =
      document.createElement("button");

    button.id = BTN_ID;
    button.type = "button";

    button.setAttribute(
      "aria-label",
      "Buka Prediksi Bola"
    );

    button.setAttribute(
      "title",
      "Prediksi Bola AI"
    );

    button.innerHTML = `
      <img
        src="${LOGO}"
        alt="Prediksi Bola AI"
        draggable="false"
      >
    `;

    button.addEventListener(
      "click",
      openModal
    );

    document.body.appendChild(button);
  }

  function handleEscape(event) {
    if (event.key !== "Escape") {
      return;
    }

    const modal =
      document.getElementById(MODAL_ID);

    if (
      modal &&
      modal.classList.contains("show") &&
      typeof modal
        .closeCeriabetPrediksi ===
        "function"
    ) {
      modal.closeCeriabetPrediksi();
    }
  }

  function init() {
    if (!isAllowedPage()) return;

    injectStyle();
    createModal();
    createButton();

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
