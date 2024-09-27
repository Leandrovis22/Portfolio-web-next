// src\components\Skills.tsx
import { SkillIcons } from "./sub-components/SkillIcons";
import { TagsTape } from "./TagsTape";

interface SkillsProps {
  data: {
    // Define la estructura de tus datos aquí
  }
}

export default function Skills( { data }: SkillsProps ) {

  return (
    <div id="skills" className="">
      <TagsTape />
      <SkillIcons />
    </div>
  )
}