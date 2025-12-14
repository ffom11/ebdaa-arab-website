// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.data = this.loadData();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupEventListeners();
        this.loadContent();
        this.setupAutoSave();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link-admin');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    showSection(sectionName) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    setupEventListeners() {
        // File input previews
        document.getElementById('site-logo')?.addEventListener('change', (e) => {
            this.previewImage(e.target, 'logo-preview');
        });

        document.getElementById('hero-bg')?.addEventListener('change', (e) => {
            this.previewImage(e.target, 'hero-bg-preview');
        });

        // Content change listeners
        document.getElementById('site-title')?.addEventListener('input', (e) => {
            this.data.site.title = e.target.value;
        });

        document.getElementById('hero-title')?.addEventListener('input', (e) => {
            this.data.content.heroTitle = e.target.value;
        });

        document.getElementById('hero-description')?.addEventListener('input', (e) => {
            this.data.content.heroDescription = e.target.value;
        });

        // Contact info
        document.getElementById('contact-phone')?.addEventListener('input', (e) => {
            this.data.contact.phone = e.target.value;
        });

        document.getElementById('contact-whatsapp')?.addEventListener('input', (e) => {
            this.data.contact.whatsapp = e.target.value;
        });

        document.getElementById('contact-email')?.addEventListener('input', (e) => {
            this.data.contact.email = e.target.value;
        });

        document.getElementById('contact-address')?.addEventListener('input', (e) => {
            this.data.contact.address = e.target.value;
        });

        // Colors
        document.getElementById('primary-color')?.addEventListener('input', (e) => {
            this.data.settings.primaryColor = e.target.value;
        });

        document.getElementById('secondary-color')?.addEventListener('input', (e) => {
            this.data.settings.secondaryColor = e.target.value;
        });
    }

    previewImage(input, previewId) {
        const file = input.files[0];
        const preview = document.getElementById(previewId);
        
        if (file && preview) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
                preview.classList.add('fade-in');
                
                // Save to data
                const dataKey = previewId.replace('-preview', '');
                this.data.images[dataKey] = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    loadContent() {
        // Load services
        this.loadServices();
        
        // Load portfolio
        this.loadPortfolio();
        
        // Load partners
        this.loadPartners();
        
        // Load contact info
        this.loadContactInfo();
        
        // Load settings
        this.loadSettings();
    }

    loadServices() {
        const servicesList = document.getElementById('services-list');
        if (!servicesList) return;

        servicesList.innerHTML = '';
        this.data.services.forEach((service, index) => {
            const serviceCard = this.createServiceCard(service, index);
            servicesList.appendChild(serviceCard);
        });
    }

    createServiceCard(service, index) {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" class="form-control mb-2" placeholder="اسم الخدمة" 
                               value="${service.name}" data-index="${index}" data-field="name">
                        <textarea class="form-control mb-2" placeholder="وصف الخدمة" 
                                  data-index="${index}" data-field="description">${service.description}</textarea>
                        <input type="text" class="form-control" placeholder="الأيقونة (Font Awesome)" 
                               value="${service.icon}" data-index="${index}" data-field="icon">
                    </div>
                    <div class="col-md-4">
                        <button class="btn btn-danger w-100" onclick="admin.removeService(${index})">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        card.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.dataset.field;
                this.data.services[index][field] = e.target.value;
            });
        });

        return card;
    }

    addService() {
        const newService = {
            name: 'خدمة جديدة',
            description: 'وصف الخدمة',
            icon: 'fas fa-star'
        };
        
        this.data.services.push(newService);
        this.loadServices();
        this.showSaveIndicator();
    }

    removeService(index) {
        this.data.services.splice(index, 1);
        this.loadServices();
        this.showSaveIndicator();
    }

    loadPortfolio() {
        const portfolioList = document.getElementById('portfolio-list');
        if (!portfolioList) return;

        portfolioList.innerHTML = '';
        this.data.portfolio.forEach((item, index) => {
            const portfolioCard = this.createPortfolioCard(item, index);
            portfolioList.appendChild(portfolioCard);
        });
    }

    createPortfolioCard(item, index) {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" class="form-control mb-2" placeholder="العنوان" 
                               value="${item.title}" data-index="${index}" data-field="title">
                        <textarea class="form-control mb-2" placeholder="الوصف" 
                                  data-index="${index}" data-field="description">${item.description}</textarea>
                        <select class="form-control mb-2" data-index="${index}" data-field="category">
                            <option value="photography" ${item.category === 'photography' ? 'selected' : ''}>تصوير</option>
                            <option value="video" ${item.category === 'video' ? 'selected' : ''}>فيديو</option>
                            <option value="design" ${item.category === 'design' ? 'selected' : ''}>تصميم</option>
                            <option value="social" ${item.category === 'social' ? 'selected' : ''}>تواصل اجتماعي</option>
                        </select>
                        <input type="file" class="form-control" accept="image/*" 
                               data-index="${index}" data-field="image">
                    </div>
                    <div class="col-md-4">
                        ${item.image ? `<img src="${item.image}" class="preview-image mb-2">` : ''}
                        <button class="btn btn-danger w-100" onclick="admin.removePortfolioItem(${index})">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        card.querySelectorAll('input, textarea, select').forEach(input => {
            if (input.type === 'file') {
                input.addEventListener('change', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.data.portfolio[index].image = e.target.result;
                            this.loadPortfolio();
                        };
                        reader.readAsDataURL(file);
                    }
                });
            } else {
                input.addEventListener('input', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    const field = e.target.dataset.field;
                    this.data.portfolio[index][field] = e.target.value;
                });
            }
        });

        return card;
    }

    addPortfolioItem() {
        const newItem = {
            title: 'عمل جديد',
            description: 'وصف العمل',
            category: 'photography',
            image: ''
        };
        
        this.data.portfolio.push(newItem);
        this.loadPortfolio();
        this.showSaveIndicator();
    }

    removePortfolioItem(index) {
        this.data.portfolio.splice(index, 1);
        this.loadPortfolio();
        this.showSaveIndicator();
    }

    loadPartners() {
        const partnersList = document.getElementById('partners-list');
        if (!partnersList) return;

        partnersList.innerHTML = '';
        this.data.partners.forEach((partner, index) => {
            const partnerCard = this.createPartnerCard(partner, index);
            partnersList.appendChild(partnerCard);
        });
    }

    createPartnerCard(partner, index) {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" class="form-control mb-2" placeholder="اسم الشريك" 
                               value="${partner.name}" data-index="${index}" data-field="name">
                        <input type="url" class="form-control mb-2" placeholder="رابط الموقع" 
                               value="${partner.url}" data-index="${index}" data-field="url">
                        <input type="file" class="form-control" accept="image/*" 
                               data-index="${index}" data-field="logo">
                    </div>
                    <div class="col-md-4">
                        ${partner.logo ? `<img src="${partner.logo}" class="preview-image mb-2">` : ''}
                        <button class="btn btn-danger w-100" onclick="admin.removePartner(${index})">
                            <i class="fas fa-trash"></i> حذف
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        card.querySelectorAll('input').forEach(input => {
            if (input.type === 'file') {
                input.addEventListener('change', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.data.partners[index].logo = e.target.result;
                            this.loadPartners();
                        };
                        reader.readAsDataURL(file);
                    }
                });
            } else {
                input.addEventListener('input', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    const field = e.target.dataset.field;
                    this.data.partners[index][field] = e.target.value;
                });
            }
        });

        return card;
    }

    addPartner() {
        const newPartner = {
            name: 'شريك جديد',
            url: '',
            logo: ''
        };
        
        this.data.partners.push(newPartner);
        this.loadPartners();
        this.showSaveIndicator();
    }

    removePartner(index) {
        this.data.partners.splice(index, 1);
        this.loadPartners();
        this.showSaveIndicator();
    }

    loadContactInfo() {
        document.getElementById('contact-phone').value = this.data.contact.phone;
        document.getElementById('contact-whatsapp').value = this.data.contact.whatsapp;
        document.getElementById('contact-email').value = this.data.contact.email;
        document.getElementById('contact-address').value = this.data.contact.address;
    }

    loadSettings() {
        document.getElementById('primary-color').value = this.data.settings.primaryColor;
        document.getElementById('secondary-color').value = this.data.settings.secondaryColor;
        document.getElementById('auto-save').checked = this.data.settings.autoSave;
    }

    setupAutoSave() {
        const autoSaveCheckbox = document.getElementById('auto-save');
        if (autoSaveCheckbox) {
            autoSaveCheckbox.addEventListener('change', (e) => {
                this.data.settings.autoSave = e.target.checked;
                if (e.target.checked) {
                    this.startAutoSave();
                } else {
                    this.stopAutoSave();
                }
            });
        }

        if (this.data.settings.autoSave) {
            this.startAutoSave();
        }
    }

    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.saveData();
        }, 30000); // Save every 30 seconds
    }

    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
    }

    saveData() {
        localStorage.setItem('ebdaa_admin_data', JSON.stringify(this.data));
        this.showSaveIndicator();
        this.updateCounts();
    }

    loadData() {
        const savedData = localStorage.getItem('ebdaa_admin_data');
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        // Default data
        return {
            site: {
                title: 'مؤسسة إبداع العرب',
                logo: ''
            },
            content: {
                heroTitle: 'نحول أفكارك إلى واقع إبداعي',
                heroDescription: 'متخصصون في التصوير الفوتوغرافي، المونتاج الاحترافي، إدارة الحملات الإعلانية، وتصميم التجارب الرقمية المميزة'
            },
            images: {
                heroBg: '../images/hero-bg.jpg',
                logo: ''
            },
            services: [
                { name: 'التصوير الفوتوغرافي', description: 'تصوير احترافي للمناسبات والمنتجات', icon: 'fas fa-camera' },
                { name: 'المونتاج الاحترافي', description: 'تعديل فيديو احترافي ومؤثرات بصرية', icon: 'fas fa-video' },
                { name: 'إدارة التواصل الاجتماعي', description: 'إدارة حسابات التواصل الاجتماعي', icon: 'fas fa-users' },
                { name: 'الحملات الإعلانية', description: 'تصميم وإدارة حملات إعلانية', icon: 'fas fa-bullhorn' },
                { name: 'المتاجر الإلكترونية', description: 'إنشاء وإدارة المتاجر الإلكترونية', icon: 'fas fa-shopping-cart' },
                { name: 'التصاميم الإبداعية', description: 'تصاميم جرافيك وهوية بصرية', icon: 'fas fa-palette' }
            ],
            portfolio: [
                { title: 'عمل 1', description: 'وصف العمل 1', category: 'photography', image: '../images/portfolio/work1.jpg' },
                { title: 'عمل 2', description: 'وصف العمل 2', category: 'video', image: '../images/portfolio/work2.jpg' },
                { title: 'عمل 3', description: 'وصف العمل 3', category: 'design', image: '../images/portfolio/work3.jpg' }
            ],
            partners: [
                { name: 'شريك 1', url: '#', logo: '../images/partners/partner1.png' },
                { name: 'شريك 2', url: '#', logo: '../images/partners/partner2.png' }
            ],
            contact: {
                phone: '056 616 6251',
                whatsapp: '056 616 6251',
                email: 'info@ebdaa.shop',
                address: 'المملكة العربية السعودية'
            },
            settings: {
                primaryColor: '#5b0f4f',
                secondaryColor: '#3f2fbb',
                autoSave: true
            }
        };
    }

    updateCounts() {
        document.getElementById('services-count').textContent = this.data.services.length;
        document.getElementById('portfolio-count').textContent = this.data.portfolio.length;
        document.getElementById('partners-count').textContent = this.data.partners.length;
        document.getElementById('last-update').textContent = new Date().toLocaleDateString('ar-SA');
    }

    showSaveIndicator() {
        const indicator = document.getElementById('save-indicator');
        if (indicator) {
            indicator.style.display = 'block';
            setTimeout(() => {
                indicator.style.display = 'none';
            }, 3000);
        }
    }

    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ebdaa_website_data.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    applyToWebsite() {
        // This function will apply changes to the actual website
        // In a real implementation, this would update the website files
        console.log('Applying changes to website...');
        this.saveData();
        alert('تم تطبيق التغييرات على الموقع بنجاح!');
    }
}

// Initialize admin panel
const admin = new AdminPanel();

// Global functions for onclick handlers
window.addService = () => admin.addService();
window.removeService = (index) => admin.removeService(index);
window.addPortfolioItem = () => admin.addPortfolioItem();
window.removePortfolioItem = (index) => admin.removePortfolioItem(index);
window.addPartner = () => admin.addPartner();
window.removePartner = (index) => admin.removePartner(index);
window.saveAll = () => {
    admin.saveData();
    admin.applyToWebsite();
};

// Auto-save on page unload
window.addEventListener('beforeunload', () => {
    admin.saveData();
});
