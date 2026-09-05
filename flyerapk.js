(function () {
    "use strict";

    const BTN_ID = "ceria-app-left-btn";
    const STYLE_ID = "ceria-app-left-style";
    const LINK = "https://aplikasi.ceriabetsbo.com/";
    const LOGO = "https://www.image2url.com/r2/default/images/1788580222747-747ab6f5-1358-43e1-ab71-ded71f1aa668.gif";

    const LEFT = 15;
    const BOTTOM = 156;
    const SIZE = 50;

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;

        style.textContent = `
            #${BTN_ID} {
                position: fixed;
                left: ${LEFT}px;
                bottom: ${BOTTOM}px;
                width: ${SIZE}px;
                height: ${SIZE}px;
                border-radius: 50%;
                overflow: hidden;
                z-index: 999999;
                display: block;
                text-decoration: none;
                background: transparent;
                border: none;
                box-shadow: none;
                padding: 0;
                margin: 0;
                -webkit-tap-highlight-color: transparent;
            }

            #${BTN_ID} img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                border-radius: 50%;
                border: none;
                box-shadow: none;
                filter: none;
            }

            #${BTN_ID}:hover,
            #${BTN_ID}:focus,
            #${BTN_ID}:active {
                box-shadow: none;
                outline: none;
                filter: none;
            }
        `;

        document.head.appendChild(style);
    }

    function createButton() {
        if (document.getElementById(BTN_ID)) return;

        const btn = document.createElement("a");
        btn.id = BTN_ID;
        btn.href = LINK;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
        btn.setAttribute("aria-label", "Download Aplikasi");

        btn.innerHTML = `
            <img src="${LOGO}" alt="Download Aplikasi">
        `;

        document.body.appendChild(btn);
    }

    function init() {

        injectStyle();
        createButton();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
