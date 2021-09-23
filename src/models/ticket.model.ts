import { Schema, model } from 'mongoose';

let ticket =  new Schema({
    "information": { type: String, required: true },
    "title": { type: String, required: true },
    "description": { type: String, required: true },
    "contact_information": { type: String, required: true },
    "created_timestamp": { type: Date, default: Date.now },
    "lastupdate_timestamp": { type: Date, default: Date.now },
    "status": { type: String, default: 'pending' }
},{ timestamps: { createdAt: 'created_timestamp', updatedAt: 'lastupdate_timestamp' } });

export default model('ticket', ticket);

