(function () {
    "use strict";

    /* =====================================================
       CONFIG
    ===================================================== */

    const MOBILE_BREAKPOINT = 480;

    const STYLE_ID = "ceriabet-menu-style-v2";
    const MENU_CLASS = "btn-atas";
    const BUTTON_CLASS = "ceriabet-menu-btn";

    const SELECTOR_MOBILE_TARGET = ".jackpot-play-section";
    const SELECTOR_ANNOUNCEMENT = ".announcement-outer-container";
    const SELECTOR_HOME = ".home-inner-container";

    const MENU = [
        {
            name: "CERIABET",
            shortName: "CERIABET",
            url: "https://ceriavpn.online/crb3",
            image: "https://www.image2url.com/r2/default/images/1786403885683-20b27b7e-bd99-4060-941e-71e094bcfa97.gif"
        },
        {
            name: "Telegram",
            shortName: "TELEGRAM",
            url: "https://ceriavpn.online/telegramchat",
            image: "https://www.image2url.com/r2/default/images/1786403921709-643c8e72-5a6f-4e49-b414-d329a6afd95d.gif"
        },
        {
            name: "RTP CERIABET",
            shortName: "RTP",
            url: "https://ceriavpn.online/rtp-gacor-ceriabet",
            image: "https://www.image2url.com/r2/default/images/1786403949222-c3bbc8b1-f7a8-4569-b705-708ad7b9df83.gif"
        },
        {
            name: "Prediksi Bola",
            shortName: "PREDIKSI",
            url: "https://ceriavpn.online/prediksi-bola",
            image: "https://www.image2url.com/r2/default/images/1786403974097-a95a661e-949e-4c59-963c-5a7679dfd306.gif"
        },
        {
            name: "Police CERIABET",
            shortName: "POLICE",
            url: "https://ceriavpn.online/policecrb",
            image: "https://www.image2url.com/r2/default/images/1786403998986-7b1e3ae9-e0f8-4f08-ab67-a4d3d6fd9760.gif"
        }
    ];


    /* =====================================================
       INTERNAL STATE
    ===================================================== */

    let isPlacing = false;
    let retryTimer = null;
    let retryCount = 0;
    let resizeTimer = null;
    let observerTimer = null;
    let lastMobileState = null;


    /* =====================================================
       HELPERS
    ===================================================== */

    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function elementMatchesOrContains(node, selector) {
        if (!node || node.nodeType !== 1) {
            return false;
        }

        if (node.matches && node.matches(selector)) {
            return true;
        }

        return !!(
            node.querySelector &&
            node.querySelector(selector)
        );
    }


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
               OUTER MENU BOX
            ========================================= */

            .${MENU_CLASS} {
                display: grid !important;
                grid-template-columns: repeat(5, minmax(0, 1fr)) !important;

                width: min(calc(100% - 12px), 940px) !important;

                margin: 8px auto !important;
                padding: 7px !important;
                gap: 6px !important;

                box-sizing: border-box !important;

                position: relative !important;
                z-index: 5 !important;

                border:
                    1px solid
                    rgba(255,255,255,.10) !important;

                border-radius: 13px !important;

                background:
                    rgba(12,7,20,.32) !important;

                box-shadow:
                    inset 0 1px 0 rgba(255,255,255,.04),
                    0 3px 12px rgba(0,0,0,.14) !important;
            }


            /* =========================================
               EACH MENU = CLEAR BOX / POSITION
            ========================================= */

            .${MENU_CLASS} .${BUTTON_CLASS} {
                display: flex !important;
                flex-direction: column !important;

                align-items: center !important;
                justify-content: center !important;

                min-width: 0 !important;
                min-height: 84px !important;

                padding: 7px 4px 6px !important;
                margin: 0 !important;

                box-sizing: border-box !important;

                border:
                    1px solid
                    rgba(255,255,255,.16) !important;

                border-radius: 10px !important;

                background:
                    linear-gradient(
                        180deg,
                        rgba(255,255,255,.075),
                        rgba(255,255,255,.025)
                    ) !important;

                box-shadow:
                    inset 0 1px 0 rgba(255,255,255,.06),
                    0 2px 7px rgba(0,0,0,.12) !important;

                text-decoration: none !important;
                cursor: pointer !important;

                overflow: hidden !important;

                -webkit-tap-highlight-color: transparent !important;

                user-select: none !important;
                -webkit-user-select: none !important;

                transition:
                    transform .12s ease,
                    border-color .12s ease,
                    background-color .12s ease !important;
            }


            /* =========================================
               IMAGE
            ========================================= */

            .${MENU_CLASS} .ceriabet-menu-icon {
                display: flex !important;

                align-items: center !important;
                justify-content: center !important;

                width: 60px !important;
                height: 60px !important;

                flex: 0 0 60px !important;
            }

            .${MENU_CLASS} .ceriabet-menu-icon img {
                display: block !important;

                width: 58px !important;
                height: 58px !important;

                max-width: 100% !important;

                object-fit: contain !important;

                border: 0 !important;

                pointer-events: none !important;
            }

            /* =========================================
               IMAGE ERROR
            ========================================= */

            .${MENU_CLASS}
            .${BUTTON_CLASS}.is-image-error
            .ceriabet-menu-icon {
                width: 42px !important;
                height: 42px !important;

                flex-basis: 42px !important;

                border-radius: 9px !important;

                background:
                    rgba(255,255,255,.06) !important;
            }

            .${MENU_CLASS}
            .${BUTTON_CLASS}.is-image-error
            .ceriabet-menu-icon::before {
                content: attr(data-fallback) !important;

                color: rgba(255,255,255,.82) !important;

                font:
                    800 11px/1
                    Arial,
                    Helvetica,
                    sans-serif !important;
            }

            .${MENU_CLASS}
            .${BUTTON_CLASS}.is-image-error
            img {
                display: none !important;
            }


            /* =========================================
               HOVER — LIGHT, NO HEAVY FILTER
            ========================================= */

            @media (hover: hover) {

                .${MENU_CLASS} .${BUTTON_CLASS}:hover {
                    transform: translateY(-1px) !important;

                    border-color:
                        rgba(255,255,255,.28) !important;

                    background:
                        linear-gradient(
                            180deg,
                            rgba(255,255,255,.105),
                            rgba(255,255,255,.038)
                        ) !important;
                }
            }


            /* =========================================
               CLICK
            ========================================= */

            .${MENU_CLASS} .${BUTTON_CLASS}:active {
                transform: scale(.975) !important;
            }


            /* =========================================
               MOBILE
            ========================================= */

            @media (max-width: 480px) {

                .${MENU_CLASS} {
                    width: calc(100% - 2px) !important;

                    margin: 6px 1px !important;

                    padding: 5px !important;
                    gap: 4px !important;

                    border-radius: 10px !important;
                }

                .${MENU_CLASS} .${BUTTON_CLASS} {
                    min-height: 72px !important;

                    padding:
                        5px 2px 4px !important;

                    border-radius: 8px !important;
                }

                .${MENU_CLASS} .ceriabet-menu-icon {
                    width: 48px !important;
                    height: 48px !important;

                    flex-basis: 48px !important;
                }

                .${MENU_CLASS} .ceriabet-menu-icon img {
                    width: 47px !important;
                    height: 47px !important;
                }
            }


            /* =========================================
               VERY SMALL MOBILE
            ========================================= */

            @media (max-width: 360px) {

                .${MENU_CLASS} {
                    padding: 4px !important;
                    gap: 3px !important;
                }

                .${MENU_CLASS} .${BUTTON_CLASS} {
                    min-height: 66px !important;
                }

                .${MENU_CLASS} .ceriabet-menu-icon {
                    width: 37px !important;
                    height: 37px !important;

                    flex-basis: 37px !important;
                }

                .${MENU_CLASS} .ceriabet-menu-icon img {
                    width: 36px !important;
                    height: 36px !important;
                }
            }


            /* =========================================
               REDUCED MOTION
            ========================================= */

            @media (prefers-reduced-motion: reduce) {

                .${MENU_CLASS} .${BUTTON_CLASS} {
                    transition: none !important;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /* =====================================================
       CREATE MENU
    ===================================================== */

    function createButtonBox() {

        let box =
            document.querySelector(
                "." + MENU_CLASS
            );

        if (box) {
            return box;
        }


        box =
            document.createElement("nav");

        box.className =
            MENU_CLASS;

        box.setAttribute(
            "aria-label",
            "Menu CERIABET"
        );


        const fragment =
            document.createDocumentFragment();


        MENU.forEach(function (item, index) {

            const link =
                document.createElement("a");

            link.className =
                BUTTON_CLASS;

            link.href =
                item.url;

            link.target =
                "_blank";

            link.rel =
                "noopener noreferrer";

            link.setAttribute(
                "aria-label",
                item.name
            );

            link.setAttribute(
                "title",
                item.name
            );

            link.setAttribute(
                "data-fallback",
                item.shortName.slice(0, 3)
            );


            const icon =
                document.createElement("span");

            icon.className =
                "ceriabet-menu-icon";


            const image =
                document.createElement("img");

            image.src =
                item.image;

            image.alt =
                item.name;

            image.draggable =
                false;

            /*
             * Lebih ringan daripada memaksa semua GIF eager.
             * Karena menu tetap dekat viewport, browser biasanya
             * akan memuatnya segera saat memang diperlukan.
             */
            image.loading =
                "lazy";

            image.decoding =
                "async";

            try {
                image.fetchPriority =
                    index === 0
                        ? "auto"
                        : "low";
            } catch (_) {}


            image.addEventListener(
                "error",
                function () {

                    link.classList.add(
                        "is-image-error"
                    );
                },
                {
                    once: true
                }
            );
icon.appendChild(image);

            link.appendChild(icon);

            fragment.appendChild(link);
        });


        box.appendChild(fragment);

        return box;
    }


    /* =====================================================
       CHECK POSITION
    ===================================================== */

    function isBoxInCorrectPosition(box) {

        if (!box || !box.isConnected) {
            return false;
        }


        if (isMobile()) {

            const jackpotSection =
                document.querySelector(
                    SELECTOR_MOBILE_TARGET
                );

            return !!(
                jackpotSection &&
                jackpotSection.parentNode &&
                box.parentNode ===
                    jackpotSection.parentNode &&
                box.nextElementSibling ===
                    jackpotSection
            );
        }


        const announcementOuter =
            document.querySelector(
                SELECTOR_ANNOUNCEMENT
            );

        const homeInner =
            document.querySelector(
                SELECTOR_HOME
            );


        if (
            !announcementOuter ||
            !homeInner
        ) {
            return false;
        }


        /*
         * Preferred desktop placement:
         * announcement -> menu -> home
         */
        if (
            announcementOuter.parentNode &&
            announcementOuter.parentNode ===
                homeInner.parentNode
        ) {

            return !!(
                box.parentNode ===
                    homeInner.parentNode &&
                box.nextElementSibling ===
                    homeInner
            );
        }


        /*
         * Fallback:
         * announcement -> menu
         */
        return !!(
            announcementOuter.parentNode &&
            box.parentNode ===
                announcementOuter.parentNode &&
            announcementOuter.nextElementSibling ===
                box
        );
    }


    /* =====================================================
       PLACE MENU
    ===================================================== */

    function placeButtonBox() {

        if (isPlacing) {
            return false;
        }

        isPlacing = true;

        try {

            const box =
                createButtonBox();


            /*
             * PENTING:
             * Kalau posisi sudah benar, jangan sentuh DOM lagi.
             * Ini mencegah loop MutationObserver.
             */
            if (
                isBoxInCorrectPosition(box)
            ) {

                return true;
            }


            if (isMobile()) {

                const jackpotSection =
                    document.querySelector(
                        SELECTOR_MOBILE_TARGET
                    );


                if (
                    !jackpotSection ||
                    !jackpotSection.parentNode
                ) {

                    return false;
                }


                jackpotSection
                    .parentNode
                    .insertBefore(
                        box,
                        jackpotSection
                    );


                return true;
            }


            const announcementOuter =
                document.querySelector(
                    SELECTOR_ANNOUNCEMENT
                );

            const homeInner =
                document.querySelector(
                    SELECTOR_HOME
                );


            if (
                !announcementOuter ||
                !homeInner
            ) {

                return false;
            }


            /*
             * Preferred desktop placement.
             */
            if (
                announcementOuter.parentNode &&
                announcementOuter.parentNode ===
                    homeInner.parentNode
            ) {

                homeInner
                    .parentNode
                    .insertBefore(
                        box,
                        homeInner
                    );


                return true;
            }


            /*
             * FALLBACK DESKTOP.
             *
             * FIX PENTING:
             * Hanya insert kalau belum benar.
             * Jangan insert ulang pada setiap mutation.
             */
            if (
                announcementOuter.parentNode &&
                announcementOuter.nextElementSibling !==
                    box
            ) {

                announcementOuter
                    .insertAdjacentElement(
                        "afterend",
                        box
                    );
            }


            return !!(
                announcementOuter.parentNode
            );

        } finally {

            isPlacing = false;
        }
    }


    /* =====================================================
       LIGHT RETRY
       HANYA SAAT TARGET BELUM ADA
    ===================================================== */

    function scheduleInitialRetry() {

        clearTimeout(retryTimer);


        function attempt() {

            const success =
                placeButtonBox();


            if (success) {

                retryCount = 0;

                return;
            }


            retryCount += 1;


            /*
             * Max 10 percobaan = sekitar 5 detik.
             * Bukan interval 30 detik.
             */
            if (retryCount >= 10) {

                retryCount = 0;

                return;
            }


            retryTimer =
                setTimeout(
                    attempt,
                    500
                );
        }


        attempt();
    }


    /* =====================================================
       SELECTIVE MUTATION OBSERVER
    ===================================================== */

    function mutationNeedsPlacement(mutations) {

        const box =
            document.querySelector(
                "." + MENU_CLASS
            );


        /*
         * Kalau menu hilang dari DOM,
         * buat kembali.
         */
        if (
            !box ||
            !box.isConnected
        ) {

            return true;
        }


        const watchedSelector =
            [
                SELECTOR_MOBILE_TARGET,
                SELECTOR_ANNOUNCEMENT,
                SELECTOR_HOME
            ].join(",");


        for (
            let i = 0;
            i < mutations.length;
            i += 1
        ) {

            const mutation =
                mutations[i];


            /*
             * Hanya peduli kalau target layout muncul,
             * pindah, atau hilang.
             */
            for (
                const node of
                mutation.addedNodes
            ) {

                if (
                    elementMatchesOrContains(
                        node,
                        watchedSelector
                    )
                ) {

                    return true;
                }
            }


            for (
                const node of
                mutation.removedNodes
            ) {

                if (
                    node === box ||
                    (
                        node.nodeType === 1 &&
                        node.contains &&
                        node.contains(box)
                    ) ||
                    elementMatchesOrContains(
                        node,
                        watchedSelector
                    )
                ) {

                    return true;
                }
            }
        }


        return false;
    }


    function setupObserver() {

        if (!document.body) {
            return;
        }


        const observer =
            new MutationObserver(
                function (mutations) {

                    if (
                        !mutationNeedsPlacement(
                            mutations
                        )
                    ) {

                        return;
                    }


                    clearTimeout(
                        observerTimer
                    );


                    /*
                     * Debounce agar banyak perubahan DOM
                     * hanya menghasilkan satu kali pengecekan.
                     */
                    observerTimer =
                        setTimeout(
                            function () {

                                placeButtonBox();

                            },
                            100
                        );
                }
            );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }


    /* =====================================================
       RESIZE
       HANYA RE-POSITION SAAT MENYEBRANG BREAKPOINT
    ===================================================== */

    function setupResize() {

        lastMobileState =
            isMobile();


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        function () {

                            const currentMobile =
                                isMobile();


                            /*
                             * CSS menangani ukuran otomatis.
                             * JS hanya bergerak kalau posisi
                             * desktop/mobile memang berubah.
                             */
                            if (
                                currentMobile !==
                                lastMobileState
                            ) {

                                lastMobileState =
                                    currentMobile;

                                placeButtonBox();
                            }

                        },
                        150
                    );
            },
            {
                passive: true
            }
        );
    }


    /* =====================================================
       INIT
    ===================================================== */

    function init() {

        injectStyle();

        scheduleInitialRetry();

        setupObserver();

        setupResize();
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
