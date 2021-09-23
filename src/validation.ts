import joi from "joi";

const newTicket = (reqBody: object): object => {
    const joiObj = joi.object({
        information: joi.string().min(2).max(40).required(),
        title: joi.string().min(2).max(40).required(),
        description: joi.string().min(4).max(100).required(),
        contact_information: joi.string().min(4).max(100).required(),
    });
    const { error } = joiObj.validate(reqBody);
    if (error) throw error.details[0].message;
    return reqBody;
}

export {
    newTicket
}