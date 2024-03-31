function InputLogo({ onChange }) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={onChange ? (e) => onChange(e.target.files[0]) : null}
    />
  );
}

export default InputLogo;
