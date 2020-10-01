function resize() {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
}
export const setResizeListeners = ($el, query) => {
    const targets = $el.querySelectorAll(query);
    targets.forEach(target => {
        console.log("target.style.height", target.style.height);
        console.log(target);
        console.log("object", target.value);
        if (target.value) target.style.height = `${target.scrollHeight}px`;
        else target.style.height = `auto`;
        target.addEventListener("input", resize);
        target.addEventListener("change", resize);
    });
};
