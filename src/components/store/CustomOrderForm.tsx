import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { CheckCircle } from 'lucide-react';

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
    // Simulate form submission
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Request Submitted!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you for your interest! We'll review your request and get back to you within 24-48 hours.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        rows={5}
        required
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Submit Request
      </Button>
    </form>
  );
}
