import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dashboard Data');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(dataBlob, `${filename}.xlsx`);
};

export const exportToCSV = (data, filename) => {
  const csvContent = data.map(row => Object.values(row).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${filename}.csv`);
};

export const exportToPDF = async (element, filename) => {
  const { jsPDF } = await import('jspdf');
  const { html2canvas } = await import('html2canvas');

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${filename}.pdf`);
};

export const prepareMetricsForExport = (metrics) => {
  return metrics.map(metric => ({
    Title: metric.title,
    Value: metric.value,
    Trend: metric.trend,
    Timestamp: new Date().toISOString()
  }));
};

export const prepareActivitiesForExport = (activities) => {
  return activities.map(activity => ({
    Time: activity.time,
    Activity: activity.activity,
    Type: activity.type,
    Timestamp: new Date().toISOString()
  }));
};

export const prepareAlertsForExport = (alerts) => {
  return alerts.map(alert => ({
    Message: alert.message,
    Severity: alert.severity,
    Timestamp: alert.timestamp
  }));
};

export const exportDashboardData = (data, format, filename) => {
  const exportData = {
    metrics: prepareMetricsForExport(data.metrics),
    activities: prepareActivitiesForExport(data.recentActivities),
    alerts: prepareAlertsForExport(data.alerts)
  };

  switch (format) {
    case 'excel':
      exportToExcel(exportData.metrics, `${filename}_metrics`);
      exportToExcel(exportData.activities, `${filename}_activities`);
      exportToExcel(exportData.alerts, `${filename}_alerts`);
      break;
    case 'csv':
      exportToCSV(exportData.metrics, `${filename}_metrics`);
      exportToCSV(exportData.activities, `${filename}_activities`);
      exportToCSV(exportData.alerts, `${filename}_alerts`);
      break;
    case 'pdf':
      exportToPDF(document.getElementById('dashboard-content'), filename);
      break;
    default:
      console.error('Unsupported export format');
  }
}; 