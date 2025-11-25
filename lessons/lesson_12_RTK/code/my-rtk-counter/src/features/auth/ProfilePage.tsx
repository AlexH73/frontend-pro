import { type JSX } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './selectors';
import { useSelector } from 'react-redux';
import { selectTheme } from '../theme/themeSlice';
import { useNavigate } from 'react-router-dom';
import {
  AccountCircle as UserIcon,
  Email as EmailIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

export default function ProfilePage(): JSX.Element {
  const user = useAppSelector(selectUser);
  const theme = useSelector(selectTheme);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return <></>;
  }

  return (
    <div
      className={`min-h-screen py-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          className={`max-w-2xl mx-auto rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* Profile Header */}
          <div
            className={`p-8 transition-colors duration-300 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
            }`}
          >
            <div className='flex items-center space-x-6'>
              <img
                className='h-24 w-24 rounded-full border-4 border-white shadow-lg'
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <div>
                <h1
                  className={`text-3xl font-bold transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {user.firstName} {user.lastName}
                </h1>
                <p
                  className={`text-lg transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  @{user.username}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className='p-8 space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <PersonIcon
                  className={`h-6 w-6 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                <div>
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Full Name
                  </p>
                  <p
                    className={`transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <EmailIcon
                  className={`h-6 w-6 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                <div>
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Email
                  </p>
                  <p
                    className={`transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {user.email}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <UserIcon
                  className={`h-6 w-6 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                <div>
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Gender
                  </p>
                  <p
                    className={`transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {user.gender}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
                  }`}
                >
                  <span
                    className={`text-xs font-bold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`}
                  >
                    ID
                  </span>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    User ID
                  </p>
                  <p
                    className={`transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {user.id}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
              }`}
            >
              <p
                className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}
              >
                <strong>Token:</strong> {user.token.substring(0, 20)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
