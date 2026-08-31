(function () {
    "use strict";

    /* =====================================================
       CONFIG
    ===================================================== */

    const MOBILE_BREAKPOINT = 480;

    const STYLE_ID = "ceriabet-menu-style-v2";
    const MENU_CLASS = "btn-atas";
    const BUTTON_CLASS = "ceriabet-menu-btn";
    const ORBIT_DOT_CLASS = "ceriabet-orbit-dot";
    const ORBIT_SPEED = 185; // px/detik, sedikit lebih cepat & tetap konstan

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
    let orbitFrame = 0;
    let orbitPath = null;
    let orbitStartedAt = 0;
    let orbitResizeTimer = null;


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
               CONTINUOUS ORBIT DOT
               1 bulatan saja = ringan
            ========================================= */

            .${MENU_CLASS} .${ORBIT_DOT_CLASS} {
                position: absolute !important;

                left: 0 !important;
                top: 0 !important;

                width: 9px !important;
                height: 9px !important;

                margin: 0 !important;
                padding: 0 !important;

                border-radius: 999px !important;

                pointer-events: none !important;

                z-index: 30 !important;

                opacity: 1;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,255,255,1) 0%,
                        rgba(255,248,205,.98) 34%,
                        rgba(255,210,78,.98) 66%,
                        rgba(255,153,0,.96) 100%
                    ) !important;

                box-shadow:
                    0 0 4px rgba(255,255,255,.92),
                    0 0 9px rgba(255,222,108,.78),
                    0 0 14px rgba(255,160,0,.38) !important;

                transform:
                    translate3d(-100px,-100px,0);

                will-change:
                    transform;
            }


            @media (max-width: 480px) {

                .${MENU_CLASS} .${ORBIT_DOT_CLASS} {
                    width: 8px !important;
                    height: 8px !important;
                }
            }


            /* =========================================
               REDUCED MOTION
            ========================================= */

            @media (prefers-reduced-motion: reduce) {

                .${MENU_CLASS} .${BUTTON_CLASS} {
                    transition: none !important;
                }

                .${MENU_CLASS} .${ORBIT_DOT_CLASS} {
                    display: none !important;
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

                                rebuildOrbitAnimation();

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


                            /*
                             * Ukuran kotak bisa berubah walau
                             * tidak pindah breakpoint.
                             * Rebuild path hanya setelah resize selesai.
                             */
                            rebuildOrbitAnimation();

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
       LIGHT ORBIT ENGINE
       Jalur:
       atas-kiri kotak 1
       -> setengah putaran
       -> lanjut ke kanan dengan speed sama
       -> setengah putaran kotak berikutnya
       -> setelah kotak terakhir balik lewat sisi yang tersisa
       -> loop tanpa teleport
    ===================================================== */

    function ensureOrbitDot(box) {

        let dot =
            box.querySelector(
                "." + ORBIT_DOT_CLASS
            );


        if (dot) {
            return dot;
        }


        dot =
            document.createElement("span");

        dot.className =
            ORBIT_DOT_CLASS;

        dot.setAttribute(
            "aria-hidden",
            "true"
        );


        box.appendChild(
            dot
        );


        return dot;
    }


    function getButtonGeometry(
        box,
        button
    ) {

        const boxRect =
            box.getBoundingClientRect();

        const rect =
            button.getBoundingClientRect();

        const radius =
            parseFloat(
                getComputedStyle(button)
                    .borderTopLeftRadius
            ) || 0;


        return {
            x:
                rect.left -
                boxRect.left,

            y:
                rect.top -
                boxRect.top,

            w:
                rect.width,

            h:
                rect.height,

            r:
                Math.max(
                    0,
                    Math.min(
                        radius,
                        rect.width / 2,
                        rect.height / 2
                    )
                )
        };
    }


    function createOrbitBuilder() {

        const segments = [];

        let totalLength = 0;


        function addLine(
            x1,
            y1,
            x2,
            y2
        ) {

            const length =
                Math.hypot(
                    x2 - x1,
                    y2 - y1
                );


            if (length < .01) {
                return;
            }


            segments.push({
                type: 0,

                x1,
                y1,
                x2,
                y2,

                start:
                    totalLength,

                length
            });


            totalLength +=
                length;
        }


        function addArc(
            cx,
            cy,
            r,
            a1,
            a2
        ) {

            const length =
                Math.abs(
                    a2 - a1
                ) * r;


            if (
                r < .01 ||
                length < .01
            ) {

                return;
            }


            segments.push({
                type: 1,

                cx,
                cy,
                r,
                a1,
                a2,

                start:
                    totalLength,

                length
            });


            totalLength +=
                length;
        }


        function pointAt(distance) {

            if (
                !segments.length ||
                totalLength <= 0
            ) {

                return {
                    x: 0,
                    y: 0
                };
            }


            let d =
                distance %
                totalLength;


            if (d < 0) {

                d +=
                    totalLength;
            }


            let segment =
                segments[0];


            /*
             * Segmen cuma sedikit.
             * Linear loop lebih ringan/sederhana
             * daripada bikin struktur tambahan.
             */
            for (
                let i = 0;
                i < segments.length;
                i += 1
            ) {

                const candidate =
                    segments[i];


                if (
                    d <=
                    candidate.start +
                    candidate.length
                ) {

                    segment =
                        candidate;

                    break;
                }
            }


            const t =
                Math.max(
                    0,
                    Math.min(
                        1,
                        (
                            d -
                            segment.start
                        ) /
                        segment.length
                    )
                );


            if (
                segment.type === 0
            ) {

                return {
                    x:
                        segment.x1 +
                        (
                            (
                                segment.x2 -
                                segment.x1
                            ) *
                            t
                        ),

                    y:
                        segment.y1 +
                        (
                            (
                                segment.y2 -
                                segment.y1
                            ) *
                            t
                        )
                };
            }


            const angle =
                segment.a1 +
                (
                    (
                        segment.a2 -
                        segment.a1
                    ) *
                    t
                );


            return {
                x:
                    segment.cx +
                    (
                        Math.cos(angle) *
                        segment.r
                    ),

                y:
                    segment.cy +
                    (
                        Math.sin(angle) *
                        segment.r
                    )
            };
        }


        return {
            addLine,
            addArc,

            finish:
                function () {

                    return {
                        totalLength,
                        pointAt
                    };
                }
        };
    }


    /*
     * MAJU A:
     * atas-kiri -> atas -> kanan -> bawah-kanan
     */
    function addForwardA(
        builder,
        g
    ) {

        builder.addLine(
            g.x + g.r,
            g.y,

            g.x + g.w - g.r,
            g.y
        );


        builder.addArc(
            g.x + g.w - g.r,
            g.y + g.r,
            g.r,

            -Math.PI / 2,
            0
        );


        builder.addLine(
            g.x + g.w,
            g.y + g.r,

            g.x + g.w,
            g.y + g.h - g.r
        );


        builder.addArc(
            g.x + g.w - g.r,
            g.y + g.h - g.r,
            g.r,

            0,
            Math.PI / 2
        );
    }


    /*
     * MAJU B:
     * bawah-kiri -> bawah -> kanan -> atas-kanan
     */
    function addForwardB(
        builder,
        g
    ) {

        builder.addLine(
            g.x + g.r,
            g.y + g.h,

            g.x + g.w - g.r,
            g.y + g.h
        );


        builder.addArc(
            g.x + g.w - g.r,
            g.y + g.h - g.r,
            g.r,

            Math.PI / 2,
            0
        );


        builder.addLine(
            g.x + g.w,
            g.y + g.h - g.r,

            g.x + g.w,
            g.y + g.r
        );


        builder.addArc(
            g.x + g.w - g.r,
            g.y + g.r,
            g.r,

            0,
            -Math.PI / 2
        );
    }


    /*
     * BALIK A:
     * bawah-kanan -> bawah -> kiri -> atas-kiri
     */
    function addReturnA(
        builder,
        g
    ) {

        builder.addLine(
            g.x + g.w - g.r,
            g.y + g.h,

            g.x + g.r,
            g.y + g.h
        );


        builder.addArc(
            g.x + g.r,
            g.y + g.h - g.r,
            g.r,

            Math.PI / 2,
            Math.PI
        );


        builder.addLine(
            g.x,
            g.y + g.h - g.r,

            g.x,
            g.y + g.r
        );


        builder.addArc(
            g.x + g.r,
            g.y + g.r,
            g.r,

            Math.PI,
            Math.PI * 1.5
        );
    }


    /*
     * BALIK B:
     * atas-kanan -> atas -> kiri -> bawah-kiri
     */
    function addReturnB(
        builder,
        g
    ) {

        builder.addLine(
            g.x + g.w - g.r,
            g.y,

            g.x + g.r,
            g.y
        );


        builder.addArc(
            g.x + g.r,
            g.y + g.r,
            g.r,

            Math.PI * 1.5,
            Math.PI
        );


        builder.addLine(
            g.x,
            g.y + g.r,

            g.x,
            g.y + g.h - g.r
        );


        builder.addArc(
            g.x + g.r,
            g.y + g.h - g.r,
            g.r,

            Math.PI,
            Math.PI / 2
        );
    }


    function buildOrbitPath() {

        const box =
            document.querySelector(
                "." + MENU_CLASS
            );


        if (
            !box ||
            !box.isConnected
        ) {

            orbitPath =
                null;

            return false;
        }


        const buttons =
            Array.from(
                box.querySelectorAll(
                    "." + BUTTON_CLASS
                )
            );


        if (!buttons.length) {

            orbitPath =
                null;

            return false;
        }


        const geometry =
            buttons.map(
                function (button) {

                    return getButtonGeometry(
                        box,
                        button
                    );
                }
            );


        const builder =
            createOrbitBuilder();


        /*
         * MAJU KE KANAN.
         * Speed connector sama karena semua
         * dihitung sebagai panjang path.
         */
        for (
            let i = 0;
            i < geometry.length;
            i += 1
        ) {

            const g =
                geometry[i];


            if (
                i % 2 === 0
            ) {

                addForwardA(
                    builder,
                    g
                );

            } else {

                addForwardB(
                    builder,
                    g
                );
            }


            if (
                i <
                geometry.length - 1
            ) {

                const next =
                    geometry[
                        i + 1
                    ];


                if (
                    i % 2 === 0
                ) {

                    builder.addLine(
                        g.x +
                        g.w -
                        g.r,

                        g.y +
                        g.h,

                        next.x +
                        next.r,

                        next.y +
                        next.h
                    );

                } else {

                    builder.addLine(
                        g.x +
                        g.w -
                        g.r,

                        g.y,

                        next.x +
                        next.r,

                        next.y
                    );
                }
            }
        }


        /*
         * BALIK KE KIRI.
         * Menggunakan sisi yang belum dilewati,
         * jadi loop nyambung tanpa teleport.
         */
        for (
            let i =
                geometry.length - 1;
            i >= 0;
            i -= 1
        ) {

            const g =
                geometry[i];


            if (
                i % 2 === 0
            ) {

                addReturnA(
                    builder,
                    g
                );

            } else {

                addReturnB(
                    builder,
                    g
                );
            }


            if (i > 0) {

                const previous =
                    geometry[
                        i - 1
                    ];


                if (
                    i % 2 === 0
                ) {

                    builder.addLine(
                        g.x +
                        g.r,

                        g.y,

                        previous.x +
                        previous.w -
                        previous.r,

                        previous.y
                    );

                } else {

                    builder.addLine(
                        g.x +
                        g.r,

                        g.y +
                        g.h,

                        previous.x +
                        previous.w -
                        previous.r,

                        previous.y +
                        previous.h
                    );
                }
            }
        }


        orbitPath =
            builder.finish();


        ensureOrbitDot(
            box
        );


        return true;
    }


    function startOrbitAnimation() {

        cancelAnimationFrame(
            orbitFrame
        );


        if (
            !buildOrbitPath()
        ) {

            return;
        }


        const box =
            document.querySelector(
                "." + MENU_CLASS
            );

        const dot =
            ensureOrbitDot(
                box
            );


        orbitStartedAt =
            performance.now();


        function frame(now) {

            if (
                !box.isConnected ||
                !orbitPath
            ) {

                return;
            }


            /*
             * Satu-satunya kerja tiap frame:
             * hitung jarak -> transform dot.
             * Tidak ada query DOM / layout read tiap frame.
             */
            const distance =
                (
                    (
                        now -
                        orbitStartedAt
                    ) /
                    1000
                ) *
                ORBIT_SPEED;


            const point =
                orbitPath.pointAt(
                    distance
                );


            const dotSize =
                dot.offsetWidth ||
                9;


            dot.style.transform =
                "translate3d(" +
                (
                    point.x -
                    (dotSize / 2)
                ) +
                "px," +
                (
                    point.y -
                    (dotSize / 2)
                ) +
                "px,0)";


            orbitFrame =
                requestAnimationFrame(
                    frame
                );
        }


        orbitFrame =
            requestAnimationFrame(
                frame
            );
    }


    function rebuildOrbitAnimation() {

        clearTimeout(
            orbitResizeTimer
        );


        orbitResizeTimer =
            setTimeout(
                function () {

                    startOrbitAnimation();

                },
                120
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


        /*
         * Tunggu sedikit supaya layout final sudah stabil.
         */
        setTimeout(
            startOrbitAnimation,
            180
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
