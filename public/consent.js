(() => {
  const id = 'G-HXM22WWPKP', key = 'cookie-analytics', vetoKey = 'neelkanth-analytics-denied';
  const read = (kind, name) => { try { return window[kind].getItem(name); } catch { return 'unavailable'; } };
  const write = (kind, name, value) => { try { window[kind].setItem(name, value); return window[kind].getItem(name) === value; } catch { return false; } };
  const clear = (kind, name) => { try { window[kind].removeItem(name); return window[kind].getItem(name) === null; } catch { return false; } };
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  let allowed = false, loaded = false;
  window['ga-disable-' + id] = true;
  window.gtag('consent', 'default', {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
  function apply(grant) {
    allowed = grant; window['ga-disable-' + id] = !grant;
    window.gtag('consent', 'update', {analytics_storage: grant ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
    if (grant && !loaded) {
      loaded = true;
      const script = document.createElement('script'); script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      document.head.appendChild(script); window.gtag('js', new Date()); window.gtag('config', id);
    }
  }
  apply(read('localStorage', key) === 'yes' && read('sessionStorage', vetoKey) === null);
  function choose(grant) {
    // Revoke the running library before attempting persistence.
    if (!grant) apply(false);
    const persisted = write('localStorage', key, grant ? 'yes' : 'no');
    const sessionSaved = grant ? clear('sessionStorage', vetoKey) : write('sessionStorage', vetoKey, 'yes');
    if (grant) apply(persisted && sessionSaved);
    const box = document.querySelector('#analytics'); if (box) box.checked = allowed;
    const status = document.querySelector('#status');
    if (status) status.textContent = persisted && sessionSaved
      ? (allowed ? 'विश्लेषण की अनुमति सुरक्षित है।' : 'विश्लेषण बंद है; आपकी पसंद सुरक्षित है।')
      : (grant ? 'ब्राउज़र में पसंद सुरक्षित नहीं हो सकी। इस पृष्ठ पर विश्लेषण बंद है; नए टैब या रीफ़्रेश पर फिर जाँचें।' : 'विश्लेषण इस पृष्ठ पर बंद है। पसंद पूरी तरह सुरक्षित नहीं हो सकी; नए टैब या रीफ़्रेश पर फिर जाँचें।');
    return {allowed, persisted, sessionSaved};
  }
  window.neelkanthConsent = {choose, get allowed() {return allowed;}};
  const box = document.querySelector('#analytics'); if (box) box.checked = allowed;
  document.querySelector('#save')?.addEventListener('click', () => choose(Boolean(box?.checked)));
  document.querySelector('#reject')?.addEventListener('click', () => choose(false));
})();
