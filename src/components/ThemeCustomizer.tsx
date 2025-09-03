import React from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, RotateCcw } from 'lucide-react';
import { CustomizationData } from './PortfolioGenerator';

interface ThemeCustomizerProps {
  customization: CustomizationData;
  onChange: (customization: CustomizationData) => void;
}

const colorPresets = [
  { name: 'Professional Blue', primary: '230 60% 25%', accent: '225 75% 60%', hero: 'linear-gradient(135deg, hsl(225 75% 60%) 0%, hsl(250 65% 65%) 100%)' },
  { name: 'Vibrant Purple', primary: '270 60% 35%', accent: '285 75% 65%', hero: 'linear-gradient(135deg, hsl(285 75% 65%) 0%, hsl(300 65% 70%) 100%)' },
  { name: 'Emerald Green', primary: '160 60% 30%', accent: '160 75% 55%', hero: 'linear-gradient(135deg, hsl(160 75% 55%) 0%, hsl(175 65% 60%) 100%)' },
  { name: 'Sunset Orange', primary: '25 60% 35%', accent: '35 75% 60%', hero: 'linear-gradient(135deg, hsl(35 75% 60%) 0%, hsl(20 65% 65%) 100%)' },
  { name: 'Rose Pink', primary: '330 60% 35%', accent: '340 75% 65%', hero: 'linear-gradient(135deg, hsl(340 75% 65%) 0%, hsl(355 65% 70%) 100%)' },
  { name: 'Tech Teal', primary: '185 60% 30%', accent: '185 75% 55%', hero: 'linear-gradient(135deg, hsl(185 75% 55%) 0%, hsl(200 65% 60%) 100%)' }
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ customization, onChange }) => {
  const updateTheme = (field: keyof CustomizationData['theme'], value: any) => {
    onChange({
      ...customization,
      theme: { ...customization.theme, [field]: value }
    });
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    updateTheme('primaryColor', preset.primary);
    updateTheme('accentColor', preset.accent);
    updateTheme('heroGradient', preset.hero);
  };

  const resetToDefault = () => {
    onChange({
      ...customization,
      theme: {
        primaryColor: '230 60% 25%',
        accentColor: '225 75% 60%',
        heroGradient: 'linear-gradient(135deg, hsl(225 75% 60%) 0%, hsl(250 65% 65%) 100%)',
        borderRadius: 12,
        fontSize: 16,
        fontFamily: 'inter'
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Theme Customization</h3>
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

      {/* Color Presets */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block">Color Presets</Label>
        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => applyColorPreset(preset)}
              className="justify-start h-auto p-2 hover:bg-accent/10"
            >
              <div className="flex items-center gap-2 w-full">
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ background: `hsl(${preset.primary})` }}
                />
                <span className="text-xs truncate">{preset.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Custom Colors */}
      <Card className="p-4 space-y-4">
        <Label className="text-sm font-medium">Custom Colors</Label>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Primary Color (HSL)</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: `hsl(${customization.theme.primaryColor})` }}
              />
              <input
                type="text"
                value={customization.theme.primaryColor}
                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                placeholder="230 60% 25%"
                className="flex-1 px-2 py-1 text-xs border rounded bg-background"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Accent Color (HSL)</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: `hsl(${customization.theme.accentColor})` }}
              />
              <input
                type="text"
                value={customization.theme.accentColor}
                onChange={(e) => updateTheme('accentColor', e.target.value)}
                placeholder="225 75% 60%"
                className="flex-1 px-2 py-1 text-xs border rounded bg-background"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Typography */}
      <Card className="p-4 space-y-4">
        <Label className="text-sm font-medium">Typography</Label>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Font Family
            </Label>
            <select
              value={customization.theme.fontFamily}
              onChange={(e) => updateTheme('fontFamily', e.target.value)}
              className="w-full px-2 py-1 text-xs border rounded bg-background"
            >
              <option value="inter">Inter (Modern)</option>
              <option value="system">System Default</option>
              <option value="serif">Serif (Classic)</option>
              <option value="mono">Monospace (Tech)</option>
            </select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Base Font Size: {customization.theme.fontSize}px
            </Label>
            <Slider
              value={[customization.theme.fontSize]}
              onValueChange={([value]) => updateTheme('fontSize', value)}
              min={12}
              max={20}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Design Elements */}
      <Card className="p-4 space-y-4">
        <Label className="text-sm font-medium">Design Elements</Label>
        
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">
            Border Radius: {customization.theme.borderRadius}px
          </Label>
          <Slider
            value={[customization.theme.borderRadius]}
            onValueChange={([value]) => updateTheme('borderRadius', value)}
            min={0}
            max={24}
            step={2}
            className="w-full"
          />
        </div>
      </Card>

      {/* Hero Gradient */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block">Hero Background</Label>
        <textarea
          value={customization.theme.heroGradient}
          onChange={(e) => updateTheme('heroGradient', e.target.value)}
          placeholder="linear-gradient(135deg, hsl(225 75% 60%) 0%, hsl(250 65% 65%) 100%)"
          rows={3}
          className="w-full px-2 py-1 text-xs border rounded bg-background resize-none"
        />
        <div className="text-xs text-muted-foreground mt-1">
          CSS gradient syntax. Try different angles and colors!
        </div>
      </Card>
    </div>
  );
};