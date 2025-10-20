export function SchemaMarkup() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    "@id": "https://pinkdogpetresort.com/#organization",
    "name": "PinkDog Pet Resort",
    "alternateName": "PinkDog Spa",
    "description": "Premium pet care services including 24/7 pet hotel, daycare, grooming & transport in Harvard, MA. Trusted since 2015.",
    "url": "https://pinkdogpetresort.com",
    "telephone": "+1-978-772-4242",
    "email": "pinkdogpetresort@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "259 Ayer Rd",
      "addressLocality": "Harvard",
      "addressRegion": "MA",
      "postalCode": "01451",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.5001,
      "longitude": -71.5828
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "12:00",
        "closes": "16:00"
      }
    ],
    "sameAs": [
      "https://instagram.com/pinkdogpetresort",
      "https://instagram.com/pinkdogspa",
      "https://facebook.com/pinkdogspa",
      "https://pinkdogspa.com"
    ],
    "image": [
      "https://pinkdogpetresort.com/images/pinkdogresort-metada.png",
      "https://pinkdogpetresort.com/images/pinkdog-mascots.png"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "currenciesAccepted": "USD",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pet Care Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pet Hotel",
            "description": "Luxurious 24/7 accommodations for your pets with comfortable beds and personalized attention"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Daycare",
            "description": "Supervised play and socialization for your pets in a safe environment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Grooming",
            "description": "Professional grooming services including bathing, trimming, and styling"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Van Service",
            "description": "Convenient pet transport to and from our facility"
          }
        }
      ]
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 42.5001,
        "longitude": -71.5828
      },
      "geoRadius": "50000"
    },
    "slogan": "Your Pet's Favorite Place!",
    "foundingDate": "2015",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "250"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pinkdogpetresort.com"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are your hours of operation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We are open Monday-Saturday from 8:30 AM to 5:00 PM, and Sunday from 12:00 PM to 4:00 PM."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer 24/7 pet care?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our pet hotel offers 24/7 supervision by trained professionals for overnight stays."
        }
      },
      {
        "@type": "Question",
        "name": "What services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer Pet Hotel (boarding), Daycare, Professional Grooming, and Van Transportation services."
        }
      },
      {
        "@type": "Question",
        "name": "Where are you located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our main facility is located at 259 Ayer Rd, Harvard, MA 01451. We also have spa locations in Sudbury, Boxborough, and Coconut Creek, FL."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
} 