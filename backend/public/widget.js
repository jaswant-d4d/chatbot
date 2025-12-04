
(function () {
  const BACKEND_URL = "https://chatbot-backend-ashen-theta.vercel.app";

  // Read query params from script tag
  const script = document.currentScript;
  const url = new URL(document.currentScript.src);
  const company = script.dataset.company || url.searchParams.get("company");
  const token = script.dataset.token || url.searchParams.get("token");
  const domain = window.location.hostname;

  if (!company || !token) {
    console.error("❌ Missing data-company or data-token attributes in widget.js script tag");
    return;
  }

  // Build iframe URL with validation data
  const iframeUrl = `${BACKEND_URL}/widget?company=${encodeURIComponent(company)}&token=${encodeURIComponent(token)}&domain=${encodeURIComponent(domain)}`;


  /* ---------------------------
          CHAT BUTTON (FLOAT)
  ---------------------------- */
  const chatBtn = document.createElement("button");

  // same Tailwind-like fixed placement
  chatBtn.style.position = "fixed";
  chatBtn.style.bottom = "16px"; // bottom-4
  chatBtn.style.right = "16px";  // right-4

  // responsive breakpoints (sm:bottom-10 sm:right-10)
  if (window.innerWidth >= 640) {
    chatBtn.style.bottom = "40px";
    chatBtn.style.right = "40px";
  }

  // base styles
  chatBtn.style.zIndex = "999999999";
  chatBtn.style.transition = "all 0.3s ease";
  chatBtn.style.boxShadow = "0px 5px 20px rgba(0,0,0,0.22)";
  chatBtn.style.borderRadius = "30px";   // rounded-4xl
  chatBtn.style.padding = "0";           // no default padding
  chatBtn.style.border = "none";
  chatBtn.style.background = "transparent";
  chatBtn.style.cursor = "pointer";

  // scale hover effect
  chatBtn.onmouseenter = () => {
    chatBtn.style.transform = "scale(1.15)";
  };
  chatBtn.onmouseleave = () => {
    chatBtn.style.transform = "scale(1)";
  };

  // image icon
  const iconImg = document.createElement("img");
  iconImg.src = "https://chatbot-backend-ashen-theta.vercel.app/images/chat-icon.png"; // 🔥 Put your ChatIcon here
  iconImg.style.width = "40px";   // h-10
  iconImg.style.height = "40px";  // w-10
  iconImg.style.borderRadius = "999px"; // rounded-full
  iconImg.style.objectFit = "cover";

  chatBtn.appendChild(iconImg);


  /* ---------------------------
           IFRAME CHATBOX
  ---------------------------- */
  const iframe = document.createElement("iframe");
  iframe.src = iframeUrl;
  iframe.style.position = "fixed";
  iframe.style.bottom = "24px";
  iframe.style.right = "24px";

  // 🔥 PERFECT RESPONSIVE SIZING  
  iframe.style.width = "375px";     // desktop perfect width
  iframe.style.maxWidth = "90vw";   // mobile responsive
  iframe.style.minWidth = "320px";

  iframe.style.height = "80vh";     // proportional height
  iframe.style.maxHeight = "680px"; // ideal height
  iframe.style.border = "none";
  iframe.style.borderRadius = "16px";

  iframe.style.transform = "translateY(20px) scale(0.92)";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  iframe.style.zIndex = "999999999";
  iframe.style.transition = "all 0.35s ease";

  let isOpen = false;

  /* ---------------------------
         OPEN / CLOSE CHAT
  ---------------------------- */
  function toggleChatbot() {
    if (!isOpen) {
      // OPEN
      iframe.style.opacity = "1";
      iframe.style.transform = "translateY(0px) scale(1)";
      iframe.style.pointerEvents = "auto";
      iframe.style.boxShadow = "0px 20px 45px rgba(0,0,0,0.25)";

      chatBtn.style.display = "none";
    } else {
      // CLOSE
      iframe.style.opacity = "0";
      iframe.style.transform = "translateY(20px) scale(0.92)";
      iframe.style.pointerEvents = "none";
      iframe.style.boxShadow = "none";

      chatBtn.style.display = "flex";
    }
    isOpen = !isOpen;
  }

  chatBtn.addEventListener("click", toggleChatbot);

  /* ---------------------------
         ADD TO PAGE
  ---------------------------- */
  document.body.appendChild(chatBtn);
  document.body.appendChild(iframe);
})();
