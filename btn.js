(function () {
    "use strict";

    /* =====================================================
       CONFIG
    ===================================================== */

    const MOBILE_BREAKPOINT = 480;
    const STYLE_ID = "ceriabet-menu-style";
    const MENU_CLASS = "btn-atas";

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

        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const style = document.createElement("style");

        style.id = STYLE_ID;

        style.textContent = `

            /* =========================================
               CONTAINER 5 MENU
            ========================================= */

            .${MENU_CLASS} {
                display: grid;
                grid-template-columns: repeat(5, minmax(0, 1fr));

                align-items: center;
                justify-content: center;

                width: 100%;

                padding: 6px 8px;
                margin: 6px 0;

                gap: 6px;

                box-sizing: border-box;

                position: relative;
                z-index: 5;
            }


            /* =========================================
               BUTTON / LINK
            ========================================= */

            .${MENU_CLASS} .ceriabet-menu-btn {

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

                text-decoration: none;

                cursor: pointer;

                -webkit-tap-highlight-color: transparent;

                user-select: none;
                -webkit-user-select: none;
            }


            /* =========================================
               IMAGE / GIF
            ========================================= */

            .${MENU_CLASS} .ceriabet-menu-btn img {

                display: block;

                width: 60px;
                max-width: 100%;

                height: 60px;

                object-fit: contain;

                border: 0;

                pointer-events: none;

                transition:
                    transform .15s ease,
                    filter .15s ease,
                    opacity .15s ease;
            }


            /* =========================================
               HOVER
            ========================================= */

            @media (hover: hover) {

                .${MENU_CLASS} .ceriabet-menu-btn:hover img {

                    transform: scale(1.07);

                    filter:
                        brightness(1.12)
                        drop-shadow(
                            0 4px 8px
                            rgba(0,0,0,.25)
                        );
                }
            }


            /* =========================================
               CLICK
            ========================================= */

            .${MENU_CLASS} .ceriabet-menu-btn:active img {

                transform: scale(.91);

                filter: brightness(.88);
            }


            /* =========================================
               DESKTOP
            ========================================= */

            @media (min-width: 481px) {

                .${MENU_CLASS} {

                    max-width: 1200px;

                    margin: 8px auto;

                    padding: 8px 12px;

                    gap: 8px;
                }

                .${MENU_CLASS} .ceriabet-menu-btn img {

                    width: 60px;
                    height: 60px;
                }
            }


            /* =========================================
               MOBILE
            ========================================= */

            @media (max-width: 480px) {

                .${MENU_CLASS} {

                    padding: 5px 4px;

                    margin: 6px 0;

                    gap: 3px;
                }

                .${MENU_CLASS} .ceriabet-menu-btn img {

                    width: 52px;
                    height: 52px;
                }
            }


            /* =========================================
               VERY SMALL MOBILE
            ========================================= */

            @media (max-width: 360px) {

                .${MENU_CLASS} {

                    padding-left: 2px;
                    padding-right: 2px;

                    gap: 2px;
                }

                .${MENU_CLASS} .ceriabet-menu-btn img {

                    width: 46px;
                    height: 46px;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /* =====================================================
       CREATE MENU BOX
    ===================================================== */

    function createButtonBox() {

        let box = document.querySelector(
            "." + MENU_CLASS
        );


        /* =========================================
           JIKA SUDAH ADA
        ========================================= */

        if (box) {

            return box;
        }


        /* =========================================
           BUAT CONTAINER
        ========================================= */

        box = document.createElement("div");

        box.className = MENU_CLASS;

        box.setAttribute(
            "aria-label",
            "Menu CERIABET"
        );


        /* =========================================
           BUAT 5 MENU
        ========================================= */

        MENU.forEach(function (item) {

            /*
             * Menggunakan <a> lebih stabil daripada
             * window.open karena tidak mudah dianggap
             * popup oleh browser.
             */

            const link = document.createElement("a");


            link.className =
                "ceriabet-menu-btn";


            link.href =
                item.url;


            /*
             * NEW TAB / NEW WINDOW
             */

            link.target =
                "_blank";


            /*
             * SECURITY
             */

            link.rel =
                "noopener noreferrer";


            /*
             * ACCESSIBILITY
             */

            link.setAttribute(
                "aria-label",
                item.name
            );


            link.setAttribute(
                "title",
                item.name
            );


            /* =====================================
               IMAGE
            ===================================== */

            const image =
                document.createElement("img");


            image.src =
                item.image;


            image.alt =
                item.name;


            image.draggable =
                false;


            image.loading =
                "eager";


            image.decoding =
                "async";


            /* =====================================
               ERROR IMAGE
            ===================================== */

            image.addEventListener(
                "error",
                function () {

                    /*
                     * Jangan merusak layout kalau
                     * server GIF sedang error.
                     */

                    image.style.opacity =
                        ".35";
                }
            );


            /* =====================================
               APPEND
            ===================================== */

            link.appendChild(
                image
            );


            box.appendChild(
                link
            );
        });


        return box;
    }


    /* =====================================================
       POSISI BUTTON
    ===================================================== */

    function placeButtonBox() {

        const box =
            createButtonBox();


        const isMobile =
            window.innerWidth <=
            MOBILE_BREAKPOINT;


        /* =================================================
           MOBILE

           Posisi:
           sebelum .jackpot-play-section
        ================================================= */

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


            /*
             * Jangan insert ulang
             * kalau posisi sudah benar.
             */

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


        /* =================================================
           DESKTOP

           Posisi:
           announcement
           ↓
           5 menu
           ↓
           home content
        ================================================= */

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


        /* =================================================
           JIKA KEDUANYA SATU PARENT
        ================================================= */

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


        /* =================================================
           FALLBACK

           Taruh setelah announcement
        ================================================= */

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
       INIT
    ===================================================== */

    function init() {

        /* =============================================
           CSS
        ============================================= */

        injectStyle();


        /* =============================================
           COBA PASANG LANGSUNG
        ============================================= */

        placeButtonBox();


        /* =============================================
           CHECKER

           Untuk website yang element-nya muncul
           setelah JavaScript / SPA selesai load.
        ============================================= */

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


        /* =============================================
           RESIZE

           Kalau berubah Desktop ↔ Mobile,
           posisi menu otomatis menyesuaikan.
        ============================================= */

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


        /* =============================================
           SPA / DYNAMIC WEBSITE

           Jika halaman website mengganti DOM,
           menu akan dibuat/pindahkan lagi.
        ============================================= */

        const observer =
            new MutationObserver(
                function () {

                    const box =
                        document.querySelector(
                            "." + MENU_CLASS
                        );


                    /*
                     * Jika menu hilang karena SPA
                     */

                    if (!box) {

                        placeButtonBox();

                        return;
                    }


                    /*
                     * Kalau target halaman berubah,
                     * pastikan posisinya benar.
                     */

                    if (
                        document.body.contains(box)
                    ) {

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


        /* =============================================
           STOP CHECKER SETELAH 30 DETIK

           MutationObserver tetap aktif.
        ============================================= */

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
