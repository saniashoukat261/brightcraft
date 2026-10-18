

document.addEventListener("DOMContentLoaded", function () {

  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

 
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", navLinks.classList.contains("open") ? "true" : "false");
    });

    // close menu when a link is clicked (mobile)
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  let currentSlide = 0;
  let sliderInterval;

  function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(function (s) { s.classList.remove("active"); });
    dots.forEach(function (d) { d.classList.remove("active"); });
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) dots[currentSlide].classList.add("active");
  }

  function nextSlide() { showSlide(currentSlide + 1); }
  function prevSlide() { showSlide(currentSlide - 1); }

  function startAutoSlide() {
    sliderInterval = setInterval(nextSlide, 4500);
  }

  if (slides.length > 0) {
    showSlide(0);
    startAutoSlide();

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        nextSlide();
        clearInterval(sliderInterval);
        startAutoSlide();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prevSlide();
        clearInterval(sliderInterval);
        startAutoSlide();
      });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        showSlide(i);
        clearInterval(sliderInterval);
        startAutoSlide();
      });
    });

   
    const sliderBox = slides[0].parentElement;
    sliderBox.addEventListener("mouseenter", function () { clearInterval(sliderInterval); });
    sliderBox.addEventListener("mouseleave", function () { clearInterval(sliderInterval); startAutoSlide(); });
    let touchX = null;
    sliderBox.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    sliderBox.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) { dx < 0 ? nextSlide() : prevSlide(); clearInterval(sliderInterval); startAutoSlide(); }
      touchX = null;
    });
  }

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");
      faqItems.forEach(function (i) { i.classList.remove("open"); });
      if (!isOpen) item.classList.add("open");
      faqItems.forEach(function (i) {
        i.querySelector(".faq-question").setAttribute("aria-expanded", i.classList.contains("open") ? "true" : "false");
      });
    });
  });

  
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    const successBox = document.getElementById("form-success");

    function setError(groupId, show) {
      const group = document.getElementById(groupId);
      if (!group) return;
      if (show) {
        group.classList.add("invalid");
      } else {
        group.classList.remove("invalid");
      }
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("cf-name");
      const email = document.getElementById("cf-email");
      const subject = document.getElementById("cf-subject");
      const message = document.getElementById("cf-message");

      let valid = true;

      if (name.value.trim().length < 2) {
        setError("group-name", true);
        valid = false;
      } else {
        setError("group-name", false);
      }

      if (!isValidEmail(email.value.trim())) {
        setError("group-email", true);
        valid = false;
      } else {
        setError("group-email", false);
      }

      if (subject.value.trim().length < 3) {
        setError("group-subject", true);
        valid = false;
      } else {
        setError("group-subject", false);
      }

      if (message.value.trim().length < 10) {
        setError("group-message", true);
        valid = false;
      } else {
        setError("group-message", false);
      }

      if (valid) {
        successBox.classList.add("show");
        successBox.textContent = "Thanks, " + name.value.trim() + "! Your message has been sent. We'll get back to you soon.";
        contactForm.reset();
        setTimeout(function () {
          successBox.classList.remove("show");
        }, 6000);
      } else {
        successBox.classList.remove("show");
      }
    });
  }

  /* ---------- 6. Scroll-to-top button ---------- */
  const scrollTopBtn = document.getElementById("scroll-top");

  if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 7. Animated counters (About page) ---------- */
  const counters = document.querySelectorAll(".stat-number[data-target]");

  if (counters.length > 0) {
    let countersStarted = false;

    function animateCounters() {
      counters.forEach(function (counter) {
        const target = parseInt(counter.getAttribute("data-target"), 10);
        let current = 0;
        const duration = 1500;
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;

        const timer = setInterval(function () {
          current += increment;
          if (current >= target) {
            counter.textContent = target + "+";
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + "+";
          }
        }, stepTime);
      });
    }

    const statsSection = document.querySelector(".stats");

    if (statsSection) {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !countersStarted) {
              countersStarted = true;
              animateCounters();
            }
          });
        }, { threshold: 0.4 });
        observer.observe(statsSection);
      } else {
        animateCounters();
      }
    }
  }

  /* ---------- 9. Portfolio filter (bonus interactive extra) ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  if (filterButtons.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");

        portfolioCards.forEach(function (card) {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* ---------- 10. Services explorer (Services page) ---------- */
  const serviceData = [
    {
      id: "web", icon: "🖥️", category: "Development", title: "Web Design & Development",
      tagline: "Fast, responsive websites that look sharp and turn visitors into customers.",
      quote: "\"Your idea. Our code.\"",
      overview: "We design and hand-code custom websites with HTML, CSS and JavaScript — no bulky templates. Every site is tested on real phones, tablets and laptops before launch.",
      price: "From Rs. 25,000", bestFor: "Shops, startups, service businesses",
      features: ["Custom layout for every page", "Mobile, tablet and desktop responsive", "Contact form with validation", "Basic on-page SEO setup"],
      tools: ["HTML5", "CSS3", "JavaScript", "Git & GitHub"],
      deliverables: ["Up to 5 designed pages", "Source files you own", "Hosting and domain setup help", "One round of revisions"],
      timeline: [["Week 1", "Discovery call and wireframes"], ["Week 2", "Design and your feedback"], ["Week 3", "Build and testing"], ["Week 4", "Launch and handover"]],
      delivery: "3 – 4 weeks"
    },
    {
      id: "uiux", icon: "✏️", category: "Design", title: "UI/UX Design",
      tagline: "Clear, easy-to-use layouts your visitors don't have to think about.",
      quote: "\"Easy to use is easy to love.\"",
      overview: "We map out how visitors move through your site, then design simple screens that guide them to the action you want — calling, booking or buying.",
      price: "From Rs. 10,000", bestFor: "New sites and redesigns",
      features: ["User flow mapping", "Wireframes for key pages", "Clean visual design", "Mobile-first screens"],
      tools: ["Figma", "Wireframes", "Style guides"],
      deliverables: ["Wireframes", "Final page designs", "Colors and font guide", "Clickable preview"],
      timeline: [["Week 1", "Research and user flows"], ["Week 2", "Wireframes and review"], ["Week 3", "Final designs"]],
      delivery: "2 – 3 weeks"
    },
    {
      id: "seo", icon: "🔍", category: "Marketing", title: "SEO Optimization",
      tagline: "Get found on Google by the customers already looking for you.",
      quote: "\"Be the answer they search for.\"",
      overview: "We research the words your customers actually search, then fix titles, headings, speed and content so your pages rank higher over time.",
      price: "From Rs. 12,000", bestFor: "Businesses with an existing site",
      features: ["Keyword research", "Titles, meta tags and headings", "Image and speed improvements", "Monthly ranking report"],
      tools: ["Google Search Console", "Google Analytics", "Keyword planner"],
      deliverables: ["Keyword list", "Optimized pages", "Site audit report", "Monthly progress report"],
      timeline: [["Week 1", "Site audit and keyword research"], ["Week 2", "On-page fixes"], ["Week 3+", "Tracking and monthly reports"]],
      delivery: "2 weeks setup, then monthly"
    },
    {
      id: "branding", icon: "🎨", category: "Design", title: "Branding & Logo Design",
      tagline: "A simple, memorable identity that looks consistent everywhere.",
      quote: "\"Look like who you are.\"",
      overview: "We create your logo, color palette and fonts, then pull them together into a short guide so your business looks the same on its website, social media and print.",
      price: "From Rs. 8,000", bestFor: "New businesses and rebrands",
      features: ["2 logo concepts", "Color palette and fonts", "Basic brand guideline sheet", "Social media profile kit"],
      tools: ["Illustrator", "Figma", "Canva"],
      deliverables: ["Logo files (web and print)", "Brand guideline PDF", "Social media profile images"],
      timeline: [["Week 1", "Brief and mood board"], ["Week 2", "Logo concepts"], ["Week 3", "Revisions and final files"]],
      delivery: "2 – 3 weeks"
    },
    {
      id: "social", icon: "📱", category: "Marketing", title: "Social Media Marketing",
      tagline: "Content and campaigns that build an audience and bring in sales.",
      quote: "\"Be seen, be remembered.\"",
      overview: "We plan your monthly content, design the posts and run simple ad campaigns on Facebook and Instagram to reach customers near you.",
      price: "From Rs. 15,000 / mo", bestFor: "Local shops and restaurants",
      features: ["Monthly content calendar", "8 designed posts per month", "Basic ad campaign setup", "Monthly performance summary"],
      tools: ["Meta Business Suite", "Canva", "Analytics"],
      deliverables: ["Content calendar", "Designed posts", "Ad campaign", "Monthly report"],
      timeline: [["Week 1", "Strategy and calendar"], ["Week 2", "First posts go live"], ["Monthly", "Review results and adjust"]],
      delivery: "Ongoing monthly"
    },
    {
      id: "ecommerce", icon: "🛒", category: "Development", title: "E-Commerce Setup",
      tagline: "An online store so customers can browse and buy straight from you.",
      quote: "\"Open for business, 24/7.\"",
      overview: "We build product pages, a shopping cart and a simple checkout, so you can start taking orders online without a complicated setup.",
      price: "From Rs. 40,000", bestFor: "Shops moving online",
      features: ["Product and category pages", "Shopping cart and checkout", "Order notification emails", "Basic inventory tracking"],
      tools: ["HTML5", "CSS3", "JavaScript", "Payment gateway"],
      deliverables: ["Working online store", "Admin guide", "Payment setup help", "30 days of support"],
      timeline: [["Week 1-2", "Planning and design"], ["Week 3-4", "Store build"], ["Week 5", "Testing"], ["Week 6", "Launch"]],
      delivery: "5 – 6 weeks"
    },
    {
      id: "content", icon: "📝", category: "Marketing", title: "Content Writing",
      tagline: "Clear copy that sounds like your business, not a template.",
      quote: "\"Say it simply. Say it well.\"",
      overview: "We write the words for your website, product descriptions and blog posts in a friendly, plain voice that matches your brand.",
      price: "From Rs. 5,000", bestFor: "Sites that need fresh copy",
      features: ["Website page copy", "Product descriptions", "Blog posts", "SEO-friendly headings"],
      tools: ["Brand voice guide", "Keyword list", "Editing checks"],
      deliverables: ["Final copy in documents", "One round of edits", "Headline options"],
      timeline: [["Week 1", "Brief and outline"], ["Week 2", "First draft"], ["Week 3", "Edits and final copy"]],
      delivery: "1 – 3 weeks"
    },
    {
      id: "maintenance", icon: "🛠️", category: "Support", title: "Website Maintenance",
      tagline: "Ongoing care so your site keeps running smoothly after launch.",
      quote: "\"We keep it running.\"",
      overview: "We handle backups, small updates and checks every month, so you never have to touch any code or worry about something quietly breaking.",
      price: "From Rs. 5,000 / mo", bestFor: "Any live website",
      features: ["Monthly backups and security checks", "Small content and image updates", "Broken link and form checks", "Priority email support"],
      tools: ["Backups", "Uptime checks", "Analytics"],
      deliverables: ["Monthly report", "Updated content", "Backup copies"],
      timeline: [["Day 1", "Site review and backup"], ["Monthly", "Updates and checks"], ["As needed", "Support requests"]],
      delivery: "Ongoing monthly"
    }
  ];

  /* small line icons used on the Services page */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/>',
    overview: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="18" y2="18"/>',
    list: '<polyline points="4,6 6,8 9,4"/><line x1="12" y1="6" x2="20" y2="6"/><polyline points="4,13 6,15 9,11"/><line x1="12" y1="13" x2="20" y2="13"/><line x1="12" y1="19" x2="20" y2="19"/>',
    layers: '<polygon points="12,3 21,8 12,13 3,8"/><polyline points="3,12 12,17 21,12"/><polyline points="3,16 12,21 21,16"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><polyline points="9,13 11,15 15,11"/>',
    clock: '<circle cx="12" cy="12" r="9"/><polyline points="12,7 12,12 15,14"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>'
  };

  function iconSvg(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || "") + '</svg>';
  }

  document.querySelectorAll(".ico[data-icon]").forEach(function (el) {
    el.innerHTML = iconSvg(el.getAttribute("data-icon"));
  });

  const serviceListEl = document.getElementById("service-list");

  if (serviceListEl) {
    const searchEl = document.getElementById("service-search");
    const emptyEl = document.getElementById("service-empty");
    const tabsEl = document.getElementById("service-tabs");
    const panelEl = document.getElementById("service-panel");
    const iconEl = document.getElementById("svc-icon");
    const catEl = document.getElementById("svc-cat");
    const titleEl = document.getElementById("svc-title");
    const taglineEl = document.getElementById("svc-tagline");
    const quoteEl = document.getElementById("svc-quote");
    const requestEl = document.getElementById("svc-request");

    let activeService = serviceData[0];
    let activeTab = "overview";

    function makeList(items) {
      const ul = document.createElement("ul");
      ul.className = "check-list";
      items.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      return ul;
    }

    function renderPanel() {
      const s = activeService;
      panelEl.innerHTML = "";

      if (activeTab === "overview") {
        const p = document.createElement("p");
        p.className = "panel-text";
        p.textContent = s.overview;
        panelEl.appendChild(p);

        const cards = document.createElement("div");
        cards.className = "overview-cards";

        function card(icon, title) {
          const c = document.createElement("div");
          c.className = "ov-card";
          const h = document.createElement("h4");
          h.innerHTML = '<span class="ico">' + iconSvg(icon) + '</span>';
          h.appendChild(document.createTextNode(title));
          c.appendChild(h);
          return c;
        }

        const c1 = card("list", "Key Features");
        c1.appendChild(makeList(s.features));
        const c2 = card("layers", "Technologies");
        const chips = document.createElement("div");
        chips.className = "chip-row";
        s.tools.forEach(function (t) {
          const chip = document.createElement("span");
          chip.className = "chip";
          chip.textContent = t;
          chips.appendChild(chip);
        });
        c2.appendChild(chips);
        const c3 = card("clipboard", "Deliverables");
        c3.appendChild(makeList(s.deliverables));
        const c4 = card("calendar", "Expected Delivery");
        c4.className += " ov-delivery";
        const big = document.createElement("div");
        big.className = "delivery-big";
        big.textContent = s.delivery;
        const small = document.createElement("div");
        small.className = "delivery-small";
        small.textContent = "From " + s.price.replace("From ", "");
        c4.appendChild(big);
        c4.appendChild(small);

        [c1, c2, c3, c4].forEach(function (c) { cards.appendChild(c); });
        panelEl.appendChild(cards);
      } else if (activeTab === "features") {
        panelEl.appendChild(makeList(s.features));
      } else if (activeTab === "deliverables") {
        panelEl.appendChild(makeList(s.deliverables));
      } else if (activeTab === "tools") {
        const chips = document.createElement("div");
        chips.className = "chip-row";
        s.tools.forEach(function (t) {
          const chip = document.createElement("span");
          chip.className = "chip";
          chip.textContent = t;
          chips.appendChild(chip);
        });
        panelEl.appendChild(chips);
      } else if (activeTab === "timeline") {
        const ol = document.createElement("ol");
        ol.className = "step-list";
        s.timeline.forEach(function (step) {
          const li = document.createElement("li");
          const when = document.createElement("strong");
          when.textContent = step[0];
          li.appendChild(when);
          li.appendChild(document.createTextNode(" " + step[1]));
          ol.appendChild(li);
        });
        panelEl.appendChild(ol);
      }
    }

    function renderDetail() {
      const s = activeService;
      iconEl.textContent = s.icon;
      catEl.textContent = s.category;
      titleEl.textContent = s.title;
      taglineEl.textContent = s.tagline;
      quoteEl.innerHTML = "";
      const vpIcon = document.createElement("div");
      vpIcon.className = "vp-icon";
      vpIcon.textContent = s.icon;
      const vpQuote = document.createElement("p");
      vpQuote.className = "vp-quote";
      vpQuote.textContent = s.quote.replace(/"/g, "");
      const vpStats = document.createElement("ul");
      vpStats.className = "vp-points";
      ["Free first consultation", "Clear, upfront pricing", "Support after launch"].forEach(function (text) {
        const li = document.createElement("li");
        li.textContent = text;
        vpStats.appendChild(li);
      });
      quoteEl.appendChild(vpIcon);
      quoteEl.appendChild(vpQuote);
      quoteEl.appendChild(vpStats);
      requestEl.setAttribute("href", "contact.html?service=" + encodeURIComponent(s.title));
      renderPanel();
    }

    function renderList(filter) {
      serviceListEl.innerHTML = "";
      const term = (filter || "").trim().toLowerCase();
      let count = 0;

      serviceData.forEach(function (s) {
        if (term && s.title.toLowerCase().indexOf(term) === -1 && s.category.toLowerCase().indexOf(term) === -1) return;
        count++;
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "explorer-item" + (s.id === activeService.id ? " active" : "");
        btn.textContent = s.icon + "  " + s.title;
        btn.addEventListener("click", function () {
          activeService = s;
          activeTab = "overview";
          setActiveTab();
          renderList(searchEl.value);
          renderDetail();
        });
        li.appendChild(btn);
        serviceListEl.appendChild(li);
      });

      emptyEl.style.display = count === 0 ? "block" : "none";
    }

    function setActiveTab() {
      tabsEl.querySelectorAll(".tab-btn").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-tab") === activeTab);
      });
    }

    tabsEl.querySelectorAll(".tab-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        activeTab = b.getAttribute("data-tab");
        setActiveTab();
        renderPanel();
      });
    });

    searchEl.addEventListener("input", function () {
      renderList(searchEl.value);
    });

    renderList("");
    renderDetail();
  }


  /* ---------- 11. Instant project estimate calculator (Services page) ---------- */
  const estimatorCard = document.querySelector(".estimator-card");

  if (estimatorCard) {
    const pricingModel = {
      web: { label: "🖥️ Web Design", base: 25000, perUnit: 3000, unitLabel: "pages", title: "Number of pages", unitMin: 3, unitMax: 10, unitDefault: 5, unitStep: 1, deliveryBaseWeeks: 2, deliveryPerUnit: 0.4, recurring: false, includes: "Custom responsive pages, contact form and basic SEO." },
      uiux: { label: "✏️ UI/UX Design", base: 10000, perUnit: 1000, unitLabel: "screens", title: "Number of screens", unitMin: 3, unitMax: 15, unitDefault: 6, unitStep: 1, deliveryBaseWeeks: 1, deliveryPerUnit: 0.15, recurring: false, includes: "User flows, wireframes and final designs with a clickable preview." },
      seo: { label: "🔍 SEO", base: 12000, perUnit: 500, unitLabel: "pages optimized", title: "Pages to optimize", unitMin: 3, unitMax: 15, unitDefault: 5, unitStep: 1, deliveryBaseWeeks: 1, deliveryPerUnit: 0.1, recurring: false, includes: "Keyword research, on-page fixes, speed tips and a ranking report." },
      branding: { label: "🎨 Branding", base: 8000, perUnit: 1500, unitLabel: "deliverables", title: "Number of deliverables", unitMin: 2, unitMax: 8, unitDefault: 4, unitStep: 1, deliveryBaseWeeks: 1, deliveryPerUnit: 0.3, recurring: false, includes: "Logo concepts, colors, fonts and a short brand guide." },
      social: { label: "📱 Social Media", base: 7000, perUnit: 1000, unitLabel: "posts / month", title: "Posts per month", unitMin: 4, unitMax: 16, unitDefault: 8, unitStep: 1, deliveryBaseWeeks: 1, deliveryPerUnit: 0.1, recurring: true, includes: "Content calendar, designed posts and a monthly performance report." },
      ecommerce: { label: "🛒 E-Commerce", base: 30000, perUnit: 500, unitLabel: "products", title: "Number of products", unitMin: 10, unitMax: 100, unitDefault: 20, unitStep: 10, deliveryBaseWeeks: 3, deliveryPerUnit: 0.03, recurring: false, includes: "Product pages, cart, checkout and order emails." },
      content: { label: "📝 Content Writing", base: 2000, perUnit: 1000, unitLabel: "pages / articles", title: "Pages or articles", unitMin: 1, unitMax: 10, unitDefault: 3, unitStep: 1, deliveryBaseWeeks: 0.5, deliveryPerUnit: 0.3, recurring: false, includes: "Website copy or blog posts in your brand voice, with one round of edits." },
      maintenance: { label: "🛠️ Maintenance", base: 3000, perUnit: 500, unitLabel: "updates / month", title: "Updates per month", unitMin: 2, unitMax: 10, unitDefault: 4, unitStep: 1, deliveryBaseWeeks: 1, deliveryPerUnit: 0, recurring: true, includes: "Backups, security checks, small updates and priority support." }
    };

    const complexityMult = { basic: 0.85, standard: 1, advanced: 1.3 };
    const timelineMult = { standard: 1, priority: 1.15, rush: 1.35 };
    const timelineDeliveryMult = { standard: 1, priority: 0.85, rush: 0.65 };

    const servicePills = document.getElementById("service-pills");
    if (servicePills) {
      servicePills.innerHTML = "";
      Object.keys(pricingModel).forEach(function (key, i) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "pill-btn" + (i === 0 ? " active" : "");
        b.setAttribute("data-service", key);
        b.textContent = pricingModel[key].label;
        servicePills.appendChild(b);
      });
    }
    const includesEl = document.getElementById("estimate-includes");
    const complexityPills = document.getElementById("complexity-pills");
    const timelinePills = document.getElementById("timeline-pills");
    const unitSlider = document.getElementById("unit-slider");
    const unitLabelEl = document.getElementById("unit-label");
    const unitValueEl = document.getElementById("unit-value");

    const priceEl = document.getElementById("estimate-price");
    const deliveryEl = document.getElementById("estimate-delivery");
    const barA = document.getElementById("bar-seg-a");
    const barB = document.getElementById("bar-seg-b");
    const barC = document.getElementById("bar-seg-c");
    const amtA = document.getElementById("amt-a");
    const amtB = document.getElementById("amt-b");
    const amtC = document.getElementById("amt-c");

    let state = { service: "web", complexity: "standard", timeline: "standard" };

    function formatRs(n) {
      return "Rs. " + Math.round(n).toLocaleString();
    }

    function setActivePill(group, attr, value) {
      group.querySelectorAll(".pill-btn").forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute(attr) === value);
      });
    }

    function syncSliderToService() {
      const model = pricingModel[state.service];
      unitSlider.min = model.unitMin;
      unitSlider.max = model.unitMax;
      unitSlider.step = model.unitStep;
      unitSlider.value = model.unitDefault;
      unitLabelEl.textContent = model.title;
      if (includesEl) includesEl.textContent = "Includes: " + model.includes;
    }

    function recalculate() {
      const model = pricingModel[state.service];
      const units = parseInt(unitSlider.value, 10);

      unitValueEl.textContent = units + " " + model.unitLabel;

      const rawTotal = (model.base + model.perUnit * units) * complexityMult[state.complexity] * timelineMult[state.timeline];
      const low = Math.round(rawTotal * 0.92 / 500) * 500;
      const high = Math.round(rawTotal * 1.08 / 500) * 500;

      const suffix = model.recurring ? " / mo" : "";
      priceEl.textContent = formatRs(low) + " – " + formatRs(high) + suffix;

      const weeks = Math.max(1, Math.round((model.deliveryBaseWeeks + model.deliveryPerUnit * units) * timelineDeliveryMult[state.timeline] * 2) / 2);
      deliveryEl.textContent = model.recurring
        ? "⏱ Ongoing monthly retainer — setup in " + weeks + " week" + (weeks !== 1 ? "s" : "")
        : "⏱ Estimated delivery: " + weeks + " week" + (weeks !== 1 ? "s" : "");

      const designAmt = rawTotal * 0.30;
      const execAmt = rawTotal * 0.55;
      const supportAmt = rawTotal * 0.15;

      barA.style.width = "30%";
      barB.style.width = "55%";
      barC.style.width = "15%";

      amtA.textContent = formatRs(designAmt);
      amtB.textContent = formatRs(execAmt);
      amtC.textContent = formatRs(supportAmt);
    }

    if (servicePills) {
      servicePills.querySelectorAll(".pill-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.service = btn.getAttribute("data-service");
          setActivePill(servicePills, "data-service", state.service);
          syncSliderToService();
          recalculate();
        });
      });
    }

    if (complexityPills) {
      complexityPills.querySelectorAll(".pill-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.complexity = btn.getAttribute("data-complexity");
          setActivePill(complexityPills, "data-complexity", state.complexity);
          recalculate();
        });
      });
    }

    if (timelinePills) {
      timelinePills.querySelectorAll(".pill-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.timeline = btn.getAttribute("data-timeline");
          setActivePill(timelinePills, "data-timeline", state.timeline);
          recalculate();
        });
      });
    }

    if (unitSlider) {
      unitSlider.addEventListener("input", recalculate);
    }

    syncSliderToService();
    recalculate();
  }

  /* ---------- 12. Team member details modal (About page) ---------- */
  const teamDetails = {
    ah: {
      name: "Ayesha Hassan",
      role: "Founder & Web Designer",
      tone: "tone-b",
      initials: "AH",
      bio: "Ayesha started BrightCraft as a one-person freelance project and still designs the first draft of every website herself before the team builds it out.",
      skills: ["Web Design", "Client Strategy", "HTML/CSS"],
      joined: "With BrightCraft since 2023"
    },
    bk: {
      name: "Bilal Khan",
      role: "Front-End Developer",
      tone: "tone-a",
      initials: "BK",
      bio: "Bilal turns finished designs into fast, responsive, bug-free code, and double-checks every site on real phones before it ships.",
      skills: ["HTML & CSS", "JavaScript", "Responsive Layouts"],
      joined: "With BrightCraft since 2024"
    },
    sm: {
      name: "Sana Malik",
      role: "SEO Specialist",
      tone: "tone-b",
      initials: "SM",
      bio: "Sana researches keywords and fine-tunes every page so clients actually get found by the customers searching for them.",
      skills: ["Keyword Research", "On-Page SEO", "Analytics"],
      joined: "With BrightCraft since 2024"
    },
    ur: {
      name: "Usman Raza",
      role: "Digital Marketer",
      tone: "tone-a",
      initials: "UR",
      bio: "Usman plans and runs the social media and ad campaigns that bring steady, real customers to our clients' doors.",
      skills: ["Social Media Ads", "Content Calendars", "Campaign Reporting"],
      joined: "With BrightCraft since 2024"
    },
    ht: {
      name: "Hamza Tariq",
      role: "Back-End Developer",
      tone: "tone-b",
      initials: "HT",
      bio: "Hamza builds the server-side logic behind bookings, checkouts and forms — the parts of a site visitors never see but always rely on.",
      skills: ["Server-Side Logic", "Databases", "APIs"],
      joined: "With BrightCraft since 2025"
    },
    mi: {
      name: "Mahnoor Iqbal",
      role: "UI/UX Designer",
      tone: "tone-a",
      initials: "MI",
      bio: "Mahnoor designs layouts that are easy to use first and good-looking second — though she rarely has to choose between the two.",
      skills: ["Wireframing", "Visual Design", "User Testing"],
      joined: "With BrightCraft since 2025"
    },
    ar: {
      name: "Ali Raza",
      role: "Project Manager",
      tone: "tone-b",
      initials: "AR",
      bio: "Ali keeps every project on schedule and on budget, and is usually the first person a client hears back from.",
      skills: ["Scheduling", "Client Communication", "Budgeting"],
      joined: "With BrightCraft since 2025"
    },
    fn: {
      name: "Fatima Noor",
      role: "Content Strategist",
      tone: "tone-a",
      initials: "FN",
      bio: "Fatima writes the words that go on every site — copy that sounds like the business it belongs to, not a generic template.",
      skills: ["Copywriting", "Brand Voice", "Content Planning"],
      joined: "With BrightCraft since 2026"
    }
  };

  const teamCards = document.querySelectorAll(".team-card[data-member]");
  const teamModal = document.getElementById("team-modal");

  if (teamCards.length > 0 && teamModal) {
    const tmAvatar = document.getElementById("team-modal-avatar");
    const tmName = document.getElementById("team-modal-name");
    const tmRole = document.getElementById("team-modal-role");
    const tmBio = document.getElementById("team-modal-bio");
    const tmSkills = document.getElementById("team-modal-skills");
    const tmJoined = document.getElementById("team-modal-joined");
    const tmClose = document.getElementById("team-modal-close");

    function openTeamModal(key) {
      const person = teamDetails[key];
      if (!person) return;

      tmAvatar.textContent = person.initials;
      tmAvatar.className = "team-avatar modal-team-avatar " + person.tone;
      tmName.textContent = person.name;
      tmRole.textContent = person.role;
      tmBio.textContent = person.bio;
      tmJoined.textContent = person.joined;

      tmSkills.innerHTML = "";
      person.skills.forEach(function (skill) {
        const li = document.createElement("li");
        li.textContent = skill;
        tmSkills.appendChild(li);
      });

      teamModal.classList.add("show");
      document.body.style.overflow = "hidden";
    }

    function closeTeamModal() {
      teamModal.classList.remove("show");
      document.body.style.overflow = "";
    }

    teamCards.forEach(function (card) {
      card.addEventListener("click", function () {
        openTeamModal(card.getAttribute("data-member"));
      });
    });

    if (tmClose) tmClose.addEventListener("click", closeTeamModal);

    teamModal.addEventListener("click", function (e) {
      if (e.target === teamModal) closeTeamModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && teamModal.classList.contains("show")) {
        closeTeamModal();
      }
    });
  }

  /* ---------- 13. Service details modal (Services page) ---------- */
  const serviceCards = document.querySelectorAll(".service-card[data-service]");
  const serviceModal = document.getElementById("service-modal");

  if (serviceCards.length > 0 && serviceModal) {
    const smIcon = document.getElementById("modal-icon");
    const smTitle = document.getElementById("modal-title");
    const smDesc = document.getElementById("modal-desc");
    const smFeatures = document.getElementById("modal-features");
    const smPrice = document.getElementById("modal-price");
    const smClose = document.getElementById("modal-close");
    let lastCard = null;

    function openServiceModal(key, card) {
      const svc = serviceData.find(function (s) { return s.id === key; });
      if (!svc) return;

      smIcon.textContent = svc.icon;
      smTitle.textContent = svc.title;
      smDesc.textContent = svc.overview;
      smPrice.textContent = svc.price + (svc.delivery ? "  ·  Delivery: " + svc.delivery : "");

      smFeatures.innerHTML = "";
      (svc.features || []).concat(svc.deliverables || []).forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        smFeatures.appendChild(li);
      });

      lastCard = card;
      serviceModal.classList.add("show");
      document.body.style.overflow = "hidden";
      if (smClose) smClose.focus();
    }

    function closeServiceModal() {
      serviceModal.classList.remove("show");
      document.body.style.overflow = "";
      if (lastCard) lastCard.focus();
    }

    serviceCards.forEach(function (card) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.addEventListener("click", function () {
        openServiceModal(card.getAttribute("data-service"), card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openServiceModal(card.getAttribute("data-service"), card);
        }
      });
    });

    if (smClose) smClose.addEventListener("click", closeServiceModal);

    serviceModal.addEventListener("click", function (e) {
      if (e.target === serviceModal) closeServiceModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && serviceModal.classList.contains("show")) {
        closeServiceModal();
      }
    });
  }

});


/* ---------- Scroll reveal for How We Work / Our Values / Our Simple Process ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".steps .step, .value-num-item, .section-alt .card-grid .service-card:not([data-service])");
  if (!items.length) return;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  items.forEach(function (el, i) {
    el.classList.add("reveal");
    const isStep = el.classList.contains("step");
    const idx = isStep ? Array.prototype.indexOf.call(el.parentNode.children, el) : i % 4;
    el.style.setProperty("--d", idx * (isStep ? 0.35 : 0.12) + "s");
  });

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(function (el) { io.observe(el); });

  const lines = document.querySelectorAll(".steps");
  if (lines.length) {
    const io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("go"); io2.unobserve(entry.target); }
      });
    }, { threshold: 0.25 });
    lines.forEach(function (l) { io2.observe(l); });
  }
});