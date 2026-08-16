const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'backend/.env' });

// removed types import

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String },
    displayOrder: { type: Number, default: 0 },
    publishedState: { type: String, default: 'PUBLISHED' },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', faqSchema);

const faqs = [
  {
    question: "I'm a beginner. Will I get crushed here?",
    answer: "Not at all. While our atmosphere is intense, our trainers scale every movement to your current level. We build you up safely and progressively.",
    displayOrder: 1,
    publishedState: 'PUBLISHED'
  },
  {
    question: "I'm intimidated by serious lifters - will I fit in here?",
    answer: "Absolutely. Our most serious lifters are often our most supportive members. At Stallion, we respect effort above everything else.",
    displayOrder: 2,
    publishedState: 'PUBLISHED'
  },
  {
    question: "Can I still get results if I can only train 2x/week?",
    answer: "Yes. Our goal-blue printed programs can be tailored for 2x/week frequency, focusing on high-impact compound movements to maximize your time.",
    displayOrder: 3,
    publishedState: 'PUBLISHED'
  },
  {
    question: "Is the nutrition guidance just another cookie-cutter meal plan?",
    answer: "No. We provide personalized nutrition coaching based on your goals, lifestyle, and dietary preferences, ensuring long-term sustainable habits.",
    displayOrder: 4,
    publishedState: 'PUBLISHED'
  },
  {
    question: "What makes your trainers worth higher rates?",
    answer: "Every trainer completes 500 hours of in-gym apprenticeship before leading sessions. They are certified professionals who actively train and understand the science of results.",
    displayOrder: 5,
    publishedState: 'PUBLISHED'
  },
  {
    question: "Can I come during lunch break from my IT job?",
    answer: "Definitely. We offer quick, intense 45-minute classes and open gym access perfectly suited for a lunch break, plus showers and steam baths to freshen up.",
    displayOrder: 6,
    publishedState: 'PUBLISHED'
  },
  {
    question: "My trainer at previous gym just chatted...",
    answer: "That won't happen here. Our coaches are focused entirely on your form, intensity, and progress during your session. We are here to work.",
    displayOrder: 7,
    publishedState: 'PUBLISHED'
  }
];

const seedFAQs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await FAQ.deleteMany({});
    console.log('Cleared existing FAQs');
    
    await FAQ.insertMany(faqs);
    console.log('Added new FAQs');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding FAQs:', error);
    process.exit(1);
  }
};

seedFAQs();
