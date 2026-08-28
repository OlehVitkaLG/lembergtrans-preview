/* Мобільне меню.
   Панель збирається з тієї самої розмітки, що й десктопне меню, тому пункти
   не можуть розійтися між версіями. В Elementor це штатний віджет Nav Menu
   у режимі Mobile Dropdown — код нижче лише для прототипу. */
(function () {
  var header = document.querySelector('header.site');
  if (!header) return;
  var burger = header.querySelector('.burger');
  var nav = header.querySelector('nav.main');
  if (!burger || !nav) return;

  var ICON_MENU = burger.innerHTML;
  var ICON_CLOSE = '<svg class="ic" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"'
    + ' fill="currentColor" aria-hidden="true"><path d="M342.6 150.6c12.5-12.5 12.5-32.8'
    + ' 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8'
    + ' 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192'
    + ' 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';

  var panel = document.createElement('div');
  panel.className = 'mnav';
  panel.id = 'mnav';
  var inner = document.createElement('div');
  inner.className = 'mnav-inner';
  panel.appendChild(inner);

  var links = document.createElement('div');
  links.className = 'mnav-links';
  Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
    links.appendChild(a.cloneNode(true));
  });
  inner.appendChild(links);

  /* телефон і «Request a Quote» на цій ширині приховані в шапці —
     без них із меню не було б жодного способу подзвонити чи попросити ставку */
  var cta = header.querySelector('.head-cta');
  if (cta && cta.children.length) {
    var foot = document.createElement('div');
    foot.className = 'mnav-cta';
    Array.prototype.forEach.call(cta.children, function (el) {
      foot.appendChild(el.cloneNode(true));
    });
    inner.appendChild(foot);
  }

  header.appendChild(panel);
  burger.setAttribute('aria-controls', 'mnav');
  burger.setAttribute('aria-expanded', 'false');

  function setOpen(open) {
    panel.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    burger.innerHTML = open ? ICON_CLOSE : ICON_MENU;
  }
  function isOpen() { return panel.classList.contains('open'); }

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!isOpen());
  });

  /* закриття: пункт меню, клік поза шапкою, Escape, поворот у десктопну ширину */
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', function (e) {
    if (isOpen() && !header.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { setOpen(false); burger.focus(); }
  });
  window.addEventListener('resize', function () {
    if (isOpen() && window.innerWidth > 1060) setOpen(false);
  });
})();
