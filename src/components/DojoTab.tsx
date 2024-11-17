// Fix the skillId reference
const userSkill = skills.find(s => s.id === skill.id) || { level: 0, experience: 0 };