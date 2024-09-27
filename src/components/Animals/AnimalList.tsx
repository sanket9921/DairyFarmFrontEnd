import React, { useEffect, useState } from 'react';
import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { Animal, AnimalDB } from '../../types/animal';
import { deleteAnimal, getAnimalsByUserId } from '../../services/animalService';
import { Link, useNavigate } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa'; // Import 3 dots icon (use any icon library)

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
];

export default function AnimalList() {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState<AnimalDB[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  useEffect(() => {
    // Fetch animals for this user
    getAnimalsByUserId(1).then((data) => {
      // Assuming userId is 1 here
      setAnimals(data);
    }).catch((error) => {
      console.error('Error fetching animals: ', error);
    });

    // Close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-menu')) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click event
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this animal?');
    if (confirmDelete) {
      try {
        await deleteAnimal(id);
        alert('Animal deleted successfully');
        // Refresh the animal list or update UI as necessary
        setAnimals((prevAnimals) => prevAnimals.filter(animal => animal.id !== id));

      } catch (error) {
        console.error('Error deleting the animal:', error);
        alert('Error deleting the animal');
      }
    }
  };

  const handleRowClick = (id: number | undefined) => {
    if (id) {
      navigate(`/animal/${id}`);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        List of all Animals
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tag Number
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Breed
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Gender
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date Of Birth
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
          </div>
        </div>

        {animals.map((animal, index) => (
          <div
            key={animal.id}
            className="grid grid-cols-4 sm:grid-cols-6 border-b border-stroke dark:border-strokedark hover:bg-gray-3 dark:hover:bg-meta-4 cursor-pointer"
            onClick={() => handleRowClick(animal.id)}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5 ">
              <div className="flex-shrink-0">
                <img src={animal.imageUrl} height={100} width={100} alt={animal.tagNumber} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {animal.tagNumber}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{animal.breed}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{animal.gender}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{animal.status}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{animal.dateOfBirth}</p>
            </div>

            <div className="relative flex items-center justify-center p-2.5 xl:p-5 dropdown-menu">
              {/* Menu Icon */}
              <button onClick={(e) => toggleDropdown(index, e)}>
                <FaEllipsisV className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" />
              </button>

              {/* Dropdown */}
              {dropdownVisible === index && (
                <div className="absolute right-0 z-[100] mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-boxdark">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link
                      to={`/editanimal/${animal.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-meta-4"
                      role="menuitem"
                      onClick={(e) => e.stopPropagation()} // Stop row click when navigating
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleDelete(animal.id!);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-meta-4"
                      role="menuitem"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
