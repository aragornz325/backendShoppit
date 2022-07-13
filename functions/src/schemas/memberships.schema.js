const joi = require('joi');

const name = joi.string().valid('standart', 'premium', 'professional');
const description = joi.string().min(3).max(255);
const price = joi.number().min(0).max(999999);
const payment_cycle = joi.string().valid('mensual', 'trimestral', 'semestral');
const active = joi.boolean();
const membership_benefits = joi.array().items(joi.string().min(3).max(255));
const memberships_discounts = joi.array().items(joi.number().min(0).max(100));
const payment_url = joi.string().uri();

const createMembershipDTO = joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  payment_cycle: payment_cycle.required(),
  active: active.required(),
  membership_benefits: membership_benefits.required(),
  memberships_discounts: memberships_discounts.required(),
  payment_url: payment_url.required(),
});

const updateMembershipDTO = joi.object({
  name,
  description,
  price,
  payment_cycle,
  active,
  membership_benefits,
  memberships_discounts,
  payment_url,
});

module.exports = {
  createMembershipDTO,
  updateMembershipDTO,
};
