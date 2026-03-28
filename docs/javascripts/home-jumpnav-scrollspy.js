(function () {
  "use strict";

  var ACTIVE_CLASS = "is-active";
  var cleanup = null;

  function getTopOffset() {
    var header = document.querySelector(".md-header");
    var tabs = document.querySelector(".md-tabs");
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    var tabsHeight = tabs ? tabs.getBoundingClientRect().height : 0;

    return headerHeight + tabsHeight + 24;
  }

  function initHomeJumpnav() {
    var nav = document.querySelector(".holo-home-jumpnav");
    if (!nav) {
      return null;
    }

    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    if (!links.length) {
      return null;
    }

    var pairs = links
      .map(function (link) {
        var href = link.getAttribute("href") || "";
        var id = href.slice(1);
        if (!id) {
          return null;
        }

        var target = document.getElementById(decodeURIComponent(id));
        if (!target) {
          target = document.getElementById(id);
        }

        if (!target) {
          return null;
        }

        return { link: link, target: target, id: target.id };
      })
      .filter(Boolean);

    if (!pairs.length) {
      return null;
    }

    var activeId = "";
    var rafId = 0;

    function setActiveById(id) {
      if (!id || id === activeId) {
        return;
      }

      activeId = id;

      pairs.forEach(function (pair) {
        var isActive = pair.id === id;
        pair.link.classList.toggle(ACTIVE_CLASS, isActive);

        if (isActive) {
          pair.link.setAttribute("aria-current", "true");
        } else {
          pair.link.removeAttribute("aria-current");
        }
      });
    }

    function updateActiveState() {
      rafId = 0;

      var topOffset = getTopOffset();
      var nextId = pairs[0].id;

      pairs.forEach(function (pair) {
        if (pair.target.getBoundingClientRect().top - topOffset <= 0) {
          nextId = pair.id;
        }
      });

      var nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (nearBottom) {
        nextId = pairs[pairs.length - 1].id;
      }

      setActiveById(nextId);
    }

    function requestUpdate() {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(updateActiveState);
    }

    function onNavClick(event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link || !nav.contains(link)) {
        return;
      }
      var id = (link.getAttribute("href") || "").slice(1);
      if (id) {
        setActiveById(decodeURIComponent(id));
      }
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("hashchange", requestUpdate);
    nav.addEventListener("click", onNavClick);

    requestUpdate();

    return function destroy() {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
      nav.removeEventListener("click", onNavClick);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }

  function boot() {
    if (cleanup) {
      cleanup();
    }
    cleanup = initHomeJumpnav();
  }

  if (typeof window.document$ !== "undefined" && window.document$ && window.document$.subscribe) {
    window.document$.subscribe(function () {
      boot();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
