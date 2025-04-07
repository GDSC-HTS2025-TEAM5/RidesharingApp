import React from "react";

const Wallet = () => {
  const balance = 0.0; // Placeholder balance
  const transactions = [
    { id: 1, date: "2025-04-01", description: "Ride to SFU", amount: "-$6.50" },
    { id: 2, date: "2025-03-28", description: "Funds Added", amount: "+$20.00" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Wallet</h2>

        {/* Current Balance */}
        <div className="text-center">
          <p className="text-gray-500">Current Balance</p>
          <p className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Funds
          </button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
            Withdraw
          </button>
        </div>

        {/* Transaction History */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
          <ul className="space-y-2">
            {transactions.map((tx) => (
              <li key={tx.id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <p className={`font-bold ${tx.amount.startsWith("-") ? "text-red-500" : "text-green-500"}`}>
                  {tx.amount}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wallet;