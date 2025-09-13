(function(){
  // Simple Calendly inline embed; replace URL with your scheduling link
  const s = document.createElement('link');
  s.href = 'https://assets.calendly.com/assets/external/widget.css';
  s.rel = 'stylesheet';
  document.head.appendChild(s);
  const sc = document.createElement('script');
  sc.src = 'https://assets.calendly.com/assets/external/widget.js';
  sc.onload = function(){
    if(window.Calendly){
      Calendly.initInlineWidget({
        url: 'https://calendly.com/your-clinic/intro',
        parentElement: document.getElementById('calendly_embed'),
        prefill: {},
        utm: {}
      });
    }
  };
  document.head.appendChild(sc);
})();