import React from "react";
import MedicationPrescription from "./MedicationPrescription";

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Disease {
  symptoms: string[];
  disease: string;
  description: string;
  medications: Medication[];
  matchScore?: number;
}

interface ResultProps {
  results: (Disease & { matchScore: number })[];
}

const Result: React.FC<ResultProps> = ({ results }) => {
  return (
    <section className="results">
      <h2>Possible Diagnoses</h2>
      <p>
        Based on your symptoms, here are the most likely conditions (top matches
        shown). Consult a doctor for accurate diagnosis.
      </p>
      <ul className="results-list">
        {results.map((result, index) => (
          <li key={index} className="result-item">
            <h3>
              {result.disease} ({Math.round(result.matchScore * 100)}% match)
            </h3>
            <p>{result.description}</p>
            <MedicationPrescription medications={result.medications} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Result;
