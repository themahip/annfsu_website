import React, { useState } from 'react';
import { Users, ChevronDown, ChevronUp, Quote } from 'lucide-react';

import bibekgurung from "../images/bibekdai.jpg"
import utsab from "../images/utsab.jpg"
import ranjan from "../images/ranjan.jpg"
import arun from "../images/arun.jpg"
import bharti from "../images/bharti.jpg"
import atul from "../images/atul.jpg"


const Members = () => {
  const [activeCommittee, setActiveCommittee] = useState('national');

  const committees = {
    national: {
      name: "National Committee",
      message: {
        author: "विवेक तमु",
        position: "President, ANNFSU National Committee",
        content: "प्रिय विद्यार्थी साथीहरु अभिवादन, विद्यार्थी जीवन जीवनकै सबै भन्दा उर्जाशील, जागरुक, र परिवर्तनका निमित्त योगदान गर्न मन लाग्ने क्रान्तिकारी समय हो । यदि यो समयमा नै हामीमा समाजमा विद्यमान जडसुत्रवाद, रुढीवाद र अवैज्ञानिक चिन्तनका विरुध्द आलोचनात्मक चेत भएन भने ; त्यसलाई परिवर्तन गरि समाजलाई वैज्ञानिक, समावेशी र पारदर्शी बनाउन आफूले आर्जेका ज्ञान प्रयोग गरेनौँ भने हाम्रो शिक्षाको कुनै महत्त्व रहँदैन । त्यसैले सबै भन्दा पहिले हामीले आफूले अध्ययन गर्ने विश्वविद्यालयलाई विश्व स्तरीय बनाउन अति आवश्यक छ । यस कार्यमा हामी काठमाडौं विश्वविद्यालयमा अनेरास्ववियुको स्थापना काल देखि नै लागि रहेका छौँ । विश्वविद्यालयलाई अनुसन्धान, नवप्रवर्तन र बहसको केन्द्र बनाउन; विद्यार्थीमैत्री, महिला, र अपाङगमैत्री विश्वविद्यालय बनाउन; सुशासन  र पारदर्शी प्रशासन बनाउन; विश्वविद्यालयमा श्रमजीवी तथा मध्यम वर्गीय विद्यार्थीको पहुँच स्थापित गर्न; परीक्षा प्रणालीमा व्यापक सुधार गर्ने सङ्घर्षमा हामी निरन्तर लागि रहेका छौँ । यसका निमित्त वर्तमान र भविष्य दुवैका संवाहक तपाईं सम्पूर्ण सचेत विद्यार्थीहरुलाई अध्ययन सँगँगै आफ्नो क्षमता अनुसार यस अभियानमा योगदान पुर्याउन र सङघर्षको सहयात्री बन्न हार्दिक अपिल गर्दछु ।"
      },
      members: [
        {
          name: "विवेक तमु",
          position: "President",
          image: bibekgurung,
          bio: "Leading ANNFSU's initiatives for student rights and educational reform"
        },
        {
          name: "Arun Lamsal",
          position: "Vice President",
          image: arun,
          bio: "Coordinating academic reforms and student welfare programs"
        },
        {
          name: "Hari Thapa",
          position: "Vice President (Organization)",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
          bio: "Managing organizational structure and membership growth"
        },
        {
          name: "Priya Poudel",
          position: "Vice President (External Affairs)",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
          bio: "Handling external relations and partnerships"
        },
        {
          name: "Bikash KC",
          position: "General Secretary",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
          bio: "Coordinating organizational activities and communications"
        },
        {
          name: "Sarita Gurung",
          position: "Treasurer",
          image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80",
          bio: "Managing financial affairs and budgeting"
        }
      ]
    },
    campus: {
      name: "Campus Committee",
      message: {
        author: "Utsab Bhattarai",
        position: "President, Kathmandu University Central Committee",
        content: "विद्यार्थी संगठनको मूल मन्त्र भनेको 'सकारात्मक निर्णयसँग एकता, गलत निर्णयसँग संघर्ष।' हुनु पर्छ, आफूलाई समसामयिक घटनाक्रमसँग जानकारी राखीएका छैन भने विज्ञान तथा प्राविधिमा अपडेटेड राखीएको  छैन भने जीवनको हरेक पाइला मा कठिनाई भोग्नु पर्छ, विद्यार्थी नेतृत्व अझ यो विषयमा अघि हुनु पर्दछ |"
      },
      members: [
        {
          name: "Utsab Bhattarai",
          position: "President",
          image: utsab,
          bio: "Leading campus initiatives and student advocacy"
        },
        {
          name: "Ranjan Lamsal",
          position: "Vice President",
          image: ranjan,
          bio: "Coordinating academic affairs and student activities"
        },
        {
          name: "Bharti Adhikari",
          position: "Vice President",
          image: bharti,
          bio: "Managing administrative tasks and communications"
        },
        {
          name: "Atul Adhikari",
          position: "Joint Secretary",
          image: atul,
          bio: "Supporting committee operations and event management"
        },
        {
          name: "Binod Thapa",
          position: "Treasurer",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
          bio: "Handling financial matters and budget planning"
        }
      ]
    },
    school: {
      name: "School Committees",
      members: [
        {
          name: "Kathmandu Valley Region",
          schools: [
            {
              name: "Lalitpur Model School",
              leaders: [
                { name: "Rajan Khatri", position: "Coordinator" },
                { name: "Sabina Thapa", position: "Secretary" }
              ]
            },
            {
              name: "Bhaktapur Secondary School",
              leaders: [
                { name: "Manish Pradhan", position: "Coordinator" },
                { name: "Rita Maharjan", position: "Secretary" }
              ]
            }
          ]
        },
        {
          name: "Pokhara Region",
          schools: [
            {
              name: "Gandaki Higher Secondary",
              leaders: [
                { name: "Dipak Gurung", position: "Coordinator" },
                { name: "Sushma Pun", position: "Secretary" }
              ]
            },
            {
              name: "Machhapuchchhre School",
              leaders: [
                { name: "Arun Thapa", position: "Coordinator" },
                { name: "Gita Pariyar", position: "Secretary" }
              ]
            }
          ]
        }
      ]
    }
  };

  const CommitteeButton = ({ name, active, onClick }: { name: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-4 py-2 text-left ${
        active ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      } rounded-md mb-2`}
    >
      <span className="font-medium">{name}</span>
      {active ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>
  );

  const PresidentMessage = ({ message }: { message: { author: string; position: string; content: string } }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
      <Quote className="h-8 w-8 text-red-700 mb-4" />
      <p className="text-gray-700 italic mb-4">{message.content}</p>
      <div className="flex items-center">
        <div>
          <p className="font-semibold text-gray-900">{message.author}</p>
          <p className="text-sm text-gray-600">{message.position}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div id="members" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership</h2>
          <p className="text-lg text-gray-600">
            Meet the dedicated teams leading ANNFSU across different levels
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Committee Selection Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Committees</h3>
              <div className="space-y-2">
                {Object.entries(committees).map(([key, committee]) => (
                  <CommitteeButton
                    key={key}
                    name={committee.name}
                    active={activeCommittee === key}
                    onClick={() => setActiveCommittee(key)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Committee Members Display */}
          <div className="md:col-span-3">
            {(activeCommittee === 'national' || activeCommittee === 'campus') && (
              <>
                {'message' in committees[activeCommittee] && (
                  <PresidentMessage message={committees[activeCommittee].message} />
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  {committees[activeCommittee].members.map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-60 h-auto object-contain border-4 border-gray-300 shadow-md"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                        <p className="text-red-700 font-medium mb-3">{member.position}</p>
                        <p className="text-gray-600">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeCommittee === 'school' && (
              <div className="space-y-8">
                {committees.school.members.map((region, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">{region.name}</h3>
                    <div className="space-y-4">
                      {region.schools.map((school, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-md shadow-sm">
                          <h4 className="font-medium text-gray-900 mb-3">{school.name}</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {school.leaders.map((leader, leaderIdx) => (
                              <div key={leaderIdx} className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-red-700" />
                                <div>
                                  <p className="font-medium">{leader.name}</p>
                                  <p className="text-sm text-gray-600">{leader.position}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;