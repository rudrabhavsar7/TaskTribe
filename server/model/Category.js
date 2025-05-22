import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  categoryId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String }
});

export const Category = mongoose.model('Category', CategorySchema);

const SubcategorySchema = new mongoose.Schema({
  subcategoryId: { type: String, required: true, unique: true },
  subcategoryTitle: { type: String },
  name: { type: String, required: true },
  image:{type:String},
  categoryId: { type: String, required: true, ref: 'Category' }
});

export const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

const ServiceSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  serviceTitle:{type:String},
  title: { type: String, required: true },
  review: Number,
  price: Number,
  offerPrice: Number,
  time: String,
  description: String,
  categoryId: { type: String, required: true, ref: 'Category' },
  subcategoryId: { type: String, required: true, ref: 'Subcategory' }
});

export const Service = mongoose.model('Service', ServiceSchema);