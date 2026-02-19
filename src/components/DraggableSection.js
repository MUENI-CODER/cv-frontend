import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function DraggableSection({ id, title, icon, enabled, onToggle, isDraggable = true }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !isDraggable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const itemStyle = {
    background: enabled ? '#ffffff' : '#f1f5f9',
    border: enabled ? '2px solid #667eea' : '2px solid #e2e8f0',
    borderLeft: enabled ? '5px solid #667eea' : '2px solid #e2e8f0',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '10px',
    cursor: isDraggable ? 'grab' : 'default',
    opacity: isDragging ? 0.5 : enabled ? 1 : 0.7,
    boxShadow: isDragging ? '0 10px 30px rgba(102, 126, 234, 0.3)' : 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  return (
    <div
      ref={setNodeRef}
      style={itemStyle}
      {...(isDraggable ? attributes : {})}
      {...(isDraggable ? listeners : {})}
    >
      {isDraggable && <span style={{ color: '#94a3b8', fontSize: '1.5em' }}>⋮⋮</span>}
      <span style={{ fontSize: '1.3em' }}>{icon}</span>
      <span style={{ flex: 1, fontWeight: 500, color: enabled ? '#333' : '#666' }}>{title}</span>
      <button
        onClick={() => onToggle(id)}
        style={{
          padding: '6px 15px',
          border: 'none',
          borderRadius: '20px',
          fontSize: '0.9em',
          fontWeight: 600,
          cursor: 'pointer',
          minWidth: '70px',
          background: enabled ? '#667eea' : '#48bb78',
          color: 'white'
        }}
      >
        {enabled ? '✓ On' : '+ Add'}
      </button>
    </div>
  );
}

export default DraggableSection;
