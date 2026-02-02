import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Skill, SkillCategory, SkillGroup } from '../models/skill.model';
import skillsData from '../../../assets/mock-data/skills.json';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skills: Skill[] = skillsData as Skill[];

  getSkills(): Observable<Skill[]> {
    return of(this.skills).pipe(delay(400));
  }

  getSkillsByCategory(category: SkillCategory): Observable<Skill[]> {
    const filtered = this.skills.filter(s => s.category === category);
    return of(filtered).pipe(delay(300));
  }

  getSkillGroups(): Observable<SkillGroup[]> {
    return of(this.skills).pipe(
      delay(500),
      map(skills => {
        const categories = Array.from(new Set(skills.map(s => s.category)));

        return categories.map(category => {
          const categorySkills = skills.filter(s => s.category === category);
          const avgLevel = categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length;

          return {
            category,
            skills: categorySkills,
            totalModules: categorySkills.length,
            systemLoad: Math.round(avgLevel)
          };
        });
      })
    );
  }

  getTopSkills(limit: number = 5): Observable<Skill[]> {
    const topSkills = [...this.skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, limit);
    return of(topSkills).pipe(delay(300));
  }

  getSkillById(id: string): Observable<Skill | undefined> {
    const skill = this.skills.find(s => s.id === id);
    return of(skill).pipe(delay(200));
  }
}
