import React from 'react'
import './footer.css'
const Footer = () => {
  return (
   <>
    <div className="footeer">
        <div className="footer-container">
            <div className="footer-content">
                <span className="footer-title">
                Sort Visualizer
                </span>
                <br />
                <h6>Shreyas Chavan</h6>
                <br />
            </div>
            <div className="footer-content">
                <span className="footer-title">Contacts:</span>
                <br />
                <h6>chavanshreyas120@gmail.com</h6>
                <h6>shreyas.c@somaiya.edu</h6>
            </div>
                  <div className="footer-content">
                  <span className="footer-title">Reference:</span>
                      <a
                          style={{
                              display: 'flex',
                              alignItems: 'center',
                              textDecoration: 'none',
                              color: '#afafaf',
                          }}
                          href="https://github.com/your-profile"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          <img src="" title="GitHub" alt="GitHub" />
                          <span style={{ paddingLeft: '5px' }}>GitHub</span>
                      </a>
                      <a
                          style={{
                              display: 'flex',
                              alignItems: 'center',
                              textDecoration: 'none',
                              color: '#afafaf',
                          }}
                          href="https://wikipedia.org"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          <img src="" title="Wiki" alt="Wikipedia" />
                          <span style={{ paddingLeft: '5px' }}>Wikipedia</span>
                      </a>
                  </div>
        </div>
        <div className="credits">
            <span>Want to create websites with me? checkout <a href="www.google.com">google</a>!</span>
        </div>
    </div>
   </>
  )
}

export default Footer