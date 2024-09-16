import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import cooperImage from '../images/cooper.png';
import shadowImage from '../images/shadow.png';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import '../styles/HouseReg.css';

const translations = {
  en: {
    home: "Home",
    about: "About Us",
    tenant: "Tenant",
    landlord: "Landlord",
    forLandlord: "For the Landlord",
    regLog: "Registration / Login",
  },
  ua: {
    home: "Головна",
    about: "Про нас",
    tenant: "Орендар",
    landlord: "Орендодавець",
    forLandlord: "Для орендодавця",
    regLog: "Реєстрація / Авторизація",
  }
};

const HouseReg = () => {
  const { token, user } = useAuth();
  const [budget, setBudget] = useState(500);
  const [language, setLanguage] = useState('en');
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role === 'Tenant') {
      navigate('/');
    }
  }, [user]);

  const increment = (setter) => setter(prev => prev + 1);
  const decrement = (setter, value) => setter(prev => (prev > 0 ? prev - 1 : prev));

  const [uploadedFiles, setUploadedFiles] = useState({
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
    photo5: null,
    video: null,
  });
  
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const [formData, setFormData] = useState({
    objectName: '',
    category: '',
    peopleCount: '',
    rentalTerm: '',
    country: '',
    city: '',
    address: '',
    totalArea: '',
    livingSpace: '',
    kitchenSpace: '',
    floors: '',
    terrace: '',
    price: '',
    description: '',
    heating: '',
    classType: '',
    rooms: '',
    wallMaterial: '',
  });

  const [showMoreMaterials, setShowMoreMaterials] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleButtonClick = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleMore = () => {
    setShowMoreMaterials(!showMoreMaterials);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Отправка данных жилья на сервер...');
    // Устанавливаем дефолтные значения
    const defaultData = {
      objectName: formData.objectName || 'Default Name',
      objectCategory: formData.objectCategory || 'Apartment',
      numberOfPeople: formData.numberOfPeople || 1,
      termRental: formData.termRental || 'Long-term',
      country: formData.country || 'USA',
      city: formData.city || 'Miami',
      address: formData.address || 'Unknown Address',
      class: formData.class || 'Standard',
      rooms: formData.rooms || 1,
      wallMaterial: formData.wallMaterial || 'Concrete',
      totalArea: formData.totalArea || 100.0,
      livingSpace: formData.livingSpace || 80.0,
      kitchenArea: formData.kitchenArea || 15.0,
      totalFloors: formData.totalFloors || 1,
      terraceArea: formData.terraceArea || 10.0,
      heating: formData.heating || 'Centralized',
      price: formData.price || 1000.0,
      description: formData.description || 'No description provided',
      propertyDetails: {
        dateOfPosting: new Date().toISOString(),
        yearOfConstruction: 2020,
        renovationDesign: 'Modern',
        airConditioning: true,
        noPrepayment: true,
        basedOnGuestReviews: false,
        swimmingPool: false,
        seaView: false,
        beachfront: false,
        breakfastIncluded: false,
        nonSmokingRooms: true,
        familyRooms: true,
        petsAllowed: true,
        parking: true,
        freeWiFi: true,
        airportShuttle: false,
        frontDesk24Hour: false,
        spaAndWellnessCentre: false,
        fitnessCentre: false,
        restaurant: false,
        roomService: false,
        electricVehicleChargingStation: false,
        wheelchairAccessible: false,
        generator: false,
        balcony: true,
        kitchenOrKitchenette: true,
        privateBathroom: true,
        tv: true,
        terrace: true,
        refrigerator: true,
        electricKettle: true,
        starRating: 3,
        distanceFromCentreKm: 5.0,
        maestroHotels: false,
        ribasHotelsGroup: false,
        optimaHotelsAndResorts: false,
        dreamHostels: false,
        bedroomsCount: 1,
        bedsCount: 2,
        bathroomsCount: 1,
        newBuildings: false,
        noCommission: false,
        withFotos: false,
        freeAccommodation: false
      }
    };
  
    try {
      const response = await fetch('http://localhost:5206/api/Properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...defaultData,
          numberOfPeople: parseInt(defaultData.numberOfPeople, 10),
          totalArea: parseFloat(defaultData.totalArea),
          livingSpace: parseFloat(defaultData.livingSpace),
          kitchenArea: parseFloat(defaultData.kitchenArea),
          totalFloors: parseInt(defaultData.totalFloors, 10),
          terraceArea: parseFloat(defaultData.terraceArea),
          price: parseFloat(defaultData.price),
          rooms: parseInt(defaultData.rooms, 10),
        }),
      });

      if (response.ok) {
        console.log('Жилье успешно создано');
        const searchResponse = await fetch(`http://localhost:5206/api/Properties/searchByObjectName?objectName=${formData.objectName}&pageNumber=1&pageSize=10`);
        const searchData = await searchResponse.json();
        const propertyId = searchData.$values[0]?.propertyId;
  
        console.log('Получен идентификатор жилья:', propertyId);

        if (!propertyId) {
        console.error('Не удалось получить идентификатор жилья');
        return;
        }
        console.log('Загруженные файлы:', uploadedFiles);
        // Загрузка файлов
      for (let i = 1; i <= 5; i++) {
        const photoFile = uploadedFiles[`photo${i}`];
        if (photoFile) {
          console.log(`Загрузка photo${i}...`);
          await uploadFile(photoFile, propertyId, 'photo');
        }
      }
      if (uploadedFiles.video1) {
        console.log('Загрузка video1...');
        await uploadFile(uploadedFiles.video1, propertyId, 'video');
      }
      console.log('Все файлы успешно загружены');
    } else {
      console.error('Не удалось отправить данные жилья');
      const errorText = await response.text();
      console.error('Ответ ошибки:', errorText);
    }
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
  }
};

