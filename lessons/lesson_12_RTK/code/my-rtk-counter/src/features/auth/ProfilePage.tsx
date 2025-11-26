// features/auth/ProfilePage.tsx
import { type JSX, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser, selectIsAuthenticated } from './selectors';
import { useSelector } from 'react-redux';
import { selectTheme } from '../theme/themeSlice';
import { useNavigate } from 'react-router-dom';
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Security as TokenIcon,
  CalendarToday as JoinIcon,
  Badge as UsernameIcon,
  Female as FemaleIcon,
  Male as MaleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAppDispatch } from '../../app/hooks';
import { logout } from './authSlice';

export default function ProfilePage(): JSX.Element {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const theme = useSelector(selectTheme);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Show loading or nothing while redirecting
  if (!isAuthenticated || !user) {
    return <div></div>;
  }

  const getGenderIcon = () => {
    switch (user.gender?.toLowerCase()) {
      case 'male':
        return <MaleIcon className='w-5 h-5' />;
      case 'female':
        return <FemaleIcon className='w-5 h-5' />;
      default:
        return <PersonIcon className='w-5 h-5' />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
      }`}
    >
      <div className='container mx-auto px-4 py-8'>
        {/* Profile Header with Background */}
        <div
          className={`relative rounded-3xl shadow-2xl overflow-hidden mb-8 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-gray-800 to-gray-700'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
          }`}
        >
          <div className='absolute inset-0 bg-black bg-opacity-20'></div>
          <div className='relative p-8 md:p-12'>
            <div className='flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8'>
              {/* Avatar */}
              <div className='relative'>
                <div className='absolute -inset-2 bg-white bg-opacity-20 rounded-full blur'></div>
                <img
                  className='relative h-32 w-32 rounded-full border-4 border-white shadow-2xl'
                  src={user.image || '/default-avatar.png'}
                  alt={`${user.firstName} ${user.lastName}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/128?text=User';
                  }}
                />
              </div>

              {/* User Info */}
              <div className='text-center md:text-left flex-1'>
                <h1
                  className={`text-4xl md:text-5xl font-bold mb-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-white'
                  }`}
                >
                  {user.firstName} {user.lastName}
                </h1>
                <p
                  className={`text-xl mb-4 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-blue-200' : 'text-blue-100'
                  }`}
                >
                  @{user.username}
                </p>
                <div className='flex flex-wrap justify-center md:justify-start gap-4'>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'bg-blue-900 bg-opacity-50 text-blue-200'
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    <EmailIcon className='w-4 h-4 mr-1' />
                    {user.email}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'bg-green-900 bg-opacity-50 text-green-200'
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    {getGenderIcon()}
                    <span className='ml-1 capitalize'>{user.gender}</span>
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-white text-red-600 hover:bg-red-50'
                } shadow-lg`}
              >
                <LogoutIcon className='w-5 h-5' />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
          {/* Personal Information Card */}
          <div
            className={`lg:col-span-2 rounded-3xl shadow-xl p-8 transition-colors duration-300 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-6 pb-4 border-b transition-colors duration-300 ${
                theme === 'dark'
                  ? 'text-white border-gray-700'
                  : 'text-gray-900 border-gray-200'
              }`}
            >
              Personal Information
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div
                className={`p-6 rounded-2xl transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
                }`}
              >
                <div className='flex items-center space-x-3 mb-3'>
                  <div
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
                    }`}
                  >
                    <PersonIcon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    />
                  </div>
                  <h3
                    className={`font-semibold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Full Name
                  </h3>
                </div>
                <p
                  className={`text-lg font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {user.firstName} {user.lastName}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'
                }`}
              >
                <div className='flex items-center space-x-3 mb-3'>
                  <div
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
                    }`}
                  >
                    <UsernameIcon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}
                    />
                  </div>
                  <h3
                    className={`font-semibold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Username
                  </h3>
                </div>
                <p
                  className={`text-lg font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  @{user.username}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'
                }`}
              >
                <div className='flex items-center space-x-3 mb-3'>
                  <div
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'
                    }`}
                  >
                    <EmailIcon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                      }`}
                    />
                  </div>
                  <h3
                    className={`font-semibold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Email Address
                  </h3>
                </div>
                <p
                  className={`text-lg font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {user.email}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-pink-50'
                }`}
              >
                <div className='flex items-center space-x-3 mb-3'>
                  <div
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-pink-900' : 'bg-pink-100'
                    }`}
                  >
                    {getGenderIcon()}
                  </div>
                  <h3
                    className={`font-semibold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Gender
                  </h3>
                </div>
                <p
                  className={`text-lg font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <span className='capitalize'>{user.gender}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className='space-y-8'>
            {/* User ID Card */}
            <div
              className={`rounded-3xl shadow-xl p-6 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='flex items-center space-x-3 mb-4'>
                <div
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-100'
                  }`}
                >
                  <JoinIcon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                    }`}
                  />
                </div>
                <h3
                  className={`font-semibold transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  User ID
                </h3>
              </div>
              <div
                className={`text-center py-4 px-6 rounded-xl transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                <span
                  className={`text-3xl font-bold transition-colors duration-300 ${
                    theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  }`}
                >
                  #{user.id}
                </span>
              </div>
            </div>

            {/* Security Card */}
            <div
              className={`rounded-3xl shadow-xl p-6 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='flex items-center space-x-3 mb-4'>
                <div
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    theme === 'dark' ? 'bg-yellow-900' : 'bg-yellow-100'
                  }`}
                >
                  <TokenIcon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                    }`}
                  />
                </div>
                <h3
                  className={`font-semibold transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Access Token
                </h3>
              </div>
              {user.accessToken ? (
                <div
                  className={`p-4 rounded-xl transition-colors duration-300 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-50'
                  }`}
                >
                  <p
                    className={`text-sm font-mono break-all transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {user.accessToken.substring(0, 25)}...
                  </p>
                  <p
                    className={`text-xs mt-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Token is securely stored
                  </p>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-xl text-center transition-colors duration-300 ${
                    theme === 'dark' ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'
                  }`}
                >
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      theme === 'dark' ? 'text-red-300' : 'text-red-600'
                    }`}
                  >
                    No token available
                  </p>
                </div>
              )}
            </div>

            {/* Quick Stats Card */}
            <div
              className={`rounded-3xl shadow-xl p-6 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h3
                className={`font-semibold mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Account Status
              </h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span
                    className={`transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Member Since
                  </span>
                  <span
                    className={`font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`}
                  >
                    Active
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span
                    className={`transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Profile Complete
                  </span>
                  <span
                    className={`font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    100%
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span
                    className={`transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Verification
                  </span>
                  <span
                    className={`font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-600'
                    }`}
                  >
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div
          className={`rounded-3xl shadow-xl p-8 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Quick Actions
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <button
              className={`p-4 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-blue-900 bg-opacity-50 hover:bg-blue-800 text-blue-200'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
              }`}
            >
              Edit Profile
            </button>
            <button
              className={`p-4 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-green-900 bg-opacity-50 hover:bg-green-800 text-green-200'
                  : 'bg-green-100 hover:bg-green-200 text-green-700'
              }`}
            >
              Settings
            </button>
            <button
              className={`p-4 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-purple-900 bg-opacity-50 hover:bg-purple-800 text-purple-200'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
              }`}
            >
              Preferences
            </button>
            <button
              className={`p-4 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-orange-900 bg-opacity-50 hover:bg-orange-800 text-orange-200'
                  : 'bg-orange-100 hover:bg-orange-200 text-orange-700'
              }`}
            >
              Help & Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
