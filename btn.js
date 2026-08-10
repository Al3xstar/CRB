(function () {
    "use strict";

    const MOBILE_BREAKPOINT = 480;

    const css = document.createElement("style");

    css.textContent = `
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

        .btn-atas a {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 0;
            text-decoration: none;
        }

        .btn-atas a img {
            display: block;
            width: 60px;
            max-width: 100%;
            height: 60px;
            object-fit: contain;
            border: 0;
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

            .btn-atas a img {
                width: 52px;
                height: 52px;
            }
        }
    `;

    document.head.appendChild(css);

    function createButtonBox() {
        let box = document.querySelector(".btn-atas");

        if (box) {
            return box;
        }

        box = document.createElement("div");
        box.className = "btn-atas";

        box.innerHTML = `

            <!-- TOMBOL 1 - CERIABET -->
            <a
                href="https://ceriavpn.online/crb3"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://www.image2url.com/r2/default/images/1786403885683-20b27b7e-bd99-4060-941e-71e094bcfa97.gif"
                    alt="CERIABET"
                >
            </a>


            <!-- TOMBOL 2 - TELEGRAM -->
            <a
                href="https://ceriavpn.online/telegramchat"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://www.image2url.com/r2/default/images/1786403921709-643c8e72-5a6f-4e49-b414-d329a6afd95d.gif"
                    alt="Telegram"
                >
            </a>


            <!-- TOMBOL 3 - RTP CERIABET -->
            <a
                href="https://ceriavpn.online/rtp-gacor-ceriabet"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://www.image2url.com/r2/default/images/1786403949222-c3bbc8b1-f7a8-4569-b705-708ad7b9df83.gif"
                    alt="RTP CERIABET"
                >
            </a>


            <!-- TOMBOL 4 - PREDIKSI BOLA -->
            <a
                href="https://ceriavpn.online/prediksi-bola"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://www.image2url.com/r2/default/images/1786403974097-a95a661e-949e-4c59-963c-5a7679dfd306.gif"
                    alt="Prediksi Bola"
                >
            </a>


            <!-- TOMBOL 5 - POLICE CRB -->
            <a
                href="https://ceriavpn.online/policecrb"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://www.image2url.com/r2/default/images/1786403998986-7b1e3ae9-e0f8-4f08-ab67-a4d3d6fd9760.gif"
                    alt="Police CRB"
                >
            </a>

        `;

        return box;
    }


    function placeButtonBox() {
        const box = createButtonBox();

        const isMobile =
            window.innerWidth <= MOBILE_BREAKPOINT;


        // ========================================
        // MOBILE
        // ========================================

        if (isMobile) {

            // Tombol berada tepat di atas
            // jackpot-play-section

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

                jackpotSection.parentNode.insertBefore(
                    box,
                    jackpotSection
                );
            }

            return true;
        }


        // ========================================
        // DESKTOP
        // ========================================

        // Posisi:
        //
        // announcement-outer-container
        // ↓
        // BUTTON
        // ↓
        // home-inner-container


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


        // Jika parent sama
        if (
            announcementOuter.parentNode &&
            announcementOuter.parentNode ===
            homeInner.parentNode
        ) {

            if (
                box.nextElementSibling !==
                homeInner
            ) {

                homeInner.parentNode.insertBefore(
                    box,
                    homeInner
                );
            }

            return true;
        }


        // Fallback jika struktur parent berbeda
        if (announcementOuter.parentNode) {

            announcementOuter.insertAdjacentElement(
                "afterend",
                box
            );

            return true;
        }


        return false;
    }


    // ========================================
    // CEK SAMPAI ELEMENT WEBSITE MUNCUL
    // ========================================

    let checker = setInterval(function () {

        const success =
            placeButtonBox();

        if (success) {
            clearInterval(checker);
        }

    }, 500);


    // ========================================
    // RESPONSIVE
    // ========================================

    let resizeTimer;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                function () {
                    placeButtonBox();
                },
                150
            );
        }
    );


    // ========================================
    // WEBSITE DYNAMIC / SPA
    // ========================================

    const observer =
        new MutationObserver(function () {

            const box =
                document.querySelector(
                    ".btn-atas"
                );

            if (!box) {
                placeButtonBox();
            }

        });


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );


    // ========================================
    // STOP INTERVAL SETELAH 30 DETIK
    // ========================================

    setTimeout(function () {
        clearInterval(checker);
    }, 30000);

})();
