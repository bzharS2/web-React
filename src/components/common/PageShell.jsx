import { Link } from "react-router-dom";

export default function PageShell({ title, eyebrow, actions, children, className = "" }) {
  return (
    <div className={`page-shell ${className}`.trim()}>
      <div className="page-shell__inner">
        <header className="page-shell__header">
          <div className="page-shell__eyebrow">{eyebrow}</div>
          <h1 className="page-shell__title">{title}</h1>
          {actions && <div className="page-shell__actions">{actions}</div>}
        </header>

        <main className="page-shell__content">{children}</main>

        <footer className="page-shell__footer">
          <Link to="/" className="nav-link nav-link--ghost">⬅ Back</Link>
        </footer>
      </div>
    </div>
  );
}
