'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    email: '',
    phone: '',
    practiceType: 'PHYSIOTHERAPY', // Default to PHYSIOTHERAPY for MVP
    numberOfPractitioners: '',
    yearsInOperation: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Australia', // Default to Australia
    annualRevenue: '',
    patientVolume: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      if (!user) {
        router.push('/auth');
        return;
      }

      // Create practice profile
      const { error: profileError } = await supabase
        .from('practice_profiles')
        .insert([
          { 
            name: formData.name,
            owner_name: formData.ownerName,
            email: formData.email,
            phone: formData.phone,
            practice_type: formData.practiceType,
            number_of_practitioners: parseInt(formData.numberOfPractitioners),
            years_in_operation: parseInt(formData.yearsInOperation),
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
            annual_revenue: formData.annualRevenue ? parseFloat(formData.annualRevenue) : null,
            patient_volume: formData.patientVolume ? parseInt(formData.patientVolume) : null,
            user_id: user.id
          }
        ]);
        
      if (profileError) throw profileError;
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Practice Profile Setup</CardTitle>
          <CardDescription>
            Please provide information about your physiotherapy practice to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Practice Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Practice Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Business Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="practiceType">Practice Type</Label>
                  <Select 
                    value={formData.practiceType}
                    onValueChange={(value) => handleSelectChange('practiceType', value)}
                    disabled // Disabled for MVP as we're focusing on physiotherapy only
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select practice type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PHYSIOTHERAPY">Physiotherapy</SelectItem>
                      <SelectItem value="OCCUPATIONAL_THERAPY" disabled>Occupational Therapy (Coming Soon)</SelectItem>
                      <SelectItem value="SPEECH_PATHOLOGY" disabled>Speech Pathology (Coming Soon)</SelectItem>
                      <SelectItem value="DIETETICS" disabled>Dietetics (Coming Soon)</SelectItem>
                      <SelectItem value="OTHER" disabled>Other (Coming Soon)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="numberOfPractitioners">Number of Practitioners</Label>
                  <Input
                    id="numberOfPractitioners"
                    name="numberOfPractitioners"
                    type="number"
                    min="1"
                    value={formData.numberOfPractitioners}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearsInOperation">Years in Operation</Label>
                  <Input
                    id="yearsInOperation"
                    name="yearsInOperation"
                    type="number"
                    min="0"
                    value={formData.yearsInOperation}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="annualRevenue">Annual Revenue (AUD)</Label>
                  <Input
                    id="annualRevenue"
                    name="annualRevenue"
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.annualRevenue}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="patientVolume">Annual Patient Volume</Label>
                  <Input
                    id="patientVolume"
                    name="patientVolume"
                    type="number"
                    min="0"
                    value={formData.patientVolume}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Practice Location</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    value={formData.country}
                    onValueChange={(value) => handleSelectChange('country', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="New Zealand">New Zealand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Complete Setup'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
