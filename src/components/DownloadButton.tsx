import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PortfolioData, CustomizationData } from './PortfolioGenerator';

interface DownloadButtonProps {
  data: PortfolioData;
  customization: CustomizationData;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ data, customization }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const { toast } = useToast();

  const generateHTML = (data: PortfolioData): string => {
    const skillsHTML = data.skills.length > 0 
      ? `<section class="skills">
          <h2>Skills</h2>
          <div class="skills-grid">
            ${data.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
          </div>
        </section>`
      : '';

    const projectsHTML = data.projects.some(p => p.title || p.description)
      ? `<section class="projects">
          <h2>Projects</h2>
          <div class="projects-grid">
            ${data.projects
              .filter(p => p.title || p.description)
              .map(project => `
                <div class="project-card">
                  ${project.title ? `<h3>${project.title}</h3>` : ''}
                  ${project.description ? `<p>${project.description}</p>` : ''}
                </div>
              `).join('')}
          </div>
        </section>`
      : '';

    const contactLinks = [];
    if (data.email) contactLinks.push(`<a href="mailto:${data.email}" class="contact-link">📧 Email</a>`);
    if (data.github) contactLinks.push(`<a href="${data.github}" target="_blank" class="contact-link">🔗 GitHub</a>`);
    if (data.linkedin) contactLinks.push(`<a href="${data.linkedin}" target="_blank" class="contact-link">💼 LinkedIn</a>`);

    const contactHTML = contactLinks.length > 0
      ? `<section class="contact">
          <h2>Contact</h2>
          <div class="contact-links">
            ${contactLinks.join('')}
          </div>
        </section>`
      : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.fullName || 'Portfolio'} - Portfolio</title>
    <meta name="description" content="Professional portfolio of ${data.fullName || 'a talented professional'}${data.role ? `, ${data.role}` : ''}">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="hero">
        <div class="hero-content">
            ${data.fullName ? `<h1>${data.fullName}</h1>` : ''}
            ${data.role ? `<p class="role">${data.role}</p>` : ''}
        </div>
    </header>

    <main class="main-content">
        ${skillsHTML}
        ${projectsHTML}
        ${contactHTML}
    </main>

    <footer>
        <p>&copy; ${new Date().getFullYear()} ${data.fullName || 'Portfolio'}. Generated with Portfolio Generator.</p>
    </footer>
</body>
</html>`;
  };

  const generateCSS = (): string => {
    const fontFamilyMap = {
      inter: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif',
      system: 'system-ui, -apple-system, sans-serif',
      serif: 'Georgia, "Times New Roman", serif',
      mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
    };

    const selectedFont = fontFamilyMap[customization.theme.fontFamily as keyof typeof fontFamilyMap] || fontFamilyMap.inter;

    return `/* Portfolio Styles - Custom Theme */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: hsl(${customization.theme.primaryColor});
    --primary-foreground: hsl(0, 0%, 98%);
    --accent: hsl(${customization.theme.accentColor});
    --background: hsl(250, 250%, 99%);
    --foreground: hsl(230, 15%, 15%);
    --muted: hsl(230, 25%, 96%);
    --muted-foreground: hsl(230, 10%, 45%);
    --border: hsl(230, 20%, 90%);
    --card: hsl(0, 0%, 100%);
    --hero-gradient: ${customization.theme.heroGradient};
    --card-shadow: 0 4px 6px -1px hsl(230, 25%, 85%, 0.1), 0 2px 4px -2px hsl(230, 25%, 85%, 0.1);
    --card-shadow-lg: 0 20px 25px -5px hsl(230, 25%, 80%, 0.1), 0 8px 10px -6px hsl(230, 25%, 80%, 0.1);
    --border-radius: ${customization.theme.borderRadius}px;
    --font-size: ${customization.theme.fontSize}px;
    --animation-speed: ${customization.animations.animationSpeed}ms;
}

body {
    font-family: ${selectedFont};
    line-height: 1.6;
    color: var(--foreground);
    background: var(--background);
    font-size: var(--font-size);
}

.hero {
    background: var(--hero-gradient);
    color: var(--primary-foreground);
    text-align: ${customization.layout.heroAlign};
    padding: 4rem 2rem;
    min-height: ${customization.layout.heroHeight}px;
    display: flex;
    align-items: center;
    justify-content: ${
      customization.layout.heroAlign === 'center' ? 'center' :
      customization.layout.heroAlign === 'right' ? 'flex-end' : 'flex-start'
    };
}

.hero-content h1 {
    font-size: ${customization.theme.fontSize * 2.5}px;
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    ${customization.animations.entranceAnimation !== 'none' ? `
    animation: ${customization.animations.entranceAnimation} var(--animation-speed) ease-out;
    ` : ''}
}

.hero-content .role {
    font-size: ${customization.theme.fontSize * 1.25}px;
    opacity: 0.9;
    font-weight: 400;
}

.main-content {
    max-width: ${customization.layout.contentWidth}px;
    margin: 0 auto;
    padding: 3rem 2rem;
}

