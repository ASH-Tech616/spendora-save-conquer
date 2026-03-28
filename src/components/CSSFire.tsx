import "./CSSFire.css";

interface CSSFireProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CSSFire = ({ size = "md", className = "" }: CSSFireProps) => {
  const sizeMap = {
    sm: "scale-[0.4]",
    md: "scale-[0.7]",
    lg: "scale-100",
  };

  return (
    <div className={`fire-wrapper ${sizeMap[size]} ${className}`}>
      <div className="fire-container">
        <div className="fire-corpus fire-diamond">
          <div className="fire-diamond fire-diamond-inner fire-diamond-right" />
          <div className="fire-diamond fire-diamond-inner fire-diamond-left" />
        </div>
      </div>
    </div>
  );
};

export default CSSFire;
