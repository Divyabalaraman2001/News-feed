// src/Translator.js
import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    setLoading(true);
    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text-api3.p.rapidapi.com/largetranslate',
      params: {
        to: 'es',
        from: 'en'
      },
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': 'e60395275fmsh26266b3cd8b26bfp140692jsn20d4b2df6552',
        'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com'
      },
      data: {
        sep: '|',
        text: text.split('\n').join(' | ')
      }
    };

    try {
      const response = await axios.request(options);
      console.log('Translation response:', response.data);
      
      const resultText = response.data?.result || '';
      setTranslated(resultText.split(' | ').join('\n'));
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslated('Translation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">🌍 English to Spanish Translator</h1>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-3"
        rows="5"
        placeholder="Enter English phrases (one per line)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={translateText}
        disabled={loading}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>
      {translated && (
        <div className="mt-4">
          <h2 className="font-semibold mb-2">Translated (Spanish):</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded">{translated}</pre>
        </div>
      )}
    </div>
  );
};

export default Translator;
