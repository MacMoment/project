import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { CheckCircle, X } from 'lucide-react';

const projectTypes = [
  { value: '', label: 'Select project type' },
  { value: 'building', label: 'Building / Structure' },
  { value: 'landscape', label: 'Landscape / Terrain' },
  { value: 'interior', label: 'Interior Design' },
  { value: 'vehicle', label: 'Vehicle / Transport' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: '', label: 'Select budget range' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-250', label: '$100 - $250' },
  { value: '250-500', label: '$250 - $500' },
  { value: '500-1000', label: '$500 - $1000' },
  { value: '1000+', label: '$1000+' },
];

export function CustomOrderForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    description: '',
    deadline: '',
    budget: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: '',
      description: '',
      deadline: '',
      budget: '',
    });
  };

  // Focus management for accessibility
  useEffect(() => {
    if (isSubmitted && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isSubmitted]);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="name"
            label="Your Name"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="projectType"
            label="Project Type"
            options={projectTypes}
            required
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          />
          <Select
            id="budget"
            label="Estimated Budget"
            options={budgetRanges}
            required
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
        </div>

        <Input
          id="deadline"
          type="date"
          label="Desired Deadline"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        />

        <Textarea
          id="description"
          label="Project Description"
          placeholder="Describe your project in detail..."
          rows={4}
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Submit Request
        </Button>
      </form>

      {/* Success Overlay */}
      {isSubmitted && (
        <div 
          ref={successRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          aria-describedby="success-description"
          className="absolute inset-0 bg-white rounded-2xl flex flex-col items-center justify-center text-center p-6 animate-fade-in"
        >
          <button 
            ref={closeButtonRef}
            onClick={handleReset}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close success message"
          >
            <X size={20} />
          </button>
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4" aria-hidden="true">
            <CheckCircle size={28} className="text-green-500" />
          </div>
          <h3 id="success-title" className="text-xl font-bold text-gray-900 mb-2">
            Request Submitted!
          </h3>
          <p id="success-description" className="text-gray-600 text-sm max-w-xs mb-6">
            Thank you for your interest! We'll review your request and get back to you within 24-48 hours.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            Submit Another Request
          </Button>
        </div>
      )}
    </div>
  );
}
