/** Alpine component: product detail TOC + section spy. */
export function registerProductHub() {
  if (!window.Alpine) return

  window.Alpine.data("productHub", () => ({
    active: "overview",
    observer: null,
    init() {
      const sections = document.querySelectorAll("[data-product-section]")
      if (!sections.length || !("IntersectionObserver" in window)) return
      this.observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          if (visible) this.active = visible.target.id
        },
        { rootMargin: "-28% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
      )
      sections.forEach((s) => this.observer.observe(s))
    },
    goTo(id) {
      const el = document.getElementById(id)
      if (!el) return
      this.active = id
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      history.replaceState(null, "", "#" + id)
    },
  }))
}
