import styles from "./Footer.module.css";

const productLinks = ["Stories", "Videos", "Audiobooks", "Chat"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        {/* Top */}
        <div className={styles.footerTop}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <div className={styles.logoRow}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="url(#footerGrad)" />
                <circle cx="12" cy="13" r="3" fill="white" opacity="0.9" />
                <circle cx="20" cy="13" r="3" fill="white" opacity="0.9" />
                <path
                  d="M10 20 Q16 25 22 20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.9"
                />
                <defs>
                  <linearGradient id="footerGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ff6b6b" />
                  </linearGradient>
                </defs>
              </svg>
              <span className={styles.logoText}>plop</span>
            </div>
            <p className={styles.brandDesc}>
              A secure social platform where creativity meets community. Share stories,
              videos, and voices that matter.
            </p>
          </div>

          {/* Product Column */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Product</h4>
            <ul className={styles.colLinks}>
              {productLinks.map((label) => (
                <li key={label}>
                  <span className={styles.colLink}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Penbound Partners Private Limited. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with <span className={styles.heart}>♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
