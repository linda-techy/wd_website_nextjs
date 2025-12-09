import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = (await req.json()) as { prompt: string }
    if (!prompt || typeof prompt !== 'string') {
      return new NextResponse('Invalid prompt', { status: 400 })
    }

    // Use Hugging Face API directly for image generation
    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) {
      return new NextResponse('HF_TOKEN environment variable not configured', { status: 500 })
    }

    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/stability-ai/sdxl`,
        {
          headers: {
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: `Ultra-realistic ${prompt}, high detail, ray traced lighting,interior design, equirectangular projection, 8k resolution, photorealistic, trending on archdaily, professional DSLR quality`,
            parameters: {
              width: 1792,
              height: 1024,
              num_inference_steps: 5
            }
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Hugging Face API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
      }

      const result = await response.blob();
      console.log('Hugging Face API response blob:', result);
      
      // Convert blob to base64
      const arrayBuffer = await result.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      const imageDataUrl = `data:image/png;base64,${base64}`;
      
      return NextResponse.json({ imageDataUrl });
      
    } catch (hfError) {
      console.error('Hugging Face API error:', hfError);
      
      // Fallback: Return placeholder image with instructions
      const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTc5MiAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2QjcyODAiPkFJIEludGVyaW9yIERlc2lnbiAzNjDigJl8IFBsYWNlaG9sZGVyPC90ZXh0Pgo8L3N2Zz4K'
      
      return NextResponse.json({ 
        imageDataUrl: placeholderImage,
        message: 'Hugging Face image generation failed. Currently showing placeholder. Please check your HF_TOKEN configuration.'
      })
    }

  } catch (e: any) {
    console.error('Server error:', e)
    return new NextResponse(e?.message || 'Server error', { status: 500 })
  }
}


