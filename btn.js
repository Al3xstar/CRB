(function () {"use strict";

const MOBILE_BREAKPOINT = 480;

const MODAL_ID = "ceriabet-menu-modal";
const FRAME_ID = "ceriabet-menu-frame";
const STYLE_ID = "ceriabet-menu-style";

const MENU = [
    {
        name: "CERIABET",
        url: "https://ceriavpn.online/crb3",
        image: "https://www.image2url.com/r2/default/images/1786403885683-20b27b7e-bd99-4060-941e-71e094bcfa97.gif"
    },
    {
        name: "Telegram",
        url: "https://ceriavpn.online/telegramchat",
        image: "https://www.image2url.com/r2/default/images/1786403921709-643c8e72-5a6f-4e49-b414-d329a6afd95d.gif"
    },
    {
        name: "RTP CERIABET",
        url: "https://ceriavpn.online/rtp-gacor-ceriabet",
        image: "https://www.image2url.com/r2/default/images/1786403949222-c3bbc8b1-f7a8-4569-b705-708ad7b9df83.gif"
    },
    {
        name: "Prediksi Bola",
        url: "https://ceriavpn.online/prediksi-bola",
        image: "https://www.image2url.com/r2/default/images/1786403974097-a95a661e-949e-4c59-963c-5a7679dfd306.gif"
    },
    {
        name: "Police CERIABET",
        url: "https://ceriavpn.online/policecrb",
        image: "https://www.image2url.com/r2/default/images/1786403998986-7b1e3ae9-e0f8-4f08-ab67-a4d3d6fd9760.gif"
    }
];

/* =====================================================
   CSS
===================================================== */

function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const css = document.createElement("style");
    css.id = STYLE_ID;

    css.textContent = `

        /* =========================
           MENU 5 TOMBOL
        ========================= */

        .btn-atas {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            align-items: center;
            width: 100%;
            padding: 6px 8px;
            margin: 6px 0;
            box-sizing: border-box;
            gap: 6px;
        }

        .btn-atas .ceriabet-popup-btn {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 100%;
            min-width: 0;

            padding: 0;
            margin: 0;

            border: 0;
            outline: none;
            background: transparent;

            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
        }

        .btn-atas .ceriabet-popup-btn img {
            display: block;

            width: 60px;
            max-width: 100%;
            height: 60px;

            object-fit: contain;

            border: 0;
            pointer-events: none;

            transition:
                transform .15s ease,
                filter .15s ease;
        }

        .btn-atas .ceriabet-popup-btn:active img {
            transform: scale(.92);
            filter: brightness(.9);
        }

        @media (min-width: 481px) {
            .btn-atas {
                position: relative;
                z-index: 5;

                max-width: 1200px;

                margin: 8px auto;
                padding: 8px 12px;
            }
        }

        @media (max-width: 480px) {
            .btn-atas {
                padding: 5px 4px;
                margin: 6px 0;
                gap: 3px;
            }

            .btn-atas .ceriabet-popup-btn img {
                width: 52px;
                height: 52px;
            }
        }


        /* =========================
           POPUP / MODAL
        ========================= */

        #${MODAL_ID} {
            position: fixed;
            inset: 0;

            width: 100vw;
            height: 100vh;
            height: 100dvh;

            background: #000;

            z-index: 2147483647;

            display: none;

            overflow: hidden;

            opacity: 0;

            transition: opacity .2s ease;
        }

        #${MODAL_ID}.show {
            display: block;
            opacity: 1;
        }


        /* =========================
           IFRAME
        ========================= */

        #${FRAME_ID} {
            position: absolute;
            inset: 0;

            width: 100%;
            height: 100%;

            border: 0;
            outline: 0;

            display: block;

            background: #000;

            z-index: 1;
        }


        /* =========================
           LOADING
        ========================= */

        .ceriabet-menu-loader {
            position: absolute;
            inset: 0;

            z-index: 3;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #08050d;

            color: #fff;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size: 14px;
            font-weight: 700;
        }

        .ceriabet-menu-loader::before {
            content: "";

            width: 32px;
            height: 32px;

            margin-right: 10px;

            border: 3px solid rgba(255,255,255,.2);
            border-top-color: #a855f7;

            border-radius: 50%;

            animation:
                ceriabetMenuSpin
                .75s linear infinite;
        }

        @keyframes ceriabetMenuSpin {
            to {
                transform: rotate(360deg);
            }
        }


        /* =========================
           TOMBOL CLOSE
        ========================= */

        .ceriabet-menu-close {
            position: absolute;

            top: max(
                12px,
                env(safe-area-inset-top)
            );

            right: max(
                12px,
                env(safe-area-inset-right)
            );

            width: 44px;
            height: 44px;

            padding: 0;
            margin: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 2px solid rgba(255,255,255,.9);

            border-radius: 50%;

            background:
                linear-gradient(
                    180deg,
                    #b868ff 0%,
                    #7e22ce 48%,
                    #3b0764 100%
                );

            color: #fff;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size: 29px;
            font-weight: 900;
            line-height: 1;

            cursor: pointer;

            z-index: 10;

            box-shadow:
                0 0 18px rgba(168,85,247,.95),
                0 5px 20px rgba(0,0,0,.65);

            outline: none;

            -webkit-tap-highlight-color: transparent;

            transition:
                transform .15s ease,
                filter .15s ease;
        }

        .ceriabet-menu-close:hover {
            filter: brightness(1.15);
        }

        .ceriabet-menu-close:active {
            transform: scale(.9);
        }


        /* =========================
           NAMA HALAMAN
        ========================= */

        .ceriabet-menu-title {
            position: absolute;

            top: max(
                18px,
                env(safe-area-inset-top)
            );

            left: 50%;

            transform: translateX(-50%);

            max-width: 65%;

            color: #fff;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size: 13px;
            font-weight: 800;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            text-align: center;

            background: rgba(0,0,0,.55);

            padding: 7px 14px;

            border-radius: 20px;

            z-index: 5;

            pointer-events: none;

            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }
    `;

    document.head.appendChild(css);
}


/* =====================================================
   LOCK SCROLL
===================================================== */

let oldHtmlOverflow = "";
let oldBodyOverflow = "";

function lockPageScroll() {
    oldHtmlOverflow =
        document.documentElement.style.overflow || "";

    oldBodyOverflow =
        document.body.style.overflow || "";

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
}

function unlockPageScroll() {
    document.documentElement.style.overflow =
        oldHtmlOverflow;

    document.body.style.overflow =
        oldBodyOverflow;
}


/* =====================================================
   CREATE MODAL
===================================================== */

function createModal() {
    let modal =
        document.getElementById(MODAL_ID);

    if (modal) {
        return modal;
    }

    modal = document.createElement("div");

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

    modal.innerHTML = `

        <div class="ceriabet-menu-loader">
            Loading...
        </div>

        <div class="ceriabet-menu-title">
            CERIABET
        </div>

        <button
            type="button"
            class="ceriabet-menu-close"
            aria-label="Tutup"
            title="Tutup"
        >
            ×
        </button>

        <iframe
            id="${FRAME_ID}"
            src="about:blank"
            title="CERIABET"
            allow="autoplay; fullscreen"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    `;

    document.body.appendChild(modal);

    const frame =
        modal.querySelector(
            "#" + FRAME_ID
        );

    const loader =
        modal.querySelector(
            ".ceriabet-menu-loader"
        );

    const closeButton =
        modal.querySelector(
            ".ceriabet-menu-close"
        );


    /* =========================
       FRAME SUDAH LOAD
    ========================= */

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


    /* =========================
       CLOSE
    ========================= */

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


    closeButton.addEventListener(
        "click",
        closeModal
    );


    modal.closeCeriabetMenu =
        closeModal;


    return modal;
}


/* =====================================================
   OPEN POPUP
===================================================== */

function openModal(url, title) {

    const modal =
        createModal();

    const frame =
        modal.querySelector(
            "#" + FRAME_ID
        );

    const loader =
        modal.querySelector(
            ".ceriabet-menu-loader"
        );

    const titleBox =
        modal.querySelector(
            ".ceriabet-menu-title"
        );


    titleBox.textContent =
        title || "CERIABET";

    loader.style.display =
        "flex";


    modal.classList.add(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    lockPageScroll();


    /*
     * Sedikit delay agar modal muncul
     * terlebih dahulu sebelum iframe load
     */
    setTimeout(
        function () {
            frame.src = url;
        },
        30
    );
}


/* =====================================================
   CREATE 5 BUTTON
===================================================== */

function createButtonBox() {

    let box =
        document.querySelector(
            ".btn-atas"
        );

    if (box) {
        return box;
    }


    box =
        document.createElement(
            "div"
        );

    box.className =
        "btn-atas";


    MENU.forEach(
        function (item) {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "ceriabet-popup-btn";


            button.setAttribute(
                "aria-label",
                item.name
            );


            button.setAttribute(
                "title",
                item.name
            );


            button.innerHTML = `
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    draggable="false"
                >
            `;


            button.addEventListener(
                "click",
                function () {

                    openModal(
                        item.url,
                        item.name
                    );
                }
            );


            box.appendChild(
                button
            );
        }
    );


    return box;
}


/* =====================================================
   POSISI BUTTON BOX
===================================================== */

function placeButtonBox() {

    const box =
        createButtonBox();


    const isMobile =
        window.innerWidth <=
        MOBILE_BREAKPOINT;


    /* =========================
       MOBILE
    ========================= */

    if (isMobile) {

        const jackpotSection =
            document.querySelector(
                ".jackpot-play-section"
            );


        if (
            !jackpotSection ||
            !jackpotSection.parentNode
        ) {
            return false;
        }


        if (
            box.nextElementSibling !==
            jackpotSection
        ) {

            jackpotSection
                .parentNode
                .insertBefore(
                    box,
                    jackpotSection
                );
        }


        return true;
    }


    /* =========================
       DESKTOP
    ========================= */

    const announcementOuter =
        document.querySelector(
            ".announcement-outer-container"
        );


    const homeInner =
        document.querySelector(
            ".home-inner-container"
        );


    if (
        !announcementOuter ||
        !homeInner
    ) {
        return false;
    }


    if (
        announcementOuter.parentNode &&
        announcementOuter.parentNode ===
        homeInner.parentNode
    ) {

        if (
            box.nextElementSibling !==
            homeInner
        ) {

            homeInner
                .parentNode
                .insertBefore(
                    box,
                    homeInner
                );
        }


        return true;
    }


    if (
        announcementOuter.parentNode
    ) {

        announcementOuter
            .insertAdjacentElement(
                "afterend",
                box
            );


        return true;
    }


    return false;
}


/* =====================================================
   ESC UNTUK CLOSE
===================================================== */

function handleEscape(event) {

    if (
        event.key !== "Escape"
    ) {
        return;
    }


    const modal =
        document.getElementById(
            MODAL_ID
        );


    if (
        modal &&
        modal.classList.contains(
            "show"
        ) &&
        typeof modal
            .closeCeriabetMenu ===
            "function"
    ) {

        modal
            .closeCeriabetMenu();
    }
}


/* =====================================================
   INIT
===================================================== */

function init() {

    injectStyle();

    createModal();


    let checker =
        setInterval(
            function () {

                const success =
                    placeButtonBox();


                if (success) {
                    clearInterval(
                        checker
                    );
                }

            },
            500
        );


    /* =========================
       RESIZE
    ========================= */

    let resizeTimer;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        placeButtonBox();

                    },
                    150
                );
        }
    );


    /* =========================
       SPA / DYNAMIC WEBSITE
    ========================= */

    const observer =
        new MutationObserver(
            function () {

                const box =
                    document.querySelector(
                        ".btn-atas"
                    );


                if (!box) {
                    placeButtonBox();
                }
            }
        );


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );


    /* =========================
       ESC
    ========================= */

    document.addEventListener(
        "keydown",
        handleEscape
    );


    /* =========================
       STOP CHECKER 30 DETIK
    ========================= */

    setTimeout(
        function () {
            clearInterval(
                checker
            );
        },
        30000
    );
}


/* =====================================================
   START
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init,
        {
            once: true
        }
    );

} else {

    init();

}

})();
