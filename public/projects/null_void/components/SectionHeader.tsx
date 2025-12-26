import React from 'react';

interface SectionHeaderProps {
  title: string;
  id?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, id }) => {
  return (
    <div id={id} className="w-full py-16 md:py-24">
      <div className="font-mono text-xs text-muted mb-2 tracking-widest">
        SECTION // {title.toUpperCase()}
      </div>
      <div className="w-full overflow-hidden whitespace-nowrap text-primary select-none opacity-50 mb-4 text-[10px]">
        {'■'.repeat(100)}
      </div>
      <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-primary border-l-4 border-primary pl-6">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
