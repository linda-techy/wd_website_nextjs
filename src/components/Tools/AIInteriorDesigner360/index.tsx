'use client'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BASE_API_URL } from '@/lib/config'
import Image from 'next/image'
import type { Viewer as PSVViewer } from 'photo-sphere-viewer'

type RoomKey = 'living room' | 'bedroom' | 'kitchen' | 'dining room' | 'bathroom' | 'toilet' | 'pooja room' | 'home office' | 'balcony'

type SelectedRoom = {
  key: RoomKey
  label: string
  lengthFt: string // numbers stored as string for input control
  widthFt: string
}

type GenerationResponse = {
  imageDataUrl: string
}

const DEFAULT_ROOMS: Record<RoomKey, { label: string; lengthFt: string; widthFt: string }> = {
  'living room': { label: 'Living Room', lengthFt: '16', widthFt: '12' },
  'bedroom': { label: 'Bedroom', lengthFt: '12', widthFt: '12' },
  'kitchen': { label: 'Kitchen', lengthFt: '10', widthFt: '8' },
  'dining room': { label: 'Dining Room', lengthFt: '12', widthFt: '10' },
  'bathroom': { label: 'Bathroom', lengthFt: '8', widthFt: '5' },
  'toilet': { label: 'Toilet', lengthFt: '6', widthFt: '4' },
  'pooja room': { label: 'Pooja Room', lengthFt: '6', widthFt: '5' },
  'home office': { label: 'Home Office', lengthFt: '10', widthFt: '8' },
  'balcony': { label: 'Balcony', lengthFt: '10', widthFt: '4' }
}

const STYLES = [
  'Modern Indian',
  'Traditional Indian',
  'Contemporary',
  'Minimalist',
  'Industrial',
  'Bohemian',
  'Scandinavian with Indian accents'
]

const COLOR_THEMES = ['Warm Neutrals', 'Cool Neutrals', 'Earthy & Natural', 'Vibrant Accents']
const BUDGETS = ['economy', 'moderate', 'premium', 'luxury'] as const

