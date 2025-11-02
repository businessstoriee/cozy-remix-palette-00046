import React, {useState} from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Lock, DoorOpen, FlipHorizontal, Grid3x3, Plus, Trash2 , ChevronDown, ChevronUp} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TextContent } from '@/types/greeting';
import TextStyleControls from '@/components/greeting/TextStyleControls';
import { TextSettings } from '@/types/textSettings';
import { cn } from "@/lib/utils";
import BackgroundImageUploader from '@/components/greeting/customization/BackgroundCustomizer/BackgroundImageUploader';


interface CoverBackground {
  type: 'color' | 'gradient' | 'image';
  color?: string;
  gradient?: {
    enabled: boolean;
    colors: [string, string];
    direction: string;
  };
  image?: string;
  imageOpacity?: number;
  animation?: {
    enabled: boolean;
    type: 'none' | 'floating' | 'gradient' | 'waves' | 'particles' | 'aurora' | 'morphing' | 'ripple';
    speed: number;
    intensity: number;
  };
  pattern?: {
    enabled: boolean;
    type: 'none' | 'dots' | 'grid' | 'diagonal' | 'circles';
    opacity: number;
  };
}

interface InteractiveRevealSettings {
  enabled: boolean;
  revealType: 'flip' | 'swipe-up' | 'swipe-down' | 'swipe-left' | 'swipe-right' | 'door' | 'lock' | 'vanish' | 'zoom' | 'curtain';
  backContent?: {
    headerText?: string;
    texts: TextContent[];
  };
  coverBackground?: CoverBackground;
}

interface InteractiveRevealCustomizerProps {
  settings: InteractiveRevealSettings;
  onChange: (settings: InteractiveRevealSettings) => void;
}

const REVEAL_TYPES = [
  { value: 'flip', label: '3D Card Flip', icon: FlipHorizontal, description: 'Classic flip animation' },
  { value: 'shutter', label: 'Shutter Open', icon: Grid3x3, description: 'Venetian blind effect' },
  { value: 'door', label: 'Double Door', icon: DoorOpen, description: 'Opens like doors' },
  { value: 'lock', label: 'Lock & Key', icon: Lock, description: 'Unlock to reveal' },
  { value: 'curtain', label: 'Curtain Reveal', icon: Grid3x3, description: 'Stage curtain effect' },
  { value: 'fade', label: 'Fade Through', icon: Grid3x3, description: 'Smooth transition' },
];

