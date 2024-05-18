
function TimeUnit({ type, value, onChange }) {
    const handleChange = (event) => {
      const { name, value } = event.target;
      onChange(type, name, value);
    };
  
    return (
      <div className="form-pin">
        <input
          type="number"
          name="hours"
          min="0"
          max="23"
          value={value.hours}
          onChange={handleChange}
        />
        :
        <input
          type="number"
          name="minutes"
          min="0"
          max="59"
          value={value.minutes}
          onChange={handleChange}
        />
        :
        <input
          type="number"
          name="seconds"
          min="0"
          max="59"
          value={value.seconds}
          onChange={handleChange}
        />
      </div>
    );
  }

  export default TimeUnit
