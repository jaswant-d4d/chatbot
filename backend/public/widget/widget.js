(function () {
  // Read query params from script tag
  const url = new URL(document.currentScript.src);
  const company = url.searchParams.get("company");
  const token = url.searchParams.get("token");
  const domain = window.location.hostname;
  console.log(url, company, token, domain, "//iframe>>>>>>>>>>>>>>>>>>>>>>>>")
  // Build iframe URL with all the info
  const iframeUrl = `https://chatbot-widget-seven-zeta.vercel.app/widget?company=${company}&token=${token}&domain=${domain}`;

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.src = iframeUrl;
  iframe.style.position = "fixed";
  iframe.style.height = "90%";
  iframe.style.bottom = "24px";
  iframe.style.right = "24px";
  iframe.style.maxWidth = "375px";
  iframe.style.maxHeight = "725px";
  iframe.style.minWidth = "320px";
  iframe.style.borderRadius = "8px";
  iframe.style.width = "100%";
  iframe.style.border = "none";
  iframe.style.zIndex = 9999999999999;
  iframe.style.borderRadius = "0px";
  iframe.style.pointerEvents = "auto";
  // iframe.style.boxShadow = "rgba(0, 0, 0, 0.12) 0px 12px 48px 4px";
  iframe.style.opacity = "1";
  iframe.style.visibility = "visible";

  document.body.appendChild(iframe);
})();
