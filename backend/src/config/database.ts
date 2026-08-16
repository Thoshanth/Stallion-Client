import mongoose from 'mongoose';

// Track whether database is ready (exported for controllers to check)
export let isDbReady = false;

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stallion-fitness';

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(mongoUri, {
        // Explicit TLS settings — fixes SSL 80 / tlsv1 alert on some Node/Atlas combos
        tls: true,
        tlsAllowInvalidCertificates: false,
        // Connection pool
        maxPoolSize: 10,
        minPoolSize: 2,
        // Timeouts
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
      });

      console.log('✅ MongoDB connected successfully');
      console.log(`📊 Database: ${mongoose.connection.name}`);
      isDbReady = true;
      return;
    } catch (error) {
      console.error(`❌ MongoDB connection error (attempt ${attempt}/${MAX_RETRIES}):`, error);
      if (attempt < MAX_RETRIES) {
        console.log(`🔄 Retrying in ${RETRY_DELAY_MS / 1000}s...`);
        await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
      } else {
        isDbReady = false;
        console.warn('⚠️ Server will continue to run, but database features will not work.');
        console.warn('💡 If using MongoDB Atlas, ensure your current IP is whitelisted at:');
        console.warn('   https://cloud.mongodb.com → Security → Network Access');
      }
    }
  }
};

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB connection closed due to app termination');
  process.exit(0);
});
