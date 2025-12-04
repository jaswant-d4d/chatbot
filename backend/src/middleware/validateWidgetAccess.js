const Company = require("../models/Company");

function normalizeDomain(d) {
  return d
    ?.toString()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(":")[0]
    .toLowerCase();
}

async function validateWidgetAccess(req, res, next) {
  try {
    const { company: companyId, token, domain } = req.query;
    console.log(req.body, "{body}")
    if (!companyId || !token || !domain) {
      return res.status(401).json({ success: false, message: "Missing widget credentials" });
    }

    const company = await Company.findOne({ _id: companyId, apiKey: token });
    console.log(company, "/company1")
    if (!company) {
      return res.status(403).json({ success: false, message: "Invalid company/token" });
    }

    if (!company.status || company.status !== "active") {
      return res.status(403).json({ success: false, message: "Company inactive" });
    }

    const host = normalizeDomain(domain);

    const allowed = company.allowedDomains.some(
      (d) => normalizeDomain(d) === host
    );

    if (!allowed) {
      return res.status(403).json({ success: false, message: "Domain not allowed" });
    }

    req.company = company; // Attach company data
    next();
  } catch (err) {
    console.error(err, "{err}");
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = validateWidgetAccess;
