import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Branch } from '../models/Branch';
import { Status } from '../types';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

const branchesData = [
  {
    name: "Stallion Xtreme Fitness - Gajulramaram Branch",
    address: "Gajulramaram, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "gajulramaram",
    status: Status.ACTIVE,
    image: "/images/branches/ramarambranch.JPG",
    hoverImage: "/images/branches/ramarambranch.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Chinthal Branch",
    address: "Chintal, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "chinthal",
    status: Status.ACTIVE,
    image: "https://stallionxtremefitness.com/images/branches/idplbranc.JPG",
    hoverImage: "https://stallionxtremefitness.com/images/branches/idplbranc.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Subash Nagar Branch",
    address: "Subash Nagar, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "subash-nagar",
    status: Status.ACTIVE,
    image: "https://stallionxtremefitness.com/images/branches/komapllybranch.JPG",
    hoverImage: "https://stallionxtremefitness.com/images/branches/komapllybranch.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Kondapur Branch",
    address: "Kondapur, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "kondapur",
    status: Status.ACTIVE,
    image: "https://stallionxtremefitness.com/images/branches/kondapur.JPG",
    hoverImage: "https://stallionxtremefitness.com/images/branches/kondapur.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Suchitra Branch",
    address: "Suchitra, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "suchitra",
    status: Status.ACTIVE,
    image: "https://stallionxtremefitness.com/images/branches/suchitra.JPG",
    hoverImage: "https://stallionxtremefitness.com/images/branches/suchitra.JPG"
  },
  {
    name: "Stallion Xtreme Fitness - Ashok Nagar BHEL Branch",
    address: "Ashok Nagar, Hyderabad",
    phone: "+91 8885110136",
    email: "support@stallionxtremefitness.com",
    slug: "ashok-nagar-bhel",
    status: Status.ACTIVE,
    image: "https://stallionxtremefitness.com/images/branches/bhelnromal.jpg",
    hoverImage: "https://stallionxtremefitness.com/images/branches/bhelnromal.jpg"
  }
];

async function updateBranches() {
  try {
    console.log('Connecting to MongoDB...', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Wipe existing branches completely and replace them so there are no duplicates or old names like IDPL
    await Branch.deleteMany({});
    console.log('Deleted old branches');

    for (const [index, data] of branchesData.entries()) {
      await Branch.create({
        ...data,
        displayOrder: index + 1
      });
      console.log(`Created branch: ${data.name}`);
    }

    console.log('Branches updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating branches:', error);
    process.exit(1);
  }
}

updateBranches();
