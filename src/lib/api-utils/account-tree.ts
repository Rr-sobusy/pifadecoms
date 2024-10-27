
enum ParentAccount  {
    'Assets' = "Assets",
    'Liabilities' = "Liabilities",
    'Equity' = "Equity",
    'Income' = "Income",
    'Expense' = "Expense"
}

type ParentAccountType =keyof typeof ParentAccount;