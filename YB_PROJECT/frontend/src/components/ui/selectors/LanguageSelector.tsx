import { memo, useState, useCallback } from 'react';
import { AiOutlineGlobal, AiOutlineCheck } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';

const LanguageSelector = memo(function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Tiếng Việt' }
  ];

  const handleLanguageSelect = useCallback((language: { code: string; name: string }) => {
    console.log('Language selected:', language);
    setSelectedLanguage(language.name);
    setShowDropdown(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [showDropdown]);

  return (
    <div className="w-72 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white mb-4">Language Selector Test</h3>
      
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full px-4 py-3 flex items-center justify-between text-gray-300 hover:bg-gray-700 transition-colors rounded border border-gray-600"
        >
          <div className="flex items-center">
            <AiOutlineGlobal className="w-4 h-4 mr-3" />
            <span>Language</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-2">{selectedLanguage}</span>
            <BiChevronDown 
              className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
            />
          </div>
        </button>

        {showDropdown && (
          <div className="absolute left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-50">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600 flex items-center justify-between transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <span>{language.name}</span>
                {selectedLanguage === language.name && (
                  <AiOutlineCheck className="w-4 h-4 text-blue-500" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-gray-400 text-sm">
        Current language: <span className="text-white">{selectedLanguage}</span>
      </div>
    </div>
  );
});

export default LanguageSelector;
