const repayments = [
  {
    id: 1,
    createdOn: new Date(),
    loanId: 1,
    monthlyInstallment: 1050000, // what the user is expected to pay
    amount: 1000000,
    paidAmount: 1050000,
    balance: 1050000 - 1050000,
  },
  {
    id: 2,
    createdOn: new Date(),
    loanId: 2,
    monthlyInstallment: 105000, // what the user is expected to pay
    amount: 1000000,
    paidAmount: 105000,
    balance: 1050000 - 105000,
  },

];

export default repayments;
