import { MenuItem, ReviewItem } from '../types';

export const CAFE_INFO = {
  nameEn: 'Satara Cafe',
  nameMr: 'सातारा कॅफे',
  rating: 3.9,
  reviewCount: 212,
  priceRange: '₹1–200',
  address: 'Sadar Bazar, Satara, Maharashtra 415001',
  landmark: 'Near Sainik Bank, Police Staff Quarter',
  plusCode: 'M2R4+25 Satara, Maharashtra',
  phone: '075586 81179',
  phoneRaw: '917558681179',
  timings: '7:30 AM – 10:30 PM (Daily)',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Satara+Cafe+Sadar+Bazar+Satara+Maharashtra+415001',
};

export const MENU_ITEMS: MenuItem[] = [
  // South Indian on Banana Leaf
  {
    id: 'masala-dosa',
    nameEn: 'Banana Leaf Masala Dosa',
    nameMr: 'केळीच्या पानावरील मसाला डोसा',
    category: 'south-indian',
    price: 85,
    descriptionEn: 'Folded crisp on a cut banana leaf, filled with spiced mustard potato bhaji. Served with freshly grated coconut chutney and piping hot drumstick sambar.',
    descriptionMr: 'केळीच्या पानावर गरमागरम कुरकुरीत डोसा, बटाट्याची खमंग भाजी, नारळाची ताजी चटणी आणि वाफाळलेले सांबार.',
    popular: true,
    veg: true,
    jainAvailable: true,
    image: '/src/assets/images/hero_masala_dosa_breakfast_1791645028775.jpg',
    spicyLevel: 1,
    mealTime: 'all-day'
  },
  {
    id: 'mysore-masala-dosa',
    nameEn: 'Mysore Masala Dosa',
    nameMr: 'म्हैसूर मसाला डोसा',
    category: 'south-indian',
    price: 95,
    descriptionEn: 'Spread with fiery red garlic-chili paste and melted butter, stuffed with potato masala and folded extra crisp.',
    descriptionMr: 'तिखट लाल लसूण चटणी आणि बटर लावून भाजलेला जास्तीचा कुरकुरीत म्हैसूर डोसा.',
    popular: true,
    veg: true,
    jainAvailable: false,
    image: '/src/assets/images/hero_masala_dosa_breakfast_1791645028775.jpg',
    spicyLevel: 2,
    mealTime: 'all-day'
  },
  {
    id: 'butter-plain-dosa',
    nameEn: 'Butter Plain Dosa',
    nameMr: 'बटर प्लेन डोसा',
    category: 'south-indian',
    price: 70,
    descriptionEn: 'Thin golden roast in pure Amul butter. Crisp edges, served with two bowls of fresh coconut chutney.',
    descriptionMr: 'अमुल बटरमध्ये भाजलेला पातळ कुरकुरीत डोसा आणि नारळाची चटणी-सांबार.',
    popular: false,
    veg: true,
    jainAvailable: true,
    spicyLevel: 1,
    mealTime: 'all-day'
  },
  {
    id: 'idli-sambar',
    nameEn: 'Steamed Idli Sambar (2 pcs)',
    nameMr: 'इडली सांबार (२ नग)',
    category: 'south-indian',
    price: 55,
    descriptionEn: 'Steamed fresh in small batches every morning. Soft, pillowy rice cakes served swimming in hot aromatic sambar.',
    descriptionMr: 'सकाळी ताजी वाफवलेली मऊ लुसलुशीत इडली, सांबार आणि चटणी.',
    popular: false,
    veg: true,
    jainAvailable: true,
    spicyLevel: 1,
    mealTime: 'morning'
  },
  {
    id: 'medu-vada',
    nameEn: 'Medu Vada Sambar (2 pcs)',
    nameMr: 'मेदू वडा सांबार (२ नग)',
    category: 'south-indian',
    price: 65,
    descriptionEn: 'Fried hot to order with black peppercorns and fresh curry leaves. Crunchy outside, airy inside.',
    descriptionMr: 'ऑर्डरनुसार गरमागरम तळलेला कुरकुरीत मेदू वडा, सांबार आणि चटणी.',
    popular: false,
    veg: true,
    jainAvailable: true,
    spicyLevel: 2,
    mealTime: 'morning'
  },

  // Satara Katta & Maharashtrian
  {
    id: 'satara-wada-pav',
    nameEn: 'Satara Batata Wada Pav',
    nameMr: 'अस्सल सातारी वडापाव',
    category: 'satara-katta',
    price: 25,
    descriptionEn: 'Yellow spiced potato ball fried golden, stuffed into fresh bakery pav with coarse red garlic-peanut thecha and a salted fried green chili.',
    descriptionMr: 'गरम बटाटा वडा, गावरान लाल लसूण-शेंगदाणा चटणी, तळलेली हिरवी मिरची आणि मऊ लादी पाव.',
    popular: true,
    veg: true,
    jainAvailable: false,
    image: '/src/assets/images/satara_wada_pav_chai_1791645048207.jpg',
    spicyLevel: 3,
    mealTime: 'all-day'
  },
  {
    id: 'maharashtrian-thalipeeth',
    nameEn: 'Bhajani Thalipeeth with White Loni',
    nameMr: 'भाजणीचे थालीपीठ आणि पांढरे लोणी',
    category: 'satara-katta',
    price: 85,
    descriptionEn: 'Traditional multi-grain roasted bhajani flatbread with onion, coriander, and ajwain. Served with a generous dollop of homemade white butter, fresh curd, and green chili thecha.',
    descriptionMr: 'खमंग भाजणीचे थालीपीठ, ताजे पांढरे लोणी, घरचे घट्ट दही आणि हिरव्या मिरचीचा तिखट ठेचा.',
    popular: true,
    veg: true,
    jainAvailable: false,
    image: '/src/assets/images/maharashtrian_thalipeeth_1791645078927.jpg',
    spicyLevel: 2,
    mealTime: 'all-day'
  },
  {
    id: 'aloo-paratha',
    nameEn: 'Stuffed Tawa Aloo Paratha',
    nameMr: 'तवा आलू पराठा',
    category: 'satara-katta',
    price: 80,
    descriptionEn: 'Whole wheat flatbread rolled with spiced mashed potato and fresh herbs, roasted on an iron tawa with butter and served with thick curd.',
    descriptionMr: 'गरम तव्यावर बटरमध्ये भाजलेला बटाटा पराठा आणि दही.',
    popular: false,
    veg: true,
    jainAvailable: false,
    spicyLevel: 1,
    mealTime: 'all-day'
  },
  {
    id: 'misal-pav',
    nameEn: 'Satara Kat Misal Pav',
    nameMr: 'सातारी कट मिसळ पाव',
    category: 'satara-katta',
    price: 80,
    descriptionEn: 'Spicy sprouted moth beans in red chili rassa topped with crunchy farsan, chopped onion, and fresh coriander, served with two pavs.',
    descriptionMr: 'झणझणीत तरीचा कट, मटकी उसळ, कुरकुरीत फरसाण आणि पाव.',
    popular: true,
    veg: true,
    jainAvailable: false,
    spicyLevel: 3,
    mealTime: 'morning'
  },

  // Sandwiches & Grills
  {
    id: 'vag-chis-sandwich',
    nameEn: 'Veg Cheese Grilled Sandwich (Vag CHIS)',
    nameMr: 'व्हेज चीज ग्रिल्ड सँडविच',
    category: 'sandwiches',
    price: 110,
    descriptionEn: 'Three layers of buttered bread packed with sliced potato, beetroot, onion, tomato, and thick melted Amul cheese. Cut into quarters with green mint chutney and ketchup.',
    descriptionMr: 'बटाटा, बीट, काकडी आणि भरपूर वितळलेले चीज घातलेले कुरकुरीत ३-लेयर ग्रिल्ड सँडविच.',
    popular: true,
    veg: true,
    jainAvailable: true,
    image: '/src/assets/images/veg_cheese_grilled_sandwich_1791645066007.jpg',
    spicyLevel: 1,
    mealTime: 'all-day'
  },
  {
    id: 'veg-cheese-toast',
    nameEn: 'Bombay Veg Toast Sandwich',
    nameMr: 'व्हेज टोस्ट सँडविच',
    category: 'sandwiches',
    price: 75,
    descriptionEn: 'Classic street cafe toast with spiced potatoes, onions, chaat masala, and spicy green chutney pressed on a hand toaster.',
    descriptionMr: 'हात-टोस्टरवर भाजलेले साधे खमंग टोस्ट सँडविच आणि हिरवी चटणी.',
    popular: false,
    veg: true,
    jainAvailable: true,
    spicyLevel: 2,
    mealTime: 'all-day'
  },
  {
    id: 'corn-cheese-grilled-sandwich',
    nameEn: 'Sweet Corn & Cheese Grill',
    nameMr: 'स्वीट कॉर्न चीज सँडविच',
    category: 'sandwiches',
    price: 125,
    descriptionEn: 'Steamed sweet corn kernels, capsicum, oregano herbs, and melted mozzarella blend toasted golden brown.',
    descriptionMr: 'स्वीट कॉर्न, शिमला मिरची आणि भरपूर मोझरेला चीज घालून भाजलेले सँडविच.',
    popular: false,
    veg: true,
    jainAvailable: true,
    spicyLevel: 1,
    mealTime: 'evening'
  },

  // Pav Bhaji
  {
    id: 'butter-pav-bhaji',
    nameEn: 'Special Butter Pav Bhaji',
    nameMr: 'स्पेशल बटर पावभाजी',
    category: 'pav-bhaji',
    price: 120,
    descriptionEn: 'Slow-simmered mashed vegetable bhaji with red tomatoes and butter on a giant tawa. Served with two fluffy pavs toasted in Amul butter.',
    descriptionMr: 'मोठ्या तव्यावर बटरमध्ये परतलेली चमचमीत भाजी, बारीक कांदा, लिंबू आणि बटर पाव.',
    popular: true,
    veg: true,
    jainAvailable: true,
    spicyLevel: 2,
    mealTime: 'evening'
  },
  {
    id: 'cheese-pav-bhaji',
    nameEn: 'Cheese Loaded Pav Bhaji',
    nameMr: 'चीज पावभाजी',
    category: 'pav-bhaji',
    price: 145,
    descriptionEn: 'Our special tawa bhaji blanketed with a generous heap of freshly grated Amul cheese. Rich, buttery, and filling.',
    descriptionMr: 'भरपूर किसलेले अमुल चीज घातलेली खमंग पावभाजी.',
    popular: false,
    veg: true,
    jainAvailable: true,
    spicyLevel: 2,
    mealTime: 'evening'
  },

  // Italian & Fast Food
  {
    id: 'red-sauce-arrabbiata-pasta',
    nameEn: 'Tangy Red Sauce Penne Pasta',
    nameMr: 'रेड सॉस पेने पास्ता',
    category: 'fast-food',
    price: 130,
    descriptionEn: 'Penne tossed with tangy tomato-basil sauce, crunchy bell peppers, sweet corn, and dried oregano flakes.',
    descriptionMr: 'टोमॅटो सॉस, शिमला मिरची आणि कॉर्नमध्ये बनवलेला चवदार पास्ता.',
    popular: false,
    veg: true,
    jainAvailable: false,
    spicyLevel: 2,
    mealTime: 'evening'
  },
  {
    id: 'white-sauce-cheesy-pasta',
    nameEn: 'Creamy White Sauce Alfredo Pasta',
    nameMr: 'व्हाइट सॉस चीझी पास्ता',
    category: 'fast-food',
    price: 145,
    descriptionEn: 'Comforting creamy cheese sauce with sweet corn, sauteed vegetables, cracked black pepper, and melted cheese.',
    descriptionMr: 'क्रीमी व्हाइट सॉस आणि चीजने समृद्ध असा पास्ता.',
    popular: true,
    veg: true,
    jainAvailable: true,
    spicyLevel: 1,
    mealTime: 'evening'
  },
  {
    id: 'crispy-french-fries',
    nameEn: 'Peri Peri Crispy French Fries',
    nameMr: 'पेरी पेरी फ्रेंच फ्राईज',
    category: 'fast-food',
    price: 80,
    descriptionEn: 'Hot crispy potato fries dusted with zesty peri-peri spice mix, served with mayo and tomato ketchup.',
    descriptionMr: 'गरमागरम कुरकुरीत फ्रेंच फ्राईज आणि पेरी पेरी मसाला.',
    popular: false,
    veg: true,
    jainAvailable: true,
    spicyLevel: 2,
    mealTime: 'all-day'
  },

  // Chai & Coffee
  {
    id: 'cutting-chai',
    nameEn: 'Special Adrak-Elaichi Cutting Chai',
    nameMr: 'स्पेशल आले-वेलची कटींग चहा',
    category: 'beverages',
    price: 18,
    descriptionEn: 'Brewed strong in a copper handi with fresh crushed ginger and green cardamom. The quintessential Satara katta tea in a small glass.',
    descriptionMr: 'ताज्या आल्याचा आणि वेलचीचा कडक वाफाळलेला कटींग चहा — कट्ट्याची खरी शान.',
    popular: true,
    veg: true,
    jainAvailable: true,
    image: '/src/assets/images/satara_wada_pav_chai_1791645048207.jpg',
    spicyLevel: 1,
    mealTime: 'all-day'
  },
  {
    id: 'south-indian-filter-coffee',
    nameEn: 'South Indian Filter Coffee (Dabarah Tumbler)',
    nameMr: 'पारंपारिक फिल्टर कॉफी',
    category: 'beverages',
    price: 35,
    descriptionEn: 'Fresh chicory decoction frothed high with creamy boiled milk, served steaming hot in a stainless steel tumbler and dabarah.',
    descriptionMr: 'स्टीलच्या तांब्या-भांड्यात फेसाळलेली वाफाळलेली सुगंधी फिल्टर कॉफी.',
    popular: true,
    veg: true,
    jainAvailable: true,
    image: '/src/assets/images/filter_coffee_dabarah_1791895662728.jpg',
    spicyLevel: 1,
    mealTime: 'morning'
  },
  {
    id: 'thick-cold-coffee',
    nameEn: 'Thick Katta Cold Coffee',
    nameMr: 'स्पेशल थिक कोल्ड कॉफी',
    category: 'beverages',
    price: 60,
    descriptionEn: 'Blended thick and chilled with milk, coffee decoction, chocolate drizzle, and a scoop of vanilla ice cream.',
    descriptionMr: 'चॉकलेट आणि आईस्क्रीम घालून थंडगार बनवलेली घट्ट कोल्ड कॉफी.',
    popular: true,
    veg: true,
    jainAvailable: true,
    spicyLevel: 1,
    mealTime: 'all-day'
  }
];

