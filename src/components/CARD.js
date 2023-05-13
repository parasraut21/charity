
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './CARD.css'

function CARD() {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [results, setResults] = useState([]);
  const [donationAmount, setDonationAmount] = useState(0);
  const [donationProject, setDonationProject] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);
const DONOREmail = localStorage.getItem('userEmail')
  useEffect(() => {
    fetch('http://localhost:5000/getresults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.log(error));
  }, []);

  const handleDonationSubmit = event => {
    event.preventDefault();
    const NGOEmail = localStorage.getItem('guideEmail');
  const donationData = { NGOEmail, DONOREmail:DONOREmail,projectname: donationProject, Donation: donationAmount };

  fetch('http://localhost:5000/donation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donationData),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setDonationAmount(0); // Clear the donation amount after successful submission
      setShowDonationForm(false); // Hide the donation form
   
    })
    .catch(error => console.log(error));
    alert('Donated Successfully')
};

  

  return (
    <>
      <Navbar />
      <div
          className="container-fluid"
          style={{
            backgroundImage:'url(ngo.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
            width: '100vw',
            position: 'relative',
            marginTop: '0px',
          }}
        >
      <div className="container">
        <div className="row">
          {results.map(result => (
            <div key={result.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{color:'black'}}>{result.projectname}</h5>
                  <p className="card-text" style={{color:'black'}}>{result.status}</p>
                  <p className="card-text" style={{color:'black'}}>{result.NGOEmail}</p>
                  <p className="card-text" style={{color:'black'}}>{result.createdAt}</p>
                  {!showDonationForm && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setShowDonationForm(true);
                        setSelectedCardId(result.id);
                        setDonationProject(result.projectname); // Set the donation project when the button is clicked
                      }}
                    >
                      Add Donation
                    </button>
                  )}
                  {showDonationForm && selectedCardId === result.id && (
                    <form onSubmit={handleDonationSubmit}>
                      <div className="form-group">
                        <label htmlFor="donationAmount">Donation Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          id="donationAmount"
                          value={donationAmount}
                          onChange={event => setDonationAmount(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="donationProject">Project Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="donationProject"
                          value={donationProject}
                          readOnly
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Donate
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default CARD;


