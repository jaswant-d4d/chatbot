(function () {

  const BACKEND_URL = "https://chatbot-backend-ashen-theta.vercel.app";
  const script = document.currentScript;
  const url = new URL(document.currentScript.src);
  const company = script.dataset.company || url.searchParams.get("company");
  const token = script.dataset.token || url.searchParams.get("token");
  const domain = window.location.origin;

  // Build iframe URL with validation data
  const iframeUrl = `${BACKEND_URL}/widget?company=${encodeURIComponent(company)}&token=${encodeURIComponent(token)}&domain=${encodeURIComponent(domain)}`;

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.src = iframeUrl;
  iframe.style.position = "fixed";
  iframe.style.bottom = "24px";
  iframe.style.right = "24px";
  iframe.style.height = "90%";
  iframe.style.width = "375px";
  iframe.style.maxHeight = "725px";
  iframe.style.minWidth = "320px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "12px";
  iframe.style.zIndex = "999999999";


  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(iframe);
  });
})();
