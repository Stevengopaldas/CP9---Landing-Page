import React, { useState } from 'react';
import { X, User, Briefcase, Clock, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ProfessionalDetailsFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfessionalDetailsForm: React.FC<ProfessionalDetailsFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    
    // Professional Information
    employeeId: '',
    department: '',
    jobTitle: '',
    experienceLevel: '',
    primarySkills: '',
    
    // Availability & Interests
    availability: '',
    preferredActivities: [],
    timeCommitment: '',
    
    // Motivation
    motivation: '',
    previousVolunteering: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      preferredActivities: prev.preferredActivities.includes(activity)
        ? prev.preferredActivities.filter(a => a !== activity)
        : [...prev.preferredActivities, activity]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Professional Details Submitted:', formData);
    alert('Thank you for your interest! Your details have been submitted successfully. Our team will contact you soon.');
    onClose();
    // Reset form
    setFormData({
      fullName: '', email: '', phone: '', employeeId: '', department: '',
      jobTitle: '', experienceLevel: '', primarySkills: '', availability: '',
      preferredActivities: [], timeCommitment: '', motivation: '', previousVolunteering: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-white/20 animate-fade-in">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-6 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-blue-900" />
            <h2 className="text-2xl font-bold text-blue-900">Join Our CSR Community</h2>
          </div>
          <Button
            onClick={onClose}
            variant="outline"
            size="icon"
            className="glass-card border-white/20 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-blue-900" />
              <h3 className="text-lg font-semibold text-blue-900">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@cognizant.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-blue-900" />
              <h3 className="text-lg font-semibold text-blue-900">Professional Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID *
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., CTS123456"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Data Science & Analytics">Data Science & Analytics</option>
                  <option value="Cloud Services">Cloud Services</option>
                  <option value="Digital Transformation">Digital Transformation</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Product Management">Product Management</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title/Role *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level *
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Experience Level</option>
                  <option value="0-2 years">0-2 years (Junior)</option>
                  <option value="3-5 years">3-5 years (Mid-level)</option>
                  <option value="6-10 years">6-10 years (Senior)</option>
                  <option value="10+ years">10+ years (Expert/Lead)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Skills & Technologies
              </label>
              <textarea
                name="primarySkills"
                value={formData.primarySkills}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., React, Python, AWS, Machine Learning, Agile..."
              />
            </div>
          </div>

          {/* Availability & Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-blue-900" />
              <h3 className="text-lg font-semibold text-blue-900">Availability & Interests</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability *
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Availability</option>
                  <option value="Weekday evenings">Weekday evenings</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Both weekdays and weekends">Both weekdays and weekends</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Commitment *
                </label>
                <select
                  name="timeCommitment"
                  value={formData.timeCommitment}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Time Commitment</option>
                  <option value="1-2 hours per week">1-2 hours per week</option>
                  <option value="3-5 hours per week">3-5 hours per week</option>
                  <option value="5-10 hours per week">5-10 hours per week</option>
                  <option value="10+ hours per week">10+ hours per week</option>
                  <option value="Event-based">Event-based (as needed)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred CSR Activities * (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Blood Donation Drives',
                  'Tech Education for Underserved Communities',
                  'Environmental Sustainability Projects',
                  'Accessibility Technology Development',
                  'Mentoring Young Developers',
                  'Digital Literacy Programs',
                  'Open Source Contributions',
                  'Community Health Initiatives',
                  'Disaster Relief Technology Support',
                  'Women in Tech Programs',
                  'Elderly Technology Support',
                  'NGO Technology Solutions'
                ].map((activity) => (
                  <label key={activity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredActivities.includes(activity)}
                      onChange={() => handleCheckboxChange(activity)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{activity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-blue-900" />
              <h3 className="text-lg font-semibold text-blue-900">Tell Us More</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why do you want to get involved in CSR activities? *
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your motivation for joining our CSR initiatives..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Volunteering Experience (Optional)
              </label>
              <textarea
                name="previousVolunteering"
                value={formData.previousVolunteering}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe any previous volunteering or CSR experience..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="px-6 py-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfessionalDetailsForm; 