/**
 * Jaiswal Furniture - Central Data Store
 * "Crafted Comfort for Every Home" - Est. 1989
 */

const JF_DATA = {
  brand: {
    name: "Jaiswal Furniture",
    tagline: "Crafted Comfort for Every Home",
    established: 1989,
    phone: "+91 98201 54890",
    altPhone: "+91 22 2493 8811",
    email: "concierge@jaiswalfurniture.com",
    whatsapp: "919820154890",
    address: {
      line1: "Plot 42, Jaiswal Heritage Lane, Lower Parel West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400013",
      landmark: "Opposite High Street Phoenix"
    },
    hours: "Mon – Sun: 10:30 AM – 8:30 PM",
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      pinterest: "https://pinterest.com",
      youtube: "https://youtube.com"
    }
  },

  categories: [
    {
      id: "sofas",
      name: "Sofas & Loungers",
      subtitle: "Curated sectionals, velvet Chesterfield & armchairs",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      itemCount: "42+ Designs"
    },
    {
      id: "beds",
      name: "Solid Wood Beds",
      subtitle: "King & Queen hydraulic storage beds in Teak & Sheesham",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      itemCount: "35+ Designs"
    },
    {
      id: "dining",
      name: "Dining Sets",
      subtitle: "4, 6 & 8-seater handcrafted dining tables & cane chairs",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
      itemCount: "28+ Designs"
    },
    {
      id: "wardrobes",
      name: "Artisanal Wardrobes",
      subtitle: "Modular solid wood closets, fluted brass accents",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
      itemCount: "24+ Designs"
    },
    {
      id: "office",
      name: "Executive Office",
      subtitle: "Solid wood study desks, ergonomic chairs & credenzas",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
      itemCount: "19+ Designs"
    },
    {
      id: "outdoor",
      name: "Outdoor & Balcony",
      subtitle: "Weatherproof teak patio sets, swing chairs & planters",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      itemCount: "16+ Designs"
    }
  ],

  products: [
    {
      id: "aura-curved-sofa",
      name: "Aura Sculptural Curved Sofa",
      category: "sofas",
      categoryLabel: "Sofas & Loungers",
      price: 64999,
      originalPrice: 78000,
      badge: "Best Seller",
      rating: 4.9,
      reviewsCount: 52,
      woodType: "American Walnut",
      dimensions: "W 240cm × D 105cm × H 76cm (Seat H 44cm)",
      material: "Kiln-Dried Walnut Frame, High-Resilience 40D Foam, Textured Boucle Fabric",
      finishes: [
        { name: "Cream Boucle & Walnut", hex: "#E9E3DA" },
        { name: "Sage Green & Natural Teak", hex: "#7E8D7B" },
        { name: "Midnight Charcoal & Smoked Oak", hex: "#353839" }
      ],
      fabricOptions: ["Italian Textured Boucle", "Heavyweight Linen", "Performance Velvet"],
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "An iconic organic silhouette engineered for sublime ergonomic comfort. Built on a kiln-dried hardwood frame with brass-tipped taper legs.",
      fullDesc: "The Aura Sculptural Sofa represents the pinnacle of modern Indian luxury living. Inspired by soft architectural curves and mid-century masters, each piece is painstakingly sculpted by master woodworkers in our Lower Parel workshop. Wrapped in imported stain-resistant boucle fabric over dual-density high resilience foam, it balances statement aesthetics with plush everyday lounging.",
      specs: {
        "Wood Species": "Grade-A American Walnut & Seasoned Hardwood",
        "Joinery": "Mortise and Tenon with Corner Block Reinforcements",
        "Foam Density": "Dual Layer 40 Density High Resilience Reflex Foam",
        "Seating Capacity": "4-5 Persons Comfortably",
        "Warranty": "10-Year Comprehensive Frame Warranty",
        "Assembly": "Free White-Glove Installation Included"
      },
      inStock: true
    },
    {
      id: "maharaja-teak-dining-set",
      name: "Maharaja 6-Seater Teak Dining Set",
      category: "dining",
      categoryLabel: "Dining Sets",
      price: 54500,
      originalPrice: 66000,
      badge: "Heritage Pick",
      rating: 4.8,
      reviewsCount: 38,
      woodType: "Teak Wood",
      dimensions: "Table: L 180cm × W 90cm × H 76cm | Chairs: H 92cm",
      material: "100% Solid Seasoned CP Teak (Sagwan), Organic Matt PU Polyurethane Finish",
      finishes: [
        { name: "Natural Warm Teak", hex: "#A56B38" },
        { name: "Rich Walnut Stain", hex: "#3E261A" },
        { name: "Raw Honey Teak", hex: "#B88349" }
      ],
      fabricOptions: ["Hand-Woven Natural Rattan Back", "Cushioned Linen", "Saddle Tan Leatherette"],
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Timeless 6-seater solid teak dining table with chamfered edges paired with 6 handcrafted cane-back ergonomically contoured dining chairs.",
      fullDesc: "Crafted from seasoned Central Province Teakwood renowned for its high oil content and perpetual termite resistance. The table top showcases natural swirling golden grain patterns preserved under a silky matte sealant. Chairs feature hand-woven French rattan webbing for natural ventilation and timeless appeal.",
      specs: {
        "Wood Species": "100% Solid Kiln-Dried CP Teak (Sagwan)",
        "Includes": "1 Dining Table + 6 Ergonomic Cane Chairs",
        "Finish": "Eco-Friendly Polyurethane Matte with UV Protective Coating",
        "Weight Bearing": "Up to 300 kg distributed table weight",
        "Warranty": "10-Year Warranty against termites & warping",
        "Assembly": "Assembled on-site by our expert technicians"
      },
      inStock: true
    },
    {
      id: "kavya-hydraulic-storage-bed",
      name: "Kavya King Bed with Hydraulic Storage",
      category: "beds",
      categoryLabel: "Solid Wood Beds",
      price: 44999,
      originalPrice: 54000,
      badge: "Most Popular",
      rating: 4.9,
      reviewsCount: 64,
      woodType: "Sheesham Wood",
      dimensions: "King Size: L 215cm × W 192cm × H 115cm (Mattress: 72×78 in)",
      material: "Solid Kiln-Dried Indian Rosewood (Sheesham), Heavy-Gauge German Hydraulic Lift",
      finishes: [
        { name: "Warm Honey Teak", hex: "#9E6437" },
        { name: "Deep Walnut", hex: "#41261B" },
        { name: "Teak Gloss", hex: "#7B461F" }
      ],
      fabricOptions: ["Tufted Cream Linen Headboard", "Olive Suede Headboard"],
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Stately solid Sheesham bed featuring an upholstered acoustic fluted headboard and effortless German hydraulic lift-up under-bed storage.",
      fullDesc: "Designed for modern homes where generous storage meets aristocratic aesthetics. The heavy solid Sheesham frame provides a squeak-free, grounded resting sanctuary. German gas-lift cylinders enable smooth lifting of the mattress platform with one finger, uncovering 850 liters of clean, partitioned underbed storage.",
      specs: {
        "Wood Species": "Kiln-Dried Solid Sheesham (Indian Rosewood)",
        "Storage Mechanism": "German Gas Struts (1200N Capacity) with Dual Safety Locks",
        "Storage Capacity": "Approx. 850 Litres Partitioned Clean Storage",
        "Recommended Mattress": "Standard Indian King (72 in × 78 in × up to 10 in)",
        "Warranty": "10-Year Structural & Termite Warranty; 5-Year Mechanism",
        "Assembly": "Full White-Glove Installation"
      },
      inStock: true
    },
    {
      id: "nilgiri-fluted-wardrobe",
      name: "Nilgiri 3-Door Solid Wood Wardrobe",
      category: "wardrobes",
      categoryLabel: "Artisanal Wardrobes",
      price: 58000,
      originalPrice: 72000,
      badge: "Artisan Edition",
      rating: 4.7,
      reviewsCount: 29,
      woodType: "Teak Wood",
      dimensions: "W 150cm × D 60cm × H 210cm",
      material: "Solid Teak Fronts with Fluted Architectural Paneling, Brushed Brass Hardware",
      finishes: [
        { name: "Smoked Walnut", hex: "#3A2B24" },
        { name: "Natural Honey Teak", hex: "#A46D3E" }
      ],
      fabricOptions: ["Internal Velvet Jewelry Drawer Trays"],
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Architectural 3-door wardrobe with fluted wood textures, internal motion LED lights, brass hanging rails, and concealed vanity drawers.",
      fullDesc: "Elevate your bedroom suite with the Nilgiri 3-Door Wardrobe. Featuring fluted timber detailing chiseled by hand, soft-close Blum hinges, and brushed satin brass bar pulls. The interior includes cedar-lined suit compartments, velvet-lined jewelry organizer drawers, and a built-in full length mirror on the center door interior.",
      specs: {
        "Wood Species": "Grade-A Seasoned Teak Frame with Solid Wood Paneling",
        "Hinges & Hardware": "Soft-close hydraulic concealed hinges & solid brass pulls",
        "Interior Configuration": "Long hanging bay, 6 shelving compartments, 2 lockable drawers",
        "Warranty": "10-Year Warranty",
        "Assembly": "Assembled in 90 mins by our factory team"
      },
      inStock: true
    },
    {
      id: "viceroy-executive-study-desk",
      name: "Viceroy Executive Solid Teak Desk",
      category: "office",
      categoryLabel: "Executive Office",
      price: 29500,
      originalPrice: 36000,
      badge: "New Arrival",
      rating: 4.8,
      reviewsCount: 31,
      woodType: "Teak Wood",
      dimensions: "L 150cm × W 75cm × H 76cm",
      material: "Solid Seasoned Teakwood, Leather Writing Inset, Brass Grommets",
      finishes: [
        { name: "Walnut Brown", hex: "#392217" },
        { name: "Classic Teak", hex: "#995C2B" }
      ],
      fabricOptions: ["Hand-Stitched Tan Vegan Leather Desktop Inlay"],
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Refined workstation built with solid teakwood, concealed cable raceway, 4 dovetail drawers, and a tactile leather writing surface.",
      fullDesc: "Designed for leaders, authors, and professionals working from home. The Viceroy Study Desk pairs classic mid-century lines with modern workspace essentials. A discreet solid brass cable grommet channels laptop and monitor cables directly to an under-desk cable management tray.",
      specs: {
        "Wood Species": "Kiln-Dried Seasoned Indian Teak",
        "Drawers": "4 English Dovetail Drawers with Soft-Closing Slides",
        "Cable Management": "Concealed wire raceway & brass grommet included",
        "Warranty": "10-Year Structural Guarantee",
        "Assembly": "Delivered pre-assembled; legs mounted on site"
      },
      inStock: true
    },
    {
      id: "malabar-rattan-lounge-chair",
      name: "Malabar Cane & Teak Lounge Armchair",
      category: "sofas",
      categoryLabel: "Sofas & Loungers",
      price: 18500,
      originalPrice: 23000,
      badge: "Trending",
      rating: 4.9,
      reviewsCount: 44,
      woodType: "Cane & Teak",
      dimensions: "W 72cm × D 80cm × H 78cm (Seat H 40cm)",
      material: "Solid Teak Wood, Hand-Woven Natural Assam Cane, Linen Cushion",
      finishes: [
        { name: "Natural Honey Teak", hex: "#AF7743" },
        { name: "Dark Walnut", hex: "#3B261A" }
      ],
      fabricOptions: ["Sand Beige Linen", "Forest Olive Cotton Canvas", "Rust Terracotta"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "A tribute to tropical modernism with octagonal rattan weave backrest, floating teak armrests, and an ultra-comfortable supportive posture.",
      fullDesc: "A sanctuary for reading and contemplation. The Malabar Lounge Chair merges time-honored cane weaving traditions of Assam with precision-sanded solid teak frames. Perfectly angled for lower back relaxation without feeling bulky.",
      specs: {
        "Wood Species": "Grade-A Indian Teakwood & Natural Unbleached Cane",
        "Cushioning": "High-density polyurethane foam wrapped in soft batting",
        "Cover": "Removable and dry-cleanable linen cover",
        "Weight": "11 kg (Easily movable)",
        "Warranty": "5-Year Guarantee"
      },
      inStock: true
    },
    {
      id: "elysian-sculptural-coffee-table",
      name: "Elysian Organic Walnut Coffee Table",
      category: "dining",
      categoryLabel: "Dining & Living",
      price: 16999,
      originalPrice: 21500,
      badge: "Design Icon",
      rating: 4.8,
      reviewsCount: 39,
      woodType: "American Walnut",
      dimensions: "L 125cm × W 70cm × H 42cm",
      material: "Solid American Walnut with Fluted Drum Pedestal Base",
      finishes: [
        { name: "Rich American Walnut", hex: "#42281D" },
        { name: "Nordic Bleached Ash", hex: "#D6C7B2" }
      ],
      fabricOptions: [],
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Sculptural organic pebble silhouette with smooth beveled edges resting upon a statement fluted wooden drum base.",
      fullDesc: "Breaking away from rigid right angles, the Elysian Coffee Table introduces natural fluidity to your living room. The thick tabletop has been triple-sanded by hand and finished with organic protective oils that bring out rich dark walnut grain swirls.",
      specs: {
        "Wood Species": "Solid American Walnut Timber",
        "Edge Detail": "Soft Beveled Radius Edge",
        "Coating": "Zero-VOC Organic Hardwax Oil",
        "Weight": "24 kg",
        "Warranty": "10-Year Warranty"
      },
      inStock: true
    },
    {
      id: "udaipur-geometric-bookshelf",
      name: "Udaipur Handcrafted Sheesham Bookshelf",
      category: "office",
      categoryLabel: "Living & Office",
      price: 24500,
      originalPrice: 30000,
      badge: "Best Seller",
      rating: 4.9,
      reviewsCount: 36,
      woodType: "Sheesham Wood",
      dimensions: "W 110cm × D 35cm × H 180cm",
      material: "Solid Kiln-Seasoned Sheesham Wood with Asymmetric Open Display Cubbies",
      finishes: [
        { name: "Natural Honey Sheesham", hex: "#9B5D2A" },
        { name: "Dark Walnut Finish", hex: "#3F271B" }
      ],
      fabricOptions: [],
      image: "https://images.unsplash.com/photo-1594652634010-275456c808d0?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1594652634010-275456c808d0?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Asymmetrical open bookcase and curio display cabinet showcasing distinct alternating grains of authentic Indian Sheesham wood.",
      fullDesc: "Turn your literary collection and art decor into an exhibition. The Udaipur Bookshelf features variable-height cubbies tailored for large coffee table books, sculptures, and indoor potted plants. Anti-tip wall anchor hardware included for complete safety.",
      specs: {
        "Wood Species": "100% Solid Seasoned Sheesham Wood",
        "Shelf Load": "Tested up to 35 kg per individual shelf",
        "Safety": "Anti-tip wall safety kit included",
        "Warranty": "10-Year Termite & Structural Warranty"
      },
      inStock: true
    },
    {
      id: "samudra-teak-outdoor-patio-set",
      name: "Samudra All-Weather Teak Balcony Set",
      category: "outdoor",
      categoryLabel: "Outdoor & Balcony",
      price: 22999,
      originalPrice: 28500,
      badge: "Weatherproof",
      rating: 4.7,
      reviewsCount: 22,
      woodType: "Teak Wood",
      dimensions: "Table: Dia 65cm × H 72cm | 2 Folding Armchairs",
      material: "Grade-A Marine Teak with Brass Fasteners & All-Weather Quick-Dry Cushions",
      finishes: [
        { name: "Natural Marine Teak", hex: "#9E683A" }
      ],
      fabricOptions: ["Water-Repellent Sunbrella Oatmeal Cushion Covers"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Compact 3-piece folding patio ensemble engineered with high-oil teak to naturally withstand monsoon rains and intense tropical sunshine.",
      fullDesc: "Designed for apartment balconies, verdant verandas, and garden courtyards. Teakwood's innate natural oils prevent rot and insect damage. Folds away flat in seconds for versatile seasonal use.",
      specs: {
        "Wood Species": "Grade-A Marine Grade Kiln-Dried Teak",
        "Components": "1 Round Folding Bistro Table + 2 Foldable Chairs",
        "Fasteners": "100% Solid Marine-Grade Brass Hinges",
        "Warranty": "7-Year Outdoor Weather Warranty"
      },
      inStock: true
    },
    {
      id: "zenith-slatted-tv-credenza",
      name: "Zenith Slatted Solid Walnut Media Unit",
      category: "sofas",
      categoryLabel: "Living Room Storage",
      price: 31500,
      originalPrice: 39000,
      badge: "New Arrival",
      rating: 4.8,
      reviewsCount: 25,
      woodType: "American Walnut",
      dimensions: "L 180cm × D 42cm × H 52cm",
      material: "Kiln-Dried Walnut with Slatted Accordion Sliding Doors, Acoustic Cloth Backing",
      finishes: [
        { name: "Dark Walnut", hex: "#3A2418" },
        { name: "Honey Teak Finish", hex: "#9B6434" }
      ],
      fabricOptions: [],
      image: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Low-profile media credenza with continuous slatted doors that allow remote control IR signals to pass through seamlessly.",
      fullDesc: "Keep your home entertainment setup neat and uncluttered. Accommodates TVs up to 75 inches. Slatted acoustic-friendly facade allows airflow to prevent amplifiers and gaming consoles from overheating.",
      specs: {
        "Wood Species": "Solid American Walnut & Seasoned Ply Sub-chassis",
        "TV Compatibility": "Supports screens up to 75 inches (Up to 70 kg)",
        "Ventilation": "Slatted vents & rear wire pass-through ports",
        "Warranty": "10-Year Warranty"
      },
      inStock: true
    },
    {
      id: "devbhoomi-handcrafted-mandir",
      name: "Devbhoomi Solid Teak Home Temple",
      category: "wardrobes",
      categoryLabel: "Bespoke & Devotional",
      price: 36000,
      originalPrice: 45000,
      badge: "Sacred Craft",
      rating: 5.0,
      reviewsCount: 41,
      woodType: "Teak Wood",
      dimensions: "W 90cm × D 55cm × H 135cm",
      material: "Pure CP Teakwood with Brass Bells, Pull-Out Prasad Tray & Pooja Drawers",
      finishes: [
        { name: "Sacred Honey Teak", hex: "#A8703E" },
        { name: "Dark Antique Teak", hex: "#442A1D" }
      ],
      fabricOptions: [],
      image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Vastu-compliant sanctum handcrafted in pure CP Teak with genuine tuned brass bells, dome shikhara, pull-out bhog tray, and samagri drawers.",
      fullDesc: "Infuse your home with serenity and devotional elegance. Built following traditional proportions by our dedicated third-generation temple carvers. Features dedicated brass hooks with 12 suspended mini bells and warm concealed LED spotlight socket.",
      specs: {
        "Wood Species": "100% Solid Seasoned Teak Wood (Sagwan)",
        "Features": "Pull-out Diya/Bhog tray, 2 incense drawers, illuminated canopy",
        "Vastu Compliant": "Designed as per sacred Vastu Shastra dimensions",
        "Warranty": "Lifetime Wood Durability Guarantee"
      },
      inStock: true
    },
    {
      id: "roopam-arched-dressing-mirror",
      name: "Roopam Arched Solid Wood Floor Mirror",
      category: "wardrobes",
      categoryLabel: "Bedroom Decor",
      price: 13500,
      originalPrice: 17000,
      badge: "Trending",
      rating: 4.8,
      reviewsCount: 33,
      woodType: "Sheesham Wood",
      dimensions: "W 65cm × H 180cm × D 8cm",
      material: "Hand-Carved Solid Sheesham Arch, High-Definition Distortion-Free Saint-Gobain Mirror",
      finishes: [
        { name: "Warm Sheesham", hex: "#9E602F" },
        { name: "Walnut Stain", hex: "#3E261A" }
      ],
      fabricOptions: [],
      image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1000&q=80"
      ],
      shortDesc: "Graceful full-length arched floor mirror with an integrated solid wood base kickstand and concealed vanity jewelry pegs.",
      fullDesc: "Add depth, light, and vintage grandeur to your master bedroom or dressing alcove. The curved arch frame is joined with traditional mortise joints and fitted with premium distortion-free 5mm Saint-Gobain silvered glass.",
      specs: {
        "Wood Species": "Solid Sheesham Hardwood",
        "Mirror": "5mm Saint-Gobain Distortion-Free Glass with Shatterproof Safety Backing",
        "Mounting": "Free-standing rear kickstand or heavy-duty wall cleat",
        "Warranty": "5-Year Frame Warranty"
      },
      inStock: true
    }
  ],

  testimonials: [
    {
      name: "Arjun & Priyanka Singhania",
      location: "Worli Sea Face, Mumbai",
      comment: "We furnished our entire 4BHK with Jaiswal Furniture after visiting their Lower Parel workshop. Seeing the master artisans hand-plane the teak dining table convinced us. Two years later, the wood looks even richer. Truly generational furniture.",
      rating: 5,
      project: "Full Home Teak & Walnut Commission",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Meera Subramanian",
      location: "Indiranagar, Bengaluru",
      comment: "The custom hydraulic Sheesham bed is magnificent. In Bangalore's humid months, lesser wood swells and squeaks, but Jaiswal's seasoned timber hasn't budged a millimeter. The delivery and white-glove setup was seamless.",
      rating: 5,
      project: "Kavya Hydraulic Bed & Custom Wardrobe",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Dr. Vikramaditya Rathore",
      location: "Golf Course Road, Gurugram",
      comment: "Finding authentic 100% solid wood without MDF or cheap veneer shortcutting is rare nowadays. Jaiswal Furniture maintains the old-world integrity of Indian craftsmanship. Their team customized our 10-seater conference dining table perfectly.",
      rating: 5,
      project: "Custom Bespoke Dining & Study Desk",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  ],

  galleryItems: [
    {
      id: "gal-1",
      title: "Bespoke Teak Living Room Sanctuary",
      category: "living",
      categoryLabel: "Living Room",
      location: "Bandra West, Mumbai",
      wood: "American Walnut & Natural Teak",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      description: "Custom curved sectional paired with fluted walnut wall paneling and hand-finished nesting center tables."
    },
    {
      id: "gal-2",
      title: "Penthouse Dining with 8-Seater Sagwan Table",
      category: "dining",
      categoryLabel: "Dining Space",
      location: "Alipore, Kolkata",
      wood: "100% Solid Central Province Teak",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      description: "Bookmatched single-slab aesthetic teak dining table complemented with woven cane back dining chairs."
    },
    {
      id: "gal-3",
      title: "Minimalist Master Bedroom Suite",
      category: "bedroom",
      categoryLabel: "Master Bedroom",
      location: "Jubilee Hills, Hyderabad",
      wood: "Seasoned Sheesham & Cane",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      description: "Floating platform bed with acoustic upholstered headboard and matching cantilevered nightstands."
    },
    {
      id: "gal-4",
      title: "Boutique Executive Study & Library",
      category: "office",
      categoryLabel: "Executive Office",
      location: "Lutyens Bungalow Zone, Delhi",
      wood: "Dark Walnut & Brass Inlay",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      description: "Floor-to-ceiling floor library with rolling ladder and leather-inlaid executive study desk."
    },
    {
      id: "gal-5",
      title: "Hand-Chiseled Teak Pooja Mandir Sanctum",
      category: "bespoke",
      categoryLabel: "Custom Craft",
      location: "Sadashivanagar, Bengaluru",
      wood: "Heritage Teak & Cast Brass",
      image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80",
      description: "Traditional Shikhar architecture with jali screen back panels and concealed warm ambient lighting."
    },
    {
      id: "gal-6",
      title: "Sunlit Veranda Patio Collection",
      category: "outdoor",
      categoryLabel: "Patio & Veranda",
      location: "Assagao, Goa",
      wood: "Marine Grade All-Weather Teak",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      description: "Weather-resistant daybeds and deep-seated armchairs designed for tropical coastal moisture."
    }
  ]
};

// Expose globally
if (typeof window !== "undefined") {
  window.JF_DATA = JF_DATA;
}
