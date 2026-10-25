(function () {
  "use strict";

  var interestsKey = "afj-travel-interests";
  var tallyFormId = "yPVYJW";
  var whatsappNumber = "255725451451";
  var tallyScriptPromise;
  document.documentElement.classList.add("js-enabled");

  function savedInterests() {
    try {
      var saved = sessionStorage.getItem(interestsKey);
      var parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function selectedInterests() {
    if (!document.querySelector("[data-interest]")) return savedInterests();
    var buttons = document.querySelectorAll("[data-interest]");
    var selected = Array.prototype.filter.call(buttons, function (button) {
      return button.type === "checkbox" ? button.checked : button.getAttribute("aria-pressed") === "true";
    }).map(function (button) {
      return button.type === "checkbox" ? button.value : button.getAttribute("data-interest");
    });
    try {
      sessionStorage.setItem(interestsKey, JSON.stringify(selected));
    } catch (error) {}
    return selected.length ? selected : savedInterests();
  }

  function updateWhatsAppLinks() {
    var interests = selectedInterests().join(", ");
    document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
      var message = "Hello African Journal Safari Tours, I would like to plan a Tanzania journey.";
      var theme = link.getAttribute("data-theme");
      if (theme) message += " Journey theme: " + theme + ".";
      if (interests) message += " My interests: " + interests + ".";
      link.href = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
    });
  }

  function loadTally() {
    if (window.Tally && typeof window.Tally.openPopup === "function") return Promise.resolve(window.Tally);
    if (tallyScriptPromise) return tallyScriptPromise;

    tallyScriptPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      script.onload = function () {
        if (window.Tally && typeof window.Tally.openPopup === "function") {
          resolve(window.Tally);
        } else {
          reject(new Error("The enquiry form service did not initialize."));
        }
      };
      script.onerror = function () {
        reject(new Error("The enquiry form service could not be loaded."));
      };
      document.head.appendChild(script);
    });
    return tallyScriptPromise;
  }

  function openTallyForm(link) {
    var status = document.querySelector("[data-contact-status]");
    if (status) status.hidden = true;
    link.setAttribute("aria-busy", "true");
    loadTally().then(function (tally) {
      var interests = selectedInterests().join(", ");
      var theme = link.getAttribute("data-theme");
      var hiddenFields = {};
      if (interests || theme) hiddenFields.interests = [theme, interests].filter(Boolean).join(", ");
      tally.openPopup(tallyFormId, {
        layout: "modal",
        width: 560,
        autoClose: 0,
        hiddenFields: hiddenFields
      });
      link.removeAttribute("aria-busy");
    }).catch(function (error) {
      link.removeAttribute("aria-busy");
      if (status) {
        status.textContent = "The enquiry form could not load. Please use WhatsApp or the Contact page.";
        status.hidden = false;
      }
      console.error(error);
    });
  }

  function updateInterestSummaries() {
    var selected = selectedInterests().join(", ");
    document.querySelectorAll("[data-selected-interests]").forEach(function (summary) {
      summary.textContent = selected ? "Selected: " + selected : "No interests selected yet.";
    });
    updateWhatsAppLinks();
  }

  var interestButtons = document.querySelectorAll("[data-interest]");
  var saved = savedInterests();
  interestButtons.forEach(function (button) {
    if (button.type === "checkbox") {
      button.checked = saved.indexOf(button.value) !== -1;
    } else {
      button.setAttribute("aria-pressed", String(saved.indexOf(button.getAttribute("data-interest")) !== -1));
    }
  });
  updateInterestSummaries();

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("[data-interest]");
    if (!button || button.type === "checkbox") return;
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    updateInterestSummaries();
  });
  document.addEventListener("change", function (event) {
    if (event.target.matches && event.target.matches("input[type='checkbox'][data-interest]")) updateInterestSummaries();
  });
  document.addEventListener("click", function (event) {
    var tallyLink = event.target.closest && event.target.closest("[data-tally-form]");
    if (!tallyLink) return;
    event.preventDefault();
    openTallyForm(tallyLink);
  });

  var page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-nav [data-page]").forEach(function (link) {
    if (link.getAttribute("data-page") === page) link.setAttribute("aria-current", "page");
  });

  var menuButton = document.querySelector(".menu-toggle");
  var navigation = document.getElementById("primary-nav");

  function closeMenu(returnFocus) {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
    if (returnFocus) menuButton.focus();
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var opening = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(opening));
      menuButton.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
      navigation.classList.toggle("is-open", opening);
    });
    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu(true);
    });
    document.addEventListener("click", function (event) {
      if (menuButton.getAttribute("aria-expanded") === "true" && !event.target.closest(".header-inner")) closeMenu(false);
    });
  }

  var header = document.querySelector(".site-header.site-header-overlay");
  function updateHeaderState() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();

  var video = document.getElementById("hero-video");
  var videoButton = document.querySelector("[data-video-toggle]");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setVideoButton(playing) {
    if (!videoButton) return;
    videoButton.setAttribute("aria-pressed", String(playing));
    videoButton.setAttribute("aria-label", playing ? "Pause background film" : "Play background film");
    var label = videoButton.querySelector("[data-video-label]");
    var icon = videoButton.querySelector(".video-toggle-icon");
    if (label) label.textContent = playing ? "Pause film" : "Play film";
    if (icon) icon.textContent = playing ? "Ⅱ" : "▶";
  }

  if (video && videoButton) {
    videoButton.addEventListener("click", function () {
      if (video.paused) {
        var playAttempt = video.play();
        if (playAttempt && playAttempt.catch) playAttempt.catch(function () { setVideoButton(false); });
      } else {
        video.pause();
      }
    });
    video.addEventListener("play", function () { setVideoButton(true); });
    video.addEventListener("pause", function () { setVideoButton(false); });
    if (reduceMotion) {
      video.pause();
      setVideoButton(false);
    } else {
      var playAttempt = video.play();
      if (playAttempt && playAttempt.catch) playAttempt.catch(function () { setVideoButton(false); });
    }
  }

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  var plannerForm = document.getElementById("trip-form");
  var draft = document.getElementById("trip-draft");
  var draftText = document.getElementById("trip-draft-text");
  var draftStatus = document.getElementById("trip-draft-status");
  var copyButton = document.getElementById("copy-trip-brief");

  if (plannerForm && draft && draftText && draftStatus) {
    plannerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!plannerForm.reportValidity()) return;

      var values = new FormData(plannerForm);
      var interests = selectedInterests().join(", ") || "Not selected";
      draftText.value = [
        "African Journal Safari Tours — Tanzania trip brief",
        "Name: " + values.get("name"),
        "Email: " + values.get("email"),
        "Travel dates: " + (values.get("dates") || "Flexible"),
        "Adults: " + values.get("adults"),
        "Children: " + (values.get("children") || "0"),
        "Interests: " + interests,
        "Budget or comfort level: " + (values.get("budget") || "Not specified"),
        "What would make this journey special: " + (values.get("notes") || "Not specified")
      ].join("\n");
      draft.hidden = false;
      draftStatus.textContent = "Your brief is ready to copy. No enquiry has been sent.";
      draft.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
  }

  if (copyButton && draftText && draftStatus) {
    copyButton.addEventListener("click", function () {
      if (!draftText.value) return;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(draftText.value).then(function () {
          draftStatus.textContent = "Trip brief copied. No enquiry has been sent.";
        }).catch(function () {
          draftText.focus();
          draftText.select();
          draftStatus.textContent = "Copy was blocked. The brief is selected so you can copy it manually.";
        });
      } else {
        draftText.focus();
        draftText.select();
        draftStatus.textContent = "The brief is selected so you can copy it manually. No enquiry has been sent.";
      }
    });
  }

})();
