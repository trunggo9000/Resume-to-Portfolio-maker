import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { PortfolioData } from './PortfolioGenerator';

interface PortfolioFormProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export const PortfolioForm: React.FC<PortfolioFormProps> = ({ data, onChange }) => {
  const updateField = (field: keyof PortfolioData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !data.skills.includes(skill.trim())) {
      updateField('skills', [...data.skills, skill.trim()]);
    }
  };

  const removeSkill = (index: number) => {
    updateField('skills', data.skills.filter((_, i) => i !== index));
  };

  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const input = e.currentTarget;
      addSkill(input.value);
      input.value = '';
    }
  };

  const addProject = () => {
    updateField('projects', [...data.projects, { title: '', description: '' }]);
  };

  const updateProject = (index: number, field: 'title' | 'description', value: string) => {
    const updatedProjects = data.projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    updateField('projects', updatedProjects);
  };

  const removeProject = (index: number) => {
    if (data.projects.length > 1) {
      updateField('projects', data.projects.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="e.g., John Smith"
            className="transition-normal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Major / Role *</Label>
          <Input
            id="role"
            value={data.role}
            onChange={(e) => updateField('role', e.target.value)}
            placeholder="e.g., B.S. in Computer Science"
            className="transition-normal"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">Skills</h3>
          <span className="text-sm text-muted-foreground">Press Enter or comma to add</span>
        </div>
        
        <Input
          placeholder="Type a skill and press Enter..."
          onKeyDown={handleSkillInput}
          className="transition-normal"
        />
        
        {data.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="group">
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-4 w-4 p-0 group-hover:bg-destructive/20"
                  onClick={() => removeSkill(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-foreground">Projects</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addProject}
            disabled={data.projects.length >= 3}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <Card key={index} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Project {index + 1}</Label>
                {data.projects.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(index)}
                    className="h-6 w-6 p-0 hover:bg-destructive/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <Input
                placeholder="Project title"
                value={project.title}
                onChange={(e) => updateProject(index, 'title', e.target.value)}
                className="transition-normal"
              />
              
              <Textarea
                placeholder="Brief project description..."
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={3}
                className="resize-none transition-normal"
              />
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="your.email@example.com"
            className="transition-normal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => updateField('github', e.target.value)}
            placeholder="https://github.com/yourusername"
            className="transition-normal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => updateField('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="transition-normal"
          />
        </div>
      </div>
    </div>
  );
};