const fs = require('fs');

const dictionaries = {
  hi: {
    landing: {
      join_now: "अभी जुड़ें",
      headline: "ताकत। संतुलन। आप।",
      subheadline: "कोई जिम नहीं। कोई वजन नहीं। वास्तविक परिणामों के लिए निर्मित अंतिम कैलिस्थेनिक्स + योग हाइब्रिड। आपकी व्यक्तिगत यात्रा यहाँ से शुरू होती है।",
      start_assessment: "अपना मूल्यांकन शुरू करें",
      active_members: "सक्रिय सदस्य",
      reviews: "2k+ समीक्षाओं से"
    },
    nav: {
      home: "होम",
      progress: "प्रगति",
      food: "भोजन",
      settings: "सेटिंग्स",
      dashboard: "डैशबोर्ड",
      login: "लॉग इन",
      signup: "साइन अप"
    },
    dashboard: {
      welcome_back: "वापसी पर स्वागत है",
      your_plan: "आपकी योजना",
      generate_new: "नई योजना बनाएं",
      log_workout: "वर्कआउट लॉग करें",
      log_food: "भोजन लॉग करें",
      today_meal: "आज का भोजन",
      no_plan: "कोई सक्रिय योजना नहीं मिली।"
    },
    settings: {
      referral_engine: "रेफरल इंजन",
      referral_desc: "1 महीने का एलीट मुफ्त पाने के लिए 3 दोस्तों को आमंत्रित करें!",
      your_invite_link: "आपका आमंत्रण लिंक",
      logout: "लॉग आउट",
      language: "भाषा",
      select_language: "भाषा चुनें"
    }
  },
  es: {
    landing: {
      join_now: "Únete Ahora",
      headline: "Fuerza. Equilibrio. Tú.",
      subheadline: "Sin gimnasio. Sin pesas. El híbrido definitivo de Calistenia + Yoga creado para resultados reales. Tu viaje personalizado comienza aquí.",
      start_assessment: "Inicia Tu Evaluación",
      active_members: "miembros activos",
      reviews: "de más de 2k reseñas"
    },
    nav: {
      home: "Inicio",
      progress: "Progreso",
      food: "Comida",
      settings: "Ajustes",
      dashboard: "Tablero",
      login: "Iniciar sesión",
      signup: "Registrarse"
    },
    dashboard: {
      welcome_back: "Bienvenido de nuevo",
      your_plan: "Tu Plan",
      generate_new: "Generar Nuevo Plan",
      log_workout: "Registrar Entrenamiento",
      log_food: "Registrar Comida",
      today_meal: "Comida de Hoy",
      no_plan: "No se encontró nenhum plan activo."
    },
    settings: {
      referral_engine: "Motor de Referencias",
      referral_desc: "¡Invita a 3 amigos para obtener 1 mes de Elite gratis!",
      your_invite_link: "Tu Enlace de Invitación",
      logout: "Cerrar sesión",
      language: "Idioma",
      select_language: "Seleccionar Idioma"
    }
  },
  fr: {
    landing: {
      join_now: "Rejoindre",
      headline: "Force. Équilibre. Vous.",
      subheadline: "Pas de salle de sport. Pas de poids. L'hybride ultime Callisthénie + Yoga conçu pour de vrais résultats. Votre parcours personnalisé commence ici.",
      start_assessment: "Commencez Votre Évaluation",
      active_members: "membres actifs",
      reviews: "à partir de 2k+ avis"
    },
    nav: {
      home: "Accueil",
      progress: "Progrès",
      food: "Nourriture",
      settings: "Paramètres",
      dashboard: "Tableau de bord",
      login: "Connexion",
      signup: "S'inscrire"
    },
    dashboard: {
      welcome_back: "Bon retour",
      your_plan: "Votre Plan",
      generate_new: "Générer un Nouveau Plan",
      log_workout: "Enregistrer l'Entraînement",
      log_food: "Enregistrer le Repas",
      today_meal: "Repas du Jour",
      no_plan: "Aucun plan actif trouvé."
    },
    settings: {
      referral_engine: "Moteur de Parrainage",
      referral_desc: "Invitez 3 amis pour obtenir 1 mois d'Elite gratuit !",
      your_invite_link: "Votre Lien d'Invitation",
      logout: "Déconnexion",
      language: "Langue",
      select_language: "Sélectionner la Langue"
    }
  },
  zh: {
    landing: {
      join_now: "立即加入",
      headline: "力量。平衡。你。",
      subheadline: "没有健身房。没有重物。专为真实结果打造的终极自重训练+瑜伽混合体系。您的个性化旅程从这里开始。",
      start_assessment: "开始您的评估",
      active_members: "活跃会员",
      reviews: "来自2k+评论"
    },
    nav: {
      home: "主页",
      progress: "进度",
      food: "食物",
      settings: "设置",
      dashboard: "仪表板",
      login: "登录",
      signup: "注册"
    },
    dashboard: {
      welcome_back: "欢迎回来",
      your_plan: "您的计划",
      generate_new: "生成新计划",
      log_workout: "记录训练",
      log_food: "记录食物",
      today_meal: "今日餐食",
      no_plan: "未找到活动计划。"
    },
    settings: {
      referral_engine: "推荐引擎",
      referral_desc: "邀请3个朋友即可免费获得1个月的Elite！",
      your_invite_link: "您的邀请链接",
      logout: "登出",
      language: "语言",
      select_language: "选择语言"
    }
  },
  ar: {
    landing: {
      join_now: "انضم الآن",
      headline: "القوة. التوازن. أنت.",
      subheadline: "بدون صالة ألعاب رياضية. بدون أوزان. المزيج النهائي بين تمارين وزن الجسم واليوغا المصمم لتحقيق نتائج حقيقية. رحلتك الشخصية تبدأ هنا.",
      start_assessment: "ابدأ تقييمك",
      active_members: "أعضاء نشطين",
      reviews: "من أكثر من 2000 مراجعة"
    },
    nav: {
      home: "الرئيسية",
      progress: "التقدم",
      food: "الطعام",
      settings: "الإعدادات",
      dashboard: "لوحة التحكم",
      login: "تسجيل الدخول",
      signup: "اشتراك"
    },
    dashboard: {
      welcome_back: "مرحباً بعودتك",
      your_plan: "خطتك",
      generate_new: "إنشاء خطة جديدة",
      log_workout: "تسجيل التمرين",
      log_food: "تسجيل الطعام",
      today_meal: "وجبة اليوم",
      no_plan: "لم يتم العثور على خطة نشطة."
    },
    settings: {
      referral_engine: "محرك الإحالة",
      referral_desc: "قم بدعوة 3 أصدقاء للحصول على شهر واحد مجانًا من Elite!",
      your_invite_link: "رابط الدعوة الخاص بك",
      logout: "تسجيل الخروج",
      language: "اللغة",
      select_language: "اختر اللغة"
    }
  },
  bn: {
    landing: {
      join_now: "এখনই যোগ দিন",
      headline: "শক্তি। ভারসাম্য। আপনি।",
      subheadline: "কোন জিম নেই। কোন ওজন নেই। আসল ফলাফলের জন্য তৈরি চূড়ান্ত ক্যালিসথেনিক্স + যোগা হাইব্রিড। আপনার ব্যক্তিগতকৃত যাত্রা এখান থেকে শুরু হয়।",
      start_assessment: "আপনার মূল্যায়ন শুরু করুন",
      active_members: "সক্রিয় সদস্য",
      reviews: "২ হাজার+ পর্যালোচনা থেকে"
    },
    nav: {
      home: "হোম",
      progress: "অগ্রগতি",
      food: "খাদ্য",
      settings: "সেটিংস",
      dashboard: "ড্যাশবোর্ড",
      login: "লগ ইন",
      signup: "সাইন আপ"
    },
    dashboard: {
      welcome_back: "পুনরায় স্বাগতম",
      your_plan: "আপনার পরিকল্পনা",
      generate_new: "নতুন পরিকল্পনা তৈরি করুন",
      log_workout: "ব্যায়াম লগ করুন",
      log_food: "খাবার লগ করুন",
      today_meal: "আজকের খাবার",
      no_plan: "কোন সক্রিয় পরিকল্পনা পাওয়া যায়নি।"
    },
    settings: {
      referral_engine: "রেফারেল ইঞ্জিন",
      referral_desc: "১ মাসের এলিট বিনামূল্যে পেতে ৩ জন বন্ধুকে আমন্ত্রণ জানান!",
      your_invite_link: "আপনার আমন্ত্রণের লিঙ্ক",
      logout: "লগ আউট",
      language: "ভাষা",
      select_language: "ভাষা নির্বাচন করুন"
    }
  },
  ru: {
    landing: {
      join_now: "Присоединиться",
      headline: "Сила. Баланс. Вы.",
      subheadline: "Никакого зала. Никаких весов. Идеальный гибрид калистеники и йоги, созданный для реальных результатов. Ваше личное путешествие начинается здесь.",
      start_assessment: "Начать оценку",
      active_members: "активных участников",
      reviews: "от 2к+ отзывов"
    },
    nav: {
      home: "Главная",
      progress: "Прогресс",
      food: "Еда",
      settings: "Настройки",
      dashboard: "Панель",
      login: "Войти",
      signup: "Регистрация"
    },
    dashboard: {
      welcome_back: "С возвращением",
      your_plan: "Ваш план",
      generate_new: "Создать новый план",
      log_workout: "Записать тренировку",
      log_food: "Записать еду",
      today_meal: "Еда на сегодня",
      no_plan: "Активный план не найден."
    },
    settings: {
      referral_engine: "Реферальная система",
      referral_desc: "Пригласите 3 друзей и получите 1 месяц Elite бесплатно!",
      your_invite_link: "Ваша ссылка для приглашения",
      logout: "Выйти",
      language: "Язык",
      select_language: "Выберите язык"
    }
  },
  pt: {
    landing: {
      join_now: "Junte-se Agora",
      headline: "Força. Equilíbrio. Você.",
      subheadline: "Sem academia. Sem pesos. O híbrido definitivo de Calistenia + Yoga construído para resultados reais. Sua jornada personalizada começa aqui.",
      start_assessment: "Inicie Sua Avaliação",
      active_members: "membros ativos",
      reviews: "de mais de 2k avaliações"
    },
    nav: {
      home: "Início",
      progress: "Progresso",
      food: "Comida",
      settings: "Configurações",
      dashboard: "Painel",
      login: "Entrar",
      signup: "Cadastrar"
    },
    dashboard: {
      welcome_back: "Bem-vindo de volta",
      your_plan: "Seu Plano",
      generate_new: "Gerar Novo Plano",
      log_workout: "Registrar Treino",
      log_food: "Registrar Comida",
      today_meal: "Refeição de Hoje",
      no_plan: "Nenhum plano ativo encontrado."
    },
    settings: {
      referral_engine: "Motor de Indicações",
      referral_desc: "Convide 3 amigos para ganhar 1 mês de Elite grátis!",
      your_invite_link: "Seu Link de Convite",
      logout: "Sair",
      language: "Idioma",
      select_language: "Selecionar Idioma"
    }
  },
  id: {
    landing: {
      join_now: "Bergabung Sekarang",
      headline: "Kekuatan. Keseimbangan. Anda.",
      subheadline: "Tanpa gym. Tanpa beban. Hibrida Kalistenik + Yoga terbaik yang dibangun untuk hasil nyata. Perjalanan pribadi Anda dimulai di sini.",
      start_assessment: "Mulai Penilaian Anda",
      active_members: "anggota aktif",
      reviews: "dari 2rb+ ulasan"
    },
    nav: {
      home: "Beranda",
      progress: "Kemajuan",
      food: "Makanan",
      settings: "Pengaturan",
      dashboard: "Dasbor",
      login: "Masuk",
      signup: "Daftar"
    },
    dashboard: {
      welcome_back: "Selamat datang kembali",
      your_plan: "Rencana Anda",
      generate_new: "Buat Rencana Baru",
      log_workout: "Catat Latihan",
      log_food: "Catat Makanan",
      today_meal: "Makanan Hari Ini",
      no_plan: "Tidak ada rencana aktif yang ditemukan."
    },
    settings: {
      referral_engine: "Mesin Rujukan",
      referral_desc: "Undang 3 teman untuk mendapatkan 1 bulan Elite gratis!",
      your_invite_link: "Tautan Undangan Anda",
      logout: "Keluar",
      language: "Bahasa",
      select_language: "Pilih Bahasa"
    }
  },
  de: {
    landing: {
      join_now: "Jetzt Beitreten",
      headline: "Kraft. Balance. Du.",
      subheadline: "Kein Fitnessstudio. Keine Gewichte. Das ultimative Calisthenics + Yoga Hybrid, gebaut für echte Ergebnisse. Deine personalisierte Reise beginnt hier.",
      start_assessment: "Starte deine Bewertung",
      active_members: "aktive Mitglieder",
      reviews: "von über 2k Bewertungen"
    },
    nav: {
      home: "Startseite",
      progress: "Fortschritt",
      food: "Essen",
      settings: "Einstellungen",
      dashboard: "Dashboard",
      login: "Einloggen",
      signup: "Registrieren"
    },
    dashboard: {
      welcome_back: "Willkommen zurück",
      your_plan: "Dein Plan",
      generate_new: "Neuen Plan erstellen",
      log_workout: "Workout protokollieren",
      log_food: "Essen protokollieren",
      today_meal: "Heutige Mahlzeit",
      no_plan: "Kein aktiver Plan gefunden."
    },
    settings: {
      referral_engine: "Empfehlungsmaschine",
      referral_desc: "Lade 3 Freunde ein, um 1 Monat Elite kostenlos zu erhalten!",
      your_invite_link: "Dein Einladungslink",
      logout: "Abmelden",
      language: "Sprache",
      select_language: "Sprache auswählen"
    }
  },
  ja: {
    landing: {
      join_now: "今すぐ参加",
      headline: "強さ。バランス。あなた。",
      subheadline: "ジム不要。ウェイト不要。真の結果を生み出す究極の自重トレーニング＋ヨガのハイブリッド。あなたのパーソナライズされた旅がここから始まります。",
      start_assessment: "評価を開始する",
      active_members: "アクティブメンバー",
      reviews: "2千件以上のレビューから"
    },
    nav: {
      home: "ホーム",
      progress: "進捗",
      food: "食事",
      settings: "設定",
      dashboard: "ダッシュボード",
      login: "ログイン",
      signup: "サインアップ"
    },
    dashboard: {
      welcome_back: "お帰りなさい",
      your_plan: "あなたのプラン",
      generate_new: "新しいプランを作成",
      log_workout: "ワークアウトを記録",
      log_food: "食事を記録",
      today_meal: "今日の食事",
      no_plan: "アクティブなプランが見つかりません。"
    },
    settings: {
      referral_engine: "紹介エンジン",
      referral_desc: "友達を3人招待して、1ヶ月のEliteを無料でゲット！",
      your_invite_link: "あなたの招待リンク",
      logout: "ログアウト",
      language: "言語",
      select_language: "言語を選択"
    }
  }
};

for (const [lang, dict] of Object.entries(dictionaries)) {
  fs.writeFileSync('./src/i18n/' + lang + '.json', JSON.stringify(dict, null, 2));
}
console.log("Dictionaries generated!");
