const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
        category: Joi.array()
        .items(
            Joi.string().valid(
                "Trending",
                "Rooms",
                "Iconic city",
                "Mountains",
                "Castles",
                "Pools",
                "Camping",
                "Arctic",
                "Farm"
            )
        )
        .required()
  }).required(),

  
module.exports.reviewSchema =
  Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment : Joi.string().required()
})