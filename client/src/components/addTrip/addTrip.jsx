import React, { useState } from "react";
import "./addTrip.css";

const AddTripPopup = ({ onClose, onSave }) => {
  const [tripData, setTripData] = useState({
    name: "",
    location: "",
    duration: "",
    difficulty: "Moderate",
    price: "",
    description: "",
    highlights: [""],
    images: []
  });

  const [currentHighlight, setCurrentHighlight] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({ ...prev, [name]: value }));
  };

  const handleHighlightAdd = () => {
    if (currentHighlight.trim()) {
      setTripData(prev => ({
        ...prev,
        highlights: [...prev.highlights, currentHighlight.trim()]
      }));
      setCurrentHighlight("");
    }
  };

  const handleHighlightRemove = (index) => {
    setTripData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + tripData.images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const newImages = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newImages]);
    setTripData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    const updatedImages = [...tripData.images];
    
    updatedPreviews.splice(index, 1);
    updatedImages.splice(index, 1);
    
    setImagePreviews(updatedPreviews);
    setTripData(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tripData.name || !tripData.location || !tripData.description) {
      alert("Please fill in all required fields");
      return;
    }
    onSave(tripData);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="add-trip-popup">
        <div className="popup-header">
        </div>

        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Trip Name*</label>
                <input
                  type="text"
                  name="name"
                  value={tripData.name}
                  onChange={handleChange}
                  placeholder="e.g. Himalayan Trekking Adventure"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location*</label>
                <input
                  type="text"
                  name="location"
                  value={tripData.location}
                  onChange={handleChange}
                  placeholder="e.g. Manali, Himachal Pradesh"
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={tripData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 5 Days / 4 Nights"
                />
              </div>

              <div className="form-group">
                <label>Difficulty Level</label>
                <select
                  name="difficulty"
                  value={tripData.difficulty}
                  onChange={handleChange}
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price per person</label>
                <input
                  type="text"
                  name="price"
                  value={tripData.price}
                  onChange={handleChange}
                  placeholder="e.g. ₹12,999 per person"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Trip Description*</h3>
            <div className="form-group">
              <textarea
                name="description"
                value={tripData.description}
                onChange={handleChange}
                placeholder="Describe the trip experience in detail..."
                rows="5"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Trip Highlights</h3>
            <div className="highlights-input">
              <input
                type="text"
                value={currentHighlight}
                onChange={(e) => setCurrentHighlight(e.target.value)}
                placeholder="Add a highlight (e.g. Guided trek to Hampta Pass)"
                onKeyPress={(e) => e.key === 'Enter' && handleHighlightAdd()}
              />
              <button 
                type="button" 
                className="add-highlight-btn"
                onClick={handleHighlightAdd}
              >
                <i className="fas fa-plus"></i> Add
              </button>
            </div>
            <div className="highlights-list">
              {tripData.highlights.filter(h => h).map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <span><i className="fas fa-check-circle"></i> {highlight}</span>
                  <button 
                    type="button"
                    className="remove-highlight"
                    onClick={() => handleHighlightRemove(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Trip Images (Max 5)</h3>
            <div className="image-upload-container">
              <label className="image-upload-btn">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <i className="fas fa-cloud-upload-alt"></i> Upload Images
              </label>
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index}`} />
                    <button 
                      type="button"
                      className="remove-image"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTripPopup;