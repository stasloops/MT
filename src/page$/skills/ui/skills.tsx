import { skill_page_model } from '@/entities/skill';
import { Skill } from '@/widgets/skill';
import { SkillsList } from '@/widgets/skills_list';
import { useUnit } from 'effector-react';

export const Skills = () => {
  const [page] = useUnit([skill_page_model.$page])

  if (page === 'skill_list') {
    return <SkillsList />
  }

  if (page === 'skill') {
    return <Skill />
  }

};
