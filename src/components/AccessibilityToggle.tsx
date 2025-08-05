import React, { useState, useEffect } from 'react';
import { Settings, Type, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const AccessibilityToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState('normal');
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Enhanced Dark Mode with announcements
  const toggleDarkMode = () => {
    const newState = !darkMode;
    setDarkMode(newState);
    
    if (newState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
    
    // Screen reader announcement
    announceToScreenReader(
      newState ? 'Dark mode enabled' : 'Light mode enabled'
    );
  };

  // Enhanced Text Size with better feedback
  const adjustTextSize = () => {
    const sizes = ['small', 'normal', 'large'];
    const currentIndex = sizes.indexOf(textSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    setTextSize(nextSize);
    
    // Remove existing text size classes
    document.documentElement.classList.remove('text-small', 'text-large');
    
    // Add new text size class
    if (nextSize !== 'normal') {
      document.documentElement.classList.add(`text-${nextSize}`);
    }

    // Screen reader announcement
    announceToScreenReader(`Text size changed to ${nextSize}`);
  };

  

  // Simple announcement function for text-to-speech
  const announceMessage = (message: string) => {
    // Log to console for debugging
    console.log('Announcement:', message);
    
    // If speech is enabled, speak the message
    if (speechEnabled && message) {
      speakText(message);
    }
  };

  // Text-to-Speech functionality
  const speakText = (text: string) => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    utterance.volume = 0.8;

    // Try to use a clear voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.toLowerCase().includes('natural')
    ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  // Toggle speech functionality
  const toggleSpeech = () => {
    const newState = !speechEnabled;
    setSpeechEnabled(newState);
    
    if (newState) {
      // Enable speech mode
      enableSpeechMode();
      // Small delay to ensure everything is set up
      setTimeout(() => {
        announceMessage('Text to speech enabled. Hover over any text to hear it read aloud.');
      }, 500);
    } else {
      // Disable speech mode
      disableSpeechMode();
      window.speechSynthesis.cancel();
      // Don't announce disable message since speech is being turned off
    }
  };

  // Enable speech mode with hover listeners
  const enableSpeechMode = () => {
    // Add hover listeners to text elements
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, [role="button"]');
    
    textElements.forEach((element: Element) => {
      const el = element as HTMLElement;
      
      // Add mouse enter listener
      const mouseEnterHandler = () => {
        const text = el.textContent?.trim();
        if (text && text.length > 0) {
          speakText(text);
        }
      };
      
      // Add focus listener for keyboard navigation
      const focusHandler = () => {
        const text = el.textContent?.trim();
        if (text && text.length > 0) {
          speakText(text);
        }
      };
      
      el.addEventListener('mouseenter', mouseEnterHandler);
      el.addEventListener('focus', focusHandler);
      
      // Store handlers for cleanup
      (el as any).__speechMouseHandler = mouseEnterHandler;
      (el as any).__speechFocusHandler = focusHandler;
    });
    
    // Add speech control banner
    addSpeechControlBanner();
  };

  // Disable speech mode
  const disableSpeechMode = () => {
    // Remove hover listeners
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, [role="button"]');
    
    textElements.forEach((element: Element) => {
      const el = element as HTMLElement;
      const mouseHandler = (el as any).__speechMouseHandler;
      const focusHandler = (el as any).__speechFocusHandler;
      
      if (mouseHandler) {
        el.removeEventListener('mouseenter', mouseHandler);
        delete (el as any).__speechMouseHandler;
      }
      
      if (focusHandler) {
        el.removeEventListener('focus', focusHandler);
        delete (el as any).__speechFocusHandler;
      }
    });
    
    // Remove speech control banner
    removeSpeechControlBanner();
  };

  // Add speech control banner
  const addSpeechControlBanner = () => {
    if (!document.querySelector('#speech-control-banner')) {
      const banner = document.createElement('div');
      banner.id = 'speech-control-banner';
      banner.className = 'fixed bottom-4 left-4 z-50 bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-green-500 animate-fade-in max-w-xs';
      banner.innerHTML = `
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
          <span class="text-sm font-semibold">🔊 Text-to-Speech Active</span>
        </div>
        <div class="text-xs opacity-90 mb-2">
          Hover over any text to hear it read aloud
        </div>
        <div class="flex gap-2 text-xs">
          <button onclick="window.speechSynthesis.cancel()" class="bg-green-600 hover:bg-green-500 px-2 py-1 rounded">Stop</button>
          <button onclick="window.speechSynthesis.pause()" class="bg-green-600 hover:bg-green-500 px-2 py-1 rounded">Pause</button>
          <button onclick="window.speechSynthesis.resume()" class="bg-green-600 hover:bg-green-500 px-2 py-1 rounded">Resume</button>
        </div>
      `;
      banner.setAttribute('role', 'status');
      banner.setAttribute('aria-label', 'Text to speech mode is currently active');
      document.body.appendChild(banner);
    }
  };

  // Remove speech control banner
  const removeSpeechControlBanner = () => {
    const banner = document.querySelector('#speech-control-banner');
    if (banner) {
      banner.remove();
    }
  };





  // Load voices when component mounts
  useEffect(() => {
    // Load voices for speech synthesis
    if ('speechSynthesis' in window) {
      // Some browsers load voices asynchronously
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          // Voices are now available
        });
      }
    }
  }, []);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      removeSpeechControlBanner();
      
      // Stop any ongoing speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      
      // Disable speech mode
      if (speechEnabled) {
        disableSpeechMode();
      }
    };
  }, [speechEnabled]);

  return (
    <div className="fixed top-6 right-6 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="icon"
        className="glass-card glass-card-hover border-white/20 breathe magnetic p-3 bg-blue-900/10 hover:bg-blue-900/20"
        aria-label="Accessibility Settings"
      >
        <Settings className="h-5 w-5 text-blue-900" />
      </Button>

      {isOpen && (
        <Card className="absolute top-16 right-0 w-80 p-6 glass-card border-white/20 animate-fade-in backdrop-blur-xl">
          <h3 className="text-lg font-bold mb-4 text-blue-900 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Accessibility Options
          </h3>
          
          <div className="space-y-3">
            <Button
              onClick={toggleDarkMode}
              variant={darkMode ? "default" : "outline"}
              size="sm"
              className={`w-full justify-start gap-2 transition-all duration-300 ${
                darkMode ? 'bg-blue-900 text-white shadow-lg' : 'hover:bg-blue-50'
              }`}
            >
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {darkMode ? 'Dark Mode ✓' : 'Light Mode'}
            </Button>

            <Button
              onClick={adjustTextSize}
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 hover:bg-blue-50 transition-colors duration-300"
            >
              <Type className="h-4 w-4" />
              Text Size: {textSize}
            </Button>

            <Button
              onClick={toggleSpeech}
              variant={speechEnabled ? "default" : "outline"}
              size="sm"
              className={`w-full justify-start gap-2 transition-all duration-300 ${
                speechEnabled ? 'bg-green-700 text-white shadow-lg animate-pulse' : 'hover:bg-green-50'
              }`}
              aria-label={speechEnabled ? 'Text to speech is active. Click to disable.' : 'Enable text to speech'}
            >
              <span className={`text-sm ${speechEnabled ? 'animate-pulse' : ''}`}>🔊</span>
              {speechEnabled ? 'Text-to-Speech Active ✓' : 'Enable Text-to-Speech'}
            </Button>

            {speechEnabled && (
              <div className="space-y-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-xs font-semibold text-green-800 mb-2">Speech Controls</div>
                
                <div className="space-y-1">
                  <label className="text-xs text-green-700">
                    Speed: {speechRate.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechRate}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs text-green-700">
                    Pitch: {speechPitch.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechPitch}
                    onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => window.speechSynthesis.cancel()}
                    className="text-xs bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Stop
                  </button>
                  <button
                    onClick={() => window.speechSynthesis.pause()}
                    className="text-xs bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Pause
                  </button>
                  <button
                    onClick={() => window.speechSynthesis.resume()}
                    className="text-xs bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AccessibilityToggle;