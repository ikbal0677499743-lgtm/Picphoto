import Link from 'next/link'
import { BookOpen, Upload, Palette, Star, Truck, Shield, Users, ArrowRight } from 'lucide-react'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import CountdownTimer from '@/components/layout/CountdownTimer'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main>
      <AnnouncementBar />
      <Header />
      <CountdownTimer />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-accent-light/30 to-white"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-wide text-accent font-semibold">
                Custom Travel Photobooks
              </p>
              <h1 className="font-serif font-black text-5xl md:text-6xl lg:text-7xl leading-tight">
                Your travels,{' '}
                <span className="text-accent">beautifully</span> told.
              </h1>
              <p className="text-lg text-muted leading-relaxed">
                Create stunning personalized travel books in minutes with our beautiful templates,
                premium quality printing, and fast worldwide shipping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products/travel-photobook"
                  className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                >
                  Start Creating <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/products/travel-photobook"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-black rounded-xl font-semibold hover:bg-black hover:text-white transition-colors"
                >
                  Our Photobooks
                </Link>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted">
                  <span className="font-semibold text-black">100,000+</span> happy customers
                </p>
              </div>
            </div>

            {/* Right Column - Book Mockup */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-80 h-96 bg-white rounded-2xl shadow-2xl transform rotate-3 p-8 flex flex-col items-center justify-center border border-gray-200">
                <BookOpen className="w-24 h-24 text-accent mb-4" />
                <h3 className="font-serif font-black text-3xl text-center">PARIS 2025</h3>
                <p className="text-muted mt-2">Travel Memories</p>
              </div>
              <div className="absolute w-80 h-96 bg-gray-200 rounded-2xl shadow-xl transform -rotate-6 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* As Simple as 1,2,3 Section */}
      <section className="bg-surface py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif font-black text-4xl text-center mb-12">
            As simple as 1, 2, 3
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: '01',
                icon: BookOpen,
                title: 'Choose Your Template',
                description: 'Select from over 60 beautiful destination and themed templates designed by professionals'
              },
              {
                number: '02',
                icon: Upload,
                title: 'Upload Your Photos',
                description: 'Easily upload your travel photos and our smart system will help arrange them perfectly'
              },
              {
                number: '03',
                icon: Palette,
                title: 'Customize Your Book',
                description: 'Personalize colors, text, and layouts to create a unique photobook that tells your story'
              }
            ].map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-8 shadow-lg relative"
              >
                <div className="absolute top-4 right-4 text-6xl font-black text-gray-100">
                  {step.number}
                </div>
                <div className="relative">
                  <div className="bg-accent-light w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Star, text: 'Rated Excellent 4.8/5' },
              { icon: Truck, text: 'Fast Shipping' },
              { icon: Shield, text: '30-Day Guarantee' },
              { icon: Users, text: '100K+ Customers' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-3">
                <div className="bg-accent-light w-12 h-12 rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="font-semibold text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif font-black text-4xl md:text-5xl mb-4">
            Ready to create your book?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join over 100,000 happy customers who have preserved their travel memories with Picphoto
          </p>
          <Link
            href="/products/travel-photobook"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl font-semibold transition-colors"
          >
            Start Creating — 50% Off <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
