(function () {
    "use strict";

    const BTN_ID = "partner-purple-btn";
    const STYLE_ID = "partner-gold-style";

    const LINK = "https://goviplink.live/p4st15u5k5es";

    const LOGO = "https://www.image2url.com/r2/default/images/1786404186521-397fbe5f-ad5f-4822-b81c-217fe1174d55.gif";

    const RIGHT = 15;
    const BOTTOM = 96;
    const SIZE = 50;

    function allowed() {
        const p = location.pathname
            .replace(/\/+$/, "")
            .toLowerCase();

        return p === "" || p === "/" || p.includes("home");
    }

    function injectStyle() {
        if (!allowed()) return;

        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");

        style.id = STYLE_ID;

        style.textContent = `
            #${BTN_ID} {
                position: fixed;
                right: ${RIGHT}px;
                bottom: ${BOTTOM}px;
                width: ${SIZE}px;
                height: ${SIZE}px;
                border-radius: 50%;
                overflow: visible;
                z-index: 999999;
                display: none;
            }

            #${BTN_ID} img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                border-radius: 50%;
            }

            #${BTN_ID}::after {
                content: "1";
                position: absolute;
                top: -4px;
                right: -4px;
                width: 14px;
                height: 14px;
                background: #ff0033;
                color: #fff;
                font-size: 9px;
                font-weight: 900;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                border: 2px solid #fff;
                box-shadow: 0 0 4px rgba(255, 0, 51, 0.7);
                z-index: 10;
            }

            @media (max-width: 768px) {
                #${BTN_ID} {
                    display: block;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function createButton() {
        if (!allowed()) return;

        if (document.getElementById(BTN_ID)) return;

        const hideUntil = localStorage.getItem("partnerBtnHideUntil");

        if (
            hideUntil &&
            Date.now() < parseInt(hideUntil, 10)
        ) {
            return;
        }

        const btn = document.createElement("a");

        btn.id = BTN_ID;
        btn.href = LINK;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";

        btn.innerHTML = `
            <img src="${LOGO}" alt="Partner">
        `;

        document.body.appendChild(btn);
    }

    function init() {
        injectStyle();
        createButton();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            init
        );
    } else {
        init();
    }
})();
