import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://bduser:munyaneza12345@cluster0.mpdai77.mongodb.net/ayi_db?retryWrites=true&w=majority&appName=Cluster0';

console.log('🔄 Testing MongoDB connection...');
console.log('📡 Connecting to cluster0.mpdai77.mongodb.net...\n');

try {
  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000, // 10 second timeout
  });

  console.log('✅ MongoDB connected successfully!');
  console.log(`📦 Database: ${mongoose.connection.db.databaseName}`);
  console.log(`🖥️  Host: ${mongoose.connection.host}`);
  console.log(`🔌 Port: ${mongoose.connection.port}`);
  console.log(`📊 Connection State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Unknown'}`);

  // List existing collections
  const collections = await mongoose.connection.db.listCollections().toArray();
  if (collections.length === 0) {
    console.log('\n📂 Collections: (none yet — database is empty, ready to seed)');
  } else {
    console.log('\n📂 Existing Collections:');
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`   - ${col.name}: ${count} document(s)`);
    }
  }

  console.log('\n🎉 Connection test PASSED! Your database is ready.');
} catch (error) {
  console.error('\n❌ Connection FAILED!');
  console.error(`Error: ${error.message}`);
  
  if (error.message.includes('ENOTFOUND') || error.message.includes('network')) {
    console.error('\n💡 Tip: Check your internet connection or whitelist your IP in MongoDB Atlas.');
    console.error('   Go to: Atlas Dashboard → Network Access → Add IP Address → Allow Access From Anywhere');
  } else if (error.message.includes('Authentication failed')) {
    console.error('\n💡 Tip: Check your MongoDB username and password in the connection string.');
  }
} finally {
  await mongoose.disconnect();
  console.log('\n🔌 Connection closed.');
}
