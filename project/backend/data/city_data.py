from typing import TypedDict, Literal

class CommercialZone(TypedDict):
    name: str
    type: Literal["retail", "restaurant", "business", "mixed", "market"]
    lat: float
    lng: float
    description: str

class CityData(TypedDict):
    city: str
    lat: float
    lng: float
    zones: list[CommercialZone]

CITY_DATA: list[CityData] = [
    {"city": "Dubai", "lat": 25.2048, "lng": 55.2708, "zones": [
        {"name": "Downtown Dubai / Dubai Mall", "type": "retail", "lat": 25.1972, "lng": 55.2744, "description": "Highest foot traffic in UAE, premium brands, tourist hub"},
        {"name": "Dubai Marina & JBR Walk", "type": "restaurant", "lat": 25.0803, "lng": 55.1403, "description": "Waterfront dining, expat community, weekend crowds"},
        {"name": "Business Bay", "type": "business", "lat": 25.1878, "lng": 55.2685, "description": "Corporate offices, B2B services, lunch crowd"},
        {"name": "Deira Gold & Spice Souks", "type": "market", "lat": 25.2697, "lng": 55.3088, "description": "Traditional trade, tourist shopping, authentic market"},
        {"name": "Al Quoz / Alserkal Avenue", "type": "mixed", "lat": 25.1562, "lng": 55.2282, "description": "Creative district, galleries, F&B, startup culture"},
    ]},
    {"city": "Abu Dhabi", "lat": 24.4539, "lng": 54.3773, "zones": [
        {"name": "Corniche Road", "type": "mixed", "lat": 24.4619, "lng": 54.3365, "description": "Prime waterfront, hotels, F&B, tourist zone"},
        {"name": "Al Maryah Island", "type": "business", "lat": 24.4988, "lng": 54.4054, "description": "Financial district, ADGM, luxury retail, fine dining"},
        {"name": "Yas Island", "type": "retail", "lat": 24.4884, "lng": 54.6088, "description": "Leisure, Yas Mall, theme parks, entertainment district"},
        {"name": "Khalidiyah / Al Wahda", "type": "mixed", "lat": 24.4690, "lng": 54.3618, "description": "Community retail, F&B, middle market, local crowd"},
        {"name": "Musaffah Industrial Area", "type": "business", "lat": 24.3522, "lng": 54.4935, "description": "B2B, warehousing, logistics, manufacturing services"},
    ]},
    {"city": "Riyadh", "lat": 24.7136, "lng": 46.6753, "zones": [
        {"name": "King Fahd Road", "type": "business", "lat": 24.7388, "lng": 46.6490, "description": "Corporate headquarters, banks, consulting firms"},
        {"name": "Al Olaya District", "type": "retail", "lat": 24.7060, "lng": 46.6893, "description": "Luxury retail, Kingdom Centre, Faisaliah Tower area"},
        {"name": "Tahlia Street", "type": "restaurant", "lat": 24.6925, "lng": 46.6805, "description": "Premium restaurants, cafés, families, weekend crowds"},
        {"name": "Al Diriyah / Bujairi Terrace", "type": "mixed", "lat": 24.7351, "lng": 46.5744, "description": "Cultural tourism, heritage dining, growing footfall"},
        {"name": "Exit 7 / Hittin", "type": "mixed", "lat": 24.7950, "lng": 46.7097, "description": "Family residential zone, community malls, F&B"},
    ]},
    {"city": "Cairo", "lat": 30.0444, "lng": 31.2357, "zones": [
        {"name": "New Cairo / Fifth Settlement", "type": "retail", "lat": 30.0258, "lng": 31.4680, "description": "Affluent suburb, Cairo Festival City, high purchasing power"},
        {"name": "Zamalek", "type": "restaurant", "lat": 30.0669, "lng": 31.2243, "description": "Expat hub, embassies, fine dining, boutique shops"},
        {"name": "Maadi", "type": "mixed", "lat": 29.9603, "lng": 31.2565, "description": "Expats & upper class, cafés, international schools"},
        {"name": "Downtown Cairo / Tahrir", "type": "market", "lat": 30.0443, "lng": 31.2344, "description": "Mass market, highest pedestrian density, street retail"},
        {"name": "Heliopolis / Nasr City", "type": "mixed", "lat": 30.0889, "lng": 31.3368, "description": "Middle class, malls, restaurants, government employees"},
    ]},
    {"city": "Istanbul", "lat": 41.0082, "lng": 28.9784, "zones": [
        {"name": "Istiklal Avenue / Beyoğlu", "type": "retail", "lat": 41.0335, "lng": 28.9770, "description": "Tourist hub, 3M+ daily visitors, boutique and international retail"},
        {"name": "Levent / Maslak", "type": "business", "lat": 41.0851, "lng": 29.0122, "description": "Financial district, corporate HQs, B2B services"},
        {"name": "Beşiktaş / Nişantaşı", "type": "restaurant", "lat": 41.0450, "lng": 29.0014, "description": "Upscale dining, luxury brands, affluent locals & expats"},
        {"name": "Grand Bazaar / Eminönü", "type": "market", "lat": 41.0107, "lng": 28.9680, "description": "Oldest bazaar, tourism, wholesale, unique goods"},
        {"name": "Bağcılar / Güngören (Laleli)", "type": "market", "lat": 41.0340, "lng": 28.8700, "description": "Textile wholesale, bulk retail, B2B trade hub"},
    ]},
    {"city": "Doha", "lat": 25.2854, "lng": 51.5310, "zones": [
        {"name": "West Bay / Lusail", "type": "business", "lat": 25.3298, "lng": 51.5251, "description": "Financial district, corporate towers, luxury hotels"},
        {"name": "The Pearl-Qatar", "type": "retail", "lat": 25.3715, "lng": 51.5527, "description": "Luxury residential & retail, marinas, high-end dining"},
        {"name": "Souq Waqif", "type": "market", "lat": 25.2887, "lng": 51.5324, "description": "Cultural market, tourist hotspot, traditional restaurants"},
        {"name": "Msheireb Downtown", "type": "mixed", "lat": 25.2872, "lng": 51.5250, "description": "Smart urban development, F&B, boutique retail, culture"},
        {"name": "Al Sadd", "type": "mixed", "lat": 25.2714, "lng": 51.5137, "description": "Busy commercial street, diverse dining, local services"},
    ]},
    {"city": "Kuwait City", "lat": 29.3759, "lng": 47.9774, "zones": [
        {"name": "The Avenues Mall", "type": "retail", "lat": 29.3038, "lng": 47.9355, "description": "Largest mall in GCC, premium & mass market, massive footfall"},
        {"name": "Salem Al Mubarak Street (Salmiya)", "type": "mixed", "lat": 29.3339, "lng": 48.0843, "description": "Vibrant street retail, restaurants, youth hub"},
        {"name": "Kuwait City Downtown / Sharq", "type": "business", "lat": 29.3721, "lng": 48.0013, "description": "Government, banks, investment firms, B2B services"},
        {"name": "Al Rai Industrial Area", "type": "business", "lat": 29.3501, "lng": 47.9199, "description": "Warehouses, logistics, B2B wholesale, showrooms"},
        {"name": "Egaila / Abu Halifa (south)", "type": "mixed", "lat": 29.1962, "lng": 48.0849, "description": "Growing residential zone, community retail, cafés"},
    ]},
    {"city": "Muscat", "lat": 23.5880, "lng": 58.3829, "zones": [
        {"name": "Muscat City Centre / Ruwi", "type": "retail", "lat": 23.5964, "lng": 58.3883, "description": "Urban commercial hub, government offices, mixed income retail"},
        {"name": "Al Mouj / Muscat Hills", "type": "mixed", "lat": 23.6232, "lng": 58.4688, "description": "Luxury residential, marina, upscale dining and retail"},
        {"name": "Qurum Beach Area", "type": "restaurant", "lat": 23.6006, "lng": 58.5177, "description": "Waterfront dining, expat cluster, premium cafés"},
        {"name": "Muttrah Souq", "type": "market", "lat": 23.6144, "lng": 58.5910, "description": "Traditional market, tourism, handicrafts, silver jewelry"},
        {"name": "Bausher / Ghubrah", "type": "mixed", "lat": 23.5892, "lng": 58.3432, "description": "Growing suburb, community malls, family F&B"},
    ]},
    {"city": "Amman", "lat": 31.9454, "lng": 35.9284, "zones": [
        {"name": "Rainbow Street / Jabal Amman", "type": "restaurant", "lat": 31.9537, "lng": 35.9140, "description": "Trendy cafés, boutiques, galleries, young creative crowd"},
        {"name": "Abdali Boulevard", "type": "retail", "lat": 31.9641, "lng": 35.9213, "description": "Modern mixed-use development, upscale retail, dining"},
        {"name": "Shmeisani", "type": "business", "lat": 31.9782, "lng": 35.9128, "description": "Embassies, banks, consulting, corporate offices"},
        {"name": "7th Circle / Sweifieh", "type": "retail", "lat": 31.9608, "lng": 35.8780, "description": "Upper-middle-class retail, restaurants, daily services"},
        {"name": "Downtown / Al Balad", "type": "market", "lat": 31.9530, "lng": 35.9395, "description": "Traditional market, mass retail, local trade hub"},
    ]},
    {"city": "Beirut", "lat": 33.8938, "lng": 35.5018, "zones": [
        {"name": "Gemmayzeh / Mar Mikhael", "type": "restaurant", "lat": 33.8910, "lng": 35.5155, "description": "Trendy bars, cafés, creative agencies, young professionals"},
        {"name": "Hamra", "type": "mixed", "lat": 33.8988, "lng": 35.4806, "description": "Commercial hub, AUB proximity, diverse F&B"},
        {"name": "Downtown Beirut (BCD)", "type": "business", "lat": 33.8942, "lng": 35.5025, "description": "Banking, luxury retail, government, international offices"},
        {"name": "Verdun Street", "type": "retail", "lat": 33.8850, "lng": 35.4891, "description": "Upscale retail, fashion, beauty, middle-upper income"},
        {"name": "Achrafieh / Sassine Square", "type": "mixed", "lat": 33.8880, "lng": 35.5128, "description": "Residential-commercial mix, loyal neighborhood clientele"},
    ]},
    {"city": "Jeddah", "lat": 21.4858, "lng": 39.1925, "zones": [
        {"name": "Al Balad (Old Jeddah)", "type": "market", "lat": 21.4869, "lng": 39.1864, "description": "UNESCO heritage, tourism, traditional market, rising footfall"},
        {"name": "Tahlia Street", "type": "retail", "lat": 21.5433, "lng": 39.1775, "description": "Premium retail, top restaurants, fashion brands, night crowd"},
        {"name": "Al Hamra / Corniche", "type": "restaurant", "lat": 21.5655, "lng": 39.1376, "description": "Waterfront, seafood dining, upscale, expat & local"},
        {"name": "Andalus / King Road", "type": "mixed", "lat": 21.5190, "lng": 39.1947, "description": "Busy commercial strip, family dining, mid-market retail"},
        {"name": "North Jeddah / Obhur", "type": "mixed", "lat": 21.6843, "lng": 39.1150, "description": "Upscale residential, beach clubs, premium F&B"},
    ]},
    {"city": "Manama", "lat": 26.2235, "lng": 50.5876, "zones": [
        {"name": "Bahrain City Centre / Al Seef", "type": "retail", "lat": 26.2132, "lng": 50.5847, "description": "Premium retail, international brands, expat and local crowd"},
        {"name": "Adliya", "type": "restaurant", "lat": 26.2147, "lng": 50.5988, "description": "Best dining area, bars, art galleries, expat hub"},
        {"name": "Diplomatic Area", "type": "business", "lat": 26.2223, "lng": 50.5877, "description": "Banks, embassies, financial services, B2B"},
        {"name": "Muharraq Souq", "type": "market", "lat": 26.2621, "lng": 50.6152, "description": "Traditional market, heritage tourism, local trade"},
        {"name": "Juffair", "type": "mixed", "lat": 26.2006, "lng": 50.6011, "description": "Military expats, nightlife, restaurants, apartments"},
    ]},
    {"city": "London", "lat": 51.5074, "lng": -0.1278, "zones": [
        {"name": "Oxford Street / Soho", "type": "retail", "lat": 51.5152, "lng": -0.1449, "description": "Busiest shopping street in Europe, 500k daily visitors"},
        {"name": "Canary Wharf", "type": "business", "lat": 51.5054, "lng": -0.0235, "description": "Financial district, 100k+ workers, B2B, fintech hub"},
        {"name": "Shoreditch / Old Street", "type": "mixed", "lat": 51.5262, "lng": -0.0776, "description": "Tech cluster, startups, creative agencies, trendy F&B"},
        {"name": "Covent Garden", "type": "restaurant", "lat": 51.5117, "lng": -0.1225, "description": "Tourist hub, premium dining, entertainment, arts"},
        {"name": "Camden Market", "type": "market", "lat": 51.5426, "lng": -0.1477, "description": "Alternative retail, youth culture, tourist market, craft"},
    ]},
    {"city": "Paris", "lat": 48.8566, "lng": 2.3522, "zones": [
        {"name": "Champs-Élysées / Triangle d'Or", "type": "retail", "lat": 48.8698, "lng": 2.3086, "description": "Luxury brand district, 30M tourists/year, premium only"},
        {"name": "Le Marais", "type": "mixed", "lat": 48.8566, "lng": 2.3565, "description": "Trendy boutiques, galleries, cafés, tourists + locals"},
        {"name": "La Défense", "type": "business", "lat": 48.8924, "lng": 2.2352, "description": "Europe's largest business district, corporate HQs"},
        {"name": "Saint-Germain-des-Prés", "type": "restaurant", "lat": 48.8534, "lng": 2.3334, "description": "Literary cafés, fine dining, upscale fashion, intellectuals"},
        {"name": "Montmartre", "type": "market", "lat": 48.8867, "lng": 2.3431, "description": "Tourist art market, souvenir retail, street artists"},
    ]},
    {"city": "Berlin", "lat": 52.5200, "lng": 13.4050, "zones": [
        {"name": "Mitte / Alexanderplatz", "type": "retail", "lat": 52.5216, "lng": 13.4132, "description": "Tourist center, main shopping, high footfall"},
        {"name": "Prenzlauer Berg", "type": "mixed", "lat": 52.5389, "lng": 13.4178, "description": "Artsy residential, specialty cafés, boutiques, young parents"},
        {"name": "Kreuzberg", "type": "restaurant", "lat": 52.4991, "lng": 13.4002, "description": "Multicultural, street food, startup energy, nightlife"},
        {"name": "Kurfürstendamm (Kudamm)", "type": "retail", "lat": 52.5006, "lng": 13.3317, "description": "West Berlin's prime shopping boulevard, premium brands"},
        {"name": "Mitte Startup Hub / Betahaus", "type": "business", "lat": 52.5295, "lng": 13.4019, "description": "Berlin tech ecosystem, coworking, startup services"},
    ]},
    {"city": "Amsterdam", "lat": 52.3676, "lng": 4.9041, "zones": [
        {"name": "Kalverstraat / Dam Square", "type": "retail", "lat": 52.3729, "lng": 4.8942, "description": "Pedestrian shopping street, mass retail, tourist hub"},
        {"name": "PC Hooftstraat", "type": "retail", "lat": 52.3604, "lng": 4.8809, "description": "Amsterdam's luxury street, designer brands, upscale"},
        {"name": "Jordaan", "type": "restaurant", "lat": 52.3742, "lng": 4.8796, "description": "Trendy neighborhood, boutique cafés, galleries, expats"},
        {"name": "Zuidas (South Axis)", "type": "business", "lat": 52.3348, "lng": 4.8708, "description": "Financial and legal hub, corporate offices, B2B"},
        {"name": "De Pijp", "type": "mixed", "lat": 52.3550, "lng": 4.8944, "description": "Albert Cuyp Market, vibrant multicultural, F&B scene"},
    ]},
    {"city": "Madrid", "lat": 40.4168, "lng": -3.7038, "zones": [
        {"name": "Gran Vía", "type": "retail", "lat": 40.4200, "lng": -3.7056, "description": "Main shopping boulevard, tourist hub, international brands"},
        {"name": "Salamanca District", "type": "retail", "lat": 40.4270, "lng": -3.6837, "description": "Luxury shopping, upscale F&B, affluent locals"},
        {"name": "Malasaña / Chueca", "type": "mixed", "lat": 40.4258, "lng": -3.7059, "description": "Alternative retail, creative startups, young professionals"},
        {"name": "AZCA Financial District", "type": "business", "lat": 40.4544, "lng": -3.6919, "description": "Corporate Spain, banking, consulting, B2B services"},
        {"name": "El Rastro / Lavapiés", "type": "market", "lat": 40.4106, "lng": -3.7052, "description": "Sunday market, multicultural, vintage, artisan goods"},
    ]},
    {"city": "Rome", "lat": 41.9028, "lng": 12.4964, "zones": [
        {"name": "Via Condotti / Spanish Steps", "type": "retail", "lat": 41.9059, "lng": 12.4815, "description": "World's premier luxury shopping street, Gucci, Fendi, Bulgari"},
        {"name": "Trastevere", "type": "restaurant", "lat": 41.8897, "lng": 12.4740, "description": "Authentic Roman dining, tourist + local, vibrant evenings"},
        {"name": "EUR District", "type": "business", "lat": 41.8350, "lng": 12.4700, "description": "Corporate offices, government agencies, B2B services"},
        {"name": "Prati / Vatican area", "type": "mixed", "lat": 41.9050, "lng": 12.4620, "description": "Tourist mixed with residential, F&B, souvenir retail"},
        {"name": "Porta Portese Market", "type": "market", "lat": 41.8831, "lng": 12.4740, "description": "Oldest flea market in Rome, antiques, secondhand, crafts"},
    ]},
    {"city": "Tokyo", "lat": 35.6762, "lng": 139.6503, "zones": [
        {"name": "Shinjuku", "type": "mixed", "lat": 35.6938, "lng": 139.7034, "description": "Busiest station globally, entertainment, retail, nightlife"},
        {"name": "Shibuya / Harajuku", "type": "retail", "lat": 35.6585, "lng": 139.7023, "description": "Youth fashion, trends, Shibuya crossing, massive footfall"},
        {"name": "Ginza", "type": "retail", "lat": 35.6714, "lng": 139.7669, "description": "Tokyo's luxury district, world's most expensive retail"},
        {"name": "Marunouchi / Otemachi", "type": "business", "lat": 35.6843, "lng": 139.7637, "description": "Japan's financial center, corporate HQs, B2B"},
        {"name": "Akihabara", "type": "market", "lat": 35.7022, "lng": 139.7741, "description": "Electronics, anime, tech, unique niche retail globally famous"},
    ]},
    {"city": "Singapore", "lat": 1.3521, "lng": 103.8198, "zones": [
        {"name": "Orchard Road", "type": "retail", "lat": 1.3048, "lng": 103.8318, "description": "Singapore's premier retail belt, international luxury brands"},
        {"name": "Marina Bay / CBD", "type": "business", "lat": 1.2819, "lng": 103.8503, "description": "Financial hub, MNCs, highest office rents in Asia"},
        {"name": "Bugis / Arab Street", "type": "mixed", "lat": 1.3009, "lng": 103.8555, "description": "Boutique shops, multicultural food, creative hub"},
        {"name": "Chinatown / Tanjong Pagar", "type": "restaurant", "lat": 1.2842, "lng": 103.8456, "description": "Heritage dining, hawker centers, startup scene"},
        {"name": "Jurong East / Westgate", "type": "retail", "lat": 1.3330, "lng": 103.7435, "description": "Suburban commercial hub, family shopping, growing density"},
    ]},
    {"city": "Hong Kong", "lat": 22.3193, "lng": 114.1694, "zones": [
        {"name": "Central / IFC Mall", "type": "business", "lat": 22.2820, "lng": 114.1575, "description": "Asia's financial center, luxury, corporate, banking"},
        {"name": "Causeway Bay / Times Square", "type": "retail", "lat": 22.2802, "lng": 114.1839, "description": "One of world's highest retail rents, massive footfall"},
        {"name": "Mong Kok", "type": "market", "lat": 22.3193, "lng": 114.1691, "description": "Densest retail zone globally, street markets, electronics"},
        {"name": "Wan Chai", "type": "mixed", "lat": 22.2778, "lng": 114.1729, "description": "Entertainment, restaurants, tech startups, expat zone"},
        {"name": "Wong Tai Sin / Diamond Hill", "type": "mixed", "lat": 22.3413, "lng": 114.1973, "description": "Local community retail, F&B, growing residential area"},
    ]},
    {"city": "Mumbai", "lat": 19.0760, "lng": 72.8777, "zones": [
        {"name": "Bandra West / Linking Road", "type": "retail", "lat": 19.0596, "lng": 72.8295, "description": "Mumbai's trendiest shopping zone, Bollywood crowd, premium"},
        {"name": "Nariman Point / BKC", "type": "business", "lat": 18.9254, "lng": 72.8241, "description": "Financial district, MNC HQs, B2B, premium office"},
        {"name": "Lower Parel", "type": "mixed", "lat": 18.9952, "lng": 72.8314, "description": "Upscale malls, fine dining, converted mill district"},
        {"name": "Colaba Causeway", "type": "market", "lat": 18.9060, "lng": 72.8225, "description": "Tourist street market, antiques, jewelry, fashion"},
        {"name": "Andheri West / Versova", "type": "mixed", "lat": 19.1245, "lng": 72.8427, "description": "Film industry, IT offices, growing F&B scene"},
    ]},
    {"city": "Seoul", "lat": 37.5665, "lng": 126.9780, "zones": [
        {"name": "Gangnam / COEX", "type": "retail", "lat": 37.5048, "lng": 127.0488, "description": "Korea's luxury hub, tech offices, K-beauty brands"},
        {"name": "Myeongdong", "type": "retail", "lat": 37.5636, "lng": 126.9847, "description": "Top tourist shopping, K-beauty, fashion, Chinese tourists"},
        {"name": "Hongdae", "type": "mixed", "lat": 37.5563, "lng": 126.9240, "description": "University area, indie music, streetwear, youth culture"},
        {"name": "Yeouido", "type": "business", "lat": 37.5219, "lng": 126.9241, "description": "Seoul's financial district, broadcasting, corporate"},
        {"name": "Itaewon / Hanam-dong", "type": "restaurant", "lat": 37.5345, "lng": 126.9927, "description": "International dining, expat hub, diverse culture"},
    ]},
    {"city": "Bangkok", "lat": 13.7563, "lng": 100.5018, "zones": [
        {"name": "Siam / Ratchaprasong", "type": "retail", "lat": 13.7466, "lng": 100.5340, "description": "Thailand's premium retail epicenter, Siam Paragon, luxury"},
        {"name": "Sukhumvit (Lower)", "type": "mixed", "lat": 13.7366, "lng": 100.5647, "description": "Expat hub, restaurants, nightlife, premium residential"},
        {"name": "Silom / Sathorn", "type": "business", "lat": 13.7267, "lng": 100.5270, "description": "Bangkok CBD, banking, law firms, corporate"},
        {"name": "Chatuchak Weekend Market", "type": "market", "lat": 13.7998, "lng": 100.5503, "description": "World's largest weekend market, 15k+ stalls, 200k visitors/weekend"},
        {"name": "Thong Lo / Ekkamai", "type": "restaurant", "lat": 13.7270, "lng": 100.5839, "description": "Trendy Japanese-Thai zone, premium cafés, expat dining"},
    ]},
    {"city": "Shanghai", "lat": 31.2304, "lng": 121.4737, "zones": [
        {"name": "The Bund / Lujiazui", "type": "business", "lat": 31.2345, "lng": 121.4927, "description": "Shanghai's financial powerhouse, luxury hotels, premium"},
        {"name": "Xintiandi", "type": "restaurant", "lat": 31.2202, "lng": 121.4727, "description": "Upscale dining, international brands, tourist & expat"},
        {"name": "Nanjing Road", "type": "retail", "lat": 31.2368, "lng": 121.4710, "description": "China's busiest commercial street, 1M+ daily footfall"},
        {"name": "Jing'an Temple area", "type": "retail", "lat": 31.2243, "lng": 121.4416, "description": "Premium retail, W hotels, international luxury brands"},
        {"name": "Xujiahui", "type": "mixed", "lat": 31.1983, "lng": 121.4364, "description": "Electronics hub, electronics retail, mass market"},
    ]},
    {"city": "New York", "lat": 40.7128, "lng": -74.0060, "zones": [
        {"name": "Fifth Avenue / Midtown", "type": "retail", "lat": 40.7589, "lng": -73.9851, "description": "World's most iconic shopping street, luxury & premium"},
        {"name": "SoHo", "type": "mixed", "lat": 40.7233, "lng": -74.0030, "description": "Independent boutiques, galleries, pop-ups, direct-to-consumer"},
        {"name": "Lower Manhattan / Financial District", "type": "business", "lat": 40.7074, "lng": -74.0113, "description": "Wall Street, financial services, B2B, fintech"},
        {"name": "Brooklyn / Williamsburg", "type": "mixed", "lat": 40.7143, "lng": -73.9570, "description": "Artisan brands, food & bev, young professionals, DTC brands"},
        {"name": "Times Square / Theater District", "type": "retail", "lat": 40.7580, "lng": -73.9855, "description": "50M tourists/year, flagship stores, entertainment"},
    ]},
    {"city": "Los Angeles", "lat": 34.0522, "lng": -118.2437, "zones": [
        {"name": "Rodeo Drive / Beverly Hills", "type": "retail", "lat": 34.0698, "lng": -118.3985, "description": "World luxury retail landmark, high-net-worth shoppers"},
        {"name": "Melrose Avenue", "type": "mixed", "lat": 34.0837, "lng": -118.3505, "description": "Trendy boutiques, streetwear, design studios, influencers"},
        {"name": "Downtown LA (DTLA)", "type": "business", "lat": 34.0430, "lng": -118.2673, "description": "Corporate offices, fashion district, tech startups"},
        {"name": "Santa Monica / 3rd Street Promenade", "type": "retail", "lat": 34.0195, "lng": -118.4912, "description": "Tourist & local retail, beach proximity, premium F&B"},
        {"name": "Koreatown / Mid-Wilshire", "type": "mixed", "lat": 34.0620, "lng": -118.3006, "description": "Ethnic market, 24/7 culture, diverse F&B, community"},
    ]},
    {"city": "Toronto", "lat": 43.6532, "lng": -79.3832, "zones": [
        {"name": "Bay Street / Financial District", "type": "business", "lat": 43.6489, "lng": -79.3816, "description": "Canada's financial center, banking, professional services"},
        {"name": "Yorkville", "type": "retail", "lat": 43.6704, "lng": -79.3918, "description": "Toronto's luxury district, premium brands, upscale dining"},
        {"name": "Kensington Market", "type": "market", "lat": 43.6545, "lng": -79.4016, "description": "Alternative market, vintage, multicultural food, youth"},
        {"name": "King West / Entertainment District", "type": "mixed", "lat": 43.6444, "lng": -79.3946, "description": "Tech hub, nightlife, media companies, premium F&B"},
        {"name": "Scarborough / Markham (east)", "type": "mixed", "lat": 43.7815, "lng": -79.2318, "description": "Asian communities, food halls, growing commercial zone"},
    ]},
    {"city": "São Paulo", "lat": -23.5505, "lng": -46.6333, "zones": [
        {"name": "Paulista Avenue", "type": "business", "lat": -23.5637, "lng": -46.6550, "description": "Brazil's financial axis, HQs, cultural institutions, premium"},
        {"name": "Oscar Freire Street", "type": "retail", "lat": -23.5614, "lng": -46.6752, "description": "Latin America's luxury retail street, designer brands"},
        {"name": "Itaim Bibi / Vila Olímpia", "type": "mixed", "lat": -23.5878, "lng": -46.6783, "description": "Startup ecosystem, premium dining, corporate"},
        {"name": "Bom Retiro (Fashion District)", "type": "market", "lat": -23.5271, "lng": -46.6452, "description": "Wholesale fashion, 1,000+ stores, B2B textile trade"},
        {"name": "Pinheiros / Vila Madalena", "type": "restaurant", "lat": -23.5636, "lng": -46.6901, "description": "Artsy dining, creative professionals, weekend culture"},
    ]},
    {"city": "Mexico City", "lat": 19.4326, "lng": -99.1332, "zones": [
        {"name": "Polanco", "type": "retail", "lat": 19.4333, "lng": -99.1916, "description": "Mexico's upscale district, Presidente Masaryk luxury strip"},
        {"name": "Roma Norte / Condesa", "type": "mixed", "lat": 19.4135, "lng": -99.1691, "description": "Trendy cafés, independent boutiques, creative startups"},
        {"name": "Paseo de la Reforma (CBD)", "type": "business", "lat": 19.4301, "lng": -99.1706, "description": "Corporate offices, financial institutions, B2B"},
        {"name": "Centro Histórico / Garibaldi", "type": "market", "lat": 19.4325, "lng": -99.1318, "description": "Tourism, street market, traditional trade, millions visit"},
        {"name": "Santa Fe", "type": "business", "lat": 19.3614, "lng": -99.2654, "description": "Modern business park, multinationals, upscale mall"},
    ]},
    {"city": "Nairobi", "lat": -1.2921, "lng": 36.8219, "zones": [
        {"name": "Westlands / Gigiri", "type": "mixed", "lat": -1.2641, "lng": 36.8096, "description": "Expat hub, NGOs, embassies, premium F&B, retail"},
        {"name": "CBD / Kenyatta Avenue", "type": "market", "lat": -1.2842, "lng": 36.8227, "description": "High foot traffic, banking, telecoms, street retail"},
        {"name": "Karen / Langata", "type": "retail", "lat": -1.3267, "lng": 36.6967, "description": "Affluent suburb, boutique shops, premium lifestyle"},
        {"name": "Kilimani / Lavington", "type": "restaurant", "lat": -1.2882, "lng": 36.7760, "description": "Restaurant row, young professionals, middle-upper class"},
        {"name": "Industrial Area / Mombasa Road", "type": "business", "lat": -1.3186, "lng": 36.8508, "description": "Manufacturing, B2B, logistics, warehousing"},
    ]},
    {"city": "Lagos", "lat": 6.5244, "lng": 3.3792, "zones": [
        {"name": "Victoria Island (VI)", "type": "business", "lat": 6.4281, "lng": 3.4219, "description": "Financial hub, embassies, luxury hotels, premium dining"},
        {"name": "Lekki Phase 1", "type": "retail", "lat": 6.4355, "lng": 3.5019, "description": "Upscale residential, premium retail, restaurants"},
        {"name": "Balogun Market / Lagos Island", "type": "market", "lat": 6.4541, "lng": 3.3937, "description": "Nigeria's largest market, textile, wholesale, millions daily"},
        {"name": "Ikeja / Allen Avenue", "type": "mixed", "lat": 6.6018, "lng": 3.3515, "description": "Commercial hub, electronics, B2B, services"},
        {"name": "Yaba / Herbert Macaulay Way", "type": "mixed", "lat": 6.5085, "lng": 3.3747, "description": "Tech startup hub (Yabacon Valley), youth culture, F&B"},
    ]},
    {"city": "Johannesburg", "lat": -26.2041, "lng": 28.0473, "zones": [
        {"name": "Sandton / Sandton City", "type": "retail", "lat": -26.1083, "lng": 28.0570, "description": "Africa's richest square mile, luxury brands, corporate"},
        {"name": "Rosebank", "type": "mixed", "lat": -26.1467, "lng": 28.0436, "description": "Boutiques, art, restaurants, professional services"},
        {"name": "Maboneng Precinct", "type": "mixed", "lat": -26.2016, "lng": 28.0619, "description": "Creative district, markets, art galleries, weekend culture"},
        {"name": "Soweto / Vilakazi Street", "type": "market", "lat": -26.2785, "lng": 27.8536, "description": "Tourism, cultural market, heritage, growing community"},
        {"name": "Midrand / Waterfall", "type": "business", "lat": -25.9987, "lng": 28.1293, "description": "Corporate parks, logistics, warehousing, B2B"},
    ]},
    {"city": "Sydney", "lat": -33.8688, "lng": 151.2093, "zones": [
        {"name": "CBD / Pitt Street Mall", "type": "retail", "lat": -33.8696, "lng": 151.2087, "description": "Australia's highest retail density, international brands"},
        {"name": "Surry Hills / Newtown", "type": "mixed", "lat": -33.8882, "lng": 151.2105, "description": "Creative hub, independent cafés, boutiques, designers"},
        {"name": "Darling Harbour / Barangaroo", "type": "restaurant", "lat": -33.8694, "lng": 151.1989, "description": "Waterfront entertainment, premium dining, tourism"},
        {"name": "Macquarie Street / Martin Place", "type": "business", "lat": -33.8699, "lng": 151.2108, "description": "Financial and legal precinct, B2B, premium corporate"},
        {"name": "Parramatta / Western Sydney", "type": "retail", "lat": -33.8150, "lng": 151.0009, "description": "Second CBD, diverse community, mass market retail"},
    ]},
    {"city": "Melbourne", "lat": -37.8136, "lng": 144.9631, "zones": [
        {"name": "Bourke Street Mall / CBD", "type": "retail", "lat": -37.8142, "lng": 144.9648, "description": "Melbourne's retail core, pedestrian zone, major brands"},
        {"name": "Fitzroy / Brunswick", "type": "mixed", "lat": -37.7994, "lng": 144.9779, "description": "Hipster culture, independent retail, cafés, art, youth"},
        {"name": "Docklands / Southbank", "type": "business", "lat": -37.8183, "lng": 144.9464, "description": "Corporate zone, finance, media companies, waterfront"},
        {"name": "Chapel Street (South Yarra)", "type": "retail", "lat": -37.8372, "lng": 144.9928, "description": "Fashion, beauty, upscale F&B, young professionals"},
        {"name": "Chinatown / QV Market", "type": "market", "lat": -37.8097, "lng": 144.9701, "description": "Queen Victoria Market (oldest), multicultural, tourism"},
    ]},
    {"city": "Casablanca", "lat": 33.5731, "lng": -7.5898, "zones": [
        {"name": "Morocco Mall / Anfa", "type": "retail", "lat": 33.5788, "lng": -7.6585, "description": "Largest mall in Africa, premium brands, expats and upper class"},
        {"name": "Maârif / Bourgogne", "type": "mixed", "lat": 33.5842, "lng": -7.6377, "description": "Premium dining, boutiques, professionals, embassy zone"},
        {"name": "Twin Center / Casablanca CBD", "type": "business", "lat": 33.5967, "lng": -7.6250, "description": "Financial hub, corporate towers, B2B services"},
        {"name": "Derb Omar (Wholesale Market)", "type": "market", "lat": 33.5869, "lng": -7.5793, "description": "Wholesale trade hub, textiles, mass market distribution"},
        {"name": "Ain Diab Corniche", "type": "restaurant", "lat": 33.5934, "lng": -7.6759, "description": "Beach restaurants, nightlife, expat dining, upscale"},
    ]},
    {"city": "Kuala Lumpur", "lat": 3.1390, "lng": 101.6869, "zones": [
        {"name": "Bukit Bintang / KLCC", "type": "retail", "lat": 3.1481, "lng": 101.7113, "description": "Malaysia's luxury retail hub, Pavilion, Suria KLCC"},
        {"name": "Bangsar / Damansara", "type": "restaurant", "lat": 3.1316, "lng": 101.6782, "description": "Expat dining zone, premium cafés, boutique shops"},
        {"name": "KL Sentral / Tun Razak Exchange", "type": "business", "lat": 3.1340, "lng": 101.6873, "description": "Financial district, multinationals, fintech hub"},
        {"name": "Petaling Street / Chinatown", "type": "market", "lat": 3.1442, "lng": 101.6986, "description": "Traditional market, street food, tourism, heritage"},
        {"name": "Mont Kiara", "type": "mixed", "lat": 3.1712, "lng": 101.6501, "description": "Expat enclave, premium services, international schools"},
    ]},
    {"city": "Jakarta", "lat": -6.2088, "lng": 106.8456, "zones": [
        {"name": "SCBD / Sudirman", "type": "business", "lat": -6.2293, "lng": 106.8071, "description": "Jakarta's financial district, multinationals, premium"},
        {"name": "Grand Indonesia / Plaza Indonesia", "type": "retail", "lat": -6.1937, "lng": 106.8213, "description": "Premium mall area, luxury brands, tourist & local"},
        {"name": "Kemang", "type": "restaurant", "lat": -6.2627, "lng": 106.8215, "description": "Expat dining, creative professionals, boutique cafés"},
        {"name": "Tanah Abang", "type": "market", "lat": -6.1912, "lng": 106.8128, "description": "Asia's largest textile market, wholesale, mass market"},
        {"name": "BSD City / Alam Sutera", "type": "mixed", "lat": -6.3056, "lng": 106.6528, "description": "Satellite city, growing tech ecosystem, family market"},
    ]},
    {"city": "Karachi", "lat": 24.8607, "lng": 67.0011, "zones": [
        {"name": "Dolmen City / Clifton", "type": "retail", "lat": 24.8203, "lng": 67.0278, "description": "Premium mall, upper class, sea-facing, flagship brands"},
        {"name": "Defence (DHA)", "type": "mixed", "lat": 24.8193, "lng": 67.0586, "description": "Upscale residential-commercial, premium F&B, boutiques"},
        {"name": "Saddar (Downtown)", "type": "market", "lat": 24.8606, "lng": 67.0127, "description": "Historic commercial hub, mass market, electronics"},
        {"name": "Korangi Industrial Area", "type": "business", "lat": 24.8297, "lng": 67.0874, "description": "Pakistan's largest industrial zone, B2B, manufacturing"},
        {"name": "Gulshan-e-Iqbal", "type": "mixed", "lat": 24.9253, "lng": 67.0893, "description": "Middle class hub, restaurants, retail, family market"},
    ]},
    {"city": "Bangalore", "lat": 12.9716, "lng": 77.5946, "zones": [
        {"name": "MG Road / Brigade Road", "type": "retail", "lat": 12.9762, "lng": 77.6033, "description": "Bangalore's prime retail street, tech crowd, premium"},
        {"name": "Koramangala / Indiranagar", "type": "mixed", "lat": 12.9352, "lng": 77.6245, "description": "India's startup hub, craft beer culture, tech professionals"},
        {"name": "Whitefield / Electronic City", "type": "business", "lat": 12.9698, "lng": 77.7499, "description": "Tech park zone, IT companies, B2B services, corporate"},
        {"name": "Ulsoor / Frazer Town", "type": "restaurant", "lat": 12.9859, "lng": 77.6218, "description": "Diverse dining, Muslim quarter, affordable quality food"},
        {"name": "Marathahalli", "type": "market", "lat": 12.9591, "lng": 77.7000, "description": "Electronics hub, mid-market retail, dense commercial"},
    ]},
    {"city": "Buenos Aires", "lat": -34.6037, "lng": -58.3816, "zones": [
        {"name": "Palermo Soho / Hollywood", "type": "mixed", "lat": -34.5869, "lng": -58.4260, "description": "Trendy district, independent boutiques, design, F&B"},
        {"name": "Puerto Madero", "type": "restaurant", "lat": -34.6140, "lng": -58.3656, "description": "Waterfront fine dining, tourist zone, premium steak"},
        {"name": "Microcentro / San Nicolás", "type": "business", "lat": -34.6068, "lng": -58.3738, "description": "Financial center, banking, corporate offices"},
        {"name": "Recoleta", "type": "retail", "lat": -34.5871, "lng": -58.3930, "description": "Upscale residential, luxury retail, Recoleta Mall"},
        {"name": "La Boca / San Telmo", "type": "market", "lat": -34.6282, "lng": -58.3704, "description": "Tourism, tango, antique market, artisan craft"},
    ]},
]

