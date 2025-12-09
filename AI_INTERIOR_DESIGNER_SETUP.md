# AI Interior Designer 360° - Setup Guide

## Overview
The AI Interior Designer 360° tool uses Perplexity AI Pro to generate detailed interior design concepts and creates custom SVG panoramas based on your requirements.

## Features
- **Room Selection**: Choose from 9 standard room types with customizable dimensions
- **Style Customization**: Modern Indian, Traditional Indian, Contemporary, Minimalist, Industrial, Bohemian, Scandinavian with Indian accents
- **Budget Options**: Economy, Moderate, Premium, Luxury
- **AI-Powered Design**: Perplexity AI Pro generates detailed design descriptions
- **360° Panorama**: Custom SVG panoramas with room layouts and design elements
- **WhatsApp Sharing**: Share your design concept directly to WhatsApp
- **Download**: Save your design concept as an SVG file

## Configuration

### 1. Perplexity AI API Key
The tool requires a Perplexity AI Pro subscription. Configure your API key:

Create a `.env.local` file in the `wd-website` directory:
```bash
# AI Services
PERPLEXITY_API_KEY=your_perplexity_ai_pro_api_key_here

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### 2. Get Perplexity AI Pro API Key
1. Visit [Perplexity AI](https://www.perplexity.ai/)
2. Sign up for a Pro subscription
3. Go to API settings
4. Generate your API key
5. Copy the key to your `.env.local` file

## How It Works

### Step 1: Room Selection
- Choose from living room, bedroom, kitchen, dining room, bathroom, toilet, pooja room, home office, or balcony
- Each room has standard dimensions that you can customize
- Select multiple rooms for comprehensive design

### Step 2: Design Preferences
- **Style**: Choose your preferred interior design style
- **Color Theme**: Warm Neutrals, Cool Neutrals, Earthy & Natural, Vibrant Accents
- **Budget**: Economy, Moderate, Premium, or Luxury
- **Vastu-friendly**: Option for traditional Indian architectural principles
- **Notes**: Add specific requirements or preferences

### Step 3: Review & Generate
- Review your selections
- Enter your contact information (name and WhatsApp number)
- Generate your 360° interior design concept

### Step 4: Results
- View your custom SVG panorama with room layouts
- Download the design concept
- Share directly to WhatsApp
- Refine and regenerate if needed

## Technical Details

### AI Integration
- Uses Perplexity AI Pro's `sonar-large-online` model
- Generates detailed design descriptions in 1500 tokens
- Extracts key design elements (furniture, colors, lighting, materials, accessories)

### Panorama Generation
- Creates custom SVG panoramas (1792x1024)
- Style-specific color schemes and decorative elements
- Room layout visualizations
- Responsive design elements

### Lead Capture
- Temporarily bypassed for testing
- Will integrate with existing backend lead submission system
- Captures name, WhatsApp number, and project details

## Usage Tips

1. **Room Selection**: Start with the main living areas for best results
2. **Style Consistency**: Choose a style that matches your existing home aesthetic
3. **Budget Realism**: Select a budget level that aligns with your actual project budget
4. **Detailed Notes**: Include specific materials, colors, or cultural elements you prefer
5. **Vastu Considerations**: Enable if you want traditional Indian architectural principles

## Troubleshooting

### Common Issues
1. **API Key Error**: Ensure your Perplexity AI API key is correctly set in `.env.local`
2. **Generation Failed**: Check that you've selected at least one room
3. **Image Not Loading**: The tool generates SVG panoramas - ensure your browser supports SVG

### Performance
- Generation typically takes 5-15 seconds
- SVG panoramas are lightweight and load quickly
- Works on all modern browsers and devices

## Future Enhancements

- Real AI-generated images (when image generation APIs become available)
- 3D model integration
- Virtual reality (VR) support
- Material cost estimation
- Contractor recommendations
- Project timeline planning

## Support

For technical support or feature requests, contact the development team or refer to the project documentation.
