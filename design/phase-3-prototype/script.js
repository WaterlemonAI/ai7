(function () {
  const pages = Array.from(document.querySelectorAll("[data-page]"));
  const routeLinks = Array.from(document.querySelectorAll("[data-route]"));
  const navLinks = Array.from(document.querySelectorAll(".primary-nav [data-route]"));
  const menuButton = document.querySelector("#menu-button");
  const nav = document.querySelector("#primary-nav");
  const motionButton = document.querySelector("#motion-toggle");
  const form = document.querySelector("#prototype-form");
  const formNote = document.querySelector("#form-note");
  const newsletterOverlay = document.querySelector("#newsletter-overlay");
  const newsletterDialog = newsletterOverlay.querySelector(".newsletter-dialog");
  const newsletterClose = document.querySelector("#newsletter-close");
  const newsletterForm = document.querySelector("#newsletter-form");
  const newsletterEmail = document.querySelector("#newsletter-email");
  const newsletterError = document.querySelector("#newsletter-error");
  const newsletterSessionKey = "ai7lab-newsletter-shown-v1";
  const schedulerOverlay = document.querySelector("#scheduler-overlay");
  const schedulerDialog = schedulerOverlay.querySelector(".scheduler-dialog");
  const schedulerClose = document.querySelector("#scheduler-close");
  const schedulerDone = document.querySelector("#scheduler-done");
  const schedulerForm = document.querySelector("#scheduler-form");
  const schedulerFormView = document.querySelector("#scheduler-form-view");
  const schedulerSuccess = document.querySelector("#scheduler-success");
  const schedulerName = document.querySelector("#scheduler-name");
  const schedulerInterest = document.querySelector("#scheduler-interest");
  const schedulerDate = document.querySelector("#scheduler-date");
  const schedulerTime = document.querySelector("#scheduler-time");
  const schedulerTimezone = document.querySelector("#scheduler-timezone");
  const schedulerError = document.querySelector("#scheduler-error");
  const validRoutes = new Set(pages.map((page) => page.dataset.page));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let revealObserver;
  let counterObserver;
  let scrollFrame;
  let routeTimer;
  let newsletterTimer;
  let newsletterPreviousFocus;
  let schedulerPreviousFocus;

  function newsletterWasShown() {
    try { return window.sessionStorage.getItem(newsletterSessionKey) === "shown"; }
    catch (_error) { return false; }
  }

  function markNewsletterShown() {
    try { window.sessionStorage.setItem(newsletterSessionKey, "shown"); }
    catch (_error) { /* The file prototype still works when browser storage is unavailable. */ }
  }

  function closeNewsletter() {
    newsletterOverlay.hidden = true;
    document.body.style.overflow = "";
    newsletterError.textContent = "";
    if (newsletterPreviousFocus) newsletterPreviousFocus.focus();
  }

  function openNewsletter() {
    if (!schedulerOverlay.hidden) return;
    newsletterPreviousFocus = document.activeElement;
    markNewsletterShown();
    newsletterOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    newsletterEmail.focus();
  }

  function dateInDubai(offsetDays) {
    const date = new Date(Date.now() + (offsetDays || 0) * 86400000);
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
    const value = (type) => (parts.find((part) => part.type === type) || {}).value || "";
    return `${value("year")}-${value("month")}-${value("day")}`;
  }

  function updateSchedulerTimezone() {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    if (!schedulerDate.value) {
      schedulerTimezone.textContent = `Your timezone: ${zone}`;
      return;
    }
    const selected = new Date(`${schedulerDate.value}T${schedulerTime.value}:00+04:00`);
    const local = new Intl.DateTimeFormat(undefined, { timeZone: zone, weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(selected);
    schedulerTimezone.innerHTML = `Your timezone: ${zone} · <strong>${local}</strong>`;
  }

  function isBusinessDay(value) {
    if (!value) return false;
    const day = new Date(`${value}T12:00:00+04:00`).getUTCDay();
    return day >= 1 && day <= 5;
  }

  function closeScheduler() {
    schedulerOverlay.hidden = true;
    document.body.style.overflow = "";
    schedulerError.textContent = "";
    if (schedulerPreviousFocus) schedulerPreviousFocus.focus();
  }

  function openScheduler(interest) {
    window.clearTimeout(newsletterTimer);
    markNewsletterShown();
    if (!newsletterOverlay.hidden) closeNewsletter();
    schedulerPreviousFocus = document.activeElement;
    schedulerInterest.value = Array.from(schedulerInterest.options).some((option) => option.value === interest) ? interest : "General business problem";
    schedulerFormView.hidden = false;
    schedulerSuccess.hidden = true;
    schedulerError.textContent = "";
    schedulerOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    schedulerName.focus();
  }

  function handleSchedulerKeys(event) {
    if (schedulerOverlay.hidden) return;
    if (event.key === "Escape") {
      closeScheduler();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(schedulerDialog.querySelectorAll("button, input, select, textarea")).filter((element) => !element.disabled && element.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function handleNewsletterKeys(event) {
    if (newsletterOverlay.hidden) return;
    if (event.key === "Escape") {
      closeNewsletter();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(newsletterDialog.querySelectorAll("button, input, a[href]")).filter((element) => !element.disabled);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function motionIsReduced() {
    return document.body.classList.contains("reduce-motion") || prefersReducedMotion.matches;
  }

  function routeFromHash() {
    const route = window.location.hash.replace("#", "") || "home";
    return validRoutes.has(route) ? route : "home";
  }

  function finishRouteTransition() {
    document.body.classList.add("route-enter");
    document.body.classList.remove("is-routing");
    window.setTimeout(() => document.body.classList.remove("route-enter"), 520);
  }

  function renderRoute() {
    const route = routeFromHash();
    pages.forEach((page) => page.classList.toggle("is-active", page.dataset.page === route));
    navLinks.forEach((link) => {
      const current = link.dataset.route === route ||
        ((route === "vendoreye" || route === "rolefield") && link.dataset.route === "products") ||
        (route === "taed" && link.dataset.route === "technology");
      if (current) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: motionIsReduced() ? "auto" : "smooth" });
    document.title = `AI7Lab — ${route === "home" ? "Phase 3 design prototype" : route.replaceAll("-", " ")}`;
    window.requestAnimationFrame(() => {
      observeReveals();
      observeCounters();
      setupDepthMotion();
      finishRouteTransition();
      updateScrollProgress();
    });
  }

  function navigateTo(route) {
    if (!validRoutes.has(route)) return;
    window.clearTimeout(routeTimer);
    if (motionIsReduced()) {
      if (route === routeFromHash()) renderRoute();
      else window.location.hash = route;
      return;
    }
    document.body.classList.add("is-routing");
    routeTimer = window.setTimeout(() => {
      if (route === routeFromHash()) renderRoute();
      else window.location.hash = route;
    }, 390);
  }

  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();
    const elements = Array.from(document.querySelectorAll(".page.is-active .reveal"));
    elements.forEach((element, index) => {
      element.style.setProperty("--reveal-index", String(index % 4));
      element.classList.remove("is-visible");
    });
    if (motionIsReduced() || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });
    elements.forEach((element) => revealObserver.observe(element));
  }

  function finalCounterText(element) {
    const value = Number(element.dataset.counter);
    const prefix = element.dataset.prefix || "";
    const suffix = element.dataset.suffix || "";
    return `${prefix}${value.toLocaleString("en-US")}${suffix}`;
  }

  function animateCounter(element) {
    if (element.dataset.counted === "true") return;
    element.dataset.counted = "true";
    const target = Number(element.dataset.counter);
    const prefix = element.dataset.prefix || "";
    const suffix = element.dataset.suffix || "";
    if (motionIsReduced()) {
      element.textContent = finalCounterText(element);
      return;
    }
    const duration = 1150;
    const started = performance.now();
    function frame(now) {
      const elapsed = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 4);
      const current = Math.round(target * eased);
      element.textContent = `${prefix}${current.toLocaleString("en-US")}${suffix}`;
      if (elapsed < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function observeCounters() {
    if (counterObserver) counterObserver.disconnect();
    const counters = Array.from(document.querySelectorAll(".page.is-active [data-counter]"));
    counters.forEach((counter) => {
      counter.dataset.counted = "false";
      if (motionIsReduced()) counter.textContent = finalCounterText(counter);
    });
    if (motionIsReduced() || !("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }
    counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.55 });
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  function setupDepthMotion() {
    document.querySelectorAll(".page.is-active [data-depth]").forEach((panel) => {
      if (panel.dataset.depthBound === "true") return;
      panel.dataset.depthBound = "true";
      panel.addEventListener("pointermove", (event) => {
        if (motionIsReduced() || event.pointerType === "touch") return;
        const bounds = panel.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        panel.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
        panel.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
        panel.style.setProperty("--px", `${x * 100}%`);
        panel.style.setProperty("--py", `${y * 100}%`);
      });
      panel.addEventListener("pointerleave", () => {
        panel.style.setProperty("--rx", "0deg");
        panel.style.setProperty("--ry", "0deg");
        panel.style.setProperty("--px", "50%");
        panel.style.setProperty("--py", "50%");
      });
    });
  }

  function updateScrollProgress() {
    scrollFrame = undefined;
    const root = document.documentElement;
    const available = Math.max(root.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / available, 0), 1);
    root.style.setProperty("--scroll-progress", progress.toFixed(4));
  }

  function requestScrollProgress() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollProgress);
  }

  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  routeLinks.forEach((link) => link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateTo(link.dataset.route);
  }));

  motionButton.addEventListener("click", () => {
    const reduced = document.body.classList.toggle("reduce-motion");
    motionButton.setAttribute("aria-pressed", String(reduced));
    motionButton.textContent = reduced ? "Enable motion" : "Reduce motion";
    observeReveals();
    observeCounters();
  });

  document.querySelectorAll(".filter-row button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-row button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Submission state verified — no information was sent.";
    formNote.classList.add("success");
  });

  newsletterClose.addEventListener("click", closeNewsletter);
  newsletterOverlay.addEventListener("mousedown", (event) => { if (event.target === newsletterOverlay) closeNewsletter(); });
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = newsletterForm.querySelectorAll('input[name="topics"]:checked');
    if (!selected.length) {
      newsletterError.textContent = "Select at least one newsletter topic.";
      return;
    }
    newsletterError.textContent = "Subscription state verified — no information was sent.";
    window.setTimeout(closeNewsletter, 900);
  });
  document.addEventListener("keydown", handleNewsletterKeys);
  if (!newsletterWasShown()) newsletterTimer = window.setTimeout(openNewsletter, 4000);

  Array.from(document.querySelectorAll("[data-scheduler]")).forEach((trigger) => trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openScheduler(trigger.dataset.interest || "General business problem");
  }));
  for (let index = 0; index < 16; index += 1) {
    const minutes = 9 * 60 + index * 30;
    const value = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
    const option = document.createElement("option");
    option.value = value;
    option.textContent = new Date(`2000-01-01T${value}:00`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    schedulerTime.append(option);
  }
  schedulerDate.min = dateInDubai(0);
  schedulerDate.max = dateInDubai(90);
  updateSchedulerTimezone();
  schedulerDate.addEventListener("change", () => { schedulerError.textContent = ""; updateSchedulerTimezone(); });
  schedulerTime.addEventListener("change", updateSchedulerTimezone);
  schedulerClose.addEventListener("click", closeScheduler);
  schedulerDone.addEventListener("click", closeScheduler);
  schedulerOverlay.addEventListener("mousedown", (event) => { if (event.target === schedulerOverlay) closeScheduler(); });
  schedulerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!isBusinessDay(schedulerDate.value)) {
      schedulerError.textContent = "Choose a Monday–Friday date.";
      return;
    }
    schedulerFormView.hidden = true;
    schedulerSuccess.hidden = false;
    schedulerDone.focus();
  });
  document.addEventListener("keydown", handleSchedulerKeys);

  window.addEventListener("hashchange", renderRoute);
  window.addEventListener("scroll", requestScrollProgress, { passive: true });
  window.addEventListener("resize", requestScrollProgress);
  document.body.classList.add("motion-ready");
  renderRoute();
})();
