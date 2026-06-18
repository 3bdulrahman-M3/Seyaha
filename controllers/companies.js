const Company = require('../models/Company');

// @desc    Get all companies
// @route   GET /api/companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('owner', 'name');
    res.status(200).json({ success: true, count: companies.length, data: companies });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('owner', 'name');
    if (!company) return res.status(404).json({ success: false, error: 'Not found' });
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create company
// @route   POST /api/companies
exports.createCompany = async (req, res) => {
  try {
    req.body.owner = req.user.id;
    req.body.approved = false;
    const company = await Company.create(req.body);
    res.status(201).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update company details
// @route   PUT /api/companies/:id
exports.updateCompany = async (req, res) => {
  try {
    let company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ success: false, error: 'Not found' });

    if (company.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Approve/Reject Company (Admin)
exports.updateCompanyStatus = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, { approved: req.body.approved }, { new: true });
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete company
// @route   DELETE /api/companies/:id
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ success: false, error: 'Not found' });
    if (company.owner.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
    await company.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
