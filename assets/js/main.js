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
