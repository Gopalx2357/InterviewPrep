const Company = require('../models/Company');
const Purchase = require('../models/Purchase');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get all company OA & interview prep resources
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const companies = await Company.find(query).sort({ createdAt: -1 });

    let purchasedSet = new Set();
    let hasFullAccess = false;

    if (req.user) {
      const isAdminUser = req.user.role === 'admin' || (req.user.email && req.user.email.toLowerCase() === 'gopal.x235@gmail.com');
      const userDoc = await User.findById(req.user._id);
      const userHasAllAccess = userDoc?.hasAllAccess || false;

      if (isAdminUser || userHasAllAccess) {
        hasFullAccess = true;
      } else {
        const userPurchases = await Purchase.find({ userId: req.user._id, status: 'completed' });
        userPurchases.forEach((p) => {
          if (p.itemType === 'all-access') hasFullAccess = true;
          if (p.companyId) purchasedSet.add(p.companyId.toString());
        });
      }
    }

    const companiesWithPurchaseState = companies.map((c) => {
      const cObj = c.toObject();
      return {
        ...cObj,
        isPurchased: hasFullAccess || purchasedSet.has(c._id.toString()),
      };
    });

    res.json(companiesWithPurchaseState);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Failed to fetch companies', error: error.message });
  }
};

// @desc    Get company prep details by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company prep details not found' });
    }

    let isPurchased = false;
    if (req.user) {
      const isAdminUser = req.user.role === 'admin' || (req.user.email && req.user.email.toLowerCase() === 'gopal.x235@gmail.com');
      const userDoc = await User.findById(req.user._id);
      const userHasAllAccess = userDoc?.hasAllAccess || false;

      if (isAdminUser || userHasAllAccess) {
        isPurchased = true;
      } else {
        const allAccessPurchase = await Purchase.findOne({
          userId: req.user._id,
          itemType: 'all-access',
          status: 'completed',
        });
        if (allAccessPurchase) {
          isPurchased = true;
        } else {
          const purchase = await Purchase.findOne({
            userId: req.user._id,
            companyId: company._id,
            status: 'completed',
          });
          if (purchase) {
            isPurchased = true;
          }
        }
      }
    }

    res.json({
      ...company.toObject(),
      isPurchased,
    });
  } catch (error) {
    console.error('Error fetching company details:', error);
    res.status(500).json({ message: 'Failed to fetch company details', error: error.message });
  }
};

// @desc    Create company prep package (Admin only)
// @route   POST /api/companies
// @access  Private/Admin
const createCompany = async (req, res) => {
  try {
    const {
      name,
      role,
      description,
      price,
      oaAptitude,
      oaCoding,
      oaMcqs,
      oaDetails,
      techInterview,
      hrInterview,
      faqs,
      preparationContent,
    } = req.body;

    if (!name || !role || !description) {
      return res.status(400).json({ message: 'Please fill in required fields: name, role, description' });
    }

    let logo = '';
    let resources = '';

    if (req.files) {
      if (req.files.logo && req.files.logo[0]) {
        logo = `/uploads/${req.files.logo[0].filename}`;
      }
      if (req.files.resource && req.files.resource[0]) {
        resources = `/uploads/${req.files.resource[0].filename}`;
      }
    }

    if (!logo && req.body.logo) logo = req.body.logo;
    if (!resources && req.body.resources) resources = req.body.resources;

    let parsedFaqs = [];
    if (faqs) {
      if (Array.isArray(faqs)) {
        parsedFaqs = faqs;
      } else if (typeof faqs === 'string') {
        try {
          parsedFaqs = JSON.parse(faqs);
        } catch (e) {
          parsedFaqs = faqs.split('\n').filter((item) => item.trim() !== '');
        }
      }
    }

    const company = await Company.create({
      name,
      logo,
      role,
      description,
      price: Math.min(Math.max(Number(price) || 0, 0), 149),
      oaDetails: {
        aptitude: oaAptitude || '',
        coding: oaCoding || '',
        mcqs: oaMcqs || '',
        details: oaDetails || '',
      },
      interviewDetails: {
        technical: techInterview || '',
        hr: hrInterview || '',
        faqs: parsedFaqs,
      },
      preparationContent: preparationContent || '',
      resources,
    });

    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company prep:', error);
    res.status(500).json({ message: 'Failed to create company prep', error: error.message });
  }
};

