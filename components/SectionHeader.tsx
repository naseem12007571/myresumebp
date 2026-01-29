
import React from 'react';

interface SectionHeaderProps {
  title: string;
  color: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, color }) => (
  <div className="mb-4">
    <h2 className="text-lg font-bold uppercase tracking-wide border-b-2 pb-1" style={{ color: color, borderColor: color }}>
      {title}
    </h2>
  </div>
);
