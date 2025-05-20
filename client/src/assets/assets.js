import logo from "../assets/images/logo.png";
import cleaning from "../assets/images/cleaning/vaccumcleaner.png";
import electic from "../assets/images/electric/electrician.png";
import menspa from "../assets/images/men/menspa.png";
import massage from "../assets/images/men/massage.png";
import womenspa from "../assets/images/women/womenspa.png";
import womensalon from "../assets/images/women/womensalon.png";
import womenhair from "../assets/images/women/womenhair.png";
import ac from "../assets/images/ac/ac.png";
import wm from "../assets/images/ac/wm.png";
import women from '../assets/images/service/women.jpg';
import electician from '../assets/images/service/electician.jpg';
import clean from '../assets/images/service/clean.jpg';
import certificate from '../assets/images/benefits/certificate.gif';
import bestquality from '../assets/images/benefits/bestquality.gif';
import timeismoney from '../assets/images/benefits/timeismoney.gif';
import bestcustomer from '../assets/images/benefits/bestcustomer.gif';
import menfacial from '../assets/images/menscroll/facial.jpg';
import menhaircut from '../assets/images/menscroll/haircut.jpg';
import menmassage from '../assets/images/menscroll/massage.jpg';
import womenfacial from '../assets/images/womenscroll/facial.jpg';
import womenhaircut from '../assets/images/womenscroll/haircut.jpg';
import womenmassage from '../assets/images/womenscroll/massage.jpg';

export const images = {
  logo,
  women,
  electician,
  clean,
  certificate,
  bestquality,
  timeismoney,
  bestcustomer,
  menfacial,
  menhaircut,
  menmassage,
  womenfacial,
  womenhaircut,
  womenmassage
};

export const category = [
  {
    image: womensalon,
    title: "Women's Salon & Spa",
    services: [
      {
        subtitle: "Women's Salon & Spa",
        subservices: [
          {
            image: womensalon,
            name: "Salon For Women",
          },
          {
            image: womenspa,
            name: "Spa For Women",
          },
          {
            image: womenhair,
            name: "Hair Studio For Women",
          },
        ],
      },
    ],
  },
  {
    image: menspa,
    title: "Men's Salon & Massage",
    services: [
      {
        subtitle: "Men's Salon & Massage",
        subservices: [
          {
            image: menspa,
            name: "Salon For Men",
          },
          {
            image: massage,
            name: "Massage For Men",
          },
        ],
      },
    ],
  },
  {
    image: ac,
    title: "AC & Appliance Repair",
    services: [
      {
        subtitle: "Home Appliances",
        subservices: [
          {
            image: ac,
            name: "AC",
          },
          {
            image: wm,
            name: "Washing Machine Repair",
          },
          {
            image: "",
            name: "Geyser Repair",
          },
        ],
      },
      {
        subtitle: "Kitchen Appliances",
        subservices: [
          {
            image: "",
            name: "Water Purifier Repair",
          },
          {
            image: "",
            name: "Refrigerator Repair",
          },
          {
            image: "",
            name: "Microwave Repair",
          },
          {
            image: "",
            name: "Chimney Repair",
          },
        ],
      },
    ],
  },
  {
    image: cleaning,
    title: "Cleaning",
    services: [
      {
        subtitle: "Cleaning",
        subservices: [
          {
            image: "",
            name: "Bathroom & Kitchen Cleaning",
          },
          {
            image: "",
            name: "Sofa & Carper Cleaning",
          },
        ],
      },
    ],
  },
  {
    image: electic,
    title: "Electrician, Plumber & Carpenter",
  },
];


