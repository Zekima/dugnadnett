"use client";

import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

const Skills = ({ initalSkills, updateSkills }: { initalSkills: string[], updateSkills: (listOfSkills: string[]) => void }) => {
  const [skills, setSkills] = useState(initalSkills);
  const [skillsText, setSkillsText] = useState("");

  const handleSkillChange = (event: any) => {
    setSkillsText(event.target.value);
  };

  const addSkill = (skillName: string) => {
    if (!skillName.trim()) return

    const newSkills = [...skills, skillName];
    setSkills(newSkills);
    setSkillsText("")
    updateSkills(newSkills);
  };

  const removeSkill = (skillName: string) => {
    const newSkills = skills.filter((skill) => skill !== skillName);
    setSkills(newSkills);
    updateSkills(newSkills);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium">Ferdigheter</h2>
      <div className="flex gap-1">
        <input
          placeholder="Legg til ferdigheter"
          onChange={handleSkillChange}
          value={skillsText}
          onKeyDown={(e) => e.key === 'Enter' && addSkill(skillsText)}
          className="border h-10 rounded-md p-2 border-gray-400 w-[500px]"
        />
        <button
          onClick={() => addSkill(skillsText)}
          className="px-4 h-10 py-2 text-white h-full bg-green-700 rounded-md hover:bg-green-800 border-green-700"
        >
          +
        </button>
      </div>
      <div className="flex gap-1.5 max-w-[500px] flex-wrap">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="text-gray-700 text-sm px-2 py-1 rounded-full bg-gray-200 flex items-center"
          >
            <button onClick={() => removeSkill(skill)}>
              <X size={16} />
            </button>

            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
