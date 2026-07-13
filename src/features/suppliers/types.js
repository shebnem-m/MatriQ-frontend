/**
 * @typedef {Object} Supplier
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} location
 * @property {string[]} categories
 * @property {string} appliedOn - ISO date string
 * @property {number} documentsCount
 * @property {'Pending' | 'Approved' | 'Rejected'} status
 */

export const SupplierStatus = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export const SupplierCategories = {
  BUILDING_MATERIALS: 'Building Materials',
  CEMENT_STEEL: 'Cement, Steel',
  INSULATION_TIMBER: 'Insulation, Timber',
  STEEL_REBAR: 'Steel, Rebar',
  TIMBER_DOORS: 'Timber, Doors',
};
