import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Email */}
          <div>
            <h3 className="font-serif font-black text-2xl mb-4">picphoto</h3>
            <p className="text-sm text-gray-400">support@picphotoofficial.com</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Order Help</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">About Us</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
              <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
              <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-white transition-colors">TikTok</Link>
              <Link href="#" className="hover:text-white transition-colors">YouTube</Link>
            </div>
          </div>
        </div>

        {/* Payment Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-gray-800">
          <div className="bg-white/10 px-4 py-2 rounded text-xs font-medium">
            Visa
          </div>
          <div className="bg-white/10 px-4 py-2 rounded text-xs font-medium">
            Mastercard
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          © 2025 Picphoto. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