export const serviceCategories = [
  {
    id: "salon-for-women",
    name: "Salon for Women",
    image: "",
    subcategories: [
      {
        id: "salon-women-packages",
        name: "Packages",
        services: [
          {
            id: "complete-waxing",
            title: "Complete Waxing",
            review: 4.85,
            price: 1037,
            offerPrice: 933,
            time: "60 min",
            description: [
              { title: "Waxing", summary: "Full Arms" },
              { title: "Facial hair removal", summary: "Upper lip" },
            ],
          },
          {
            id: "wax-and-glow",
            title: "Wax & Glow",
            review: 4.85,
            price: 1587,
            offerPrice: 1428,
            time: "2 hrs 15 mins",
            description: [
              { title: "Waxing", summary: "Full Arms" },
              { title: "Facial", summary: "Saraa Lightening" },
            ],
          },
        ],
      },
      {
        id: "salon-women-waxing",
        name: "Waxing",
        services: [
          {
            id: "bikini-waxing",
            title: "Bikini Line Waxing",
            review: 4.88,
            price: 249,
            offerPrice: 249,
            time: "",
            description: [
              { title: "Waxing", summary: "Cover the area around pelvis" },
            ],
          },
          {
            id: "full-arm-waxing",
            title: "Full Arms Waxing",
            review: 4.88,
            price: 319,
            offerPrice: 319,
            time: "",
            description: [
              {
                title: "Waxing",
                summary: "Honey-based strip wax for smooth hair removal",
              },
            ],
          },
        ],
      },
      {
        id: "salon-women-pedicure",
        name: "Pedicure",
        services: [
          {
            id: "british-rose-pedicure",
            title: "Elysian British Rose Pedicure",
            review: 4.88,
            price: 1000,
            offerPrice: 749,
            time: "",
            description: [
              {
                title: "",
                summary:
                  "Rose salt soak. Rose and jojoba oil scrub. Rose mask.",
              },
            ],
          },
          {
            id: "foot-massage",
            title: "Foot massage",
            review: 4.82,
            price: 300,
            offerPrice: 200,
            time: "10 min",
            description: [
              {
                title: "",
                summary: "Micromovement techniques relax feet",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "salon-for-men",
    name: "Salon for Men",
    image: "",
    subcategories: [
      {
        id: "hair-beard",
        name: "Hair & Beard",
        services: [
          {
            id: "haircut-styling",
            title: "Haircut & Styling",
            review: 4.9,
            price: 300,
            offerPrice: 250,
            time: "30 min",
            description: [{ title: "Haircut", summary: "Trendy cut & style" }],
          },
          {
            id: "beard-grooming",
            title: "Beard Grooming",
            review: 4.85,
            price: 199,
            offerPrice: 149,
            time: "20 min",
            description: [{ title: "Beard", summary: "Shaping & trimming" }],
          },
        ],
      },
      {
        id: "massage-men",
        name: "Massage",
        services: [
          {
            id: "swedish-massage",
            title: "Swedish Massage",
            review: 4.8,
            price: 1500,
            offerPrice: 1299,
            time: "1 hr",
            description: [
              {
                title: "Massage",
                summary: "Relaxing full-body therapy",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    image: "",
    subcategories: [
      {
        id: "home-appliances",
        name: "Home Appliances",
        services: [
          {
            id: "ac-repair",
            title: "AC Repair",
            review: 4.7,
            price: 499,
            offerPrice: 399,
            time: "45 min",
            description: [
              { title: "AC", summary: "Cooling issues, gas refill" },
            ],
          },
          {
            id: "washing-machine-repair",
            title: "Washing Machine Repair",
            review: 4.6,
            price: 399,
            offerPrice: 349,
            time: "1 hr",
            description: [
              {
                title: "Washing Machine",
                summary: "Front-load & top-load issues",
              },
            ],
          },
        ],
      },
      {
        id: "kitchen-appliances",
        name: "Kitchen Appliances",
        services: [
          {
            id: "microwave-repair",
            title: "Microwave Repair",
            review: 4.5,
            price: 349,
            offerPrice: 299,
            time: "30 min",
            description: [
              { title: "Microwave", summary: "Heating or panel issues" },
            ],
          },
          {
            id: "chimney-service",
            title: "Chimney Servicing",
            review: 4.6,
            price: 549,
            offerPrice: 499,
            time: "45 min",
            description: [
              { title: "Chimney", summary: "Deep cleaning & check-up" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cleaning",
    name: "Cleaning",
    image: "",
    subcategories: [
      {
        id: "home-cleaning",
        name: "Home Cleaning",
        services: [
          {
            id: "bathroom-cleaning",
            title: "Bathroom Cleaning",
            review: 4.9,
            price: 599,
            offerPrice: 499,
            time: "30-45 min",
            description: [
              {
                title: "Cleaning",
                summary: "Tile scrubbing, fittings wash",
              },
            ],
          },
          {
            id: "kitchen-deep-cleaning",
            title: "Kitchen Deep Cleaning",
            review: 4.8,
            price: 899,
            offerPrice: 799,
            time: "1 hr",
            description: [
              {
                title: "Kitchen",
                summary: "Chimney & surface degreasing",
              },
            ],
          },
        ],
      },
      {
        id: "furniture-cleaning",
        name: "Furniture & Fabric",
        services: [
          {
            id: "sofa-cleaning",
            title: "Sofa Cleaning",
            review: 4.7,
            price: 1000,
            offerPrice: 850,
            time: "1 hr",
            description: [{ title: "Sofa", summary: "Vacuum + dry wash" }],
          },
          {
            id: "carpet-shampooing",
            title: "Carpet Shampooing",
            review: 4.6,
            price: 749,
            offerPrice: 649,
            time: "1.5 hr",
            description: [
              { title: "Carpet", summary: "Stain removal & fresh scent" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "handyman",
    name: "Handyman",
    image: "",
    subcategories: [
      {
        id: "electrician",
        name: "Electrician",
        services: [
          {
            id: "fan-installation",
            title: "Fan Installation",
            review: 4.8,
            price: 299,
            offerPrice: 249,
            time: "30 min",
            description: [
              { title: "Electric", summary: "Fan or light fitting" },
            ],
          },
          {
            id: "switchboard-repair",
            title: "Switchboard Repair",
            review: 4.7,
            price: 249,
            offerPrice: 199,
            time: "20 min",
            description: [
              { title: "Electric", summary: "Replace or fix switches" },
            ],
          },
        ],
      },
      {
        id: "plumber",
        name: "Plumber",
        services: [
          {
            id: "tap-fixing",
            title: "Tap Fixing",
            review: 4.9,
            price: 199,
            offerPrice: 149,
            time: "20 min",
            description: [
              { title: "Plumbing", summary: "Leakage, replacement" },
            ],
          },
        ],
      },
      {
        id: "carpenter",
        name: "Carpenter",
        services: [
          {
            id: "door-hinge-repair",
            title: "Door Hinge Repair",
            review: 4.6,
            price: 299,
            offerPrice: 249,
            time: "30 min",
            description: [
              { title: "Carpentry", summary: "Loose or broken hinges" },
            ],
          },
        ],
      },
    ],
  },
];

export const findCategory = (id)=>{
  return serviceCategories.find((item) => item.id === id);
}
