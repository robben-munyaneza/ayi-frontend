import React, { useRef } from 'react';
import { FaUpload, FaTrash } from 'react-icons/fa';

const MAX_SIZE_MB = 2;

const ImageUploader = ({ value, onChange, label = 'Photo', className = '' }) => {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Image must be smaller than ${MAX_SIZE_MB}MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="flex items-start gap-4">
        {/* Preview */}
        <div
          className="w-24 h-24 rounded-xl border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:border-indigo-500/50 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          {value ? (
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <FaUpload className="text-gray-600 text-xl" />
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 justify-center">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
          >
            <FaUpload className="text-xs" />
            {value ? 'Change Image' : 'Upload Image'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="flex items-center gap-2 text-sm px-4 py-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
            >
              <FaTrash className="text-xs" />
              Remove
            </button>
          )}
          <p className="text-xs text-gray-600">Max {MAX_SIZE_MB}MB · JPG, PNG, WebP</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};

export default ImageUploader;
