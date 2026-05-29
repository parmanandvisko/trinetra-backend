const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    author: { type: String, default: 'Admin' },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    readTime: { type: String, default: '5 min read' },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
)

blogSchema.pre('save', function (next) {
  if (this.isModified('title'))
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  next()
})

module.exports = mongoose.model('Blog', blogSchema)
