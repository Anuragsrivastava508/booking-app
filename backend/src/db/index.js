import mongoose from "mongoose";
import dotenv from "dotenv";

// load env variables
dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI?.trim();
    const dbName = process.env.MONGODB_DB_NAME || "clinical-assistant";

    if (!mongoUri) {
      throw new Error("❌ MONGODB_URI is missing in .env file");
    }

    // ensure DB name included
    const finalUri = mongoUri.includes("/") && mongoUri.match(/\/[^\/?]+/)
      ? mongoUri
      : `${mongoUri}/${dbName}`;

    const connectInstance = await mongoose.connect(finalUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      w: "majority",
    });

    console.log(`\n🚀 MongoDB connected successfully`);
    console.log(`📍 Host: ${connectInstance.connection.host}`);
    console.log(`🗄  Database: ${connectInstance.connection.name}`);

    mongoose.connection.on("error", (err) => {
      console.error("❌ DB Error →", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    return connectInstance;
  } catch (error) {
    console.error("\n❌ MongoDB connection failed:");
    console.error("   →", error.message);

    const masked = process.env.MONGODB_URI
      ? process.env.MONGODB_URI.replace(/:\/\/[^:]+:[^@]+@/, "://****:****@")
      : "NOT PROVIDED";

    console.error("   MONGODB_URI:", masked);
    process.exit(1);
  }
};

export default connectDB;



// import mongoose from "mongoose";

// const connectDB = async () => {
//   let mongoUri = null;
  
//   try {
//     // Check if MONGODB_URI is set
//     if (!process.env.MONGODB_URI) {
//       throw new Error("MONGODB_URI is not defined in environment variables");
//     }

//     mongoUri = process.env.MONGODB_URI.trim();
    
//     // Ensure database name is included in the connection string
//     // If URI doesn't have a database name, add one
//     if (!mongoUri.includes('/?') && !mongoUri.match(/\/[^\/\?]+(\?|$)/)) {
//       // Extract the base URI and query string
//       const [baseUri, queryString] = mongoUri.split('?');
//       const dbName = process.env.MONGODB_DB_NAME || 'smart-care-assistant';
      
//       // Add database name before query string
//       if (queryString) {
//         mongoUri = `${baseUri}/${dbName}?${queryString}`;
//       } else {
//         mongoUri = `${baseUri}/${dbName}`;
//       }
//       console.log(`📝 Using database name: ${dbName}`);
//     }

//     // Connection options for better error handling and stability
//     const options = {
//       serverSelectionTimeoutMS: 10000, // Timeout after 10s
//       socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
//       connectTimeoutMS: 10000, // Connection timeout
//       maxPoolSize: 10, // Maintain up to 10 socket connections
//       minPoolSize: 2, // Maintain at least 2 socket connections
//       retryWrites: true, // Retry writes on network errors
//       w: 'majority' // Write concern
//     };

//     const connectInstance = await mongoose.connect(
//       mongoUri,
//       options
//     );
    
//     console.log(
//       `✅ Connected to MongoDB: DB host: ${connectInstance.connection.host}`
//     );
//     console.log(`📊 Database: ${connectInstance.connection.name}`);
    
//     // Handle connection events
//     mongoose.connection.on('error', (err) => {
//       console.error('❌ MongoDB connection error:', err);
//     });

//     mongoose.connection.on('disconnected', () => {
//       console.warn('⚠️ MongoDB disconnected');
//     });

//     mongoose.connection.on('reconnected', () => {
//       console.log('✅ MongoDB reconnected');
//     });

//     return connectInstance;
//   } catch (error) {
//     console.error("\n❌ MongoDB connection error:");
//     console.error("Error name:", error.name);
//     console.error("Error message:", error.message);
    
//     // Handle specific MongoDB error types
//     if (error.name === 'MongoServerSelectionError') {
//       console.error("\n⚠️  Could not connect to MongoDB server. Please check:");
//       console.error("   1. Your internet connection is active");
//       console.error("   2. MongoDB Atlas IP whitelist settings (allow 0.0.0.0/0 for testing)");
//       console.error("   3. MongoDB URI format is correct");
//       console.error("   4. MongoDB cluster is running and accessible");
//     } else if (error.name === 'MongoAuthenticationError') {
//       console.error("\n⚠️  Authentication failed. Please check:");
//       console.error("   1. MongoDB username is correct");
//       console.error("   2. MongoDB password is correct");
//       console.error("   3. Database user has proper permissions");
//     } else if (error.name === 'MongoParseError') {
//       console.error("\n⚠️  Invalid MongoDB connection string format.");
//       console.error("   Expected format: mongodb+srv://username:password@cluster.mongodb.net/database?options");
//     } else if (error.name === 'MongoNetworkError' || error.name === 'MongoNetworkTimeoutError') {
//       console.error("\n⚠️  Network error. Please check:");
//       console.error("   1. Your internet connection");
//       console.error("   2. Firewall settings");
//       console.error("   3. MongoDB Atlas network access settings");
//     } else {
//       console.error("\n⚠️  Unexpected error occurred.");
//     }
    
//     console.error("\n📋 Connection details:");
//     console.error("   URI (masked):", mongoUri ? mongoUri.replace(/:[^:@]+@/, ':****@') : 'Not set');
//     console.error("\nFull error stack:", error.stack || error);
//     process.exit(1);
//   }
// };

// export default connectDB;
