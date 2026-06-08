/* Theme Name: Worthy - Free Powerful Theme by HtmlCoder
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Version:1.0.0
 * Created:November 2014
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 * File Description: Place here your custom scripts
 */
(function() {
    function setWindowScroll(top, animate) {
        if (typeof window.scrollTo === "function") {
            window.scrollTo({
                top: top,
                left: 0,
                behavior: animate ? "smooth" : "auto"
            });
            return;
        }

        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
    }

    function getTarget(hash) {
        if (!hash || hash === "#") {
            return null;
        }

        try {
            return document.querySelector(hash);
        } catch (error) {
            return null;
        }
    }

    window.optimaxSectionScroll = function(hash, animate) {
        var target = getTarget(hash || window.location.hash);
        if (!target) {
            return;
        }

        var targetTop = Math.max(0, Math.round(target.getBoundingClientRect().top + window.pageYOffset));
        setWindowScroll(targetTop, animate !== false);

        if (animate !== false) {
            window.setTimeout(function() {
                setWindowScroll(targetTop, false);
            }, 720);
        }
    };

    function setProfileDrawer(open) {
        var drawer = document.getElementById("company-profile");
        if (!drawer) {
            return;
        }

        drawer.classList.toggle("is-open", open);
        drawer.setAttribute("aria-hidden", open ? "false" : "true");
        document.body.classList.toggle("profile-drawer-open", open);
    }

    document.addEventListener("click", function(event) {
        var openTrigger = event.target.closest("[data-profile-drawer-open]");
        if (openTrigger) {
            event.preventDefault();
            event.stopPropagation();
            setProfileDrawer(true);
            return;
        }

        if (event.target.closest("[data-profile-drawer-close]")) {
            event.preventDefault();
            event.stopPropagation();
            setProfileDrawer(false);
        }
    }, true);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            setProfileDrawer(false);
        }
    });

    document.addEventListener("click", function(event) {
        var link = event.target.closest("a[href*='#']");
        if (!link || link.getAttribute("href") === "#") {
            return;
        }

        if (link.hasAttribute("data-profile-drawer-open")) {
            return;
        }

        if (window.location.pathname.replace(/^\//, "") !== link.pathname.replace(/^\//, "") || window.location.hostname !== link.hostname) {
            return;
        }

        var target = getTarget(link.hash);
        if (!target) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        window.optimaxSectionScroll(link.hash, true);

        if (window.history && window.history.pushState) {
            window.history.pushState(null, "", link.hash);
        } else {
            window.location.hash = link.hash;
        }
    }, true);

    window.addEventListener("load", function() {
        window.setTimeout(function() {
            window.optimaxSectionScroll(window.location.hash, false);
        }, 80);
    });

    window.addEventListener("hashchange", function() {
        window.setTimeout(function() {
            window.optimaxSectionScroll(window.location.hash, false);
        }, 80);
    });
})();
