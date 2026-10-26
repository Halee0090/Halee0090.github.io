// ---------- Tabs ----------
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

function selectTab(tab, focus = false) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
  });
  panels.forEach((p) => { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
  if (focus) tab.focus();
  history.replaceState(null, '', '#' + tab.getAttribute('aria-controls'));
  const bar = document.querySelector('.tabs-bar');
  if (window.scrollY > bar.offsetTop) window.scrollTo({ top: bar.offsetTop, behavior: 'smooth' });
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(next, true);
  });
});

// 주소에 #project, #contact 가 있으면 해당 탭으로 시작
const start = document.querySelector(`.tab[aria-controls="${location.hash.slice(1)}"]`);
if (start) selectTab(start);

// ---------- Modals ----------
document.querySelectorAll('[data-open]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const dlg = document.getElementById(btn.dataset.open);
    dlg.showModal();
    dlg.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  });
});
document.querySelectorAll('dialog.detail').forEach((dlg) => {
  dlg.querySelector('.close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); }); // 바깥 클릭 시 닫기
  dlg.addEventListener('close', () => { document.body.style.overflow = ''; });
});

// ---------- Terminal typing ----------
const lines = [
  ['$ ', 'whoami'],
  ['', '이하은 · Cloud / Infra Engineer (신입)', 'dim'],
  ['$ ', 'cat principles.txt'],
  ['', '증상과 원인을 구분하고, 로그로 근거를 확인합니다', 'dim'],
  ['$ ', 'terraform apply -auto-approve'],
  ['', '✔ EKS cluster active · 2 nodes Ready (private subnets)', 'ok'],
  ['$ ', 'jenkins build travelhunter-prod'],
  ['', '✔ build #17 · all stages passed · slack notified', 'ok'],
];
const out = document.getElementById('typed');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function render(upto, partial) {
  const html = lines.slice(0, upto).map(([p, t, c]) =>
    p ? `<span class="p">${p}</span>${t}` : `<span class="${c}">${t}</span>`).join('\n');
  out.innerHTML = html + (partial !== undefined ? (upto ? '\n' : '') + partial : '') + '<span class="cursor"></span>';
}

if (reduce) {
  render(lines.length);
} else {
  let li = 0, ci = 0;
  (function tick() {
    if (li >= lines.length) return render(lines.length);
    const [p, t, c] = lines[li];
    if (!p) { li++; render(li); return setTimeout(tick, 350); }   // 출력 줄은 한 번에
    ci++;
    render(li, `<span class="p">${p}</span>${t.slice(0, ci)}`);
    if (ci >= t.length) { li++; ci = 0; return setTimeout(tick, 280); }
    setTimeout(tick, 45);
  })();
}
