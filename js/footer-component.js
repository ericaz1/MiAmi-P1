(function () {
  if (window.__miamiFooterMounted) return;
  window.__miamiFooterMounted = true;

  const root = document.getElementById("site-footer");
  if (!root) return;

  root.outerHTML = `
<footer class="site-footer">
  <div class="site-footer__inner">
    <div class="site-footer__copy">
      <p>© 2024 Miami Hotel Ashdod.</p>
      <p>Glatt Kosher Lemehadrin.</p>
    </div>
    <div class="site-footer__links">
      <a href="#">תנאי שימוש</a>
      <a href="#">מדיניות פרטיות</a>
      <a href="#">נגישות</a>
    </div>
  </div>
</footer>
`;
})();