section {
    margin-bottom: ${customization.layout.compactMode ? '24px' : customization.layout.sectionSpacing + 'px'};
    ${customization.animations.entranceAnimation !== 'none' ? `
    animation: ${customization.animations.entranceAnimation} var(--animation-speed) ease-out;
    ` : ''}
}

section h2 {
    font-size: ${customization.theme.fontSize * 1.5}px;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--foreground);
    ${customization.layout.showSectionDividers ? `
    border-bottom: 2px solid var(--border);
    padding-bottom: 0.5rem;
    ` : ''}
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.skill-badge {
    display: inline-block;
    background: var(--muted);
    color: var(--foreground);
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    font-size: ${customization.theme.fontSize * 0.875}px;
    font-weight: 500;
    border: 1px solid var(--border);
    transition: all var(--animation-speed) ease;
}

${customization.animations.hoverEffects ? `
.skill-badge:hover {
    background: var(--accent);
    color: var(--primary-foreground);
    transform: translateY(-1px) scale(1.05);
    box-shadow: var(--card-shadow-lg);
}
` : ''}

.projects-grid {
    display: ${customization.layout.layout === 'grid' ? 'grid' : 'flex'};
    ${customization.layout.layout === 'grid' ? 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));' : 'flex-direction: column;'}
    gap: 2rem;
}

.project-card {
    background: var(--card);
    padding: 2rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--border);
    box-shadow: var(--card-shadow);
    transition: all var(--animation-speed) ease;
}

${customization.animations.hoverEffects ? `
.project-card:hover {
    box-shadow: var(--card-shadow-lg);
    transform: translateY(-2px);
}
` : ''}

.project-card h3 {
    font-size: ${customization.theme.fontSize * 1.25}px;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--foreground);
}

.project-card p {
    color: var(--muted-foreground);
    line-height: 1.7;
    font-size: var(--font-size);
}

.contact-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.contact-link {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: var(--card);
    color: var(--foreground);
    text-decoration: none;
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
    font-weight: 500;
    transition: all var(--animation-speed) ease;
    box-shadow: var(--card-shadow);
    font-size: ${customization.theme.fontSize * 0.875}px;
}

${customization.animations.hoverEffects ? `
.contact-link:hover {
    background: var(--accent);
    color: var(--primary-foreground);
    transform: translateY(-1px) scale(1.05);
    box-shadow: var(--card-shadow-lg);
}
` : ''}

footer {
    text-align: center;
    padding: 2rem;
    color: var(--muted-foreground);
    border-top: 1px solid var(--border);
    background: var(--muted);
    font-size: ${customization.theme.fontSize * 0.875}px;
}

/* Animation Keyframes */
${customization.animations.entranceAnimation !== 'none' ? `
@keyframes fade {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideLeft {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes bounce {
    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes scale {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
` : ''}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-content h1 {
        font-size: ${customization.theme.fontSize * 2}px;
    }
    
    .hero-content .role {
        font-size: ${customization.theme.fontSize * 1.1}px;
    }
    
    .main-content {
        padding: 2rem 1rem;
    }
    
    section h2 {
        font-size: ${customization.theme.fontSize * 1.25}px;
    }
    
    .contact-links {
        flex-direction: column;
    }
    
    .contact-link {
        justify-content: center;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .hero {
        padding: 3rem 1rem;
        min-height: ${Math.max(customization.layout.heroHeight * 0.8, 200)}px;
    }
    
    .hero-content h1 {
        font-size: ${customization.theme.fontSize * 1.75}px;
    }
    
    .project-card {
        padding: 1.5rem;
    }
}`;
  };

  const handleDownload = async () => {
    if (!data.fullName && !data.role && data.skills.length === 0 && !data.projects.some(p => p.title || p.description)) {
      toast({
        title: "Portfolio is empty",
        description: "Please fill out at least some basic information before downloading.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const zip = new JSZip();
      
      // Generate HTML and CSS
      const html = generateHTML(data);
      const css = generateCSS();
      
      // Add files to ZIP
      zip.file('index.html', html);
      zip.file('style.css', css);
      
      // Generate and download ZIP
      const content = await zip.generateAsync({ type: 'blob' });
      const fileName = data.fullName 
        ? `${data.fullName.replace(/\s+/g, '_').toLowerCase()}_portfolio.zip`
        : 'portfolio.zip';
      
      saveAs(content, fileName);
      
      toast({
        title: "Portfolio downloaded!",
        description: "Your portfolio has been successfully generated and downloaded."
      });
    } catch (error) {
      console.error('Error generating portfolio:', error);
      toast({
        title: "Download failed",
        description: "There was an error generating your portfolio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const hasContent = data.fullName || data.role || data.skills.length > 0 || 
    data.projects.some(p => p.title || p.description) || data.email;

  return (
    <Button 
      onClick={handleDownload}
      disabled={!hasContent || isGenerating}
      size="lg"
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-normal"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Generating Portfolio...
        </>
      ) : (
        <>
          <Download className="w-5 h-5 mr-2" />
          Download My Portfolio
        </>
      )}
    </Button>
  );
};