export const SPICES_AND_CRAFT = [
  {
    id: 'mustard',
    nameEn: 'Black Mustard Seeds (मोहरी)',
    origin: 'Locally Sourced Maharashtra Oilseeds',
    roleEn: 'Popped smoking hot in peanut oil with curry leaves to temper our morning coconut chutney and sambar handi.',
    roleMr: 'शेंगदाणा तेलात कढीपत्त्यासोबत तडतडणारी खमंग मोहरीची फोडणी, जी नारळाची चटणी आणि सांबारला अस्सल चव देते.',
  },
  {
    id: 'thecha',
    nameEn: 'Satara Garlic Peanut Thecha (गावरान लसूण ठेचा)',
    origin: 'Hand-crushed in stone mortar (खलबत्ता)',
    roleEn: 'Roasted country garlic cloves, fiery green chilies, toasted local peanuts, and rock salt. Spread generously inside every hot batata wada pav.',
    roleMr: 'भाजलेला गावरान लसूण, हिरवी मिरची, भाजलेले शेंगदाणे आणि खडे मीठ. वडापावच्या प्रत्येक घासाला झणझणीत चव.',
  },
  {
    id: 'bhajani',
    nameEn: 'Traditional Roasted Bhajani (पारंपारिक भाजणी धान्य)',
    origin: 'Slow-roasted multi-grains',
    roleEn: 'Sorghum (jowar), pearl millet (bajra), chana dal, coriander seeds, and rice roasted on a slow iron tawa before milling for our signature thalipeeth.',
    roleMr: 'ज्वारी, बाजरी, चणा डाळ, धणे आणि तांदूळ मंद आचेवर भाजून दळलेली भाजणी — कुरकुरीत थालीपीठाचे रहस्य.',
  },
  {
    id: 'curry-leaves',
    nameEn: 'Fresh Sweet Curry Leaves (गोड कढीपत्ता)',
    origin: 'Fresh morning farm harvest',
    roleEn: 'Adds an irreplaceable earthy aroma to our medu vada batter, potato subzi, and boiling dal.',
    roleMr: 'मेदू वड्याचे पीठ, बटाटा भाजी आणि आमटीला सुवास देणारा ताजा कढीपत्ता.',
  },
  {
    id: 'byadgi',
    nameEn: 'Byadgi Mild Crimson Chili (ब्याडगी मिरची)',
    origin: 'Naturally sun-dried',
    roleEn: 'Gives our Mysore Masala Dosa paste and Misal rassa their glowing sunset crimson color without scorching heat.',
    roleMr: 'म्हैसूर डोसा आणि मिसळच्या कटला मनमोहक लाल रंग आणि संतुलित तिखटपणा देणारी मिरची.',
  },
  {
    id: 'coffee-blend',
    nameEn: 'Chicory Plantation Coffee (कॉफी डिकॉक्शन)',
    origin: 'Traditional southern bean blend',
    roleEn: 'Slow-brewed through a perforated stainless steel filter drip to extract a thick, dark, velvety decoction frothed with whole boiled milk.',
    roleMr: 'स्टीलच्या फिल्टरमधून थेंब थेंब उतरलेले कडक डिकॉक्शन, जे गरमागरम दुधासोबत फेसाळले जाते.',
  }
];

