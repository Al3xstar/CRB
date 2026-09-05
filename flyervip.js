(function () {
    "use strict";

    const BTN_ID = "partner-neon-double-orbit-btn";
    const STYLE_ID = "partner-neon-double-orbit-style"; 
    const LINK = "https://ceriavpn.online/vipcrb";
    const LOGO = "https://www.image2url.com/r2/default/images/1788582431392-260ce071-dbae-4a87-bc3f-ed94bb08493c.gif";

    const RIGHT = 15;
    const BOTTOM = 156;
    const SIZE = 50;

    function allowed() {
        const p = location.pathname
            .replace(/\/+$/, "")
            .toLowerCase();

        return p.includes("loggedin");
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
                text-decoration: none;
            }

            #${BTN_ID} img {
                position: relative;
                z-index: 1;
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                border-radius: 50%;
            }

            #${BTN_ID} .partner-badge {
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
                box-shadow: 0 0 4px rgba(255,0,51,.7);
                z-index: 5;
                pointer-events: none;
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

        const btn = document.createElement("a");
        btn.id = BTN_ID;
        btn.href = LINK;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
        btn.setAttribute("aria-label", "Partner VIP");

        btn.innerHTML = `
            <img src="${LOGO}" alt="Partner VIP">
            <span class="partner-badge">1</span>
        `;

        document.body.appendChild(btn);
    }

    function init() {
        if (!allowed()) return;
        injectStyle();
        createButton();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
