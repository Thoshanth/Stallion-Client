import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { User } from '../models/User';
import { UserRole, Status } from '../types';

// Load environment variables
dotenv.config();

async function seedAdmin() {
  try {
    console.log('🌱 Starting admin user seed...');
    
    // Connect to database
    await connectDatabase();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: UserRole.SUPER_ADMIN });
    
    if (existingAdmin) {
      console.log('✅ Super admin user already exists');
      console.log(`📧 Email: ${existingAdmin.email}`);
      process.exit(0);
    }
    
    // Create admin user
    const adminUser = new User({
      name: 'Stallion Admin',
      email: 'admin@stallionfitness.com',
      password: 'StallionAdmin123!', // Change this in production
      role: UserRole.SUPER_ADMIN,
      status: Status.ACTIVE,
    });
    
    await adminUser.save();
    
    console.log('✅ Super admin user created successfully!');
    console.log('📧 Email: admin@stallionfitness.com');
    console.log('🔐 Password: StallionAdmin123!');
    console.log('⚠️  Please change the password after first login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
}

seedAdmin();