import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Program } from '../models/Program';
import { Branch } from '../models/Branch';
import { Review } from '../models/Review';
import { FAQ } from '../models/FAQ';
import { PricingPlan } from '../models/PricingPlan';
import { Status, PublishedState, ReviewStatus } from '../types';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedPublicData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoUri);
    console.log('Database connected successfully.');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      Program.deleteMany({}),
      Branch.deleteMany({}),
      Review.deleteMany({}),
      FAQ.deleteMany({}),
      PricingPlan.deleteMany({}),
    ]);
    console.log('Data cleared.');

    // Seed Branches
    console.log('Seeding branches...');
    const branches = await Branch.insertMany([
      { name: 'GajulRamaram', address: 'Gajularamaram Rd', phone: '9999999991', image: '/images/ramaramherosection.JPG', hoverImage: '/images/ramaramhover.JPG', slug: 'gajulramaram', status: Status.ACTIVE },
      { name: 'IDPL', address: 'IDPL Main Rd', phone: '9999999992', image: '/images/idplherosec.JPG', hoverImage: '/images/chinthalhover.JPG', slug: 'idpl', status: Status.ACTIVE },
      { name: 'Kompally', address: 'Kompally Hwy', phone: '9999999993', image: '/images/kompallyherosec.JPG', hoverImage: '/images/subashhover.JPG', slug: 'kompally', status: Status.ACTIVE },
      { name: 'Kondapur', address: 'Kondapur Center', phone: '9999999994', image: '/images/kondapurhero.JPG', hoverImage: '/images/kondapurhover.JPG', slug: 'kondapur', status: Status.ACTIVE },
      { name: 'Suchitra', address: 'Suchitra Circle', phone: '9999999995', image: '/images/suchitrahero.JPG', hoverImage: '/images/suchitrahover.JPG', slug: 'suchitra', status: Status.ACTIVE },
      { name: 'Ashok Nagar Bhel', address: 'Ashok Nagar, BHEL', phone: '9999999996', image: '/images/bhelhover.jpg', hoverImage: '/images/bhelcover.jpg', slug: 'ashok-nagar-bhel', status: Status.ACTIVE },
    ]);

    // Seed Programs
    console.log('Seeding programs...');
    await Program.insertMany([
      { name: 'Stallion Strength', slug: 'stallion-strength', description: 'Build raw power with Olympic lifts, deadlifts, and our signature strength protocols', image: '/images/strength.png', displayOrder: 1, status: Status.ACTIVE, publishedState: PublishedState.PUBLISHED },
      { name: 'HIIT Inferno', slug: 'hiit-inferno', description: 'Torch fat in 30 mins with battle ropes, sled pushes, and metabolic conditioning', image: '/images/inferno.png', displayOrder: 2, status: Status.ACTIVE, publishedState: PublishedState.PUBLISHED },
      { name: 'Functional Warrior', slug: 'functional-warrior', description: 'Train like an athlete—agility drills, sandbag work, and real-world mobility', image: '/images/warrior.png', displayOrder: 3, status: Status.ACTIVE, publishedState: PublishedState.PUBLISHED },
      { name: 'Boxing Conditioning', slug: 'boxing-conditioning', description: 'Combines heavy bag work, footwork drills, and fight-ready endurance training', image: '/images/boxing.png', displayOrder: 4, status: Status.ACTIVE, publishedState: PublishedState.PUBLISHED },
      { name: 'Mobility Mastery', slug: 'mobility-mastery', description: 'Recover smarter with guided stretching, yoga flows, and injury prevention', image: '/images/mobility.png', displayOrder: 5, status: Status.ACTIVE, publishedState: PublishedState.PUBLISHED },
      { name: 'Elite 1:1 Coaching', slug: 'elite-1-1-coaching', description: 'Fully customized plans with your dedicated trainer (nutrition included)', image: '/images/coaching.png', displayOrder: 6, status: Status.ACTIVE, publishedState: PublishedState.PUBLISHED },
    ]);

    // Seed Reviews
    console.log('Seeding reviews...');
    await Review.insertMany([
      { name: 'Paul K', designation: 'Fitness Influencer', rating: 5, reviewText: 'Lost 28lbs of fat in 12 weeks. The trainers don\'t let you cheat – even when you want to.', avatar: '/images/jake.png', status: ReviewStatus.APPROVED, displayOrder: 1 },
      { name: 'Syra', designation: 'Make up artist', rating: 5, reviewText: 'I spend 10-hour days making others look fierce—Stallion Extreme is where I unleash my own strength.', avatar: '/images/syra.png', status: ReviewStatus.APPROVED, displayOrder: 2 },
      { name: 'Krishna', designation: 'Footballer', rating: 5, reviewText: 'This gym took my game from good to lethal. Coach explosive leg circuits added 3 yards to my sprint speed.', avatar: '/images/krishna.png', status: ReviewStatus.APPROVED, displayOrder: 3 },
    ]);

    // Seed FAQs
    console.log('Seeding FAQs...');
    await FAQ.insertMany([
      { question: 'What are the gym timings?', answer: 'Our gyms are open from 6:00 AM to 10:00 PM, 7 days a week. Some branches may have extended hours.', displayOrder: 1, publishedState: PublishedState.PUBLISHED },
      { question: 'Do I need to bring my own equipment?', answer: 'No, we provide all the equipment you need including towels, mats, and professional-grade fitness equipment. Just bring your water bottle and workout attire.', displayOrder: 2, publishedState: PublishedState.PUBLISHED },
      { question: 'Are personal trainers available?', answer: 'Yes, we have certified personal trainers available at all branches. You can book sessions as part of your membership or pay per session.', displayOrder: 3, publishedState: PublishedState.PUBLISHED },
      { question: 'Can I freeze my membership?', answer: 'Yes, you can freeze your membership for up to 3 months per year for medical reasons or extended travel with proper documentation.', displayOrder: 4, publishedState: PublishedState.PUBLISHED },
      { question: 'Do you offer trial sessions?', answer: 'Absolutely! We offer complimentary trial sessions for first-time visitors. Contact us to schedule your trial.', displayOrder: 5, publishedState: PublishedState.PUBLISHED },
      { question: 'What safety measures do you have in place?', answer: 'We maintain strict safety protocols including regular equipment sanitization, proper ventilation, emergency procedures, and trained staff on-site.', displayOrder: 6, publishedState: PublishedState.PUBLISHED },
    ]);

    // Seed Pricing Plans
    console.log('Seeding pricing plans...');
    await PricingPlan.insertMany([
      { name: 'Stallion Basic', popular: false, price: 1000, billingPeriod: 'monthly', features: ['Access to gym equipment', 'Locker facility', 'Basic fitness assessment', 'Air conditioned environment'], displayOrder: 1, status: Status.ACTIVE },
      { name: 'Stallion Pro', popular: true, price: 2500, billingPeriod: 'monthly', features: ['All Basic features', 'Group fitness classes', 'Personal trainer consultation', 'Nutrition guidance', 'Priority booking'], displayOrder: 2, status: Status.ACTIVE },
      { name: 'Stallion Elite', popular: false, price: 5000, billingPeriod: 'monthly', features: ['All Pro features', 'Unlimited personal training', 'Custom meal plans', 'Body composition analysis', 'Recovery sessions'], displayOrder: 3, status: Status.ACTIVE },
      { name: 'Stallion Legacy', popular: false, price: 50000, billingPeriod: 'yearly', features: ['All Elite features', 'Lifetime membership', 'Guest passes', 'Premium supplements', 'VIP treatment'], displayOrder: 4, status: Status.ACTIVE },
    ]);

    console.log('✅ Public data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedPublicData();
