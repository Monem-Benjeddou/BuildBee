import React, { useState, useEffect } from 'react';
import '../styles/programs.css';
import '../styles/layout.css';
import programsData from '../data/programs.json';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import CloseIcon from '@mui/icons-material/Close';

const Programs = () => {
  const [programs, setPrograms] = useState(programsData.programs);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
    students: 0,
    groups: 0
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
      groups: 0
    });
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
                <img src={program.image} alt={program.name} className="program-image" />
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
                  <h2 className="modal-title">Add New Program</h2>
                  <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                    <CloseIcon />
                  </button>
                </div>
                <form className="modal-form" onSubmit={handleAddProgram}>
                  <div className="form-group">
                    <label className="form-label">Program Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newProgram.name}
                      onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={newProgram.category}
                      onChange={(e) => setNewProgram({...newProgram, category: e.target.value})}
                      required
                    >
                      <option value="">Select category</option>
                      {programsData.categories.filter(cat => cat !== 'All').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input"
                      value={newProgram.description}
                      onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={newProgram.image}
                      onChange={(e) => setNewProgram({...newProgram, image: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Students</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newProgram.students}
                      onChange={(e) => setNewProgram({...newProgram, students: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Groups</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newProgram.groups}
                      onChange={(e) => setNewProgram({...newProgram, groups: e.target.value})}
                      required
                    />
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="modal-cancel" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="modal-submit">
                      Add Program
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;
