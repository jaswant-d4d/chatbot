const Company = require("../models/Company");

async function validateWidgetAccess(req, res, next) {
  try {
    const { company: companyId, token, domain } = req.query;

    if (!companyId || !token || !domain) {
      return res.status(401).send("Missing widget credentials");
    }

    const company = await Company.findOne({ _id: companyId, apiKey: token });
    if (!company) return res.status(403).send("Invalid company/token");

    if (!company.isActive) return res.status(403).send("Company inactive");

    // normalize domain (remove protocol, port, www)
    const normalize = (d) =>
      d
        .toString()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .split(":")[0]
        .toLowerCase();

    const host = normalize(domain);
    const allowed = company.domains.some((x) => normalize(x.host) === host);
    if (!allowed) return res.status(403).send("Domain not allowed");

    // ok — attach company to request
    req.company = company;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = validateWidgetAccess;
