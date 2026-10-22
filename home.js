(function () {
  document.querySelectorAll(".deferred-embed").forEach(function (container) {
    var button = container.querySelector(".embed-load");
    if (!button) return;

    button.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.src = container.getAttribute("data-src");
      frame.title = container.getAttribute("data-title") || "Embedded content";
      frame.loading = "eager";
      frame.referrerPolicy = container.getAttribute("data-referrerpolicy") || "strict-origin-when-cross-origin";
      var allow = container.getAttribute("data-allow");
      if (allow) frame.allow = allow;
      if (container.classList.contains("deferred-embed--video")) frame.allowFullscreen = true;
      if (container.classList.contains("deferred-embed--calendar")) {
        frame.width = "800";
        frame.height = "600";
        frame.scrolling = "yes";
      }
      container.replaceChild(frame, button);
    });
  });

  var video = document.querySelector(".hero-video");
  var toggle = document.querySelector(".hero-video-toggle");
  if (!video || !toggle) return;
  toggle.hidden = false;

  var reducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var reducedData = !!(connection &&
    (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || "")));
  var introFinished = false;
  var userInteracted = false;
  var autoPlayObserver = null;
  var fallbackFrame = 0;

  function updateToggle() {
    var paused = video.paused;
    toggle.textContent = paused ? "Play background video" : "Pause background video";
    toggle.setAttribute("aria-pressed", paused ? "false" : "true");
  }

  function play() {
    if (!video.paused) return;
    var result = video.play();
    if (result && result.catch) result.catch(function () {});
  }

  function updatePlaybackForVisibility() {
    var bounds = video.getBoundingClientRect();
    var visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
    if (document.hidden || !visible) video.pause();
    else if (!userInteracted && !reducedMotion && !reducedData) play();
  }

  function autoplayWhenVisible() {
    if (!introFinished || userInteracted || reducedMotion || reducedData) return;
    if (document.hidden) {
      video.pause();
      return;
    }

    if (window.IntersectionObserver) {
      if (!autoPlayObserver) {
        autoPlayObserver = new window.IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting && !document.hidden) play();
          else video.pause();
        }, { threshold: 0.1 });
      }
      autoPlayObserver.observe(video);
    } else {
      updatePlaybackForVisibility();
    }
  }

  function scheduleVisibilityCheck() {
    if (fallbackFrame) return;
    fallbackFrame = requestAnimationFrame(function () {
      fallbackFrame = 0;
      if (introFinished && !userInteracted && !reducedMotion && !reducedData) updatePlaybackForVisibility();
    });
  }

  video.addEventListener("play", function () {
    if (reducedMotion && !userInteracted) video.pause();
    updateToggle();
  });
  video.addEventListener("pause", updateToggle);
  toggle.addEventListener("click", function () {
    userInteracted = true;
    if (autoPlayObserver) {
      autoPlayObserver.disconnect();
      autoPlayObserver = null;
    }
    if (video.paused) play();
    else video.pause();
  });
  document.addEventListener("intro-finished", function () {
    introFinished = true;
    autoplayWhenVisible();
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      video.pause();
      return;
    }
    if (autoPlayObserver) {
      autoPlayObserver.disconnect();
      autoPlayObserver = null;
    }
    autoplayWhenVisible();
  });
  if (!window.IntersectionObserver) {
    window.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
    window.addEventListener("resize", scheduleVisibilityCheck, { passive: true });
  }
  updateToggle();
})();

(function () {
  var video = document.querySelector(".hero-video");
  if (!video) return;
  var hero = video.closest ? video.closest(".hero") : null;
  var reported = false;

  function fileName(src) {
    return src ? src.split("/").pop() : "nothing";
  }

  function report() {
    if (reported || !video.currentSrc) return;
    reported = true;
    console.log("[hero video] using: " + fileName(video.currentSrc));
  }

  Array.prototype.forEach.call(video.querySelectorAll("source"), function (source) {
    source.addEventListener("error", function () {
      console.log("[hero video] " + fileName(source.src || source.getAttribute("src")) + " failed");
    });
  });

  video.addEventListener("loadeddata", report);
  video.addEventListener("canplay", report);
  video.addEventListener("error", function () {
    reported = true;
    if (hero) hero.classList.add("video-dead");
    var toggle = document.querySelector(".hero-video-toggle");
    if (toggle) toggle.hidden = true;
  });
  if (video.readyState >= 2) report();
})();

(function () {
  var splash = document.querySelector(".intro-splash");
  var from = document.querySelector(".intro-logo");
  var to = document.getElementById("logo");
  var completed = false;
  var safetyTimer;

  function finish() {
    if (completed) return;
    completed = true;
    window.clearTimeout(safetyTimer);
    if (to) to.classList.remove("logo-hidden");
    if (splash) splash.remove();
    document.dispatchEvent(new Event("intro-finished"));
  }

  if (!splash || !from || !to || !from.animate ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    finish();
    return;
  }

  safetyTimer = window.setTimeout(finish, 1800);

  function start() {
    var startRect = from.getBoundingClientRect();
    var endRect = to.getBoundingClientRect();
    if (!startRect.width || !endRect.width) {
      finish();
      return;
    }

    var scale = endRect.width / startRect.width;
    var dx = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
    var dy = (endRect.top + endRect.height / 2) - (startRect.top + startRect.height / 2);

    to.classList.add("logo-hidden");
    from.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)" },
        { transform: "translate(-50%, -50%) translate(" + dx + "px, " + dy + "px) scale(" + scale + ")" }
      ],
      { duration: 900, delay: 300, easing: "cubic-bezier(.65, 0, .35, 1)", fill: "both" }
    ).onfinish = function () {
      from.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: "forwards" })
        .onfinish = finish;
    };
  }

  requestAnimationFrame(start);
})();