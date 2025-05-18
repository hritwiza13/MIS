import React, { useState } from 'react';

function QualityControl() {
  const [qualityData, setQualityData] = useState({
    batchNumber: '',
    productType: '',
    testType: '',
    result: '',
    inspector: '',
    date: '',
    remarks: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save quality data
    console.log('Quality data:', qualityData);
  };

  const handleChange = (e) => {
    setQualityData({
      ...qualityData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="quality-section">
      <h2>Quality Control Entry</h2>
      <form onSubmit={handleSubmit} className="quality-form">
        <div className="form-group">
          <label htmlFor="batchNumber">Batch Number:</label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={qualityData.batchNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productType">Product Type:</label>
          <select
            id="productType"
            name="productType"
            value={qualityData.productType}
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
          <label htmlFor="testType">Test Type:</label>
          <select
            id="testType"
            name="testType"
            value={qualityData.testType}
            onChange={handleChange}
            required
          >
            <option value="">Select Test</option>
            <option value="tensile">Tensile Strength</option>
            <option value="hardness">Hardness</option>
            <option value="chemical">Chemical Composition</option>
            <option value="surface">Surface Quality</option>
            <option value="dimensional">Dimensional Check</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="result">Test Result:</label>
          <select
            id="result"
            name="result"
            value={qualityData.result}
            onChange={handleChange}
            required
          >
            <option value="">Select Result</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
            <option value="conditional">Conditional Pass</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inspector">Inspector Name:</label>
          <input
            type="text"
            id="inspector"
            name="inspector"
            value={qualityData.inspector}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Test Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={qualityData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            name="remarks"
            value={qualityData.remarks}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="submit-button">Submit Quality Data</button>
      </form>
    </div>
  );
}

export default QualityControl;