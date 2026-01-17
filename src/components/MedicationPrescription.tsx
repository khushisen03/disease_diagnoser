import React from 'react';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface MedicationPrescriptionProps {
  medications: Medication[];
}

const MedicationPrescription: React.FC<MedicationPrescriptionProps> = ({ medications }) => {
  if (!medications || medications.length === 0) {
    return null;
  }

  return (
    <div className="medication-prescription">
      <h4>💊 Prescribed Medications</h4>
      <div className="medication-list">
        {medications.map((medication, index) => (
          <div key={index} className="medication-item">
            <div className="medication-header">
              <h5 className="medication-name">{medication.name}</h5>
              <span className="medication-dosage">{medication.dosage}</span>
            </div>
            <div className="medication-details">
              <div className="medication-detail">
                <span className="detail-label">Frequency:</span>
                <span className="detail-value">{medication.frequency}</span>
              </div>
              <div className="medication-detail">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{medication.duration}</span>
              </div>
              <div className="medication-instructions">
                <span className="detail-label">Instructions:</span>
                <p className="detail-value">{medication.instructions}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="medication-disclaimer">
        <p><strong>⚠️ Important:</strong> This is for informational purposes only. Always consult with a healthcare professional before taking any medication.</p>
      </div>
    </div>
  );
};

export default MedicationPrescription;
