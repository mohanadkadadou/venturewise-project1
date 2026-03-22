export interface CommercialZone {
  name: string;
  type: "retail" | "restaurant" | "business" | "mixed" | "market";
  lat: number;
  lng: number;
  description: string;
}

export interface CityData {
  city: string;
  lat: number;
  lng: number;
  zones: CommercialZone[];
}

const CITY_DATA: CityData[] = [
  { city: "Dubai", lat: 25.2048, lng: 55.2708, zones: [
    { name: "Downtown Dubai / Dubai Mall", type: "retail", lat: 25.1972, lng: 55.2744, description: "Highest foot traffic in UAE, premium brands, tourist hub" },
    { name: "Dubai Marina & JBR Walk", type: "restaurant", lat: 25.0803, lng: 55.1403, description: "Waterfront dining, expat community, weekend crowds" },
    { name: "Business Bay", type: "business", lat: 25.1878, lng: 55.2685, description: "Corporate offices, B2B services, lunch crowd" },
    { name: "Deira Gold & Spice Souks", type: "market", lat: 25.2697, lng: 55.3088, description: "Traditional trade, tourist shopping, authentic market" },
    { name: "Al Quoz / Alserkal Avenue", type: "mixed", lat: 25.1562, lng: 55.2282, description: "Creative district, galleries, F&B, startup culture" },
  ]},
  { city: "Abu Dhabi", lat: 24.4539, lng: 54.3773, zones: [
    { name: "Corniche Road", type: "mixed", lat: 24.4619, lng: 54.3365, description: "Prime waterfront, hotels, F&B, tourist zone" },
    { name: "Al Maryah Island", type: "business", lat: 24.4988, lng: 54.4054, description: "Financial district, ADGM, luxury retail, fine dining" },
    { name: "Yas Island", type: "retail", lat: 24.4884, lng: 54.6088, description: "Leisure, Yas Mall, theme parks, entertainment district" },
    { name: "Khalidiyah / Al Wahda", type: "mixed", lat: 24.4690, lng: 54.3618, description: "Community retail, F&B, middle market, local crowd" },
    { name: "Musaffah Industrial Area", type: "business", lat: 24.3522, lng: 54.4935, description: "B2B, warehousing, logistics, manufacturing services" },
  ]},
  { city: "Riyadh", lat: 24.7136, lng: 46.6753, zones: [
    { name: "King Fahd Road", type: "business", lat: 24.7388, lng: 46.6490, description: "Corporate headquarters, banks, consulting firms" },
    { name: "Al Olaya District", type: "retail", lat: 24.7060, lng: 46.6893, description: "Luxury retail, Kingdom Centre, Faisaliah Tower area" },
    { name: "Tahlia Street", type: "restaurant", lat: 24.6925, lng: 46.6805, description: "Premium restaurants, cafés, families, weekend crowds" },
    { name: "Al Diriyah / Bujairi Terrace", type: "mixed", lat: 24.7351, lng: 46.5744, description: "Cultural tourism, heritage dining, growing footfall" },
    { name: "Exit 7 / Hittin", type: "mixed", lat: 24.7950, lng: 46.7097, description: "Family residential zone, community malls, F&B" },
  ]},
  { city: "Cairo", lat: 30.0444, lng: 31.2357, zones: [
    { name: "New Cairo / Fifth Settlement", type: "retail", lat: 30.0258, lng: 31.4680, description: "Affluent suburb, Cairo Festival City, high purchasing power" },
    { name: "Zamalek", type: "restaurant", lat: 30.0669, lng: 31.2243, description: "Expat hub, embassies, fine dining, boutique shops" },
    { name: "Maadi", type: "mixed", lat: 29.9603, lng: 31.2565, description: "Expats & upper class, cafés, international schools" },
    { name: "Downtown Cairo / Tahrir", type: "market", lat: 30.0443, lng: 31.2344, description: "Mass market, highest pedestrian density, street retail" },
    { name: "Heliopolis / Nasr City", type: "mixed", lat: 30.0889, lng: 31.3368, description: "Middle class, malls, restaurants, government employees" },
  ]},
  { city: "Istanbul", lat: 41.0082, lng: 28.9784, zones: [
    { name: "Istiklal Avenue / Beyoğlu", type: "retail", lat: 41.0335, lng: 28.9770, description: "Tourist hub, 3M+ daily visitors, boutique and international retail" },
    { name: "Levent / Maslak", type: "business", lat: 41.0851, lng: 29.0122, description: "Financial district, corporate HQs, B2B services" },
    { name: "Beşiktaş / Nişantaşı", type: "restaurant", lat: 41.0450, lng: 29.0014, description: "Upscale dining, luxury brands, affluent locals & expats" },
    { name: "Grand Bazaar / Eminönü", type: "market", lat: 41.0107, lng: 28.9680, description: "Oldest bazaar, tourism, wholesale, unique goods" },
    { name: "Bağcılar / Güngören (Laleli)", type: "market", lat: 41.0340, lng: 28.8700, description: "Textile wholesale, bulk retail, B2B trade hub" },
  ]},
  { city: "Beirut", lat: 33.8938, lng: 35.5018, zones: [
    { name: "Gemmayzeh / Mar Mikhael", type: "restaurant", lat: 33.8910, lng: 35.5155, description: "Trendy bars, cafés, creative agencies, young professionals" },
    { name: "Hamra", type: "mixed", lat: 33.8988, lng: 35.4806, description: "Commercial hub, AUB proximity, diverse F&B" },
    { name: "Downtown Beirut (BCD)", type: "business", lat: 33.8942, lng: 35.5025, description: "Banking, luxury retail, government, international offices" },
    { name: "Verdun Street", type: "retail", lat: 33.8850, lng: 35.4891, description: "Upscale retail, fashion, beauty, middle-upper income" },
    { name: "Achrafieh / Sassine Square", type: "mixed", lat: 33.8880, lng: 35.5128, description: "Residential-commercial mix, loyal neighborhood clientele" },
  ]},
  { city: "Doha", lat: 25.2854, lng: 51.5310, zones: [
    { name: "West Bay / Lusail", type: "business", lat: 25.3298, lng: 51.5251, description: "Financial district, corporate towers, luxury hotels" },
    { name: "The Pearl-Qatar", type: "retail", lat: 25.3715, lng: 51.5527, description: "Luxury residential & retail, marinas, high-end dining" },
    { name: "Souq Waqif", type: "market", lat: 25.2887, lng: 51.5324, description: "Cultural market, tourist hotspot, traditional restaurants" },
    { name: "Msheireb Downtown", type: "mixed", lat: 25.2872, lng: 51.5250, description: "Smart urban development, F&B, boutique retail, culture" },
    { name: "Al Sadd", type: "mixed", lat: 25.2714, lng: 51.5137, description: "Busy commercial street, diverse dining, local services" },
  ]},
  { city: "Kuwait City", lat: 29.3759, lng: 47.9774, zones: [
    { name: "The Avenues Mall", type: "retail", lat: 29.3038, lng: 47.9355, description: "Largest mall in GCC, premium & mass market, massive footfall" },
    { name: "Salem Al Mubarak Street (Salmiya)", type: "mixed", lat: 29.3339, lng: 48.0843, description: "Vibrant street retail, restaurants, youth hub" },
    { name: "Kuwait City Downtown / Sharq", type: "business", lat: 29.3721, lng: 48.0013, description: "Government, banks, investment firms, B2B services" },
    { name: "Al Rai Industrial Area", type: "business", lat: 29.3501, lng: 47.9199, description: "Warehouses, logistics, B2B wholesale, showrooms" },
    { name: "Egaila / Abu Halifa (south)", type: "mixed", lat: 29.1962, lng: 48.0849, description: "Growing residential zone, community retail, cafés" },
  ]},
  { city: "Muscat", lat: 23.5880, lng: 58.3829, zones: [
    { name: "Muscat City Centre / Ruwi", type: "retail", lat: 23.5964, lng: 58.3883, description: "Urban commercial hub, government offices, mixed income retail" },
    { name: "Al Mouj / Muscat Hills", type: "mixed", lat: 23.6232, lng: 58.4688, description: "Luxury residential, marina, upscale dining and retail" },
    { name: "Qurum Beach Area", type: "restaurant", lat: 23.6006, lng: 58.5177, description: "Waterfront dining, expat cluster, premium cafés" },
    { name: "Muttrah Souq", type: "market", lat: 23.6144, lng: 58.5910, description: "Traditional market, tourism, handicrafts, silver jewelry" },
    { name: "Bausher / Ghubrah", type: "mixed", lat: 23.5892, lng: 58.3432, description: "Growing suburb, community malls, family F&B" },
  ]},
  { city: "Amman", lat: 31.9454, lng: 35.9284, zones: [
    { name: "Rainbow Street / Jabal Amman", type: "restaurant", lat: 31.9537, lng: 35.9140, description: "Trendy cafés, boutiques, galleries, young creative crowd" },
    { name: "Abdali Boulevard", type: "retail", lat: 31.9641, lng: 35.9213, description: "Modern mixed-use development, upscale retail, dining" },
    { name: "Shmeisani", type: "business", lat: 31.9782, lng: 35.9128, description: "Embassies, banks, consulting, corporate offices" },
    { name: "7th Circle / Sweifieh", type: "retail", lat: 31.9608, lng: 35.8780, description: "Upper-middle-class retail, restaurants, daily services" },
    { name: "Downtown / Al Balad", type: "market", lat: 31.9530, lng: 35.9395, description: "Traditional market, mass retail, local trade hub" },
  ]},
  { city: "Tehran", lat: 35.6892, lng: 51.3890, zones: [
    { name: "Vanak Square / Jordan Avenue", type: "retail", lat: 35.7530, lng: 51.4090, description: "Affluent shopping, international brands, cafés" },
    { name: "Tajrish Square", type: "market", lat: 35.8044, lng: 51.4295, description: "Bazaar, traditional market, high traffic, all segments" },
    { name: "Tehran Bazaar (Grand Bazaar)", type: "market", lat: 35.6742, lng: 51.4214, description: "Largest bazaar, wholesale hub, traditional trade" },
    { name: "Shahrak-e Gharb", type: "mixed", lat: 35.7584, lng: 51.3499, description: "Affluent residential, modern services, premium F&B" },
    { name: "Valiasr Street (north section)", type: "mixed", lat: 35.7745, lng: 51.4121, description: "Long commercial corridor, diverse income, high footfall" },
  ]},
  { city: "Manama", lat: 26.2235, lng: 50.5876, zones: [
    { name: "Bahrain City Centre / Al Seef", type: "retail", lat: 26.2132, lng: 50.5847, description: "Premium retail, international brands, expat and local crowd" },
    { name: "Adliya", type: "restaurant", lat: 26.2147, lng: 50.5988, description: "Best dining area, bars, art galleries, expat hub" },
    { name: "Diplomatic Area", type: "business", lat: 26.2223, lng: 50.5877, description: "Banks, embassies, financial services, B2B" },
    { name: "Muharraq Souq", type: "market", lat: 26.2621, lng: 50.6152, description: "Traditional market, heritage tourism, local trade" },
    { name: "Juffair", type: "mixed", lat: 26.2006, lng: 50.6011, description: "Military expats, nightlife, restaurants, apartments" },
  ]},
  { city: "Jeddah", lat: 21.4858, lng: 39.1925, zones: [
    { name: "Al Balad (Old Jeddah)", type: "market", lat: 21.4869, lng: 39.1864, description: "UNESCO heritage, tourism, traditional market, rising footfall" },
    { name: "Tahlia Street", type: "retail", lat: 21.5433, lng: 39.1775, description: "Premium retail, top restaurants, fashion brands, night crowd" },
    { name: "Al Hamra / Corniche", type: "restaurant", lat: 21.5655, lng: 39.1376, description: "Waterfront, seafood dining, upscale, expat & local" },
    { name: "Andalus / King Road", type: "mixed", lat: 21.5190, lng: 39.1947, description: "Busy commercial strip, family dining, mid-market retail" },
    { name: "North Jeddah / Obhur", type: "mixed", lat: 21.6843, lng: 39.1150, description: "Upscale residential, beach clubs, premium F&B" },
  ]},
  { city: "Baghdad", lat: 33.3152, lng: 44.3661, zones: [
    { name: "Al Mansour District", type: "mixed", lat: 33.3186, lng: 44.3631, description: "Commercial hub, restaurants, local retail, middle class" },
    { name: "Karrada", type: "market", lat: 33.2940, lng: 44.4005, description: "Busy commercial street, retail, food, high pedestrian traffic" },
    { name: "Al Jadiriya / Green Zone", type: "business", lat: 33.2872, lng: 44.3618, description: "International offices, diplomatic zone, secure B2B" },
    { name: "Al Zayouna", type: "retail", lat: 33.3490, lng: 44.4423, description: "Modern malls, upscale dining, growing middle class" },
    { name: "Saadoun Street (Downtown)", type: "market", lat: 33.3225, lng: 44.3955, description: "Mass market, street retail, services, all income levels" },
  ]},
  { city: "London", lat: 51.5074, lng: -0.1278, zones: [
    { name: "Oxford Street / Soho", type: "retail", lat: 51.5152, lng: -0.1449, description: "Busiest shopping street in Europe, 500k daily visitors" },
    { name: "Canary Wharf", type: "business", lat: 51.5054, lng: -0.0235, description: "Financial district, 100k+ workers, B2B, fintech hub" },
    { name: "Shoreditch / Old Street", type: "mixed", lat: 51.5262, lng: -0.0776, description: "Tech cluster, startups, creative agencies, trendy F&B" },
    { name: "Covent Garden", type: "restaurant", lat: 51.5117, lng: -0.1225, description: "Tourist hub, premium dining, entertainment, arts" },
    { name: "Camden Market", type: "market", lat: 51.5426, lng: -0.1477, description: "Alternative retail, youth culture, tourist market, craft" },
  ]},
  { city: "Paris", lat: 48.8566, lng: 2.3522, zones: [
    { name: "Champs-Élysées / Triangle d'Or", type: "retail", lat: 48.8698, lng: 2.3086, description: "Luxury brand district, 30M tourists/year, premium only" },
    { name: "Le Marais", type: "mixed", lat: 48.8566, lng: 2.3565, description: "Trendy boutiques, galleries, cafés, tourists + locals" },
    { name: "La Défense", type: "business", lat: 48.8924, lng: 2.2352, description: "Europe's largest business district, corporate HQs" },
    { name: "Saint-Germain-des-Prés", type: "restaurant", lat: 48.8534, lng: 2.3334, description: "Literary cafés, fine dining, upscale fashion, intellectuals" },
    { name: "Montmartre", type: "market", lat: 48.8867, lng: 2.3431, description: "Tourist art market, souvenir retail, street artists" },
  ]},
  { city: "Berlin", lat: 52.5200, lng: 13.4050, zones: [
    { name: "Mitte / Alexanderplatz", type: "retail", lat: 52.5216, lng: 13.4132, description: "Tourist center, main shopping, high footfall" },
    { name: "Prenzlauer Berg", type: "mixed", lat: 52.5389, lng: 13.4178, description: "Artsy residential, specialty cafés, boutiques, young parents" },
    { name: "Kreuzberg", type: "restaurant", lat: 52.4991, lng: 13.4002, description: "Multicultural, street food, startup energy, nightlife" },
    { name: "Kurfürstendamm (Kudamm)", type: "retail", lat: 52.5006, lng: 13.3317, description: "West Berlin's prime shopping boulevard, premium brands" },
    { name: "Mitte Startup Hub / Betahaus", type: "business", lat: 52.5295, lng: 13.4019, description: "Berlin tech ecosystem, coworking, startup services" },
  ]},
  { city: "Amsterdam", lat: 52.3676, lng: 4.9041, zones: [
    { name: "Kalverstraat / Dam Square", type: "retail", lat: 52.3729, lng: 4.8942, description: "Pedestrian shopping street, mass retail, tourist hub" },
    { name: "PC Hooftstraat", type: "retail", lat: 52.3604, lng: 4.8809, description: "Amsterdam's luxury street, designer brands, upscale" },
    { name: "Jordaan", type: "restaurant", lat: 52.3742, lng: 4.8796, description: "Trendy neighborhood, boutique cafés, galleries, expats" },
    { name: "Zuidas (South Axis)", type: "business", lat: 52.3348, lng: 4.8708, description: "Financial and legal hub, corporate offices, B2B" },
    { name: "De Pijp", type: "mixed", lat: 52.3550, lng: 4.8944, description: "Albert Cuyp Market, vibrant multicultural, F&B scene" },
  ]},
  { city: "Madrid", lat: 40.4168, lng: -3.7038, zones: [
    { name: "Gran Vía", type: "retail", lat: 40.4200, lng: -3.7056, description: "Main shopping boulevard, tourist hub, international brands" },
    { name: "Salamanca District", type: "retail", lat: 40.4270, lng: -3.6837, description: "Luxury shopping, upscale F&B, affluent locals" },
    { name: "Malasaña / Chueca", type: "mixed", lat: 40.4258, lng: -3.7059, description: "Alternative retail, creative startups, young professionals" },
    { name: "AZCA Financial District", type: "business", lat: 40.4544, lng: -3.6919, description: "Corporate Spain, banking, consulting, B2B services" },
    { name: "El Rastro / Lavapiés", type: "market", lat: 40.4106, lng: -3.7052, description: "Sunday market, multicultural, vintage, artisan goods" },
  ]},
  { city: "Rome", lat: 41.9028, lng: 12.4964, zones: [
    { name: "Via Condotti / Spanish Steps", type: "retail", lat: 41.9059, lng: 12.4815, description: "World's premier luxury shopping street, Gucci, Fendi, Bulgari" },
    { name: "Trastevere", type: "restaurant", lat: 41.8897, lng: 12.4740, description: "Authentic Roman dining, tourist + local, vibrant evenings" },
    { name: "EUR District", type: "business", lat: 41.8350, lng: 12.4700, description: "Corporate offices, government agencies, B2B services" },
    { name: "Prati / Vatican area", type: "mixed", lat: 41.9050, lng: 12.4620, description: "Tourist mixed with residential, F&B, souvenir retail" },
    { name: "Porta Portese Market", type: "market", lat: 41.8831, lng: 12.4740, description: "Oldest flea market in Rome, antiques, secondhand, crafts" },
  ]},
  { city: "Tokyo", lat: 35.6762, lng: 139.6503, zones: [
    { name: "Shinjuku", type: "mixed", lat: 35.6938, lng: 139.7034, description: "Busiest station globally, entertainment, retail, nightlife" },
    { name: "Shibuya / Harajuku", type: "retail", lat: 35.6585, lng: 139.7023, description: "Youth fashion, trends, Shibuya crossing, massive footfall" },
    { name: "Ginza", type: "retail", lat: 35.6714, lng: 139.7669, description: "Tokyo's luxury district, world's most expensive retail" },
    { name: "Marunouchi / Otemachi", type: "business", lat: 35.6843, lng: 139.7637, description: "Japan's financial center, corporate HQs, B2B" },
    { name: "Akihabara", type: "market", lat: 35.7022, lng: 139.7741, description: "Electronics, anime, tech, unique niche retail globally famous" },
  ]},
  { city: "Singapore", lat: 1.3521, lng: 103.8198, zones: [
    { name: "Orchard Road", type: "retail", lat: 1.3048, lng: 103.8318, description: "Singapore's premier retail belt, international luxury brands" },
    { name: "Marina Bay / CBD", type: "business", lat: 1.2819, lng: 103.8503, description: "Financial hub, MNCs, highest office rents in Asia" },
    { name: "Bugis / Arab Street", type: "mixed", lat: 1.3009, lng: 103.8555, description: "Boutique shops, multicultural food, creative hub" },
    { name: "Chinatown / Tanjong Pagar", type: "restaurant", lat: 1.2842, lng: 103.8456, description: "Heritage dining, hawker centers, startup scene" },
    { name: "Jurong East / Westgate", type: "retail", lat: 1.3330, lng: 103.7435, description: "Suburban commercial hub, family shopping, growing density" },
  ]},
  { city: "Hong Kong", lat: 22.3193, lng: 114.1694, zones: [
    { name: "Central / IFC Mall", type: "business", lat: 22.2820, lng: 114.1575, description: "Asia's financial center, luxury, corporate, banking" },
    { name: "Causeway Bay / Times Square", type: "retail", lat: 22.2802, lng: 114.1839, description: "One of world's highest retail rents, massive footfall" },
    { name: "Mong Kok", type: "market", lat: 22.3193, lng: 114.1691, description: "Densest retail zone globally, street markets, electronics" },
    { name: "Wan Chai", type: "mixed", lat: 22.2778, lng: 114.1729, description: "Entertainment, restaurants, tech startups, expat zone" },
    { name: "Wong Tai Sin / Diamond Hill", type: "mixed", lat: 22.3413, lng: 114.1973, description: "Local community retail, F&B, growing residential area" },
  ]},
  { city: "Mumbai", lat: 19.0760, lng: 72.8777, zones: [
    { name: "Bandra West / Linking Road", type: "retail", lat: 19.0596, lng: 72.8295, description: "Mumbai's trendiest shopping zone, Bollywood crowd, premium" },
    { name: "Nariman Point / BKC", type: "business", lat: 18.9254, lng: 72.8241, description: "Financial district, MNC HQs, B2B, premium office" },
    { name: "Lower Parel", type: "mixed", lat: 18.9952, lng: 72.8314, description: "Upscale malls, fine dining, converted mill district" },
    { name: "Colaba Causeway", type: "market", lat: 18.9060, lng: 72.8225, description: "Tourist street market, antiques, jewelry, fashion" },
    { name: "Andheri West / Versova", type: "mixed", lat: 19.1245, lng: 72.8427, description: "Film industry, IT offices, growing F&B scene" },
  ]},
  { city: "Seoul", lat: 37.5665, lng: 126.9780, zones: [
    { name: "Gangnam / COEX", type: "retail", lat: 37.5048, lng: 127.0488, description: "Korea's luxury hub, tech offices, K-beauty brands" },
    { name: "Myeongdong", type: "retail", lat: 37.5636, lng: 126.9847, description: "Top tourist shopping, K-beauty, fashion, Chinese tourists" },
    { name: "Hongdae", type: "mixed", lat: 37.5563, lng: 126.9240, description: "University area, indie music, streetwear, youth culture" },
    { name: "Yeouido", type: "business", lat: 37.5219, lng: 126.9241, description: "Seoul's financial district, broadcasting, corporate" },
    { name: "Itaewon / Hanam-dong", type: "restaurant", lat: 37.5345, lng: 126.9927, description: "International dining, expat hub, diverse culture" },
  ]},
  { city: "Bangkok", lat: 13.7563, lng: 100.5018, zones: [
    { name: "Siam / Ratchaprasong", type: "retail", lat: 13.7466, lng: 100.5340, description: "Thailand's premium retail epicenter, Siam Paragon, luxury" },
    { name: "Sukhumvit (Lower)", type: "mixed", lat: 13.7366, lng: 100.5647, description: "Expat hub, restaurants, nightlife, premium residential" },
    { name: "Silom / Sathorn", type: "business", lat: 13.7267, lng: 100.5270, description: "Bangkok CBD, banking, law firms, corporate" },
    { name: "Chatuchak Weekend Market", type: "market", lat: 13.7998, lng: 100.5503, description: "World's largest weekend market, 15k+ stalls, 200k visitors/weekend" },
    { name: "Thong Lo / Ekkamai", type: "restaurant", lat: 13.7270, lng: 100.5839, description: "Trendy Japanese-Thai zone, premium cafés, expat dining" },
  ]},
  { city: "Shanghai", lat: 31.2304, lng: 121.4737, zones: [
    { name: "The Bund / Lujiazui", type: "business", lat: 31.2345, lng: 121.4927, description: "Shanghai's financial powerhouse, luxury hotels, premium" },
    { name: "Xintiandi", type: "restaurant", lat: 31.2202, lng: 121.4727, description: "Upscale dining, international brands, tourist & expat" },
    { name: "Nanjing Road", type: "retail", lat: 31.2368, lng: 121.4710, description: "China's busiest commercial street, 1M+ daily footfall" },
    { name: "Jing'an Temple area", type: "retail", lat: 31.2243, lng: 121.4416, description: "Premium retail, W hotels, international luxury brands" },
    { name: "Xujiahui", type: "mixed", lat: 31.1983, lng: 121.4364, description: "Electronics hub, electronics retail, mass market" },
  ]},
  { city: "New York", lat: 40.7128, lng: -74.0060, zones: [
    { name: "Fifth Avenue / Midtown", type: "retail", lat: 40.7589, lng: -73.9851, description: "World's most iconic shopping street, luxury & premium" },
    { name: "SoHo", type: "mixed", lat: 40.7233, lng: -74.0030, description: "Independent boutiques, galleries, pop-ups, direct-to-consumer" },
    { name: "Lower Manhattan / Financial District", type: "business", lat: 40.7074, lng: -74.0113, description: "Wall Street, financial services, B2B, fintech" },
    { name: "Brooklyn / Williamsburg", type: "mixed", lat: 40.7143, lng: -73.9570, description: "Artisan brands, food & bev, young professionals, DTC brands" },
    { name: "Times Square / Theater District", type: "retail", lat: 40.7580, lng: -73.9855, description: "50M tourists/year, flagship stores, entertainment" },
  ]},
  { city: "Los Angeles", lat: 34.0522, lng: -118.2437, zones: [
    { name: "Rodeo Drive / Beverly Hills", type: "retail", lat: 34.0698, lng: -118.3985, description: "World luxury retail landmark, high-net-worth shoppers" },
    { name: "Melrose Avenue", type: "mixed", lat: 34.0837, lng: -118.3505, description: "Trendy boutiques, streetwear, design studios, influencers" },
    { name: "Downtown LA (DTLA)", type: "business", lat: 34.0430, lng: -118.2673, description: "Corporate offices, fashion district, tech startups" },
    { name: "Santa Monica / 3rd Street Promenade", type: "retail", lat: 34.0195, lng: -118.4912, description: "Tourist & local retail, beach proximity, premium F&B" },
    { name: "Koreatown / Mid-Wilshire", type: "mixed", lat: 34.0620, lng: -118.3006, description: "Ethnic market, 24/7 culture, diverse F&B, community" },
  ]},
  { city: "Toronto", lat: 43.6532, lng: -79.3832, zones: [
    { name: "Bay Street / Financial District", type: "business", lat: 43.6489, lng: -79.3816, description: "Canada's financial center, banking, professional services" },
    { name: "Yorkville", type: "retail", lat: 43.6704, lng: -79.3918, description: "Toronto's luxury district, premium brands, upscale dining" },
    { name: "Kensington Market", type: "market", lat: 43.6545, lng: -79.4016, description: "Alternative market, vintage, multicultural food, youth" },
    { name: "King West / Entertainment District", type: "mixed", lat: 43.6444, lng: -79.3946, description: "Tech hub, nightlife, media companies, premium F&B" },
    { name: "Scarborough / Markham (east)", type: "mixed", lat: 43.7815, lng: -79.2318, description: "Asian communities, food halls, growing commercial zone" },
  ]},
  { city: "São Paulo", lat: -23.5505, lng: -46.6333, zones: [
    { name: "Paulista Avenue", type: "business", lat: -23.5637, lng: -46.6550, description: "Brazil's financial axis, HQs, cultural institutions, premium" },
    { name: "Oscar Freire Street", type: "retail", lat: -23.5614, lng: -46.6752, description: "Latin America's luxury retail street, designer brands" },
    { name: "Itaim Bibi / Vila Olímpia", type: "mixed", lat: -23.5878, lng: -46.6783, description: "Startup ecosystem, premium dining, corporate" },
    { name: "Bom Retiro (Fashion District)", type: "market", lat: -23.5271, lng: -46.6452, description: "Wholesale fashion, 1,000+ stores, B2B textile trade" },
    { name: "Pinheiros / Vila Madalena", type: "restaurant", lat: -23.5636, lng: -46.6901, description: "Artsy dining, creative professionals, weekend culture" },
  ]},
  { city: "Mexico City", lat: 19.4326, lng: -99.1332, zones: [
    { name: "Polanco", type: "retail", lat: 19.4333, lng: -99.1916, description: "Mexico's upscale district, Presidente Masaryk luxury strip" },
    { name: "Roma Norte / Condesa", type: "mixed", lat: 19.4135, lng: -99.1691, description: "Trendy cafés, independent boutiques, creative startups" },
    { name: "Paseo de la Reforma (CBD)", type: "business", lat: 19.4301, lng: -99.1706, description: "Corporate offices, financial institutions, B2B" },
    { name: "Centro Histórico / Garibaldi", type: "market", lat: 19.4325, lng: -99.1318, description: "Tourism, street market, traditional trade, millions visit" },
    { name: "Santa Fe", type: "business", lat: 19.3614, lng: -99.2654, description: "Modern business park, multinationals, upscale mall" },
  ]},
  { city: "Nairobi", lat: -1.2921, lng: 36.8219, zones: [
    { name: "Westlands / Gigiri", type: "mixed", lat: -1.2641, lng: 36.8096, description: "Expat hub, NGOs, embassies, premium F&B, retail" },
    { name: "CBD / Kenyatta Avenue", type: "market", lat: -1.2842, lng: 36.8227, description: "High foot traffic, banking, telecoms, street retail" },
    { name: "Karen / Langata", type: "retail", lat: -1.3267, lng: 36.6967, description: "Affluent suburb, boutique shops, premium lifestyle" },
    { name: "Kilimani / Lavington", type: "restaurant", lat: -1.2882, lng: 36.7760, description: "Restaurant row, young professionals, middle-upper class" },
    { name: "Industrial Area / Mombasa Road", type: "business", lat: -1.3186, lng: 36.8508, description: "Manufacturing, B2B, logistics, warehousing" },
  ]},
  { city: "Lagos", lat: 6.5244, lng: 3.3792, zones: [
    { name: "Victoria Island (VI)", type: "business", lat: 6.4281, lng: 3.4219, description: "Financial hub, embassies, luxury hotels, premium dining" },
    { name: "Lekki Phase 1", type: "retail", lat: 6.4355, lng: 3.5019, description: "Upscale residential, premium retail, restaurants" },
    { name: "Balogun Market / Lagos Island", type: "market", lat: 6.4541, lng: 3.3937, description: "Nigeria's largest market, textile, wholesale, millions daily" },
    { name: "Ikeja / Allen Avenue", type: "mixed", lat: 6.6018, lng: 3.3515, description: "Commercial hub, electronics, B2B, services" },
    { name: "Yaba / Herbert Macaulay Way", type: "mixed", lat: 6.5085, lng: 3.3747, description: "Tech startup hub (Yabacon Valley), youth culture, F&B" },
  ]},
  { city: "Johannesburg", lat: -26.2041, lng: 28.0473, zones: [
    { name: "Sandton / Sandton City", type: "retail", lat: -26.1083, lng: 28.0570, description: "Africa's richest square mile, luxury brands, corporate" },
    { name: "Rosebank", type: "mixed", lat: -26.1467, lng: 28.0436, description: "Boutiques, art, restaurants, professional services" },
    { name: "Maboneng Precinct", type: "mixed", lat: -26.2016, lng: 28.0619, description: "Creative district, markets, art galleries, weekend culture" },
    { name: "Soweto / Vilakazi Street", type: "market", lat: -26.2785, lng: 27.8536, description: "Tourism, cultural market, heritage, growing community" },
    { name: "Midrand / Waterfall", type: "business", lat: -25.9987, lng: 28.1293, description: "Corporate parks, logistics, warehousing, B2B" },
  ]},
  { city: "Sydney", lat: -33.8688, lng: 151.2093, zones: [
    { name: "CBD / Pitt Street Mall", type: "retail", lat: -33.8696, lng: 151.2087, description: "Australia's highest retail density, international brands" },
    { name: "Surry Hills / Newtown", type: "mixed", lat: -33.8882, lng: 151.2105, description: "Creative hub, independent cafés, boutiques, designers" },
    { name: "Darling Harbour / Barangaroo", type: "restaurant", lat: -33.8694, lng: 151.1989, description: "Waterfront entertainment, premium dining, tourism" },
    { name: "Macquarie Street / Martin Place", type: "business", lat: -33.8699, lng: 151.2108, description: "Financial and legal precinct, B2B, premium corporate" },
    { name: "Parramatta / Western Sydney", type: "retail", lat: -33.8150, lng: 151.0009, description: "Second CBD, diverse community, mass market retail" },
  ]},
  { city: "Melbourne", lat: -37.8136, lng: 144.9631, zones: [
    { name: "Bourke Street Mall / CBD", type: "retail", lat: -37.8142, lng: 144.9648, description: "Melbourne's retail core, pedestrian zone, major brands" },
    { name: "Fitzroy / Brunswick", type: "mixed", lat: -37.7994, lng: 144.9779, description: "Hipster culture, independent retail, cafés, art, youth" },
    { name: "Docklands / Southbank", type: "business", lat: -37.8183, lng: 144.9464, description: "Corporate zone, finance, media companies, waterfront" },
    { name: "Chapel Street (South Yarra)", type: "retail", lat: -37.8372, lng: 144.9928, description: "Fashion, beauty, upscale F&B, young professionals" },
    { name: "Chinatown / QV Market", type: "market", lat: -37.8097, lng: 144.9701, description: "Queen Victoria Market (oldest), multicultural, tourism" },
  ]},
  { city: "Casablanca", lat: 33.5731, lng: -7.5898, zones: [
    { name: "Morocco Mall / Anfa", type: "retail", lat: 33.5788, lng: -7.6585, description: "Largest mall in Africa, premium brands, expats and upper class" },
    { name: "Maârif / Bourgogne", type: "mixed", lat: 33.5842, lng: -7.6377, description: "Premium dining, boutiques, professionals, embassy zone" },
    { name: "Twin Center / Casablanca CBD", type: "business", lat: 33.5967, lng: -7.6250, description: "Financial hub, corporate towers, B2B services" },
    { name: "Derb Omar (Wholesale Market)", type: "market", lat: 33.5869, lng: -7.5793, description: "Wholesale trade hub, textiles, mass market distribution" },
    { name: "Ain Diab Corniche", type: "restaurant", lat: 33.5934, lng: -7.6759, description: "Beach restaurants, nightlife, expat dining, upscale" },
  ]},
  { city: "Kuala Lumpur", lat: 3.1390, lng: 101.6869, zones: [
    { name: "Bukit Bintang / KLCC", type: "retail", lat: 3.1481, lng: 101.7113, description: "Malaysia's luxury retail hub, Pavilion, Suria KLCC" },
    { name: "Bangsar / Damansara", type: "restaurant", lat: 3.1316, lng: 101.6782, description: "Expat dining zone, premium cafés, boutique shops" },
    { name: "KL Sentral / Tun Razak Exchange", type: "business", lat: 3.1340, lng: 101.6873, description: "Financial district, multinationals, fintech hub" },
    { name: "Petaling Street / Chinatown", type: "market", lat: 3.1442, lng: 101.6986, description: "Traditional market, street food, tourism, heritage" },
    { name: "Mont Kiara", type: "mixed", lat: 3.1712, lng: 101.6501, description: "Expat enclave, premium services, international schools" },
  ]},
  { city: "Jakarta", lat: -6.2088, lng: 106.8456, zones: [
    { name: "SCBD / Sudirman", type: "business", lat: -6.2293, lng: 106.8071, description: "Jakarta's financial district, multinationals, premium" },
    { name: "Grand Indonesia / Plaza Indonesia", type: "retail", lat: -6.1937, lng: 106.8213, description: "Premium mall area, luxury brands, tourist & local" },
    { name: "Kemang", type: "restaurant", lat: -6.2627, lng: 106.8215, description: "Expat dining, creative professionals, boutique cafés" },
    { name: "Tanah Abang", type: "market", lat: -6.1912, lng: 106.8128, description: "Asia's largest textile market, wholesale, mass market" },
    { name: "BSD City / Alam Sutera", type: "mixed", lat: -6.3056, lng: 106.6528, description: "Satellite city, growing tech ecosystem, family market" },
  ]},
  { city: "Manila", lat: 14.5995, lng: 120.9842, zones: [
    { name: "BGC (Bonifacio Global City)", type: "mixed", lat: 14.5508, lng: 121.0495, description: "Manila's modern hub, multinationals, premium dining" },
    { name: "Makati CBD", type: "business", lat: 14.5547, lng: 121.0244, description: "Business district, banking, corporate HQs, Greenbelt" },
    { name: "Ortigas Center", type: "retail", lat: 14.5870, lng: 121.0565, description: "Major retail malls, BPO offices, middle income" },
    { name: "Divisoria Market", type: "market", lat: 14.6094, lng: 120.9792, description: "Philippines' largest wholesale market, all categories" },
    { name: "Poblacion / Rockwell", type: "restaurant", lat: 14.5625, lng: 121.0207, description: "Trendy bars, upscale dining, creative professionals" },
  ]},
  { city: "Karachi", lat: 24.8607, lng: 67.0011, zones: [
    { name: "Dolmen City / Clifton", type: "retail", lat: 24.8203, lng: 67.0278, description: "Premium mall, upper class, sea-facing, flagship brands" },
    { name: "Defence (DHA)", type: "mixed", lat: 24.8193, lng: 67.0586, description: "Upscale residential-commercial, premium F&B, boutiques" },
    { name: "Saddar (Downtown)", type: "market", lat: 24.8606, lng: 67.0127, description: "Historic commercial hub, mass market, electronics" },
    { name: "Korangi Industrial Area", type: "business", lat: 24.8297, lng: 67.0874, description: "Pakistan's largest industrial zone, B2B, manufacturing" },
    { name: "Gulshan-e-Iqbal", type: "mixed", lat: 24.9253, lng: 67.0893, description: "Middle class hub, restaurants, retail, family market" },
  ]},
  { city: "Dhaka", lat: 23.8103, lng: 90.4125, zones: [
    { name: "Gulshan / Banani", type: "mixed", lat: 23.7925, lng: 90.4148, description: "Affluent zone, expats, embassies, premium F&B, boutiques" },
    { name: "Dhanmondi", type: "mixed", lat: 23.7461, lng: 90.3742, description: "Residential-commercial, universities, restaurants, retail" },
    { name: "Motijheel (CBD)", type: "business", lat: 23.7330, lng: 90.4234, description: "Bangladesh's financial district, banks, corporate" },
    { name: "Gausia / New Market", type: "market", lat: 23.7335, lng: 90.3843, description: "High-volume retail, fashion, affordable prices" },
    { name: "Jamuna Future Park", type: "retail", lat: 23.8282, lng: 90.4249, description: "Bangladesh's largest mall, all income segments, F&B" },
  ]},
  { city: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297, zones: [
    { name: "District 1 / Dong Khoi", type: "retail", lat: 10.7773, lng: 106.7033, description: "Prime tourist and expat zone, luxury hotels, fashion" },
    { name: "Thao Dien / An Phu (D2)", type: "restaurant", lat: 10.8018, lng: 106.7383, description: "Expat community, premium dining, international schools" },
    { name: "Phu My Hung (D7)", type: "mixed", lat: 10.7288, lng: 106.7016, description: "Korean expat hub, upscale development, premium retail" },
    { name: "Ben Thanh Market area", type: "market", lat: 10.7726, lng: 106.6981, description: "Tourist market, street food, high footfall, 24/7 activity" },
    { name: "Binh Thanh / D3", type: "business", lat: 10.7984, lng: 106.7018, description: "Growing tech cluster, co-working, SME office" },
  ]},
  { city: "Buenos Aires", lat: -34.6037, lng: -58.3816, zones: [
    { name: "Palermo Soho / Hollywood", type: "mixed", lat: -34.5869, lng: -58.4260, description: "Trendy district, independent boutiques, design, F&B" },
    { name: "Puerto Madero", type: "restaurant", lat: -34.6140, lng: -58.3656, description: "Waterfront fine dining, tourist zone, premium steak" },
    { name: "Microcentro / San Nicolás", type: "business", lat: -34.6068, lng: -58.3738, description: "Financial center, banking, corporate offices" },
    { name: "Recoleta", type: "retail", lat: -34.5871, lng: -58.3930, description: "Upscale residential, luxury retail, Recoleta Mall" },
    { name: "La Boca / San Telmo", type: "market", lat: -34.6282, lng: -58.3704, description: "Tourism, tango, antique market, artisan craft" },
  ]},
  { city: "Bogotá", lat: 4.7110, lng: -74.0721, zones: [
    { name: "Zona Rosa / Chicó", type: "retail", lat: 4.6683, lng: -74.0556, description: "Bogotá's upscale zone, Andino mall, premium dining" },
    { name: "Centro Internacional", type: "business", lat: 4.6235, lng: -74.0762, description: "Business center, banks, hotels, corporate services" },
    { name: "La Candelaria (Historic)", type: "market", lat: 4.5978, lng: -74.0752, description: "Government, tourism, street trade, cultural area" },
    { name: "Usaquén", type: "restaurant", lat: 4.6953, lng: -74.0305, description: "Weekend flea market, premium restaurants, colonial charm" },
    { name: "El Salitre / Gran Estación", type: "retail", lat: 4.6467, lng: -74.0987, description: "Middle-class shopping, commercial hub, Gran Estación Mall" },
  ]},
  { city: "Lima", lat: -12.0464, lng: -77.0428, zones: [
    { name: "Miraflores", type: "retail", lat: -18.1126, lng: -70.2505, description: "Lima's upscale zone, Larcomar mall, Pacific views, tourism" },
    { name: "San Isidro (Financial District)", type: "business", lat: -12.0971, lng: -77.0366, description: "Lima's corporate hub, banks, law firms, premium office" },
    { name: "Barranco", type: "restaurant", lat: -12.1486, lng: -77.0214, description: "Bohemian district, top-rated restaurants, boutique hotels" },
    { name: "La Victoria / Gamarra", type: "market", lat: -12.0664, lng: -77.0277, description: "Peru's largest textile market, wholesale, high volume trade" },
    { name: "Surco / La Molina", type: "mixed", lat: -12.1548, lng: -76.9853, description: "Upscale residential, malls, family services, growing F&B" },
  ]},
  { city: "Santiago", lat: -33.4489, lng: -70.6693, zones: [
    { name: "Las Condes / Vitacura", type: "retail", lat: -33.4023, lng: -70.5738, description: "Santiago's luxury zone, Parque Arauco, El Golf financial" },
    { name: "Providencia", type: "mixed", lat: -33.4244, lng: -70.6131, description: "Restaurant row, boutiques, young professionals, cafés" },
    { name: "Santiago Centro", type: "business", lat: -33.4530, lng: -70.6738, description: "Historic CBD, government, banking, traditional retail" },
    { name: "Barrio Italia / Lastarria", type: "restaurant", lat: -33.4436, lng: -70.6499, description: "Trendy creative zone, antiques, vintage, artisan food" },
    { name: "Maipu / San Bernardo (south)", type: "mixed", lat: -33.5173, lng: -70.7580, description: "Mass market, community retail, working class commerce" },
  ]},
  { city: "Accra", lat: 5.6037, lng: -0.1870, zones: [
    { name: "Airport Residential / East Legon", type: "retail", lat: 5.6234, lng: -0.1566, description: "Affluent suburb, premium retail, diplomatic community" },
    { name: "Osu / Oxford Street", type: "mixed", lat: 5.5617, lng: -0.1751, description: "Trendy bars, restaurants, boutiques, expat hub" },
    { name: "CBD / High Street", type: "business", lat: 5.5500, lng: -0.1967, description: "Financial district, government, trading companies" },
    { name: "Kaneshie / Tema Station", type: "market", lat: 5.5657, lng: -0.2403, description: "Mass market trading, wholesale, high volume commerce" },
    { name: "Accra Mall / Spintex Road", type: "retail", lat: 5.5973, lng: -0.1270, description: "Modern retail zone, middle income, growing commercial" },
  ]},
  { city: "Addis Ababa", lat: 9.0320, lng: 38.7469, zones: [
    { name: "Bole Road / Bole Medhanialem", type: "retail", lat: 8.9960, lng: 38.7985, description: "Modern commercial hub, expats, premium hotels, malls" },
    { name: "Piazza / Arat Kilo", type: "market", lat: 9.0311, lng: 38.7492, description: "Traditional trade, Merkato proximity, mass market" },
    { name: "Merkato", type: "market", lat: 9.0176, lng: 38.7319, description: "Africa's largest open market, wholesale, all categories" },
    { name: "Mexico Square / Kazanchis", type: "business", lat: 8.9953, lng: 38.7562, description: "Embassies, UN agencies, B2B, international orgs" },
    { name: "Hayahulet (CMC Road)", type: "mixed", lat: 9.0192, lng: 38.8024, description: "Growing suburb, cafés, retail, middle class" },
  ]},
  { city: "Dar es Salaam", lat: -6.7924, lng: 39.2083, zones: [
    { name: "Masaki / Oyster Bay", type: "retail", lat: -6.7616, lng: 39.2839, description: "Expat hub, premium restaurants, boutiques, diplomats" },
    { name: "Mikocheni / Sam Nujoma Road", type: "mixed", lat: -6.7758, lng: 39.2512, description: "Growing commercial zone, F&B, professional services" },
    { name: "Kariakoo Market", type: "market", lat: -6.8240, lng: 39.2795, description: "Largest market in East Africa, wholesale, mass trade" },
    { name: "Msasani Peninsula", type: "restaurant", lat: -6.7627, lng: 39.2884, description: "Beach restaurants, expat leisure, premium dining" },
    { name: "CBD / Ohio Street", type: "business", lat: -6.8116, lng: 39.2853, description: "Financial district, banks, government offices" },
  ]},
  { city: "Tunis", lat: 36.8065, lng: 10.1815, zones: [
    { name: "Lac I / Les Berges du Lac", type: "business", lat: 36.8379, lng: 10.2286, description: "Modern business hub, corporate offices, embassies" },
    { name: "Avenue Habib Bourguiba", type: "retail", lat: 36.7988, lng: 10.1825, description: "Historic commercial boulevard, tourism, cafés, retail" },
    { name: "La Marsa / Sidi Bou Said", type: "restaurant", lat: 36.8781, lng: 10.3243, description: "Coastal upscale zone, tourism, premium dining, art" },
    { name: "Medina of Tunis", type: "market", lat: 36.7988, lng: 10.1697, description: "UNESCO heritage souk, traditional trade, tourism" },
    { name: "Ariana / El Menzah", type: "mixed", lat: 36.8625, lng: 10.1938, description: "Middle class suburb, malls, community retail" },
  ]},
  { city: "Kampala", lat: 0.3476, lng: 32.5825, zones: [
    { name: "Kololo / Nakasero Hill", type: "business", lat: 0.3298, lng: 32.5851, description: "Diplomatic zone, NGOs, premium offices, embassies" },
    { name: "Kamwokya / Kabalagala", type: "restaurant", lat: 0.3369, lng: 32.5956, description: "Expat dining, nightlife, creative scene" },
    { name: "Owino / St. Balikuddembe Market", type: "market", lat: 0.3166, lng: 32.5767, description: "Uganda's largest market, all categories, mass trade" },
    { name: "Ntinda / Bugolobi", type: "mixed", lat: 0.3477, lng: 32.6107, description: "Growing middle class zone, retail, F&B" },
    { name: "Industrial Area / Nakawa", type: "business", lat: 0.3268, lng: 32.6132, description: "Manufacturing, warehousing, B2B trade" },
  ]},
  { city: "Zurich", lat: 47.3769, lng: 8.5417, zones: [
    { name: "Bahnhofstrasse", type: "retail", lat: 47.3749, lng: 8.5392, description: "World's most expensive shopping street, luxury & banking" },
    { name: "Langstrasse / Kreis 4", type: "mixed", lat: 47.3788, lng: 8.5288, description: "Alternative culture, multicultural F&B, nightlife, youth" },
    { name: "Zurich West / Hardturm", type: "business", lat: 47.3879, lng: 8.5152, description: "Tech and creative hub, startup ecosystem, media" },
    { name: "Europaallee (HB area)", type: "business", lat: 47.3780, lng: 8.5390, description: "Modern development, corporate, premium F&B near station" },
    { name: "Niederdorf / Old Town", type: "restaurant", lat: 47.3727, lng: 8.5426, description: "Tourism, restaurants, boutique shops, nightlife" },
  ]},
  { city: "Vienna", lat: 48.2082, lng: 16.3738, zones: [
    { name: "Kärntner Straße / Graben", type: "retail", lat: 48.2073, lng: 16.3723, description: "Vienna's premier shopping zone, luxury and mid-market" },
    { name: "Mariahilfer Straße", type: "retail", lat: 48.1979, lng: 16.3518, description: "Vienna's longest shopping street, mass market, tourists" },
    { name: "Innere Stadt (1st District)", type: "business", lat: 48.2092, lng: 16.3717, description: "Historic core, embassies, luxury hotels, corporate" },
    { name: "Prater / Leopoldstadt", type: "mixed", lat: 48.2097, lng: 16.4000, description: "Tourism, Naschmarkt, diverse F&B, growing startup scene" },
    { name: "Erdberg / 3rd District", type: "business", lat: 48.1949, lng: 16.3971, description: "Corporate park, international companies, logistics" },
  ]},
  { city: "Stockholm", lat: 59.3293, lng: 18.0686, zones: [
    { name: "Drottninggatan", type: "retail", lat: 59.3338, lng: 18.0649, description: "Sweden's busiest pedestrian shopping street" },
    { name: "Södermalm", type: "mixed", lat: 59.3126, lng: 18.0654, description: "Creative hub, independent cafés, vintage, design brands" },
    { name: "Stureplan / Östermalm", type: "retail", lat: 59.3368, lng: 18.0774, description: "Stockholm's luxury district, premium brands, Nordiska" },
    { name: "Kista Science City", type: "business", lat: 59.4025, lng: 17.9425, description: "Stockholm's tech hub, Ericsson, multinationals, startups" },
    { name: "Hammarby Sjöstad", type: "mixed", lat: 59.3057, lng: 18.0834, description: "Sustainable urban development, growing community, F&B" },
  ]},
  { city: "Prague", lat: 50.0755, lng: 14.4378, zones: [
    { name: "Wenceslas Square / Old Town", type: "retail", lat: 50.0818, lng: 14.4274, description: "Tourist hub, major brands, 20M tourists/year visit area" },
    { name: "Vinohrady", type: "mixed", lat: 50.0748, lng: 14.4462, description: "Expat residential, premium cafés, boutiques, lifestyle" },
    { name: "Nusle / Pankrác", type: "business", lat: 50.0565, lng: 14.4263, description: "Prague's business district, corporate offices, B2B" },
    { name: "Žižkov / Florenc", type: "market", lat: 50.0887, lng: 14.4549, description: "Working class market, wholesale, traditional commerce" },
    { name: "Holešovice", type: "mixed", lat: 50.1043, lng: 14.4477, description: "Emerging creative district, galleries, F&B, tech startups" },
  ]},
  { city: "Warsaw", lat: 52.2297, lng: 21.0122, zones: [
    { name: "Złote Tarasy / Centrum", type: "retail", lat: 52.2286, lng: 20.9981, description: "Warsaw's prime shopping, central station proximity" },
    { name: "Śródmieście (Downtown)", type: "business", lat: 52.2319, lng: 21.0107, description: "Financial district, multinationals, modern office towers" },
    { name: "Praga North / South", type: "mixed", lat: 52.2502, lng: 21.0434, description: "Creative revitalization, galleries, F&B, emerging cool" },
    { name: "Mokotów", type: "mixed", lat: 52.1946, lng: 21.0218, description: "Business parks, tech companies, residential, Galeria Mokotów" },
    { name: "Stare Miasto (Old Town)", type: "market", lat: 52.2498, lng: 21.0124, description: "Tourism, heritage market, restaurants, craft shops" },
  ]},
  { city: "Lisbon", lat: 38.7223, lng: -9.1393, zones: [
    { name: "Chiado / Bairro Alto", type: "mixed", lat: 38.7103, lng: -9.1415, description: "Trendy boutiques, cafés, tourists and young locals" },
    { name: "Baixa Pombalina", type: "retail", lat: 38.7120, lng: -9.1380, description: "Historic shopping district, pedestrian zone, tourism" },
    { name: "Parque das Nações", type: "business", lat: 38.7657, lng: -9.0916, description: "Modern business hub, tech companies, Vasco da Gama Mall" },
    { name: "LX Factory / Alcântara", type: "mixed", lat: 38.7067, lng: -9.1723, description: "Creative economy, weekend market, pop-up culture" },
    { name: "Almada / Cacilhas (south bank)", type: "mixed", lat: 38.6826, lng: -9.1535, description: "Growing alternative hub, river view restaurants, community" },
  ]},
  { city: "Athens", lat: 37.9838, lng: 23.7275, zones: [
    { name: "Kolonaki", type: "retail", lat: 37.9798, lng: 23.7431, description: "Athens' upscale district, luxury boutiques, embassy area" },
    { name: "Monastiraki / Plaka", type: "market", lat: 37.9764, lng: 23.7237, description: "Flea market, tourism, street trade, high footfall" },
    { name: "Syntagma / Ermou Street", type: "retail", lat: 37.9757, lng: 23.7356, description: "Main shopping street, international brands, government" },
    { name: "Piraeus Port area", type: "business", lat: 37.9431, lng: 23.6465, description: "Mediterranean shipping hub, maritime trade, logistics" },
    { name: "Gazi / Metaxourgeio", type: "mixed", lat: 37.9789, lng: 23.7173, description: "Creative revitalization, nightlife, galleries, F&B" },
  ]},
  { city: "Dublin", lat: 53.3498, lng: -6.2603, zones: [
    { name: "Grafton Street", type: "retail", lat: 53.3406, lng: -6.2597, description: "Ireland's premier shopping street, international brands" },
    { name: "Silicon Docks (Grand Canal)", type: "business", lat: 53.3350, lng: -6.2329, description: "Google, Meta, Airbnb, LinkedIn Europe HQs, tech hub" },
    { name: "Temple Bar", type: "restaurant", lat: 53.3453, lng: -6.2659, description: "Dublin's cultural quarter, pub culture, tourism, art" },
    { name: "IFSC", type: "business", lat: 53.3513, lng: -6.2461, description: "International Financial Services Centre, banking, fintech" },
    { name: "Dundrum Town Centre (south)", type: "retail", lat: 53.2918, lng: -6.2426, description: "Ireland's largest mall, suburban affluent, family retail" },
  ]},
  { city: "Copenhagen", lat: 55.6761, lng: 12.5683, zones: [
    { name: "Strøget (pedestrian strip)", type: "retail", lat: 55.6757, lng: 12.5690, description: "World's longest pedestrian shopping street" },
    { name: "Vesterbro / Meatpacking District", type: "mixed", lat: 55.6710, lng: 12.5519, description: "Creative hub, cocktail bars, boutiques, design studios" },
    { name: "Nørreport / Nørrebro", type: "mixed", lat: 55.6886, lng: 12.5613, description: "Multicultural market, young population, F&B diversity" },
    { name: "Islands Brygge / Ørestad", type: "business", lat: 55.6630, lng: 12.5766, description: "Modern business quarter, Maersk HQ area, IT companies" },
    { name: "Frederiksberg Centre", type: "retail", lat: 55.6780, lng: 12.5224, description: "Affluent shopping, community retail, family brands" },
  ]},
  { city: "Oslo", lat: 59.9139, lng: 10.7522, zones: [
    { name: "Karl Johans Gate", type: "retail", lat: 59.9122, lng: 10.7460, description: "Oslo's main shopping street, tourist axis, major brands" },
    { name: "Aker Brygge / Tjuvholmen", type: "restaurant", lat: 59.9082, lng: 10.7252, description: "Waterfront dining, art galleries, premium cafés" },
    { name: "Grünerløkka", type: "mixed", lat: 59.9258, lng: 10.7584, description: "Trendy vintage, cafés, design shops, young professionals" },
    { name: "Lysaker / Fornebu", type: "business", lat: 59.8978, lng: 10.6253, description: "Tech companies, Telenor HQ, multinational offices" },
    { name: "Sentrum / Bjørvika", type: "mixed", lat: 59.9070, lng: 10.7565, description: "Opera House area, modern development, tourism" },
  ]},
  { city: "Brussels", lat: 50.8503, lng: 4.3517, zones: [
    { name: "Grand Place / Rue Neuve", type: "retail", lat: 50.8466, lng: 4.3528, description: "UNESCO World Heritage, tourist hub, mass retail" },
    { name: "Louise Avenue / Sablon", type: "retail", lat: 50.8374, lng: 4.3570, description: "Luxury brands, chocolate shops, antique dealers" },
    { name: "EU Quarter / Schuman", type: "business", lat: 50.8430, lng: 4.3773, description: "European institutions, lobbying firms, diplomatic" },
    { name: "Ixelles / Châtelain", type: "restaurant", lat: 50.8303, lng: 4.3649, description: "Brussels' trendiest dining scene, expats, markets" },
    { name: "Laeken / Atomium area", type: "mixed", lat: 50.8951, lng: 4.3411, description: "Tourism, Atomium landmark, events zone" },
  ]},
  { city: "Bucharest", lat: 44.4268, lng: 26.1025, zones: [
    { name: "Floreasca / Barbu Văcărescu", type: "business", lat: 44.4680, lng: 26.1060, description: "Bucharest's emerging tech & business corridor, startups" },
    { name: "Calea Victoriei / Old Town", type: "mixed", lat: 44.4337, lng: 26.0985, description: "Historic commercial avenue, boutiques, café culture" },
    { name: "Pipera / Voluntari", type: "business", lat: 44.5043, lng: 26.1408, description: "Corporate campus zone, multinationals, IT outsourcing" },
    { name: "Militari / Cora Lujerului", type: "retail", lat: 44.4325, lng: 25.9983, description: "Mass market shopping, community commercial hub" },
    { name: "Lipscani / Hanul lui Manuc", type: "market", lat: 44.4313, lng: 26.1019, description: "Old town market, tourism, traditional craft, street food" },
  ]},
  { city: "Budapest", lat: 47.4979, lng: 19.0402, zones: [
    { name: "Váci utca / Vörösmarty Square", type: "retail", lat: 47.4975, lng: 19.0523, description: "Budapest's main pedestrian retail and tourist zone" },
    { name: "Andrássy Avenue", type: "mixed", lat: 47.5037, lng: 19.0632, description: "UNESCO listed boulevard, luxury brands, embassies" },
    { name: "Corvin / Millennium City Center", type: "business", lat: 47.4859, lng: 19.0592, description: "Modern office district, tech companies, IT hub" },
    { name: "Ruin Bars / District VII (Erzsébetváros)", type: "restaurant", lat: 47.5001, lng: 19.0645, description: "Unique ruin bar culture, tourism, creative F&B" },
    { name: "Óbuda / Aquincum", type: "mixed", lat: 47.5434, lng: 19.0384, description: "Residential-commercial growth zone, community retail" },
  ]},
  { city: "Kyiv", lat: 50.4501, lng: 30.5234, zones: [
    { name: "Khreshchatyk / Maidan", type: "retail", lat: 50.4501, lng: 30.5241, description: "Kyiv's main boulevard, central retail and government" },
    { name: "Podil", type: "mixed", lat: 50.4645, lng: 30.5178, description: "Historic creative quarter, boutiques, cafés, tech" },
    { name: "UNIT.City / Svyatoshyn", type: "business", lat: 50.4713, lng: 30.4357, description: "Kyiv's innovation park, tech startups, IT companies" },
    { name: "Obolon / Petrivka", type: "market", lat: 50.5027, lng: 30.4977, description: "Electronics market, wholesale, community retail" },
    { name: "Lypky / Pechersk", type: "business", lat: 50.4368, lng: 30.5400, description: "Government and diplomatic zone, premium offices" },
  ]},
  { city: "Helsinki", lat: 60.1699, lng: 24.9384, zones: [
    { name: "Aleksanterinkatu / Esplanadi", type: "retail", lat: 60.1679, lng: 24.9388, description: "Helsinki's main retail corridor, Stockmann, design" },
    { name: "Kallio", type: "mixed", lat: 60.1849, lng: 24.9469, description: "Trendy neighborhood, bars, vintage, young professionals" },
    { name: "Ruoholahti / Keilaniemi", type: "business", lat: 60.1600, lng: 24.8964, description: "Nokia legacy area, tech companies, modern offices" },
    { name: "Market Square / Hakaniemi", type: "market", lat: 60.1672, lng: 24.9527, description: "Traditional Finnish market hall, tourism, local produce" },
    { name: "Espoo / Tapiola", type: "business", lat: 60.1743, lng: 24.8055, description: "Silicon Valley of Finland, Aalto University, tech hub" },
  ]},
  { city: "Auckland", lat: -36.8485, lng: 174.7633, zones: [
    { name: "Queen Street / CBD", type: "retail", lat: -36.8477, lng: 174.7631, description: "Auckland's main retail and financial core" },
    { name: "Ponsonby / Grey Lynn", type: "mixed", lat: -36.8567, lng: 174.7369, description: "Trendy boutiques, cafés, creative professionals" },
    { name: "Takapuna (North Shore)", type: "retail", lat: -36.7882, lng: 174.7744, description: "Suburban retail hub, beach proximity, family market" },
    { name: "Viaduct Harbour / Wynyard Quarter", type: "restaurant", lat: -36.8439, lng: 174.7615, description: "Waterfront dining, premium hospitality, tech offices" },
    { name: "Manukau / South Auckland", type: "mixed", lat: -36.9935, lng: 174.8786, description: "Pacific community, budget retail, wholesale market" },
  ]},
  { city: "Brisbane", lat: -27.4698, lng: 153.0251, zones: [
    { name: "Queen Street Mall", type: "retail", lat: -27.4700, lng: 153.0235, description: "Australia's largest pedestrian mall, all retail categories" },
    { name: "Fortitude Valley", type: "mixed", lat: -27.4585, lng: 153.0338, description: "Creative hub, nightlife, boutiques, tech startups" },
    { name: "CBD / Eagle Street", type: "business", lat: -27.4691, lng: 153.0310, description: "Corporate zone, law firms, financial services" },
    { name: "South Bank", type: "restaurant", lat: -27.4820, lng: 153.0186, description: "Cultural precinct, dining, tourism, weekend crowds" },
    { name: "Chermside / North Lakes", type: "retail", lat: -27.3883, lng: 153.0330, description: "Northern suburb retail, family shopping, Chermside Mall" },
  ]},
  { city: "Perth", lat: -31.9505, lng: 115.8605, zones: [
    { name: "Hay Street / Murray Street Mall", type: "retail", lat: -31.9518, lng: 115.8606, description: "Perth's main shopping mall network, international brands" },
    { name: "Subiaco", type: "mixed", lat: -31.9478, lng: 115.8267, description: "Lifestyle retail, cafés, medical cluster, local market" },
    { name: "West Perth / St Georges Terrace", type: "business", lat: -31.9510, lng: 115.8519, description: "Perth CBD, mining companies, corporate services" },
    { name: "Fremantle", type: "market", lat: -32.0569, lng: 115.7469, description: "Historic port market, tourism, artisan goods, F&B" },
    { name: "Joondalup / Whitford (north)", type: "retail", lat: -31.7502, lng: 115.7661, description: "Northern suburb shopping hub, family retail" },
  ]},
  { city: "Adelaide", lat: -34.9285, lng: 138.6007, zones: [
    { name: "Rundle Mall", type: "retail", lat: -34.9231, lng: 138.6011, description: "Adelaide's main pedestrian retail zone, brands + local" },
    { name: "Gouger Street / Central Market", type: "restaurant", lat: -34.9285, lng: 138.5984, description: "Adelaide Central Market, multicultural F&B, foodie hub" },
    { name: "Hutt Street / Hyde Park", type: "mixed", lat: -34.9374, lng: 138.6086, description: "Lifestyle retail, independent cafés, boutiques" },
    { name: "CBD / North Terrace", type: "business", lat: -34.9195, lng: 138.6009, description: "Universities, cultural institutions, corporate offices" },
    { name: "Tea Tree Gully / Modbury", type: "retail", lat: -34.8231, lng: 138.7074, description: "Northeast suburb commercial hub, family retail" },
  ]},
  { city: "Nairobi", lat: -1.2921, lng: 36.8219, zones: [
    { name: "Westlands / Gigiri", type: "mixed", lat: -1.2641, lng: 36.8096, description: "Expat hub, NGOs, embassies, premium F&B, retail" },
    { name: "CBD / Kenyatta Avenue", type: "market", lat: -1.2842, lng: 36.8227, description: "High foot traffic, banking, telecoms, street retail" },
    { name: "Karen / Langata", type: "retail", lat: -1.3267, lng: 36.6967, description: "Affluent suburb, boutique shops, premium lifestyle" },
    { name: "Kilimani / Lavington", type: "restaurant", lat: -1.2882, lng: 36.7760, description: "Restaurant row, young professionals, middle-upper class" },
    { name: "Industrial Area / Mombasa Road", type: "business", lat: -1.3186, lng: 36.8508, description: "Manufacturing, B2B, logistics, warehousing" },
  ]},
  { city: "Cape Town", lat: -33.9249, lng: 18.4241, zones: [
    { name: "V&A Waterfront", type: "retail", lat: -33.9021, lng: 18.4183, description: "Cape Town's most visited destination, luxury & tourism" },
    { name: "Green Point / De Waterkant", type: "mixed", lat: -33.9076, lng: 18.4092, description: "Premium lifestyle, boutiques, creative agencies" },
    { name: "Sea Point Promenade", type: "restaurant", lat: -33.9193, lng: 18.3892, description: "Waterfront dining, jogging community, expat F&B" },
    { name: "CBD / Buitenkant / Long Street", type: "market", lat: -33.9248, lng: 18.4238, description: "Backpackers, vintage, art galleries, tourism" },
    { name: "Stellenbosch / Paarl (winelands)", type: "mixed", lat: -33.9321, lng: 18.8602, description: "Wine tourism, farm shops, premium hospitality" },
  ]},
  { city: "Vancouver", lat: 49.2827, lng: -123.1207, zones: [
    { name: "Robson Street / Downtown", type: "retail", lat: 49.2829, lng: -123.1213, description: "Vancouver's main retail core, international brands" },
    { name: "Gastown / Yaletown", type: "mixed", lat: 49.2840, lng: -123.1087, description: "Tech startups, heritage boutiques, premium restaurants" },
    { name: "Richmond / Aberdeen Centre", type: "retail", lat: 49.1666, lng: -123.1364, description: "Largest Asian mall outside Asia, massive F&B scene" },
    { name: "Broadway Corridor", type: "mixed", lat: 49.2634, lng: -123.1213, description: "Medical cluster, cafés, community retail, transit hub" },
    { name: "North Vancouver / Lonsdale Quay", type: "mixed", lat: 49.3178, lng: -123.0728, description: "Waterfront market, community retail, outdoor culture" },
  ]},
  { city: "Montreal", lat: 45.5017, lng: -73.5673, zones: [
    { name: "Rue Sainte-Catherine", type: "retail", lat: 45.5048, lng: -73.5726, description: "Montreal's retail spine, 1.4km of shops, tourists" },
    { name: "Mile End / Plateau", type: "mixed", lat: 45.5221, lng: -73.5864, description: "Creative hub, indie cafés, vintage, startup scene" },
    { name: "Old Montreal", type: "market", lat: 45.5088, lng: -73.5546, description: "Tourism, heritage market, boutique hotels, restaurants" },
    { name: "Quartier des Spectacles", type: "mixed", lat: 45.5127, lng: -73.5622, description: "Entertainment district, tech companies, cultural events" },
    { name: "Laval / Marché Central (north)", type: "retail", lat: 45.5628, lng: -73.7105, description: "Suburban retail hub, Mega-Mall, diverse community" },
  ]},
  { city: "Chicago", lat: 41.8781, lng: -87.6298, zones: [
    { name: "The Magnificent Mile", type: "retail", lat: 41.8940, lng: -87.6243, description: "Chicago's luxury retail strip, flagship stores, tourism" },
    { name: "Wicker Park / Bucktown", type: "mixed", lat: 41.9092, lng: -87.6795, description: "Trendy boutiques, cafés, creative professionals" },
    { name: "The Loop (Financial District)", type: "business", lat: 41.8827, lng: -87.6278, description: "Chicago's downtown business core, financial services" },
    { name: "Pilsen / Little Village", type: "market", lat: 41.8574, lng: -87.6563, description: "Latino market, murals, emerging arts, community" },
    { name: "River North / Fulton Market", type: "restaurant", lat: 41.8899, lng: -87.6486, description: "Restaurant row, tech HQs (McDonald's, Google), nightlife" },
  ]},
  { city: "Miami", lat: 25.7617, lng: -80.1918, zones: [
    { name: "Brickell City Centre", type: "retail", lat: 25.7579, lng: -80.1952, description: "Miami's luxury retail + residential, high-end brands" },
    { name: "Wynwood Arts District", type: "mixed", lat: 25.8004, lng: -80.1995, description: "Street art, galleries, pop-ups, influencer F&B" },
    { name: "South Beach (Lincoln Road)", type: "retail", lat: 25.7907, lng: -80.1308, description: "Tourist retail, outdoor mall, beach lifestyle brands" },
    { name: "Downtown / Biscayne Blvd", type: "business", lat: 25.7748, lng: -80.1876, description: "Corporate offices, fintech, Latin American finance hub" },
    { name: "Doral / Miami Lakes", type: "business", lat: 25.8193, lng: -80.3548, description: "Latin American HQs, logistics hub, corporate parks" },
  ]},
  { city: "Houston", lat: 29.7604, lng: -95.3698, zones: [
    { name: "The Galleria area", type: "retail", lat: 29.7384, lng: -95.4624, description: "Texas's largest mall, luxury brands, 30M+ visitors/year" },
    { name: "Downtown / Theater District", type: "business", lat: 29.7595, lng: -95.3677, description: "Houston energy companies, corporate HQs, financial" },
    { name: "Montrose / Midtown", type: "mixed", lat: 29.7441, lng: -95.3944, description: "Creative zone, independent restaurants, LGBTQ+ hub" },
    { name: "Katy / Sugar Land (west)", type: "retail", lat: 29.7850, lng: -95.8222, description: "Suburban family retail, mega malls, community commerce" },
    { name: "Greenspoint / IAH corridor", type: "business", lat: 29.9290, lng: -95.4141, description: "Airport business zone, logistics, energy services" },
  ]},
];

