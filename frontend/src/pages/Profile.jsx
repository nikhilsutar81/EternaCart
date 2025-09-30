import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: {}, photo: '' });
  const [imageFile, setImageFile] = useState(null);

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

  const onFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let photoUrl = form.photo;
      if (imageFile) {
        const data = new FormData();
        data.append('file', imageFile);
        data.append('upload_preset', 'unsigned');
        // If you have cloudinary upload endpoint in backend, call that instead. For now assume frontend can send file to /api/upload (not implemented)
        const uploadResp = await axios.post(backendUrl + '/api/upload', data, { headers: { token } });
        if (uploadResp.data.success) photoUrl = uploadResp.data.url;
      }

      const payload = { userId: '', name: form.name, phone: form.phone, address: form.address, photo: photoUrl };
      // userId is injected by auth middleware on backend, so we send empty body but auth middleware will add userId
      const resp = await axios.post(backendUrl + '/api/user/profile/update', payload, { headers: { token } });
      if (resp.data.success) {
        toast.success('Profile updated');
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
    <div className='pt-16'>
      <h2 className='text-2xl mb-4'>My Profile</h2>
      <form onSubmit={onSubmit} className='max-w-xl'>
        <div className='mb-3'>
          <label className='block mb-1'>Name</label>
          <input name='name' value={form.name || ''} onChange={onChange} className='w-full border px-3 py-2' />
        </div>
        <div className='mb-3'>
          <label className='block mb-1'>Phone</label>
          <input name='phone' value={form.phone || ''} onChange={onChange} className='w-full border px-3 py-2' />
        </div>
        <div className='mb-3'>
          <label className='block mb-1'>Street</label>
          <input name='address.street' value={form.address?.street || ''} onChange={onChange} className='w-full border px-3 py-2' />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <input name='address.city' value={form.address?.city || ''} onChange={onChange} className='w-full border px-3 py-2' placeholder='City' />
          <input name='address.state' value={form.address?.state || ''} onChange={onChange} className='w-full border px-3 py-2' placeholder='State' />
        </div>
        <div className='grid grid-cols-2 gap-3 mt-3'>
          <input name='address.zipcode' value={form.address?.zipcode || ''} onChange={onChange} className='w-full border px-3 py-2' placeholder='Zipcode' />
          <input name='address.country' value={form.address?.country || ''} onChange={onChange} className='w-full border px-3 py-2' placeholder='Country' />
        </div>
        <div className='mb-3 mt-3'>
          <label className='block mb-1'>Photo</label>
          <input type='file' onChange={onFileChange} />
          {form.photo && <img src={form.photo} alt='profile' className='w-24 mt-2' />}
        </div>
        <button disabled={loading} className='bg-black text-white px-4 py-2 mt-3'>Save</button>
      </form>
    </div>
  );
}

export default Profile;
