import { useState } from 'react';
import { FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';

export default function AuthField({
  name, label, icon: Icon, type = 'text', value, onChange, onBlur,
  placeholder, error, status, hint,
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <div className="field__top">
        <label htmlFor={name}>{label}</label>
        {status && <span className="field__status">{status}</span>}
      </div>

      <div className="field__control">
        {Icon && <Icon size={16} className="field__icon" />}
        <input
          id={name}
          name={name}
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={!!error}
        />
        {isPassword && (
          <button
            type="button"
            className="field__toggle"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {hint && (
        <p className="field__hint"><FiCheckCircle size={14} /> {hint}</p>
      )}
      {error && <p className="field__error">{error}</p>}
    </div>
  );
}