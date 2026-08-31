(function () {
    "use strict";

    const STYLE_ID = "ceriabet-promo-hot-shine-style";

    if (document.getElementById(STYLE_ID)) return;

    const HOT_ICON =
        "https://dsuown9evwz4y.cloudfront.net/Images/icons/floating-icon/1.png?v=20250528";

    /* =========================================
       BUTTON YANG DIBERI EFEK HOT + KILAP
       ========================================= */
    const selectors = [
        'a[href^="/desktop/bonus#"]',
        'a[href^="/mobile/bonus#"]',

        'a[href^="/desktop/cashback#"]',
        'a[href^="/mobile/cashback#"]',

        'a[href^="/desktop/commission#"]',
        'a[href^="/mobile/commission#"]'
    ];

    const TARGETS = selectors.join(",");

    const TARGETS_BEFORE = selectors
        .map(selector => selector + "::before")
        .join(",");

    const TARGETS_AFTER = selectors
        .map(selector => selector + "::after")
        .join(",");


    /* =========================================
       BUAT WRAPPER OTOMATIS UNTUK GAMBAR PROMO
       ========================================= */

    function wrapPromoImages() {
        const images = document.querySelectorAll(
            ".promotion-list .promotion-item > img:not([data-shine-ready])"
        );

        images.forEach(img => {
            img.setAttribute("data-shine-ready", "1");

            const wrapper = document.createElement("div");

            wrapper.className = "promotion-image-shine";

            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
        });
    }


    /* =========================================
       CSS
       ========================================= */

    const style = document.createElement("style");

    style.id = STYLE_ID;
    style.setAttribute("data-promo-hot", "1");

    style.textContent = `

        /* =====================================
           BUTTON
           ===================================== */

        ${TARGETS} {
            position: relative !important;
            overflow: visible !important;
            isolation: isolate;
        }


        /* =====================================
           KILAP BUTTON
           ===================================== */

        ${TARGETS_BEFORE} {
            content: "";
            position: absolute;

            inset: 0;

            border-radius: inherit;

            background-image:
                linear-gradient(
                    105deg,
                    transparent 0%,
                    transparent 39%,
                    rgba(255,255,255,.05) 44%,
                    rgba(255,255,255,.22) 49%,
                    rgba(255,248,220,.38) 51%,
                    rgba(255,255,255,.16) 54%,
                    transparent 61%,
                    transparent 100%
                );

            background-size: 260% 100%;
            background-repeat: no-repeat;

            background-position: 140% 0;

            pointer-events: none;

            z-index: 2;

            animation:
                ceriabetPromoShineInside
                4.2s
                ease-in-out
                infinite;

            overflow: hidden;

            clip-path: inset(0 round 999px);
        }


        @keyframes ceriabetPromoShineInside {

            0% {
                background-position: 140% 0;
                opacity: 0;
            }

            8% {
                opacity: 1;
            }

            48% {
                opacity: 1;
            }

            58% {
                background-position: -140% 0;
                opacity: 0;
            }

            100% {
                background-position: -140% 0;
                opacity: 0;
            }
        }



        /* =====================================
           ICON HOT BUTTON
           ===================================== */

        ${TARGETS_AFTER} {
            content: "";

            position: absolute;

            top: -16px;
            right: -14px;

            width: 28px;
            height: 28px;

            background:
                url("${HOT_ICON}")
                no-repeat
                center / contain;

            pointer-events: none;

            z-index: 10;

            animation:
                ceriabetHotBlink
                1.6s
                ease-in-out
                infinite;

            transform-origin: center;

            will-change:
                opacity,
                filter,
                transform;
        }


        @keyframes ceriabetHotBlink {

            0%,
            100% {
                opacity: 1;
                filter: brightness(1);
                transform: scale(1);
            }

            50% {
                opacity: .48;
                filter: brightness(1.35);
                transform: scale(.96);
            }
        }



        /* =====================================
           GAMBAR PROMO
           ===================================== */

        .promotion-image-shine {
            position: relative;

            display: block;

            width: 100%;

            overflow: hidden;

            /*
             * Mengikuti bentuk sudut gambar promo.
             * Kalau gambar kamu kotak, bisa ubah ke 0.
             */
            border-radius: 8px;

            isolation: isolate;
        }


        .promotion-image-shine > img {
            display: block;

            width: 100%;
            height: auto;

            position: relative;

            z-index: 1;
        }



        /* =====================================
           KILAP DI ATAS GAMBAR
           ===================================== */

        .promotion-image-shine::after {
            content: "";

            position: absolute;

            inset: 0;

            z-index: 5;

            pointer-events: none;

            /*
             * Kilap dibuat lebih lebar dan terang
             * supaya terlihat pada banner.
             */
            background:
                linear-gradient(
                    110deg,

                    transparent 0%,
                    transparent 32%,

                    rgba(255,255,255,0.00) 38%,

                    rgba(255,255,255,0.10) 42%,
                    rgba(255,255,255,0.28) 46%,
                    rgba(255,255,255,0.65) 49%,

                    rgba(255,248,215,0.85) 50%,

                    rgba(255,255,255,0.65) 51%,
                    rgba(255,255,255,0.28) 54%,
                    rgba(255,255,255,0.10) 58%,

                    transparent 64%,
                    transparent 100%
                );

            background-size: 300% 100%;

            background-position: 150% 0;

            background-repeat: no-repeat;

            mix-blend-mode: screen;

            animation:
                ceriabetImageShine
                4.8s
                ease-in-out
                infinite;

            will-change:
                background-position,
                opacity;
        }


        @keyframes ceriabetImageShine {

            0% {
                background-position: 150% 0;
                opacity: 0;
            }

            7% {
                opacity: 1;
            }

            45% {
                opacity: 1;
            }

            57% {
                background-position: -150% 0;
                opacity: 0;
            }

            100% {
                background-position: -150% 0;
                opacity: 0;
            }
        }



        /* =====================================
           OVERFLOW MENU
           ===================================== */

        .promotion-sidebar,
        .promotion-filter,
        .promotion-menu {
            overflow: visible !important;
        }


        .promotion-sidebar a,
        .promotion-filter a,
        .promotion-menu a {
            position: relative;
            z-index: 3;
        }



        /* =====================================
           MOBILE
           ===================================== */

        @media (max-width: 768px) {

            ${TARGETS_AFTER} {
                width: 26px;
                height: 26px;

                top: -14px;
                right: -11px;
            }


            .promotion-image-shine::after {
                background-size: 340% 100%;

                animation-duration: 5.2s;
            }
        }



        /* =====================================
           REDUCE MOTION
           ===================================== */

        @media (prefers-reduced-motion: reduce) {

            ${TARGETS_BEFORE} {
                animation: none;
                background-image: none;
            }

            ${TARGETS_AFTER} {
                animation: none;
            }

            .promotion-image-shine::after {
                animation: none;
                display: none;
            }
        }

    `;

    document.head.appendChild(style);


    /* =========================================
       JALANKAN PERTAMA KALI
       ========================================= */

    wrapPromoImages();


    /* =========================================
       DETEKSI PROMO YANG LOAD BELAKANGAN
       =========================================
       Penting kalau website menggunakan React/Vue,
       AJAX, atau promo muncul setelah halaman load.
       ========================================= */

    const observer = new MutationObserver(() => {
        wrapPromoImages();
    });


    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
