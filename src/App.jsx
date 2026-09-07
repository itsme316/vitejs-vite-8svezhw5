import React, { useState } from 'react';
import { 
  Calendar, MapPin, CheckCircle, Circle, Train, PartyPopper, 
  PlaneLanding, Navigation, Bike, Home, Clock, Users,
  Coffee, AlertCircle, Sparkles, Search, Briefcase, Shirt,
  Umbrella, BatteryCharging, CreditCard, Waves, Smartphone, Globe, Utensils
} from 'lucide-react';

const GROUPED_ARRIVALS = [
  {
    day: "Sep 20 (Day 0 - Pre-Arrival)",
    groups: [
      { flightTime: "08:40 AM", approxVillaTime: "10:15 AM", guys: ["Prasanna", "Ravi Kumar", "Vijay", "Jeddy", "Mki", "Seenu"] },
      { flightTime: "10:20 AM", approxVillaTime: "11:50 AM", guys: ["Jaggu"] },
      { flightTime: "10:35 AM", approxVillaTime: "12:05 PM", guys: ["Sandy"] },
      { flightTime: "12:20 PM", approxVillaTime: "01:50 PM", guys: ["Sameer"] }
    ]
  },
  {
    day: "Sep 21 (Day 1 - Reunion Kickoff)",
    groups: [
      { flightTime: "12:10 PM", approxVillaTime: "01:40 PM", guys: ["Mopa"] },
      { flightTime: "12:25 PM", approxVillaTime: "01:55 PM", guys: ["Susheel"] },
      { flightTime: "02:10 PM", approxVillaTime: "03:40 PM", guys: ["Sekhar (Ravi)"] }
    ]
  },
  {
    day: "Sep 23 (Day 3 - Crew Complete)",
    groups: [
      { flightTime: "10:40 AM", approxVillaTime: "12:10 PM", guys: ["Rami"] }
    ]
  }
];

const COFFEE_SPOTS = [
  {
    name: "Het Wapen van Zwanenburg",
    address: "Dennenlaan 119 (5-min walk / 2-min bike)",
    hours: "Daily: 12:00 PM - 10:00 PM",
    vibe: "Traditional local Dutch eatery & pub. Great patio for lunch, burgers, and drinks.",
    highlight: "Top Day 1 Group Lunch Spot"
  },
  {
    name: "De Echte Bakker",
    address: "Dennenlaan 65 (5-min walk / 2-min bike)",
    hours: "Mon-Fri: 7:00 AM | Sat: 6:30 AM",
    vibe: "Freshly baked croissants, warm Dutch pastries, espresso & cappuccinos.",
    highlight: "Best for early birds"
  },
  {
    name: "TIO’s Cafe",
    address: "Dennenlaan 17A (5-min walk)",
    hours: "Daily: 8:00 AM - 4:00 PM",
    vibe: "Cozy local specialty cafe serving crafted cappuccinos, lattes, and breakfast.",
    highlight: "Top coffee quality"
  },
  {
    name: "Albert Heijn Bakery & Coffee Bar",
    address: "Dennenlaan 43 (5-min walk)",
    hours: "Mon-Sat: 8:00 AM | Sun: 9:00 AM",
    vibe: "Bean-to-cup fresh espresso machine right by entrance + fresh warm croissants.",
    highlight: "Quick coffee + grocery run"
  }
];

const PACKING_GUIDE = [
  {
    category: "Beach, Swimwear & Coast 🏊‍♂️",
    icon: Waves,
    items: [
      "1-2 pairs of Swim Trunks / Swimwear (essential for Day 5 Zandvoort Beach Day, beach club lounges & sauna/spa options)",
      "Compact quick-dry travel towel or microfiber beach towel",
      "Sandals / Flip-flops for beach walking, terrace lounging, and villa indoors",
      "High-SPF Sunscreen (SPF 30+) & UV-protection sunglasses (water reflections on canal cruises & North Sea beach)"
    ]
  },
  {
    category: "Weather & Outerwear 🌧️",
    icon: Umbrella,
    items: [
      "Light waterproof rain jacket or trench (September in NL is mild ~14-18°C / 57-65°F with occasional light rain)",
      "1-2 warm hoodies, sweaters, or fleece jackets for cool autumn evenings",
      "Windbreaker jacket for Zandvoort coastal winds, Marken island dykes, and night canal cruises"
    ]
  },
  {
    category: "Footwear & Clothing 👟",
    icon: Shirt,
    items: [
      "1-2 pairs of ultra-comfortable walking sneakers (cobblestone streets + 12k-15k steps daily)",
      "Casual evening outfit / loafers for SkyLounge rooftop, fine dining & nightlife",
      "4-5 pairs of breathable cotton socks + comfortable jeans or casual chinos"
    ]
  },
  {
    category: "Tech & Power 🔌",
    icon: BatteryCharging,
    items: [
      "Type C/F European Plug Adapters (standard 230V 50Hz Dutch dual-pin sockets)",
      "10,000+ mAh Portable Power Bank (vital for full-day city tours, photos, and live Google Maps navigation)",
      "Multiport USB wall charger for charging multiple devices simultaneously at the villa"
    ]
  },
  {
    category: "Cards, Banking & Docs 💳",
    icon: CreditCard,
    items: [
      "Contactless Credit/Debit Card with NO FX fees enabled (Amsterdam transit & venues are 99% cashless)",
      "Passport + physical photo ID + printed/offline PDF flight & hotel vouchers",
      "Personal toiletries, prescription medications, allergy meds, and compact umbrella"
    ]
  }
];

