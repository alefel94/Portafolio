import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Project, ProjectCategory, ProjectStatus } from '../models/project.model';
import projectsData from '../../../assets/mock-data/projects.json';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = projectsData as Project[];

  getProjects(): Observable<Project[]> {
    // Simular delay de red para efecto más realista
    return of(this.projects).pipe(delay(500));
  }

  getFeaturedProjects(): Observable<Project[]> {
    const featured = this.projects.filter(p => p.featured);
    return of(featured).pipe(delay(300));
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project).pipe(delay(300));
  }

  getProjectsByCategory(category: ProjectCategory): Observable<Project[]> {
    const filtered = this.projects.filter(p => p.category === category);
    return of(filtered).pipe(delay(400));
  }

  getProjectsByStatus(status: ProjectStatus): Observable<Project[]> {
    const filtered = this.projects.filter(p => p.status === status);
    return of(filtered).pipe(delay(400));
  }

  searchProjects(query: string): Observable<Project[]> {
    const searchTerm = query.toLowerCase();
    const results = this.projects.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
    );
    return of(results).pipe(delay(500));
  }
}
