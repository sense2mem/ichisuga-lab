(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("site-nav");
  if (!menuButton || !navigation) return;

  const compactLayout = window.matchMedia("(max-width: 900px)");
  const menuLabel = menuButton.querySelector(".menu-label");

  function setMenuOpen(open) {
    menuButton.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
    if (menuLabel) menuLabel.textContent = open ? "閉じる" : "メニュー";
  }

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      // Keep focus visible when the compact navigation collapses.
      if (compactLayout.matches) menuButton.focus();
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) setMenuOpen(false);
  });

  function resetMenu() {
    const focusedMenuButton = document.activeElement === menuButton;
    const focusedNavigation = navigation.contains(document.activeElement);
    setMenuOpen(false);
    if (compactLayout.matches && focusedNavigation) menuButton.focus();
    if (!compactLayout.matches && focusedMenuButton) navigation.querySelector("a")?.focus();
  }

  if (compactLayout.addEventListener) compactLayout.addEventListener("change", resetMenu);
  else compactLayout.addListener(resetMenu);

  // Without JavaScript, navigation stays visible at every width.
  document.documentElement.classList.add("nav-enhanced");
  menuButton.hidden = false;

  // Accommodate wrapped labels and enlarged text in the sticky header.
  const header = document.querySelector(".site-header");
  if (header && "ResizeObserver" in window) {
    const headerObserver = new ResizeObserver(() => {
      document.documentElement.style.scrollPaddingTop = `${header.offsetHeight + 16}px`;
    });
    headerObserver.observe(header);
  }
})();
