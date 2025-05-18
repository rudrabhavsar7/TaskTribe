import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  id: String,
  title: String,
  review: Number,
  price: Number,
  offerPrice: Number,
  time: String,
  description: [
    {
      title: String,
      summary: String,
    }
  ]
});

const SubcategorySchema = new mongoose.Schema({
  id: String,
  name: String,
  services: [ServiceSchema],
});

const CategorySchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  image: String,
  subcategories: [SubcategorySchema],
});

export default mongoose.model('Category',CategorySchema);