const uploadFile = async (file, propertyId, type) => {
  console.log(`Начата загрузка ${type} для жилья с ID ${propertyId}`);
  const formData = new FormData();
  formData.append('File', file); // Используем 'File' с заглавной буквы
  formData.append('PropertyId', propertyId);

  try {
    const response = await fetch('http://localhost:5206/Auth/uploadMediaandImage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log(`${type} успешно загружен`);
    } else {
      console.error(`Не удалось загрузить ${type}`);
      const errorText = await response.text();
      console.error('Ответ ошибки:', errorText);
    }
  } catch (error) {
    console.error(`Ошибка при загрузке ${type}:`, error);
  }
};

  const handleFileUpload = (e, type, index) => {
    const file = e.target.files[0];
    console.log(`Выбран файл для ${type}${index}:`, file);
    setUploadedFiles((prev) => ({
      ...prev,
      [`${type}${index}`]: file,
    }));
  };

  const renderButtonContent = (type, index) => {
    const file = uploadedFiles[`${type}${index}`];
  
    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (type === 'photo') {
        return <img src={fileURL} alt={`upload-${type}-${index}`} />;
      }
      if (type === 'video') {
        return <video src={fileURL} controls />;
      }
    }
  
    const photoIcon = (
      <svg width="128" height="172" viewBox="0 0 128 172" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="30" fill="#C2C1C1" fill-opacity="0.75"/>
      <path d="M107 100.5H22L43.5 73L58.5 90.5L80 64L107 100.5Z" fill="#FAFAFA"/>
      <path d="M16.358 167H14.5114L19.8523 152.455H21.6705L27.0114 167H25.1648L20.8182 154.756H20.7045L16.358 167ZM17.0398 161.318H24.483V162.881H17.0398V161.318ZM33.169 167.227C32.2599 167.227 31.4574 166.998 30.7614 166.538C30.0653 166.074 29.5208 165.421 29.1278 164.578C28.7348 163.731 28.5384 162.729 28.5384 161.574C28.5384 160.428 28.7348 159.434 29.1278 158.591C29.5208 157.748 30.0677 157.097 30.7685 156.638C31.4692 156.179 32.2789 155.949 33.1974 155.949C33.9077 155.949 34.4688 156.067 34.8807 156.304C35.2973 156.536 35.6146 156.801 35.8324 157.099C36.0549 157.393 36.2277 157.634 36.3509 157.824H36.4929V152.455H38.169V167H36.5497V165.324H36.3509C36.2277 165.523 36.0526 165.774 35.8253 166.077C35.598 166.375 35.2737 166.643 34.8523 166.879C34.4309 167.111 33.8698 167.227 33.169 167.227ZM33.3963 165.722C34.0687 165.722 34.6368 165.546 35.1009 165.196C35.5649 164.841 35.9176 164.351 36.1591 163.726C36.4006 163.096 36.5213 162.369 36.5213 161.545C36.5213 160.731 36.4029 160.018 36.1662 159.408C35.9295 158.792 35.5791 158.314 35.1151 157.973C34.651 157.627 34.0781 157.455 33.3963 157.455C32.6861 157.455 32.0942 157.637 31.6207 158.001C31.152 158.361 30.7992 158.851 30.5625 159.472C30.3305 160.087 30.2145 160.778 30.2145 161.545C30.2145 162.322 30.3329 163.027 30.5696 163.662C30.8111 164.292 31.1662 164.794 31.6349 165.168C32.1084 165.537 32.6955 165.722 33.3963 165.722ZM45.5909 167.227C44.6818 167.227 43.8793 166.998 43.1832 166.538C42.4872 166.074 41.9427 165.421 41.5497 164.578C41.1567 163.731 40.9602 162.729 40.9602 161.574C40.9602 160.428 41.1567 159.434 41.5497 158.591C41.9427 157.748 42.4896 157.097 43.1903 156.638C43.8911 156.179 44.7008 155.949 45.6193 155.949C46.3295 155.949 46.8906 156.067 47.3026 156.304C47.7192 156.536 48.0365 156.801 48.2543 157.099C48.4768 157.393 48.6496 157.634 48.7727 157.824H48.9148V152.455H50.5909V167H48.9716V165.324H48.7727C48.6496 165.523 48.4744 165.774 48.2472 166.077C48.0199 166.375 47.6955 166.643 47.2741 166.879C46.8527 167.111 46.2917 167.227 45.5909 167.227ZM45.8182 165.722C46.4905 165.722 47.0587 165.546 47.5227 165.196C47.9867 164.841 48.3395 164.351 48.581 163.726C48.8224 163.096 48.9432 162.369 48.9432 161.545C48.9432 160.731 48.8248 160.018 48.5881 159.408C48.3513 158.792 48.0009 158.314 47.5369 157.973C47.0729 157.627 46.5 157.455 45.8182 157.455C45.108 157.455 44.5161 157.637 44.0426 158.001C43.5739 158.361 43.2211 158.851 42.9844 159.472C42.7524 160.087 42.6364 160.778 42.6364 161.545C42.6364 162.322 42.7547 163.027 42.9915 163.662C43.233 164.292 43.5881 164.794 44.0568 165.168C44.5303 165.537 45.1174 165.722 45.8182 165.722ZM59.5185 171.091V156.091H61.1378V157.824H61.3366C61.4598 157.634 61.6302 157.393 61.848 157.099C62.0705 156.801 62.3878 156.536 62.7997 156.304C63.2164 156.067 63.7798 155.949 64.4901 155.949C65.4086 155.949 66.2183 156.179 66.919 156.638C67.6198 157.097 68.1667 157.748 68.5597 158.591C68.9527 159.434 69.1491 160.428 69.1491 161.574C69.1491 162.729 68.9527 163.731 68.5597 164.578C68.1667 165.421 67.6222 166.074 66.9261 166.538C66.2301 166.998 65.4276 167.227 64.5185 167.227C63.8177 167.227 63.2566 167.111 62.8352 166.879C62.4138 166.643 62.0895 166.375 61.8622 166.077C61.6349 165.774 61.4598 165.523 61.3366 165.324H61.1946V171.091H59.5185ZM61.1662 161.545C61.1662 162.369 61.2869 163.096 61.5284 163.726C61.7699 164.351 62.1226 164.841 62.5866 165.196C63.0507 165.546 63.6188 165.722 64.2912 165.722C64.992 165.722 65.5767 165.537 66.0455 165.168C66.5189 164.794 66.8741 164.292 67.1108 163.662C67.3523 163.027 67.473 162.322 67.473 161.545C67.473 160.778 67.3546 160.087 67.1179 159.472C66.8859 158.851 66.5331 158.361 66.0597 158.001C65.5909 157.637 65.0014 157.455 64.2912 157.455C63.6094 157.455 63.0365 157.627 62.5724 157.973C62.1084 158.314 61.758 158.792 61.5213 159.408C61.2846 160.018 61.1662 160.731 61.1662 161.545ZM73.3821 160.438V167H71.706V152.455H73.3821V157.795H73.5241C73.7798 157.232 74.1634 156.785 74.6747 156.453C75.1908 156.117 75.8774 155.949 76.7344 155.949C77.4777 155.949 78.1288 156.098 78.6875 156.396C79.2462 156.69 79.6795 157.142 79.9872 157.753C80.2997 158.359 80.456 159.131 80.456 160.068V167H78.7798V160.182C78.7798 159.315 78.5549 158.645 78.1051 158.172C77.66 157.694 77.0421 157.455 76.2514 157.455C75.7022 157.455 75.2098 157.571 74.7741 157.803C74.3433 158.035 74.0024 158.373 73.7514 158.818C73.5052 159.263 73.3821 159.803 73.3821 160.438ZM87.9542 167.227C86.9693 167.227 86.1052 166.993 85.3619 166.524C84.6232 166.055 84.0456 165.4 83.6289 164.557C83.217 163.714 83.011 162.729 83.011 161.602C83.011 160.466 83.217 159.474 83.6289 158.626C84.0456 157.779 84.6232 157.121 85.3619 156.652C86.1052 156.183 86.9693 155.949 87.9542 155.949C88.939 155.949 89.8008 156.183 90.5394 156.652C91.2828 157.121 91.8604 157.779 92.2724 158.626C92.689 159.474 92.8974 160.466 92.8974 161.602C92.8974 162.729 92.689 163.714 92.2724 164.557C91.8604 165.4 91.2828 166.055 90.5394 166.524C89.8008 166.993 88.939 167.227 87.9542 167.227ZM87.9542 165.722C88.7023 165.722 89.3178 165.53 89.8008 165.146C90.2837 164.763 90.6412 164.259 90.8732 163.634C91.1052 163.009 91.2212 162.331 91.2212 161.602C91.2212 160.873 91.1052 160.194 90.8732 159.564C90.6412 158.934 90.2837 158.425 89.8008 158.037C89.3178 157.649 88.7023 157.455 87.9542 157.455C87.2061 157.455 86.5906 157.649 86.1076 158.037C85.6246 158.425 85.2672 158.934 85.0352 159.564C84.8031 160.194 84.6871 160.873 84.6871 161.602C84.6871 162.331 84.8031 163.009 85.0352 163.634C85.2672 164.259 85.6246 164.763 86.1076 165.146C86.5906 165.53 87.2061 165.722 87.9542 165.722ZM100.2 156.091V157.511H94.5469V156.091H100.2ZM96.1946 153.477H97.8707V163.875C97.8707 164.348 97.9394 164.704 98.0767 164.94C98.2188 165.172 98.3987 165.329 98.6165 165.409C98.839 165.485 99.0734 165.523 99.3196 165.523C99.5043 165.523 99.6558 165.513 99.7741 165.494C99.8925 165.471 99.9872 165.452 100.058 165.438L100.399 166.943C100.286 166.986 100.127 167.028 99.9233 167.071C99.7197 167.118 99.4616 167.142 99.1491 167.142C98.6757 167.142 98.2116 167.04 97.7571 166.837C97.3073 166.633 96.9332 166.323 96.6349 165.906C96.3414 165.49 96.1946 164.964 96.1946 164.33V153.477ZM107.036 167.227C106.051 167.227 105.187 166.993 104.444 166.524C103.705 166.055 103.128 165.4 102.711 164.557C102.299 163.714 102.093 162.729 102.093 161.602C102.093 160.466 102.299 159.474 102.711 158.626C103.128 157.779 103.705 157.121 104.444 156.652C105.187 156.183 106.051 155.949 107.036 155.949C108.021 155.949 108.883 156.183 109.621 156.652C110.365 157.121 110.942 157.779 111.354 158.626C111.771 159.474 111.979 160.466 111.979 161.602C111.979 162.729 111.771 163.714 111.354 164.557C110.942 165.4 110.365 166.055 109.621 166.524C108.883 166.993 108.021 167.227 107.036 167.227ZM107.036 165.722C107.784 165.722 108.4 165.53 108.883 165.146C109.366 164.763 109.723 164.259 109.955 163.634C110.187 163.009 110.303 162.331 110.303 161.602C110.303 160.873 110.187 160.194 109.955 159.564C109.723 158.934 109.366 158.425 108.883 158.037C108.4 157.649 107.784 157.455 107.036 157.455C106.288 157.455 105.673 157.649 105.19 158.037C104.707 158.425 104.349 158.934 104.117 159.564C103.885 160.194 103.769 160.873 103.769 161.602C103.769 162.331 103.885 163.009 104.117 163.634C104.349 164.259 104.707 164.763 105.19 165.146C105.673 165.53 106.288 165.722 107.036 165.722Z" fill="#545E4B"/>
      </svg>
    );
  
    const videoIcon = (
      <svg width="128" height="168" viewBox="0 0 128 168" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="30" fill="#C2C1C1" fill-opacity="0.75"/>
      <path d="M18.358 167H16.5114L21.8523 152.455H23.6705L29.0114 167H27.1648L22.8182 154.756H22.7045L18.358 167ZM19.0398 161.318H26.483V162.881H19.0398V161.318ZM35.169 167.227C34.2599 167.227 33.4574 166.998 32.7614 166.538C32.0653 166.074 31.5208 165.421 31.1278 164.578C30.7348 163.731 30.5384 162.729 30.5384 161.574C30.5384 160.428 30.7348 159.434 31.1278 158.591C31.5208 157.748 32.0677 157.097 32.7685 156.638C33.4692 156.179 34.2789 155.949 35.1974 155.949C35.9077 155.949 36.4688 156.067 36.8807 156.304C37.2973 156.536 37.6146 156.801 37.8324 157.099C38.0549 157.393 38.2277 157.634 38.3509 157.824H38.4929V152.455H40.169V167H38.5497V165.324H38.3509C38.2277 165.523 38.0526 165.774 37.8253 166.077C37.598 166.375 37.2737 166.643 36.8523 166.879C36.4309 167.111 35.8698 167.227 35.169 167.227ZM35.3963 165.722C36.0687 165.722 36.6368 165.546 37.1009 165.196C37.5649 164.841 37.9176 164.351 38.1591 163.726C38.4006 163.096 38.5213 162.369 38.5213 161.545C38.5213 160.731 38.4029 160.018 38.1662 159.408C37.9295 158.792 37.5791 158.314 37.1151 157.973C36.651 157.627 36.0781 157.455 35.3963 157.455C34.6861 157.455 34.0942 157.637 33.6207 158.001C33.152 158.361 32.7992 158.851 32.5625 159.472C32.3305 160.087 32.2145 160.778 32.2145 161.545C32.2145 162.322 32.3329 163.027 32.5696 163.662C32.8111 164.292 33.1662 164.794 33.6349 165.168C34.1084 165.537 34.6955 165.722 35.3963 165.722ZM47.5909 167.227C46.6818 167.227 45.8793 166.998 45.1832 166.538C44.4872 166.074 43.9427 165.421 43.5497 164.578C43.1567 163.731 42.9602 162.729 42.9602 161.574C42.9602 160.428 43.1567 159.434 43.5497 158.591C43.9427 157.748 44.4896 157.097 45.1903 156.638C45.8911 156.179 46.7008 155.949 47.6193 155.949C48.3295 155.949 48.8906 156.067 49.3026 156.304C49.7192 156.536 50.0365 156.801 50.2543 157.099C50.4768 157.393 50.6496 157.634 50.7727 157.824H50.9148V152.455H52.5909V167H50.9716V165.324H50.7727C50.6496 165.523 50.4744 165.774 50.2472 166.077C50.0199 166.375 49.6955 166.643 49.2741 166.879C48.8527 167.111 48.2917 167.227 47.5909 167.227ZM47.8182 165.722C48.4905 165.722 49.0587 165.546 49.5227 165.196C49.9867 164.841 50.3395 164.351 50.581 163.726C50.8224 163.096 50.9432 162.369 50.9432 161.545C50.9432 160.731 50.8248 160.018 50.5881 159.408C50.3513 158.792 50.0009 158.314 49.5369 157.973C49.0729 157.627 48.5 157.455 47.8182 157.455C47.108 157.455 46.5161 157.637 46.0426 158.001C45.5739 158.361 45.2211 158.851 44.9844 159.472C44.7524 160.087 44.6364 160.778 44.6364 161.545C44.6364 162.322 44.7547 163.027 44.9915 163.662C45.233 164.292 45.5881 164.794 46.0568 165.168C46.5303 165.537 47.1174 165.722 47.8182 165.722ZM70.4389 156.091L66.4048 167H64.7003L60.6662 156.091H62.4844L65.4957 164.784H65.6094L68.6207 156.091H70.4389ZM72.6513 167V156.091H74.3274V167H72.6513ZM73.5036 154.273C73.1768 154.273 72.8951 154.161 72.6584 153.939C72.4264 153.716 72.3104 153.449 72.3104 153.136C72.3104 152.824 72.4264 152.556 72.6584 152.334C72.8951 152.111 73.1768 152 73.5036 152C73.8303 152 74.1096 152.111 74.3416 152.334C74.5784 152.556 74.6967 152.824 74.6967 153.136C74.6967 153.449 74.5784 153.716 74.3416 153.939C74.1096 154.161 73.8303 154.273 73.5036 154.273ZM81.5167 167.227C80.6076 167.227 79.805 166.998 79.109 166.538C78.413 166.074 77.8685 165.421 77.4755 164.578C77.0825 163.731 76.886 162.729 76.886 161.574C76.886 160.428 77.0825 159.434 77.4755 158.591C77.8685 157.748 78.4154 157.097 79.1161 156.638C79.8169 156.179 80.6265 155.949 81.5451 155.949C82.2553 155.949 82.8164 156.067 83.2283 156.304C83.645 156.536 83.9622 156.801 84.18 157.099C84.4026 157.393 84.5754 157.634 84.6985 157.824H84.8406V152.455H86.5167V167H84.8974V165.324H84.6985C84.5754 165.523 84.4002 165.774 84.1729 166.077C83.9457 166.375 83.6213 166.643 83.1999 166.879C82.7785 167.111 82.2174 167.227 81.5167 167.227ZM81.744 165.722C82.4163 165.722 82.9845 165.546 83.4485 165.196C83.9125 164.841 84.2653 164.351 84.5067 163.726C84.7482 163.096 84.869 162.369 84.869 161.545C84.869 160.731 84.7506 160.018 84.5138 159.408C84.2771 158.792 83.9267 158.314 83.4627 157.973C82.9987 157.627 82.4258 157.455 81.744 157.455C81.0337 157.455 80.4419 157.637 79.9684 158.001C79.4996 158.361 79.1469 158.851 78.9102 159.472C78.6781 160.087 78.5621 160.778 78.5621 161.545C78.5621 162.322 78.6805 163.027 78.9173 163.662C79.1587 164.292 79.5138 164.794 79.9826 165.168C80.4561 165.537 81.0432 165.722 81.744 165.722ZM94.3931 167.227C93.342 167.227 92.4353 166.995 91.6729 166.531C90.9154 166.062 90.3306 165.409 89.9187 164.571C89.5115 163.728 89.3079 162.748 89.3079 161.631C89.3079 160.513 89.5115 159.528 89.9187 158.676C90.3306 157.819 90.9035 157.152 91.6374 156.673C92.3761 156.19 93.2378 155.949 94.2227 155.949C94.7908 155.949 95.3519 156.044 95.9059 156.233C96.4599 156.422 96.9641 156.73 97.4187 157.156C97.8732 157.578 98.2354 158.136 98.5053 158.832C98.7752 159.528 98.9102 160.385 98.9102 161.403V162.114H90.5011V160.665H97.2056C97.2056 160.049 97.0825 159.5 96.8363 159.017C96.5948 158.534 96.2492 158.153 95.7994 157.874C95.3543 157.594 94.8287 157.455 94.2227 157.455C93.555 157.455 92.9774 157.62 92.4897 157.952C92.0067 158.278 91.6351 158.705 91.3746 159.23C91.1142 159.756 90.984 160.319 90.984 160.92V161.886C90.984 162.71 91.1261 163.409 91.4102 163.982C91.699 164.55 92.0991 164.983 92.6104 165.281C93.1218 165.575 93.716 165.722 94.3931 165.722C94.8335 165.722 95.2312 165.66 95.5863 165.537C95.9461 165.409 96.2563 165.22 96.5167 164.969C96.7771 164.713 96.9783 164.396 97.1204 164.017L98.7397 164.472C98.5692 165.021 98.2828 165.504 97.8803 165.92C97.4779 166.332 96.9807 166.654 96.3888 166.886C95.797 167.114 95.1317 167.227 94.3931 167.227ZM105.892 167.227C104.907 167.227 104.043 166.993 103.299 166.524C102.561 166.055 101.983 165.4 101.566 164.557C101.154 163.714 100.949 162.729 100.949 161.602C100.949 160.466 101.154 159.474 101.566 158.626C101.983 157.779 102.561 157.121 103.299 156.652C104.043 156.183 104.907 155.949 105.892 155.949C106.877 155.949 107.738 156.183 108.477 156.652C109.22 157.121 109.798 157.779 110.21 158.626C110.627 159.474 110.835 160.466 110.835 161.602C110.835 162.729 110.627 163.714 110.21 164.557C109.798 165.4 109.22 166.055 108.477 166.524C107.738 166.993 106.877 167.227 105.892 167.227ZM105.892 165.722C106.64 165.722 107.255 165.53 107.738 165.146C108.221 164.763 108.579 164.259 108.811 163.634C109.043 163.009 109.159 162.331 109.159 161.602C109.159 160.873 109.043 160.194 108.811 159.564C108.579 158.934 108.221 158.425 107.738 158.037C107.255 157.649 106.64 157.455 105.892 157.455C105.144 157.455 104.528 157.649 104.045 158.037C103.562 158.425 103.205 158.934 102.973 159.564C102.741 160.194 102.625 160.873 102.625 161.602C102.625 162.331 102.741 163.009 102.973 163.634C103.205 164.259 103.562 164.763 104.045 165.146C104.528 165.53 105.144 165.722 105.892 165.722Z" fill="#545E4B"/>
      <path d="M97 67L47.5 95.5788L47.5 38.4212L97 67Z" fill="#FAFAFA"/>
      </svg>
    );
  
    return type === 'photo' ? photoIcon : videoIcon;
  };  

  return (
    <div className="house-reg-page">
      <header className="house-reg-header">
        <nav className="navigation">
          <ul className="nav-list">
            <li><a href='/'>{translations[language].home}</a></li>
            <li><a href='/about'>{translations[language].about}</a></li>
            <li><a href='/tenant'>{translations[language].tenant}</a></li>
            <li><a href='/landlord'>{translations[language].landlord}</a></li>
            <li><a href='/for-landlord'>{translations[language].forLandlord}</a></li>
          </ul>
          <div className="logo">
            <svg width="81" height="51" viewBox="0 0 81 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M61.0675 3.457V0.192383H0V50.3138H32.8382L30.9178 46.8572H2.88054V3.457H61.0675Z" fill="#F4F4F4"/>
              <path d="M74.1264 3.26482V0.384277H80.8477V49.5455H47.2414L45.7051 46.857H77.9672V3.26482H74.1264Z" fill="#F4F4F4"/>
              <path d="M71.2448 0H63.9474V21.7001H49.3527V9.21774H41.8633V41.2878H49.3527V27.8452H63.9474V41.2878H71.2448V0Z" fill="#F4F4F4"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M17.4757 41.288H9.41016V9.02588H27.4616C31.4943 9.40995 37.4474 12.4825 37.4474 20.548C37.4474 28.6136 31.1102 30.726 31.1102 30.726L43.7846 49.7375H35.7191L24.0049 32.2623H17.4757V41.288ZM17.0918 14.9789V26.3091H25.7334C28.614 25.733 29.7662 23.7742 29.7662 20.548C29.7662 16.1312 27.0777 15.171 25.3494 14.9789H17.0918Z" fill="#F4F4F4"/>
            </svg>
          </div>
          <div className="nav-right">
            <div className="currency-lang">
              <select className="select-dropdown">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="eur">UAH</option>
              </select>
              <select className="select-dropdown" value={language} onChange={handleLanguageChange}>
                <option value="en">EN</option>
                <option value="ua">UA</option>
              </select>
            </div>
            <button onClick={() => window.location.href='/signin'} className="login">{translations[language].regLog}</button>
          </div>
        </nav>
        <div className="white-strip"></div>
      </header>
      <section className='house-reg-panel'>
        <img src={shadowImage} alt="Shadow" className="shadow" />
        <div className='house-reg-content'>
          <h1>Cooperation</h1>
          <p>Welcome to our home rental website! We are pleased to offer<br/>you a unique opportunity to become part of our community and<br/>get the most out of working with us.</p>
          <img src={cooperImage} alt="Advantages" className="advantages" />
        </div>
        <div className="category-panel">
          <div className="categories">
            <span className="category active">Housing information</span>
            <span className="category">Additional Information</span>
            <span className="category">Posting an ad</span>
          </div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>
      </section>
      <section className="housing-info">
        <div className="info-fields">
          <div className="phone-field">
            <label>Object name</label>
            <input type="text" name="objectName" placeholder="Enter the name of the object" value={formData.objectName} onChange={handleInputChange}/>
          </div>
          <div className="field-group">
            <div className="field">
              <label>Category</label>
              <select name="objectCategory" value={formData.objectCategory} onChange={handleInputChange}>
                <option value="" disabled>Object category</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Hotel">Hotel</option>
                <option value="Hostel">Hostel</option>
                <option value="Couchsurfing">Couchsurfing</option>
              </select>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <input
                name="numberOfPeople"
                type="number"
                placeholder="Number of"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <select name="termRental" value={formData.termRental} onChange={handleInputChange}>
                <option value="">Term rental</option>
                <option value="Long term rental">Long term rental</option>
                <option value="Short term rental">Short term rental</option>
              </select>
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label>Location</label>
              <select name="country" value={formData.country} onChange={handleInputChange}>
                <option value="" disabled>Country</option>
                <option value="Austria">Austria</option>
                <option value="Great Britain">Great Britain</option>
                <option value="Hungary">Hungary</option>
                <option value="Germany">Germany</option>
                <option value="Greece">Greece</option>
                <option value="Denmark">Denmark</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Italy">Italy</option>
                <option value="Canada">Canada</option>
                <option value="Latvia">Latvia</option>
                <option value="Maldives">Maldives</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Poland">Poland</option>
                <option value="Romania">Romania</option>
                <option value="USA">USA</option>
                <option value="Ukraine">Ukraine</option>
                <option value="Czech">Czech</option>
              </select>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <input
                name="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <input
                name="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="map-wrapper">
          <iframe 
            title="Map"
            src="https://www.google.com/maps/embed"
            width="600" 
            height="450" 
            style={{border:0}} 
            allowFullScreen=""
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div className="progress-indicator">
          <div className="circle-progress">
            <div className="percentage">70%</div>
          </div>
          <ul className="progress-list">
            <li className="completed">General information</li>
            <li className="completed">Main settings</li>
            <li className="completed">Price</li>
            <li className="completed">Photo and video</li>
            <li>Description</li>
          </ul>
        </div>
      </section><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <section className="additional-info">
        <div className="tabs">
          <span className="tab">Housing information</span>
          <span className="tab active">Additional Information</span>
          <span className="tab">Posting an ad</span>
        </div>
        <div className="additional-filling">
          <div className="class-home">
            <label>Class</label>
            <div className="button-group">
              <button 
                className={`class-button ${formData.classType === 'Luxury' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('classType', 'Luxury')}
              >
                Luxury
              </button>
              <button 
                className={`class-button ${formData.classType === 'Comfort' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('classType', 'Comfort')}
              >
                Comfort
              </button>
              <button 
                className={`class-button ${formData.classType === 'Standard' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('classType', 'Standard')}
              >
                Standard
              </button>
            </div>
          </div>
          <div className="class-rooms">
            <label>Rooms</label>
            <div className="button-group">
              {[...Array(6).keys()].map((room) => (
                <button 
                  key={room}
                  className={`room-button ${formData.rooms === room + 1 ? 'active' : ''}`} 
                  onClick={() => handleButtonClick('rooms', room + 1)}
                >
                  {room + 1}
                </button>
              ))}
              <button 
                className={`room-button ${formData.rooms === '7+' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('rooms', '7+')}
              >
                7+
              </button>
            </div>
          </div>
          <div className="class-walls">
            <label>Wall material</label>
            <div className="button-group walls">
              <button 
                className={`wall-button ${formData.wallMaterial === 'Ceramic brick' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('wallMaterial', 'Ceramic brick')}
              >
                Ceramic brick
              </button>
              <button 
                className={`wall-button ${formData.wallMaterial === 'Ceramic hollow brick' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('wallMaterial', 'Ceramic hollow brick')}
              >
                Ceramic hollow brick
              </button>
              <button 
                className={`wall-button ${formData.wallMaterial === 'Ceramic block' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('wallMaterial', 'Ceramic block')}
              >
                Ceramic block
              </button>
              <button 
                className={`wall-button ${formData.wallMaterial === 'Sand-lime brick' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('wallMaterial', 'Sand-lime brick')}
              >
                Sand-lime brick
              </button>
              <button 
                className={`wall-button ${formData.wallMaterial === 'Foam block' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('wallMaterial', 'Foam block')}
              >
                Foam block
              </button>
              <button 
                className={`wall-button ${formData.wallMaterial === 'Reinforced concrete panel' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('wallMaterial', 'Reinforced concrete panel')}
              >
                Reinforced concrete panel
              </button>
              {showMoreMaterials && (
                <>
                  <button
                    className={`wall-button-more ${formData.wallMaterial === 'Gas silicate block' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('wallMaterial', 'Gas silicate block')}
                  >
                    Gas silicate block
                  </button>
                  <button
                    className={`wall-button-more ${formData.wallMaterial === 'Expanded clay concrete panel' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('wallMaterial', 'Expanded clay concrete panel')}
                  >
                    Expanded clay concrete panel
                  </button>
                  <button
                    className={`wall-button-more ${formData.wallMaterial === 'Monolithic reinforced concrete' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('wallMaterial', 'Monolithic reinforced concrete')}
                  >
                    Monolithic reinforced concrete
                  </button>
                  <button
                    className={`wall-button-more ${formData.wallMaterial === 'Shell rock' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('wallMaterial', 'Shell rock')}
                  >
                    Shell rock
                  </button>
                  <button
                    className={`wall-button-more ${formData.wallMaterial === 'Metal' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('wallMaterial', 'Metal')}
                  >
                    Metal
                  </button>
                  <button
                    className={`wall-button-more ${formData.wallMaterial === 'Glass' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('wallMaterial', 'Glass')}
                  >
                    Glass
                  </button>
                  <button
                    className={`wall-button-more ${formData.wallMaterial === 'Log house' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('wallMaterial', 'Log house')}
                  >
                    Log house
                  </button>
                  <button
                    className={`wall-button-more ${formData.wallMaterial === 'Wood' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('wallMaterial', 'Wood')}
                  >
                    Wood
                  </button>
                  <button
                    className={`wall-button-more ${formData.wallMaterial === 'Other' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('wallMaterial', 'Other')}
                  >
                    Other
                  </button>
                </>
              )}
            </div>
            <button className="more-walls" onClick={handleToggleMore}>
              {showMoreMaterials ? 'Collapse' : 'More'}
            </button>
          </div><br/>
          <div className="form-fields">
            <div className="input-group">
              <label>Total area, m²</label>
              <input
                name="totalArea"
                type="number"
                placeholder="100"
                value={formData.totalArea}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Living space, m²</label>
              <input
                name="livingSpace"
                type="number"
                placeholder="100"
                value={formData.livingSpace}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Kitchen, m²</label>
              <input
                name="kitchenArea"
                type="number"
                placeholder="10"
                value={formData.kitchenArea}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Total floors/floor</label>
              <input
                name="totalFloors"
                type="number"
                placeholder="1,2,3..."
                value={formData.totalFloors}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Terrace, m²</label>
              <input
                name="terraceArea"
                type="number"
                placeholder="10..."
                value={formData.terraceArea}
                onChange={handleInputChange}
              />
            </div>
          </div><br/>
          <div className="class-heating">
            <label>Heating</label>
            <div className="button-group">
              <button 
                className={`heating-button ${formData.heating === 'Centralized' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('heating', 'Centralized')}
              >
                Centralized
              </button>
              <button 
                className={`heating-button ${formData.heating === 'Individual' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('heating', 'Individual')}
              >
                Individual
              </button>
              <button 
                className={`heating-button ${formData.heating === 'Combined' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('heating', 'Combined')}
              >
                Combined
              </button>
            </div>
          </div>
          <div className="class-price">
            <label>Price</label>
            <div className="price-input">
              <input
                name="price"
                type="number"
                placeholder="00.00"
                value={formData.price}
                onChange={handleInputChange}
              />
              <span>USD</span>
            </div>
          </div>
          <div className="class-filters">
            <label>Fill in all required filters<span class="necessarily">*</span></label>
            <button onClick={handleToggleFilters}>All filters</button>

            {showFilters && (
                <>
                  <div className="filters-panel">
                    <div className="filter-options">
                      <div className="start-panel">
                        <div className="budget">
                          <h3>Your budget (per night)</h3>
                          <p>$500 - $7000+</p>
                          <p>{budget}$</p>
                          <input
                            type="range"
                            min="500"
                            max="7000"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                          />
                        </div>
                        <input type="date" placeholder="By date of posting" />
                        <select>
                          <option value="" disabled>
                            Year of construction
                          </option>
                          <option>1990-2000</option>
                          <option>2001-2010</option>
                          <option>2011-2020</option>
                          <option>2020-2024</option>
                        </select>
                        <select>
                          <option value="" disabled>
                            Renovation design
                          </option>
                          <option>Without repair</option>
                          <option>Renovation 2000-2010</option>
                          <option>Renovation 2010-2020</option>
                          <option>Modern Renovation</option>
                        </select>
                      </div>
                      <hr/>
                      <div className="filter-section">
                        <h4>Popular filters for this area</h4>
                        <label><input type="checkbox" /> Air conditioning</label>
                        <label><input type="checkbox" /> No prepayment</label>
                        <label><input type="checkbox" /> Very good: Based on guest reviews</label>
                        <label><input type="checkbox" /> Swimming Pool</label>
                        <label><input type="checkbox" /> Sea view</label>
                        <label><input type="checkbox" /> Beachfront</label>
                        <label><input type="checkbox" /> Breakfast included</label>
                      </div>

                      <div className="filter-section">
                        <h4>Facilities</h4>
                        <label><input type="checkbox" /> Non-smoking rooms</label>
                        <label><input type="checkbox" /> Family rooms</label>
                        <label><input type="checkbox" /> Pets allowed</label>
                        <label><input type="checkbox" /> Parking</label>
                        <label><input type="checkbox" /> Free WiFi</label>
                        <label><input type="checkbox" /> Airport shuttle</label>
                        <label><input type="checkbox" /> 24-hour front desk</label>
                      </div>

                      <div className="filter-section">
                        <h4>Facilities</h4>
                        <label><input type="checkbox" /> Spa and wellness centre</label>
                        <label><input type="checkbox" /> Fitness centre</label>
                        <label><input type="checkbox" /> Restaurant</label>
                        <label><input type="checkbox" /> Room service</label>
                        <label><input type="checkbox" /> Electric vehicle charging station</label>
                        <label><input type="checkbox" /> Wheelchair accessible</label>
                        <label><input type="checkbox" /> Generator</label>
                      </div>

                      <div className="filter-section">
                        <h4>Room facilities</h4>
                        <label><input type="checkbox" /> Balcony</label>
                        <label><input type="checkbox" /> Kitchen/kitchenette</label>
                        <label><input type="checkbox" /> Private bathroom</label>
                        <label><input type="checkbox" /> TV</label>
                        <label><input type="checkbox" /> Terrace</label>
                        <label><input type="checkbox" /> Refrigerator</label>
                        <label><input type="checkbox" /> Electric kettle</label>
                      </div>

                      <div className="filter-section">
                        <h4>Property rating</h4>
                        <p>Find high-quality hotels and holiday rentals</p>
                        <label><input type="checkbox" /> 3 stars</label>
                        <label><input type="checkbox" /> 4 stars</label>
                        <label><input type="checkbox" /> 5 stars</label>
                        <label><input type="checkbox" /> Unrated</label>
                      </div>

                      <div className="filter-section">
                        <h4>Distance from centre</h4>
                        <label><input type="checkbox" /> Less than 1 km</label>
                        <label><input type="checkbox" /> Less than 3 km</label>
                        <label><input type="checkbox" /> Less than 5 km</label>
                      </div>

                      <div className="filter-section">
                        <h4>Brands</h4>
                        <label><input type="checkbox" /> Maestro hotels</label>
                        <label><input type="checkbox" /> Ribas Hotels Group</label>
                        <label><input type="checkbox" /> Optima Hotels & Resorts</label>
                        <label><input type="checkbox" /> DREAM Hostels</label>
                      </div>

                      <div className="filter-section rooms-beds-container">
                        <h4>Rooms and beds</h4>
                        <div className="rooms-beds-controls">
                          <div>
                            <p>Bedrooms</p>
                            <button onClick={() => decrement(setBedrooms, bedrooms)}>-</button>
                            <input type="number" value={bedrooms} readOnly />
                            <button onClick={() => increment(setBedrooms)}>+</button>
                          </div>
                          <div>
                            <p>Beds</p>
                            <button onClick={() => decrement(setBeds, beds)}>-</button>
                            <input type="number" value={beds} readOnly />
                            <button onClick={() => increment(setBeds)}>+</button>
                          </div>
                          <div>
                            <p>Bathrooms</p>
                            <button onClick={() => decrement(setBathrooms, bathrooms)}>-</button>
                            <input type="number" value={bathrooms} readOnly />
                            <button onClick={() => increment(setBathrooms)}>+</button>
                          </div>
                        </div>
                      </div>
                      <button className="apply-filters">Apply Filters</button>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </section>
      <section className='posting-ad'>
        <div className="tabs">
          <span className="tab">Housing information</span>
          <span className="tab">Additional Information</span>
          <span className="tab active">Posting an ad</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='posting-an-ad'>
            <div className='posting-describe'>
              <h5>Photo and video</h5><br/><br/><br/>
              <label>Maximum photo size: <strong>4 megabytes</strong></label>
              <label>Maximum video size: <strong>50 megabytes</strong></label>
              <label>Format: <strong>jpg, jpeg, png, mp4</strong></label>
              <label>We recommend uploading at least <strong>10 photos</strong></label>
            </div>
            <div className="photo-video-container">
              <div className="photo-pyramid">
                <button
                  type="button"
                  className="upload-photo"
                  onClick={() => document.getElementById('photo-upload-1').click()}
                >
                  {renderButtonContent('photo', 1)}
                </button>
                <button
                  type="button"
                  className="upload-photo"
                  onClick={() => document.getElementById('photo-upload-2').click()}
                >
                  {renderButtonContent('photo', 2)}
                </button>
                <button
                  type="button"
                  className="upload-photo"
                  onClick={() => document.getElementById('photo-upload-3').click()}
                >
                  {renderButtonContent('photo', 3)}
                </button>

                <input
                  type="file"
                  id="photo-upload-1"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'photo', 1)}
                />
                <input
                  type="file"
                  id="photo-upload-2"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'photo', 2)}
                />
                <input
                  type="file"
                  id="photo-upload-3"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'photo', 3)}
                />
              </div>
              <div className="video-pyramid">
                <button
                  type="button"
                  className="upload-video"
                  onClick={() => document.getElementById('video-upload-1').click()}
                >
                  {renderButtonContent('video', 1)}
                </button>
                <button
                  type="button"
                  className="upload-photo"
                  onClick={() => document.getElementById('photo-upload-4').click()}
                >
                  {renderButtonContent('photo', 4)}
                </button>
                <button
                  type="button"
                  className="upload-photo"
                  onClick={() => document.getElementById('photo-upload-5').click()}
                >
                  {renderButtonContent('photo', 5)}
                </button>

                <input
                  type="file"
                  id="video-upload-1"
                  accept="video/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'video', 1)}
                />
                <input
                  type="file"
                  id="photo-upload-4"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'photo', 4)}
                />
                <input
                  type="file"
                  id="photo-upload-5"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'photo', 5)}
                />
              </div>
            </div>
          </div>
          <div className='home-describe'>
            <label>Description</label>
            <textarea
              placeholder="Please describe the object in as much detail as possible."
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSubmit}>Place an ad</button>
        </form>
      </section>
    </div>
  );
}

export default HouseReg;