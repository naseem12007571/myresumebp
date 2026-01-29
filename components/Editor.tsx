
import React from 'react';
import { ResumeData, Experience, Education, Language } from '../types';
import { enhanceDescription, enhanceSummary } from '../services/geminiService';

interface EditorProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
}

export const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = React.useState<string | null>(null);

  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    onChange({
      ...data,
      personal: { ...data.personal, [field]: value }
    });
  };

  const handleEnhanceSummary = async () => {
    setIsEnhancing('summary');
    const enhanced = await enhanceSummary(data.personal.summary);
    updatePersonal('summary', enhanced);
    setIsEnhancing(null);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: 'New Role',
      company: 'Company',
      location: 'City, State',
      startDate: 'MM/YYYY',
      endDate: 'Current',
      description: ['Point 1']
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const newExp = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: newExp });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const handleEnhanceExp = async (id: string, text: string) => {
    setIsEnhancing(id);
    const bullets = await enhanceDescription(text);
    updateExperience(id, 'description', bullets);
    setIsEnhancing(null);
  };

  const addSkill = () => {
    onChange({ ...data, skills: [...data.skills, 'New Skill'] });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    onChange({ ...data, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    onChange({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-8 p-6 pb-24">
      <section>
        <h3 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <input 
            type="text" placeholder="Full Name" value={data.personal.fullName}
            onChange={(e) => updatePersonal('fullName', e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="text" placeholder="Location" value={data.personal.location}
            onChange={(e) => updatePersonal('location', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <input 
            type="text" placeholder="Phone" value={data.personal.phone}
            onChange={(e) => updatePersonal('phone', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <input 
            type="email" placeholder="Email" value={data.personal.email}
            onChange={(e) => updatePersonal('email', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <div className="relative">
            <textarea 
              placeholder="Summary" value={data.personal.summary} rows={4}
              onChange={(e) => updatePersonal('summary', e.target.value)}
              className="w-full p-2 border rounded-md resize-none"
            />
            <button 
              onClick={handleEnhanceSummary}
              disabled={isEnhancing === 'summary'}
              className="mt-2 flex items-center gap-2 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-700 disabled:opacity-50"
            >
              {isEnhancing === 'summary' ? 'Enhancing...' : '✨ AI Enhance Summary'}
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-xl font-bold text-slate-800">Experience</h3>
          <button onClick={addExperience} className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ Add</button>
        </div>
        <div className="flex flex-col gap-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input 
                  type="text" placeholder="Role" value={exp.role}
                  onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                  className="p-2 border rounded text-sm"
                />
                <input 
                  type="text" placeholder="Company" value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="p-2 border rounded text-sm"
                />
                <input 
                  type="text" placeholder="Start Date" value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="p-2 border rounded text-sm"
                />
                <input 
                  type="text" placeholder="End Date" value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="p-2 border rounded text-sm"
                />
              </div>
              <textarea 
                placeholder="Description points (one per line)" 
                value={exp.description.join('\n')}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                className="w-full p-2 border rounded text-sm mb-2"
                rows={3}
              />
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => handleEnhanceExp(exp.id, exp.description.join(' '))}
                  disabled={isEnhancing === exp.id}
                  className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isEnhancing === exp.id ? 'Enhancing...' : '✨ AI Polish Bullets'}
                </button>
                <button onClick={() => removeExperience(exp.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-xl font-bold text-slate-800">Skills</h3>
          <button onClick={addSkill} className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-1 bg-white border px-2 py-1 rounded-md shadow-sm">
              <input 
                type="text" value={skill}
                onChange={(e) => updateSkill(idx, e.target.value)}
                className="w-24 text-sm border-none focus:ring-0 p-0"
              />
              <button onClick={() => removeSkill(idx)} className="text-xs text-slate-400 hover:text-red-500">×</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4 text-slate-800 border-b pb-2">Hobbies & Interests</h3>
        <textarea 
          placeholder="Hobbies" value={data.hobbies} rows={3}
          onChange={(e) => onChange({ ...data, hobbies: e.target.value })}
          className="w-full p-2 border rounded-md resize-none"
        />
      </section>
      
      <div className="mt-8 text-center text-xs text-slate-400 italic">
        Design inspired by Naseem Ahmad
      </div>
    </div>
  );
};
