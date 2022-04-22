/**
 * @type {Map<string, HTMLAnchorElement>}
 */
const links = new Map();

const blankOpen = (href = "") => {
  const link = links.get(href);
  if (link) link.click();
  else {
    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("target", "_blank");
    link.click();
    links.set(href, link);
  }
};

export default blankOpen;
