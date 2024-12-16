const  Company  = require('../models/company');

// Create a new company
const createCompany = async (req, res) => {
    try {
        const { name, info } = req.body;
        console.log("company name"+name,info);
        const userId = req.user.id; // Assumes user is authenticated via middleware

        const company = await Company.create({
            company_name: name,
            company_info:info,
            userId
        });

        res.status(201).json(company);
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ message: 'Failed to create company' });
    }
};

// Get all companies for the authenticated user
const getCompanies = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes user is authenticated via middleware
        const companies = await Company.findAll({
            where: { userId }
        });

        res.status(200).json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ message: 'Failed to fetch companies' });
    }
};

// Delete a company by ID
const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const userId = req.user.id; // Assumes user is authenticated via middleware

        const company = await Company.findOne({ where: { id: companyId, userId } });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        await company.destroy();
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ message: 'Failed to delete company' });
    }
};

module.exports = { createCompany, getCompanies, deleteCompany };
