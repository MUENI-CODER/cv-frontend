import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const languages = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    nav: { home: 'Home', dashboard: 'Dashboard', templates: 'Templates', createCV: 'Create CV', profile: 'Profile' },
    cvForm: { title: 'Create Your CV', chooseTemplate: 'Choose Template', cvTitle: 'CV Title', fullName: 'Full Name', email: 'Email', phone: 'Phone', summary: 'Professional Summary', experience: 'Work Experience', education: 'Education', skills: 'Skills', save: 'Save CV', cancel: 'Cancel', required: 'required' },
    dashboard: { title: 'Your CVs', noCVs: 'No CVs yet. Create your first CV!', createBtn: 'Create CV', edit: 'Edit', pdf: 'PDF', delete: 'Delete', lastUpdated: 'Last updated' }
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    nav: { home: 'Inicio', dashboard: 'Panel', templates: 'Plantillas', createCV: 'Crear CV', profile: 'Perfil' },
    cvForm: { title: 'Crea tu CV', chooseTemplate: 'Elige Plantilla', cvTitle: 'Título del CV', fullName: 'Nombre Completo', email: 'Correo', phone: 'Teléfono', summary: 'Resumen Profesional', experience: 'Experiencia Laboral', education: 'Educación', skills: 'Habilidades', save: 'Guardar CV', cancel: 'Cancelar', required: 'requerido' },
    dashboard: { title: 'Tus CVs', noCVs: '¡No hay CVs. Crea tu primer CV!', createBtn: 'Crear CV', edit: 'Editar', pdf: 'PDF', delete: 'Eliminar', lastUpdated: 'Última actualización' }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: languages[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};
