import React, { useState , useRef  } from 'react';
import ImageGallery from '../../components/ImageGallery'


// Main App component
const ChateauStTropez = () => {
     const LocationRef = useRef(null);
  const [formData, setFormData] = useState({
    arrivalDate: '',
    departureDate: '',
    adults: 1,
    children: 0,
    pets: 0,
  });
  const [activeTab, setActiveTab] = useState('Availability');

  // Handle form input changes
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle booking submission
  const handleBooking = () => {
    console.log('Booking details:', formData);
    // In a real app, you would make an API call here.
    // Replace with a custom modal or message box in a production environment.
    alert('Booking submitted! Check the console for details.');
  };

  // Content for each tab
  const tabContent = {
    Availability: (
      <div className="p-4">
        {/* Placeholder for the calendar from the image */}
        <div className="bg-gray-100 p-6 rounded-lg text-center font-bold text-gray-700">
          <p className="mb-4">September 2025 - November 2025 Availability</p>
          <div className="grid grid-cols-7 text-xs sm:text-sm gap-1 mb-2 font-semibold">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
          {/* Mock calendar grid - Red squares represent unavailable days */}
          <div className="grid grid-cols-7 gap-1 text-sm sm:text-base">
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">1</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">2</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">3</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">4</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">5</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">6</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">7</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">8</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">9</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">10</div>
            <div className="p-2 sm:p-3 bg-gray-400 text-white rounded-md">11</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">12</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">13</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">14</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">15</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">16</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">17</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">18</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">19</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">20</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">21</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">22</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">23</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">24</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">25</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">26</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">27</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">28</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">29</div>
            <div className="p-2 sm:p-3 bg-red-500 text-white rounded-md">30</div>
          </div>
        </div>
      </div>
    ),
    Reviews: (
      <div className="p-4 space-y-6">
        {/* Mock reviews based on the image */}
        <div className="border-b pb-4 last:border-b-0">
          <h3 className="font-semibold text-lg text-gray-800">GUEST REVIEW</h3>
          <p className="text-sm text-gray-500">by Gisele on 2025-02-01</p>
          <div className="text-yellow-400 my-1">
            ★★★★★
          </div>
          <p className="text-gray-600">"The home is beautiful and well appointed. It has everything you need for your stay. The Winn Dixie is within walking distance for groceries and across the street is the Surf Hut right in the beach. Excellent location and beautiful neighborhood. Highly recommend."</p>
        </div>
        <div className="border-b pb-4 last:border-b-0">
          <h3 className="font-semibold text-lg text-gray-800">GUEST REVIEW</h3>
          <p className="text-sm text-gray-500">by Edward on 2025-03-27</p>
          <div className="text-yellow-400 my-1">
            ★★★★★
          </div>
          <p className="text-gray-600">"We had a great stay here! Location was really close to the beach as well as being easy to get in and out. The property was clean and in good condition. We would definitely recommend staying here!"</p>
        </div>
        <div className="border-b pb-4 last:border-b-0">
          <h3 className="font-semibold text-lg text-gray-800">GUEST REVIEW</h3>
          <p className="text-sm text-gray-500">by Larry on 2025-03-31</p>
          <div className="text-yellow-400 my-1">
            ★★★★★
          </div>
          <p className="text-gray-600">"Probably one of the first rentals that I've been to where there were zero problems to report. And I have stayed in over 20 rentals."</p>
        </div>
      </div>
    ),
    'Room Details': (
      <div className="p-4">
        {/* Mock table for room details */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-semibold text-gray-700 rounded-tl-lg">Room</th>
              <th className="p-3 font-semibold text-gray-700">Beds</th>
              <th className="p-3 font-semibold text-gray-700">Baths</th>
              <th className="p-3 font-semibold text-gray-700">TVs</th>
              <th className="p-3 font-semibold text-gray-700 rounded-tr-lg">Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 text-gray-600">Bedroom 1</td>
              <td className="p-3 text-gray-600">King</td>
              <td className="p-3 text-gray-600">Toilet<br/>Tub<br/>Shower</td>
              <td className="p-3 text-gray-600">[]</td>
              <td className="p-3 text-gray-600">[]</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 text-gray-600">Bedroom 2</td>
              <td className="p-3 text-gray-600">King</td>
              <td className="p-3 text-gray-600">Toilet<br/>Shower</td>
              <td className="p-3 text-gray-600">[]</td>
              <td className="p-3 text-gray-600">[]</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 text-gray-600">Bedroom 3</td>
              <td className="p-3 text-gray-600">Queen</td>
              <td className="p-3 text-gray-600">[]</td>
              <td className="p-3 text-gray-600">[]</td>
              <td className="p-3 text-gray-600">[]</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 text-gray-600">Bedroom 4</td>
              <td className="p-3 text-gray-600">Double<br/>Twin Single (2)</td>
              <td className="p-3 text-gray-600">[]</td>
              <td className="p-3 text-gray-600">1 Twin over Full Bunk with 1 Twin Trundle</td>
              <td className="p-3 text-gray-600">[]</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    Rates: (
      <div className="p-4">
        {/* Mock table for rates */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-semibold text-gray-700 rounded-tl-lg">Season</th>
              <th className="p-3 font-semibold text-gray-700">Period</th>
              <th className="p-3 font-semibold text-gray-700">Min. Stay</th>
              <th className="p-3 font-semibold text-gray-700">Nightly Rate</th>
              <th className="p-3 font-semibold text-gray-700 rounded-tr-lg">Weekly Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 text-gray-600">Fall 2025</td>
              <td className="p-3 text-gray-600">09/01/2025 - 09/04/2025</td>
              <td className="p-3 text-gray-600">3</td>
              <td className="p-3 text-gray-600">$155.00</td>
              <td className="p-3 text-gray-600"></td>
            </tr>
            <tr className="border-b">
              <td className="p-3 text-gray-600">Fall 2025</td>
              <td className="p-3 text-gray-600">09/05/2025 - 09/05/2025</td>
              <td className="p-3 text-gray-600">3</td>
              <td className="p-3 text-gray-600">$183.00</td>
              <td className="p-3 text-gray-600"></td>
            </tr>
            <tr className="border-b">
              <td className="p-3 text-gray-600">Fall 2025</td>
              <td className="p-3 text-gray-600">09/06/2025 - 09/06/2025</td>
              <td className="p-3 text-gray-600">3</td>
              <td className="p-3 text-gray-600">$188.00</td>
              <td className="p-3 text-gray-600"></td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  };

  return (
    <> <ImageGallery />
    <div className="bg-gray-50 font-sans p-4 sm:p-6 lg:p-12 min-h-screen">
      <div className="max-w-7xl mx-auto mb-8">
       
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-8 max-w-9xl mx-auto">
        
        {/* Left Column: Listing Details & Tabs */}
        <div className="lg:w-2/3 mb-8 lg:mb-0">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-light text-gray-800 mb-6">CHATEAU ST TROPEZ DESCRIPTION</h1>

            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                🏠 Welcome to Chateau St. Tropez – Your Luxurious Coastal Escape ✨
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Experience Mediterranean elegance at Chateau St. Tropez, a stunning retreat in the prestigious gated community of St. Tropez along Scenic Hwy 98. Just steps from private beach access and moments from premier shopping, dining, and family-friendly attractions, this home offers Gulf views, timeless luxury, and exceptional comfort.
              </p>
            </div>

            {/* Why You'll Love This Home Section */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                🏡 Why You'll Love This Home:
              </h2>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center">
                  <span className="mr-2">🐾</span>
                  Pet-Friendly: Bring your furry friend for just $175 per pet.
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🍽️</span>
                  Mediterranean Elegance: From the gourmet kitchen with custom copper sinks to the third-floor master suite with Gulf views and a spa-like bathroom, every detail exudes sophistication.
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🏖️</span>
                  Prime Location: Walk to the private beach, explore shops like Silver Sands and Destin Commons, and enjoy golf courses and attractions nearby.
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🏊</span>
                  Exclusive Amenities: Relax in the St. Tropez lagoon-style pool, hot tub, and tropical oasis.
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✅</span>
                  Snowbirds Welcome: Discounts for 28+ day stays!
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🚗</span>
                  Parking Made Easy: 2 dedicated parking spaces with extra parking available by the beach access.
                </li>
              </ul>
            </div>

            {/* Home Highlights Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                🏡 Home Highlights (Sleeps 12):
              </h2>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center">
                  <span className="mr-2">🏘️</span>
                  First Floor:
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Gourmet Kitchen: Granite counters, premium appliances, and custom copper sinks</li>
                    <li>Open Living Area: Sectional couch, wine fridge, and a welcoming vibe</li>
                    <li>Full Bathroom, Dining Room, and Laundry Room</li>
                  </ul>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🌊</span>
                  Beach Essentials: Chairs, an umbrella, and a wagon for easy beach days.
                </li>
              </ul>
            </div>
            {/* Location Section */}
   
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-80">
            {/* Tab navigation */}
            <div className="flex bg-gray-200 rounded-xl overflow-hidden mb-6">
              {['Availability', 'Reviews', 'Room Details', 'Rates'].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 text-center py-3 font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-teal-600 text-white rounded-xl'
                      : 'bg-transparent text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Tab content */}
            <div className="text-gray-800">
              {activeTab === 'Availability' && tabContent.Availability}
              {activeTab === 'Reviews' && tabContent.Reviews}
              {activeTab === 'Room Details' && tabContent['Room Details']}
              {activeTab === 'Rates' && tabContent.Rates}
            </div>
               <section ref={LocationRef} className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <iframe
          title="map"
          className="w-full h-80 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.985460951768!2d-83.516089!3d35.868145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885c2e6f403a6c3b%3A0x3c6c48e8e2de!2sSevierville%2C%20TN!5e0!3m2!1sen!2sus!4v1234567890"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
          </div>
          
        </div>
        
        {/* Right Column: Sticky Booking Form */}
        <div className="lg:w-1/3 lg:sticky lg:top-30 self-start h-screen">
          <div className="bg-teal-700 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-light mb-1">CHATEAU ST TROPEZ</h2>
            <p className="text-sm opacity-90 mb-6">4 Beds | 4 Baths | 12 Guests</p>
            
            <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-md">
              <form className="space-y-4">
                {/* Arrival & Departure */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-1">
                      ARRIVAL
                    </label>
                    <input
                      type="date"
                      id="arrivalDate"
                      name="arrivalDate"
                      value={formData.arrivalDate}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
                      DEPARTURE
                    </label>
                    <input
                      type="date"
                      id="departureDate"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Adults & Children */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
                      ADULTS
                    </label>
                    <select
                      id="adults"
                      name="adults"
                      value={formData.adults}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {[...Array(10).keys()].map(i => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
                      CHILDREN
                    </label>
                    <select
                      id="children"
                      name="children"
                      value={formData.children}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      {[...Array(6).keys()].map(i => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pets */}
                <div>
                  <label htmlFor="pets" className="block text-sm font-medium text-gray-700 mb-1">
                    PETS
                  </label>
                  <select
                    id="pets"
                    name="pets"
                    value={formData.pets}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {[...Array(4).keys()].map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                {/* Book Now Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleBooking}
                    className="w-full bg-teal-600 text-white font-semibold py-3 rounded-md shadow-lg hover:bg-teal-700 transition-colors"
                  >
                    BOOK NOW
                  </button>
                </div>
              </form>
            </div>

            {/* Questions Button */}
            <div className="mt-4">
              <button
                type="button"
                className="w-full border-2 border-white text-white font-semibold py-3 rounded-md transition-colors hover:bg-white hover:text-teal-700"
              >
                QUESTIONS?
              </button>
            </div>
            
            {/* Secure Booking Info */}
            <div className="mt-6 text-center text-sm opacity-80">
              🔒 Secure Booking Experience
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChateauStTropez;
