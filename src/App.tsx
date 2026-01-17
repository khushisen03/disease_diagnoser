import React, { useState } from 'react';
import SymptomForm from './components/SymptomForm';
import Result from './components/Result';
import './App.css';

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

const App: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalSymptoms, setAdditionalSymptoms] = useState<string>('');
  const [results, setResults] = useState<(Disease & { matchScore: number })[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Sample disease database
  const diseaseDatabase: Disease[] = [
    {
      symptoms: ['fever', 'cough', 'headache'],
      disease: 'Common Cold',
      description: 'A viral infection affecting the upper respiratory tract.',
      medications: [
        {
          name: 'Acetaminophen',
          dosage: '500mg',
          frequency: 'Every 6 hours',
          duration: '3-5 days',
          instructions: 'Take with food to reduce stomach irritation. Do not exceed 4 doses per day.'
        },
        {
          name: 'Ibuprofen',
          dosage: '200-400mg',
          frequency: 'Every 6-8 hours',
          duration: '3-5 days',
          instructions: 'Take with food. Stop if stomach upset occurs.'
        }
      ]
    },
    {
      symptoms: ['fever', 'cough', 'chest pain', 'shortness of breath'],
      disease: 'Pneumonia',
      description: 'Infection that inflames air sacs in one or both lungs.',
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '7-10 days',
          instructions: 'Take with food. Complete the full course even if feeling better.'
        },
        {
          name: 'Azithromycin',
          dosage: '500mg',
          frequency: 'Once daily',
          duration: '5 days',
          instructions: 'Take 1 hour before or 2 hours after meals.'
        }
      ]
    },
    {
      symptoms: ['headache', 'nausea', 'fatigue'],
      disease: 'Migraine',
      description: 'A headache that can cause severe throbbing pain or pulsing sensation.',
      medications: [
        {
          name: 'Sumatriptan',
          dosage: '50mg',
          frequency: 'As needed',
          duration: 'Until symptoms resolve',
          instructions: 'Take at first sign of migraine. Maximum 2 doses per day.'
        },
        {
          name: 'Ibuprofen',
          dosage: '400-600mg',
          frequency: 'Every 6-8 hours',
          duration: 'Until symptoms resolve',
          instructions: 'Take with food. Use for mild to moderate pain.'
        }
      ]
    },
    {
      symptoms: ['fever', 'sweating', 'fatigue'],
      disease: 'Flu',
      description: 'Influenza is a viral infection that attacks your respiratory system.',
      medications: [
        {
          name: 'Oseltamivir (Tamiflu)',
          dosage: '75mg',
          frequency: 'Twice daily',
          duration: '5 days',
          instructions: 'Start within 48 hours of symptoms. Take with food.'
        },
        {
          name: 'Acetaminophen',
          dosage: '650mg',
          frequency: 'Every 4-6 hours',
          duration: '3-7 days',
          instructions: 'For fever and body aches. Do not exceed 4 doses per day.'
        }
      ]
    },
    {
      symptoms: ['chest pain', 'shortness of breath', 'fatigue'],
      disease: 'Heart Disease',
      description: 'A range of conditions that affect your heart.',
      medications: [
        {
          name: 'Aspirin',
          dosage: '81mg',
          frequency: 'Once daily',
          duration: 'Long-term',
          instructions: 'Take with food. Helps prevent blood clots.'
        },
        {
          name: 'Atorvastatin',
          dosage: '20-40mg',
          frequency: 'Once daily',
          duration: 'Long-term',
          instructions: 'Take with or without food, preferably in the evening.'
        }
      ]
    }
  ];

  const calculateMatchScore = (disease: Disease, userSymptoms: string[]): number => {
    const diseaseSymptoms = disease.symptoms.map(s => s.toLowerCase());
    const userSymptomsLower = userSymptoms.map(s => s.toLowerCase());
    
    const matches = diseaseSymptoms.filter(symptom => 
      userSymptomsLower.some(userSymptom => 
        userSymptom.includes(symptom) || symptom.includes(userSymptom)
      )
    );
    
    return matches.length / Math.max(diseaseSymptoms.length, userSymptomsLower.length);
  };

  const handleDiagnose = async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const allSymptoms = [
      ...selectedSymptoms,
      ...additionalSymptoms.split(',').map(s => s.trim()).filter(s => s)
    ];
    
    if (allSymptoms.length === 0) {
      setLoading(false);
      return;
    }
    
    const scoredResults = diseaseDatabase
      .map(disease => ({
        ...disease,
        matchScore: calculateMatchScore(disease, allSymptoms)
      }))
      .filter(result => result.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
    
    setResults(scoredResults);
    setLoading(false);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setAdditionalSymptoms('');
    setResults([]);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Disease Diagnoser</h1>
        <p>Enter your symptoms to get possible diagnoses</p>
      </header>
      
      <main className="app-main">
        <div className="card">
          <SymptomForm
            selectedSymptoms={selectedSymptoms}
            setSelectedSymptoms={setSelectedSymptoms}
            additionalSymptoms={additionalSymptoms}
            setAdditionalSymptoms={setAdditionalSymptoms}
            onDiagnose={handleDiagnose}
            onReset={handleReset}
            loading={loading}
          />
          
          {loading && (
            <div className="loading-section">
              <div className="spinner"></div>
              <p>Analyzing symptoms...</p>
            </div>
          )}
          
          {results.length > 0 && !loading && (
            <Result results={results} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
