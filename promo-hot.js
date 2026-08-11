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
         * KILAP HALUS DI DALAM BUTTON
         * Dibuat tetap berada di area button dengan mask inset.
         */
        ${TARGETS_BEFORE} {
            content: "";
            position: absolute;

            top: 0;
            left: -38%;

            width: 34%;
            height: 100%;

            border-radius: inherit;

            background: linear-gradient(
                100deg,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,.03) 24%,
                rgba(255,255,255,.14) 43%,
                rgba(255,255,255,.30) 50%,
                rgba(255,240,200,.22) 56%,
                rgba(255,255,255,.07) 68%,
                rgba(255,255,255,0) 100%
            );

            transform:
                translateX(0)
                skewX(-16deg);

            pointer-events: none;
            z-index: 2;

            clip-path: inset(0 round 12px);

            animation:
                ceriabetPromoSoftShineLTR
                3.2s
                ease-in-out
                infinite;

            will-change:
                transform,
                opacity;
        }

        @keyframes ceriabetPromoSoftShineLTR {
            0% {
                transform:
                    translateX(0)
                    skewX(-16deg);
                opacity: 0;
            }

            8% {
                opacity: 1;
            }

            42% {
                opacity: 1;
            }

            55% {
                transform:
                    translateX(410%)
                    skewX(-16deg);
                opacity: 0;
            }

            100% {
                transform:
                    translateX(410%)
                    skewX(-16deg);
                opacity: 0;
            }
        }

        /*
         * ICON HOT DI LUAR POJOK KANAN ATAS
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

            ${TARGETS_BEFORE} {
                width: 38%;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            ${TARGETS_BEFORE} {
                animation: none;
                display: none;
            }
        }
    `;

    document.head.appendChild(style);
})();
