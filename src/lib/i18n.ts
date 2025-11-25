export type Language = 'en' | 'tr'

export interface Translations {
    common: {
        back: string
        next: string
        continue: string
        skip: string
        startOver: string
        loading: string
        error: string
        success: string
        cancel: string
        save: string
        copy: string
        download: string
        upload: string
        share: string
        close: string
        search: string
        filter: string
        all: string
        selected: string
        none: string
    }
    navigation: {
        backToHome: string
        shortcuts: string
        setup: string
    }
    setup: {
        welcome: {
            title: string
            description: string
            whatWeSetup: string
            essentialApps: string
            essentialAppsDesc: string
            systemPreferences: string
            systemPreferencesDesc: string
            automationScript: string
            automationScriptDesc: string
            getStarted: string
        }
        apps: {
            title: string
            description: string
            searchPlaceholder: string
            noResults: string
            selectedCount: string
            categories: {
                all: string
                development: string
                productivity: string
                communication: string
                design: string
                utilities: string
                security: string
                media: string
            }
        }
        tweaks: {
            title: string
            description: string
            searchPlaceholder: string
            noResults: string
            selectedCount: string
            categories: {
                all: string
                appearance: string
                dock: string
                finder: string
                security: string
                input: string
                system: string
            }
            safety: {
                safe: string
                requiresSudo: string
                requiresRestart: string
            }
        }
        templates: {
            title: string
            description: string
            comingSoon: string
            comingSoonDesc: string
            skipForNow: string
        }
        generate: {
            title: string
            description: string
            generating: string
            ready: string
            regenerate: string
            options: {
                title: string
                includeComments: string
                includeTimestamps: string
                scriptStyle: string
                styles: {
                    bash: string
                    zsh: string
                    fish: string
                }
            }
        }
        sharing: {
            title: string
            description: string
            shareUrl: string
            copyUrl: string
            urlCopied: string
            downloadJson: string
            importJson: string
            importSuccess: string
            importError: string
            resetConfig: string
        }
    }
    landing: {
        hero: {
            title: string
            subtitle: string
            description: string
            getStarted: string
            viewDemo: string
        }
        features: {
            sectionTitle: string
            sectionDescription: string
            title: string
            apps: {
                title: string
                description: string
                items: {
                    devTools: string
                    productivity: string
                    security: string
                }
            }
            tweaks: {
                title: string
                description: string
                items: {
                    dock: string
                    finder: string
                    security: string
                }
            }
            generator: {
                title: string
                description: string
                items: {
                    singleCommand: string
                    customizable: string
                    errorHandling: string
                }
            }
        }
        stats: {
            apps: string
            tweaks: string
            timeSaved: string
            success: string
            labels: {
                applications: string
                systemTweaks: string
                setupTime: string
                successRate: string
            }
        }
        howItWorks: {
            title: string
            description: string
            steps: {
                select: string
                customize: string
                generate: string
                deploy: string
                descriptions: {
                    select: string
                    customize: string
                    generate: string
                    deploy: string
                }
            }
        }
        cta: {
            title: string
            description: string
        }
    }
}

