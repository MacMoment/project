import { useState, useCallback } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Upload, X, CheckCircle, Sparkles } from 'lucide-react';

const projectTypes = [
  { value: '', label: 'Select project type' },
  { value: 'building', label: 'Building / Structure' },
  { value: 'landscape', label: 'Landscape / Terrain' },
  { value: 'interior', label: 'Interior Design' },
  { value: 'vehicle', label: 'Vehicle / Transport' },
  { value: 'full-server', label: 'Full Server Build' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: '', label: 'Select budget range' },
  { value: '100-250', label: '$100 - $250' },
  { value: '250-500', label: '$250 - $500' },
  { value: '500-1000', label: '$500 - $1000' },
  { value: '1000-2500', label: '$1000 - $2500' },
  { value: '2500+', label: '$2500+' },
];

export default function ServicesPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    description: '',
    deadline: '',
    budget: '',
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center py-24">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Quote Request Submitted!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for reaching out! We'll review your project details and get back to you within 24-48 hours with a custom quote.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setFiles([]);
              setFormData({
                name: '',
                email: '',
                projectType: '',
                description: '',
                deadline: '',
                budget: '',
              });
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6">
              <Sparkles size={16} className="text-[#F73AFF]" />
              <span className="text-sm font-medium text-gray-700">
                Custom Commissions
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Personalized Services
            </h1>
            <p className="text-lg text-gray-600">
              Request a custom quote for your unique project. We specialize in bringing virtual visions to life.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="name"
                    label="Your Name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <Input
                    id="email"
                    type="email"
                    label="Email Address"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Project Details
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      id="projectType"
                      label="Project Type"
                      options={projectTypes}
                      required
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                    />
                    <Select
                      id="budget"
                      label="Estimated Budget"
                      options={budgetRanges}
                      required
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                    />
                  </div>

                  <Input
                    id="deadline"
                    type="date"
                    label="Desired Deadline"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                  />

                  <Textarea
                    id="description"
                    label="Project Description"
                    placeholder="Describe your project in detail. Include any specific requirements, style preferences, dimensions, or references..."
                    rows={6}
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Reference Files (Optional)
                </h3>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    isDragging
                      ? 'border-[#F73AFF] bg-[#F73AFF]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Upload
                    size={32}
                    className={`mx-auto mb-4 ${
                      isDragging ? 'text-[#F73AFF]' : 'text-gray-400'
                    }`}
                  />
                  <p className="text-gray-600 mb-2">
                    Drag and drop files here, or{' '}
                    <label className="text-[#F73AFF] cursor-pointer hover:underline">
                      browse
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInput}
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-400">
                    Images, PDFs, or documents up to 10MB each
                  </p>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700 truncate">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Request Quote
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
