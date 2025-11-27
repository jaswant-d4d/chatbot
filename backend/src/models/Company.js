const mongoose = require("mongoose");
const crypto = require("crypto");

const DomainSchema = new mongoose.Schema({
  host: { type: String, required: true }, // example: example.com
  createdAt: { type: Date, default: Date.now },
});

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerName: { type: String },
  email: { type: String },
  phone: { type: String },
  description: { type: String },
  logoUrl: { type: String },
  domains: { type: [DomainSchema], default: [] }, // allowed domains
  apiKey: { type: String, required: true, unique: true, index: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// helper: generate api key
CompanySchema.statics.generateApiKey = function (prefix = "cmp_") {
  return prefix + crypto.randomBytes(20).toString("hex");
};

module.exports = mongoose.model("Company", CompanySchema);
