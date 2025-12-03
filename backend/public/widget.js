(function () {

  const BACKEND_URL = "https://chatbot-backend-ashen-theta.vercel.app";
  const script = document.currentScript;
  const url = new URL(document.currentScript.src);
  const company = script.dataset.company || url.searchParams.get("company");
  const token = script.dataset.token || url.searchParams.get("token");
  const domain = window.location.origin;

  if (!company || !token) {
    console.error("❌ Missing data-company or data-token attributes in widget.js script tag");
    return;
  }

  // Build iframe URL with validation data
  const iframeUrl = `${BACKEND_URL}/widget?company=${encodeURIComponent(company)}&token=${encodeURIComponent(token)}&domain=${encodeURIComponent(domain)}`;

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.src = iframeUrl;
  iframe.style.position = "fixed";
  iframe.style.bottom = "24px";
  iframe.style.right = "24px";
  iframe.style.height = "100%";
  iframe.style.maxHeight = "725px";
  iframe.style.width = "320px";
  iframe.style.maxWidth = "375px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "12px";
  iframe.style.zIndex = 99999999999999;
  iframe.style.pointerEvents = "auto";

  document.body.appendChild(iframe);
})();