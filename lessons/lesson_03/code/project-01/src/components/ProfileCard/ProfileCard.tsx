// rfc
import s from "./PrifileCard.module.css";

interface ProfileCardProps {
  avatar?: string;
  name: string;
  description: string;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { avatar, name, description } = props;
  // fallback
  const fallbackUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s";
  return (
    <div className={s.container}>
      <h2 className={s.name}>{name}</h2>
      <img src={avatar || fallbackUrl} alt={"User avatar:" + name} />
      <p className={s.userDescription}>{description}</p>
    </div>
  );
}
