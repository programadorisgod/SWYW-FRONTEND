import "./Loader.css";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  message?: string;
}

export function Loader({
  size = "md",
  variant = "spinner",
  message,
}: LoaderProps) {
  return (
    <div className={`loader-container loader-${size}`}>
      {variant === "spinner" && (
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
      )}

      {variant === "dots" && (
        <div className="loader-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}

      {variant === "pulse" && (
        <div className="loader-pulse"></div>
      )}

      {message && <p className="loader-message">{message}</p>}
    </div>
  );
}

export function SpinnerOverlay({ message }: { message?: string }) {
  return (
    <div className="spinner-overlay">
      <div className="spinner-overlay-content">
        <Loader size="lg" variant="spinner" message={message} />
      </div>
    </div>
  );
}
