import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';

const About = () => {
  return (
    <div id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About ANNFSU</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          सशक्त विद्यार्थी, उज्ज्वल भविष्य!

स्वागत छ अनेरास्ववियु काठमाडौं विश्वविद्यालयको आधिकारिक वेब पोर्टलमा। शिक्षामा सुधार, रोजगार सिर्जना, र विद्यार्थी हकहितका लागि हामी निरन्तर सक्रिय छौँ।

विश्वविद्यालयमा अवसर निर्माण गर्न, नेतृत्व लिन र परिवर्तनको हिस्सा बन्न तपाईंलाई आमन्त्रण गर्दछौँ।

सशक्त विद्यार्थी, समृद्ध राष्ट्र!
लाल सलाम!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-12 w-12 text-red-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Student Representation</h3>
            <p className="text-gray-600">
              We represent students across Nepal, fighting for their rights and ensuring their voices are heard
              in educational policy-making.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="h-12 w-12 text-red-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Educational Reform</h3>
            <p className="text-gray-600">
              Working towards improving the quality of education and making it accessible to all students
              regardless of their background.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Award className="h-12 w-12 text-red-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Student Welfare</h3>
            <p className="text-gray-600">
              Promoting and protecting student welfare through various initiatives and programs focused on
              academic and personal development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;