'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    User,
    Code,
    Award,
    FolderOpen,
    Mail,
    Hash,
    Edit3,
    Plus,
    Trash2,
    Save,
    X,
    LogOut,
    Eye,
    Upload,
    ChevronUp,
    ChevronDown,
    RefreshCw
} from 'lucide-react';

interface AboutData {
    CVpdf: string;
    imageUrl: string;
    description: string;
}

interface Card {
    id?: number;
    title: string;
    src: string;
    content: string;
}

interface SkillsData {
    cards: Card[];
    words: string[];
}

interface Certification {
    id?: number;
    imageUrl: string;
    title: string;
    date: string;
    description: string;
    link: string;
}

interface CertificationsData {
    certifications: Certification[];
}

interface Project {
    id?: number;
    title: string;
    date: string;
    description: string;
    header: string;
    externalLink: string;
    githubLink: string;
}

interface ProjectsData {
    projects: Project[];
}

interface ContactData {
    CVpdf: string;
    githubtext: string;
    githublink: string;
    linkedintext: string;
    linkedinlink: string;
    emailtext: string;
}

interface FooterData {
    words: string[];
}

interface PortfolioData {
    about: AboutData;
    skills: SkillsData;
    certifications: CertificationsData;
    projects: ProjectsData;
    contact: ContactData;
    footer: FooterData;
}

type Section = 'about' | 'skills' | 'certifications' | 'projects' | 'contact' | 'footer';

