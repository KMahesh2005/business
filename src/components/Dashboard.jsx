import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {user.email === 'mahesh@example.com' ? 'Mahesh' : 'Kailasam Builder'}</h2>
      <button 
        onClick={() => auth.signOut()} 
        style={{ padding: '8px', background: 'red', color: 'white' }}
      >
        Logout
      </button>
      {/* Add your 3D viewer here later */}
    </div>
  );
}

export default Dashboard;