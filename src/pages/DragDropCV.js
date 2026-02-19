import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableSection from '../components/DraggableSection';

function DragDropCV() {
  const [sections, setSections] = useState([
    { id: 'summary', title: 'Professional Summary', icon: '📝', enabled: true },
    { id: 'experience', title: 'Work Experience', icon: '💼', enabled: true },
    { id: 'education', title: 'Education', icon: '🎓', enabled: true },
    { id: 'skills', title: 'Skills', icon: '⚡', enabled: true },
    { id: 'projects', title: 'Projects', icon: '🚀', enabled: false },
    { id: 'certifications', title: 'Certifications', icon: '📜', enabled: false },
    { id: 'languages', title: 'Languages', icon: '🗣️', enabled: false },
    { id: 'interests', title: 'Interests', icon: '🎯', enabled: false }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleSection = (id) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, enabled: !section.enabled } : section
    ));
  };

  const enabledSections = sections.filter(s => s.enabled);
  const disabledSections = sections.filter(s => !s.enabled);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '20px'
  };

  const headerStyle = {
    color: '#667eea',
    fontSize: '2.5em',
    marginBottom: '10px',
    textAlign: 'center'
  };

  const subtitleStyle = {
    textAlign: 'center',
    color: '#666',
    marginBottom: '40px',
    fontSize: '1.1em'
  };

  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    marginBottom: '30px'
  };

  const columnStyle = {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  };

  const columnTitleStyle = {
    color: '#333',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.3em'
  };

  const badgeStyle = {
    background: '#667eea',
    color: 'white',
    padding: '3px 10px',
    borderRadius: '15px',
    fontSize: '0.8em'
  };

  const noteStyle = {
    textAlign: 'center',
    color: '#666',
    padding: '20px',
    background: '#f8fafc',
    borderRadius: '10px',
    marginTop: '30px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>🎯 Customize Your CV Layout</h1>
      <p style={subtitleStyle}>Drag and drop sections to reorder. Toggle sections on/off.</p>

      <div style={layoutStyle}>
        {/* Active Sections */}
        <div style={columnStyle}>
          <h2 style={columnTitleStyle}>
            Active Sections <span style={badgeStyle}>{enabledSections.length}</span>
          </h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={enabledSections.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div>
                {enabledSections.map((section) => (
                  <DraggableSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    icon={section.icon}
                    enabled={true}
                    onToggle={toggleSection}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Available Sections */}
        <div style={columnStyle}>
          <h2 style={columnTitleStyle}>
            Available Sections <span style={badgeStyle}>{disabledSections.length}</span>
          </h2>
          <div>
            {disabledSections.map((section) => (
              <DraggableSection
                key={section.id}
                id={section.id}
                title={section.title}
                icon={section.icon}
                enabled={false}
                onToggle={toggleSection}
                isDraggable={false}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={noteStyle}>
        <p>💡 Your changes will be saved automatically when you create your CV</p>
      </div>
    </div>
  );
}

export default DragDropCV;
