const Footer = () => {
    return (
      <div>
        <div className="mt-5">
          <footer className="text-center text-lg text-white bg-dark-300">
            <section className="flex justify-between p-4 bg-dark-500">
              <div className="mr-5">
                <span>Get connected with us on social networks:</span>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-white">
                  <img src="/assets/icons/github.svg" alt="github" height={40} width={40}/>
                </a>
                <a href="#" className="text-white">
                <img src="/assets/icons/instagram.svg" alt="github" height={40} width={40}/>
                </a>
                <a href="#" className="text-white">
                <img src="/assets/icons/linkedin.svg" className="invert" alt="github" height={40} width={40}/>
                </a>
                <a href="#" className="text-white">
                <img src="/assets/icons/twitter.svg" alt="github" height={40} width={40}/>
                </a>
                
              </div>
            </section>
            <section>
              <div className="container mx-auto text-center md:text-left mt-5 bg-dark-300">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-3">
                  <div>
                    <h6 className="text-uppercase font-bold">Career Bridge</h6>
                    <hr className="w-16 background-light900_dark200 h-1 my-4 mx-auto md:mx-0" />
                    <p>
                    Career Bridge is a professional platform designed to connect job seekers and employers. It features a user-friendly interface for browsing job opportunities, exploring companies, and managing applications. 
                    </p>
                  </div>
                  <div>
                    <h6 className="text-uppercase font-bold">More Products from Us</h6>
                    <hr className="w-16 background-light900_dark200 h-1 my-4 mx-auto md:mx-0" />
                    <p>
                      <a href="#!" className="text-white">
                        Portfolio
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white">
                        DevOverflow
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white">
                        Spotify Clone
                      </a>
                    </p>
                  </div>
                  <div>
                    <h6 className="text-uppercase font-bold">Useful links</h6>
                    <hr className="w-16 bg-purple-600 h-1 my-4 mx-auto md:mx-0" />
                    <p>
                      <a href="#!" className="text-white">
                        Your Account
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white">
                        Browse Jobs
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white">
                        Sign in as a recruiter...
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-white">
                        Help
                      </a>
                    </p>
                  </div>
                  <div>
                    <h6 className="text-uppercase font-bold">Contact</h6>
                    <hr className="w-16 bg-purple-600 h-1 my-4 mx-auto md:mx-0" />
                    <p>
                      <i className="fas fa-home mr-2 text-white"></i> Delhi, India
                    </p>
                    <p>
                      <i className="fas fa-envelope mr-2"></i> hrishabhjoshi123@gmail.com
                    </p>
                    <p>
                      <i className="fas fa-phone mr-2"></i> +91 9711976595
                    </p>
                    <p>
                      <i className="fas fa-print mr-2"></i> +91 8810622843
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <div className="text-center p-3 bg-dark-200 bg-opacity-20">
              © 2024 Copyright:
              <a className="text-white ml-1" href="https://mdbootstrap.com/">
                Career Bridge
              </a>
            </div>
          </footer>
        </div>
      </div>
    );
  };
  
  export default Footer;
  