// @desc    Update company prep (Admin only)
// @route   PUT /api/companies/:id
// @access  Private/Admin
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company prep not found' });
    }

    const {
      name,
      role,
      description,
      price,
      oaAptitude,
      oaCoding,
      oaMcqs,
      oaDetails,
      techInterview,
      hrInterview,
      faqs,
      preparationContent,
    } = req.body;

    if (name) company.name = name;
    if (role) company.role = role;
    if (description) company.description = description;
    if (price !== undefined) company.price = Math.min(Math.max(Number(price) || 0, 0), 149);

    if (oaAptitude !== undefined) company.oaDetails.aptitude = oaAptitude;
    if (oaCoding !== undefined) company.oaDetails.coding = oaCoding;
    if (oaMcqs !== undefined) company.oaDetails.mcqs = oaMcqs;
    if (oaDetails !== undefined) company.oaDetails.details = oaDetails;

    if (techInterview !== undefined) company.interviewDetails.technical = techInterview;
    if (hrInterview !== undefined) company.interviewDetails.hr = hrInterview;

    if (preparationContent !== undefined) company.preparationContent = preparationContent;

    if (req.files) {
      if (req.files.logo && req.files.logo[0]) {
        company.logo = `/uploads/${req.files.logo[0].filename}`;
      }
      if (req.files.resource && req.files.resource[0]) {
        company.resources = `/uploads/${req.files.resource[0].filename}`;
      }
    }

    if (req.body.logo) company.logo = req.body.logo;
    if (req.body.resources) company.resources = req.body.resources;

    if (faqs) {
      if (Array.isArray(faqs)) {
        company.interviewDetails.faqs = faqs;
      } else if (typeof faqs === 'string') {
        try {
          company.interviewDetails.faqs = JSON.parse(faqs);
        } catch (e) {
          company.interviewDetails.faqs = faqs.split('\n').filter((item) => item.trim() !== '');
        }
      }
    }

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } catch (error) {
    console.error('Error updating company prep:', error);
    res.status(500).json({ message: 'Failed to update company prep', error: error.message });
  }
};

// @desc    Delete company prep (Admin only)
// @route   DELETE /api/companies/:id
// @access  Private/Admin
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company prep not found' });
    }

    await company.deleteOne();
    res.json({ message: 'Company prep deleted successfully' });
  } catch (error) {
    console.error('Error deleting company prep:', error);
    res.status(500).json({ message: 'Failed to delete company prep', error: error.message });
  }
};

// @desc    Download / Access purchased Company resource file securely
// @route   GET /api/companies/:id/download
// @access  Private (Must have purchased company prep OR be Admin)
const downloadCompanyResources = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company prep not found' });
    }

    const isAdminUser = req.user.role === 'admin' || (req.user.email && req.user.email.toLowerCase() === 'gopal.x235@gmail.com');

    if (!isAdminUser) {
      const purchase = await Purchase.findOne({
        userId: req.user._id,
        companyId: company._id,
        status: 'completed',
      });
      if (!purchase) {
        return res.status(403).json({ message: 'Access denied: You must purchase this preparation package first' });
      }
    }

    if (!company.resources) {
      return res.status(404).json({ message: 'Resource file missing for this package' });
    }

    if (company.resources.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', company.resources);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    }

    return res.json({ resourceUrl: company.resources });
  } catch (error) {
    console.error('Download company resource error:', error);
    res.status(500).json({ message: 'Error accessing resource file', error: error.message });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  downloadCompanyResources,
};
