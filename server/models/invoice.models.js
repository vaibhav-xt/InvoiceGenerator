import mongoose from "mongoose";

const { Schema } = mongoose;

// Product schema
const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productQty: {
        type: Number,
        required: true
    },
    productRate: {
        type: Number,
        required: true
    }
});

// Invoice schema
const InvoiceSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId
    },
    products: [ProductSchema],
    total_amount: {
        type: Number,
        required: true
    },
    after_gst_amount: {
        type: Number,
        required: true
    },
    invoice_date: {
        type: Date,
        default: Date.now
    },
    // Set the 'valid' field to 14 days from the current date
    valid_date: {
        type: Date,
        default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
});

// Invoice model
const InvoiceModel = mongoose.model("invoice", InvoiceSchema);
export default InvoiceModel;