const TRANSIT_GUIDE = {
  title: "Public Transit (OVpay) & Banking Guide",
  subtitle: "How train/tram payments work in the Netherlands + Essential Pre-work for US & India Travelers",
  rules: [
    {
      title: "How You Pay: OVpay (Contactless Tap In / Tap Out)",
      desc: "No paper train tickets needed! You simply tap your physical contactless credit/debit card, or phone (Apple Pay / Google Wallet) at the illuminated gates or platform posts when entering, and TAP OUT again when exiting."
    },
    {
      title: "CRITICAL: Strict 1 Card / 1 Device Per Traveler Rule ⚠️",
      desc: "You CANNOT tap multiple people using 1 credit card or 1 phone. Every single Bull MUST tap in and out using their OWN distinct physical card or distinct smart device. Tapping a card twice at a gate will throw an error or charge a penalty fee."
    },
    {
      title: "Tap In & Out With the EXACT SAME Device",
      desc: "If you tap IN with your physical Visa card, you MUST tap OUT with that exact physical card. Tapping IN with Apple Pay on phone and tapping OUT with physical card (even if linked to same bank account) will count as two separate incomplete trips, triggering a €20 penalty charge!"
    }
  ],
  travelerTypes: [
    {
      origin: "🇮🇳 Travelers Flying from India (MUST READ - MANDATORY PRE-WORK)",
      color: "border-amber-400 bg-amber-50/70",
      badge: "India Pre-Work Action Required",
      badgeColor: "bg-amber-100 text-amber-800",
      steps: [
        "Enable International Contactless in Bank App: RBI regulations require international NFC/contactless payments to be DISABLED BY DEFAULT on Indian debit/credit cards (HDFC, ICICI, SBI, Axis, Forex cards). You MUST log into your banking app before departure and toggle 'International Usage' and 'Contactless / Tap-to-Pay' to ON.",
        "Set Daily Transaction Limits: Ensure your card's international tap limit is set to at least ₹5,000 - ₹10,000 per day to cover multi-leg train/tram rides.",
        "Forex Card vs. Credit Card: Niyo Global, Axis Forex, or HDFC Multicurrency cards work seamlessly on OVpay as long as contactless is active. Always carry 1 backup physical credit card in case a primary card gets temporary fraud-flagged.",
        "SMS/OTP Dependency: Keep your Indian SIM roaming active to receive bank OTPs if your bank requires initial device verification for Apple Wallet / Google Pay."
      ]
    },
    {
      origin: "🇺🇸 Travelers Flying from the US (PRE-WORK & COST SAVINGS)",
      color: "border-indigo-400 bg-indigo-50/70",
      badge: "US Pre-Work Action Required",
      badgeColor: "bg-indigo-100 text-indigo-800",
      steps: [
        "Set Bank Travel Notices: Notify Chase, Amex, Citi, Capital One, or Bank of America of your trip to Netherlands. Unannounced foreign transit taps often trigger automated anti-fraud blocks on Day 1.",
        "Avoid 3% Foreign Transaction Fees: Use zero-FX fee cards like Chase Sapphire Reserve/Preferred, Capital One Venture, or Apple Card for transit taps. Standard debit/credit cards charge a 3% fee on every single train & tram ride!",
        "Amex Acceptance Note: American Express is supported on OVpay for NS trains, but Visa and Mastercard are far more universally accepted across GVB Amsterdam trams/metros and local buses. Carry at least one Visa or Mastercard."
      ]
    }
  ],
  proTips: [
    "Download the 'OVpay' App (iOS/Android): Link your credit card in the app to view real-time trip charges, check train fares, and request instant refunds if you ever forget to tap out.",
    "Halfweg-Zwanenburg to Amsterdam Centraal: Direct NS Sprinter train takes just 10 minutes and costs ~€3.40 each way.",
    "Direct Train to Beach (Day 5): Halfweg-Zwanenburg to Zandvoort aan Zee is a direct 20-min train. Just tap in at Halfweg and tap out at Zandvoort Beach!"
  ]
};

