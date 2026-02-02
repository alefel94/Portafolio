import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Experience, Timeline } from '../models/experience.model';
import experienceData from '../../../assets/mock-data/experience.json';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private experiences: Experience[] = experienceData as Experience[];

  getExperiences(): Observable<Experience[]> {
    // Ordenar por fecha de inicio (más reciente primero)
    const sorted = [...this.experiences].sort((a, b) => {
      return new Date(b.period.start).getTime() - new Date(a.period.start).getTime();
    });
    return of(sorted).pipe(delay(400));
  }

  getCurrentExperience(): Observable<Experience | undefined> {
    const current = this.experiences.find(e => !e.period.end);
    return of(current).pipe(delay(300));
  }

  getTimeline(): Observable<Timeline> {
    return this.getExperiences().pipe(
      map(experiences => {
        const totalYears = this.calculateTotalYears(experiences);
        const systemUptime = this.formatUptime(totalYears);

        return {
          entries: experiences,
          totalYears,
          systemUptime
        };
      })
    );
  }

  getExperienceById(id: string): Observable<Experience | undefined> {
    const experience = this.experiences.find(e => e.id === id);
    return of(experience).pipe(delay(200));
  }

  private calculateTotalYears(experiences: Experience[]): number {
    let totalMonths = 0;

    experiences.forEach(exp => {
      const start = new Date(exp.period.start);
      const end = exp.period.end ? new Date(exp.period.end) : new Date();

      const months = (end.getFullYear() - start.getFullYear()) * 12 +
                     (end.getMonth() - start.getMonth());
      totalMonths += months;
    });

    return Math.round((totalMonths / 12) * 10) / 10;
  }

  private formatUptime(years: number): string {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);

    if (months === 0) {
      return `${wholeYears} ${wholeYears === 1 ? 'year' : 'years'}`;
    }

    return `${wholeYears} ${wholeYears === 1 ? 'year' : 'years'}, ${months} ${months === 1 ? 'month' : 'months'}`;
  }
}