export function getCityData(cityName: string): CityData | null {
  const normalized = cityName.toLowerCase().trim();
  const found = CITY_DATA.find(c =>
    c.city.toLowerCase() === normalized ||
    normalized.includes(c.city.toLowerCase()) ||
    c.city.toLowerCase().includes(normalized)
  );
  return found || null;
}

export function getZonesByBusinessType(zones: CommercialZone[], businessType: string): CommercialZone[] {
  const bt = businessType.toLowerCase();
  let preferredType: CommercialZone["type"] = "mixed";

  if (bt.includes("restaurant") || bt.includes("café") || bt.includes("coffee") || bt.includes("food") || bt.includes("delivery")) {
    preferredType = "restaurant";
  } else if (bt.includes("retail") || bt.includes("fashion") || bt.includes("e-commerce") || bt.includes("pharmacy") || bt.includes("import")) {
    preferredType = "retail";
  } else if (bt.includes("consulting") || bt.includes("saas") || bt.includes("tech") || bt.includes("real estate") || bt.includes("logistics") || bt.includes("construction")) {
    preferredType = "business";
  } else if (bt.includes("market") || bt.includes("wholesale") || bt.includes("export")) {
    preferredType = "market";
  }

  const preferred = zones.filter(z => z.type === preferredType);
  const others = zones.filter(z => z.type !== preferredType);
  return [...preferred, ...others].slice(0, 5);
}
