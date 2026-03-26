import React, { useState } from 'react';

const UTMForm = ({ utmParams }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [showUTMData, setShowUTMData] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine form data with UTM parameters
    const submissionData = {
      ...formData,
      ...utmParams,
      timestamp: new Date().toISOString()
    };

    console.log('Form Submitted:', submissionData);
    
    // Store submission in localStorage
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(submissionData);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    // Show success message
    alert('Form submitted successfully! Check console for data.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const clearUTMParams = () => {
    localStorage.removeItem('utmParams');
    localStorage.removeItem('formSubmissions');
    alert('UTM parameters and submissions cleared from localStorage!');
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <button
              onClick={() => setShowUTMData(!showUTMData)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium self-start sm:self-auto"
            >
              {showUTMData ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showUTMData && (
            <div className="mt-3 space-y-1 text-xs sm:text-sm">
              {Object.entries(utmParams).map(([key, value]) => (
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
            <strong>Note:</strong> UTM parameters are automatically captured from the URL and stored in localStorage.
            <span className="hidden sm:inline">
              {' '}Try accessing with: <code className="bg-gray-200 px-1 rounded break-all">?utm_source=zkgi-top-nav&utm_medium=top-nav&utm_campaign=Car-Secure&utm_term=Car&IntermediaryCode=4170830000&LeadGenerator=ZurichKotak&IsZKApp=1</code>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UTMForm;
