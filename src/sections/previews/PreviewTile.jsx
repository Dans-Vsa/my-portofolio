const PreviewTile = (props) => {
  const Icon = props.icon;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-4 text-center pointer-events-none select-none">
      <Icon size={20} className="text-primary" />
      <div className="text-sm font-medium text-text">{props.title}</div>
      <div className="text-xs text-text-secondary leading-snug">{props.subtitle}</div>
    </div>
  );
};

export default PreviewTile;
