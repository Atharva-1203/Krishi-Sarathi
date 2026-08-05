export const TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_analysis: "Analysis Engine",
    nav_map: "Maharashtra Map",
    nav_specs: "ML Analytics",
    
    // Header
    api_status: "API Status",
    api_online: "Online",
    api_offline: "Offline",
    
    // Landing Page
    hero_badge: "Production Crop Recommendation AI Platform",
    hero_title_1: "Predict Optimal Crops.",
    hero_title_2: "Empower Sustainable Farming.",
    hero_desc: "Krishi Sarathi utilizes tree-based machine learning ensembles and over 770,000 Soil Health Cards to deliver real-time, explainable crop suitability analytics for Western Maharashtra.",
    hero_cta: "Start Crop Analysis",
    stats_soil: "Soil Card Records",
    stats_f1: "F1 Classification Score",
    stats_crops: "Recommendation Crops",
    stats_valid: "Coordinate Accuracy",
    tech_title: "State-of-the-Art Explainable AI (XAI)",
    tech_desc: "By integrating tree-based SHAP values, Krishi Sarathi maps the local feature contributions of nitrogen, phosphorus, soil pH, and cumulative rainfall. Farmers receive clear, transparent, and actionable reasoning behind why each crop is recommended.",
    tech_tag: "Calibrated confidence scores mapped to 5 suitability bands.",
    sanskrit_translation: "Translates to: 'Knowledge-integrated agriculture leads to prosperity.'",
    
    // Dashboard / Form
    form_title: "Crop Suitability Analysis",
    form_subtitle: "Input regional agronomic values to predict optimal crop recommendations.",
    label_district: "District",
    label_soil_color: "Soil Color",
    label_n: "Nitrogen (N)",
    label_p: "Phosphorus (P)",
    label_k: "Potassium (K)",
    label_ph: "Soil pH",
    label_temp: "Temp (°C)",
    label_humidity: "Humidity (%)",
    label_rainfall: "Rainfall (mm)",
    btn_predict: "Predict Optimal Crops",
    btn_predict_loading: "Running ML Engine...",
    
    // Soil colors
    soil_black: "Black Soil",
    soil_red: "Red Soil",
    soil_dark_brown: "Dark Brown",
    soil_medium_brown: "Medium Brown",
    soil_light_brown: "Light Brown",
    soil_reddish_brown: "Reddish Brown",
    
    // Results
    results_title: "Suitability Results",
    results_primary: "Primary crop",
    results_rank: "Top recommended target",
    results_confidence: "Confidence",
    results_match: "Match score",
    results_water: "Water require",
    results_cycle: "Cycle period",
    results_xai: "Agronomic explainability rationale",
    results_fallback: "Recommended as a secondary fallback option. Water requirements and growing cycle align with regional historical profiles.",
    results_reset: "Analyze Another Soil",
    results_secondary: "Secondary Suggestion",
    results_shap_title: "SHAP Parametric Impact mapping",
    results_shap_desc: "Feature contributions representing how much each soil constituent drove this recommendation.",
    
    // Export and History
    btn_export: "Print Report",
    history_title: "Recent Predictions History",
    history_empty: "No predictions run yet.",
    history_load: "Load Run",
    
    // Insights / Map
    map_title: "Maharashtra Regional Insights",
    map_subtitle: "Interactive map selector of the Pune Division agricultural databases.",
    map_svg_title: "Western Maharashtra SVG Interactive Selector",
    map_help: "Click on any district polygon to filter the details.",
    map_label_rainfall: "Normal Rainfall",
    map_label_soil: "Predominant Soil",
    map_label_ph: "Typical Soil pH",
    map_label_oc: "Organic Carbon",
    map_label_crops: "Primary Crops in District Database",
    
    // Analytics
    analytics_title: "Machine Learning Model Specifications",
    analytics_subtitle: "Technical specifications, validation bounds, and model details.",
    card_specs_title: "Model Specifications Card",
    card_bounds_title: "Calibration & Intent Boundaries",
    spec_model: "Model Type",
    spec_f1: "F1 Classification Score",
    spec_top3: "Top-3 Validation Accuracy",
    spec_loss: "Validation Log Loss",
    spec_params: "Parameters",
    desc_agro_1: "This crop recommender classifier is trained specifically for Western Maharashtra, mapping Pune Division soil card records.",
    desc_agro_2: "The model uses TreeSHAP explainability at query runtime to calculate mathematical feature impacts for the recommended crop.",
    desc_agro_3: "Outputs include ranked suggestions, confidence ratings, and natural language reasons translating model features directly into agricultural insights."
  },
  mr: {
    nav_home: "मुख्य पृष्ठ",
    nav_analysis: "मृदा विश्लेषण यंत्र",
    nav_map: "महाराष्ट्र नकाशा",
    nav_specs: "तांत्रिक विश्लेषण",
    
    // Header
    api_status: "API स्थिती",
    api_online: "सुरू आहे",
    api_offline: "बंद आहे",
    
    // Landing Page
    hero_badge: "कृत्रिम बुद्धिमत्ता (AI) पीक शिफारस प्लॅटफॉर्म",
    hero_title_1: "अचूक पीक निवडा.",
    hero_title_2: "समृद्ध शेतीचा पाया.",
    hero_desc: "कृषी सारथी हे मशीन लर्निंग अल्गोरिदम आणि ७,७०,००० पेक्षा जास्त मृदा आरोग्य कार्डांचा वापर करून पश्चिम महाराष्ट्रातील शेतकऱ्यांसाठी रिअल-टाइम पीक शिफारसी प्रदान करते.",
    hero_cta: "पीक विश्लेषण सुरू करा",
    stats_soil: "मृदा आरोग्य कार्ड नोंदी",
    stats_f1: "एफ-१ अचूकता गुणवत्ता",
    stats_crops: "शिफारस केलेली पिके",
    stats_valid: "भौगोलिक अचूकता",
    tech_title: "स्पष्टीकरण देणारे कृत्रिम ज्ञान (Explainable AI)",
    tech_desc: "कृषी सारथी नायट्रोजन, फॉस्फरस, पोटॅश, जमिनीचा सामू (pH) आणि पावसाचे प्रमाण मोजून पीक निवडीचे कारण दाखवते. शेतकऱ्यांना प्रत्येक पिकाच्या शिफारशीमागील स्पष्ट शास्त्रीय कारण समजते.",
    tech_tag: "५ वेगवेगळ्या पट्ट्यांमध्ये पीक सुयोग्यतेचे वर्गीकरण केले जाते.",
    sanskrit_translation: "अर्थ: 'ज्ञानाने युक्त असलेली शेतीच खरी समृद्धी आणते.'",
    
    // Dashboard / Form
    form_title: "मृदा व पीक सुयोग्यता विश्लेषण",
    form_subtitle: "उत्कृष्ट पीक शिफारशी मिळवण्यासाठी खालील शेतातील मृदा घटकांची माहिती भरा.",
    label_district: "जिल्हा",
    label_soil_color: "मातीचा रंग",
    label_n: "नायट्रोजन (N)",
    label_p: "फॉस्फरस (P)",
    label_k: "पोटॅश (K)",
    label_ph: "जमिनीचा सामू (pH)",
    label_temp: "तापमान (°C)",
    label_humidity: "हवामानातील आर्द्रता (%)",
    label_rainfall: "एकूण पाऊस (mm)",
    btn_predict: "पीक शिफारस मिळवा",
    btn_predict_loading: "वर्गीकरण चालू आहे...",
    
    // Soil colors
    soil_black: "काळी माती",
    soil_red: "तांबडी माती",
    soil_dark_brown: "गडद तपकिरी माती",
    soil_medium_brown: "मध्यम तपकिरी माती",
    soil_light_brown: "फिकट तपकिरी माती",
    soil_reddish_brown: "लालसर तपकिरी माती",
    
    // Results
    results_title: "शिफारस केलेली पिके",
    results_primary: "मुख्य शिफारस",
    results_rank: "सर्वोत्तम पीक पर्याय",
    results_confidence: "आत्मविश्वास पातळी",
    results_match: "सुयोग्यता गुण",
    results_water: "पाण्याची गरज",
    results_cycle: "कालावधी",
    results_xai: "शास्त्रीय शिफारस कारण (SHAP)",
    results_fallback: "पर्यायी दुय्यम पीक म्हणून शिफारस केलेले आहे. पाण्याची गरज आणि पिकाचा कालावधी स्थानिक हवामानास सुसंगत आहे.",
    results_reset: "दुसऱ्या मातीचे विश्लेषण करा",
    results_secondary: "पर्यायी पीक पर्याय",
    results_shap_title: "SHAP मृदा घटक प्रभाव विश्लेषण",
    results_shap_desc: "पिकाच्या शिफारशीत कोणत्या घटकाचे योगदान जास्त होते याचा तक्ता.",
    
    // Export and History
    btn_export: "अहवाल मुद्रित करा",
    history_title: "अलीकडील पीक शिफारसी इतिहास",
    history_empty: "अद्याप कोणतेही विश्लेषण केलेले नाही.",
    history_load: "पुन्हा उघडा",
    
    // Insights / Map
    map_title: "महाराष्ट्र कृषी माहिती केंद्र",
    map_subtitle: "पुणे विभागातील जिल्ह्यांचे भौगोलिक विश्लेषण दर्शवणारा नकाशा.",
    map_svg_title: "पश्चिम महाराष्ट्र विभाग निवडक नकाशा",
    map_help: "जिल्ह्याची कृषी माहिती पाहण्यासाठी नकाशावरील जिल्ह्यावर क्लिक करा.",
    map_label_rainfall: "सरासरी पर्जन्यमान",
    map_label_soil: "मुख्य मातीचा प्रकार",
    map_label_ph: "जमिनीचा सरासरी सामू (pH)",
    map_label_oc: "सेंद्रिय कर्ब (OC)",
    map_label_crops: "जिल्ह्यातील पारंपारिक पिके",
    
    // Analytics
    analytics_title: "मशीन लर्निंग मॉडेल तांत्रिक माहिती",
    analytics_subtitle: "मॉडेलची क्षमता, गुणवत्ता मोजमाप आणि अचूकता निर्देशक.",
    card_specs_title: "तांत्रिक तपशील कार्ड",
    card_bounds_title: "पीक सुयोग्यता मर्यादा",
    spec_model: "मॉडेल प्रकार",
    spec_f1: "एफ-१ अचूकता गुणवत्ता",
    spec_top3: "टॉप-३ अचूकता गुणवत्ता",
    spec_loss: "लॉग लॉस",
    spec_params: "मर्यादा घटक",
    desc_agro_1: "हे मॉडेल पश्चिम महाराष्ट्रातील (पुणे विभाग) प्रत्यक्ष मृदा कार्डांच्या ७.७ लाख नोंदींवरून प्रशिक्षित केले गेले आहे.",
    desc_agro_2: "मृदा परीक्षणाचे मूल्य टाकल्यावर मॉडेल TreeSHAP तंत्राचा वापर करून घटकांचे मोजमाप करते.",
    desc_agro_3: "यामध्ये पिकांचे वर्गीकरण, आत्मविश्वास गुण, आणि पिकांच्या शिफारशींचे सोपे शास्त्रीय स्पष्टीकरण दिले जाते."
  }
};
