import joi from "joi";

const ticketStatusArr = ['pending', 'accepted', 'resolved', 'rejected'];

const newTicket = (reqBody: object): object => {
    const joiObj = joi.object({
        information: joi.string().min(1).max(40).required(),
        title: joi.string().min(1).max(40).required(),
        description: joi.string().min(1).max(100).required(),
        contact_information: joi.string().min(1).max(100).required(),
    });
    const { error } = joiObj.validate(reqBody);
    if (error) throw error.details[0].message;
    return reqBody;
}

const updateTicket = (reqBody: any): object => {
    const joiObj = joi.object({
        id: joi.string().min(1).max(40).required(),
        information: joi.string().min(1).max(40),
        title: joi.string().min(1).max(40),
        description: joi.string().min(1).max(100),
        contact_information: joi.string().min(1).max(100),
        status: joi.string().min(1).max(10)
    });
    const { error } = joiObj.validate(reqBody);
    if (error) throw error.details[0].message;
    if (reqBody.status && !ticketStatusArr.includes(reqBody.status)) throw `Unknown status (${reqBody.status})`;
    return reqBody;
}

export {
    newTicket,
    updateTicket
}