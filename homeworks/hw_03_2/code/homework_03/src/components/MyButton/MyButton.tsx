import style from './MyButton.module.css';

interface MyButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function MyButton({ children, onClick, variant = 'primary' }: MyButtonProps) {
    return (
      <button
        className={`${style.myButton} ${style[variant]}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
}
