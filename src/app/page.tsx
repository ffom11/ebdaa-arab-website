import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Top contact strip */}
      <div className="bg-white/70 dark:bg-white/10 border-b border-black/5 dark:border-white/10">
        <div className="container-rtl py-2 text-sm flex items-center justify-between">
          <a href="tel:966566166251" className="hover:text-[var(--primary)] transition-colors">الهاتف: 966566166251+</a>
          <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md border border-[var(--primary)] text-[var(--primary)]">
            ترخيص إعلامي: 81111
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[color-mix(in_oklab,white,transparent_10%)] backdrop-blur border-b border-black/5 dark:border-white/10">
        <div className="container-rtl py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-md bg-gradient-primary" />
            <span className="text-lg sm:text-xl font-semibold">مؤسسة إبداع العرب</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#partners" className="hover:text-[var(--primary)]">شركاء النجاح</a>
            <a href="#portfolio" className="hover:text-[var(--primary)]">أعمالنا</a>
            <a href="#services" className="hover:text-[var(--primary)]">خدماتنا</a>
            <a href="#about" className="hover:text-[var(--primary)]">من نحن</a>
            <a href="#contact" className="hover:text-[var(--primary)]">تواصل</a>
          </nav>
          <div className="hidden sm:flex items-center gap-2">
            <a href="tel:966566166251" className="px-3 py-2 rounded-md border text-sm hover:bg-[var(--muted)] transition-colors">اتصل الآن</a>
            <a href="#contact" className="px-4 py-2 rounded-md text-white btn-gradient text-sm shadow hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">عرض سعر</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 -z-10 bg-gradient-primary" />
        <div className="container-rtl py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.15] text-gradient">
              شريكك الإبداعي في التصوير والتصميم وإدارة المنصات
            </h1>
            <p className="mt-4 max-w-2xl text-[0.98rem] text-black/70 dark:text-white/70">
              حلول احترافية متكاملة تشمل التصوير بأنواعه، التصميم بكل فروعه، إدارة مواقع
              التواصل، الحملات الإعلانية، وترجمة الأفلام. نضمن جودة عالية ونتائج تقيسها الأرقام.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#contact" className="px-5 py-2.5 rounded-md text-white btn-gradient shadow hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">ابدأ الآن</a>
              <a href="#services" className="px-5 py-2.5 rounded-md border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--muted)] transition-colors">اكتشف خدماتنا</a>
              <a href="#portfolio" className="px-5 py-2.5 rounded-md border border-black/10 dark:border-white/15 hover:bg-[var(--muted)] transition-colors">شاهد أعمالنا</a>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
              {["جودة عالية","تسليم سريع","أسعار تنافسية","فريق خبير"].map((txt,i)=> (
                <div key={i} className="rounded-lg border border-black/10 dark:border-white/15 py-3 bg-white/60 dark:bg-white/5">{txt}</div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
            <Image
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop"
              alt="استوديو تصوير وإخراج"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="container-rtl py-16">
        <h2 className="text-3xl font-bold">أعمالنا</h2>
        <p className="mt-2 text-black/70 dark:text-white/70 max-w-prose">
          استعرض نماذج من أعمال التصوير والفيديو عبر مجلد Google Drive.
        </p>
        <div className="mt-6">
          <a
            href="https://drive.google.com/drive/folders/1JvB54zH53IcZCPNekAI6rVETu_9pVaVh?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white btn-gradient"
          >
            فتح معرض الأعمال
          </a>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1200&auto=format&fit=crop",
          ].map((src, i) => (
            <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-black/10 dark:border-white/15 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <Image src={src} alt={`معرض ${i+1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Services: Photography */}
      <section id="services" className="container-rtl py-16">
        <h2 className="text-3xl font-bold">التصوير الاحترافي</h2>
        <p className="mt-2 text-black/70 dark:text-white/70 max-w-prose">نقدّم حلول تصوير متكاملة بأحدث التقنيات.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "التصوير الجوي (درون)", d: "لقطات بانورامية مبهرة للمشاريع والفعاليات." },
            { t: "تصوير الفيديو", d: "إنتاج فيديوهات دعائية، وثائقية، وتغطيات احترافية." },
            { t: "التصوير الفوتوغرافي", d: "جلسات تصوير للمنتجات، المناسبات، والأعمال." },
          ].map((s,i)=> (
            <div key={i} className="rounded-xl border border-black/10 dark:border-white/15 overflow-hidden bg-white/70 dark:bg-white/10 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="relative h-36 w-full">
                <Image
                  src={[
                    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1524255684952-d7185b509571?q=80&w=1200&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1499155286265-79a9dc9c6380?q=80&w=1200&auto=format&fit=crop",
                  ][i]}
                  alt={s.t}
                  fill
                  className="object-cover"
                />
                {/* icon overlay */}
                <div className="absolute top-2 end-2 size-9 rounded-md bg-white/85 backdrop-blur flex items-center justify-center border border-black/10">
                  {[
                    // drone icon
                    <svg key="d" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M3 7h4l2 2H7l-2 2H3l2-2-2-2Z" fill="currentColor" />
                      <path d="M21 7h-4l-2 2h2l2 2h2l-2-2 2-2Z" fill="currentColor" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>,
                    // video camera icon
                    <svg key="v" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect x="3" y="7" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M14 10l6-3v10l-6-3v-4Z" fill="currentColor" />
                    </svg>,
                    // photo camera icon
                    <svg key="p" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M7 7l2-2h6l2 2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2Z" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>,
                  ][i]}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services: Design */}
      <section className="container-rtl py-12">
        <h2 className="text-3xl font-bold">التصميم الإبداعي</h2>
        <p className="mt-2 text-black/70 dark:text-white/70 max-w-prose">بناء هوية قوية ومحتوى بصري مؤثر.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { t: "تصميم الهوية والشعارات", d: "علامة تجارية متناسقة تعكس رسالتك." },
            { t: "تصميم المطبوعات والمواد التسويقية", d: "بروشورات، بطاقات، بنرات، رول أب، تغليف." },
            { t: "تصميم الموشن جرافيك", d: "رسوم متحركة تشرح خدماتك بأسلوب جذاب." },
            { t: "تصميم المنيو (مطبوع وإلكتروني بباركود)", d: "منيو احترافي للطباعة ونسخة رقمية عبر QR/باركود." },
          ].map((s,i)=> (
            <div key={i} className="rounded-xl border border-black/10 dark:border-white/15 p-6 bg-white/70 dark:bg-white/10 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="w-10 h-10 rounded-md mb-4 bg-white/80 border border-black/10 flex items-center justify-center">
                {[
                  // logo/brand icon
                  <svg key="brand" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <circle cx="7" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    <rect x="12" y="9" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
                  </svg>,
                  // print icon
                  <svg key="print" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="6" y="3" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="6" y="15" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="4" y="9" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
                  </svg>,
                  // motion icon
                  <svg key="motion" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M4 12h6l-3 5 9-10 4-1-4 7h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>,
                  // menu/qr icon
                  <svg key="menuqr" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 4h8v8H3V4Zm10 0h8v4h-8V4Zm0 6h4v4h-4v-4Zm-10 4h8v6H3v-6Zm10 6h4v-2h2v2h2v2h-8v-2Z" fill="currentColor" />
                  </svg>,
                ][i]}
              </div>
              <h3 className="font-semibold text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a
            href="https://drive.google.com/drive/folders/1aalBJm16KgHELRziQLEMmhGvQoHikOJM?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-white btn-gradient"
          >
            أعمالنا في التصاميم
          </a>
        </div>
      </section>

      {/* Services: Prints */}
      <section className="container-rtl py-12">
        <h2 className="text-3xl font-bold">خدمات المطبوعات</h2>
        <p className="mt-2 text-black/70 dark:text-white/70 max-w-prose">جودة طباعة عالية بمقاسات وخامات متعددة.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "بطاقات العمل", d: "تصميم وطباعة كروت فاخرة ومخصصة." },
            { t: "بروشورات وفلايرات", d: "تعريف بخدماتك ومنتجاتك بأسلوب جذاب." },
            { t: "بنرات ورول أب", d: "معارض وفعاليات بظهور احترافي." },
            { t: "ستيكرات وتغليف", d: "ملصقات مخصصة وتغليف منتجاتك." },
            { t: "فواتير وفورمات", d: "نماذج طباعة مهنية للشركات." },
            { t: "منيوهات مطبوعة", d: "تنفيذ المنيو بجودة عالية وخامات متعددة." },
          ].map((s,i)=> (
            <div key={i} className="rounded-xl border border-black/10 dark:border-white/15 p-6 bg-white/70 dark:bg-white/10 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="w-10 h-10 rounded-md mb-4 bg-white/80 border border-black/10 flex items-center justify-center">
                {[
                  // card icon
                  <svg key="card" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
                  </svg>,
                  // brochure icon
                  <svg key="bro" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M4 5h7v14H4zM13 5h7v14h-7z" stroke="currentColor" strokeWidth="2" />
                  </svg>,
                  // banner icon
                  <svg key="ban" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 7h8M8 11h8M8 15h8" stroke="currentColor" strokeWidth="2" />
                  </svg>,
                  // sticker icon
                  <svg key="stk" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M7 3h7l7 7v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M14 3v7h7" stroke="currentColor" strokeWidth="2" />
                  </svg>,
                  // forms icon
                  <svg key="frm" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="2" />
                  </svg>,
                  // menu icon
                  <svg key="mnu" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M6 6h12M6 10h12M6 14h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>,
                ][i]}
              </div>
              <h3 className="font-semibold text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services: Social & Ads */}
      <section className="container-rtl py-12">
        <h2 className="text-3xl font-bold">إدارة السوشيال والحملات</h2>
        <p className="mt-2 text-black/70 dark:text-white/70 max-w-prose">استراتيجية محتوى وإعلانات تحقق نتائج قابلة للقياس.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "إدارة مواقع التواصل", d: "خطة محتوى، تصميم منشورات، جدولة، وتفاعل." },
            { t: "إدارة الحملات الإعلانية", d: "حملات مدفوعة على فيسبوك/إنستغرام/غوغل مع تقارير أداء." },
            { t: "ترجمة الأفلام والمحتوى المرئي", d: "ترجمة واحترافية ضبط توقيت ودمج ملفات الترجمة." },
          ].map((s,i)=> (
            <div key={i} className="rounded-xl border border-black/10 dark:border-white/15 p-6 bg-white/70 dark:bg-white/10 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="w-10 h-10 rounded-md mb-4 bg-white/80 border border-black/10 flex items-center justify-center">
                {[
                  // social icon
                  <svg key="soc" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M4 12h4l2-3 3 6 2-3h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>,
                  // ads icon
                  <svg key="ads" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 12h6M7 9h10M7 15h4" stroke="currentColor" strokeWidth="2" />
                  </svg>,
                  // translate icon
                  <svg key="trl" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M4 7h10M9 7c0 6 6 10 6 10M9 7c0 4-3 7-5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>,
                ][i]}
              </div>
              <h3 className="font-semibold text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="container-rtl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold">من نحن</h2>
            <p className="mt-4 max-w-prose text-[0.98rem] text-black/70 dark:text-white/70">
              فريق يجمع خبرات التصوير، التصميم، التسويق، والإنتاج المرئي لنقدّم حلولًا
              متكاملة تُبرز علامتك وتدفع نمو أعمالك بثقة.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {["+150 مشروع","+90 عميل","+7 سنوات خبرة","+30 حملة"].map((m,i)=> (
                <div key={i} className="rounded-lg border border-black/10 dark:border-white/15 py-3 text-center bg-white/60 dark:bg-white/5">{m}</div>
              ))}
            </div>
          </div>
          <div className="relative rounded-xl h-56 sm:h-72 overflow-hidden border border-black/10 dark:border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1400&auto=format&fit=crop"
              alt="معدات تصوير وإضاءة"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container-rtl py-16">
        <div className="rounded-2xl p-6 sm:p-8 border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/10">
          <h2 className="text-3xl font-bold">دعنا نبدأ مشروعك</h2>
          <p className="mt-2 text-black/70 dark:text-white/70">أخبرنا باحتياجك لنرسل لك عرضًا مناسبًا.</p>
          <div className="mt-6 grid gap-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder="الاسم" className="rounded-md border border-black/10 dark:border-white/15 p-3 bg-white/90 dark:bg-white/10" />
              <input placeholder="البريد الإلكتروني" className="rounded-md border border-black/10 dark:border-white/15 p-3 bg-white/90 dark:bg-white/10" />
            </div>
            <input placeholder="الخدمة المطلوبة (مثال: تصوير جوي/إدارة حملات)" className="rounded-md border border-black/10 dark:border-white/15 p-3 bg-white/90 dark:bg-white/10" />
            <textarea placeholder="تفاصيل إضافية" rows={4} className="rounded-md border border-black/10 dark:border-white/15 p-3 bg-white/90 dark:bg-white/10" />
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-md text-white btn-gradient shadow hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">إرسال الطلب</button>
              <a href="https://wa.me/966566166251" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--muted)] text-sm transition-colors">واتساب</a>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="container-rtl py-16">
        <h2 className="text-3xl font-bold">شركاء النجاح</h2>
        <div className="mt-3 text-black/75 dark:text-white/75 max-w-prose">
          نعـتزُّ بشراكات تمتد عبر قطاعات متعددة تشمل:
          <ul className="list-disc pe-6 mt-3 space-y-1 text-[0.98rem]">
            <li>جمعيات خيرية ومؤسسات أهلية.</li>
            <li>وزارات وهيئات وجهات حكومية.</li>
            <li>شركات خاصة وعلامات تجارية رائدة.</li>
            <li>منشآت صغيرة ومتوسطة وروّاد أعمال.</li>
          </ul>
          نسعد بإضافة شعاركم إلى قائمة شركائنا عند بدء التعاون.
        </div>
      </section>

      {/* Logos strip */}
      <section className="container-rtl py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-70">
          {Array.from({length:4}).map((_,i)=> (
            <div key={i} className="h-10 rounded-md bg-white/60 dark:bg-white/10 border border-black/10 dark:border-white/10" />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-rtl py-12">
        <h2 className="text-2xl font-bold">ماذا يقول عملاؤنا</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { q: "خدمة احترافية وتسليم سريع.", n: "شركة الندى" },
            { q: "فريق مبدع ونتائج ممتازة.", n: "مطعم الحارة" },
            { q: "تصاميم مميزة وحملات فعّالة.", n: "مؤسسة الفلك" },
          ].map((t,i)=> (
            <div key={i} className="rounded-xl border border-black/10 dark:border-white/15 p-6 bg-white/70 dark:bg-white/10">
              <p className="text-[0.98rem]">“{t.q}”</p>
              <div className="mt-3 text-sm text-black/60 dark:text-white/60">{t.n}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 py-8 text-center text-sm text-black/60 dark:text-white/60 border-t border-black/5 dark:border-white/10">
        <div className="container-rtl flex flex-col items-center gap-2">
          <div>© {new Date().getFullYear()} مؤسسة إبداع العرب. جميع الحقوق محفوظة.</div>
          <div className="text-xs">الهاتف: <a href="tel:966566166251" className="hover:text-[var(--primary)]">966566166251+</a> • ترخيص إعلامي: 81111</div>
        </div>
      </footer>
    </div>
  );
}
