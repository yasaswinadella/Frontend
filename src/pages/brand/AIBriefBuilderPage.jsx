import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Save,
  Layers,
  DollarSign,
  Calendar,
  FileCheck2
} from 'lucide-react';

export const AIBriefBuilderPage = () => {
  const { addCampaign, navigateTo } = useApp();

  const [promptInput, setPromptInput] = useState(
    'We need a high-energy, futuristic commercial campaign for our new HydraPulse UV smart water bottle. Target audience is Gen Z tech lovers and gym-goers. We need 1 master 4K video showing realistic water droplets and UV glow, plus 3 vertical TikTok UGC videos, and 8K lifestyle images. Budget is around $4,500 with 3 weeks turnaround.'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [structuredBrief, setStructuredBrief] = useState(null);

  const samplePresets = [
    {
      title: 'Luxury Skincare Launch',
      prompt: 'We are launching Velvet Silk Hydration Serum. Need 10 hyper-realistic virtual beauty models with diverse skin tones and 8K product fluid dynamic renders. Need Sephora-ready commercial rights and trained LoRA weights.'
    },
    {
      title: 'Cyberpunk Apparel 3D Runway',
      prompt: 'Produce a 60-second virtual runway fashion show for our AW26 techwear collection. Wet Tokyo rain atmosphere, reflective waterproof fabrics, 8 distinct looks, and vertical social cuts.'
    },
    {
      title: 'Multi-lingual Voiceover Model',
      prompt: 'Clone a studio-grade neural AI voice actor for interactive telehealth triage in English, Spanish, and German. Needs soothing empathetic tone and full enterprise perpetual broadcast rights.'
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setStructuredBrief({
        title: 'HydraPulse AI Smart Bottle Commercial Video Suite',
        contentCategory: 'Commercial Video & 3D Visuals',
        creativeStyle: 'Hyper-realistic, Studio Lighting, Dynamic Fluid Refraction',
        targetAudience: 'Tech enthusiasts, fitness professionals, and Gen Z wellness advocates (aged 20-38)',
        recommendedTools: ['Flux.1 Pro', 'ComfyUI', 'Runway Gen-3', 'ElevenLabs'],
        requiredSkills: ['Fluid Simulation', 'Temporal Coherence', 'Color Grading', 'Voice Synthesis'],
        deliverables: [
          '1x 30s Master 4K Teaser Video (16:9)',
          '3x 15s High-Energy Social Variations (9:16)',
          '6x 8K Static Product Hero Visuals',
          'Trained Brand LoRA weights archive'
        ],
        estimatedBudget: 4500,
        timeline: '3 Weeks',
        deadline: '2026-11-25',
        usageRights: 'Full Commercial Global Buyout, Perpetual Digital & Broadcast',
        ambiguitiesFlagged: [
          {
            issue: 'Audio Narration Scope',
            recommendation: 'Specify whether AI voiceover script and sound track licensing are included or provided by brand.'
          },
          {
            issue: 'Physical CAD File Provision',
            recommendation: 'Confirm whether 3D bottle CAD (.obj/.step) is supplied or if creator must synthesize from 2D photos.'
          }
        ]
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleSaveAsCampaign = () => {
    if (!structuredBrief) return;

    addCampaign({
      title: structuredBrief.title,
      objective: promptInput,
      contentCategory: structuredBrief.contentCategory,
      creativeStyle: structuredBrief.creativeStyle,
      targetAudience: structuredBrief.targetAudience,
      requiredTools: structuredBrief.recommendedTools,
      requiredSkills: structuredBrief.requiredSkills,
      deliverables: structuredBrief.deliverables,
      budget: structuredBrief.estimatedBudget,
      timeline: structuredBrief.timeline,
      deadline: structuredBrief.deadline,
      usageRights: structuredBrief.usageRights
    });

    navigateTo('my-campaigns');
  };

  return (
    <div className="page-content animate-fade-in" style={{ maxWidth: '1080px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0, 214, 201, 0.12)', padding: '4px 12px', borderRadius: 'var(--radius-full)', color: 'var(--electric-teal)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '10px' }}>
          <Sparkles size={14} />
          <span>AUTONOMOUS BRIEF GENERATOR</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>
          AI Brief Builder
        </h1>
        <p style={{ color: 'var(--muted-gray)', fontSize: '0.95rem', marginTop: '4px' }}>
          Transform rough campaign ideas into complete, technical procurement briefs with automatic toolchain suggestions and ambiguity detection.
        </p>
      </div>

      {/* Preset Suggestions Bar */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', fontWeight: 600, alignSelf: 'center' }}>
          Sample Idea Prompts:
        </span>
        {samplePresets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setPromptInput(preset.prompt)}
            className="btn btn-outline btn-sm"
            style={{ fontSize: '0.78rem', background: 'var(--white)' }}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Input Prompt Card */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <label className="form-label" style={{ fontSize: '1rem', fontWeight: 700 }}>
          Enter Your Rough Creative Idea or Campaign Concept:
        </label>
        <textarea
          className="form-textarea"
          rows={5}
          placeholder="e.g. We need a commercial for a smart wellness product. Need 30s 4K video, 3 TikTok UGC videos, clean studio look..."
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          style={{ fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '16px' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted-gray)' }}>
            AI analyzes creative category, required software (Flux, ComfyUI, ElevenLabs), aspect ratios, and market pricing.
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !promptInput.trim()}
            className="btn btn-primary"
            style={{ minWidth: '220px' }}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Analyzing & Structuring...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Generate Structured Brief</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Structured AI Output */}
      {structuredBrief && (
        <div className="card animate-fade-in" style={{ border: '2px solid var(--electric-teal)', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '28px',
            background: 'var(--electric-teal)',
            color: 'var(--ink-black)',
            padding: '3px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem',
            fontWeight: 800
          }}>
            STRUCTURED BRIEF GENERATED
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                {structuredBrief.title}
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted-gray)', marginTop: '4px' }}>
                Category: <strong>{structuredBrief.contentCategory}</strong> • Style: <strong>{structuredBrief.creativeStyle}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleGenerate}
                className="btn btn-outline btn-sm"
              >
                <RefreshCw size={14} />
                <span>Regenerate</span>
              </button>
              <button
                onClick={handleSaveAsCampaign}
                className="btn btn-primary btn-sm"
              >
                <Save size={14} />
                <span>Save as Active Campaign</span>
              </button>
            </div>
          </div>

          {/* Ambiguities & Missing Requirements Box */}
          {structuredBrief.ambiguitiesFlagged.length > 0 && (
            <div style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', fontWeight: 700, fontSize: '0.88rem', marginBottom: '8px' }}>
                <AlertTriangle size={16} />
                <span>Clarifications & Missing Requirements Detected:</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#78350F' }}>
                {structuredBrief.ambiguitiesFlagged.map((item, idx) => (
                  <div key={idx}>
                    <strong>• {item.issue}:</strong> {item.recommendation}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Structured Fields Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Target Audience Demographic
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-black)' }}>
                {structuredBrief.targetAudience}
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Recommended AI Toolchain
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {structuredBrief.recommendedTools.map((t, idx) => (
                  <span key={idx} className="badge badge-teal" style={{ fontSize: '0.72rem' }}>{t}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Recommended Escrow Budget
              </h4>
              <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink-black)' }}>
                ${structuredBrief.estimatedBudget} <span style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', fontWeight: 400 }}>({structuredBrief.timeline})</span>
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--muted-gray)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Declared Commercial Rights
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-black)' }}>
                {structuredBrief.usageRights}
              </p>
            </div>
          </div>

          {/* Deliverables List */}
          <div style={{ background: 'var(--warm-ivory-light)', padding: '18px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
              Structured Deliverables Package:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              {structuredBrief.deliverables.map((del, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--electric-teal)" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Save Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              onClick={handleSaveAsCampaign}
              className="btn btn-primary"
              style={{ minWidth: '240px' }}
            >
              <span>Save & Publish as Live Campaign</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
