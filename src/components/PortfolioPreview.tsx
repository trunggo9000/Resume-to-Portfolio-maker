import React from 'react';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PortfolioData, CustomizationData } from './PortfolioGenerator';

interface PortfolioPreviewProps {
  data: PortfolioData;
  customization: CustomizationData;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ data, customization }) => {
  const hasContent = data.fullName || data.role || data.skills.length > 0 || 
    data.projects.some(p => p.title || p.description) || data.email;

  const getAnimationClass = (delay = 0) => {
    if (customization.animations.entranceAnimation === 'none') return '';
    
    const animations = {
      fade: 'animate-fade-in',
      slideUp: 'animate-slide-up',
      slideLeft: 'animate-slide-left',
      bounce: 'animate-bounce-in',
      scale: 'animate-scale-in'
    };
    
    return animations[customization.animations.entranceAnimation] || '';
  };

  const getCustomStyles = () => ({
    '--primary': `hsl(${customization.theme.primaryColor})`,
    '--accent': `hsl(${customization.theme.accentColor})`,
    '--hero-bg': customization.theme.heroGradient,
    '--border-radius': `${customization.theme.borderRadius}px`,
    '--font-size': `${customization.theme.fontSize}px`,
    '--section-spacing': `${customization.layout.sectionSpacing}px`,
    '--content-width': `${customization.layout.contentWidth}px`,
    '--hero-height': `${customization.layout.heroHeight}px`,
    '--animation-speed': `${customization.animations.animationSpeed}ms`,
    fontFamily: customization.theme.fontFamily === 'serif' ? 'Georgia, serif' :
                customization.theme.fontFamily === 'mono' ? 'monospace' :
                customization.theme.fontFamily === 'system' ? 'system-ui' : 'Inter, sans-serif'
  } as React.CSSProperties);

  if (!hasContent) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <ExternalLink className="w-8 h-8" />
        </div>
        <p className="text-lg font-medium mb-2">Portfolio Preview</p>
        <p className="text-sm">Fill out the form to see your portfolio come to life</p>
      </div>
    );
  }

  return (
    <div 
      className="bg-background border rounded-xl overflow-hidden shadow-sm"
      style={getCustomStyles()}
    >
      {/* Portfolio Header */}
      <div 
        className={`text-primary-foreground px-8 py-12 ${getAnimationClass()}`}
        style={{ 
          background: customization.theme.heroGradient,
          minHeight: `${customization.layout.heroHeight}px`,
          textAlign: customization.layout.heroAlign,
          display: 'flex',
          alignItems: 'center',
          justifyContent: customization.layout.heroAlign === 'center' ? 'center' : 
                          customization.layout.heroAlign === 'right' ? 'flex-end' : 'flex-start'
        }}
      >
        <div className="space-y-4" style={{ maxWidth: `${customization.layout.contentWidth}px` }}>
          {data.fullName && (
            <h1 
              className="font-bold tracking-tight"
              style={{ 
                fontSize: `${customization.theme.fontSize * 2.5}px`,
                borderRadius: `${customization.theme.borderRadius}px`
              }}
            >
              {data.fullName}
            </h1>
          )}
          {data.role && (
            <p 
              className="opacity-90"
              style={{ fontSize: `${customization.theme.fontSize * 1.25}px` }}
            >
              {data.role}
            </p>
          )}
        </div>
      </div>

      <div 
        className="p-8"
        style={{ 
          maxWidth: `${customization.layout.contentWidth}px`,
          margin: '0 auto',
          gap: `${customization.layout.sectionSpacing}px`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Skills Section */}
        {data.skills.length > 0 && (
          <section 
            className={getAnimationClass(100)}
            style={{ 
              marginBottom: customization.layout.compactMode ? '24px' : `${customization.layout.sectionSpacing}px`
            }}
          >
            <h2 
              className="font-semibold mb-4 text-foreground"
              style={{ 
                fontSize: `${customization.theme.fontSize * 1.5}px`,
                borderBottom: customization.layout.showSectionDividers ? '2px solid hsl(var(--border))' : 'none',
                paddingBottom: customization.layout.showSectionDividers ? '8px' : '0'
              }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className={`text-sm py-1 px-3 transition-all duration-300 ${
                    customization.animations.hoverEffects ? 'hover:scale-105 hover:shadow-md' : ''
                  }`}
                  style={{ 
                    borderRadius: `${customization.theme.borderRadius}px`,
                    fontSize: `${customization.theme.fontSize * 0.875}px`,
                    animationDelay: `${index * customization.animations.staggerDelay}ms`
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects.some(p => p.title || p.description) && (
          <section 
            className={getAnimationClass(200)}
            style={{ 
              marginBottom: customization.layout.compactMode ? '24px' : `${customization.layout.sectionSpacing}px`
            }}
          >
            <h2 
              className="font-semibold mb-6 text-foreground"
              style={{ 
                fontSize: `${customization.theme.fontSize * 1.5}px`,
                borderBottom: customization.layout.showSectionDividers ? '2px solid hsl(var(--border))' : 'none',
                paddingBottom: customization.layout.showSectionDividers ? '8px' : '0'
              }}
            >
              Projects
            </h2>
            <div 
              className="gap-4"
              style={{
                display: customization.layout.layout === 'grid' ? 'grid' : 'flex',
                flexDirection: customization.layout.layout === 'vertical' ? 'column' : undefined,
                gridTemplateColumns: customization.layout.layout === 'grid' ? 'repeat(auto-fit, minmax(300px, 1fr))' : undefined
              }}
            >
              {data.projects.filter(p => p.title || p.description).map((project, index) => (
                <Card 
                  key={index} 
                  className={`p-6 border transition-all duration-300 ${
                    customization.animations.hoverEffects ? 'hover:shadow-lg hover:-translate-y-1' : ''
                  }`}
                  style={{ 
                    borderRadius: `${customization.theme.borderRadius}px`,
                    animationDelay: `${(index + 2) * customization.animations.staggerDelay}ms`
                  }}
                >
                  {project.title && (
                    <h3 
                      className="font-semibold mb-3 text-card-foreground"
                      style={{ fontSize: `${customization.theme.fontSize * 1.25}px` }}
                    >
                      {project.title}
                    </h3>
                  )}
                  {project.description && (
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontSize: `${customization.theme.fontSize}px` }}
                    >
                      {project.description}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {(data.email || data.github || data.linkedin) && (
          <section 
            className={getAnimationClass(300)}
            style={{ 
              marginBottom: customization.layout.compactMode ? '24px' : `${customization.layout.sectionSpacing}px`
            }}
          >
            <h2 
              className="font-semibold mb-6 text-foreground"
              style={{ 
                fontSize: `${customization.theme.fontSize * 1.5}px`,
                borderBottom: customization.layout.showSectionDividers ? '2px solid hsl(var(--border))' : 'none',
                paddingBottom: customization.layout.showSectionDividers ? '8px' : '0'
              }}
            >
              Contact
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              {data.email && (
                <Button 
                  variant="outline" 
                  asChild 
                  className={`justify-start transition-all duration-300 ${
                    customization.animations.hoverEffects ? 'hover:scale-105 hover:shadow-md' : ''
                  }`}
                  style={{ 
                    borderRadius: `${customization.theme.borderRadius}px`,
                    fontSize: `${customization.theme.fontSize * 0.875}px`
                  }}
                >
                  <a href={`mailto:${data.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
              )}
              {data.github && (
                <Button 
                  variant="outline" 
                  asChild 
                  className={`justify-start transition-all duration-300 ${
                    customization.animations.hoverEffects ? 'hover:scale-105 hover:shadow-md' : ''
                  }`}
                  style={{ 
                    borderRadius: `${customization.theme.borderRadius}px`,
                    fontSize: `${customization.theme.fontSize * 0.875}px`
                  }}
                >
                  <a href={data.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {data.linkedin && (
                <Button 
                  variant="outline" 
                  asChild 
                  className={`justify-start transition-all duration-300 ${
                    customization.animations.hoverEffects ? 'hover:scale-105 hover:shadow-md' : ''
                  }`}
                  style={{ 
                    borderRadius: `${customization.theme.borderRadius}px`,
                    fontSize: `${customization.theme.fontSize * 0.875}px`
                  }}
                >
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};