_CITY_MAP: dict[str, CityData] = {c["city"].lower(): c for c in CITY_DATA}

ZONE_TYPE_MAP: dict[str, list[str]] = {
    "restaurant": ["restaurant", "mixed", "market"],
    "café": ["restaurant", "mixed"],
    "coffee": ["restaurant", "mixed"],
    "food": ["restaurant", "mixed", "market"],
    "retail": ["retail", "mixed"],
    "fashion": ["retail", "mixed"],
    "clothing": ["retail", "mixed"],
    "tech": ["business", "mixed"],
    "saas": ["business", "mixed"],
    "consulting": ["business"],
    "healthcare": ["mixed", "business"],
    "clinic": ["mixed", "business"],
    "gym": ["mixed", "retail"],
    "fitness": ["mixed", "retail"],
    "beauty": ["retail", "mixed"],
    "salon": ["retail", "mixed"],
    "education": ["mixed", "business"],
    "logistics": ["business"],
    "delivery": ["business", "mixed"],
    "import": ["business", "market"],
    "export": ["business", "market"],
    "real estate": ["business", "mixed"],
    "tourism": ["market", "mixed", "restaurant"],
    "media": ["business", "mixed"],
    "photography": ["mixed"],
    "construction": ["business"],
    "pharmacy": ["retail", "mixed"],
    "e-commerce": ["business", "mixed"],
}


def get_city_data(city_name: str) -> CityData | None:
    return _CITY_MAP.get(city_name.lower())


def get_zones_by_business_type(zones: list[CommercialZone], business_type: str) -> list[CommercialZone]:
    bt_lower = business_type.lower()
    preferred_types: list[str] = []
    for key, types in ZONE_TYPE_MAP.items():
        if key in bt_lower:
            preferred_types = types
            break
    if not preferred_types:
        preferred_types = ["mixed", "retail", "restaurant", "business", "market"]

    result = []
    for t in preferred_types:
        for z in zones:
            if z["type"] == t and z not in result:
                result.append(z)

    for z in zones:
        if z not in result:
            result.append(z)

    return result[:5]
