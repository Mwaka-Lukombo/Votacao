// src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import { Title } from '../components/Title';
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Globe, 
  Shield, 
  Save,
  Mail,
  Phone,
  MapPin,
  Building
} from 'lucide-react';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('perfil');

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: <User size={20} /> },
    { id: 'seguranca', label: 'Segurança', icon: <Lock size={20} /> },
    { id: 'notificacoes', label: 'Notificações', icon: <Bell size={20} /> },
    { id: 'aparencia', label: 'Aparência', icon: <Palette size={20} /> },
    { id: 'geral', label: 'Geral', icon: <Globe size={20} /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'perfil':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-primary-color/10 rounded-full flex items-center justify-center">
                <User size={40} className="text-primary-color" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">João da Silva</h3>
                <p className="text-gray-600">Administrador</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" value="João da Silva" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value="joao@email.com" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input type="tel" value="(11) 99999-9999" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input type="text" value="Administrador" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
                <textarea rows="4" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color">
                  Administrador do sistema de votação com 5 anos de experiência.
                </textarea>
              </div>
            </div>
          </div>
        );

      case 'seguranca':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">Para sua segurança, mantenha sua senha atualizada e ative a autenticação de dois fatores.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
                <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
                <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color" />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-4">Autenticação de Dois Fatores</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autenticação 2FA</p>
                  <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                </div>
                <button className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                  Ativar 2FA
                </button>
              </div>
            </div>
          </div>
        );

      case 'notificacoes':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Notificações por Email</h4>
                  <p className="text-sm text-gray-600">Receba notificações sobre votações e resultados</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-color/25 rounded-full peer peer-checked:bg-primary-color transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Notificações Push</h4>
                  <p className="text-sm text-gray-600">Receba notificações em tempo real no navegador</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-color/25 rounded-full peer peer-checked:bg-primary-color transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Alertas de Votação</h4>
                  <p className="text-sm text-gray-600">Seja notificado quando uma nova votação for criada</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-color/25 rounded-full peer peer-checked:bg-primary-color transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Resultados em Tempo Real</h4>
                  <p className="text-sm text-gray-600">Atualizações automáticas dos resultados</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-color/25 rounded-full peer peer-checked:bg-primary-color transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'aparencia':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Tema</h4>
              <div className="grid grid-cols-3 gap-4">
                {['Claro', 'Escuro', 'Sistema'].map((tema) => (
                  <button key={tema} className={`p-4 border rounded-lg text-center hover:border-primary-color transition-colors ${
                    tema === 'Claro' ? 'border-primary-color bg-primary-color/5' : ''
                  }`}>
                    <div className="w-full h-12 bg-gray-100 rounded mb-2"></div>
                    <span className="text-sm">{tema}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Cor Primária</h4>
              <div className="flex gap-4">
                {['#4F4665', '#6366F1', '#0668D4', '#106884'].map((cor) => (
                  <button
                    key={cor}
                    className="w-12 h-12 rounded-full border-2 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: cor }}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Configurações Gerais</div>;
    }
  };

  return (
    <div className="py-4">
      <Title text="Configurações" />

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar de Configurações */}
        <div className="md:w-64 bg-white rounded-lg shadow-md p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-color text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {renderContent()}
          
          <div className="mt-6 pt-6 border-t flex justify-end">
            <button className="flex items-center gap-2 bg-primary-color text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
              <Save size={20} />
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};