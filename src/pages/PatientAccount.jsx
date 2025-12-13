import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CANADIAN_PROVINCES = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT',
  'NU', 'ON', 'PE', 'QC', 'SK', 'YT',
];

export default function PatientAccount() {
    const patient = useSelector((state) => state.auth.patient);
    const token = useSelector((state) => state.auth.token);

    const [form, setForm] = useState({
        dob: '',
        healthCardNumber: '',
        sexAtBirth: '',
        gender: '',
        phonePrimary: '',
        phoneSecondary: '',
        streetAddress: '',
        city: '',
        province: '',
        postalCode: '',
    });

  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (patient) {
      setForm({
        dob: patient.dob || '',
        healthCardNumber: patient.healthCardNumber || '',
        sexAtBirth: patient.sexAtBirth || '',
        gender: patient.gender || '',
        phonePrimary: patient.phonePrimary || '',
        phoneSecondary: patient.phoneSecondary || '',
        streetAddress: patient.streetAddress || '',
        city: patient.city || '',
        province: patient.province || '',
        postalCode: patient.postalCode || '',
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateRequired = () => {
    const requiredFields = [
      'dob',
      'healthCardNumber',
      'sexAtBirth',
      'phonePrimary',
      'streetAddress',
      'city',
      'province',
      'postalCode',
    ];
    return requiredFields.every((f) => form[f]);
  };

  const handleSave = async () => {
    setError('');

    if (!validateRequired()) {
        setError('Please complete all required fields to finish account setup.');
        return;
    }

    try {
        await axios.put(`/patients/${patient.id}/account`, form, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        });

        console.log('Account updated:', form);
        setStatus('Account updated successfully!');
        setEditing(false);
    } catch (err) {
        console.error('Failed to update account:', err);
        // Show either backend message or generic error
        if (err.response?.data?.message) {
        setError(err.response.data.message);
        } else {
        setError('Failed to update account. Please try again.');
        }
    }
    };

  if (!patient) return null;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-sm border rounded-lg">
      <div className="p-6 flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Patient Account
          </h1>
          <p className="text-sm text-gray-500">
            Complete your account details to access all services
          </p>
        </header>

        {/* REQUIRED KEY */}
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-red-700 font-medium">
            Required
          </span>
          <span className="text-gray-600">
            Required to complete account setup
          </span>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic information">
          <ReadOnlyField label="First name" value={patient.firstName} />
          <ReadOnlyField label="Last name" value={patient.lastName} />
          <ReadOnlyField label="Email" value={patient.email} />
        </Section>

        {/* DEMOGRAPHICS */}
        <Section title="Demographics">
          <EditableField
            label="Date of birth"
            name="dob"
            type="date"
            required
            editing={editing}
            value={form.dob}
            onChange={handleChange}
          />

          <EditableField
            label="Health card number"
            name="healthCardNumber"
            required
            editing={editing}
            value={form.healthCardNumber}
            onChange={handleChange}
          />

          <EditableSelectField
            label="Sex at birth"
            name="sexAtBirth"
            required
            editing={editing}
            value={form.sexAtBirth}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select' },
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />

          <EditableSelectField
            label="Gender"
            name="gender"
            editing={editing}
            value={form.gender}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select' },
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </Section>

        {/* CONTACT */}
        <Section title="Contact information">
          <EditableField
            label="Primary phone"
            name="phonePrimary"
            required
            editing={editing}
            value={form.phonePrimary}
            onChange={handleChange}
          />

          <EditableField
            label="Secondary phone"
            name="phoneSecondary"
            editing={editing}
            value={form.phoneSecondary}
            onChange={handleChange}
          />
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <EditableField
            label="Street address / PO box"
            name="streetAddress"
            required
            editing={editing}
            value={form.streetAddress}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EditableField
              label="City"
              name="city"
              required
              editing={editing}
              value={form.city}
              onChange={handleChange}
            />

            <EditableSelectField
              label="Province"
              name="province"
              required
              editing={editing}
              value={form.province}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select' },
                ...CANADIAN_PROVINCES.map((p) => ({
                  value: p,
                  label: p,
                })),
              ]}
            />

            <EditableField
              label="Postal code"
              name="postalCode"
              required
              editing={editing}
              value={form.postalCode}
              onChange={handleChange}
            />
          </div>
        </Section>

        {error && (
          <div className="rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Edit information
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditing(false)}
                className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <div className="flex gap-4">
      <span className="w-48 text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm text-gray-900">{value || '—'}</span>
    </div>
  );
}

function EditableField({
  label,
  name,
  value,
  editing,
  onChange,
  required = false,
  type = 'text',
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && (
          <span className="ml-2 inline-flex items-center rounded bg-red-100 px-1.5 text-xs text-red-700">
            Required
          </span>
        )}
      </label>

      {editing ? (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      ) : (
        <div className="text-sm text-gray-900">{value || '—'}</div>
      )}
    </div>
  );
}

function EditableSelectField({
  label,
  name,
  value,
  editing,
  onChange,
  options,
  required = false,
}) {
  const displayLabel =
    options.find((o) => o.value === value)?.label || '—';

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && (
          <span className="ml-2 inline-flex items-center rounded bg-red-100 px-1.5 text-xs text-red-700">
            Required
          </span>
        )}
      </label>

      {editing ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="rounded-md border px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="text-sm text-gray-900">{displayLabel}</div>
      )}
    </div>
  );
}
