import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createAnimal, updateAnimal, getAnimalById } from "../../services/animalService";
import { Animal } from '../../types/animal';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import userSix from '../../images/user/user-06.png'; // Default image placeholder

const initialAnimalState: Animal = {
  user_id: 1,
  tagNumber: '',
  breed: '',
  dateOfBirth: '',
  gender: 'MALE',
};

const AnimalForm: React.FC = () => {
  const [animal, setAnimal] = useState<Animal>(initialAnimalState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
  const { id } = useParams<{ id: string }>(); // Get `id` from route params
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch animal data if id exists (for editing)
      getAnimalById(parseInt(id)).then((data) => {
        setAnimal(data);
        if (data.imageUrl) {
          setImagePreview(data.imageUrl); // Set image preview from existing animal data
        }
      });
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAnimal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview of the selected image
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      // Update existing animal
      updateAnimal(parseInt(id), animal, imageFile).then(() => {
        navigate('/');
      });
    } else {
      // Create new animal
      if (imageFile) {
        createAnimal(animal, imageFile, 1).then(() => {
          navigate('/');
        });
      }
    }
  };

  return (
    <div>
      <Breadcrumb pageName={id ? 'Edit Animal' : 'Add Animal'} />
      
      <form onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Animal Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        {/* Image Preview */}
        <div className="flex justify-center mb-4.5">
          <img
            src={imagePreview || userSix} // Display selected image or a default placeholder
            alt="Animal Preview"
            className="w-40 h-40 object-cover rounded"
          />
        </div>

        {/* Tag Number */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Tag Number <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="tagNumber"
            value={animal.tagNumber}
            onChange={handleChange}
            placeholder="Enter Tag Number"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          />
        </div>

        {/* Breed */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Breed <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="breed"
            value={animal.breed}
            onChange={handleChange}
            placeholder="Enter Breed"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Date of Birth <span className="text-meta-1">*</span>
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={animal.dateOfBirth}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Gender <span className="text-meta-1">*</span>
          </label>
          <select
            name="gender"
            value={animal.gender}
            onChange={handleChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          >
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          {id ? 'Update Animal' : 'Create Animal'}
        </button>
      </form>
    </div>
  );
};

export default AnimalForm;
