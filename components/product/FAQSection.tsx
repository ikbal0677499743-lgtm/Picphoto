'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { faqItems } from '@/lib/constants'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-surface py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-serif font-black text-4xl text-center mb-4">Questions</h2>
        <p className="text-center text-muted mb-8">
          Find answers to frequently asked questions about our photobooks
        </p>

        {/* Book Thickness Visual */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {[
            { pages: 50, height: 'h-12' },
            { pages: 100, height: 'h-16' },
            { pages: 150, height: 'h-20' },
            { pages: 200, height: 'h-24' }
          ].map((book) => (
            <div key={book.pages} className="text-center">
              <div className={cn(
                "w-16 bg-white rounded-t border-2 border-gray-200 relative",
                book.height
              )}>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent"></div>
              </div>
              <p className="text-xs text-muted mt-2">{book.pages} pages</p>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-surface transition-colors"
              >
                <span className="font-semibold">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform flex-shrink-0 ml-4",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-muted leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
