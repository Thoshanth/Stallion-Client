const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(async () => {
  const db = mongoose.connection.useDb('test'); // Wait, default db is test in the connection string usually, but let's check
  const Branch = mongoose.connection.collection('branches');
  
  const mapUrl = 'https://maps.google.com/maps?q=Stallion%20Fitness%20Gajulramaram%20Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed';
  
  await Branch.updateOne(
    { slug: 'gajulramaram' },
    { $set: { mapUrl: mapUrl } }
  );
  
  console.log('Map URL updated for gajulramaram');
  process.exit(0);
}).catch(console.error);