const ITINERARY_DATA = {
  0: {
    date: "Sep 20",
    title: "Pre-Arrival & Hotel Check-in 🏨",
    activities: [
      { 
        time: "08:40 AM - 01:50 PM", 
        task: "Rolling Flight Arrivals at Schiphol", 
        loc: "AMS Airport -> Corendon Hotel", 
        duration: "1.5h per group",
        commute: "15 min Hotel Shuttle Bus from Airport Stop A9",
        detail: "9 Bulls land across 4 flight windows (08:40 AM, 10:20 AM, 10:35 AM, 12:20 PM). Allow ~1.5 hrs for passport control, baggage claim, & shuttle transit to Corendon Hotel." 
      },
      { 
        time: "01:30 PM", 
        task: "Lunch: Corendon Bistro / Local Snack", 
        loc: "Badhoevedorp", 
        duration: "1h",
        commute: "On-site / 5 min walk",
        detail: "Casual burgers, Dutch Kroketten, or vegetarian sandwiches while waiting for rooms." 
      },
      { 
        time: "03:00 PM", 
        task: "Hotel Check-in", 
        loc: "Corendon Amsterdam Schiphol", 
        duration: "1h",
        commute: "N/A",
        detail: "Check into 3 Twin Rooms (Ref: 71243697). Power nap & freshen up." 
      },
      { 
        time: "05:00 PM", 
        task: "Initial Grocery Walk / Bike Run", 
        loc: "AH Badhoevedorp", 
        duration: "45 mins",
        commute: "10 min walk or quick bike ride",
        detail: "Stock up on bottled water, snacks, fruit, and arrival brews for the early squad." 
      },
      { 
        time: "07:30 PM", 
        task: "Dinner & Welcome Drinks", 
        loc: "Mondi SkyBar & Restaurant", 
        duration: "2.5h",
        commute: "Elevator up (Corendon Complex)",
        detail: "Caribbean fine dining & cocktails with outdoor views of the parked Boeing 747." 
      }
    ]
  },
  1: { 
    date: "Sep 21", 
    title: "Villa Move, Crew Arrival & All-Inclusive Canal Cruise 🥂", 
    activities: [
      { 
        time: "08:30 AM", 
        task: "Breakfast: Corendon Buffet", 
        loc: "Corendon Restaurant", 
        duration: "1h",
        commute: "On-site",
        detail: "Full breakfast spread with eggs, pastries, fruit, and coffee." 
      },
      { 
        time: "12:00 PM", 
        task: "Check-out Hotel -> Move to Villa HQ", 
        loc: "IJweg 179, Zwanenburg", 
        duration: "45 mins",
        commute: "10 min Uber / Taxi ride (~€18)",
        detail: "Migrate early crew to the Villa! Mopa (lands 12:10 PM) & Susheel (lands 12:25 PM) clear immigration/bags and arrive at Villa ~01:45-02:00 PM." 
      },
      { 
        time: "02:00 PM", 
        task: "Lunch: Het Wapen van Zwanenburg 🍔", 
        loc: "Dennenlaan 119 (Near Villa)", 
        duration: "1.5h",
        commute: "5 min walk / 2 min bike from Villa HQ",
        detail: "Welcome lunch with Mopa & Susheel at a cozy traditional Dutch pub/eatery right down the street while awaiting Sekhar." 
      },
      { 
        time: "03:45 PM", 
        task: "Sekhar Arrives & Villa Unpacking", 
        loc: "Zwanenburg Villa HQ", 
        duration: "1h",
        commute: "15 min Uber from Airport (Sekhar flight lands 02:10 PM)",
        detail: "Sekhar arrives at Villa! Room assignments, unpacking, and brief chill session." 
      },
      { 
        time: "05:00 PM", 
        task: "Villa Bike Grocery Run 🚲", 
        loc: "Albert Heijn Zwanenburg", 
        duration: "45 mins",
        commute: "5 min bike ride using Villa bicycles",
        detail: "In the Netherlands, cycling to AH for groceries is standard! Use villa bikes with baskets/racks to load up on bulk beer, eggs, bread, and veg snacks." 
      },
      { 
        time: "06:15 PM", 
        task: "Transit to Amsterdam Centraal Pier 🚆", 
        loc: "Halfweg-Zwanenburg Station -> Centraal Pier", 
        duration: "35 mins",
        commute: "20 min walk (14-bull group pace) to station + 10 min NS Sprinter train + 5 min walk to dock",
        detail: "Head to Centraal Station dock. Tap in with OVpay using contactless card/phone. Remember: Each person needs their OWN card/device!" 
      },
      { 
        time: "07:00 PM - 08:30 PM", 
        task: "Viator All-Inclusive Canal Cruise 🚤🍺", 
        loc: "Amsterdam Centraal Station Pier", 
        duration: "1.5h (19:00 - 20:30)",
        commute: "5 min walk from Centraal Station Exit",
        detail: "BOOKED (7:00 PM Departure from Centraal): 90-minute captain-guided canal cruise with unlimited Heineken beer, wine, and typical Dutch snacks! Sail along the iconic Prinsengracht canal, passing the Anne Frank House, Jordaan district, Houseboat Museum, 9 Little Streets (Negen Straatjes), and Leidseplein. Returns to Centraal departure pier at 8:30 PM. (Bring a windbreaker layer!)" 
      },
      { 
        time: "08:45 PM", 
        task: "Dinner: Cannibale Royale Handboogstraat", 
        loc: "Handboogstraat (Near Spui)", 
        duration: "1.5h",
        commute: "12 min walk from Boat Pier",
        detail: "Juicy steaks/burgers for carnivores + roasted cauliflower steaks & veggie options." 
      },
      { 
        time: "10:30 PM", 
        task: "Red Light District Exploration 🏮", 
        loc: "De Wallen", 
        duration: "1.5h",
        commute: "8 min walk from Spui",
        detail: "Night stroll along Oudezijds Achterburgwal, Dam Square, and historic canal alleys." 
      },
      { 
        time: "12:00 AM", 
        task: "Return Transit to Villa", 
        loc: "Centraal -> Zwanenburg", 
        duration: "35 mins",
        commute: "10 min train back + 20 min walk home to Villa",
        detail: "Catch the late night NS Sprinter back to Halfweg-Zwanenburg." 
      }
    ] 
  },
  2: { 
    date: "Sep 22", 
    title: "Guided Bike Tour & Canal Belt Exploration 🚲", 
    activities: [
      { 
        time: "08:30 AM", 
        task: "Morning Coffee Run & Villa Breakfast ☕", 
        loc: "Dennenlaan Cafes / Villa HQ", 
        duration: "45 mins",
        commute: "5 min walk / 2 min bike to Dennenlaan",
        detail: "Quick walk/bike to TIO's or De Echte Bakker for cappuccinos and warm croissants. Enjoy with scrambled eggs back at the villa." 
      },
      { 
        time: "09:10 AM - 09:45 AM", 
        task: "Transit & Walk to Bike Tour Departure 🚆🚶‍♂️", 
        loc: "Halfweg -> Centraal Station -> Spuistraat 30", 
        duration: "35 mins",
        commute: "20 min walk to Halfweg station + 10 min train + 8 min walk from Centraal",
        detail: "Take NS Sprinter train into Amsterdam Centraal. Walk ~8 mins south down Martelaarsgracht/Spuistraat to Spuistraat 30." 
      },
      { 
        time: "09:50 AM - 12:30 PM", 
        task: "We Bike Amsterdam Guided City Tour 🚴‍♂️", 
        loc: "Spuistraat 30, 1012 TS Amsterdam", 
        duration: "2.5h (Tour starts 10:00 AM)",
        commute: "8 min walk from Amsterdam Centraal",
        detail: "BOOKED: Highlights & Hidden Gems Bike Tour. 🚨 MANDATORY ARRIVAL AT 09:50 AM SHARP (10 mins before start) for bike fitting, adjustments, and Dutch traffic rules briefing. The tour departs strictly at 10:00 AM and CANNOT wait for late arrivals! 🗺️ MAPS WARNING: Use Google Maps and search specifically for 'We Bike Amsterdam' (Apple Maps sometimes routes to the wrong location)." 
      },
      { 
        time: "01:00 PM", 
        task: "Lunch: Winkel 43 / Jordaan Cafes", 
        loc: "Noordermarkt", 
        duration: "1.5h",
        commute: "10 min walk/bike from Spuistraat 30",
        detail: "World-famous Dutch Apple Pie at Winkel 43 + savory goat cheese toasts & Dutch beers." 
      },
      { 
        time: "03:00 PM", 
        task: "Jordaan Canals & Nine Streets Walk", 
        loc: "Nine Streets (De 9 Straatjes)", 
        duration: "1.5h",
        commute: "Walking around canal belt",
        detail: "Boutique shopping, photo ops on iconic bridges, and local coffee stops." 
      },
      { 
        time: "04:30 PM", 
        task: "Begijnhof Courtyard & Craft Beer Tasting 🍺", 
        loc: "Herengracht / Spui", 
        duration: "2h",
        commute: "10 min walk",
        detail: "Visit the serene 14th-century Begijnhof inner courtyard, followed by Dutch craft beer tasting at Proeflokaal Arendsnest." 
      },
      { 
        time: "07:30 PM", 
        task: "Dinner: Moeders 🍲", 
        loc: "Rozengracht 251", 
        duration: "2h",
        commute: "10 min walk",
        detail: "Homestyle Dutch classics! Famous for traditional Stamppot (mashed potatoes with veggies/cheese)." 
      },
      { 
        time: "10:00 PM", 
        task: "Return Transit to Villa HQ", 
        loc: "Centraal -> Halfweg", 
        duration: "35 mins",
        commute: "15 min tram/walk to Centraal + 10 min train + 20 min walk home",
        detail: "Head back to Zwanenburg for villa nightcaps." 
      }
    ] 
  },
  3: { 
    date: "Sep 23", 
    title: "Rami Arrives, Heineken Experience & De Pijp Feast 🍺", 
    activities: [
      { 
        time: "08:30 AM", 
        task: "Village Morning Coffee & Bakery Run ☕", 
        loc: "Dennenlaan Village Center", 
        duration: "1h",
        commute: "5 min walk or 2 min bike ride",
        detail: "Coffee run to De Echte Bakker & TIO's for freshly brewed cappuccinos and fresh pastries." 
      },
      { 
        time: "12:10 PM", 
        task: "Rami Arrives at Villa HQ! 🎉", 
        loc: "Zwanenburg Villa HQ", 
        duration: "45 mins",
        commute: "15 min Uber from AMS Airport (Rami flight lands 10:40 AM)",
        detail: "Rami arrives at Villa after immigration & bags! All 14 Bulls are now fully assembled." 
      },
      { 
        time: "01:00 PM", 
        task: "Lunch: Foodhallen / De Pijp Eats", 
        loc: "De Pijp District", 
        duration: "1h",
        commute: "20 min walk to Halfweg + 10 min train + 8 min Metro 52",
        detail: "Global street food market stalls with infinite veg, falafel, and taco choices." 
      },
      { 
        time: "02:00 PM (14:00)", 
        task: "Heineken Experience 🍻", 
        loc: "Stadhouderskade 78", 
        duration: "2h",
        commute: "5 min walk from De Pijp",
        detail: "Interactive brewery tour with cold draft beer tastings and rooftop views." 
      },
      { 
        time: "04:30 PM", 
        task: "Albert Cuyp Market & Stroopwafels", 
        loc: "De Pijp", 
        duration: "2.5h",
        commute: "Walking around De Pijp",
        detail: "Fresh hot stroopwafels, craft beer bars (Gollem), and neighborhood vibes." 
      },
      { 
        time: "07:30 PM", 
        task: "Grand Dinner: Indonesian Rijsttafel / De Biertuin 🥘", 
        loc: "De Pijp / City Center", 
        duration: "2h",
        commute: "10 min tram ride",
        detail: "Full 14-Bull Assembly Celebration! Authentic Indonesian Rice Table (Rijsttafel) or craft beer feast at De Biertuin with meat & veg platters." 
      },
      { 
        time: "10:30 PM", 
        task: "Return Transit to Villa HQ", 
        loc: "Centraal -> Halfweg", 
        duration: "35 mins",
        commute: "10 min train + 20 min group walk home",
        detail: "Return home to HQ." 
      }
    ] 
  },
  4: { 
    date: "Sep 24", 
    title: "Countryside Windmills, Cheese, Marken & A'DAM Lookout 🧀", 
    activities: [
      { 
        time: "07:30 AM", 
        task: "Early Villa Express Breakfast & Coffee", 
        loc: "Villa Kitchen", 
        duration: "45 mins",
        commute: "N/A",
        detail: "Quick coffee from Scratch Cafe (opens 07:00), oats, and fruit before early departure." 
      },
      { 
        time: "08:05 AM", 
        task: "Transit to Tour Bus Pick-up", 
        loc: "Halfweg -> Centraal", 
        duration: "40 mins",
        commute: "20 min group walk to station + 10 min train",
        detail: "Arrive at meeting point behind Centraal Station." 
      },
      { 
        time: "08:45 AM - 03:15 PM", 
        task: "Viator Countryside Tour (6.5 Hours) 🚌", 
        loc: "Zaanse Schans, Edam, Volendam & Marken", 
        duration: "6.5h",
        commute: "Guided Coach Transit",
        detail: "BOOKED FULL-DAY TOUR: Settle into comfortable coach. Stop 1: Zaanse Schans admire traditional working Dutch windmills & historic wooden buildings. Stop 2: Edam visit historic cheese market site + independent stroll. Stop 3: Volendam local cheese producer (Gouda & Edam tasting) + clog factory visit. Stop 4: Marken peninsula with colorful wooden houses. Tour finishes at A'DAM Lookout!" 
      },
      { 
        time: "03:15 PM", 
        task: "A'DAM Lookout & Rooftop Panoramic Views 🏙️", 
        loc: "Overhoeksplein 5 (A'DAM Tower)", 
        duration: "1.5h",
        commute: "Tour concludes at base of A'DAM Lookout",
        detail: "Enjoy 360° rooftop views of Amsterdam, canals, and shipping harbour. Option for 'Over the Edge' highest swing in Europe!" 
      },
      { 
        time: "05:00 PM", 
        task: "Buiksloterweg Ferry to Centraal & Return", 
        loc: "IJ River Ferry -> Centraal -> Halfweg", 
        duration: "45 mins",
        commute: "Free 5-min GVB ferry across IJ river + 10 min train + 20 min walk home",
        detail: "Scenic free ferry ride back across the river." 
      },
      { 
        time: "07:30 PM", 
        task: "Dinner: Villa BBQ & Card Night 🃏", 
        loc: "Villa HQ Terrace", 
        duration: "Late Night",
        commute: "N/A",
        detail: "Fire up the grill with veggies, halloumi, burgers, cold beers, and late-night cards." 
      }
    ] 
  },
  5: { 
    date: "Sep 25", 
    title: "Zandvoort Beach Day & F1 Track 🏎️ 🌊", 
    activities: [
      { 
        time: "09:30 AM", 
        task: "Morning Coffee Run & Pack Beach Gear 🏖️", 
        loc: "Dennenlaan / Villa Kitchen", 
        duration: "1h",
        commute: "5 min walk",
        detail: "PACKING CHECK: Pack swim trunks/wear, travel towel, sunscreen, sunglasses & flip-flops! Grab morning cappuccinos at TIO's." 
      },
      { 
        time: "10:30 AM", 
        task: "Direct Train to the Beach 🚆", 
        loc: "Halfweg -> Zandvoort aan Zee", 
        duration: "40 mins",
        commute: "20 min walk to station + 20 min direct NS Train straight to beach!",
        detail: "Super convenient direct train from Halfweg—no transit through Centraal needed! Just tap in with OVpay." 
      },
      { 
        time: "11:30 AM", 
        task: "Circuit Zandvoort / F1 GP Track", 
        loc: "Circuit Zandvoort", 
        duration: "2h",
        commute: "15 min walk from Zandvoort Station",
        detail: "Tour the famous Dutch F1 track. Option for official Sim Racing or Track Drive." 
      },
      { 
        time: "01:30 PM", 
        task: "Beach Club Lunch & Swim / Lounge 🏊‍♂️", 
        loc: "Tijn Akersloot / Bernie's Beach Club", 
        duration: "2.5h",
        commute: "10 min walk to North Sea coast",
        detail: "Relaxed beachfront dining & lounging over North Sea waves! Swim trunks time for brave dip, woodfired pizzas, salads, and cold beers." 
      },
      { 
        time: "04:30 PM", 
        task: "Dune Walk & Sunset Drinks", 
        loc: "Kennemerland Dunes", 
        duration: "2h",
        commute: "Walking along coastal dunes",
        detail: "Scenic coastal dune stroll followed by sunset beers at the beach bar." 
      },
      { 
        time: "07:30 PM", 
        task: "Dinner: Zandvoort Seafood / Pasta", 
        loc: "Zandvoort Town", 
        duration: "1.5h",
        commute: "5 min walk",
        detail: "Casual coastal dinner in town." 
      },
      { 
        time: "09:30 PM", 
        task: "Return Train to Villa HQ", 
        loc: "Zandvoort -> Halfweg", 
        duration: "40 mins",
        commute: "20 min direct train ride back + 20 min walk home",
        detail: "Head home to HQ." 
      }
    ] 
  },
  6: { 
    date: "Sep 26", 
    title: "Open City Day & Farewell Feast 🎆", 
    activities: [
      { 
        time: "09:30 AM", 
        task: "Breakfast & Cappuccino Run", 
        loc: "Dennenlaan Village Bakery", 
        duration: "1h",
        commute: "5 min walk",
        detail: "Casual morning spread with bakery-fresh pastries and coffee." 
      },
      { 
        time: "11:00 AM", 
        task: "Open Morning: Souvenirs & Museums", 
        loc: "Rijksmuseum / Nine Streets", 
        duration: "2.5h",
        commute: "20 min walk to station + 10 min train into Centraal",
        detail: "Free slot for souvenir shopping, Rijksmuseum, or canal-side cafe lounging." 
      },
      { 
        time: "01:30 PM", 
        task: "Lunch: Foodhallen Amsterdam", 
        loc: "Oud-West", 
        duration: "1.5h",
        commute: "10 min tram ride",
        detail: "Indoor food market inside a converted tram depot. Infinite global food options." 
      },
      { 
        time: "03:00 PM", 
        task: "Jordaan Brown Cafe Pub Crawl 🍻", 
        loc: "Jordaan District", 
        duration: "3h",
        commute: "10 min walk",
        detail: "Historic Dutch pub crawl starting at Cafe Papeneiland and Cafe 't Smalle." 
      },
      { 
        time: "07:30 PM", 
        task: "Grand Finale Dinner: The Seafood Bar 🦪", 
        loc: "Spui Location", 
        duration: "2.5h",
        commute: "10 min walk from Jordaan",
        detail: "Farewell Feast! Massive seafood towers, oysters, white wine, + dedicated vegetarian menu." 
      },
      { 
        time: "10:30 PM", 
        task: "Rooftop Toast: SkyLounge", 
        loc: "SkyLounge Centraal", 
        duration: "1.5h",
        commute: "12 min tram or walk",
        detail: "Panoramic 11th-floor rooftop views of illuminated Amsterdam canals." 
      },
      { 
        time: "12:00 AM", 
        task: "Last Train Home to HQ", 
        loc: "Centraal -> Halfweg", 
        duration: "35 mins",
        commute: "10 min train + 20 min walk home",
        detail: "Final train leg back to Zwanenburg." 
      }
    ] 
  },
  7: { 
    date: "Sep 27", 
    title: "Departure Day 👋", 
    activities: [
      { 
        time: "08:30 AM", 
        task: "Breakfast & Packing Large Suitcases", 
        loc: "Villa HQ", 
        duration: "1.5h",
        commute: "N/A",
        detail: "Clear out villa fridge, consolidate checked luggage, and pack up." 
      },
      { 
        time: "10:00 AM - 12:00 PM", 
        task: "Check-out & Airport Departures", 
        loc: "Schiphol Airport (AMS)", 
        duration: "1h",
        commute: "15 min Uber / Van ride (~€25-€35) or train via Sloterdijk",
        detail: "Sekhar departs at 10:25 AM. Remaining Bulls head to airport for afternoon flight departures." 
      }
    ] 
  }
};

