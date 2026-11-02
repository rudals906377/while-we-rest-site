// Store links appear only after a verified public release URL is configured.
fetch('./release.json').then(r => { if (!r.ok) throw new Error('release'); return r.json(); }).then(data => {
  const platforms = [['app-store', data.appStoreUrl, /^https:\/\/apps\.apple\.com\//], ['google-play', data.googlePlayUrl, /^https:\/\/play\.google\.com\/store\/apps\/details\?/]];
  let available = 0;
  for (const [id, url, allowed] of platforms) {
    const el = document.getElementById(id);
    if (!el || typeof url !== 'string' || !allowed.test(url)) continue;
    const link = document.createElement('a'); link.href = url; link.textContent = '다운로드'; link.rel = 'noopener';
    el.replaceChildren(link); available++;
  }
  if (available === 2) {
    const title = document.getElementById('release-heading'), copy = document.getElementById('release-copy');
    if (title) title.textContent = '우리, 초원에서 만나요.';
    if (copy) copy.textContent = 'App Store와 Google Play에서 쉬는사이를 만나 보세요.';
  }
}).catch(() => { /* Keep the honest release-preparation state on an offline page. */ });
