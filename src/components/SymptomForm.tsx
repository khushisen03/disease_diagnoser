import React from 'react';

const commonSymptoms = [
  'fever',
  'cough',
  'headache',
  'chest pain',
  'sweating',
  'nausea',
  'shortness of breath',
  'fatigue'
];

interface SymptomFormProps {
  selectedSymptoms: string[];
  setSelectedSymptoms: (symptoms: string[] | ((prev: string[]) => string[])) => void;
  additionalSymptoms: string;
  setAdditionalSymptoms: (symptoms: string) => void;
  onDiagnose: () => void;
  onReset: () => void;
  loading: boolean;
}

const SymptomForm: React.FC<SymptomFormProps> = ({
  selectedSymptoms,
  setSelectedSymptoms,
  additionalSymptoms,
  setAdditionalSymptoms,
  onDiagnose,
  onReset,
  loading
}) => {
  const handleCheckboxChange = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <section className="symptom-form">
      <h2>Enter Your Symptoms</h2>
      
      <div className="form-group">
        <label>Common Symptoms (select all that apply):</label>
        <div className="checkbox-grid">
          {commonSymptoms.map(symptom => (
            <label key={symptom} className="checkbox-label">
              <input
                type="checkbox"
                value={symptom}
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => handleCheckboxChange(symptom)}
                disabled={loading}
              />
              {symptom}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="additional">Additional Symptoms (comma-separated, e.g., "dizziness, rash"):</label>
        <input
          type="text"
          id="additional"
          value={additionalSymptoms}
          onChange={(e) => setAdditionalSymptoms(e.target.value)}
          placeholder="Type here..."
          disabled={loading}
        />
      </div>

      <div className="button-group">
        <button
          onClick={onDiagnose}
          disabled={loading || (selectedSymptoms.length === 0 && !additionalSymptoms.trim())}
          className="btn btn-primary"
        >
          Diagnose
        </button>
        <button onClick={onReset} disabled={loading} className="btn btn-secondary">
          Reset
        </button>
      </div>
    </section>
  );
};

export default SymptomForm;