import { BookOpen, Upload, Palette } from 'lucide-react'

export default function StepsSection() {
  const steps = [
    {
      number: '01',
      icon: BookOpen,
      title: 'Choose Your Template',
      description: 'Select from our curated collection of beautiful templates'
    },
    {
      number: '02',
      icon: Upload,
      title: 'Upload Your Photos',
      description: 'Add your favorite travel memories with ease'
    },
    {
      number: '03',
      icon: Palette,
      title: 'Customize Your Book',
      description: 'Personalize colors, text, and layouts to match your style'
    }
  ]

  return (
    <div className="bg-surface py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-serif font-black text-4xl text-center mb-12">
          As simple as 1, 2, 3
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
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
    </div>
  )
}