const InteractiveRevealCustomizer: React.FC<InteractiveRevealCustomizerProps> = ({ settings, onChange }) => {
 
  const [isExpanded, setIsExpanded] = useState(settings.enabled);

  const updateSettings = (updates: Partial<InteractiveRevealSettings>) => {
    const next = { ...settings, ...updates };
    onChange(next);

    // ✅ Auto Expand When Enabled
    if (updates.enabled === true) {
      setIsExpanded(true);
    }

  };

  const updateBackHeader = (headerText: string) => {
    updateSettings({
      backContent: {
        ...settings.backContent,
        headerText,
        texts: settings.backContent?.texts || []
      }
    });
  };

  const addBackText = () => {
    if ((settings.backContent?.texts || []).length >= 5) {
      return; // Max 5 messages
    }

    const newText: TextContent = {
      id: `back-text-${Date.now()}`,
      content: 'Message on back of card',
      style: {
        fontSize: '20px',
        fontWeight: '500',
        color: 'hsl(var(--foreground))',
        textAlign: 'center',
        fontFamily: 'inherit'
      },
      animation: 'fade'
    };

    updateSettings({
      backContent: {
        headerText: settings.backContent?.headerText,
        texts: [...(settings.backContent?.texts || []), newText]
      }
    });
  };

  const updateBackText = (index: number, updates: Partial<TextContent>) => {
    const texts = [...(settings.backContent?.texts || [])];
    texts[index] = { ...texts[index], ...updates };
    updateSettings({
      backContent: {
        headerText: settings.backContent?.headerText,
        texts
      }
    });
  };

  const removeBackText = (index: number) => {
    const texts = settings.backContent?.texts.filter((_, i) => i !== index) || [];
    updateSettings({
      backContent: {
        headerText: settings.backContent?.headerText,
        texts
      }
    });
  };

  return (
      <Card className="border border-purple-500 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700 dark:shadow-slate-900/50 overflow-hidden">
        
      <CardHeader className="p-4">

        <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <div className="p-2 bg-gradient-to-br from-purple-200 to-secondary/20 dark:bg-purple-900/50 rounded-lg">
                                      <FlipHorizontal className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                      Interactive Reveal Effects     
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
            id="reveal-enabled"
            checked={settings.enabled}
            onCheckedChange={(enabled) => {
              updateSettings({ 
                enabled,
                backContent: enabled ? {
                  headerText: settings.backContent?.headerText || '',
                  texts: settings.backContent?.texts || []
                } : undefined
              });
            }}
          />
                    </div>
                  </div>
      </CardHeader>


      <CardContent className="space-y-4"> 

        {settings.enabled && isExpanded && (
          <div className="space-y-4 pt-2">
            {/* 2 Column Grid for Customization */}
            <div className="grid grid-cols-2 gap-3">
              {/* Reveal Type Selection */}
              <div className="space-y-2 col-span-2">
                <Label className="text-sm font-medium">Reveal Animation</Label>
                <Select
                  value={settings.revealType}
                  onValueChange={(revealType: any) => updateSettings({ revealType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REVEAL_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cover Background Customization */}
            <div className="space-y-3 border rounded-lg p-3 bg-muted/20">
              <Label className="text-sm font-medium">Cover Background</Label>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={settings.coverBackground?.type === 'color' ? 'default' : 'outline'}
                  onClick={() => updateSettings({
                    coverBackground: {
                      type: 'color',
                      color: settings.coverBackground?.color || 'hsl(var(--primary))',
                    }
                  })}
                >
                  Color
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={settings.coverBackground?.type === 'gradient' ? 'default' : 'outline'}
                  onClick={() => updateSettings({
                    coverBackground: {
                      type: 'gradient',
                      gradient: {
                        enabled: true,
                        colors: ['hsl(var(--primary))', 'hsl(340 75% 55%)'],
                        direction: '135deg',
                      }
                    }
                  })}
                >
                  Gradient
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={settings.coverBackground?.type === 'image' ? 'default' : 'outline'}
                  onClick={() => updateSettings({
                    coverBackground: {
                      type: 'image',
                      image: '',
                      imageOpacity: 1,
                    }
                  })}
                >
                  Image
                </Button>
              </div>

              {/* Color Options */}
              {settings.coverBackground?.type === 'color' && (
                <div className="space-y-2">
                  <Label className="text-xs">Background Color</Label>
                  <Input
                    type="color"
                    value={settings.coverBackground.color}
                    onChange={(e) => updateSettings({
                      coverBackground: { ...settings.coverBackground, color: e.target.value }
                    })}
                    className="h-10"
                  />
                </div>
              )}

              {/* Gradient Options */}
              {settings.coverBackground?.type === 'gradient' && settings.coverBackground.gradient && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Color 1</Label>
                    <Input
                      type="color"
                      value={settings.coverBackground.gradient.colors[0]}
                      onChange={(e) => updateSettings({
                        coverBackground: {
                          ...settings.coverBackground,
                          gradient: {
                            ...settings.coverBackground.gradient!,
                            colors: [e.target.value, settings.coverBackground.gradient!.colors[1]],
                          }
                        }
                      })}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Color 2</Label>
                    <Input
                      type="color"
                      value={settings.coverBackground.gradient.colors[1]}
                      onChange={(e) => updateSettings({
                        coverBackground: {
                          ...settings.coverBackground,
                          gradient: {
                            ...settings.coverBackground.gradient!,
                            colors: [settings.coverBackground.gradient!.colors[0], e.target.value],
                          }
                        }
                      })}
                      className="h-10"
                    />
                  </div>
                </div>
              )}

              {/* Image Options with Upload */}
              {settings.coverBackground?.type === 'image' && (
                <BackgroundImageUploader
                  currentImageUrl={settings.coverBackground.image || ''}
                  opacity={Math.round((settings.coverBackground.imageOpacity || 1) * 100)}
                  onImageChange={(url) => updateSettings({
                    coverBackground: { ...settings.coverBackground, image: url || '' }
                  })}
                  onOpacityChange={(opacity) => updateSettings({
                    coverBackground: { ...settings.coverBackground, imageOpacity: opacity / 100 }
                  })}
                />
              )}

              {/* Pattern Overlay */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Pattern Overlay</Label>
                  <Switch
                    checked={settings.coverBackground?.pattern?.enabled || false}
                    onCheckedChange={(enabled) => updateSettings({
                      coverBackground: {
                        ...settings.coverBackground,
                        type: settings.coverBackground?.type || 'color',
                        pattern: { enabled, type: settings.coverBackground?.pattern?.type || 'dots', opacity: 0.1 }
                      }
                    })}
                  />
                </div>
                {settings.coverBackground?.pattern?.enabled && (
                  <>
                    <Select
                      value={settings.coverBackground.pattern.type}
                      onValueChange={(type: any) => updateSettings({
                        coverBackground: {
                          ...settings.coverBackground!,
                          pattern: { ...settings.coverBackground!.pattern!, type }
                        }
                      })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dots">Dots</SelectItem>
                        <SelectItem value="grid">Grid</SelectItem>
                        <SelectItem value="diagonal">Diagonal Lines</SelectItem>
                        <SelectItem value="circles">Circles</SelectItem>
                      </SelectContent>
                    </Select>
                    <div>
                      <Label className="text-xs">Opacity: {settings.coverBackground.pattern.opacity}</Label>
                      <Input
                        type="range"
                        min="0"
                        max="0.5"
                        step="0.05"
                        value={settings.coverBackground.pattern.opacity}
                        onChange={(e) => updateSettings({
                          coverBackground: {
                            ...settings.coverBackground!,
                            pattern: { ...settings.coverBackground!.pattern!, opacity: parseFloat(e.target.value) }
                          }
                        })}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Add messages to show on the front. Click to reveal the main greeting content.
            </p>

            {/* Front Content Messages (Previously Back Content) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Front Cover Messages 
                    <span className={cn(
                      "ml-2 px-2 py-0.5 rounded-full text-xs",
                     settings.backContent?.texts.length >= 8 
                        ? "bg-destructive/10 text-destructive" 
                        : "bg-primary/10 text-primary"
                    )}>
                      {(settings.backContent?.texts || []).length}/5
                    </span>
                </Label>
               
                            <Button
                  onClick={addBackText}
                  disabled={settings.backContent?.texts.length >= 5}
                  size="sm"
                  variant={
                  settings.backContent?.texts.length >= 8 ? "outline" : 
                 settings.backContent?.texts.length === 0 ? "default" : "outline"
                }
                  className={cn(
                      "transition-all duration-300 font-medium",
                      settings.backContent?.texts.length === 0 ? "h-8 w-8 p-0" : settings.backContent?.texts.length >= 8 ? "h-8 px-3 bg-destructive/10 text-destructive border-destructive" : "bg-primary/10 text-primary border-primary"    
                  )}
                >
                  {settings.backContent?.texts.length === 0 ? (
                    <Plus className="h-4 w-4" />
                  ) : settings.backContent?.texts.length >= 8 ? (
                    <span className="text-destructive text-xs">Max Reached</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs">
                      <Plus className="h-3 w-3" />
                      Add More
                    </span>
                  )}
                </Button>

              </div>

              

              {settings.backContent?.texts && settings.backContent.texts.length > 0 ? (
                <div className="space-y-3">
                  {settings.backContent.texts.map((text, index) => (
                    <div key={text.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Cover Text {index + 1}
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeBackText(index)}
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <TextStyleControls
                        textSettings={text as any as TextSettings}
                        onChange={(updates) => updateBackText(index, updates as Partial<TextContent>)}
                        showContent={true}
                        contentPlaceholder="Enter cover text..."
                        showAnimation={true}
                        compact={false}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-4 border border-dashed rounded-lg">
                  No cover messages yet. Add text to display on the front before revealing.
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveRevealCustomizer;
