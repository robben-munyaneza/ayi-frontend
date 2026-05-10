import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = 'mongodb+srv://bduser:munyaneza12345@cluster0.mpdai77.mongodb.net/ayi_db?retryWrites=true&w=majority&appName=Cluster0';

// Define User Schema (simplified for seeding)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seedAdmin() {
  console.log('🔄 Connecting to database to seed admin...');
  try {
    await mongoose.connect(MONGODB_URI);
    
    const email = 'admin@ayigroup.com';
    const password = 'admin123';
    
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log(`ℹ️  Admin with email ${email} already exists.`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      await User.create({
        name: 'AYI Admin',
        email: email,
        password: hashedPassword,
        role: 'admin'
      });
      console.log(`✅ Admin created successfully!`);
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${password}`);
    }
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Database disconnected.');
  }
}

seedAdmin();
