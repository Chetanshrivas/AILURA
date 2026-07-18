export interface ServiceSection {
  title: string;
  services: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  sections?: ServiceSection[];
  services?: string[];
}

export const serviceCategories: ServiceCategory[] = [

  {
    id: "nails",
    title: "NAILS",
    sections: [
      {
        title: "NAILS",
        services: [
          "Gel Nail Polish",
          "Russian Manicure",
          "Russian Manicure with French",
        ],
      },
      {
        title: "NAILS EXTENSIONS",
        services: [
          "Temporary Extensions",
          "Acrylic Extensions",
          "Gel Extensions",
          "No-Glue Extensions",
          "Nail Removal",
        ],
      },
      {
        title: "ADD-ON",
        services: [
          "Nail Art (Per Tip)",
          "Glitters & Stones (Per Tip)",
        ],
      },
    ],
  },

  {
    id: "eyelashes",
    title: "EYELASHES",
    services: [
      "Classic",
      "Hybrid",
      "Volume",
      "Mega Volume",
      "Lash Lifting",
      "Lash Refill",
    ],
  },

  {
    id: "hair-essentials",
    title: "HAIR ESSENTIALS",
    sections: [
      {
        title: "ROUTINE SERVICES",
        services: [
          "Classic Head Wash",
          "Keratin Head Wash",
          "Premium Head Wash",
          "Colour Wash",
          "Trimming",
          "Hair Cut",
          "Creative Hair Cut",
          "Hair Cut with Wash",
          "Blow Dryer",
          "Blow Dryer with Wash",
          "Iron/Curls",
          "Hair Do's",
        ],
      },
      {
        title: "COLOUR SERVICES",
        services: [
          "Half Root touch-up",
          "Root touch-up",
          "Half Root touch-up (Ammonia-free)",
          "Root touch-up (Ammonia-free)",
          "Global colour (Ammonia/Ammonia Free)",
          "Crown Highlights/Balayage (Ammonia/Ammonia Free)",
          "Re-bonding/Smoothening Highlights/Balayage",
          "Keratin (CK)",
          "Botox",
        ],
      },
    ],
  },

  {
    id: "wellness-rituals",
    title: "WELLNESS RITUALS",
    sections: [
      {
        title: "RELAXATION SERVICES",
        services: [
          "Regular Head massage (Olive / Almond)",
          "Luxury Head massage (Essential Oil)",
        ],
      },
      {
        title: "ALCHEMY SERVICES",
        services: [
          "Mini SPA",
          "Exoticare SPA",
          "Plex",
          "3 Ten X Alchemy",
          "Liquid Hair",
          "Anti Dandruff Treatment",
        ],
      },
    ],
  },

  {
    id: "women",
    title: "WOMAN",
    sections: [
      {
        title: "BLEACH",
        services: [
          "D-TAN (03+)",
          "Face Bleach",
          "Back Bleach",
          "Front Bleach",
          "Arms Bleach",
          "Legs Bleach",
          "Full Body Bleach",
        ],
      },
      {
        title: "THREADING",
        services: [
          "Face Threading",
          "Eyebrows Threading",
          "Upperlips Threading",
          "Lowerlip Threading",
          "Chin Threading",
          "Forehead Threading",
        ],
      },
      {
        title: "BODY THERAPIES",
        services: [
          "Body Polish (O3+, Alga)",
          "Body D-Tan",
          "Body Exfoliation",
          "Body Exfoliation with Pack",
        ],
      },
      {
        title: "WAXING",
        services: [
          "Arms & Legs (Nor/Rica)",
          "Half Arms wax (Nor/Rica)",
          "Half Legs wax (Nor/Rica)",
          "Front wax (Nor/Rica)",
          "Back wax (Nor/Rica)",
          "Full Body waxing (Nor/Rica)",
          "Face Wax (Nor/Rica/Brazilian)",
          "Upperlips Wax (Nor/Rica)",
          "Chin Wax (Nor/Rica)",
          "Forehead wax (Nor/Rica)",
          "Butts waxing",
          "Bikini Wax (Rica/Brazilian)",
          "Underarms Wax (Nor/Rica)",
        ],
      },
    ],
  },

  {
    id: "men",
    title: "FOR OUR MEN",
    sections: [
      {
        title: "RELAXATION SERVICES",
        services: [
          "Regular Head massage (Olive/ Almond)",
          "Luxury Head massage (Luxe oil with steam)",
        ],
      },
      {
        title: "COLOUR SERVICES",
        services: [
          "Hair Colour",
          "Hair Colour (Ammonia Free)",
          "Hair Colour (Luxe Oil)",
          "Beard Colour",
          "Beard Colour (Ammonia Free)",
          "Highlights",
          "Re-bonding",
          "Keratin treatment",
        ],
      },
      {
        title: "BLEACH",
        services: [
          "Face bleach (Oxylife)",
          "Face D-Tan",
          "Arms Bleach",
          "Arms D-Tan",
        ],
      },
      {
        title: "HAIRCUT & STYLING",
        services: [
          "Head wash: Classic/Keratin/3 Ten X",
          "Hair cut",
          "Creative Haircut",
          "Child Haircut below 5 yrs.",
          "Beard styling/Shaving",
          "Hair Styling",
          "Baby's First Haircut (Mundari)",
        ],
      },
      {
        title: "ALCHEMY SERVICES",
        services: [
          "Exoticare SPA",
          "3 Ten X Alchemy",
          "Energy Serum",
        ],
      },
      {
        title: "TRIMMING",
        services: [
          "Full arms",
          "Full legs",
          "Underarms",
          "Ear & Nose wax (Brazilian)",
        ],
      },
    ],
  },

  {
    id: "facial",
    title: "FACIAL",
    sections: [
      {
        title: "MEN & WOMEN",
        services: [
          "Face Massage Nor/Lotus",
          "Face Massage O3+",
          "Face Mask Lotus",
          "Rubber Mask O3+",
          "Face Scrub Nor / Lotus / O3+",
          "Cleanup Nor / Lotus",
          "Cleanup O3+ / Diamond",
          "Facial Nor / Lotus",
          "Facial O3+ / Skeyndor",
          "Facial O3+ / Diamond",
          "Derma Facial",
          "Kanpeki Facial",
        ],
      },
    ],
  },

  {
    id: "hands-feet",
    title: "HANDS & FEET",
    sections: [
      {
        title: "HANDS",
        services: [
          "Normal Manicure",
          "AVL Manicure",
          "Alga Manicure",
        ],
      },
      {
        title: "FEET",
        services: [
          "Foot Massage",
          "Normal Pedicure",
          "AVL Pedicure",
          "Alga Pedicure",
        ],
      },
    ],
  },

  {
    id: "makeup",
    title: "MAKEUP",
    sections: [
      {
        title: "MAKEUP",
        services: [
          "Eye Liner",
          "Eyelashes application",
          "Eye Make up (Single Shade)",
          "Eye Make-up with glitters & Shimmers",
          "Party make-up",
          "Engagement & Reception Makeup",
          "Bridal Make-up",
          "Groom Makeup",
        ],
      },
      // {
      //   title: "GROOM PACKAGE",
      //   services: [
      //     "Option 1",
      //     "Option 2",
      //   ],
      // },
    ],
  },

  // {
  //   id: "pre-bridal-package",
  //   title: "PRE-BRIDAL PACKAGE",
  //   sections: [
  //     {
  //       title: "MAKEUP",
  //       services: [
  //         "Option 1",
  //         "Option 2",
  //         "Option 3",
  //       ],
  //     },
  //   ],
  // },

  {
    id: "korean-hair-spa",
    title: "AILURA KOREAN HAIR SPA MENU",
    sections: [
      {
        title: "HAIR SPA MENU",
        services: [
          "Korean Express Hair Spa",
          "Signature Korean Hair Spa",
          "Premium Korean Head Spa Ritual",
          "Luxury Korean Scalp Rejuvenation Therapy",
        ],
      },
      {
        title: "ADD-ON TREATMENTS",
        services: [
          "Hair Fall Control Ampoule",
          "Anti-Dandruff Scalp Booster",
          "Keratin Protein Shot",
          "LED Scalp Therapy",
          "Collagen Hair Mask Upgrade",
          "Shoulder & Neck Massage (15 mins)",
        ],
      },
      // {
      //   title: "RECOMMENDED PACKAGES",
      //   services: [
      //     "3 Sessions Package",
      //     "6 Sessions Package",
      //   ],
      // },
    ],
  }, 

];