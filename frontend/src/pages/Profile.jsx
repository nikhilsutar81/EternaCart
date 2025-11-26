import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Valid Mumbai pincodes (postal codes)
const MUMBAI_PINCODES = ['400001', '400002', '400003', '400004', '400005', '400006', '400007', '400008', '400009', '400010', '400011', '400012', '400013', '400014', '400015', '400016', '400017', '400018', '400019', '400020', '400021', '400022', '400023', '400024', '400025', '400026', '400027', '400028', '400029', '400030', '400031', '400032', '400033', '400034', '400035', '400036', '400050', '400051', '400052', '400053', '400054', '400055', '400056', '400057', '400058', '400059', '400060', '400061', '400062', '400063', '400064', '400065', '400066', '400067', '400068', '400069', '400070', '400071', '400072', '400073', '400074', '400075', '400076', '400077', '400078', '400079', '400080', '400081', '400082', '400083', '400084', '400085', '400086', '400087', '400088', '400089', '400090', '400091', '400092', '400093', '400094', '400095', '400096', '400097', '400098', '400099', '400100', '400101', '400102', '400103', '400104', '400701', '400702', '400703', '400704', '400705', '400706', '400707', '400708', '400709', '400710', '400711', '400712'];

const validateMumbaiPincode = (pincode) => {
  return MUMBAI_PINCODES.includes(pincode);
};

