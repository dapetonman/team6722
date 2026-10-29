/* ==========================================================
   header.js - shared top bar
   loaded by EVERY page regardless of any factor, very important.

   the full bar markup lives HERE, please remember this whoever is reading down the line
   it is injected into the #site-header placeholder: VERY IMPORTANT

     <div id="site-header" data-base="" data-page="home"></div>

   data-base: path back to the site root ("" | "../" | "../../")
   data-page: nav key to mark active (home|team|robots|branding)

   THE BAR IS ONLY: marquee on top, then LED [logo] ROBOTICS centered,
   then the hamburger on the far right. no links in the bar, ever.
   every nav link + the social icons live inside the slide in panel.
   ========================================================== */
(function () {
  "use strict";

  var slot = document.getElementById("site-header");
  if (!slot) return;

  var base = slot.getAttribute("data-base") || "";
  var page = slot.getAttribute("data-page") || "";

  /* normalize base so it ALWAYS ends with "/" instead of having the thingy not work, so ("../.." -> "../../").
     without this, detail pages become links like "../..index.html". very important, do NOT remove this, this WILL break everything.*/
  if (base && base.charAt(base.length - 1) !== "/") base += "/";

  /* social icons (source SVGs are black and CSS whitens)*/
  function socials() {
    var links = [
      ["https://www.instagram.com/led.robotics/", "instagram", "Instagram"],
      ["https://www.youtube.com/@LED_Team6722", "youtube", "YouTube"],
      ["https://www.tiktok.com/@led_robotics6722", "tiktok", "TikTok"],
      ["https://www.facebook.com/ledrobotics6722/", "facebook", "Facebook"],
      ["https://github.com/dapetonman/team6722", "github", "GitHub"]
    ];
    var html = links
      .map(function (l) {
        return (
          '<a href="' + l[0] + '" target="_blank" rel="noopener" title="' + l[2] + '">' +
          '<img src="' + base + 'images/social/' + l[1] + '.svg" alt="' + l[2] + '" />' +
          "</a>"
        );
      })
      .join("");
    html += '<button class="copy-email" title="Copy team email">Email</button>';
    return html;
  }

  /*robots dropdown that was permanantly borrowed from "le Cheesy" (every robot links to its info page) */
  var ROBOTS = [
    ["sherman", "Sherman (2026)"],
    ["trident", "Trident (2025)"],
    ["maestro", "Maestro (2024)"],
    ["banshee", "Banshee (2023)"],
    ["vega", "Vega (2022)"],
    ["midnight", "Midnight (2019)"],
    ["shmvt1", "S.H.M.V.T.Y.1. (2018)"],
    ["roy", "Roy (2017)"]
  ];

  var robotItems = ROBOTS.map(function (r) {
    return '<li><a href="' + base + "pages/robots/" + r[0] + '.html">' + r[1] + "</a></li>";
  }).join("");

  /* slim almost like a marquee banner at top of page, "LIGHT IT UP" and is technically named a "jumbotron" by what ahlgrim said before*/
  var marqueeUnit = "LIGHT IT UP\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0";
  var marqueeHalf = new Array(10).join(marqueeUnit);

  /* for formatting reasons, the important stuff will have 10 hyphens on either side of the thingy, if i can remember to do that for all of these */
  
  /* ---------- BUILD THE ACTUAL BAR ---------- */
  slot.innerHTML =
    '<a id="content-skip" href="#content">Skip to content</a>' +
    '<div class="top-wrap" id="top">' +
    /* the slim purple line with scrolling text */
    '<div class="marquee" aria-hidden="true"><div class="marquee-track">' +
    "<span>" + marqueeHalf + "</span><span>" + marqueeHalf + "</span>" +
    "</div></div>" +
    '<header class="topbar">' +
    /* the brand: LED + logo + ROBOTICS. .brand is absolutely centered so the logo
       aint never drifting off the middle of the screen, no matter how wide u make it. */
    '<a class="brand" href="' + base + 'index.html">' +
    '<span class="brand-word">LED</span>' +
    '<img id="logo" src="' + base + 'images/LED.svg" alt="" />' +
    '<span class="brand-word">ROBOTICS</span>' +
    "</a>" +
    /* the ONLY thing in the bar besides the brand: the hamburger. nav buttons,
       if someones to change or modffy them, check back here. */
    '<button id="nav-button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="main-nav">' +
    "<span></span><span></span><span></span></button>" +
    '<nav id="main-nav" aria-label="Main navigation">' +
    '<p class="nav-tagline">LED Robotics - Team 6722 \u2014 Pasco County, FL</p>' +
    "<ul>" +
    '<li><a href="' + base + 'index.html" data-nav="home">Home</a></li>' +
    '<li><a href="' + base + 'pages/team.html" data-nav="team">The Team</a></li>' +
    '<li class="has-dropdown">' +
    '<button class="nav-dropdown-toggle" type="button" data-nav="robots" aria-expanded="false" aria-controls="robots-dropdown">Our Robots</button>' +
    '<ul class="dropdown" id="robots-dropdown">' +
    '<li><a href="' + base + 'pages/robots.html">All Robots</a></li>' +
    robotItems +
    "</ul></li>" +
    '<li><a href="' + base + 'pages/media.html" data-nav="media">Media</a></li>' +
    '<li><a href="' + base + 'pages/branding.html" data-nav="branding">Branding</a></li>' +
    '<li><a class="nav-cta" href="' + base + 'pages/sponsorship.html" data-nav="sponsorship">Sponsor</a></li>' +
    "</ul>" +
    '<div class="social-row social-row--panel">' + socials() + "</div>" +
    "</nav></header>" +
    /* the dimmer sits INSIDE .top-wrap on purpose: that way it paints over the bar
       but still under the panel. if u move it outside here the bar goes un dimmed again. */
    '<div class="nav-overlay"></div>' +
    "</div>";

  (function configureMarquee() {
    var marquee = slot.querySelector(".marquee");
    var track = slot.querySelector(".marquee-track");
    var copies = track ? track.children : null;
    if (!marquee || !track || !copies || copies.length < 2) return;

    var repeats = 9;
    var resizeFrame = 0;
    var animation = null;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function animate(copyWidth) {
      if (animation) animation.cancel();
      if (reducedMotion.matches || !track.animate) return;
      animation = track.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
        { duration: Math.max(8, copyWidth / 55) * 1000, easing: "linear", iterations: Infinity }
      );
    }

    function fit() {
      var unitWidth = copies[0].getBoundingClientRect().width / repeats;
      if (!marquee.clientWidth || !unitWidth) return;

      var nextRepeats = Math.max(9, Math.ceil(marquee.clientWidth / unitWidth) + 1);
      if (nextRepeats !== repeats) {
        repeats = nextRepeats;
        var text = new Array(repeats + 1).join(marqueeUnit);
        copies[0].textContent = text;
        copies[1].textContent = text;
      }

      var copyWidth = copies[0].getBoundingClientRect().width;
      track.classList.add("is-ready");
      animate(copyWidth);
    }

    function scheduleFit() {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(fit);
    }

    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleFit);
    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", scheduleFit);
    if (window.ResizeObserver) {
      new window.ResizeObserver(scheduleFit).observe(marquee);
    } else {
      window.addEventListener("resize", scheduleFit, { passive: true });
    }
  })();

  (function moveNavToBody() {
    var navEl = slot.querySelector("#main-nav");
    var overlayEl = slot.querySelector(".nav-overlay");
    if (navEl && overlayEl && (navEl.parentNode === slot || overlayEl.parentNode === slot)) {
      // append to body in the same order they were in the DOM
      document.body.appendChild(navEl);
      document.body.appendChild(overlayEl);
    }
  })();

  var topbar = slot.querySelector(".topbar");
  var btn = document.getElementById("nav-button");           // button stays in header; select globally
  var nav = document.getElementById("main-nav");             // nav may have been moved to body
  var overlay = document.querySelector(".nav-overlay");      // select globally too 
  var dropdown = nav.querySelector(".has-dropdown");         // dropdown lives inside the moved nav
  var dropdownLink = dropdown.firstElementChild;

  // basically just marks the current page in the nav.
  var current = nav.querySelector('[data-nav="' + page + '"]');
  if (current) {
    current.classList.add("active");
    current.setAttribute("aria-current", "page");
  }

  // shrink the bar on scroll.
  function onScroll() {
    topbar.classList.toggle("shrink", window.scrollY > 120);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // kick ass slide in panel, little mini slide in nav thingy + overlay + scroll lock,
  // very proud of this if u couldnt tell lol. this is the ONLY nav now, every screen
  // size gets it, so it also shoves focus in there and hands it back when it closes.
  function setSidebar(open) {
    nav.classList.toggle("open", open);
    btn.classList.toggle("open", open);
    overlay.classList.toggle("show", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);

    if (open) {
      window.setTimeout(function () {
        if (!nav.classList.contains("open")) return;
        var first = nav.querySelector("a");
        if (first) first.focus();
      }, 260);
    } else {
      dropdown.classList.remove("open");
      dropdownLink.setAttribute("aria-expanded", "false");
      if (document.activeElement && nav.contains(document.activeElement)) btn.focus();
    }
  }
  btn.addEventListener("click", function () {
    setSidebar(!nav.classList.contains("open"));
  });
  overlay.addEventListener("click", function () {
    setSidebar(false);
  });

  // when the "Our Robots" button is clicked, toggle the accordion inside the panel.
  // no hover opening anymore, the bar has no links in it so theres nothing to hover.
  dropdownLink.addEventListener("click", function (e) {
    e.preventDefault();
    var open = dropdown.classList.toggle("open");
    dropdownLink.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      dropdownLink.setAttribute("aria-expanded", "false");
    }
  });

  // close the sidebar after choosing a link.
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a") && !e.target.closest(".has-dropdown > a")) {
      setSidebar(false);
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setSidebar(false);
      return;
    }
    if (e.key !== "Tab" || !nav.classList.contains("open")) return;

    var focusable = Array.prototype.filter.call(
      nav.querySelectorAll('a[href], button:not([disabled])'),
      function (element) { return element.getClientRects().length > 0; }
    );
    if (!focusable.length) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (!nav.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // copies team email to clipboard 
  var address = "contact@team6722.com";
  slot.querySelectorAll(".copy-email").forEach(function (emailBtn) {
    emailBtn.addEventListener("click", function () {
      function done() {
        slot.querySelectorAll(".copy-email").forEach(function (b) {
          b.textContent = "Copied!";
          setTimeout(function () {
            b.textContent = "Email";
          }, 1500);
        });
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(done).catch(function () {});
      }
    });
  });

  /* ---------- the nav flash ----------
     click a link in the bar/panel and the whole screen blinks white, drops to
     deep purple, then the page changes. "All Robots" says ALL ROBOTS in the
     middle, "Sponsor" says WE LOVE OUR SPONSORS! and waits 2 extra seconds
     before it lets go of u. only ever animates opacity, so its free. */
  (function () {
    var flashing = false;
    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    slot.addEventListener("click", function (e) {
      if (
        reduced || flashing || e.defaultPrevented ||
        e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
      ) return;

      var a = e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;

      var url = a.getAttribute("href");
      // only our own pages: no anchors, no external stuff, no mailto
      if (!url || url.charAt(0) === "#" || /^(https?:)?\/\//i.test(url) || /^mailto:/i.test(url)) return;

      var words = "";
      var wait = 0;
      if (a.closest(".dropdown") && /robots\.html$/i.test(url)) {
        words = "ALL ROBOTS";
      } else if (a.classList.contains("nav-cta")) {
        words = "WE LOVE OUR SPONSORS!";
        wait =500; // the sponsors one holds u hostage for 1 extra second (CHANGED TO 1 SECOND FROM 2 SECONDS)
      }

      if (!document.body.animate) return; // no web animations api, just go
      e.preventDefault();
      flashing = true;
      flash(url, words, wait);
    });

    function flash(url, words, wait) {
      var box = document.createElement("div");
      box.className = "nav-flash";
      var text = null;
      if (words) {
        text = document.createElement("span");
        text.className = "nav-flash-text";
        text.textContent = words;
        box.appendChild(text);
      }
      document.body.appendChild(box);

      var go = function () { location.href = url; };

      // phase 1: white blink in
      var blink = box.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 110, easing: "linear", fill: "forwards" }
      );

      blink.finished.then(function () {
        box.classList.add("nav-flash--deep"); // phase 2: deep purple
        if (text) {
          text.animate(
            [{ opacity: 0, transform: "scale(0.88)" }, { opacity: 1, transform: "none" }],
            { duration: 200, easing: "ease-out", fill: "forwards" }
          );
        }
        setTimeout(go, (words ? 550 : 300) + wait);
      }).catch(go);
    }
  })();
})();
