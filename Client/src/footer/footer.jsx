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
                          href="https://github.com/ShreyasChavan1"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          <i class="fa-brands fa-github"></i>
                          <span style={{ paddingLeft: '5px' }}>GitHub</span>
                      </a>
                      <a
                          style={{
                              display: 'flex',
                              alignItems: 'center',
                              textDecoration: 'none',
                              color: '#afafaf',
                          }}
                          href="https://wikipedia.org/wiki/Sorting_algorithm"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          <i class="fa-brands fa-wikipedia-w"></i>
                          <span style={{ paddingLeft: '5px' }}>Wikipedia</span>
                      </a>
                  </div>
        </div>
        <div className="credits">
            <span>Want to create websites with me? checkout <a href="https://www.google.co.in/search?q=sorting+visualizer" target='_blank'>google</a>!</span>
        </div>
    </div>
   </>
  )
}

export default Footer