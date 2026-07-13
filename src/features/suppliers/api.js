import { SupplierStatus, SupplierCategories } from './types';

// Mock data based on the provided image
const mockSuppliers = [
  {
    id: '1',
    name: 'BuildTech Solutions',
    email: 'info@buildtech.com',
    phone: '+994 50 123 45 67',
    location: 'Baku, Azerbaijan',
    categories: [SupplierCategories.BUILDING_MATERIALS],
    appliedOn: '2024-05-28T10:00:00Z',
    documentsCount: 3,
    status: SupplierStatus.PENDING,
  },
  {
    id: '2',
    name: 'Premium Materials Co.',
    email: 'contact@premiummat.com',
    phone: '+994 55 987 65 43',
    location: 'Ganja, Azerbaijan',
    categories: [SupplierCategories.CEMENT_STEEL],
    appliedOn: '2024-05-27T14:30:00Z',
    documentsCount: 4,
    status: SupplierStatus.PENDING,
  },
  {
    id: '3',
    name: 'Global Supply Ltd.',
    email: 'hello@globalsupply.com',
    phone: '+994 70 555 23 11',
    location: 'Sumgayit, Azerbaijan',
    categories: [SupplierCategories.INSULATION_TIMBER],
    appliedOn: '2024-05-26T09:15:00Z',
    documentsCount: 2,
    status: SupplierStatus.PENDING,
  },
  {
    id: '4',
    name: 'Steel Experts Inc.',
    email: 'sales@steelexperts.com',
    phone: '+994 51 456 78 90',
    location: 'Baku, Azerbaijan',
    categories: [SupplierCategories.STEEL_REBAR],
    appliedOn: '2024-05-25T16:45:00Z',
    documentsCount: 3,
    status: SupplierStatus.PENDING,
  },
  {
    id: '5',
    name: 'WoodWorks Co.',
    email: 'info@woodworks.com',
    phone: '+994 55 321 09 87',
    location: 'Lankaran, Azerbaijan',
    categories: [SupplierCategories.TIMBER_DOORS],
    appliedOn: '2024-05-24T11:20:00Z',
    documentsCount: 2,
    status: SupplierStatus.PENDING,
  },
];

export const fetchSuppliers = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockSuppliers;
};

export const fetchSupplierById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockSuppliers.find((s) => s.id === id) || null;
};

export const updateSupplierStatus = async (id, status) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const supplier = mockSuppliers.find((s) => s.id === id);
  if (supplier) {
    supplier.status = status;
  }
  return supplier;
};
