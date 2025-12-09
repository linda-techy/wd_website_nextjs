'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import { BASE_API_URL } from '@/lib/config';
import toast, { Toaster } from 'react-hot-toast';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Constants
const DISTRICT_LIST = [
  { displayText: "Thrissur", value: "thrissur" }, 
  { displayText: "Ernakulam", value: "ernakulam" },
  { displayText: "Kottayam", value: "kottayam" },
  { displayText: "Alappuzha", value: "alappuzha" },
  { displayText: "Palakkad", value: "palakkad" },
  { displayText: "Malappuram", value: "malappuram" },
  { displayText: "Kozhikode", value: "kozhikode" },
  { displayText: "Kannur", value: "kannur" },
  { displayText: "Kasaragod", value: "kasaragod" },
  { displayText: "Kollam", value: "kollam" },
  { displayText: "Thiruvananthapuram", value: "thiruvananthapuram" },
  { displayText: "Pathanamthitta", value: "pathanamthitta" },
  { displayText: "Idukki", value: "idukki", increasedByPercentage: 10 },
  { displayText: "Wayanad", value: "wayanad", increasedByPercentage: 10 }
];

const LABOUR_VS_MATERIAL_DATA = [
  { name: 'Material Cost', value: 13.5 },
  { name: 'Labour Cost (Structure Only)', value: 2.52 },
  { name: 'Labour Cost (Painting, Flooring, MEP)', value: 1.98 }
];

const LABOUR_MATERIAL_BREAKDOWN_DATA = [
  { name: 'Super Structure + Plastering Cost', value: 7.20 },
  { name: 'Flooring & Tile Work Cost', value: 2.34 },
  { name: 'Painting Cost', value: 2.52 },
  { name: 'Mechanical, Electrical & Plumbing Cost', value: 3.06 },
  { name: 'Foundation & Plinth Cost', value: 2.88 }
];

// Custom hook for input formatting
const useInputFormatting = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Remove non-numeric characters except decimal point
    inputValue = inputValue.replace(/[^0-9.]/g, '');
    
    // Allow only up to two decimal places
    if (inputValue.includes('.')) {
      const [integerPart, decimalPart] = inputValue.split('.');
      if (decimalPart.length > 2) {
        inputValue = integerPart + '.' + decimalPart.slice(0, 2);
      }
    }
    
    setValue(inputValue);
  };

  return [value, handleChange] as const;
};


// Currency formatter
const formatCurrency = (value: number, currencySymbol = '₹') => {
  if (!value && value !== 0) {
    return '';
  }

  let formattedValue = '';

  if (value >= 10000000) {
    formattedValue = (value / 10000000).toFixed(2) + ' Crores';
  } else if (value >= 100000) {
    formattedValue = (value / 100000).toFixed(2) + ' Lakhs';
  } else if (value >= 1000) {
    formattedValue = (value / 1000).toFixed(2) + ' Thousand';
  } else {
    formattedValue = value.toLocaleString('en-IN');
  }

  return `${currencySymbol}${formattedValue}`;
};

// Custom center text plugin - with dark mode support
const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart: any) {
    const { ctx, chartArea, data } = chart;

    if (!chartArea || !data?.datasets?.[0]) return;

    const { top, width, height } = chartArea;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerX = chart.width / 2;
    const centerY = top + height / 2;

    const dataset = data.datasets[0].data;
    const total = dataset.reduce((acc: number, val: number) => acc + val, 0);
    const maxValue = Math.max(...dataset);
    const maxIndex = dataset.indexOf(maxValue);
    const maxPercentage = ((maxValue / total) * 100).toFixed(1);
    const maxLabel = data.labels?.[maxIndex] ?? "";

    // Detect dark mode
    const isDarkMode = typeof window !== 'undefined' && 
                       window.matchMedia && 
                       window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Draw percentage - responsive font size
    const fontSize = width < 300 ? 18 : width < 400 ? 20 : 24;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = isDarkMode ? "#f3f4f6" : "#1f2937";
    ctx.fillText(`${maxPercentage}%`, centerX, centerY - 15);

    // Draw label (wrapped if necessary) - responsive font size
    const labelFontSize = width < 300 ? 11 : width < 400 ? 12 : 14;
    ctx.font = `${labelFontSize}px Arial`;
    ctx.fillStyle = isDarkMode ? "#9ca3af" : "#6b7280";

    const maxWidth = width * 0.5;
    const words = maxLabel.split(" ");
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const testLine = `${currentLine} ${words[i]}`;
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    const lineHeight = labelFontSize + 4;
    const startY = centerY + 15 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, centerX, startY + index * lineHeight);
    });

    ctx.restore();
  },
};


