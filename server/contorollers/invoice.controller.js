import responseCreator from "../config/helpers.config.js";
import InvoiceModel from "../models/invoice.models.js";

export default {

    // add product 
    addInvoice: async (req, res) => {
        try {
            const invoice = req.body;
            // invoice generate
            const newInvoice = new InvoiceModel({
                user_id: req.user._id,
                ...invoice
            })
            // save product to database
            await newInvoice.save();
            return responseCreator(res, 201, "Success", "Invoice added successfully.", { invoice_id: newInvoice._id.toString() })
        } catch (error) {
            return responseCreator(res, 400, "Failed", error.message);
        }
    },

    // get product 
    getInvoices: async (req, res) => {
        try {
            const invoice = await InvoiceModel.find({ user_id: req.user._id });
            return responseCreator(res, 200, "Success", "Invoices fetched.", { invoice });
        } catch (error) {
            return responseCreator(res, 400, "Failed", error.message);
        }
    }
}