// loans database
const loans = [

  {
    id: 1,
    user: 'juanlopy@gmail.com',
    createdOn: '2019-04-30T10:31:23',
    status: 'pending',
    repaid: false,
    tenor: 10,
    amount: 2000000,
    paymentInstallment: 2100000 / 10,
    balance: 2100000,
    interest: 100000,
  },
  {
    id: 2,
    user: 'aboderinf@gmail.com',
    createdOn: '2019-04-30T10:14:23',
    status: 'approved',
    repaid: true,
    tenor: 1,
    amount: 1000000,
    paymentInstallment: 1050000,
    balance: 0,
    interest: 50000,
  },
  {
    id: 3,
    user: 'user3@gmail.com',
    createdOn: '2019-04-30T10:14:23',
    status: 'pending',
    repaid: false,
    tenor: 1,
    amount: 1000000,
    paymentInstallment: 1050000,
    balance: 1050000,
    interest: 50000,
  },
  {
    id: 4,
    user: 'user4@gmail.com',
    createdOn: '2019-04-30T10:14:23',
    status: 'approved',
    repaid: false,
    tenor: 2,
    amount: 1000000,
    paymentInstallment: 1050000 / 2,
    balance: 1050000,
    interest: 50000,
  },
];

export default loans;
