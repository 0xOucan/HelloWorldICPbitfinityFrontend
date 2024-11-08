import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [name, setName] = useState('');
  const [submittedNames, setSubmittedNames] = useState([]);

  const contractAddress = "0x4F3f6cE0f32256B7AfA859e958C3E2D7B62953Dc";
  const abi = [
    "function greet(string name) public returns (string)",
    "function getSubmittedNames() public view returns (string[] memory)"
  ];

  const handleGreet = async () => {
    if (!name) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    await contract.greet(name);
    setName('');
  };

  const fetchSubmittedNames = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const names = await contract.getSubmittedNames();
    setSubmittedNames(names);
  };

  return (
    <div>
      <h1>Hello World dApp</h1>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name" 
      />
      <button onClick={handleGreet}>Greet</button>
      <button onClick={fetchSubmittedNames}>Fetch Submitted Names</button>
      <ul>
        {submittedNames.map((n, index) => <li key={index}>{n}</li>)}
      </ul>
    </div>
  );
}

export default App;
