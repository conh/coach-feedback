import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, ChevronDown, ChevronUp, Filter, Search } from 'lucide-react';

const SportsBookingSystem = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    playerName: '',
    parentName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    medicalInfo: '',
    ageGroup: '',
    experience: ''
  });

  const courses = [
    {
      id: 1,
      title: "Elite Soccer Academy - Summer Camp",
      category: "soccer",
      dates: "July 14-15, 2025",
      duration: "2 Days",
      times: "09:00 - 15:30",
      ageRange: "6-13 years (School Years 1-7)",
      location: "Premier Training Ground, Surrey",
      surface: "3G Pitch",
      price: 189,
      maxParticipants: 24,
      currentBookings: 18,
      rating: 4.9,
      description: "Experience professional-level training at our world-class facilities. Train like the pros with expert coaching and state-of-the-art equipment.",
      features: [
        "Professional coaching staff",
        "World-class training facilities", 
        "Lunch and refreshments included",
        "Training kit provided",
        "Certificate of completion"
      ],
      requirements: [
        "Sports clothing appropriate to weather",
        "Shin pads mandatory",
        "3G boots (no metal studs)",
        "Packed lunch (nut-free)",
        "Non-fizzy drink"
      ],
      dropoffInfo: "Registration: 09:00 - 09:15 (no access before 9am)",
      pickupInfo: "Collection: 15:15 - 15:30 (please return no earlier than 15:00)"
    },
    {
      id: 2,
      title: "Basketball Skills Development",
      category: "basketball",
      dates: "July 21-22, 2025",
      duration: "2 Days",
      times: "10:00 - 16:00",
      ageRange: "8-16 years",
      location: "Sports Complex, London",
      surface: "Indoor Court",
      price: 159,
      maxParticipants: 20,
      currentBookings: 12,
      rating: 4.7,
      description: "Develop your basketball skills with professional coaches. Focus on fundamentals, teamwork, and advanced techniques.",
      features: [
        "Professional basketball coaching",
        "Indoor air-conditioned facility",
        "Skills assessment and feedback",
        "Team building activities",
        "Participation certificate"
      ],
      requirements: [
        "Basketball shoes (non-marking soles)",
        "Comfortable athletic wear",
        "Water bottle",
        "Towel",
        "Packed lunch"
      ],
      dropoffInfo: "Registration: 09:45 - 10:00",
      pickupInfo: "Collection: 15:45 - 16:00"
    },
    {
      id: 3,
      title: "Tennis Academy Intensive",
      category: "tennis",
      dates: "July 28-29, 2025",
      duration: "2 Days",
      times: "09:30 - 15:00",
      ageRange: "7-15 years",
      location: "Wimbledon Tennis Centre",
      surface: "Grass & Hard Courts",
      price: 229,
      maxParticipants: 16,
      currentBookings: 14,
      rating: 4.8,
      description: "Train at the prestigious Wimbledon Tennis Centre with professional coaches. Perfect your technique on grass and hard courts.",
      features: [
        "Wimbledon-certified coaching",
        "Grass and hard court access",
        "Video analysis sessions",
        "Technique improvement focus",
        "Championship-style experience"
      ],
      requirements: [
        "Tennis racket (loaners available)",
        "Tennis shoes (non-marking)",
        "Sun hat and sunscreen",
        "Water bottle",
        "Light snacks"
      ],
      dropoffInfo: "Registration: 09:15 - 09:30",
      pickupInfo: "Collection: 14:45 - 15:00"
    },
    {
      id: 4,
      title: "Multi-Sport Adventure Camp",
      category: "multi-sport",
      dates: "August 4-6, 2025",
      duration: "3 Days",
      times: "09:00 - 16:00",
      ageRange: "5-12 years",
      location: "Adventure Sports Centre, Kent",
      surface: "Various",
      price: 279,
      maxParticipants: 30,
      currentBookings: 22,
      rating: 4.6,
      description: "Experience multiple sports in one exciting camp! Soccer, basketball, tennis, athletics, and team challenges.",
      features: [
        "5 different sports activities",
        "Qualified multi-sport coaches",
        "All equipment provided",
        "Healthy meals included",
        "Achievement badges"
      ],
      requirements: [
        "Comfortable sports clothing",
        "Trainers and change of clothes",
        "Water bottle",
        "Sun protection",
        "Enthusiasm for sports!"
      ],
      dropoffInfo: "Registration: 08:45 - 09:00",
      pickupInfo: "Collection: 15:45 - 16:00"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Sports', count: courses.length },
    { id: 'soccer', name: 'Soccer', count: courses.filter(c => c.category === 'soccer').length },
    { id: 'basketball', name: 'Basketball', count: courses.filter(c => c.category === 'basketball').length },
    { id: 'tennis', name: 'Tennis', count: courses.filter(c => c.category === 'tennis').length },
    { id: 'multi-sport', name: 'Multi-Sport', count: courses.filter(c => c.category === 'multi-sport').length }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookingInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookingSubmit = () => {
    if (bookingStep === 1) {
      setBookingStep(2);
    } else if (bookingStep === 2) {
      setBookingStep(3);
    } else {
      // Final submission
      alert('Booking submitted successfully! You will receive a confirmation email shortly.');
      setSelectedCourse(null);
      setBookingStep(1);
      setBookingData({
        playerName: '',
        parentName: '',
        email: '',
        phone: '',
        emergencyContact: '',
        medicalInfo: '',
        ageGroup: '',
        experience: ''
      });
    }
  };

  const getAvailabilityColor = (current, max) => {
    const ratio = current / max;
    if (ratio < 0.5) return 'text-green-600';
    if (ratio < 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityText = (current, max) => {
    const available = max - current;
    if (available === 0) return 'FULLY BOOKED';
    if (available <= 3) return `Only ${available} spots left!`;
    return `${available} spots available`;
  };

  if (selectedCourse) {
    const course = courses.find(c => c.id === selectedCourse);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
              <button 
                onClick={() => setSelectedCourse(null)}
                className="text-blue-100 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back to Courses
              </button>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-blue-100">Complete your booking in {bookingStep === 1 ? '3' : bookingStep === 2 ? '2' : '1'} easy steps</p>
            </div>

            {bookingStep === 1 && (
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span>{course.dates} ({course.duration})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>{course.times}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span>{course.ageRange}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span>{course.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
                    <ul className="space-y-2">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">What to Bring</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Drop-off Information</h3>
                    <p className="text-blue-800">{course.dropoffInfo}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Pick-up Information</h3>
                    <p className="text-green-800">{course.pickupInfo}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-6 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">£{course.price}</div>
                    <div className={`text-sm font-medium ${getAvailabilityColor(course.currentBookings, course.maxParticipants)}`}>
                      {getAvailabilityText(course.currentBookings, course.maxParticipants)}
                    </div>
                  </div>
                  <button 
                    onClick={handleBookingSubmit}
                    disabled={course.currentBookings >= course.maxParticipants}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                  >
                    Continue to Booking
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Participant Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Player's Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.playerName}
                      onChange={(e) => handleBookingInputChange('playerName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter player's full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent/Guardian Name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.parentName}
                      onChange={(e) => handleBookingInputChange('parentName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter parent/guardian name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => handleBookingInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => handleBookingInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact *
                    </label>
                    <input
                      type="text"
                      value={bookingData.emergencyContact}
                      onChange={(e) => handleBookingInputChange('emergencyContact', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Name and phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={bookingData.experience}
                      onChange={(e) => handleBookingInputChange('experience', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Information / Allergies
                  </label>
                  <textarea
                    value={bookingData.medicalInfo}
                    onChange={(e) => handleBookingInputChange('medicalInfo', e.target.value)}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please include any medical conditions, allergies, or special requirements"
                  />
                </div>
                
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={() => setBookingStep(1)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleBookingSubmit}
                    disabled={!bookingData.playerName || !bookingData.parentName || !bookingData.email || !bookingData.phone || !bookingData.emergencyContact}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Confirm Your Booking</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Course:</span>
                      <span className="font-medium">{course.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participant:</span>
                      <span className="font-medium">{bookingData.playerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dates:</span>
                      <span className="font-medium">{course.dates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Times:</span>
                      <span className="font-medium">{course.times}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>£{course.price}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Payment Information</h3>
                  <p className="text-blue-800 text-sm">
                    Your payment will be processed securely. You will receive a confirmation email with all course details and instructions.
                  </p>
                </div>

                <div className="flex justify-between">
                  <button 
                    onClick={() => setBookingStep(2)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleBookingSubmit}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
                  >
                    Complete Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sports Academy Booking</h1>
          <p className="text-xl text-blue-100 mb-8">Professional sports coaching for all ages and abilities</p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {course.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.times}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.ageRange}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">£{course.price}</div>
                    <div className={`text-sm font-medium ${getAvailabilityColor(course.currentBookings, course.maxParticipants)}`}>
                      {getAvailabilityText(course.currentBookings, course.maxParticipants)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{course.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{course.description}</p>

                {expandedCourse === course.id && (
                  <div className="mb-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What to Bring:</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {course.requirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {expandedCourse === course.id ? (
                      <>Show Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Show More <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setSelectedCourse(course.id)}
                    disabled={course.currentBookings >= course.maxParticipants}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    {course.currentBookings >= course.maxParticipants ? 'Fully Booked' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No courses found matching your criteria</div>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter options</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsBookingSystem;