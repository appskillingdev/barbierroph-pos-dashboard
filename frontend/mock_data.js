console.group('Loading Mock up variables');

const mockUpServiceList = [
  // CORE CUTS
  {
    service_code: "QKC",
    category: "CORE CUTS",
    cluster: "SERVICES",
    service_name: "Quick Cut",
    service_description: "A quick and efficient haircut service.",
    is_promo: false,
    is_popular: true,
    service_price: 220
  },
  {
    service_code: "SWC",
    category: "CORE CUTS",
    cluster: "SERVICES",
    service_name: "Slow Cut",
    service_description: "A more detailed and time-consuming haircut service.",
    is_promo: false,
    is_popular: true,
    service_price: 250
  },
  {
    service_code: "QKCX",
    category: "CORE CUTS",
    cluster: "SERVICES",
    service_name: "Quick Cut (Express)",
    service_description: "Fast-track quick haircut for tight schedules.",
    is_promo: false,
    is_popular: false,
    service_price: 200
  },
  {
    service_code: "SWCX",
    category: "CORE CUTS",
    cluster: "SERVICES",
    service_name: "Slow Cut (Express)",
    service_description: "Detailed haircut focused strictly on shaping without extra fluff.",
    is_promo: false,
    is_popular: false,
    service_price: 230
  },
  {
    service_code: "TDT",
    category: "CORE CUTS",
    cluster: "SERVICES",
    service_name: "Toddler Trims",
    service_description: "Gentle haircut specialized for young toddlers.",
    is_promo: false,
    is_popular: false,
    service_price: 180
  },
  {
    service_code: "SQKC",
    category: "CORE CUTS",
    cluster: "SERVICES",
    service_name: "Students Quick Cut",
    service_description: "Discounted quick haircut rate for students with valid ID.",
    is_promo: false,
    is_popular: true,
    service_price: 190
  },
  {
    service_code: "SSWC",
    category: "CORE CUTS",
    cluster: "SERVICES",
    service_name: "Students Slow Cut",
    service_description: "Discounted detailed haircut rate for students with valid ID.",
    is_promo: false,
    is_popular: false,
    service_price: 220
  },

  // CUTS + WASHES
  {
    service_code: "QKCW",
    category: "CUTS + WASHES",
    cluster: "SERVICES",
    service_name: "Quick Cut, Wash & Blow",
    service_description: "Quick haircut paired with a refreshing wash and blow-dry styling.",
    is_promo: false,
    is_popular: true,
    service_price: 280
  },
  {
    service_code: "SWCW",
    category: "CUTS + WASHES",
    cluster: "SERVICES",
    service_name: "Slow Cut, Wash & Blow",
    service_description: "Detailed haircut paired with a relaxing wash and blow-dry styling.",
    is_promo: false,
    is_popular: true,
    service_price: 320
  },
  {
    service_code: "QWB",
    category: "CUTS + WASHES",
    cluster: "SERVICES",
    service_name: "Quick Wash & Blow",
    service_description: "Standalone quick scalp wash and blow-dry styling.",
    is_promo: false,
    is_popular: false,
    service_price: 120
  },
  {
    service_code: "SWB",
    category: "CUTS + WASHES",
    cluster: "SERVICES",
    service_name: "Slow Wash & Blow",
    service_description: "Standalone deep wash, scalp massage, and thorough blow-dry styling.",
    is_promo: false,
    is_popular: false,
    service_price: 150
  },

  // CUTS + SHAVES
  {
    service_code: "CSB",
    category: "CUTS + SHAVES",
    cluster: "SERVICES",
    service_name: "Cut & Shave (Basic)",
    service_description: "Essential haircut service paired with a clean basic shave.",
    is_promo: false,
    is_popular: true,
    service_price: 350
  },
  {
    service_code: "CSP",
    category: "CUTS + SHAVES",
    cluster: "SERVICES",
    service_name: "Cut & Shave (Premium)",
    service_description: "Premium haircut accompanied by a hot towel beard shave and sculpt.",
    is_promo: false,
    is_popular: false,
    service_price: 450
  },
  {
    service_code: "SHS",
    category: "CUTS + SHAVES",
    cluster: "SERVICES",
    service_name: "Shave Solo",
    service_description: "Standalone full facial shave and beard grooming.",
    is_promo: false,
    is_popular: false,
    service_price: 180
  },

  // CUTS + COLORS
  {
    service_code: "CND",
    category: "CUTS + COLORS",
    cluster: "SERVICES",
    service_name: "Cut & Dye",
    service_description: "Precision haircut combined with full grey coverage or color dyeing.",
    is_promo: false,
    is_popular: false,
    service_price: 600
  },
  {
    service_code: "CNC",
    category: "CUTS + COLORS",
    cluster: "SERVICES",
    service_name: "Cut & Color",
    service_description: "Haircut service bundled with vibrant single-process hair coloring.",
    is_promo: false,
    is_popular: true,
    service_price: 650
  },
  {
    service_code: "CNB",
    category: "CUTS + COLORS",
    cluster: "SERVICES",
    service_name: "Cut & Bleach",
    service_description: "Full haircut combined with an intensive bleaching treatment.",
    is_promo: false,
    is_popular: false,
    service_price: 800
  },

  // EXECUTIVE PACKAGES
  {
    service_code: "QXE",
    category: "EXECUTIVE PACKAGES",
    cluster: "SERVICES",
    service_name: "Quick Executive Care",
    service_description: "Express executive grooming service combining a haircut, wash, and quick massage.",
    is_promo: false,
    is_popular: false,
    service_price: 450
  },
  {
    service_code: "QXP",
    category: "EXECUTIVE PACKAGES",
    cluster: "SERVICES",
    service_name: "Quick Executive Care (Plus)",
    service_description: "Quick executive package bundled with premium styling and scalp rinse.",
    is_promo: false,
    is_popular: false,
    service_price: 550
  },
  {
    service_code: "SXE",
    category: "EXECUTIVE PACKAGES",
    cluster: "SERVICES",
    service_name: "Slow Executive Care",
    service_description: "Complete relaxed executive package: slow cut, hot towel shave, and scalp treatment.",
    is_promo: false,
    is_popular: true,
    service_price: 650
  },
  {
    service_code: "SXP",
    category: "EXECUTIVE PACKAGES",
    cluster: "SERVICES",
    service_name: "Slow Executive Care (Plus)",
    service_description: "The ultimate VIP pampering session with haircut, shave, scalp treatment, and extended massage.",
    is_promo: false,
    is_popular: false,
    service_price: 800
  },

  // GROUP TRIMS
  {
    service_code: "THQQ",
    category: "GROUP TRIMS",
    cluster: "SERVICES",
    service_name: "Throuple Trims (Quick Cut)",
    service_description: "Group discount trim package for three people receiving Quick Cuts.",
    is_promo: false,
    is_popular: false,
    service_price: 600
  },
  {
    service_code: "THSS",
    category: "GROUP TRIMS",
    cluster: "SERVICES",
    service_name: "Throuple Trims (Slow Cut)",
    service_description: "Group discount trim package for three people receiving Slow Cuts.",
    is_promo: false,
    is_popular: false,
    service_price: 700
  },
  {
    service_code: "THTT",
    category: "GROUP TRIMS",
    cluster: "SERVICES",
    service_name: "Throuple Trims (Toddler Trim)",
    service_description: "Group trim package tailored for three toddlers.",
    is_promo: false,
    is_popular: false,
    service_price: 500
  },
  {
    service_code: "THSQ",
    category: "GROUP TRIMS",
    cluster: "SERVICES",
    service_name: "Throuple Trims (Slow + Quick Mix A)",
    service_description: "Group trim package for three: combination of Slow Cut and Quick Cuts.",
    is_promo: false,
    is_popular: false,
    service_price: 650
  },
  {
    service_code: "THQS",
    category: "GROUP TRIMS",
    cluster: "SERVICES",
    service_name: "Throuple Trims (Slow + Quick Mix B)",
    service_description: "Group trim package for three: customized mixed cut package.",
    is_promo: false,
    is_popular: false,
    service_price: 650
  },

  // TWIN TRIMS
  {
    service_code: "TWQQ",
    category: "TWIN TRIMS",
    cluster: "SERVICES",
    service_name: "Twin Trims: QKC + QKC",
    service_description: "Pair deal haircut service for two Quick Cuts.",
    is_promo: false,
    is_popular: true,
    service_price: 400
  },
  {
    service_code: "TWQS",
    category: "TWIN TRIMS",
    cluster: "SERVICES",
    service_name: "Twin Trims: QKC + SWC",
    service_description: "Pair deal haircut service combining one Quick Cut and one Slow Cut.",
    is_promo: false,
    is_popular: false,
    service_price: 440
  },
  {
    service_code: "TWSQ",
    category: "TWIN TRIMS",
    cluster: "SERVICES",
    service_name: "Twin Trims: SWC + QKC",
    service_description: "Pair deal haircut service combining one Slow Cut and one Quick Cut.",
    is_promo: false,
    is_popular: false,
    service_price: 440
  },
  {
    service_code: "TWSS",
    category: "TWIN TRIMS",
    cluster: "SERVICES",
    service_name: "Twin Trims: SWC + SWC",
    service_description: "Pair deal haircut service for two Slow Cuts.",
    is_promo: false,
    is_popular: false,
    service_price: 460
  },
  {
    service_code: "TWTT",
    category: "TWIN TRIMS",
    cluster: "SERVICES",
    service_name: "Twin Trims: TDT + TDT",
    service_description: "Pair deal haircut package for two toddlers.",
    is_promo: false,
    is_popular: false,
    service_price: 340
  },
  {
    service_code: "STWQQ",
    category: "TWIN TRIMS",
    cluster: "SERVICES",
    service_name: "Student Twin Trims: QKC + QKC",
    service_description: "Student rate pair discount for two Quick Cuts.",
    is_promo: false,
    is_popular: false,
    service_price: 360
  },
  {
    service_code: "STWSQ",
    category: "TWIN TRIMS",
    cluster: "SERVICES",
    service_name: "Student Twin Trims: SWC + QKC",
    service_description: "Student rate pair discount for mixed Quick Cut and Slow Cut.",
    is_promo: false,
    is_popular: false,
    service_price: 390
  },
  {
    service_code: "STWSS",
    category: "TWIN TRIMS",
    cluster: "SERVICES",
    service_name: "Student Twin Trims: SWC + SWC",
    service_description: "Student rate pair discount for two Slow Cuts.",
    is_promo: false,
    is_popular: false,
    service_price: 420
  },

  // TREATMENTS
  {
    service_code: "MRSS",
    category: "TREATMENTS",
    cluster: "SERVICES",
    service_name: "Mint, Rosemary and Seasalt Scalp Treatment",
    service_description: "Refreshing scalp scrub to invigorate skin, exfoliate dandruff, and boost hair health.",
    is_promo: false,
    is_popular: false,
    service_price: 350
  },
  {
    service_code: "ARG",
    category: "TREATMENTS",
    cluster: "SERVICES",
    service_name: "Argan Oil Scalp Treatment",
    service_description: "Deep conditioning and moisturizing treatment enriched with pure Argan oil.",
    is_promo: false,
    is_popular: false,
    service_price: 400
  },
  {
    service_code: "KHS",
    category: "TREATMENTS",
    cluster: "SERVICES",
    service_name: "Keratin Hair Spa",
    service_description: "Smoothing keratin treatment to restore hair strength and add shine.",
    is_promo: false,
    is_popular: false,
    service_price: 500
  },
  {
    service_code: "PSG",
    category: "TREATMENTS",
    cluster: "SERVICES",
    service_name: "Premium Styling by Gatsby",
    service_description: "Professional hair sculpture and styling using Gatsby wax and setting sprays.",
    is_promo: false,
    is_popular: false,
    service_price: 100
  },
  {
    service_code: "CPRM1",
    category: "TREATMENTS",
    cluster: "SERVICES",
    service_name: "Cut and Cold Perm 1 (Loose/Korean)",
    service_description: "Haircut paired with a natural Korean-style loose wave cold perm.",
    is_promo: false,
    is_popular: false,
    service_price: 1200
  },
  {
    service_code: "CPRM2",
    category: "TREATMENTS",
    cluster: "SERVICES",
    service_name: "Cut & Cold Perm 2 (Twist/Afro)",
    service_description: "Haircut paired with textured twist or afro cold perm treatment.",
    is_promo: false,
    is_popular: false,
    service_price: 1500
  },

  // ADD ONS & OTHER SERVICES
  {
    service_code: "HRT1",
    category: "ADD ONS",
    cluster: "SERVICES",
    service_name: "Hair Art Level 1",
    service_description: "Basic single hair line or simple shaved pattern design.",
    is_promo: false,
    is_popular: false,
    service_price: 100
  },
  {
    service_code: "HRT2",
    category: "ADD ONS",
    cluster: "SERVICES",
    service_name: "Hair Art Level 2",
    service_description: "Intermediate geometric pattern or multiple hair line shaved art.",
    is_promo: false,
    is_popular: false,
    service_price: 200
  },
  {
    service_code: "HRT3",
    category: "ADD ONS",
    cluster: "SERVICES",
    service_name: "Hair Art Level 3",
    service_description: "Complex, detailed, and full-head shaved artwork design.",
    is_promo: false,
    is_popular: false,
    service_price: 350
  },
  {
    service_code: "MSG",
    category: "OTHER SERVICES",
    cluster: "SERVICES",
    service_name: "15-min Massage",
    service_description: "Quick head, neck, and shoulder acupressure massage.",
    is_promo: false,
    is_popular: true,
    service_price: 120
  },
  {
    service_code: "QHS",
    category: "OTHER SERVICES",
    cluster: "SERVICES",
    service_name: "Quick Hair Spa",
    service_description: "Fast-acting scalp moisturizer and soothing hair massage.",
    is_promo: false,
    is_popular: false,
    service_price: 250
  },

  // SERVICES - PROMO
  {
    service_code: "RED GGC 350",
    category: "GIFT CARD",
    cluster: "SERVICES - PROMO",
    service_name: "Redeem Gift Card 350",
    service_description: "Redemption option for PHP 350 valued barbershop gift vouchers.",
    is_promo: true,
    is_popular: false,
    service_price: 0
  },
  {
    service_code: "RED GGC 550",
    category: "GIFT CARD",
    cluster: "SERVICES - PROMO",
    service_name: "Redeem Gift Card 550",
    service_description: "Redemption option for PHP 550 valued barbershop gift vouchers.",
    is_promo: true,
    is_popular: false,
    service_price: 0
  },
  {
    service_code: "PROMO QKCW",
    category: "CORE CUTS",
    cluster: "SERVICES - PROMO",
    service_name: "Promo: Quick Cut, Wash & Blow",
    service_description: "Discounted promotional rate for Quick Cut + Wash + Blow package.",
    is_promo: true,
    is_popular: false,
    service_price: 230
  },
  {
    service_code: "PROMO QKC",
    category: "CORE CUTS",
    cluster: "SERVICES - PROMO",
    service_name: "Promo: Quick Cut",
    service_description: "Discounted promotional rate for a Quick Cut service.",
    is_promo: true,
    is_popular: false,
    service_price: 180
  },
  {
    service_code: "PROMO SWC",
    category: "CORE CUTS",
    cluster: "SERVICES - PROMO",
    service_name: "Promo: Slow Cut",
    service_description: "Discounted promotional rate for a Slow Cut service.",
    is_promo: true,
    is_popular: false,
    service_price: 200
  },
  {
    service_code: "PROMO QWB",
    category: "CUTS + WASHES",
    cluster: "SERVICES - PROMO",
    service_name: "Promo: Quick Wash & Blow",
    service_description: "Promotional discount rate for standalone wash and blow-dry.",
    is_promo: true,
    is_popular: false,
    service_price: 90
  },
  {
    service_code: "PROMO SWB",
    category: "CUTS + WASHES",
    cluster: "SERVICES - PROMO",
    service_name: "Promo: Slow Wash & Blow",
    service_description: "Promotional discount rate for deep wash and blow-dry.",
    is_promo: true,
    is_popular: false,
    service_price: 120
  },
  {
    service_code: "PROMO CSB",
    category: "CUTS + SHAVES",
    cluster: "SERVICES - PROMO",
    service_name: "Promo: Cut & Shave (Basic)",
    service_description: "Promotional package rate for Basic Cut & Shave.",
    is_promo: true,
    is_popular: false,
    service_price: 290
  },

  // RETAIL - MERMADE GROOMING
  {
    service_code: "OBP1",
    category: "MERMADE GROOMING",
    cluster: "RETAIL",
    service_name: "Oil Based Pomade 50g",
    service_description: "Heavy hold, traditional shine oil-based pomade (50g canister).",
    is_promo: false,
    is_popular: false,
    service_price: 250
  },
  {
    service_code: "OBP2",
    category: "MERMADE GROOMING",
    cluster: "RETAIL",
    service_name: "Oil Based Pomade 100g",
    service_description: "Heavy hold, traditional shine oil-based pomade (100g canister).",
    is_promo: false,
    is_popular: true,
    service_price: 450
  },
  {
    service_code: "WBP1",
    category: "MERMADE GROOMING",
    cluster: "RETAIL",
    service_name: "Water Based Pomade 50g",
    service_description: "Easy-wash water-soluble styling pomade with medium shine (50g).",
    is_promo: false,
    is_popular: false,
    service_price: 280
  },
  {
    service_code: "WBP2",
    category: "MERMADE GROOMING",
    cluster: "RETAIL",
    service_name: "Water Based Pomade 100G",
    service_description: "Easy-wash water-soluble styling pomade with medium shine (100g).",
    is_promo: false,
    is_popular: false,
    service_price: 480
  },
  {
    service_code: "HMI1",
    category: "MERMADE GROOMING",
    cluster: "RETAIL",
    service_name: "Hair Mist 100ml",
    service_description: "Refreshing hair fragrance mist to neutralize scalp odors.",
    is_promo: false,
    is_popular: false,
    service_price: 220
  },
  {
    service_code: "LIC1",
    category: "MERMADE GROOMING",
    cluster: "RETAIL",
    service_name: "Leave In Conditioner 100ml",
    service_description: "Lightweight formula for soft, tangle-free hair throughout the day.",
    is_promo: false,
    is_popular: false,
    service_price: 320
  },
  {
    service_code: "VTP1",
    category: "MERMADE GROOMING",
    cluster: "RETAIL",
    service_name: "Volume Texture Powder",
    service_description: "Matte finish volumizing hair styling powder for instant lift.",
    is_promo: false,
    is_popular: true,
    service_price: 350
  },
  {
    service_code: "PCB1",
    category: "MERMADE GROOMING",
    cluster: "RETAIL",
    service_name: "Pride Comb",
    service_description: "Durable rainbow-colored styling pocket comb.",
    is_promo: false,
    is_popular: false,
    service_price: 120
  },
  {
    service_code: "PMP",
    category: "MERMADE GROOMING",
    cluster: "RETAIL",
    service_name: "PamayPride",
    service_description: "Handcrafted pride-themed folding hand fan.",
    is_promo: false,
    is_popular: false,
    service_price: 150
  },

  // RETAIL - CONSIGNMENT & MERCH
  {
    service_code: "CONSIGNMENT",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Earrings",
    service_description: "Assorted handcrafted aesthetic earrings.",
    is_promo: false,
    is_popular: false,
    service_price: 150
  },
  {
    service_code: "FFF1",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "FFF1 (Regular) Cakes, Biscuits, Cracker, Sandwiches",
    service_description: "Selection of regular light snacks and baked goods.",
    is_promo: false,
    is_popular: false,
    service_price: 50
  },
  {
    service_code: "FFF2",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "FFF2 (Premium) Cakes, Biscuits, Cracker, Sandwiches",
    service_description: "Selection of premium specialty snacks and pastries.",
    is_promo: false,
    is_popular: false,
    service_price: 90
  },
  {
    service_code: "FFF3",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "FFF3 (Regular) - Chocolate Bars",
    service_description: "Standard local or imported chocolate bar.",
    is_promo: false,
    is_popular: false,
    service_price: 60
  },
  {
    service_code: "FFF4",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "FFF4 (Premium) - Chocolate Bars",
    service_description: "Artisanal or premium dark chocolate bar.",
    is_promo: false,
    is_popular: false,
    service_price: 120
  },
  {
    service_code: "BBB1_SODA",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "BBB1 Sodas",
    service_description: "Chilled canned soda soft drinks.",
    is_promo: false,
    is_popular: false,
    service_price: 50
  },
  {
    service_code: "BBB2",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "BBB2 (Regular) Bottled Waters",
    service_description: "Purified bottled drinking water (500ml).",
    is_promo: false,
    is_popular: false,
    service_price: 25
  },
  {
    service_code: "BBB3",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "BBB3 (Premium) Bottled Waters",
    service_description: "Sparkling water or imported mineral water bottle.",
    is_promo: false,
    is_popular: false,
    service_price: 60
  },
  {
    service_code: "BBB4",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "BBB4 Specialty Beverage",
    service_description: "Specialty cold brews, kombucha, or artisan juices.",
    is_promo: false,
    is_popular: false,
    service_price: 110
  },
  {
    service_code: "FBB3",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "FBB - Coffee",
    service_description: "Freshly brewed hot or iced coffee cup.",
    is_promo: false,
    is_popular: false,
    service_price: 90
  },
  {
    service_code: "PFL",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Pride Flag",
    service_description: "Pride flag merchandise.",
    is_promo: false,
    is_popular: false,
    service_price: 200
  },
  {
    service_code: "STS23",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Sticker Set - Barbs",
    service_description: "Collector sticker sheet set (Barbs edition).",
    is_promo: false,
    is_popular: false,
    service_price: 120
  },
  {
    service_code: "STP24",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Sticker Piece - Barbs Siblings",
    service_description: "Individual waterproof vinyl sticker (Barbs Siblings).",
    is_promo: false,
    is_popular: false,
    service_price: 40
  },
  {
    service_code: "STP25",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Sticker Piece - Moreno, Bi Barbs",
    service_description: "Individual sticker piece (Moreno / Bi Barbs variant).",
    is_promo: false,
    is_popular: false,
    service_price: 40
  },
  {
    service_code: "STP3FOR100",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Sticker Piece 3 for 100",
    service_description: "Bundle deal for any 3 individual consignment stickers.",
    is_promo: true,
    is_popular: false,
    service_price: 100
  },
  {
    service_code: "STSSH",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Sticker Set - Studio Hibang",
    service_description: "Studio Hibang collaborative sticker collection pack.",
    is_promo: false,
    is_popular: false,
    service_price: 150
  },
  {
    service_code: "STP",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Sticker Piece - Assorted",
    service_description: "Random single sticker piece choice.",
    is_promo: false,
    is_popular: false,
    service_price: 35
  },
  {
    service_code: "STS24",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Sticker Set - Siblings (2024)",
    service_description: "2024 edition full sticker set collection.",
    is_promo: false,
    is_popular: false,
    service_price: 140
  },
  {
    service_code: "OTHERCON",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Earrings, necklaces",
    service_description: "Custom artisan jewelry accessories.",
    is_promo: false,
    is_popular: false,
    service_price: 250
  },
  {
    service_code: "ARTS",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Art Prints - Small",
    service_description: "Small postcard size art print on heavy cardstock.",
    is_promo: false,
    is_popular: false,
    service_price: 150
  },
  {
    service_code: "ARTL",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Art Prints - Large",
    service_description: "A4 / Poster size high quality local art print.",
    is_promo: false,
    is_popular: false,
    service_price: 300
  },
  {
    service_code: "CANC",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "CIC Colored Candles",
    service_description: "Aesthetic hand-poured colored soy candle.",
    is_promo: false,
    is_popular: false,
    service_price: 220
  },
  {
    service_code: "CANM",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "CIC Message Candles",
    service_description: "Scented candle with custom hidden secret message.",
    is_promo: false,
    is_popular: false,
    service_price: 280
  },
  {
    service_code: "BVN1",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Bidibidi x Pitik Vagina Necklace",
    service_description: "Artisan collaborative pendant necklace.",
    is_promo: false,
    is_popular: false,
    service_price: 450
  },
  {
    service_code: "BPN1",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Bidibidi x Pitik Penis Necklace",
    service_description: "Artisan collaborative pendant necklace.",
    is_promo: false,
    is_popular: false,
    service_price: 450
  },
  {
    service_code: "BHN1",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Bidibidi x Pitik Hand Necklace",
    service_description: "Hand-sculpted pendant chain necklace.",
    is_promo: false,
    is_popular: false,
    service_price: 400
  },
  {
    service_code: "BFN1",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Bidibidi x Pitik Finger Necklace",
    service_description: "Hand-sculpted finger pendant necklace.",
    is_promo: false,
    is_popular: false,
    service_price: 400
  },
  {
    service_code: "BBB1_BRACELET",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Bidibidi Bead Bracelets",
    service_description: "Handcrafted colorful beaded wristband.",
    is_promo: false,
    is_popular: false,
    service_price: 200
  },
  {
    service_code: "BPB1",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Bidibidi Pompom Bangles",
    service_description: "Fun soft pompom decorative bangle.",
    is_promo: false,
    is_popular: false,
    service_price: 220
  },
  {
    service_code: "BFB1",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Bidibidi Flower Bangles",
    service_description: "Floral woven art statement bangle.",
    is_promo: false,
    is_popular: false,
    service_price: 240
  },
  {
    service_code: "BCB1",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Bidbidi Caras Brooches",
    service_description: "Embroidered face art decorative pin brooch.",
    is_promo: false,
    is_popular: false,
    service_price: 280
  },
  {
    service_code: "LANSHIRT S-XL",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Gupit Filipino Languages Shirt S-XL",
    service_description: "Cotton graphic tee (Gupit Filipino series, Sizes S to XL).",
    is_promo: false,
    is_popular: false,
    service_price: 550
  },
  {
    service_code: "LANSHIRT 2XL-3XL",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Gupit Filipino Languages Shirt 2XL-3XL",
    service_description: "Cotton graphic tee (Gupit Filipino series, Sizes 2XL to 3XL).",
    is_promo: false,
    is_popular: false,
    service_price: 600
  },
  {
    service_code: "SIBSHIRT S-XL",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Barbs Siblings Shirt S-XL",
    service_description: "Barbs Siblings graphic t-shirt (Sizes S to XL).",
    is_promo: false,
    is_popular: false,
    service_price: 550
  },
  {
    service_code: "SIBSHIRT 2XL-3XL",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Barbs Siblings Shirt 2xl-3xl",
    service_description: "Barbs Siblings graphic t-shirt (Sizes 2XL to 3XL).",
    is_promo: false,
    is_popular: false,
    service_price: 600
  },
  {
    service_code: "BOOK10",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Book PHP10",
    service_description: "Pre-loved consignment book.",
    is_promo: false,
    is_popular: false,
    service_price: 10
  },
  {
    service_code: "BOOK20",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Book PHP20",
    service_description: "Pre-loved consignment book.",
    is_promo: false,
    is_popular: false,
    service_price: 20
  },
  {
    service_code: "BOOK50",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Book PHP50",
    service_description: "Pre-loved consignment paperback book.",
    is_promo: false,
    is_popular: false,
    service_price: 50
  },
  {
    service_code: "BOOK100",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Book PHP100",
    service_description: "Pre-loved consignment book.",
    is_promo: false,
    is_popular: false,
    service_price: 100
  },
  {
    service_code: "POS24",
    category: "CONSIGNMENT",
    cluster: "RETAIL",
    service_name: "Postcard - Assorted",
    service_description: "Assorted thematic illustration postcard.",
    is_promo: false,
    is_popular: false,
    service_price: 45
  },
  {
    service_code: "GGC 350",
    category: "GIFT CARD",
    cluster: "RETAIL",
    service_name: "Gift Card 350",
    service_description: "Gift certificate voucher worth PHP 350.",
    is_promo: false,
    is_popular: false,
    service_price: 350
  },
  {
    service_code: "GGC 550",
    category: "GIFT CARD",
    cluster: "RETAIL",
    service_name: "Gift Card 550",
    service_description: "Gift certificate voucher worth PHP 550.",
    is_promo: false,
    is_popular: false,
    service_price: 550
  },

  // RETAIL - PROMO
  {
    service_code: "PULLOUT MERCH",
    category: "CONSIGNMENT",
    cluster: "RETAIL - PROMO",
    service_name: "Pullout Merch Clearance",
    service_description: "Clearance discount option for consignment merch items.",
    is_promo: true,
    is_popular: false,
    service_price: 100
  },
  {
    service_code: "PULLOUT MERMADE",
    category: "MERMADE GROOMING",
    cluster: "RETAIL - PROMO",
    service_name: "Pullout Mermade Clearance",
    service_description: "Clearance discount option for Mermade product stock.",
    is_promo: true,
    is_popular: false,
    service_price: 150
  },

  // CONSUMABLES
  {
    service_code: "CON-BLD",
    category: "CONSUMABLES",
    cluster: "CONSUMABLES",
    service_name: "Consumable - Razor Blades",
    service_description: "Internal record for razor blade usage per haircut service.",
    is_promo: false,
    is_popular: false,
    service_price: 0
  },
  {
    service_code: "CON-NCR",
    category: "CONSUMABLES",
    cluster: "CONSUMABLES",
    service_name: "Consumable - Neck Ruffles",
    service_description: "Sanitary neck strip paper roll usage.",
    is_promo: false,
    is_popular: false,
    service_price: 0
  },
  {
    service_code: "CON-TNC",
    category: "CONSUMABLES",
    cluster: "CONSUMABLES",
    service_name: "Consumable - Tonic & Spray",
    service_description: "In-shop hair tonic and disinfectant spray usage.",
    is_promo: false,
    is_popular: false,
    service_price: 0
  },

  // SYSTEM / OTHER
  {
    service_code: "ADJUSTMENT",
    category: "ADJUSTMENT",
    cluster: "OTHER",
    service_name: "Internal Adjustment",
    service_description: "POS item used to adjust custom transaction amounts.",
    is_promo: false,
    is_popular: false,
    service_price: 0
  },
  {
    service_code: "OVER",
    category: "OVER",
    cluster: "OVER",
    service_name: "Cash Over",
    service_description: "Register discrepancy entry for excess cash.",
    is_promo: false,
    is_popular: false,
    service_price: 0
  },
  {
    service_code: "SHORT",
    category: "SHORT",
    cluster: "SHORT",
    service_name: "Cash Short",
    service_description: "Register discrepancy entry for short cash.",
    is_promo: false,
    is_popular: false,
    service_price: 0
  }
];


