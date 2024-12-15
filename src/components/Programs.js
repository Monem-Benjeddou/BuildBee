import React, { useState, useEffect } from 'react';
import '../styles/programs.css';
import '../styles/layout.css';
import programsData from '../data/programs.json';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import CloseIcon from '@mui/icons-material/Close';
import defaultImage from '../assets/image.png';
import addProgramImage from '../assets/add-program.png';

const Programs = () => {
  const [programs, setPrograms] = useState(programsData.programs);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newProgram, setNewProgram] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
    students: 0,
    groups: 0,
    duration: 0,
    durationType: 'jour'
  });

  const filteredPrograms = selectedCategory === 'All'
    ? programs
    : programs.filter(program => program.category === selectedCategory);

  const handleAddProgram = (e) => {
    e.preventDefault();
    const id = programs.length + 1;
    const program = {
      ...newProgram,
      id,
      students: parseInt(newProgram.students),
      groups: parseInt(newProgram.groups)
    };
    setPrograms([...programs, program]);
    setIsModalOpen(false);
    setNewProgram({
      name: '',
      category: '',
      description: '',
      image: '',
      students: 0,
      groups: 0,
      duration: 0,
      durationType: 'jour'
    });
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setNewProgram({...newProgram, image: file});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-layout">
      <div className="main-content">
        <div className="programs-page">
          <div className="programs-header">
            <h1 className="page-title">Gestion des programmes</h1>
            <button className="add-program-btn" onClick={() => setIsModalOpen(true)}>
              <AddIcon />
              Add Program
            </button>
          </div>

          <div className="programs-filters">
            {programsData.categories.map(category => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="programs-grid">
            {filteredPrograms.map(program => (
              <div key={program.id} className="program-card">
                <img src={defaultImage} alt={program.name} className="program-image" />
                <div className="program-content">
                  <h3 className="program-name">{program.name}</h3>
                  <p className="program-description">{program.description}</p>
                  <div className="program-stats">
                    <div className="stat-item">
                      <PersonIcon />
                      <span className="stat-value">{program.students}</span>
                      <span className="stat-label">Students</span>
                    </div>
                    <div className="stat-item">
                      <GroupsIcon />
                      <span className="stat-value">{program.groups}</span>
                      <span className="stat-label">Groups</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">Ajout d'un programme</h2>
                  <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                    <CloseIcon />
                  </button>
                </div>
                <form className="modal-form" onSubmit={handleAddProgram}>
                  <div className="form-group">
                    <div className="form-input-container input-container-image">
                      <div className="form-input-header">
                        <div className="form-input-label">Couverture</div>
                        <div className="form-input-upload">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="cover-upload"
                          />
                          <label htmlFor="cover-upload" style={{ cursor: 'pointer' }}>
                            <AddIcon />
                          </label>
                        </div>
                      </div>
                      {selectedImage && (
                        <div className="image-preview">
                          <img src={selectedImage} alt="Selected cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-input-container">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Nom de programme"
                        value={newProgram.name}
                        onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-input-container">
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Durée du programme"
                        value={newProgram.duration}
                        onChange={(e) => setNewProgram({...newProgram, duration: e.target.value})}
                        required
                      />
                      <div className="form-duration">
                        <div className="form-duration-divider"></div>
                        <select 
                          className="form-duration-select"
                          value={newProgram.durationType}
                          onChange={(e) => setNewProgram({...newProgram, durationType: e.target.value})}
                        >
                          <option value="jour">Jour</option>
                          <option value="semaine">Semaine</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="form-groups-button">
                    Associer des groupes à ce programme
                  </button>
                  <button type="submit" className="form-submit">
                    Sauvgarder
                  </button>
                </form>
                <img src={addProgramImage} alt="Add Program" className="add-program-image" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;
