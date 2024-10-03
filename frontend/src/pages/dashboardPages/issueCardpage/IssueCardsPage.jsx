import React, { useState } from 'react';

const IssueCardsPage = () => {
  const [pit, setPit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReceipt = {
      pit,
      quantity,
      timestamp: new Date().toLocaleString(),
      signed: false,
    };
    setReceipt(newReceipt);
  };

  const handleSignReceipt = () => {
    setReceipt({ ...receipt, signed: true });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Card Input</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Pit</label>
          <input
            type="number"
            value={pit}
            onChange={(e) => setPit(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {receipt && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow-inner">
          <h3 className="text-lg font-semibold">Receipt</h3>
          <p><strong>Pit:</strong> {receipt.pit}</p>
          <p><strong>Quantity:</strong> {receipt.quantity}</p>
          <p><strong>Timestamp:</strong> {receipt.timestamp}</p>
          <p>
            <strong>Status:</strong> {receipt.signed ? 'Signed' : 'Pending'}
          </p>
          {!receipt.signed && (
            <button
              onClick={handleSignReceipt}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
            >
              Sign Receipt
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueCardsPage