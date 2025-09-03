import React from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Layout, RotateCcw, Grid } from 'lucide-react';
import { CustomizationData } from './PortfolioGenerator';

interface LayoutCustomizerProps {
  customization: CustomizationData;
  onChange: (customization: CustomizationData) => void;
}

const layoutPresets = [
  { 
    name: 'Classic', 
    layout: 'vertical' as const, 
    heroAlign: 'center' as const, 
    sectionSpacing: 48, 
    contentWidth: 1200,
    description: 'Traditional vertical layout'
  },
  { 
    name: 'Modern', 
    layout: 'grid' as const, 
    heroAlign: 'left' as const, 
    sectionSpacing: 32, 
    contentWidth: 1400,
    description: 'Grid-based modern design'
  },
  { 
    name: 'Compact', 
    layout: 'vertical' as const, 
    heroAlign: 'center' as const, 
    sectionSpacing: 24, 
    contentWidth: 800,
    description: 'Tight spacing, focused content'
  },
  { 
    name: 'Spacious', 
    layout: 'vertical' as const, 
    heroAlign: 'center' as const, 
    sectionSpacing: 64, 
    contentWidth: 1600,
    description: 'Generous whitespace'
  }
];

export const LayoutCustomizer: React.FC<LayoutCustomizerProps> = ({ customization, onChange }) => {
  const updateLayout = (field: keyof CustomizationData['layout'], value: any) => {
    onChange({
      ...customization,
      layout: { ...customization.layout, [field]: value }
    });
  };

  const applyLayoutPreset = (preset: typeof layoutPresets[0]) => {
    onChange({
      ...customization,
      layout: {
        ...customization.layout,
        layout: preset.layout,
        heroAlign: preset.heroAlign,
        sectionSpacing: preset.sectionSpacing,
        contentWidth: preset.contentWidth
      }
    });
  };

  const resetToDefault = () => {
    onChange({
      ...customization,
      layout: {
        layout: 'vertical',
        heroAlign: 'center',
        sectionSpacing: 48,
        contentWidth: 1200,
        heroHeight: 400,
        showSectionDividers: true,
        compactMode: false
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Layout Customization</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetToDefault}
          className="text-xs"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>

      {/* Layout Presets */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block">Layout Presets</Label>
        <div className="grid grid-cols-1 gap-2">
          {layoutPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => applyLayoutPreset(preset)}
              className="justify-start h-auto p-3 hover:bg-accent/10"
            >
              <div className="flex items-center gap-3 w-full">
                <Grid className="w-4 h-4 text-accent flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-sm">{preset.name}</div>
                  <div className="text-xs text-muted-foreground">{preset.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Layout Options */}
      <Card className="p-4 space-y-4">
        <Label className="text-sm font-medium">Layout Structure</Label>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Layout Type</Label>
            <select
              value={customization.layout.layout}
              onChange={(e) => updateLayout('layout', e.target.value)}
              className="w-full px-2 py-1 text-xs border rounded bg-background"
            >
              <option value="vertical">Vertical Stack</option>
              <option value="grid">Grid Layout</option>
            </select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Hero Alignment</Label>
            <select
              value={customization.layout.heroAlign}
              onChange={(e) => updateLayout('heroAlign', e.target.value)}
              className="w-full px-2 py-1 text-xs border rounded bg-background"
            >
              <option value="left">Left Aligned</option>
              <option value="center">Center Aligned</option>
              <option value="right">Right Aligned</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Spacing Controls */}
      <Card className="p-4 space-y-4">
        <Label className="text-sm font-medium">Spacing & Dimensions</Label>
        
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Content Width: {customization.layout.contentWidth}px
            </Label>
            <Slider
              value={[customization.layout.contentWidth]}
              onValueChange={([value]) => updateLayout('contentWidth', value)}
              min={800}
              max={1800}
              step={100}
              className="w-full"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Section Spacing: {customization.layout.sectionSpacing}px
            </Label>
            <Slider
              value={[customization.layout.sectionSpacing]}
              onValueChange={([value]) => updateLayout('sectionSpacing', value)}
              min={16}
              max={96}
              step={8}
              className="w-full"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Hero Height: {customization.layout.heroHeight}px
            </Label>
            <Slider
              value={[customization.layout.heroHeight]}
              onValueChange={([value]) => updateLayout('heroHeight', value)}
              min={200}
              max={600}
              step={20}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Display Options */}
      <Card className="p-4 space-y-4">
        <Label className="text-sm font-medium">Display Options</Label>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Show Section Dividers</Label>
            <Switch
              checked={customization.layout.showSectionDividers}
              onCheckedChange={(checked) => updateLayout('showSectionDividers', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Compact Mode</Label>
            <Switch
              checked={customization.layout.compactMode}
              onCheckedChange={(checked) => updateLayout('compactMode', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Layout Preview */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block">Layout Preview</Label>
        <div className="bg-muted rounded-lg p-4 space-y-2">
          <div 
            className="bg-accent/20 rounded h-16 flex items-center justify-center text-xs"
            style={{ textAlign: customization.layout.heroAlign }}
          >
            Hero Section ({customization.layout.heroHeight}px)
          </div>
          <div className="grid gap-2" style={{ 
            gridTemplateColumns: customization.layout.layout === 'grid' ? 'repeat(2, 1fr)' : '1fr',
            gap: `${customization.layout.sectionSpacing / 8}px`
          }}>
            <div className="bg-card border rounded h-8 flex items-center justify-center text-xs">
              Skills
            </div>
            <div className="bg-card border rounded h-12 flex items-center justify-center text-xs">
              Projects
            </div>
            <div className="bg-card border rounded h-6 flex items-center justify-center text-xs">
              Contact
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};