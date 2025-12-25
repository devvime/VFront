export function click(element, callback) {
  const el = document.querySelector(`[${element}]`);

  if (el === undefined && el === null) {
    throw new Error(`Element ${element} is not found.`);
  }

  el.addEventListener('click', () => {
    callback()
    click(element, callback);
  });
}

export function CreateElement(html) {
  const template = document.createElement("template");
  template.innerHTML = (html || "").trim();
  return template.content.firstElementChild;
}
