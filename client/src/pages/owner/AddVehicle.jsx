import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddVehicle = () => {

  const { axios, currency } = useAppContext()

  const [image, setImage] = useState(null)
  const [vehicle, setVehicle] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('vehicleData', JSON.stringify(vehicle))

      const { data } = await axios.post('/api/owner/add-vehicle', formData)

      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setVehicle({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>

      <Title 
        title="Add New Vehicle" 
        subTitle="Fill in details to list a new vehicle for booking, including pricing, availability, and vehicle specifications."
      />

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

        {/* Vehicle Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="vehicle-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer'/>
            <input type="file" id="vehicle-image" accept="image/*" hidden onChange={e => setImage(e.target.files[0])}/>
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your vehicle</p>
        </div>

        {/* Vehicle Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input 
              type="text" 
              placeholder="e.g. Hero, Honda, Royal Enfield..." 
              required 
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
              value={vehicle.brand} 
              onChange={e => setVehicle({ ...vehicle, brand: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Model</label>
            <input 
              type="text" 
              placeholder="e.g. Splendor, Activa, Hunter..." 
              required 
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
              value={vehicle.model} 
              onChange={e => setVehicle({ ...vehicle, model: e.target.value })}
            />
          </div>
        </div>

        {/* Vehicle Year, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input 
              type="number" 
              placeholder="2025" 
              required 
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
              value={vehicle.year} 
              onChange={e => setVehicle({ ...vehicle, year: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input 
              type="number" 
              placeholder="100" 
              required 
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
              value={vehicle.pricePerDay} 
              onChange={e => setVehicle({ ...vehicle, pricePerDay: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Category</label>
            <select 
              onChange={e => setVehicle({ ...vehicle, category: e.target.value })} 
              value={vehicle.category} 
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a category</option>
              <option value="Bike">Bike</option>
              <option value="Scooty">Scooty</option>
            </select>
          </div>
        </div>

        {/* Fuel Type & Seating Capacity */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Fuel Type</label>
            <select 
              onChange={e => setVehicle({ ...vehicle, fuel_type: e.target.value })} 
              value={vehicle.fuel_type} 
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Seating Capacity</label>
            <input 
              type="number" 
              placeholder="2" 
              required 
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
              value={vehicle.seating_capacity} 
              onChange={e => setVehicle({ ...vehicle, seating_capacity: e.target.value })}
            />
          </div>
        </div>

        {/* Vehicle Location */}
        <div className='flex flex-col w-full'>
          <label>Location</label>
          <select 
            onChange={e => setVehicle({ ...vehicle, location: e.target.value })} 
            value={vehicle.location} 
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
          >
            <option value="">Select a location</option>
            <option value="Bhubaneswar">Bhubaneswar</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
          </select>
        </div>

        {/* Vehicle Description */}
        <div className='flex flex-col w-full'>
          <label>Description</label>
          <textarea 
            rows={5} 
            placeholder="e.g. A smooth bullet with a powerful engine." 
            required 
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
            value={vehicle.description} 
            onChange={e => setVehicle({ ...vehicle, description: e.target.value })}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'
        >
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your Vehicle'}
        </button>

      </form>

    </div>
  )
}

export default AddVehicle