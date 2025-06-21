import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import './App.css';
// Correct import syntax


function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 3D Model Component
  function HouseModel() {
    const { scene } = useGLTF('/house.glb');
    return <primitive object={scene} scale={1} />;
  }

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
    } catch (err) {
      setError('Invalid credentials. Use: mahesh@example.com or kailasambulider@example.com');
    }
  };

  // Handle logout
  const handleLogout = () => {
    signOut(auth);
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app-container">
      {!user ? (
        // Login Form
        <div className="login-form">
          <h2>3D House Showcase Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <div className="demo-credentials">
            <p>Demo Accounts:</p>
            <p>mahesh@example.com | password123</p>
            <p>kailasambulider@example.com | builder123</p>
          </div>
        </div>
      ) : (
        // 3D Viewer
        <div className="viewer-container">
          <div className="header">
            <h2>Welcome, {user.email.includes('mahesh') ? 'Mahesh' : 'Kailasam Builder'}</h2>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
          <div className="canvas-container">
            <Canvas camera={{ position: [5, 5, 5], fov: 25 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <HouseModel />
              <OrbitControls />
            </Canvas>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
