import React, { useState } from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { FlipHorizontal, Plus, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { TextContent } from '@/types/greeting';
import TextStyleControls from '@/components/greeting/TextStyleControls';
import { TextSettings } from '@/types/textSettings';

interface FlipCardSettings {
  enabled: boolean;
  backContent?: {
    headerText?: string;
    texts: TextContent[];
  };
}

interface FlipCardCustomizerProps {
  settings: FlipCardSettings;
  onChange: (settings: FlipCardSettings) => void;
}

const FlipCardCustomizer: React.FC<FlipCardCustomizerProps> = ({ settings, onChange }) => {
  const updateSettings = (updates: Partial<FlipCardSettings>) => {
    onChange({ ...settings, ...updates });
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
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <FlipHorizontal className="h-4 w-4 text-primary" />
          3D Card Flip Effect
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="flip-enabled" className="text-sm font-medium">
            Enable Card Flip
          </Label>
          <Switch
            id="flip-enabled"
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

        {settings.enabled && (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-muted-foreground">
              Click on the card to flip and reveal the back content
            </p>

            {/* Back Header Text */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Back Header (Optional)</Label>
              <Input
                placeholder="Header text on back..."
                value={settings.backContent?.headerText || ''}
                onChange={(e) => updateBackHeader(e.target.value)}
                className="text-sm"
              />
            </div>

            {/* Back Content Texts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Back Content Messages</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addBackText}
                  className="h-8"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Text
                </Button>
              </div>

              {settings.backContent?.texts && settings.backContent.texts.length > 0 ? (
                <div className="space-y-3">
                  {settings.backContent.texts.map((text, index) => (
                    <div key={text.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Text Block {index + 1}
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
                        contentPlaceholder="Enter back text..."
                        showAnimation={true}
                        compact={true}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-4 border border-dashed rounded-lg">
                  No back content added yet. Click "Add Text" to create messages for the back of the card.
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlipCardCustomizer;
