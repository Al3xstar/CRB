(function () {
    "use strict";

    const STYLE_ID = "ceriabet-promo-hot-shine-style";

    if (document.getElementById(STYLE_ID)) return;

    const HOT_ICON =
        "https://dsuown9evwz4y.cloudfront.net/Images/icons/floating-icon/1.png?v=20250528";

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

    const style = document.createElement("style");

    style.id = STYLE_ID;
    style.setAttribute("data-promo-hot", "1");

    style.textContent = `
        ${TARGETS} {
            position: relative !important;
            overflow: visible !important;
            isolation: isolate;
        }

        /*
         * KILAP:
         * Box ::before ukurannya SAMA PERSIS dengan button.
         * Yang bergerak hanya background-position,
         * bukan box-nya. Jadi tidak akan bocor keluar.
         */
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
                3.2s
                ease-in-out
                infinite;

            /*
             * Ini memastikan visual kilap sendiri
             * tetap terpotong sesuai bentuk button.
             */
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

        /*
         * ICON HOT:
         * Tetap sengaja keluar dari pojok kanan atas.
         */
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
        }

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

        @media (max-width: 768px) {
            ${TARGETS_AFTER} {
                width: 26px;
                height: 26px;

                top: -14px;
                right: -11px;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            ${TARGETS_BEFORE} {
                animation: none;
                background-image: none;
            }
        }
    `;

    document.head.appendChild(style);
})();
