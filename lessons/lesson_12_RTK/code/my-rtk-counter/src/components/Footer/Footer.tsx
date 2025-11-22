export default function Footer() {
  return (
    <footer className='bg-gray-800 text-white'>
      <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>RTK-App</h3>
            <p className='text-gray-400'>
              Your one-stop shop for all your needs. Quality products, great
              prices, and excellent service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <a
                  href='/products'
                  className='hover:text-white transition-colors'
                >
                  Products
                </a>
              </li>
              <li>
                <a href='/about' className='hover:text-white transition-colors'>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href='/contact'
                  className='hover:text-white transition-colors'
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href='/privacy'
                  className='hover:text-white transition-colors'
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>Email: info@shopapp.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Commerce St, City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-gray-700 mt-8 pt-6 text-center text-gray-400'>
          <p>&copy; 2025 RTK-App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
