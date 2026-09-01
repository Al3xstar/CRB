(function () {
    "use strict";

    const BTN_ID = "partner-neon-double-orbit-btn";
    const STYLE_ID = "partner-neon-double-orbit-style";
    const LINK = "https://ceriavpn.online/vipcrb";
    const LOGO = "https://www.image2url.com/r2/default/gifs/1788240147275-3cd880c6-2c6d-4d20-93dc-e1da731d0395.gif";

    const RIGHT = 15;
    const BOTTOM = 156;
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
                text-decoration: none;
                isolation: isolate;
            }

            #${BTN_ID} .neon-orbit {
                position: absolute;
                inset: -6px;
                border-radius: 50%;
                z-index: 0;
                pointer-events: none;
                animation: partnerNeonDoubleOrbit 1.8s linear infinite;
            }

            #${BTN_ID} .neon-orbit::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: conic-gradient(
                    from 0deg,
                    transparent 0deg,
                    rgba(126,35,255,.10) 6deg,
                    rgba(170,92,255,.85) 18deg,
                    #f1ddff 28deg,
                    #b65cff 38deg,
                    rgba(126,35,255,.35) 50deg,
                    transparent 64deg,

                    transparent 180deg,

                    rgba(126,35,255,.10) 186deg,
                    rgba(170,92,255,.85) 198deg,
                    #f1ddff 208deg,
                    #b65cff 218deg,
                    rgba(126,35,255,.35) 230deg,
                    transparent 244deg,

                    transparent 360deg
                );

                -webkit-mask: radial-gradient(
                    farthest-side,
                    transparent calc(100% - 4px),
                    #000 calc(100% - 3px)
                );

                mask: radial-gradient(
                    farthest-side,
                    transparent calc(100% - 4px),
                    #000 calc(100% - 3px)
                );

                filter:
                    drop-shadow(0 0 3px rgba(194,112,255,1))
                    drop-shadow(0 0 7px rgba(145,52,255,.95))
                    drop-shadow(0 0 12px rgba(116,22,255,.78));
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

            @keyframes partnerNeonDoubleOrbit {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
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
            <span class="neon-orbit"></span>
            <img src="${LOGO}" alt="Partner VIP">
            <span class="partner-badge">1</span>
        `;

        document.body.appendChild(btn);
    }

    function init() {
        injectStyle();
        createButton();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
