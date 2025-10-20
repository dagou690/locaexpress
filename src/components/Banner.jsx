import React, { useEffect } from "react";
import "../assets/css/Accueil.css";
import { initCarousel } from "../assets/js/Accueil.js";

function Banner() {
  useEffect(() => {
       initCarousel();
   }, []);

  const scrollCarousel = (direction) => {
    const carousel = document.querySelector('.Produit-categorie');
    const scrollAmount = direction === 'left' ? -300 : 300;
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };
  
    return(
    <>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
            <ol className="carousel-indicators">
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block" src="/TablePliante.png" alt="First slide"/>
                    <h2 className="carousel-articleNom">Table pliante</h2>
                    <h1 className="carousel-info1">Reduction de 30%</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                    <h1 className="carousel-info2">2500</h1>
                    <p className="carousel-trait">/</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-right2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                    <h1 className="carousel-info3">1750</h1>
                </div>
                <div className="carousel-item">
                    <img className="d-block2" src="/Assiettes/AssietteOr.png" alt="Second slide"/>
                    <h2 className="carousel2-articleNom">Assiette</h2>
                    <h1 className="carousel2-info1">Du nouveau <br />dans la categorie Assiette</h1>
                    <h1 className="carousel2-info2">Assiette en or<br /> pour vos evenements</h1>
                </div>
                <div className="carousel-item">
                    <img className="d-block3" src="/couvert.png" alt="Third slide"/>
                    <h2 className="carousel3-articleNom">Couvert</h2>
                    <h1 className="carousel3-info1">Decouvrez notre pack <span style={{color:'red'}}>COUVERT</span></h1>
                    <h1 className="carousel3-info2">Cuillère Fourchette Couteau</h1>
                </div>
            </div>
        </div>
        
        <h1 className="Categorie-titre">Categories d'articles</h1>
 
        <div className="Produit-categorie-wrapper">
    
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="scroll-btn scroll-left" onClick={() => scrollCarousel('left')} viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>
            
            <div className="Produit-categorie">
                <div className="carousel-content">
                    <div className="card">
                        <img className="icon" src="/chaise.png" alt="chaise" />
                        <p>Chaise</p>
                    </div>
                    <div className="card">
                        <img className="icon" src="/verre.png" alt="verre" />
                        <p>Verre</p>
                    </div>
                    <div className="card">
                        <img className="icon" src="/table.png" alt="table" />
                        <p>Table</p>
                    </div>
                    <div className="card">
                        <img className="icon" src="/assiette.png" alt="assiette" />
                        <p> Assiette</p>
                    </div>
                    <div className="card">
                        <img className="icon" src="bache.png" alt="bache" />
                        <p>Bache</p>
                    </div>
                </div>
            </div>
            

              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="scroll-btn scroll-right" onClick={() => scrollCarousel('right')} viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg> 
        </div>
        <h1 className="Apropos-titre">A propos</h1>
        <div className="Apropos">
            <img src="/logo.png" alt="" />
            <p>
                Lorem ipsum dolor sit amet. Ex magni incidunt sit quia corrupti non iure illum non cumque exercitationem ut tempora iste. Ad ratione esse rem laboriosam illum rem nesciunt quaerat et aliquam dolore ad mollitia autem in doloremque aliquam sed quaerat rerum! Id rerum magnam in minima totam et repellendus blanditiis! In eaque quaerat et voluptatem quis id galisum dolorem nam rerum molestias eos totam nemo non magnam distinctio ut nemo voluptas. Ex nihil ipsam ad voluptas provident est cupiditate praesentium ex atque explicabo aut eaque neque et consequuntur rerum quo eveniet magni. In quae delectus ea fugiat autem sed accusantium voluptas est nobis repellendus et voluptatem dicta et illo reiciendis qui blanditiis similique. Sit ratione perspiciatis qui quia enim ea ipsa molestias sit odio beatae et tenetur numquam non earum dicta. Non libero aperiam hic provident officia vel quidem iusto est esse placeat. Eum quis rerum At delectus nihil hic modi voluptates. Ut repudiandae corporis ea quas consequuntur sed molestias corporis ut consequatur porro At consequuntur sunt! Aut distinctio delectus rem enim omnis vel error ullam aut magnam placeat aut galisum molestiae cum quae nisi est officia reprehenderit. Et voluptates minus et laborum doloribus aut unde quaerat aut alias maxime id nostrum expedita est dolores dolor! Quo nihil maxime et quia aliquam ut soluta optio 33 fugit reiciendis ut distinctio eaque. Sed libero amet non modi officia ut ipsum libero non sunt aperiam et voluptatem rerum eum galisum impedit ea autem iste.

            </p>
        

        </div>

    </>
)
}

export default Banner;