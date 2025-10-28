import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className='row'>
          {/* Company Info */}
          <div className='col-lg-4 col-md-6 mb-4'>
            <h5 className={styles.footerTitle}>MyReact</h5>
            <p className={styles.footerText}>
              Your one-stop destination for quality products. We offer the best
              selection with excellent customer service and fast delivery.
            </p>
            <div className={styles.socialLinks}>
              <a href='#' aria-label='Facebook'>
                <i className='bi bi-facebook'></i>
              </a>
              <a href='#' aria-label='Twitter'>
                <i className='bi bi-twitter'></i>
              </a>
              <a href='#' aria-label='Instagram'>
                <i className='bi bi-instagram'></i>
              </a>
              <a href='#' aria-label='LinkedIn'>
                <i className='bi bi-linkedin'></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className='col-lg-2 col-md-6 mb-4'>
            <h6 className={styles.footerSubtitle}>Quick Links</h6>
            <ul className={styles.footerLinks}>
              <li>
                <Link to='/home' className={styles.footerLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/products' className={styles.footerLink}>
                  Products
                </Link>
              </li>
              <li>
                <Link to='/carshop' className={styles.footerLink}>
                  Car Shop
                </Link>
              </li>
              <li>
                <Link to='/alcohol' className={styles.footerLink}>
                  Alcohol
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className='col-lg-2 col-md-6 mb-4'>
            <h6 className={styles.footerSubtitle}>Support</h6>
            <ul className={styles.footerLinks}>
              <li>
                <a href='#' className={styles.footerLink}>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className={styles.footerLink}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className={styles.footerLink}>
                  Shipping Info
                </a>
              </li>
              <li>
                <a href='#' className={styles.footerLink}>
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='col-lg-4 col-md-6 mb-4'>
            <h6 className={styles.footerSubtitle}>Contact Info</h6>
            <div className={styles.contactInfo}>
              <p>
                <i className='bi bi-geo-alt-fill me-2'></i>
                123 Commerce Street, City, State 12345
              </p>
              <p>
                <i className='bi bi-telephone-fill me-2'></i>
                +1 (555) 123-4567
              </p>
              <p>
                <i className='bi bi-envelope-fill me-2'></i>
                info@mystore.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className='row align-items-center'>
            <div className='col-md-6'>
              <p className={styles.copyright}>
                &copy; {currentYear} MyStore. All rights reserved.
              </p>
            </div>
            <div className='col-md-6'>
              <div className={styles.legalLinks}>
                <a href='#' className={styles.legalLink}>
                  Privacy Policy
                </a>
                <a href='#' className={styles.legalLink}>
                  Terms of Service
                </a>
                <a href='#' className={styles.legalLink}>
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
