import React, { useState } from 'react';
import { PortfolioForm } from './PortfolioForm';
import { PortfolioPreview } from './PortfolioPreview';
import { DownloadButton } from './DownloadButton';
import { ThemeCustomizer } from './ThemeCustomizer';
import { LayoutCustomizer } from './LayoutCustomizer';
import { AnimationCustomizer } from './AnimationCustomizer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface PortfolioData {
  fullName: string;
  role: string;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
  }>;
  email: string;
  github: string;
  linkedin: string;
}

export interface CustomizationData {
  theme: {
    primaryColor: string;
    accentColor: string;
    heroGradient: string;
    borderRadius: number;
    fontSize: number;
    fontFamily: string;
  };
  layout: {
    layout: 'vertical' | 'grid';
    heroAlign: 'left' | 'center' | 'right';
    sectionSpacing: number;
    contentWidth: number;
    heroHeight: number;
    showSectionDividers: boolean;
    compactMode: boolean;
  };
  animations: {
    entranceAnimation: 'none' | 'fade' | 'slideUp' | 'slideLeft' | 'bounce' | 'scale';
    hoverEffects: boolean;
    animationSpeed: number;
    staggerDelay: number;
    parallaxEffect: boolean;
  };
}

const defaultData: PortfolioData = {
  fullName: '',
  role: '',
  skills: [],
  projects: [{ title: '', description: '' }],
  email: '',
  github: '',
  linkedin: ''
};

const defaultCustomization: CustomizationData = {
  theme: {
    primaryColor: '230 60% 25%',
    accentColor: '225 75% 60%',
    heroGradient: 'linear-gradient(135deg, hsl(225 75% 60%) 0%, hsl(250 65% 65%) 100%)',
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'inter'
  },
  layout: {
    layout: 'vertical',
    heroAlign: 'center',
    sectionSpacing: 48,
    contentWidth: 1200,
    heroHeight: 400,
    showSectionDividers: true,
    compactMode: false
  },
  animations: {
    entranceAnimation: 'fade',
    hoverEffects: true,
    animationSpeed: 300,
    staggerDelay: 100,
    parallaxEffect: false
  }
};

export const PortfolioGenerator = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultData);
  const [customization, setCustomization] = useState<CustomizationData>(defaultCustomization);

  return (
    <div className="min-h-screen bg-subtle-gradient">
      {/* Hero Section */}
      <div className="bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Generate Your Portfolio in Seconds
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Create a beautiful, professional portfolio instantly. Just fill in your details 
            and watch your portfolio come to life with our real-time preview.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-[1800px] mx-auto">
          {/* Form & Customization Section */}
          <div className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
                <TabsTrigger value="customize" className="text-xs">Customize</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="mt-6">
                <div className="bg-card rounded-2xl shadow-card-lg p-6 border">
                  <h2 className="text-2xl font-semibold mb-6 text-card-foreground">
                    Portfolio Information
                  </h2>
                  <PortfolioForm 
                    data={portfolioData} 
                    onChange={setPortfolioData} 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="customize" className="mt-6">
                <div className="bg-card rounded-2xl shadow-card-lg p-6 border">
                  <Tabs defaultValue="theme" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="theme" className="text-xs">Theme</TabsTrigger>
                      <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
                      <TabsTrigger value="animation" className="text-xs">Animation</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="theme" className="mt-6">
                      <ThemeCustomizer 
                        customization={customization}
                        onChange={setCustomization}
                      />
                    </TabsContent>
                    
                    <TabsContent value="layout" className="mt-6">
                      <LayoutCustomizer 
                        customization={customization}
                        onChange={setCustomization}
                      />
                    </TabsContent>
                    
                    <TabsContent value="animation" className="mt-6">
                      <AnimationCustomizer 
                        customization={customization}
                        onChange={setCustomization}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>
            </Tabs>
            
            <DownloadButton 
              data={portfolioData} 
              customization={customization}
            />
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl shadow-card-lg p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-card-foreground">
                  Live Preview
                </h2>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm">Real-time updates</span>
                </div>
              </div>
              <PortfolioPreview 
                data={portfolioData} 
                customization={customization}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};