const Profile = () => {
  const { backendUrl, token, setToken } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalForm, setOriginalForm] = useState({ name: '', email: '', phone: '', gender: '', address: {}, photo: '' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', gender: '', address: {}, photo: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pincodeError, setPincodeError] = useState('');

  const fetchProfile = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/user/profile', {}, { headers: { token } });
      if (response.data.success) {
        setForm(response.data.user);
        setOriginalForm(response.data.user);
        setIsEditing(false);
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
      // Validate pincode if city is Mumbai
      if (key === 'zipcode' && form.address?.city?.toLowerCase() === 'mumbai') {
        if (value && !validateMumbaiPincode(value)) {
          setPincodeError('Invalid Mumbai pincode');
        } else {
          setPincodeError('');
        }
      }
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
    
    // Validate pincode if city is Mumbai
    if (form.address?.city?.toLowerCase() === 'mumbai' && form.address?.zipcode) {
      if (!validateMumbaiPincode(form.address.zipcode)) {
        setPincodeError('Invalid Mumbai pincode');
        toast.error('Please enter a valid Mumbai pincode');
        return;
      }
    }
    setPincodeError('');

    try {
      setLoading(true);
      const payload = { userId: '', name: form.name, phone: form.phone, gender: form.gender, address: form.address, photo: form.photo };
      const resp = await axios.post(backendUrl + '/api/user/profile/update', payload, { headers: { token } });
      if (resp.data.success) {
        toast.success('Profile updated successfully');
        setOriginalForm(form);
        setIsEditing(false);
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

  const handleCancel = () => {
    setForm(originalForm);
    setIsEditing(false);
    setImageFile(null);
    setImagePreview(null);
    setPincodeError('');
  };

  return (
    <div className='pt-10 pb-16 px-4 sm:px-8'>
      {/* Header */}
      <div className='mb-8 flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>My Profile</h1>
          <p className='text-gray-600'>View and manage your personal information</p>
        </div>
        {!isEditing && (
          <button
            type='button'
            onClick={() => setIsEditing(true)}
            className='px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition'
          >
            ✏️ Edit
          </button>
        )}
      </div>

      <div className='max-w-4xl mx-auto'>
        {isEditing ? (
          <form onSubmit={onSubmit} className='space-y-8'>
            
            {/* Profile Photo Section - Single Block */}
            <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Profile Photo</h2>
              
              {/* Unified Photo Block */}
              <div className='flex flex-col md:flex-row gap-6'>
                {/* Photo Display */}
                <div className='w-full md:w-48 flex flex-col items-center gap-3'>
                  <div className='w-40 h-40 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0'>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className='w-full h-full object-cover' />
                    ) : form.photo ? (
                      <img src={form.photo} alt="Profile" className='w-full h-full object-cover' />
                    ) : (
                      <div className='text-center'>
                        <p className='text-gray-400 text-3xl'>📸</p>
                        <p className='text-gray-400 text-xs mt-1'>No photo</p>
                      </div>
                    )}
                  </div>
                  {form.photo && !imagePreview && (
                    <button
                      type='button'
                      onClick={() => {
                        setForm(prev => ({ ...prev, photo: '' }));
                        toast.info('Photo removed');
                      }}
                      className='px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded text-sm hover:bg-red-100 transition'
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Upload and Instructions */}
                <div className='flex-1'>
                  <label className='block mb-4'>
                    <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition'>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageSelect}
                        className='hidden'
                      />
                      <p className='text-2xl mb-2'>📤</p>
                      <p className='text-gray-700 font-medium'>Click to upload new photo</p>
                      <p className='text-gray-500 text-xs mt-1'>JPG, PNG or WebP (Max 5MB)</p>
                    </div>
                  </label>
                  
                  {/* Instructions */}
                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 space-y-2'>
                    <p className='font-semibold text-blue-900'>📋 Instructions:</p>
                    <ul className='list-disc list-inside space-y-1 text-xs'>
                      <li>Click the dashed box above to select a photo from your device</li>
                      <li>Supported formats: JPG, PNG, WebP</li>
                      <li>Maximum file size: 5MB</li>
                      <li>After selecting, click "Upload Photo" button below</li>
                      <li>Use "Remove" to delete current photo</li>
                    </ul>
                  </div>

                  {imagePreview && (
                    <button
                      type='button'
                      onClick={uploadImage}
                      disabled={uploading}
                      className='mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50'
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
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                  <input
                    type='email'
                    value={form.email || ''}
                    disabled
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed'
                  />
                  <p className='text-xs text-gray-500 mt-1'>Email cannot be changed</p>
                </div>
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
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                    <input
                      name='phone'
                      value={form.phone || ''}
                      onChange={onChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                      placeholder='Phone number'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Gender</label>
                    <select
                      name='gender'
                      value={form.gender || ''}
                      onChange={onChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    >
                      <option value=''>Select Gender</option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>
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
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Pincode {form.address?.city?.toLowerCase() === 'mumbai' && <span className='text-red-600'>*</span>}
                    </label>
                    <input
                      name='address.zipcode'
                      value={form.address?.zipcode || ''}
                      onChange={onChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${pincodeError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                      placeholder='Pincode'
                    />
                    {pincodeError && <p className='text-red-600 text-xs mt-1'>{pincodeError}</p>}
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

            {/* Action Buttons */}
            <div className='flex gap-3 sticky bottom-0 bg-white p-4 border-t border-gray-200 rounded-lg'>
              <button
                type='submit'
                disabled={loading}
                className='px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Saving...' : '💾 Save Changes'}
              </button>
              <button
                type='button'
                onClick={handleCancel}
                className='px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition'
              >
                ✕ Cancel
              </button>
            </div>
          </form>
        ) : (
          // View Mode
          <div className='space-y-8'>
            
            {/* Profile Photo Section - View */}
            <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Profile Photo</h2>
              <div className='w-32 h-32 rounded-lg bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden'>
                {form.photo ? (
                  <img src={form.photo} alt="Profile" className='w-full h-full object-cover' />
                ) : (
                  <div className='text-center'>
                    <p className='text-gray-400 text-3xl'>📸</p>
                    <p className='text-gray-400 text-xs mt-1'>No photo</p>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Information - View */}
            <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Personal Information</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>Email Address</p>
                  <p className='text-gray-800 font-medium'>{form.email || '-'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>Full Name</p>
                  <p className='text-gray-800 font-medium'>{form.name || '-'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>Phone Number</p>
                  <p className='text-gray-800 font-medium'>{form.phone || '-'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>Gender</p>
                  <p className='text-gray-800 font-medium'>{form.gender || '-'}</p>
                </div>
              </div>
            </div>

            {/* Address Information - View */}
            <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-800 mb-4'>Address</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>Street Address</p>
                  <p className='text-gray-800 font-medium'>{form.address?.street || '-'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>City</p>
                  <p className='text-gray-800 font-medium'>{form.address?.city || '-'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>State</p>
                  <p className='text-gray-800 font-medium'>{form.address?.state || '-'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>Pincode</p>
                  <p className='text-gray-800 font-medium'>{form.address?.zipcode || '-'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>Country</p>
                  <p className='text-gray-800 font-medium'>{form.address?.country || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
