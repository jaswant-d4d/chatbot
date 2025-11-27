const express = require("express");
const router = express.Router();
const Company = require("../models/Company");


// List companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create company
router.post("/", async (req, res) => {
  try {
    const { name, ownerName, email, phone, description, logoUrl, domains = [] } =
      req.body;

    const apiKey = Company.generateApiKey();
    const company = new Company({
      name,
      ownerName,
      email,
      phone,
      description,
      logoUrl,
      domains: domains.map((d) => ({ host: d })),
      apiKey,
    });

    await company.save();
    res.status(201).json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot create company" });
  }
});

// Get single company
router.get("/:id", async (req, res) => {
  try {
    const c = await Company.findById(req.params.id);
    if (!c) return res.status(404).json({ error: "Not found" });
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update company (including domains)
router.put("/:id", async (req, res) => {
  try {
    const update = req.body;
    if (update.domains) {
      update.domains = update.domains.map((d) => ({ host: d }));
    }
    const company = await Company.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Toggle active/inactive
router.post("/:id/toggle", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Not found" });
    company.isActive = !company.isActive;
    await company.save();
    res.json({ success: true, isActive: company.isActive });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Regenerate API key
router.post("/:id/regenerate-key", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Not found" });
    company.apiKey = Company.generateApiKey();
    await company.save();
    res.json({ success: true, apiKey: company.apiKey });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