export const translations: Record<Language, Translations> = {
    en: {
        common: {
            back: 'Back',
            next: 'Next',
            continue: 'Continue',
            skip: 'Skip',
            startOver: 'Start Over',
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            cancel: 'Cancel',
            save: 'Save',
            copy: 'Copy',
            download: 'Download',
            upload: 'Upload',
            share: 'Share',
            close: 'Close',
            search: 'Search',
            filter: 'Filter',
            all: 'All',
            selected: 'Selected',
            none: 'None',
        },
        navigation: {
            backToHome: 'Back to Home',
            shortcuts: 'Shortcuts',
            setup: 'MacInitiate Setup',
        },
        setup: {
            welcome: {
                title: 'Welcome to MacInitiate',
                description: "Let's set up your Mac with the essential tools and preferences for the perfect development environment.",
                whatWeSetup: "What we'll set up:",
                essentialApps: 'Essential Apps',
                essentialAppsDesc: 'Development tools and utilities for productive workflow',
                systemPreferences: 'System Preferences',
                systemPreferencesDesc: 'macOS optimizations and customizations',
                automationScript: 'Automation Script',
                automationScriptDesc: 'Ready-to-run shell script for one-command setup',
                getStarted: 'Get Started',
            },
            apps: {
                title: 'Select Your Apps',
                description: 'Choose the applications you want to install on your Mac. We\'ve curated the best tools for developers.',
                searchPlaceholder: 'Search apps...',
                noResults: 'No apps found',
                selectedCount: '{count} selected',
                categories: {
                    all: 'All',
                    development: 'Development',
                    productivity: 'Productivity',
                    communication: 'Communication',
                    design: 'Design',
                    utilities: 'Utilities',
                    security: 'Security',
                    media: 'Media',
                },
            },
            tweaks: {
                title: 'System Preferences',
                description: 'Customize macOS settings to optimize your workflow and enhance your experience.',
                searchPlaceholder: 'Search tweaks...',
                noResults: 'No tweaks found',
                selectedCount: '{count} selected',
                categories: {
                    all: 'All',
                    appearance: 'Appearance',
                    dock: 'Dock',
                    finder: 'Finder',
                    security: 'Security',
                    input: 'Input',
                    system: 'System',
                },
                safety: {
                    safe: 'Safe',
                    requiresSudo: 'Requires sudo',
                    requiresRestart: 'Requires restart',
                },
            },
            templates: {
                title: 'Development Templates',
                description: 'Choose pre-configured development environments for instant setup. (Coming Soon)',
                comingSoon: 'Templates Coming Soon',
                comingSoonDesc: 'We\'re working on pre-configured development environments for popular stacks like React, Node.js, Python, and more.',
                skipForNow: 'Skip for Now',
            },
            generate: {
                title: 'Generate Your Setup Script',
                description: 'Your personalized macOS setup script is ready to run with a single command.',
                generating: 'Generating script...',
                ready: 'Your setup script is ready!',
                regenerate: 'Regenerate Script',
                options: {
                    title: 'Script Options',
                    includeComments: 'Include comments',
                    includeTimestamps: 'Include timestamps',
                    scriptStyle: 'Script style',
                    styles: {
                        bash: 'Bash',
                        zsh: 'Zsh',
                        fish: 'Fish',
                    },
                },
            },
            sharing: {
                title: 'Share Configuration',
                description: 'Share your setup with others or import existing configurations.',
                shareUrl: 'Share URL',
                copyUrl: 'Copy URL',
                urlCopied: 'URL copied to clipboard!',
                downloadJson: 'Download JSON',
                importJson: 'Import JSON',
                importSuccess: 'Configuration imported successfully!',
                importError: 'Failed to import configuration. Please check the file format.',
                resetConfig: 'Reset Configuration',
            },
        },
        landing: {
            hero: {
                title: 'MacInitiate',
                subtitle: 'The Perfect Setup Tool for Your Mac',
                description: 'The ultimate "Day 1" onboarding experience for macOS users. Select your apps and system preferences, get your Mac set up automatically with a single Terminal command.',
                getStarted: 'Get Started',
                viewDemo: 'View Demo',
            },
            features: {
                sectionTitle: 'Everything You Need for Perfect Mac Setup',
                sectionDescription: 'From essential apps to system optimizations, we\'ve got you covered with curated tools and automated scripts.',
                title: 'Features',
                apps: {
                    title: 'App Collection',
                    description: 'Carefully selected essential macOS applications and development tools for one-click installation.',
                    items: {
                        devTools: 'Development tools',
                        productivity: 'Productivity apps',
                        security: 'Security utilities',
                    }
                },
                tweaks: {
                    title: 'System Optimization',
                    description: 'Optimize macOS settings and preferences to enhance your productivity.',
                    items: {
                        dock: 'Dock customization',
                        finder: 'Finder preferences',
                        security: 'Security settings',
                    }
                },
                generator: {
                    title: 'Script Generator',
                    description: 'Create ready-to-run shell scripts for automated setup and install everything with a single command.',
                    items: {
                        singleCommand: 'One-command execution',
                        customizable: 'Customizable scripts',
                        errorHandling: 'Error handling',
                    }
                },
            },
            stats: {
                apps: '200+ Apps',
                tweaks: '100+ Tweaks',
                timeSaved: '90% Time Saved',
                success: '95% Success Rate',
                labels: {
                    applications: 'Applications',
                    systemTweaks: 'System Tweaks',
                    setupTime: 'Setup Time',
                    successRate: 'Success Rate',
                }
            },
            howItWorks: {
                title: 'How It Works?',
                description: 'Four simple steps to transform your Mac into the perfect development machine.',
                steps: {
                    select: 'Select your apps and preferences',
                    customize: 'Customize your setup',
                    generate: 'Generate your script',
                    deploy: 'Deploy with one command',
                    descriptions: {
                        select: 'Browse our curated collection of essential macOS applications and select what you need.',
                        customize: 'Fine-tune system preferences and settings to match your workflow perfectly.',
                        generate: 'Get a ready-to-run shell script tailored to your specific configuration.',
                        deploy: 'Execute a single command and watch your Mac transform automatically.',
                    }
                },
            },
            cta: {
                title: 'Ready to Transform Your Mac?',
                description: 'Join thousands of developers who\'ve streamlined their macOS setup process. Get started in minutes and save hours of manual configuration.',
            },
        },
    },
    tr: {
        common: {
            back: 'Geri',
            next: 'İleri',
            continue: 'Devam Et',
            skip: 'Atla',
            startOver: 'Baştan Başla',
            loading: 'Yükleniyor...',
            error: 'Hata',
            success: 'Başarılı',
            cancel: 'İptal',
            save: 'Kaydet',
            copy: 'Kopyala',
            download: 'İndir',
            upload: 'Yükle',
            share: 'Paylaş',
            close: 'Kapat',
            search: 'Ara',
            filter: 'Filtrele',
            all: 'Tümü',
            selected: 'Seçili',
            none: 'Hiçbiri',
        },
        navigation: {
            backToHome: 'Ana Sayfaya Dön',
            shortcuts: 'Kısayollar',
            setup: 'MacInitiate Kurulum',
        },
        setup: {
            welcome: {
                title: 'MacInitiate\'e Hoş Geldiniz',
                description: 'Mac\'inizi mükemmel bir geliştirme ortamı için temel araçlar ve tercihlerle kurulum yapalım.',
                whatWeSetup: 'Kurulacaklar:',
                essentialApps: 'Temel Uygulamalar',
                essentialAppsDesc: 'Verimli iş akışı için geliştirme araçları ve yardımcı programlar',
                systemPreferences: 'Sistem Tercihleri',
                systemPreferencesDesc: 'macOS optimizasyonları ve özelleştirmeleri',
                automationScript: 'Otomasyon Scripti',
                automationScriptDesc: 'Tek komutla kurulum için hazır çalıştırma kabuk scripti',
                getStarted: 'Başla',
            },
            apps: {
                title: 'Uygulamalarınızı Seçin',
                description: 'Mac\'inize kurmak istediğiniz uygulamaları seçin. Geliştiriciler için en iyi araçları seçtik.',
                searchPlaceholder: 'Uygulamaları ara...',
                noResults: 'Uygulama bulunamadı',
                selectedCount: '{count} seçili',
                categories: {
                    all: 'Tümü',
                    development: 'Geliştirme',
                    productivity: 'Verimlilik',
                    communication: 'İletişim',
                    design: 'Tasarım',
                    utilities: 'Araçlar',
                    security: 'Güvenlik',
                    media: 'Medya',
                },
            },
            tweaks: {
                title: 'Sistem Tercihleri',
                description: 'İş akışınızı optimize etmek ve deneyiminizi geliştirmek için macOS ayarlarını özelleştirin.',
                searchPlaceholder: 'Ayarları ara...',
                noResults: 'Ayar bulunamadı',
                selectedCount: '{count} seçili',
                categories: {
                    all: 'Tümü',
                    appearance: 'Görünüm',
                    dock: 'Dock',
                    finder: 'Finder',
                    security: 'Güvenlik',
                    input: 'Giriş',
                    system: 'Sistem',
                },
                safety: {
                    safe: 'Güvenli',
                    requiresSudo: 'Sudo gerektirir',
                    requiresRestart: 'Yeniden başlatma gerektirir',
                },
            },
            templates: {
                title: 'Geliştirme Şablonları',
                description: 'Anında kurulum için önceden yapılandırılmış geliştirme ortamlarını seçin. (Yakında)',
                comingSoon: 'Şablonlar Yakında',
                comingSoonDesc: 'React, Node.js, Python ve daha fazlası gibi popüler yığınlar için önceden yapılandırılmış geliştirme ortamları üzerinde çalışıyoruz.',
                skipForNow: 'Şimdilik Atla',
            },
            generate: {
                title: 'Kurulum Scriptinizi Oluşturun',
                description: 'Kişiselleştirilmiş macOS kurulum scriptiniz tek komutla çalışmaya hazır.',
                generating: 'Script oluşturuluyor...',
                ready: 'Kurulum scriptiniz hazır!',
                regenerate: 'Script\'i Yeniden Oluştur',
                options: {
                    title: 'Script Seçenekleri',
                    includeComments: 'Yorumları dahil et',
                    includeTimestamps: 'Zaman damgalarını dahil et',
                    scriptStyle: 'Script stili',
                    styles: {
                        bash: 'Bash',
                        zsh: 'Zsh',
                        fish: 'Fish',
                    },
                },
            },
            sharing: {
                title: 'Yapılandırmayı Paylaş',
                description: 'Kurulumunuzu başkalarıyla paylaşın veya mevcut yapılandırmaları içe aktarın.',
                shareUrl: 'URL Paylaş',
                copyUrl: 'URL Kopyala',
                urlCopied: 'URL panoya kopyalandı!',
                downloadJson: 'JSON İndir',
                importJson: 'JSON İçe Aktar',
                importSuccess: 'Yapılandırma başarıyla içe aktarıldı!',
                importError: 'Yapılandırma içe aktarılamadı. Lütfen dosya formatını kontrol edin.',
                resetConfig: 'Yapılandırmayı Sıfırla',
            },
        },
        landing: {
            hero: {
                title: 'MacInitiate',
                subtitle: 'Mac\'iniz için Mükemmel Kurulum Aracı',
                description: 'macOS kullanıcıları için kusursuz "İlk Gün" kurulum deneyimi. Uygulamaları ve sistem tercihlerinizi seçin, tek bir Terminal komutuyla Mac\'inizi otomatik olarak kurun.',
                getStarted: 'Hemen Başla',
                viewDemo: 'Demo İzle',
            },
            features: {
                sectionTitle: 'Mac\'iniz İçin Mükemmel Kurulumun Her Şeyi',
                sectionDescription: 'Temel uygulamalardan sistem optimizasyonlarına kadar, özenle seçilmiş araçlar ve otomatik scriptlerle her şey düşünüldü.',
                title: 'Özellikler',
                apps: {
                    title: 'Uygulama Koleksiyonu',
                    description: 'Tek tıkla kurulum için özenle seçilmiş temel macOS uygulamaları ve geliştirme araçları.',
                    items: {
                        devTools: 'Geliştirme araçları',
                        productivity: 'Verimlilik uygulamaları',
                        security: 'Güvenlik yardımcıları',
                    }
                },
                tweaks: {
                    title: 'Sistem Optimizasyonu',
                    description: 'macOS ayarlarını ve tercihlerini verimliliğinizi artıracak şekilde optimize edin.',
                    items: {
                        dock: 'Dock özelleştirmesi',
                        finder: 'Finder tercihleri',
                        security: 'Güvenlik ayarları',
                    }
                },
                generator: {
                    title: 'Script Oluşturucu',
                    description: 'Otomatik kurulum için hazır çalıştırma kabuk scriptleri oluşturun ve tek komutla her şeyi kurun.',
                    items: {
                        singleCommand: 'Tek komutla çalıştırma',
                        customizable: 'Kişiselleştirilebilir scriptler',
                        errorHandling: 'Hata yönetimi',
                    }
                },
            },
            stats: {
                apps: '200+ Uygulama',
                tweaks: '100+ Ayar',
                timeSaved: '%90 Zaman Kazancı',
                success: '%95 Başarı Oranı',
                labels: {
                    applications: 'Uygulamalar',
                    systemTweaks: 'Sistem Ayarları',
                    setupTime: 'Kurulum Süresi',
                    successRate: 'Başarı Oranı',
                }
            },
            howItWorks: {
                title: 'Nasıl Çalışır?',
                description: 'Mac\'inizi mükemmel bir geliştirme makinesine dönüştürmek için dört basit adım.',
                steps: {
                    select: 'Uygulamaları ve tercihlerinizi seçin',
                    customize: 'Kurulumunuzu kişiselleştirin',
                    generate: 'Script\'inizi oluşturun',
                    deploy: 'Tek komutla kurulumu tamamlayın',
                    descriptions: {
                        select: 'Özenle seçilmiş temel macOS uygulamaları koleksiyonumuzu gözden geçirin ve ihtiyacınız olanları seçin.',
                        customize: 'İş akışınıza mükemmel şekilde uyması için sistem tercihlerini ve ayarları ince ayar yapın.',
                        generate: 'Belirli yapılandırmanıza özel olarak hazırlanmış, çalıştırmaya hazır kabuk script\'i alın.',
                        deploy: 'Tek bir komut çalıştırın ve Mac\'inizin otomatik olarak dönüşmesini izleyin.',
                    }
                },
            },
            cta: {
                title: 'Mac\'inizi Dönüştürmeye Hazır mısınız?',
                description: 'macOS kurulum sürecini kolaylaştıran binlerce geliştiriciye katılın. Dakikalar içinde başlayın ve saatler süren manuel yapılandırmadan tasarruf edin.',
            },
        },
    },
}

export function useTranslation(language: Language = 'en') {
    const t = translations[language]

    return {
        t,
        language,
        isRTL: false, // Turkish is not RTL, but keeping for future languages
    }
}