export const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Tony',
    role: 'Local Guide · 76 reviews · 647 photos',
    rating: 5,
    date: '2 years ago',
    dishMentioned: 'Masala Dosa, Sambar & Chutney',
    text: 'If You Want Genuine & Delicious South Indian Breakfast , Banana Leaf Is The Place To Visit! Crispy dosas, authentic chutney and piping hot sambar served with real care.',
    textMr: 'जर तुम्हाला अस्सल आणि स्वादिष्ट साऊथ इंडियन नाश्ता हवा असेल, तर केळीच्या पानावर सर्व्ह केला जाणारा हा डोसा नक्की खा! अत्यंत चवदार आणि समाधानकारक अनुभव.',
    likes: 33
  },
  {
    id: 'rev-2',
    author: 'Rushikesh Wangde',
    role: 'Local Guide · 116 reviews · 144 photos',
    rating: 4,
    date: '2 years ago',
    dishMentioned: 'Masala Dosa',
    text: 'I had ordered Masala dosa and it was delicious and tasty. Adequate quantity of chutney and sambhar was served. Also additional chutney was offered as complimentary. It was enough to satisfy my hunger.',
    textMr: 'मी मसाला डोसा मागवला होता, तो खूपच चवदार होता. चटणी आणि सांबारचे प्रमाण पुरेसे होते. तसेच मागितल्यावर जास्तीची चटणीसुद्धा हसतमुखाने दिली. पोट भरून समाधान झाले.',
    likes: 3
  },
  {
    id: 'rev-3',
    author: 'SumeetS Kale',
    role: 'Satara Food Enthusiast',
    rating: 5,
    date: '2 months ago',
    dishMentioned: 'Paratha, Thalipeeth & South Indian',
    text: 'Try south indian, paratha, thaleepith. Delicious food! The thalipeeth with white butter was very authentic and comforting.',
    textMr: 'येथील साऊथ इंडियन, पराठा आणि थालीपीठ अवश्य ट्राय करा. पांढऱ्या लोण्यासोबतचे थालीपीठ अगदी घरगुती आणि अप्रतिम आहे.',
    ownerReply: 'Hi SumeetS, Thank you for the kind words! We make the bhajani flour in small batches at home. Do come by again for morning breakfast!'
  },
  {
    id: 'rev-4',
    author: 'Aniket Deshmukh',
    role: 'Sadar Bazar Resident',
    rating: 4,
    date: '3 weeks ago',
    dishMentioned: 'Vag CHIS Sandwich & Cold Coffee',
    text: 'Our regular evening spot. The Veg Cheese Grilled Sandwich (Vag CHIS) is loaded with cheese and nicely crisped. Cold coffee is thick and pocket-friendly.',
    textMr: 'सदर बझारमधील संध्याकाळच्या नाश्त्यासाठी उत्तम कट्टा. व्हेज चीज सँडविच कुरकुरीत आणि भरपूर चीजने भरलेले असते.',
    likes: 7
  },
  {
    id: 'rev-5',
    author: 'Pooja Kadam',
    role: 'Satara Local',
    rating: 4,
    date: '1 month ago',
    dishMentioned: 'Pasta & Wada Pav',
    text: 'This cafe offers you Italian, Mexican & other fast food cuisines alongside authentic Satara Wada Pav. Great variety for college friends and family. Quick service!',
    textMr: 'या कॅफेमध्ये अस्सल सातारी वडापावसोबत पास्ता, सँडविच आणि फास्ट फूडही उपलब्ध आहे. मित्रांसोबत खाण्यासाठी छान जागा.',
    likes: 5
  }
];

