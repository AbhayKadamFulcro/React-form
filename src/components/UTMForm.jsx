import React, { useState, useEffect } from 'react';

const UTMForm = ({ utmParams }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [showUTMData, setShowUTMData] = useState(false);
  const [localUtmParams, setLocalUtmParams] = useState(utmParams);

  // Update local UTM params when prop changes
  useEffect(() => {
    setLocalUtmParams(utmParams);
  }, [utmParams]);

  const handleCaptureUTM = () => {
    // Capture UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    
    const params = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || '',
      IntermediaryCode: urlParams.get('IntermediaryCode') || '',
      LeadGenerator: urlParams.get('LeadGenerator') || '',
      IsZKApp: urlParams.get('IsZKApp') || '',
    };

    // Store UTM parameters in localStorage
    if (Object.values(params).some(value => value !== '')) {
      localStorage.setItem('utmParams', JSON.stringify(params));
      setLocalUtmParams(params);
      alert('UTM parameters captured successfully!');
    } else {
      alert('No UTM parameters found in the current URL.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // First, capture UTM parameters from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const currentUtmParams = {
      utm_source: urlParams.get('utm_source') || localUtmParams.utm_source || '',
      utm_medium: urlParams.get('utm_medium') || localUtmParams.utm_medium || '',
      utm_campaign: urlParams.get('utm_campaign') || localUtmParams.utm_campaign || '',
      utm_term: urlParams.get('utm_term') || localUtmParams.utm_term || '',
      IntermediaryCode: urlParams.get('IntermediaryCode') || localUtmParams.IntermediaryCode || '',
      LeadGenerator: urlParams.get('LeadGenerator') || localUtmParams.LeadGenerator || '',
      IsZKApp: urlParams.get('IsZKApp') || localUtmParams.IsZKApp || '',
    };

    // Update localStorage with latest UTM params
    if (Object.values(currentUtmParams).some(value => value !== '')) {
      localStorage.setItem('utmParams', JSON.stringify(currentUtmParams));
      setLocalUtmParams(currentUtmParams);
    }
    
    // Combine form data with UTM parameters
    const submissionData = {
      ...formData,
      ...currentUtmParams,
      timestamp: new Date().toISOString()
    };

    console.log('Form Submitted:', submissionData);
    
    // Store submission in localStorage
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(submissionData);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    // Show success message
    alert('Form submitted successfully! UTM parameters captured. Check console for data.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const clearUTMParams = () => {
    // Clear localStorage
    localStorage.removeItem('utmParams');
    localStorage.removeItem('formSubmissions');
    
    // Clear local state
    setLocalUtmParams({
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      IntermediaryCode: '',
      LeadGenerator: '',
      IsZKApp: '',
    });
    
    // Clear URL parameters by redirecting to clean URL
    const baseUrl = window.location.origin + window.location.pathname;
    
    alert('UTM parameters and submissions cleared from localStorage!');
    
    // Redirect to clean URL without query parameters
    window.location.href = baseUrl;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Info Banner */}
      <div className="mb-4 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400 shadow-sm">
        <div className="flex items-start gap-2">
          <span className="text-xl sm:text-2xl">💡</span>
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-semibold text-yellow-800 mb-1">
              UTM Persistence Demo Active!
            </h3>
            <p className="text-xs sm:text-sm text-yellow-700">
              Notice how UTM parameters stay visible even when you navigate to different pages without UTM in the URL. 
              They're stored in localStorage for accurate marketing attribution! 🎯
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
          Car Insurance Form
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center">
          Car-Secure by ZurichKotak
        </p>

        {/* UTM Parameters Display */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
            <h2 className="text-base sm:text-lg font-semibold text-blue-800">
              Captured UTM Parameters
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleCaptureUTM}
                className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-medium transition"
              >
                📥 Capture UTM
              </button>
              <button
                onClick={() => setShowUTMData(!showUTMData)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {showUTMData ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          
          {showUTMData && (
            <div className="mt-3 space-y-1 text-xs sm:text-sm">
              {Object.entries(localUtmParams).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-1 sm:py-1 border-b border-blue-100 gap-1">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="text-gray-600 break-all">{value || 'N/A'}</span>
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={clearUTMParams}
            className="mt-3 text-xs text-red-600 hover:text-red-800 font-medium"
          >
            Clear Stored Data
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter 10-digit phone number"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Tell us about your car insurance needs..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm sm:text-base"
          >
            Submit Form
          </button>
        </form>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>Note:</strong> UTM parameters are captured when you submit the form. You can also manually capture them using the "📥 Capture UTM" button above.
            <span className="hidden sm:inline">
              {' '}Try accessing with: <code className="bg-gray-200 px-1 rounded break-all">?utm_source=zkgi-top-nav&utm_medium=top-nav&utm_campaign=Car-Secure&utm_term=Car&IntermediaryCode=4170830000&LeadGenerator=ZurichKotak&IsZKApp=1</code>
            </span>
          </p>
        </div>

        {/* Demo Section - UTM Persistence */}
        <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-sm font-semibold text-green-800 mb-2">
            🔗 Test UTM Persistence
          </h3>
          <p className="text-xs text-gray-700 mb-3">
            UTM parameters are stored in localStorage. Click the links below to see how they persist even when navigating to different pages!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="/"
              className="inline-block px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium rounded-lg transition text-center"
            >
              Go to Home (Clean URL)
            </a>
            <a
              href="/?page=about"
              className="inline-block px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition text-center"
            >
              Go to About Page
            </a>
            <a
              href="/?page=contact"
              className="inline-block px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-medium rounded-lg transition text-center"
            >
              Go to Contact Page
            </a>
          </div>
          
          <div className="mt-3 p-2 bg-white rounded border border-green-300">
            <p className="text-xs text-gray-600">
              <strong>Current URL:</strong> <code className="bg-gray-100 px-1 rounded break-all">{window.location.href}</code>
            </p>
          </div>
          
          <p className="text-xs text-gray-600 mt-2 italic">
            💡 Notice how UTM parameters remain in the "Captured UTM Parameters" section above, even after clicking these links. They're stored in localStorage!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UTMForm;
