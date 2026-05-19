import React from 'react'
import { ArrowRight } from 'lucide-react'

const YachtAddOns: React.FC = () => {
  const openWhatsApp = (addonName: string) => {
    const msg = encodeURIComponent(`Hi, I'd like to add the ${addonName} to my yacht charter. Can you help with details and pricing?`)
    window.open(`https://wa.me/15617774360?text=${msg}`, '_blank')
  }

  const addons = [
    {
      emoji: '🎈',
      name: 'Birthday Package',
      price: '$500',
      description: 'Balloons, cake, banner, party supplies'
    },
    {
      emoji: '🥂',
      name: 'Champagne & Celebration',
      price: '$250',
      description: '2 bottles premium champagne, glasses, ice'
    },
    {
      emoji: '👨‍🍳',
      name: 'Private Chef',
      price: '$150/person',
      description: 'Min 6, full multi-course meal on board'
    },
    {
      emoji: '🍽️',
      name: 'Catering Package',
      price: '$75/person',
      description: 'Appetizers, entrees, dessert delivered'
    },
    {
      emoji: '📸',
      name: 'Professional Photographer',
      price: '$400',
      description: '2hr session, edited photos delivered'
    },
    {
      emoji: '🎵',
      name: 'DJ / Live Music',
      price: '$600',
      description: 'DJ for 4hrs with sound equipment'
    },
    {
      emoji: '🌺',
      name: 'Romantic Setup',
      price: '$350',
      description: 'Rose petals, candles, champagne, charcuterie'
    },
    {
      emoji: '🎄',
      name: 'Holiday Decorations',
      price: '$300',
      description: 'Themed decor for any holiday'
    },
    {
      emoji: '🤿',
      name: 'Water Toys Package',
      price: '$200',
      description: 'Paddleboards, snorkel gear, floats'
    },
    {
      emoji: '🍾',
      name: 'Open Bar Package',
      price: '$50/person',
      description: 'Premium spirits, mixers, bartender'
    }
  ]

  return (
    <section className="py-16 bg-luxury-charcoal">
      <div className="container-max section-padding">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-luxury font-bold text-white mb-4">
            Yacht Charter <span className="text-gradient">Add-Ons</span>
          </h3>
          <p className="text-lg text-gray-400 mb-2">
            Elevate your charter experience with our premium add-on services
          </p>
          <p className="text-sm text-gray-500">
            Add-ons can be added at booking. Contact us for custom requests.
          </p>
        </div>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {addons.map((addon, index) => (
            <div key={index} className="luxury-card text-center group hover:scale-105 transition-all duration-300">
              {/* Emoji Icon */}
              <div className="text-4xl mb-4">
                {addon.emoji}
              </div>

              {/* Add-on Info */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white text-sm leading-tight">
                  {addon.name}
                </h4>
                
                <div className="text-luxury-gold font-bold text-lg">
                  {addon.price}
                </div>
                
                <p className="text-gray-400 text-xs leading-relaxed">
                  {addon.description}
                </p>

                {/* Add to Charter Button */}
                <button
                  onClick={() => openWhatsApp(addon.name)}
                  className="w-full bg-luxury-gold/10 hover:bg-luxury-gold text-luxury-gold hover:text-luxury-black border border-luxury-gold/30 hover:border-luxury-gold font-medium py-2 px-3 rounded-md transition-all duration-300 text-sm flex items-center justify-center space-x-1"
                >
                  <span>Add to Charter</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Request CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Need something special that's not listed? We can arrange custom add-ons for your charter.
          </p>
          <button
            onClick={() => openWhatsApp('custom yacht charter add-on request')}
            className="luxury-button-outline"
          >
            Request Custom Add-On
          </button>
        </div>
      </div>
    </section>
  )
}

export default YachtAddOns