export const NEARBY_LANDMARKS = [
  { name: 'Sainik Bank / Police Staff Quarter', note: 'Right across the lane · 2 min walk', distance: '150 m' },
  { name: 'Powai Naka Circle', note: 'Straight down the Sadar Bazar main road', distance: '1.2 km' },
  { name: 'Satara ST Central Bus Stand', note: '5 mins by rickshaw or two-wheeler', distance: '1.8 km' },
  { name: 'Ajinkyatara Fort Base', note: 'Scenic climb road starting from town', distance: '3.5 km' },
  { name: 'Bombay Restaurant Chowk (Highway NH48)', note: 'Convenient entry point from Pune-Bangalore highway', distance: '2.9 km' }
];

export const SATARA_ATTRACTIONS = [
  {
    nameEn: 'Ajinkyatara Fort (अजिंक्यतारा किल्ला)',
    distFromCafe: '3.5 km (12 mins)',
    tipEn: 'The historic fort guarding Satara town. Perfect for morning cycling, fresh breeze, and panoramic aerial views of Sadar Bazar.',
    tipMr: 'साताऱ्याचा ऐतिहासिक बालेकिल्ला. सकाळच्या सायकलिंगसाठी आणि संपूर्ण शहराचे विहंगम दृश्य पाहण्यासाठी उत्तम.',
  },
  {
    nameEn: 'Kaas Plateau of Flowers (कास पठार)',
    distFromCafe: '25 km (45 mins)',
    tipEn: 'UNESCO World Natural Heritage site known for its vibrant post-monsoon wild flower blooms and Kaas lake.',
    tipMr: 'युनेस्को जागतिक वारसा स्थळ. पावसाळ्यानंतर फुलणाऱ्या रानफुलांचे गालीचे आणि निसर्गरम्य कास तलाव.',
  },
  {
    nameEn: 'Thoseghar Waterfalls (ठोसेघर धबधबा)',
    distFromCafe: '26 km (50 mins)',
    tipEn: 'Spectacular series of plunging waterfalls nestled in dense green Sahyadri mist and valleys.',
    tipMr: 'सह्याद्रीच्या कडेकपारीत कोसळणारा भव्य आणि मनमोहक धबधबा.',
  },
  {
    nameEn: 'Sajjangad Fort (सज्जनगड)',
    distFromCafe: '16 km (30 mins)',
    tipEn: 'Spiritual hill fortress and the final resting place of Saint Ramdas Swami, famous for its afternoon khichdi mahaprasad.',
    tipMr: 'समर्थ रामदास स्वामींचे पवित्र समाधी स्थान आणि दुपारचा प्रसिद्ध खिचडी महाप्रसाद.',
  }
];
