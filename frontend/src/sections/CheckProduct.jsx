import React, { useState } from 'react';

const required_fields = [
  'product_code',
  'product_name',
  'product_description',
  'shop',
  'laws',
  'status',
];

const CheckProduct = () => {
  const [productId, setProductId] = useState('');
  const [result, setResult] = useState(null);

  const renderProductDescription = (descriptionArray) => {
    if (!Array.isArray(descriptionArray) || descriptionArray.length === 0) {
      return (
        <div className="mb-4">
          <strong className="capitalize text-gray-700 block mb-2">
            Product Description:
          </strong>
          <span className="text-gray-600">No description available</span>
        </div>
      );
    }

    return (
      <div className="mb-4">
        <strong className="capitalize text-gray-700 block mb-3">
          Product Description:
        </strong>
        <div className="ml-4 space-y-2 bg-gray-50 p-4 rounded-lg">
          {descriptionArray.map((itemArray, idx) => {
            const item =
              Array.isArray(itemArray) && itemArray.length > 0
                ? itemArray[0]
                : itemArray;

            return item && item.key && item.values ? (
              <div key={idx} className="flex flex-wrap items-start gap-2">
                <span className="font-medium text-gray-800 min-w-fit">
                  {item.key}:
                </span>
                <span className="text-gray-600 flex-1">
                  {Array.isArray(item.values)
                    ? item.values.join(', ')
                    : item.values}
                </span>
              </div>
            ) : null;
          })}
        </div>
      </div>
    );
  };

  const handleCheck = async () => {
    try {
      if (!productId.trim()) {
        throw new Error('Product ID cannot be empty');
      }
      if (isNaN(productId)) {
        throw new Error('Product ID must be a number');
      }

      const res = await fetch(
        `http://127.0.0.1:8000/checkproductsapi/product/${productId}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Failed to fetch product info');
      }

      setResult({ data });
    } catch (err) {
      console.error('Error fetching:', err);
      setResult({ error: err.message });
    }
  };

  const renderResult = (response) => {
    if (response.error) {
      let colorClass = 'text-red-600';
      if (response.error.includes('404')) colorClass = 'text-blue-600';
      if (response.error.toLowerCase().includes('failed'))
        colorClass = 'text-black';

      return (
        <div
          className={`mt-6 p-4 border ${colorClass} bg-red-100 rounded-lg text-center`}
        >
          <strong>Error:</strong> {response.error}
        </div>
      );
    }

    const data = response.data;

    return (
      <div className="mt-6 p-8 bg-background shadow-xl rounded-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Product Details
        </h2>
        {required_fields.map((field) => {
          const fieldValue = data[field];
          if (!fieldValue) return null;

          if (field === 'product_description' && Array.isArray(fieldValue)) {
            console.log(fieldValue);
            return renderProductDescription(fieldValue);
          }
          


          if (field === 'status') {
            let statusColor = 'text-gray-700';
            if (fieldValue.toLowerCase() === 'legal')
              statusColor = 'text-green-600';
            if (fieldValue.toLowerCase() === 'permit_or_registration')
              statusColor = 'text-yellow-600';
            if (fieldValue.toLowerCase() === 'illegal')
              statusColor = 'text-red-600';

            return (
              <div key={field} className="mb-4">
                <strong className="capitalize text-gray-700">
                  {field.replace('_', ' ')}:
                </strong>{' '}
                <span className={`${statusColor} font-semibold`}>
                  {fieldValue}
                </span>
              </div>
            );
          }
          
 

          // Laws array
          if (field === 'laws' && Array.isArray(fieldValue)) {
            return (
              <div key={field} className="mb-4">
                <strong className="capitalize text-gray-700">
                  Reasoning:
                </strong>{' '}
                <span className="text-gray-600">{fieldValue.join(', ')}</span>
              </div>
            );
          }

          return (
            <div key={field} className="mb-4">
              <strong className="capitalize text-gray-700">
                {field.replace('_', ' ')}:
              </strong>{' '}
              <span className="text-gray-600">{fieldValue}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 text-center text-gray-800">
          ok2buy
        </h1>

        <p className="text-lg text-gray-600 mb-10 text-center">
          Check if a product is legal to buy or not.
        </p>

        <div className="flex w-1/2 mb-6">
          <input
            type="text"
            placeholder="Enter product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <button
            onClick={handleCheck}
            className="px-6 py-3 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 font-semibold"
          >
            Search
          </button>
        </div>

        {result && renderResult(result)}
      </div>
    </div>
  );
};

export default CheckProduct;
