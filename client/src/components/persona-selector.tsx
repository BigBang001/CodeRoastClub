import { useState } from "react";
import { create } from "zustand";

const personas = [
  { id: "linus", emoji: "😤", name: "Linus Mode" },
  { id: "hrSafe", emoji: "🤝", name: "HR-Safe Dev" },
  { id: "genZ", emoji: "😎", name: "Gen Z Intern" },
  { id: "boomer", emoji: "👴", name: "Boomercoder" },
];

interface PersonaStore {
  selectedPersona: string;
  setSelectedPersona: (persona: string) => void;
}

export const usePersonaStore = create<PersonaStore>((set) => ({
  selectedPersona: "linus",
  setSelectedPersona: (persona) => set({ selectedPersona: persona }),
}));

export default function PersonaSelector() {
  const { selectedPersona, setSelectedPersona } = usePersonaStore();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Choose Your Roast Master</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => setSelectedPersona(persona.id)}
            className={`border rounded-lg px-4 py-3 transition-all duration-200 group ${
              selectedPersona === persona.id
                ? "bg-roast-pink border-roast-pink text-white"
                : "bg-editor-bg hover:bg-gray-700 border-gray-600 text-text-light"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{persona.emoji}</span>
              <span className="font-medium">{persona.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
