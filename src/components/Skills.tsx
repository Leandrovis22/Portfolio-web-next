import { BentoSkills } from "./BentoSkills";
import { SkillIcons } from "./SkillIcons";
import { TagsTape } from "./TagsTape";


export default function Skills() {

  return (
    <div id="skills" className="lg:h-screen">
      <TagsTape />
      <SkillIcons />
    </div>
  )
}