export default function App() {
  const [activeDay, setActiveDay] = useState(1); // Default to Day 1 Kickoff
  const [view, setView] = useState('itinerary');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Checklist State
  const [todos, setTodos] = useState([
    { id: 1, task: "Pre-order Day 0/1 Groceries at AH Zwanenburg", done: true },
    { id: 2, task: "Book Heineken Experience Tickets for Sep 23 @ 14:00", done: true },
    { id: 3, task: "Confirm Corendon Hotel Booking (3 Rooms, Sep 20-21)", done: true },
    { id: 4, task: "Viator All-Inclusive Boat Cruise (Sep 21 @ 19:00 - Centraal Dock)", done: true },
    { id: 5, task: "We Bike Amsterdam Guided Tour (Sep 22 @ 10:00 AM - Spuistraat 30)", done: true },
    { id: 6, task: "Viator Zaanse Schans & Countryside 6.5h Tour (Sep 24 @ 08:45)", done: true },
    { id: 7, task: "Reserve Table at The Seafood Bar (Sep 26 Finale)", done: false },
    { id: 8, task: "Confirm Group Airport Vans for Checked Luggage (Sep 27)", done: false },
    { id: 9, task: "India Travelers: Enable International Contactless in Banking Apps", done: false },
    { id: 10, task: "US Travelers: Enable Zero-FX Cards & Set Travel Notices", done: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const currentDayData = ITINERARY_DATA[activeDay];
  const filteredActivities = currentDayData?.activities.filter(act => 
    searchQuery === '' || 
    act.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.detail.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-24 selection:bg-indigo-500 selection:text-white">
      
      {/* Header Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b-4 border-indigo-600 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-700 to-indigo-500 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-200">
              <PartyPopper size={24} />
            </div>
            <div>
              <h1 className="font-black text-indigo-950 text-base md:text-xl tracking-tight uppercase leading-tight flex items-center gap-2">
                2026 Bulls of BITS Reunion
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Amsterdam • 14 Bulls HQ
              </p>
            </div>
          </div>

          <div className="flex gap-1 md:gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/60">
            {['itinerary', 'stay', 'logistics'].map((v) => (
              <button 
                key={v}
                onClick={() => setView(v)}
                className={`px-3 md:px-5 py-2 rounded-xl text-xs md:text-sm font-black capitalize transition-all duration-200 ${
                  view === v 
                    ? 'bg-white text-indigo-600 shadow-md shadow-slate-200 scale-105' 
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        
        {/* VIEW 1: ITINERARY */}
        {view === 'itinerary' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Day Selection & Callouts */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Timeline</h3>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold">
                    8 Days
                  </span>
                </div>

                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                  {Object.keys(ITINERARY_DATA).map((day) => (
                    <button
                      key={day}
                      onClick={() => setActiveDay(parseInt(day))}
                      className={`flex-shrink-0 lg:w-full py-3 px-4 rounded-2xl text-left transition-all duration-200 ${
                        activeDay === parseInt(day) 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-[1.02]' 
                          : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-indigo-50/50 hover:border-indigo-200'
                      }`}
                    >
                      <div className="text-[10px] font-black opacity-70 mb-0.5 tracking-widest uppercase">
                        {day === "0" ? "Pre-arrival" : `Day ${day}`}
                      </div>
                      <div className="font-black text-sm md:text-base">{ITINERARY_DATA[day].date}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Station Walk Buffer Note */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-3xl shadow-sm space-y-2 border border-indigo-800/40">
                <div className="flex items-center gap-2 text-indigo-300 font-black text-xs uppercase tracking-wider">
                  <Train size={18} /> Group Transit Buffer
                </div>
                <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                  <strong>20-min walking buffer</strong> budgeted for the 14-bull group pace between Villa HQ and Halfweg-Zwanenburg Station.
                </p>
              </div>

              {/* Dutch Biking Culture Callout */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-5 rounded-3xl shadow-sm space-y-2 border border-emerald-800/40">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase tracking-wider">
                  <Bike size={18} /> Dutch Bike Culture
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                  <strong>Cycling for groceries & coffee is 100% standard!</strong> Villa bikes have racks for grocery runs to AH Zwanenburg.
                </p>
              </div>
            </div>

            {/* Activities Timeline Display */}
            <div className="lg:col-span-3">
              <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200/80">
                
                {/* Header & Filter Search */}
                <div className="mb-8 border-b border-slate-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3.5 py-1 rounded-full text-xs font-black uppercase mb-2">
                      <Calendar size={14} /> {ITINERARY_DATA[activeDay].date}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                      {ITINERARY_DATA[activeDay].title}
                    </h2>
                  </div>

                  {/* Search Input */}
                  <div className="relative min-w-[200px]">
                    <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filter activity..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Timeline Stream */}
                <div className="space-y-8 relative">
                  <div className="absolute left-[13px] top-6 bottom-6 w-0.5 bg-indigo-100"></div>

                  {filteredActivities.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs font-bold">
                      No matching activities found for "{searchQuery}".
                    </div>
                  ) : (
                    filteredActivities.map((act, idx) => (
                      <div key={idx} className="relative flex gap-5 md:gap-8 group">
                        {/* Timeline Node */}
                        <div className="z-10 w-7 h-7 bg-indigo-600 border-4 border-white rounded-full flex-shrink-0 mt-1 shadow-md group-hover:scale-110 transition-transform"></div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                            <span className="text-indigo-600 font-black text-xs tracking-wider">{act.time}</span>
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                              <Clock size={10} /> {act.duration}
                            </span>
                          </div>

                          <h4 className="text-lg md:text-2xl font-black text-slate-800 mb-1">{act.task}</h4>
                          <p className="text-xs text-slate-400 font-bold uppercase mb-2 flex items-center gap-1">
                            <MapPin size={12} className="text-rose-500" /> {act.loc}
                          </p>

                          {/* Transit callout pill */}
                          {act.commute && act.commute !== "N/A" && (
                            <div className="mb-3 inline-flex items-center gap-1.5 bg-indigo-50/80 border border-indigo-100 px-3 py-1 rounded-xl text-[11px] font-bold text-indigo-700">
                              <Navigation size={12} /> Transit: {act.commute}
                            </div>
                          )}

                          <div className="p-4 md:p-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 font-medium text-xs md:text-sm leading-relaxed">
                            {act.detail}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STAY */}
        {view === 'stay' && (
          <div className="space-y-8">
            {/* Villa Accommodation Details */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-200/80 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="inline-block bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                    Main Villa HQ (Sep 21 - 27)
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">Zwanenburg Villa</h2>
                  <p className="text-slate-500 font-semibold italic text-sm mb-6">IJweg 179, 1161 EV Zwanenburg, Netherlands</p>
                  
                  <div className="space-y-3.5 mb-8">
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Home size={18} /></div>
                      Private Group Villa for 14 Bulls
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Train size={18} /></div>
                      20-min group walk to Halfweg-Zwanenburg Train Station
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Coffee size={18} /></div>
                      5-min walk to Dennenlaan Bakery & Lunch Spots
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Bike size={18} /></div>
                      5-min bike ride to Albert Heijn Supermarket
                    </div>
                  </div>

                  <a 
                    href="https://maps.app.goo.gl/LetpPoTZbB34bp4b6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-black text-xs md:text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                  >
                    <MapPin size={18} /> Open Location in Google Maps
                  </a>
                </div>

                {/* Day 0 Corendon Hotel Info */}
                <div className="bg-slate-950 text-white p-8 rounded-[2rem] flex flex-col justify-between border border-slate-800">
                  <div>
                    <div className="inline-block bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                      Day 0 Hotel (Sep 20 - 21)
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-2">Corendon Amsterdam Schiphol</h3>
                    <p className="text-xs text-slate-400 font-semibold mb-6">Badhoevedorp • Booking Ref: 71243697</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">
                      3 Twin Rooms reserved for early landing squad. Take airport shuttle bus directly from Schiphol Bus Stop A9.
                    </p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase text-indigo-300">Villa Transition Plan</p>
                    <p className="text-xs font-bold mt-1 text-slate-200">Check out at 12:00 PM Sep 21 & take 10-min Uber (~€18) to Villa HQ.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dennenlaan Coffee & Lunch Guide Cards */}
            <div className="bg-gradient-to-br from-amber-500 via-amber-400 to-orange-400 text-slate-950 rounded-[2.5rem] p-6 md:p-10 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-slate-950 text-amber-400 rounded-2xl">
                  <Coffee size={28} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Village Coffee & Dining Guide ☕</h3>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Dennenlaan Street • 450m from Villa HQ</p>
                </div>
              </div>

              <p className="text-xs md:text-sm font-bold text-slate-900 mb-6 max-w-2xl leading-relaxed">
                Doing a morning cappuccino run or Day 1 group lunch is super easy! Dennenlaan is the main local village strip just around the corner from our villa (5-min walk or 2-min bike ride).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {COFFEE_SPOTS.map((spot, i) => (
                  <div key={i} className="bg-white/95 backdrop-blur p-5 rounded-3xl border border-amber-300/60 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider block w-fit mb-2">
                        {spot.highlight}
                      </span>
                      <h4 className="font-black text-slate-900 text-lg mb-1">{spot.name}</h4>
                      <p className="text-[11px] font-bold text-slate-500 mb-2">{spot.address}</p>
                      <p className="text-xs text-slate-700 font-medium mb-3 leading-snug">{spot.vibe}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 text-[11px] font-black text-indigo-700 flex items-center gap-1">
                      <Clock size={12} /> {spot.hours}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: LOGISTICS */}
        {view === 'logistics' && (
          <div className="space-y-8">
            
            {/* Transit & Payment Guide */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-indigo-900/60">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-indigo-800/60 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-3.5 py-1 rounded-full text-xs font-black uppercase mb-2">
                    <Train size={14} /> Public Transit Payment Essentials
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black tracking-tight">{TRANSIT_GUIDE.title}</h3>
                  <p className="text-xs text-slate-300 font-bold mt-1 max-w-2xl">{TRANSIT_GUIDE.subtitle}</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black px-4 py-2 rounded-2xl text-xs uppercase flex items-center gap-2">
                  <Smartphone size={16} /> Contactless / OVpay Ready
                </span>
              </div>

              {/* Fundamental Rules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {TRANSIT_GUIDE.rules.map((rule, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-sm md:text-base text-indigo-200 mb-2 flex items-center gap-2">
                        <CheckCircle size={16} className="text-indigo-400 shrink-0" />
                        {rule.title}
                      </h4>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Traveler Pre-Work: US vs India */}
              <h4 className="text-lg font-black uppercase text-indigo-300 tracking-wider mb-4 flex items-center gap-2">
                <Globe size={18} /> Traveler Action Needed Before Departure
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {TRANSIT_GUIDE.travelerTypes.map((type, idx) => (
                  <div key={idx} className={`p-6 rounded-3xl border-2 ${type.color} bg-white text-slate-900 shadow-md`}>
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-black text-base md:text-lg">{type.origin}</h5>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${type.badgeColor}`}>
                        {type.badge}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {type.steps.map((step, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-700 font-semibold flex items-start gap-2.5 leading-relaxed">
                          <span className="w-2 h-2 bg-indigo-600 rounded-full shrink-0 mt-1.5"></span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Transit Tips Callout */}
              <div className="bg-indigo-900/40 border border-indigo-700/50 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-4">
                <AlertCircle size={24} className="text-indigo-300 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-black text-indigo-200 uppercase tracking-wider">Pro Transit Tips for the Group</p>
                  <ul className="text-xs text-slate-300 font-medium space-y-1">
                    {TRANSIT_GUIDE.proTips.map((tip, tIdx) => (
                      <li key={tIdx}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Group Arrivals Manifest */}
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">Group Arrivals Manifest</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Flight Landing Times + ~1.5h Immigration & Taxi Buffer</p>
                </div>
                <span className="bg-indigo-50 text-indigo-700 font-black px-4 py-2 rounded-2xl text-xs uppercase flex items-center gap-2">
                  <PlaneLanding size={16} /> Schiphol Airport (AMS)
                </span>
              </div>

              {/* Note callout box */}
              <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-bold leading-relaxed">
                  <strong>Flight Arrival Buffer Note:</strong> Listed arrival times are flight wheel-touchdown times. Please account for <strong>~1.5 hours</strong> for passport control, checked baggage collection, and Uber/taxi transit to the Villa or Corendon Hotel.
                </p>
              </div>

              <div className="space-y-6">
                {GROUPED_ARRIVALS.map((dayGroup, i) => (
                  <div key={i} className="bg-slate-50 p-5 md:p-6 rounded-3xl border border-slate-100">
                    <h4 className="font-black text-indigo-950 text-base md:text-lg mb-4 flex items-center gap-2">
                      <PlaneLanding className="text-indigo-600" size={18} /> {dayGroup.day}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {dayGroup.groups.map((grp, j) => (
                        <div key={j} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                          <div className="flex items-center justify-between text-xs font-black text-indigo-600 mb-1">
                            <span className="flex items-center gap-1"><Clock size={12} /> Land: {grp.flightTime}</span>
                          </div>
                          <div className="text-[10px] font-extrabold text-slate-400 mb-3 uppercase tracking-wider">
                            Est. Villa: ~{grp.approxVillaTime}
                          </div>
                          <div className="space-y-1">
                            {grp.guys.map((guy, k) => (
                              <p key={k} className="font-bold text-xs md:text-sm text-slate-800 flex items-center gap-2">
                                <Users size={13} className="text-slate-400" /> {guy}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather & Comprehensive Packing List Guide */}
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-black uppercase mb-2">
                    <Briefcase size={14} /> Checked Suitcase Guide
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">Autumn Weather & Packing List</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Amsterdam September Climate (~13°C - 18°C / Mild & Coastal)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PACKING_GUIDE.map((cat, idx) => {
                  const IconComp = cat.icon;
                  return (
                    <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-md">
                            <IconComp size={20} />
                          </div>
                          <h4 className="font-black text-slate-900 text-base">{cat.category}</h4>
                        </div>
                        <ul className="space-y-2.5">
                          {cat.items.map((item, i) => (
                            <li key={i} className="text-xs text-slate-600 font-semibold flex items-start gap-2 leading-relaxed">
                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0 mt-1.5"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Booking Checklist */}
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Booking & Tasks Checklist</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Click any item to toggle completed status</p>
                </div>
                <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                  {todos.filter(t => t.done).length} / {todos.length} Done
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {todos.map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => toggleTodo(t.id)}
                    className={`flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all duration-200 ${
                      t.done 
                        ? 'bg-emerald-50/50 border-emerald-200/80 text-slate-800' 
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-indigo-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      t.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {t.done ? <CheckCircle size={14} /> : <Circle size={14} className="text-slate-300" />}
                    </div>
                    <span className={`font-bold text-xs md:text-sm ${t.done ? 'line-through opacity-80' : ''}`}>
                      {t.task}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-3.5 text-center z-40">
        <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles size={13} className="text-indigo-600" />
          2026 Bulls of BITS Reunion • Amsterdam Chapter • September 20 - 27
        </p>
      </footer>
    </div>
  );
}