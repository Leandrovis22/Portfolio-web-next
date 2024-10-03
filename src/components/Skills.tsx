import { SkillIcons } from "./sub-components/SkillIcons";
import { TagsTape } from "./TagsTape";

interface SkillsProps {
  data: {
    cards: Array<{
      title: string;
      src: string;
      content: string; // JSON string
    }>;
    words?: string[];
  }
}

export default function Skills({ data }: SkillsProps) {
  const { cards, words = [] } = data;

  return (
    <div id="skills" className="">
      <TagsTape words={words} />
      <SkillIcons cards={cards} />
    </div>
  )
}