const mockUpData = {
  chairs: [
    { id: "chair-1", barberName: "Joshua", isAvailable: false },
    { id: "chair-2", barberName: "Kyric", isAvailable: true },
    { id: "chair-3", barberName: "Roldan", isAvailable: false, notAvailable: true },
    { id: "chair-4", barberName: "Res", isAvailable: true, notAvailable: false }
  ],
  bookneticQueue: [
    {
      ticketId: "bk-101",
      customerName: "Ronald Angelo Ciron",
      time: "2:00 PM",
      service: "Quick Cut",
      preferredBarber: "Any Barber",
      paymentPreference: "Pay at Shop"
    },
    {
      ticketId: "bk-102",
      customerName: "Ronald Angelo Ciron",
      time: "3:00 PM",
      service: "Quick Cut",
      preferredBarber: "Joshua",
      paymentPreference: "Online Paid"
    }
  ],
  tickets: [
    {
      ticketId: "tkt-001",
      customer: { name: "Roy Maxwell Ciron" },
      ticketType: "Walk-in",
      status: "Waiting",
      assignedChairId: null,
      preferredBarber: "Joshua",
      items: [{ id: "s1", name: "Quick Cut", originalPrice: 250, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } },
      waitingMins: 8
    },
    {
      ticketId: "tkt-002",
      customer: { name: "Juan Dela Cruz" },
      ticketType: "Appointment",
      status: "Waiting",
      assignedChairId: null,
      preferredBarber: "Kyric",
      items: [{ id: "s1", name: "Quick Cut", originalPrice: 250, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } },
      waitingMins: 8
    },
    {
      ticketId: "tkt-0021",
      customer: { name: "Kim Harvey Togni" },
      ticketType: "Walk-in",
      status: "Waiting",
      assignedChairId: null,
      preferredBarber: null,
      items: [{ id: "s1", name: "Quick Cut", originalPrice: 250, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } },
      waitingMins: 8
    },
    {
      ticketId: "tkt-003",
      customer: { name: "Roy Francis Ciron" },
      ticketType: "Walk-in",
      status: "In Progress",
      assignedChairId: "chair-1",
      preferredBarber: "Joshua",
      items: [{ id: "s1", name: "Quick Cut", originalPrice: 250, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } }
    },
    {
      ticketId: "tkt-004",
      customer: { name: "Roy Francis" },
      ticketType: "Walk-in",
      status: "Checkout",
      assignedChairId: null,
      preferredBarber: "Joshua",
      assignedBarber: "Joshua",
      items: [{ id: "s1", name: "Quick Cut", originalPrice: 250, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } }
    },
    {
      ticketId: "tkt-005",
      customer: { name: "Christian Obar" },
      ticketType: "Walk-in",
      status: "Paid",
      assignedChairId: null,
      preferredBarber: "Joshua",
      assignedBarber: "Roldan",
      items: [{ id: "s2", name: "Cut and Dye", originalPrice: 400, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } }
    },
    {
      ticketId: "tkt-006",
      customer: { name: "Christian Obar" },
      ticketType: "Walk-in",
      status: "Paid",
      assignedChairId: null,
      preferredBarber: "Joshua",
      assignedBarber: "Roldan",
      items: [{ id: "s2", name: "Cut and Dye", originalPrice: 400, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } }
    },
    {
      ticketId: "tkt-007",
      customer: { name: "Christian Obar" },
      ticketType: "Walk-in",
      status: "Paid",
      assignedChairId: null,
      preferredBarber: "Joshua",
      assignedBarber: "Roldan",
      items: [{ id: "s2", name: "Cut and Dye", originalPrice: 400, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } }
    },
    {
      ticketId: "tkt-008",
      customer: { name: "Christian Obar" },
      ticketType: "Walk-in",
      status: "Paid",
      assignedChairId: null,
      preferredBarber: "Joshua",
      assignedBarber: "Roldan",
      items: [{ id: "s2", name: "Cut and Dye", originalPrice: 400, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } }
    },
    {
      ticketId: "tkt-009",
      customer: { name: "Christian Obar" },
      ticketType: "Walk-in",
      status: "Paid",
      assignedChairId: null,
      preferredBarber: "Joshua",
      assignedBarber: "Roldan",
      items: [{ id: "s2", name: "Cut and Dye", originalPrice: 400, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } }
    },
    {
      ticketId: "tkt-0010",
      customer: { name: "Christian Obar" },
      ticketType: "Walk-in",
      status: "Paid",
      assignedChairId: null,
      preferredBarber: "Joshua",
      assignedBarber: "Roldan",
      items: [{ id: "s2", name: "Cut and Dye", originalPrice: 400, overridePrice: null, quantity: 1 }],
      pricing: { ticketOverride: { isOverridden: false, overrideTotal: null, reason: null } }
    }
  ],
  services: mockUpServiceList
}


