(function () {
    "use strict";

    const STYLE_ID = "promo-shine-sync-v3";
    const IMAGE_LAYER = "promo-image-shine-layer";
    const TAKE_BUTTON = "promo-take-button";
    const SYNC_CLASS = "promo-shine-running";

    const HOT_ICON =
        "https://dsuown9evwz4y.cloudfront.net/Images/icons/floating-icon/1.png?v=20250528";


    /* =========================================
       BERSIHKAN VERSI SEBELUMNYA
       ========================================= */

    document.getElementById(STYLE_ID)?.remove();

    document
        .querySelectorAll("." + IMAGE_LAYER)
        .forEach(el => el.remove());



    /* =========================================
       CSS
       ========================================= */

    const style = document.createElement("style");

    style.id = STYLE_ID;

    style.textContent = `

        .promotion-list .promotion-item {
            position: relative !important;
        }


        /* ==================================================
           TOMBOL AMBIL PROMO SAJA
           ================================================== */

        .${TAKE_BUTTON} {
            position: relative !important;
            overflow: visible !important;
            isolation: isolate;
        }


        /* KILAP BUTTON */

        .${TAKE_BUTTON}.${SYNC_CLASS}::before {
            content: "";

            position: absolute;
            inset: 0;

            border-radius: inherit;

            pointer-events: none;

            z-index: 2;

            overflow: hidden;

            clip-path:
                inset(0 round 999px);

            background:
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

            background-size:
                260% 100%;

            background-repeat:
                no-repeat;

            background-position:
                140% 0;

            /*
             * PERSIS SAMA:
             * 4.2 detik
             * ease-in-out
             * infinite
             */
            animation:
                promoButtonSyncShine
                4.2s
                ease-in-out
                infinite;
        }


        @keyframes promoButtonSyncShine {

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



        /* ==================================================
           HOT ICON
           HANYA AMBIL PROMO
           ================================================== */

        .${TAKE_BUTTON}::after {
            content: "";

            position: absolute;

            top: -16px;
            right: -14px;

            width: 28px;
            height: 28px;

            background:
                url("${HOT_ICON}")
                center / contain
                no-repeat;

            pointer-events: none;

            z-index: 30;

            transform-origin: center;

            animation:
                promoHotBlink
                1.6s
                ease-in-out
                infinite;
        }


        @keyframes promoHotBlink {

            0%,
            100% {
                opacity: 1;

                filter:
                    brightness(1);

                transform:
                    scale(1);
            }

            50% {
                opacity: .48;

                filter:
                    brightness(1.35);

                transform:
                    scale(.96);
            }
        }



        /* ==================================================
           LAYER KILAP GAMBAR
           ================================================== */

        .${IMAGE_LAYER} {
            position: absolute !important;

            overflow: hidden !important;

            pointer-events: none !important;

            z-index: 20 !important;

            margin: 0 !important;
            padding: 0 !important;

            box-sizing: border-box !important;

            transform: translateZ(0);

            isolation: isolate;
        }



        /* ==================================================
           CAHAYA GAMBAR
           ================================================== */

        .${IMAGE_LAYER}.${SYNC_CLASS}::before {
            content: "";

            position: absolute;

            top: -45%;

            left: -50%;

            width: 32%;

            height: 190%;

            pointer-events: none;

            background:
                linear-gradient(
                    90deg,

                    rgba(255,255,255,0) 0%,

                    rgba(255,255,255,.03) 15%,

                    rgba(255,255,255,.15) 30%,

                    rgba(255,255,255,.48) 43%,

                    rgba(255,248,220,.78) 50%,

                    rgba(255,255,255,.55) 56%,

                    rgba(255,255,255,.18) 70%,

                    rgba(255,255,255,0) 100%
                );

            box-shadow:
                0 0 20px rgba(255,255,255,.25),
                0 0 40px rgba(255,245,210,.18);

            filter:
                blur(1px);

            will-change:
                transform,
                opacity;

            /*
             * SAMA PERSIS DENGAN AMBIL PROMO
             */
            animation:
                promoImageSyncShine
                4.2s
                ease-in-out
                infinite;
        }



        /*
         * TIMING SAMA:
         *
         * 0%
         * 8%
         * 48%
         * 58%
         * 100%
         */

        @keyframes promoImageSyncShine {

            0% {
                transform:
                    skewX(-22deg)
                    translateX(-260%);

                opacity: 0;
            }

            8% {
                opacity: 1;
            }

            48% {
                opacity: 1;
            }

            58% {
                transform:
                    skewX(-22deg)
                    translateX(650%);

                opacity: 0;
            }

            100% {
                transform:
                    skewX(-22deg)
                    translateX(650%);

                opacity: 0;
            }
        }



        /* ==================================================
           MOBILE
           ================================================== */

        @media (max-width: 768px) {

            .${TAKE_BUTTON}::after {
                width: 26px;
                height: 26px;

                top: -14px;
                right: -11px;
            }

            .${IMAGE_LAYER}::before {
                width: 36%;
            }
        }

    `;

    document.head.appendChild(style);



    /* =========================================
       CARI TOMBOL AMBIL PROMO
       ========================================= */

    function findTakeButtons() {

        document
            .querySelectorAll(
                ".promotion-list .promotion-item a, " +
                ".promotion-list .promotion-item button"
            )
            .forEach(button => {

                const text =
                    button.textContent
                        .trim()
                        .replace(/\\s+/g, " ")
                        .toUpperCase();


                /*
                 * HANYA AMBIL PROMO
                 */

                if (
                    text.includes("AMBIL PROMO")
                ) {

                    button.classList.add(
                        TAKE_BUTTON
                    );

                } else {

                    /*
                     * DETAIL dan button lain
                     * dipastikan TIDAK punya kilap.
                     */

                    button.classList.remove(
                        TAKE_BUTTON,
                        SYNC_CLASS
                    );
                }

            });
    }



    /* =========================================
       CARI GAMBAR UTAMA
       ========================================= */

    function getMainImage(item) {

        /*
         * Prioritas pertama:
         * IMG langsung di dalam promotion-item.
         */

        const direct =
            Array.from(item.children)
                .find(el =>
                    el.tagName === "IMG"
                );

        if (direct) {
            return direct;
        }


        /*
         * Fallback:
         * cari image terbesar.
         */

        const images =
            Array.from(
                item.querySelectorAll("img")
            );


        if (!images.length) {
            return null;
        }


        let biggest =
            images[0];

        let biggestArea =
            0;


        images.forEach(img => {

            const w =
                img.offsetWidth ||
                img.naturalWidth ||
                0;

            const h =
                img.offsetHeight ||
                img.naturalHeight ||
                0;

            const area =
                w * h;


            if (area > biggestArea) {

                biggestArea =
                    area;

                biggest =
                    img;
            }

        });


        return biggest;
    }



    /* =========================================
       BUAT LAYER GAMBAR
       ========================================= */

    function createImageLayers() {

        document
            .querySelectorAll(
                ".promotion-list .promotion-item"
            )
            .forEach(item => {

                const img =
                    getMainImage(item);


                if (!img) return;


                let layer =
                    Array.from(item.children)
                        .find(el =>
                            el.classList?.contains(
                                IMAGE_LAYER
                            )
                        );


                if (!layer) {

                    layer =
                        document.createElement(
                            "span"
                        );

                    layer.className =
                        IMAGE_LAYER;

                    item.appendChild(
                        layer
                    );
                }


                /*
                 * Ikuti posisi gambar REAL.
                 */

                layer.style.left =
                    img.offsetLeft +
                    "px";

                layer.style.top =
                    img.offsetTop +
                    "px";

                layer.style.width =
                    img.offsetWidth +
                    "px";

                layer.style.height =
                    img.offsetHeight +
                    "px";


                /*
                 * Border radius gambar.
                 */

                const cs =
                    getComputedStyle(img);

                layer.style.borderRadius =
                    cs.borderRadius;

            });
    }



    /* =========================================
       SINKRONISASI ANIMASI
       ========================================= */

    let syncTimer = null;


    function synchronizeAnimations() {

        clearTimeout(
            syncTimer
        );


        syncTimer =
            setTimeout(() => {

                const elements =
                    document.querySelectorAll(
                        "." + TAKE_BUTTON +
                        ", ." + IMAGE_LAYER
                    );


                /*
                 * MATIKAN SEMUA DULU
                 */

                elements.forEach(el => {

                    el.classList.remove(
                        SYNC_CLASS
                    );

                });


                /*
                 * Paksa browser render ulang.
                 */

                void document.body.offsetWidth;


                /*
                 * HIDUPKAN SEMUA
                 * DALAM FRAME YANG SAMA.
                 *
                 * Jadi gambar + AMBIL PROMO
                 * mulai kilap bersamaan.
                 */

                requestAnimationFrame(() => {

                    elements.forEach(el => {

                        el.classList.add(
                            SYNC_CLASS
                        );

                    });

                });


            }, 30);
    }



    /* =========================================
       UPDATE SEMUA
       ========================================= */

    function updateEverything(
        restartAnimation = false
    ) {

        findTakeButtons();

        createImageLayers();


        if (restartAnimation) {

            synchronizeAnimations();

        }

    }



    /* =========================================
       LOAD GAMBAR
       ========================================= */

    function bindImageLoad() {

        document
            .querySelectorAll(
                ".promotion-list img"
            )
            .forEach(img => {

                if (
                    img.dataset
                        .shineLoadBound
                ) {
                    return;
                }


                img.dataset
                    .shineLoadBound =
                    "1";


                img.addEventListener(
                    "load",
                    () => {

                        createImageLayers();

                        synchronizeAnimations();

                    }
                );

            });

    }



    /* =========================================
       RESIZE
       ========================================= */

    window.addEventListener(
        "resize",
        () => {

            createImageLayers();

        }
    );



    /* =========================================
       WEBSITE DINAMIS
       ========================================= */

    let mutationTimer = null;


    const observer =
        new MutationObserver(() => {

            clearTimeout(
                mutationTimer
            );


            mutationTimer =
                setTimeout(() => {

                    bindImageLoad();

                    updateEverything(
                        true
                    );

                }, 80);

        });


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );



    /* =========================================
       START
       ========================================= */

    bindImageLoad();

    updateEverything(
        true
    );


    window.addEventListener(
        "load",
        () => {

            bindImageLoad();

            updateEverything(
                true
            );

        }
    );

})();
