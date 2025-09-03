import React from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Zap, RotateCcw, Play } from 'lucide-react';
import { CustomizationData } from './PortfolioGenerator';

interface AnimationCustomizerProps {
  customization: CustomizationData;
  onChange: (customization: CustomizationData) => void;
}

const animationPresets = [
  { 
    name: 'Subtle', 
    entranceAnimation: 'fade' as const, 
    hoverEffects: true, 
    animationSpeed: 300,
    description: 'Gentle fade-in effects'
  },
  { 
    name: 'Dynamic', 
    entranceAnimation: 'slideUp' as const, 
    hoverEffects: true, 
    animationSpeed: 200,
    description: 'Slide and bounce animations'
  },
  { 
    name: 'Minimal', 
    entranceAnimation: 'none' as const, 
    hoverEffects: false, 
    animationSpeed: 100,
    description: 'No animations, fast loading'
  },
  { 
    name: 'Playful', 
    entranceAnimation: 'bounce' as const, 
    hoverEffects: true, 
    animationSpeed: 400,
    description: 'Bouncy and fun animations'
  }
];

const animationTypes = [
  { value: 'none', label: 'None', demo: '—' },
  { value: 'fade', label: 'Fade In', demo: '○' },
  { value: 'slideUp', label: 'Slide Up', demo: '↑' },
  { value: 'slideLeft', label: 'Slide Left', demo: '←' },
  { value: 'bounce', label: 'Bounce', demo: '⤴' },
  { value: 'scale', label: 'Scale', demo: '⚬' }
];

export const AnimationCustomizer: React.FC<AnimationCustomizerProps> = ({ customization, onChange }) => {
  const updateAnimation = (field: keyof CustomizationData['animations'], value: any) => {
    onChange({
      ...customization,
      animations: { ...customization.animations, [field]: value }
    });
  };

  const applyAnimationPreset = (preset: typeof animationPresets[0]) => {
    onChange({
      ...customization,
      animations: {
        ...customization.animations,
        entranceAnimation: preset.entranceAnimation,
        hoverEffects: preset.hoverEffects,
        animationSpeed: preset.animationSpeed
      }
    });
  };

  const resetToDefault = () => {
    onChange({
      ...customization,
      animations: {
        entranceAnimation: 'fade',
        hoverEffects: true,
        animationSpeed: 300,
        staggerDelay: 100,
        parallaxEffect: false
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Animation Settings</h3>
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

      {/* Animation Presets */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block">Animation Presets</Label>
        <div className="grid grid-cols-1 gap-2">
          {animationPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => applyAnimationPreset(preset)}
              className="justify-start h-auto p-3 hover:bg-accent/10"
            >
              <div className="flex items-center gap-3 w-full">
                <Play className="w-4 h-4 text-accent flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium text-sm">{preset.name}</div>
                  <div className="text-xs text-muted-foreground">{preset.description}</div>
                </div>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {preset.animationSpeed}ms
                </Badge>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Entrance Animations */}
      <Card className="p-4 space-y-4">
        <Label className="text-sm font-medium">Entrance Animations</Label>
        
        <div className="grid grid-cols-2 gap-2">
          {animationTypes.map((type) => (
            <Button
              key={type.value}
              variant={customization.animations.entranceAnimation === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => updateAnimation('entranceAnimation', type.value)}
              className="justify-start h-auto p-2"
            >
              <div className="flex items-center gap-2 w-full">
                <span className="text-lg">{type.demo}</span>
                <span className="text-xs">{type.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Animation Timing */}
      <Card className="p-4 space-y-4">
        <Label className="text-sm font-medium">Animation Timing</Label>
        
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Animation Speed: {customization.animations.animationSpeed}ms
            </Label>
            <Slider
              value={[customization.animations.animationSpeed]}
              onValueChange={([value]) => updateAnimation('animationSpeed', value)}
              min={100}
              max={800}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Stagger Delay: {customization.animations.staggerDelay}ms
            </Label>
            <Slider
              value={[customization.animations.staggerDelay]}
              onValueChange={([value]) => updateAnimation('staggerDelay', value)}
              min={0}
              max={300}
              step={25}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">
              Delay between each element animation
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Effects */}
      <Card className="p-4 space-y-4">
        <Label className="text-sm font-medium">Interactive Effects</Label>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-xs text-muted-foreground">Hover Effects</Label>
              <p className="text-xs text-muted-foreground/80">Cards lift and scale on hover</p>
            </div>
            <Switch
              checked={customization.animations.hoverEffects}
              onCheckedChange={(checked) => updateAnimation('hoverEffects', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-xs text-muted-foreground">Parallax Effect</Label>
              <p className="text-xs text-muted-foreground/80">Subtle background movement</p>
            </div>
            <Switch
              checked={customization.animations.parallaxEffect}
              onCheckedChange={(checked) => updateAnimation('parallaxEffect', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Animation Preview */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block">Animation Preview</Label>
        <div className="bg-muted rounded-lg p-4 space-y-3">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`bg-accent/20 rounded h-8 w-16 flex items-center justify-center text-xs transition-all duration-300 ${
                  customization.animations.hoverEffects 
                    ? 'hover:scale-105 hover:shadow-md cursor-pointer' 
                    : ''
                }`}
                style={{ 
                  animationDelay: `${i * customization.animations.staggerDelay}ms`,
                  animationDuration: `${customization.animations.animationSpeed}ms`
                }}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground text-center">
            {customization.animations.entranceAnimation === 'none' 
              ? 'No entrance animation'
              : `${animationTypes.find(t => t.value === customization.animations.entranceAnimation)?.label} animation (${customization.animations.animationSpeed}ms)`
            }
          </div>
        </div>
      </Card>
    </div>
  );
};