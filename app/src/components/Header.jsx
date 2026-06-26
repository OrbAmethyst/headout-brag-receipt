const NAV = [
  "Bestsellers",
  "Uffizi Gallery",
  "Accademia Gallery Tickets",
  "Pitti Palace and Boboli Gardens",
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <div className="topbar">
          <a className="logo" href="#" aria-label="Headout home">
            <img className="logo-img" src="/assets/headout-wordmark%20purps.svg" alt="Headout logo. Link to home." />
          </a>

          <div className="search">
            <span>Search for</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4-4" />
            </svg>
          </div>

          <div className="top-right">
            <span className="lang">English / EUR</span>
            <a className="link" href="#">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7" />
                <circle cx="12" cy="17" r=".6" fill="currentColor" stroke="none" />
              </svg>
              Help
            </a>
            <span className="avatar" role="img" aria-label="Profile" />
          </div>
        </div>

        <nav className="site-nav">
          <div className="navrow">
            <a className="cats" href="#">
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1h18M1 7h18M1 13h18" />
              </svg>
              All Categories
            </a>
            {NAV.map((item) => (
              <a key={item} href="#">{item}</a>
            ))}
            <a className="app" href="#">
              <svg width="15" height="20" viewBox="0 0 15 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="1" y="1" width="13" height="18" rx="2.5" />
                <path d="M6 16h3" />
              </svg>
              Download app
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