export default function AIInteriorDesigner360() {
  const [step, setStep] = useState<'rooms' | 'details' | 'review' | 'result'>('rooms')

  // Lead capture
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [whatsApp, setWhatsApp] = useState('')
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  // const [leadSubmitted, setLeadSubmitted] = useState(false)

  // Rooms and details
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([])
  const [style, setStyle] = useState(STYLES[0])
  const [colorTheme, setColorTheme] = useState(COLOR_THEMES[0])
  const [budget, setBudget] = useState<typeof BUDGETS[number]>('moderate')
  const [notes, setNotes] = useState('')
  const [vastuFriendly, setVastuFriendly] = useState(false)

  // Generation
  const [isGenerating, setIsGenerating] = useState(false)
  const [imageDataUrl, setImageDataUrl] = useState<string>('')
  const viewerContainerRef = useRef<HTMLDivElement | null>(null)
  const viewerInstanceRef = useRef<PSVViewer | null>(null)

  // Initialize viewer when image is ready (lazy-load to avoid SSR issues)
  useEffect(() => {
    if (!imageDataUrl || !viewerContainerRef.current) return
    ;(async () => {
      try {
        const mod = await import('photo-sphere-viewer') as unknown as {
          Viewer?: new (opts: { container: HTMLElement; panorama: string; defaultYaw?: number; touchmoveTwoFingers?: boolean }) => PSVViewer
          default?: new (opts: { container: HTMLElement; panorama: string; defaultYaw?: number; touchmoveTwoFingers?: boolean }) => PSVViewer
          PhotoSphereViewer?: { Viewer?: new (opts: { container: HTMLElement; panorama: string; defaultYaw?: number; touchmoveTwoFingers?: boolean }) => PSVViewer }
        }
        const ViewerClass = mod.Viewer || mod.PhotoSphereViewer?.Viewer || mod.default
        if (!ViewerClass) return
        const instance: PSVViewer = new ViewerClass({
          container: viewerContainerRef.current!,
          panorama: imageDataUrl,
          defaultYaw: 0,
          touchmoveTwoFingers: true,
        })
        viewerInstanceRef.current = instance
      } catch {
        // Fallback: do nothing, plain image is shown below
      }
    })()
    return () => {
      try { viewerInstanceRef.current?.destroy?.() } catch {}
      viewerInstanceRef.current = null
    }
  }, [imageDataUrl])

  const roomsCatalog = useMemo(() => Object.entries(DEFAULT_ROOMS).map(([key, v]) => ({ key: key as RoomKey, ...v })), [])

  const toggleRoom = (key: RoomKey) => {
    setSelectedRooms(prev => {
      const exists = prev.find(r => r.key === key)
      if (exists) return prev.filter(r => r.key !== key)
      const defn = DEFAULT_ROOMS[key]
      return [...prev, { key, label: defn.label, lengthFt: defn.lengthFt, widthFt: defn.widthFt }]
    })
  }

  type LeadPayload = {
    name?: string
    whatsappNumber: string
    projectType?: string
    projectDescription?: string
    requirements?: string
    leadSource?: string
    leadStatus?: string
    priority?: string
  }

  const buildPrompt = () => {
    const roomLines = selectedRooms.map(r => `${r.label} ${r.lengthFt}x${r.widthFt} ft`).join(', ')
    const extras: string[] = []
    if (vastuFriendly) extras.push('Vastu-friendly layout choices')
    const notesLine = notes ? `Additional notes: ${notes}` : ''
    return `Create an interior design 360-degree equirectangular panorama (2:1 aspect) for an Indian home. Style: ${style}. Color theme: ${colorTheme}. Budget level: ${budget}. Rooms included: ${roomLines}. ${extras.join('; ')}. ${notesLine}. Materials and motifs suitable for India (e.g., teak/Sheesham wood, jute, cane, marble/granite, brass accents). Natural light where appropriate. Hyper-real, photorealistic, sharp details.`
  }

  const handleGenerate = async () => {
    if (selectedRooms.length === 0) { toast.error('Select at least one room'); return }
    setIsGenerating(true)
    try {
      // TEMPORARY: Bypass lead submission for testing
      
      // then generate
      const res = await fetch('/api/tools/ai-interior-designer-360', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: buildPrompt(),
          style,
          budget,
          country: 'India'
        })
      })
      if (!res.ok) throw new Error(await res.text())
      const data: GenerationResponse = await res.json()
      setImageDataUrl(data.imageDataUrl)
      setStep('result')
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to generate image. Configure OPENAI_API_KEY to enable generation.'
      toast.error(message)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleWhatsAppShare = () => {
    const roomDetails = selectedRooms.map(r => `${r.label} (${r.lengthFt}×${r.widthFt} ft)`).join(', ')
    const message = `🎨 *AI Interior Designer 360° Concept*\n\n` +
      `*Rooms:* ${roomDetails}\n` +
      `*Style:* ${style}\n` +
      `*Color Theme:* ${colorTheme}\n` +
      `*Budget:* ${budget}\n` +
      `*Vastu-friendly:* ${vastuFriendly ? 'Yes' : 'No'}\n` +
      `*Notes:* ${notes || 'None'}\n\n` +
      `Generated using Walldot Builders AI Interior Designer 360°\n` +
      `${window.location.origin}/tools/ai-interior-designer-360`
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    toast.success('Opening WhatsApp share...')
  }

  const handleDownload = () => {
    if (!imageDataUrl) return
    
    const link = document.createElement('a')
    link.href = imageDataUrl
    link.download = `ai-interior-design-${style.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Design concept downloaded!')
  }

  return (
    <div className="container mx-auto px-4">
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight px-4">AI Interior Designer 360</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed px-4">Regional design for India. Capture your details, choose rooms, and get a 360° concept.</p>
        </div>

        {/* Initial lead step removed; capture moved to Review */}

        {step === 'rooms' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">Choose rooms</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {roomsCatalog.map(r => (
                <button key={r.key} onClick={() => toggleRoom(r.key)} className={`border rounded-xl p-4 md:p-5 text-left hover:shadow-lg transition-all duration-300 hover:scale-105 ${selectedRooms.find(s => s.key === r.key) ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-400 dark:border-purple-600 shadow-md' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}>
                  <div className="font-semibold text-base md:text-lg text-gray-900 dark:text-white">{r.label}</div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">Std: {r.lengthFt}×{r.widthFt} ft</div>
                </button>
              ))}
            </div>
            <div className="mt-6 md:mt-8 flex justify-end">
              <button onClick={() => setStep('details')} className="px-6 py-3 md:px-8 md:py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-base md:text-lg font-bold transition-all hover:scale-105 shadow-lg">Next</button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">Room sizes & preferences</h2>
            {selectedRooms.length === 0 && (
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">You haven't selected any rooms yet. Go back and choose rooms.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {selectedRooms.map((room, idx) => (
                <div key={room.key} className="border border-gray-300 dark:border-gray-600 rounded-xl p-4 md:p-5 bg-gray-50 dark:bg-gray-700/50">
                  <div className="font-bold text-lg md:text-xl mb-3 text-gray-900 dark:text-white">{room.label}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">Length (ft)</label>
                    <input className="w-20 md:w-24 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm md:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value={room.lengthFt} onChange={e => setSelectedRooms(prev => prev.map((r, i) => i === idx ? { ...r, lengthFt: e.target.value.replace(/[^0-9.]/g, '') } : r))} />
                    <label className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">Width (ft)</label>
                    <input className="w-20 md:w-24 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm md:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value={room.widthFt} onChange={e => setSelectedRooms(prev => prev.map((r, i) => i === idx ? { ...r, widthFt: e.target.value.replace(/[^0-9.]/g, '') } : r))} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Style</label>
                <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-base md:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={style} onChange={e => setStyle(e.target.value)}>
                  {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Color Theme</label>
                <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-base md:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={colorTheme} onChange={e => setColorTheme(e.target.value)}>
                  {COLOR_THEMES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Budget</label>
                  <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-base md:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={budget} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBudget(e.target.value as typeof BUDGETS[number])}>
                  {BUDGETS.map(b => <option key={b} value={b} className="capitalize">{b}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input id="vastu" type="checkbox" className="h-5 w-5 md:h-6 md:w-6" checked={vastuFriendly} onChange={e => setVastuFriendly(e.target.checked)} />
                <label htmlFor="vastu" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">Prefer Vastu-friendly suggestions</label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Notes (optional)</label>
                <input className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-base md:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="e.g., prefer marble flooring, temple woodwork, lots of storage" value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
            </div>

            <div className="mt-6 md:mt-8 flex justify-between">
              <button onClick={() => setStep('rooms')} className="px-6 py-3 md:px-8 md:py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-base md:text-lg font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">Back</button>
              <button onClick={() => setStep('review')} className="px-6 py-3 md:px-8 md:py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-base md:text-lg font-bold transition-all hover:scale-105 shadow-lg">Next</button>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">Review</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="border border-gray-300 dark:border-gray-600 rounded-xl p-5 md:p-6 bg-gray-50 dark:bg-gray-700/50">
                <div className="font-bold text-lg md:text-xl mb-3 text-gray-900 dark:text-white">Rooms</div>
                <ul className="list-disc ml-5 text-base md:text-lg text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  {selectedRooms.map(r => <li key={r.key}>{r.label}: {r.lengthFt}×{r.widthFt} ft</li>)}
                </ul>
              </div>
              <div className="border border-gray-300 dark:border-gray-600 rounded-xl p-5 md:p-6 bg-gray-50 dark:bg-gray-700/50">
                <div className="font-bold text-lg md:text-xl mb-3 text-gray-900 dark:text-white">Preferences</div>
                <ul className="list-disc ml-5 text-base md:text-lg text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                  <li>Style: {style}</li>
                  <li>Color Theme: {colorTheme}</li>
                  <li>Budget: <span className="capitalize">{budget}</span></li>
                  <li>Vastu-friendly: {vastuFriendly ? 'Yes' : 'No'}</li>
                </ul>
              </div>
              <div className="md:col-span-2 border border-gray-300 dark:border-gray-600 rounded-xl p-5 md:p-6 bg-blue-50 dark:bg-blue-900/20">
                <div className="font-bold text-lg md:text-xl mb-4 text-gray-900 dark:text-white">Your contact</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <input className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-base md:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                  <div className="flex gap-2 md:col-span-2">
                    <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-sm md:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                      <option value="+91">+91 (India)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+1">+1 (US/CA)</option>
                      <option value="+44">+44 (UK)</option>
                    </select>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 text-base md:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="10-digit number"
                      value={whatsApp}
                      onChange={e => setWhatsApp(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    />
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">We will share your 360° concept on WhatsApp and contact you to proceed.</p>
              </div>
            </div>
            <div className="mt-6 md:mt-8 flex justify-between">
              <button onClick={() => setStep('details')} className="px-6 py-3 md:px-8 md:py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-base md:text-lg font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">Back</button>
              <button onClick={handleGenerate} disabled={isGenerating} className="px-6 py-3 md:px-8 md:py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-base md:text-lg font-bold disabled:opacity-60 transition-all hover:scale-105 shadow-lg">{isGenerating ? 'Generating…' : 'Generate 360°'}</button>
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">We will generate a 360° equirectangular panorama (2:1). Ensure OPENAI_API_KEY is configured.</p>
          </div>
        )}

        {step === 'result' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">Your 360° Concept</h2>
              <div className="relative">
              <div ref={viewerContainerRef} className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl border-2 border-gray-300 dark:border-gray-600 mb-4 overflow-hidden" />
              {!viewerInstanceRef.current && (
                <Image src={imageDataUrl} alt="Panorama" width={2048} height={1024} className="w-full h-auto rounded-xl border-2 border-gray-300 dark:border-gray-600" />
              )}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="px-6 py-3 md:px-8 md:py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-base md:text-lg font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all" onClick={() => setStep('details')}>Refine</button>
              <button className="px-6 py-3 md:px-8 md:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-bold transition-all hover:scale-105 shadow-lg" onClick={handleDownload}>Download Design</button>
              <button className="px-6 py-3 md:px-8 md:py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white text-base md:text-lg font-bold transition-all hover:scale-105 shadow-lg" onClick={handleWhatsAppShare}>Share to WhatsApp</button>
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-4 leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-3 md:p-4 rounded-lg border border-blue-200 dark:border-blue-800">💡 <strong>Tip:</strong> Tap and drag to look around. Use two fingers on touch devices.</p>
          </div>
        )}
      </div>
    </div>
  )
}


