import React, { useState } from 'react';

function Maintenance() {
  const [maintenanceData, setMaintenanceData] = useState({
    equipmentId: '',
    equipmentName: '',
    maintenanceType: '',
    priority: '',
    status: '',
    assignedTo: '',
    scheduledDate: '',
    completionDate: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save maintenance data
    console.log('Maintenance data:', maintenanceData);
  };

  const handleChange = (e) => {
    setMaintenanceData({
      ...maintenanceData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="maintenance-section">
      <h2>Maintenance Entry</h2>
      <form onSubmit={handleSubmit} className="maintenance-form">
        <div className="form-group">
          <label htmlFor="equipmentId">Equipment ID:</label>
          <input
            type="text"
            id="equipmentId"
            name="equipmentId"
            value={maintenanceData.equipmentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="equipmentName">Equipment Name:</label>
          <input
            type="text"
            id="equipmentName"
            name="equipmentName"
            value={maintenanceData.equipmentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maintenanceType">Maintenance Type:</label>
          <select
            id="maintenanceType"
            name="maintenanceType"
            value={maintenanceData.maintenanceType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="preventive">Preventive Maintenance</option>
            <option value="corrective">Corrective Maintenance</option>
            <option value="predictive">Predictive Maintenance</option>
            <option value="condition">Condition-based Maintenance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={maintenanceData.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={maintenanceData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To:</label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={maintenanceData.assignedTo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="scheduledDate">Scheduled Date:</label>
          <input
            type="date"
            id="scheduledDate"
            name="scheduledDate"
            value={maintenanceData.scheduledDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="completionDate">Completion Date:</label>
          <input
            type="date"
            id="completionDate"
            name="completionDate"
            value={maintenanceData.completionDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={maintenanceData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit Maintenance Data</button>
      </form>
    </div>
  );
}

export default Maintenance; 