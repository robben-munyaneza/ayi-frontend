import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  role: {
    type: String,
    required: [true, 'Please provide a role'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
  phone: {
    type: String,
  },
  image: {
    type: String, // URL to the image (Cloudinary or local)
    required: false,
  },
  imageKey: {
    type: String, // Key for local fallback images (e.g. 'paul')
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
