import { BentoSkills } from "./BentoSkills";
import { SkillIcons } from "./SkillIcons";
import { TagsTape } from "./TagsTape";


export default function Skills() {

  return (
    <div id="skills" className="h-screen">
      <TagsTape />

      {/* <BentoSkills /> */}

      <SkillIcons />

    </div>
  )
}