import React, {useState} from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Sparkles, ChevronDown, ChevronUp  } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConfettiSettings {
  enabled: boolean;
  colors: string[];
  density: number;
  duration: number;
  mode: 'once' | 'continuous';
}

interface ConfettiCustomizerProps {
  settings: ConfettiSettings;
  onChange: (settings: ConfettiSettings) => void;
}

const CONFETTI_COLOR_PRESETS = [
  { name: '🌈 Rainbow Magic', colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'] },
  { name: '✨ Gold & Silver', colors: ['#FFD700', '#C0C0C0', '#FFA500', '#E6E6E6'] },
  { name: '🌸 Pastel Dreams', colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'] },
  { name: '💜 Neon Nights', colors: ['#FF10F0', '#00FFFF', '#FFFF00', '#FF00FF', '#00FF00'] },
  { name: '🎄 Christmas Cheer', colors: ['#FF0000', '#00FF00', '#FFFFFF', '#FFD700'] },
  { name: '🎊 Party Mix', colors: ['#FF1744', '#FF9100', '#FFEA00', '#00E676', '#00B0FF', '#D500F9'] },
  { name: '🌺 Tropical Sunset', colors: ['#FF6B6B', '#FFA500', '#FFD93D', '#FF1493', '#FF69B4'] },
  { name: '🌊 Ocean Breeze', colors: ['#00CED1', '#1E90FF', '#87CEEB', '#4682B4', '#5F9EA0'] },
  { name: '🍂 Autumn Harvest', colors: ['#D2691E', '#FF8C00', '#DAA520', '#8B4513', '#CD853F'] },
  { name: '💎 Royal Elegance', colors: ['#4B0082', '#9370DB', '#BA55D3', '#8A2BE2', '#9400D3'] },
  { name: '🌸 Cherry Blossom', colors: ['#FFB7C5', '#FFC0CB', '#FF69B4', '#FF1493', '#DB7093'] },
  { name: '🔥 Fire & Ice', colors: ['#FF4500', '#FF6347', '#00CED1', '#1E90FF', '#FFFFFF'] },
  { name: '🌿 Forest Green', colors: ['#228B22', '#32CD32', '#90EE90', '#98FB98', '#00FF7F'] },
  { name: '🎨 Artist Palette', colors: ['#FF1744', '#FFD700', '#00E676', '#2196F3', '#9C27B0'] },
];

const ConfettiCustomizer: React.FC<ConfettiCustomizerProps> = ({ settings, onChange }) => {
  
  const [isExpanded, setIsExpanded] = useState(settings.enabled);

  const updateSettings = (updates: Partial<ConfettiSettings>) => {
    const next = { ...settings, ...updates };
    onChange(next);

    // ✅ Auto Expand When Enabled
    if (updates.enabled === true) {
      setIsExpanded(true);
    }
  };

  return (
  <Card className="border border-purple-500 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700 dark:shadow-slate-900/50 overflow-hidden">
      
      <CardHeader className="p-4"> 
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-200 to-secondary/20 dark:bg-purple-900/50 rounded-lg">
                              <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
              Confetti Burst Effect            
            </CardTitle>
        
            <div className="flex items-center gap-2">
              {settings.enabled && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 rounded hover:bg-muted transition"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              )}
        
              <Switch
                id="confetti-enabled"
                checked={settings.enabled}
                onCheckedChange={(enabled) => updateSettings({ enabled })}
                aria-label="Toggle confetti effect"
              />
            </div>
          </div>
      </CardHeader>

      <CardContent className="space-y-4">
        

       {settings.enabled && isExpanded && (

          <div className="space-y-4 pt-2">
            {/* Mode Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Confetti Mode</Label>
              <RadioGroup
                value={settings.mode} className=' grid grid-cols-2'
                onValueChange={(mode: 'once' | 'continuous') => updateSettings({ mode })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="once" id="mode-once" />
                  <Label htmlFor="mode-once" className="text-sm cursor-pointer">
                    One-time Burst
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="continuous" id="mode-continuous" />
                  <Label htmlFor="mode-continuous" className="text-sm cursor-pointer">
                    Continuous
                  </Label>
                </div>
              </RadioGroup>
            </div>

{/* Sliders Row */}
<div className="grid grid-cols-2 gap-4">
  {/* Density Slider */}
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <Label className="text-sm font-medium">Density</Label>
      <span className="text-xs text-muted-foreground">{settings.density}</span>
    </div>
    <Slider
      value={[settings.density]}
      onValueChange={([density]) => updateSettings({ density })}
      min={50}
      max={500}
      step={10}
      className="w-full"
    />
  </div>

  {/* Duration Slider */}
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <Label className="text-sm font-medium">Duration (seconds)</Label>
      <span className="text-xs text-muted-foreground">{settings.duration}s</span>
    </div>
    <Slider
      value={[settings.duration]}
      onValueChange={([duration]) => updateSettings({ duration })}
      min={1}
      max={10}
      step={0.5}
      className="w-full"
    />
  </div>
</div>

{/* Colors Section (Full Width) */}
<div className="space-y-2 pt-2">
  <Label className="text-sm font-medium">Color Theme</Label>
  <Select
    value={settings.colors.join(',')}
    onValueChange={(value) => {
      const preset = CONFETTI_COLOR_PRESETS.find(
        (p) => p.colors.join(',') === value
      );
      if (preset) updateSettings({ colors: preset.colors });
    }}
  >
    <SelectTrigger className="w-full">
      <SelectValue>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {settings.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-sm">
            {CONFETTI_COLOR_PRESETS.find(
              (p) => p.colors.join(',') === settings.colors.join(',')
            )?.name || 'Custom'}
          </span>
        </div>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      {CONFETTI_COLOR_PRESETS.map((preset) => (
        <SelectItem key={preset.name} value={preset.colors.join(',')}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {preset.colors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-sm">{preset.name}</span>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfettiCustomizer;
