import type { FC } from "react";
import { v4 } from "uuid";
import type { IUser } from "../../pages/Users/Users";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaBuilding,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "./UserCard.css";

interface UserCardProps {
  user: IUser;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4" key={v4()}>
      <Card className="user-card h-100 shadow-lg">
        {/* Заголовок карточки с аватаром */}
        <Card.Header className="user-card-header">
          <div className="d-flex align-items-center">
            <div className="user-avatar me-3">
              <FaUser className="avatar-icon" />
            </div>
            <div className="flex-grow-1">
              <h5 className="user-name mb-1">{user.name}</h5>
              <Badge bg="secondary" className="username-badge">
                @{user.username}
              </Badge>
            </div>
            <Badge className="user-id position-absolute top-0 end-0 bg-secondary">
              #{user.id}
            </Badge>
          </div>
        </Card.Header>

        {/* Основное содержимое */}
        <Card.Body className="user-card-body">
          {/* Контактная информация */}
          <div className="contact-section mb-3">
            <div className="contact-item">
              <FaEnvelope className="contact-icon text-primary" />
              <span className="contact-text">{user.email}</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon text-success" />
              <span className="contact-text">{user.phone}</span>
            </div>
            <div className="contact-item">
              <FaGlobe className="contact-icon text-info" />
              <span className="contact-text">{user.website}</span>
            </div>
          </div>

          {/* Адрес */}
          <div className="address-section mb-3">
            <div className="section-title">
              <FaMapMarkerAlt className="me-2 text-warning" />
              <span>Адрес</span>
            </div>
            <p className="address-text small mb-0">
              {user.address.street}, {user.address.suite}
              <br />
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>

          {/* Компания */}
          <div className="company-section">
            <div className="section-title">
              <FaBuilding className="me-2 text-secondary" />
              <span>Компания</span>
            </div>
            <p className="company-text small mb-0">{user.company.name}</p>
          </div>
        </Card.Body>

        {/* Футер с кнопкой */}
        <Card.Footer className="user-card-footer">
          <Link
            to={`/users/${user.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            <FaExternalLinkAlt className="me-2" />
            Подробный профиль
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default UserCard;