// - service_code (String, Key): Short abbreviation (e.g., HC, BT, HS) used as icon letters.
// - category (String, Key): Sub-grouping (e.g., Haircuts, Beard, Grooming).
// - cluster (String, Key): Main group (Service, Retail, Consumables, Service-promo).
// - service_name (String): Full service name.
// - service_description (String): Long detail description.
// - is_promo (Boolean): Flag indicating if the service is a promotion.
// - is_popular (Boolean): Flag indicating if the service is a top seller.
// - Prices are fetched dynamically from a separate database using service_code.


// Service Code	Category	Cluster	Actual
// QKC	CORE CUTS	SERVICES	Quick Cut
// CND	CUTS + COLORS	SERVICES	Cut & Dye
// QKCX	CORE CUTS	SERVICES	Quick Cut (Express)
// SWCX	CORE CUTS	SERVICES	Slow Cut (Express)
// SWCW	CUTS + WASHES	SERVICES	Slow Cut, Wash & Blow
// QKCW	CUTS + WASHES	SERVICES	Quick Cut, Wash & Blow
// SWC	CORE CUTS	SERVICES	Slow Cut
// CSB	CUTS + SHAVES	SERVICES	Cut & Shave (Basic)
// TDT	CORE CUTS	SERVICES	Toddler Trims
// SHS	CUTS + SHAVES	SERVICES	Shave Solo
// MSG	OTHER SERVICES	SERVICES	15-min Massage
// CSP	CUTS + SHAVES	SERVICES	Cut & Shave (Premium)
// CNC	CUTS + COLORS	SERVICES	Cut & Color
// QXE	EXECUTIVE PACKAGES	SERVICES	Quick Executive Care
// QXP	EXECUTIVE PACKAGES	SERVICES	Quick Executive Care (Plus)
// SXE	EXECUTIVE PACKAGES	SERVICES	Slow Executive Care
// SXP	EXECUTIVE PACKAGES	SERVICES	Slow Executive Care (Plus)
// QHS	OTHER SERVICES	SERVICES	Quick Hair Spa
// OBP1	MERMADE GROOMING	RETAIL	Oil Based Pomade 50g
// OBP2	MERMADE GROOMING	RETAIL	Oil Based Pomade 100g
// WBP1	MERMADE GROOMING	RETAIL	Water Based Pomade
// WBP2	MERMADE GROOMING	RETAIL	Water Based Pomade 100G
// HMI1	MERMADE GROOMING	RETAIL	Hair Mist 100ml
// LIC1	MERMADE GROOMING	RETAIL	Leave In Conditioner 100ml
// VTP1	MERMADE GROOMING	RETAIL	Volume Texture Powder
// HRT1	ADD ONS	SERVICES	Hair Art Level 1
// HRT2	ADD ONS	SERVICES	Hair Art Level 2
// HRT3	ADD ONS	SERVICES	Hair Art Level 3
// MRSS	TREATMENTS	SERVICES	Mint, Rosemary and Seasalt Scalp Treatment
// ARG	TREATMENTS	SERVICES	Argan Oil Scalp Treatment
// KHS	TREATMENTS	SERVICES	Keratin Hair Spa
// PSG	TREATMENTS	SERVICES	Premium Styling by Gatsby
// FFF1	CONSIGNMENT	RETAIL	FFF1 (Regular) Cakes, Biscuits, Cracker, Sandwiches
// FFF2	CONSIGNMENT	RETAIL	FFF2 (Premium) Cakes, Biscuits, Cracker, Sandwiches
// FFF3	CONSIGNMENT	RETAIL	FFF3 (Regular) -  Chocolate Bars
// FFF4	CONSIGNMENT	RETAIL	FFF4 (Premium) - Chocolate Bars
// BBB1	CONSIGNMENT	RETAIL	BBB1 Sodas
// BBB2	CONSIGNMENT	RETAIL	BBB2 (Regular) Bottled Waters
// BBB3	CONSIGNMENT	RETAIL	BBB3 (Premium) Bottled Waters
// BBB4	CONSIGNMENT	RETAIL	BBB4 Specialty Beverage
// ADJUSTMENT	ADJUSTMENT	OTHER	Internal Adjustment
// FBB3	CONSIGNMENT	RETAIL	FBB - Coffee
// PCB1	MERMADE GROOMING	RETAIL	Pride Comb
// PMP	MERMADE GROOMING	RETAIL	PamayPride
// PFL	CONSIGNMENT	RETAIL	Pride Flag
// STS23	CONSIGNMENT	RETAIL	Sticker Set - Barbs
// STP24	CONSIGNMENT	RETAIL	Sticker Piece - Barbs Siblings
// STP25	CONSIGNMENT	RETAIL	Sticker Piece - Moreno, Bi Barbs
// STP3FOR100	CONSIGNMENT	RETAIL	Sticker Piece 3 for 100
// STSSH	CONSIGNMENT	RETAIL	Sticker Set - Studio Hibang
// STP	CONSIGNMENT	RETAIL	Sticker Piece - Assorted
// STS24	CONSIGNMENT	RETAIL	Sticker Set - Siblings (2024)
// OTHERCON	CONSIGNMENT	RETAIL	Earrings, necklaces
// ARTS	CONSIGNMENT	RETAIL	Art Prints - Small
// ARTL	CONSIGNMENT	RETAIL	Art Prints - Large
// CANC	CONSIGNMENT	RETAIL	CIC Colored Candles
// CANM	CONSIGNMENT	RETAIL	CIC Message Candles
// BVN1	CONSIGNMENT	RETAIL	Bidibidi x Pitik Vagina Necklace
// BPN1	CONSIGNMENT	RETAIL	Bidibidi x Pitik Penis Necklace
// BHN1	CONSIGNMENT	RETAIL	Bidibidi x Pitik Hand Necklace
// BFN1	CONSIGNMENT	RETAIL	Bidibidi x Pitik Finger Necklace
// BBB1	CONSIGNMENT	RETAIL	Bidibidi Bead Bracelets
// BPB1	CONSIGNMENT	RETAIL	Bidibidi Pompom Bangles
// BFB1	CONSIGNMENT	RETAIL	Bidibidi Flower Bangles
// BCB1	CONSIGNMENT	RETAIL	Bidbidi Caras Brooches
// LANSHIRT S-XL	CONSIGNMENT	RETAIL	Gupit Filipino Languages Shirt S-XL
// LANSHIRT 2XL-3XL	CONSIGNMENT	RETAIL	Gupit Filipino Languages Shirt 2XL-3XL
// SIBSHIRT S-XL	CONSIGNMENT	RETAIL	Barbs Siblings Shirt S-XL
// SIBSHIRT 2XL-3XL	CONSIGNMENT	RETAIL	Barbs Siblings Shirt 2xl-3xl
// GGC 350	GIFT CARD	RETAIL	
// GGC 550	GIFT CARD	RETAIL	
// RED GGC 350	GIFT CARD	SERVICES - PROMO	
// RED GGC 550	GIFT CARD	SERVICES - PROMO	
// CPRM1	TREATMENTS	SERVICES	Cut and Cold Perm 1 (Loose/Korean)
// CPRM2	TREATMENTS	SERVICES	Cut & Cold Perm 2 (Twist/Afro)
// THQQ	GROUP TRIMS	SERVICES	Throuple Trims (Quick Cut)
// THSS	GROUP TRIMS	SERVICES	Throuple Trims (Slow Cut)
// THTT	GROUP TRIMS	SERVICES	Throuple Trims (Toddler Trim)
// THSQ	GROUP TRIMS	SERVICES	
// THQS	GROUP TRIMS	SERVICES	
// TWQQ	TWIN TRIMS	SERVICES	Twin Trims: QKC + QKC
// TWQS	TWIN TRIMS	SERVICES	Twin Trims: QKC + SWC
// TWSQ	TWIN TRIMS	SERVICES	Twin Trims: SWC + QKC
// TWSS	TWIN TRIMS	SERVICES	Twin Trims: SWC + SWC
// TWTT	TWIN TRIMS	SERVICES	Twin Trims: TDT + TDT
// SQKC	CORE CUTS	SERVICES	Students Quick Cut
// SSWC	CORE CUTS	SERVICES	Students Slow Cut
// STWQQ	TWIN TRIMS	SERVICES	
// STWQQ	TWIN TRIMS	SERVICES	
// STWSQ	TWIN TRIMS	SERVICES	
// STWSS	TWIN TRIMS	SERVICES	
// PROMO QKCW	CORE CUTS	SERVICES - PROMO	
// PROMO QKC	CORE CUTS	SERVICES - PROMO	
// PROMO SWC	CORE CUTS	SERVICES - PROMO	
// PROMO QWB	CUTS + WASHES	SERVICES - PROMO	
// PROMO SWB	CUTS + WASHES	SERVICES - PROMO	
// PROMO CSB	CUTS + SHAVES	SERVICES - PROMO	
// PULLOUT MERCH	CONSIGNMENT	RETAIL - PROMO	
// PULLOUT MERMADE	MERMADE GROOMING	RETAIL - PROMO	
// OVER	OVER	OVER	
// SHORT	SHORT	SHORT	
// CON-BLD	CONSUMABLES	CONSUMABLES	
// CON-NCR	CONSUMABLES	CONSUMABLES	
// CON-TNC	CONSUMABLES	CONSUMABLES	
// QWB	CUTS + WASHES	SERVICES	Quick Wash & Blow
// SWB	CUTS + WASHES	SERVICES	Slow Wash & Blow
// CNB	CUTS + COLORS	SERVICES	Cut & Bleach
// CONSIGNMENT	CONSIGNMENT	RETAIL	Earrings
// BOOK10	CONSIGNMENT	RETAIL	Book PHP10
// BOOK20	CONSIGNMENT	RETAIL	Book PHP20
// BOOK50	CONSIGNMENT	RETAIL	Book PHP50
// BOOK100	CONSIGNMENT	RETAIL	Book PHP100
// POS24	CONSIGNMENT	RETAIL	Postcard - Assorted
// SVS	 SHAVE SOLO	SERVICES	
// SHIRT LANGUAGE	CONSIGNMENT	RETAIL	
// SSS1	MERMADE GROOMING	RETAIL	Seasalt Spray
// PPN	MERMADE GROOMING	RETAIL	Pride Pins
// COL-GUA	CONSIGNMENT	RETAIL	Stainless Steel Gua Sha
// COL-EYE	CONSIGNMENT	RETAIL	Eye Patch
// COL-CRR	CONSIGNMENT	RETAIL	Cryosticks
// COL-ROL	CONSIGNMENT	RETAIL	Face Roller
// COL-RSM	CONSIGNMENT	RETAIL	Razor in Smoke
// COL-RST	CONSIGNMENT	RETAIL	Razor in Sterling
// COL-SSM	CONSIGNMENT	RETAIL	Shave Brush - Smoke
// COL-SST	CONSIGNMENT	RETAIL	Shave Brush -Sterling
// COL-THB	CONSIGNMENT	RETAIL	Tall Hair Brush
// COL-PHB	CONSIGNMENT	RETAIL	Petite Hair Brush
// GBC	CONSIGNMENT	RETAIL	Golden Bekis Calendar
// DON	CORE CUTS	SERVICES	HAIR DONATION
// TOT25	CONSIGNMENT	RETAIL	Embroidered Tote Bag 2025
// ARTP	CONSIGNMENT	RETAIL	Art Prints
// ARTB	CONSIGNMENT	RETAIL	Art Prints - Bundle
// CAP26	CONSIGNMENT	RETAIL	Embroidered Suede Cap 2026
// CA PAYMENT	ADJUSTMENT	OTHER	Cash Advance Payment


console.log('Mock up data loaded');
gE()
