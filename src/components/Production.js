import React, { useState } from 'react';

function Production() {
  const [productionData, setProductionData] = useState({
    shift: '',
    productType: '',
    quantity: '',
    quality: '',
    remarks: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save production data
    console.log('Production data:', productionData);
  };

  const handleChange = (e) => {
    setProductionData({
      ...productionData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="production-section">
      <h2>Production Entry</h2>
      <form onSubmit={handleSubmit} className="production-form">
        <div className="form-group">
          <label htmlFor="shift">Shift:</label>
          <select
            id="shift"
            name="shift"
            value={productionData.shift}
            onChange={handleChange}
            required
          >
            <option value="">Select Shift</option>
            <option value="A">Shift A (6 AM - 2 PM)</option>
            <option value="B">Shift B (2 PM - 10 PM)</option>
            <option value="C">Shift C (10 PM - 6 AM)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="productType">Product Type:</label>
          <select
            id="productType"
            name="productType"
            value={productionData.productType}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            <option value="hot_rolled">Hot Rolled Steel</option>
            <option value="cold_rolled">Cold Rolled Steel</option>
            <option value="galvanized">Galvanized Steel</option>
            <option value="stainless">Stainless Steel</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity (tons):</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={productionData.quantity}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="quality">Quality Grade:</label>
          <select
            id="quality"
            name="quality"
            value={productionData.quality}
            onChange={handleChange}
            required
          >
            <option value="">Select Grade</option>
            <option value="A">Grade A</option>
            <option value="B">Grade B</option>
            <option value="C">Grade C</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            name="remarks"
            value={productionData.remarks}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="submit-button">Submit Production Data</button>
      </form>
    </div>
  );
}

export default Production; 