// Register the plugin
ChartJS.register(centerTextPlugin);

type CostRange = {
  category: string;
  lowestSqft: number;
  highestSqft: number;
};

export default function HomeCostCalculator() {
  // State
  const [step, setStep] = useState('captureDetails');
  const [selectedDistrict, setSelectedDistrict] = useState('thrissur'); // Default to Thrissur
  const [selectedState] = useState('kerala');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('sqfeet');
  const [selectedType, setSelectedType] = useState('basic');
  const [constructionArea, handleConstructionAreaChange] = useInputFormatting('1000');
  const [whatsAppError, setWhatsAppError] = useState('');
  const [typeCostRanges, setTypeCostRanges] = useState<CostRange[]>([]);
  const [lowSqftRange, setLowSqftRange] = useState(0);
  const [highSqftRange, setHighSqftRange] = useState(0);
  const [totalLowCostRange, setTotalLowCostRange] = useState(0);
  const [totalHighCostRange, setTotalHighCostRange] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop size
  const [countryCode, setCountryCode] = useState('+91');
  
  // Calculate construction area in sq feet
  const constructionSqFtArea = selectedUnit === 'sqm' 
    ? parseFloat(constructionArea || '0') * 10.7639 
    : parseFloat(constructionArea || '0');

  // Data for Material vs Labor chart
  const materialVsLaborChartData = {
    labels: LABOUR_VS_MATERIAL_DATA.map(item => item.name),
    datasets: [
      {
        data: LABOUR_VS_MATERIAL_DATA.map(item => item.value),
        backgroundColor: [
          '#3B82F6', // Material Cost - blue
          '#10B981', // Labour Cost (Structure) - emerald
          '#F59E0B'  // Labour Cost (Painting, etc) - amber
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  // Data for Cost Breakdown chart
  const costBreakdownChartData = {
    labels: LABOUR_MATERIAL_BREAKDOWN_DATA.map(item => item.name),
    datasets: [
      {
        data: LABOUR_MATERIAL_BREAKDOWN_DATA.map(item => item.value),
        backgroundColor: [
          '#3B82F6', // Super Structure - blue
          '#10B981', // Flooring - emerald
          '#F59E0B', // Painting - amber
          '#EF4444', // MEP - red
          '#8B5CF6'  // Foundation - violet
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  // Chart options - with legend disabled (we'll create custom legend outside)
  const chartOptions: any = {
    plugins: {
      legend: {
        display: false, // Hide default legend - we'll create custom one outside
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce(
              (acc: number, data: number) => acc + data,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ₹${value} Lakhs (${percentage}%)`;
          },
        },
      },
      datalabels: {
        display: false,
      },
      centerText: {
        display: false // Disable center text plugin
      }
    },
    cutout: "70%",
    maintainAspectRatio: false,
    responsive: true,
  };
  
  // Helper function to calculate percentages for legend
  const calculateLegendData = (chartData: any) => {
    const data = chartData.datasets[0].data;
    const labels = chartData.labels;
    const colors = chartData.datasets[0].backgroundColor;
    const total = data.reduce((acc: number, val: number) => acc + val, 0);
    
    return labels.map((label: string, index: number) => ({
      label,
      value: data[index],
      percentage: ((data[index] / total) * 100).toFixed(1),
      color: colors[index]
    }));
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    };

    // Set initial width
    handleResize();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Fetch rates on component mount
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}/tools/getwdsqftcategories`);
        const data = await response.json();
        setTypeCostRanges(data);
        // Initialize cost ranges for the default selected type
        const defaultRange = data.find((item: CostRange) => item.category.toLowerCase() === 'basic');
        if (defaultRange) {
          setLowSqftRange(defaultRange.lowestSqft);
          setHighSqftRange(defaultRange.highestSqft);
        }
      } catch (error) {
        console.error('Error fetching rates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  // Set cost range based on type
  const setCostRange = (type: string) => {
    if (!typeCostRanges || typeCostRanges.length === 0) return;

    const rangeItem = typeCostRanges.find(
      (item) => item.category.toLowerCase() === type.toLowerCase()
    );

    if (rangeItem) {
      setLowSqftRange(rangeItem.lowestSqft);
      setHighSqftRange(rangeItem.highestSqft);
    }
  };

  // Handle type change
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCostRange(type);
  };

  // Handle unit change
  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
  };

  // Validate inputs before calculation
  const validateInputs = () => {
    if (!selectedDistrict) {
     toast.error('Please select district');
      return false;
    }
  
    if (!constructionArea) {
    toast.error('Please enter construction area');
      return false;
    }
  
    if (!selectedUnit) {
          toast.error('Please select a unit of area.');
      return false;
    }
  
    if (!selectedType) {
        toast.error('Please select a construction type.');
      return false;
    }
    
    return true;
  };

  // Calculate cost
  const calculateCost = () => {
    if (!validateInputs()) return;

    // Ensure cost ranges are set for the current type
    if (lowSqftRange === 0 || highSqftRange === 0) {
      setCostRange(selectedType);
    }
  
    const increasedByPercentage = DISTRICT_LIST.find(item => item.value === selectedDistrict)?.increasedByPercentage ?? 1;
  
    const adjustCostRange = (range: number) => range + (range * increasedByPercentage) / 100;
  
    const adjustedLow = adjustCostRange(lowSqftRange);
    const adjustedHigh = adjustCostRange(highSqftRange);
  
    setTotalLowCostRange(constructionSqFtArea * adjustedLow);
    setTotalHighCostRange(constructionSqFtArea * adjustedHigh);
    setStep('captureWhatsappNumber');
  };

  // Validate WhatsApp number
  const validateWhatsAppNumber = () => {
    const regex = /^\d{10}$/;
    
    if (!whatsAppNumber) {
      setWhatsAppError("Please enter your WhatsApp number.");
      return false;
    }
    
    if (!regex.test(whatsAppNumber)) {
      setWhatsAppError("Please enter a valid 10-digit mobile number.");
      return false;
    }
    
    return true;
  };

  // Continue to results after WhatsApp validation
  const whatsAppContinue = async () => {
    if (!validateWhatsAppNumber()) return;
    setWhatsAppError("");

    // Prepare payload for backend - submit to leads table
    const payload = {
      whatsappNumber: countryCode + whatsAppNumber,
      state: "Kerala", // Calculator is Kerala-specific
      district: selectedDistrict,
      totalConstructionArea: parseFloat(constructionArea || "0"),
      unitOfArea: selectedUnit,
      typeOfConstruction: selectedType,
      totalCostMin: totalLowCostRange,
      totalCostMax: totalHighCostRange,
    };

    try {
      const response = await fetch(`${BASE_API_URL}/leads/calculator/home-cost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast.success("Estimate saved successfully!");
        setStep("showEstimation");
      } else {
        toast.error(result.message || "Failed to submit estimate");
        setStep("showEstimation"); // Still show results even if save fails
      }
    } catch (error) {
      console.error("Error submitting estimate:", error);
      toast.error("Error submitting estimate");
      setStep("showEstimation"); // Still show results even if save fails
    }
  };

  // Reset calculator
  const calculatorAgain = () => {
    setStep('captureDetails');
    setSelectedDistrict('thrissur');
    setWhatsAppNumber('');
    setSelectedUnit('sqfeet');
    setSelectedType('basic');
    handleConstructionAreaChange({ target: { value: '1000' } } as React.ChangeEvent<HTMLInputElement>);
    setWhatsAppError('');
    setCostRange('basic');
  };

  // Contact via WhatsApp
  const contactViaWhatsApp = () => {
    const message = `Hi, I'm interested in the construction estimate I received. My details:
    - District: ${selectedDistrict}
    - Area: ${constructionArea} ${selectedUnit === 'sqm' ? 'sq.m' : 'sq.ft'}
    - Type: ${selectedType}
    - Estimated Cost: ${formatCurrency(totalLowCostRange)} - ${formatCurrency(totalHighCostRange)}`;
    
    const encodedMessage = encodeURIComponent(message);
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/${countryCode.replace('+','')}${whatsAppNumber}?text=${encodedMessage}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
        <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <title>Home Construction Cost Calculator</title>
        <meta name="description" content="Calculate your dream home construction cost" />
      </Head>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        {step === 'captureDetails' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 px-2 leading-tight">
                <span className="text-primary">Build</span> Your Dream Home
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 px-2 leading-relaxed">Get an instant cost estimate in just 2 minutes</p>
            </div>

            <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transform transition-all hover:shadow-2xl">
              <form className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                {/* Location Section */}
                <div className="col-span-1 md:col-span-2 bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 md:p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                  <h2 className="text-sm sm:text-base md:text-lg font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center leading-snug">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    Project Location
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* State */}
                    <div>
                      <label htmlFor="state" className="block text-left text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">State</label>
                      <div className="relative">
                        <select 
                          name="state" 
                          id="state" 
                          className="w-full pl-3 pr-8 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-100 text-gray-600 appearance-none cursor-not-allowed" 
                          value={selectedState}
                          disabled
                        >
                          <option value="kerala">Kerala</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* District */}
                    <div>
                      <label htmlFor="district" className="block text-left text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">District</label>
                      <div className="relative">
                        <select 
                          name="district" 
                          id="district" 
                          className="w-full pl-3 pr-8 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                          {DISTRICT_LIST.map((item) => (
                            <option key={item.value} value={item.value}>{item.displayText}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details Section */}
                <div className="col-span-1 md:col-span-2 bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 md:p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                  <h2 className="text-sm sm:text-base md:text-lg font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center leading-snug">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                    </svg>
                    Project Details
                  </h2>
                  
                  {/* Construction Area */}
                  <div className="mb-4">
                    <label htmlFor="construction-area" className="block text-left text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Construction Area</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="construction-area" 
                        name="area" 
                        className="w-full pl-3 pr-16 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary"
                        value={constructionArea}
                        onChange={handleConstructionAreaChange}
                        placeholder="1000"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 text-sm">
                        {selectedUnit === 'sqfeet' ? 'sq.ft' : 'sq.m'}
                      </span>
                    </div>
                  </div>

                  {/* Unit of Area */}
                  <div className="mb-4">
                    <label className="block text-left text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">Unit of Area</label>
                    <div className="flex space-x-2">
                      <button 
                        type="button" 
                        className={`flex-1 py-2 px-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer ${
                          selectedUnit === 'sqfeet' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handleUnitChange('sqfeet')}
                      >
                        Sq. Feet
                      </button>
                      <button 
                        type="button" 
                        className={`flex-1 py-2 px-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer ${
                          selectedUnit === 'sqm' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handleUnitChange('sqm')}
                      >
                        Sq. Meter
                      </button>
                    </div>
                  </div>

                  {/* Type of Construction */}
                  <div>
                    <label className="block text-left text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">Type of Construction</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        type="button" 
                        className={`py-2 px-2 sm:px-3 text-xs sm:text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer ${
                          selectedType === 'basic' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handleTypeChange('basic')}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        Basic
                      </button>
                      <button 
                        type="button" 
                        className={`py-2 px-2 sm:px-3 text-xs sm:text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer ${
                          selectedType === 'premium' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handleTypeChange('premium')}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                        Premium
                      </button>
                      <button 
                        type="button" 
                        className={`py-2 px-2 sm:px-3 text-xs sm:text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer ${
                          selectedType === 'luxury' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handleTypeChange('luxury')}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                        Luxury
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="col-span-1 md:col-span-2 mt-4">
                  <button 
                    type="button"
                    className={`w-full py-3 md:py-4 px-6 text-base md:text-lg font-bold text-white bg-gradient-to-r from-primary to-green-500 rounded-xl hover:from-primary/90 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg transform transition-all hover:scale-105 active:scale-95 flex items-center justify-center ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    onClick={calculateCost}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Calculating...'
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        Calculate Cost
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* WhatsApp Number Capture */}
        {step === 'captureWhatsappNumber' && (
          <div className="animate-slideIn">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 px-2 leading-tight">
                <span className="text-green-600 dark:text-green-400">One Last Step!</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 px-2 leading-relaxed">Enter your WhatsApp number to receive your estimate</p>
            </div>

            <div className="p-4 sm:p-6 md:p-8 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <form className="space-y-6">
                <div>
                  <label htmlFor="WhatsApp-number" className="block text-lg sm:text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Number
                  </label>
                  
                  <div className="flex items-center border-2 border-green-300 dark:border-green-700 rounded-lg overflow-hidden focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 dark:focus-within:ring-green-800">
                    <select
                      className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 sm:px-3 py-3 border-r border-green-200 dark:border-green-700 text-sm sm:text-base outline-none cursor-pointer"
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      style={{ minWidth: 90, maxHeight: '200px', overflowY: 'auto' }}
                    >
                      <option value="+91">+91 (India)</option>
                      <option value="+1">+1 (USA/Canada)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (Australia)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+65">+65 (Singapore)</option>
                      <option value="+60">+60 (Malaysia)</option>
                      <option value="+966">+966 (Saudi Arabia)</option>
                      <option value="+974">+974 (Qatar)</option>
                      <option value="+49">+49 (Germany)</option>
                      <option value="+33">+33 (France)</option>
                      <option value="+64">+64 (New Zealand)</option>
                      <option value="+27">+27 (South Africa)</option>
                      <option value="+353">+353 (Ireland)</option>
                      <option value="+31">+31 (Netherlands)</option>
                      <option value="+34">+34 (Spain)</option>
                      <option value="+39">+39 (Italy)</option>
                      <option value="+46">+46 (Sweden)</option>
                      <option value="+47">+47 (Norway)</option>
                      <option value="+45">+45 (Denmark)</option>
                    </select>
                    <input 
                      type="tel" 
                      id="WhatsApp-number" 
                      name="WhatsApp"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="w-full p-3 focus:outline-none text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={whatsAppNumber}
                      onChange={(e) => {
                        const formatted = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                        setWhatsAppNumber(formatted);
                      }}
                      placeholder="XXXXXXXXXX"
                    />
                  </div>
                  {whatsAppError && <p className="text-red-500 text-sm md:text-base font-medium mt-2">{whatsAppError}</p>}
                </div>

                <button 
                  type="button"
                  className="w-full py-3 md:py-4 px-6 text-base md:text-lg font-bold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-xl hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg transform transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  onClick={whatsAppContinue}
                >
                  Get My Estimate
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Results Display */}
        {step === 'showEstimation' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 px-2 leading-tight">
                <span className="text-primary dark:text-primary">Estimated Construction Cost</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 px-2 leading-relaxed">Based on your inputs</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 leading-tight">Total Estimate:</p>
                <div className="bg-gradient-to-r from-primary/10 to-green-500/10 dark:from-primary/20 dark:to-green-500/20 rounded-xl p-5 md:p-6 border-2 border-primary/30">
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-primary break-words leading-tight">
                    {formatCurrency(totalLowCostRange)} – {formatCurrency(totalHighCostRange)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6">
                {/* Material vs Labour Chart */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-center font-bold mb-4 text-blue-800 dark:text-blue-300 text-lg sm:text-xl md:text-2xl leading-snug">Material vs Labour</h3>
                  <div className="relative h-48 sm:h-56">
                    <Doughnut data={materialVsLaborChartData} options={chartOptions} />
                  </div>
                  
                  {/* Custom Legend */}
                  <div className="mt-6 space-y-3">
                    {calculateLegendData(materialVsLaborChartData).map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div 
                            className="w-4 h-4 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.percentage}%
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ₹{item.value}L
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost Breakdown Chart */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-800">
                  <h3 className="text-center font-bold mb-4 text-purple-800 dark:text-purple-300 text-lg sm:text-xl md:text-2xl leading-snug">Cost Breakdown</h3>
                  <div className="relative h-48 sm:h-56">
                    <Doughnut data={costBreakdownChartData} options={chartOptions} />
                  </div>
                  
                  {/* Custom Legend */}
                  <div className="mt-6 space-y-3">
                    {calculateLegendData(costBreakdownChartData).map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div 
                            className="w-4 h-4 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.percentage}%
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ₹{item.value}L
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button 
                  onClick={contactViaWhatsApp}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg transition transform hover:scale-105 text-base md:text-lg font-bold cursor-pointer"
                >
                  Contact via WhatsApp
                </button>
                <button 
                  onClick={calculatorAgain}
                  className="w-full sm:w-auto bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 md:px-8 py-3 md:py-4 rounded-lg transition transform hover:scale-105 text-base md:text-lg font-bold cursor-pointer"
                >
                  Recalculate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}