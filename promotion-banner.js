(function () {
    "use strict";

    const BANNER = "https://www.image2url.com/r2/default/images/1787639732919-c1b1811d-35cb-4ea1-80ae-d60ace227101.png";
    const LINK = "https://ceriavpn.online/allinone";
    const ATTR = "data-banner-ceriabet";
    const RUNNING_TEXT = "INGIN MENJADI BAGIAN MEMBER VIP KAMI? HUBUNGI TEAM VIP KAMI MELALUI LINK DIATAS INI !";

    function injectStyle() {
        if (document.querySelector("style[data-promotion-banner]")) return;

        const style = document.createElement("style");
        style.setAttribute("data-promotion-banner", "1");

        style.textContent = `
            .promotion-banner {
                margin-bottom: 15px;
                position: relative;
                overflow: hidden;
                border-radius: 0;
                box-shadow: none;
            }

            .promotion-banner a {
                display: block;
            }

            .promotion-banner img.main-banner {
                width: 100%;
                height: auto;
                display: block;
                border-radius: 0;
            }

            .promotion-banner::before {
                content: '';
                position: absolute;
                inset: 0;
                background:
                    radial-gradient(circle, rgba(255,255,255,.95) 1px, transparent 2px) 10% 20%/40px 40px,
                    radial-gradient(circle, rgba(255,215,120,.9) 1px, transparent 2px) 30% 60%/55px 55px,
                    radial-gradient(circle, rgba(255,255,255,.85) 1px, transparent 2px) 70% 30%/60px 60px,
                    radial-gradient(circle, rgba(192,132,252,.8) 1px, transparent 2px) 50% 80%/45px 45px,
                    radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 2px) 85% 65%/50px 50px;
                animation: starBlink 1.6s ease-in-out infinite alternate;
                pointer-events: none;
                z-index: 2;
                opacity: .8;
            }

            .promotion-banner::after {
                content: '';
                position: absolute;
                inset: 0;
                padding: 2px;
                background: linear-gradient(
                    120deg,
                    #c084fc,
                    #ffd36a,
                    #a855f7,
                    #6d28d9,
                    #ffd36a
                );
                background-size: 250% 100%;
                animation: borderFlow 1.8s linear infinite;
                -webkit-mask:
                    linear-gradient(#fff 0 0) content-box,
                    linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                pointer-events: none;
                z-index: 10;
                opacity: .95;
            }

            .vip-running-text {
                position: relative;
                z-index: 4;
                width: 100%;
                height: 20px;
                display: flex;
                align-items: center;
                overflow: hidden;
                background: #050505;
                border-top: 1px solid rgba(255,255,255,.16);
                color: #ffffff;
            }

            .vip-running-text span {
                display: inline-block;
                flex: none;
                width: max-content;
                padding-left: 100%;
                padding-right: 100%;
                white-space: nowrap;
                font-size: 9px;
                font-weight: 700;
                letter-spacing: .45px;
                line-height: 20px;
                animation: vipMarquee 24s linear infinite;
                will-change: transform;
            }

            @keyframes starBlink {
                0% {
                    opacity: .25;
                    transform: scale(1);
                    filter: brightness(1);
                }

                50% {
                    opacity: 1;
                    transform: scale(1.12);
                    filter: brightness(1.8);
                }

                100% {
                    opacity: .45;
                    transform: scale(1);
                    filter: brightness(1.2);
                }
            }

            @keyframes borderFlow {
                0% {
                    background-position: 0 50%;
                }

                100% {
                    background-position: 250% 50%;
                }
            }

            @keyframes vipMarquee {
                from {
                    transform: translateX(0);
                }

                to {
                    transform: translateX(-100%);
                }
            }

            @media (max-width: 600px) {
                .vip-running-text {
                    height: 18px;
                }

                .vip-running-text span {
                    font-size: 8px;
                    line-height: 18px;
                    animation-duration: 21s;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .promotion-banner::before,
                .promotion-banner::after,
                .vip-running-text span {
                    animation-play-state: paused;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function createBanner(target) {
        const wrapper = document.createElement("div");
        const link = document.createElement("a");
        const img = document.createElement("img");
        const ticker = document.createElement("div");
        const tickerText = document.createElement("span");

        wrapper.className = "promotion-banner";

        link.href = LINK;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", "Hubungi Team VIP CERIABET");

        img.src = BANNER;
        img.alt = "Banner Member VIP CERIABET";
        img.className = "main-banner";
        img.setAttribute(ATTR, "1");

        ticker.className = "vip-running-text";
        ticker.setAttribute("aria-label", RUNNING_TEXT);
        tickerText.textContent = RUNNING_TEXT;

        link.appendChild(img);
        ticker.appendChild(tickerText);
        wrapper.appendChild(link);
        wrapper.appendChild(ticker);

        target.insertBefore(wrapper, target.firstChild);
    }

    function watch() {
        const exist = document.querySelector(".promotion-banner");
        const list = document.querySelector(".promotion-list");

        if (exist) return;

        if (list) {
            createBanner(list);
            return;
        }

        requestAnimationFrame(watch);
    }

    injectStyle();
    watch();
})();
