import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { backendUrl, token, setToken } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: {}, photo: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } });
      if (response.data.success) {
        setForm(response.data.user);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load profile');
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setForm(prev => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error('Please select a valid image file (JPG, PNG, WebP)');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', imageFile);
      const uploadResp = await axios.post(`${backendUrl}/api/user/upload`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' }
      });
      if (uploadResp.data.success) {
        setForm(prev => ({ ...prev, photo: uploadResp.data.url }));
        setImageFile(null);
        setImagePreview(null);
        toast.success('Image uploaded successfully');
      } else {
        toast.error(uploadResp.data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { userId: '', name: form.name, phone: form.phone, address: form.address, photo: form.photo };
      const resp = await axios.post(backendUrl + '/api/user/profile/update', payload, { headers: { token } });
      if (resp.data.success) {
        toast.success('Profile updated successfully');
        try { if (localStorage.getItem('token')) setToken(localStorage.getItem('token')) } catch(e){}
      } else {
        toast.error(resp.data.message || 'Failed to update');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pt-10 pb-16 px-4 sm:px-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-800 mb-2'>My Profile</h1>
        <p className='text-gray-600'>Manage your personal information and address details</p>
      </div>

      <div className='max-w-4xl mx-auto'>
        <form onSubmit={onSubmit} className='space-y-8'>
          
          {/* Profile Photo Section */}
          <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Profile Photo</h2>
            <div className='flex flex-col sm:flex-row gap-6 items-start'>
              {/* Photo Display */}
              <div className='flex flex-col items-center gap-4'>
                <div className='w-32 h-32 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden'>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className='w-full h-full object-cover' />
                  ) : form.photo ? (
                    <img src={form.photo} alt="Profile" className='w-full h-full object-cover' />
                  ) : (
                    <div className='text-center'>
                      <p className='text-gray-400 text-sm'>📸</p>
                      <p className='text-gray-400 text-xs mt-1'>No photo</p>
                    </div>
                  )}
                </div>
                <div className='flex gap-2'>
                  {form.photo && (
                    <button
                      type='button'
                      onClick={() => {
                        setForm(prev => ({ ...prev, photo: '' }));
                        toast.info('Photo removed');
                      }}
                      className='px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-sm hover:bg-red-100 transition'
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Upload Area */}
              <div className='flex-1'>
                <label className='block'>
                  <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageSelect}
                      className='hidden'
                    />
                    <p className='text-2xl mb-2'>📤</p>
                    <p className='text-gray-700 font-medium'>Click to upload photo</p>
                    <p className='text-gray-500 text-xs mt-1'>JPG, PNG or WebP (Max 5MB)</p>
                  </div>
                </label>
                {imagePreview && (
                  <button
                    type='button'
                    onClick={uploadImage}
                    disabled={uploading}
                    className='mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50'
                  >
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Personal Information</h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                <input
                  name='name'
                  value={form.name || ''}
                  onChange={onChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  placeholder='Enter your full name'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                <input
                  name='phone'
                  value={form.phone || ''}
                  onChange={onChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  placeholder='Enter your phone number'
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Address</h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Street Address</label>
                <input
                  name='address.street'
                  value={form.address?.street || ''}
                  onChange={onChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  placeholder='Street address'
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                  <input
                    name='address.city'
                    value={form.address?.city || ''}
                    onChange={onChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    placeholder='City'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
                  <input
                    name='address.state'
                    value={form.address?.state || ''}
                    onChange={onChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    placeholder='State'
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Zipcode</label>
                  <input
                    name='address.zipcode'
                    value={form.address?.zipcode || ''}
                    onChange={onChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    placeholder='Zipcode'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Country</label>
                  <input
                    name='address.country'
                    value={form.address?.country || ''}
                    onChange={onChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    placeholder='Country'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex gap-3'>
            <button
              type='submit'
              disabled={loading}
              className='px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type='button'
              onClick={fetchProfile}
              className='px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition'
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
