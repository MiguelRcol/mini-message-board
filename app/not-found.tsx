export default function NotFoundPage() {
  return (
    <section className="error-page">
      <p className="error-code">404</p>
      <p className="eyebrow"><span /> Lost echo</p>
      <h1>Page not found</h1>
      <p>That page seems to have wandered off.</p>
      <a className="button button-primary" href="/">Return home <span aria-hidden="true">→</span></a>
    </section>
  );
}
