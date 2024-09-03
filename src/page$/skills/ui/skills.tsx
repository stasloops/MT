import { Skill } from '@/widgets/skill';
import { SkillsList } from '@/widgets/skills_list';
import { useState } from 'react';

export const Skills = () => {
  const [page, setPage] = useState<'list' | 'skill'>('skill')

  if (page === 'list') {
    return <SkillsList />
  }

  if (page === 'skill') {
    return <Skill />
  }

};
