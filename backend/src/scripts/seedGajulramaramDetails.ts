import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Branch } from '../models/Branch';
import { Trainer } from '../models/Trainer';
import { Program } from '../models/Program';
import { Status, PublishedState } from '../types';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

async function seedGajulramaramDetails() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    // 1. Find Gajulramaram branch
    const branch = await Branch.findOne({ slug: 'gajulramaram' });
    if (!branch) {
      throw new Error('Gajulramaram branch not found!');
    }

    // 2. Set Opening Hours
    branch.openingHours = {
      monday: { open: '05:30', close: '22:00', closed: false },
      tuesday: { open: '05:30', close: '22:00', closed: false },
      wednesday: { open: '05:30', close: '22:00', closed: false },
      thursday: { open: '05:30', close: '22:00', closed: false },
      friday: { open: '05:30', close: '22:00', closed: false },
      saturday: { open: '06:00', close: '11:00', closed: false },
      sunday: { open: '06:00', close: '11:00', closed: false },
    };

    // 3. Define and Create Programs
    const programData = [
      { name: 'Personal Training & Body Transformation', description: 'Achieve your dream physique with 1-on-1 expert guidance.' },
      { name: 'Cardio Training & Weight Loss', description: 'High-intensity routines designed to burn fat effectively.' },
      { name: 'Functional Training', description: 'Improve your everyday strength, mobility, and agility.' },
      { name: 'Core Strength & Flexibility', description: 'Build a solid foundation and improve overall body mechanics.' }
    ];

    const createdPrograms = [];
    for (const p of programData) {
      const existing = await Program.findOne({ slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') });
      if (existing) {
        createdPrograms.push(existing);
      } else {
        const prog = await Program.create({
          ...p,
          status: Status.ACTIVE,
          publishedState: PublishedState.PUBLISHED,
          image: '/images/hero.png'
        });
        createdPrograms.push(prog);
      }
    }

    // 4. Define and Create Trainers
    const trainerData = [
      { name: 'KILBORTSON SILAS PARICHHA', designation: 'Senior Trainer', progName: 'Personal Training & Body Transformation' },
      { name: 'Balu', designation: 'Fitness Coach', progName: 'Cardio Training & Weight Loss' },
      { name: 'B.Ashok kumar', designation: 'Fitness Coach', progName: 'Personal Training & Body Transformation' },
      { name: 'Syed Imran', designation: 'Functional Coach', progName: 'Functional Training' },
      { name: 'Mohammad Asif Pasha', designation: 'Functional Coach', progName: 'Functional Training' },
      { name: 'T. Rahul', designation: 'Functional Coach', progName: 'Functional Training' },
      { name: 'Sandeep kundu', designation: 'Flexibility Expert', progName: 'Core Strength & Flexibility' }
    ];

    const createdTrainers = [];
    for (const t of trainerData) {
      const matchingProg = createdPrograms.find(p => p.name === t.progName);
      
      const existing = await Trainer.findOne({ name: t.name, branch: branch._id });
      if (existing) {
        createdTrainers.push(existing);
      } else {
        const tr = await Trainer.create({
          name: t.name,
          designation: t.designation,
          biography: `Certified expert specializing in ${t.progName}.`,
          experience: 5,
          branch: branch._id,
          programs: matchingProg ? [matchingProg._id] : [],
          status: Status.ACTIVE,
          publishedState: PublishedState.PUBLISHED,
          profileImage: '/images/hero.png' // Fallback
        });
        createdTrainers.push(tr);
      }
    }

    // 5. Link to Branch
    branch.programs = createdPrograms.map(p => p._id);
    branch.trainers = createdTrainers.map(t => t._id);
    
    // Save branch
    await branch.save();

    console.log('Successfully seeded complete information for Gajulramaram!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedGajulramaramDetails();