export default function AdminPage() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState<Section>('about');
    const [editing, setEditing] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Verificar autenticación
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
            return;
        }

        fetchData();
    }, [router]);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/login');
    };

    const updateData = async (section: string, updatedData: any, files?: FormData) => {
        const token = localStorage.getItem('authToken');

        try {
            let formData = new FormData();

            // Agregar datos JSON
            const sectionMap: { [key: string]: string } = {
                'skill': 'skills',
                'cert': 'certifications',
            };

            const actualSectionName = sectionMap[section] || section;
            formData.append('data', JSON.stringify({ [actualSectionName]: updatedData }));

            // Agregar archivos si existen
            if (files) {
                for (const [key, value] of files.entries()) {
                    formData.append(key, value);
                }
            }

            const response = await fetch(`/api/upload-${section}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                setSuccess(`Sección ${section} actualizada correctamente`);
                fetchData();
                setEditing(null);
                setTimeout(() => setSuccess(''), 3000);
            } else {
                throw new Error('Error al actualizar');
            }
        } catch (error) {
            setError(`Error al actualizar ${section}`);
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleRevalidate = async () => {
        try {
            const response = await fetch('/api/revalidate', { method: 'POST' })
            const result = await response.json()
            if (result.revalidated) {
                alert('¡Datos actualizados!')
            }
        } catch (error) {
            alert('Error al actualizar')
        }
    }

    const sections = [
        { id: 'about', name: 'Acerca de', icon: User },
        { id: 'skills', name: 'Habilidades', icon: Code },
        { id: 'certifications', name: 'Certificaciones', icon: Award },
        { id: 'projects', name: 'Proyectos', icon: FolderOpen },
        { id: 'contact', name: 'Contacto', icon: Mail },
        { id: 'footer', name: 'Footer', icon: Hash },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando datos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Panel de Administración
                        </h1>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleRevalidate}
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <RefreshCw className="w-4 h-4" />
                                <span>Revalidar datos</span>
                            </button>
                            <button
                                onClick={() => window.open('/', '_blank')}
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                                <Eye className="w-4 h-4" />
                                <span>Ver sitio</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-800"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Salir</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Notificaciones */}
                {error && (
                    <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
                        {success}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64">
                        <nav className="space-y-2">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id as Section)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${activeSection === section.id
                                            ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{section.name}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                    {sections.find(s => s.id === activeSection)?.name}
                                </h2>
                            </div>

                            <div className="p-6">
                                {/* About Section */}
                                {activeSection === 'about' && data?.about && (
                                    <AboutSection
                                        data={data.about}
                                        onUpdate={(updatedData, files) => updateData('about', updatedData, files)}
                                    />
                                )}

                                {/* Skills Section */}
                                {activeSection === 'skills' && data?.skills && (
                                    <SkillsSection
                                        data={data.skills}
                                        onUpdate={(updatedData, files) => updateData('skill', updatedData, files)}
                                    />
                                )}

                                {/* Certifications Section */}
                                {activeSection === 'certifications' && data?.certifications && (
                                    <CertificationsSection
                                        data={data.certifications}
                                        onUpdate={(updatedData, files) => updateData('cert', updatedData, files)}
                                    />
                                )}

                                {/* Projects Section */}
                                {activeSection === 'projects' && data?.projects && (
                                    <ProjectsSection
                                        data={data.projects}
                                        onUpdate={(updatedData, files) => updateData('projects', updatedData, files)}
                                    />
                                )}

                                {/* Contact Section */}
                                {activeSection === 'contact' && data?.contact && (
                                    <ContactSection
                                        data={data.contact}
                                        onUpdate={(updatedData, files) => updateData('contact', updatedData, files)}
                                    />
                                )}

                                {/* Footer Section */}
                                {activeSection === 'footer' && data?.footer && (
                                    <FooterSection
                                        data={data.footer}
                                        onUpdate={(updatedData) => updateData('footer', updatedData)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Componentes de sección individuales
function AboutSection({ data, onUpdate }: { data: AboutData; onUpdate: (data: AboutData, files?: FormData) => void }) {
    const [formData, setFormData] = useState(data);
    const [files, setFiles] = useState<{ [key: string]: File }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formDataObj = new FormData();

        if (files.imageUrl) formDataObj.append('imageUrl', files.imageUrl);
        if (files.CVpdf) formDataObj.append('CVpdf', files.CVpdf);

        onUpdate(formData, formDataObj);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Imagen de Perfil
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setFiles({ ...files, imageUrl: file });
                        }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
                {data.imageUrl && (
                    <div className="mt-2">
                        <img src={data.imageUrl} alt="Perfil actual" className="w-20 h-20 rounded-full object-cover" />
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CV PDF
                </label>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setFiles({ ...files, CVpdf: file });
                        }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
                {data.CVpdf && (
                    <div className="mt-2">
                        <a href={data.CVpdf} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                            Ver CV actual
                        </a>
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
                Actualizar Información
            </button>
        </form>
    );
}

function SkillsSection({ data, onUpdate }: { data: SkillsData; onUpdate: (data: SkillsData, files?: FormData) => void }) {

    const [formData, setFormData] = useState<SkillsData>({
        ...data,
        cards: data.cards.map(card => {
            let parsedContent = card.content;
            try {
                // Si content es un string JSON, parsearlo para extraer la descripción
                const contentObj = JSON.parse(card.content);
                parsedContent = contentObj.description || card.content;
            } catch (e) {
                // Si no es JSON válido, usar el contenido tal como está
                parsedContent = card.content;
            }
            return {
                ...card,
                content: parsedContent
            };
        })
    });

    const [files, setFiles] = useState<{ [key: string]: File }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formDataObj = new FormData();

        // Agregar archivos de imágenes para cada card
        formData.cards.forEach((card) => {
            if (files[`src-${card.title}`]) {
                formDataObj.append(`src-${card.title}`, files[`src-${card.title}`]);
            }
        });

        onUpdate(formData, formDataObj);
    };

    const addCard = () => {
        setFormData({
            ...formData,
            cards: [...formData.cards, { title: '', src: '', content: '' }]
        });
    };

    const removeCard = (index: number) => {
        setFormData({
            ...formData,
            cards: formData.cards.filter((_, i) => i !== index)
        });
    };

    const updateCard = (index: number, field: keyof Card, value: string) => {
        const updatedCards = formData.cards.map((card, i) => {
            if (i === index) {
                if (field === 'content') {
                    // Si el content actual es un objeto, extraer la descripción
                    const currentContent = typeof card.content === 'object' && card.content !== null
                        ? (card.content as any).description || ''
                        : card.content;
                    return { ...card, [field]: value };
                }
                return { ...card, [field]: value };
            }
            return card;
        });
        setFormData({ ...formData, cards: updatedCards });
    };

    const addWord = () => {
        setFormData({
            ...formData,
            words: [...formData.words, '']
        });
    };

    const removeWord = (index: number) => {
        setFormData({
            ...formData,
            words: formData.words.filter((_, i) => i !== index)
        });
    };

    const updateWord = (index: number, value: string) => {
        const updatedWords = formData.words.map((word, i) =>
            i === index ? value : word
        );
        setFormData({ ...formData, words: updatedWords });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cards */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tarjetas de Habilidades</h3>
                </div>

                {formData.cards.map((card, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium text-gray-900 dark:text-white">Tarjeta {index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removeCard(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={card.title}
                                    onChange={(e) => updateCard(index, 'title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Imagen
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setFiles({ ...files, [`src-${card.title}`]: file });
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                />
                                {card.src && (
                                    <div className="mt-2">
                                        <img src={card.src} alt={`Imagen de ${card.title}`} className="w-16 h-16 object-cover rounded" />
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    value={card.content}
                                    onChange={(e) => updateCard(index, 'content', e.target.value)}
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addCard}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                </button>
            </div>

            {/* Words */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Palabras Clave</h3>
                </div>

                <div className="space-y-2">
                    {formData.words.map((word, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={word}
                                onChange={(e) => updateWord(index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Palabra clave"
                            />
                            <button
                                type="button"
                                onClick={() => removeWord(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addWord}
                    className="mt-2 flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                </button>
            </div>

            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
                Actualizar Habilidades
            </button>
        </form>
    );
}

function CertificationsSection({ data, onUpdate }: { data: CertificationsData; onUpdate: (data: CertificationsData, files?: FormData) => void }) {
    const [formData, setFormData] = useState(data);
    const [files, setFiles] = useState<{ [key: string]: File }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formDataObj = new FormData();

        // Agregar archivos de imágenes para cada certificación
        formData.certifications.forEach((cert) => {
            if (files[`imageUrl-${cert.title}`]) {
                formDataObj.append(`imageUrl-${cert.title}`, files[`imageUrl-${cert.title}`]);
            }
        });

        onUpdate(formData, formDataObj);
    };

    const addCertification = () => {
        setFormData({
            ...formData,
            certifications: [...formData.certifications, { title: '', date: '', description: '', link: '', imageUrl: '' }]
        });
    };

    const removeCertification = (index: number) => {
        setFormData({
            ...formData,
            certifications: formData.certifications.filter((_, i) => i !== index)
        });
    };

    const updateCertification = (index: number, field: keyof Certification, value: string) => {
        const updatedCerts = formData.certifications.map((cert, i) => {
            if (i === index) {
                // Si el campo es 'link' y el valor es la cadena "null", mantenerlo como string
                const updatedValue = (field === 'link' && value === 'null') ? 'null' : value;
                return { ...cert, [field]: updatedValue };
            }
            return cert;
        });
        setFormData({ ...formData, certifications: updatedCerts });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Certificaciones</h3>
                <button
                    type="button"
                    onClick={addCertification}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                </button>
            </div>

            {formData.certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white">Certificación {index + 1}</h4>
                        <button
                            type="button"
                            onClick={() => removeCertification(index)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Título
                            </label>
                            <input
                                type="text"
                                value={cert.title}
                                onChange={(e) => updateCertification(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Fecha
                            </label>
                            <input
                                type="text"
                                value={cert.date}
                                onChange={(e) => updateCertification(index, 'date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Ej: Junio 2024 - Diciembre 2024"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Enlace
                            </label>
                            <input
                                type="text"
                                value={cert.link}
                                onChange={(e) => updateCertification(index, 'link', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Imagen
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFiles({ ...files, [`imageUrl-${cert.title}`]: file });
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Descripción
                            </label>
                            <textarea
                                value={cert.description}
                                onChange={(e) => updateCertification(index, 'description', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
                Actualizar Certificaciones
            </button>
        </form>
    );
}

function ProjectsSection({ data, onUpdate }: { data: ProjectsData; onUpdate: (data: ProjectsData, files?: FormData) => void }) {
    const [formData, setFormData] = useState(data);
    const [files, setFiles] = useState<{ [key: string]: File }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formDataObj = new FormData();

        formData.projects.forEach((project) => {
            if (files[`header-${project.title}`]) {
                formDataObj.append(`header-${project.title}`, files[`header-${project.title}`]);
            }
        });

        onUpdate(formData, formDataObj);
    };

    const addProject = () => {
        setFormData({
            ...formData,
            projects: [...formData.projects, {
                title: '',
                date: '',
                description: '',
                header: '',
                externalLink: '',
                githubLink: ''
            }]
        });
    };

    const removeProject = (index: number) => {
        setFormData({
            ...formData,
            projects: formData.projects.filter((_, i) => i !== index)
        });
    };

    const updateProject = (index: number, field: keyof Project, value: string) => {
        const updatedProjects = formData.projects.map((project, i) =>
            i === index ? { ...project, [field]: value } : project
        );
        setFormData({ ...formData, projects: updatedProjects });
    };

    // NUEVAS FUNCIONES PARA ORDENAR
    const moveProjectUp = (index: number) => {
        if (index === 0) return; // Ya está en la primera posición

        const newProjects = [...formData.projects];
        [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];

        setFormData({ ...formData, projects: newProjects });
    };

    const moveProjectDown = (index: number) => {
        if (index === formData.projects.length - 1) return; // Ya está en la última posición

        const newProjects = [...formData.projects];
        [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];

        setFormData({ ...formData, projects: newProjects });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Proyectos</h3>
                <button
                    type="button"
                    onClick={addProject}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                </button>
            </div>

            {formData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                                Proyecto {index + 1}
                            </h4>
                            {/* CONTROLES DE ORDEN */}
                            <div className="flex items-center space-x-1">
                                <button
                                    type="button"
                                    onClick={() => moveProjectUp(index)}
                                    disabled={index === 0}
                                    className={`p-1 rounded ${index === 0
                                            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    title="Subir"
                                >
                                    <ChevronUp className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveProjectDown(index)}
                                    disabled={index === formData.projects.length - 1}
                                    className={`p-1 rounded ${index === formData.projects.length - 1
                                            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    title="Bajar"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                    Orden: {index + 1}
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeProject(index)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* El resto del formulario permanece igual */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Título
                            </label>
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => updateProject(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Fecha
                            </label>
                            <input
                                type="text"
                                value={project.date}
                                onChange={(e) => updateProject(index, 'date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Ej: Septiembre 2024 - Octubre 2024"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Enlace Externo
                            </label>
                            <input
                                type="text"
                                value={project.externalLink}
                                onChange={(e) => updateProject(index, 'externalLink', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Enlace GitHub
                            </label>
                            <input
                                type="text"
                                value={project.githubLink}
                                onChange={(e) => updateProject(index, 'githubLink', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                placeholder="https://github.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Imagen Header
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFiles({ ...files, [`header-${project.title}`]: file });
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Descripción
                            </label>
                            <textarea
                                value={project.description}
                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
                Actualizar Proyectos
            </button>
        </form>
    );
}

function ContactSection({ data, onUpdate }: { data: ContactData; onUpdate: (data: ContactData, files?: FormData) => void }) {
    const [formData, setFormData] = useState(data);
    const [files, setFiles] = useState<{ [key: string]: File }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formDataObj = new FormData();

        if (files.contactCVpdf) {
            formDataObj.append('contactCVpdf', files.contactCVpdf);
        }

        onUpdate(formData, formDataObj);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Texto GitHub
                    </label>
                    <input
                        type="text"
                        value={formData.githubtext}
                        onChange={(e) => setFormData({ ...formData, githubtext: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Enlace GitHub
                    </label>
                    <input
                        type="url"
                        value={formData.githublink}
                        onChange={(e) => setFormData({ ...formData, githublink: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Texto LinkedIn
                    </label>
                    <input
                        type="text"
                        value={formData.linkedintext}
                        onChange={(e) => setFormData({ ...formData, linkedintext: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Enlace LinkedIn
                    </label>
                    <input
                        type="url"
                        value={formData.linkedinlink}
                        onChange={(e) => setFormData({ ...formData, linkedinlink: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.emailtext}
                        onChange={(e) => setFormData({ ...formData, emailtext: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CV PDF
                    </label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setFiles({ ...files, contactCVpdf: file });
                            }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                    {data.CVpdf && (
                        <div className="mt-2">
                            <a href={data.CVpdf} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                                Ver CV actual
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
                Actualizar Contacto
            </button>
        </form>
    );
}

function FooterSection({ data, onUpdate }: { data: FooterData; onUpdate: (data: FooterData) => void }) {
    const [formData, setFormData] = useState(data);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const addWord = () => {
        setFormData({
            ...formData,
            words: [...formData.words, '']
        });
    };

    const removeWord = (index: number) => {
        setFormData({
            ...formData,
            words: formData.words.filter((_, i) => i !== index)
        });
    };

    const updateWord = (index: number, value: string) => {
        const updatedWords = formData.words.map((word, i) =>
            i === index ? value : word
        );
        setFormData({ ...formData, words: updatedWords });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Palabras del Footer</h3>
                <button
                    type="button"
                    onClick={addWord}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                </button>
            </div>

            <div className="space-y-2">
                {formData.words.map((word, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={word}
                            onChange={(e) => updateWord(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Palabra para el footer"
                        />
                        <button
                            type="button"
                            onClick={() => removeWord(index)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
                Actualizar Footer
            </button>
        </form>
    );
}